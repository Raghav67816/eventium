import { useRouter } from 'expo-router';
import { getUser } from '@/utils/auth';
import { Button } from '@/components/Button';
import { View, Text, TextInput } from 'react-native';
import { useEffect, useState } from 'react';

export default function Home() {
  const router = useRouter();
  const [isLoading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function checkUser() {
      const currentUser = await getUser();
      if(currentUser == null){
        router.replace('/screens/login');
      }
      else{
        return null;
      }
    }
    checkUser();
  }, [])

  return (
    <View className={styles.container} >
      <Text>This is the homepage, you are logged in.</Text>
    </View>
  );
}

const styles = {
  container: 'p-8',
};
