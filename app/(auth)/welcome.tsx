import { View, Text } from "react-native";
import React, { useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native";
import { router } from "expo-router";
import Swiper from "react-native-swiper";
import { onboarding } from "@/constants";
import { Image } from "react-native";
import AsButton from "@/components/ButtonAs";
const Welcome = () => {
  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const islastslide = activeIndex === onboarding.length - 1;
  return (
    <SafeAreaView className="flex items-center justify-between h-full">
      <TouchableOpacity
        className="flex items-end justify-end w-full p-5"
        onPress={() => {
          router.replace("/(auth)/sign-up");
        }}
      >
        <Text className="text-black text-md font-JakartaBold">Skip</Text>
      </TouchableOpacity>
      <Swiper
        ref={swiperRef}
        loop={false}
        dot={
          <View className="w-[32px] h-[4px] mx-1 bg-[#E2E8F0] rounded-full" />
        }
        activeDot={
          <View className="w-[32px] h-[4px] mx-1 bg-[#0286FF] rounded-full" />
        }
        onIndexChanged={(index) => {
          setActiveIndex(index);
        }}
      >
        {onboarding.map((item) => (
          <View className="flex items-center justify-center p-5" key={item.id}>
            <Image
              source={item.image}
              className="w-full h-[300px]"
              resizeMode="contain"
            />
            <View className="flex flex-row items-center justify-center w-full mt-2">
              <Text className="mx-10 text-3xl font-bold text-center text-black">
                {item.title}
              </Text>
            </View>
            <Text className="mx-10 mt-3 text-center text-md text-[#777777] font-JakartaSemiBold">
              {item.description}
            </Text>
          </View>
        ))}
      </Swiper>
      <View className="w-11/12">
        <AsButton
          title={islastslide ? "Get Started" : "Next"}
          className="mt-10"
          onPress={() =>
            islastslide
              ? router.replace("/(auth)/sign-up")
              : swiperRef.current?.scrollBy(1)
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default Welcome;
