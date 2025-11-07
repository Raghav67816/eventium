import { useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native"
import IconButton from "@/components/IconButton";

export default function EventPage() {
    const { eventName, eventId } = useLocalSearchParams();
    function sample() {
        console.log("Hello, WOrld");
    }
    return (
        <View className={'p-8'}>
            <View className={"flex-row justify-between py-4 border-b"}>
                <View className={"flex-row gap-4 items-center"}>
                    <IconButton iconName={"arrow-back"} iconSize={18} onPressExec={sample} />
                    <Text className={"font-semibold text-xl"}>{eventName}</Text>
                </View>
                <View className={"flex-row gap-4 self-right"}>
                    <IconButton iconName={"people"} iconSize={24} onPressExec={sample} />
                    <IconButton iconName={"settings"} iconSize={24} onPressExec={sample} />
                </View>
            </View>
        </View>
    )
}