import Fuse from "fuse.js";
import { Org } from "@/utils/events";
import OrgCard from "@/components/OrgCard";
import { Button } from "@/components/Button";
import { addOrgsToView } from "@/utils/events";
import { useCameraPermissions, CameraView } from "expo-camera";
import { getParticipants } from "@/utils/events";
import IconButton from "@/components/IconButton";
import { useEffect, useState, useMemo, useCallback } from "react";
import { Picker } from "@react-native-picker/picker";
import { useLocalSearchParams, useRouter } from "expo-router";
import ParticipantCard, { Participant } from "@/components/ParticipantCard";
import { View, Text, Modal, ScrollView, TextInput, FlatList, StyleSheet } from "react-native"

export default function EventPage() {
    const router = useRouter();
    const { eventName, eventId } = useLocalSearchParams();
    const [perm, requestPerm] = useCameraPermissions();
    const [isOrgModalVisible, setOrgModalVisible] = useState(false);
    let [isQrModalVisible, setQrModalVisible] = useState(false);
    const [input, setInput] = useState("");
    const [orgs, setOrgs] = useState<Org[]>([]);
    const [participants, setParticipants] = useState<Participant[]>([]);
    const [filteredContent, setFilteredContent] = useState<Participant[]>([]);

    if (!perm?.granted) {
        console.log("not granted");
    }

    const fuse = useMemo(() => {
        return new Fuse(participants, {
            keys: ['name', 'email', 'phone'],
            threshold: 0.5,
        });
    }, [participants]);

    function onTextChange(text: string) {
        setInput(text);
        if (!text.trim()) {
            setFilteredContent(participants);
        } else {
            const results = fuse.search(text);
            setFilteredContent(results.map(i => i.item));
        }
    }

    function toggleOrgModal() {
        setOrgModalVisible(!isOrgModalVisible);
    }

    async function toggleQrModal() {
        if (!perm?.granted) {
            const permReq = await requestPerm();
            if (permReq.granted) {
                isQrModalVisible = true;
                setQrModalVisible(isQrModalVisible);
            }
        }

        if (perm?.granted) {
            setQrModalVisible(!isQrModalVisible);
        }
    }

    function toHome() {
        router.replace("/")
    }

    useEffect(() => {
        const fetchOrgs = async () => {
            const orgs = await addOrgsToView(eventId.toString());
            setOrgs(orgs);
        }

        const fetchParticipants = async () => {
            const participants_ = await getParticipants(eventId.toString());
            setParticipants(participants_);
            setFilteredContent(participants_);
        }

        fetchOrgs();
        fetchParticipants();
    }, [])

    function onBarcodeScanned(){
        console.log("Oh yess");
    }

    return (
        <View className={'p-8'}>
            <Modal
                visible={isOrgModalVisible}
                animationType="slide"
                transparent={true}
            >
                <View className="flex-1 justify-center items-center bg-black/50">
                    <View className="w-5/6 h-auto bg-white rounded-xl p-6 shadow-2xl">
                        <View className={"flex-row items-center justify-between"}>
                            <Text className="text-xl font-bold">Organisers</Text>
                            <IconButton iconName="close-outline" iconSize={18} onPressExec={toggleOrgModal} iconColor={""} ></IconButton>
                        </View>
                        <View>
                            <View className={"mb-8"}>
                                <ScrollView className={"mt-8 mb-8"}>
                                    {orgs.map((org, index) => (
                                        <OrgCard key={index} name={org.name} email={org.email}></OrgCard>
                                    ))}
                                </ScrollView>
                                <View className={"flex-row flex justify-between items-center"}>
                                    <TextInput className={" w-[75%] bg-gray-200 rounded px-4"} placeholder="Email"></TextInput>
                                    <Button className={"w-[20%]"} title={"Add"}></Button>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
            <Modal
                visible={isQrModalVisible}
                animationType="slide"
                transparent={true}
            >
                <View className="flex-1 justify-center items-center bg-black/50">
                    <View className="w-5/6 h-auto bg-white rounded-xl p-6 shadow-2xl">
                        <View className={"flex-row items-center justify-between"}>
                            <Text className="text-xl font-bold">Scan Qr Code</Text>
                            <IconButton iconName="close-outline" iconSize={18} onPressExec={toggleQrModal} iconColor={""} ></IconButton>
                        </View>
                        <View>
                            <View className={"mb-8"}>
                                <Text>Use this to manage check-in and food.</Text>
                                <View className={"w-full aspect-square mt-8 mb-8 overflow-hidden rounded-lg"}>
                                    <CameraView style={styles.cview} facing={"back"} onBarcodeScanned={onBarcodeScanned} />
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
            <View className={"flex-row justify-between py-4"}>
                <View className={"flex-row gap-4 items-center"}>
                    <IconButton iconName={"arrow-back"} iconSize={18} onPressExec={toHome} iconColor={""} />
                    <Text className={"font-semibold text-xl"}>{eventName}</Text>
                </View>
                <View className={"flex-row gap-4 self-right"}>
                    <IconButton iconName={"people"} iconSize={24} onPressExec={toggleOrgModal} iconColor={""} />
                    <IconButton iconName={"settings"} iconSize={24} onPressExec={toggleOrgModal} iconColor={""} />
                    <IconButton iconName={"qr-code-sharp"} iconSize={24} onPressExec={toggleQrModal} iconColor={""} />
                </View>
            </View>
            <View className="mt-8 px-4">
                <View className={"flex-row justify-between mb-8"}>
                    <TextInput
                        onChangeText={onTextChange}
                        style={{ width: '75%' }}
                        className={"bg-gray-200 rounded px-4"}
                        placeholder={"Type Something..."}
                        value={input}
                    >
                    </TextInput>
                    <Picker prompt={"Filter"} style={{ width: '20%' }} mode={'dropdown'} enabled={true} >
                        <Picker.Item label={"Name"} value={"name"} />
                        <Picker.Item label={"Email"} value={"email"} />
                        <Picker.Item label={"Phone Number"} value={"phone"} />
                        <Picker.Item label={"Age"} value={"age"} />
                    </Picker>
                </View>
                <FlatList
                    data={filteredContent}
                    keyExtractor={(_, index) => index.toString()}
                    numColumns={2}
                    columnWrapperStyle={{ justifyContent: "space-between", marginBottom: 16, gap: 32 }}
                    renderItem={({ item }) => (
                        <View className="flex-1">
                            <ParticipantCard
                                id={item.id}
                                name={item.name}
                                age={item.age}
                                phone={item.phone}
                                email={item.email}
                            />
                        </View>
                    )}
                    contentContainerStyle={{ paddingBottom: 100 }}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    cview: {
        flex: 1,
        width: "100%",
    }
})