import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Home } from "./screens/home.screen";
import { DragWords } from "./screens/dragWords.screen";
import { NavigationContainer } from "@react-navigation/native";
const Stack = createNativeStackNavigator();

export const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="About" component={DragWords} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
