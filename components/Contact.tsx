import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import UserAvatarImage from './UserAvatarImage';
import GetStartChatting from './GetStartChatting';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import { UseNavigation_Type } from '../Types/navigation_types';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../constants/SIZES';
import { UserType } from '../Types/users_types';

const Contact: React.FC<UserType> = (contact) => {
    const navigation = useNavigation<UseNavigation_Type>();

    return (
        <View style={styles.contact_item}>
            <UserAvatarImage pathToImage={contact.photoURL} size={50}/>
            <View style={{flex: 1}}>
                <Text style={{color: COLORS.LIGHT}}>
                    {contact.displayName}
                </Text>
                <Text style={{color: COLORS.LIGHT, fontSize: 13}}>
                    {contact.phoneNumber}
                </Text>
            </View>
            <GetStartChatting {...contact}/>
            <TouchableOpacity 
                onPress={() => console.log('Call choozed contact')}>
                <Icon2 name='phone' size={24} color={COLORS.LIGHT}/>
            </TouchableOpacity>
            <TouchableOpacity 
                onPress={() => {navigation.navigate("EditContact", {contact: contact})}}>
                <Icon name='edit' size={20} color={COLORS.LIGHT}/>
            </TouchableOpacity>
        </View>
    )
}

export default Contact;

const styles = StyleSheet.create({
    contact_item: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        paddingVertical: 5
    },

})