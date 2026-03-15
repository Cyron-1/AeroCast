import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useFonts } from 'expo-font';
import Mask from '../assets/images/Mask.png';
import Traffic from '../assets/images/Traffic.png';
import Windows from '../assets/images/Windows.png';
import Buildings from '../assets/images/Buildings.png';

export default function TipsScreen() {  // <-- default export
  const router = useRouter();

  const advisories = [
    {
      id: '1',
      title: 'Wear Mask Outside',
      desc: 'Air pollution just elevated, wearing a mask to reduce exposure to harmful particles.',
      color: '#5C0300',
      bgColor: '#FFEEC3',
      image: Mask,
      imageColor: '#FFBD71',
    },
    {
      id: '2',
      title: 'Avoid Traffic',
      desc: 'Stay away from busy roads to limit exposure to exhaust fumes.',
      color: '#5C0300',
      bgColor: '#FFEEC3',
      image: Traffic,
      imageColor: '#FFBD71',
    },
    {
      id: '3',
      title: 'Keep Windows Closed',
      desc: 'Keeping windows closed helps prevent polluted air from entering indoors.',
      color: '#5C0300',
      bgColor: '#FFEEC3',
      image: Windows,
      imageColor: '#FFBD71',
    },
    {
      id: '4',
      title: 'Limit Outdoor Chores',
      desc: 'Limiting outdoor activities helps prevent breathing difficulties.',
      color: '#005F6B',
      bgColor: '#E2F0FF',
      image: Buildings,
      imageColor: '#A3EEFF',
    },
  ];

  const [fontsLoaded] = useFonts({
    'SF-Pro-Rounded-Regular': require('../assets/fonts/SF-Pro-Rounded-Regular.otf'),
    'SF-Pro-Rounded-Semibold': require('../assets/fonts/SF-Pro-Rounded-Semibold.ttf'),
    'SF-Pro-Rounded-Bold': require('../assets/fonts/SF-Pro-Rounded-Bold.ttf'),
    'SF-Pro-Rounded-Heavy': require('../assets/fonts/SF-Pro-Rounded-Heavy.ttf'),
    'SF-Pro-Regular': require('../assets/fonts/SF-Pro-Regular.otf'),
    'SF-Pro-Medium': require('../assets/fonts/SF-Pro-Medium.ttf'),
    'SF-Pro-Semibold': require('../assets/fonts/SF-Pro-Semibold.otf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.sheet}>
        {/* Top Handle Decor */}
        <Pressable onPress={() => router.back()}>
          <View style={styles.handle} />
        </Pressable>
        
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.headerTitle}>Health Advisory</Text>

          {advisories.map((item) => (
            <View key={item.id} style={[styles.card, { backgroundColor: item.bgColor }]}>
              <View style={[styles.iconPlaceholder, { backgroundColor: item.imageColor }]}>
                <Image source={item.image} style={{ width: 80, height: 80, borderRadius: 5, }} resizeMode="contain" />
              </View>
              <View style={styles.cardTextContent}>
                <View style={[styles.badge, { backgroundColor: item.color }]}>
                  <Text style={styles.badgeText} numberOfLines={1} >{item.title}</Text>
                </View>
                <Text style={styles.description}>{item.desc}</Text>
              </View>
            </View>
          ))}

          <View style={styles.infoSection}>
            <Text style={styles.infoTitle}>What causes bad air quality?</Text>
            <Text style={styles.infoText}>
              Bad air quality happens when tiny particles and harmful gases get into the air. 
              <Text style={{ fontWeight: 'bold', fontStyle: 'italic' }}> These come from cars, factories, power plants, and even burning wood or trash.</Text> When the air is polluted, it can make breathing harder, irritate your lungs, and affect your heart and overall health.
            </Text>
          </View>

          <View style={styles.infoSection}>
            <Text style={styles.infoTitle}>Long Term Exposure Effects</Text>
            {[
              'Chronic respiratory diseases, like asthma and bronchitis',
              'Heart disease and increased risk of stroke',
              'Lung cancer from prolonged exposure',
              'Reduced lung development in children',
              'Cognitive effects and brain function impact',
              'Higher vulnerability for elderly and people with pre-existing conditions',
            ].map((item, index) => (
              <View key={index} style={styles.bulletItem}>
                <Text style={styles.bullet}>{'\u2022'}</Text>
                <Text style={styles.bulletText}>{item}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0)'
  },
  sheet: {
    backgroundColor: '#FFFAEE',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: '95%',
  },
  handle: {
    width: 75,
    height: 5,
    backgroundColor: 'rgba(0,0,0,0.7)', // Semi-transparent grey
    borderRadius: 25,
    alignSelf: 'center',
    marginVertical: 10,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: 'SF-Pro-Medium',
    textAlign: 'center',
    marginBottom: 10,
    color: '#1A1A1A',
  },
  card: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 15,
    marginBottom: 15,
    zIndex: -5,
  },
  iconPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  cardTextContent: {
    flex: 1,
  },
  badge: {
    alignSelf: 'flex-start',
    paddingLeft: 22,
    paddingRight: 12,
    paddingVertical: 4,
    borderRadius: 25,
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0,
    marginBottom: 8,
    left: -20,
    zIndex: -1,
  },
  badgeText: {
    color: '#FFF',
    fontFamily: 'SF-Pro-Semibold',
    fontSize: 20,
  },
  description: {
    fontSize: 14,
    fontFamily: 'SF-Pro-Regular',
    color: '#000',
    lineHeight: 15,
  },
  infoSection: {
    marginTop: 10,
  },
  infoTitle: {
    fontFamily: 'SF-Pro-Rounded-Semibold',
    fontSize: 32,
    color: '#000',
  },
  infoText: {
    fontSize: 18,
    fontFamily: 'SF-Pro-Regular',
    color: '#000',
    lineHeight: 24,
  },
  bulletItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 6, // space between bullets
  },
  bullet: {
    fontSize: 18,
    lineHeight: 24,
    marginRight: 8,
    color: '#000',
  },
  bulletText: {
    flex: 1,
    fontSize: 18,
    lineHeight: 24,
    color: '#000',
    fontFamily: 'SF-Pro-Regular',
  },
});