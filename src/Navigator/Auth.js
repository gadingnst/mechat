import { createStackNavigator } from 'react-navigation-stack'
import { zoomIn } from 'react-navigation-transitions'
import Login from '../Screens/Login'
import Register from '../Screens/Register'

export default createStackNavigator(
    {
        Login,
        Register
    },
    {
        initialRouteName: 'Login',
        headerMode: 'none',
        transitionConfig: () => zoomIn()
    }
)
