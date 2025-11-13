import { View, Text, TouchableOpacity } from 'react-native';

export default function RadioButton({text}: {text: string}){
    return (
        <TouchableOpacity className={'flex-row gap-2 p-2 px-4 rounded-full border'}>
            <View className={'border w-[18] rounded-full'}>
                <Text>Hello</Text>
            </View>
            <Text className={""}>{text}</Text>
        </TouchableOpacity>
    )
}
