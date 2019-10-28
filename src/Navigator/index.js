import React from 'react'
import { createAppContainer } from 'react-navigation'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import Icon from '../Components/Icon'

import Chat from './Chat'
import Account from './Account'

const Navigator = createMaterialBottomTabNavigator(
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
                barStyle: { backgroundColor: '#ff89cb' }
            }
        }
    },
    {
        initialRouteName: 'Chat',
        activeColor: '#f0edf6',
        inactiveColor: '#3e2465',
        barStyle: { backgroundColor: '#84bfff' }
    }
)

export default createAppContainer(Navigator)
