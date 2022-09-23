import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

const UploadProfileBtn = ({ uploadImageHandler, clearImageHandler }) => {
  return (
    <View style={styles.btnContainer}>
      <TouchableOpacity onPress={uploadImageHandler}>
        <Text style={styles.uploadBtn}>Upload</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={clearImageHandler}>
        <Text style={styles.cancelBtn}>Clear</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UploadProfileBtn;

const styles = StyleSheet.create({
  uploadBtn: {
    backgroundColor: "gray",
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: "center",
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    borderRadius: 30,
    marginTop: 10,
  },
  cancelBtn: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "black",
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: "center",
    color: "gray",
    fontSize: 18,
    fontWeight: "bold",
    borderRadius: 30,
    marginTop: 10,
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "60%",
  },
});
