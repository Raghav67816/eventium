import EventCard from '@/components/EventCard';
import { useRouter } from 'expo-router';
import { getUser } from '@/utils/auth';
import { View, Text } from 'react-native';
import { useEffect, useState } from 'react';
import { signOut } from '@/utils/auth';
import { getEvents } from '@/utils/events';

export default function Home() {
  const router = useRouter();
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    async function checkUser() {
      const currentUser = await getUser();
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

  return (
    <View className={'p-8 gap-8'} >
      <Text className={'text-xl font-semibold mt-4 mb-4'}>My Events</Text>
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
