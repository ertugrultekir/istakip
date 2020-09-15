import React, { Component } from 'react'
import { StyleSheet, View, Dimensions } from 'react-native'


let pencereBoyu = Dimensions.get("window")

interface Props {
}
interface State {

}
export default class FormIskeleti2 extends Component<Props, State> {
    state = {}
    width = pencereBoyu.width

    componentDidMount() {
        Dimensions.addEventListener("change", (e) => {
            pencereBoyu = e.window
            this.width = pencereBoyu.width
            this.forceUpdate()
        })
    }

    render() {
        return (
            <View style={{ justifyContent: "center", alignItems: "center" }}>
                <View style={{ width: this.width }}>
                    <View style={[style.main, { width: this.width }]}>
                        {this.props.children}
                    </View>
                </View>
            </View>
        )
    }
}

const style = StyleSheet.create({
    main: {
        flexWrap: "wrap",
        flexDirection: "row",
        alignItems: "center",
    }
})