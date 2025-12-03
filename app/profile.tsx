import { View, Text } from "react-native"
import { Button } from "@/components/Button";
import * as SecureStore from 'expo-secure-store';
import { useRouter } from "expo-router";
import IconButton from "@/components/IconButton";

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
                <View className={"flex-row items-center gap-4"}>
                    <IconButton iconName={"close"} iconColor="black" iconSize={16} onPressExec={goToEvents} ></IconButton>
                    <Text className={"text-lg font-semibold"}>Profile</Text>
                </View>
                <Button title={"Sign Out"} onPress={handleSignOut}></Button>
            </View>
        </View>
    )
}