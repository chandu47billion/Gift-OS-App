import { Image, StyleSheet, Text, View } from "react-native";
function Avatar({ emoji, color, photoUri, size = 52 }) {
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
      {photoUri ? <Image source={{ uri: photoUri }} style={{ width: size, height: size, borderRadius: size / 2 }} /> : <Text style={{ fontSize: size * 0.5 }}>{emoji}</Text>}
    </View>;
}
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden"
  }
});
export {
  Avatar as default
};
