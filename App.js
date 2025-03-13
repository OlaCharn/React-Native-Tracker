import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native"; //компонент- обертка для навигации
import { createNativeStackNavigator } from "@react-navigation/native-stack"; //компонент для создания стека навигации
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"; //компонент для создания нижней навигации
import { Ionicons } from "@expo/vector-icons"; //импорт иконок

import ManageExpenceScreen from "./screens/ManageExpenceScreen";
import RecentExpencesScreen from "./screens/RecentExpencesScreen";
import AllExpencesScreen from "./screens/AllExpencesScreen";
import { GlobalStyles } from "./constants/styles"; //импорт цветов

const Stack = createNativeStackNavigator(); //создаем стек навигации
const BottomTab = createBottomTabNavigator(); //создаем нижнюю навигацию

function ExpensecOverview() {
  return (
    <BottomTab.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: GlobalStyles.colors.primary200 },
        headerTintColor: GlobalStyles.colors.primary800,
        tabBarStyle: { backgroundColor: GlobalStyles.colors.primary100 },
        tabBarActiveTintColor: GlobalStyles.colors.accent500,
        tabBarInactiveTintColor: GlobalStyles.colors.primary700,
      }}
    >
      <BottomTab.Screen
        name="RecentExpencesScreen"
        component={RecentExpencesScreen}
        options={{
          title: "Recent Expences",
          tabBarLabel: "RECENT",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="hourglass" size={size} color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="ManageExpenceScreen"
        component={AllExpencesScreen}
        options={{
          title: "All Expences",
          tabBarLabel: "ALL",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" size={size} color={color} />
          ),
        }}

      />
    </BottomTab.Navigator>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="ExpensecOverview"
            component={ExpensecOverview}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ManageExpenceScreen"
            component={ManageExpenceScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

/* создаем стек навигации */
// <NavigationContainer> мы можем веутри него опрделедить, какой экран будет отображаться первым
// или же мы можем просто ставить экраны в том порядке, в котором они должны отображаться
