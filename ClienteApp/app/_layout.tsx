import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack  screenOptions={{
        headerShown: false, // isso remove o cabeçalho de todas as telas dentro dessa stack
      }} />;
}
