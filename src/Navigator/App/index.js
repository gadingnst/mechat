import React from 'react'
import { createStackNavigator } from 'react-navigation-stack'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import { fromRight, zoomIn } from 'react-navigation-transitions'

import Chat from '../../Screens/Chat'
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
                        barStyle: { backgroundColor: Color.Accent }
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
