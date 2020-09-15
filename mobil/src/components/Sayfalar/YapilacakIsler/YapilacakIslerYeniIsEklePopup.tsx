import React, { Component } from 'react'
import IslemPopup from '../../Araclar/Popuplar/IslemPopup'
import YapilacakIslerStore from '../../../Stores/YapilacakIsler/YapilacakIslerStore'
import FormIskeleti2 from '../../Araclar/FormAraclari/FormIskeleti2'
import FormTextVeArac3 from '../../Araclar/FormAraclari/FormTextVeArac3'
import DateBox from '../../Araclar/Araclar/DateBox'
import TimeBox from '../../Araclar/Araclar/TimeBox'
import TextInputArea from '../../Araclar/Araclar/TextInputArea'
import { observer } from 'mobx-react'
import { BildirimleriBaslat } from '../../Araclar/Bildirimler'


interface Props {

}
interface State {

}
@observer
export default class YapilacakIslerYeniIsEklePopup extends Component<Props, State> {
    state = {}

    render() {
        return (
            <IslemPopup
                BackButtonOnClose={() => YapilacakIslerStore.IsEklePopupAcKapa(false)}
                acikMi={YapilacakIslerStore.isEklePopupAcikMi}
                baslik={YapilacakIslerStore.guncellemeIslemiMi ? "Planı Güncelle" : "Yeni Plan Ekle"}
                BtnIptalOnPress={() => YapilacakIslerStore.IsEklePopupAcKapa(false)}
                BtnKaydetOnPress={async () => {
                    await YapilacakIslerStore.BtnKaydetVeGuncelle()
                    await BildirimleriBaslat()
                }}
            >
                <FormIskeleti2>
                    <FormTextVeArac3 text="Tarih">
                        <DateBox
                            OnChange={YapilacakIslerStore.OnChange}
                            name="dtpTarih"
                            value={YapilacakIslerStore.dtpTarih}
                        />
                    </FormTextVeArac3>
                    <FormTextVeArac3 text="Başlangıç Saati">
                        <TimeBox
                            OnChange={YapilacakIslerStore.OnChange}
                            name="txtBaslangicSaati"
                            value={YapilacakIslerStore.txtBaslangicSaati}
                        />
                    </FormTextVeArac3>
                    <FormTextVeArac3 text="Bitiş Saati">
                        <TimeBox
                            OnChange={YapilacakIslerStore.OnChange}
                            name="txtBitisSaati"
                            value={YapilacakIslerStore.txtBitisSaati}
                        />
                    </FormTextVeArac3>
                    <FormTextVeArac3 text="Yapılacak İş">
                        <TextInputArea
                            OnChangeText={YapilacakIslerStore.OnChange}
                            name="txtYapilacakIs"
                            value={YapilacakIslerStore.txtYapilacakIs}
                            placeholder="İş.."
                        />
                    </FormTextVeArac3>
                </FormIskeleti2>
            </IslemPopup>
        )
    }
}
