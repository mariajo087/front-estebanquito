import { View, Text, Image, TouchableOpacity, TextInput } from "react-native";
import { useEffect, useState } from "react";

//Components
import DebitCard from "../components/DebitCard";
import ListLoans from "../components/ListLoans";
import Toast from "../modals/Toast";
import { useSelector, useDispatch } from "react-redux";
import { EXPO_PUBLIC_API_URL } from "../config";
import { updateAmount } from "../store/features/user/userSlice";
import axios from "axios";

const Loans = ({ setIsAuth }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [stage, setStage] = useState("LOANS");
  const [amount, setAmount] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [UserAuth, setUserAuth] = useState(user);
  const [loans, setLoans] = useState([]);
  const [reference, setReference] = useState("");
  const [loadingLoans, setLoadingLoans] = useState(true);

  const handleSubmit = () => {
    if (amount === "") {
      setMessage("El monto es obligatorio");
      setIsOpen(true);
      return;
    }
    if (parseInt(amount) > UserAuth.amount) {
      setMessage("El monto a pagar es mayor al saldo disponible");
      setAmount("");
      setIsOpen(true);
      return;
    }
    if (reference === "") {
      setMessage("El campo referencia es obligatorio");
      setIsOpen(true);
      return;
    }

    axios
      .put(`${EXPO_PUBLIC_API_URL}/loan`, {
        amount: parseInt(amount),
        reference: reference,
      })
      .then((response) => {
        const newAmount = UserAuth.amount - parseInt(response.data.amount);
        dispatch(updateAmount(newAmount));
        setAmount("");
        setReference("");
        setMessage("Pago realizado con éxito");
        setIsOpen(true);
      })
      .catch((error) => {
        console.log(error);
        setMessage("Ocurrió un error al realizar el pago");
        setIsOpen(true);
      });
  };

  const handleApply = () => {
    if (amount === "" || parseInt(amount) <= 0) {
      setMessage("El monto es obligatorio");
      setIsOpen(true);
      return;
    }

    axios
      .post(`${EXPO_PUBLIC_API_URL}/loan`, {
        userId: user._id,
        amount: parseInt(amount),
      })
      .then((response) => {
        dispatch(updateAmount(response.data.amount));
        setAmount("");
        setMessage("Préstamo realizado con éxito");
        setIsOpen(true);
      })
      .catch((error) => {
        setMessage("Ocurrió un error al realizar el préstamo");
        setIsOpen(true);
      });
  };

  const getLoans = () => {
    axios
      .get(`${EXPO_PUBLIC_API_URL}/loan/${user._id}`)
      .then((response) => {
        setLoans(response.data);
        setLoadingLoans(false);
      })
      .catch((error) => {
        console.log(error);
        Alert.alert("Error", "Ocurrió un error al cargar los movimientos");
      });
  };

  useEffect(() => {
    getLoans();
  }, [user]);

  useEffect(() => {
    setUserAuth(user);
  }, [user]);
  return (
    <View className="px-4 mt-12">
      <View className="flex flex-row justify-between w-full">
        <Text className="text-2xl font-bold mx-4">Hola, {UserAuth.name}</Text>
        <TouchableOpacity>
          <Image
            source={{
              uri: "https://e7.pngegg.com/pngimages/670/509/png-clipart-avatar-female-girls-avatar-purple-face-thumbnail.png",
            }}
            style={{ borderRadius: 50, width: 40, height: 40 }} // Ajusta el tamaño según necesites
          />
        </TouchableOpacity>
      </View>
      <DebitCard UserAuth={UserAuth} />
      <View className="flex flex-row w-full mt-6 px-6 ">
        <TouchableOpacity
          onPress={() => setStage("LOANS")}
          className={`mr-6 ${
            stage === "LOANS" && "border-b-2 border-green-500"
          }`}
        >
          <Text className="text-black text-2xl">Prestamos</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setStage("PAY")}
          className={` mr-6 ${
            stage === "PAY" && "border-b-2 border-green-500"
          }`}
        >
          <Text className="text-black text-2xl">Pagar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setStage("APPLYLOAN")}
          className={` mr-6 ${
            stage === "APPLYLOAN" && "border-b-2 border-green-500"
          }`}
        >
          <Text className="text-black text-2xl">Solicitar</Text>
        </TouchableOpacity>
      </View>
      {stage === "LOANS" && (
        <View className="w-full px-2 mt-6 h-[440px]">
          <ListLoans loans={loans} />
        </View>
      )}
      {stage === "APPLYLOAN" && (
        <View className="flex flex-col w-full mt-10">
          <Toast message={message} isOpen={isOpen} setIsOpen={setIsOpen} />
          <View className="p-4">
            <Text className="text-xl font-bold mb-4">
              Cuanto desea solicitar
            </Text>

            <TextInput
              placeholder="Monto a prestar"
              value={amount}
              onChangeText={setAmount}
              className="border border-gray-300 rounded p-2 mb-3"
            />

            <TouchableOpacity
              onPress={handleApply}
              className="bg-green-500 text-white rounded p-3 mt-4"
            >
              <Text className="text-white text-center font-semibold">
                Solicitar préstamo
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      {stage === "PAY" && (
        <View className="flex flex-col w-full mt-10">
          <Toast message={message} isOpen={isOpen} setIsOpen={setIsOpen} />
          <View className="p-4">
            <Text className="text-xl font-bold mb-4">Cuanto desea pagar</Text>

            <TextInput
              placeholder="Monto a pagar"
              value={amount}
              onChangeText={setAmount}
              className="border border-gray-300 rounded p-2 mb-3"
            />

            <TextInput
              placeholder="Referencia de pago"
              value={reference}
              onChangeText={setReference}
              className="border border-gray-300 rounded p-2 mb-3"
            />

            <TouchableOpacity
              onPress={handleSubmit}
              className="bg-green-500 text-white rounded p-3 mt-4"
            >
              <Text className="text-white text-center font-semibold">
                Confirmar pago
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default Loans;
