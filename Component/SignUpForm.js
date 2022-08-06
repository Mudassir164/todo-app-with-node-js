import { StyleSheet, Text, View, TextInput, TouchableOpacity, Platform, StatusBar, Dimensions } from 'react-native'
import React, { useState } from 'react'

const SignUpForm = () => {
    const [userInfo, setuserInfo] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    })
    const handleChange = (name, value) => {
        setuserInfo({
            ...userInfo,
            [name]: value,
        })

    }
    const { name, email, password, confirmPassword } = userInfo;

    //..............................................................
    
    
    // ............Every Validation Work Given Below

    // given Below function Check the all filed are filled or not
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

    const IsValidForm = (userInfo)=>{
        //we will accept only if the all field are filled
        if(!isValidObjField(userInfo)){
            return  updateError('All field are required',setError)
        }
        
        //if valid name is more than 3 character
        if(!userInfo.name.trim() || userInfo.name.length < 3 ){
            
            return updateError('Invalid Name',setError)
        }
        //if valid email is in correct format
        if(!isValidEmail(userInfo.email)){
            return updateError('Invalid Email',setError)
        }
        //if valid password is more than 8character
        if(!userInfo.password.trim() || userInfo.password.length < 8){
            return updateError('password must be more than 8 character',setError)
        }

        //if valid confirm password is equal to password
        if(userInfo.password !== userInfo.confirmPassword){
            return updateError('password not matched',setError)
        }

        return true

    }
    
    
    const handleSubmit = () => {
        
        if(IsValidForm(userInfo)){
            console.log('valid form')
        }
    }

    return (
        <View style={styles.FormContainer}>
            {
                error ? <Text style={styles.error}>{error}</Text> : null
            }
            <InputField inputName="Name" value={name} placeholder='Name' onChangeText={
                (text) => {
                    handleChange('name', text)
                }
            } />

            <InputField autoCapitalize='none'
                inputName="Email" value={email}
                placeholder='abc@gmail.com'
                onChangeText={
                    (text) => {
                        handleChange('email', text)
                    }
                }

            />
            <InputField inputName="Password" value={password} placeholder='* * * * * * * * *' onChangeText={
                (text) => {
                    handleChange('password', text)
                }
            }
                secureTextEntry={true}
            />
            <InputField inputName="Confirm Password" value={confirmPassword} placeholder='* * * * * * * * *' onChangeText={
                (text) => {
                    handleChange('confirmPassword', text)
                }
            }
                secureTextEntry={true}
            />

            <TouchableOpacity onPress={() => { handleSubmit()}} style={styles.submit}>
                <Text style={styles.submitText}>LogIn</Text>
            </TouchableOpacity>
        </View>
    )
}

export default SignUpForm

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
        backgroundColor: 'black',
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