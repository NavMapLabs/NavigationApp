import { Text, View } from "react-native";
import { Link } from 'expo-router';

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Hi Honghui</Text>
      <Link href="/details">
        Go to Details
      </Link>
    </View>
  );
}
