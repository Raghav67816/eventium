import { View } from "react-native";
import { Card, Text, Icon } from "react-native-paper";

export type Participant = {
  id: string,
  name: string,
  email: string,
  phone: string,
  age: string
}

export default function ParticipantCard({ id, name, email, phone, age }: Participant) {
  const pid = id;

  function onRemovePressed() {
  }

  return (
    // <View className="bg-blue-600 rounded-2xl p-4 w-full min-h-[140px] max-h-[140px] justify-between">
    //   <View>
    //     <View className={"flex-row justify-between"}>
    //       <Text className="font-semibold text-lg text-white">{name}</Text>
    //     </View>
    //     <Text className="font-light text-sm text-white mt-1">{age} yrs</Text>
    //   </View>

    //   <View className="mt-2">
    //     <Text className="font-light underline text-sm text-white">{phone}</Text>
    //     <Text className="font-light text-sm text-white">{email}</Text>
    //   </View>
    // </View>

    <Card mode={'contained'}>
      <Card.Title title={name} />
      <Card.Content>
        <View className="gap-2">
          <View className="flex-row gap-2">
            <Icon source={'phone'} size={18} />
            <Text className="font-light underline text-sm text-white">{phone}</Text>
          </View>

          <View className="flex-row gap-2">
            <Icon source={'baby-face'} size={18} />
            <Text className="font-light text-sm text-white">{age}</Text>
          </View>

          <View className="flex-row gap-2">
            <Icon source={'email'} size={18} />
            <Text className="font-light text-sm text-white">{email}</Text>
          </View>
        </View>
      </Card.Content>
    </Card>
  );
}

