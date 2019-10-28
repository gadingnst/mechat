import { createStackNavigator } from 'react-navigation-stack'
import { fromRight } from 'react-navigation-transitions'
import Chat from '../Screens/Chat'

export default createStackNavigator(
    {
        Chat
    },
    {
        initialRouteName: 'Chat',
        headerMode: 'none',
        transitionConfig: () => fromRight()
    }
)
