import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import UserAvatarImage from '../components/UserAvatarImage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import { UserContext } from '../context/UserContext';
import { UseNavigation_Type } from '../Types/navigation_types';
import { useNavigation } from '@react-navigation/native';
import { COLORS, SIZES, G } from '../constants/SIZES';
import firestore from '@react-native-firebase/firestore';

interface IUser {
    displayName: string 
    email: string 
    uid: string 
    photoURL: string 
    phoneNumber: string 
}

const ContactInfo: React.FC<IUser> = (contact) => {
    const currentUser = useContext(UserContext)
    const navigation = useNavigation<UseNavigation_Type>();
    const [roomWasCreated, setRoomWasCreated] = useState(false)
    const [ROOM_ID, setROOM_ID] = useState<string  | undefined>(undefined)

    // check Chat Room was created or not and create ROOM_ID
    useEffect(() => {
        const beforeStartChatting = async() => {
            if(currentUser?.uid) {
                // set CHAT ROOM unique ID
                if( contact.uid > currentUser.uid ) {
                    setROOM_ID(contact.uid.slice(0,8).concat('_@_', currentUser.uid.slice(0,8)))
                }
                if( currentUser.uid > contact.uid ) {
                    setROOM_ID(currentUser.uid.slice(0,8).concat('_@_', contact.uid.slice(0,8)))
                }
                await firestore().collection('CHAT_ROOM_DB').doc(ROOM_ID).get()
                .then((room) => {
                    room.data() ? setRoomWasCreated(true) : setRoomWasCreated(false)
                })
            } 
            else { Alert.alert('You must register for chatting') }
        }
        beforeStartChatting();
    }, [])    

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
            <TouchableOpacity 
                onPress={() => console.log(roomWasCreated, ROOM_ID)}>
                <Icon2 name='message-outline' size={24} color={COLORS.LIGHT}/>
            </TouchableOpacity>
            <TouchableOpacity 
                onPress={() => console.log('Call choozed contact')}>
                <Icon2 name='phone' size={24} color={COLORS.LIGHT}/>
            </TouchableOpacity>
            <TouchableOpacity 
                onPress={() => {navigation.navigate("EditContactProfile", {contact: contact})}}>
                <Icon name='edit' size={20} color={COLORS.LIGHT}/>
            </TouchableOpacity>
        </View>
    )
}

export default ContactInfo

const styles = StyleSheet.create({
    contact_item: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        paddingVertical: 5
    },

})

// displayName: data.displayName,
// email: data.email, 
// photoURL: data.photoURL, 
// phoneNumber: data.phoneNumber, 
// uid: data.uid 
