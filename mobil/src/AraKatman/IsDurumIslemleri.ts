import { db } from "../Database/AnaScript"
import { IsDurumlari } from "../Database/Entities/IsDurumlari"

export async function IsDurumlariGetir() {
    try {
        let sonuc = await db.executeSql(
            `
                SELECT * FROM IsDurumlari
            `
        )
        let isDurumlariListesi: Array<IsDurumlari> = sonuc[0].rows.raw()

        return { HataVarMi: false, Mesaj: "", Deger: isDurumlariListesi }
    } catch (error) {
        console.log("Error: " + JSON.stringify(error))
        return { HataVarMi: true, Mesaj: JSON.stringify(error) }
    }
}