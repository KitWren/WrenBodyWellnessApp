import React, { useEffect } from "react";
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  View,
  Alert,
  ToastAndroid,
} from "react-native";
import Constants from "expo-constants";
import { createStackNavigator } from "@react-navigation/stack";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Icon } from "react-native-elements";
import { useDispatch } from "react-redux";
import { getFocusedRouteNameFromRoute } from "@react-navigation/core";
import NetInfo from "@react-native-community/netinfo";
import AppointmentInfoScreen from "./AppointmentInfoScreen";
import AppointmentScreen from "./AppointmentScreen";
import HomeScreen from "./HomeScreen";
import AboutScreen from "./AboutScreen";
import ContactScreen from "./ContactScreen";
import ReservationScreen from "./ReservationScreen";
import PlainLogoItalicsFont from "../assets/images/PlainLogoItalicsFont.png";
import { fetchPartners } from "../features/partners/partnersSlice";
import { fetchAppointments } from "../features/appointments/appointmentsSlice";
import { fetchPromotions } from "../features/promotions/promotionsSlice";
import { fetchComments } from "../features/comments/commentsSlice";
import FavoritesScreen from "./FavoritesScreen";
import LoginScreen from "./LoginScreen";
import ExerciseLibraryScreen from "./ExerciseLibraryScreen";
import ExerciseLibraryInfoScreen from "./ExerciseLibraryInfoScreen";
import { fetchExercises } from "../features/exercises/exercisesSlice";

const Drawer = createDrawerNavigator();

const screenOptions = {
  headerTintColor: "#fff",
  headerStyle: { backgroundColor: "#4a2c3f" },
};

function HomeNavigator() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation }) => ({
          title: "Home",
          headerLeft: () => (
            <Icon
              name="home"
              type="font-awesome"
              iconStyle={styles.stackIcon}
              onPress={() => navigation.toggleDrawer()}
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
}

function AboutNavigator() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="About"
        component={AboutScreen}
        options={({ navigation }) => ({
          headerLeft: () => (
            <Icon
              name="info-circle"
              type="font-awesome"
              iconStyle={styles.stackIcon}
              onPress={() => navigation.toggleDrawer()}
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
}

function ContactNavigator() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="Contact"
        component={ContactScreen}
        options={({ navigation }) => ({
          title: "Contact Us",
          headerLeft: () => (
            <Icon
              name="address-card"
              type="font-awesome"
              iconStyle={styles.stackIcon}
              onPress={() => navigation.toggleDrawer()}
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
}

function ReservationNavigator() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="Book Appointment"
        component={ReservationScreen}
        options={({ navigation }) => ({
          title: "Book Appointment",
          headerLeft: () => (
            <Icon
              name="calendar"
              type="font-awesome"
              iconStyle={styles.stackIcon}
              onPress={() => navigation.toggleDrawer()}
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
}

function ExerciseLibraryNavigator() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="Exercise Library"
        component={ExerciseLibraryScreen}
        options={({ navigation }) => ({
          title: "Exercise Library",
          headerLeft: () => (
            <Icon
              name="bicycle"
              type="font-awesome"
              iconStyle={styles.stackIcon}
              onPress={() => navigation.toggleDrawer()}
            />
          ),
        })}
      />
      <Stack.Screen
        name="ExerciseLibraryInfo" //this is linked to payload-need to change functional code
        component={ExerciseLibraryInfoScreen}
        options={({ route }) => ({
          title: route.params.exercise.name,
        })}
      />
    </Stack.Navigator>
  );
}

function FavoritesNavigator() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={({ navigation }) => ({
          title: "Favorite Services",
          headerLeft: () => (
            <Icon
              name="heart"
              type="font-awesome"
              iconStyle={styles.stackIcon}
              onPress={() => navigation.toggleDrawer()}
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
}

function LoginNavigator() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={({ navigation, route }) => ({
          headerTitle: getFocusedRouteNameFromRoute(route),
          headerLeft: () => (
            <Icon
              name={
                getFocusedRouteNameFromRoute(route) === "Register"
                  ? "user-plus"
                  : "sign-in"
              }
              type="font-awesome"
              iconStyle={styles.stackIcon}
              onPress={() => navigation.toggleDrawer()}
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
}

function AppointmentNavigator() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="Appointments"
      screenOptions={screenOptions}
    >
      <Stack.Screen
        name="Appointments"
        component={AppointmentScreen}
        options={({ navigation }) => ({
          title: "Appointments",
          headerLeft: () => (
            <Icon
              name="list"
              type="font-awesome"
              iconStyle={styles.stackIcon}
              onPress={() => navigation.toggleDrawer()}
            />
          ),
        })}
      />
      <Stack.Screen
        name="AppointmentInfo" //this is linked to payload-need to change functional code
        component={AppointmentInfoScreen}
        options={({ route }) => ({
          title: route.params.appointment.name,
        })}
      />
    </Stack.Navigator>
  );
}

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerHeader}>
        <View style={{ flex: 1 }}>
          <Image source={PlainLogoItalicsFont} style={styles.drawerImage} />
        </View>
        <View style={{ flex: 2 }}>
          <Text style={styles.drawerHeaderText}>Wren Body Wellness</Text>
        </View>
      </View>
      <DrawerItemList {...props} labelStyle={{ fontWeight: "bold" }} />
    </DrawerContentScrollView>
  );
}

function Main() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAppointments());
    dispatch(fetchPromotions());
    dispatch(fetchPartners());
    dispatch(fetchComments());
    dispatch(fetchExercises());
  }, [dispatch]);

  useEffect(() => {
    showNetInfo();
    const unsubscribeNetInfo = NetInfo.addEventListener((connectionInfo) => {
      handleConnectivityChange(connectionInfo);
    });

    return unsubscribeNetInfo;
  }, []);

  const showNetInfo = async () => {
    const connectionInfo = await NetInfo.fetch();
    Platform.OS === "ios"
      ? Alert.alert("Initial Network Connectivity Type:", connectionInfo.type)
      : ToastAndroid.show(
          `Initial Network Connectivity Type: ${connectionInfo.type}`,
          ToastAndroid.LONG
        );
  };

  // [Keeping as reference for promise format]

  // const showNetInfo = async () => {
  //  NetInfo.fetch().then((connectionInfo) => { //using then instead of asynch await for promise resolution just because that's what is in the documentation- asynch await is new syntax
  //        Platform.OS === 'ios'
  //            ? Alert.alert(
  //                'Initial Network Connectivity Type:',
  //                connectionInfo.type
  //            )
  //            : ToastAndroid.show(
  //                'Initial Network Connectivity Type: ' +
  //                connectionInfo.type,
  //                ToastAndroid.LONG
  //            );
  //    });
  // };

  const handleConnectivityChange = (connectionInfo) => {
    let connectionMsg = "You are now connected to an active network.";
    switch (connectionInfo.type) {
      case "none":
        connectionMsg = "No network connection is active.";
        break;
      case "unknown":
        connectionMsg = "The network connection state is now unknown.";
        break;
      case "cellular":
        connectionMsg = "You are now connected to a cellular network.";
        break;
      case "wifi":
        connectionMsg = "You are now connected to a WiFi network.";
        break;
    }
    Platform.OS === "ios"
      ? Alert.alert("Connection change:", connectionMsg)
      : ToastAndroid.show(connectionMsg, ToastAndroid.LONG);
  };

  return (
    <View
      style={{
        flex: 1,
        paddingTop: Platform.OS === "ios" ? 0 : Constants.statusBarHeight,
      }}
    >
      <Drawer.Navigator
        initialRouteName="Home"
        drawerContent={CustomDrawerContent}
        drawerStyle={{ backgroundColor: "#fff" }}
      >
        <Drawer.Screen
          name="Login"
          component={LoginNavigator}
          options={{
            drawerIcon: ({ color }) => (
              <Icon
                name="sign-in"
                type="font-awesome"
                size={17}
                iconStyle={{ width: 24 }}
                color={color}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Home"
          component={HomeNavigator}
          options={{
            title: "Home",
            drawerIcon: ({ color }) => (
              <Icon
                name="home"
                type="font-awesome"
                size={17}
                iconStyle={{ width: 24 }}
                color={color}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Services"
          component={AppointmentNavigator}
          options={{
            title: "Services",
            drawerIcon: ({ color }) => (
              <Icon
                name="list"
                type="font-awesome"
                size={17}
                iconStyle={{ width: 24 }}
                color={color}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Book Appointment"
          component={ReservationNavigator}
          options={{
            title: "Book Appointment",
            drawerIcon: ({ color }) => (
              <Icon
                name="calendar"
                type="font-awesome"
                size={17}
                iconStyle={{ width: 24 }}
                color={color}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Exercise Library"
          component={ExerciseLibraryNavigator}
          options={{
            title: "Exercise Library",
            drawerIcon: ({ color }) => (
              <Icon
                name="bicycle"
                type="font-awesome"
                size={17}
                iconStyle={{ width: 24 }}
                color={color}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Favorites"
          component={FavoritesNavigator}
          options={{
            title: "Favorite Services",
            drawerIcon: ({ color }) => (
              <Icon
                name="heart"
                type="font-awesome"
                size={17}
                iconStyle={{ width: 24 }}
                color={color}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="About"
          component={AboutNavigator}
          options={{
            title: "About",
            drawerIcon: ({ color }) => (
              <Icon
                name="info-circle"
                type="font-awesome"
                size={17}
                iconStyle={{ width: 24 }}
                color={color}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Contact"
          component={ContactNavigator}
          options={{
            title: "Contact Us",
            drawerIcon: ({ color }) => (
              <Icon
                name="address-card"
                type="font-awesome"
                size={17}
                iconStyle={{ width: 24 }}
                color={color}
              />
            ),
          }}
        />
      </Drawer.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerHeader: {
    backgroundColor: "#4a2c3f",
    height: 140,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    flexDirection: "row",
  },
  drawerHeaderText: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  },
  drawerImage: {
    margin: 10,
    height: 60,
    width: 60,
  },
  stackIcon: {
    marginLeft: 10,
    color: "#fff",
    fontSize: 24,
  },
});

export default Main;
