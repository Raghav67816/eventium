import { Button } from '@/components/Button';
import { View, Text, TextInput } from 'react-native';

export default function Login() {
  return (
    <View className={'flex-1 p-16 '}>
      <Text className={'font-bold text-xl'}>Eventium</Text>
      <View className={'flex-1 justify-center'}>
        <Text className={'text-3xl font-semibold mt-20'}>Log In</Text>
        <TextInput className={'border-b mt-8'} placeholder='Your Email' textContentType={'emailAddress'} />
        <Text className={'mt-5'}>We will send you a magic link. Check your email</Text>
        <Button title={'Submit'} className='mt-20 bg-black'></Button>
      </View>
    </View>
  );
}
