import PushNotification from "react-native-push-notification"
import { TarihiBeklenenTumIsler } from '../../AraKatman/IsIslemleri';


export async function BildirimleriBaslat() {
    const tumIslerSonuc = await TarihiBeklenenTumIsler()

    PushNotification.cancelAllLocalNotifications()
    if (!tumIslerSonuc.HataVarMi) {
        for (let i = 0; i < tumIslerSonuc.Deger.length; i++) {
            const gun = Number(tumIslerSonuc.Deger[i].Tarih.substring(0, 2))
            const ay = Number(tumIslerSonuc.Deger[i].Tarih.substring(2, 4))
            const yil = Number(tumIslerSonuc.Deger[i].Tarih.substring(4, 9))
            const saat = Number(tumIslerSonuc.Deger[i].BaslangicSaati.substring(0, 2))
            const dakika = Number(tumIslerSonuc.Deger[i].BaslangicSaati.substring(3, 5))
            const guncelSaatVeDakika = new Date().toLocaleTimeString().substring(0, 5)
            const guncelYil = new Date().toISOString().substring(0, 4)
            const guncelAy = new Date().toISOString().substring(5, 7)
            const guncelGun = new Date().toISOString().substring(8, 10)

            let bildirimTarihi = new Date(yil, ay - 1, gun)
            bildirimTarihi.setHours(saat, dakika)

            if (tumIslerSonuc.Deger[i].Tarih === guncelGun + guncelAy + guncelYil) {
                if (tumIslerSonuc.Deger[i].BaslangicSaati > guncelSaatVeDakika) {
                    PushNotification.localNotificationSchedule({
                        ignoreInForeground: false,
                        title: "Bir işin vakti geldi!",
                        message: tumIslerSonuc.Deger[i].BaslangicSaati + "-" + tumIslerSonuc.Deger[i].BitisSaati + "  " + tumIslerSonuc.Deger[i].Aciklama,
                        date: bildirimTarihi,
                        playSound: true,
                        soundName: "default"
                    });
                }
            }
            else {
                PushNotification.localNotificationSchedule({
                    ignoreInForeground: false,
                    title: "Bir işin vakti geldi!",
                    message: tumIslerSonuc.Deger[i].BaslangicSaati + "-" + tumIslerSonuc.Deger[i].BitisSaati + "  " + tumIslerSonuc.Deger[i].Aciklama,
                    date: bildirimTarihi,
                    playSound: true,
                    soundName: "default"
                });
            }
        }
    }
}