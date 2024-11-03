import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { TextInput, Button, Text, HelperText, IconButton } from 'react-native-paper';
//import TextInputIcon from 'react-native-paper/lib/typescript/components/TextInput/Adornment/TextInputIcon';
import { auth } from '../firebase';


const CreateAccount = ({ navigation }) => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [secureTextEntry, setSecureTextEntry] = useState(true);

    const handleCreateAccount = () => {
        if (!fullName || !email || !password || !mobileNumber || !dateOfBirth) {
            setErrorMessage('Please fill in all fields.');
            return;
        }
        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match.');
            return;
        }
        //we will peform the sign up fucntion here after integrating database
        console.log('Creating account for:', { fullName, email, mobileNumber, dateOfBirth });

        setErrorMessage('');
        handleSignUp();
    };
    const handleSignUp = () => {
        auth
         .createUserWithEmailAndPassword(email, password)
         .then(userCredentials => {
            const user = userCredentials.user;
            console.log(user.email)
         })
         .catch((error) => {
            setErrorMessage(error.message);
                console.error(error);
         });
    }


    return (
        <ScrollView>
          <View style={styles.container}>
            <Text variant="headlineLarge" style={styles.title}>New Account</Text>
            
            {errorMessage ? <HelperText type="error" visible>{errorMessage}</HelperText> : null}
            
            <TextInput 
                label="Full name" 
                value={fullName} 
                onChangeText={setFullName} 
                mode="outlined" 
                style={styles.input} 
                placeholder="Full Name"
            />
            <TextInput
                label="Email"
                value={email}
                onChangeText={setEmail}
                mode="outlined"
                style={styles.input}
                placeholder="example@example.com"
            />
            <TextInput 
                label="Password" 
                secureTextEntry={secureTextEntry}
                value={password} 
                onChangeText={setPassword} 
                mode="outlined" 
                style={styles.input} 
                right={
                    <TextInput.Icon 
                        icon={secureTextEntry ? "eye-off" : "eye"} 
                        onPress={() => setSecureTextEntry(!secureTextEntry)} 
                    />
                }
                placeholder="**********"
            />
            <TextInput 
                label="Confirm Password" 
                secureTextEntry={secureTextEntry}
                value={confirmPassword} 
                onChangeText={setConfirmPassword} 
                mode="outlined" 
                style={styles.input}
                right={
                    <TextInput.Icon
                        icon={secureTextEntry ? "eye-off" : "eye"}
                        onPress={() => setSecureTextEntry (!secureTextEntry)}
                        />
                }
                placeholder="**********"
            />
            <TextInput 
                label="Mobile Number" 
                value={mobileNumber} 
                onChangeText={setMobileNumber} 
                mode="outlined" 
                style={styles.input} 
                placeholder="123-456-7890"
                keyboardType="phone-pad"
            />
            <TextInput 
                label="Date of Birth" 
                value={dateOfBirth} 
                onChangeText={setDateOfBirth} 
                mode="outlined" 
                style={styles.input} 
                placeholder="DD / MM / YYYY"
            />

            <Text style={styles.termsText}>
                By continuing, you agree to our{' '}
                <Text style={styles.linkText} onPress={() => {/* This for handling the Terms of Use */}}>Terms of Use</Text> 
                {' '}and{' '}<Text style={styles.linkText} onPress={() => {/* This for handling the Privacy Policy */}}>Privacy Policy</Text>.
            </Text>

            <Button mode="contained" onPress={handleCreateAccount} style={styles.button}>
                Sign Up
            </Button>

            <Text style={styles.orText}>or sign up with</Text>
            <View style={styles.socialContainer}>
                <IconButton icon="google" size={30} style={styles.socialIcons} onPress={() => {/* for handling Google sign-up */}} />
                <IconButton icon="facebook" size={30} style={styles.socialIcons} onPress={() => {/* for handling Facebook sign-up if needed*/}} />
                <IconButton icon="fingerprint" size={30} style={styles.socialIcons} onPress={() => {/* for handling Fingerprint sign-up if needed */}} />
            </View>

            <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
                <Text style={styles.footerText}>
                    Already have an account? <Text style={styles.linkText}>Log in</Text>
                </Text>
            </TouchableOpacity>
        </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: 'white',
    },
    title: {
        marginBottom: 20,
        color: '#2260FF',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    input: {
        marginBottom: 15,
        backgroundColor: 'white',
    },
    button: {
        marginTop: 10,
        backgroundColor: '#2260FF',
    },
    termsText: {
        marginVertical: 10,
        fontSize: 12,
        textAlign: 'center',
        color: 'gray',
    },
    linkText: {
        color: '#2260FF',
        textDecorationLine: 'underline',
    },
    orText: {
        textAlign: 'center',
        color: 'gray',
        marginVertical: 10,
    },
    socialContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
    },
    socialIcons: {
        backgroundColor: '#9BBFFF',
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
    },
    footerText: {
        textAlign: 'center',
        color: 'gray',
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
    },
});

export default CreateAccount;


