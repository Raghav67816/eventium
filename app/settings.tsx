import { useRouter } from "expo-router";
import { View } from "react-native";
import { Text, Button } from "react-native-paper";

export default function SettingsPage(){
    const router = useRouter();

    return (
        <View className={'p-4'}>
            <Button mode={'contained'} onPress={() => {
                router.push("/devnotice")
            }}>Change Server URL</Button>
        </View>
    )
}