import { useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { View, Text, Modal, ScrollView, TextInput, Button } from "react-native"
import IconButton from "@/components/IconButton";
import OrgCard from "@/components/OrgCard";

export default function EventPage() {
    const { eventName, eventId } = useLocalSearchParams();
    const [isVisible, setVisible] = useState(false);
    

    function toggleModal(){
        setVisible(!isVisible);
    }

    return (
        <View className={'p-8'}>
            <Modal
                visible={isVisible}
                animationType="slide"
                transparent={true}
                >
                <View className="flex-1 justify-center items-center bg-black/50">
                    <View className="w-5/6 h-1/2 bg-white rounded-xl p-6 shadow-2xl">
                    <View className={"flex-row items-center justify-between"}>
                        <Text className="text-xl font-bold">Organisers</Text>
                        <IconButton iconName="close-outline" iconSize={18} onPressExec={toggleModal} ></IconButton>
                    </View>
                    <View className={"flex-row gap-4"}>
                        <ScrollView className={"mt-8 mb-8 flex-shrink-0"}>
                            <OrgCard name={"Raghav Kumar"} email={"kumaraghav079@gmail.com"} ></OrgCard>
                            <OrgCard name={"Raghav Kumar"} email={"kumaraghav079@gmail.com"} ></OrgCard>
                            <OrgCard name={"Raghav Kumar"} email={"kumaraghav079@gmail.com"} ></OrgCard>
                            <OrgCard name={"Raghav Kumar"} email={"kumaraghav079@gmail.com"} ></OrgCard>
                            <OrgCard name={"Raghav Kumar"} email={"kumaraghav079@gmail.com"} ></OrgCard>
                            <OrgCard name={"Raghav Kumar"} email={"kumaraghav079@gmail.com"} ></OrgCard>
                            <OrgCard name={"Raghav Kumar"} email={"kumaraghav079@gmail.com"} ></OrgCard>
                            <OrgCard name={"Raghav Kumar"} email={"kumaraghav079@gmail.com"} ></OrgCard>
                            <OrgCard name={"Raghav Kumar"} email={"kumaraghav079@gmail.com"} ></OrgCard>
                            <OrgCard name={"Raghav Kumar"} email={"kumaraghav079@gmail.com"} ></OrgCard>
                            <OrgCard name={"Raghav Kumar"} email={"kumaraghav079@gmail.com"} ></OrgCard>
                            <OrgCard name={"Raghav Kumar"} email={"kumaraghav079@gmail.com"} ></OrgCard>
                            <OrgCard name={"Raghav Kumar"} email={"kumaraghav079@gmail.com"} ></OrgCard>
                            <OrgCard name={"Raghav Kumar"} email={"kumaraghav079@gmail.com"} ></OrgCard>
                        </ScrollView>
                    </View>
                    </View>
                </View>
                </Modal>
            <View className={"flex-row justify-between py-4 border-b"}>
                <View className={"flex-row gap-4 items-center"}>
                    <IconButton iconName={"arrow-back"} iconSize={18} onPressExec={toggleModal} />
                    <Text className={"font-semibold text-xl"}>{eventName}</Text>
                </View>
                <View className={"flex-row gap-4 self-right"}>
                    <IconButton iconName={"people-outline"} iconSize={24} onPressExec={toggleModal} />
                    <IconButton iconName={"settings-outline"} iconSize={24} onPressExec={toggleModal} />
                </View>
            </View>
        </View>
    )
}