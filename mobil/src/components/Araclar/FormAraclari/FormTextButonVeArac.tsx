import React, { Component } from 'react'
import { View, Dimensions, StyleSheet, Text } from 'react-native'
import BtnSilKucuk from '../Butonlar/BtnSilKucuk'


let pencereBoyu = Dimensions.get("window")

interface Props {
    text: string
    aracGizlensinMi?: boolean
    /**
     * BtnSil gibi bir araç buraya verilir. Herhangi bir css özelliği gerektirmez. Buraya verilen araç width:30 olmalıdır.
     */
    yanindakiKucukButon: any
}
interface State {

}
export default class FormTextButonVeArac extends Component<Props, State> {
    state = {}

    //#region widthAyarla, WidthHesapla, style
    widthAyarla = 230
    marginAyarla = 10
    bolmeSayisi = 1
    WidthHesapla = () => {
        this.widthAyarla = pencereBoyu.width >= 360 && pencereBoyu.width < 479 ? 300 : pencereBoyu.width >= 480 && pencereBoyu.width < 719 ? 230 : pencereBoyu.width >= 720 && pencereBoyu.width < 1023 ? 230 : pencereBoyu.width >= 1024 && pencereBoyu.width < 1439 ? 240 : 240

        this.marginAyarla = pencereBoyu.width >= 360 && pencereBoyu.width < 479 ? 300 : pencereBoyu.width >= 480 && pencereBoyu.width < 719 ? 460 : pencereBoyu.width >= 720 && pencereBoyu.width < 1023 ? 690 : pencereBoyu.width >= 1024 && pencereBoyu.width < 1439 ? 960 : 1440

        this.bolmeSayisi = pencereBoyu.width >= 360 && pencereBoyu.width < 479 ? 2 : pencereBoyu.width >= 480 && pencereBoyu.width < 719 ? 4 : pencereBoyu.width >= 720 && pencereBoyu.width < 1023 ? 6 : pencereBoyu.width >= 1024 && pencereBoyu.width < 1439 ? 8 : 12

        this.style.main = { ...this.style.main, width: this.widthAyarla, marginLeft: (pencereBoyu.width - this.marginAyarla) / this.bolmeSayisi, marginRight: (pencereBoyu.width - this.marginAyarla) / this.bolmeSayisi, }
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
    //#endregion

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
                <View style={{ width: this.widthAyarla - 33 }}>
                    <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                        {this.props.children}

                        <View style={{ marginLeft: 3 }}>
                            {this.props.yanindakiKucukButon}
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}
