import { View } from "react-native";
import { Org } from "@/utils/events";
import OrgCard from "@/components/OrgCard";
import { useState, useEffect } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useTheme, Text, Surface, IconButton, TextInput } from "react-native-paper";

export default function OrganisersModal() {

    const router = useRouter();
    const { orgs } = useLocalSearchParams();
    const { colors } = useTheme();

    const [organisers, setOrganisers] = useState<Array<Org>>([]);


    useEffect(() => {
        setOrganisers(JSON.parse(orgs.toString()));
    }, [])

    return (
        <View className={'flex-1 items-center justify-center'}>
            <Surface
                elevation={4}
                style={{
                    width: '50%',
                    height: 'auto',
                    borderRadius: 5,
                    backgroundColor: colors.secondaryContainer,
                }}
            >
                <View className={'p-4'}>
                    <View className={'flex-row items-center justify-between'}>
                        <Text>Organisers</Text>
                        <IconButton icon={'close'} onPress={() => {
                            router.replace("../");
                        }} />
                    </View>
                    {(organisers.map((org, index) => (
                        <OrgCard key={index} name={org.name} email={org.email} pfp={org.pfp} />
                    )))}
                    <View className={'flex-row mt-2 items-center justify-between'}>
                        <TextInput mode={'outlined'}
                            style={{ width: '80%' }}
                            placeholder={"Email"}
                            left={<TextInput.Icon icon={'email'}></TextInput.Icon>}
                            label={"Email"} />
                        <IconButton mode={'contained'} icon={'plus'} />
                    </View>
                </View>
            </Surface>
        </View>
    )
}