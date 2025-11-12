import EventCard from '@/components/EventCard';
import { useRouter } from 'expo-router';
import { getUser } from '@/utils/auth';
import { View, Text } from 'react-native';
import { useEffect, useState } from 'react';
import { signOut } from '@/utils/auth';
import { getEvents } from '@/utils/events';
import { Button } from '@/components/Button';

export default function Home() {
  const router = useRouter();
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    async function checkUser() {
      const currentUser = await getUser();
      // inetetionally setting it null, forcing router to go to login.
      if (currentUser == null) {
        router.replace('/login/login');
      }
      else {
        setEvents(await getEvents());
      }
    }
    checkUser();
  }, [])

  async function handleSignOut() {
    signOut();
    router.replace("/login/login");
  }

  function goToNewEvent(){
    router.replace("/new-event")
  }

  return (
    <View className={'p-8 gap-8'} >
      <View className={'flex-row justify-between item-center'}>
        <Text className={'text-xl font-semibold mt-4 mb-4'}>My Events</Text>
        <Button title={'New Event'} onPress={handleSignOut} ></Button>
      </View>
      {events.map((event_, index) => (
        <EventCard
          key={index}
          eventId={event_.id}
          event_name={event_.name}
          place={event_.country_city}
          venue={event_.venue}
          currentParticipants={event_.current_participants}
          maxParticipants={event_.max_participants}
        />
      ))}
    </View>
  );
}
