import { useRouter } from "expo-router";
import { View } from "react-native";
import { Text, Button } from "react-native-paper";

export default function SettingsPage(){
    const router = useRouter();

    return (
        <View>
            <Button onPress={() => {
                router.replace("/settings")
            }}>Change Server URL</Button>
        </View>
    )
}