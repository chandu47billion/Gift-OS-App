import { StyleSheet, Text, View } from "react-native";
function Avatar({ emoji, color, size = 52 }) {
  return <View
    style={[
      styles.container,
      {
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: color + "33"
      }
    ]}
  >
      <Text style={{ fontSize: size * 0.5 }}>{emoji}</Text>
    </View>;
}
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center"
  }
});
export {
  Avatar as default
};
