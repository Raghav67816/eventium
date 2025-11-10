import { View, Text } from "react-native";

export type Participant = {
    id: string,
    email: string,
    phone: string,
    age: string
}

export default function ParticipantCard({ id, email, phone, age }: Participant) {
  return (
    <View className="bg-blue-600 rounded-2xl p-4 w-full min-h-[140px] max-h-[140px] justify-between">
      <View>
        <Text className="font-semibold text-lg text-white">{id}</Text>
        <Text className="font-light text-sm text-white mt-1">{age} yrs</Text>
      </View>

      <View className="mt-2">
        <Text className="font-light underline text-sm text-white">{phone}</Text>
        <Text className="font-light text-sm text-white">{email}</Text>
      </View>
    </View>
  );
}

