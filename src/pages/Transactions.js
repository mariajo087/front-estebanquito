import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { useEffect, useState } from "react";
import { updateAmount } from "../store/features/user/userSlice";

//Components
import DebitCard from "../components/DebitCard";
import ListMovements from "../components/ListMovements";
import Toast from "../modals/Toast";
import { EXPO_PUBLIC_API_URL } from "../config";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

const Transactions = ({ setIsAuth }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [stage, setStage] = useState("DEPOSIT");
  const [amount, setAmount] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [to, setTo] = useState("");
  const [UserAuth, setUserAuth] = useState(user);
  const [movements, setMovements] = useState([]);
  const [loadingMovements, setLoadingMovements] = useState(true);

  const handleSubmit = () => {
    if (amount === "") {
      setMessage("El monto es obligatorio");
      setIsOpen(true);
      return;
    }
    if (to === "") {
      setMessage("El campo para es obligatorio");
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
      .post(`${EXPO_PUBLIC_API_URL}/transaction`, {
        userId: user._id,
        to: to,
        amount: parseInt(amount),
        type: "DEPOSIT",
      })
      .then((response) => {
        dispatch(updateAmount(response.data.amount));
        setAmount("");
        setTo("");
        getMovements();
        setMessage("Depósito realizado con éxito");
        setIsOpen(true);
        setStage("DEPOSIT");
      })
      .catch((error) => {
        setMessage("Ocurrió un error al realizar el depósito");
        setIsOpen(true);
      });
  };

  const getMovements = () => {
    axios
      .get(`${EXPO_PUBLIC_API_URL}/transaction/${user._id}`)
      .then((response) => {
        setMovements(response.data);
        setLoadingMovements(false);
      })
      .catch((error) => {
        Alert.alert("Error", "Ocurrió un error al cargar los movimientos");
      });
  };

  useEffect(() => {
    getMovements();
  }, []);

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
            style={{ borderRadius: 50, width: 40, height: 40 }}
          />
        </TouchableOpacity>
      </View>
      <DebitCard UserAuth={UserAuth} />
      <View className="flex flex-row w-full mt-6 px-6 ">
        <TouchableOpacity
          onPress={() => {
            getMovements();
            setStage("DEPOSIT");
          }}
          className={`mr-6 ${
            stage === "DEPOSIT" && "border-b-2 border-green-500"
          }`}
        >
          <Text className="text-black text-2xl">Depositos</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setStage("TRANSACTIONS")}
          className={` mr-6 ${
            stage === "TRANSACTIONS" && "border-b-2 border-green-500"
          }`}
        >
          <Text className="text-black text-2xl">Transferir</Text>
        </TouchableOpacity>
      </View>
      {stage === "DEPOSIT" && (
        <View className="w-full px-2 mt-6 h-[440px]">
          {loadingMovements ? (
            <Text className="text-2xl font-bold text-center">Cargando...</Text>
          ) : (
            <ListMovements movements={movements} />
          )}
        </View>
      )}
      {stage === "TRANSACTIONS" && (
        <View className="flex flex-col w-full mt-10">
          <Toast message={message} isOpen={isOpen} setIsOpen={setIsOpen} />
          <View className="p-4">
            <Text className="text-xl font-bold mb-4">
              Cuanto desea transferir
            </Text>
            <TextInput
              placeholder="Monto a transferir"
              value={amount}
              onChangeText={setAmount}
              className="border border-gray-300 rounded p-2 mb-3"
            />
            <TextInput
              placeholder="Para"
              value={to}
              onChangeText={setTo}
              className="border border-gray-300 rounded p-2 mb-3"
            />

            <TouchableOpacity
              onPress={handleSubmit}
              className="bg-green-500 text-white rounded p-3 mt-4"
            >
              <Text className="text-white text-center font-semibold">
                Confirmar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default Transactions;
