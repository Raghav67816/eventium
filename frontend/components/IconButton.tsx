import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, View, GestureResponderEvent, TouchableOpacity } from "react-native";

type IconButtonProps = {
  iconName: string,
  iconColor: string,
  iconSize: number,
  onPressExec: (event: GestureResponderEvent) => void
};

export default function IconButton({
  iconName, onPressExec, iconSize = 16, iconColor
}: IconButtonProps) {


  return (
    <TouchableOpacity onPress={onPressExec}>
      <View>
          <Ionicons name={iconName} size={iconSize} color={iconColor} ></Ionicons>
      </View>
    </TouchableOpacity>
  );
}
