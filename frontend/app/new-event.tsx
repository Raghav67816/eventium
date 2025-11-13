import { View, Text, TextInput } from "react-native";
import { TabView, TabPage } from "@/components/TabView";
import RadioButton from "@/components/RadioButton";


export default function NewEvent(){

    const generalInfo: TabPage = {
        title: "General",
        view: (
            <View className={"gap-4"}>
                <View className="flex-row items-center justify-between">
                    <Text className={"w-1/6"}>Event Name: </Text>
                    <TextInput 
                    className={"flex-1 px-4 bg-gray-200"}
                    placeholder={"Scrapyard, Daydream, Counterspell..."} 
                    />
                </View>
                <View className="flex-row items-center justify-between">
                    <Text className={"w-1/6"}>Event Duration: </Text>
                    <View>
                        <RadioButton text={"Hello world"} />      
                    </View>
                </View>
            </View>
        )
    }
    
    return (
        <View className={'p-8'}>
            <TabView views={[generalInfo]} />
        </View>
    )
}