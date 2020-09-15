import React, { Component } from 'react'
import { Dimensions, View, Text, StyleSheet } from 'react-native'


let pencereBoyu = Dimensions.get("window")

interface Props {
    text: string
    aracGizlensinMi?: boolean
}
interface State {

}
export default class FormTextVeArac3 extends Component<Props, State> {
    state = {}

    widthAyarla = "70%"
    marginAyarla = "15%"
    bolmeSayisi = 1
    WidthHesapla = () => {
        this.widthAyarla = pencereBoyu.width >= 360 && pencereBoyu.width < 479 ? "70%" : pencereBoyu.width >= 480 && pencereBoyu.width < 719 ? "35%" : pencereBoyu.width >= 720 && pencereBoyu.width < 1023 ? "23.33%" : pencereBoyu.width >= 1024 && pencereBoyu.width < 1439 ? "20%" : "14.66%"

        this.marginAyarla = pencereBoyu.width >= 360 && pencereBoyu.width < 479 ? "15%" : pencereBoyu.width >= 480 && pencereBoyu.width < 719 ? "7.5%" : pencereBoyu.width >= 720 && pencereBoyu.width < 1023 ? "5%" : pencereBoyu.width >= 1024 && pencereBoyu.width < 1439 ? "2.5%" : "1%"

        // this.bolmeSayisi = pencereBoyu.width >= 360 && pencereBoyu.width < 479 ? 2 : pencereBoyu.width >= 480 && pencereBoyu.width < 719 ? 4 : pencereBoyu.width >= 720 && pencereBoyu.width < 1023 ? 6 : pencereBoyu.width >= 1024 && pencereBoyu.width < 1439 ? 8 : 12

        //@ts-ignore
        this.style.main = { ...this.style.main, width: this.widthAyarla, marginLeft: this.marginAyarla, marginRight: this.marginAyarla }
    }

    style = StyleSheet.create({
        main: {
            marginTop: 20,
            width: this.widthAyarla,
            display: this.props.aracGizlensinMi ? "none" : "flex",
            flexDirection: "column",
            alignItems: "center",
            marginLeft: 10,
            marginRight: 10,
        },
        text: {
            // fontSize: 13,
            fontWeight: "bold",
            marginLeft: 18,
            color: "black"
        }
    })

    //#region UNSAFE_componentWillMount, componentWillUnmount
    UNSAFE_componentWillMount() {
        this.WidthHesapla()
        Dimensions.addEventListener("change", (e) => {
            pencereBoyu = e.window
            this.WidthHesapla()
            this.forceUpdate()
        })
    }
    UNSAFE_componentWillReceiveProps(nextProps: Props) {
        this.style.main = { ...this.style.main, display: nextProps.aracGizlensinMi ? "none" : "flex" }
        this.forceUpdate()
    }
    //#endregion

    render() {
        return (
            <View style={this.style.main}>
                {
                    this.props.text !== "" ?
                        <View style={{ width: "100%" }}>
                            <Text style={this.style.text}>{this.props.text}</Text>
                        </View>
                        :
                        null
                }
                {this.props.children}
            </View>
        )
    }
}
