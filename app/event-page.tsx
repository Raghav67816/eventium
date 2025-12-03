import Fuse from "fuse.js";

import { useEffect, useState, useMemo} from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCameraPermissions, CameraView } from "expo-camera";
import { View, Text, Modal, ScrollView, FlatList, StyleSheet } from "react-native"
import { Menu, Searchbar, TextInput, PaperProvider, Appbar, Button, IconButton } from "react-native-paper";


import { Org } from "@/utils/events";
import { getParticipants } from "@/utils/events";
import OrgCard from "@/components/OrgCard";
import ParticipantCard, { Participant } from "@/components/ParticipantCard";

export default function EventPage() {
    const router = useRouter();
    const [menuVisible, setMenuVisible] = useState(false);
    const { eventName, eventId } = useLocalSearchParams();
    const [perm, requestPerm] = useCameraPermissions();
    const [isOrgModalVisible, setOrgModalVisible] = useState(false);
    let [isQrModalVisible, setQrModalVisible] = useState(false);
    const [input, setInput] = useState("");
    const [orgs, setOrgs] = useState<Org[]>([]);
    const [participants, setParticipants] = useState<Participant[]>([]);
    const [filteredContent, setFilteredContent] = useState<Participant[]>([]);

    function openDropdown() {
        setMenuVisible(true);
    }

    function closeDropdown() {
        setMenuVisible(false);
    }

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
            // const orgs = await addOrgsToView(eventId.toString());
            // setOrgs(orgs);
        }

        const fetchParticipants = async () => {
            const participants_ = await getParticipants(eventId.toString());
            setParticipants(participants_);
            setFilteredContent(participants_);
        }

        fetchOrgs();
        fetchParticipants();
    }, [])

    function onBarcodeScanned() {
        console.log("Oh yess");
    }

    return (
        <View>
            <Modal
                visible={isOrgModalVisible}
                animationType="slide"
                transparent={true}
            >
                <View className="flex-1 justify-center items-center bg-black/50">
                    <View className="w-5/6 h-auto bg-white rounded-xl p-6 shadow-2xl">
                        <View className={"flex-row items-center justify-between"}>
                            <Text className="text-xl font-bold">Organisers</Text>
                            <IconButton onPress={toggleOrgModal} icon={"close"} />
                        </View>
                        <View>
                            <View className={"mb-8"}>
                                <Text>Work in Progress. Workflow broken due to db restructure</Text>
                                <ScrollView className={"mt-8 mb-8"}>
                                    {orgs.map((org, index) => (
                                        <OrgCard key={index} name={org.name} email={org.email}></OrgCard>
                                    ))}
                                </ScrollView>
                                <View className={"flex-row flex justify-between items-center"}>
                                    <TextInput
                                     mode={'outlined'}
                                     style={{width: "75%"}} 
                                     placeholder="Email" />
                                    <Button mode={'contained'} icon={"plus"}>Add</Button>
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
                            <IconButton onPress={toggleQrModal} icon={"close"} />
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

            <Appbar mode={'small'}>
                <Appbar.BackAction onPress={toHome} />
                <Appbar.Content title={eventName.toString()} titleStyle={{ fontSize: 18 }} />
                <Appbar.Action icon={'account-group'} onPress={toggleOrgModal}></Appbar.Action>
                <Appbar.Action icon={'qrcode-scan'} onPress={toggleQrModal}></Appbar.Action>
            </Appbar>

            <View className="mt-8 px-8">
                <View className={"flex-row justify-between align-center mb-8"}>
                    <Searchbar
                        mode={'bar'}
                        style={{ width: '75%', backgroundColor: "#dddddd" }}
                        onChangeText={onTextChange}
                        placeholder={"Search"}
                        value={input}
                    />
                    <View>
                        <PaperProvider>
                            <View>
                                <Menu
                                    visible={menuVisible} onDismiss={closeDropdown}
                                    anchor={<Button icon={"filter"} mode={'outlined'} onPress={openDropdown}>Filter</Button>}>
                                    <Menu.Item title={"Name"} />
                                    <Menu.Item title={"Email"} />
                                    <Menu.Item title={"Age"} />
                                    <Menu.Item title={"Phone Number"} />
                                </Menu>
                            </View>
                        </PaperProvider>
                    </View>
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