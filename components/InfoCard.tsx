import { View, StyleSheet } from "react-native";
import { Surface, Text } from "react-native-paper";

type InfoCardProps = {
  title: string,
  content: string,
  color?: string
};

export default function InfoCard({ title, content, color }: InfoCardProps) {

  let styles = StyleSheet.create({
      surface: {
        borderRadius: 5
      }
    });

  if (color == undefined){
    styles = StyleSheet.create({
      surface: {
        borderRadius: 5
      }
    })
  }

  return (
    <Surface elevation={2} className='self-start' style={styles.surface}>
      <View className='p-4 gap-2'>
        <Text className={'text-xl'} style={{fontWeight: 'bold'}}>{title}</Text>
        <Text className={'text-lg'}>{content}</Text>
      </View>
    </Surface>
  )
}