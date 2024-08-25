import { View, Text } from "react-native";
import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Tabs } from "expo-router";
const TabIcon = () => {
  return (
    <View className="flex flex-row items-center justify-center">
      <View>
        <FontAwesome name="home" size={24} color="#4081EC" />
      </View>
    </View>
  );
};
const TabIconChat = () => {
  return (
    <View className="flex flex-row items-center justify-center">
      <View>
        <Entypo name="chat" size={24} color="#32A350" />
      </View>
    </View>
  );
};
const TabIconProfile = () => {
  return (
    <View>
      <View>
        <FontAwesome6 name="user-pen" size={24} color="#6433B2" />
      </View>
    </View>
  );
};
const TabIconRides = () => {
  return (
    <View>
      <View>
        <FontAwesome6 name="list-ul" size={24} color="#D54235" />
      </View>
    </View>
  );
};
const layout = () => {
  return (
    <Tabs
      initialRouteName="index"
      screenOptions={{
        // tabBarShowLabel: false,
        tabBarActiveTintColor: "white",
        tabBarStyle: {
          position: "absolute",
          overflow: "hidden",
          height: 80,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: 20,
          paddingBottom: 20,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: () => <TabIcon />,
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: "Chat",
          headerShown: false,
          tabBarIcon: () => <TabIconChat />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: () => <TabIconProfile />,
        }}
      />
      <Tabs.Screen
        name="rideHistory"
        options={{
          title: "Rides",
          headerShown: false,
          tabBarIcon: () => <TabIconRides />,
        }}
      />
    </Tabs>
  );
};

export default layout;
