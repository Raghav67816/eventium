import { JSX, useState } from "react";
import { View, Text } from "react-native";

export type TabPage = {
    title: string,
    view: JSX.Element
}

export function TabView({ views }: { views: TabPage[] }) {
    const [currentIndex, setIndex] = useState(0);

    return (
        <View>
            <View className={"flex-row items-center gap-4 justify-center"}>
                <View className={"flex-row justify-center items-center bg-blue-500 w-[28] h-[28] rounded-full"}>
                    <Text className="text-white">{currentIndex + 1}</Text>
                </View>
                <Text className={"text-xl"}>{views.at(currentIndex)?.title}</Text>
            </View>
            <View className={"mt-8"}>{views.at(currentIndex)?.view}</View>
        </View>
    )
}
