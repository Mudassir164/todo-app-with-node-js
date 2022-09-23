import "react-native-gesture-handler";
import * as React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LogInAndSignInScreen from "../Screen/LogInAndSignInScreen";
import ProfileImageUploadScreen from "../Screen/ProfileImageUploadScreen";
import ProfileScreen from "../Screen/ProfileScreen";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import UserInfo from "../Component/CustomDrawer/UserInfo";
import DrawerFooter from "../Component/CustomDrawer/DrawerFooter";
import LogInProvider, { useLogIn } from "../Context/ContextApi";
const Drawer = createDrawerNavigator();

const Stack = createNativeStackNavigator();

const Home = (props) => {
  return (
    <View>
      <Text>Hello World</Text>
    </View>
  );
};
const Task = (props) => {
  return (
    <View>
      <Text>Hello World</Text>
    </View>
  );
};

function StackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Auth Screen " component={LogInAndSignInScreen} />

      <Stack.Screen
        name="ProfileImageUploadScreen"
        component={ProfileImageUploadScreen}
      />
      <Stack.Screen name="Profile Screen" component={ProfileScreen} />
    </Stack.Navigator>
  );
}

function CustomDrawer(props) {
  const { setIsLogedIn } = useLogIn();
  return (
    <View style={{ height: "100%" }}>
      <DrawerContentScrollView {...props}>
        <UserInfo />
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <DrawerFooter
        onPress={() => {
          setIsLogedIn(false);
        }}
      />
    </View>
  );
}

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "transparent",
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTitle: "",
      }}
      drawerContent={(props) => <CustomDrawer {...props} />}
    >
      <Drawer.Screen name="Feed" component={Home} />
      <Drawer.Screen name="Article" component={Task} />
    </Drawer.Navigator>
  );
}

function MainNavigation() {
  const { IsLogedIn } = useLogIn();
  return IsLogedIn ? <DrawerNavigator /> : <StackNavigator />;
}

export default MainNavigation;
