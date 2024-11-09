import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";

const DebitCard = ({ UserAuth }) => {
  const [isFront, setIsFront] = useState(true);
  const transformToMoney = (value) => {
    const formatter = new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    });
    return formatter.format(value);
  };

  return (
    <>
      {isFront ? (
        <TouchableOpacity
          className="w-full px-6  h-60 mt-6"
          onPress={() => {
            setIsFront(!isFront);
          }}
        >
          <View className="rounded-2xl bg-black h-full p-2">
            <View className="flex flex-row justify-between mt-2 ml-2">
              <Text className="text-xl font-bold text-white">Debit Card</Text>
            </View>
            <View className="flex flex-row justify-between mt-2 ml-2 ">
              <Text className="text-3xl font-bold">💳</Text>
              <Text className="text-3xl font-bold mr-2">📡</Text>
            </View>
            <View className="flex flex-row justify-center mt-8">
              <Text className="text-3xl font-bold text-white">
                {UserAuth.numberAccount}
              </Text>
            </View>
            <View className="flex flex-row justify-between mt-8 px-6">
              <Text className="text-3xl font-bold text-white">
                {transformToMoney(UserAuth.amount)}
              </Text>
              <Text className="text-lg font-bold text-white">
                {UserAuth.expirationDate}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          className="w-full px-6  h-60 mt-6"
          onPress={() => {
            setIsFront(!isFront);
          }}
        >
          <View className="rounded-2xl bg-black h-full p-2">
            <View className="flex flex-row justify-between mt-8 bg-white h-8"></View>
            <View className="flex flex-row justify-end mt-4  bg-white h-5 w-1/2 items-center">
              <Text className="text-lg font-bold text-balck mr-2">
                {UserAuth.cvv}
              </Text>
            </View>
            <View className="flex flex-row justify-center mt-12">
              <Text className="text-3xl font-bold text-white">
                {UserAuth.name}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      )}
    </>
  );
};

export default DebitCard;
