import { View, Text, TouchableOpacity, TextInput, Image } from "react-native";
import { useState } from "react";

const Recovery = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [errors, setErrors] = useState({});

  const onRecovery = () => {
    const regexEmail = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if (username === "" || !regexEmail.test(username)) {
      setErrors({ ...errors, username: true });
      return;
    }
    navigation.navigate("login");
  };
  return (
    <View className="w-full h-screen">
      <View className="flex flex-col items-center justify-center h-full">
        <Image
          source={{
            uri: "https://images.vexels.com/media/users/3/157552/isolated/preview/b7120f4948141439cabf3ad11d361345-icono-de-banco-simple.png",
          }}
          style={{ width: 128, height: 128, marginBottom: 20 }} // Cambié 'className' por 'style'
        />

        <Text className="text-2xl font-bold">Recuperar contraseña</Text>
        <TextInput
          placeholder="Correo"
          value={username}
          onChangeText={(value) => setUsername(value)}
          className={`border-2  p-2 rounded-lg w-72 mt-4 ${
            errors.username ? "border-red-500" : "border-gray-300"
          }`}
        />
        <TouchableOpacity
          onPress={() => {
            onRecovery();
          }}
          className="bg-green-500 text-white p-2 rounded-lg w-72 mt-4"
        >
          <Text className="text-center text-xl">Recuperar contraseña</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("login")}>
          <Text className="text-blue-500 mt-4 underline text-lg">
            Volver al login
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("create")}>
          <Text className="text-blue-500 mt-4 underline text-lg">
            ¿Crear una cuenta?
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Recovery;
