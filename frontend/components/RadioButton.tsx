import { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default function RadioButton({text}: {text: string}){
    const [checked, setChecked] = useState(false);

    function toggleCheck(){
        setChecked(!checked);
    }

    return (
        <TouchableOpacity className={'flex-row gap-2 p-2 px-4'} onPress={toggleCheck}>
            <View className={'rounded-full flex-row items-center justify-center border w-[18]'}>
                <View className={`${checked ? "bg-blue-500" : "bg-white"} rounded-full w-[14] h-[14]`}></View>
            </View>
            <Text>{text}</Text>
        </TouchableOpacity>
    )
}
