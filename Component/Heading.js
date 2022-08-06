import { StyleSheet, Text, View,Animated } from 'react-native'
import React from 'react'

const Heading = ({leftHeaderTranslateX=40,rightHeaderTranslateY=-20,rightHeaderOpacity=0}) => {
  return (
    <View style={styles.HeadingContainer}>
      <View style={{flexDirection:'row'}}>
      <Animated.Text style={[styles.mainHeading,{transform:[{translateX:leftHeaderTranslateX}]}]}>Welcome </Animated.Text>
      <Animated.Text style={[styles.mainHeading,{opacity:rightHeaderOpacity,transform:[{translateY:rightHeaderTranslateY}]}]}>Back</Animated.Text>
      </View>


      <Text style={styles.subHeading}>To Todo App</Text>
    </View>
  )
}

export default Heading

const styles = StyleSheet.create({
    HeadingContainer: {
        width: "100%",
        padding: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    mainHeading: {
        fontSize: 30,
        fontWeight: "bold",
        color: "#000",
    }
    ,
    subHeading: {
        fontSize: 15,
        color: "#000",

    }
})