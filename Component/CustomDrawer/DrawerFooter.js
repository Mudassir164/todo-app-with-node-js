import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

const DrawerFooter = ({ onPress }) => {
  return (
    <TouchableOpacity
      style={{
        position: "absolute",
        bottom: 50,
        left: 0,
        right: 0,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "gray",
        paddingVertical: 10,
      }}
      onPress={onPress}
    >
      <Text style={{ fontSize: 20, fontWeight: "bold", color: "white" }}>
        Logout
      </Text>
    </TouchableOpacity>
  );
};

export default DrawerFooter;

const styles = StyleSheet.create({});
