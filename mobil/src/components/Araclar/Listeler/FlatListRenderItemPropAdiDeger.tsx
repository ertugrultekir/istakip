import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native'


interface Props {
    value: any
    propAdi: string
}
interface State {

}
export default class FlatListRenderItemPropAdiDeger extends Component<Props, State> {
    state = {}

    render() {
        return (
            <View style={style.propAdiValueMainView}>
                <Text style={{ fontSize: 16 }}>{this.props.propAdi}</Text>
                <Text style={style.yaziyiKalinlastir}>{this.props.value}</Text>
            </View>
        )
    }
}

let style = StyleSheet.create({
    propAdiValueMainView: {
        flexDirection: "row"
    },
    yaziyiKalinlastir: {
        fontWeight: "bold",
        fontSize: 16,
        flex: 1,
        flexWrap: "wrap",
    }
})