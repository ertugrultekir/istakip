import React, { Component } from 'react'
import { Modal, StyleSheet, View, Text } from 'react-native';
import BtnTamam from '../Butonlar/BtnTamam';
import ButonOlustur from '../Butonlar/ButonOlustur';


interface Props {
    acikMi: boolean
    BackButtonOnClose: Function
    baslik: string
    uyariMesaji: string
    BtnHayirOnPress(): void
    BtnEvetOnPress(): void
}
interface State {

}
export default class UyariMesajiPopup extends Component<Props, State> {
    state = {}

    render() {
        return (
            <View style={styles.centeredView}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.props.acikMi}
                    onRequestClose={() => { this.props.BackButtonOnClose() }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>

                            <View style={styles.modalBaslikMain}>
                                <Text style={styles.modalBaslikText}>{this.props.baslik}</Text>
                            </View>

                            <View style={styles.icerikAlani}>
                                <View>
                                    <Text>{this.props.uyariMesaji}</Text>
                                </View>
                                <View style={styles.butonlarMainView}>
                                    <View style={styles.btnIptalView}>
                                        <ButonOlustur
                                            OnPress={this.props.BtnHayirOnPress}
                                            baslik="Hayır"
                                            butonRengi="red"
                                            widthYuzdesi="100"
                                            yaziRengi="white"
                                        />
                                    </View>
                                    <View style={styles.btnIptalView}>
                                        <ButonOlustur
                                            OnPress={this.props.BtnEvetOnPress}
                                            baslik="Evet"
                                            butonRengi="green"
                                            widthYuzdesi="100"
                                            yaziRengi="white"
                                        />
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    modalView: {
        width: "85%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    icerikAlani: {
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 20,
        paddingBottom: 20,
    },
    modalBaslikMain: {
        width: "100%",
        height: 40,
        backgroundColor: "darkorange",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    modalBaslikText: {
        fontWeight: "bold",
        color: "white",
        fontSize: 18
    },
    butonlarMainView: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 15
    },
    btnIptalView: {
        width: "50%",
        marginHorizontal: 5
    },
});