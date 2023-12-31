import { StyleSheet, Text, Pressable } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { UseNavigation_Type } from '../Types/navigation_types';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth'
import { useUserContext } from '../context/UserContext';
import useColorSchemeContext from '../hooks/useColorSchemeContext';

const Signout_Button = () => {
    const { currentUser, restartAuthState } = useUserContext()
    const navigation = useNavigation<UseNavigation_Type>();
    const { COLORS } = useColorSchemeContext()

    const signoutCurrentUser = () => {
        auth().signOut()
        .then(() => restartAuthState())
        .then(() => navigation.navigate('Welcome'))
        .catch(error => console.log(`_AUTH_SIGN_OUT_ERROR_ --> ${error}`))
    }
    
    return (
        currentUser && <Pressable onPress={signoutCurrentUser}>
            <Icon name='logout' size={24} color={COLORS.orange}/>
        </Pressable>
    )
}

export default Signout_Button;

const styles = StyleSheet.create({
    logout: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 90,
        borderColor: 'red',
        borderWidth: 1,
        padding: 8,
        borderRadius: 8,
    },
});
