import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Platform,
  StatusBar,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import { Formik } from "formik";

import client from "../../api/client";
import { useLogIn } from "../../Context/ContextApi";
import { logInInfo } from "./InitialValue";
import { validationSchema } from "./ValidationScheema";

const LogInForm = () => {
  const { setIsLogedIn, setProfile } = useLogIn();

  const loginHandler = async (values, actions) => {
    try {
      const res = await client.post("/sign-in", { ...values });
      if (res.data.sucsess) {
        setProfile(res.data.user);
        setIsLogedIn(true);
      } else {
        alert("Email and password are wrong");
        return;
      }
    } catch (error) {
      console.log("this", error);
    }

    actions.resetForm();
    actions.setSubmitting(false);
  };

  return (
    <View style={styles.FormContainer}>
      <Formik
        initialValues={logInInfo}
        validationSchema={validationSchema}
        onSubmit={loginHandler}
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
          const { email, password } = values;
          return (
            <>
              {/* ........Email......... */}
              <InputField
                onBlur={handleBlur("email")}
                error={touched.email && errors.email}
                inputName="Email"
                value={email}
                placeholder="abc@gmail.com"
                onChangeText={handleChange("email")}
              />

              {/* .....Password........ */}
              <InputField
                onBlur={handleBlur("password")}
                error={touched.password && errors.password}
                inputName="Password"
                value={password}
                placeholder="* * * * * * * * *"
                onChangeText={handleChange("password")}
                secureTextEntry={true}
              />
              <TouchableOpacity onPress={handleSubmit} style={styles.submit}>
                <Text style={styles.submitText}>LogIn</Text>
              </TouchableOpacity>
            </>
          );
        }}
      </Formik>
    </View>
  );
};

export default LogInForm;

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
