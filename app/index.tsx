import { getUrl, getUser } from '@/utils/auth';
import { useFocusEffect, useRouter } from 'expo-router';
import { View, Text } from 'react-native';
import { getEvents } from '@/utils/events';
import { useCallback, useEffect, useRef, useState } from 'react';
import EventCard from '@/components/EventCard';
import { Appbar, FAB, ActivityIndicator } from "react-native-paper";

import { useTheme } from 'react-native-paper';


export default function Home() {

  const { colors } = useTheme();
  const router = useRouter();

  const [isLoading, setLoading] = useState(true);
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const url = await getUrl();
      if (!url || url == null) {
        router.replace("/devnotice");
        return;
      }

      await checkUser();
    })();
  }, []);

  async function checkUser() {
    const currentUser = await getUser();
    if (currentUser == null) {
      router.replace('/login/login');
    }
    else {
      setLoading(true);
      const events = await getEvents();
      if (events == null) {
        setLoading(false);
        return;
      }
      setLoading(false);
      setEvents(await getEvents());
    }
  }

  function goToProfile() {
    router.replace("/profile");
  }

  function goToNewEvents() {
    router.replace("/new-event");
  }

  if (isLoading) {
    return (
      <View className='flex-1 justify-center items-center'>
        <ActivityIndicator size={"large"} animating={isLoading} />
      </View>
    )
  }

  return (
    <View style={{ backgroundColor: `${colors.background}` }} className={'flex-1'}>
      <Appbar mode={'small'} >
        <Appbar.Content title={"My Events"} titleStyle={{ fontSize: 18 }} />
        <Appbar.Action icon={'account'} onPress={goToProfile} />
        <Appbar.Action icon={'cog'} onPress={() => {
          router.push("/settings")
        }} />
      </Appbar>
      <View className={'p-8'}>
        {events.length > 0 ? (events.map((event_, index) => (
          <EventCard
            key={index}
            eventId={event_.event_id}
            event_name={event_.name}
            place={`${event_.city}, ${event_.country}`}
            venue={event_.venue}
            currentParticipants={event_.currentParticipants}
            maxParticipants={event_.maxParticipants}
            orgs={event_.organisers}
          />
        ))) : (
          <View>
            <View className={'h-5/6 items-center align-center justify-center'}>
              <Text className={'text-gray-600'}>No Events Found.</Text>
            </View>
          </View>
        )
        }
      </View>
      <View className="flex-1">
        <FAB
          icon="plus"
          onPress={goToNewEvents}
          style={{
            position: 'absolute',
            right: 16,
            bottom: 16,
          }}
        />
      </View>
    </View>
  );
}
