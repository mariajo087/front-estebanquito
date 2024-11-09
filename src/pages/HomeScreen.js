import { View, Text, Image, TouchableOpacity } from "react-native";
import axios from "axios";
import { EXPO_PUBLIC_API_URL } from "../config";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { clear } from "../store/features/user/userSlice";

//Components
import DebitCard from "../components/DebitCard";
import ListMovements from "../components/ListMovements";

const HomeScreen = ({ setIsAuth }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [UserAuth, setUserAuth] = useState(user);
  const [movements, setMovements] = useState([]);
  const [loadingMovements, setLoadingMovements] = useState(true);

  useEffect(() => {
    axios
      .get(`${EXPO_PUBLIC_API_URL}/transaction/${user._id}`)
      .then((response) => {
        setMovements(response.data);
        setLoadingMovements(false);
      })
      .catch((error) => {
        console.log(error);
        setLoadingMovements(false);
      });
  }, [user]);

  useEffect(() => {
    setUserAuth(user);
  }, [user]);

  return (
    <View className="px-4 mt-12">
      <View className="flex flex-row justify-between w-full">
        <Text className="text-2xl font-bold mx-4">Hola, {UserAuth.name}</Text>
        <TouchableOpacity
          onPress={() => {
            dispatch(clear());
            setIsAuth(false);
          }}
        >
          <Image
            source={{
              uri: "https://e7.pngegg.com/pngimages/670/509/png-clipart-avatar-female-girls-avatar-purple-face-thumbnail.png",
            }}
            style={{ borderRadius: 50, width: 40, height: 40 }} // Ajusta el tamaño según necesites
          />
        </TouchableOpacity>
      </View>
      <DebitCard UserAuth={UserAuth} />
      <View className="w-full px-2 mt-6 h-[460px]">
        <View className="flex flex-row justify-between mt-2 ml-2">
          <Text className="text-xl font-bold text-balck">HOY</Text>
        </View>
        {loadingMovements ? (
          <Text className="text-2xl font-bold text-center">Cargando...</Text>
        ) : (
          <ListMovements movements={movements} />
        )}
      </View>
    </View>
  );
};

export default HomeScreen;
