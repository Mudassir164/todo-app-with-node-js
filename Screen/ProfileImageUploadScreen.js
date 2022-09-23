import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  Image,
} from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { useNavigation, Route, StackActions } from "@react-navigation/native";
import client from "../api/client";
import Loading from "../Component/UploadProfile/Loading";
import UploadProfileBtn from "../Component/UploadProfile/UploadProfileBtn";

const ProfileImageUploadScreen = ({ route }) => {
  const navigation = useNavigation();
  const { token } = route.params;
  console.log(token);
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const Upload = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry we nedd Camera role");
    }
    if (status === "granted") {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled) {
        setImage(result.uri);
      }
    }
  };

  const uploadProfileImageHandler = async () => {
    const formData = new FormData();
    formData.append("profile", {
      name: new Date() + "_rpofile",
      uri: image,
      type: "image/jpg",
    });
    try {
      const res = await client.post("/upload-profile", formData, {
        headers: {
          Accept: "application.json",
          "Content-Type": "multipart/form-data",
          authorization: `JWT ${token}`,
        },
        onUploadProgress: ({ loaded, total }) => {
          setProgress((loaded / total) * 100);
        },
      });
      if (res.data.sucsess) {
        navigation.dispatch(StackActions.replace("Profile Screen"));
      }
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.profileImage}>
        <TouchableOpacity onPress={Upload}>
          {image ? (
            <Image source={{ uri: image }} style={styles.upImage} />
          ) : (
            <Text style={styles.profileImageText}>Upload Profile Image</Text>
          )}
        </TouchableOpacity>
      </View>

      {progress ? <Loading progress={progress} /> : null}

      {image ? (
        <UploadProfileBtn
          uploadImageHandler={uploadProfileImageHandler}
          clearImageHandler={() => {
            setImage(null);
          }}
        />
      ) : null}

      <TouchableOpacity onPress={() => {}}>
        <Text style={styles.skipBtn}>Skip</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileImageUploadScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 10,
    justifyContent: "center",
    alignItems: "center",
    // width: "100%",
  },
  profileImage: {
    width: 150,
    height: 150,
    borderColor: "black",
    borderStyle: "dashed",
    borderWidth: 1,
    borderRadius: 100,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  profileImageText: {
    color: "black",
    textAlign: "center",
    fontSize: 18,
  },
  skipBtn: {
    color: "grey",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
  },
  upImage: {
    width: 150,
    height: 150,
    borderRadius: 100,
  },
});
