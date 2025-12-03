import { Button } from "@/components/Button";
import { View, Text, TextInput } from "react-native";
import { verifyOtp } from "@/utils/auth";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";

export default function VerifyOtp() {
    const router = useRouter();
    const [otp, setOtp] = useState("");
    // const [isInvalid, setInvalidOtp] = useState(false);
    const { email } = useLocalSearchParams();

    async function handleVerify(){
        const response = await verifyOtp(email.toString(), otp);
        if (response == "success"){
            router.replace("/");
        }
        else{
            router.replace("/login/login");
        }
    }

    return (
        <View className={'flex-1 p-16'}>
            <Text className={'font-semibold'}>Eventium</Text>
            <View className={'flex-1 justify-center'}>
                <Text className={'font-semibold text-xl'}>Enter Your OTP</Text>
                <Text>We have emailed you a code at {email}.</Text>
                <TextInput
                    value={otp}
                    onChangeText={setOtp}
                    className={'border-b mt-8 mb-8'} 
                    placeholder={"Enter your OTP"} 
                    textContentType={"oneTimeCode"} />
                <Button onPress={handleVerify} title={"Submit"} />
            </View>
        </View>
    );
}