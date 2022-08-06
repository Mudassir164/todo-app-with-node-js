import { StyleSheet, Text, View, TextInput, TouchableOpacity, Platform, StatusBar, Dimensions } from 'react-native'
import React, { useState } from 'react'

const LogInForm = () => {
    const [logInInfo, setlogInInfo] = useState({
        email: '',
        password: '',
    })

    const { email, password } = logInInfo;
    const handleChange = (name, value) => {
        setlogInInfo({
            ...logInInfo,
            [name]: value,
        })

    }
    const isValidObjField = (obj) => {
        return Object.values(obj).every(val => val.trim())
    }

    const isValidEmail =(email)=>{
        const regx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
        return regx.test(email)
    }
    const updateError = (error,stateUpdater)=>{
        stateUpdater(error)
        setTimeout(()=>{
            stateUpdater('')
        },2500)

    }
    const [error, setError] = useState('');

    const IsLogInValidation = ()=>{
        if(!isValidObjField(logInInfo)){
            return  updateError('InValid Email and Password',setError)
        }
        if(!isValidEmail(logInInfo.email)){
            return updateError('Invalid Email and Password',setError)
        }
        
        return true;
    }
    const submitLoginHandler=()=>{
        if(IsLogInValidation()){
            console.log('Login Successfully')
        }
    }

    return (
        <View style={styles.FormContainer}>
            {
                error ? <Text style={styles.error}>{error}</Text> : null
            }
            <InputField inputName="Email" value={email} placeholder='abc@gmail.com' onChangeText={
                (text) => { handleChange('email', text) }
            } />
            <InputField inputName="Password" value={password} placeholder='* * * * * * * * *' onChangeText={
                (text) => { handleChange('password', text) }

            }
                secureTextEntry={true}
            />
            <TouchableOpacity onPress={() => {submitLoginHandler() }} style={styles.submit}>
                <Text style={styles.submitText}>LogIn</Text>
            </TouchableOpacity>
        </View>
    )
}

export default LogInForm

const InputField = (props) => {
    const { inputName, placeholder } = props;
    return (
        <View style={styles.inputContainer}>
            <Text style={styles.inputName}>{inputName}</Text>
            <TextInput style={styles.inputValue} {...props} placeholder={placeholder} placeholderTextColor='gray' />
        </View>
    )
}

const styles = StyleSheet.create({
    FormContainer: {
        width: Dimensions.get('window').width,
        padding: 10,


    },
    inputContainer: {
        width: "100%",
        marginBottom: 10
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
    }
    , submitText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "white",

    },
    error:{
        color:'red',
        fontSize:18,
        fontWeight:'bold',
        textAlign:'center'
    }

})