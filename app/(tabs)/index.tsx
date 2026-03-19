import React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Pressable, Dimensions, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// ADD THIS LINE BELOW:
import { Link } from 'expo-router'; 
import { useFonts } from 'expo-font';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

const { width } = Dimensions.get('window');

export default function Index() {
  const [data, setData] = useState<any>(null);

  const forestImages = {
    good: require('../../assets/images/Good-Forest.png'),
    bad: require('../../assets/images/Bad-Forest.png'),
  };

  const starImages = {
    good: require('../../assets/images/Star3.png'),
    bad: require('../../assets/images/Star2.png'),
  };

  const itemImages = {
    mask: require('../../assets/images/Mask2.png'),
    leaf: require('../../assets/images/Leaf.png'),
  }

  useEffect(() => {
    const docRef = doc(db, "aqi", "aqi");

    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        setData(docSnap.data());
      }
    });

    return () => unsubscribe();
  }, []);
  
  const [fontsLoaded] = useFonts({
    'SF-Pro-Rounded-Regular': require('../../assets/fonts/SF-Pro-Rounded-Regular.otf'),
    'SF-Pro-Rounded-Semibold': require('../../assets/fonts/SF-Pro-Rounded-Semibold.ttf'),
    'SF-Pro-Rounded-Bold': require('../../assets/fonts/SF-Pro-Rounded-Bold.ttf'),
    'SF-Pro-Rounded-Heavy': require('../../assets/fonts/SF-Pro-Rounded-Heavy.ttf'),
    'SF-Pro-Regular': require('../../assets/fonts/SF-Pro-Regular.otf'),
    'SF-Pro-Medium': require('../../assets/fonts/SF-Pro-Medium.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  const getAqiDetails = (value:number) => {
    if (value > 50) return { label: "Unhealthy Air Quality!", color: "#461B00", forest: forestImages.bad, terrain: "#D1BA4B", sky: '#FBE5AD', star: starImages.bad, tipsCardColor: '#FFBD71', tips: "Caution!", item: itemImages.mask, forecastCardColor: '#B38829', title: "a bit hazy." };
    return { label: "Good Air Quality", color: "#00361C", forest: forestImages.good, terrain: "#71A04D", sky: '#EFF0EB', star: starImages.good, tipsCardColor: '#9FE9C2', tips: "Tips!", item: itemImages.leaf, forecastCardColor: '#005C2C', title: "skies' clean!" };
  };

  const currentDetails = data ? getAqiDetails(data.currentAqi) : null;
  const pred1Details = data ? getAqiDetails(data.pred1) : null;

  return (
    <SafeAreaView style={StyleSheet.flatten([styles.container, { backgroundColor: currentDetails ? currentDetails.sky : '#EFF0EB' }])}>
      {/* Top Blue Wave Background */}
      <Image source={currentDetails?.star || starImages.good} 
        style={{ width: 268, height: 170, position: 'absolute', top: 0, right: 0 }} />

      <Image source={currentDetails?.forest || forestImages.good} 
        style={{ width: 412, height: 232, position: 'absolute', bottom: 140, right: 0, }} />

      <View style={styles.content}>
        {/* Header Text */}
        <View style={styles.header}>
          <Text style={styles.greeting}>Good morning,</Text>
          <Text style={styles.titleText}>{currentDetails ? currentDetails.title : "skies' clean!"}</Text>
          <Text style={styles.locationText}>Currently in General Santos</Text>
        </View>

        {/* Main AQI Display */}
        <View style={styles.aqiContainer}>
          <Text
            style={[
              styles.aqiNumber,
              { color: currentDetails ? currentDetails.color : '#052D1B' }
            ]}
          >
            {data?.currentAqi ?? '--'}
          </Text>
          <View
            style={[
              styles.badge,
              { backgroundColor: currentDetails ? currentDetails.color : '#052D1B' }
            ]}
          >
            <Text style={styles.badgeText}>
              {currentDetails ? currentDetails.label : 'Loading...'}
            </Text>
          </View>
        </View>

        <View style={styles.illustrationSpace} />

        {/* Bottom Action Buttons */}
        <View style={styles.footer}>
          {/* NAVIGATION TRIGGER: NEXT HOUR CARD */}
          <Link href="/forecast" asChild>
            <Pressable style={StyleSheet.flatten([styles.card, styles.forecastCard, { backgroundColor: pred1Details ? pred1Details.forecastCardColor : '#B38829' }])}>
              <Text style={StyleSheet.flatten([styles.cardLabelTop, { backgroundColor: pred1Details ? pred1Details.color : '#9FE9C2' }])}>Next Day</Text>
              <Text style={styles.cardBigNumber} numberOfLines={1} ellipsizeMode="clip">
                {data ? data.pred1 : '--'}
              </Text>
              <View style={StyleSheet.flatten([styles.cardBadge, { backgroundColor: pred1Details ? pred1Details.color : '#9FE9C2' }])}>
                <Text style={StyleSheet.flatten([styles.cardBadgeText])}>Unhealthy</Text>
              </View>
            </Pressable>
          </Link>

          {/* NAVIGATION TRIGGER: TIPS CARD */}
          <Link href="/tips" asChild>
            <Pressable style={StyleSheet.flatten([styles.card, styles.tipsCard, { backgroundColor: currentDetails ? currentDetails.tipsCardColor : '#9FE9C2' }])}>
              <Text style={StyleSheet.flatten([styles.cardLabelTopTips, { backgroundColor: currentDetails ? currentDetails.color : '#9FE9C2' }])}>{currentDetails ? currentDetails.tips : 'Tips!'}</Text>
              <Image source={currentDetails?.item || itemImages.leaf} 
                style={{ width: 100, height: 100, position: 'absolute', bottom: 0, right: 0, zIndex: 0 }} />
            </Pressable>
          </Link>
        </View>
      </View>

      <View style={{
          width: '100%',        // rectangle width
          height: 179,       // rectangle height
          backgroundColor: currentDetails ? currentDetails.terrain : '#71A04D',  // rectangle color
          zIndex: -5,         // ensures it stays behind other content
          position: 'absolute',
          bottom: 0,      // ensures it stays behind other content
        }} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxWidth: 500,        // Keeps it phone-sized
    alignSelf: 'center',  // Centers the "phone" on your screen
    width: '100%',        // Ensures it takes up space
  },
  content: {
    flex: 1,
    paddingHorizontal: 25,
  },
  header: { marginTop: 40 },
  greeting: { fontSize: 30, color: '#000', fontFamily: 'SF-Pro-Medium' },
  titleText: { fontSize: 55, color: '#000', fontFamily: 'SF-Pro-Rounded-Bold', lineHeight: 60 },
  locationText: { fontSize: 24, color: '#000', marginTop: 10, fontFamily: 'SF-Pro-Regular', lineHeight: 30, letterSpacing: -1 },
  aqiContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  aqiNumber: {
    fontSize: 160,
    lineHeight: 200,
    fontFamily: 'SF-Pro-Rounded-Heavy',
    color: '#052D1B',
  },
  badge: {
    backgroundColor: '#052D1B',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: -20,
  },
  badgeText: { color: '#FFF', fontWeight: '600', fontSize: 16, fontFamily: 'SF-Pro-Regular' },
  illustrationSpace: { flex: 1 }, 
  footer: {
    flexDirection: 'row',
    paddingBottom: 20, // Extra space at bottom
    gap: 15, // Space between cards
  },
  card: {
    height: 125,
    borderRadius: 24,
    justifyContent: 'space-between',
    overflow: 'visible',
  },
  forecastCard: { backgroundColor: '#B38829', flex: 3 },
  tipsCard: { backgroundColor: '#9FE9C2', flex: 2 },
  cardLabelTop: { color: '#FFF', backgroundColor: '#461B00', padding: 5, borderRadius: 20, width: 80, textAlign: 'center', margin: 10, zIndex: 1, fontFamily: 'SF-Pro-Regular' },
  cardLabelTopTips: { color: '#FFF', backgroundColor: '#00361C', padding: 5, borderRadius: 20, width: 70, textAlign: 'center', margin: 10, fontFamily: 'SF-Pro-Regular' },
  cardBigNumber: { 
    fontSize: 100, 
    color: 'rgba(255,255,255,0.8)', // Faded look
    lineHeight: 120,
    fontFamily: 'SF-Pro-Rounded-Heavy',
    position: 'absolute', 
    left: 0,          // <-- important
    right: 0,
    bottom: 0,
    textAlign: 'center',
    transform: [{ scaleY: 1.3 }, { scaleX: 1.3 },],
    letterSpacing: -5,
    zIndex: 1,
  },
  cardBadge: { backgroundColor: '#461B00', padding: 5, borderRadius: 20, alignSelf: 'flex-end', width: 70, fontSize: 12, margin: 10, fontFamily: 'SF-Pro-Regular', zIndex: 2 },
  cardBadgeText: { color: '#FFF', textAlign: 'center' }
});