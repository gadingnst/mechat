import React from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

export default ({ type = 'Ionicons', color, size, name, style }) => {
    const props = { name, size, style: { color, ...style } }

    switch (type) {
        case 'Ionicons':
            return <Ionicons {...props} />
        case 'MaterialIcons':
            return <MaterialIcons {...props} />
        case 'AntDesign':
            return <AntDesign {...props} />
        case 'FontAwesome':
            return <FontAwesome {...props} />
        default:
            return <Ionicons {...props} />
    }
}
