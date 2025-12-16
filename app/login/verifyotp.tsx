import { useState } from "react";
import { useRouter } from "expo-router";
import { verifyOtp } from "@/utils/auth";
import { View, Text} from "react-native";
import { Button } from "react-native-paper";
import { TextInput } from "react-native-paper";
import { useLocalSearchParams } from "expo-router";

export default function VerifyOtp() {
    const router = useRouter();
    const [otp, setOtp] = useState("");
    const [isInvalid, setInvalidOtp] = useState(false);
    const { email } = useLocalSearchParams();

    async function handleVerify() {
        const isValid = await verifyOtp(email.toString(), otp);
        if (isValid) {
            router.replace("/");
        }
        else {
            setInvalidOtp(true);
        }
    }

    return (
        <View className={'flex-1 p-16'}>
            <Text className={'font-semibold'}>Eventium</Text>
            <View className={'flex-1 gap-4 justify-center'}>
                <Text className={'font-semibold text-xl'}>Enter Your OTP</Text>
                <Text>We have emailed you a code at {email}.</Text>
                <TextInput
                    mode={'outlined'}
                    value={otp.toString()}
                    onChangeText={setOtp}
                    label={"One-Time-Password"}
                    left={<TextInput.Icon icon={"email"}></TextInput.Icon>}
                    textContentType={'emailAddress'} />
                <Text className={'text-red'}>{isInvalid ? "Invalid OTP.": ""}</Text>
                <Button mode={"contained"} onPress={handleVerify}>Submit</Button>
            </View>
        </View>
    );
}