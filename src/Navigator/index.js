import React from 'react'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import { fromRight, zoomIn } from 'react-navigation-transitions'

import Icon from '../Components/Icon'
import Color from '../Assets/Color'

import Account from './Account'
import Auth from './Auth'
import Chat from '../Screens/Chat'
import ChatRoom from '../Screens/ChatRoom'
import UserProfile from '../Screens/UserProfile'

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

const Navigator = createStackNavigator(
    {
        ChatRoom: { screen: ChatRoom },
        UserProfile: { screen: UserProfile },
        Auth: { screen: Auth },
        App: createMaterialBottomTabNavigator(
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
        initialRouteName: 'Auth',
        transitionConfig: nav => navigationTransition(nav)
    }
)

export default createAppContainer(Navigator)
