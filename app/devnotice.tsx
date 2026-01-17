import { useState } from "react";
import { View } from "react-native";
import { setUrl } from "@/utils/auth";
import { useRouter } from "expo-router";
import { Text, Button, useTheme, TextInput } from "react-native-paper";

import * as Linking from 'expo-linking';

export default function DevModal() {
    const [pingResult, setPingResult] = useState("");
    const [url, setUrl_] = useState("");
    const { colors } = useTheme();
    const router = useRouter();

    const guideUrl = "https://github.com/Raghav67816/eventium";

    async function openGuide(){
        if (await Linking.canOpenURL(guideUrl)){
            await Linking.openURL(guideUrl)
        }
    }

    async function pingServer() {
        const res = await fetch(url);
        if (res.ok) {
            setUrl(url);
            console.log(typeof(url))
            setPingResult("Server responded. Success");
            router.replace("/");
        } else {
            setPingResult("Server didn't respond. Please check your setup again.");
        }
    }

    return (
        <View className="flex-1 items-center justify-center px-4" style={{ backgroundColor: colors.secondaryContainer }}>

            <View className="gap-4 w-[80%]">
                <Text className="text-xl text-center">Notice For Developer</Text>

                <Text className="text-center">
                    The application is currently under development. So, the API has to be hosted by the user itself.
                </Text>

                <View className="flex-row items-center gap-2">
                    <Text>Please follow the guide here:</Text>
                    <Button mode="outlined" onPress={openGuide}>Visit</Button>
                </View>

                <TextInput
                    mode="outlined"
                    label="Server URL"
                    value={url}
                    onChangeText={setUrl_}
                />

                <Button mode="contained" onPress={pingServer}>
                    Submit
                </Button>

                <Text className="text-center">{pingResult}</Text>
            </View>

        </View>
    );
}
