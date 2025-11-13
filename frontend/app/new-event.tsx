import { View, Text, TextInput, Modal } from "react-native";
import { TabView, TabPage } from "@/components/TabView";
import RadioButton from "@/components/RadioButton";
import DateTimePicker, { DateType, useDefaultStyles } from 'react-native-ui-datepicker';
import { useState } from "react";
import IconButton from "@/components/IconButton";


export default function NewEvent() {

    const defaultStyles = useDefaultStyles();
    const [selected, setSelected] = useState<DateType>();
    const [isDateModalOpen, setDateModalOpen] = useState(false);

    function toggleDateModal() {
        setDateModalOpen(!isDateModalOpen);
    }

    function foo(){
        console.log("foo");
    }

    const generalInfo: TabPage = {
        title: "General",
        view: (
            <View className={"gap-4"}>
                <Modal visible={isDateModalOpen} animationType="slide" transparent={true} >
                    <View className={"flex-1 justify-center items-center bg-black/50"}>
                        <View>
                            <Text className={"text-xl font-semibold"}>Select Date</Text>
                            <IconButton
                            onPressExec={foo}
                            iconName={"arrow-back"}
                            iconSize={18}
                            iconColor={"#000"}
                             />
                        </View>
                        <DateTimePicker
                            mode="single"
                            date={selected}
                            onChange={({ date }) => setSelected(date)}
                            styles={defaultStyles}
                        />
                    </View>
                </Modal>
                <View className="flex-row items-center justify-between">
                    <Text className={"w-1/6"}>Event Name: </Text>
                    <TextInput
                        className={"flex-1 px-4 bg-gray-200"}
                        placeholder={"Scrapyard, Daydream, Counterspell..."}
                    />
                </View>
                <View className="flex-row items-center justify-between">
                    <Text className={"w-1/6"}>Event Duration: </Text>
                    <View className={"flex-row"}>
                        <RadioButton text={"12 hrs"} />
                        <RadioButton text={"24 hrs"} />
                        <RadioButton text={"48 hrs"} />
                        <RadioButton text={"86 hrs"} />
                        <RadioButton text={"Custom"} />
                    </View>
                </View>
                <View className="flex-row items-center justify-between">
                    <Text className={"w-1/6"}>Event Dates: </Text>
                    <View className={"flex-row gap-4"}>
                        <TextInput
                            className={"w-[50%] px-4 bg-gray-200"}
                            placeholder={"From"}
                            onPress={toggleDateModal}
                        />
                        <TextInput
                            className={"w-[40%] px-4 bg-gray-200"}
                            placeholder={"To"}
                        />
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