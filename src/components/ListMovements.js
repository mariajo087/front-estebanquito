import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const ListMovements = ({ movements }) => {
  const { user } = useSelector((state) => state.user);
  const getDate = (createdAt) => {
    const date = new Date(createdAt);
    return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
  };

  const transformToMoney = (value) => {
    const formatter = new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    });
    return formatter.format(value);
  };

  if (movements.length === 0) {
    return (
      <View className="w-full">
        <Text className="text-2xl font-bold text-center">
          No hay movimientos
        </Text>
      </View>
    );
  }
  return (
    <View className="w-full">
      <ScrollView
        vertical={true}
        showsVerticalScrollIndicator={false}
        className=" h-full p-2"
      >
        {movements.map((movement, index) => (
          <View
            key={index}
            className="flex flex-row justify-start mt-2 bg-pink-200 py-2 px-2 rounded-lg items-center"
          >
            <Text className="text-4xl font-bold">{movement.icon}</Text>
            <View className="ml-6">
              {user._id === movement.userId._id ? (
                <Text className="text-lg mr-2">{movement.to.name}</Text>
              ) : (
                <Text className="text-lg mr-2">{movement.userId.name}</Text>
              )}
              {user._id === movement.userId._id ? (
                <Text className="text-lg font-bold mr-2">
                  -{transformToMoney(movement.amount)}
                </Text>
              ) : (
                <Text className="text-lg font-bold mr-2">
                  +{transformToMoney(movement.amount)}
                </Text>
              )}
            </View>
            <View className="w-full flex-1 flex-row justify-end">
              <Text className="text-lg mr-2">
                {getDate(movement.createdAt)}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default ListMovements;
