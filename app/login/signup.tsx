import { Button, MD3DarkTheme, useTheme } from 'react-native-paper';
import { signUp } from '@/utils/auth';
import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import { View, ToastAndroid} from 'react-native';
import { TextInput, HelperText, Text } from 'react-native-paper';

export default function SignUp() {
    const router = useRouter();
    const { colors } = useTheme();

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

    const hasErrors = () => {
        let error = false;
        if (password.length < 6){
            error = true;
        }
        else{
            error = false;
        }
        return error
    }

    const showToast = (message: string) =>{
        ToastAndroid.showWithGravity(message, ToastAndroid.SHORT, ToastAndroid.CENTER);
    }

    return (
        <View className={'flex-1 p-16 '} style={{backgroundColor: colors.background}}>
            <Text className={'font-bold text-xl'}>Eventium</Text>
            <View className={'flex-1 justify-center gap-4'}>
                <Text className={'text-3xl font-semibold'}>Sign Up</Text>
                <View className={'gap-4'}>
                        <TextInput
                        mode={'outlined'}
                        value={name}
                        onChangeText={setName}
                        left={<TextInput.Icon icon={"text"} />}
                        placeholder='Your Full Name' />
                        
                    <TextInput
                        mode={'outlined'}
                        value={email}
                        onChangeText={setEmail}
                        left={<TextInput.Icon icon={"email"} />}
                        placeholder='Your Email'
                        textContentType={'emailAddress'} />
                    <TextInput
                        mode={'outlined'}
                        value={phone}
                        onChangeText={setPhone}
                        left={<TextInput.Icon icon={"phone"} />}
                        placeholder='Your Phone Number'
                        textContentType={'telephoneNumber'} />

                    <TextInput
                        mode={'outlined'}
                        value={password}
                        secureTextEntry
                        onChangeText={setPassword}
                        left={<TextInput.Icon icon={"lock"} />}
                        placeholder='Your Password'
                        textContentType={'password'} />
                        <HelperText type={'error'} visible={hasErrors()}>
                            Password length must be greater than 6.
                        </HelperText>
                </View>
                <View className={'gap-6 items-center'}>
                    <Button onPress={handleSignup} className={'w-1/2 h-[40]'} mode={'contained'}>Submit</Button>
                    <Link href={"/login/login"}>
                        <Text className={'underline'}>Already Have An Account ?</Text>
                    </Link>
                </View>
            </View>
        </View>
    );
}
