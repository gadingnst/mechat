import { createStackNavigator } from 'react-navigation-stack'
import { fromRight, fromLeft } from 'react-navigation-transitions'
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
        transitionConfig: nav => {
            const prevScene = nav.scenes[nav.scenes.length - 2]
            const nextScene = nav.scenes[nav.scenes.length - 1]
            if (
                prevScene &&
                prevScene.route.routeName === 'Register' &&
                nextScene.route.routeName === 'Login'
            ) {
                return fromLeft()
            }
            return fromRight()
        }
    }
)
