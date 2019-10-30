import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { fromRight } from 'react-navigation-transitions'

import App from './App'
import Auth from './Auth'
import AppLoadingIndicator from '../Screens/AppLoadingIndicator'

const Navigator = createStackNavigator(
    {
        AppLoadingIndicator: { screen: AppLoadingIndicator },
        Auth: { screen: Auth },
        App: { screen: App }
    },
    {
        headerMode: 'none',
        initialRouteName: 'AppLoadingIndicator',
        transitionConfig: () => fromRight()
    }
)

export default createAppContainer(Navigator)
