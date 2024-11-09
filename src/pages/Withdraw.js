import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";

import DebitCard from "../components/DebitCard";
import Toast from "../modals/Toast";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { updateAmount } from "../store/features/user/userSlice";
import { EXPO_PUBLIC_API_URL } from "../config";

const Withdraw = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [amount, setAmount] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [UserAuth, setUserAuth] = useState(user);

  const handleSubmit = () => {
    if (amount === "") {
      setMessage("El monto es obligatorio");
      setIsOpen(true);
      return;
    }
    if (parseInt(amount) > UserAuth.ammount) {
      setMessage("El monto a retirar es mayor al saldo disponible");
      setAmount("");
      setIsOpen(true);
      return;
    }
    axios
      .put(`${EXPO_PUBLIC_API_URL}/users/withdraw-amount`, {
        amount: parseInt(amount),
        numberAccount: UserAuth.numberAccount,
      })
      .then((response) => {
        dispatch(updateAmount(response.data.amount));
        setAmount("");
        setMessage("Retiro realizado con éxito");
        setIsOpen(true);
      })
      .catch((error) => {
        setMessage("Ocurrió un error al realizar el retiro");
        setIsOpen(true);
      });
  };

  useEffect(() => {
    setUserAuth(user);
  }, [user]);
  return (
    <View className="w-full flex h-screen px-4 pt-12 relative">
      <Toast message={message} isOpen={isOpen} setIsOpen={setIsOpen} />
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
          <Text className="text-xl font-bold mb-4">Cuanto desea retirar</Text>

          <TextInput
            placeholder="Monto a retirar"
            value={amount}
            onChangeText={setAmount}
            className="border border-gray-300 rounded p-2 mb-3"
          />

          <TouchableOpacity
            onPress={handleSubmit}
            className="bg-green-500 text-white rounded p-3 mt-4"
          >
            <Text className="text-white text-center font-semibold">
              Retirar
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Withdraw;
