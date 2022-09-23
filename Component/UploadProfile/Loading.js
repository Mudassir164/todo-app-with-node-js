import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Loading = ({ progress }) => {
  return (
    <View style={styles.loadingContainer}>
      <View
        style={{ ...styles.loadingColor, width: ` ${(progress / 100) * 100}%` }}
      ></View>
      <Text style={styles.loadingPercentage}>{progress.toFixed(0)}%</Text>
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  loadingContainer: {
    width: "40%",
    borderWidth: 1,
    borderColor: "red",
    flexDirection: "row",
    justifyContent: "space-between",
    position: "relative",
    borderRadius: 30,
    overflow: "hidden",
  },
  loadingColor: {
    height: 20,
    backgroundColor: "blue",
  },
  loadingPercentage: {
    position: "absolute",
    left: "50%",
    // transform: [{ translate: -50 }],
    color: "black",
    fontWeight: "bold",
  },
});
