import { useCallback, useEffect, useRef } from "react";
import { View } from "react-native";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import { useTheme, Text, Surface, IconButton } from "react-native-paper";
import { BarcodeScanningResult, CameraView, useCameraPermissions } from "expo-camera";
import fetchItems from "@/utils/events";

export default function OrganisersModal() {
    const router = useRouter();
    const { colors } = useTheme();
    const { eventId } = useLocalSearchParams();
    const [perm, requestPerm] = useCameraPermissions();

    const canScan = useRef(true);

    useFocusEffect((
        useCallback(() => {
            canScan.current = true;
        }, [])
    ))

    useEffect(() => {
        if (!perm) return;

        if (!perm.granted) {
            requestPerm();
        }
    }, [perm]);

    if (!perm?.granted) {
        return (
            <View className="flex-1 items-center justify-center">
                <Text>Camera permission required</Text>
            </View>
        );
    }

    function onQrScanned(data: BarcodeScanningResult) {
        if (canScan.current) {
            canScan.current = false;
            router.push({
                pathname: '/modals/IssueModal',
                params: {
                    eventId: eventId,
                    data: JSON.stringify(data)
                }
            })
        }
    }

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
                <View className={'p-4 gap-4'}>
                    <View className={'flex-row items-center justify-between'}>
                        <Text>Scan Qr Code</Text>
                        <IconButton icon={'close'} onPress={() => {
                            router.dismiss();
                        }} />
                    </View>
                    <Text>Scan QR code to check-in, issue items and claim meals.</Text>
                    <View className={'items-center'}>
                        <CameraView style={{
                            width: "50%",
                            height: 250
                        }}
                            facing={'back'}
                            onBarcodeScanned={onQrScanned}
                        />
                    </View>
                </View>
            </Surface>
        </View>
    );
}
