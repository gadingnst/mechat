import React from 'react'
import { Appbar, TouchableRipple } from 'react-native-paper'

export default ({
    title,
    subtitle,
    back,
    left,
    right,
    backgroundColor,
    elevation,
    actions = [],
    onPress = () => false
}) => {
    return (
        <TouchableRipple onPress={() => onPress()}>
            <Appbar.Header
                dark
                style={{ backgroundColor, height: 60, elevation }}
            >
                {!back || <Appbar.BackAction onPress={() => back()} />}
                {left}
                <Appbar.Content title={title} subtitle={subtitle} />
                {right}
                {actions.map((action, i) => (
                    <Appbar.Action
                        key={i}
                        icon={action.icon}
                        onPress={() => action.onPress()}
                    />
                ))}
            </Appbar.Header>
        </TouchableRipple>
    )
}
