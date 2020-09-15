import React, { Component } from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'


interface Props {
    OnPress(): void
    baslik: string
    yaziRengi: string
    butonRengi: string
    widthYuzdesi: string
}
interface State {

}
export default class MiniButonOlustur extends Component<Props, State> {
    state = {}

    render() {
        return (
            <TouchableOpacity
                style={[style.yeniIlacEkleTouchable, { backgroundColor: this.props.butonRengi, width: this.props.widthYuzdesi + "%" }]}
                onPress={this.props.OnPress}
            >
                <Text style={{ fontWeight: "bold", color: this.props.yaziRengi, textAlign: "center", fontSize: 13 }}>{this.props.baslik}</Text>
            </TouchableOpacity>
        )
    }
}

let style = StyleSheet.create({
    yeniIlacEkleTouchable: {
        // width: "50%",
        borderRadius: 5,
        padding: 5,
        justifyContent: "center",
        alignItems: "center",
        // height: 50,
        // backgroundColor: "fuchsia",
    }
})