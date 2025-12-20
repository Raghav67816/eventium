import { View } from "react-native"
import fetchItems from "@/utils/events";
import { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Surface, Text, IconButton, useTheme, Checkbox, Button } from "react-native-paper"
import { getIssuedItems, issueItem } from "@/utils/issue";

export default function IssueModal() {
    const router = useRouter();
    const { colors } = useTheme();
    const { data, eventId } = useLocalSearchParams();

    const pdata = JSON.parse(data.toString());

    const [items, setItems] = useState<Array<string>>([]);
    const [issuedItems, setIssuedItems] = useState<Array<string>>([]);
    const [checkedItems, setCheckedItems] = useState<Array<string>>([]);

    useEffect(() => {
        async function getItems() {
            const items_ = await fetchItems(eventId.toString());
            setItems(items_);
        }

        async function getItemsIssued() {
            const issuedItems_ = await getIssuedItems(pdata.data.toString());
            setIssuedItems(issuedItems_);
        }

        getItems();
        getItemsIssued();
    }, [])

    return (
        <View className="flex-1 items-center justify-center">
            <Surface
                elevation={4}
                style={{
                    width: "65%",
                    height: 400,
                    borderRadius: 5,
                    backgroundColor: colors.secondaryContainer,
                }}
            >
                <View className={'flex-1 p-4 gap-4'}>
                    <View className={'flex-row items-center justify-between'}>
                        <Text>Issue Items</Text>
                        <IconButton icon={'close'} onPress={() => {
                            router.back();
                        }} />
                    </View>
                    <View>
                        {items?.map((item, index) => (
                            <Checkbox.Item
                                key={index}
                                label={item}
                                disabled={
                                    issuedItems.includes(item) || checkedItems.includes(item)
                                        ? true
                                        : false
                                }
                                onPress={() => {
                                    setCheckedItems(prev =>
                                        prev.includes(item)
                                            ? prev.filter(i => i !== item)
                                            : [...prev, item]
                                    );
                                }}
                                status={
                                    issuedItems.includes(item) || checkedItems.includes(item)
                                        ? 'checked'
                                        : 'unchecked'
                                }
                            />

                        ))}
                    </View>
                    <View className={'mt-auto gap-2'}>
                        <Button mode={'contained'} onPress={() => {
                            issueItem(pdata.data, checkedItems);
                            router.back();
                        }}>Done</Button>
                        <Button onPress={() => { router.back() }}>Camcel</Button>
                    </View>
                </View>
            </Surface>
        </View>
    )
}