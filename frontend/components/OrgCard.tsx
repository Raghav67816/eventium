import { View, Image, Text } from "react-native";

type OrgCardProps = {
    name: string,
    email: string,
    // img_url: string,
};

export default function OrgCard({
  name,
  email,
//   img_url
}: OrgCardProps){
    return(
        <View className={"flex-row items-center gap-8 mt-4"}>
            <Image height={50} width={50} src="https://img.icons8.com/3d-fluency/94/administrator-male--v2.png" />
            <View>
                <Text className={"font-semibold"}>{name}</Text>
                <Text className={"text-grey-600"}>{email}</Text>
            </View>
        </View>
    )
}