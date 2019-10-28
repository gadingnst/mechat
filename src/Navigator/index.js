import React from 'react'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import Icon from '../Components/Icon'
import Color from '../Assets/Color'

import Chat from './Chat'
import Account from './Account'
import ChatRoom from '../Screens/ChatRoom'
import { fromRight } from 'react-navigation-transitions'

const Navigator = createStackNavigator(
    {
        ChatRoom: { screen: ChatRoom },
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
        initialRouteName: 'App',
        transitionConfig: () => fromRight()
    }
)

export default createAppContainer(Navigator)
