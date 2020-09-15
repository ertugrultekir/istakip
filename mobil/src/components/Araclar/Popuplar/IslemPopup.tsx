import React, { Component } from 'react'
import { View, Modal, Text, StyleSheet, ScrollView } from 'react-native'
import BtnTamam from '../Butonlar/BtnTamam'
import BtnKaydet from '../Butonlar/BtnKaydet'
import BtnIptal from '../Butonlar/BtnIptal'


interface Props {
    acikMi: boolean
    BackButtonOnClose: Function
    baslik: string
    BtnKaydetOnPress?: Function
    BtnIptalOnPress?: Function
    BtnTamamOnPress?: Function
    kaydetButonuGizlensinMi?: boolean
    scrollViewKapatilsinMi?: boolean
}
interface State {

}
export default class IslemPopup extends Component<Props, State> {
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

                            {
                                this.props.scrollViewKapatilsinMi ?
                                    <View style={{ flexGrow: 1 }}>
                                        <View style={styles.icerikAlani}>
                                            <View>
                                                {this.props.children}
                                            </View>
                                            <View style={styles.butonlarMainView}>
                                                {
                                                    this.props.kaydetButonuGizlensinMi ?
                                                        <View style={styles.btnIptalView}>
                                                            <BtnTamam OnPress={this.props.BtnTamamOnPress} />
                                                        </View>
                                                        :
                                                        <>
                                                            <View style={styles.btnIptalView}>
                                                                <BtnIptal OnPress={this.props.BtnIptalOnPress} />
                                                            </View>
                                                            <View style={styles.btnIptalView}>
                                                                <BtnKaydet OnPress={this.props.BtnKaydetOnPress} />
                                                            </View>
                                                        </>
                                                }

                                            </View>
                                        </View>
                                    </View>
                                    :
                                    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                                        <View style={styles.icerikAlani}>
                                            <View>
                                                {this.props.children}
                                            </View>
                                            <View style={styles.butonlarMainView}>
                                                {
                                                    this.props.kaydetButonuGizlensinMi ?
                                                        <View style={styles.btnIptalView}>
                                                            <BtnTamam OnPress={this.props.BtnTamamOnPress} />
                                                        </View>
                                                        :
                                                        <>
                                                            <View style={styles.btnIptalView}>
                                                                <BtnIptal OnPress={this.props.BtnIptalOnPress} />
                                                            </View>
                                                            <View style={styles.btnIptalView}>
                                                                <BtnKaydet OnPress={this.props.BtnKaydetOnPress} />
                                                            </View>
                                                        </>
                                                }

                                            </View>
                                        </View>
                                    </ScrollView>
                            }
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
        width: "100%",
        display: "flex",
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
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 20,
        paddingBottom: 20,
    },
    modalBaslikMain: {
        width: "100%",
        height: 40,
        backgroundColor: "dodgerblue",
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
    }
});