import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { Colors } from "@/constants/Colors";
import { IconButton } from "@/ui/IconBtn";
import { AllExpenses } from "@/screens/AllExpenses";
import { RecentExpenses } from "@/screens/RecentExpenses";
import { getItem, storeData } from "@/utils/storage";
import { Categories } from "@/components/Categories/Categories";
import { ExpensesContextProvider } from "@/store/expenses-context";
import { WelcomeScreen } from "@/screens/WelcomeScreen";
import { ManageExpense } from "@/screens/ManageExpense";
import { CategoryExpenses } from "@/screens/CategoryExpenses";

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

function ExpensesOverview() {
  return (
    <BottomTabs.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: {
          backgroundColor: Colors.gray,
          shadowColor: "transparent",
        },
        headerTitleStyle: {
          fontFamily: "Outfit-Medium",
        },
        headerRight: () => (
          <IconButton
            icon="add"
            size={30}
            color={Colors.accent}
            onPress={() => navigation.navigate("ManageExpense")}
          />
        ),
        headerTintColor: Colors.white,
        tabBarStyle: {
          position: "absolute",
          borderTopWidth: 0,
        },
        tabBarActiveTintColor: Colors.accent,
        tabBarBackground: () => (
          <BlurView
            intensity={80}
            tint="dark"
            style={StyleSheet.absoluteFill}
          />
        ),
        tabBarLabelStyle: {
          fontFamily: "Outfit-Medium",
        },
      })}
    >
      <BottomTabs.Screen
        name="AllExpenses"
        component={AllExpenses}
        options={{
          title: "All Expenses",
          tabBarLabel: "All Expenses",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" size={size} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="RecentExpenses"
        component={RecentExpenses}
        options={{
          title: "Recent Expenses",
          tabBarLabel: "Recent",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="hourglass" size={size} color={color} />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
}

export default function RootLayout() {
  const [hasLaunched, setHasLaunched] = useState(false);
  const HAS_LAUNCHED = "HAS_LAUNCHED";
  const CATEGORIES = "CATEGORIES";

  useEffect(() => {
    function getData() {
      const hasLaunched = getItem(HAS_LAUNCHED);
      if (hasLaunched) {
        setHasLaunched(true);
      } else {
        storeData(HAS_LAUNCHED, true);
      }
      const category = getItem(CATEGORIES);

      if (!category) {
        storeData(CATEGORIES, Categories);
      }
    }

    getData();
  }, []);

  return (
    <>
      <StatusBar style="light" />
      <ExpensesContextProvider>
        <NavigationContainer independent={true}>
          <Stack.Navigator
            screenOptions={{
              headerStyle: {
                backgroundColor: Colors.gray,
                shadowColor: "transparent",
              },
              headerTintColor: Colors.accent,
              headerTitleStyle: {
                fontFamily: "Outfit-Medium",
                color: Colors.white,
              },
            }}
          >
            {!hasLaunched && (
              <Stack.Screen
                name="WelcomeScreen"
                component={WelcomeScreen}
                options={{
                  headerShown: false,
                  headerTitleStyle: {
                    fontFamily: "Outfit-Medium",
                  },
                }}
              />
            )}
            <Stack.Screen
              name="ExpensesOverview"
              component={ExpensesOverview}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="ManageExpense"
              component={ManageExpense}
              options={{
                headerBackTitle: "Back",
                headerBackTitleStyle: { fontFamily: "Outfit-Medium" },
              }}
            />
            <Stack.Screen
              name="CategoryExpenses"
              component={CategoryExpenses}
              options={{
                headerBackTitle: "Back",
                headerBackTitleStyle: { fontFamily: "Outfit-Medium" },
              }}
            />
            {/*<Stack.Screen*/}
            {/*  name="AddCategory"*/}
            {/*  component={AddCategoryScreen}*/}
            {/*  options={{*/}
            {/*    headerTitle: "Add Category",*/}
            {/*    headerBackTitle: "Back",*/}
            {/*    headerBackTitleStyle: { fontFamily: "Outfit-Medium" },*/}
            {/*  }}*/}
            {/*/>*/}
          </Stack.Navigator>
        </NavigationContainer>
      </ExpensesContextProvider>
    </>
  );
}
