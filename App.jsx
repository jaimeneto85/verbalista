import "react-native-gesture-handler";

import { GluestackUIProvider, Box, Text } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";

import { Routes } from "./src/app";

export default function App() {
  return (
    <GluestackUIProvider config={config}>
      <Routes />
    </GluestackUIProvider>
  );
}
