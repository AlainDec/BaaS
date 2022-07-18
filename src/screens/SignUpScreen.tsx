import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
// Navigation
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { HomeStackScreenParamList } from "../navigation/HomeStack";
// Forms
import { SignForm } from '../components/SignForm';
// Firebase
import auth from '@react-native-firebase/auth';

type HomeScreenNavigationProp = NativeStackScreenProps<HomeStackScreenParamList>

// -------- INSCRIPTION -------------
const SignUpScreen = ({ route, navigation }: HomeScreenNavigationProp) => {

    const [data, setData] = useState(); // données saisie dans le formulaire
    const [error, setError] = useState<string>('');

    const callbackData = (childData: any) => {
        console.log('SignUpScreen: ------callBackForm parent-------');
        setData(childData);
        console.log(childData);

        auth()
            .createUserWithEmailAndPassword(childData.email, childData.password)
            .then(() => {
                console.log("SignUpScreen: Compte d'utilisateur créé et logué !");
                // On renseigne la page parente que le user est loggué => TRUE
                route.params.parentCallback(true);
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    setError("Cette adresse e-mail est déjà utilisée !");
                }
                if (error.code === 'auth/invalid-email') {
                    setError("Cette adresse e-mail n'est pas valide !");
                }
                console.log(error);
            });
    }

    return (
        <View style={styles.container}>
            <SignForm formType='sign-up' callBackTheData={callbackData} />
        </View>
    )
}

export default SignUpScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        padding: 20,
        backgroundColor: '#efefef',
        justifyContent: 'space-around',
    },
    containerFields: {
        justifyContent: 'space-between',
    },
    containerField: {
        alignItems: 'flex-start',
    },
    containerFooterText: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    field: {
        maxWidth: 500,
        marginVertical: 20,
        borderColor: 'lightblue',
    },
    containerButtons: {
        paddingVertical: 50,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    text: {
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    textLink: {
        marginLeft: 10,
        color: 'blue',
    },
    textError: {
        color: 'red',
    }
});