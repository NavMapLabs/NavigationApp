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
      <Text>Hello Honghui</Text>
      <Link href="/(Auth)/LogIn">
        Go to Login
      </Link>
    </View>
  );
}

// <Link href="/(Editor)/MapEditor">