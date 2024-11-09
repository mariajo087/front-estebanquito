//Utils
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { registerRootComponent } from "expo";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useState } from "react";
import { Text } from "react-native";
import { Provider } from "react-redux";
import store from "./store/store";

//Hooks
import React from "react";

//Pages
import HomeScreen from "./pages/HomeScreen";
import Login from "./public_pages/Login";
import Deposit from "./pages/Deposit";
import Withdraw from "./pages/Withdraw";
import Transactions from "./pages/Transactions";
import Loans from "./pages/Loans";

//Public pages
import Recovery from "./public_pages/Recovery";
import Create from "./public_pages/Create";

//Constants
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const AppNavigation = ({ setIsAuth }) => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: "#8bc34a",
        tabBarStyle: {
          display: "flex",
          height: 60,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        // component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={36} />
          ),
          tabBarLabel: ({ focused, color }) => (
            <Text style={{ fontSize: 14, color, marginBottom: 8 }}>Home</Text>
          ),
        }}
      >
        {(props) => <HomeScreen {...props} setIsAuth={setIsAuth} />}
      </Tab.Screen>
      <Tab.Screen
        name="Deposito"
        component={Deposit}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="cash-minus" color={color} size={36} />
          ),
          tabBarLabel: ({ focused, color }) => (
            <Text style={{ fontSize: 14, color, marginBottom: 8 }}>
              Deposito
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="Retirar"
        component={Withdraw}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="swap-horizontal"
              color={color}
              size={36}
            />
          ),
          tabBarLabel: ({ focused, color }) => (
            <Text style={{ fontSize: 14, color, marginBottom: 8 }}>
              Retirar
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="Transacciones"
        component={Transactions}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="arrow-left-right"
              color={color}
              size={36}
            />
          ),
          tabBarLabel: ({ focused, color }) => (
            <Text style={{ fontSize: 14, color, marginBottom: 8 }}>
              Transacciones
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="Prestamos"
        component={Loans}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="cash" color={color} size={36} />
          ),
          tabBarLabel: ({ focused, color }) => (
            <Text style={{ fontSize: 14, color, marginBottom: 8 }}>
              Prestamos
            </Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const ScreenNavigation = ({ setIsAuth }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="login" options={{ headerShown: false }}>
        {(props) => <Login {...props} setIsAuth={setIsAuth} />}
      </Stack.Screen>
      <Stack.Screen
        name="recovery"
        options={{ headerShown: false }}
        component={Recovery}
      />
      <Stack.Screen name="create" options={{ headerShown: false }}>
        {(props) => <Create {...props} setIsAuth={setIsAuth} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default function App() {
  const [isAuth, setIsAuth] = useState(false);
  return (
    <Provider store={store}>
      <NavigationContainer>
        {isAuth ? (
          <AppNavigation setIsAuth={setIsAuth} />
        ) : (
          <ScreenNavigation setIsAuth={setIsAuth} />
        )}
      </NavigationContainer>
    </Provider>
  );
}

registerRootComponent(App);
