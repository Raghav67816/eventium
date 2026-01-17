import Fuse from "fuse.js";

import { Text, useTheme } from "react-native-paper";
import { useEffect, useState, useMemo} from "react";
import { useLocalSearchParams, usePathname, useRouter } from "expo-router";
import { useCameraPermissions, CameraView } from "expo-camera";
import { View, Modal, ScrollView, FlatList, StyleSheet } from "react-native"
import { Menu, Searchbar, TextInput, PaperProvider, Appbar, Button, IconButton } from "react-native-paper";


import { Org } from "@/utils/events";
import { getParticipants } from "@/utils/events";
import OrgCard from "@/components/OrgCard";
import ParticipantCard, { Participant } from "@/components/ParticipantCard";
import InfoCard from "@/components/InfoCard";

export default function EventPage() {

    const router = useRouter();
    const { colors } = useTheme();

    const { eventName, eventId } = useLocalSearchParams();
    const { organisers } = useLocalSearchParams();

    const [menuVisible, setMenuVisible] = useState(false);

    const [input, setInput] = useState("");
    
    const [participants, setParticipants] = useState<Participant[]>([]);
    const [filteredContent, setFilteredContent] = useState<Participant[]>([]);

    function openDropdown() {
        setMenuVisible(true);
    }

    function closeDropdown() {
        setMenuVisible(false);
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
        router.push({
            pathname: '/modals/OrganisersModal',
            params: {
                eventId: eventId,
                orgs: organisers
            }
        });
    }

    async function toggleQrModal() {
        router.push({
            pathname: '/modals/QrModal',
            params: {
                eventId: eventId
            }
        });
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

    return (
        <View style={{backgroundColor: colors.background}}>
            <Appbar mode={'small'}>
                <Appbar.BackAction onPress={toHome} />
                <Appbar.Content title={eventName.toString()} titleStyle={{ fontSize: 18 }} />
                <Appbar.Action icon={'account-group'} onPress={toggleOrgModal}></Appbar.Action>
                <Appbar.Action icon={'qrcode-scan'} onPress={toggleQrModal}></Appbar.Action>
            </Appbar>

            <View className="mt-8 px-8">

                <View className={"flex-row justify-between align-center"}>
                    <Searchbar
                        mode={'bar'}
                        style={{ width: '75%'}}
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
                <View className={'my-8'}>
                    <InfoCard title={"Total Participants"} content={`${participants.length}`} />
                </View>
                <FlatList
                    style={{
                        height: "auto"
                    }}
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
