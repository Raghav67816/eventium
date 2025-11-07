import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { View, Text, Pressable } from "react-native";

type EventCardProps = {
  event_name: string;
  place: string;
  maxParticipants: number;
  eventId: number;
  venue: string,
  currentParticipants: number;
};

export default function EventCard({
  event_name,
  place,
  venue,
  maxParticipants,
  eventId,
  currentParticipants,
}: EventCardProps) {

    function onPress__(){
        router.replace({
            pathname: "/event",
            params: {
                eventName: event_name,
                eventId: eventId
            }
        })
    }

    const router = useRouter();

  return (
    <View className={'shadow rounded rounded p-8'}>
      <Pressable onPress={onPress__}>
        <Text className={"font-bold text-2xl"}>{event_name}</Text>
        <View className={'mt-8 gap-2'}>
            <View className={'gap-2 flex-row items-center'}>
                <Ionicons name={'location-outline'} color={'grey'} size={18}></Ionicons>
                <Text className={'text-lg text-gray'}>
                    {place}
                </Text>
            </View>
            
            <View className={'gap-2 flex-row items-center'}>
                <Ionicons name={'people'} color={'grey'} size={18}></Ionicons>
                <Text className={'text-lg text-gray'}>
                    {currentParticipants} of {maxParticipants}
                </Text>
            </View>
            <View className={'gap-2 flex-row items-center'}>
                <Ionicons name={'business'} color={'grey'} size={18}></Ionicons>
                <Text className={'text-lg text-gray'}>
                    {venue}
                </Text>
            </View>
        </View>
      </Pressable>
    </View>
  );
}
