import { useLocalSearchParams } from "expo-router";
import { View, Text, Button} from "react-native"
import Ionicons from '@expo/vector-icons/Ionicons';
import IconButton from "@/components/IconButton";

export default function EventPage(){
    const { eventName, eventId } = useLocalSearchParams();
    function sample(){
        console.log("Hello, WOrld");
    }
    return (
        <View className={'p-8'}>
            <View className={"flex-row items-center gap-4"}>
                <IconButton iconName={"arrow-back"} iconSize={18} onPressExec={sample} ></IconButton>
                <Text className={'text-xl font-semibold'}>{eventName || "Loading.."}</Text>
                <View>
                    <IconButton iconSize={24} iconName={"people"}></IconButton>
                    <IconButton iconSize={24} iconName={"gear"}></IconButton>
                </View>
            </View>
        </View>
    )
}