import React, { Component } from 'react'
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native'
import RNDateTimePicker from '@react-native-community/datetimepicker'


interface Props {
    value: string
    /**
     * Kullanırken zaman.getHours() ve zaman.getMinutes() şeklinde saat ve dakika elde edilir.
     * saat ve dakika şeklinde string olarak iki parametre almalıdır.
     */
    OnChange(value: string, name: string): void
    name: string
}
interface State {
    acikMi?: boolean
}
export default class TimeBox extends Component<Props, State> {
    state = {
        acikMi: false,
    }

    OnChange = (e: any, zaman: Date) => {
        if (zaman !== undefined) {
            var saat = zaman.getHours().toString()
            saat = saat.length === 1 ? "0" + saat : saat

            var dakika = zaman.getMinutes().toString()
            dakika = dakika.length === 1 ? "0" + dakika : dakika

            var saatVeDakika = saat + ":" + dakika
            this.props.OnChange(saatVeDakika, this.props.name)
        }
    }

    OnPress = () => {
        this.setState({ acikMi: true }, () => this.setState({ acikMi: false }))
    }

    render() {
        var tarih1 = new Date()
        var yil = tarih1.getFullYear()
        var ay = tarih1.getMonth() + 1
        var gun = tarih1.getDate()

        var nesneler = this.props.value.split(":")
        var offSetSaati = tarih1.getTimezoneOffset() / 60
        return (
            <>
                <TouchableOpacity style={style.main} activeOpacity={1} onPress={this.OnPress}>
                    <Text>
                        {
                            this.props.value
                        }
                    </Text>
                </TouchableOpacity>
                {
                    this.state.acikMi ?
                        <RNDateTimePicker
                            value={new Date(Date.UTC(yil, ay, gun, Number(nesneler[0]) + offSetSaati, Number(nesneler[1] !== undefined ? nesneler[1] : 0)))}
                            mode="time"
                            is24Hour={true}
                            display="spinner"
                            onChange={this.OnChange}
                        />
                        :
                        null
                }
            </>
        )
    }
}

let style = StyleSheet.create({
    main: {
        width: "100%",
        backgroundColor: "white",
        borderColor: "gray",
        borderWidth: 1,
        borderStyle: "solid",
        borderRadius: 5,
        paddingLeft: 15,
        paddingRight: 15,
        paddingVertical: 11,
    }
})