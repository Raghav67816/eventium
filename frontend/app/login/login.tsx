import { Button } from '@/components/Button';
import { requestMagicLink } from '@/utils/auth';
import { router, useRouter } from 'expo-router';
import { useState } from 'react';
import { View, Text, TextInput } from 'react-native';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  // sendRequest
  // wrap requestMagicLink function
  async function sendRequest() {
    if (!email) {
      return;
    }
    else {
      let res = await requestMagicLink(email);
      if (res == "success"){
        console.log("chaning page");
        router.replace({
          pathname: "/login/verifyotp",
          params: {"email": email}
        })
      }
    }
  }

  return (
    <View className={'flex-1 p-16 '}>
      <Text className={'font-bold text-xl'}>Eventium</Text>
      <View className={'flex-1 justify-center'}>
        <Text className={'text-3xl font-semibold mt-20'}>Log In</Text>
        <TextInput 
          value={email} 
          onChangeText={setEmail} 
          className={'border-b mt-8'} 
          placeholder='Your Email' 
          textContentType={'emailAddress'} />
        <Text className={'mt-5'}>We will send you a magic link. Check your email</Text>
        <Button title={'Submit'} className='mt-20 bg-black' onPress={sendRequest} />
      </View>
    </View>
  );
}
