import { Button } from '@/components/Button';
import { signUp } from '@/utils/auth';
import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import { View, ToastAndroid, Text, TextInput } from 'react-native';

export default function SignUp() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");

    async function handleSignup() {
        const res = await signUp(
            email, name, phone, password
        );
        if(res == "success"){
            showToast("User created");
            router.replace("/login/login");
        }

        else{
            showToast("Failed to create user")
        }
    }

    const showToast = (message: string) =>{
        ToastAndroid.showWithGravity(message, ToastAndroid.SHORT, ToastAndroid.CENTER);
    }

    return (
        <View className={'flex-1 p-16 '}>
            <Text className={'font-bold text-xl'}>Eventium</Text>
            <View className={'flex-1 justify-center'}>
                <Text className={'text-3xl font-semibold mt-20'}>Sign Up</Text>
                <View className={'gap-4 mt-8'}>
                    <TextInput
                        value={name}
                        onChangeText={setName}
                        className={'bg-gray-200 rounded px-4'}
                        placeholder='Your Full Name' />
                    <TextInput
                        value={email}
                        onChangeText={setEmail}
                        className={'bg-gray-200 rounded px-4'}
                        placeholder='Your Email'
                        textContentType={'emailAddress'} />
                    <TextInput
                        value={phone}
                        onChangeText={setPhone}
                        className={'bg-gray-200 rounded px-4'}
                        placeholder='Your Phone Number'
                        textContentType={'telephoneNumber'} />

                    <TextInput
                        value={password}
                        onChangeText={setPassword}
                        className={'bg-gray-200 rounded px-4'}
                        placeholder='Your Password'
                        textContentType={'password'} />
                </View>
                <View className={'gap-6 items-center'}>
                    <Button title={'Submit'} onPress={handleSignup} className='mt-20 w-1/2 bg-black' />
                    <Link href={"/login/signup"} className={'text-md underline'}>Create New Account</Link>
                </View>
            </View>
        </View>
    );
}
