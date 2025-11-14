import { View, Text } from "react-native"
import { Button } from "@/components/Button";
import * as SecureStore from 'expo-secure-store';
import { useRouter } from "expo-router";

export default function Profile(){

    const router = useRouter();

    function handleSignOut(){
        SecureStore.deleteItemAsync("access_token");
        SecureStore.deleteItemAsync("name");
        SecureStore.deleteItemAsync("email");
        router.replace("/login/login");
    }

    function goToEvents(){
        router.replace("/");
    }

    return (
        <View className={"p-8"}>
            <View className={"flex-row items-center justify-between"}>
                <Text>Profile</Text>
                <Button title={"Sign Out"} onPress={handleSignOut}></Button>
                <Button title={"Go Back"} onPress={goToEvents}></Button>
            </View>
        </View>
    )
}