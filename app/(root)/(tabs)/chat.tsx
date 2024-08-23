import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const Chat = () => {
  return (
    <SafeAreaView className="items-center justify-center flex-1">
      <Text className="text-blue-700">Chat</Text>
    </SafeAreaView>
  );
};

export default Chat;
