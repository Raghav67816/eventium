import EventCard from '@/components/EventCard';
import { useRouter } from 'expo-router';
import { getUser } from '@/utils/auth';
import { View, Text } from 'react-native';
import { useEffect, useState } from 'react';
import { signOut } from '@/utils/auth';
import { Button } from '@/components/Button';
import { getEvents } from '@/utils/events';

export default function Home() {
  const router = useRouter();
  const [events, setEvents] = useState({});

  useEffect(() => {
    async function checkUser() {
      const currentUser = await getUser();
      if(currentUser == null){
        router.replace('/login/login');
      }
      else{
        setEvents(await getEvents());
      }
    }
    checkUser();
  }, [])

  async function handleSignOut(){
      signOut();
      router.replace("/login/login");
  }

  return (
    <View className={'p-8 gap-8'} >
      <EventCard
        event_name={"Daydream Delhi"}
        eventId={1234}
        maxParticipants={100}
        currentParticipants={50}
        place={'Delhi, India'}
        venue={"IIT Delhi, Hauz Khas"}
       />
       <EventCard
        event_name={"Daydream Delhi"}
        eventId={1234}
        maxParticipants={100}
        currentParticipants={50}
        place={'Delhi, India'}
        venue={"IIT Delhi, Hauz Khas"}
       />
    </View>
  );
}
