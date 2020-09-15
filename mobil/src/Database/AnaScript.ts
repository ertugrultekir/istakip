import SQLite, { SQLiteDatabase } from 'react-native-sqlite-storage';


export let db: SQLiteDatabase;

export async function DbOpen() {
    try {
        SQLite.enablePromise(true);
        db = await SQLite.openDatabase({ name: 'gunlukistakip.db', location: 'default' })
        await DbIlkYuklemeScripti();
    } catch (error) {
        console.log("Error: " + JSON.stringify(error))
    }
}

export async function DbIlkYuklemeScripti() {
    try {
        await db.executeSql(`PRAGMA foreign_keys = ON;`)

        //#region IsDurumlari
        await db.executeSql(
            `
            CREATE TABLE IF NOT EXISTS IsDurumlari(
                Durum_id INTEGER PRIMARY KEY,
                Durum VARCHAR(50) NOT NULL
            );
            `
        )
        //#endregion

        //#region Tarihler
        await db.executeSql(
            `
              CREATE TABLE IF NOT EXISTS Tarihler(
                Tarih_id INTEGER PRIMARY KEY,
                Tarih VARCHAR(1000) NOT NULL
              );
            `,
        )
        //#endregion

        //#region Saatler
        await db.executeSql(
            `
              CREATE TABLE IF NOT EXISTS Saatler(
                Saat_id INTEGER PRIMARY KEY,
                Saat VARCHAR(5) NOT NULL
              )
            `
        )
        //#endregion

        //#region Isler
        await db.executeSql(
            `
            CREATE TABLE IF NOT EXISTS Isler( 
              Is_id INTEGER PRIMARY KEY,
              Aciklama VARCHAR(1000) NOT NULL,
              Tarih_id   INT,
              BaslangicSaati_id    INT,
              BitisSaati_id        INT,
              Durum_id             INT,
              FOREIGN KEY(Tarih_id) REFERENCES Tarihler(Tarih_id),
              FOREIGN KEY(BaslangicSaati_id) REFERENCES Saatler(Saat_id),
              FOREIGN KEY(BitisSaati_id) REFERENCES Saatler(Saat_id),
              FOREIGN KEY(Durum_id) REFERENCES IsDurumlari(Durum_id)
            );
            `,
        )
        //#endregion

        //#region VW_Isler
        await db.executeSql(
            `
                CREATE VIEW IF NOT EXISTS VW_Isler
                AS
                SELECT
                    Is_id,
                    Aciklama,
                    i.Tarih_id,
                    t.Tarih,
                    i.BaslangicSaati_id,
                    s.Saat as 'BaslangicSaati',
                    i.BitisSaati_id,
                    s2.Saat as 'BitisSaati',
                    i.Durum_id,
                    d.Durum
                FROM Isler i
                INNER JOIN Tarihler t ON t.Tarih_id = i.Tarih_id
                INNER JOIN Saatler s ON s.Saat_id = i.BaslangicSaati_id
                INNER JOIN Saatler s2 ON s2.Saat_id = i.BitisSaati_id
                INNER JOIN IsDurumlari d ON d.Durum_id = i.Durum_id
            `
        )
        //#endregion

        //#region Notlar
        await db.executeSql(
            `
                CREATE TABLE IF NOT EXISTS Notlar(
                    Not_id INTEGER PRIMARY KEY,
                    Aciklama TEXT NOT NULL
                );
            `
        )
        //#endregion

        await IsDurumlariVarsayilanDegerleriEkle()
    } catch (error) {
        console.log("Error: " + JSON.stringify(error))
    }
}

export async function TabloyaYeniForeignKeyEkle() {
    try {
        db.transaction(tx => {
            tx.executeSql(
                `PRAGMA foreign_keys = OFF;`
            )

            tx.executeSql(
                `
                    CREATE TABLE Isler_Yeni( 
                      Is_id INTEGER PRIMARY KEY,
                      Aciklama VARCHAR(1000) NOT NULL,
                      Tarih_id   INT,
                      BaslangicSaati_id    INT,
                      BitisSaati_id        INT,
                      FOREIGN KEY(Tarih_id) REFERENCES Tarihler(Tarih_id),
                      FOREIGN KEY(BaslangicSaati_id) REFERENCES Saatler(Saat_id),
                      FOREIGN KEY(BitisSaati_id) REFERENCES Saatler(Saat_id)
                    );
                `
            )

            tx.executeSql(
                ` INSERT INTO Isler_Yeni(Is_id, Aciklama, Tarih_id) SELECT Is_id, Aciklama, Tarih_id FROM Isler;`
            )

            tx.executeSql(
                `DROP TABLE Isler; `
            )

            tx.executeSql(
                `ALTER TABLE Isler_Yeni RENAME TO Isler;`
            )

            tx.executeSql(
                `PRAGMA foreign_keys = ON;`
            )
        })
        // İŞLEM SONUNDA PROJE(CONSOLE) DURDURULUP TEKRAR BAŞLATILMALI. 
    } catch (error) {
        console.log("Error: " + JSON.stringify(error))
    }
}

async function IsDurumlariVarsayilanDegerleriEkle() {
    // await db.executeSql(`delete from Isler`)
    // await db.executeSql(`delete from IsDurumlari`)
    
    var tIsDurum = await db.executeSql(`SELECT COUNT(*) as 'adet' FROM IsDurumlari`)
    if (tIsDurum[0].rows.raw()[0].adet === 0) {
        await db.executeSql(
            `
                INSERT INTO IsDurumlari
                VALUES 
                (NULL, 'Bekleniyor'),
                (NULL, 'Yapıldı'),
                (NULL, 'Yapılmadı'),
                (NULL, 'İptal Edildi');
            `
        )
    }
}