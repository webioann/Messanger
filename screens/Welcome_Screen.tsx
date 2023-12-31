import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import useColorSchemeContext from '../hooks/useColorSchemeContext';
import { UseNavigation_Type } from '../Types/navigation_types';
import { useNavigation } from '@react-navigation/native';
import ScreenWrapper from './ScreenWrapper';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Welcome_Screen = () => {
    const navigation = useNavigation<UseNavigation_Type>();
    const { COLORS } = useColorSchemeContext()

    return (
        <ScreenWrapper>
            <View style={{paddingHorizontal: 16, flex: 1}}>
                <View style={styles.bigboard}>
                    <Text style={[styles.title, {color: COLORS.color}]}>Wellcome</Text>
                    <Image 
                        source={require('../assets/telegram.png')} 
                        style={{width: '80%', height: '80%'}}                        
                        alt='whatsapp logo '
                        resizeMode='contain'
                    />
                    <Text style={{color: COLORS.tint}}>You can now focus your console experience by customizing your navigation</Text>
                </View>
                <TouchableOpacity 
                    onPress={() => navigation.navigate("SignupPage")} 
                    style={[styles.button, {backgroundColor: COLORS.orange}]}>
                    <Text style={[styles.button_text, {color: COLORS.white}]}>Create My Account</Text>
                </TouchableOpacity>
                <View style={styles.text_link}>
                    <Text style={{color: COLORS.tint}}>Have an account?</Text>
                    <TouchableOpacity 
                        style={{flexDirection: 'row', gap: 10}}
                        onPress={() => navigation.navigate("LoginPage")}>
                        <Text style={[styles.button_text, {color: COLORS.tint}]}>Log in</Text>
                        <Icon name='east' size={24} color={COLORS.tint}/>
                    </TouchableOpacity>
                </View>
            </View>
        </ScreenWrapper>
    )
}
export default Welcome_Screen;

const styles = StyleSheet.create({
    bigboard: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 80,
        paddingBottom: 20
    },
    title: {
        fontSize: 46,
        fontWeight: '600'
    },
    button: {
        borderRadius: 8,
        padding: 10,
        marginBottom: 20
    },
    button_text: {
        fontSize: 18,
        textAlign: 'center',
        fontWeight: '500'
    }, 
    text_link: {
        flexDirection: 'row',
        justifyContent: 'center', 
        alignItems: 'center',
        paddingBottom: 40,
        gap: 10
    },
});
