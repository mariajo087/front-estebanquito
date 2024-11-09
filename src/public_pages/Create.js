import { View, Text, TouchableOpacity, TextInput, Image } from "react-native";
import { useState } from "react";

const Create = ({ setIsAuth, navigation }) => {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const onLogin = () => {
    const regexEmail = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if (username === "" || !regexEmail.test(username)) {
      setErrors({ ...errors, username: true });
      return;
    }
    if (password === "" || password.length < 3) {
      setErrors({ ...errors, password: true });
      return;
    }
    if (fullName === "") {
      setErrors({ ...errors, fullName: true });
      return;
    }
    setIsAuth(true);
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

        <Text className="text-2xl font-bold">Crear cuenta</Text>
        <TextInput
          placeholder="Nombre completo"
          value={fullName}
          onChangeText={(value) => setFullName(value)}
          className={`border-2  p-2 rounded-lg w-72 mt-4 ${
            errors.username ? "border-red-500" : "border-gray-300"
          }`}
        />
        <TextInput
          placeholder="Correo"
          value={username}
          onChangeText={(value) => setUsername(value)}
          className={`border-2  p-2 rounded-lg w-72 mt-4 ${
            errors.username ? "border-red-500" : "border-gray-300"
          }`}
        />
        <TextInput
          placeholder="Contraseña"
          value={password}
          onChangeText={(value) => setPassword(value)}
          className={`border-2  p-2 rounded-lg w-72 mt-4 ${
            errors.username ? "border-red-500" : "border-gray-300"
          }`}
        />
        <TouchableOpacity
          onPress={() => {
            onLogin();
          }}
          className="bg-green-500 text-white p-2 rounded-lg w-72 mt-4"
        >
          <Text className="text-center text-xl">Iniciar sesión</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("login")}>
          <Text className="text-blue-500 mt-4 underline text-lg">
            ¿Volver al login?
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Create;
