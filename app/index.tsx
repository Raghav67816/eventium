import EventCard from '@/components/EventCard';
import { useRouter } from 'expo-router';
import { getUser } from '@/utils/auth';
import { View, Text } from 'react-native';
import { Link } from 'expo-router';
import { useEffect, useState } from 'react';
import { signOut } from '@/utils/auth';
import { getEvents } from '@/utils/events';
import { Appbar, FAB } from "react-native-paper"


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
        const events = await getEvents();
        if (events == null) {
          return;
        }
        setEvents(await getEvents());
      }
    }
    checkUser();
  }, [])

  async function handleSignOut() {
    signOut();
    router.replace("/login/login");
  }

  function goToProfile() {
    router.replace("/profile");
  }

  function goToNewEvents() {
    router.replace("/new-event");
  }

  return (
    <View>
      <Appbar mode={'small'} >
        <Appbar.Content title={"My Events"} titleStyle={{ fontSize: 18 }} />
        <Appbar.Action icon={'account'} onPress={goToProfile} />
      </Appbar>
      <View className={'p-8'}>
        {events.length > 0 ? (events.map((event_, index) => (
          <EventCard
            key={index}
            eventId={event_.id}
            event_name={event_.name}
            place={event_.country_city}
            venue={event_.venue}
            currentParticipants={event_.current_participants}
            maxParticipants={event_.max_participants}
          />
        ))) : (
          <View>
            <View className={'h-5/6 items-center align-center justify-center'}>
              <Text className={'text-gray-600'}>No Events Found.</Text>
            </View>
            <FAB
              onPress={goToNewEvents}
              icon={'plus'}
              style={{
                position: 'absolute',
                margin: 16,
                right: 0,
                bottom: 0
              }}
            />
          </View>
        )
        }
      </View>
    </View>
  );
}
