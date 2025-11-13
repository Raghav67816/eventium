import EventCard from '@/components/EventCard';
import { useRouter } from 'expo-router';
import { getUser } from '@/utils/auth';
import { View, Text } from 'react-native';
import { Link } from 'expo-router';
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
      if (currentUser == null) {
        router.replace('/login/login');
      }
      else {
        const events = await getEvents();
        if(events == null){
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

  function goToProfile(){
    router.replace("/profile")
  }

  return (
    <View className={'p-8 gap-8'} >
      <View className={'flex-row justify-between item-center'}>
        <Text className={'text-xl font-semibold mt-4 mb-4'}>My Events</Text>
        <Button title={'My Account'} onPress={goToProfile} ></Button> 
      </View>
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
      ))): (
        <View className={'h-5/6 items-center align-center justify-center'}>
          <Text className={'text-gray-600'}>No Events Found.</Text>
          <Link className={'underline text-gray-600'} href={"/new-event"}>Create New Event</Link>
        </View>
      )
    }
    </View>
  );
}
