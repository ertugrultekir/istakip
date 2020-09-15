import { observable, action, configure, runInAction } from "mobx"
import { IsleriListele, IsDurumunuGuncelle, IsSil, IsGuncelle, IsEkle } from "../../AraKatman/IsIslemleri"
import { IDdlOptions } from "../../components/Araclar/Araclar/DropdownList"
import { IsDurumlariGetir } from "../../AraKatman/IsDurumIslemleri"
import { Isler } from "../../Database/Entities/Isler"

configure({
    enforceActions: "always"
})

class YapilacakIslerStore {
    //#region Stateler
    @observable basariliMesajiAcikMi: boolean = false
    @observable basariliMesajiMesaj: string = ""
    @observable hataMesajiAcikMi: boolean = false
    @observable hataMesajiMesaj: string = ""
    @observable loadingPopupAcikMi: boolean = false

    @observable isEklePopupAcikMi: boolean = false
    @observable dtpHeaderTarih: Date = new Date()
    @observable dtpTarih: Date = new Date()
    @observable txtBaslangicSaati: string = "08:00"
    @observable txtBitisSaati: string = "09:00"
    @observable txtYapilacakIs: string = ""
    @observable data: Array<Isler> = []
    @observable ddlIsDurumlari: number = 1
    @observable ddlIsDurumlariOptions: Array<IDdlOptions> = []
    dinamik = observable.map()
    @observable secilenIndex: number = 0
    @observable guncellemeIslemiMi: boolean = false
    //#endregion
    //#region allOnChanges
    @action OnChange = (value: any, name: string) => {
        this[name] = value
        this.dinamik.set("guncellendiMi" + name, true)
    }
    @action DinamikOnChange = (value: any, name: string) => {
        this.dinamik.set(name, value)
    }
    @action DinamikIsDurumlariDdlOnChange = async (value: any, name: string, index: number) => {
        this.dinamik.set(name, value)

        var sonuc = await IsDurumunuGuncelle(this.data[index].Is_id, value)
        if (sonuc.HataVarMi) {
            this.HataMesajiAcKapa(true, sonuc.Mesaj)
            return
        }
        await this.IsleriListele()
    }
    @action FlatListHeaderDateboxOnChange = async (value: any, name: string) => {
        runInAction(() => {
            this[name] = value
        })
        await this.IsleriListele()
    }
    //#endregion

    //#region BasariliMesajiAcKapa, HataMesajiAcKapa, LoadingPopupAcKapa, StoreReset
    @action BasariliMesajiAcKapa = (acikMi: boolean, mesaj?: string) => {
        this.basariliMesajiAcikMi = acikMi
        this.basariliMesajiMesaj = mesaj
    }
    @action HataMesajiAcKapa = (acikMi: boolean, mesaj?: string) => {
        this.hataMesajiAcikMi = acikMi
        this.hataMesajiMesaj = mesaj
    }
    @action LoadingPopupAcKapa = (acikMi: boolean) => {
        this.loadingPopupAcikMi = acikMi
    }
    @action StoreReset = async () => {

    }
    //#endregion

    //#region IsEklePopupAcKapa, GuncellemeIslemiMiAcKapa
    @action IsEklePopupAcKapa = (acikMi: boolean) => {
        this.isEklePopupAcikMi = acikMi
        this.dtpTarih = this.dtpHeaderTarih

        this.txtYapilacakIs = ""
        this.txtBaslangicSaati = "08:00"
        this.txtBitisSaati = "09:00"
    }
    @action GuncellemeIslemiMiAcKapa = (guncellemeIslemiMi: boolean) => {
        this.guncellemeIslemiMi = guncellemeIslemiMi
    }
    //#endregion

    //#region IsleriListele, IsDurumlariGetir
    @action IsleriListele = async () => {
        runInAction(() => {
            this.basariliMesajiAcikMi = false
            this.loadingPopupAcikMi = true
            this.isEklePopupAcikMi = false
            this.data = []
        })
        let sonuc = await IsleriListele(this.dtpHeaderTarih)

        if (!sonuc.HataVarMi) {
            runInAction(() => {
                this.data = sonuc.Deger
                for (let i = 0; i < this.data.length; i++) {
                    this.dinamik.set("ddlIsDurumu" + i, this.data[i].Durum.Durum_id)
                }
            })
        }
        runInAction(() => {
            this.loadingPopupAcikMi = false
        })
    }
    @action IsDurumlariGetir = async () => {
        var sonuc = await IsDurumlariGetir()
        runInAction(() => {
            for (let i = 0; i < sonuc.Deger.length; i++) {
                this.ddlIsDurumlariOptions.push(
                    { text: sonuc.Deger[i].Durum, value: sonuc.Deger[i].Durum_id }
                )
            }
        })
    }
    //#endregion

    //#region BtnSilOnPress, BtnDuzenleOnPress, BtnKaydetVeGuncelle
    @action BtnSilOnPress = async (index: number) => {
        let sonuc = await IsSil(this.data[index].Is_id)
        if (sonuc.HataVarMi) {
            this.HataMesajiAcKapa(true, "Silme işlemi sırasında hata oluştu! " + sonuc.Mesaj)
        }
        else {
            await this.IsleriListele()
        }
    }
    @action BtnDuzenleOnPress = async (index: number) => {
        this.isEklePopupAcikMi = true

        const gun = Number(this.data[index].Tarih.Tarih.substring(0, 2))
        const ay = Number(this.data[index].Tarih.Tarih.substring(2, 4))
        const yil = Number(this.data[index].Tarih.Tarih.substring(5, 9))
        this.dtpTarih = new Date(yil, ay, gun)

        this.txtBaslangicSaati = this.data[index].BaslangicSaati.Saat
        this.txtBitisSaati = this.data[index].BitisSaati.Saat
        this.txtYapilacakIs = this.data[index].Aciklama
        this.secilenIndex = index
        this.guncellemeIslemiMi = true
    }
    @action BtnKaydetVeGuncelle = async () => {
        this.LoadingPopupAcKapa(true)
        if (this.guncellemeIslemiMi) {
            let data: Isler = {
                Is_id: this.data[this.secilenIndex].Is_id,
                Aciklama: this.txtYapilacakIs,
                BaslangicSaati: {
                    Saat: this.txtBaslangicSaati,
                    Saat_id: this.data[this.secilenIndex].BaslangicSaati.Saat_id,
                    GuncellendiMi: this.dinamik.get("guncellendiMi" + "txtBaslangicSaati")
                },
                BitisSaati: {
                    Saat: this.txtBitisSaati,
                    Saat_id: this.data[this.secilenIndex].BitisSaati.Saat_id,
                    GuncellendiMi: this.dinamik.get("guncellendiMi" + "txtBitisSaati")
                },
                Durum: {
                    Durum_id: this.data[this.secilenIndex].Durum.Durum_id
                },
                Tarih: {
                    Tarih: this.dtpTarih.toDateString(),
                    Tarih_id: this.data[this.secilenIndex].Tarih.Tarih_id,
                    GuncellendiMi: this.dinamik.get("guncellendiMi" + "dtpTarih")
                }
            }

            let sonuc = await IsGuncelle(data)
            if (sonuc.HataVarMi) {
                this.HataMesajiAcKapa(true, sonuc.Mesaj)
            }
            else {
                // this.BasariliMesajiAcKapa(true, "Günelleme işlemi başarı ile tamamlandı.")
            }
        }
        else {
            let sonuc = await IsEkle(this.txtYapilacakIs, this.dtpTarih, this.txtBaslangicSaati, this.txtBitisSaati)

            if (sonuc.HataVarMi) {
                this.HataMesajiAcKapa(true, sonuc.Mesaj)
            }
            else {
                // this.BasariliMesajiAcKapa(true, "Kayıt işlemi başarı ile tamamlandı.")
            }
        }
        await this.IsleriListele()
        this.LoadingPopupAcKapa(false)
    }
    //#endregion
}

export default new YapilacakIslerStore()