import { useEffect } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import { View, Text, ActivityIndicator } from "react-native";
import { verifyJwt } from "@/utils/auth";

export default function AuthCallback(){
    const router = useRouter();
    const {token} = useLocalSearchParams();

    useEffect(() => {
        const verifyToken = async() => {
            if (!token){
                router.replace('/screens/login');
                return;
            }

            let res = await verifyJwt(token.toString());
            if (res == "token verified"){
                router.replace("/");
            }
            else{
                router.replace("/screens/login");
            }
        }

        verifyToken();
    }, [])

    return(
        <View>
            <Text>You did it boi</Text>
        </View>
    )
}
