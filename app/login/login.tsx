import { requestMagicLink } from '@/utils/auth';
import { Link, router, useRouter } from 'expo-router';
import { useState } from 'react';
import { View, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';

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
      <View className={'flex-1 justify-center gap-16'}>
        <Text className={'text-3xl font-semibold'}>Log In</Text>
        <TextInput 
          mode={'outlined'}
          value={email} 
          onChangeText={setEmail} 
          label={"Email"}
          left={<TextInput.Icon icon={"email"}></TextInput.Icon>}
          textContentType={'emailAddress'} />
        <Text>We will send you a magic link. Check your email</Text>
        <View className={'gap-6 items-center'}>
          <Button mode={'contained'} className='w-1/2 h-[40]' onPress={sendRequest}>Submit</Button>
          <Link href={"/login/signup"} className={'text-md underline'}>Create New Account</Link>
        </View>
      </View>
    </View>
  );
}
