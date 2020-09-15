import React, { Component } from 'react'
import { Text, Alert, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'


interface Props {
    OnPress(): Promise<void>
}
interface State {

}
export default class BtnSilSadeceIcon extends Component<Props, State> {
    state = {}

    render() {
        return (
            <TouchableOpacity onPress={this.props.OnPress}>
                <Icon name="ios-close" color="red" size={26} />
            </TouchableOpacity>
        )
    }
}
