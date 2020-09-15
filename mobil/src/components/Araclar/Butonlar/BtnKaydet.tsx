import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'


interface Props {
    OnPress: Function
}
interface State {

}
export default class BtnKaydet extends Component<Props, State> {
    state = {}
    style = StyleSheet.create({
        btnGirisYapMainIc: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
        },
        btnSifremiUnuttum: {
            width: "100%",
            backgroundColor: "forestgreen",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 50,
            padding: 10,
        },
    })

    OnPress = () => {
        this.props.OnPress()
    }

    render() {
        return (
            <View style={this.style.btnGirisYapMainIc}>
                <TouchableOpacity onPress={this.OnPress} style={this.style.btnSifremiUnuttum}>
                    <Text style={{ color: "white", fontWeight: "bold" }}>Kaydet</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
