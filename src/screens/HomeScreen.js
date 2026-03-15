import React from 'react';
import { StyleSheet, Text, View, Pressable, Dimensions } from 'react-native';
// Use this instead of the default SafeAreaView
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      {/* Top Blue Wave Background */}
      <View style={styles.topWave} />

      <View style={styles.content}>
        {/* Header Text */}
        <View style={styles.header}>
          <Text style={styles.greeting}>Good morning,</Text>
          <Text style={styles.titleText}>skies' clean!</Text>
          <Text style={styles.locationText}>Currently in General Santos</Text>
        </View>

        {/* Main AQI Display */}
        <View style={styles.aqiContainer}>
          <Text style={styles.aqiNumber}>32</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>Good Air Quality</Text>
          </View>
        </View>

        <View style={styles.illustrationSpace} />

        {/* Bottom Action Buttons */}
        <View style={styles.footer}>
          {/* NAVIGATION TRIGGER: NEXT HOUR CARD */}
          <Pressable 
            style={[styles.card, styles.forecastCard]}
            onPress={() => navigation.navigate('Details')} 
          >
            <Text style={styles.cardLabelTop}>Next Hour</Text>
            <Text style={styles.cardBigNumber}>130</Text>
            <View style={styles.cardBadge}>
               <Text style={styles.cardBadgeText}>Unhealthy</Text>
            </View>
          </Pressable>

          {/* NAVIGATION TRIGGER: TIPS CARD */}
          <Pressable 
            style={[styles.card, styles.tipsCard]}
            onPress={() => navigation.navigate('Tips')}
          >
            <Text style={styles.cardLabelTop}>Tips!</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E9EFE3',
  },
  topWave: {
    position: 'absolute',
    top: -100,
    right: -50,
    width: width * 0.8,
    height: 300,
    backgroundColor: '#00A8FF',
    borderBottomLeftRadius: 200,
    transform: [{ rotate: '-10deg' }],
  },
  content: {
    flex: 1,
    paddingHorizontal: 25,
  },
  header: { marginTop: 20 },
  greeting: { fontSize: 28, color: '#1A1A1A' },
  titleText: { fontSize: 42, fontWeight: '800', color: '#000' },
  locationText: { fontSize: 18, color: '#333', marginTop: 10 },
  aqiContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  aqiNumber: {
    fontSize: 160,
    fontWeight: '800',
    color: '#052D1B',
  },
  badge: {
    backgroundColor: '#052D1B',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: -20,
  },
  badgeText: { color: '#FFF', fontWeight: '600', fontSize: 16 },
  illustrationSpace: { flex: 1 }, 
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 20, // Extra space at bottom
  },
  card: {
    width: '48%',
    height: 150,
    borderRadius: 24,
    padding: 15,
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  forecastCard: { backgroundColor: '#B9852B' },
  tipsCard: { backgroundColor: '#90E8D4' },
  cardLabelTop: { color: '#FFF', fontWeight: 'bold' },
  cardBigNumber: { 
    fontSize: 80, 
    color: 'rgba(255,255,255,0.3)', // Faded look
    fontWeight: 'bold', 
    position: 'absolute', 
    bottom: -10, 
    left: 5 
  },
  cardBadge: { backgroundColor: '#421C06', padding: 5, borderRadius: 10, alignSelf: 'flex-end' },
  cardBadgeText: { color: '#FFF', fontSize: 12 }
});