import { View } from "react-native";
import { useRouter } from "expo-router";
import { Surface, Text, IconButton, Button, useTheme, TextInput } from "react-native-paper";
import { useState } from "react";

export default function DevModal() {

    const [pingResult, setPingResult] = useState("");
    const [url, setUrl] = useState("");

    async function pingServer(){
        const res = await fetch(url, {
            method: 'GET'
        })
        if(res.ok){
            setPingResult("Server responded. Success")
        }
        else{
            setPingResult("Server didn't responde. Please check your setup again.")
        }
    }

    const { colors } = useTheme();
    const router = useRouter();

    return (

        <View className="flex-1 items-center justify-center">
            <Surface
                elevation={4}
                style={{
                    width: "65%",
                    height: 400,
                    borderRadius: 5,
                    backgroundColor: colors.secondaryContainer,
                }}
            >
                <View className="p-4">
                    <View className={'gap-4'}>
                        <Text className={'text-xl'}>Notice For Developer</Text>
                        <Text>The application is current under development. So, the API has to be hosted by the user itself.</Text>
                        <View className={'flex-row justify-between items-center'}>
                            <Text>Please follow the guide here: </Text>
                            <Button mode={'outlined'}>Visit</Button>
                        </View>
                        <View className={'gap-4'}>
                            <TextInput 
                            placeholder={'https://xyz.ngrok.free.app'}
                            mode={'outlined'}
                            label={"Server URL"}
                            value={url}
                             />
                            <Button onPress={() => {
                                pingServer();
                            }} mode={'contained'}>Submit</Button>
                        </View>

                        <Text>{pingResult}</Text>
                    </View>
                </View>
            </Surface>
        </View>
    )
}