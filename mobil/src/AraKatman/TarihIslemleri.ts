import { db } from "../Database/AnaScript";

export async function TarihEkle(eklenecekTarih: Date) {
    try {
        let tarihVarsaID = 0
        await db.transaction(async (tx) => {
            const offSetSaati = (eklenecekTarih.getTimezoneOffset() / 60) * (-1)
            eklenecekTarih.setHours(offSetSaati)

            let yil = eklenecekTarih.toISOString().substring(0, 4)
            let ay = eklenecekTarih.toISOString().substring(5, 7)
            let gun = eklenecekTarih.toISOString().substring(8, 10)

            tx.executeSql(`SELECT * FROM Tarihler WHERE Tarih = ${gun}${ay}${yil}`, [], async (tx2, result) => {
                tarihVarsaID = result.rows.raw()[0] !== undefined ? result.rows.raw()[0].Tarih_id : 0

                if (tarihVarsaID === 0) {
                    tx2.executeSql(
                        `
                            INSERT INTO Tarihler
                            VALUES (NULL, ${gun}${ay}${yil})
                        `, [], async (tx3, result2) => {
                        tarihVarsaID = result2.insertId
                    })
                }
            })
        })

        return { HataVarMi: false, Mesaj: "", Deger: tarihVarsaID }
    } catch (error) {
        console.log("Hatalı: " + JSON.stringify(error))
        return { HataVarMi: true, Mesaj: JSON.stringify(error) }
    }
}

export async function Listele() {

}