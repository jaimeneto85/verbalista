import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";

import { Home } from "./screens/home/home.screen";
import { DragWordsScreen } from "./screens/dragWords/dragWords.screen";

const Tabs = createBottomTabNavigator();

export const Routes = () => {
  return (
    <NavigationContainer>
      <Tabs.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="Home"
          component={Home}
          options={{
            tabBarLabel: "Pick Words",
            tabBarIcon: ({ color, size }) => {
              return (
                <MaterialIcons name="keyboard" color={color} size={size} />
              );
            },
          }}
        />
        <Tabs.Screen
          name="Drag words"
          component={DragWordsScreen}
          options={{
            tabBarIcon: ({ color, size }) => {
              return <MaterialIcons name="swipe" color={color} size={size} />;
            },
          }}
        />
      </Tabs.Navigator>
    </NavigationContainer>
  );
};
