import '../global.css';

import { Stack } from 'expo-router';
import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';
import { PaperProvider } from 'react-native-paper';

export default function Layout() {
  return (
    <PaperProvider theme={MD3DarkTheme}>
      <Stack screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name='index' />
        <Stack.Screen name='modals/OrganisersModal' options={{
          presentation: 'transparentModal',
          animation: 'fade'
        }} />
      </Stack>
    </PaperProvider>
  )
}
