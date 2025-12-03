import { Button } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { Card, Text, Icon } from 'react-native-paper';
import { View } from 'react-native';

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

  function onPress__() {
    router.replace({
      pathname: "/event-page",
      params: {
        eventName: event_name,
        eventId: eventId
      }
    })
  }

  const router = useRouter();

  return (
    <Card className={'w-1/2'}>
      <Card.Title title={event_name} titleVariant={'bodyLarge'} />
      <Card.Content className={'gap-2'}>
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
      </Card.Content>
      <Card.Actions>
          <Button mode={'contained'} onPress={onPress__}>Manage</Button>
      </Card.Actions>
    </Card>
  )
}
