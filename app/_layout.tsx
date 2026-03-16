import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

        <Stack.Screen
          name="tips"
          options={{
            presentation: "transparentModal",
            headerShown: false,
            gestureEnabled: true,
            fullScreenGestureEnabled: true,
            animation: 'slide_from_bottom',
          }}
        />

        <Stack.Screen
          name="forecast"
          options={{
            presentation: "transparentModal",
            headerShown: false,
            gestureEnabled: true,
            fullScreenGestureEnabled: true,
            animation: 'slide_from_bottom',
          }}
        />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
