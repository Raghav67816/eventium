import { View } from 'react-native';
import { useRouter } from 'expo-router';
import { Text, Icon } from 'react-native-paper';
import { Button, Surface } from 'react-native-paper';

type EventCardProps = {
  event_name: string,
  place: string,
  maxParticipants: number,
  eventId: number,
  venue: string,
  currentParticipants: number,
  orgs: Array<Object>
};

export default function EventCard({
  event_name,
  place,
  venue,
  maxParticipants,
  eventId,
  currentParticipants,
  orgs
}: EventCardProps) {

  function onPress__() {
    router.replace({
      pathname: "/event-page",
      params: {
        eventName: event_name,
        eventId: eventId.toString(),
        organisers: JSON.stringify(organisers_)
      }
    })
  }

  const router = useRouter();
  const organisers_ = orgs;

  return (
    <Surface elevation={2} className={'w-1/2'} style={{borderRadius: 5}}>
      <View className="p-4 items-center">
        <Text className="text-2xl text-center">
          {event_name.toUpperCase()}
        </Text>
      </View>
      <View className={'p-4 gap-2'}>
        <View className={'gap-2 flex-row items-center'}>
          <Icon source={"earth"} size={20} />
          <Text className={'text-lg text-gray'}>
            {place}
          </Text>
        </View>

        <View className={'gap-2 flex-row items-center'}>
          <Icon source={"account-multiple"} size={20} />
          <Text className={'text-lg text-gray'}>
            {currentParticipants} of {maxParticipants}
          </Text>
        </View>


        <View className={'gap-2 flex-row items-center'}>
          <Icon source={"map-marker"} size={20} />
          <Text className={'text-lg text-gray'}>
            {venue}
          </Text>
        </View>
        <Button onPress={onPress__} mode={'contained'}>Manage</Button>
      </View>
    </Surface>
  )
}
