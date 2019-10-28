import { createStackNavigator } from 'react-navigation-stack'
import Account from '../Screens/Account'

export default createStackNavigator(
    {
        Account
    },
    {
        initialRouteName: 'Account',
        headerMode: 'none'
    }
)
