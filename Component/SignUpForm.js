import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Platform,
  StatusBar,
  Dimensions,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import client from "../api/client";
import { useNavigation, StackActions } from "@react-navigation/native";

const SignUpForm = () => {
  const navigation = useNavigation();
  const userInfo = {
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const validationSchema = Yup.object({
    fullname: Yup.string()
      .trim()
      .min(3, "Invalid Name")
      .required("Name  is required"),
    email: Yup.string()
      .trim()
      .email("Invalid Email")
      .required("Email is required"),
    password: Yup.string()
      .trim()
      .min(8, "Password is too Short")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .trim()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password"), null], "Passwords must be match"),
  });

  const signUpHandler = async (values, actions) => {
    // const { fullname, email, password ,confirmPassword} = values;

    const res = await client.post("/create-user", {
      ...values,
    });

    if (res.data.sucsess) {
      const signInResp = await client.post("/sign-in", {
        email: values.email,
        password: values.password,
      });

      if (signInResp.data.sucsess) {
        navigation.dispatch(
          StackActions.replace("ProfileImageUploadScreen", {
            token: signInResp.data.token,
          })
        );
      }
    }

    if (res.data.sucsess === false) {
      Alert.alert(res.data.message);
      return;
    }
    actions.resetForm();
    actions.setSubmitting(false);
  };

  return (
    <View style={styles.FormContainer}>
      <Formik
        initialValues={userInfo}
        validationSchema={validationSchema}
        onSubmit={signUpHandler}
      >
        {({
          values,
          errors,
          handleBlur,
          touched,
          handleChange,
          handleSubmit,
          isSubmitting,
        }) => {
          const { fullname, email, password, confirmPassword } = values;

          return (
            <>
              <InputField
                onBlur={handleBlur("fullname")}
                inputName="Name"
                error={touched.fullname && errors.fullname}
                value={fullname}
                placeholder="Name"
                onChangeText={handleChange("fullname")}
              />

              <InputField
                onBlur={handleBlur("email")}
                error={touched.email && errors.email}
                autoCapitalize="none"
                inputName="Email"
                value={email}
                placeholder="abc@gmail.com"
                onChangeText={handleChange("email")}
              />
              <InputField
                onBlur={handleBlur("password")}
                error={touched.password && errors.password}
                inputName="Password"
                value={password}
                placeholder="* * * * * * * * *"
                onChangeText={handleChange("password")}
                secureTextEntry={true}
              />
              <InputField
                inputName="Confirm Password"
                error={touched.confirmPassword && errors.confirmPassword}
                onBlur={handleBlur("confirmPassword")}
                value={confirmPassword}
                placeholder="* * * * * * * * *"
                onChangeText={handleChange("confirmPassword")}
                secureTextEntry={true}
              />

              <TouchableOpacity
                onPress={!isSubmitting ? handleSubmit : null}
                style={[
                  styles.submit,
                  {
                    backgroundColor: isSubmitting ? "gray" : "black",
                    flexDirection: "row",
                  },
                ]}
              >
                {isSubmitting ? (
                  <ActivityIndicator size="small" color="white" />
                ) : null}
                <Text style={styles.submitText}>LogIn</Text>
              </TouchableOpacity>
            </>
          );
        }}
      </Formik>
    </View>
  );
};

export default SignUpForm;

const InputField = (props) => {
  const { inputName, placeholder, error } = props;
  return (
    <View style={styles.inputContainer}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={styles.inputName}>{inputName}</Text>
        <Text style={{ color: "red" }}>{error}</Text>
      </View>
      <TextInput
        style={styles.inputValue}
        {...props}
        placeholder={placeholder}
        placeholderTextColor="gray"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  FormContainer: {
    width: Dimensions.get("window").width,
    padding: 10,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 10,
  },
  inputName: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "bold",
  },
  inputValue: {
    width: "100%",
    borderWidth: 2,
    borderRadius: 10,
    padding: 5,
    paddingHorizontal: 20,
    fontSize: 18,
  },
  submit: {
    width: "100%",
    backgroundColor: "black",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  submitText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  error: {
    color: "red",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
