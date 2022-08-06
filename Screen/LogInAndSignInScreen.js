import { StyleSheet, Text, View, Platform, StatusBar, ScrollView,Animated, Dimensions } from "react-native";
import React, { useRef } from "react";
import Heading from "../Component/Heading";
import LoginButton from "../Component/LoginButton";
import LogInForm from "../Component/Form";
import SignUpForm from "../Component/SignUpForm";

const LogInAndSignInScreen = () => {
  const animation = useRef(new Animated.Value(0)).current;
  const scrollView = useRef();
  const {width} = Dimensions.get('window');
  
  const rightHeaderOpacity = animation.interpolate({
    inputRange: [0, width],
    outputRange: [1, 0],
  })
  const rightHeaderTranslateY = animation.interpolate({
    inputRange: [0, width],
    outputRange: [0, -20],
  })
  const leftHeaderTranslateX = animation.interpolate({
    inputRange: [0, width],
    outputRange: [0, 40],
  })
  const loginColor = animation.interpolate({
    inputRange: [0, width],
    outputRange: ['black', 'gray'],
  })
  const signupColor = animation.interpolate({
    inputRange: [0, width],
    outputRange: [ 'gray','black'],
  })
  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Heading rightHeaderOpacity={rightHeaderOpacity} 
        rightHeaderTranslateY={rightHeaderTranslateY}
        leftHeaderTranslateX={leftHeaderTranslateX}
        />
        <View style={styles.Container1}>
        <LoginButton bgColor={loginColor} title='LogIn' 
        onPress={()=>{scrollView.current.scrollTo({x:0})}}
        border1={{borderTopLeftRadius:10,borderBottomLeftRadius:10,}}
        />
        <LoginButton bgColor={signupColor} title='SignUp'
        onPress={()=>{scrollView.current.scrollTo({x:width})}}
      
        border1={{borderTopRightRadius:10,borderBottomRightRadius:10,}}
        />

        </View>
        


        <ScrollView 
        ref={scrollView}
        horizontal={true} 
        style={styles.scrollContainer}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll = {Animated.event(
          [{nativeEvent:{contentOffset:{x:animation}}}],
          {useNativeDriver:false}
        )}
         >
        <LogInForm/>
        <ScrollView>
        <SignUpForm/>
        </ScrollView>
        
        
        </ScrollView>
      </View>
    </View>
  );
};

export default LogInAndSignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 10,
    justifyContent: "center",
    alignItems: "center",
    // width: "100%",
    
  },
  Container1:{
    width: "100%",
    
    flexDirection: "row",
    borderRadius: 10,
    padding: 10,
    
    



},
  formContainer:{
    width: "100%",
    

  },
  scrollContainer:{
    width: "100%",
    
    flexDirection: "row",
    paddingVertical: 20,
    
    
  }
});
