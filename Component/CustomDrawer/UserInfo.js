import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useLogIn } from "../../Context/ContextApi";

const UserInfo = () => {
  const { profile } = useLogIn();
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{
          uri: profile.avatar
            ? profile.avatar
            : "http://res.cloudinary.com/abcnode/image/upload/v1663836544/632b6030e7c87d778fafdc04_profile.jpg",
        }}
      />
      <View>
        <Text style={styles.heading}>{profile.fullname}</Text>
        <Text style={styles.email}>{profile.email}</Text>
      </View>
    </View>
  );
};

export default UserInfo;

const styles = StyleSheet.create({
  container: {
    // justifyContent: "space-between",
    // alignItems: "center",
    backgroundColor: "gray",
    paddingVertical: 15,
    paddingHorizontal: 5,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 100,
    marginBottom: 20,
  },
  heading: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
  },
  email: {
    color: "white",
    fontSize: 16,
  },
});
