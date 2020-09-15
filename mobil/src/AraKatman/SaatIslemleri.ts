import { db } from "../Database/AnaScript"
import { DonusTipi } from "./DonusTipi"

export async function SaatEkle(saat: string) {
    try {
        let saatVarsaID = 0
        await db.transaction(async (tx) => {
            tx.executeSql(`SELECT * FROM Saatler WHERE Saat = "${saat}"`, [], async (tx2, result) => {
                saatVarsaID = result.rows.raw()[0] !== undefined ? result.rows.raw()[0].Saat_id : 0

                if (saatVarsaID === 0) {
                    tx.executeSql(
                        `
                            INSERT INTO Saatler
                            VALUES (NULL, "${saat}")
                        `, [], async (tx3, result2) => {
                        saatVarsaID = result2.insertId
                    })
                }
            })
        })

        let donus: DonusTipi = { Deger: saatVarsaID, HataVarMi: false, Mesaj: "" }
        return donus
    } catch (error) {
        console.log("Hata: " + JSON.stringify(error))
        return { HataVarMi: true, Mesaj: JSON.stringify(error) }
    }
}