import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import DebitCard from "../components/DebitCard";
import { updateAmount } from "../store/features/user/userSlice";
import { EXPO_PUBLIC_API_URL } from "../config";

const Deposit = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [amount, setAmount] = useState("");
  const [myAccount, setMyAccount] = useState("");
  const [UserAuth, setUserAuth] = useState(user);

  const handleSubmit = () => {
    const regexNumber = /^[0-9]*$/;
    if (
      !amount ||
      !myAccount ||
      amount === "" ||
      myAccount === "" ||
      !regexNumber.test(amount)
    ) {
      Alert.alert("Error", "Todos los campos son obligatorios");
      return;
    }

    axios
      .put(`${EXPO_PUBLIC_API_URL}/users/update-my-amount`, {
        amount: parseInt(amount),
        numberAccount: myAccount,
      })
      .then((response) => {
        dispatch(updateAmount(response.data.amount));
        Alert.alert("Éxito", "Depósito realizado con éxito");
        setAmount("");
        setMyAccount("");
      })
      .catch((error) => {
        Alert.alert("Error", "Ocurrió un error al realizar el depósito");
      });
  };

  useEffect(() => {
    setUserAuth(user);
  }, [user]);

  return (
    <View className="w-full flex h-screen px-4 pt-12">
      <View className="flex flex-row justify-between w-full">
        <Text className="text-2xl font-bold mx-4">Hola, {UserAuth.name}</Text>
        <View>
          <Image
            source={{
              uri: "https://e7.pngegg.com/pngimages/670/509/png-clipart-avatar-female-girls-avatar-purple-face-thumbnail.png",
            }}
            style={{ borderRadius: 50, width: 40, height: 40 }} // Ajusta el tamaño según necesites
          />
        </View>
      </View>
      <DebitCard UserAuth={UserAuth} />
      <View className="flex flex-col w-full mt-10">
        <View className="p-4">
          <Text className="text-xl font-bold mb-4">Recarga tu cuenta</Text>

          <TextInput
            placeholder="Monto a depositar"
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
            className="border border-gray-300 rounded p-2 mb-3"
          />

          <TextInput
            placeholder="Mi cuenta"
            value={myAccount}
            onChangeText={setMyAccount}
            className="border border-gray-300 rounded p-2 mb-3"
          />

          <TouchableOpacity
            onPress={handleSubmit}
            className="bg-green-500 text-white rounded p-3 mt-4"
          >
            <Text className="text-white text-center font-semibold">
              Depositar
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Deposit;
