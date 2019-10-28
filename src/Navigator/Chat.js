import { createStackNavigator } from 'react-navigation-stack'
import Chat from '../Screens/Chat'

export default createStackNavigator(
    {
        Chat
    },
    {
        initialRouteName: 'Chat',
        headerMode: 'none'
    }
)
