import { View, Text, ScrollView, Image } from "react-native";
import React, { useState } from "react";
import { icons, images } from "@/constants";
import InputField from "@/components/InputField";
import AsButton from "@/components/ButtonAs";
import { Link, useRouter } from "expo-router";
import OAuth from "@/components/OAuth";
import { useSignIn } from "@clerk/clerk-expo";

const SignIn = () => {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();
  const handleGoogleAuth = async () => {};
  const [form, setform] = useState({
    email: "",
    password: "",
  });
  const signInPressed = React.useCallback(async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const signInAttempt = await signIn.create({
        identifier: form.email,
        password: form.password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/");
      } else {
        // See https://clerk.com/docs/custom-flows/error-handling
        // for more info on error handling
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  }, [isLoaded, form.email, form.password]);

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View className="w-full h-[250px] relative">
          <Image source={images.signInCar} className="w-full h-[250px] z-0" />
          <Text className="absolute text-2xl text-white font-JakartaSemiBold left-5 bottom-5">
            Welcome
          </Text>
        </View>
        <View className="p-5">
          <InputField
            label="Email Address"
            labelStyle={`text-sm font-Jakarta-Light`}
            placeholder="Enter your email Address"
            icon="email"
            iconSet="MaterialCommunityIcons"
            iconColor="#F3B605"
            value={form.email}
            onChangeText={(value) => setform({ ...form, email: value })}
          />

          <InputField
            label="Password"
            labelStyle={`text-sm font-Jakarta-Light`}
            placeholder="Enter your password"
            iconColor="#47A34A"
            iconSet="Fontisto"
            icon="unlocked"
            iconSize={20}
            value={form.password}
            onChangeText={(value) => setform({ ...form, password: value })}
            secureTextEntry
          />
          <View className="mt-6">
            <AsButton title="Sign In" onPress={signInPressed} />
            {/* OAuth */}
            <OAuth />
            <View className="mt-4">
              <AsButton
                title="Login with Google"
                bgVariant="outline"
                textVariant="primary-smaller"
                IconLeft={() => (
                  <Image
                    source={icons.google}
                    resizeMode="contain"
                    className="w-5 h-5 mx-2"
                  />
                )}
                onPress={handleGoogleAuth}
              />
            </View>
            <Link
              href="/(auth)/sign-up"
              className="mt-4 text-base text-center text-general-800"
            >
              <Text>Don't yet have an account?</Text>
              <Text className="text-primary-500"> Sign Up</Text>
            </Link>
            {/* Verificattion Modal */}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignIn;
