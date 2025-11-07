import { useRouter } from 'expo-router';
import { getUser } from '@/utils/auth';
import { View, Text } from 'react-native';
import { useEffect, useState } from 'react';
import { signOut } from '@/utils/auth';
import { Button } from '@/components/Button';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    async function checkUser() {
      const currentUser = await getUser();
      if(currentUser == null){
        router.replace('/login/login');
      }
      else{
        return null;
      }
    }
    checkUser();
  }, [])

  async function handleSignOut(){
      signOut();
      router.replace("/login/login");
  }

  return (
    <View className={styles.container} >
      <Text>This is the homepage, you are logged in.</Text>
      <Button title={'Sign Out'} onPress={handleSignOut} />
    </View>
  );
}

const styles = {
  container: 'p-8',
};
