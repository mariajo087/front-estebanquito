import { View, Text, ScrollView } from "react-native";

const ListLoans = ({ loans }) => {
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

  if (loans.length === 0) {
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
        {loans.map((loan, index) => {
          console.log(loan);
          if (loan.status !== "PAID") {
            return (
              <View
                key={index}
                className="flex flex-row justify-start mt-2 bg-pink-200 py-2 px-2 rounded-lg items-center"
              >
                <Text className="text-4xl font-bold">{loan.icon}</Text>
                <View className="ml-4">
                  <Text className="text-md mr-2">REF:{loan.reference}</Text>
                  <Text className="text-lg font-bold mr-2">
                    {transformToMoney(loan.amount)}
                  </Text>
                </View>
                <View className="w-full flex-1 flex-row justify-end">
                  <Text className="text-lg mr-2">
                    {getDate(loan.createdAt)}
                  </Text>
                </View>
              </View>
            );
          }
        })}
      </ScrollView>
    </View>
  );
};

export default ListLoans;
