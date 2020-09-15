import React, { Component } from 'react'
import { View, StyleSheet, TouchableOpacity, Text, Button } from 'react-native'
import RNDateTimePicker from '@react-native-community/datetimepicker'


interface Props {
    value: Date
    name: string
    OnChange(value: Date, name: string): void
}
interface State {
    acikMi?: boolean
}
export default class DateBox extends Component<Props, State> {
    state = {
        acikMi: false
    }

    OnChange = (e, selectedDate: Date) => {
        if (selectedDate !== undefined) {
            this.props.OnChange(selectedDate, this.props.name)
        }
    }

    render() {
        var tarih1 = this.props.value
        var yil = tarih1.getFullYear()
        var ay = tarih1.getMonth()
        var gun = tarih1.getDate()

        var offSetSaati = tarih1.getTimezoneOffset() / 60
        var yeniTarih = new Date(Date.UTC(yil, ay, gun, offSetSaati))
        return (
            <TouchableOpacity style={style.main} activeOpacity={1} onPress={() => this.setState({ acikMi: true }, () => this.setState({ acikMi: false }))}>
                <Text>
                    {
                        (gun.toString().length === 1 ? "0" + gun : gun) + "/" + ((ay + 1).toString().length === 1 ? "0" + (ay + 1) : (ay + 1)) + "/" + yil
                    }
                </Text>
                <View style={style.asagiOk} />
                {
                    this.state.acikMi ?
                        <RNDateTimePicker
                            value={yeniTarih}
                            onChange={this.OnChange}

                        />
                        :
                        null
                }
            </TouchableOpacity>
        )
    }
}

let style = StyleSheet.create({
    main: {
        width: "100%",
        height: 40,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        backgroundColor: "white",
        borderColor: "gray",
        borderWidth: 1,
        borderStyle: "solid",
        borderRadius: 5,
        paddingVertical: 11,
        paddingHorizontal: 15,
    },
    asagiOk: {
        width: 0,
        height: 0,
        borderStyle: "solid",
        borderLeftColor: "transparent",
        borderLeftWidth: 6,
        borderRightColor: "transparent",
        borderRightWidth: 6,
        borderTopColor: "black",
        borderTopWidth: 6
    }
})