import { useState } from 'react';
import { View } from 'react-native';
import { MD3DarkTheme, Text, useTheme } from 'react-native-paper';
import { Link, useRouter } from 'expo-router';
import { requestMagicLink } from '@/utils/auth';
import { TextInput, Button } from 'react-native-paper';

export default function Login() {
  const { colors } = useTheme();

  const router = useRouter();
  const [email, setEmail] = useState("");

  // Request magic link
  async function sendRequest() {
    if (!email) {
      return;
    }
    else {
      let reqSuccess = await requestMagicLink(email);
      if (reqSuccess == true){
        router.replace({
          pathname: "/login/verifyotp",
          params: {"email": email}
        })
      }
    }
  }

  return (
    <View className={'flex-1 p-16 '} style={{backgroundColor: colors.background}} >
      <Text className={'font-bold text-xl'}>Eventium</Text>
      <View className={'flex-1 justify-center gap-8'}>
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
          <Link href={"/login/signup"}>
            <Text className={'underline'}>Create New Account</Text>
          </Link>
        </View>
      </View>
    </View>
  );
}
