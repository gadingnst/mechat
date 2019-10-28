import { createStackNavigator } from 'react-navigation-stack'
import { fromRight } from 'react-navigation-transitions'
import Chat from '../Screens/Chat'
import RoomChat from '../Screens/Chat/RoomChat'

export default createStackNavigator(
    {
        Chat,
        RoomChat
    },
    {
        initialRouteName: 'Chat',
        headerMode: 'none',
        transitionConfig: () => fromRight()
    }
)
