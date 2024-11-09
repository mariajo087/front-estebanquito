import { useEffect } from "react";

import { View, Text, TouchableOpacity } from "react-native";

const Toast = ({ message, isOpen, setIsOpen }) => {
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        setIsOpen(false);
      }, 3000);
    }
  }, [isOpen]);

  return (
    <View
      style={{
        position: "absolute",
        bottom: 60,
        left: 20,
        zIndex: 999,
        right: 20,
        paddingVertical: 20,
        paddingHorizontal: 20,
        backgroundColor: "#333",
        borderRadius: 5,
        display: isOpen ? "flex" : "none",
      }}
    >
      <Text className=" text-white">{message}</Text>
    </View>
  );
};
export default Toast;
