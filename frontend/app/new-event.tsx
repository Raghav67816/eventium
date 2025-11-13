import { View, Text } from "react-native";
import PagerView from "react-native-pager-view"

export default function NewEvent(){
    return (
        <View className={'p-8'}>
            <PagerView style={{flex: 1}} initialPage={0}>
                <View key={"1"}>
                    <Text>First Page</Text>
                </View>
                <View key={"2"}>
                    <Text>Second Page</Text>
                </View>
                <View key={"3"}>
                    <Text>Third Page</Text>
                </View>
                <View key={"4"}>
                    <Text>Fourth Page</Text>
                </View>
            </PagerView>
        </View>
    )
}