import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

import ProfileSvg from '../assets/profile.svg'

const Header = () => {
    const navigation = useNavigation();

    return (
        <View
            style={{
                height: 80,
                justifyContent: 'space-between',
                flexDirection: 'row',
                alignItems: 'center',
                padding: 15,
                marginBottom: 15
            }}
        >
            <View>
                <Image source={require('../assets/logo.png')} />
            </View>

            <View
                style={{
                    flexDirection: 'row',
                    gap: 15,
                    alignItems: 'center',
                }}

            >
                <TouchableOpacity onPress={()=>navigation.navigate('Menu')}>
                    <Image
                        style={{
                            width: 26,
                            height: 26
                        }}
                        source={require('../assets/menu.png')} />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => navigation.navigate('LoginScreen')}
                >
                    {/* <Image
                        style={{
                            width: 26,
                            height: 26
                        }}
                        source={require('../assets/profile.png')} /> */}
                        <ProfileSvg />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Header