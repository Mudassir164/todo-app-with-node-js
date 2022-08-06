import { StyleSheet, Text, TouchableOpacity, View,Animated } from 'react-native'
import React from 'react'

const LoginButton = ({bgColor,title,onPress,border,border1}) => {
 
  return (
    <TouchableOpacity  onPress={onPress} style={{width:'50%'}}>
    <Animated.View   style={[styles.buttonContainer,{backgroundColor:bgColor},border1]}>
    
      <Text style={[styles.buttonText,{color:'white'}]}>{title}</Text>
      
    </Animated.View>
    </TouchableOpacity>
  )
}

export default LoginButton

 

const styles = StyleSheet.create({
    Container:{
        width: "100%",
        
        flexDirection: "row",
        borderRadius: 10,
        // padding: 10,
        
       
        

        



    },
    buttonContainer:{
        width: "100%",
        paddingVertical: 10,
        overflow: "hidden",

},
    buttonText:{
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
    }
})