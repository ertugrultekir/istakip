import { Tarihler } from "./Tarihler"
import { IsDurumlari } from "./IsDurumlari"
import { Saatler } from "./Saatler"
import { BaseEntity } from "./BaseEntity"

export class Isler extends BaseEntity {
    Is_id: number
    Aciklama: string
    Tarih: Tarihler
    BaslangicSaati: Saatler
    BitisSaati: Saatler
    Durum: IsDurumlari
}