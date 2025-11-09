import { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, Modal, ScrollView, TextInput } from "react-native"
import { Button } from "@/components/Button";
import IconButton from "@/components/IconButton";
import OrgCard from "@/components/OrgCard";
import { addOrgsToView } from "@/utils/events";
import { Org } from "@/utils/events";

export default function EventPage() {
    const router = useRouter();
    const { eventName, eventId } = useLocalSearchParams();
    const [isVisible, setVisible] = useState(false);
    var [orgs, setOrgs] = useState<Org[]>([]);


    function toggleModal() {
        setVisible(!isVisible);
    }

    function toHome(){
        router.replace("/")
    }

    useEffect(() => {
        const fetchOrgs = async() => {
            const orgs = await addOrgsToView(eventId.toString());
            setOrgs(orgs);
        }

        fetchOrgs();
    }, [])

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
                            <IconButton iconName="close-outline" iconSize={18} onPressExec={toHome} ></IconButton>
                        </View>
                        <View className={"mb-32"}>
                            <View className={"mb-8"}>
                                <ScrollView className={"mt-8 mb-8"}>
                                    {orgs.map((org, index) => (
                                        <OrgCard key={index} name={org.email} email={"example@gmail.com"}></OrgCard>
                                    ))}
                                </ScrollView>
                                <View className={"flex-row flex justify-between items-center"}>
                                    <TextInput className={"border-b flex-1 mr-4"} placeholder="Email"></TextInput>
                                    <IconButton iconName="add" iconSize={24} ></IconButton>
                                </View>
                            </View>
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