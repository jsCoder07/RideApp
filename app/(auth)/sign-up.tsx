import { View, Text, ScrollView, Image, Alert } from "react-native";
import React, { useState } from "react";
import { icons, images } from "@/constants";
import InputField from "@/components/InputField";
import AsButton from "@/components/ButtonAs";
import { Link, router } from "expo-router";
import { useSignUp } from "@clerk/clerk-expo";
import OAuth from "@/components/OAuth";
import { ReactNativeModal } from "react-native-modal";
import { fetchAPI } from "../lib/fetch";
const SignUp = () => {
  const handleGoogleAuth = async () => {};
  const [form, setform] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showSuccessModal, setshowSuccessModal] = useState(false);
  const [verification, setVerification] = useState({
    state: "default",
    error: "",
    code: "",
  });
  const { isLoaded, signUp, setActive } = useSignUp();
  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        emailAddress: form.email,
        password: form.password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setVerification({
        ...verification,
        state: "pending",
      });
    } catch (err: any) {
      Alert.alert("Error", err.errors[0].longMessage);
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: verification.code,
      });

      if (completeSignUp.status === "complete") {
        // Create a Db user
        await fetchAPI("/(api)/user", {
          method: "POST",
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            clerkId: completeSignUp.createdUserId,
          }),
        });
        await setActive({ session: completeSignUp.createdSessionId });
        setVerification({ ...verification, state: "success" });
      } else {
        setVerification({
          ...verification,
          error: "Verification Failed",
          state: "failed",
        });
      }
    } catch (err: any) {
      setVerification({
        ...verification,
        error: err.errors[0].longMessage,
        state: "failed",
      });
    }
  };
  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View className="w-full h-[250px] relative">
          <Image source={images.signUpCar} className="w-full h-[250px] z-0" />
          <Text className="absolute text-2xl text-white font-JakartaSemiBold left-5 bottom-5">
            Create Your User Account
          </Text>
        </View>
        <View className="p-5">
          <InputField
            label="Name"
            labelStyle={`text-sm font-Jakarta-Light`}
            placeholder="Enter your name"
            icon="user-tag"
            iconColor="#4081EC"
            iconSet="FontAwesome6"
            iconSize={20}
            value={form.name}
            onChangeText={(value) => setform({ ...form, name: value })}
          />
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
            iconColor="#E34133"
            iconSet="FontAwesome6"
            icon="user-lock"
            iconSize={20}
            value={form.password}
            onChangeText={(value) => setform({ ...form, password: value })}
            secureTextEntry
          />
          <View className="mt-6">
            <AsButton title="Sign Up" onPress={onSignUpPress} />
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
              href="/(auth)/sign-in"
              className="mt-4 text-base text-center text-general-800"
            >
              <Text>Already have an account?</Text>
              <Text className="text-primary-500"> Log In</Text>
            </Link>
            {/* Verificattion Modal */}
            <ReactNativeModal
              isVisible={verification.state === "pending"}
              onModalHide={() => {
                if (verification.state === "success") {
                  setshowSuccessModal(true);
                }
              }}
            >
              <View className="px-7 py-9 min-h-[300px] bg-white rounded-2xl">
                <Text className="mb-2 text-2xl font-JakartaBold">
                  Verification
                </Text>
                <Text className="mb-5 font-JakartaMedium">
                  We've sent you a verification Code
                </Text>
                <InputField
                  label="Code"
                  labelStyle={`text-sm font-Jakarta-Light`}
                  placeholder="Enter your verification code"
                  iconColor="#47A34A"
                  iconSet="Fontisto"
                  icon="unlocked"
                  iconSize={20}
                  value={verification.code}
                  keyboardType="numeric"
                  onChangeText={(code) =>
                    setVerification({ ...verification, code })
                  }
                  secureTextEntry
                />
                {verification.error && (
                  <Text className="mt-1 text-sm text-red-600">
                    {verification.error}
                  </Text>
                )}
                <AsButton
                  title="Verify Email"
                  bgVariant="success"
                  onPress={onPressVerify}
                  className="mt-5 bg-success-500"
                />
              </View>
            </ReactNativeModal>
            <ReactNativeModal isVisible={showSuccessModal}>
              <View className="px-7 py-9 min-h-[300px] bg-white rounded-2xl">
                <Image
                  source={images.check}
                  className="w-[110px] h-[110px] mx-auto my-5"
                />
                <Text className="text-3xl text-center font-JakartaBold">
                  Verified
                </Text>
                <Text className="text-base text-center text-gray-400 font-JakartaSemiBold">
                  Your account has been successfully verified
                </Text>
                <View className="mt-5">
                  <AsButton
                    title="Browse DashBoard"
                    onPress={() => {
                      setshowSuccessModal(false);
                      router.push("/(root)/(tabs)/home");
                    }}
                  />
                </View>
              </View>
            </ReactNativeModal>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignUp;
