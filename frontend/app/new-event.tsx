import { View, Text, TextInput, Modal } from "react-native";
import { TabView, TabPage } from "@/components/TabView";
import RadioButton from "@/components/RadioButton";
import DateTimePicker, { DateType, useDefaultStyles } from 'react-native-ui-datepicker';
import { useState } from "react";
import IconButton from "@/components/IconButton";
import { Button } from "@/components/Button";
import dayjs from 'dayjs';


export default function NewEvent() {

    const defaultStyles = useDefaultStyles();

    // from https://github.com/farhoudshapouran/react-native-ui-datepicker/blob/main/demo/components/examples/range-datepicker.tsx
    const [range, setRange] = useState<{
        startDate: DateType;
        endDate: DateType;
    }>({ startDate: undefined, endDate: undefined });
      const from = range.startDate
    ? dayjs(range.startDate).format('MMM DD, YYYY')
    : '';
  const to = range.endDate ? dayjs(range.endDate).format('MMM DD, YYYY') : '';

    const [isDateModalOpen, setDateModalOpen] = useState(false);

    function toggleDateModal() {
        setDateModalOpen(!isDateModalOpen);
    }

    const generalInfo: TabPage = {
        title: "General",
        view: (
            <View className={"gap-4"}>
                <Modal visible={isDateModalOpen} animationType="slide" transparent={true} >
                    <View className="flex-1 justify-center items-center bg-black/50">
                        <View className={"p-8 bg-white w-5/6 h-1/2 rounded"}>
                            <View className="gap-8">
                                <View className={"flex-row items-center justify-between"}>
                                    <Text className={"font-semibold text-lg"}>Select Start Date</Text>
                                    <IconButton iconName={"close"} iconSize={18} iconColor={"#000"} onPressExec={toggleDateModal} />
                                </View>
                                <DateTimePicker
                                    mode={"range"}
                                    styles={defaultStyles}
                                    startDate={range.startDate}
                                    endDate={range.endDate}
                                    onChange={(params) => setRange(params)}
                                />
                                <Button onPress={toggleDateModal} title={"Confirm"} />
                            </View>
                        </View>
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
                    <Text className={"w-1/6"}>Total Duration: </Text>
                    <View className={"flex-row"}>
                        <RadioButton text={"12 hrs"} />
                        <RadioButton text={"24 hrs"} />
                        <RadioButton text={"48 hrs"} />
                        <RadioButton text={"86 hrs"} />
                        <RadioButton text={"Custom"} />
                    </View>
                </View>
                <View className="flex-row items-center justify-between">
                    <Text className={"w-1/6"}>Happening On: </Text>
                    <View className={"flex-row gap-4"}>
                        <TextInput
                            className={"w-[50%] px-4 bg-gray-200"}
                            placeholder={"From"}
                            value={range.startDate?.toString()}
                            onPress={toggleDateModal}
                        />
                        <TextInput
                            className={"w-[40%] px-4 bg-gray-200"}
                            value={range.endDate?.toString()}
                            placeholder={"To"}
                        />
                    </View>
                </View>
                <View className="flex-row items-center justify-between">
                    <Text className={"w-1/6"}>Age Group: </Text>
                    <View className={"flex-row justify-between gap-4"}>
                        <TextInput className={"w-[45%] px-4 bg-gray-200"} placeholder={"Min"} ></TextInput>
                        <TextInput className={"w-[45%] px-4 bg-gray-200"} placeholder={"Max"} ></TextInput>
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