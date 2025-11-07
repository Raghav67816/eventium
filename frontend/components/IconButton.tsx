import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, View, Text, GestureResponderEvent } from "react-native";

type IconButtonProps = {
  iconName: string,
  iconSize: number,
  onPressExec: (event: GestureResponderEvent) => void
};

export default function IconButton({
  iconName, onPressExec, iconSize = 16
}: IconButtonProps) {
  return (
    <View>
        <Pressable onPress={onPressExec}>
            <Ionicons size={iconSize} name={iconName}></Ionicons>
        </Pressable>
    </View>
  );
}
