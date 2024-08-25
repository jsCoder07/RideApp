import {
  View,
  Text,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Image,
  TextInput,
  Platform,
  Keyboard,
} from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Fontisto from "@expo/vector-icons/Fontisto";

import { InputFieldProps } from "@/types/type";

const InputField = ({
  label,
  labelStyle,
  icon,
  className,
  secureTextEntry = false,
  containerStyle,
  inputStyle,
  iconColor,
  iconSet,
  iconSize = 24,
  iconStyle,
  ...props
}: InputFieldProps) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="w-full py-2">
          <Text className={`text-lg mb-3 font-JakartaBold ${labelStyle}`}>
            {label}
          </Text>
          <View
            className={`flex flex-row justify-start items-center relative bg-neutral-100 rounded-2xl border border-neutral-100 focus:border-primary-500 ${containerStyle}`}
          >
            {icon && (
              <View className={`ml-4 ${iconStyle}`}>
                {iconSet === "Ionicons" && (
                  <Ionicons name={icon} size={iconSize} color={iconColor} />
                )}
                {iconSet === "FontAwesome6" && (
                  <FontAwesome6 name={icon} size={iconSize} color={iconColor} />
                )}
                {iconSet === "MaterialCommunityIcons" && (
                  <MaterialCommunityIcons
                    name={icon}
                    size={iconSize}
                    color={iconColor}
                  />
                )}
                {iconSet === "Fontisto" && (
                  <Fontisto name={icon} size={iconSize} color={iconColor} />
                )}
              </View>
              //   <Image source={icon} className={`w-6 h-6 ml-4 ${iconStyle}`} />
            )}
            <TextInput
              className={`flex-1 rounded-full p-4 font-JakartaBold text-[15px] ${inputStyle} text-left`}
              secureTextEntry={secureTextEntry}
              {...props}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default InputField;
