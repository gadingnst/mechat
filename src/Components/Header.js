import React from 'react'
import { Appbar } from 'react-native-paper'

export default ({
    title,
    subtitle,
    back,
    left,
    right,
    backgroundColor,
    actions = []
}) => {
    return (
        <Appbar.Header style={{ backgroundColor }}>
            {!back || <Appbar.BackAction onPress={() => back()} />}
            {left}
            <Appbar.Content title={title} subtitle={subtitle} />
            {right}
            {actions.map(action => (
                <Appbar.Action
                    icon={action.icon}
                    onPress={() => action.onPress()}
                />
            ))}
        </Appbar.Header>
    )
}
