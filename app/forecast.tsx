import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, Pressable } from 'react-native';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebaseConfig'; 
import { useRouter } from 'expo-router';

interface AqiData {
  currentAqi: number;
  pred1: number;
  pred2: number;
  pred3: number;
  pred4: number;
  pred5: number;
  pred6: number;
  pred7: number;
}

export default function ForecastDetails() {
  const [data, setData] = useState<AqiData | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Reference: Collection "aqi" -> Document "aqi"
    const docRef = doc(db, "aqi", "aqi");
    
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        setData(docSnap.data() as AqiData);
      }
    });

    return () => unsubscribe();
  }, []);

  // Helper function to get status and color
  const getAqiDetails = (aqi: number) => {
    if (aqi > 150) return { label: 'Very Unhealthy', color: '#421C06' };
    if (aqi > 100) return { label: 'Unhealthy', color: '#7A2B12' };
    if (aqi > 50) return { label: 'Moderate', color: '#7A5C12' };
    return { label: 'Good', color: '#008B5E' };
  };

  const getAqiColor = (aqi:number) => {
    if (aqi > 50) return { bg: '#FFFAEE', barColor: '#FFEEC3' };
    return { bg: '#ECFFF5', barColor: '#C0FFDE' };
  }

  // Map predictions to a Daily Array
  const forecastArray = data ? [
    { day: 'Today', aqi: data.currentAqi },
    { day: 'Day 1', aqi: data.pred1 },
    { day: 'Day 2', aqi: data.pred2 },
    { day: 'Day 3', aqi: data.pred3 },
    { day: 'Day 4', aqi: data.pred4 },
    { day: 'Day 5', aqi: data.pred5 },
    { day: 'Day 6', aqi: data.pred6 },
    { day: 'Day 7', aqi: data.pred7 },
  ] : [];

  if (!data) return <View style={styles.container}><Text>Connecting to sensors...</Text></View>;

  return (
    <View style={styles.container}>
      <View style={StyleSheet.flatten([styles.sheet, { backgroundColor: getAqiColor(data.pred1).bg }])}>
        <Pressable onPress={() => router.back()}>
          <View style={styles.handle} />
        </Pressable>
        <Text style={styles.title}>Daily Forecast</Text>

        <View style={StyleSheet.flatten([styles.chartContainer, { backgroundColor: getAqiColor(data.pred1).barColor }])}>
          <ScrollView horizontal showsHorizontalScrollIndicator={true}>
            <View style={styles.barWrapper}>
              {forecastArray.map((item, index) => {
                const details = getAqiDetails(item.aqi);
                const isHighest = item.aqi === Math.max(...forecastArray.map(o => o.aqi));

                return (
                  <View key={index} style={styles.column}>
                    {/* Floating Badge for Highlighted Day */}
                    {/* {isHighest && ( */}
                      <View style={styles.floatingBadge}>
                        <View style={[styles.pill, { backgroundColor: details.color }]}>
                          <Text style={styles.pillText}>{item.aqi}</Text>
                        </View>
                        <View style={[styles.subPill, { backgroundColor: details.color }]}>
                          <Text style={styles.subPillText}>{details.label}</Text>
                        </View>
                      </View>
                    {/* )} */}

                    <View 
                      style={[
                        styles.bar, 
                        { 
                          height: Math.max(item.aqi * 1.2, 50), // Ensure bar is always visible
                          backgroundColor: details.color 
                        }
                      ]} 
                    >
                      <View style={styles.dayCircle}>
                        <Text style={styles.dayText}>{index + 1}</Text>
                      </View>
                    </View>
                    <Text style={styles.bottomLabel}>{item.day}</Text>
                  </View>
                );
              })}
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0)',
  },
  sheet: {
    backgroundColor: '#E6FFF5',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 10,
    height: '75%',
  },
  handle: {
    width: 75,
    height: 5,
    backgroundColor: 'rgba(0,0,0,0.7)', // Semi-transparent grey
    borderRadius: 25,
    alignSelf: 'center',
    marginVertical: 10,
  },
  title: {
    fontSize: 24,
    fontFamily: 'SF-Pro-Medium',
    textAlign: 'center',
    marginBottom: 10,
    color: '#000',
  },
  chartContainer: {
    backgroundColor: '#B2FFDE',
    marginHorizontal: 15,
    borderRadius: 25,
    height: 300,
    paddingTop: 10, // Space for floating badges
    justifyContent: 'flex-end',
    paddingBottom: 20,
  },
  barWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  column: {
    alignItems: 'center',
    marginHorizontal: 1,
    width: 50,
  },
  bar: {
    width: 45,
    borderRadius: 25,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 8,
  },
  dayCircle: {
    width: 30,
    height: 30,
    backgroundColor: '#FFFFFFCC',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  bottomLabel: {
    marginTop: 8,
    fontSize: 10,
    fontWeight: 'bold',
    color: '#004D40',
  },
  floatingBadge: {
    position: 'absolute',
    top: -40,
    alignItems: 'center',
    zIndex: 10,
    width: 100,
  },
  pill: {
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  pillText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  subPill: {
    paddingHorizontal: 8,
    borderRadius: 5,
    marginTop: 2,
  },
  subPillText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: '600',
  },
});