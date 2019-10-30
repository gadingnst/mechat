import React from 'react'
import { createStackNavigator } from 'react-navigation-stack'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import { fromRight, zoomIn } from 'react-navigation-transitions'

import Chat from '../../Screens/Chat'
import Contacts from '../../Screens/Contacts'
import Maps from '../../Screens/Maps'
import Account from '../../Screens/Account'
import ChatRoom from '../../Screens/ChatRoom'
import UserProfile from '../../Screens/UserProfile'
import Icon from '../../Components/Icon'
import Color from '../../Assets/Color'

const navigationTransition = nav => {
    const prevScene = nav.scenes[nav.scenes.length - 2]
    const nextScene = nav.scenes[nav.scenes.length - 1]
    if (
        prevScene &&
        prevScene.route.routeName === 'ChatRoom' &&
        nextScene.route.routeName === 'UserProfile'
    ) {
        return zoomIn()
    }
    return fromRight()
}

export default createStackNavigator(
    {
        ChatRoom: { screen: ChatRoom },
        UserProfile: { screen: UserProfile },
        AppBottom: createMaterialBottomTabNavigator(
            {
                Chat: {
                    screen: Chat,
                    navigationOptions: {
                        tabBarIcon: ({ tintColor }) => (
                            <Icon
                                type="Ionicons"
                                color={tintColor}
                                size={25}
                                name="ios-chatbubbles"
                            />
                        )
                    }
                },
                Contacts: {
                    screen: Contacts,
                    navigationOptions: {
                        tabBarIcon: ({ tintColor }) => (
                            <Icon
                                type="Ionicons"
                                color={tintColor}
                                size={25}
                                name="ios-contacts"
                            />
                        ),
                        barStyle: { backgroundColor: Color.Accent }
                    }
                },
                Maps: {
                    screen: Maps,
                    navigationOptions: {
                        tabBarIcon: ({ tintColor }) => (
                            <Icon
                                type="Ionicons"
                                color={tintColor}
                                size={25}
                                name="ios-map"
                            />
                        ),
                        barStyle: { backgroundColor: Color.Success }
                    }
                },
                Account: {
                    screen: Account,
                    navigationOptions: {
                        tabBarIcon: ({ tintColor }) => (
                            <Icon
                                type="Ionicons"
                                color={tintColor}
                                size={25}
                                name="ios-contact"
                            />
                        ),
                        barStyle: { backgroundColor: Color.Info }
                    }
                }
            },
            {
                initialRouteName: 'Chat',
                activeColor: '#f0edf6',
                inactiveColor: '#3e2465',
                barStyle: { backgroundColor: Color.Primary }
            }
        )
    },
    {
        headerMode: 'none',
        initialRouteName: 'AppBottom',
        transitionConfig: nav => navigationTransition(nav)
    }
)
