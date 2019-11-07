import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { NavigationActions, StackActions } from 'react-navigation'
import Loading from '../../Components/Loading'
import Color from '../../Assets/Color'

export default ({ navigation }) => {
    const isLoggedIn = useSelector(({ auth }) => auth.loggedIn)
    const reset = routeName =>
        StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName })]
        })

    useEffect(() => {
        setTimeout(() => {
            if (isLoggedIn) {
                navigation.dispatch(reset('App'))
            } else {
                navigation.dispatch(reset('Auth'))
            }
        }, 1000)
    }, [isLoggedIn, navigation])

    return <Loading color={Color.Accent} size="large" text="Please wait..." />
}
