import React, { Component } from 'react'
import { View, FlatList, Text, StyleSheet, Platform } from 'react-native'
import DateBox from '../components/Araclar/Araclar/DateBox';
import { observer } from "mobx-react"
import YapilacakIslerStore from '../Stores/YapilacakIsler/YapilacakIslerStore';
import BtnYeniIsEkle from '../components/Araclar/Butonlar/BtnYeniIsEkle';
import YapilacakIslerYeniIsEklePopup from '../components/Sayfalar/YapilacakIsler/YapilacakIslerYeniIsEklePopup';
import BasariliMesajiPopup from '../components/Araclar/Popuplar/BasariliMesajiPopup';
import HataMesajiPopup from '../components/Araclar/Popuplar/HataMesajiPopup';
import YapilacakIslerFlatListRenderItem from '../components/Sayfalar/YapilacakIsler/YapilacakIslerFlatListRenderItem';
import DateBoxFlatListHeader from '../components/Araclar/Araclar/DateBoxFlatListHeader';
import PushNotification from "react-native-push-notification"
import { TarihiBeklenenTumIsler } from '../AraKatman/IsIslemleri';
import { BildirimleriBaslat } from '../components/Araclar/Bildirimler';
import LoadingPopup from '../components/Araclar/Popuplar/LoadingPopup';


interface Props {

}
interface State {

}
@observer
export default class YapilacakIsler extends Component<Props, State> {
    state = {}

    BtnIsEkleOnPress = async () => {
        YapilacakIslerStore.IsEklePopupAcKapa(true)
        YapilacakIslerStore.GuncellemeIslemiMiAcKapa(false)
    }

    async componentDidMount() {
        YapilacakIslerStore.LoadingPopupAcKapa(true)
        await YapilacakIslerStore.IsDurumlariGetir()
        await YapilacakIslerStore.IsleriListele()
        YapilacakIslerStore.LoadingPopupAcKapa(false)

        await BildirimleriBaslat()
        // PushNotification.getScheduledLocalNotifications((e) => { console.log(e) })
    }

    render() {
        return (
            <>
                <FlatList
                    ListHeaderComponent={
                        <View style={{ backgroundColor: "white" }}>
                            <View style={style.flatListHeaderAraclarMainView}>
                                <View style={{ width: "50%" }}>
                                    <DateBoxFlatListHeader
                                        OnChange={YapilacakIslerStore.FlatListHeaderDateboxOnChange}
                                        name="dtpHeaderTarih"
                                        value={YapilacakIslerStore.dtpHeaderTarih}
                                    />
                                </View>
                                <View style={{ width: "50%" }}>
                                    <BtnYeniIsEkle
                                        OnPress={this.BtnIsEkleOnPress}
                                        baslik="Yeni Plan Ekle"
                                        butonRengi="limegreen"
                                        widthYuzdesi="100"
                                        yaziRengi="white"
                                    />
                                </View>
                            </View>
                            <View style={style.flatListHeaderBaslikYazisiView}>
                                <Text style={style.flatListHeaderBaslikYazisiText}>Planlarım</Text>
                            </View>
                        </View>
                    }
                    stickyHeaderIndices={[0]}
                    data={YapilacakIslerStore.data}
                    renderItem={({ item, index }) => (
                        <View style={style.flatListRenderMainView}>
                            <YapilacakIslerFlatListRenderItem
                                index={index}
                                item={item}
                            />
                        </View>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                />

                <YapilacakIslerYeniIsEklePopup />

                {
                    YapilacakIslerStore.basariliMesajiAcikMi ?
                        <BasariliMesajiPopup
                            BackButtonOnClose={YapilacakIslerStore.IsleriListele}
                            BtnTamamOnOpress={YapilacakIslerStore.IsleriListele}
                            acikMi={YapilacakIslerStore.basariliMesajiAcikMi}
                            basariliMesaji={YapilacakIslerStore.basariliMesajiMesaj}
                            baslik="İşlem Başarılı :)"
                        />
                        :
                        null
                }
                {
                    YapilacakIslerStore.hataMesajiAcikMi ?
                        <HataMesajiPopup
                            BackButtonOnClose={() => YapilacakIslerStore.HataMesajiAcKapa(false)}
                            BtnTamamOnOpress={() => YapilacakIslerStore.HataMesajiAcKapa(false)}
                            acikMi={YapilacakIslerStore.hataMesajiAcikMi}
                            baslik="Hata Oluştu :("
                            hataMesaji={YapilacakIslerStore.hataMesajiMesaj}
                        />
                        :
                        null
                }
                {
                    YapilacakIslerStore.loadingPopupAcikMi ?
                        <LoadingPopup
                            acikMi={YapilacakIslerStore.loadingPopupAcikMi}
                        />
                        :
                        null
                }
            </>
        )
    }
}

let style = StyleSheet.create({
    flatListHeaderAraclarMainView: {
        flexDirection: "row",
    },
    flatListHeaderBaslikYazisiView: {
        backgroundColor: "white",
        paddingVertical: 10,
        justifyContent: "center",
        alignItems: "center",
        borderStyle: "solid",
        borderTopColor: "gray",
        borderBottomColor: "gray",
        borderWidth: 1,
        borderColor: "white",
        marginTop: 12,
    },
    flatListHeaderBaslikYazisiText: {
        color: "black",
        fontSize: 16,
        fontWeight: "bold",
    },
    flatListRenderMainView: {
        justifyContent: "center",
        alignItems: "center",
    }
})

PushNotification.configure({
    // (optional) Called when Token is generated (iOS and Android)
    onRegister: function (token) {
        console.log("TOKEN:", token);
    },

    // (required) Called when a remote is received or opened, or local notification is opened
    onNotification: function (notification) {
        console.log("NOTIFICATION:", notification);

        // process the notification

        // (required) Called when a remote is received or opened, or local notification is opened
        // notification.finish(PushNotificationIOS.FetchResult.NoData);
    },

    // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
    onAction: function (notification) {
        console.log("ACTION:", notification.action);
        console.log("NOTIFICATION:", notification);

        // process the action
    },

    // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
    onRegistrationError: function (err) {
        console.error(err.message, err);
    },

    // IOS ONLY (optional): default: all - Permissions to register.
    permissions: {
        alert: true,
        badge: true,
        sound: true,
    },

    // Should the initial notification be popped automatically
    // default: true
    popInitialNotification: true,

    /**
     * (optional) default: true
     * - Specified if permissions (ios) and token (android and ios) will requested or not,
     * - if not, you must call PushNotificationsHandler.requestPermissions() later
     * - if you are not using remote notification or do not have Firebase installed, use this:
     *     requestPermissions: Platform.OS === 'ios'
     */
    requestPermissions: Platform.OS === 'ios',
});