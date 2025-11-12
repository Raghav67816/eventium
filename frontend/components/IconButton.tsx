import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, View, Text, GestureResponderEvent } from "react-native";

type IconButtonProps = {
  iconName: string,
  iconColor: string,
  iconSize: number,
  onPressExec: (event: GestureResponderEvent) => void
};

export default function IconButton({
  iconName, onPressExec, iconColor="black", iconSize = 16
}: IconButtonProps) {

  if(iconColor == ""){
    iconColor = "black";
  }

  return (
    <View>
        <Pressable onPress={onPressExec}>
            <Ionicons size={iconSize} id={iconName} color={iconColor}></Ionicons>
        </Pressable>
    </View>
  );
}
