import { Button } from '@/components/Button';
import { View, Text, TextInput } from 'react-native';

export default function Home() {
  return (
    <View className={styles.container}>
      <Text className={'text-3xl font-semibold mt-20'}>Log In</Text>
      <TextInput className={'border-b mt-8'} placeholder='Your Email' textContentType={'emailAddress'} />
      <TextInput className={'border-b mt-8'} placeholder='Your Password' textContentType={'password'} />
      <Button title={'Submit'} className='mt-20 bg-black'></Button>
    </View>
  );
}

const styles = {
  container: 'p-8',
};
