import { db } from "../Database/AnaScript"
import { TarihEkle } from "./TarihIslemleri"
import { SaatEkle } from "./SaatIslemleri"
import { IsDurumlariGetir } from "./IsDurumIslemleri"
import { DonusTipi } from "./DonusTipi"
import { Isler } from "../Database/Entities/Isler"


export async function IsEkle(aciklama: string, tarih: Date, baslangicSaati: string, bitisSaati: string) {
    try {
        //#region TarihEkle
        const tarihEkleSonuc = await TarihEkle(tarih)
        if (tarihEkleSonuc.HataVarMi) {
            return { HataVarMi: true, Mesaj: "Tarih eklemede sorun oluştu. İş planı ekleme işlemi iptal edildi." + tarihEkleSonuc.Mesaj }
        }
        //#endregion

        //#region SaatEkle
        const baslangicSaatiEkleSonuc = await SaatEkle(baslangicSaati)
        if (baslangicSaatiEkleSonuc.HataVarMi) {
            return { HataVarMi: true, Mesaj: "Saat eklemede sorun oluştu. İş planı ekleme işlemi iptal edildi." + baslangicSaatiEkleSonuc.Mesaj }
        }
        //#endregion

        //#region SaatEkle
        const bitisSaatiEkleSonuc = await SaatEkle(bitisSaati)
        if (bitisSaatiEkleSonuc.HataVarMi) {
            return { HataVarMi: true, Mesaj: "Saat eklemede sorun oluştu. İş planı ekleme işlemi iptal edildi." + bitisSaatiEkleSonuc.Mesaj }
        }
        //#endregion

        //#region DurumlariGetir
        const durumlarListesi = await IsDurumlariGetir()
        if (durumlarListesi.HataVarMi) {
            return { HataVarMi: true, Mesaj: "Durumları getirirken hata oluştu. İş planı ekleme işlemi iptal edildi." + durumlarListesi.Mesaj }
        }
        //#endregion

        //#region Validasyonlar
        //#region Saat Validasyonları
        if (baslangicSaati.substring(0, 2) > bitisSaati.substring(0, 2)) {
            let donus: DonusTipi = { Mesaj: "Başlangıç saati, bitiş saatinden büyük olamaz.", HataVarMi: true }
            return donus
        }

        if (baslangicSaati.substring(0, 2) === bitisSaati.substring(0, 2)) {
            if (baslangicSaati.substring(3, 5) > bitisSaati.substring(3, 5)) {
                let donus: DonusTipi = { Mesaj: "Başlangıç saati, bitiş saatinden büyük olamaz.", HataVarMi: true }
                return donus
            }
            else if (baslangicSaati.substring(3, 5) === bitisSaati.substring(3, 5)) {
                let donus: DonusTipi = { Mesaj: "Başlangıç saati, bitiş saatinden büyük olamaz.", HataVarMi: true }
                return donus
            }
        }
        //#endregion
        if (aciklama.trim() === "") {
            let donus: DonusTipi = { Mesaj: "Yapılacak işi girmeden devam edemezsiniz.", HataVarMi: true }
            return donus
        }
        //#endregion

        let sonuc = await db.transaction((tx) => {
            tx.executeSql(
                `
                    INSERT INTO Isler
                    VALUES (NULL, "${aciklama}", ${tarihEkleSonuc.Deger}, ${baslangicSaatiEkleSonuc.Deger}, ${bitisSaatiEkleSonuc.Deger}, ${durumlarListesi.Deger[0].Durum_id})
                `
            )
        })
        return { HataVarMi: false, Mesaj: "Kayıt işlemi başarı ile tamamlandı." }
    } catch (error) {
        console.log("Error: " + JSON.stringify(error))
        return { HataVarMi: true, Mesaj: JSON.stringify(error) }
    }
}

export async function IsleriListele(tarih: Date) {
    try {
        const offSetSaati = (tarih.getTimezoneOffset() / 60) * (-1)
        tarih.setHours(offSetSaati)

        let yil = tarih.toISOString().substring(0, 4)
        let ay = tarih.toISOString().substring(5, 7)
        let gun = tarih.toISOString().substring(8, 10)

        const tarihSonuc = await db.executeSql(
            `
                SELECT * FROM Tarihler
                WHERE Tarih = ${gun}${ay}${yil}
            `
        )

        const vw_islerSonuc = await db.executeSql(
            `
                select * from VW_Isler WHERE Tarih_id = ${tarihSonuc[0].rows.raw()[0].Tarih_id}
            `
        )

        let islerListesi: Array<Isler> = []
        for (let i = 0; i < vw_islerSonuc[0].rows.raw().length; i++) {
            islerListesi.push(
                {
                    Is_id: vw_islerSonuc[0].rows.raw()[i].Is_id,
                    Aciklama: vw_islerSonuc[0].rows.raw()[i].Aciklama,
                    BaslangicSaati: {
                        Saat: vw_islerSonuc[0].rows.raw()[i].BaslangicSaati,
                        Saat_id: vw_islerSonuc[0].rows.raw()[i].BaslangicSaati_id,
                    },
                    BitisSaati: {
                        Saat: vw_islerSonuc[0].rows.raw()[i].BitisSaati,
                        Saat_id: vw_islerSonuc[0].rows.raw()[i].BitisSaati_id,
                    },
                    Durum: {
                        Durum: vw_islerSonuc[0].rows.raw()[i].Durum,
                        Durum_id: vw_islerSonuc[0].rows.raw()[i].Durum_id
                    },
                    Tarih: {
                        Tarih: vw_islerSonuc[0].rows.raw()[i].Tarih,
                        Tarih_id: vw_islerSonuc[0].rows.raw()[i].Tarih_id
                    }
                }
            )
        }
        islerListesi.sort((a, b) => (a.BaslangicSaati.Saat > b.BaslangicSaati.Saat) ? 1 : (a.BaslangicSaati.Saat === b.BaslangicSaati.Saat) ? ((a.BitisSaati.Saat > b.BitisSaati.Saat) ? 1 : -1) : -1)

        return { HataVarMi: false, Mesaj: "", Deger: islerListesi }
    } catch (error) {
        console.log("Hata: " + JSON.stringify(error))
        return { HataVarMi: true, Mesaj: JSON.stringify(error) }
    }
}

export async function IsDurumunuGuncelle(isID: number, durumID: number) {
    try {
        db.transaction(async (tx) => {
            await tx.executeSql(
                `
                    UPDATE Isler
                    SET Durum_id = ${durumID}
                    WHERE Is_id = ${isID}
                `
            )
        })

        return { HataVarMi: false, Mesaj: "Güncelleme işlemi başarı ile tamamlandı." }
    } catch (error) {
        return { HataVarMi: true, Mesaj: JSON.stringify(error) }
    }
}

export async function IsGuncelle(data: Isler) {
    try {
        let tarihSonuc: DonusTipi = { HataVarMi: false, Mesaj: "", Deger: data.Tarih.Tarih_id }
        if (data.Tarih.GuncellendiMi) {
            tarihSonuc = await TarihEkle(new Date(data.Tarih.Tarih))
            if (tarihSonuc.HataVarMi) {
                return { HataVarMi: true, Mesaj: "Tarih ekleken hata oluştu." + tarihSonuc.Mesaj }
            }
        }

        let baslangicSaatSonuc: DonusTipi = { HataVarMi: false, Mesaj: "", Deger: data.BaslangicSaati.Saat_id }
        if (data.BaslangicSaati.GuncellendiMi) {
            baslangicSaatSonuc = await SaatEkle(data.BaslangicSaati.Saat)
            if (baslangicSaatSonuc.HataVarMi) {
                let donus: DonusTipi = { HataVarMi: true, Mesaj: "Saat eklerken hata oluştu!" + JSON.stringify(baslangicSaatSonuc.Mesaj) }
                return donus
            }
        }

        let bitisSaatSonuc: DonusTipi = { HataVarMi: false, Mesaj: "", Deger: data.BitisSaati.Saat_id }
        if (data.BitisSaati.GuncellendiMi) {
            bitisSaatSonuc = await SaatEkle(data.BitisSaati.Saat)
            if (bitisSaatSonuc.HataVarMi) {
                let donus: DonusTipi = { HataVarMi: true, Mesaj: "Saat eklerken hata oluştu!" + JSON.stringify(bitisSaatSonuc.Mesaj) }
                return donus
            }
        }

        //#region Validasyonlar
        //#region Saat Validasyonları
        if (data.BaslangicSaati.Saat.substring(0, 2) > data.BitisSaati.Saat.substring(0, 2)) {
            let donus: DonusTipi = { Mesaj: "Başlangıç saati, bitiş saatinden büyük olamaz.", HataVarMi: true }
            return donus
        }

        if (data.BaslangicSaati.Saat.substring(0, 2) === data.BitisSaati.Saat.substring(0, 2)) {
            if (data.BaslangicSaati.Saat.substring(3, 5) > data.BitisSaati.Saat.substring(3, 5)) {
                let donus: DonusTipi = { Mesaj: "Başlangıç saati, bitiş saatinden büyük olamaz.", HataVarMi: true }
                return donus
            }
            else if (data.BaslangicSaati.Saat.substring(3, 5) === data.BitisSaati.Saat.substring(3, 5)) {
                let donus: DonusTipi = { Mesaj: "Başlangıç saati ve bitiş saati aynı olamaz.", HataVarMi: true }
                return donus
            }
        }
        //#endregion
        if (data.Aciklama.trim() === "") {
            let donus: DonusTipi = { Mesaj: "Yapılacak işi girmeden devam edemezsiniz.", HataVarMi: true }
            return donus
        }
        //#endregion

        await db.transaction(async (tx) => {
            await tx.executeSql(
                `
                UPDATE Isler
                SET 
                    Aciklama = '${data.Aciklama}',
                    Tarih_id = ${tarihSonuc.Deger},
                    BaslangicSaati_id = ${baslangicSaatSonuc.Deger},
                    BitisSaati_id = ${bitisSaatSonuc.Deger}
                WHERE
                    Is_id = ${data.Is_id}
            `
            )
        })
        let donus: DonusTipi = { HataVarMi: false, Mesaj: "Güncelleme işlemi başarı ile tamamlandı" }
        return donus
    } catch (error) {
        let donus: DonusTipi = { HataVarMi: true, Mesaj: "Güncelleme işlemi sırasında hata oluştu" + JSON.stringify(error) }
        return donus
    }
}

export async function IsSil(isID: number) {
    try {
        db.transaction(async (tx) => {
            await tx.executeSql(
                `
                    DELETE FROM Isler
                    WHERE Is_id = ${isID}
                `
            )
        })

        return { HataVarMi: false, Mesaj: "Silme işlemi başarı ile tamamlandı." }
    } catch (error) {
        return { HataVarMi: true, Mesaj: JSON.stringify(error) }
    }
}

export async function TarihiBeklenenTumIsler() {
    try {
        let tarih = new Date()
        const offSetSaati = (tarih.getTimezoneOffset() / 60) * (-1)
        tarih.setHours(offSetSaati)

        let yil = tarih.toISOString().substring(0, 4)
        let ay = tarih.toISOString().substring(5, 7)
        let gun = tarih.toISOString().substring(8, 10)

        // let saat = new Date().toLocaleTimeString().substring(0, 2)
        // let dakika = new Date().toLocaleTimeString().substring(3, 5)

        // let bitisAraligiYil = new Date()
        // bitisAraligiYil.setDate(bitisAraligiYil.getDate() + 10)

        let vw_islerSonuc = await db.executeSql(
            `
                select * from VW_Isler WHERE Tarih >= ${gun}${ay}${yil}
            `
        )
        let donus: DonusTipi = { HataVarMi: false, Mesaj: "", Deger: vw_islerSonuc[0].rows.raw() }
        return donus
    } catch (error) {
        let donus: DonusTipi = { HataVarMi: true, Mesaj: JSON.stringify(error) }
        return donus
    }
}