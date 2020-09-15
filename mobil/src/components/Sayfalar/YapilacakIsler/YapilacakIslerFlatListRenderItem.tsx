import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import YapilacakIslerStore from '../../../Stores/YapilacakIsler/YapilacakIslerStore'
import { observer } from 'mobx-react'
import FlatListRenderItemPropAdiDeger from '../../Araclar/Listeler/FlatListRenderItemPropAdiDeger'
import ButonOlustur from '../../Araclar/Butonlar/ButonOlustur'
import MiniButonOlustur from '../../Araclar/Butonlar/MiniButonOlustur'
import FormTextVeArac3 from '../../Araclar/FormAraclari/FormTextVeArac3'
import DropdownList from '../../Araclar/Araclar/DropdownList'
import BtnSilSadeceIcon from '../../Araclar/Butonlar/BtnSilSadeceIcon'
import { Isler } from '../../../Database/Entities/Isler'


interface Props {
    item: Isler
    index: number
}
interface State {

}
@observer
export default class YapilacakIslerFlatListRenderItem extends Component<Props, State> {
    state = {}

    render() {
        let { item, index } = this.props
        return (
            <TouchableOpacity
                style={
                    [
                        style.mainView,
                        index === 0 ? { marginTop: 14 } : {},
                        index === YapilacakIslerStore.data.length - 1 ? { marginBottom: 14 } : {},
                        item.Durum.Durum_id === 1 ? { backgroundColor: "lightgoldenrodyellow" } :
                            item.Durum.Durum_id === 2 ? { backgroundColor: "lightgreen" } :
                                item.Durum.Durum_id === 3 ? { backgroundColor: "lightcoral" } :
                                    item.Durum.Durum_id === 4 ? { backgroundColor: "lightgray" } : {}
                    ]
                }
                onPress={() => YapilacakIslerStore.BtnDuzenleOnPress(index)}
                activeOpacity={1}
            >
                <View style={style.saatVeSilMainView}>
                    <FlatListRenderItemPropAdiDeger
                        propAdi="Saat: "
                        value={`${item.BaslangicSaati.Saat} - ${item.BitisSaati.Saat}`}
                    />
                    <View style={{ marginLeft: -20 }}>
                        <BtnSilSadeceIcon
                            OnPress={() => YapilacakIslerStore.BtnSilOnPress(index)}
                        />
                    </View>
                </View>
                <Text style={style.aciklamaText}>{item.Aciklama}</Text>

                <View style={style.altAraclarMainView}>
                    <View style={{ width: "50%" }}>
                        <DropdownList
                            DdlOnChange={(itemValue, name) => YapilacakIslerStore.DinamikIsDurumlariDdlOnChange(itemValue, name, index)}
                            name={"ddlIsDurumu" + index}
                            options={YapilacakIslerStore.ddlIsDurumlariOptions}
                            value={YapilacakIslerStore.dinamik.get("ddlIsDurumu" + index)}
                        />
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

let style = StyleSheet.create({
    mainView: {
        backgroundColor: "lightgoldenrodyellow",
        elevation: 5,
        shadowColor: "gray",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowRadius: 3,
        borderRadius: 5,
        width: "98%",
        marginVertical: 7,
        paddingHorizontal: 12,
        paddingVertical: 7,
    },
    saatVeSilMainView: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    aciklamaText: {
        fontSize: 16,
    },
    altAraclarMainView: {
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        marginTop: 15
    }
})