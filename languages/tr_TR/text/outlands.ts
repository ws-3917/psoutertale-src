import { asrielinter } from '../../../code/common';
import { toriCheck, toriSV } from '../../../code/outlands/extras';
import { game } from '../../../code/systems/core';
import {
   battler,
   choicer,
   iFancyYourVilliany,
   instance,
   outlandsKills,
   pager,
   postSIGMA,
   resetThreshold,
   roomKills,
   saver,
   world
} from '../../../code/systems/framework';
import { SAVE } from '../../../code/systems/save';
import { CosmosKeyed, CosmosProvider } from '../../../code/systems/storyteller';

// START-TRANSLATE

const toriel_aerialis = () =>
   SAVE.data.n.plot < 49
      ? [
           '<25>{#p/toriel}{#f/1}* Aerialis\'te bir çeşit sıvı olduğunu duydum...',
           '<25>{#f/0}* Elektirik yalıtımı için kullanılıyormuş.',
           '<25>{#f/1}* Bu sıvıyı taşıyabilseydin, ne kadar uzağa götürürdün?',
           '<25>{#f/1}* Onu Hisar\'a kadar taşır mıydın?',
           '<25>{#f/1}* Yoksa geri dönüşüm kutusuna atıp ondan kurtulur muydun?',
           '<25>{#f/0}* Ne kadar hayal kırıcı olurdu.'
        ]
      : SAVE.data.n.plot < 51
      ? world.bad_lizard > 1 || SAVE.data.n.state_foundry_undyne === 2
         ? [
              '<25>{#p/toriel}{#f/1}* Belki, bir gün öğretmen olursam...',
              '<25>{#f/0}* Kraliyet laboratuvarına bir gezi düzenleyebilirim.',
              "<25>{#f/0}* Dr. Alphys'in de izniyle, tabii.",
              '<25>{#f/1}* Orada kesin bir sürü ilginç deneyler yapıyorlardır...',
              "<25>{#f/0}* Çocuklar için harika bir öğrenme deneyimi olurdu."
           ]
         : [
              '<25>{#p/toriel}{#f/0}* Televizyon galanın lafı hızlıca yayılmış, küçüğüm!',
              '<25>{#f/0}* Tabi, ben göremedim, çünkü benim bir televizyonum yok.',
              '<25>{#f/1}* Duyduğumda, fakat, Şaşırmıştım doğrusu...',
              SAVE.data.n.state_aerialis_talentfails === 0
                 ? '<25>{#f/2}* Nasıl HİÇ hata yapmadın?'
                 : '<25>{#f/6}* Bu kadar \"muhteşem\" hareketlerin olduğunu bilmiyordum.'
           ]
      : SAVE.data.n.plot < 56
      ? [
           '<25>{#p/toriel}{#f/1}* Hmm...\n* Aerialis\'teki kraliyet muhafızları...',
           '<25>{#f/0}* Görünüşe göre en sevdikleri yemek... somon.',
           '<25>{#f/1}* Yoksa... dondurma mıydı?',
           '<25>{#f/2}* Dur, hayır, sanırım pizzaydı!',
           '<25>{#f/0}* Mütevazı kopyalayıcı olmadan bunların hepsi imkansız olurdu.',
           '<25>{#f/1}* Ve... Bunlar bu kadar yeni muhafızlar için tuhaf yiyecekler değil mi?'
        ]
      : SAVE.data.n.plot < 59
      ? [
           world.bad_lizard > 1 || SAVE.data.n.state_foundry_undyne === 2
              ? '<25>{#p/toriel}{#f/0}* Televizyona çıktığını duydum, küçüğüm.'
              : '<25>{#p/toriel}{#f/0}* Tekrar televizyona çıktığını duydum, küçüğüm.',
           '<25>{#f/1}* Ayrıca şok edici bir şey yaptığını da duydum...',
           iFancyYourVilliany()
              ? '<25>{#f/2}* Ve plastik patlayıcı yapmak için malzemeleri değiştirmişsin!'
              : SAVE.data.n.state_aerialis_crafterresult === 0
              ? '<25>{#f/2}* Ve patlama tehlikesine karşın direnmişsin!'
              : '<25>{#f/2}* Ve bir \"tek kullanımlık taşınabilir sırt roketini\" tek başına uçurmuşsun!',
           '<25>{#f/3}* ... sen...',
           '<25>{#f/4}* Hayatını tehlikeye atmaya mı ÇALIŞIYORDUN?'
        ]
      : SAVE.data.n.plot < 60
      ? [
           '<25>{#p/toriel}{#f/1}* Aerialis\'te ne tür bulmacalar var?',
           '<25>{#f/1}* Lazerli mi?',
           '<25>{#f/1}* Başarısız olduğunda seni başa atıyorlar mı?',
           '<25>{#f/1}* ... \"başarısız\" olunabilir mi ki?',
           '<25>{#f/0}* Hımm...\n*Bu kadar çok soru sorduğum için özür dilerim.',
           '<25>{#f/1}* Benim gibi bulmaca tutkunu biri bunları düşünmeden edemiyor...'
        ]
      : SAVE.data.n.plot < 61
      ? [
           '<25>{#p/toriel}{#f/1}* Mettaton\'la yaşadığın olayları duyunca...',
           '<25>{#f/0}* Aklıma bir şey geldi.',
           '<25>{#f/1}* YZ programlarının yasaklanmasından sonra onun gibi bir robot nasıl var olabilir?',
           '<25>{#f/5}* Elbette Dr. Alphys böylesine köklü bir kuralı ihlal etmemiştir.',
           '<25>{#f/0}* Hayır...\n* Başka bir açıklaması olmalı.'
        ]
      : SAVE.data.n.plot < 63
      ? [
           '<25>{#p/toriel}{#f/1}* Hmm...\n* Aerialis\'teki kraliyet muhafızları...',
           '<25>{#f/0}* Pozisyonlarına yeni terfi ettiklerini duydum.',
           '<25>{#f/1}* Ayrıca silah konusunda oldukça seçici olduklarını da duydum...',
           '<25>{#f/5}* Sunulan daha iyi seçeneklere rağmen bunları yükseltmeyi reddediyorlarmış.',
           '<25>{#f/0}* Silahlarını yükseltmelerini istediğimden değil de.',
           '<25>{#f/2}* Zaten senin için yeterince endişeleniyorum!'
        ]
      : SAVE.data.n.plot < 65
      ? SAVE.data.b.a_state_hapstablook
         ? [
              '<25>{#p/toriel}{#f/1}* Bir hayalet, Lurksalot, bazı aile işlerinden bahsetti.',
              '<25>{#f/5}* Görünüşe göre bir süredir akıllarındaymış.',
              '<25>{#f/0}* Neyse ki bunun yakında çözüleceğini söyledi.',
              '<25>{#f/1}* Senin yardımınla hem de, değil mi?',
              '<25>{#f/0}* Peki o zaman.\n* Seninle gurur duyuyorum, küçüğüm.'
           ]
         : [
              '<25>{#p/toriel}{#f/1}* Bir hayalet, Lurksalot, bazı aile işlerinden bahsetti.',
              '<25>{#f/5}* Görünüşe göre bir süredir akıllarındaymış.',
              '<25>{#f/1}* Kuzeninin senden yardım istemeye çalıştığını söyledi ama...',
              '<25>{#f/5}* O ara müsait değilmişsin.',
              '<25>{#f/1}* ... iyi bir nedenin vardı, değil mi?'
           ]
      : SAVE.data.n.plot < 66
      ? [
           '<25>{#p/toriel}{#f/1}* Bir robotun bu kadar güzel bir sese sahip olabileceğini kim bilebilirdi?',
           "<25>{#f/0}* Mettaton'un yeni kaydını duyunca kulaklarıma inanamadım.",
           '<26>{#f/1}* Yine de bazı şarkı sözleri bana göre biraz... şiddetliydi.',
           '<25>{#f/5}* ...',
           '<25>{#f/0}* Merak etme çocuğum.\n*Kimse seni uzaya atmayacak.'
        ]
      : SAVE.data.n.plot < 68
      ? [
           '<25>{#p/toriel}{#f/0}* Sans bana \"eğ merkezinin\" sevdiği bir yer olduğunu söyledi.',
           '<25>{#p/toriel}{#f/1}* Sanat dersleri, müzik kulüpleri, kütüphaneler...',
           '<25>{#p/toriel}{#f/5}* Bölgenin büyük kısmının küçük çocuklar için tehlikeli olması çok yazık.',
           '<25>{#p/toriel}{#f/3}* Misafirperver olmak için biraz daha çaba gösteremezler miydi?',
           '<25>{#p/toriel}{#f/2}* O medyumlar değerli, dönüştürücü deneyimler sunabilir!'
        ]
      : SAVE.data.n.plot < 70
      ? world.bad_robot
         ? [
              '<25>{#p/toriel}{#f/0}* Tanıdığım herkes \"büyük finalin\" iptal edilmesinden dolayı üzgün.',
              '<25>{#p/toriel}{#f/0}* Güzel bir mücadele olabileceğini söylüyorlardı.',
              '<25>{#p/toriel}{#f/1}* Böyle bir savaşa girişmek zorunda olmadığın için rahatlasam da...',
              '<25>{#p/toriel}{#f/5}* Sırada seni nelerin beklediği konusunda endişelenmeden edemiyorum.'
           ]
         : SAVE.data.b.killed_mettaton
         ? [
              '<25>{#p/toriel}{#f/0}* Tanıdığım herkes \"büyük final\"den bahsediyor.',
              '<25>{#p/toriel}{#f/1}* Mettaton\'un şovu için canını verdiğini söylüyorlar...',
              '<25>{#p/toriel}{#f/0}* Ama ben öyle düşünmüyorum.',
              '<25>{#p/toriel}{#f/1}* Sonuçta robotlar tamir edilebilir, değil mi?'
           ]
         : [
              '<25>{#p/toriel}{#f/0}* Tanıdığım herkes \"büyük final\"den bahsediyor.',
              '<25>{#p/toriel}{#f/0}* Seni ve Mettaton\'u izlemenin onları gerçekten mutlu ettiğini söylüyorlar.',
              '<25>{#p/toriel}{#f/1}* İyi vakit geçirdiğini görmek beni mutlu etse de...',
              '<25>{#p/toriel}{#f/5}* Sırada seni nelerin beklediği konusunda endişelenmeden edemiyorum.'
           ]
      : [
           '<25>{#p/toriel}{#f/1}* İyi vakit geçirdiğinize sevindim ama...',
           '<25>{#p/toriel}{#f/5}* Muhtemelen şimdiye Hisar\'a varmışsındır.',
           '<25>{#p/toriel}{#f/9}* ...',
           "<25>{#p/toriel}{#f/10}* Dikkatli ol, tamam mı?"
        ];

export default {
   a_outlands: {
      darktorielcall: [
         '<26>{#p/toriel}{#f/5}* Özür dilerim küçüğüm.\n* Telefonumu tekrardan kapattım.',
         '<25>{#p/toriel}{#f/9}* Lütfen beni şimdilik burada bırak.',
         '<25>{#p/toriel}{#f/10}* Zamanı gelince sana ve diğerlerine döneceğim.'
      ],
      secret1: () => [
         '<32>{#p/basic}* Burada bir kapı var.\n* Kilitli.',
         ...(SAVE.data.b.oops ? [] : [ "<32>{#p/basic}* Belki bir yerlerde bir anahtar vardır...?" ])
      ],
      secret2: [ '<32>{#p/human}* (Gizli Anahtarı kullandın.)' ],
      exit: () => [ choicer.create('* (Outlands\'den çıkacak mısın?)', 'Evet', 'Hayır') ],
      nosleep: [ '<32>{#p/human}* (Bir şey uykunu bölmüş gibi görünüyor.)' ],
      noequip: [ '<32>{#p/human}* (Kullanmamaya karar verdin.)' ],
      finaltext: {
         a: [ "<32>{#p/basic}* Buralarda bir yerlerde olmalı..." ],
         b: [ '<32>{#p/basic}* Ha...?', '<32>{#p/basic}* Oradaki...\n* O mu?' ],
         c: [
            "<32>{#p/basic}* ... bu o.",
            "<32>* ...\n* Frisk, eğer hazırsan...",
            "<32>* Görmek istediğiniz herkesi gördüysen...",
            '<32>* ...',
            '<32>* Yapman gerekeni biliyorsun.',
            "<32>* Yoksa sen hazır olana kadar bekleyeceğim."
         ],
         d1: [ '<32>{#p/basic}* Asriel.' ],
         d2: [ '<25>{#p/asriel1}{#f/13}* ... Frisk?\n* Sen misin?' ],
         d3: [ "<32>{#p/basic}* Asriel, benim...", '<32>{#p/basic}* En iyi arkadaşın, hatırladın mı?' ],
         d4: [
            '<25>{#p/asriel1}{#f/25}* ...!\n',
            '<25>{#f/25}* $(name)...?\n',
            "<25>{#f/13}* Ama... sen...",
            "<25>{#f/23}* ... sen..."
         ],
         d5: [ '<32>{#p/basic}* Ölü müyüm?' ],
         d6: [
            '<32>{#p/basic}* Heh.\n* Uzun bir süre... bir parçam öyle olmayı diledi.',
            '<32>{#p/basic}* Sana yaptıklarımdan sonra, ben...\n* Bunu hak ettiğimi hissettim.'
         ],
         d7: [ "<25>{#p/asriel1}{#f/7}* Öyle deme, $(name)!", "<25>{#f/6}* ... hatalısın!" ],
         d8: [
            '<33>{#p/basic}* Haha... Diyene bak.\n* Bay \"git seni seven insanlarla birlikte ol.\"',
            '<32>* Ama benim hakkımdaki gerçeği bilmeyi hak ediyorsun Asriel...',
            '<32>* Her şey hakkında.'
         ],
         d9: [ '<25>{#p/asriel1}{#f/23}* ...', '<25>{#f/23}* $(name)...' ],
         d10: [ '<25>{#p/asriel1}{#f/13}* Ama...', '<25>{#f/15}* Sen hala nasıl...' ],
         d11: [
            '<32>{#p/basic}* ... fark eder mi?',
            '<32>* Orada yaptığın gibi beni unutmakta haklıydın.',
            "<32>* Doğrusu ben berbat biriydim...",
            "<32>* Ve ben, sahip olmayı dilediğin arkadaş ya da kardeş olamadım."
         ],
         d12: [ '<25>{#p/asriel1}{#f/13}* $(name), Ben...' ],
         d13: [ "<32>{#p/basic}* Sorun değil Asriel.", "<32>* Olduğundan daha iyi olmaya çalışmana gerek yok." ],
         d14: [ '<25>{#p/asriel1}{#f/22}* ...', '<25>{#f/22}* ... neden ki?' ],
         d15: [
            '<32>{#p/basic}* Yani...',
            '<32>* Her zaman insanlığın kurtuluşun ötesinde olduğunu düşündüm.',
            '<32>* Ve, ne olursa olsun...',
            '<32>* Eğer insansan... karanlığa düşmeye mahkum olduğunu.',
            '<32>* Ama Frisk\'i yolculuğu boyunca takip ettikten sonra...',
            '<32>* Gerçeği anladım.',
            '<32>* Diğer insanlar... her zaman bu gerçeği görmezden gelmeyi kolaylaştıran bir şeyler yaptılar.',
            "<33>* Millete saldırırlardı veya daha kötüsü onları... yok ederlerdi.",
            '<32>* Ama Frisk hariç.',
            '<32>* Karşılaştıkları zorluklar ne olursa olsun, her fırsatta nezaket ve merhamet gösterdiler.',
            '<32>* Beni... haksız çıkardılar.',
            "<32>* Ve şimdi bu yüzden sana davranış şeklimin hiçbir mazereti olmadığını biliyorum.",
            '<32>* Yaşadığın her şeyin, kaybettiğin her şeyin...',
            "<32>* Suçlusu benim."
         ],
         d16: [ '<25>{#p/asriel1}{#f/13}* $(name)...', '<25>{#f/15}* Bunca zamandır bilinçli miydin?' ],
         d17: [
            '<32>{#p/basic}* ... evet.\n* Sanırım öyleydim.',
            '<32>* Ben böyle yaşadım, Asriel...\n* Öldüğümüzden beri.',
            "<32>* Ve... sana söylemem gereken bir şey daha var."
         ],
         d18: [ '<25>{#p/asriel1}{#f/21}* Neymiş bakalım?' ],
         d19: [
            '<32>{#p/basic}* Güç kalkanını birlikte geçtiğimiz zamanı hatırlıyor musun?',
            '<32>* Eski dünyanın harabelerine vardığımız, ve o insanlar tarafından bulunduğumuz zaman?\n',
            '<32>* Gücümüzü onları yok etmek için kullanmak istemiştim... ama sen beni durdurmuştun, hatırladın mı?'
         ],
         d20: [ '<25>{#p/asriel1}{#f/16}* ... evet.' ],
         d21: [
            "<32>{#p/basic}* O zaman anlamamıştım ama...",
            '<32>* Şimdi anlıyorum.',
            '<32>* ... sen sadece beni... korkunç bir hata yapmaktan alıkoymaya çalışıyordun.'
         ],
         d22: [ '<25>{#p/asriel1}{#f/15}* $(name)...' ],
         d23: [
            "<32>{#p/basic}* Eğer sen olmasan, karakol ikinci bir savaşta yok edilirdi.",
            '<32>* Eğer sen olmasaydın, güya kurtarmaya çalıştığım canavarlar...',
            '<32>* ... bizimle birlikte ölürdü.'
         ],
         d24: [ '<25>{#p/asriel1}{#f/25}* $(name), Ben...' ],
         d25: [
            '<32>{#p/basic}* Şimdi bile o zamanki kararın hala önemli.',
            '<32>* Şimdi bile...',
            "<32>* Benden daha iyi bir kardeşsin."
         ],
         d26: [
            '<25>{#p/asriel1}{#f/25}* Seni affediyorum, $(name)!',
            "<25>{#f/23}* Tamam mı?\n*Bunu yapmak zorunda değilsin...",
            '<25>{#f/22}* O zamanlar ne kadar güçlü hissettiğini biliyorum ve...',
            "<25>{#f/15}* Sırf benim için fikrini değiştirmeni..."
         ],
         d27: [
            '<32>{#p/basic}* Hayır.\n* Artık değil.',
            '<32>* İnsanlar değişebilir, Asriel...',
            "<32>* Her zaman inandığın şey bu değil miydi?"
         ],
         d28: [ '<25>{#p/asriel1}{#f/13}* ... Hala inanıyorum.' ],
         d29: [
            "<32>{#p/basic}* Son yüz yılı kendimi küçük görerek geçirdim.",
            "<32>* Son yüz yılı asla beslememem gereken bir kin besleyerek geçirdim.",
            '<32>* O sırada beni neyin hayatta tuttuğunu merak ettim...',
            '<32>* Ve artık nihayet cevabı biliyorum.'
         ],
         d30: [ '<25>{#p/asriel1}{#f/15}* ...?' ],
         d31: [ "<32>{#p/basic}* ... o sendin Asriel.", "<32>* Beni hayatta tutan sendin." ],
         d32: [
            '<32>{#p/basic}* Bunu... yerine getirilmemiş bir söz gibi düşünün.',
            '<32>* O kini tutmak... seni düşündüğüm gibi düşünmek...',
            "<32>* Senin için olabileceğimden daha fazlası olabileceğimi düşünmek...",
            "<32>* Bunca zamandır beni durduran şey oydu."
         ],
         d33: [ '<25>{#p/asriel1}{#f/23}* $(name)...' ],
         d34: [ '<32>{#p/basic}* Asriel.\n* Kardeşim.', '<32>* Gerçeği bilmeyi hak ediyorsun.' ],
         d35: [ '<25>{*}{#p/asriel1}{#f/25}* Ha?\n* Ama sen zaten- {%}' ],
         d36: [ '<32>{#p/basic}* Ben de seni affediyorum.' ],
         d37: [ '<25>{#p/asriel1}{#f/30}{#i/4}* ...!', '<25>{#p/asriel1}{#f/26}{#i/4}* $(name)...' ],
         d38: [ '<32>{#p/basic}* Şşt...', "<32>* Sorun değil.", "<32>* Seninleyim, tamam mı?" ],
         d39: [ '<25>{#p/asriel1}{#f/25}{#i/4}* Ben...\n' ],
         d40: [ "<32>{#p/basic}* Seninleyim, Asriel.\n" ],
         d41: [
            '<32>{#p/basic}* ... Hissedebiliyorum.\n',
            '<32>* Aradan yüz yıl geçmesine rağmen...',
            "<32>* Hala orada, değil mi?",
            '<32>* Küçük bir melek gibi...',
            '<32>* Beni kolluyor, beni kendi kötü seçimlerimden koruyor...',
            '<32>* ... bir gün ona iyiliğimin karşılığını verebilmem için.'
         ],
         d42: [ "<32>{#p/basic}* Artık hepsi anlamlı geliyor.", '<32>* Ne yapmam gerektiğini biliyorum.' ],
         d43: [ '<32>* Ne yapmam gerektiğini biliyorum.' ],
         d44: [ '<25>{*}{#f/25}* Hayır...!{^60}{%}', '<25>{*}{#f/26}* B... bırak beni!{^60}{%}' ],
         d45: [ '<32>{*}{#p/basic}* Heh...{^60}{%}', '<32>{*}* ... benim için annemle ve babama göz kulak ol, tamam mı?{^60}{%}' ],
         d46: [ '<25>{#p/asriel1}{#f/25}* Frisk, orada mısın?', '<25>{#f/22}* Lütfen... uyan...' ],
         d47: [ "<25>{#p/asriel1}{#f/23}* Ben...\n*Ben de seni kaybetmek istemiyorum..." ],
         d48: [ '<25>{#p/asriel1}{#f/17}* ... işte buradasın.' ],
         d49: [
            "<25>{#p/asriel1}{#f/23}* Ha... Bir an seni kaybettiğimi sandım.",
            "<25>{#f/22}* Beni bir daha böyle korkutma, tamam mı?",
            '<25>{#f/13}* ...'
         ],
         d50: [
            '<25>{#p/asriel1}{#f/13}* Pekala...\n* Artık RUH\'um yeniden içimde.',
            '<25>{#f/15}* Gerçek olan.',
            '<25>{#f/16}* ...',
            "<26>{#f/16}* $(name) ve ben öldüğümüzde, kendisini çevreme sarmış olsa gerek ki...",
            '<25>{#f/13}* ... buraya sağ salim geri getirilebilmiştim.',
            '<26>{#f/17}* Bunca zaman boyunca sırf beni görmebilmek için dayandı, Frisk...',
            '<25>{#f/13}* ... yani en azından onu onurlandırabilirim.',
            '<25>{#f/15}* Her zaman yaşamamı istedikleri hayatı yaşarım.'
         ],
         d51: [
            '<25>{#p/asriel1}{#f/23}* ... Frisk.',
            "<25>{#f/23}* Bundan sonra seninle kalacağım.",
            "<25>{#f/17}* Nereye gidersen git... Seni takip edeceğim.",
            '<25>{#f/13}* Böyle konularda...\n* Sana güvenebileceğimi hissediyorum.',
            "<25>{#f/13}* Birbirimiz hakkında pek bir şey bilmesek bile.",
            "<25>{#f/15}* ... Bilmiyorum.",
            '<25>{#f/15}* ...',
            '<25>{#f/13}* Frisk... bundan gerçekten emin misin?',
            "<25>{#f/13}* Seni, arkadaşlarını incittiğim tüm zamanlar...",
            "<25>{#f/22}* Bu... şu anda düşünebildiğim tek şey bu.",
            '<25>{#f/21}* Onların bu şekilde öldüğünü aklımda tekrar tekrar görmek...',
            "<25>{#f/22}* Bunu yapanın ben olduğumu bile bile hem de.",
            '<25>{#f/15}* ...',
            '<25>{#f/15}* Böyle birinin yanında olabileceğinden gerçekten emin misin?',
            '<32>{#p/human}* (...)',
            '<25>{#p/asriel1}{#f/15}* ...',
            "<25>{#f/17}* ... sanırım seni anlamıyorum Frisk.",
            "<25>{#f/23}* Sana ne yaparsam yapayım... pes etmiyorsun.",
            '<25>{#f/22}* ...',
            "<25>{#f/13}* Hey.\n* Belki de o kadar fena olmaz.",
            "<25>{#f/17}* Yanımda olman kesinlikle sorun yaratmaz.",
            '<25>{#f/13}* ...\n* Mesele şu ki...\n* Eğer şimdi burada kalsaydım...',
            "<25>{#f/15}* $(name) için doğru olmazdı... bilirsin ya?\n",
            '<25>{#f/13}* Hem de, RUH\'um tekrar içimdeyken...',
            "<25>{#f/13}* Tekrardan yıldıza dönmem.",
            "<25>{#f/13}* Yani... burada kalmamın bir anlamı yok."
         ],
         d52: [
            '<25>{#p/asriel1}{#f/17}* Peki.\n* Artık gitsen iyi olur.',
            '<25>{#f/20}* Arkadaşların muhtemelen şu anda senin için çok endişeleniyorlardır.'
         ],
         e1: [
            '<25>{#p/asriel1}{#f/15}* ...',
            "<25>{#f/16}* Bundan sonra $(name) ne yapacak bilmiyorum.",
            "<25>{#f/13}* Beni görme şansı için beklediler ama bu...",
            '<25>{#f/15}* ... artık geçmişte kaldı.'
         ],
         e2: [
            "<25>{#p/asriel1}{#f/13}* Onca zaman sırf beni görmek için beklediğine hala inanamıyorum...",
            '<25>{#f/23}* İnatçı salak.',
            '<25>{#f/17}* ... eğer hala konuşan bir yıldız olsaydım böyle söylerdim.',
            "<25>{#f/13}* Ama... Onun gerçekten bir aptal olduğunu düşünmüyorum."
         ],
         e3: [
            "<25>{#p/asriel1}{#f/13}* $(name) aptal değil.\n* Ve ben...",
            '<25>{#f/13}* Kendisi hakkında söylediklerinin çoğuna katılıyorum...',
            '<25>{#f/15}* Sahip olmayı dilediğim türden bir arkadaş olmadıklarına...',
            "<25>{#f/7}* ... ama bu onun gitmesini istediğim anlamına gelmiyor!"
         ],
         e4: [
            "<25>{#p/asriel1}{#f/13}* $(name)'in gitmesi gerekmiyor ya...",
            "<25>{#f/17}* İsterse bizimle kalabilir.\n* Kalmasını isterim.",
            "<25>{#f/15}* Ama gitmek isterse anlarım.",
            '<25>{#f/16}* Oyununu \"kazandı\".\n* Artık benimle \"oynamak\" istemezler.'
         ],
         e5: [
            "<25>{#p/asriel1}{#f/13}* ... $(name)...\n* Eğer hala oradaysan, dinliyorsan...",
            '<25>{#f/15}* Seni sevdiğimi bilmeni istiyorum.',
            '<25>{#f/23}* En harika insan olmayabilirsin...',
            '<25>{#f/22}* Ama içten içe hala beni önemsiyordun.'
         ],
         e6: [
            '<25>{#p/asriel1}{#f/23}* Ha...',
            '<25>{#f/22}* Şu anda muhtemelen deli biri gibi görünüyorum.',
            '<25>{#f/15}* Çoktan unutmam gereken birine takıyorum...',
            '<26>{#f/17}* ... sanırım $(name) ve ben gerçekten sadece bir çift inatçı aptalız.'
         ],
         e7: [
            '<25>{#p/asriel1}{#f/13}* Bir keresinde $(name) ve ben bir yatak için kavga ediyorduk...',
            "<25>{#f/10}* Çünkü ikimiz de yanında komidin olanı istiyorduk.",
            '<26>{#f/15}* İkimiz de birbirimizi kenara itip yer açmaya çalışıyorduk...',
            '<25>{#f/4}* Bütün bu curcuna bizi o kadar yordu ki uyuyakaldık.',
            '<25>{#f/13}* Ama uyandığımızda...',
            '<25>{#f/17}* Yan yana uzanıyorduk.',
            "<25>{#f/13}* Kalkmaya çalıştım ama... bırakmak istemedi.",
            '<26>{#f/15}* Sayıklayıp duruyordu.',
            '<25>{#f/15}* \"...sıcak...\"',
            '<25>{#f/15}* \"... kabarık...\"',
            '<25>{#f/20}* Normalde rahatsız olurdum ama...',
            "<25>{#f/17}* ... o esnada kavga etmediğimiz için mutluydum."
         ],
         e8: [
            '<25>{#p/asriel1}{#f/13}* Bir keresinde de $(name) ve ben annem ve babam için akşam yemeği hazırlıyorduk.',
            '<25>{#f/15}* Hep daha baharatlı yapmak istedi...',
            '<25>{#f/3}* Dürüst olmam gerekirse eğer şimdi isteseydi şikayet etmezdim.',
            '<25>{#f/20}* Şu anda baharatlı bir şeyler yiyebilirim.',
            '<25>{#f/13}* Ama o zamanlar tatlılara daha çok düşkündüm.\n* Çoğu canavar öyledir.',
            '<25>{#f/15}* Sonunda karıştırma kabıyla halat çekme oyunu oynadık ve...',
            '<25>{#f/20}* Nasıl sonuçlandığını hayal edebiliyorsundur.',
            '<25>{#f/17}* Annem bize pisliği temizlettirdi elbette.',
            '<25>{#f/13}* Sonra babam bizi yemeğe çıkardı ve ikimiz de istediğimizi aldık.'
         ],
         e9: [
            "<25>{#p/asriel1}{#f/15}* $(name) ve ben...\n* Sanki hiçbir konuda anlaşamıyorduk gibi...",
            '<25>{#f/20}* Birlikte vakit geçirmek dışında yani.',
            '<26>{#f/17}* Farklılıklarımıza rağmen $(name) ve ben gerçekten ayrılamazdık.',
            "<25>{#f/13}* Ölümün kendisi bile bizi sonsuza kadar ayıramazdı."
         ],
         e10: [
            "<25>{#p/asriel1}{#f/17}* ... sence hala burada mı, Frisk?",
            '<25>{#f/17}* Bizi şu anda izliyor bile olabilir.',
            "<25>{#f/23}* Harika olmaz mıydı?",
            "<25>{#f/22}* Ama kesin olarak bilmek imkansız."
         ],
         e11: [
            "<25>{#p/asriel1}{#f/17}* Vay canına.\n* Seninle kalacak biri için...",
            "<25>{#f/20}* Kesinlikle $(name) ile olmayı tercih ediyormuşum gibi konuşuyorum.",
            "<25>{#f/13}* Ama... hiç de öyle değil.",
            "<25>{#f/17}* Eskiden tanıdığım birini yad etmeden edemiyorum."
         ],
         e12: () => [
            '<25>{#p/asriel1}{#f/17}* Frisk...\n* Bilmeni istiyorum ki...',
            '<25>{#f/13}* Sayende...',
            '<25>{#f/23}* Yeniden bir geleceğim varmış gibi hissediyorum.',
            '<25>{#f/22}* ...',
            ...(!SAVE.flag.b.pacifist_marker_forgive
               ? [ "<25>{#f/22}* Yaptığım şey için beni affedemesen de..." ]
               : SAVE.flag.n.killed_sans > 0
               ? [ '<25>{#f/22}* Bütün o korkunç şeyleri yapmanı istesem de...' ]
               : [ '<25>{#f/22}* Sana işkence etsem ve sevdiğin herkesi tehdit etsem de...' ]),
            "<25>{#f/13}* Her şeyi aşmam için hala bana yardım etmeye çalışıyorun.",
            '<25>{#f/23}* ... bu benim için çok şey ifade ediyor.',
            '<25>{#f/22}* ...',
            '<25>{#f/13}* Annem, babam...',
            '<25>{#f/13}* Sans, Papyrus, Undyne, Alphys...',
            "\n<25>{#f/15}* Geçmişte öldürdüğüm herkes...",
            "<25>{#f/16}* ... onlarla yüzleşmek benim için zor olacak.",
            '<25>{#f/13}* ...',
            "<25>{#f/17}* Ama deneyeceğim.",
            "<25>{#f/23}* Daha iyi biri olmaya çalışacağım.",
            '<25>{#f/22}* Ve eğer bir gün işi batırırsam...',
            "<25>{#f/13}* ... toplarlamama yardım etmek için orada olacağını biliyorum."
         ],
         e13: [
            '<25>{#p/asriel1}{#f/17}* Ha... $(name).',
            "<25>{#f/23}* Seni hayal kırıklığına uğratmayacağım, tamam mı?",
            "<25>{#f/22}* Bana verdiğin bu şanstan en iyi şekilde yararlanacağım.",
            "<25>{#f/17}* Verdiğine değecek."
         ]
      },
      evac: [ '<32>{#p/human}* (Yakındaki canavar varlığının azaldığını hissettin.)' ],
      stargum1: () =>
         SAVE.data.b.svr
            ? [
                 '<32>{#p/human}* (Çizgi romana bantlanmış bir parça sakız gördün...)',
                 choicer.create('* (Sakızı çiğneyecek misin?)', 'Evet', 'Hayır')
              ]
            : [
                 '<32>{#p/basic}* Çizgi romanın üzerine bantlanmış bir parça sakız vardı.',
                 choicer.create('* (Sakızı çiğneyecek misin?)', 'Evet', 'Hayır')
              ],
      stargum2: [ '<32>{#p/human}* (Çiğnememeye karar verdin.)' ],
      stargum3: [ '<32>{#p/human}* ($(x) CAN yeniledin.)' ],
      stargum4: [ '<32>{#p/human}* (CANIN tamamen yenilendi.)' ],
      fireplace1: () =>
         SAVE.data.b.svr
            ? [
                 '<32>{#p/human}* (Şöminenin davetkar sıcaklığını hissettin...)',
                 choicer.create('* (İçeriye doğru sürünecek misin?)', 'Evet', 'Hayır')
              ]
            : [
                 SAVE.data.n.state_wastelands_toriel === 2 || world.runaway
                    ? '<32>{#p/basic}* Sıradan bir şömine.'
                    : "<32>{#p/basic}* Toriel'in şöminesi.\n* Çok sıcak değil, sadece hoşça ılık.",
                 ...(world.darker
                    ? []
                    : [ '<32>* Muhtemelen içeri girebilirsin.', choicer.create('* (İçeriye doğru sürünecek misin?)', 'Evet', 'Hayır') ])
              ],
      fireplace2a: [ '<32>{#p/human}* (İçeri girmemeyi seçtin.)' ],
      fireplace2b: () => [
         '<32>{#p/human}* (Şömineye girdin ve sıcaklığının seni içine almasına izin verdin.)',
         '<32>{#p/human}* (Çok rahatsın.)',
         ...(SAVE.data.b.svr
            ? asrielinter.fireplace2b++ < 1
               ? [ "<25>{#p/asriel1}{#f/13}* Senin, ah, çıkmanı bekleyeceğim." ]
               : []
            : world.goatbro && SAVE.flag.n.ga_asrielFireplace++ < 1
            ? [ "<25>{#p/asriel1}{#f/13}* Senin, ah, çıkmanı bekleyeceğim..." ]
            : [])
      ],
      fireplace2c: [ "<25>{#p/toriel}{#f/1}{#npc/a}* Orada çok uzun süre kalma..." ],
      fireplace2d: [ '<32>{#p/basic}* ...', '<32>* Bu iyi.' ],
      noticereturn: [ '<25>{#p/asriel2}{#f/10}* Burada kaçırdığın bir şey mi var?' ],
      noticestart: [
         '<25>{#p/asriel2}{#f/3}* Ah, her şeyin başladığı yer.',
         "<25>{#p/asriel2}{#f/4}* O zamandan bu yana kesinlikle yol kat ettik, değil mi $(name)?"
      ],
      noticedummy: [ '<25>{#p/asriel2}{#f/3}* ...', "<25>{#p/asriel2}{#f/10}* Daha önce burada bir manken yok muydu...?" ],
      afrog: {
         a: [
            '<32>{#p/basic}{#n1}* Aramızda kalsın...',
            '<32>* Biraz önce o keçi kadının buradan geçerken gördüm.',
            '<32>* Yiyecekleri vardı, ben de ona onların ne için olduğunu sordum ve...',
            "<32>* Belli ki ziyafet çekeceksin."
         ],
         b: () =>
            SAVE.data.n.plot === 72
               ? [
                    '<32>{#p/basic}{#n1}* Aramızda kalsın...',
                    '<32>* Biraz önce o keçi kadının buradan geçtiğini gördüm.',
                    '<32>* \"Korkularıyla yüzleşmenin\" zamanının geldiğini söyledi.',
                    "<32>* Her ne yaptıysa kesin bir şeye yol açtı!\n* Artık hepimiz özgürüz!"
                 ]
               : SAVE.data.n.plot === 71.2
               ? [
                    '<32>{#p/basic}{#n1}* Onu gördün mü?\n* Daha az önce buradaydı!',
                    '<32>* \"Korkularıyla yüzleşmenin\" zamanının geldiğini söyledi.',
                    '<32>* Acaba ne demek istemiş olabilir...?\n* Kararlı görünüyordu.'
                 ]
               : SAVE.data.b.w_state_lateleave
               ? [
                    '<32>{#p/basic}{#n1}* Aramızda kalsın...',
                    '<32>* Az önce o keçi kadının taksiyle süpermarkete gittiğini gördüm.',
                    "<32>* Süt almaya gideceğini söyledi ama hala dönmedi...",
                    "<32>* Umarım iyidir."
                 ]
               : [
                    '<32>{#p/basic}{#n1}* Aramızda kalsın...',
                    "<32>* Bazen yalnız kaldığımda markete taksiyle gitmeyi seviyorum.",
                    "<32>* İlginç, küçük bir dükkan ama satın alınacak bir sürü şey var.",
                    "<32>* Belki bir ara seni oraya götürürüm... kesin bayılırsın!"
                 ],
         c: () =>
            SAVE.data.n.plot === 72
               ? [
                    '<32>{#p/basic}{#n1}* Aramızda kalsın...',
                    "<32>* İlk başta hepimizi nasıl dövdüğünden hoşlanmadım.",
                    '<32>* Hepimiz çok korkmuştuk ve kafamız karışmıştı...',
                    '<32>* ... en azından sonunda iyi bir şey yaptın.'
                 ]
               : [
                    '<32>{#p/basic}{#n1}* Aramızda kalsın...',
                    "<32>* Dövdüğün insanlar bundan memnun değil.",
                    "<32>* Mesai saati dışında olduğuma sevin...\n* Çünkü aksi halde...",
                    "<32>* Kelleni alırdım."
                 ],
         d: [ '<32>{#p/basic}{#n1}* Hayır... hayır!', '<32>* U-uzak dur benden!' ]
      },
      asriel0: [
         "<25>{#p/asriel2}{#f/5}* ... ama sorun değil, zamanında orada olacağını biliyorum!",
         "<25>{#p/asriel2}{#f/1}* Beni hayal kırıklığına uğratmak istemezsin, değil mi?"
      ],
      asriel1: () =>
         [
            [
               "<25>{#p/asriel2}{#f/2}* Kusura bakma, birini aramak için Toriel'in telefonunu kullanmak zorunda kaldım.",
               "<25>{#p/asriel2}{#f/1}* Merak etme...\n* Nedenini yakında öğreneceksin.",
               "<25>{#p/asriel2}{#f/2}* ... hih hih hii.\n* İleride seni bekliyor olacağım."
            ],
            [ "<25>{#p/asriel2}{#f/4}* İleride seni bekliyor olacağım." ],
            [ '<25>{#p/asriel2}{#f/3}* ...' ]
         ][Math.min(SAVE.flag.n.ga_asrielNegative1++, 1)],
      asriel2: () => [
         '<25>{#p/asriel2}{#f/1}* Hazır mısın, $(name)?',
         "<25>{#f/2}* 'Çünkü bir kez gittiğimizde, geri dönüş yok.",
         choicer.create('* (Onu takip edecek misin?)', 'Evet', 'Hayır')
      ],
      asriel2b: () => [ '<25>{#p/asriel2}{#f/1}* Hazır mısın?', choicer.create('* (Onu takip edecek misin?)', 'Evet', 'Hayır') ],
      asriel3: [ '<25>{#p/asriel2}{#f/2}* Tamam...', "<25>{#f/1}* Haydi şunu yapalım." ],
      asriel4: [ "<25>{#p/asriel2}{#f/4}* Bekliyor olacağım o halde." ],
      asrielDiary: [
         [
            '<32>{#p/human}* (İlk sayfayı açtın... Kelimeleri zar zor çıkarabiliyorsun.)',
            '<32>{#p/asriel1}{#v/2}* \"bi gümrük yazmaya başladım çünkü anem eylenceli olur dedi.\"',
            '<32>* \"bugün babamın baçesine nasıl tohum ekeceyimi örendim\"',
            '<32>* \"yakında büyüyeceyni söylüyo ama uzun sürcekmiş.\"',
            '<32>* \"anem bu akşam saylangoz turtası yapcak çok heycanlıyım\"',
            '<32>* \"onun dışında günüm güzel geçiyo.\"'
         ],
         [
            '<32>{#p/human}* (İkinci sayfaya geçtin...)',
            '<32>{#p/asriel1}{#v/2}* \"azzynin gümrüğü, k-504\"',
            '<32>* \"anem tarihi yazmamı söledi ki milet ne zaman yazdıyımı bilsin.\"',
            '<32>* \"yıldız çiçeyim daha büyümedi ama babam yakında büyür diyo\"',
            '<32>* \"keşke odamda bi pencere olsaydı ama babam orda tesesat var diyo\"',
            '<32>* \"ama ön odaya koyacakmış bi tane\"',
            '<32>* \"bugün de güzel bir gün.\"'
         ],
         [
            '<32>{#p/human}* (Üçüncü sayfayı açtın... sanki birkaç yıl geçmiş gibi görünüyor.)',
            '<32>{#p/asriel1}{#v/2}* \"Azzy\'nin günlüğü, K-506.03.\"',
            '<32>* \"Eski günlüğüm oyuncak kutusunun içindeydi ben de içine daha fazla yazayım dedim.\"',
            '<32>* \"Görnüşe göre geçen sefer tarihin yalnızca ilk kısmını yazmışım.\"',
            '<32>* \"Bu arada daha önce diktiğim Yıldızcık çiçeği büyüdü.\"',
            '<32>* \"Ama geçen gün bi arkadaşımla kavga ettim o gündendir konuşmuyoz.\"',
            '<32>* \"Onun için endişeleniyom... umarım hala kızgın değildir.\"'
         ],
         [
            '<32>{#p/human}* (Dördüncü sayfayı açtın...)',
            '<32>{#p/asriel1}{#v/2}* \"Azzy\'nin günlüğü, K-506.03\"',
            '<32>* \"arkadaşımla konuştum, artık sinirli değilmiş, bu iyi haber\"',
            '<32>* \"Annemle dışarıda gökyüzünü izliyorduk ve kayan bir yıldız gördük.\"',
            '<32>* \"Bir dilek tutmamı söyledi... bi gün bi insanın gelmesini diledim.\"',
            '<32>* \"Annemle babam onlar hakkında o kadar çok hikaye anlatıyo ki...\"',
            '<32>* \"Hepsi kötü olamaz di mi?\"'
         ],
         [
            '<32>{#p/human}* (Beşinci sayfayı açtın...)',
            '<32>{#p/asriel1}{#v/2}* \"Azzy\'nin günlüğü, K-506.03\"',
            '<32>* \"Bugün diyeceğim pek bir şey yok.\"',
            '<32>* \"Belki de bu günlük fikri saçmadır.\"',
            '<32>* \"Annem beni yazarken gördü ve gurur duydukunu söledi\"',
            '<32>* \"Gerçegten o kadar önemli mi?\"'
         ],
         [
            '<32>{#p/human}* (Altıncı sayfayı açtın... birkaç yıl daha geçmiş gibi görünüyor.)',
            '<32>{#p/asriel1}{#v/1}* \"Azzy\'nin günlüğü, K-510.08\"',
            '<32>* \"Görünüşe göre bu şeye sürekli yazamıyorum.\"',
            '<32>* \"Ama bugün kitabı tekrar gördüm ve içine biraz daha yazayım dedim.\"',
            '<32>* \"Son birkaç yıl güzel geçti, okula gittim ve birçok şey öğrendim.\"',
            '<32>* \"Sayıların nasıl ekleneceği gibi.\"\n* \"Ve bilgisayar kullanmak\"',
            '<32>* \"Annem çevrimiçi hesap açamayacak kadar küçük olduğumu söyledi ama.\"',
            '<32>* \"Belki bir gün büyüdüğümde bi tane açarım.\"'
         ],
         [
            '<32>{#p/human}* (Yedinci sayfayı açtın...)',
            '<32>{#p/asriel1}{#v/1}* \"Azzy\'nin günlüğü, K-510.08.\"',
            '<32>* \"O zeki adam bugün yine geldi. Bir insan hakkında kötü bir rüya gördüğünü söyledi.\"',
            '<32>* \"Ah, ondan bahsetmiş miydim? O, babamın çok konuştuğu bilim insanı.\"',
            '<32>* \"Şu anda kullandığımız birçok şeyi o icat etti.\"',
            '<32>* \"Replikatörler, Fabrikatörler, Yerçekimi plakası şeyleri falan.\"',
            '<32>* \"Ama bana gerçekten tuhaf baktı, sanki çok korkutucuymuşum gibi.\"',
            '<32>* \"Yanlış bir şey mi yaptım?\"'
         ],
         [
            '<32>{#p/human}* (Sekizinci sayfayı açtın...)',
            '<32>{#p/asriel1}{#v/1}* \"Azzy\'nin günlüğü, K-510.08.\"',
            '<32>* \"Bugün gökyüzünde yeni bir yıldız belirdi.\"',
            '<32>* \"Baya parlaktı.\"',
            '<32>* \"Neden daha çok yıldız bir anda ortaya çıkmıyor merak ediyorum.\"',
            '<32>* \"Bi de yapıldığında yeni hisara taşıncaz.\"',
            '<32>* \"Yapı planlarını gördüm, harika görünüyor!\"',
            '<32>* \"Fabrikada yaşamaktan da çok daha iyi olacak.\"'
         ],
         [
            '<32>{#p/human}* (Dokuzuncu sayfayı açtın... görünüşe göre bir gün atlanmış.)',
            '<32>* \"Replikatörler, Fabrikatörler, yerçekimi plakası şeyleri falan.\"',
            '<32>* \"Dün gerçek bir insanla tanıştım. Evimizin yakınındaki çöp alanına çakıldı.\"',
            '<32>* \"Enkazdan çıkardım onu o da teşekkür etti.\"',
            '<32>* \"Bunun olacağını hiç düşünmemiştim ama işte burada.\"',
            '<32>* \"Ve o gerç{#p/basic}f{#p/asriel1}{#v/1}h{#p/basic}sj haha azzy pis kokuyo ve{#p/asriel1}{#v/1}vh{#p/basic}v{#p/asriel1}{#v/1}j{#p/basic}a{#p/asriel1}{#v/1}s\"\n',
            '<32>* \"Tamam şimdi örtünün altına saklanıyorum ki $(name) yazdıklarımı bozamasın.\"',
            '<32>* \"Bazen biraz kaba olabiliyor ama bişey olmaz.\"',
            '<32>* \"Annem onla o savaş şeyini yaptı ve kalbi kırmızı ve baş aşağıydı.\"',
            '<32>* \"Her gün konuşacak birinin olması gerçekten çok iyi.\"'
         ],
         [
            '<32>{#p/human}* (Onuncu sayfayı açtın...)',
            '<32>* \"Replikatörler, Fabrikatörler, yerçekimi plakası şeyleri falan.\"',
            '<32>* \"Annem $(name)\'i aileye evlat edineceğini söyledi.\"',
            '<32>* \"Evlat edinmenin ne demek olduğunu bilmiyorum ama onun kardeşi gibi olacağımı söyledi.\"',
            '<32>* \"Ama bu iyi çünkü o zaman onla daha fazla zaman geçirebilirim.\"',
            '<32>* \"Ben ve $(name) her şeyi birlikte yapacağız!\"',
            '<32>* \"Bide günlüğün son sayfasında olanlardan dolayı özür diledi.\"',
            '<32>* \"Henüz ona söylemedim ama onu affediyom.\"',
            '<32>{#p/basic}* ...'
         ],
         [
            '<32>{#p/human}* (On birinci sayfayı açtın.)',
            '<32>{#p/asriel1}* \"Asriel\'ın Günlüğü, K-515.09\"',
            '<32>* \"$(name) plan zamanının geldiğini söyledi.\"',
            '<32>* \"Korkuyordum ama yapabileceğimi söyledi.\"',
            '<32>* \"Bu sayfadan sonra yaptığımız zehirli turtayı yemesini bekleyeceğim...\"',
            '<32>* \"Ve sonra herkesi birlikte kurtarabiliriz.\"',
            '<32>* \"Eğer bir şeyler ters giderse ve bunu daha sonra okuyorsan...\"',
            '<32>* \"Senin en iyisi olduğunu bilmeni istiyorum, $(name).\"',
            '<32>{#p/basic}* ...',
            '<32>{#p/human}* (Sanki birisi ağlıyor gibi...)'
         ]
      ],
      backdesk: {
         a: () => [
            ...(SAVE.data.b.svr ? [] : [ "<32>{#p/basic}* Bu askılığın üstünde bir sırt çantası var." ]),
            '<32>{#p/human}* (Çantanın içine baktın...)',
            ...(SAVE.data.b.svr
               ? [ '<32>{#p/human}* (Ama orada bulacak bir şey kalmamıştı.)' ]
               : [ '<32>{#p/basic}* Burada bulacak bir şey kalmadı.' ])
         ],
         b: () => [
            ...(SAVE.data.b.svr ? [] : [ "<32>{#p/basic}* Bu askılığın üstünde bir sırt çantası var." ]),
            '<32>{#p/human}* (Çantanın içine baktın...)',
            ...(SAVE.data.b.svr
               ? []
               : [ "<32>{#p/basic}* Bu da ne?\n* Sınırlı sayıda bir Süper Starwalker çizgi romanı mı?" ]),
            '<32>{#s/equip}{#p/human}* (Süper Starwalker 2\'yi aldın.)'
         ],
         b2: () => [
            ...(SAVE.data.b.svr ? [] : [ "<32>{#p/basic}* Bu askılığın üstünde bir sırt çantası var." ]),
            '<32>{#p/human}* (Çantanın içine baktın...)',
            ...(SAVE.data.b.svr
               ? []
               : [ "<32>{#p/basic}* Bu da ne?\n* Sınırlı sayıda bir Süper Starwalker çizgi romanı mı?" ]),
            "<32>{#p/human}* (Onu alamayacak kadar çok şey taşıyorsun.)"
         ]
      },
      midsleep: () => [
         '<32>{#p/human}* (Eğer şimdi burada uyursan, önemli bir şeyi kaçırabilirsin.)',
         choicer.create('* (Uyuyacak mısın?)', 'Evet', 'Hayır')
      ],
      bedfailToriel: [
         '<25>{#p/toriel}{#f/5}* Ah canım.',
         '<25>{#f/1}* Belki de hareketlerim ilk düşündüğümden daha çok zarar verdi...',
         '<25>{#f/0}* ...\n* Endişe etme, çocuğum.',
         "<25>* Önündeki yolculuk için iyi bir uyku uyuyacağından emin olacağım.",
         '<32>{#p/human}* (Toriel yanına oturup seni uyutmak için bir ninni söylüyor.)'
      ],
      blooky1: () => [
         '<32>{#p/napstablook}* Zzz... Zzz...',
         '<32>* Zzz... Zzz...',
         "<32>{#p/basic}* Bu hayalet yüksek sesle durmadan ‘z’ diyerek uyuma numarası yapıyor.",
         choicer.create('* (Üstünden yürümeye çalış?)', 'Evet', 'Hayır')
      ],
      blooky2: () => [
         '<32>{#p/basic}* Hayalet hala yolu kapatıyor.',
         choicer.create('* (Üstünden yürümeye çalış?)', 'Evet', 'Hayır')
      ],
      blooky3: [
         '<32>{#p/napstablook}* genellikle buraya biraz huzur ve sessizlik bulmak için uğrarım...',
         '<32>* ancak bugün iyi biriyle tanıştım...',
         "<32>* öyleyse, yolundan çekileyim bari",
         '<32>* görüşürüz...'
      ],
      blooky4: [
         '<32>{#p/napstablook}* demek ımm...\n* beni cidden seviyorsun, ha',
         '<32>* hehe... teşekkürler...',
         '<32>* ve şey... az önce yolunda durduğum için üzgünüm...',
         "<32>* şimdi başka bir yere gideyim madem",
         "<32>* ama... endişelenme...",
         "<32>* beni tekrar göreceksin...",
         '<32>* eğer istersen...',
         '<32>* öyleyse, görüşürüz...'
      ],
      blooky5: [
         '<32>{#p/napstablook}* demek ımm... beni cidden çekemiyorsun, ha',
         "<32>* bu... güzel...",
         "<32>* öyleyse, ben de yoluma gideyim bari",
         '<32>* bay...'
      ],
      blooky6: [
         '<32>{#p/napstablook}* demek ımm... o yaşandı...',
         '<32>* ...',
         '<32>* şey... şimdi gitmem gerek',
         '<32>* görüşürüz...'
      ],
      blooky7: [
         "<32>{#p/napstablook}* bana hiçbir şey söylemedin bile...",
         "<32>* bu... bunun ne olduğunu bile bilmiyorum...",
         "<32>* öyleyse, ben de gideyim madem",
         '<32>* bay...'
      ],
      breakfast: [ '<32>{#p/human}* (Kızarmış Salyangozları aldın.)' ],
      breakslow: [ "<32>{#p/human}* (Onu alamayacak kadar çok şey taşıyorsun.)" ],
      candy1: () =>
         SAVE.data.b.svr
            ? [
                 '<32>{#p/human}* (Otomata yaklaştın.)',
                 choicer.create('* (Ne sentezleyeceksin?)', 'Şeker', 'Su', 'Δ-9', 'Hiçbir Şey')
              ]
            : [
                 '<32>{#p/basic}* Otomatla bir şey sentezleyecek misin?',
                 choicer.create('* (Ne sentezleyeceksin?)', 'Şeker', 'Su', 'Δ-9', 'Hiçbir Şey')
              ],
      candy2: [ '<32>{#p/human}* ($(x) sentezledin.)\n* (Menüyü açmak için [C]\'ye bas.)' ],
      candy3: [ '<32>{#p/human}* ($(x) sentezledin.)' ],
      candy4: () => [
         '<32>{#p/human}* ($(x) sentezledin.)',
         ...(SAVE.data.b.svr ? [] : [ '<32>{#p/basic}* Otomat bozulmaya başladı.' ])
      ],
      candy5: () => [
         '<32>{#p/human}* ($(x) sentezledin.)',
         ...(SAVE.data.b.svr ? [] : [ '<32>{#p/basic}* Otomat bozuldu.' ])
      ],
      candy6: () =>
         SAVE.data.b.svr
            ? [
                 [
                    '<25>{#p/asriel1}{#f/13}* Yine mi servis dışı?',
                    "<25>{#f/17}* Evet, aslında bu... tasarım icabı böyle.",
                    "<25>{#f/13}* Bu otomat Outlands'in kendi gücüyle çalışıyor, yani...",
                    '<25>{#f/15}* Aşırı güç kullanmaması için Toriel onu bozulmaya ayarlamış.',
                    "<26>{#f/20}* Sana da söylemezdi zaten."
                 ],
                 [
                    '<25>{#p/asriel1}{#f/13}* Ancak, güç kaynağının çok küçük olmasının nedeni...',
                    "<25>{#f/17}* ÇEKİRDEK gibi olmaktan ziyade, geri plandaki radyasyonu kullanması.",
                    "<25>{#f/13}* Eğer işi rakamlara dökersek derim ki...",
                    '<25>{#f/15}* ÇEKİRDEK\'in gücünün yaklaşık on binde biri kadarını üretebiliyor.'
                 ],
                 [
                    '<25>{#p/asriel1}{#f/13}* Hımm...',
                    '<25>{#f/15}* Acaba, düşük kapasitesine rağmen...',
                    '<25>{#f/13}* Bu güç kaynağı küçük bir atmosferik sistemi ayakta tutmaya yeterdi.',
                    '<25>{#f/17}* Eğer ÇEKİRDEK yok olsa, burada yaşayabilenler olur muydu...?'
                 ],
                 [ '<26>{#p/asriel1}{#f/20}* ... bir arkadaş için soruyorum da.' ]
              ][Math.min(asrielinter.candy6++, 3)]
            : [ "<32>{#p/basic}* Servis dışı." ],
      candy7: [ '<32>{#p/human}* (Hiçbir şey sentezlememeye karar verdin.)' ],
      candy8: [ "<32>{#p/human}* (Çok fazla şey taşıyorsun.)" ],
      chair1a: () => [
         '<25>{#p/toriel}{#f/1}{#n1}* Ne oldu, çocuğum?\n* Aç mısın?',
         '<25>{#f/0}* Belki okuduğum kitap hakkında daha fazlasını bilmek istersin.',
         choicer.create('{#n1!}* (Ne söyleyeceksin?)', 'Acıktım', 'Kitap', 'Ev', 'Hiçbir Şey')
      ],
      chair1b: () => [
         '<25>{#p/toriel}{#n1}* Ne oldu, çocuğum?',
         choicer.create('{#n1!}* (Ne söyleyeceksin?)', 'Acıktım', 'Kitap', 'Ev', 'Hiçbir Şey')
      ],
      chair1c: [ '<25>{#p/toriel}{#n1}* Peki, bir şeye ihtiyacın olursa bana haber ver.' ],
      chair1d: [ '<25>{#p/toriel}{#n1}* Peki, fikrini değiştirirsen bana haber ver.' ],
      chair1e: () => [
         '<25>{#p/toriel}{#f/1}{#n1}* Uykusuz bir gece mi?',
         '<25>{#f/1}* ...\n* Eğer istersen, sana bu kitabı okuyabilirim...',
         '<25>{#f/0}* Adı \"Cömert Canavar\" ve bir insan tarafından yazılmıştır.',
         choicer.create('{#n1!}* (Kitabı oku?)', 'Evet', 'Hayır')
      ],
      chair1f: pager.create(
         0,
         [ '<25>{#p/toriel}{#n1}{#f/1}* Ziyarete mi döndün?', '<25>{#f/0}* Peki, ihtiyacın olduğu kadar kalmakta özgürsün.' ],
         [ '<26>{#p/toriel}{#n1}{#f/5}* Ben her zaman olduğu gibi burada kalacağım...' ]
      ),
      chair2a1: () => [
         '<25>{#p/toriel}{#f/1}{#n1}* Aç mısın?\n* Kahvaltı hazırlamamı ister misin?',
         choicer.create('{#n1!}* (Kahvaltı yap?)', 'Evet', 'Hayır')
      ],
      chair2a2: [ '<25>{#p/toriel}{#n1}* Müthiş!\n* Ben mutfakta hazırlıyor olacağım.' ],
      chair2a3: () => [
         '<25>{#p/toriel}{#f/1}{#n1}* Kahvaltı konusunda fikrini mi değiştirdin?',
         choicer.create('{#n1!}* (Kahvaltı yap?)', 'Evet', 'Hayır')
      ],
      chair2a4: () =>
         SAVE.data.b.drop_snails
            ? [
                 '<25>{#p/toriel}{#f/3}{#n1}* İlkini bıraktıktan sonra bir tane daha yapmamı mı bekliyorsun?',
                 '<25>{#f/4}* Bu çocuk...',
                 '<25>{#f/0}* Hayır, ufaklık.\n* Başka bir kahvaltı daha hazırlamayacağım.'
              ]
            : [
                 '<25>{#p/toriel}{#n1}* Kahvaltı servisini çoktan yaptım, ufaklık.',
                 '<25>{#f/1}* Günde birden fazla kahvaltı yapamayız, değil mi?',
                 '<25>{#f/0}* Bu saçma olurdu.'
              ],
      chair2c1: () => [
         '<25>{#p/toriel}{#n1}* Ah, bu kitap!\n* Evet, oldukça eğlenceli bir parça.',
         '<25>{#f/0}* Adı \"Cömert Canavar\" ve bir insan tarafından yazılmış.',
         '<25>{#f/1}* Bunu sana okumamı ister misin?',
         choicer.create('{#n1!}* (Kitabı oku?)', 'Evet', 'Hayır')
      ],
      chair2c2: [ '<25>{#p/toriel}{#n1}* Harika!', '<25>{#g/torielCompassionSmile}* ...' ],
      chair2c3: () => [
         '<25>{#p/toriel}{#f/1}{#n1}* Şimdi kitabı okumamı istiyor musun?',
         choicer.create('{#n1!}* (Kitabı oku?)', 'Evet', 'Hayır')
      ],
      chair2c4: () => [
         '<25>{#p/toriel}{#f/1}{#n1}* Kitabı sana tekrar okumamı mı istiyorsun?',
         choicer.create('{#n1!}* (Kitabı oku?)', 'Evet', 'Hayır')
      ],
      chair2c5: [ '<25>{#p/toriel}{#f/1}{#n1}* Pekala, öyleyse...', '<25>{#p/toriel}{#g/torielCompassionSmile}* ...' ],
      chair2c6: [
         '<25>{#f/1}{#n1}* \"Bir zamanlar, bir canavar vardı...\"',
         '<25>{#f/0}* \"Ve o küçük bir insanı sevdi.\"',
         '<25>{#f/1}* \"Ve her gün, insan ziyarete gelirdi...\"',
         '<25>{#f/0}* \"Ve tarlalarda birlikte koşup oynarlardı.\"',
         '<25>{#f/1}* \"Birlikte şarkılar söyler, hikayeler anlatırlardı...\"',
         '<25>{#f/0}* \"Ve saklambaç oynarlardı.\"',
         '<25>{#f/1}* \"Ve insan yorulduğunda, o insanı yatağa yatırırdı...\"',
         '<25>{#f/0}* \"Ve insan canavarı çok sevdi.\"',
         '<25>{#f/0}* \"Ve canavar mutluydu.\"',
         '<25>{#f/1}* \"Ama zaman geçtikçe, ve insan yaşlandıkça...\"',
         '<25>{#f/0}* \"Canavar sıklıkla yalnız kalıyordu.\"',
         '<25>{#f/1}* \"Sonra bir gün, insan geri geldi...\"',
         '<25>{#f/0}* \"Ve canavar dedi ki \'Gel insan, gel de oyna!\'\"',
         '<25>{#f/5}* \"\'Oynamak için fazla büyüğüm,\' dedi insan.\"',
         '<25>{#f/1}* \"\'Araba sürmek, yeni bir ev bulmak istiyorum...\'\"',
         "<25>{#f/5}* \"'Üzgünüm,' dedi canavar, 'ama araba alamayacak kadar yoksulum.'\"",
         '<25>{#f/5}* \"\'Benim sadece kendi iki ayağım var.\'\"',
         '<25>{#f/0}* \"\'Sırtıma tırman, ve seni ihtiyacın olan yere götürebilirim.\'\"',
         '<25>{#f/0}* \"\'O zaman şehri görebilir ve mutlu olabilirsin.\'\"',
         '<25>{#f/1}* \"Ve böylece insan canavarın sırtına tırmandı...\"',
         '<25>{#f/0}* \"Ve canavar onu yeni bir eve götürdü.\"',
         '<25>{#f/0}* \"Ve canavar mutluydu.\"',
         '<25>{#f/1}* \"Ama insan uzun bir süre boyunca uzakta kaldı...\"',
         '<25>{#f/5}* \"Ve canavar mutsuzdu.\"',
         '<25>{#f/0}* \"Sonra bir gün, insan geri geldi.\"',
         '<25>{#f/1}* \"Ve canavar kulaklarına kadar gülümseyip dedi ki...\"',
         '<25>{#f/1}* \"\'Gel, insan, gel sırtıma bin!\'\"',
         '<25>{#f/5}* \"\'Etrafta dolaşmak için çok mutsuzum,\' dedi insan.\"',
         '<25>{#f/1}* \"\'Keşke çocuklarım, ve bir ailem olsaydı...\'\"',
         "<25>{#f/5}* \"'Üzgünüm,' dedi canavar, 'ama sana bunu sağlayamam.'\"",
         '<25>{#f/5}* \"\'Ben yalnızca tek bir kişiyim.\'\"',
         '<25>{#f/0}* \"\'Bir süreliğine ziyaret et, ve sana bir randevu bulabiliriz.\'\"',
         '<25>{#f/0}* \"\'O zaman aşkı bulabilir ve mutlu olabilirsin.\'\"',
         '<25>{#f/1}* \"Ve böylece insan eski dostunu bir süreliğine ziyaret etti...\"',
         '<25>{#f/0}* \"Ve canavar onun beğenebileceği birisini buldu.\"',
         '<25>{#f/0}* \"Ve canavar mutluydu.\"',
         '<25>{#f/5}* \"Ama insan uzun süre boyunca uzakta kaldı.\"',
         '<25>{#f/1}* \"Sonunda geri döndüğünde, canavar çok mutluydu...\"',
         '<25>{#f/9}* \"Zar zor konuşabiliyordu.\"',
         '<25>{#f/1}* \"\'Gel, insan,\' diye fısıldadı...\"',
         '<25>{#f/1}* \"\'Gel ve ziyaret et.\'\"',
         '<25>{#f/5}* \"\'Ziyaret etmek için çok yaşlı ve meşgulüm\' dedi insan.\"',
         '<25>{#f/1}* \"\'Gece için dinlenebileceğim bir yer istiyorum...\'\"',
         "<25>{#f/5}* \"'Üzgünüm,' dedi canavar, 'ama sana uyacak bir yatağım yok.'\"",
         '<25>{#f/5}* \"\'Hala bir tane alamayacak kadar yoksulum.\'\"',
         '<25>{#f/0}* \"\'Gece benimle uyu.\'\"',
         '<25>{#f/0}* \"\'O zaman biraz dinlenebilir ve mutlu olabilirsin.\'\"',
         '<25>{#f/1}* \"Ve böylece insan ve canavar birbirlerine sarıldılar...\"',
         '<25>{#f/0}* \"Ve canavar insanı uyutmayı başardı.\"',
         '<25>{#f/0}* \"Ve canavar mutluydu.\"',
         '<25>{#f/5}* \"... ama tam anlamıyla değil.\"',
         '<25>{#f/9}* \"Ve uzun bir aradan sonra, insan tekrar geri geldi.\"',
         "<25>{#f/5}* \"'Üzgünüm, insan,' dedi canavar, 'ama ben düşmüş durumdayım.'\"",
         '<25>{#f/5}* \"\'Bacaklarım tutmuyor, seni hiçbir yere götüremem.\'\"',
         '<25>{#f/10}* \"\'Başka hiçbir yerde olmak istemiyorum,\' dedi insan.\"',
         '<26>{#f/5}* \"\'Sana bir randevu bulamam, tanıdığım kimse yok\' dedi canavar.\"',
         '<25>{#f/10}* \"\'Başka kimseyle olmak istemiyorum,\' dedi insan.\"',
         '<25>{#f/5}* \"\'Üzerimde uyuman için çok zayıfım\', dedi canavar.\"',
         '<25>{#f/10}* \"\'Daha fazla uykuya ihtiyacım yok,\' dedi insan.\"',
         "<25>{#f/5}* \"'Üzgünüm,' diye iç çekti canavar.",
         '<25>{#f/5}* \"\'Keşke sunabileceğim bir şey olsaydı, ama elimde hiçbir şey kalmadı.\'\"',
         '<25>{#f/9}* \"\'Ben sadece ölümüne yaklaşan yaşlı bir canavarım.\'\"',
         '<25>{#f/5}* \"\'Üzgünüm...\'\"',
         '<25>{#f/10}* \"\'Artık çok fazla şeye ihtiyacım yok,\' dedi insan.\"',
         '<25>{#f/10}* \"\'Sadece ölmeden önce en iyi dostumdan bir sarılma.\'\"',
         '<25>{#f/1}* \"\'Peki,\' dedi canavar, duruşunu düzelterek...\"',
         '<25>{#f/0}* \"\'Peki, yaşlı bir canavar bunun için her zaman burada.\'\"',
         '<25>{#f/0}* \"\'Gel, insan, gel bana. Son bir kez daha benimle ol.\'\"',
         '<25>{#f/9}* \"Ve insan da bunu yaptı.\"',
         '<25>{#f/10}* \"Ve canavar mutluydu.\"'
         
      ],
      chair2c7: [ '<25>{#f/0}{#n1}* İşte, hikaye buydu.', '<25>{#f/1}* Umarım beğenmişsindir...' ],
      chair2c8: [ '<25>{#f/0}{#n1}* İşte bu kadar.' ],
      chair2d1: [
         '<25>{#p/toriel}{#f/1}{#n1}* Ev...?\n* Biraz daha spesifik olabilir misin?',
         '<99>{#p/human}{#n1!}* (Ne diyeceksin?){!}\n§shift=48§Unut§shift=72§Ne zaman eve\n§shift=48§Gitsin§shift=78§gidebilirim?{#c/0/6/4}'
      ],
      chair2d2: [
         '<25>{#p/toriel}{#f/1}{#n1}* Ama... burası artık senin evin, değil mi?',
         '<99>{#p/human}{#n1!}* (Ne diyeceksin?){!}\n§shift=144§Outlands\'den\n§shift=64§Üzgünüm§shift=38§nasıl çıkılır{#c/0/8/2}'
      ],
      chair2d3: [
         '<25>{#p/toriel}{#f/5}{#n1}* Lütfen, anlamaya çalış...',
         '<25>{#p/toriel}{#f/9}* Ben yalnızca senin için en iyisini istiyorum.'
      ],
      chair2d4: [
         '<25>{#p/toriel}{#f/5}{#n1}* Çocuğum...',
         '<99>{#p/human}{#n1!}* (Ne diyeceksin?){!}\n§shift=144§Outlands\'den\n§shift=64§Üzgünüm§shift=38§nasıl çıkılır{#c/0/8/2}'
      ],
      chair2d5: [ '<25>{#p/toriel}{#f/5}{#n1}* ...' ],
      chair2d6: [
         '<25>{#p/toriel}{#f/9}{#n1}* ...',
         '<25>{#p/toriel}{#f/9}* Lütfen, burada bekle.',
         '<25>{#p/toriel}{#f/5}* Yapmam gereken bir şey var.'
      ],
      chair3: () =>
         SAVE.data.b.svr
            ? [
                 [
                    "<25>{#p/asriel1}{#f/20}* Onun bunu Hisar'dan buraya taşıdığına hala inanamıyorum.",
                    "<25>{#f/17}* Ama... Bunu neden isteyeceğini anlıyorum.",
                    '<25>{#f/13}* Annem ve bu sandalyesi epey eskiye dayanıyor...'
                 ],
                 [
                    '<25>{#p/asriel1}{#f/13}* Bir keresinde, bana bir şey söylemişti...',
                    '<25>{#f/17}* \"Bu sandalye bana evimi hatırlatıyor.\"',
                    '<25>{#f/13}* Ama o an zaten evdeydi, ben de ona neyden bahsettiğini sordum.',
                    '<25>{#f/17}* Meğerse bu onun evindeymiş...',
                    '<25>{#f/23}* ... eski ana gezegendeki evinde.'
                 ],
                 [
                    "<25>{#p/asriel1}{#f/13}* O dünya hakkında pek bir şey bilmiyorum, Frisk...",
                    '<25>{#f/17}* Ama duyduğuma göre orası çok... huzurluymuş.',
                    '<25>{#f/20}* Tamam, büyü ve teknolojide çok ilerlemeler oldu...',
                    '<25>{#f/17}* Ama oradakiler çok sevdi, çünkü hayat çok... basitti.'
                 ],
                 [ "<25>{#p/asriel1}{#f/23}* Basit bir hayat yaşamak için neler vermezdim ki." ]
              ][Math.min(asrielinter.chair3++, 3)]
            : world.darker
            ? [ '<32>{#p/basic}* Bir okuma koltuğu.' ]
            : [ '<32>{#p/basic}* Rahat bir okuma koltuğu...', '<32>* Boyu tam Toriel\'e uygun gibi.' ],
      chair4: [ '<25>{#p/toriel}{#n1}* Ah, işte buradasın.', '<25>* Senin için kahvaltını masaya bıraktım.' ],
      closetrocket: {
         a: () => [
            '<32>{#p/human}* (Sandığın içine baktın...)',
            ...(SAVE.data.b.svr
               ? [
                    [
                       "<25>{#p/asriel1}{#f/13}* Evet, şey, burada bulabileceklerin bunlardan ibaret.",
                       "<25>{#f/17}* Toriel'in neden bunu buraya koyduğunu bilmiyorum.",
                       '<25>{#f/17}* $(name) ve ben çizgi romanlara hiç ilgi duymazdık.'
                    ],
                    [ '<25>{#p/asriel1}{#f/10}* Sanırım o sadece biz buradaymışız gibi davranmak istedi...?' ],
                    [ '<25>{#p/asriel1}{#f/13}* Bir annenin kendisini daha iyi hissetmek için yaptıkları...' ]
                 ][Math.min(asrielinter.closetrocket_a++, 2)]
               : [ '<32>{#p/basic}* Burada bulacak bir şey kalmadı.' ])
         ],
         b: () => [
            '<32>{#p/human}* (Sandığın içine baktın...)',
            ...(SAVE.data.b.svr
               ? []
               : [ "<32>{#p/basic}* Bu da ne?\n* Sınırlı sayıda bir Süper Starwalker çizgi romanı mı?" ]),
            '<32>{#s/equip}{#p/human}* (Süper Starwalker 3\'ü aldın.)'
         ],
         b2: () => [
            '<32>{#p/human}* (Sandığın içine baktın...)',
            ...(SAVE.data.b.svr
               ? []
               : [ "<32>{#p/basic}* Bu da ne?\n* Sınırlı sayıda bir Süper Starwalker çizgi romanı mı?" ]),
            "<32>{#p/human}* (Onu alamayacak kadar çok şey taşıyorsun.)"
         ]
      },
      goner: {
         a1: () =>
            SAVE.flag.b.$svr
               ? [
                    "<32>{#p/human}* Bu dünyada yarattığın etkiyi gördüm...",
                    '<32>* Herkesin mutlu olduğu, mükemmel bir son...',
                    "<32>* Bunun hakkında özel bir şey var."
                 ]
               : [
                    '<32>{#p/human}* Hiçbir bağlantıya bağlı olmayan bir dünya...',
                    '<32>* Sadece kendi güzelliği uğruna var olan...',
                    "<32>* Bunun hakkında özel bir şey var."
                 ],
         a2: () =>
            SAVE.flag.b.$svr
               ? [ '<32>* Bununla birlikte...', "<32>* Görünüşe göre bu... merakını gidermeye yetmemiş." ]
               : [ '<32>* Söyle bana...', '<32>* Bu senin... merakını uyandırmıyor mu?' ]
      },
      danger_puzzle1: () => [
         '<25>{#p/toriel}* Bu odada yeni bir tür bulmaca yer alıyor.',
         [ 1, 5 ].includes(SAVE.data.n.state_wastelands_dummy)
            ? '<25>{#f/3}* Belki burada manken ile olduğundan daha iyi iş çıkarırsın.'
            : '<25>{#f/1}* Çözebileceğini düşünüyor musun?'
      ],
      danger_puzzle2: () =>
         world.darker
            ? [ "<32>{#p/basic}* Senin erişemeyeceğin kadar yüksek." ]
            : [ "<32>{#p/basic}* Bu terminalin baş döndürücü yüksekliği, hevesli yaklaşımını engelliyor." ],
      danger_puzzle3: () => [
         [ 1, 5 ].includes(SAVE.data.n.state_wastelands_dummy)
            ? '<25>{#p/toriel}{#f/3}* Şimdi ne oldu...'
            : '<25>{#p/toriel}{#f/1}* Sorun nedir?\n* Yardıma mı ihtiyacın var?'
      ],
      danger_puzzle4: () => [
         ...([ 1, 5 ].includes(SAVE.data.n.state_wastelands_dummy)
            ? [ '<25>{#p/toriel}{#f/5}* Ah... Anlıyorum.', '<25>{#f/5}* Terminal senin erişemeyeceğin kadar yüksek.' ]
            : [
                 '<25>{#p/toriel}{#f/7}* ... ah.',
                 '<25>{#f/6}* Burada biraz tasarım hatası olmuş gibi görünüyor.',
                 '<25>{#f/1}* Demek terminal senin ulaşamayacağın kadar yüksekte...?'
              ]),
         '<25>{#f/0}* Önemli değil.\n* Ben senin için çalıştırırım.',
         '<25>{#f/0}* ...',
         '<25>{#f/0}* Burada çözülecek bir bilmece var.\n* Denemek ister misin?',
         choicer.create('* (Bilmeceyi çöz?)', 'Evet', 'Hayır')
      ],
      danger_puzzle5a: [
         '<25>{#p/toriel}* Mükemmel!\n* Öğrenme ve büyümeye isteklilik önemlidir.',
         '<25>{#f/0}* Özellikle senin gibi genç biri için.'
      ],
      danger_puzzle5b: [
         '<25>{#p/toriel}{#f/0}* Bilmece bir soru biçimini alıyor.',
         "<25>{#p/toriel}{#f/1}* \"Hem pişmiş hem de pasta gibi, 'orta' ile kafiyeli şey nedir?\""
      ],
      danger_puzzle5c: [
         '<32>{#p/human}* (...)\n* (Toriel\'e cevabı söylüyorsun.)',
         '<25>{#p/toriel}{#f/0}* ... ah, çok iyi.\n* Hem de böylesine olumlu bir tavırla!'
      ],
      danger_puzzle5d: [
         '<32>{#p/human}* (...)\n* (Toriel\'e cevabı bilmediğini söylüyorsun.)',
         '<25>{#p/toriel}{#f/1}* ... bir sorun mu var?\n* Aklına takılan bir şey varmış gibi görünüyorsun.',
         '<25>{#f/5}* ... hımm...',
         '<25>{#f/0}* Yani, pekala.\n* Bu sefer bilmeceyi senin için ben çözeceğim.'
      ],
      danger_puzzle5e: () =>
         [ 1, 5 ].includes(SAVE.data.n.state_wastelands_dummy)
            ? [ '<25>{#p/toriel}{#f/5}* ...', '<25>{#f/5}* Anlıyorum.' ]
            : [ '<25>{#p/toriel}{#f/0}* ...', '<25>{#f/0}* Sanırım bu seferlik bilmeceyi senin için çözebilirim.' ],
      danger_puzzle6: () => [
         [ 1, 5 ].includes(SAVE.data.n.state_wastelands_dummy) && SAVE.data.b.w_state_riddleskip
            ? '<25>{#p/toriel}{#f/5}* Ve... {#x1}işte.\n* Yol açılmış durumda.'
            : '<25>{#p/toriel}* Ve... {#x1}işte!\n* Yol açılmış durumda!'
      ],
      danger_puzzle7: () => [
         [ 1, 5 ].includes(SAVE.data.n.state_wastelands_dummy) && SAVE.data.b.w_state_riddleskip
            ? '<25>{#p/toriel}{#f/5}* Bir sonraki odaya girmeni bekleyeceğim.'
            : '<25>{#p/toriel}* Hazır olduğunda, bir sonraki odaya girebilirsin.'
      ],
      danger_puzzle8: () =>
         SAVE.data.b.svr
            ? [ "<32>{#p/human}* (Ama hala terminale erişemedin.)" ]
            : [ '<32>{#p/basic}* Şimdi bile, terminal her zamanki gibi oldukça yüksek duruyor.' ],
      denie: [ "<32>{#p/human}* (Onu alamayacak kadar çok şey taşıyorsun.)" ],
      dipper: {
         a: () => [
            '<32>{#p/human}* (Küçük Ayı\'yı aldın.)',
            choicer.create('* (Küçük Ayı\'yı kuşan?)', 'Evet', 'Hayır')
         ],
         b: [ "<32>{#p/human}* (Onu alamayacak kadar çok şey taşıyorsun.)" ]
      },
      drop_pie: [ '<25>{#p/toriel}{#f/1}* Turtalar yenmek içindir, yere dökülmek için değil.' ],
      drop_pie3: [ '<25>{#p/toriel}{#f/1}* Lütfen yere yiyecek dökme.' ],
      drop_snails: [ '<25>{#p/toriel}{#f/1}* O zavallı kızarmış salyangozlar sana ne yaptı.' ],
      drop_soda: [ "<32>{#p/basic}{#n1}* Aaa hadi ama! ;)", '<32>* Onun içine sevgimi döktüm ben! ;)' ],
      drop_steak: [ '<32>{#p/basic}{#n1}* Harbiden mi!? ;)', '<32>* O biftek hemen hemen bedavaydı! ;)' ],
      dummy1: [
         '<25>{#p/toriel}{#f/0}* Sıradaki dersin diğer canavarlar ile karşılaşmayı içeriyor.',
         '<25>{#f/1}* Karakolda dolaşan bir insan olarak saldırıya uğraman muhtemeldir...',
         '<25>{#f/0}* Eğer bu olursa, SAVAŞ denilen bir duruma gireceksin.',
         '<25>{#f/0}* Neyseki, bunu çözmenin birden fazla yolu var.',
         '<25>{#f/1}* Şimdilik, arkadaşça bir sohbet başlatmayı öneriyorum...',
         '<25>{#f/0}* ... böylece senin adına çatışmayı çözebilmem için fırsat verirsin.'
      ],
      dummy2: [ '<25>{#p/toriel}* Başlangıç için, mankenle konuşma pratiği yapabilirsin.' ],
      dummy3: [
         '<25>{#p/toriel}{#f/7}* ... mankenin ben olduğunu mu düşünüyorsun?',
         '<25>{#f/6}* Hahaha!\n* Ne kadar sevimli!',
         '<25>{#f/0}* Ne yazık ki, ben sadece endişeli bir yaşlı hanımım.'
      ],
      dummy4: [
         '<25>{#p/toriel}* Korkulacak hiçbir şey yok, çocuğum.',
         '<25>* Basit bir eğitim mankeni sana zarar veremez.'
      ],
      dummy5: [ '<25>{#p/toriel}{#f/1}* Tereddüt etme, ufaklık...' ],
      dummy6: [
         '<25>{#p/toriel}{#f/2}* Çocuk, hayır!\n* Bu manken savaşmak için yapılmadı!',
         '<25>{#f/1}* Zaten kimseyi incitmek istemeyiz, değil mi?',
         '<25>{#f/0}* Gel öyleyse.'
      ],
      dummy7: [ '<25>{#p/toriel}* Mükemmel!\n* Oldukça hızlı öğrenen birisin anlaşılan.' ],
      dummy8: [
         '<25>{#p/toriel}{#f/1}* Kaçtın mı...?',
         '<25>{#f/0}* Aslında, bu akıllıca bir tercih olabilirdi.',
         '<26>{#f/1}* Kaçarak çıkması muhtemel bir çatışmayı önlemiş oldun...',
         '<25>{#f/0}* ... her ne kadar bu basit bir eğitim mankeni olsa bile.'
      ],
      dummy9: [ '<25>{#p/toriel}{#f/3}* ...', '<25>{#f/4}* ...', '<25>{#f/0}* Sıradaki oda bekliyor.' ],
      dummy9a: [ '<25>{#p/toriel}{#f/3}* ...', '<25>{#f/4}* ...', '<25>{#f/6}* Sıradaki oda bekliyor.' ],
      dummy10: [
         '<25>{#p/toriel}{#f/7}* Çocuğum, bu...',
         '<25>{#f/0}* ... bu belki de şimdiye kadar gördüğüm en sevimli şey olabilir.',
         '<25>{#f/0}* Her halükarda, bu dersi takdire şayan bir şekilde hallettin.',
         '<25>{#f/0}* Sıradaki oda bekliyor.'
      ],
      dummy11: [ '<25>{#p/toriel}* Sıradaki oda bekliyor.' ],
      dummy12: [
         '<25>{#p/toriel}{#f/2}* Tanrım, çocuğum!\n* Merhamet göster!',
         '<25>{#f/1}* ...',
         '<25>{#f/0}* Neyse ki, bu sadece bir eğitim mankeniydi.',
         '<25>{#f/1}* Ancak gelecekte, akıllıca olacak şey...',
         '<25>{#f/0}* ... başkalarına öldüresiye vurmamaktır!',
         '<26>{#f/0}* Her neyse.\n* Bir sonraki oda bekliyor.'
      ],
      eat_pie: [ '<25>{#p/toriel}{#f/1}{#n1}* Lezzetli, değil mi?' ],
      eat_snails: [ '<25>{#p/toriel}{#f/0}{#n1}* Umarım kahvaltın yeterli olmuştur.' ],
      eat_soda: [
         '<32>{#p/basic}* Aaron telefonunu çıkardı ve hemen bir fotoğraf çekti.',
         '<32>{#p/basic}{#n1}* Ooo, bunu kesin bir yerlerde postere koyabilirim ;)'
      ],
      eat_steak: [
         '<32>{#p/basic}* Aaron sana göz kırptı.',
         '<32>{#p/basic}{#n1}* Ürünü beğendin mi kız? ;)'
      ],
      endtwinkly2: [
         '<32>{#p/basic}* Bu kim olduğunu zannediyor ki?',
         "<32>* Tanıştığımız herkese sadece iyilik ettin.",
         '<32>* O konuşan yıldız gitsin kendi işine baksın...'
      ],
      endtwinklyA1: [
         '<25>{#p/twinkly}{#f/12}* Seni salak...',
         "<25>* Daha önce beni duymadın mı!?",
         '<25>* İşi mahvetmemeni söylediğimi düşünüyorum!',
         "<25>* Bak şimdi planımıza ne yaptın.",
         '<25>{#f/8}* ...',
         '<25>{#f/6}* Bunu düzeltsen iyi edersin, $(name).',
         "<25>{#f/5}* Bu bizim kaderimiz."
      ],
      endtwinklyA2: () =>
         SAVE.flag.n.genocide_milestone < 1
            ? [
                 '<25>{#p/twinkly}{#f/5}* Selam, $(name).',
                 "<25>{#f/5}* Görünüşe göre artık benimle oynamak istemiyorsun.",
                 '<25>{#f/6}* Sana sabır göstermeye çalıştım, ama işte buradayız...',
                 '<25>{#f/6}* Yine yolun başındayız.',
                 '<25>{#f/8}* Tekrar, ve tekrar...',
                 '<25>{#f/5}* Bütün bu olan bitenin komik olduğunu sanıyorsundur.',
                 '<25>{#f/7}* Tekrar seninle olma şansıyla beni kışkırtıp sonra onu elimden alman...',
                 "<25>{#f/5}* Ama, sorun yok.",
                 "<25>{#f/5}* Eğer oynamak istediğin oyun buysa, devam et bari.",
                 "<25>{#f/11}* Sadece kontrolün sende uzun süre kalmayacağını bil...",
                 "<25>{#f/7}* Eninde sonunda, yaptıklarından pişmanlık duyacaksın."
              ]
            : [
                 '<25>{#p/twinkly}{#f/6}* Selam, $(name).',
                 ...(SAVE.flag.n.genocide_milestone < 7
                    ? [
                         "<25>{#f/6}* Olanları düşünmek için biraz vaktim olmuştu.",
                         '<25>{#f/5}* İlk başta heyecan vericiydi...',
                         '<25>* Cebren ve hile ile karakolu zapt etme düşüncesi...',
                         "<25>{#f/6}* Ama şimdi, pek emin değilim.",
                         '<25>{#f/8}* ...',
                         '<25>{#f/8}* Galiba... orada biraz kendimi kaptırdım.',
                         "<25>{#f/5}* Ama sorun yok değil mi?\n* Sen beni affedersin, ha?"
                      ]
                    : [
                         "<25>{#f/6}* Hala orada tam olarak ne yaşandığını bilmiyorum...",
                         "<25>{#f/5}* Bu... beni biraz korkutuyor, haha...",
                         '<25>{#f/8}* ...',
                         '<25>{#f/8}* Belki de... bu işleri sonraya bıraksak iyi olacak.',
                         "<25>{#f/5}* Ama sorun yok değil mi?\n* Bu sana uyar, ha?"
                      ]),
                 '<25>{#f/6}* ...',
                 '<25>{#f/8}* Görüşürüz, $(name)...',
                 ...(SAVE.flag.n.genocide_milestone < 7 ? [ "<25>{#f/5}* Sen bilemeden dönmüş olacağım." ] : [])
              ],
      endtwinklyAreaction: [
         '<32>{#p/basic}* Pardon, bir şey kaçırdım mı?',
         "<32>* Onunla bir göreve atılmayı bırak, hayatım boyunca hiç konuşmadım.",
         "<32>* Her neyse.\n* Benimle ilgili ilk hikaye uyduruşu değil sonuçta."
      ],
      endtwinklyB: () =>
         SAVE.data.b.w_state_lateleave
            ? [
                 '<25>{#p/twinkly}{#f/5}{#v/0}* Evet.\n* Bu beklenmedik bir şeydi.',
                 "<25>{#f/11}{#v/0}* Sen kuralları çiğneyip geçebileceğini sanıyorsun, di mi?",
                 '<25>{#f/7}{#v/0}* Hee hee hee...',
                 "<25>{#f/0}{#v/1}* Bu dünyada, ya ÖLÜRSÜN ya da ÖLDÜRÜRSÜN."
              ]
            : [
                 '<25>{#p/twinkly}{#f/5}{#v/0}* Dahice.\n* Çooooook dahice.',
                 "<25>{#f/11}{#v/0}* Kendini pek akıllı sanıyorsun, di mi?",
                 '<25>{#f/7}{#v/0}* Hee hee hee...',
                 "<25>{#f/0}{#v/1}* Bu dünyada, ya ÖLÜRSÜN ya da ÖLDÜRÜRSÜN."
              ],
      endtwinklyB2: [
         '<25>{#f/8}{#v/0}* Eğer BİRAZCIK daha canavar öldürseydin var ya...',
         "<25>{#f/9}{#v/0}* Neyse, belki de planlarımı hemen ortaya dökmemeliyim.",
         '<25>{#f/7}{#v/0}* Biliyor musun, $(name)...',
         "<25>{#f/5}{#v/0}* Tekrar beraber olmamız an meselesi.",
         '<25>{#f/6}{#v/0}* Bir dahaki sefer biraz daha çabala ve belki...',
         "<25>{#f/5}{#v/0}* Belki ilginç bir şeyle karşılaşırsın.",
         '<25>{#f/11}{#v/0}* Tekrardan görüşmek üzere...'
      ],
      endtwinklyB3: [
         '<25>{#f/8}{#v/0}* Eğer sadece BİR canavar daha öldürseydin var ya...',
         "<25>{#f/9}{#v/0}* Neyse, belki de planlarımı hemen ortaya dökmemeliyim.",
         '<25>{#f/7}{#v/0}* Biliyor musun, $(name)...',
         "<25>{#f/5}{#v/0}* Tekrar beraber olmamız an meselesi.",
         '<25>{#f/6}{#v/0}* Bir dahaki sefer biraz daha çabala ve belki...',
         "<25>{#f/5}{#v/0}* Belki ilginç bir şeyle karşılaşırsın.",
         '<25>{#f/11}{#v/0}* Tekrardan görüşmek üzere...'
      ],
      endtwinklyBA: () => [
         SAVE.data.n.state_wastelands_napstablook === 5
            ? '<25>{#p/twinkly}{#f/6}{#v/0}* Demek kimseyi öldürmeden burayı atlattın.'
            : '<25>{#p/twinkly}{#f/6}{#v/0}* Demek önüne çıkan herkesin canını bağışladın.',
         '<25>{#f/5}{#v/0}* Eminim harika hissediyorsundur.',
         '<25>{#f/2}{#v/1}* Peki ya bir seri katile denk gelirsen ne yapacaksın?',
         "<25>{#f/9}{#v/0}* Öleceksin, öleceksin, daha da öleceksin...",
         "<25>{#f/5}{#v/0}* Sonrasında, denemekten sıkılacaksın.",
         '<25>{#f/11}{#v/0}* O zaman ne olacak ha?',
         '<25>{#f/2}{#v/1}* Hayal kırıklığından ÖLDÜRMEYE mi başlayacaksın?',
         '<25>{#f/14}{#v/1}* Ya da basitçe PES mi edeceksin?',
         '<25>{#f/11}{#v/0}* Hee hee hee...',
         '<25>{#f/7}{#v/0}* Bu ACAYİP eğlenceli olacak.',
         "<25>{#f/9}{#v/0}* İzliyor olacağım!"
      ],
      endtwinklyBB1: () => [
         SAVE.data.b.w_state_lateleave
            ? "<25>{#p/twinkly}{#f/6}{#v/0}* Demek bazı değersiz kişilerden uzak durmayı başardın."
            : '<25>{#p/twinkly}{#f/6}{#v/0}* Demek bazı değersiz kişilerin canını bağışladın.',
         '<25>{#f/11}{#v/0}* Peki ya diğerleri, ha?',
         '<25>{#f/7}{#v/0}* Froggit, Flutterlyte, Gelatini, Silente, Oculoux, Mushy...',
         "<25>{#f/6}{#v/0}* Onların da bir ailesi yok mu sence?",
         "<25>{#f/8}{#v/0}* Onların da arkadaşları yok mu sence?",
         "<25>{#f/5}{#v/0}* Her biri başkasının Toriel'i olabilirdi.",
         '<25>{#f/5}{#v/0}* ...',
         '<25>{#f/7}{#v/0}* Seni bencil velet.',
         '<25>{#f/0}{#v/1}* Senin yüzünden canavarlar öldü.'
      ],
      endtwinklyBB2: () => [
         SAVE.data.b.w_state_lateleave
            ? "<25>{#p/twinkly}{#f/6}{#v/0}* Demek sadece bir kişinin yolundan çekildin."
            : '<25>{#p/twinkly}{#f/6}{#v/0}* Demek sadece bir kişinin canını bağışladın.',
         '<25>{#f/11}{#v/0}* Peki diğer herkes, ha?',
         '<25>{#f/7}{#v/0}* Froggit, Flutterlyte, Gelatini, Silente, Oculoux, Mushy...',
         "<25>{#f/0}{#v/0}* Onlar artık gitti.",
         "<25>{#f/11}{#v/0}* Peki Toriel bunları öğrendiğinde ne yapacak, ha?",
         '<25>{#f/2}{#v/1}* Ya bunalıma girip kendisini ÖLDÜRÜRSE?',
         "<25>{#f/11}{#v/0}* Eğer onu sadece BAĞIŞLAYARAK kurtardığını sanıyorsan...",
         "<25>{#f/7}{#v/0}* Düşündüğümden de aptalsın demektir.",
         '<25>{#f/9}* Öyleyse, görüşürüz!'
      ],
      endtwinklyBB3: () => [
         SAVE.data.b.w_state_lateleave
            ? "<25>{#p/twinkly}{#f/6}{#v/0}* Demek hemen herkesin yolundan çekilmeyi başardın."
            : '<25>{#p/twinkly}{#f/6}{#v/0}* Demek hemen herkesin canını bağışladın.',
         SAVE.data.b.w_state_lateleave
            ? '<25>{#p/twinkly}{#f/11}{#v/0}* Peki ya o yolundan çekilmediğin canavar, ha?'
            : "<25>{#p/twinkly}{#f/11}{#v/0}* Peki ya o bağışlamadığın canavar, ha?",
         '<25>{#f/7}{#v/0}* Froggit, Flutterlyte, Gelatini, Silente, Oculoux, Mushy...',
         "<25>{#f/6}{#v/0}* Onların da bir ailesi yok mu sence?",
         "<25>{#f/8}{#v/0}* Onların da arkadaşları yok mu sence?",
         "<25>{#f/5}{#v/0}* Öldürdüğün kişi başkasının Toriel'i olabilirdi.",
         '<25>{#f/5}{#v/0}* ...',
         '<25>{#f/7}{#v/0}* Seni bencil velet.',
         "<25>{#f/0}{#v/1}* Senin yüzünden birisi öldü."
      ],
      endtwinklyBC: [
         "<25>{#p/twinkly}{#f/5}{#v/0}* Fakat bunun bilincinde olduğuna çok eminim...",
         "<25>{#f/6}{#v/0}* Hele bir de Toriel'i daha önce öldürmene bakarsak.",
         "<25>{#f/7}{#v/0}* Bu doğru, di mi velet?",
         '<25>{#f/2}{#v/1}* Onu SEN öldürdün.',
         "<25>{#f/7}{#v/0}* Sonra da kötü hissettin...\n* Bu doğru di mi?",
         '<25>{#f/7}{#v/0}* Hee hee hee...',
         "<25>{#f/11}{#v/0}* Bu gücün sadece sende olduğunu mu sanıyorsun?",
         '<25>{#f/6}{#v/0}* Sadece saf azminle, evreni yeniden şekillendirme gücü...',
         '<25>{#f/8}{#v/0}* KAYDETME gücü...',
         '<25>{#f/7}{#v/0}* Biliyor musun, o güç eskiden BENİM gücümdü.',
         '<25>{#f/6}{#v/0}* Demek SENİN bu dünyayla ilgili emel- lerin BENİMKİLERİ aşıyor.',
         '<25>{#f/5}{#v/0}* İyi madem.\n* Gücünün tadını iyiden iyiye çıkar.',
         "<25>{#f/9}{#v/0}* İzliyor olacağım!"
      ],
      endtwinklyC: [
         '<25>{#f/7}{#v/0}* Ne de olsa, bu güç eskiden BENİM gücümdü.',
         '<25>{#f/6}{#v/0}* Sadece saf azminle, evreni yeniden şekillendirme gücü...',
         '<25>{#f/8}{#v/0}* KAYDETME gücü...',
         '<25>{#f/6}{#v/0}* Bunu yapabilen tek ben varım sanmıştım.',
         '<25>{#f/6}{#v/0}* Demek SENİN bu dünyayla ilgili emel- lerin BENİMKİLERİ aşıyor.',
         '<25>{#f/5}{#v/0}* İyi madem.\n* Gücünün tadını iyiden iyiye çıkar.',
         "<25>{#f/9}{#v/0}* İzliyor olacağım!"
      ],
      endtwinklyD: [
         "<25>{#p/twinkly}{#f/11}{#v/0}* Sen acayip bir baş belasısın ha?",
         '<25>{#f/8}{#v/0}* Canavarları öldüresiye dövüp, sonra bir anda onları bırakmak...',
         "<25>{#f/7}{#v/0}* Peki senin insafını İSTEMEYEN bir canavara ne yapacaksın?",
         '<25>{#f/6}{#v/0}* Gözlerindeki ışığı mı söndüreceksin?',
         '<25>{#f/5}{#v/0}* Yoksa bu hatalı \"barışçıllığının\" nafile olduğunu mu anlayacaksın?',
         '<25>{#f/11}{#v/0}* Hee hee hee...',
         '<25>{#f/7}{#v/0}* Bu ACAYİP eğlenceli olacak.',
         "<25>{#f/9}{#v/0}* İzliyor olacağım!"
      ],
      endtwinklyE: [
         "<25>{#p/twinkly}{#f/7}{#v/0}* Vay, sen tamamıyla iticisin.",
         '<26>{#f/11}{#v/0}* Barışçıl bir biçimde geçtin...',
         "<25>{#f/5}{#v/0}* Sonra, bunun seni tatmin etmeyeceğine karar verdin.",
         '<25>{#f/2}{#v/1}* O yüzden sırf ne olacağını görmek için onu ÖLDÜRDÜN.',
         '<25>{#f/7}{#v/0}* Hee hee hee...',
         '<25>{#f/0}{#v/0}* Canın SIKILDIĞI için yaptın bunu.'
      ],
      endtwinklyEA: [ "<25>{#f/11}{#v/0}* Bunun nasıl işlediğini bilmiyorum sanma..." ],
      endtwinklyEB: [ "<25>{#f/6}{#v/0}* Yine de bu, üzücü..." ],
      endtwinklyF: [ '<25>{#p/twinkly}{#f/11}{#v/0}* Şu haline bak, onun hayatıyla nasıl da oynuyorsun...' ],
      endtwinklyFA: [ '<25>{#f/7}{#v/0}* Onu öldür, ondan ayrıl, sonra tekrar öldür...' ],
      endtwinklyFB: [ '<25>{#f/7}{#v/0}* Ondan ayrıl, onu öldür, sonra tekrar ayrıl...' ],
      endtwinklyFXA: [
         "<25>{#f/11}{#v/0}* Eğlenceli, değil mi?",
         '<25>{#f/6}{#v/0}* Herkesin hayatıyla durmadan oyuncak gibi oynamak...',
         '<25>{#f/8}{#v/0}* Olası her kararına nasıl tepki verdik- lerini seyretmek..',
         "<25>{#f/11}{#v/0}* Çok heyecanlı değil mi?",
         '<25>{#f/7}{#v/0}* Hee hee hee...',
         "<25>{#f/9}{#v/0}* Şimdi ne yapacaksın merak ediyorum.",
         "<25>{#f/5}{#v/0}* İzliyor olacağım..."
      ],
      endtwinklyG: [
         "<25>{#p/twinkly}{#f/10}{#v/0}* Yaptıkça yapasın geliyor değil mi~",
         '<25>{#f/11}{#v/0}* Onu daha kaç defa ÖLDÜRECEKSİN ya?',
         '<25>{#f/7}{#v/0}* Hee hee hee...',
         '<25>{#f/0}{#v/1}* Bana biraz kendimi hatırlatıyorsun.',
         '<25>{#f/9}{#v/0}* Neyse, hadi bay!'
      ],
      endtwinklyG1: [
         '<25>{#p/twinkly}{#f/6}{#v/0}* Yine mi?\n* Tanrım...',
         '<25>{#f/0}{#v/1}* Bana CİDDEN kendimi hatırlatıyorsun.'
      ],
      endtwinklyG2: [
         '<25>{#p/twinkly}{#f/6}{#v/0}* Bir daha mı!?',
         "<25>{#f/8}{#v/0}* Vay be, sandığımdan da beter çıktın sen."
      ],
      endtwinklyH: () => [
         SAVE.data.b.w_state_lateleave
            ? "<25>{#p/twinkly}{#f/5}{#v/0}* Demek sonunda barışçıl barışçıl geçtin, ha?"
            : "<25>{#p/twinkly}{#f/5}{#v/0}* Demek sonunda merhamet etmeyi seçtin, ha?",
         '<25>{#f/5}{#v/0}* Hem de onca ÖLDÜRMEDEN sonra...',
         '<25>{#f/11}{#v/0}* Söylesene, başından beri planın bu muydu?',
         '<25>{#f/2}{#v/1}* Onun ölümünden heyecanlanıp sıkılınca onu bağışlamak.',
         '<25>{#f/7}{#v/0}* Hee hee hee...',
         '<25>{#f/11}{#v/0}* Sen kendini nasıl da ahlaklı görüyorsundur şimdi.',
         "<25>{#f/5}{#v/0}* Ama hey, ben de bunun nasıl işlediğini bilmiyorum değil..."
      ],
      endtwinklyI: [
         '<25>{#p/twinkly}{#f/11}{#v/0}* Hee hee hee...',
         '<25>{#f/7}{#v/0}* Umarım kararından memnun kalmışsındır.',
         "<25>{#f/9}{#v/0}* Yani, geri dönüp kaderini değiştirebilecek değilsin ya.",
         "<25>{#f/0}{#v/1}* Bu dünyada, ya ÖLÜRSÜN ya da ÖLDÜRÜRSÜN.",
         '<25>{#f/5}{#v/0}* O yaşlı kadın kuralları çiğneyebileceğini sandı.',
         '<25>{#f/8}{#v/0}* Siz insanları kurtarmak için çabaladı...',
         "<25>{#f/6}{#v/0}* Ama iş o safhaya geldiğinde kendisini bile kurtaramadı."
      ],
      endtwinklyIX: [
         '<25>{#p/twinkly}{#f/11}{#v/0}* Hee hee hee...',
         '<25>{#f/11}{#v/0}* Nihayet pes edip birisini öldürdün, ha?',
         '<25>{#f/7}{#v/0}* Yani, umarım seçimini beğenirsin.',
         "<25>{#f/9}{#v/0}* Yani, geri dönüp kaderini değiştirebilecek değilsin ya.",
         "<25>{#f/0}{#v/1}* Bu dünyada, ya ÖLÜRSÜN ya da ÖLDÜRÜRSÜN.",
         "<25>{#f/8}{#v/0}* ... sorun ne?\n* Düşündüğün kadar uzun süre dayanamadı mı?",
         '<26>{#f/6}{#v/0}* Ah, ne kadar da kötü.\n* Demek ki herkesi boyun eğene kadar dövemiyormuşuz!'
      ],
      endtwinklyIA: [ '<25>{#f/11}{#v/0}* Ne salak ama!' ],
      endtwinklyIAX: [ '<25>{#f/7}{#v/0}* Onun için ne kadar yazık.' ],
      endtwinklyIB: [ '<25>{#f/6}{#v/0}* Sana gelirsek...' ],
      endtwinklyJ: [
         '<25>{#p/twinkly}{#f/6}{#v/0}* Vay canına.',
         '<25>{#f/7}{#v/0}* Ben de burada senin merhamet ederek erdemli olduğunu sanmıştım.',
         '<25>{#f/11}{#v/0}* Hah!\n* Şakaya gel.',
         '<25>{#f/6}{#v/0}* ...',
         '<25>{#f/6}{#v/0}* Vahşi yanını sonunda tatmin etmek nasıl hissettirdi?',
         '<25>{#f/7}{#v/0}* Hee hee hee...',
         "<25>{#f/0}{#v/1}* Eminim ki GÜZELDİ, değil mi?",
         '<25>{#f/11}{#v/0}* Yani benim de bilmem gerekir...'
      ],
      endtwinklyK: [
         '<25>{#p/twinkly}{#f/5}{#v/0}* Seni tekrar görmek güzel.',
         "<25>{#f/6}{#v/0}* He bu arada, galaksideki en sıkıcı kişi sensin.",
         '<25>{#f/12}{#v/0}* Barışçıl şekilde geçinmek ve sonra geri dönüp aynı şeyi yapmak mı?',
         '<25>{#f/8}{#v/0}* Hadi ama...',
         "<25>{#f/2}{#v/1}* Bu dünyanın ÖLDÜR ya da ÖL olduğunu benim kadar iyi biliyorsun."
      ],
      endtwinklyK1: [
         "<25>{#p/twinkly}{#f/6}* Bundan hiç sıkılmıyor musun?",
         '<25>{#f/8}{#v/0}* Hadi ama...',
         '<25>{#f/2}{#v/1}* İçinde bir yerde onun canını yakmak istediğini BİLİYORSUN.',
         "<25>{#f/14}{#v/1}* Birkaç sağlam vuruş, ve bir bakmışsın ki ölüp gitmiş.",
         "<25>{#f/11}{#v/0}* Heyecan verici olmaz mıydı?",
         '<25>{#f/6}{#v/0}* ...',
         '<25>{#f/8}{#v/0}* ...',
         '<25>{#f/7}{#v/0}* Görüşürüz, salak.'
      ],
      endtwinklyK2: [
         '<25>{#p/twinkly}{#f/8}{#v/0}* Bunu sırf nasıl tepki vereceğimi görmek için mi yapıyorsun?',
         '<25>{#f/6}{#v/0}* Bütün olay bu mu yani?',
         "<25>{#f/7}{#v/0}* Her neyse, benden başka şeyler söylememi bekleme.",
         '<25>{#f/6}{#v/0}* Bu sıkıcı barışçıllık gerçekten baydı.',
         '<25>{#f/11}{#v/0}* Ancak, daha ilginç bir şey yaşanırsa...',
         "<25>{#f/9}{#v/0}* Konuşmak için daha meyilli olabilirim.",
         '<25>{#f/6}{#v/0}* ...',
         '<25>{#f/8}{#v/0}* ...',
         '<25>{#f/7}{#v/0}* Görüşürüz, salak.'
      ],
      endtwinklyKA: [
         "<25>{#f/7}{#v/0}* Eninde sonunda, bunun farkına varman gerekecek.",
         '<25>{#f/11}{#v/0}* Ve vakit geldiğinde de...',
         "<25>{#f/5}{#v/0}* Neyse, demem o ki neler olacağını dört gözle bekliyorum.",
         '<25>{#f/11}{#v/0}* Hee hee hee...',
         '<25>{#f/9}{#v/0}* Bol şans!'
      ],
      endtwinklyKB: [
         '<25>{#f/11}{#v/0}* Hee hee hee...',
         "<25>{#f/7}{#v/0}* Belki de o yüzden sadece o canavarı öldürdün.",
         '<25>{#f/8}{#v/0}* Yani, kimseyi öldürmeden neredeyse yolun tamamını gittin...',
         '<25>{#f/6}{#v/0}* Ama arada bir yerde, işi mahvettin.',
         '<25>{#f/5}{#v/0}* Sahip olduğun o güzelim karma ziyan oldu.',
         "<25>{#f/11}{#v/0}* Tanrım, hiçbir şeyi doğru düzgün yapamıyorsun!",
         '<25>{#f/11}{#v/0}* Nasıl bir şaka ama!'
      ],
      endtwinklyKC: [
         '<25>{#f/11}{#v/0}* Hee hee hee...',
         "<25>{#f/7}{#v/0}* Belki de o yüzden diğer canavarları öldürdün.",
         '<25>{#f/8}{#v/0}* Yani, iyi gidiyordun ama...',
         "<25>{#f/6}{#v/0}* Eğer bir anlamı yoksa insafın amacı nedir ki?",
         '<25>{#f/7}{#v/0}* Ve inan bana, yaptığın o şeyden sonra...',
         "<25>{#f/2}{#v/1}* HİÇBİR anlamı yok.",
         '<25>{#f/6}{#v/0}* ...',
         '<25>{#f/8}{#v/0}* ...',
         '<25>{#f/7}{#v/0}* Görüşürüz, salak.'
      ],
      endtwinklyKD: [
         "<25>{#f/11}{#v/0}* Toriel'i öldürmekte sorunun mu var, ha?\n* Çok mu vicdanlısın onun için?",
         '<25>{#f/7}{#v/0}* Hee hee hee...',
         "<25>{#f/2}{#v/1}* Senin temelden çürük olduğunu biliyorum ben.",
         '<25>{#f/11}{#v/0}* Yani, önüne çıkan herkesi devirmeyi başardın...',
         '<25>{#f/6}{#v/0}* Ama iş son engele gelince, başaramadın.',
         "<25>{#f/11}{#v/0}* Tanrım, hiçbir şeyi doğru düzgün yapamıyorsun!",
         '<25>{#f/11}{#v/0}* Nasıl bir şaka ama!'
      ],
      endtwinklyL: [
         '<25>{#p/twinkly}{#f/6}{#v/0}* Geri döndün, ha?\n* Tanrım...',
         "<25>{#f/8}{#v/0}* Zaman çizelgesini o kadar çok elledin ki...",
         "<25>{#f/6}{#v/0}* Artık ne düşüneceğimi bilmiyorum.",
         '<25>{#f/8}{#v/0}* Sen iyi misin?\n* Kötü müsün?\n* Yoksa sadece meraklı mısın?',
         '<25>{#f/6}{#v/0}* Bilemedim ki.',
         '<25>{#f/5}{#v/0}* Ama sadece tek bir şey var...',
         "<25>{#f/5}{#v/0}* Hala yapmadığın o tek şeyi BİLİYORUM.",
         '<25>{#f/11}{#v/0}* Hee hee hee...',
         "<25>{#f/7}{#v/0}* Evet doğru.",
         "<25>{#f/7}{#v/0}* Buradaki herkesi tek seferde öldürmedin.",
         "<25>{#f/11}{#v/0}* BİRAZ bile meraklı değil misin?",
         '<25>{#f/8}{#v/0}* Hadi ama, $(name)...',
         "<25>{#f/5}{#v/0}* Oralarda bir yerlerdesin biliyorum."
      ],
      endtwinklyL1: [
         '<25>{#p/twinkly}{#f/6}{#v/0}* Bak sen, yine karşılaştık.',
         '<25>{#f/8}{#v/0}* Bu kaçıncı etti?',
         "<25>{#f/6}{#v/0}* Aman neyse.\n* Bir önemi yok.",
         '<25>{#f/6}{#v/0}* Sen ne yapman gerektiğini BİLİYORSUN, $(name).',
         '<25>{#f/8}{#v/0}* ...',
         "<25>{#f/5}{#v/0}* Bekliyor olacağım."
      ],
      exit1: [
         '<25>{#p/toriel}{#f/13}* \"Eve\" dönmeyi diliyorsun, öyle değil mi?',
         '<25>{#f/9}* ...',
         '<25>{#f/9}* Eğer burayı terk edecek olursan, seni koruma imkanım olmayacak.',
         '<25>{#f/9}* Seni ilerideki tehlikelerden kurtarma imkanım olmayacak.',
         '<25>{#f/13}* O yüzden, lütfen, ufaklık...',
         '<25>{#f/9}* Diğer yoldan geri dön.'
      ],
      exit2: [
         '<25>{#p/toriel}{#f/13}* Buraya gelen her insan aynı kaderle karşılaşıyor.',
         '<25>{#f/9}* Bunun defalarca tekrarlandığını gördüm.',
         '<25>{#f/13}* Onlar geliyorlar.',
         '<25>{#f/13}* Ayrılıyorlar.',
         '<25>{#f/9}* ... ölüyorlar.',
         '<25>{#f/13}* Çocuğum...',
         '<25>{#f/13}* Eğer Outlands\'i terk edersen...',
         '<25>{#f/9}* Onlar...\n* {@fill=#f00}ASGORE{@fill=#fff}...\n* Senin RUH\'unu alacak.'
      ],
      exit3: [
         '<25>{#p/toriel}{#f/9}* ...',
         '<25>{#f/13}* Bunu söylemek istemezdim ama...',
         '<25>{#f/11}* Bu yoldan devam etmene izin veremem.',
         '<25>{#f/9}* Kendi iyiliğin için, çocuk...',
         '<25>{#f/9}* Beni bir sonraki odaya takip etme.'
      ],
      exit4: [
         '<25>{#p/toriel}{#p/toriel}{#f/13}* ...',
         '<25>{#f/10}* ... tabii ki.',
         '<25>{#f/9}* Belki de her şeyin bu noktaya geleceği zaten belliydi.',
         '<25>{#f/9}* Belki de senin farklı olacağını düşünmem ahmakça bir düşünceydi.',
         '<25>{#f/9}* ...',
         '<25>{#f/13}* Korkarım artık pek fazla seçeneğim yok.',
         '<25>{#f/13}* Affet beni, çocuğum...',
         '<25>{#f/11}* Ama senin gitmene izin veremem.'
      ],
      exitfail1: (lateleave: boolean, sleep: boolean) =>
         world.postnoot
            ? [
                 [
                    sleep
                       ? "<32>{#p/twinkly}{#f/19}* Sen Anneciğinin evinde uyuduktan sonra, o market alışverişine gider."
                       : "<32>{#p/twinkly}{#f/19}* Sen Anneciğinin evine kaçtıktan sonra, o market alışverişine gider.",
                    '<32>{#x1}* Ama... eyvahlar olsun!\n* İçinde bulunduğu taksi patladı, ve o anında öldü!',
                    '<32>* Tanrım, acaba bu kadar berbat bir şey nasıl yaşandı.',
                    '<32>{*}{#x2}* ...',
                    "<25>{*}{#f/7}* Üzgünüm, $(name).\n* Galiba mutlu sonuna o kadar kolay ulaşamayacaksın."
                 ],
                 [
                    sleep
                       ? "<32>{#p/twinkly}{#f/19}* Sen Anneciğinin evinde uyuduktan sonra, o market alışverişine gider."
                       : "<32>{#p/twinkly}{#f/19}* Sen Anneciğinin evine kaçtıktan sonra, o market alışverişine gider.",
                    '<32>{#x1}* Ama... eyvahlar olsun!\n* Konuşan bir yıldız çıkageldi ve ona ölümüne işkence etti!',
                    "<32>* Tanrım, bu öncekinden de beter bir durum!",
                    '<32>{*}{#x2}* ...',
                    "<25>{*}{#f/6}* Buna harcayacak vaktimiz yok, $(name).\n* İşine geri dön."
                 ],
                 [
                    '<25>{*}{#p/twinkly}{#f/5}* Hadi ama, $(name)...',
                    sleep
                       ? "<25>{*}{#f/7}* Benden kaçınmanın O KADAR kolay olacağını mı sandın?"
                       : "<25>{*}{#f/7}* Benden kaçmanın O KADAR kolay olacağını mı sandın?"
                 ],
                 [ '<25>{*}{#p/twinkly}{#f/6}* Bunu tüm gün yapabiliriz.' ],
                 [ '<25>{*}{#p/twinkly}{#f/8}* ...' ]
              ][Math.min(SAVE.flag.n.postnoot_exitfail++, 4)]
            : [
                 sleep
                    ? "<32>{#p/basic}* Toriel'in evinde uyuduktan sonra o, karakola giden köprüyü yok ediyor."
                    : "<32>{#p/basic}* Toriel'in evine döndükten sonra, o karakola giden köprüyü yok ediyor.",
                 ...(outlandsKills() > 10
                    ? [
                         "<32>* Zaman geçiyor, ve Toriel çok geçmeden canavarları öldürdüğünü öğreniyor.",
                         '<32>* Hayalleri suya düşünce ve kaybedecek bir şeyi kalmayınca o...',
                         '<32>* ...',
                         '<32>* ... b-bu sırada, karakolun diğer sakinleri kurtuluşu bekliyor...'
                      ]
                    : outlandsKills() > 5 || SAVE.data.n.bully_wastelands > 5
                    ? [
                         '<32>* Zaman geçiyor, ve Toriel sana bakabilmek için elinden geleni yapıyor.',
                         '<32>* Kitap okumak, turta pişirmek...',
                         '<32>* Her gece seni rahat yatağına yatırmak...',
                         ...(lateleave
                            ? [ '<32>* ... tekrar kaçmaya çalışmandan korkmasına rağmen.' ]
                            : [ "<32>* ... onca kaybolan kişiye rağmen." ]),
                         '<32>* Tüm bu sırada, karakol sakinleri kurtuluşu bekliyor...'
                      ]
                    : [
                         '<32>* Zaman geçiyor, ve Toriel sana bakabilmek için elinden geleni yapıyor.',
                         '<32>* Kitap okumak, turta pişirmek...',
                         '<32>* Her gece seni rahat yatağına yatırmak...',
                         ...(lateleave
                            ? [ '<32>* Ve sana sıkıca sarılıyor, böylece bir daha asla ama alsa kaçmaya çalışmayasın.' ]
                            : [ '<32>* Ve hayal edemeyeceğin kadar kucaklamalarla.' ]),
                         '<32>* Tüm bu sırada, karakol sakinleri kurtuluşu bekliyor...'
                      ]),
                 '<32>* ... kendilerine asla erişemeyecek bir insandan.',
                 '<32>* Gerçekten elde etmeyi umduğun sonuç bu muydu?',
                 '<32>* Gerçekten onların hak ettikleri bu mu?'
              ],
      food: () => [
         ...(SAVE.data.n.state_wastelands_mash === 2
            ? [
                 '<25>{#p/toriel}{#f/1}* Beklettiğim için üzgünüm...',
                 '<25>{#f/3}* Görünüşe göre o küçük beyaz köpek yine mutfağımı bastı.',
                 '<25>{#f/4}* O turtanın halini görmelisin...',
                 '<26>{#f/0}* Ama her neyse.\n* Senin için bir kızarmış salyangoz tabağı hazırladım.'
              ]
            : [ '<25>{#p/toriel}* Kahvaltı hazır!', '<26>* Senin için bir kızarmış salyangoz tabağı hazırladım.' ]),
         '<25>{#f/1}* Bunları burada masanın üzerinde bırakacağım...'
      ],
      fridgetrap: {
         a: () =>
            SAVE.data.b.svr
               ? []
               : world.darker
               ? [ "<32>{#p/basic}* Buzdolabında olan şeyi beğenmezdin." ]
               : [ '<32>{#p/basic}* Buzdolabında marka adı olan bir çikolata var.' ],
         b: () => [
            ...(SAVE.data.b.svr ? [] : [ '<32>{#p/basic}* ...', '<32>* İstiyor musun?' ]),
            choicer.create('* (Çikolata Barını al?)', 'Evet', 'Hayır')
         ],
         b1: [ '<32>{#p/human}* (Hiçbir şey almamaya karar verdin.)' ],
         b2: () => [
            '<32>{#p/human}* (Çikolata Barını aldın.)',
            ...(SAVE.data.b.svr ? [ '<25>{#p/asriel1}{#f/17}* Ahh... çikolata.', '<25>{#p/asriel1}{#f/13}* ...' ] : [])
         ],
         c: () =>
            SAVE.data.b.svr
               ? [
                    '<32>{#p/human}* (Ama orada bulacak bir şey kalmamıştı.)',
                    ...[
                       [
                          '<25>{#p/asriel1}{#f/23}* Ah... $(name) buzdolabını DAİMA alt üst ederdi.',
                          '<25>{#f/13}* Ona göre, eğer yeterince derine kazarsan...',
                          '<25>{#f/13}* Başka bir çikolata barı kendisini belli edermiş.',
                          '<25>{#f/17}* ... ne şapşalca ama.'
                       ],
                       [ '<25>{#p/asriel1}{#f/20}* Tabi bu çikolata çoğaltıcı kurulmadan önceydi.' ]
                    ][Math.min(asrielinter.fridgetrap_c++, 1)]
                 ]
               : [ '<32>{#p/basic}* Çikolata zaten alınmış.' ],
         d: [ "<32>{#p/human}* (Çok fazla şey taşıyorsun.)" ]
      },
      front1: [
         '<25>{#p/toriel}{#f/1}* ... ve şarkılarından birini mi çalmak istiyorsun?',
         '<25>{#f/0}* Pekala, ne yapabileceğime bir bakacağım.'
      ],
      front1x: [ '<25>{#p/toriel}{#f/1}* ... merhaba?' ],
      front2: () => [
         ...(world.postnoot
            ? [
                 '<25>{#p/toriel}{#f/2}* Çoktan kalktın mı!?',
                 '<25>{#f/1}* Çok uzun süre uyumadın...',
                 '<25>{#f/5}* ...',
                 world.nootflags.has('toriel') // NO-TRANSLATE

                    ? '<25>{#f/1}* Atmosferik sistem hala düzelmiş görünmüyor.'
                    : '<25>{#f/1}* Atmosferik sistem arızalanıyor gibi görünüyor.',
                 '<25>{#f/1}* Kendini güçsüz hissetmeye başlarsan, yatağa dönmekten çekinme.',
                 '<26>{#f/0}* ... her neyse.'
              ]
            : [
                 '<25>{#p/toriel}{#f/2}* Ne kadar zamandır orada duruyorsun!?',
                 '<25>{#f/5}* ...',
                 '<25>{#f/0}* Sanıyorum ki bir önemi yok.'
              ]),
         '<25>{#f/0}* Napstablook, buradaki bir ziyaretçi, müziğini çalmayı teklif etti.',
         '<25>{#f/0}* Aslında, özellikle seni sahnede olman için davet etti!',
         '<25>{#f/1}* Onu görmek için aktivite odasına gitmek ister misin?',
         ...(SAVE.data.n.state_wastelands_mash === 1
            ? [
                 '<25>{#f/3}* Ah, ayrıca, turtanın durumu için özür diliyorum.',
                 '<25>{#f/4}* Görüşüne bakılırsa o küçük beyaz köpek yine mutfağımı basmış...'
              ]
            : 3 <= SAVE.data.n.cell_insult
            ? [
                 '<25>{#f/5}* Ah, ayrıca, turtanın durumu için özür diliyorum.',
                 '<25>{#f/9}* Onu kurtarmak için elimden geleni yaptım...'
              ]
            : []),
         choicer.create("* (Napstablook'un gösterisini izleyecek misin?)", 'Evet', 'Hayır')
      ],
      front2a: [ '<25>{#p/toriel}{#f/0}* Muhteşem!\n* Ona geleceğini haber vereceğim.' ],
      front2b: [ '<25>{#p/toriel}{#f/5}* ...', '<25>{#p/toriel}{#f/5}* Eğer bana ihtiyacın olursa oturma odasında olacağım.' ],
      front3: () => [
         ...(world.postnoot
            ? [
                 '<25>{#p/toriel}{#f/0}* Ah, merhaba, ufaklık.\n* Erken kalkmışsın.',
                 '<25>{#f/1}* Yeterince uzun süre uyuduğundan emin misin?',
                 '<25>{#f/5}* ...',
                 world.nootflags.has('toriel') // NO-TRANSLATE

                    ? '<25>{#f/1}* Atmosferik sistem hala düzelmiş görünmüyor.'
                    : '<25>{#f/1}* Atmosferik sistem arızalanıyor gibi görünüyor.',
                 '<25>{#f/1}* Kendini güçsüz hissetmeye başlarsan, yatağa dönmekten çekinme.',
                 '<26>{#f/0}* ... bunun dışında...'
              ]
            : [ '<25>{#p/toriel}* Günaydın, ufaklık.' ]),
         ...(SAVE.data.n.state_wastelands_mash === 1
            ? [
                 '<25>{#f/3}* Görünüşe göre o küçük beyaz köpek yine mutfağımı bastı.',
                 '<25>{#f/4}* O turtanın halini görmelisin...',
                 '<25>{#f/0}* Yine de, onu senin için kurtarmak için elimden geleni yaptım.'
              ]
            : [ '<25>{#f/1}* Bugün yıldızlar çok güzel görünüyor, değil mi?' ]),
         '<25>{#f/5}* ...',
         '<25>{#f/5}* Eğer bana ihtiyacın olursa oturma odasında olacağım.'
      ],
      front4: () => [
         ...(world.postnoot
            ? [
                 '<25>{#p/toriel}{#f/0}* Ah, merhaba, ufaklık.\n* Erken kalkmışsın.',
                 '<25>{#f/1}* Yeterince uzun süre uyuduğundan emin misin?',
                 '<25>{#f/5}* ...',
                 world.nootflags.has('toriel') // NO-TRANSLATE

                    ? '<25>{#f/1}* Atmosferik sistem hala düzelmiş görünmüyor.'
                    : '<25>{#f/1}* Atmosferik sistem arızalanıyor gibi görünüyor.',
                 '<25>{#f/1}* Kendini güçsüz hissetmeye başlarsan, yatağa dönmekten çekinme.'
              ]
            : [ '<25>{#p/toriel}* Günaydın, ufaklık.' ]),
         '<25>{#f/5}* ...',
         ...(world.bullied
            ? [
                 '<25>* Outlands bugün alışılmadık derecede gürültülüydü.',
                 '<25>* Görünüşe göre bir zorba ortalıkta dolaşıyor ve sorun çıkarıyormuş...',
                 '<25>* Buradan çok uzaklaşmamak en iyisi olurdu.'
              ]
            : [
                 '<25>* Outlands bugün alışılmadık derecede sessizdi.',
                 '<25>* Tam da şimdi birini aramayı denedim, ama...',
                 '<25>* Hiçbir şey yok.'
              ]),
         ...(SAVE.data.n.state_wastelands_mash === 1
            ? [
                 world.bullied
                    ? '<26>{#f/3}* Ayrıca, o küçük beyaz köpek yeniden mutfağıma dalmış.'
                    : '<25>{#f/3}* Mutfağımı basan küçük beyaz köpek hariç, tabii ki.',
                 '<25>{#f/4}* O turtanın halini görmelisin...',
                 '<25>{#f/0}* Yine de, onu senin için kurtarmak için elimden geleni yaptım.',
                 '<25>{#f/1}* Umarım beğenirsin...'
              ]
            : world.bullied || (16 <= outlandsKills() && SAVE.flag.n.genocide_twinkly < resetThreshold())
            ? []
            : [ '<25>{#f/1}* Bu oldukça endişe verici...' ]),
         '<25>{#f/0}* Her halükarda, bana ihtiyacın olursa oturma odasında olacağım.'
      ],
      goodbye1a: [ '<25>{#p/toriel}{#f/10}* ...', '<25>{#f/20}{|}* Gel buraya- {%}' ],
      goodbye1b: [ '<25>{#p/toriel}{#f/9}* ...', '<25>{#f/19}{|}* Gel buraya- {%}' ],
      goodbye2: [
         '<25>{#p/toriel}{#f/5}* Sana yaşattıklarım için özür dilerim, ufaklık.',
         '<25>{#f/9}* Seni burada sonsuza kadar tutamayacağımı bilmeliydim.',
         '<25>{#f/5}* ... yine de, eğer konuşacak birine ihtiyacın olursa...',
         '<25>{#f/1}* Beni istediğin zaman arayabilirsin.',
         '<25>{#f/0}* Telefonum sana ulaşabildiği sürece, açmak için orada olacağım.'
      ],
      goodbye3: [
         '<25>{#p/toriel}{#f/5}* Sana yaşattıklarım için özür dilerim, ufaklık.',
         '<25>{#f/9}* Seni burada sonsuza kadar tutamayacağımı bilmeliydim.',
         '<25>{#f/10}* ...',
         '<25>{#f/14}* Uslu ol, olur mu?'
      ],
      goodbye4: [ '<25>{#p/toriel}{#f/1}* Uslu ol, tamam mı?' ],
      goodbye5a: [
         '<25>{#p/toriel}{#f/5}* ... hmm?\n* Fikrini mi değiştirdin?',
         '<25>{#f/9}* ...',
         '<25>{#f/10}* Belki de sen gerçekten diğerlerinden farklısındır.',
         '<25>{#f/0}* ... peki öyleyse.',
         '<25>{#f/0}* Buradaki işimi halledip seninle evde buluşacağım.',
         '<25>{#f/0}* Dinlediğin için teşekkür ederim, çocuğum.',
         '<25>{#f/0}* Bu benim için çok şey ifade ediyor.'
      ],
      goodbye5b: [
         '<25>{#p/toriel}{#f/5}* ... hmm?\n* Fikrini mi değiştirdin?',
         '<25>{#f/10}* ...\n* Affet beni, çocuğum.',
         '<25>{#f/9}* Bir anlığına kendimi kaybetmiş olabilirim.',
         '<25>{#f/0}* ... önemi yok.',
         '<25>{#f/0}* Buradaki işimi halledip seninle evde buluşacağım.',
         '<25>{#f/0}* Dinlediğin için teşekkür ederim, çocuğum.',
         '<25>{#f/0}* Bu benim için çok şey ifade ediyor.'
      ],
      halo: {
         a: () => [ '<32>{#p/human}* (Hale\'yi aldın.)', choicer.create('* (Hale\'yi giymek mi istiyorsun?)', 'Evet', 'Hayır') ],
         b: [ "<32>{#p/human}* (Onu alamayacak kadar çok şey taşıyorsun.)" ]
      },
      indie1: () => [
         ...([ 1, 5 ].includes(SAVE.data.n.state_wastelands_dummy) && SAVE.data.b.w_state_riddleskip
            ? [
                 '<25>{#p/toriel}{#f/5}* Şimdiye kadar sana öğretmek zordu, ama...',
                 '<25>{#f/5}* Belki de bu egzersiz yardımcı olacaktır.'
              ]
            : [ '<26>{#p/toriel}* Pekala.\n* Üçüncü ve son dersinin zamanı geldi.' ]),
         '<25>{#f/1}* Bu odanın sonuna kadar...',
         '<25>{#f/1}* ... tek başına gidebileceğini düşünüyor musun?',
         choicer.create('* (Ne diyeceksin?)', 'Evet', 'Hayır')
      ],
      indie1a: () => [
         '<25>{#p/toriel}{#f/1}* Emin misin...?',
         '<25>{#f/0}* Yalnızca kısa bir mesafe uzaklıkta.',
         choicer.create('* (Fikrini değiştirecek misin?)', 'Evet', 'Hayır')
      ],
      indie1b: () => [
         '<25>{#p/toriel}{#f/5}* Çocuğum.',
         '<25>{#f/1}* İşleri KENDİ başına yapman önemlidir, öyle değil mi?',
         '<32>{#p/basic}* Eğer şimdi fikrini değiştirmezsen, Toriel seni eve götürmeye karar verebilir.',
         choicer.create('* (Fikrini değiştirecek misin?)', 'Evet', 'Hayır')
      ],
      indie2a: [ '<25>{#p/toriel}{#f/1}* Pekala...', '<25>{#f/0}* Bol şans!' ],
      indie2b: [ '<25>{#p/toriel}{#f/5}* ...', '<25>{#f/9}* ... Anlıyorum.' ],
      indie2b1: [
         '<25>{#p/toriel}{#f/10}* Endişelenme, çocuğum.',
         '<25>{#f/1}* Eğer gerçekten yanımdan ayrılmak istemiyorsan...',
         '<25>{#f/0}* Outlands\'in geri kalanında sana rehberlik edeceğim.',
         '<25>{#f/5}* ...',
         '<25>{#f/5}* Elimi tut, ufaklık...',
         '<25>{#f/5}* Eve gitme zamanı.'
      ],
      indie2f: [ '<32>{#p/human}{#s/equip}* (CEP\'i aldın.)' ],
      indie3a: [ '<25>{#p/toriel}* Başardın!' ],
      indie3b: [
         '<25>{#p/toriel}{#f/3}* Çocuğum, neden bu kadar geciktin!?',
         '<25>{#f/4}* Kayıp mı oldun?',
         '<25>{#f/1}* ...\n* İyi görünüyorsun...'
      ],
      indie4: () => [
         ...([ 1, 5 ].includes(SAVE.data.n.state_wastelands_dummy) && SAVE.data.b.w_state_riddleskip
            ? [
                 '<25>{#f/0}* Kabul etmeliyim ki, sonuna kadar gelebilmene şaşırdım.',
                 '<25>{#f/3}* Şimdiye kadar ki tavrın aklımda bir soru işareti bıraktı...',
                 '<25>{#f/4}* ... bunca zamandır benimle uğraşmaya mı çalışıyordun?',
                 '<25>{#f/23}* Açıkça söylemek gerekirse, böyle lüzumsuz işlere ayıracak vaktim yok.'
              ]
            : [
                 '<25>{#p/toriel}{#f/0}* Endişelenme.\n* Hiçbir zaman gerçek bir tehlike içinde olmadın.',
                 '<25>{#f/0}* Bu yalnızca bağımsızlığının bir sınavıydı!',
                 '<25>{#f/1}* Dürüst olmak gerekirse, çocuğum...'
              ]),
         '<25>{#f/5}* Yapmam gereken bazı önemli günlük işler var.',
         '<25>{#f/0}* Ben yokken, senden en iyi tutumunu korumanı bekliyorum.',
         '<25>{#f/1}* İlerideki bulmacaların açıklanmaları gerekiyor, ve...',
         '<25>{#f/0}* Bu odadan tek başına ayrılman tehlikeli olabilir.',
         '<25>{#f/10}* İşte.\n* Bu CEP telefonunu al.',
         '<32>{#p/human}{#s/equip}* (CEP\'i aldın.)',
         ...([ 1, 5 ].includes(SAVE.data.n.state_wastelands_dummy) && SAVE.data.b.w_state_riddleskip
            ? [
                 '<25>{#p/toriel}{#f/1}* Ben yokken bir şeye ihtiyacın olursa, lütfen...',
                 '<25>{#f/0}* Beni aramaktan çekinme.',
                 '<25>{#f/5}* ...',
                 '<26>{#f/23}* Ve başını belaya sokma.'
              ]
            : [
                 '<25>{#p/toriel}{#f/1}* Ben yokken bir şeye ihtiyacın olursa, lütfen...',
                 '<25>{#f/0}* Beni aramaktan çekinme.',
                 '<25>{#f/5}* ...',
                 '<25>{#f/1}* Uslu ol, tamam mı?'
              ])
      ],
      indie5: [
         [
            '<32>{#s/phone}{#p/event}* Zırr, zırr...',
            '<25>{#p/toriel}* Merhaba!\n* Bu Toriel.',
            '<25>* Günlük işlerim düşündüğümden daha uzun sürüyor.',
            '<25>* Biraz daha beklemen gerekecek.',
            '<25>{#f/1}* Sabırlı olduğun için teşekkür ederim, çocuğum...',
            '<25>{#f/0}* Çok iyisin.'
         ],
         [
            '<32>{#s/phone}{#p/event}* Zırr, zırr...',
            '<25>{#p/toriel}* Merhaba...\n* Bu Toriel.',
            '<25>{#f/1}* Aradığım şeyi buldum...',
            '<25>{#f/0}* Ama küçük, beyaz bir köpek yavrusu onu kaptı!\n* Ne kadar da tuhaf.',
            '<25>{#f/1}* Köpekler unu seviyor mu ki?',
            '<25>{#f/0}* Imm, bu konu ile alakasız bir soru, tabii.',
            '<25>* Geri dönmem biraz daha uzun sürecek.',
            '<25>{#f/1}* Bu kadar sabırlı olduğun için tekrardan teşekkürler...'
         ],
         [
            '<32>{#s/phone}{#p/event}* Zırr, zırr...',
            '<32>{#p/basic}* (...)',
            '<32>{#p/human}* (Telefonun diğer ucundan ağır soluk alıp verme sesleri duyuyorsun.)',
            '<32>{#s/bark}{#p/event}* Hav!\n{#s/bark}* Hav!',
            '<32>{#p/human}* (Uzaktan bir ses duyuyorsun.)',
            '<25>{#p/toriel}{#f/2}* Dur, lütfen!',
            '<32>{#s/bark}{#p/event}* Hav!\n{#s/bark}* Hav!',
            '<25>{#p/toriel}{#f/1}* Cep telefonum ile buraya geri gel!'
         ],
         [
            '<32>{#s/phone}{#p/event}* Zırr, zırr...',
            '<32>{#p/basic}* (...)',
            '<32>{#p/human}* (Küçük, beyaz bir köpeğin telefonda uyuduğu duyuluyor.)',
            '<32>{#p/basic}* (Horr... horr...)',
            '<32>{#p/human}* (Uzaktan bir ses duyuyorsun.)',
            '<25>{#p/toriel}{#f/1}* Merhabaaa?\n* Küçük köpek yavrusu...?',
            '<25>{#f/1}* Neredesiiin?',
            '<25>{#f/0}* Başını güzelce seveceğim!',
            '<32>{#p/human}* (Horlama durur.)',
            '<25>{#p/toriel}* ... eğer cep telefonum ile dönersen.',
            '<32>{#p/human}* (Horlama devam eder.)'
         ],
         [
            '<32>{#s/phone}{#p/event}* Zırr, zırr...',
            '<32>{#p/basic}* (...)',
            '<32>{#p/basic}* (Hapşu!)',
            '<32>{#p/human}* (Uykusunda hapşıran küçük, beyaz bir köpeğin sesi duyuluyor.)',
            '<25>* (Uzaktan bir ses duyuyorsun.)',
            '<25>{#p/toriel}{#f/1}* Aha!\n* Duydum onu, seni küçük beyaz köpek...',
            '<25>{#f/6}* Şimdi seni bulacağım!',
            '<32>{#p/human}* (Horlama durur.)\n* (Köpeğin artık bir şeyden kaçtığı anlaşılıyor.)',
            '<25>{#p/toriel}{#f/8}* Hee hee, burada kaçış yok!'
         ],
         [
            '<32>{#s/phone}{#p/event}* Zırr, zırr...',
            '<32>{#p/human}* (Uzaktan bir ses duyuyorsun.)',
            '<25>{#p/toriel}{#f/1}* Merhaba...\n* Bu... Toriel...',
            '<32>{#s/bark}{#p/event}* Hav!\n* Hav!',
            '<25>{#p/toriel}{#f/2}* Hayır, kötü köpek yavrusu!',
            '<32>{#p/basic}* (Acıklı iç çeker...)',
            '<25>{#p/toriel}* İşte, işte...\n* Sana başka bir cep telefonu bulacağım.',
            '<25>{#f/1}* Bu uygun olur muydu?',
            '<32>{#p/basic}* (...)',
            '<32>{#s/bark}{#p/event}* Hav!',
            '<25>{#p/toriel}* Bunu duyduğuma sevindim.',
            '<32>{#p/human}* (Köpeğin uzaklaştığı duyulabiliyordu.)',
            '<25>{#p/toriel}* Lütfen, tüm bu saçmalıklar için beni affet.',
            '<25>{#f/1}* En kısa zamanda seni almaya geleceğim...'
         ]
      ],
      indie6: (early: boolean) => [
         '<32>{#s/phone}{#p/event}* Zırr, zırr...',
         ...([ 1, 5 ].includes(SAVE.data.n.state_wastelands_dummy) && SAVE.data.b.w_state_riddleskip
            ? [
                 early
                    ? '<25>{#p/toriel}{#g/torielTired}* ... şimdiden mi?'
                    : '<25>{#p/toriel}{#g/torielTired}* ... sabırsızız, öyle mi?',
                 '<25>{#f/9}* Aslında gerçekten şaşırmamalıyım.',
                 '<25>{#f/5}* Sadece dışarıda seni bekleyen tehlikeleri hatırla...',
                 '<25>{#f/1}* Yaralanacak olman çok yazık olurdu.'
              ]
            : [
                 '<25>{#p/toriel}* Merhaba?\n* Bu Toriel.',
                 '<25>{#f/1}* Henüz odadan çıkmadın, değil mi?',
                 '<25>{#f/0}* Dışarısı çok tehlikeli, ve senin yaralanmanı istemiyorum.',
                 '<25>{#f/1}* Kendine dikkat et, tamam mı?'
              ])
      ],
      indie7: [ '<32>{#p/basic}* Birkaç dakika sonra...' ],
      indie8: [
         '<25>{#p/toriel}* Geri döndüm!',
         '<25>* Şimdiye kadar gösterdiğin sabır takdire şayandı.\n* Ben bile etkilendim!',
         '<25>{#f/0}* Her neyse.\n* Artık seni eve götürmemin zamanı geldi.',
         '<25>{#f/1}* Lütfen, bana izin ver...'
      ],
      lobby_puzzle1: [
         '<25>{#p/toriel}{#f/0}* Bizim mütevazı karakolumuza hoş geldin, masum insan.',
         '<25>{#f/0}* Buradaki hayata dair sana öğretmem gereken çok ders var.',
         '<25>{#f/1}* Her şeyden önce...',
         '<25>{#f/0}* Bulmacalar!',
         '<25>{#f/0}* Sana kısa bir görselleştirme yapmama izin ver.'
      ],
      lobby_puzzle2: [
         '<25>{#p/toriel}{#f/1}* Şu anda sana garip görünebilir ama burada, karakolda...',
         '<25>{#f/0}* Bulmaca çözmek bizim günlük rutinimizin bir parçasıdır.',
         '<25>{#f/0}* Biraz zaman ve rehberlik ile, bunlara alışacaksın.'
      ],
      lobby_puzzle3: [ '<25>{#p/toriel}* Hazır olduğunda devam edebiliriz.' ],
      loox: {
         a: [
            "<32>{#p/basic}{#n1}* Bir insana göre oldukça cilveli olduğunu duydum.",
            "<32>* Farklı türden canavarlarla {@fill=#cf7fff}FLÖRT{@fill=#fff} ettikçe, isimlerinin yanında kalpler göreceksin.",
            "<32>* Ne kadar çok canavar türüyle {@fill=#cf7fff}FLÖRT{@fill=#fff} edersen, o kadar çok kalbin olacak.",
            '<32>* Merak ediyorum da...',
            '<32>* Ne kadar ileri gidebilirsin?',
            '<32>* Belki de, dostum, sen bir... efsane bile olabilirsin.'
         ],
         b: [
            '<32>{#p/basic}{#n1}* Hey insan, henüz flört etmeyi denedin mi?',
            "<32>* Ha!\n* Suratındaki ifadeye bakılırsa henüz denememiş olmalısın.",
            "<32>* Sana söylemeliyim, bunu yapmak çok eğlenceli.",
            "<32>* Düşmanların bunun üstesinden gelemeyecekler!",
            '<32>* Psst... eğer flört etmeye BAŞLARSAN, sana daha anlatacaklarım olabilir.',
            '<32>* Bununla bol şans!'
         ],
         c: [
            "<32>{#p/basic}{#n1}* Hey insan, madem flört etmeye başladın...",
            '<32>* Nasıl hissettiriyor?',
            "<32>* Oldukça iyi, değil mi?",
            "<32>* Farklı türden canavarlarla {@fill=#cf7fff}FLÖRT{@fill=#fff} ettikçe, isimlerinin yanında kalpler göreceksin.",
            "<32>* Ne kadar çok canavar türüyle {@fill=#cf7fff}FLÖRT{@fill=#fff} edersen, o kadar çok kalbin olacak.",
            '<32>* Merak ediyorum da...',
            '<32>* Ne kadar ileri gidebilirsin?',
            '<32>* Belki de, dostum, sen bir... efsane bile olabilirsin.'
         ],
         d: [
            "<32>{#p/basic}{#n1}* Buralarda bir nevi zorba olduğunu duyuyorum.",
            '<32>* Ha!\n* Kulübe katıl, ahbap.',
            "<32>* Bu civarlardaki bir numaralı zorbayla konuşuyorsun.",
            "<32>* Farklı canavar türlerine karşı {@fill=#3f00ff}ZORBA{@fill=#fff} oldukça, onların isimlerinin yanında kılıçlar göreceksin.",
            "<32>* Ne kadar çok canavar türüne karşı bir {@fill=#3f00ff}ZORBA{@fill=#fff} olursan, o kadar çok kılıcın olacak.",
            '<32>* Tabii, şunu da belirtelim ki, TÜM canavarlara zorbalık yapılamaz.',
            "<32>* Tıpkı flört etmek gibi... ama ölümle.",
            '<32>* Eğlenceli, değil mi?'
         ],
         e: pager.create(
            0,
            () => [
               ...(30 <= SAVE.data.n.bully
                  ? [
                       "<32>{#p/basic}{#n1}* Buralarda epey zorba olduğunu duydum.",
                       "<32>* Herkes senden korkuyor, ha?"
                    ]
                  : 20 <= world.flirt
                  ? [
                       "<32>{#p/basic}{#n1}* Artık buralarda oldukça romantik olarak tanındığını duydum.",
                       '<32>* Herkes seni seviyor, ha?'
                    ]
                  : [
                       "<32>{#p/basic}{#n1}* Artık buralarda bir kahraman olarak tanındığını duydum.",
                       '<32>* Herkes seni takdir ediyor, ha?'
                    ]),
               '<32>* Yani... şahsen, senin çok fazla boş vaktin olduğunu düşünüyorum.'
            ],
            [ '<32>{#p/basic}{#n1}* Ne?\n* Haksız mıyım?' ]
         )
      },
      manana: {
         a: pager.create(
            0,
            () =>
               SAVE.data.b.napsta_performance
                  ? [
                       "<32>{#p/basic}{#n1}* Demek o müzik şovunun ortak sunuculuğunu yapan sendin, ha?",
                       "<32>* Belki şimdi teklifimi kabul etme imkânına sahipsindir.",
                       "<32>* Bu sınırlı sayıdaki Süper Starwalker çizgi romanını satın alacak birini arıyorum.",
                       "<32>* O küçük gösterini beğendim, o yüzden indirim alacaksın.\n* 5A, al ya da git.",
                       choicer.create('{#n1!}* (Süper Starwalker 1\'i 5A fiyatına alacak mısın?)', 'Evet', 'Hayır')
                    ]
                  : [
                       ...(world.postnoot
                          ? [
                               "<32>{#p/basic}{#n1}* Hey, have you noticed anything strange goin' on around here?",
                               "<32>* I could'a sworn all the puzzles just de-activated themselves earlier.",
                               "<32>* Anyway, I'm lookin' for a buyer on this limited edition Super Starwalker comic strip."
                            ]
                          : [
                               '<32>{#p/basic}{#n1}* Finally, someone speaks to me!',
                               "<32>* I've been standin' out here for ages, and nobody's takin' my offer.",
                               "<32>* Bu sınırlı sayıdaki Süper Starwalker çizgi romanını satın alacak birini arıyorum."
                            ]),
                       "<32>* Interested?\n* All I'm askin' for is 10G.",
                       choicer.create('{#n1!}* (Buy the Super Starwalker 1 for 10G?)', 'Evet', 'Hayır')
                    ],
            () =>
               SAVE.data.b.napsta_performance
                  ? [
                       "<32>{#p/basic}{#n1}* Interested in buyin' my limited edition Super Starwalker comic strip?",
                       "<32>* All I'm askin' for is 5G.",
                       choicer.create('{#n1!}* (Süper Starwalker 1\'i 5A fiyatına alacak mısın?)', 'Evet', 'Hayır')
                    ]
                  : [
                       "<32>{#p/basic}{#n1}* Interested in buyin' my limited edition Super Starwalker comic strip?",
                       "<32>* All I'm askin' for is 10G.",
                       choicer.create('{#n1!}* (Buy the Super Starwalker 1 for 10G?)', 'Evet', 'Hayır')
                    ]
         ),
         b: () => [
            "<32>{#p/human}{#n1!}* (You don't have enough G.)",
            SAVE.data.b.napsta_performance
               ? "<32>{#p/basic}{#n1}* I'll be honest, that don't look like 5G..."
               : "<32>{#p/basic}{#n1}* I'll be honest, that don't look like 10G..."
         ],
         c: [ '<32>{#p/basic}{#n1}* Not interested, huh?', "<32>* Well, that's fine.\n* I'll just find someone else..." ],
         d: [
            '<32>{#s/equip}{#p/human}{#n1!}* (You got the Super Starwalker 1.)',
            '<32>{#p/basic}{#n1}* Splendid!\n* Enjoy the comic strip.'
         ],
         e: [ '<32>{#p/basic}{#n1}* Yine geri geldin, ha?', "<32>* Sorry bud, I've got nothin' left to sell." ],
         f: [
            "<32>{#p/human}{#n1!}* (Çok fazla şey taşıyorsun.)",
            "<32>{#p/basic}{#n1}* Them pockets of yours are lookin' kinda full..."
         ],
         g: [
            "<32>{#p/basic}{#n1}* I heard they're rebooting the comic franchise...",
            '<32>* The new main character is some snake fella with sunglasses or something.',
            "<32>* If I was in charge, I'd make a spinoff about that sidekick...",
            '<32>* Gumbert, I think?'
         ],
         h: [
            "<32>{#p/basic}{#n1}* Maybe now that we're free, they'll finally make that reboot they were planning.",
            "<32>* What was it called?\n* Oh, I've already forgotten..."
         ]
      },
      mananaX: () =>
         [
            [
               '<32>{#p/basic}{#n1}* Now what was THAT racket?',
               "<32>{#p/basic}{#n1}* Er, sorry, my eyesight's not what it used to be..."
            ],
            [ '<32>{#p/basic}{#n1}* Huh?\n* It happened again?\n* Tch, kids these days...' ],
            [ '<32>{#p/basic}{#n1}* Kids these days...' ]
         ][Math.min(roomKills().w_puzzle4++, 2)],
      afrogX: (k: number) =>
         [
            [ "<32>{#p/basic}{#n1}* Eğer... eğer b-bunu bir daha yaparsan... s-seni durdurmak zorunda kalacağım!" ],
            [ '<32>{#p/basic}{#n1}* H-hayır...\n* Yine mi...' ]
         ][k],
      patron: {
         a: pager.create(
            0,
            () =>
               SAVE.data.n.plot === 72
                  ? 6 <= world.population
                     ? [
                          "<32>{#p/basic}{#n1}* Mutsuzum.\n* DJ masasını daha sonra yapılacak zevksiz bir gösteri için aldılar.",
                          '<32>* ... dur, aslında bu biraz havalı olabilir.'
                       ]
                     : [
                          "<32>{#p/basic}{#n1}* Mutsuzum.\n* Daha önce buradan geçmiş olan zorba...",
                          '<32>* ... meğer senmişsin.',
                          '<32>* En sonda bizi kurtardın, ama bu yolda niye şiddete başvurdun ki?'
                       ]
                  : SAVE.data.b.napsta_performance
                  ? [
                       "<32>{#p/basic}{#n1}* Mutsuzum.\n* Günümüz müzisyenleri kendilerine çok fazla yükleniyor...",
                       '<32>* Şahsen ben, onun o küçük bestesini beğenmiştim.',
                       "<32>* Onu bir daha asla dinleyemeyecek olmamız ne yazık.",
                       '<32>{#n1!}{#n2}* En azından sana dostluk edebilecek biftekler var, di mi? ;)',
                       '<32>{#n2!}{#n1}* ... yine mi sen.'
                    ]
                  : [
                       "<32>{#p/basic}{#n1}* Mutsuzum.\n* Buradaki yemekler her gün daha da beter hale geliyor...",
                       '<32>* Bana \"gerçek\" bir şey vadedilmişti, ama bana ucuz bir kopya verdiler.',
                       '<32>{#n1!}{#n2}* Hey! ;)\n* Müşterilerin önünde dükkanımı kötülemeyi kessene! ;)',
                       '<32>* Ayrıca, ya senin tat alma duyunda sorun varsa ;)',
                       '<32>{#n2!}{#n1}* ... şaşırtmadı.'
                    ],
            () => [
               SAVE.data.n.plot === 72 && 6 <= world.population
                  ? "<32>{#p/basic}{#n1}* ... işler göründüğü gibi değil mi?"
                  : '<32>{#p/basic}{#n1}* ... işler aynı göründüğü gibi.'
            ]
         )
      },
      pie: () =>
         3 <= SAVE.data.n.cell_insult
            ? [ '<32>{#p/human}* (Yanmış Turta\'yı aldın.)' ]
            : SAVE.data.n.state_wastelands_mash === 1
            ? [ '<32>{#p/human}* (Turta Çorbası\'nı aldın.)' ]
            : SAVE.data.b.snail_pie
            ? [ '<32>{#p/human}* (Salyangozlu Turta\'yı aldın.)' ]
            : [ '<32>{#p/human}* (Karamelli Turta\'yı aldın.)' ],
      plot_call: {
         a: () => [
            '<32>{#p/event}* Zırr, zırr...',
            3 <= SAVE.data.n.cell_insult
               ? '<25>{#p/toriel}* Merhaba, çocuk.'
               : '<25>{#p/toriel}* Merhaba?\n* Bu Toriel.',
            '<25>{#f/1}* Soracağım şeyin hiçbir özel sebebi yok...',
            '<25>{#f/0}* Tarçın mı yoksa karamel mi tercih edersin?',
            choicer.create('* (Hangisini tercih edersin?)', 'Tarçın', 'Karamel'),
            3 <= SAVE.data.n.cell_insult
               ? '<25>{#p/toriel}{#f/0}* Anlıyorum.'
               : '<25>{#p/toriel}* Ah, anlıyorum!\n* Çok teşekkür ederim!'
         ],
         b: () => [
            '<32>{#p/event}* Zırr, zırr...',
            3 <= SAVE.data.n.cell_insult
               ? '<25>{#p/toriel}* Merhaba, çocuk.'
               : '<25>{#p/toriel}* Merhaba?\n* Bu Toriel.',
            [
               '<25>{#f/1}* Karamelden NEFRET etmiyorsun, değil mi?',
               '<25>{#f/1}* Tarçından NEFRET etmiyorsun, değil mi?'
            ][SAVE.data.n.choice_flavor],
            '<25>{#f/1}* Tercihinin ne olduğunu biliyorum, ama...',
            '<25>{#f/1}* Tabağında bulunuyor olsaydı yine de memnun olur muydun?',
            choicer.create('* (Ne diyeceksin?)', 'Evet', 'Hayır')
         ],
         b1: () => [
            3 <= SAVE.data.n.cell_insult
               ? '<25>{#p/toriel}{#f/0}* Anlaşıldı.'
               : '<25>{#p/toriel}* Tabii, tabii, elbette.',
            '<25>{#f/1}* Tamamdır, öyleyse...'
         ],
         b2: () => [
            '<25>{#p/toriel}{#f/5}* ...',
            '<25>{#f/0}* Pekala öyleyse.',
            '<25>{#f/1}* ...',
            3 <= SAVE.data.n.cell_insult
               ? '<25>{#f/0}* Ne yapabileceğime bir bakacağım.'
               : '<25>{#f/0}* Seni sonra arayacağım, çocuğum.'
         ],
         c: [
            '<32>{#p/event}* Zırr, zırr...',
            '<25>{#p/toriel}{#f/1}* Herhangi bir alerjin yok, değil mi?',
            '<25>{#f/5}* ...',
            '<25>{#f/5}* Sanırım insanların canavar yiyeceklerine alerjisi olamaz bile.',
            '<25>{#f/0}* Hee hee.\n* Sorduğumu unut gitsin!'
         ],
         d: [
            '<32>{#p/event}* Zırr, zırr...',
            '<25>{#p/toriel}{#f/1}* Merhaba, ufaklık.',
            '<25>{#f/0}* Şimdi fark ediyorum ki, en son temizlik yapalı epey zaman geçmiş.',
            '<25>{#f/1}* Muhtemelen etrafta saçılmış bir sürü şey vardır...',
            '<25>{#f/0}* Onları alabilirsin, ama çok fazla şey taşımamaya çalış.',
            '<25>{#f/1}* Ya gerçekten çok isteyeceğin bir şey görecek olursan?',
            '<25>{#f/0}* Bunun için cebinde biraz yer bırakmak isteyeceksindir.'
         ]
      },
      puzzle1A: () =>
         SAVE.data.b.svr
            ? [ '<32>{#p/human}* (Şalter sıkışmış gibi görünüyor.)' ]
            : [ '<32>{#p/basic}* Şalter sıkışmış.' ],
      puzzle3A: () =>
         SAVE.data.b.svr
            ? [ '<32>{#p/human}* (Şalter sıkışmış gibi görünüyor.)' ]
            : [ '<32>{#p/basic}* Şalter sıkışmış.' ],
      return1: () => [
         SAVE.data.n.cell_insult < 3
            ? '<25>{#p/toriel}{#f/1}* Çocuğum, sen nasıl geldin buraya!?'
            : '<25>{#p/toriel}{#f/1}* Ah... işte buradasın.',
         '<25>* İyi misin?'
      ],
      return2a: () =>
         SAVE.data.n.cell_insult < 3
            ? [ '<25>{#p/toriel}* Bir çizik bile yok!\n* Etkileyici.' ]
            : [ '<25>{#p/toriel}{#f/10}* Hiçbir çizik yok...\n* İyi öyleyse.' ],
      return2b: () =>
         SAVE.data.n.cell_insult < 3
            ? [ '<25>{#p/toriel}{#f/4}* Yaralanmış görünüyorsun...', '<25>{#f/10}* İşte, işte, seni iyileştireceğim.' ]
            : [ '<25>{#p/toriel}{#f/9}* Yaralanmışsın.', '<25>{#f/10}* Lütfen, yaralarını iyileştirmeme izin ver.' ],
      return2c: [
         '<25>{#p/toriel}{#f/3}* ...',
         '<25>{#f/11}* Bunu sana kim yaptı?\n* Birisi bunun hesabını verecek.'
      ],
      return3: () => [
         '<25>{#p/toriel}* Özür dilerim, ufaklık.\n* Seni yalnız bırakmak benim aptallığımdı.',
         ...(world.postnoot
            ? [
                 '<25>{#f/1}* ... sadece bana mı öyle geliyor, yoksa atmosferde bir sorun mu var?',
                 '<25>{#f/5}* Belki de onu sağlayan sistem düzgün çalışmıyordur.',
                 '<25>{#f/5}* ...',
                 '<25>{#f/0}* Önemli değil.\n* En kısa sürede çözüleceğinden eminim.'
              ]
            : []),
         '<25>{#f/1}* Gel!\n* Sana bir sürprizim var.'
      ],
      return4: () => [
         '<25>{#p/toriel}* Salonuma hoş geldin!',
         ...(3 <= SAVE.data.n.cell_insult
            ? [
                 '<25>{#f/1}* Kokuyu alabiliyor musun...',
                 '<25>{#p/toriel}{#f/2}* ... ah, fırını kontrol etmeyi unuttum!',
                 '<25>{#p/toriel}{#f/5}* Kafam önceki tavrınla o kadar meşguldü ki, ben...',
                 '<25>{#p/toriel}{#f/1}* Bununla hemen ilgilenmem gerekiyor, lütfen uzaklaşma!'
              ]
            : [
                 '<25>{#f/1}* Kokuyu alabiliyor musun?',
                 ...(SAVE.data.b.snail_pie
                    ? [ '<25>{#f/0}* Sürpriz!\n* Bir ev yapımı salyangozlu turta.' ]
                    : [
                         '<25>{#f/0}* Sürpriz!\n* Bir ev yapımı karamelli- tarçınlı turta.',
                         '<25>{#f/0}* Bu akşam salyangozlu turta yerine bunu tercih edersin diye düşündüm.'
                      ]),
                 '<25>{#f/1}* En son birisi ile ilgilenmem üzerinden uzun zaman geçti...',
                 '<25>{#f/0}* Ama yine de burada yaşarken güzel vakit geçirmeni istiyorum.',
                 '<25>{#f/0}* Beni takip et!\n* Senin için bir sürprizim daha var.'
              ])
      ],
      return5: [
         "<25>{#p/toriel}* Şuna bir bak!\n* Bu senin kendine ait bir odan.",
         '<25>{#f/1}* Umarım beğenirsin...'
      ],
      return6: [
         '<25>{#p/toriel}{#f/1}* Pekala, gidip turtaya bir bakmam lazım.',
         '<25>{#f/0}* Lütfen, kendini evinde gibi hisset!'
      ],
      runaway1: [
         [ '<25>{#p/toriel}{#f/1}* Burası yerine evde oynaman gerekmez mi?', '<25>{#f/0}* Gel öyleyse.' ],
         [ '<25>{#p/toriel}{#f/9}* Çocuğum, burada dışarıda oynamak tehlikelidir.', '<25>{#f/5}* Güven bana.' ],
         [ '<26>{#p/toriel}{#f/5}* Burada yer çekimi düşüktür.\n* Dışarı süzüleceksin.' ],
         [ '<25>{#p/toriel}{#f/5}* Burada atmosfer sistemi zayıftır.\n* Bu gidişle nefessiz kalacaksın.' ],
         [ '<25>{#p/toriel}{#f/23}* Burada görebileceğin hiçbir şey yok.' ],
         [ '<25>{#p/toriel}{#f/1}* Benimle kitap okumak ister misin?' ],
         [ '<25>{#p/toriel}{#f/1}* Outlands\'deki diğer odaları tekrar ziyaret etmek ister misin?' ],
         [ '<25>{#p/toriel}{#f/5}* Kendini tehlikeye atmana izin vermeyeceğim.' ],
         [ '<25>{#p/toriel}{#f/3}* Bunu tüm gün yapmamı mı bekliyorsun?' ],
         [ '<25>{#p/toriel}{#f/4}* ...' ],
         [ '<25>{#p/toriel}{#f/17}* ...', '<25>{#f/15}* Oynadığın oyunu beğenmiyorum.' ],
         [ '<25>{#p/toriel}{#f/17}* ...' ]
      ],
      runaway2: [
         '<25>{#p/toriel}{#f/1}* Lütfen eve geri dön, ufaklık...',
         '<25>{#f/0}* Sana göstereceğim bir şey var!'
      ],
      runaway3: [
         '<25>{#p/toriel}{#f/2}* Çocuk, hayır!\n* Burası senin için güvenli değil!',
         '<25>{#f/0}* Gel. Kahvaltıyı hazırlamayı bitirdim.'
      ],
      runaway4: [ '<25>{#p/toriel}{#f/2}* Çocuk!\n* Ne yapıyorsun!?' ],
      runaway5: [
         '<25>{#p/toriel}{#f/1}* Buradan ayrılırsan neler olacağının farkında mısın?',
         '<25>{#f/5}* Ben... Ben sana daha fazla ilgi göstermediğim için özür dilerim...',
         '<25>{#f/9}* Belki bunu yapmış olsaydım, buradan kaçmazdın...'
      ],
      runaway6: [
         '<25>{#g/torielStraightUp}* İtiraf etmeliyim... Ben buradan ayrılmaktan korkuyorum.',
         '<25>{#f/9}* Buranın ötesinde ikimizi de tehdit edecek birçok tehlike mevcut.',
         '<25>{#g/torielSincere}* Seni onlardan korumak istiyorum, ama...',
         '<25>{#g/torielStraightUp}* Eğer seni takip edersem, yalnızca seni daha fazla tehlikeye atmış olurdum.',
         '<25>{#f/9}* Benim varlığım bir tehdit olarak algılanırdı.'
      ],
      runaway7: [
         '<25>{#p/toriel}{#f/5}* Lütfen...',
         '<25>{#f/1}* Benimle geri dön, sana iyi bakacağıma söz veriyorum.',
         '<25>{#f/5}* Sen ne istersen yapacağım, tamam mı?',
         '<25>{#f/18}* Lütfen... beni diğerleri gibi bırakma...'
      ],
      runaway7a: [
         '<25>{#p/toriel}{#f/18}* ...',
         '<25>{#g/torielCompassionSmile}* İşte, işte, çocuğum.\n* Artık her şey yoluna girecek.',
         '<25>{#f/1}* Eve geri dön, ben de yakında sana katılacağım.',
         '<25>{#f/5}* Burada yapmam gereken bir şey var.'
      ],
      runaway7b: [
         '<25>{#p/toriel}{#f/21}* Ne kadar acınası...',
         '<25>* Ben...\n* Tek bir insan çocuğunu bile koruyamıyorum...',
         '<32>{#p/human}* (Gittikçe uzaklaşan ayak sesleri duyuyorsun.)'
      ],
      silencio: {
         a: pager.create(
            0,
            () =>
               SAVE.data.n.plot === 72
                  ? [
                       '<32>{#p/basic}{#n1}* Selam.\n* Seni tekrar burada görmek güzel.',
                       "<32>* Bu mesken edindiğim yeri tekrar ziyaret etmeye geldim...",
                       "<32>* Ne de olsa, burası sessiz.\n* Aynı benim gibi.",
                       "<32>* Ayrıyeten, ÇEKİRDEK’teki işimi bıraktım.",
                       '<32>* Şöyle ki, mühendislik ekibine katıldığımda...',
                       "<32>* Hazırlıksız nöbet işine çağırılacağımı bilmiyordum.",
                       '<32>* ... anlaşılan kurumsal çeşitliliğin aldatıcı dünyasını ben bile fark edememişim.'
                    ]
                  : SAVE.data.b.napsta_performance
                  ? [
                       '<32>{#p/basic}{#n1}* Selam.\n* Seni gösteride görmek güzeldi.',
                       "<32>* Adım Silencio... ama bunu önceden duyduğuna eminim.",
                       '<32>* Etrafımdaki herkes adımı biliyor, o DJ bile.',
                       '<32>* Bir keresinde burada kendi müzikalimi yapmıştım.',
                       '<32>* \"Silencio\'nun Mükemmel Kaçışı\"ydı adı da.',
                       '<32>* Müzikal bitince, daha kalabalık nefesini toparlayamadan ortadan kaybolmuştum.'
                    ]
                  : [
                       '<32>{#p/basic}{#n1}* Selam.\n* Seninle tanışmak güzel.',
                       "<32>* İsmim Silencio... yani en azından bana öyle diyorlar, neyse.",
                       '<32>* Bana niye öyle hitap ettiklerini bilmek ister misin?',
                       "<32>* Uzay ninjası gibiyimdir, en sessiz yıldızlar kadar da sessiz.",
                       '<32>* Her türlü tehlikeden sıvışabilirim, istisnasız.',
                       "<32>* Bana inanmıyor musun?\n* İlginç bir şey dene, ve ne kadar hızlı kaçtığımı gör."
                    ],
            () =>
               SAVE.data.n.plot === 72
                  ? [
                       "<32>{#p/basic}{#n1}* Ah evet, sanırım artık galaksiyi terk etmekte özgürüm.",
                       "<32>* ... ama belki kalırım."
                    ]
                  : SAVE.data.b.napsta_performance
                  ? [
                       '<32>{#p/basic}{#n1}* Bir bakıma, performansım onlar için...',
                       '<32>* “Nefes kesiciydi\" diyebilirsin.'
                    ]
                  : [
                       '<32>{#p/basic}{#n1}* Neden hala benimle konuşuyorsun, ha?',
                       "<32>* Zaten söylemek istediğim her şeyi söyledim."
                    ]
         )
      },
      
      socks0: [ '<32>{#p/human}* (İçeriye bir göz atıyorsun.)', '<32>{#p/human}* (Çekmece boş görünüyor.)' ],
      socks1: () =>
         world.darker
            ? [ '<32>{#p/human}* (İçeriye bir göz atıyorsun.)', "<32>{#p/basic}* Yalnızca bir çorap çekmecesi." ]
            : [
                 '<32>{#p/human}* (İçeriye bir göz atıyorsun.)',
                 '<32>{#p/basic}* Rezalet!',
                 "<32>* Toriel'in çorap koleksiyonu.\n* Biraz dağınık...",
                 world.meanie
                    ? choicer.create('* (Daha fazla dağıt?)', 'Evet', 'Hayır')
                    : choicer.create('* (Dağınıklığı temizle?)', 'Evet', 'Hayır')
              ],
      socks2: () =>
         world.meanie
            ? [ '<33>{#p/human}* (Çorapları ortalığa saçıyorsun.)' ]
            : [
                 '<32>{#p/human}* (Çorapları eşleşen çiftleriyle düzenliyorsun.)',
                 ...(SAVE.data.b.oops
                    ? []
                    : [
                         "<32>{#p/human}* (...)\n* (Çekmecede saklı bir anahtar var gibi görünüyor.)",
                         choicer.create('* (Anahtarı al?)', 'Evet', 'Hayır')
                      ])
              ],
      socks3: () => [
         "<32>{#p/human}* (...)\n* (Çekmecede saklı bir anahtar var gibi görünüyor.)",
         choicer.create('* (Anahtarı al?)', 'Evet', 'Hayır')
      ],
      socks4: [ '<32>{#p/human}* (Hiçbir şey yapmamaya karar veriyorsun.)' ],
      socks5: [
         '<32>{#s/equip}{#p/human}* (Gizli Anahtar anahtarlığına eklendi.)',
         '<32>{#p/basic}* Ama neyi açabilir ki...?'
      ],
      socks6: [ '<32>{#p/human}* (Hiçbir şey almamaya karar verdin.)' ],
      socks7: () =>
         SAVE.data.b.svr
            ? [
                 '<32>{#p/human}* (Burada başlayan uzun yolculuğu anımsarcasına çorap çekmecesine bakıyorsun.)',
                 "<32>{#p/human}* (Bu olmasaydı nerelerde olacağını merak etmeden duramıyorsun.)"
              ]
            : world.darker
            ? [ "<32>{#p/basic}* Yalnızca bir çorap çekmecesi." ]
            : SAVE.data.n.plot < 72
            ? [ "<32>{#p/basic}* Çoraplara bakmaktan kendini alamıyorsun." ]
            : SAVE.data.b.oops
            ? [
                 "<32>{#p/basic}* Tüm bu yolu Toriel'in çorap çekmecesini ziyaret etmek için mi geldin?",
                 '<32>* Hayatta çok iyi önceliklerin var.'
              ]
            : [
                 "<32>{#p/basic}* Tüm bu yolu Toriel'in çorap çekmecesini ziyaret etmek için mi geldin?",
                 '<32>* ... Sanırım bu mantıklı.'
              ],
      steaksale: {
         a: pager.create(
            0,
            () =>
               SAVE.data.b.napsta_performance
                  ? [
                       '<32>{#p/basic}{#n1}* Naber kız ;)',
                       "<32>* Seni o gösteride görmek güzeldi biliyo musun? ;)",
                       '<32>* Müthiş bir iş çıkardın ;)',
                       "<32>* Eğer bir şeyden eminsem, o da özel teklif vaktinin geldiğidir ;)",
                       '<32>* Sadece kısa bir süreliğine, ürünlerimize \"premium\" malzemeler katılacak ;)',
                       "<32>* Ve inan bana kız, bu o eski şeylerden değil ha, hiç de bile ;)",
                       '<32>* Bu şeyler HARBİ, yo ;)',
                       "<32>* Fiyatı biraz daha fazla, umarım buna takılmıyosundur ;)",
                       "<32>* Öyleyse... niye nelerin satıldığına bi bakmıyorsun? ;)"
                    ]
                  : [
                       '<32>{#p/basic}{#n1}* Naber kız ;)',
                       '<32>* Bilir misin, patron adam beni buraya siz taşracılar napıyorsunuz bakayım diye yolladı ;)',
                       "<32>* İşletmeyi büyüttüğümüzü söyleyebilirsin ;)",
                       "<32>* İşletmemiz neyle ilgili diye mi sordun? ;)",
                       "<32>* Aslında, gayet basit... biftek satıyoruz ;)",
                       "<32>* Bu o çoğaltılmış şeylerden değil ha, hiç de bile ;)",
                       '<32>* Bu şeyler HARBİ, yo ;)',
                       '<32>* Aksini iddia eden kandırıkçıdır, anlıyo musun? ;)',
                       "<32>* Bunları demişken, niye nelerin satıldığına bi bakmıyorsun? ;)"
                    ],
            [ "<32>{#p/basic}{#n1}* Niye nelerin satıldığına bi bakmıyorsun? ;)" ]
         ),
         a1: [ '<32>{#p/basic}{#n1}* Her şey için teşekkürler kız ;)' ],
         b: () => [
            SAVE.data.b.napsta_performance
               ? world.darker
                  ? '<32>{#p/basic}{#n1!}* 40A\'ya \"Cızırtılı Biftek\".'
                  : '<32>{#p/basic}{#n1!}* Üstünde \"Cızırtılı Biftek\" yazıyor ve 40A tutuyor.\n* Mübalağa gibi kokuyor.'
               : world.darker
               ? '<32>{#p/basic}{#n1!}* 20A\'ya \"Cızırtılı Biftek\".'
               : '<32>{#p/basic}{#n1!}* Üstünde \"Cızırtılı Biftek\" yazıyor ve 20A tutuyor.\n* Abartı gibi kokuyor.',
            SAVE.data.b.napsta_performance
               ? choicer.create('* (Cızırtılı Biftek\'i 40A\'ya al?)', 'Evet', 'Hayır')
               : choicer.create('* (Cızırtılı Biftek\'i 20A\'ya al?)', 'Evet', 'Hayır')
         ],
         b1: [ '<32>{#p/human}{#n1!}* (Cızırtılı Biftek\'i aldın.)', '<32>{#p/basic}{#n1}* Güzel seçim kız ;)' ],
         b2: [ '<32>{#p/human}{#n1!}* (Satın almamaya karar verdin.)' ],
         c: () => [
            SAVE.data.b.napsta_performance
               ? world.darker
                  ? '<32>{#p/basic}{#n1!}* 10A\'ya \"Fışırtılı Soda\".'
                  : '<32>{#p/basic}{#n1!}* Üstünde \"Fışırtılı Soda\" yazıyor ve 10A tutuyor.\n* Bunu KİM alır ki?'
               : world.darker
               ? '<32>{#p/basic}{#n1!}* 5A\'ya \"Fışırtılı Soda\".'
               : '<32>{#p/basic}{#n1!}* Üstünde \"Fışırtılı Soda\" yazıyor ve 5A tutuyor.\n* Bunu kim alır?',
            SAVE.data.b.napsta_performance
               ? choicer.create('* (Fışırtılı Soda\'yı 10A\'ya al?)', 'Evet', 'Hayır')
               : choicer.create('* (Fışırtılı Soda\'yı 5A\'ya al?)', 'Evet', 'Hayır')
         ],
         c1: [ '<32>{#p/human}{#n1!}* (Fışırtılı Soda\'yı aldın.)', "<32>{#p/basic}{#n1}* Dikkat et, şekerlidir ;)" ],
         c2: [ '<32>{#p/human}{#n1!}* (Satın almamaya karar verdin.)' ],
         d: pager.create(
            0,
            () => [
               "<32>{#p/human}{#n1!}* (You don't have enough G.)",
               '<32>{#p/basic}{#n1}* Paran yetmedi mi, ha? ;)',
               SAVE.data.b.napsta_performance
                  ? '<32>{#p/basic}* Sorun değil kız ;)\n* Sonuçta herkesin parası \"premium\" malzemelere yetecek değil ;)'
                  : "<32>{#p/basic}* Sorun değil kız ;)\n* Biraz paran olduğunda geri gelmeyi unutma ;)"
            ],
            [ "<32>{#p/human}{#n1!}* (You don't have enough G.)" ]
         ),
         e: pager.create(
            0,
            [
               "<32>{#p/human}{#n1!}* (Çok fazla şey taşıyorsun.)",
               '<32>{#p/basic}{#n1}* Belki de daha sonra gelmelisin ;)'
            ],
            [ "<32>{#p/human}{#n1!}* (Çok fazla şey taşıyorsun.)" ]
         ),
         f: [ '<32>{#p/human}{#n1!}* (Cızırtılı Biftek\'i aldın.)' ],
         g: [ '<32>{#p/human}{#n1!}* (Fışırtılı Soda\'yı aldın.)' ],
         h: [ "<32>{#p/human}{#n1!}* (Çok fazla şey taşıyorsun.)" ],
         i: [
            "<32>{#p/basic}{#n1}* Bu arada, stoklarımız tükendi ;)",
            "<32>* Anlaşılan bizim mallara bir türlü doyamıyorsun ;)",
            '<32>* Bak ne dicem- dur, patron adamla tanıştığında... ona bunu söyle ;)',
            '<32>{#p/human}{#n1!}* (Aaron kulağına bir şey fısıldadı.)',
            '<32>{#p/basic}{#n1}* Oralarda bol şans, kız ;)'
         ]
      },
      supervisor: {
         a: [ '<32>{#p/basic}* Sonra...' ],
         b: [
            '<32>{#p/napstablook}* hey millet...',
            '<32>* bu bir süre önce yazdığım küçük bir melodi...',
            "<32>* kendi tarzımla yeni şeyler deniyordum, o yüzden...",
            "<32>* umarım ki sizler için yeterli olur",
            '<32>* ...',
            '<32>* pekala, işte başlıyor...'
         ],
         c1: [ '<32>{*}{#p/basic}* Hımm, bu caz gibi.{^30}{%}' ],
         c2: [
            '<25>{*}{#p/toriel}{#f/7}* Neden Napstablook bundan hiç bahsetmedi??\n* Bu güzelmiş!{^30}{%}',
            "<32>{*}{#p/basic}* Evet, belki de sadece çekingendir.{^30}{%}"
         ],
         c3: [ '<32>{*}{#p/basic}* Ooo, ziller ;){^30}{%}' ],
         c4: [ '<32>{*}{#p/basic}* Düşüş kısmı geliyor!{^30}{%}' ],
         c5: [ '<32>{*}{#p/basic}* Yani, bu... bir şeydi.{^30}{%}' ],
         d: [
            '<32>{#p/napstablook}* aynen, sadece bir şeydi',
            '<32>{#p/napstablook}* neyse...\n* muhtemelen sizin canınızı sıktım...',
            '<32>{#p/napstablook}* üzgünüm...'
         ],
         e: [
            '<25>{|}{#p/toriel}{#f/2}* Hayır, bekle!\n* Bu aslında...',
            "<32>{#p/basic}* Seni duyabileceğini sanmıyorum, Toriel.",
            '<25>{#p/toriel}{#f/9}* ...\n* Hiçbir zaman duymuyor...'
         ]
      },
      terminal: {
         a: () =>
            postSIGMA()
               ? [ "<32>{#p/human}* (Terminali aktifleştiriyorsun, ancak gelen bir mesaj yok.)" ]
               : SAVE.data.n.plot === 72
               ? !world.runaway
                  ? [
                       '<32>{#p/human}* (Terminali aktifleştirip gelen mesajı oynatıyorsun.)',
                       "<32>{#p/alphys}* Özgürüz, millet!\n* Bu bir şaka değil, güç kalkanı ortadan kalktı!",
                       "<32>* Gerçekten, birkaç gün içinde çekirdeği kapatacaklar, artık gitme zamanı!",
                       "<32>* Burada ölmek istemiyorsunuz, değil mi?"
                    ]
                  : [
                       '<32>{#p/human}* (Terminali aktifleştirip gelen mesajı oynatıyorsun.)',
                       "<32>{#p/alphys}* Güç kalkanı ortadan kalktı.\n* Tüm vatandaşları derhal tahliye etmeye çağırıyoruz.",
                       "<32>* ... Hepinizin korktuğunu biliyorum, ama her şey yoluna girecek.",
                       "<32>* Onu geride bırakırsak bize zarar veremez."
                    ]
               : 37.2 <= SAVE.data.n.plot
               ? [
                    '<32>{#p/human}* (Terminali aktifleştirip gelen mesajı oynatıyorsun.)',
                    "<32>{#p/alphys}* Dökümhane'mizin sıvı şebekesi, çok... n-nazik çalışanlarımız sayesinde onarıldı.",
                    '<32>* ...',
                    "<32>* Konuyla alakasız olarak, y-yeni işçiler arıyoruz."
                 ]
               : [
                    '<32>{#p/human}* (Terminali aktifleştirip gelen mesajı oynatıyorsun.)',
                    "<32>{#p/alphys}* Dökümhane'nin sıvı şebekesi y-yine dağılıyor.",
                    '<32>* Çalışanlar kısa bir dönüş sözü verdiler, ancak durum pek iç açıcı görünmüyor.',
                    '<32>* Lütfen, eğer orada y-yardım edebilecek biri varsa, size ihtiyacımız var...'
                 ]
      },
      torieldanger: {
         a: [ '<25>{#p/toriel}{#f/1}* Terminali kontrol etmeyi denedin mi?' ],
         b: [ '<25>{#p/toriel}{#f/1}* Şifre terminali hemen orada, ufaklık.' ]
      },
      latetoriel1: [
         '<25>{#p/toriel}{#npc/a}{#f/2}* ...!',
         '<25>{#f/5}* Burada ne yapıyorsun, ço...',
         '<25>{#f/9}* ... çocuğum...',
         '<25>{#f/5}* Artık sana daha fazla ilgi gösteremem, çocuk.\n* Göstermemeliyim de zaten.',
         '<25>{#f/5}* Bulunman gereken yerler, görmen gereken şeyler var...',
         '<25>{#f/10}* Ben kimim ki seni bunlardan alıkoyayım?',
         '<25>{#f/9}* ...',
         '<25>{#f/5}* Lütfen, bensiz devam et...',
         '<25>{#f/1}* ... Doğru olanı yapabileceğini biliyorum...'
      ],
      latetoriel2: [ '<25>{#p/toriel}{#npc/a}{#f/5}* ... devam et...' ],
      
      lateasriel: () =>
         [
            [ '<25>{#p/asriel1}{#f/13}* Beni yalnız bırak, Frisk...', "<25>{#f/15}* Seninle geri dönemem, tamam mı?" ],
            [
               "<25>{#p/asriel1}{#f/16}* Tekrar onların kalplerini kırmak istemiyorum.",
               "<25>{#f/13}* Beni asla görmesinler daha iyi."
            ],
            [
               '<25>{#p/asriel1}{#f/15}* ... ne yapıyorsun?',
               '<25>{#f/15}* Bana eşlik etmeye mi çalışıyorsun?',
               '<25>{#f/23}* Frisk...',
               '<25>{#f/22}* ...',
               '<25>{#f/13}* Hey.',
               '<25>{#f/13}* Sana bir soru sormama izin ver.',
               '<25>{#f/15}* Frisk...\n* Neden buraya geldin?',
               '<25>{#f/13}* Hikayeyi herkes biliyor, değil mi?',
               '<25>{#f/23}* \"Ebott sektörüne uçan uzay mekiklerinin kaybolduğu söyleniyor.\"',
               '<25>{#f/22}* ...',
               '<32>{#p/human}* (...)\n* (Asriel\'a gerçeği söylüyorsun.)',
               '<25>{#p/asriel1}{#f/25}* ...',
               '<25>{#f/25}* Frisk... sen...',
               '<25>{#f/23}* ...',
               "<25>{#f/23}* Artık yalnız kalmana gerek yok, tamam mı?",
               "<25>{#f/17}* Burada birçok harika arkadaş edindin...",
               "<25>{#f/17}* Onlar sana göz kulak olacaklar, tamam mı?"
            ],
            [
               '<25>{#p/asriel1}{#f/15}* ...',
               '<25>{#f/15}* $(name) neden buraya uçtu, biliyorum.',
               "<25>{#f/16}* Pek de sevindirici bir sebepten dolayı değildi.",
               "<25>{#f/13}* Frisk.\n* Seninle dürüst olacağım.",
               '<25>{#f/15}* $(name) insanlıkla hiçbir ilgisi olmasını istemedi.',
               '<25>{#f/16}* Neden, hiçbir zaman söylemedi.',
               '<25>{#f/15}* Ama bu konuda çok güçlü hisleri vardı.'
            ],
            [
               "<25>{#p/asriel1}{#f/17}* Frisk, sorun yok.\n* Sen hiç $(name) gibi değilsin.",
               '<25>{#f/15}* Hatta, oldukça benzer, uh, moda tercihleriniz olsa da...',
               "<25>{#f/13}* Neden aynı kişiymişsiniz gibi davrandığımı bilmiyorum.",
               '<25>{#f/15}* Belki de...\n* Gerçek şu ki...',
               "<25>{#f/16}* $(name) benim olmasını istediğim kişi değildi.",
               '<25>{#f/13}* O sırada, Frisk...',
               "<25>{#f/17}* Sen benim hep istediğim türden bir arkadaşsın.",
               '<25>{#f/20}* Yani belki de biraz bunu yansıtıyordum.',
               "<25>{#f/17}* Dürüst olalım.\n* Yıldız olarak biraz tuhaf şeyler yaptım."
            ],
            [
               "<25>{#p/asriel1}{#f/13}* Söylemem gereken son bir şey daha varmış gibi hissediyorum.",
               '<25>{#f/15}* $(name) ve ben RUH\'larımızı birleştirdiğimizde...',
               '<25>{#f/16}* Bedenimiz üzerindeki kontrol aslında aramızda bölünmüştü.',
               '<25>{#f/15}* Kendi boş bedenini alıp taşıyan oydu.',
               "<25>{#f/13}* Ve sonra, gezegenin kalıntılarına ulaştığımızda...",
               '<25>{#f/13}* Bizim tüm gücümüzü kullanmayı...',
               '<25>{#f/16}* ... isteyen kişi oydu.',
               '<25>{#f/13}* Buna karşı koymak için elimden geldiğince direndim.',
               '<25>{#f/15}* Ve sonra, benim yüzümden, biz...',
               "<25>{#f/22}* İşte, bu yüzden bu hale düştüm.",
               '<25>{#f/23}* ... Frisk.',
               "<25>{#f/17}* Bunca zamandır, bu karar için hep kendimi suçladım.",
               "<25>{#f/13}* Dünyaya karşı bu korkunç bakış açısını benimsememin sebebi bu.",
               '<25>{#f/13}* \"Öldür ya da öl.\"',
               '<25>{#f/17}* Ama şimdi...\n* Seninle tanıştıktan sonra...',
               "<25>{#f/23}* Frisk, artık bu kararımdan pişman değilim.",
               '<25>{#f/22}* Ben doğru olanı yaptım.',
               "<25>{#f/13}* Eğer o insanları öldürmüş olsaydık...",
               '<25>{#f/15}* Bütün insanlığa karşı savaş açmak zorunda kalacaktık.',
               '<25>{#f/17}* Ve işin sonunda herkes özgürlüğüne kavuştu, değil mi?',
               '<25>{#f/17}* Buraya gelen diğerleri bile sağ çıkmayı başardı.',
               '<25>{#f/13}* ...',
               '<25>{#f/15}* Ama, $(name)...',
               "<25>{#f/16}* ... Biz öldükten sonra ona ne olduğunu kesin olarak söyleyemem.",
               '<25>{#f/15}* Ona ait hiçbir şey bulunamadı... RUH\'u bile.',
               "<25>{#f/15}* Yani... Acaba hala orada mı diye... merak etmeden duramıyorum.",
               '<32>{#p/basic}* ...',
               '<32>{#p/human}* (Sanki birisi ağlıyor gibi...)'
            ],
            [
               '<25>{#p/asriel1}{#f/17}* Frisk, beni dinlediğin için teşekkür ederim.',
               '<25>{#f/17}* Artık gerçekten arkadaşlarının yanına gitmelisin, tamam mı?',
               '<25>{#f/13}* Ah, ve, lütfen...',
               '<25>{#f/20}* Eğer gelecekte, şey, uh, beni görürsen...',
               "<25>{#f/15}* ... benmişim gibi düşünme, tamam mı?",
               '<25>{#f/16}* Beni sadece... böyle hatırlamanı istiyorum.',
               '<25>{#f/17}* Kısa bir süreliğine arkadaşın olan biri.',
               '<25>{#f/13}* ...',
               '<32>{|}{#p/human}* (Asriel\'a onu gerçekten- {%}',
               "<25>{#p/asriel1}{#f/23}* Frisk, sorun değil.",
               "<25>{#f/22}* İyi biri olmak için herkesi kurtarmana gerek yok.",
               '<25>{#f/13}* Ayrıca... bu formumu koruyabilecek olsaydım bile...',
               "<25>{#f/15}* Geçmişte olanların üstesinden gelebilir miydim bilmiyorum.",
               "<25>{#f/17}* ... bana sadece kendine iyi bakacağına söz ver, olur mu?",
               '<25>{#f/13}* ...',
               '<25>{#f/15}* Öyleyse, görüşmek üzere.'
            ],
            [ '<25>{#p/asriel1}{#f/13}* Frisk...', "<25>{#f/15}* Yapacak daha iyi bir şeyin yok mu?" ],
            []
         ][Math.min(SAVE.data.n.lateasriel++, 8)],
      securefield: [ '<33>{#p/basic}* Burada bir güvenlik kalkanı var.\n* Aktif.' ],
      trivia: {
         w_security: [ "<32>{#p/basic}* Bu bir güvenlik kalkanı." ],
         photoframe: () =>
            SAVE.data.b.svr
               ? [
                    [
                       '<25>{#p/asriel1}{#f/13}* Boş bir fotoğraf çerçevesi...',
                       '<25>{#f/16}* Bir zamanlar, bu çerçevelerin içinde RESİMLER vardı.',
                       '<25>{#f/15}* Sonra, o onları çıkardı ve bir daha asla geri koymadı.',
                       "<25>{#f/16}* ... onlara bakmak çok acı verici olmuş olmalı."
                    ],
                    [
                       '<25>{#p/asriel1}{#f/13}* Boş fotoğraf çerçeveleri tıpkı kaybolmuş anılar gibi...',
                       '<25>{#p/asriel1}{#f/15}* Bu yerde onlardan çok fazla var.'
                    ],
                    [ '<25>{#p/asriel1}{#f/22}* Bu tuhaf yerde bunlardan çok var.' ]
                 ][Math.min(asrielinter.photoframe++, 1)]
               : SAVE.data.n.plot === 72 && !world.runaway
               ? [ '<32>{#p/basic}* Hala boş bir fotoğraf çerçevesi.' ]
               : [ '<32>{#p/basic}* Boş bir fotoğraf çerçevesi.' ],
         w_paintblaster: () =>
            SAVE.data.b.svr
               ? [ '<32>{#p/human}* (This device seems to be a few decades out of date.)' ]
               : world.darker
               ? [ '<32>{#p/basic}* A useless device of little importance to anyone.' ]
               : [ '<32>{#p/basic}* An old fuel injection device.' ],
         w_candy: () =>
            SAVE.data.b.svr
               ? [ '<32>{#p/human}* (The sign warns of unexpected appliance malfunctions.)' ]
               : [ '<32>{#p/basic}* \"Please note that appliances may be more malfunction-prone than they seem.\"' ],
         w_djtable: () =>
            SAVE.data.b.svr
               ? [ '<32>{#p/human}* (You touch the DJ set.)\n* (It makes an oddly satisfying scratching sound.)' ]
               : world.darker
               ? [ "<32>{#p/basic}* It's a DJ set." ]
               : SAVE.data.n.plot === 72
               ? [ '<32>{#p/basic}* A fancy DJ set, which is surprisingly not in use right now.' ]
               : [ '<32>{#p/basic}* A fancy DJ set, equipped with knobs and sliders galore.' ],
         w_froggit: () =>
            SAVE.data.n.plot === 72
               ? [
                    '<32>{#p/basic}* Vırak, vırak.\n* (Affedersin, insan.)',
                    '<32>* (Düşünceli ve bilinçli biri olarak büyümüşsün gibi görünüyorsun.)',
                    "<32>* (Benim tavsiyemin bir etkisi olsun ya da olmasın...)\n* (Oldukça gururluyum.)",
                    '<32>* Vırak.'
                 ]
               : [
                    '<32>{#p/basic}* Vırak, Vırak.\n* (Affedersin, insan...)',
                    '<32>* (Canavarlarla savaşmak konusunda sana birkaç tavsiyem var.)',
                    '<32>* (Eğer belirli bir {@fill=#ff0}EYLEM{@fill=#fff} sergiler ya da onları neredeyse yenene kadar {@fill=#3f00ff}SAVAŞ{@fill=#fff} edersen...)',
                    '<32>* (Seninle daha fazla savaşmak istemeyebilirler.)',
                    '<32>* (Eğer bir canavar seninle savaşmak istemiyorsa, lütfen...)',
                    '<32>* (Biraz {@fill=#ff0}İNSAF{@fill=#fff} göster, insan.)\n* Vırak.'
                 ],
         w_froggit_view: () =>
            SAVE.data.b.svr
               ? [ '<32>{#p/human}* (Kozmosun ötesine düşünceli bir şekilde bakıyorsun...)' ]
               : world.darker
               ? []
               : SAVE.data.n.plot === 72
               ? [
                    "<32>{#p/basic}* Dış uzaya bakmanın...",
                    '<32>* Düşüncelerini yönlendirmenin harika bir yolu olması ironik.'
                 ]
               : [
                    "<32>{#p/basic}* Dış uzayın bir görüntüsü.",
                    '<32>* Certainly no shortage of those around here, is there?'
                 ],
         w_kitchenwall: () =>
            SAVE.data.n.plot === 9
               ? [ '<26>{#p/toriel}{#f/1}* Sabret, çocuğum!' ]
               : [ '<26>{#p/toriel}{#f/1}* Bu biraz zaman alabilir...' ],
         w_lobby1: () =>
            SAVE.data.b.svr
               ? [ '<32>{#p/human}* (Tabela, sıkıntılı zamanlarda iradenin gücünden bahsediyor.)' ]
               : [ '<32>{#p/basic}* \"Tökezlediğinizde bile, ilerleme isteğiniz kendini gösterir.\"' ],
         w_pacing_view: () =>
            SAVE.data.b.svr
               ? [ '<32>{#p/human}* (Kozmosun ötesine mutlulukla bakıyorsun...)' ]
               : world.darker
               ? []
               : SAVE.data.n.plot === 72
               ? [
                    "<32>{#p/basic}* Bu kadar uzun bir yolculuktan sonra, cam seni korkutuyor gibi görünmüyor.",
                    '<32>* Zaten ilk başta korkuttuğu da yoktu.'
                 ]
               : [
                    '<32>{#p/basic}* Seninle sonsuz genişlik arasında sadece bir cam parçası olduğunu düşünmek...',
                    "<32>* Bütün sağduyuya rağmen, bu durum seni rahatsız etmiyor gibi görünüyor."
                 ],
         w_pacing1: () =>
            SAVE.data.n.plot === 72
               ? [
                    '<32>{#p/basic}* Vırak, vırak.\n* (Kısa bir süre önce buradan birisi geçti.)',
                    '<32>* (Bana onun nereye gittiğini söylemememi söyledi.)',
                    "<32>* (Zaten söylemeyecektim, ama yine de, o çok üzgün görünüyordu...)",
                    "<32>* (Muhtemelen şu anda girişin hemen ilerisindeki bölgededir.)",
                    '<32>* (Git. Onunla konuş. Bundan iyi bir şey çıkacak.)\n* Vırak.',
                    '<32>{#p/basic}* ... Asriel...'
                 ]
               : [
                    '<32>{#p/basic}* Vırak, Vırak.\n* (İç çeker...)',
                    '<32>* (\"Arkadaşım\" bana karşı nazik olmayı pek sevmiyor.)',
                    '<32>* (Eğer seçenek verilirse, bana zarar vermeyi seçiyor.)',
                    "<32>* (Bu doğru.......)\n* (Bana zarar vermeyi............)\n* (................)",
                    "<32>* (En azından sen bana karşı naziksin.)\n* Vırak."
                 ],
         w_pacing2: () =>
            SAVE.data.n.plot === 72
               ? SAVE.data.b.oops
                  ? [
                       '<32>{#p/basic}* Vırak, vırak.\n* (Merhaba, insan...)',
                       '<32>* (Arkadaşımdan haber aldın mı?)',
                       '<32>* (Birkaç gün önce burada duruyordu, tam solumda...)',
                       '<32>* (Ama senin gelişinden bir süre sonra, ortadan kayboldu.)',
                       "<32>* (Eğer birine zarar verirsen buradan gideceğini söylemişti...)",
                       SAVE.data.n.exp <= 0
                          ? "<32>* (Bu kafa karıştırıcı, ne de olsa bunu kesinlikle yapmadın.)\n* Vırak."
                          : '<32>* (Belki bir dahaki sefere biraz daha nazik olmayı deneyebilirsin?)\n* Vırak.'
                    ]
                  : [
                       '<32>{#p/basic}* Vırak, vırak.\n* (Merhaba, insan...)',
                       "<32>* (Arkadaşım şu an hayatında hiç olmadığı kadar mutlu.)",
                       "<32>* (Eğer birine zarar verirsen buradan gideceğini söylemişti, ama yapmadın.)",
                       "<32>* (Hatta, sonsuza kadar solumda kalmaya karar verdi.)",
                       '<32>* (Ve ona hep zarar vermeye çalışmış \"arkadaşı\" hakkında...)',
                       '<32>* (Ah, o galiba kendini bir keçiye dönüştürdü.)\n* Vırak.'
                    ]
               : [
                    '<32>{#p/basic}* Vırak, vırak.\n* (Merhaba, insan...)',
                    '<32>* (Hiç EŞYAlarını kontrol etmeyi denedin mi?)',
                    "<32>* (Eğer yanına bir şey aldıysan, onu bulacağın yer orası.)",
                    '<32>* (Benim EŞYAlarımda ne olduğunu mu soruyorsun?)',
                    "<32>* (Ah, ahmaksın... canavarların EŞYAları yoktur!)\n* Vırak."
                 ],
         w_pacing3: () =>
            SAVE.data.n.plot === 72
               ? SAVE.data.n.bully < 1
                  ? [
                       '<32>{#p/basic}* Vırak, vırak.\n* (Biz canavarlara karşı her zaman merhamet gösterdiğin için teşekkür ederiz.)',
                       '<32>* (Sana başkalarını güvenli de olsa nasıl döveceğine dair tavsiyede bulunduğumu biliyorum...)',
                       "<32>* (Ama bu senin bunu yapmanı istediğim anlamına gelmiyordu.)",
                       '<32>* (Gerçekten çok nazik bir insansın.)\n* Vırak.'
                    ]
                  : SAVE.data.n.bully < 15
                  ? [
                       '<32>{#p/basic}* Vırak, vırak.\n* (Şiddeti minimumda tuttuğun için teşekkür ederim.)',
                       '<32>* (Sana başkalarını güvenli de olsa nasıl döveceğine dair tavsiyede bulunduğumu biliyorum...)',
                       "<32>* (Ama bu senin bunu yapmanı istediğim anlamına gelmiyordu.)",
                       "<32>* (En azından bir insana göre, o kadar da korkunç değilsin.)\n* Vırak."
                    ]
                  : [
                       '<32>{#p/basic}* Vırak, vırak.\n* (Demek kendinin çok büyük bir tehdit olduğunu kanıtladın.)',
                       "<32>* (Buna rağmen, nedense, hala senden korkmuyorum...)",
                       '<32>* (Belki de işin sonunda, saldırabilecekken merhamet gösterdin.)',
                       '<32>* (Gösterdiğin ölçülülüğü takdir ediyorum.)\n* Vırak.'
                    ]
               : [
                    "<32>{#p/basic}* Vırak, vırak.\n* (Bir canavarı neredeyse öldürene kadar döversen...)",
                    '<32>* (İsmi maviye dönecek.)',
                    '<32>* (Tuhaf, değil mi?)\n* (Ama insanların da dövüldüklerinde maviye döndüklerini duydum.)',
                    '<32>* (Öyleyse, bunu anlayabildiğini sanıyorum.)',
                    '<32>* (Pekala, kafamın içindekileri dinlediğin için teşekkür ederim.)\n* Vırak.'
                 ],
         w_puzzle1_view: () =>
            SAVE.data.b.svr
               ? [ '<32>{#p/human}* (Kozmosun ötesine dalarak bakıyorsun...)' ]
               : world.darker
               ? []
               : SAVE.data.n.plot === 72
               ? [ '<32>{#p/basic}* İşin sonunda, bu odalar hala sadece manzara alanları gibi hissettiriyor.' ]
               : [
                    '<32>{#p/basic}* Neden bu odaların bazıları yalnızca...',
                    '<32>* ... manzara olsun diye yapılmış gibi hissettiriyor?'
                 ],
         w_puzzle2: () =>
            SAVE.data.b.svr
               ? world.nootflags.has('w_puzzle2') // NO-TRANSLATE

                  ? [
                       '<32>{#p/human}* (Tabelada bulmaca çözmenin uzay keşfinin gereksiz bir parçası olduğu anlatılıyor.)',
                       ...[
                          [
                             '<25>{#p/asriel1}{#f/13}* Çoğu tabelanın aksine, bu gerçekten haklı.',
                             "<25>{#f/15}* Ve bunu sadece yazan kişi ben olduğum için söylemiyorum."
                          ],
                          [ "<25>{#p/asriel1}{#f/3}* ... bana bu bulmacaları gerçekten sevdiğini söyleme." ],
                          [ "<25>{#p/asriel1}{#f/10}* Frisk, sen bile bu KADAR tuhaf değilsin." ]
                       ][Math.min(asrielinter.w_puzzle2++, 2)]
                    ]
                  : [ '<32>{#p/human}* (Tabela uzayda sabrın değerini anlatıyor.)' ]
               : world.nootflags.has('w_puzzle2') // NO-TRANSLATE

               ? [
                    '<32>{#p/basic}* \"Son sınır derin ve karanlık bir denizdir.\"',
                    '<32>* \"Sularında yol almak ASLA kötü tasarlanmış bulmacaları çözmeyi gerektirmemelidir!\"'
                 ]
               : [
                    '<32>{#p/basic}* \"Son sınır derin ve karanlık bir denizdir.\"',
                    '<32>{#p/basic}* \"{@fill=#ff993d}Büyük bilinmezliğe{@fill=#fff} dalmadan önce, onun {@fill=#00a2e8}akıntılarının hizalanmasını{@fill=#fff} beklemelisiniz.\"'
                 ],
         w_puzzle3_view: () =>
            SAVE.data.b.svr
               ? [ '<32>{#p/human}* (Düşünceli bir şekilde ötedeki kozmosa bakıyorsun...)' ]
               : world.darker
               ? []
               : SAVE.data.n.plot === 72
               ? [ '<32>{#p/basic}* Bu gerçekten de... güzel bir manzaraydı.' ]
               : [ '<32>{#p/basic}* Bu gerçekten de güzel bir manzara.' ],
         w_puzzle4: () =>
            SAVE.data.b.svr
               ? [ '<32>{#p/human}* (Tabelanın, artık faaliyette olmayan bir biftek satışı reklamı olduğu görülüyor.)' ]
               : [
                    '<32>{#p/basic}* \"Be sure to catch a slice of Glyde\'s Signature Steak (TM) in the activities room!\"'
                 ],
         w_ta_box: () =>
            SAVE.data.b.svr
               ? [
                    [
                       '<25>{#p/asriel1}{#f/20}* Evet... Toriel hiç bunları tek parça halinde tutan biri olmamıştır.',
                       '<25>{#f/21}* Bu model yıldız gemilerimin kopyaları bile parçalanmış,..'
                    ],
                    [
                       "<25>{#f/13}* Bu şaşırtıcı.\n* O genellikle oldukça organize biridir.",
                       '<25>{#p/asriel1}{#f/17}* ... kötü bir gün geçirmiş olmalı.'
                    ],
                    [ '<25>{#p/asriel1}{#f/13}* Olur böyle şeyler...' ]
                 ][Math.min(asrielinter.w_ta_box++, 2)]
               : world.darker
               ? [ "<32>{#p/basic}* Bu bir oyuncak kutusu.\n* Model yıldız gemileri parçalanmış." ]
               : SAVE.data.n.plot === 72
               ? [
                    '<32>{#p/basic}* Bu kutunun içindeki küçük gemiler hiç tamir edilmedi.',
                    "<32>* Eğer bu Asgore'un evinde olsaydı, kusursuz durumda olurlardı."
                 ]
               : [
                    '<32>{#p/basic}* Bir kutu model yıldız gemisi!\n* Ve... kırık cam?',
                    '<32>* Görünüşe göre birileri küçük gemilerini kırmış.'
                 ],
         w_ta_cabinet: () =>
            SAVE.data.b.svr
               ? [ "<32>{#p/human}* (Burada, birbirinin aynısı birkaç kıyafetten başka bir şey bulamıyorsun.)" ]
               : [
                    '<32>{#p/basic}* Mavi ve sarı çizgili gömleklerle dolu bir dolap.',
                    ...(SAVE.data.n.plot === 72 ? [ "<32>* Sanki bu hiç değişecekmiş gibi." ] : [])
                 ],
         w_ta_frame: () =>
            SAVE.data.b.svr
               ? [ [ "<25>{#p/asriel1}{#f/21}* ... burada yok..." ], [ '<25>{#p/asriel1}{#f/21}* ...' ] ][
                    Math.min(asrielinter.w_ta_frame++, 1)
                 ]
               : SAVE.data.n.plot === 72
               ? [ '<32>{#p/basic}* Boş bir fotoğraf çerçevesi.', "<32>* Hala söylenecek pek başka bir şey yok." ]
               : [ '<32>{#p/basic}* Boş bir fotoğraf çerçevesi.', "<32>* Söylenecek başka pek bir şey yok." ],
         w_ta_paper: () =>
            SAVE.data.b.svr
               ? [
                    "<32>{#p/human}* (Çizim önemli bir şeymiş gibi görünmüyor.)",
                    ...[
                       [
                          "<25>{#p/asriel1}{#f/13}* Şimdiye kadar çoktan gitti, ama burada yaptığım asıl çizim...",
                          '<25>{#f/17}* ... esasen \"hiper ölüm tanrısı\" formumun taslağıydı.',
                          '<25>{#f/17}* Super skybreaker, titanium striker...',
                          '<25>{#f/20}* And, of course, the legendary \"hyper goner.\"'
                       ],
                       [
                          '<25>{#p/asriel1}{#f/17}* Yeah... I guess I had it all planned out.',
                          '<25>{#f/20}* I came up with lots of crazy stuff, all the time...',
                          '<25>{#f/1}* Ooh, you would have ADORED my pan-galactic starship concept.'
                       ],
                       [
                          '<25>{#p/asriel1}{#f/17}* Frisk, umarım...',
                          '<25>{#f/23}* Umarım birlikte böyle bir an yaşayabiliriz.',
                          '<25>{#f/22}* $(name) ile birlikte hep...',
                          '<25>{#f/15}* ... zordu.'
                       ],
                       [ "<25>{#p/asriel1}{#f/20}* Endişelenme.\n* Eğer çizemiyorsan, ben sana öğretirim." ]
                    ][Math.min(asrielinter.w_ta_paper++, 3)]
                 ]
               : world.darker
               ? [ '<32>{#p/basic}* Unutulabilir bir çizim.\n* Orijinaline hiç benzemiyor.' ]
               : [
                    "<32>{#p/basic}* Bir çocuğun resmi, gökkuşağı kanatlı dev bir canavarı tasvir ediyor.",
                    "<32>* Tıpkı evdeki gibi..."
                 ],
         w_tf_couch: () =>
            SAVE.data.b.svr
               ? [ '<32>{#p/human}* (Kanepe hiç kullanılmamış gibi görünüyor.)' ]
               : SAVE.data.n.plot === 72
               ? [ "<32>{#p/basic}* Ne kadar zaman geçerse geçsin, buraya kimse oturmayacak gibi görünüyor." ]
               : world.darker
               ? [ "<32>{#p/basic}* Bu bir kanepe.\n* Başka ne bekliyordun?" ]
               : [
                    '<32>{#p/basic}* Rahat görünümlü bir kanepe.',
                    '<32>* O yumuşacık yastıklarına gömülme isteğine karşı koymak zor...'
                 ],
         w_tf_table: () =>
            SAVE.data.b.svr
               ? [ "<32>{#p/human}* (Sehpaya bir göz atıyorsun, ama sana geri bakıyor gibi görünmüyor.)" ]
               : [
                    '<32>{#p/basic}* Sıradan bir sehpa.',
                    "<32>{#p/basic}* Gerçekçi olmasa da, neredeyse mükemmel bir durumda."
                 ],
         w_tf_window: () =>
            SAVE.data.b.svr
               ? SAVE.data.b.c_state_secret1_used && SAVE.data.b.c_state_secret5_used
                  ? [ '<32>{#p/human}* (Kozmosun ötesine özlemle bakıyorsun...)' ]
                  : [ '<32>{#p/human}* (Kozmosun ötesine hasretle bakıyorsun...)' ]
               : world.darker
               ? [ "<32>{#p/basic}* Bu yalnızca bir başka pencere." ]
               : SAVE.data.n.plot === 72
               ? [ "<32>{#p/basic}* Her zamanki gibi, dış uzayın çok güzel bir manzarası." ]
               : [ "<32>{#p/basic}* Dış uzayın çok güzel bir manzarası." ],
         w_th_door: () =>
            SAVE.data.b.svr
               ? [
                    '<32>{#p/human}* (İşaret, içerideki odanın tamamlanmamış olduğunu açıklıyor.)',
                    ...[
                       [
                          "<25>{#p/asriel1}{#f/3}* Eğer bu ev bir kopya olmasaydı, orası babamın odası olurdu...",
                          '<25>{#f/4}* Neden hiç tamamlanmadığını tahmin edebilirsin.'
                       ],
                       [
                          '<25>{#p/asriel1}{#f/13}* ...',
                          '<25>{#f/15}* O konuşma annemi... iyi olmayan bir şekilde etkiledi.',
                          '<25>{#f/4}* Bir yıldız olarak, bazen ben... onu gözetliyordum.',
                          "<25>{#f/3}* Ve konuşma şekline bakılırsa, sanki o anı hiç terk etmemiş gibiydi.",
                          '<25>{#f/13}* Sonra, sen geldin, ve her şey değişti...'
                       ],
                       [
                          '<25>{#p/asriel1}{#f/13}* ...',
                          "<25>{#f/15}* Bu fazla garip.\n* Burada olmadığımızı varsayacağım."
                       ],
                       [ '<25>{#p/asriel1}{#f/13}* ...' ]
                    ][Math.min(asrielinter.w_th_door++, 3)]
                 ]
               : [ '<32>{#p/basic}* \"Oda tadilatta.\"' ],
         w_th_mirror: () =>
            SAVE.data.b.svr
               ? [ "<25>{#p/asriel1}{#f/24}* Bu biziz..." ]
               : world.genocide
               ? [ '<32>{#p/basic}* ...' ]
               : world.darker
               ? [ "<32>{#p/basic}* Bu sensin." ]
               : SAVE.data.b.w_state_catnap || SAVE.data.n.plot > 17
               ? [ "<32>{#p/basic}* Bu sensin...", '<32>{#p/basic}* ... ve hep öyle kalacaksın.' ]
               : [ "<32>{#p/basic}* Bu sensin!" ],
         w_th_plant: () =>
            SAVE.data.b.svr
               ? [ '<32>{#p/human}* (Bitkiye her gün verdiği sıcaklık için teşekkür ediyorsun.)' ]
               : SAVE.data.n.plot === 72
               ? [ "<32>{#p/basic}* Bu bitki senin hala hayatta olmana çok seviniyor." ]
               : world.darker
               ? [ '<32>{#p/basic}* Bu bitki seni gördüğüne pek sevinmedi.' ]
               : SAVE.data.b.oops
               ? [ '<32>{#p/basic}* Bu bitki seni gördüğü için sevindi.' ]
               : [ '<32>{#p/basic}* Bu bitki seni gördüğü için kendinden geçiyor!' ],
         w_th_sausage: () =>
            SAVE.data.b.svr
               ? [ '<32>{#p/human}* (You rustle the corny plant.)' ]
               : [ '<32>{#p/basic}* This plant looks quite corny.' ],
         w_th_table1: () => [
            '<32>{#p/human}* (Masanın altına bakıp bir boya seti buluyorsun.)',
            ...(SAVE.data.b.svr
               ? [
                    [
                       '<25>{#p/asriel1}{#f/24}* Sanırım $(name) mavi boya kalemini kaybetmiş olabilir.',
                       '<25>{#f/7}* ... aslında, hayır.\n* Onun mavi boya kalemini kaybettiğini BİLİYORUM.',
                       '<25>{#f/6}* Daha sonra bir yiyecek kutusunda bulundu, ama kimse bakmayı akıl edemedi.',
                       '<25>{#f/16}* Kutuyu kendisine aitmiş gibi göstermeye çalışıyordu herhalde.'
                    ],
                    [
                       "<26>{#p/asriel1}{#f/4}* Eğer yeni bir boya seti alırsak, ben göz kulak olacağım.",
                       '<25>{#f/3}* Bir boya kalemini kaybetmeyi düşündüğün an...',
                       "<26>{#f/8}* O suç trenini daha raylara varmadan durdurmak için orada olacağım.",
                       '<25>{#f/2}* Yalnızca bekle.'
                    ],
                    [ "<25>{#p/asriel1}{#f/31}* Gözlerim senin üzerinde, Frisk.", '<25>{#f/8}* Ve... belki kulaklarım da.' ],
                    [ '<25>{#p/asriel1}{#f/10}* Yine kulaklarıma mı bakıyorsun?\n* Bunu yapıp duruyorsun.' ]
                 ][Math.min(asrielinter.w_th_table1++, 3)]
               : world.edgy
               ? [ '<32>{#p/basic}* Setten iki boya kalemi eksik.' ]
               : world.darker
               ? [ '<32>{#p/basic}* Setten bir boya kalemi eksik.' ]
               : [
                    '<32>{#p/basic}* Yüz yıldır kayıp, ele geçirilemeyen o mavi boya...',
                    '<32>{#p/basic}* Gerçekten zamanımızın bir efsanesi.'
                 ])
         ],
         w_th_table2: () =>
            SAVE.data.b.svr
               ? [
                    '<32>{#p/human}* (Masanın altına bakıp bir deste kart buluyorsun.)',
                    ...[
                       [
                          '<25>{#p/asriel1}{#f/27}* $(name) ve ben bu tür şeylere hiç meraklı değildik.',
                          '<25>{#p/asriel1}{#f/15}* Yani, ben hiç diyorum, ama...',
                          "<25>{#p/asriel1}{#f/15}* Uh, hadi bunun hakkında konuşmayalım."
                       ],
                       [
                          '<25>{#p/asriel1}{#f/13}* ...',
                          '<25>{#p/asriel1}{#f/13}* En son meraklandığımızda, bir masa devrilmişti.',
                          '<25>{#p/asriel1}{#f/17}* Just sibling things.\n* You know how it goes with card games.'
                       ],
                       [ '<25>{#p/asriel1}{#f/17}* ...' ]
                    ][Math.min(asrielinter.w_th_table2++, 2)]
                 ]
               : world.darker
               ? [
                    '<32>{#p/human}* (Masanın altına bakıp bir deste kart buluyorsun.)',
                    "<33>{#p/basic}* It's just not worth your time."
                 ]
               : SAVE.data.n.plot === 72
               ? [
                    '<32>{#p/human}* (Masanın altına bakıp bir deste kart buluyorsun.)',
                    "<33>{#p/basic}* Soon enough, we'll never have to think about these again."
                 ]
               : [
                    '<32>{#p/human}* (Masanın altına bakıp bir deste kart buluyorsun.)',
                    "<33>{#p/basic}* They're holographic, of course."
                 ],
         w_tk_counter: () =>
            SAVE.data.b.svr
               ? [
                    '<32>{#p/human}* (You run your hand across the cutting board, noting the various grooves and ridges.)'
                 ]
               : world.darker
               ? [ "<32>{#p/basic}* It's a cutting board." ]
               : [ "<32>{#p/basic}* Toriel's cutting board.\n* It's not as up-to-scratch as it used to be." ],
         w_tk_sink: () =>
            SAVE.data.b.svr
               ? [
                    [
                       '<25>{#p/asriel1}{#f/21}* $(name) always said leaving fur in the drain was super gross.',
                       '<25>{#f/15}* I always thought it was normal, though...'
                    ],
                    [
                       '<25>{#p/asriel1}{#f/13}* Do humans not shed fur?\n* $(name) would never tell me things like this.'
                    ],
                    [ "<25>{#p/asriel1}{#f/17}* I do have reason to believe humans shed.\n* Even if it's not fur." ]
                 ][Math.min(asrielinter.w_tk_sink++, 2)]
               : SAVE.data.n.plot === 72
               ? [ '<32>{#p/basic}* Remnants of the white fur once stuck here still remain to this very day.' ]
               : [ '<32>{#p/basic}* There are clumps of white fur stuck in the drain.' ],
         w_tk_stove: () =>
            SAVE.data.b.svr
               ? [
                    [
                       '<25>{#p/asriel1}{#f/13}* I have to wonder why she thought buying this would be a good idea.',
                       "<25>{#f/10}* Unless she wanted to re-create Asgore's kitchen...?",
                       "<25>{#f/17}* For someone who didn't like him, she had a weird way to show it."
                    ],
                    [
                       '<25>{#p/asriel1}{#f/15}* I really wish Toriel and Asgore stayed together sometimes.',
                       "<25>{#f/16}* ... but I guess it's for the best that they didn't."
                    ],
                    [ "<25>{#p/asriel1}{#f/13}* It just wasn't meant to be, Frisk..." ]
                 ][Math.min(asrielinter.w_tk_stove++, 2)]
               : SAVE.data.n.state_wastelands_toriel === 2
               ? [ "<32>{#p/basic}* It's just a stovetop.\n* No one is going to use it." ]
               : world.darker
               ? [ "<32>{#p/basic}* It's just a stovetop." ]
               : SAVE.data.n.plot === 72
               ? [ '<32>{#p/basic}* The stovetop is very clean.\n* Toriel may not need a new one on the new world.' ]
               : [ '<32>{#p/basic}* The stovetop is very clean.\n* Toriel must use fire magic instead.' ],
         w_tk_trash: () =>
            SAVE.data.b.svr
               ? [ "<32>{#p/human}* (You can't make out what's in the trash...)" ]
               : SAVE.data.n.plot === 72
               ? [ '<32>{#p/basic}* Rather symbolically, the trash can has been emptied.' ]
               : [ '<32>{#p/basic}* There is a crumpled up recipe for Starling Tea.' ],
         
         w_tl_azzychair: () =>
            SAVE.data.b.svr
               ? [ '<32>{#p/human}* (You note the fairly large size of the dining chair.)' ]
               : SAVE.data.n.state_wastelands_toriel === 2 || world.runaway
               ? [ '<32>{#p/basic}* A larger dining chair.' ]
               : [ "<32>{#p/basic}* One of Toriel's dining chairs.\n* Fit for a queen." ],
         w_tl_bookshelf: pager.create(
            1,
            () =>
               SAVE.data.b.svr
                  ? [
                       '<32>{#p/human}* (The books on this bookshelf consist of snail facts, family recipes, and gardening tips.)'
                    ]
                  : [
                       "<32>{#p/basic}* It's a bookshelf.",
                       '<32>{#p/human}* (You pick out a book...)',
                       '<32>{#p/basic}* \"Did you know that snails have a chainsaw-like tongue called a radula?\"',
                       '<32>* \"Not many folks know about that one.\"',
                       '<32>* \"Another neat thing about \'em is how their digestive systems flip as they mature.\"',
                       '<32>* \"Oh, and did I mention...\"',
                       '<32>* \"Snails Talk. {^10}Really. {^10}Slowly.\"',
                       '<32>* \"Just kiddin\', snails don\'t talk.\"',
                       '<32>* \"I mean, could you imagine a world with talking snails?\"\n* \"I know I couldn\'t.\"',
                       '<32>{#p/human}* (You put the book back on the shelf.)'
                    ],
            () =>
               SAVE.data.b.svr
                  ? [
                       '<32>{#p/human}* (The books on this bookshelf consist of snail facts, family recipes, and gardening tips.)'
                    ]
                  : [
                       "<32>{#p/basic}* It's a bookshelf.",
                       '<32>{#p/human}* (You pick out a book...)',
                       '<32>{#p/basic}* \"Dreemurr Family Recipes: Snail Pie\"',
                       '<32>* \"Snail Pie is a coveted tradition among members of the Dreemurr family line.\"',
                       '<32>* \"Making it is a simple process, and can be broken down into five steps.\"',
                       '<32>* \"First, prepare the bottom crust by laying it on top of a pie plate.\"',
                       '<32>* \"Next, whisk evaporated milk, eggs, and spices together in a bowl until smooth.\"',
                       '<32>* \"Then, take several well-aged snails, and thoroughly incorporate into the mixture.\"',
                       '<32>* \"After that, pour the contents of the bowl into the bottom crust.\"',
                       '<32>* \"Last, prepare the top crust by cutting sheet into strips and forming a lattice.\"',
                       '<32>* \"Then just bake the pie!\"',
                       '<32>* \"Once the pie is ready, take it out of the oven, let it cool, and serve!\"',
                       '<32>{#p/human}* (You put the book back on the shelf.)'
                    ],
            () =>
               SAVE.data.b.svr
                  ? [
                       '<32>{#p/human}* (The books on this bookshelf consist of snail facts, family recipes, and gardening tips.)'
                    ]
                  : [
                       "<32>{#p/basic}* It's a bookshelf.",
                       '<32>{#p/human}* (You pick out a book...)',
                       '<32>{#p/basic}* \"Howdy, fellow gardeners.\"',
                       '<32>* \"When it comes to Starling flowers, the line between growth and stagnation...\"',
                       '<32>* \"Is access to open space.\"',
                       '<32>* \"That is why they are commonly grown in Aerialis...\"',
                       '<32>* \"It is the most open area of the outpost.\"',
                       '<32>{#p/human}* (You put the book back on the shelf.)'
                    ]
         ),
         
         w_tl_goreychair: () =>
            SAVE.data.b.svr
               ? [ '<32>{#p/human}* (You note the small size of the dining chair.)' ]
               : SAVE.data.n.state_wastelands_toriel === 2 || world.runaway
               ? [ '<32>{#p/basic}* A smaller dining chair.' ]
               : world.genocide
               ? [ "<32>{#p/basic}* One of Toriel's dining chairs.\n* Fit for a demon." ]
               : world.darker
               ? [ "<32>{#p/basic}* One of Toriel's dining chairs.\n* Fit for a prince." ]
               : SAVE.data.b.oops
               ? [ "<32>{#p/basic}* One of Toriel's dining chairs.\n* Fit for a child.\n* Like you!" ]
               : [ "<32>{#p/basic}* One of Toriel's dining chairs.\n* Fit for... a little angel.\n* Like you!" ],
         w_tl_table: () =>
            SAVE.data.b.svr
               ? [ '<32>{#p/human}* (The plant appears to be decorative in nature.)' ]
               : world.darker
               ? [ '<32>{#p/basic}* A decorative plant.\n* Nothing more.' ]
               : [ "<32>{#p/basic}* A decorative plant on Toriel's dining table." ],
         w_tl_tools: () =>
            SAVE.data.b.svr
               ? [
                    [
                       '<25>{#p/asriel1}{#f/20}* $(name) used to pretend these things were musical instruments.',
                       '<25>{#f/17}* They\'d pull them out, start \"playing\" them...',
                       '<25>{#f/20}* Once, I joined in, and we did a little fire- poker-instrument duet.',
                       '<26>{#f/13}* We started using our voices to emulate the instruments, and then...',
                       '<25>{#f/17}* Mom and Dad walked in to add backing vocals!'
                    ],
                    [
                       '<25>{#p/asriel1}{#f/13}* Then, as it turns out, someone had been listening in outside.',
                       '<25>{#f/15}* Before we knew it, we had monsters coming to the house in droves...',
                       '<25>{#f/17}* $(name) and I were still in the middle of the room, doing our thing.',
                       '<25>{#f/20}* But now we had an entire orchestra behind us!',
                       '<25>{#f/17}* We must have performed half of the Harmonexus Index that day.',
                       "<25>{#f/17}* ... it's an old book full of songs from our culture."
                    ],
                    [
                       '<25>{#p/asriel1}{#f/13}* All that because we played pretend with some fire pokers...',
                       '<25>{#f/17}* They say you can make an instrument out of anything.',
                       '<25>{#f/13}* ...',
                       "<25>{#f/15}* Wait...\n* I'M an anything..." 
                    ],
                    [ "<25>{#p/asriel1}{#f/20}* Please don't make a musical instrument out of me." ]
                 ][Math.min(asrielinter.w_tl_tools++, 3)]
               : world.darker
               ? [ '<32>{#p/basic}* Fire pokers.' ]
               : SAVE.data.n.plot === 72
               ? [
                    "<32>{#p/basic}* They're just fire pokers...\n* Or are they?",
                    "<32>* Toriel'in ateşinin sadece hoş bir ılıklık olduğunu, hiç de sıcak olmadığını düşün.",
                    '<32>* Why would she need these?',
                    '<32>* Thus, by the process of elimination, these must be advanced musical instruments.'
                 ]
               : [
                    '<32>{#p/basic}* A rack of advanced musical instruments.',
                    '<32>* Upon closer inspection, you realize these are in fact fire pokers.',
                    "<32>* It's hard to tell, given that these tools were likely made...",
                    '<32>* Before the outpost itself even existed.'
                 ],
         
         w_tl_torichair: () =>
            SAVE.data.b.svr
               ? [ '<32>{#p/human}* (You note the exceptional size of the dining chair.)' ]
               : SAVE.data.n.state_wastelands_toriel === 2 || world.runaway
               ? [ '<32>{#p/basic}* A king-sized dining chair.' ]
               : [ "<32>{#p/basic}* One of Toriel's dining chairs.\n* Fit for a king." ],
         w_toriel_toriel: () => [
            "<32>{#p/basic}* It's locked.",
            toriSV()
               ? SAVE.data.n.plot < 17.001
                  ? '<32>{#p/basic}* It sounds like Toriel is crying...'
                  : '<32>{#p/basic}* It sounds like Toriel is asleep...'
               : '<32>{#p/basic}* It sounds like Toriel is writing...'
         ],
         w_tt_bed: () =>
            SAVE.data.b.svr
               ? [ '<32>{#p/human}* (The bed seems a lot smaller than it might have used to.)' ]
               : SAVE.data.n.state_wastelands_toriel === 2 || world.runaway
               ? [ "<32>{#p/basic}* It's a bed." ]
               : SAVE.data.n.plot < 72 || world.runaway
               ? [
                    "<32>{#p/basic}* It's Toriel's bed.",
                    ...(world.darker ? [] : [ '<32>* Certainly too big for the likes of you.' ])
                 ]
               : [
                    "<32>{#p/basic}* It's Toriel's bed.",
                    "<32>* You've still got some time to go, but you'll grow into it."
                 ],
         w_tt_bookshelf: pager.create(
            1,
            () =>
               SAVE.data.b.svr
                  ? [
                       '<32>{#p/human}* (The books on this bookshelf consist of history, biology, and a foreboding possibility.)'
                    ]
                  : [
                       SAVE.data.n.state_wastelands_toriel === 2 || world.runaway
                          ? "<32>{#p/basic}* It's a bookshelf."
                          : "<32>{#p/basic}* It's Toriel's private bookshelf.",
                       '<32>{#p/human}* (You pick out a book...)',
                       '<32>{#p/basic}* \"Our homeworld gone... our people dead... but why?\"',
                       '<32>* \"Surely, the humans must\'ve had a reason for their attacks.\"',
                       '<32>* \"Did our kind truly pose a threat to them?\"',
                       '<32>* \"Was the threat of our potential truly that dire?\"',
                       '<32>* \"Whatever the case may be, we were cornered, and there was nowhere else to go.\"',
                       '<32>* \"Capitulation was our only real means of survival.\"',
                       '<32>{#p/human}* (You put the book back on the shelf.)'
                    ],
            () =>
               SAVE.data.b.svr
                  ? [
                       '<32>{#p/human}* (The books on this bookshelf consist of history, biology, and a foreboding possibility.)'
                    ]
                  : [
                       SAVE.data.n.state_wastelands_toriel === 2 || world.runaway
                          ? "<32>{#p/basic}* It's a bookshelf."
                          : "<32>{#p/basic}* It's Toriel's private bookshelf.",
                       '<32>{#p/human}* (You pick out a book...)',
                       '<32>{#p/basic}* \"When a boss monster is born, a magical link forms between the parents and the child.\"',
                       '<32>* \"Through this, their SOUL is created, ageing the parents along with the child.\"',
                       '<32>* \"The SOUL of a fully-grown boss monster is the strongest known to monsterkind...\"',
                       '<32>* \"Able to persist after death, if only for the briefest of periods.\"',
                       '<32>{#p/human}* (You put the book back on the shelf.)'
                    ],
            () =>
               SAVE.data.b.svr
                  ? [
                       '<32>{#p/human}* (The books on this bookshelf consist of history, biology, and a foreboding possibility.)'
                    ]
                  : [
                       SAVE.data.n.state_wastelands_toriel === 2 || world.runaway
                          ? "<32>{#p/basic}* It's a bookshelf."
                          : "<32>{#p/basic}* It's Toriel's private bookshelf.",
                       '<32>{#p/human}* (You pick out a book...)',
                       '<32>{#p/basic}* \"We often worry about what would happen if a human attacked us.\"',
                       '<33>* \"But what if one of our own attacked instead...?\"',
                       '<32>* \"Would we as a society be able to handle such a betrayal?\"',
                       '<32>* \"But who would think to do such a thing?\"',
                       '<32>{#p/human}* (You put the book back on the shelf.)'
                    ]
         ),
         w_tt_cactus: () =>
            SAVE.data.b.svr
               ? [ '<32>{#p/human}* (This cactus seems to remind you of someone you once knew.)' ]
               : SAVE.data.n.plot < 72
               ? world.darker
                  ? [ '<32>{#p/basic}* Finally, a houseplant we can all relate to.' ]
                  : [ '<32>{#p/basic}* Ah, the cactus.\n* Truly the most tsundere of plants.' ]
               : [ "<32>{#p/basic}* It's not like this cactus was waiting for you to come back or anything..." ],
         w_tt_chair: () =>
            SAVE.data.b.svr
               ? [ '<32>{#p/human}* (This chair appears to be a little small for the person who owns it.)' ]
               : world.darker
               ? [ "<32>{#p/basic}* It's a reading chair." ]
               : SAVE.data.n.plot === 72
               ? [
                    "<32>{#p/basic}* Toriel's dedicated reading chair...",
                    "<32>* ... at least until Asgore decides he'd like it instead.",
                    "<32>* He's always wanted this chair.\n* I'd be surprised if he didn't take it with him."
                 ]
               : [ "<32>{#p/basic}* Toriel's dedicated reading chair.", '<32>* Smells like lazy bones.' ],
         w_tt_diary: pager.create(
            0,
            ...[
               [
                  '<32>{#p/human}* (İşaretlenmiş paragrafa bakıyorsun.)',
                  '<32>{#p/toriel}{#f/21}* \"Soru: İskelet neden bir arkadaş istemiş?\"',
                  '<32>* \"Cevap: Çünkü yalnız KAVALMIŞ...\"',
                  '<32>{#p/basic}* Espriler bundan sonra aynı ölçüde devam ediyor.'
               ],
               [
                  '<32>{#p/human}* (Başka bir paragrafa bakıyorsun.)',
                  '<32>{#p/toriel}{#f/21}* \"Soru: Bir iskelet hamama gittiğinde nasıl yıkanır?\"',
                  '<32>* \"Cevap: KAFAtasıyla...\"',
                  "<32>{#p/basic}* Bunları okumaya devam etmenin bir anlamı yok."
               ],
               [
                  '<32>{#p/human}* (Başka bir paragrafa bakıyorsun.)',
                  '<32>{#p/toriel}{#f/21}* \"Soru: İskelet köpeğe nasıl veda etmiş?\"',
                  '<32>* \"Cevap: HoşÇAKAL...\"',
                  "<32>{#p/basic}* Bunun komik olmakla uzaktan yakından alakası yoktu."
               ],
               [
                  '<32>{#p/human}* (Başka bir paragrafa bakıyorsun.)',
                  "<32>{#p/basic}* Bu kuru esprilerle yetinemiyorsun.",
                  '<32>{#p/toriel}{#f/21}* \"Soru: İskelet neden berber olamamış?\"',
                  '<32>* \"Cevap: Çünkü TARAK kemiği kırıkmış...\"',
                  '<32>{#p/basic}* Bu şakalar gittikçe eskiyor...'
               ],
               [
                  '<32>{#p/human}* (Başka bir paragrafa bakıyorsun.)',
                  "<32>{#p/basic}* Bu kuru esprilerle hala yetinemiyorsun.",
                  '<32>{#p/toriel}{#f/21}* \"Soru: İskelet birini tehdit etmek için ne demiş?\"',
                  '<32>* \"Cevap: Bıçak KEMİĞE dayandı...\"',
                  "<32>{#p/basic}* Gerçekten mi?\n* Bu bir espri bile değildi!"
               ],
               [
                  '<32>{#p/human}* (Başka bir paragrafa bakıyorsun.)',
                  "<32>{#p/basic}* Burada beyin hücrelerimizi kaybediyoruz...",
                  "<32>{#p/toriel}{#f/21}* \"İskeletin uykusu gelmiş.\"",
                  '<32>* \"Ancak iskelet ona kapıyı açmamış.\"',
                  '<32>{#p/basic}* ...\n* Söyleyecek sözüm yok.'
               ],
               [
                  '<32>{#p/human}* (Son paragrafa bakıyorsun.)',
                  "<32>{#p/basic}* Ha?\n* Buradaki bir şaka değil...",
                  '<32>{#p/toriel}{#f/21}* \"Bugün Outlands\'e bir insan geldi.\"',
                  '<32>* \"Sans\'ın ona göz kulak olacağına güveniyorum ama...\"',
                  '<32>* \"Onu buna zorlamayı tercih etmem.\"',
                  '<32>* \"Ayrıca, tek bir kraliyet nöbetçisi onu gerçekten de karakolun kalanından koruyabilir mi?\"',
                  '<32>* \"Umarım bu tür soruların yakında bir anlamı kalmayacaktır.\"',
                  '<32>{#p/basic}* ...'
               ],
               [ '<32>{#p/human}* (Burada daha fazla yazılı metin yok.)' ]
            ].map(
               lines => () =>
                  SAVE.data.b.svr
                     ? [ '<32>{#p/human}* (The diary seems to consist primarily of over-the-top skeleton puns.)' ]
                     : SAVE.data.n.plot === 72
                     ? [
                          '<32>{#p/human}* (You look to the newly-written page.)',
                          '<32>{#p/toriel}{#f/21}* \"It seems my preconceptions about Asgore were incorrect.\"',
                          '<32>* \"In failing to confront him, I have failed to understand what was truly going on.\"',
                          '<32>* \"I was right in thinking I did not deserve to be a mother.\"',
                          '<32>* \"But perhaps now... I can learn what being a mother truly means.\"',
                          '<32>* \"I will need to think about this on my own.\"'
                       ]
                     : world.darker
                     ? [ "<32>{#p/basic}* It's a diary.\n* You wouldn't find it funny." ]
                     : SAVE.data.n.plot < 14
                     ? lines
                     : [
                          '<32>{#p/human}* (You look to the most recently written paragraph.)',
                          ...(world.edgy
                             ? [ "<32>{#p/basic}* It's been scribbled out with a crayon." ]
                             : toriSV()
                             ? [
                                  '<32>{#p/toriel}{#f/21}* \"It has not been the best of days.\"',
                                  '<32>* \"Yet another human has fallen out of my care...\"',
                                  '<32>* \"The seventh and final human he\'d need to break the force field.\"',
                                  '<32>* \"I should not have allowed this to happen.\"',
                                  '<32>* \"With the stakes so high, a confrontation may be inevitable...\"'
                               ]
                             : [
                                  '<32>{#p/toriel}{#f/21}* \"It has been an interesting day, to say the least.\"',
                                  '<32>* \"A human arrived...\"',
                                  '<32>* \"Then, tried to leave...\"',
                                  '<32>* \"And then, the strangest thing happened.\"',
                                  '<32>* \"A reminder I have been in need of for some time...\"'
                               ])
                       ]
            )
         ),
         w_tt_plant: () =>
            SAVE.data.b.svr
               ? [ '<32>{#p/human}* (This houseplant strikes you as exceedingly normal.)' ]
               : [ "<32>{#p/basic}* It's a houseplant.", '<32>* What more is there to say?' ],
         w_tt_trash: pager.create(
            0,
            () =>
               SAVE.data.b.svr
                  ? [ "<32>{#p/human}* (You can't make out what's in the trash...)" ]
                  : world.darker
                  ? [ '<32>{#p/basic}* Snails.' ]
                  : SAVE.data.n.plot === 72
                  ? [ '<32>{#p/basic}* The snails are beginning to smell... ghostly.', '<32>* ... what could this mean?' ]
                  : [
                       "<32>{#p/basic}* It's Toriel's private trash can, containing...",
                       '<32>* Snails.',
                       '<32>* Oodles and oodles of snails.'
                    ],
            pager.create(
               1,
               () =>
                  SAVE.data.b.svr
                     ? [ "<32>{#p/human}* (You can't make out what's in the trash...)" ]
                     : world.darker
                     ? [ '<32>{#p/basic}* Snails.' ]
                     : SAVE.data.n.plot === 72
                     ? [ '<32>{#p/basic}* Maybe this is how snails live past their expiry date.' ]
                     : [ '<32>{#p/basic}* And nothing BUT snails.' ],
               () =>
                  SAVE.data.b.svr
                     ? [ "<32>{#p/human}* (You can't make out what's in the trash...)" ]
                     : world.darker
                     ? [ '<32>{#p/basic}* Snails.' ]
                     : SAVE.data.n.plot === 72
                     ? [ "<32>{#p/basic}* Or maybe I've just gone and lost it completely." ]
                     : [ '<32>{#p/basic}* ...\n* Did I mention the snails?' ],
               () =>
                  SAVE.data.b.svr
                     ? [ "<32>{#p/human}* (You can't make out what's in the trash...)" ]
                     : world.darker
                     ? [ '<32>{#p/basic}* Snails.' ]
                     : SAVE.data.n.plot === 72
                     ? [ '<32>{#p/basic}* Or maybe...', '<32>* ... wait, what was I saying?' ]
                     : [ '<32>{#p/basic}* Snails.' ],
               () =>
                  SAVE.data.b.svr
                     ? [ "<32>{#p/human}* (You can't make out what's in the trash...)" ]
                     : world.darker
                     ? [ '<32>{#p/basic}* Snails.' ]
                     : SAVE.data.n.plot === 72
                     ? [ "<32>{#p/basic}* Oh, right.\n* The meaning of the snails' newfound ghostly scent." ]
                     : [ '<32>{#p/basic}* Oodles and oodles of snails.' ]
            )
         ),
         w_tutorial_view: () =>
            SAVE.data.b.svr
               ? [ '<32>{#p/human}* (Kozmosun ötesine heyecanla bakıyorsun...)' ]
               : world.darker
               ? []
               : [ '<32>{#p/basic}* Outlands\'in bu bölümündeki birçok pencereden ilki.' ],
         w_tutorial1: () =>
            SAVE.data.b.svr
               ? [ '<32>{#p/human}* (The sign describes the qualities of a good relationship.)' ]
               : [
                    '<32>{#p/basic}* \"A good relationship requires trust and kindness to move forward.\"',
                    ...(world.goatbro && SAVE.flag.n.ga_asrielOutlands7++ < 1
                       ? [ '<26>{#p/asriel2}{#f/8}* How grossly sentimental.' ]
                       : [])
                 ]
      },
      piecheck: () =>
         SAVE.data.b.svr
            ? [
                 [
                    "<25>{#p/asriel1}{#f/17}* Mom's pies were always the best...",
                    '<25>{#f/13}* I can still remember what the first one I ever had tasted like.',
                    "<25>{#f/15}* I'd never felt so happy to take a bite of something...",
                    "<25>{#f/17}* ... it was like I'd transcended to the next level of confection."
                 ],
                 [
                    "<25>{#p/asriel1}{#f/20}* Er, maybe I'm overselling it just a little.",
                    "<25>{#f/17}* But I'm telling you right now, Frisk...",
                    '<25>{#f/13}* ... no matter what happens with Mom and Dad...',
                    '<25>{#f/17}* You NEED to have her make one of her pies for me.',
                    "<25>{#f/20}* I'm... kind of curious if I'll still like it after all of this."
                 ],
                 [ '<25>{#p/asriel1}{#f/15}* It sure has been a while, huh...' ]
              ][Math.min(asrielinter.piecheck++, 2)]
            : SAVE.data.n.plot < 8
            ? world.darker
               ? [ "<32>{#p/basic}* Sadece bir tezgah." ]
               : [ '<32>{#p/basic}* Tezgahın üstünde neredeyse görünmez olan halka şeklinde bir leke var.' ]
            : SAVE.data.n.state_wastelands_mash === 1 && SAVE.data.n.plot > 8
            ? [ '<32>{#p/basic}* Bir zamanlar ezilmiş bir turtanın hayaleti tezgaha musallat oluyor.' ]
            : SAVE.data.n.plot === 72
            ? SAVE.data.n.state_wastelands_mash > 0
               ? [ '<32>{#p/basic}* Ne kadar zaman geçerse geçsin bu vahşeti düzeltemeyecek.' ]
               : SAVE.data.n.state_wastelands_toriel === 2
               ? [ '<32>{#p/basic}* Gerçekten de burayla uğraşmaman gerektiğini hissediyorsun.' ]
               : world.runaway
               ? [
                    '<32>{#p/basic}* Bir zorba olmuş olabilirsin, ama turta dokunulmaz kalıyor.',
                    '<32>{#p/basic}* Belki de bazı şeyler fazla kutsaldır, senin için bile.'
                 ]
               : [
                    world.meanie
                       ? '<32>{#p/basic}* Turta senden rahatsız olmuş olabilir, fakat onca şeyden sonra...'
                       : '<32>{#p/basic}* Turtanın büyüklüğü seni rahatsız etmiyor olabilir, ama onca şeyden sonra...',
                    "<32>{#p/basic}* Turtaya onu yemeni engelleyecek derecede saygı duyuyorsun."
                 ]
            : SAVE.data.n.state_wastelands_mash > 0
            ? [ '<32>{#p/basic}* Açıkçası burada yapılacak bir şey kalmadı.' ]
            : SAVE.data.n.state_wastelands_toriel === 2
            ? [ '<32>{#p/basic}* Gerçekten de burayla uğraşmaman gerektiğini hissediyorsun.' ]
            : world.meanie
            ? [
                 '<32>{#p/basic}* Turtatın büyüklüğü seni gram rahatsız etmiyor.',
                 '<32>{#p/basic}* Hatta, o senden rahatsız olmuş olabilir...',
                 choicer.create('* (Turtayı ez?)', 'Evet', 'Hayır')
              ]
            : [ '<32>{#p/basic}* Turtanın büyüklüğü seni yiyemeyecek kadar rahatsız ediyor.' ],
      piesmash1: [ '<32>{#p/human}* (Turtayı ezmemeyi seçtin.)' ],
      piesmash2: [ '<32>{#p/human}* (Turtaya bir koydun...)' ],
      piesmash3: [ "<32>{#p/basic}* Tam anlamıyla haşatı çıktı." ],
      tutorial_puzzle1: [
         '<25>{#p/toriel}* Bir önceki bulmacanın aksine, bu biraz daha farklı.',
         '<25>{#f/1}* NADİR olsa da, karakoldaki bazı bulmacalar...'
      ],
      tutorial_puzzle2: [
         '<25>{#p/toriel}* ... bir başka canavarın yardımına ihtiyaç duyarlar.',
         '<25>{#f/1}* Sırada ne yapman gerektiğini anlıyor musun?'
      ],
      tutorial_puzzle2a: [ '<25>{#p/toriel}{#f/1}* Sırada ne yapman gerektiğini anlıyor musun?' ],
      tutorial_puzzle3: [ '<25>{#p/toriel}* Çok iyi, ufaklık!\n* Çok iyi.' ],
      tutorial_puzzle4: [ '<25>{#p/toriel}{#f/1}* Senin sıran...' ],
      tutorial_puzzle4a: [ '<25>{#p/toriel}{#f/0}* Sıra sende.' ],
      tutorial_puzzle5: [ '<25>{#p/toriel}* Aferin!\n* Yalnızca bir sıra kaldı.' ],
      tutorial_puzzle6: [ '<25>{#p/toriel}{#f/1}* Evet, evet!\n* Seninle gurur duyuyorum, çocuğum.' ],
      tutorial_puzzle7: [ '<25>{#p/toriel}* Sıradaki dersine başlamaya hazır olduğunda benimle gel.' ],
      tutorial_puzzle8a: [ '<25>{#p/toriel}* Cevap bende saklı değil, ufaklık.' ],
      tutorial_puzzle8b: [ '<25>{#p/toriel}* Daha önce yaptığın şeyi tekrarlamayı dene.' ],
      tutorial_puzzle8c: [ '<25>{#p/toriel}{#f/1}* Devam et...' ],
      twinkly1: [
         "<25>{#p/twinkly}{#f/5}* Selam!\n* Ben {@fill=#ff0}TWİNKLY{@fill=#fff}.\n* {@fill=#ff0}YILDIZ TWİNKLY{@fill=#fff}!"
      ],
      twinkly2: [
         '<25>{#f/5}* Seni bu karakola hangi rüzgar attı, değerli ziyaretçi?',
         '<25>{#f/5}* ...',
         "<25>{#f/8}* Kayboldun değil mi...",
         "<25>{#f/5}* O zaman, iyi ki senin için ben buradayım!",
         "<25>{#f/8}* Bir süredir zirve formumda değilim ama...",
         '<25>{#f/5}* ...birilerinin sana işin raconunu göstermesi gerek!',
         '<25>{#f/10}* Sanırım bunu biricik ben yapacağım.',
         "<25>{#f/5}* Başlayalım, ha?"
      ],
      twinkly3: [
         "<25>{#f/7}* Ama sen ZATEN bunları biliyordun, di mi?",
         '<25>{#f/8}* ...',
         "<25>{#f/5}* Yine de sana işlerin nasıl yürüdüğünü göstermek bana düşüyor.",
         "<25>* Başlayalım, ha?"
      ],
      twinkly4: [
         "<25>{#p/twinkly}{#f/6}* Tamam, bu kadarı yeter.",
         '<25>{#f/8}* Eğer daha sıfırlamaya devam edeceksen, her türlü...',
         '<25>{#f/6}* İstediğin gibi yap.',
         "<25>{#f/7}* Sadece beni kolayca atlatabileceğini sanma yeter."
      ],
      twinkly5: [ "<25>{#p/twinkly}{#f/6}* Yapacak daha iyi bir şeyin yok mu senin?" ],
      twinkly6: [
         "<25>{#p/twinkly}{#f/6}* İlk darbeni aldığın gibi sıfırladın demek ha?",
         '<25>{#f/7}* Ne kadar acınası.'
      ],
      twinkly6a: [
         "<25>{#p/twinkly}{#f/11}* Güya ben de senin yaptığın şeyi unutacaktım...",
         '<25>{#f/7}* Pis kaytarıkçı seni.'
      ],
      twinkly7: [ '<25>{#p/twinkly}{#f/7}* Bu oyunu bütün gün oynayabilirim, salak.' ],
      twinkly8: [ "<25>{#f/11}* Her neyse, zaten bundan sonra ne geleceğini biliyorsun...{%15}" ],
      twinkly9: [
         '<25>{#p/twinkly}{#f/6}* Selam.',
         "<25>* Eğer burada çok takılırsam alev topunu yiyeceğim gibi duruyor.",
         '<25>{#f/8}* Yazık oldu, cidden...',
         '<25>{#f/7}* Seninle ÖYLE bir eğlenecektim ki.',
         '<25>{#f/6}* ...',
         '<25>{#f/5}* Pekala, görüşürüz!'
      ],
      twinkly9a: [
         '<25>{#p/twinkly}{#f/12}{#v/0}* Sen ne yapıyorsun BE, $(name)?',
         '<25>{#f/12}{#v/0}* Bütün karakol bizim insafımıza kalmıştı!'
      ],
      twinkly9a1: [ '<25>{#f/6}{#v/0}* Tek yapmamız gereken plana uymaktı.' ],
      twinkly9a2: [
         '<25>{#f/6}{#v/0}* Tek yapmamız gereken Dökümhane\'yi geçip...',
         '<25>* Muhafızları temizleyip...',
         '<25>* Hisar\'a ulaşmaktı!'
      ],
      twinkly9a3: [
         '<25>{#f/6}{#v/0}* Tek yapmamız gereken muhafızları temizleyip...',
         '<25>* Hisar\'dan geçmekti!'
      ],
      twinkly9a4: [
         '<25>{#f/6}{#v/0}* Tek yapmamız gereken o aptal robotu ÖLDÜRMEKTİ...',
         '<25>* Hisar\'dan geçmekti!'
      ],
      twinkly9a5: [ '<25>{#f/6}{#v/0}* Tek yapmamız gereken Hisar\'dan geçmekti!' ],
      twinkly9a6: [ '<25>{#f/6}{#v/0}* Tek yapmamız gereken o budala çöp poşetini ÖLDÜRMEKTİ!' ],
      twinkly9a7: [ '<25>{#f/6}{#v/0}* Tek yapmamız gereken en sona yürümekti!', '<25>* Ramak kalmıştı!' ],
      twinkly9a8: [ '<25>{#f/8}{#v/0}* Korkak...' ],
      twinkly9b: [
         '<25>{#p/twinkly}{#f/5}* $(name)...?',
         "<25>{#f/6}* Az önce ne oldu bilmiyorum.",
         '<25>{#f/8}* Biz mekiğin içindeydik, derken...',
         '<25>{#f/8}* ...',
         '<25>{#f/6}* Benim...',
         '<25>{#f/8}* Benim gitmem gerek...'
      ],
      twinkly9c: [
         "<25>{#p/twinkly}{#f/7}* Demek en başa döndük, ha?",
         "<26>{#f/5}* Ben de seni bekliyordum.\n* Bakalım bu sefer nasıl yapacaksın.",
         "<25>{#f/11}* Kim bilir?\n* Belki artık senin için daha kolay olacaktır.",
         '<25>{#f/7}* Senin güçlerine sahipken benim için öyleydi.',
         '<25>{#f/6}* ...',
         '<25>{#f/5}* Pekala, bol şans!'
      ],
      twinkly10: [
         "<20>{#f/5}Şu kalbi görüyor musun? O senin RUHun, var oluşunun simgesi!",
         '<20>{#f/5}RUH\'un senin önemli bir parçan, ve kendisini devam ettirmesi için SEVGİ lazım.'
      ],
      twinkly11: [
         "<20>{*}{#x2}{#f/5}Buralarda, SEVGİ'nin paylaşımı... {#f/8}küçük beyaz {#f/11}'mutluluk parçalarıyla' olur.",
         "<20>{*}{#f/5}Doğru yoldan başlamanı sağlamak için, seninle biraz kendi SEVGİ'mi paylaşayım.",
         '<20>{*}{#f/5}Toplayabildiğin kadarını toplamaya çalış!{^20}{*}{#x1}{%}'
      ],
      twinkly12: [
         "<20>{*}{#f/8}Tüh, sanırım onları kaçırdın...",
         "<20>{*}{#f/5}Ama sorun yok!",
         '<20>{*}{#x2}{#f/10}Al, biraz daha vereyim.{^20}{*}{#x1}{%}'
      ],
      twinkly13: [
         '<20>{*}{#f/12}Ne oluyo-... ya sen gerizekalı mısın??',
         '<20>{*}{#x2}KOŞ. İÇİNE. ŞU. MERMİLERİN!!!{^20}{*}{#x1}{^999}'
      ],
      twinkly14: 'KOŞ. İÇİNE. ŞU. mutluluk parçalarının~',
      twinkly15: [
         '<20>{#v/1}Hee hee hee...',
         "<20>Bu dünyada, ya ÖLÜRSÜN ya da ÖLDÜRÜRSÜN.",
         '<20>Düşünsene, senin gibi bir RUH bir anda burnumun dibinde kaza yapıyor...',
         "<20>Böyle altın bir fırsatı es geçeceğimi mi sandın?"
      ],
      twinkly16: [
         "<20>{#f/7}Yok, burada neler olduğunu biliyorsun, di mi?",
         "<20>Sen sadece biricik Twinkly'e eziyet etmek istedin, di mi?",
         "<20>Tanrım... kiminle uğraştığını hiç bilmiyor olmalısın.",
         '<20>{#f/11}Hee hee hee...'
      ],
      twinkly17: [ "<20>{#v/1}Sadece çabucak sadede gelmemiz gerekecek, değil mi?", '<20>Hee hee hee...' ],
      twinkly18: [ '<20>{*}{#f/2}{#v/1}{@random=1.1/1.1}GEBER.{^20}{%}' ],
      twinkly19: [ '<20>{#p/toriel}Ne kadar da zalim bir yaratık, bu zavallı masum küçüğe işkence ediyor...' ],
      twinkly20: [
         '<20>Korkmana gerek yok, ufaklık.',
         '<20>Ben {@fill=#003cff}TORİEL{@fill=#000}, {@fill=#f00}OUTLANDS\'in{@fill=#000} gözetmeniyim.',
         '<20>Her gün burada kaza yapmış biri var mı diye kontrol ederim.',
         '<20>Beni takip et, çocuk.\nSana öğretmek istediğim çok fazla şey var.'
      ],
      twinkly21: [
         '<25>{#p/toriel}{#f/1}* Amanın!\n* Sen de nereden geldin, ufaklık?',
         '<25>{#f/1}* Yaralandın mı?',
         '<25>{#f/0}* ...\n* Sana çok fazla soru sorduğum için üzgünüm.',
         '<25>{#f/0}* Ben {@fill=#003cff}TORİEL{@fill=#fff}, {@fill=#f00}OUTLANDS\'in{@fill=#fff} gözetmeniyim.',
         '<26>{#f/0}* Her gün burada kaza yapmış biri var mı diye kontrol ederim.',
         '<25>{#f/0}* Beni takip et, çocuk.\n* Sana öğretmek istediğim çok fazla şey var.'
      ],
      twinkly22: [ '<25>{#f/0}* Bu taraftan.' ],
      w_coffin0: () => [
         '<32>{#p/human}* (Burayı haline bırakmanın en iyi şey olacağını hissediyorsun.)',
         ...(SAVE.data.b.svr ? [ '<25>{#p/asriel1}{#f/13}* ...' ] : [])
      ],
      w_coffin1: () => [
         '<32>{#p/basic}* Bu tabut çok eski.\n* Onunla ilgili kayda değer hiçbir şey yok.',
         ...(world.goatbro && SAVE.flag.n.ga_asrielCoffin++ < 1
            ? [
                 '<25>{#p/asriel2}{#f/13}* Ah, şuna bak.\n* Bunu tam da senlik yapmışlar, $(name).',
                 '<25>{#p/asriel2}{#f/5}* Ne dokunaklı ama.'
              ]
            : [])
      ],
      w_coffin2: pager.create(
         0,
         () => [
            '<32>{#p/basic}* Bu tabut Aralık 251X tarihine dayanıyor.',
            '<32>* Yanına saklanmış eski bir kayıt tutucu bildirge var...',
            choicer.create('* (Bildirgeye eriş?)', 'Evet', 'Hayır')
         ],
         () => [
            '<32>{#p/human}* (Bildirgeyi tekrar alıyorsun.)',
            choicer.create('* (Bildirgeye eriş?)', 'Evet', 'Hayır')
         ]
      ),
      w_coffin3: () => [ choicer.create('* (Sonraki sayfayı oku?)', 'Evet', 'Hayır') ],
      w_coffin4: [ '<32>{#p/human}* (Ama okunacak başka sayfa kalmamıştı.)' ],
      w_coffin5: [ '<32>{#p/human}* (Bildirgeyi ait olduğu yere yerleştirdin.)' ],
      w_dummy1: () =>
         SAVE.data.b.svr
            ? [ '<32>{#p/human}* (Ellerini mankenin üstüne koyuyorsun.)\n* (Çok yıpranmış gibi duruyor.)' ]
            : [ '<32>{#p/basic}* Bir eğitim mankeni, 251X civarlarında üretilmiş.\n* Standart HİSAR üretimi.' ],
      wonder1: [
         '<32>{#p/basic}* Şunu duyuyor musun?\n* Yıldızların sesini?',
         "<32>* Karakolun bazı yerlerinde, mesela burası... bu sesi duyabilirsin.",
         '<32>* Sadece dinlemen yeterli.',
         '<32>* Çok havalı, ha?'
      ]
   },

   b_group_outlands: {
      froggitWhimsun: [ '<32>{#p/story}* Uzay kurbağaları ve Yıldızsinekleri!\n* Ya da o tarz bir şey.' ],
      froggitWhimsun2a: [ '<32>{#p/story}* Uzay kurbağaları...?' ],
      froggitWhimsun2b: [ '<32>{#p/story}* Yıldızsinekleri...?' ],
      looxMigospWhimsun: [ "<32>{#p/story}* Bu üçlü çok güçlü!" ],
      looxMigospWhimsun2: [ '<32>{#p/story}* Üçlü oldu ikili.' ],
      looxMigospWhimsun3: [ '<32>{#p/story}* Biri kaldı.' ],
      moldsmalMigosp: [ '<32>{#p/story}* Silente ve arkadaşları kendilerini tanıtıyor!' ]
   },

   b_opponent_froggit: {
      act_check: [ '<32>{#p/story}* FROGGİT - SAL 4 SAV 5\n* Hayat bu canavar için zor.' ],
      act_check2: [ '<32>{#p/story}* FROGGİT - SAL 4 SAV 5\n* Hayat bu canavar için iyiye gidiyor.' ],
      act_check3: [ "<32>{#p/story}* FROGGİT - SAL 4 SAV 5\n* Hayat bu canavarın yüzüne hiç gülmüyor gibi." ],
      act_check4: [ '<32>{#p/story}* FROGGİT - SAL 4 SAV 5\n* Hayat bu canavar için çok kafa karıştırıcı.' ],
      act_check5: [ '<32>{#p/story}* FROGGİT - SAL 4 SAV 5\n* Hayat bu canavar için sevgi dolu.' ],
      act_threat: [
         '<32>{#p/human}* (Froggit\'i tehdit ettin.)',
         "<32>{#p/basic}* Froggit ne dediğini anlamadı..."
      ],
      act_threat2: [
         '<32>{#p/human}* (Froggit\'i yine tehdit ettin.)',
         "<32>{#p/basic}* Froggit önceki tehdidini hatırladı ve kaçması gerektiğine karar verdi."
      ],
      act_compliment: [
         '<32>{#p/human}* (Froggit\'e iltifat ettin.)',
         "<32>{#p/basic}* Froggit ne dediğini anlamadı..."
      ],
      act_flirt: [
         '<32>{#p/human}* (Froggit\'le flört ettin.)',
         "<32>{#p/basic}* Froggit ne dediğini anlamadı..."
      ],
      act_translate0: [ "<32>{#p/human}* (Ama daha tercüme edecek bir şey söylemedin.)" ],
      act_translate1: [
         '<32>{#p/human}* (Söylediklerini tercüme ettin.)\n* (Froggit artık seni anlıyor.)',
         '<32>{#p/basic}* Froggit pohpohlandı.'
      ],
      act_translate1x: [
         '<32>{#p/human}* (Söylediklerini tercüme ettin.)\n* (Froggit artık seni anlıyor.)',
         '<32>{#p/basic}* Froggit bu savaşa devam etme konusunda tereddütlü.'
      ],
      act_translate1y: [
         '<32>{#p/human}* (Söylediklerini tercüme ettin.)\n* (Froggit artık seni anlıyor.)',
         '<32>* İçten içe tehdit edilmiş halde Froggit kaçıyor!'
      ],
      act_translate1z: [
         '<32>{#p/human}* (Söylediklerini tercüme ettin.)\n* (Froggit artık seni anlıyor.)',
         '<32>{#p/basic}* Froggit korku belirtisi göstermiyor.'
      ],
      act_translate2: [
         '<32>{#p/human}* (Söylediklerini tercüme ettin.)\n* (Froggit artık seni anlıyor.)',
         '<32>{#p/basic}* Froggit dışına yansıtmasa da, içten içe kızarıyor.'
      ],
      confuseText: [ '<08>{#p/basic}{~}Vırak, Vırak?' ],
      flirtText: [ '<08>{#p/basic}{~}(Yanak- ları cidden kızarır.)\nVırak...' ],
      idleText1: [ '<08>{#p/basic}{~}Vırak, vırak.' ],
      idleText2: [ '<08>{#p/basic}{~}Gak, Gak.' ],
      idleText3: [ '<08>{#p/basic}{~}Zıp, zıp.' ],
      idleText4: [ '<08>{#p/basic}{~}Miyav.' ],
      mercyStatus: [ '<32>{#p/story}* Froggit seninle savaşmaya çekiniyor.' ],
      name: '* Froggit',
      meanText: [ '<08>{#p/basic}{~}(Titre, sallan.)\nVırak...' ],
      niceText: [ '<08>{#p/basic}{~}(Yanak- ları hafif- ten kızarır.)\nVırak...' ],
      perilStatus: [ '<32>{#p/story}* Froggit kaçacak yer arıyor.' ],
      status1: [ '<32>{#p/story}* Froggit yakınına zıpladı!' ],
      status2: [ '<32>{#p/story}* Savaş alanı egzotik çiçek kokusuyla doldu.' ],
      status3: [ "<32>{#p/story}* Froggit neden burada olduğunu bilmiyor gibi." ],
      status4: [ '<32>{#p/story}* Froggit ileri geri zıplıyor.' ]
   },
   b_opponent_whimsun: {
      act_check: [ '<32>{#p/story}* FLUTTERLYTE - SAL 5 SAV 0\n* Bu canavar uçmayı daha şimdi öğrendi...' ],
      act_check2: [ '<32>{#p/story}* FLUTTERLYTE - SAL 5 SAV 0\n* Bu canavar hep yerde kalmış olmayı diliyor.' ],
      act_console: [
         '<32>{#p/human}* (Flutterlyte\'a daha yükseğe uçmasında yardım ettin.)',
         '<32>{#p/basic}* Flutterlyte sana teşekkür edip uçarak gidiyor...'
      ],
      act_flirt: [
         '<32>{#p/human}* (Flutterlyte ile flört ettin.)',
         '<32>{#p/basic}* İltifatına dayanamayarak, Flutterlyte gözyaşlarına boğulup uçarak uzaklaşıyor...'
      ],
      act_terrorize: [
         '<32>{#p/human}* (Ağlıyorsun, zırlıyorsun ve dişlerini gıcırdatıyorsun.)',
         '<32>{#p/basic}* Flutterlyte panikleyip uçarak ayrılıyor...'
      ],
      idleTalk1: [ '<08>{#p/basic}{~}Bu niye bu kadar zor..' ],
      idleTalk2: [ '<08>{#p/basic}{~}Lütfen bana yardım et..' ],
      idleTalk3: [ "<08>{#p/basic}{~}Korkuyorum.." ],
      idleTalk4: [ "<08>{#p/basic}{~}Bunu yapamam.." ],
      idleTalk5: [ '<08>{#p/basic}{~}\x00*burun çeker*' ],
      name: '* Flutterlyte',
      perilStatus: [ '<32>{#p/story}* Flutterlyte kendisini zar zor havada tutuyor.' ],
      status1: [ '<32>{#p/story}* Flutterlyte önüne geldi!' ],
      status2: [ '<32>{#p/story}* Flutterlyte özür mırıldanmaya devam ediyor.' ],
      status3: [ '<32>{#p/story}* Flutterlyte uysalca süzülüyor.' ],
      status4: [ '<32>{#p/story}* Taze şeftali kokusu havaya siniyor.' ],
      status5: [ '<32>{#p/story}* Flutterlyte soluk soluğa durumda.' ],
      status6: [ '<32>{#p/story}* Flutterlyte göz temasından kaçınıyor.' ]
   },
   b_opponent_loox: {
      act_check: [ '<32>{#p/story}* OCULOUX - SAL 6 SAV 6\n* Bakışma yarışmalarının ustası.\n* Aile adı: Eyewalker' ],
      act_check2: [
         "<32>{#p/story}* OCULOUX - SAL 6 SAV 6\n* Bu zorba pohpohlanmış gibi gözükmemek için elinden geleni yapıyor."
      ],
      act_check3: [ '<32>{#p/story}* OCULOUX - SAL 6 SAV 6\n* Bu canavar senin görüş açında bulunmaktan onur duyuyor.' ],
      act_dontpick: [
         '<32>{#p/human}* (Oculoux’a dik dik baktın.)\n* (Oculoux daha da dik bakıyor.)',
         "<32>{#p/human}* (Oculoux'un gözü gittikçe kasılıyor, ve nihayetinde...)",
         '<32>{#p/human}* (... Oculoux diz çöküyor.)'
      ],
      act_flirt: [ '<32>{#p/human}* (Oculoux ile flört ettin.)' ],
      act_pick: [ '<32>{#p/human}* (Oculoux’a başkalarına bakmayla ilgili kaba bir demeç verdin.)' ],
      checkTalk1: [ '<08>{#p/basic}{~}Bakmaya cesaretin var mı?' ],
      dontDeny1: [ '<08>{#p/basic}{~}Bakın kim fikrini değiştirdi.' ],
      dontTalk1: [ '<99>{#p/basic}{~}Bunun da\nbakışları\ngüçlüymüş.' ],
      flirtDeny1: [ '<08>{#p/basic}{~}Ne kadar tsundere bir davranış.' ],
      flirtTalk1: [ '<08>{#p/basic}{~}Ne? Y-yok canım!' ],
      hurtStatus: [ '<32>{#p/story}* Oculoux’un gözü sulandı.' ],
      idleTalk1: [ "<08>{#p/basic}{~}Gözüm üstünde." ],
      idleTalk2: [ "<08>{#p/basic}{~}Bana ne yapacağımı söyleme." ],
      idleTalk3: [ '<08>{#p/basic}{~}Görmek mutluluktur.' ],
      idleTalk4: [ '<08>{#p/basic}{~}Gözümü yoruyorsun.' ],
      idleTalk5: [ '<08>{#p/basic}{~}Bakışma yarışmasına var mısın?' ],
      name: '* Oculoux',
      pickTalk1: [ '<08>{#p/basic}{~}Ne cüretle yaşam tarzımızı sorgularsın!' ],
      spareStatus: [ "<32>{#p/story}* Savaşmak artık Oculoux'un umurunda değil." ],
      status1: [ '<32>{#p/story}* Bir çift Oculoux üstüne yürüdü!' ],
      status2: [ '<32>{#p/story}* Oculoux sana gözünü dikmiş durumda.' ],
      status3: [ '<32>{#p/story}* Oculoux dişlerini sıkıyor.' ],
      status4: [ '<32>{#p/story}* Göz damlası gibi kokuyor.' ],
      status5: [ '<32>{#p/story}* Oculoux\'un gözü kanlandı.' ],
      status6: [ '<32>{#p/story}* Oculoux sana dik dik bakıyor.' ],
      status7: [ '<32>{#p/story}* Oculoux artık yalnız.' ]
   },
   b_opponent_migosp: {
      act_check: [ "<32>{#p/story}* SİLENTE - SAL 7 SAV 5\n* Kötü görünebilir, ama sadece yanlış kişilerle birlikte..." ],
      act_check2: [ '<33>{#p/story}* SİLENTE - SAL 7 SAV 5\n* Şimdi yalnız, ve neşeyle dans ederek kendisini gösteriyor.' ],
      act_check3: [ '<32>{#p/story}* SİLENTE - SAL 7 SAV 5\n* Seninle birlikteyken rahat hissediyor.\n* FAZLA rahat.' ],
      act_check4: [ "<32>{#p/story}* SİLENTE - SAL 7 SAV 5\n* Sert durmasına rağmen, acı içinde olduğu bariz..." ],
      act_flirt: [ '<32>{#p/human}* (Silente ile flört ettin.)' ],
      flirtTalk: [ '<08>{#p/basic}{~}Selamm~' ],
      groupInsult: [ "<32>{#p/human}* (Silente'ye hakaret etmeye çalıştın, ancak o diğerlerine çok odaklı.)" ],
      groupStatus1: [ '<32>{#p/story}* Silente diğerlerine fısıldıyor.' ],
      groupStatus2: [ "<32>{#p/story}* Ortalık hamamböceği kapanı gibi kokmaya başladı." ],
      groupTalk1: [ '<08>{#p/basic}TEK AMAÇLI ADİ\n..' ],
      groupTalk2: [ '<08>{#p/basic}YÜCE ZİHNE İTAAT ET\n..' ],
      groupTalk3: [ '<08>{#p/basic}LEJYON! BİZ BİR LEJYONUZ!' ],
      groupTalk4: [ '<08>{#p/basic}SÜRÜYE KULAK VER\n..' ],
      groupTalk5: [ '<08>{#p/basic}HAYDİ HEP BERABER\n..' ],
      groupTalk6: [ "<08>{#p/basic}UMRUM DIŞI." ],
      name: '* Silente',
      perilStatus: [ '<32>{#p/story}* Silente pes etmeyi reddediyor.' ],
      soloInsult: [ "<32>{#p/human}* (Silente'ye hakaret etmeye çalıştın, ama o takmayacak kadar mutlu.)" ],
      soloStatus: [ "<32>{#p/story}* Silente bu galaksiden bihaber." ],
      soloTalk1: [ "<08>{#p/basic}{~}Kendim olmak en iyisi!" ],
      soloTalk2: [ '<08>{#p/basic}{~}La la~ Sadece kendin- ol~' ],
      soloTalk3: [ "<08>{#p/basic}{~}Yalnız kalmak gibisi yok!" ],
      soloTalk4: [ '<08>{#p/basic}{~}Mmm, ça ça ça!' ],
      soloTalk5: [ '<08>{#p/basic}{~}Salla kollarını, bebeğim~' ]
   },
   b_opponent_mushy: {
      act_challenge: [
         '<32>{#p/human}* (Mushy\'e düelloda meydan okudun.)',
         "<33>{#p/story}* Mushy'nin bu turluğuna HIZI arttı!"
      ],
      act_check: [ '<32>{#p/story}* MUSHY - SAL 6 SAV 6\n* Uzay kovboylarının dehşet hayranı. Silahşör.' ],
      act_check2: [ '<32>{#p/story}* MUSHY - SAL 6 SAV 6\n* Uzay kovboylarının dehşet hayranı. Seksi olanların bile.' ],
      act_check3: [ '<32>{#p/story}* MUSHY - SAL 6 SAV 6\n* Elinden geleni yaptığından ötürü bu silahşör etkilendi.' ],
      act_flirt: [ '<32>{#p/human}* (Mushy ile flört ettin.)' ],
      act_taunt: [ '<32>{#p/human}* (Mushy ile alay ettin.)' ],
      challengeStatus: [ '<32>{#p/story}* Mushy sıradaki meydan okumayı bekliyor.' ],
      challengeTalk1: [ "<08>{#p/basic}{~}Neyin varmış görelim." ],
      challengeTalk2: [ '<08>{#p/basic}{~}Beni yenebi- leceğini mi sanıyor- sun?' ],
      flirtStatus1: [ '<32>{#p/story}* Mushy, şaşkın ve azgın olan.' ],
      flirtTalk1: [ '<08>{#p/basic}{~}H-hey, kes şunu!' ],
      hurtStatus: [ '<32>{#p/story}* Mushy son mücadelesini veriyor.' ],
      idleTalk1: [ '<08>{#p/basic}{~}Bam!\nBam!\nBam!' ],
      idleTalk2: [ '<08>{#p/basic}{~}Eyerini hazırla!' ],
      idleTalk3: [ "<08>{#p/basic}{~}Hepsi bir günlük iş." ],
      name: '* Mushy',
      spareStatus: [ '<32>{#p/story}* Mushy saygısından önünde eğiliyor.' ],
      status1: [ '<32>{#p/story}* Mushy öne atıldı!' ],
      status2: [ '<32>{#p/story}* Mushy tek eli cebinde nişan alıyor.\n* Bir şekilde.' ],
      status3: [ '<32>{#p/story}* Mushy büyük bir vuruşma için hazırlanıyor.' ],
      status4: [ '<32>{#p/story}* Mushy tabanca kılıfına sarılıyor.' ],
      status5: [ '<32>{#p/story}* Yağmur yağmış gibi kokuyor.' ],
      tauntStatus1: [ "<32>{#p/story}* Mushy alay etmenden etkilenmemiş gibi davranıyor." ],
      tauntTalk1: [ "<08>{#p/basic}{~}Güya o bana işle- yecek." ]
   },
   b_opponent_napstablook: {
      act_check: [ "<32>{#p/story}* NAPSTABLOOK - SAL 10 SAV 255\n* İşte Napstablook." ],
      act_check2: [
         "<32>{#p/story}* NAPSTABLOOK - SAL 10 SAV 255\n* Görünüşe göre artık burada bulunmak istemiyorlar."
      ],
      act_check3: [ '<32>{#p/story}* NAPSTABLOOK - SAL 10 SAV 255\n* Uzun bir aradan sonra, yeniden ümitli...' ],
      act_check4: [ '<32>{#p/story}* NAPSTABLOOK - SAL 10 SAV 255\n* Romantik gerilim hat safhaya ulaşmış durumda.' ],
      awkwardTalk: [ '<11>{#p/napstablook}{~}ııı...', '<11>{#p/napstablook}{~}tamam, öyleyse...?' ],
      checkTalk: [ "<11>{#p/napstablook}{~}o ben olu- yorum..." ],
      cheer0: [ '<32>{#p/human}* (Napstablook\'u teselli etmeye çalıştın.)' ],
      cheer1: [ '<32>{#p/human}* (Napstablook\'a sabırla gülümsedin.)' ],
      cheer2: [ '<32>{#p/human}* (Napstablook\'a ufak bir espri yaptın.)' ],
      cheer3: [ "<32>{#p/human}* (Napstablook'un silindir şapkasına hayranlığını gösteriyorsun.)" ],
      cheerTalk1: [ '<11>{#p/napstablook}{~}...?' ],
      cheerTalk2: [ '<11>{#p/napstablook}{~}hehe hehe...' ],
      cheerTalk3: [
         '<11>{*}{#p/napstablook}{~}bir şey {#x1}deneyeyim...{^20}{#x2}{^20}{%}',
         "<11>{*}{#p/napstablook}{~}ona {#x3}'şık blook'{^40}{%} diyorum",
         '<11>{*}{#p/napstablook}{~}beğendin mi?{^40}{%}'
      ],
      cheerTalk4: [ '<11>{#p/napstablook}{~}ah tanrım.....' ],
      consoleTalk1: [ '<11>{#p/napstablook}{~}aynen aynen...' ],
      consoleTalk2: [ '<11>{#p/napstablook}{~}yemem ben bunu...' ],
      consoleTalk3: [ "<11>{#p/napstablook}{~}sen üzgün değilsin..." ],
      deadTalk: [
         "<11>{#p/napstablook}{~}ımm... hayaletleri öldüremeyeceğini biliyorsun, değil mi...",
         "<11>{~}biz ruhsal varlıklar falanız da",
         "<11>{~}ben sadece kaba görünmemek için canımı azaltıyordum",
         '<11>{~}üzgünüm... işi daha da tuhaflaştırdım...',
         '<11>{~}beni yenmişsin gibi yap...',
         '<11>{~}oooooooooo'
      ],
      flirt1: [ '<32>{#p/human}* (Napstablook\'la flört ettin.)' ],
      flirt2: [ '<32>{#p/human}* (En iyi tavlama cümleni Napstablook üzerinde denedin.)' ],
      flirt3: [ '<32>{#p/human}* (Napstablook\'a kalpten bir iltifat ettin.)' ],
      flirt4: [ '<32>{#p/human}* (Napstablook\'u ona karşı olan duygularınla ilgili temin ediyorsun.)' ],
      flirtTalk1: [ "<11>{#p/napstablook}{~}seni sadece aşağıya çekerdim" ],
      flirtTalk2: [ "<11>{#p/napstablook}{~}oh.....\nonu daha önce duy- muştum....." ],
      flirtTalk3: [ '<11>{#p/napstablook}{~}ııı... gerçekten de öyle mi?' ],
      flirtTalk4: [ "<11>{#p/napstablook}{~}ah, sen ciddisin...", '<11>{~}eyvah.....' ],
      idleTalk1: [ "<11>{#p/napstablook}{~}ben iyiyim, sağ ol" ],
      idleTalk2: [ '<11>{#p/napstablook}{~}sadece yuvarlanıyorum işte...' ],
      idleTalk3: [ '<11>{#p/napstablook}{~}kendi şeyime bakıyorum...' ],
      insultTalk1: [ '<11>{#p/napstablook}{~}biliyordum...' ],
      insultTalk2: [ '<11>{#p/napstablook}{~}her neyse...' ],
      insultTalk3: [ '<11>{#p/napstablook}{~}ne söyleyeceksen söyle...' ],
      insultTalk4: [ '<11>{#p/napstablook}{~}at hepsini içinden...' ],
      name: '* Napstablook',
      silentTalk: [ '<11>{#p/napstablook}{~}...' ],
      sincere: [ "<32>{#p/human}* (Napstablook'un silindir şapkasına çapkın bir yorum yaptın.)" ],
      sincereTalk: [ '<11>{#p/napstablook}{~}hehe... teşekkürler' ],
      status1: [ '<32>{#p/story}* İşte geliyor Napstablook.' ],
      status2: [ '<32>{#p/story}* Napstablook birazcık daha iyi görünüyor.' ],
      status3: [ '<32>{#p/story}* Napstablook sana bir şey göstermek istiyor.' ],
      status3a: [ '<32>{#p/story}* Napstablook cevabını bekliyor.' ],
      status4: [ "<32>{#p/story}* Napstablook'un gözleri ışıldıyor." ],
      status5: [ '<32>{#p/story}* Napstablook kesinlikle bununla nasıl baş edeceğini bilmiyor.' ],
      status5a: [ '<32>{#p/story}* Napstablook kendi varlığını sorguluyor.' ],
      status6: [ '<32>{#p/story}* Napstablook doğru anı bekliyor.' ],
      status7: [ '<32>{#p/story}* Napstablook sonraki hamleni bekliyor.' ],
      status8: [ '<32>{#p/story}* Napstablook uzaklara doğru bakıyor.' ],
      status9: [ "<32>{#p/story}* Napstablook burada olmamayı diliyor." ],
      status10: [ '<32>{#p/story}* Napstablook seni görmezden gelmek için elinden geleni yapıyor.' ],
      suck: [ '<32>{#p/human}* (Napstablook’a şapkasının rezalet olduğunu söyledin.)' ],
      threat: [ '<32>{#p/human}* (Napstablook’un tehdit ettin.)' ]
   },
   b_opponent_toriel: {
      spannerText: [ '<32>{#p/human}* (Alet anahtarını fırlattın.)\n* (Toriel onu alıp sana geri getiriyor.)' ],
      spannerTalk: [ '<11>{#p/toriel}{#f/22}Bu hiçbir işe yarama- yacak, çocuğum.' ],
      spannerTalkRepeat: [ '<11>{#p/toriel}{#f/22}...' ],
      act_check: [ '<32>{#p/story}* TORİEL - SAL 80 SAV 80\n* Senin için en iyisini biliyor.' ],
      act_check2: [ '<32>{#p/story}* TORİEL - SAL 80 SAV 80\n* Kendini tutuyor gibi görünüyor.' ],
      act_check3: [ '<32>{#p/story}* TORİEL - SAV 80 SAL 80\n* Tasalı gözüküyor.' ],
      act_check4: [ '<32>{#p/story}* TORİEL - SAL 80 SAV 80\n* Sadece senin için en iyisini istiyor.' ],
      act_check5: [ '<32>{#p/story}* TORİEL - SAL 80 SAV 80\n* Senin \"sevimli” olduğunu düşünüyor.' ],
      precrime: [ '<20>{#p/asriel2}...' ],
      criminal1: (reveal: boolean) => [
         '<20>{#p/asriel2}{#f/3}Selam, $(name).',
         "<20>{#f/1}Geri dönmek güzel.",
         "<20>{#f/2}Ne oldu?\nBeni tekrar görmeyi beklemiyor muydun?",
         '<20>{#f/13}...\nAh, $(name)...',
         ...(reveal
            ? [ "<20>{#f/1}Bunun olmasını uzun zamandır bekliyorum." ]
            : [
                 "<20>{#f/15}Bir yıldızın içinde o kadar uzun hapis kalmıştım ki ben...",
                 '<20>{#f/15}...',
                 "<20>{#f/16}Neyse, artık bunun önemi yok.",
                 '<20>{#f/1}Önemli olan her şeyin tekrar eskisi gibi olması.'
              ]),
         '<20>{#f/1}Hee hee hee...',
         "<20>{#f/2}İçinin bomboş olduğunu biliyorum, aynı benim gibi.",
         "<20>{#f/5}Bunca yıldan sonra bile et ve tırnak gibiyiz...",
         "<20>{#f/1}Dinle.\nBizi birbirimize hiç olmadığı kadar yakınlaştıracak bir planım var.",
         '<20>{#f/1}Sen, ben ve bu çalıntı RUH’larımızla...',
         "<20>{#f/1}Bu acınası karakolun tamamını darmadağın edelim.",
         '<21>{#f/2}Mükemmel geleceğimize engel olmaya cüret eden her kimse...',
         "<20>{#f/1}Onları tozla buz edelim."
      ],
      criminal2: [ '<20>{#p/asriel2}{#f/3}Tekrardan hoşgeldin, $(name).', '<20>{#f/1}Kaldığımız yerden devam etmeye hazır mısın?' ],
      criminal3: [ '<20>{#p/asriel2}{#f/3}Pekala.', '<20>{#f/3}...', "<20>{#f/4}Hadi hemen gidelim." ],
      cutscene1: [
         "<32>{#p/basic}* Belki de dinleyeceğin tek kişi olduğum içindir.",
         '<25>{#p/toriel}{#f/16}* ...!?',
         "<32>{#p/basic}* Ama ben ne bilirim ki, ha?\n* Ben sadece tatlı, masum küçük bir çocuğum."
      ],
      cutscene2: [
         '<25>{#p/toriel}{#f/3}* ...',
         '<25>{#p/toriel}{#f/4}* Bu mümkün değil...',
         '<25>{#f/0}* Rüya görüyor olmalıyım.\n* Ya da halüsinasyon.\n* Ya da belki...',
         '<32>{#p/basic}* Hayır.',
         '<32>{#p/basic}* Bu gerçek.',
         '<25>{#p/toriel}{#f/5}* Ama sen öldün, $(name).',
         '<25>{#f/5}* Benimle konuşuyor olmanın imkanı yok.',
         "<32>{#p/basic}* O zaman bu bir rüyaymış gibi kendini kandır.",
         '<32>{#p/basic}* Böylesi senin için uygunsa.',
         '<25>{#p/toriel}{#f/5}* ...',
         '<25>{#p/toriel}{#f/9}* Ne istiyorsun?',
         '<32>{#p/basic}* Toriel...',
         "<32>{#p/basic}* İnsanlığa karşı nasıl hissettiğimi biliyorsun, değil mi?",
         '<25>{#p/toriel}{#f/13}* Doğru.',
         '<32>{#p/basic}* Yanlış.',
         '<32>{#p/basic}* ... bu insan hakkında değil.',
         "<32>* O buraya geldiğinden beri onu takip ediyorum...",
         "<32>* Ve şimdi benden sana ulaşmamı istiyor.",
         '<32>* Sence bu ne anlama geliyor?',
         '<25>{#p/toriel}{#f/13}* ...',
         '<32>{#p/basic}* Bu, onu bırakman gerektiği anlamına geliyor.',
         '<25>{#p/toriel}{#f/12}* ... neyin tehlikede olduğunu anlamıyor musun?',
         '<25>{#f/11}* Eğer onun gitmesine izin verirsem, mutlaka ölecektir.',
         '<32>{#p/basic}* ... hadi ama.',
         "<32>{#p/basic}* Aslında bunu bu yüzden yapmıyorsun, öyle değil mi?",
         '<25>{#p/toriel}{#f/12}* Bu tavrına bakılırsa, belki de bu gerçekten sensin, $(name).',
         '<25>{#p/toriel}{#f/11}* Sen her zaman otoritemi sorguladın.',
         '<32>{#p/basic}* Buna her türlü hakkımın olduğunu düşünüyorum.',
         '<32>{#p/basic}* Onu burada tutmak istiyorsun çünkü Outlands\'in ötesinde var olanlardan korkuyorsun.',
         "<33>{#p/basic}* Ama artık hiçbir şey yüz yıl önceki gibi değil.",
         "<33>{#p/basic}* Sen sadece gidip kendi gözlerinle görmeye korktuğun için bu konuda cahilsin.",
         '<25>{#p/toriel}{#f/13}* ...',
         "<25>{#p/toriel}{#f/13}* ... ama eğer gitmesine izin verirsem, onun...",
         '<32>{#p/basic}* Yanında olamayacak mısın?',
         '<32>{#p/basic}* Hey, o hissi biliyorum.',
         '<32>{#p/basic}* Ama onu burada tutmak zaten onu ölüme mahkûm etmek olurdu.',
         "<32>{#p/basic}* Yaşamaya değer hiçbir şey yapma fırsatı yoksa hayatın ne anlamı var?",
         '<25>{#p/toriel}{#f/13}* ...',
         '<25>{#p/toriel}{#f/13}* $(name), ben...',
         '<32>{#p/basic}* Ona yedek bir cep telefonu vermiştin, hatırlıyor musun?',
         "<32>{#p/basic}* Hattı açık tut, ve belki seni arar.",
         '<25>{#p/toriel}{#f/9}* ... peki ya sen?',
         "<32>{#p/basic}* Bak.\n* Ben iyi olacağım.",
         "<32>{#p/basic}* Tek isteğim, o gittikten sonra ONU unutmaman.",
         '<25>{#p/toriel}{#f/13}* ...',
         '<32>{#p/basic}* Hoşça kal, Toriel.',
         '<25>{#p/toriel}{#f/14}* ... hoşça kal, $(name).'
      ],
      death1: [
         '<11>{#p/toriel}{#f/21}{#v/1}{#i/3}{#x1}{@random=1.1/1.1}Ahhh...',
         '<11>{#v/1}{#i/3}{#x1}{@random=1.1/1.1}En güçsüz anımda beni yere yıkmak...',
         '<11>{#v/1}{#i/3}{#x1}{@random=1.1/1.1}...',
         '<11>{#v/2}{#i/4}{#x2}{@random=1.1/1.1}Ha...\nHa...',
         '<11>{#v/2}{#i/4}{#x2}{@random=1.1/1.1}Anlaşılan, ufaklık...',
         '<11>{#v/3}{#i/5}{#x2}{@random=1.2/1.2}Bunca zamandır... sana güvendiğim için bir aptalmışım...'
      ],
      death2: [
         '<11>{#p/toriel}{#f/21}{#v/1}{#i/3}{#x1}{@random=1.1/1.1}Ahhh...',
         '<11>{#v/1}{#i/3}{#x3}{@random=1.1/1.1}Seni onlardan koruduğumu düşünüyorken...',
         '<11>{#v/1}{#i/3}{#x4}{@random=1.1/1.1}...',
         '<11>{#v/2}{#i/4}{#x2}{@random=1.1/1.1}Ha...\nHa...',
         '<11>{#v/2}{#i/4}{#x1}{@random=1.1/1.1}Anlaşılan, ufaklık...',
         '<11>{#v/3}{#i/5}{#x2}{@random=1.2/1.2}Aslında onları... senden koruyormuşum...'
      ],
      death3: [
         '<11>{#p/toriel}{#f/21}{#v/1}{#i/3}{#x1}{@random=1.1/1.1}Ahhh...',
         '<11>{#v/1}{#i/3}{#x1}{@random=1.1/1.1}Sen düşün- düğümden daha güçlüsün...',
         '<11>{#v/1}{#i/3}{#x3}{@random=1.1/1.1}Dinle beni, küçüğüm...',
         '<11>{#v/1}{#i/3}{#x3}{@random=1.1/1.1}Birkaç dakika içinde, toza döne- ceğim...',
         '<11>{#v/1}{#i/3}{#x3}{@random=1.1/1.1}Bu olduğunda, benim RUH\'umu alma- lısın...',
         '<11>{#v/1}{#i/3}{#x1}{@random=1.1/1.1}Buradan kaçabil- menin tek gerçek yolu bu.',
         "<11>{#v/2}{#i/4}{#x3}{@random=1.1/1.1}Asgore'un planının... başarılı olmasına... izin veremezsin.",
         '<11>{#v/2}{#i/4}{#x1}{@random=1.1/1.1}...',
         '<11>{#v/3}{#i/5}{#x2}{@random=1.2/1.2}Çocuğum...',
         "<11>{#v/3}{#i/5}{#x4}{@random=1.2/1.2}Uslu ol... tamam mı?"
      ],
      magic1: [ '<20>{#p/asriel2}{#f/3}Beni takip et.' ],
      name: '* Toriel',
      spareTalk1: [ '<11>{#p/toriel}{#f/11}...' ],
      spareTalk2: [ '<11>{#p/toriel}{#f/11}...\n...' ],
      spareTalk3: [ '<11>{#p/toriel}{#f/11}...\n...\n...' ],
      spareTalk4: [ '<11>{#p/toriel}{#f/17}...?' ],
      spareTalk5: [ '<11>{#p/toriel}{#f/17}Ne yapıyorsun?' ],
      spareTalk6: [ '<11>{#p/toriel}{#f/17}...' ],
      spareTalk7: [ '<11>{#p/toriel}{#f/17}Neyi ispatlamaya çalışı- yorsun?' ],
      spareTalk8: [ '<11>{#p/toriel}{#f/17}...' ],
      spareTalk9: [ '<11>{#p/toriel}{#f/12}Ya benimle savaş ya da uzaklaş!' ],
      spareTalk10: [ '<11>{#p/toriel}{#f/12}Bana öyle bakmayı bırak!' ],
      spareTalk11: [ '<11>{#p/toriel}{#f/12}Uzaklaş buradan!' ],
      spareTalk12: [ '<11>{#p/toriel}{#f/13}...' ],
      spareTalk13: [ '<11>{#p/toriel}{#f/13}...\n...' ],
      spareTalk14: [ '<11>{#p/toriel}{#f/13}...\n...\n...' ],
      spareTalk15: [
         '<11>{#p/toriel}{#f/13}Eve gitmek istediğini bili- yorum...',
         '<11>{#p/toriel}{#f/9}Ama oraya giden yol tehlikeli olacaktır.'
      ],
      spareTalk16: [ '<11>{#p/toriel}{#f/14}O yüzden lütfen... diğer tarafa geri dön.' ],
      spareTalk17: [
         '<11>{#p/toriel}{#f/13}Çok fazla şeyimiz olmadığını bili- yorum...',
         '<11>{#p/toriel}{#f/10}Ama yine de güzel bir hayatımız olabilir.'
      ],
      spareTalk18: [
         '<11>{#p/toriel}{#f/13}Sen ve ben, bir aile gibi...',
         '<11>{#p/toriel}{#f/10}Bu kulağa hoş gelmiyor mu?'
      ],
      spareTalk19: [ '<11>{#p/toriel}{#f/21}...' ],
      spareTalk20: [ '<11>{#p/toriel}{#f/18}Neden bunu bu kadar zorlaştı- rıyorsun?' ],
      spareTalk21: [ '<11>{#p/toriel}{#f/21}...' ],
      spareTalk22: [ '<11>{#p/toriel}{#f/18}Lütfen, sadece...', '<11>{#p/toriel}{#f/9}Diğer tarafa geri dön.' ],
      spareTalk23: [ '<11>{#p/toriel}{#f/21}...' ],
      spareTalk24: [ '<11>{#p/toriel}{#f/18}Ah, çocuk...' ],
      spareTalk28b: [
         '<11>{#p/toriel}{#f/9}Belki de seni böyle durdurmaya çalışmak...',
         '<11>{#f/13}Yalnızca benim aptallı- ğımdı...',
         '<11>{#f/9}Belki de sadece gitmene izin verme- liydim.'
      ],
      spareTalk28c: [ '<11>{#p/toriel}{#f/17}...?', '<11>{#f/17}Neden \"$(name)\" için sesleniyorsun?' ],
      status1: [ '<32>{#p/story}* Toriel artık karşında duruyor.' ],
      status2: [ '<32>{#p/story}* Toriel bir büyü saldırısı hazırlıyor.' ],
      status3: [ '<32>{#p/story}* Toriel soğuk davranıyor.' ],
      status4: [ '<32>{#p/story}* Toriel sana doğru bakıyor.' ],
      status5: [ '<32>{#p/story}* ...' ],
      assistStatus: [ '<32>{#p/basic}* Başka bir yol olmalı...' ],
      talk1: [ '<32>{#p/human}* (Toriel’den geçmene izin vermesini istedin.)\n* (Etkisi yok.)' ],
      talk2: [ "<32>{#p/human}* (Toriel’e bunu gerçekten niye yaptığını sordun.)\n* (Hafiften irkiliyor.)" ],
      talk3: [ '<32>{#p/human}* (Toriel’e durması için yalvardın.)\n* (Durmaktan çekiniyor.)' ],
      talk4: [
         '<32>{#p/human}* (Toriel’e durması için tekrar yalvardın.)',
         '<32>{#p/basic}* ... belki de onun için çok fazla şey risk altında.'
      ],
      talk5: [ '<32>{#p/human}* (Toriel’e bağırdın.)\n* (Toriel gözlerini kapatıp derin bir nefes alıyor.)' ],
      talk6: [
         '<32>{#p/human}* (Toriel’e bir daha bağırdın.)',
         "<32>{#p/basic}* ... belki de konuşmak bir fayda etmeyecek gibi."
      ],
      talk7: [ "<32>{#p/human}* (Ama söyleyecek başka bir şey düşünemedin.)" ],
      talk8: [ '<32>{#p/human}* (Ama artık bunu yapmanın bir manası kalmamıştı.)' ],
      theft: [ '<20>{*}{#p/twinkly}Benim.{^15}{%}' ]
   },

   c_name_outlands: {
      hello: 'Merhaba De',
      about: 'Hakkında',
      mom: 'Ona \"Anne\" De',
      flirt: 'Flört Et',
      toriel: "Toriel'in Telefonu",
      puzzle: 'Bulmacada Yardım',
      insult: 'Hakaret Et'
   },

   c_call_outlands: {
      about1: [
         '<25>{#p/toriel}{#f/1}* Benim hakkımda daha fazlasını mı bilmek istiyorsun...?',
         '<25>{#f/0}* Yani, korkarım ki söyleyecek pek bir şey yok.',
         '<25>{#f/0}* Ben yalnızca çok sık endişelenen yaşlı, ahmak bir hanımım!'
      ],
      about2: [
         '<25>{#p/toriel}{#f/1}* Eğer gerçekten benim hakkımda daha fazlasını bilmek istiyorsan...',
         '<25>{#f/1}* Neden etrafa bir göz gezdirmiyorsun...?',
         '<25>{#f/0}* Gördüğün şeylerin çoğunun inşa edilmesine benim yardımım dokundu.'
      ],
      about3: [
         '<25>{#p/toriel}{#f/1}* Eğer gerçekten benim hakkımda daha fazlasını bilmek istiyorsan...',
         '<25>{#f/2}* Telefonda bana hakaret etmeden önce iki kere düşünmelisin!'
      ],
      flirt1: [
         '<25>{#p/toriel}{#f/7}* ... ha?',
         '<25>{#f/1}* Ah, heh... heh...',
         '<25>{#f/6}* Hahaha!\n* Yanağını sıkabilirdim!',
         '<25>{#f/0}* Benim gibi yaşlı bir kadından daha iyisini mutlaka bulabilirsin.'
      ],
      flirt2: [
         '<25>{#p/toriel}{#f/7}* ...\n* Ah canım, sen ciddi misin...?',
         '<25>{#f/1}* Çocuğum, bunun acınası mı yoksa sevimli mi olduğunu bilemiyorum.'
      ],
      flirt3: [
         '<25>{#p/toriel}{#f/7}* ...\n* Ah canım, sen ciddi misin...?',
         '<25>{#f/5}* Hem de bana \"Anne\" diye seslenmenden sonra...',
         '<25>{#f/1}* Peki öyleyse.\n* Sen oldukça \"ilginç\" bir çocuksun.'
      ],
      flirt4: [ '<25>{#p/toriel}{#f/3}* ...', '<25>{#p/toriel}{#f/4}* Seni anlamaya başlayamıyorum.' ],
      hello: [
         [
            '<25>{#p/toriel}* Bu Toriel.',
            '<25>{#f/1}* Sadece merhaba mı demek istemiştin...?',
            '<25>{#f/0}* Peki öyleyse.\n* \"Merhaba!\"',
            '<25>{#f/0}* Umarım bu yeterlidir.\n* Hee hee.'
         ],
         [
            '<25>{#p/toriel}* Bu Toriel.',
            '<25>{#f/1}* Yeniden mi merhaba demek istedin?',
            '<25>{#f/0}* \"Selamlar\" olsun!',
            '<25>{#f/1}* Bu yeterli midir?'
         ],
         [
            '<25>{#p/toriel}{#f/1}* Sıkıldın mı?',
            '<25>{#f/0}* Özür dilerim.\n* Sana yapacak bir şey vermeliydim.',
            '<25>{#f/1}* Neden dikkatini dağıtmak için hayal gücünü kullanmıyorsun?',
            '<25>{#f/0}* Sanki bir... savaş pilotuymuşsun gibi hayal et!',
            '<25>{#f/1}* Dönüp duruyor, ışık hızında fıçı tonoları yapıyormuş gibi...',
            '<25>{#f/1}* Bunu benim için yapabilir misin?'
         ],
         [
            '<25>{#p/toriel}{#f/5}* Merhaba, küçüğüm.',
            '<25>{#f/9}* Üzgünüm, ama söyleyecek başka pek bir şeyim yok.',
            '<25>{#f/1}* Ama sesini duymak hoştu...'
         ]
      ],
      helloX: [ '<25>{#p/toriel}{#g/torielLowConcern}* Merhaba?' ],
      mom1: [
         '<25>{#p/toriel}* ...',
         '<25>{#f/7}* Ha?\n* Az önce bana \"Anne\" mi dedin?',
         '<25>{#f/1}* Yani...\n* Sanıyorum ki...',
         '<25>{#f/1}* Bu seni mutlu eder miydi?',
         '<25>{#f/1}* Beni...\n* \"Anne\" diye çağırmak?',
         '<25>{#f/0}* Peki öyleyse.\n* Bana istediğin şekilde seslen!'
      ],
      mom2: [ '<25>{#p/toriel}{#f/7}* ...\n* Ah, ben... yine mi?', '<25>{#f/0}* Hee hee...\n* Sen çok tatlı bir çocuksun.' ],
      mom3: [
         '<25>{#p/toriel}{#f/7}* ...\n* Ah, ben... yine mi?',
         '<25>{#f/5}* Hem de benimle flört etmenden sonra...',
         '<25>{#f/1}* Peki öyleyse.\n* Sen oldukça \"ilginç\" bir çocuksun.'
      ],
      mom4: [ '<25>{#p/toriel}{#f/5}* ...' ],
      puzzle1: [
         '<25>{#p/toriel}{#f/1}* Bir bulmacada yardım mı...?',
         '<25>{#f/1}* Henüz odadan ayrılmadın, değil mi?',
         '<25>{#f/0}* Benim geri dönmem için bekle, ve birlikte çözebiliriz.'
      ],
      puzzle2: [
         '<25>{#p/toriel}{#f/1}* Bir bulmacada yardım mı...?',
         '<25>{#f/23}* ... bir şey bana senin gerçekten yardımıma ihtiyacın olmadığını söylüyor.'
      ],
      puzzle3: [
         '<25>{#p/toriel}{#f/1}* Bir bulmacada yardım mı...?',
         '<25>{#f/5}* ...\n* Korkarım ki sana şu anda yardımcı olamayacağım.',
         '<25>{#f/0}* Benim geri dönmem için bekle, ve birlikte çözebiliriz.'
      ],
      insult1: (sus: boolean) =>
         sus
            ? [
                 '<25>{#p/toriel}{#f/0}* Merhaba?\n* Bu...',
                 '<25>{#f/2}* ...!',
                 '<25>{#f/3}* Bunu benim için tekrarlayabilir misin?'
              ]
            : [
                 '<25>{#p/toriel}{#f/0}* Merhaba?\n* Bu...',
                 '<25>{#f/2}* ...!',
                 '<25>{#f/1}* Çocuğum... Bunun senin sandığın anlama geldiğini düşünmüyorum.'
              ],
      insult2: (sus: boolean) =>
         sus
            ? [ '<25>{#p/toriel}{#f/15}* ...', '<25>{#f/12}* Bunu bana söylememişsin gibi davranacağım.' ]
            : [ '<25>{#p/toriel}{#f/1}* Çocuğum...' ]
   },

   i_candy: {
      battle: {
         description: 'Kendine has, meyan köksüz bir aroması var.',
         name: 'Şeker'
      },
      drop: [ '<32>{#p/human}* (Canavar Şekeri\'ni attın.)' ],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? [ '<32>{#p/human}* (10 CAN.)' ]
            : [ '<32>{#p/basic}* \"Canavar Şekeri\" 10 CAN iyileştirir\n* Kendine has, meyan köksüz bir aroması var.' ],
      name: 'Canavar Şekeri',
      use: [ '<32>{#p/human}* (Canavar Şekeri\'ni yedin.)' ]
   },
   i_water: {
      battle: {
         description: 'Dihidrojen Monoksit gibi kokuyor.',
         name: 'Su'
      },
      drop: [ '<32>{#p/human}* (Suyu attın.)' ],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? [ '<32>{#p/human}* (12 CAN.)' ]
            : [ '<32>{#p/basic}* \"Su\" 12 CAN iyileştirir\n* Dihidrojen Monoksit gibi kokuyor.' ],
      name: 'Su',
      use: () => [
         '<32>{#p/human}* (Suyu içtin.)',
         ...(SAVE.data.b.ufokinwotm8 ? [] : [ "<33>{#p/human}* (İçin hidrasyonla doldu.)" ]) 
      ]
   },
   i_chocolate: {
      battle: {
         description: 'Gerçekten hak edilmiş bir çikolata barı.',
         name: 'Çikolata'
      },
      drop: () => [
         '<32>{#p/human}* (Çikolata Barı\'nı attın.)',
         ...(SAVE.data.b.svr || world.darker ? [] : [ '<32>{#p/basic}* ... tüh.' ])
      ],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? [ '<32>{#p/human}* (19 CAN. Bu eşya sana birini anımsatıyor.)' ]
            : [ '<32>{#p/basic}* \"Çikolata Barı\" 19 CAN iyileştirir\n* Cidden hak edilmiş bir atıştırmalık.' ],
      name: 'Çikolata Barı',
      use: () => [
         '<32>{#p/human}* (Çikolatayı yedin.)',
         ...(battler.active && battler.alive[0].opponent.metadata.reactChocolate
            ? [ '<32>{#p/basic}* Toriel kokuyu hatırlayıp ufaktan tebessüm ediyor.' ]
            : [])
      ]
   },
   i_delta: {
      battle: {
         description: 'Bu maddenin yüksek oranda rahatlatıcı etkileri olduğu söyleniyor.',
         name: 'Δ-9'
      },
      drop: [ '<32>{#p/human}* (Δ-9\'u attın.)' ],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? [ '<32>{#p/human}* (5 HP. Bu eşya hakkında tuhaf bir hisse kapıldın.)' ]
            : [ '<32>{#p/basic}* \"Δ-9\" 5 CAN iyileştirir\n* Bu maddenin yüksek oranda rahatlatıcı etkileri olduğu söyleniyor.' ],
      name: 'Δ-9',
      use: [ '<32>{#p/human}* (Δ-9\'u yuttun.)' ]
   },
   i_halo: {
      battle: {
         description: 'Kendi yerçekimi olan bir saç bandı.',
         name: 'Hale'
      },
      drop: [ '<32>{#p/human}* (Hale\'yi bir frizbi gibi fırlattın.)' ],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? [ '<32>{#p/human}* (3 SV.)' ]
            : [ '<32>{#p/basic}* \"Hale\" (3 SV)\n* Kendi yerçekimi olan bir saç bandı.' ],
      name: 'Hale',
      use: () => [
         '<32>{#p/human}* (Hale\'yi kuşandın.)',
         ...(SAVE.data.b.svr && !SAVE.data.b.freedom && asrielinter.i_halo_use++ < 1
            ? [ '<25>{#p/asriel1}{#f/20}* Bence sana yakıştı.' ]
            : [])
      ]
   },
   i_little_dipper: {
      battle: {
         description: 'Pataklamalık bir kepçe.',
         name: 'Küçük Ayı'
      },
      drop: [ '<32>{#p/human}* (Küçük Ayı\'yı attın.)' ],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? [ '<32>{#p/human}* (3 SL.)' ]
            : [ '<32>{#p/basic}* \"Küçük Ayı\" (3 SL)\n* Pataklamalık bir kepçe.' ],
      name: 'Küçük Ayı',
      use: [ '<32>{#p/human}* (Küçük Ayı\'yı kuşandın.)' ]
   },
   i_pie: {
      battle: {
         description: 'Ev yapımı karamelli-tarçınlı turta, tek dilim.',
         name: 'Turta'
      },
      drop: [ '<32>{#p/human}* (Karamelli Turta\'yı attın.)' ],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? [ '<32>{#p/human}* (99 CAN.)' ]
            : [ '<32>{#p/basic}* \"Karamelli Turta\" 99 CAN iyileştirir\n* Ev yapımı karamelli-tarçınlı turta, tek dilim.' ],
      name: 'Karamelli Turta',
      use: [ '<32>{#p/human}* (Karamelli Turta\'yı yedin.)' ]
   },
   i_pie2: {
      battle: {
         description: 'Klasik aile tarifi.',
         name: 'Salyangozlu Turta'
      },
      drop: [ '<32>{#p/human}* (Salyangozlu Turta\'yı attın.)' ],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? [ '<32>{#p/human}* (99 CAN.)' ]
            : [ '<32>{#p/basic}* \"Salyangozlu Turta\" 99 CAN iyileştirir\n* Klasik aile tarifi.' ],
      name: 'Salyangozlu Turta',
      use: [ '<32>{#p/human}* (Salyangozlu Turta\'yı yedin.)' ]
   },
   i_pie3: {
      battle: {
         description: 'Çorbalaştırılmış olsa bile, turta hala lezzetli.',
         name: 'Turta Çorbası'
      },
      drop: [ '<32>{#p/human}* (Turta Çorbası\'nı döktün ve onunla gelen kaşığı attın.)' ],
      info: [ '<32>{#p/basic}* \"Turta Çorbası\" 49 CAN iyileştirir\n* Çorbalaştırılmış olsa bile, turta hala lezzetli.' ],
      name: 'Turta Çorbası',
      use: [ '<32>{#p/human}* (Kaşığıyla birlikte gelen Turta Çorbası\'nı içtin.)' ]
   },
   i_pie4: {
      battle: {
         description: 'Neticede eylemlerin sonuçları vardır...',
         name: 'Yanmış Turta'
      },
      drop: [ '<32>{#p/human}* (Yanmış Turta\'yı sanki hiç var olmamış gibi kenara fırlattın.)' ],
      info: [ '<32>{#p/basic}* \"Yanmış Turta\" 39 CAN iyileştirir\n* Neticede eylemlerin sonuçları vardır...' ],
      name: 'Yanmış Turta',
      use: [ '<32>{#p/human}* (Yanmış Turta\'yı yedin.)' ]
   },
   i_snails: {
      battle: {
         description: 'Bir tabak kızarmış salyangoz.\nKahvaltı için tabi.',
         name: 'Salyangozlar'
      },
      drop: [ '<32>{#p/human}* (Kızarmış Salyangozlar\'ı attın.)' ],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? [ '<32>{#p/human}* (19 CAN.)' ]
            : [ '<32>{#p/basic}* \"Kızarmış Salyangozlar\" 19 CAN iyileştirir\n* Bir tabak kızarmış salyangoz.\n* Kahvaltı için tabi.' ],
      name: 'Kızarmış Salyangozlar',
      use: [ '<32>{#p/human}* (Kızarmış Salyangozlar\'ı yedin.)' ]
   },
   i_soda: {
      battle: {
         description: 'Tiksindirici, koyu sarı bir sıvı.',
         name: 'Soda'
      },
      drop: () => [
         '<32>{#p/human}* (Fışırtılı Soda\'yı attın.)',
         ...(SAVE.data.b.svr || world.darker ? [] : [ '<32>{#p/basic}* Hele şükür.' ])
      ],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? [ '<32>{#p/human}* (8 CAN.)' ]
            : [ '<32>{#p/basic}* \"Fışırtılı Soda\" 8 CAN iyileştirir\n* Tiksindirici, koyu sarı bir sıvı.' ],
      name: 'Fışırtılı Soda',
      use: () => [
         '<32>{#p/human}* (Fışırtılı Soda\'yı içtin.)',
         ...(SAVE.data.b.svr || world.darker ? [] : [ '<32>{#p/basic}* Öğk!' ])
      ]
   },
   i_spacesuit: {
      battle: {
         description: 'Kaza yaptığın mekikle birlikte geldi.',
         name: 'Uzay Elbisesi'
      },
      drop: [ '<32>{#p/human}* (Eski Uzay Elbisesi\'ni attın.)' ],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? [ '<32>{#p/human}* (20 CAN. Sürgün sırasında uçurulmuş bir uzay mekiğinin en son parçası.)' ]
            : [ '<32>{#p/basic}* \"Eski Uzay Elbisesi\" 20 CAN iyileştirir\n* Kaza yaptığın mekikle birlikte geldi.' ],
      name: 'Eski Uzay Elbisesi',
      use: [ '<33>{#p/human}* (Son iyileşme paketini kullanmanın ardından, Eski Uzay Elbisesi parçalara ayrılıyor.)' ]
   },
   i_spanner: {
      battle: {
         description: 'Paslı ve eski bir alet anahtarı.',
         name: 'Alet Anahtarı'
      },
      drop: [ '<32>{#p/human}* (Paslı Anahtar’ı attın.)' ],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? [ "<32>{#p/human}* (Galaksinin sınırlarının ötesinde dövülmüş güvenilir bir alet.)" ]
            : [ '<32>{#p/basic}* Paslı ve eski bir alet anahtarı.' ],
      name: 'Paslı Anahtar',
      use: () => [
         ...(battler.active && battler.alive[0].opponent.metadata.reactSpanner
            ? []
            : [ '<32>{#p/human}* (Alet anahtarını havaya salladın.)\n* (Hiçbir şey olmadı.)' ])
      ]
   },
   i_starbertA: {
      battle: {
         description: 'Sınırlı sayıdaki Süper Starwalker çizgi romanlarının ilk serisi.',
         name: 'Starwalker 1'
      },
      drop: [ '<32>{#p/human}* (Süper Starwalker 1’i attın.)' ],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? [ '<32>{#p/human}* (Bir yolculuğun başlangıcıymış gibi duruyor.)' ]
            : [ '<32>{#p/basic}* Sınırlı sayıdaki Süper Starwalker çizgi romanlarının ilk serisi.' ],
      name: 'Süper Starwalker 1',
      use: () => (battler.active ? [ '<32>{#p/human}* (Süper Starwalker 1’i okudun.)', '<32>* (Hiçbir şey olmadı.)' ] : [])
   },
   i_starbertB: {
      battle: {
         description: 'Sınırlı sayıdaki Süper Starwalker çizgi romanlarının ikinci serisi.',
         name: 'Starwalker 2'
      },
      drop: [ '<32>{#p/human}* (Süper Starwalker 2’yi attın.)' ],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? [ '<32>{#p/human}* (Bir yolculuğun ortasıymış gibi duruyor.)' ]
            : [ '<32>{#p/basic}* Sınırlı sayıdaki Süper Starwalker çizgi romanlarının ikinci serisi.' ],
      name: 'Süper Starwalker 2',
      use: () =>
         battler.active
            ? [
                 '<32>{#p/human}* (Süper Starwalker 2\'yi okudun.)',
                 ...(SAVE.data.b.stargum
                    ? [ '<32>* (Hiçbir şey olmadı.)' ]
                    : [
                         '<32>* (Çizgi romana bantlanmış bir sakız buldun.)',
                         choicer.create('* (Sakızı çiğne?)', 'Evet', 'Hayır')
                      ])
              ]
            : []
   },
   i_starbertC: {
      battle: {
         description: 'Sınırlı sayıdaki Süper Starwalker çizgi romanlarının üçüncü serisi.',
         name: 'Starwalker 3'
      },
      drop: [ '<32>{#p/human}* (Süper Starwalker 3\'ü attın.)' ],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? [ '<32>{#p/human}* (Bir yolculuğun sonuymuş gibi duruyor... yoksa başlangıcı mı?)' ]
            : [ '<32>{#p/basic}* Sınırlı sayıdaki Süper Starwalker çizgi romanlarının üçüncü serisi.' ],
      name: 'Süper Starwalker 3',
      use: () => (battler.active ? [ '<32>{#p/human}* (Süper Starwalker 3\'ü okudun.)', '<32>* (Hiçbir şey olmadı.)' ] : [])
   },
   i_steak: {
      battle: {
         description: 'En iyi ihtimalde bile şüpheli.',
         name: 'Biftek'
      },
      drop: () => [
         '<32>{#p/human}* (Cızırtılı Biftek\'i attın.)',
         ...(SAVE.data.b.svr || world.darker || SAVE.data.b.ufokinwotm8
            ? []
            : [ "<32>{#p/basic}* Neyse, onu özleyen olmayacak." ])
      ],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? [ '<32>{#p/human}* (14 CAN.)' ]
            : [ '<32>{#p/basic}* \"Cızırtılı Biftek\" 14 CAN iyileştirir\n* Şüpheli.' ],
      name: 'Cızırtılı Biftek',
      use: () => [
         '<32>{#p/human}* (Cızırtılı Biftek\'i yedin.)',
         ...(SAVE.data.b.svr || world.darker || SAVE.data.b.ufokinwotm8 ? [] : [ '<32>{#p/basic}* İğrenç!' ])
      ]
   },

   k_coffin: {
      name: 'Gizli Anahtar',
      description: () =>
         SAVE.data.b.w_state_secret
            ? 'Outlands\'deki gizli bir odaya erişmek için kullanılabilir.'
            : "Toriel'in odasındaki çorap çekmecesinden alındı."
   },

   c_call_toriel: <Partial<CosmosKeyed<CosmosProvider<string[]>, string>>>{
      w_start: [
         '<25>{#p/toriel}{#f/0}* Ah, elbette.\n* Orası senin kaza yaptığın yer olmalı.',
         '<25>{#f/0}* Buraya gelen diğer insanlar da oraya iniş yapmışlardı.',
         '<25>{#f/1}* Burada güç kalkanı ile ilgili bir şey olmalı...',
         '<25>{#f/0}* ... bu gelen araçların hep bu vektörde uçmasını sağlıyordur.'
      ],
      w_twinkly: () =>
         SAVE.data.b.toriel_twinkly
            ? [
                 '<25>{#p/toriel}{#f/1}* Orası seni ilk bulduğum yer mi?',
                 '<25>{#f/5}* Seni rahatsız eden o konuşan yıldız, bir süredir baş belası olmuştur.',
                 '<25>{#f/1}* Daha önce onunla konuşmaya çalıştım ama...',
                 '<25>{#f/9}* Çabalarım hiçbir zaman tamamıyla bir yere varamadı.'
              ]
            : [
                 '<25>{#p/toriel}{#f/1}* Orası seni ilk bulduğum yer mi?',
                 '<25>{#f/5}* Tamamen tek başına, yapayalnız bir şekilde...',
                 '<25>{#f/0}* Seni içeri almak için orada bulunmam iyi olmuş.'
              ],
      w_entrance: [
         '<25>{#p/toriel}{#f/1}* Outlands\'in girişi...',
         '<25>{#f/0}* Evet, buradan önceki alan aslında onun bir parçası değil.',
         '<25>{#f/5}* Orası daha çok... işaretlenmemiş bir kaza alanı.',
         '<25>{#f/1}* İlk insan doğrudan Outlands\'in İÇİNE çarptıktan sonra...',
         '<25>{#f/0}* Ayrı bir platformun eklenmesi kaçınılmazdı.'
      ],
      w_lobby: [
         '<25>{#p/toriel}{#f/0}* Bu odadaki bulmaca görselleştirme için iyi iş çıkarıyor.',
         '<25>{#f/1}* Ne de olsa, başka ne için kurardım ki?',
         '<25>{#f/5}* Ne yazık ki, insanların tümü bu niyetimi anlamamıştı.',
         '<25>{#f/3}* Biri doğrudan güvenlik kalkanına koşmayı bile denemişti...',
         '<25>{#f/0}* ... şifa büyüsü kullandığımı söylemek yeterli olacaktır.'
      ],
      w_tutorial: [
         '<25>{#p/toriel}* Favorim olan bulmaca bu değilse, ne olacağını bilmiyorum!',
         '<25>* İşbirliğini öğretme şekli en değerli gördüğüm yanıdır.',
         '<25>{#f/1}* Zira hayalim olan işim öğretmen olmak olduğu için...',
         '<25>{#f/0}* Hep böyle önemli dersleri aktarmanın yollarını arıyorum.'
      ],
      w_dummy: () => [
         '<25>{#p/toriel}{#f/1}* Eğitim odası mı...?',
         ...(SAVE.data.n.plot < 42
            ? [
                 [
                    '<25>{#f/0}* Hee hee, hala o dersi halletme şeklin ile gurur duyuyorum.',
                    '<25>{#f/1}* Arkadaşça bir sohbet başlatmak alternatifinden iyidir...',
                    '<25>{#f/0}* Elbette tek sebebi arkadaş edinmene yardımcı olması değil!'
                 ],
                 [],
                 [
                    '<25>{#f/5}* ...',
                    '<25>{#f/5}* Her ne kadar bu dersi senden istediğim şekilde ele almış olmasan da...',
                    '<25>{#f/0}* En azından çatışmadan kaçınmış oldun.',
                    '<25>{#f/0}* Alternatifleri göz önüne aldığımızda, bu... tercih edilebilir bir sonuçtu.'
                 ],
                 [
                    '<25>{#f/0}* ... hım.',
                    '<25>{#f/0}* Doğrusu, olanlara nasıl tepki vereceğimi hala bilmiyorum.',
                    '<25>{#f/1}* Ama izlemesinin büyüleyici olduğunu söylemeliyim...',
                    '<25>{#f/3}* Sadece ikiniz...\n* Öylece birbirinize bakıyordunuz...',
                    '<25>{#f/4}* ...'
                 ],
                 [
                    '<25>{#f/1}* Olanları beklediğimi söyleyemem ama...',
                    '<25>{#f/0}* Yine de sevimliydi.',
                    '<25>{#f/0}* Şaşırtıcı bir şekilde, bu yaklaşımı deneyen ilk insan sendin.',
                    '<25>{#f/1}* Öyle ki, geriye dönüp bakınca çok bariz bir çözüm gibi görünüyor...'
                 ],
                 [],
                 [
                    '<25>{#f/5}* ...',
                    '<25>{#f/7}* ...',
                    '<25>{#f/8}* Hahaha!\n* Ah, gülmeden edemiyorum!',
                    '<25>{#f/6}* Çekinmeden öylece flört etmeyi seçmen...',
                    '<25>{#f/1}* Beni kesinlikle şaşırttı!',
                    '<25>{#f/0}* Dinle beni, çocuğum.',
                    '<25>{#f/9}* Düşmanlarınla flört etmek her zaman ideal olmayabilir.',
                    '<25>{#f/10}* Ama, eğer bunu bir daha BU ŞEKİLDE yapabilirsen...',
                    '<25>{#f/0}* Bunun ile neler başarabileceğini kimse bilemez.'
                 ]
              ][SAVE.data.n.state_wastelands_dummy]
            : [
                 '<25>{#p/toriel}{#f/0}* Ah, evet, konusu açılmış iken...',
                 '<25>{#p/toriel}{#f/0}* Yakın zamanda bu mankenin içinde bir hayaletin saklandığını keşfettim.',
                 '<25>{#p/toriel}{#f/1}* Hakkında rahatsız olduğu bir şey varmış gibi görünüyordu, ama...',
                 '<25>{#p/toriel}{#f/0}* Ufak bir konuşmadan sonra onun sakinleşmesine yardımcı oldum.',
                 '<25>{#p/toriel}{#f/1}* Hmm... Acaba Lurksalot şimdi nerede?'
              ])
      ],
      w_coffin: [
         '<25>{#p/toriel}{#f/5}* ...',
         '<25>{#f/5}* Böyle zamanlarda saygı göstermemiz önemlidir.',
         '<25>{#f/10}* ... beni anlıyor musun?',
         '<25>{#f/9}* Bu bulmacalardan veya çatışmalardan daha önemli bir derstir.'
      ],
      w_danger: () =>
         SAVE.data.n.state_wastelands_froggit === 3
            ? [
                 '<25>{#p/toriel}{#f/1}* O odadaki terminalde bulunan bilmece...',
                 '<25>{#f/0}* Eski bir Dünya efsanesinde bulduğum bir şeye dayanıyordu.',
                 '<25>{#f/1}* İçerdiği şeyler arasında bir dizi karmaşık bulmaca vardı...',
                 '<25>{#f/0}* Bir de belirli bir aldatıcı hamur işi yer alıyordu.',
                 SAVE.data.b.w_state_riddleskip
                    ? '<25>{#f/5}* Bunu çözmeyi reddetmen çok yazık oldu.'
                    : '<25>{#f/0}* Bunu çözdüğünü görmek oldukça memnun ediciydi.'
              ]
            : [
                 '<25>{#p/toriel}{#f/1}* Outlands\'in gözetmeni olarak görev edindiğim bir şey...',
                 '<25>{#f/0}* Diğer canavarların sana saldırmasını engellemektir.',
                 '<25>{#f/0}* Bu konuda hem onlar hem de ben ortak bir anlayışa sahibiz.',
                 '<25>{#f/0}* İşte bu yüzden Froggit doğrudan ayrılmıştı.'
              ],
      w_zigzag: [
         '<25>{#p/toriel}{#f/1}* Bu odayı bu kadar uzun ve rüzgarlı yapma fikrim...',
         '<25>{#f/0}* ... düz bir odanın çok sıkıcı olacağını düşünmemdi.',
         '<25>{#f/1}* Sonuçta, kim tüm hayatı boyunca düz bir yolda yürümek ister ki?',
         '<25>{#f/0}* Biraz değişiklik oldukça hoş olacaktır.'
      ],
      w_froggit: [
         '<25>{#p/toriel}* Bu odadan itibaren etrafta daha fazla canavar bulunabilir.',
         '<25>{#f/0}* Burada sık sık \"takılmayı\" severler.\n* Hoş, öyle değil mi?',
         '<25>{#f/1}* Yakın zamana kadar sessiz bir yerdi burası, ta ki...',
         '<25>{#f/0}* Bir canavar diğerlerine nasıl flört edileceğini öğretene kadar.',
         '<25>{#f/0}* Bu yeni unsur toplumsal atmosferi büyük ölçüde değiştirdi.'
      ],
      w_candy: () => [
         SAVE.data.n.state_wastelands_candy < 4
            ? '<25>{#p/toriel}{#f/1}* Otomat henüz bozulmadı mı?'
            : '<25>{#p/toriel}{#f/1}* Ah canım, otomat yeniden mi bozuldu?',
         '<25>{#f/5}* Bu olay sayısını hatırlayamayacağım kadar çok kez yaşandı.',
         '<25>{#f/3}* Otomatın olumlu tarafı, güç tasarrufu sağlıyor olması...',
         '<25>{#f/0}* ... yani belki durumu o kadar da kötü değildir.'
      ],
      w_puzzle1: [
         '<25>{#p/toriel}{#f/1}* Bulmacayı tekrar deneme sürecini kolaylaştırmak için...',
         '<25>{#f/0}* Seni en başına geri döndürecek bir sistem kurdum.',
         '<25>{#f/5}* Bunu kurmamı sağlayan bilimci artık aramızda değil...',
         '<25>{#f/0}* Ama onun çıkardığı iş her geçen gün faydalı olmaya devam ediyor.'
      ],
      w_puzzle2: [
         '<25>{#p/toriel}{#f/1}* Ah, burada son derece özgün bir bulmaca mevcut.',
         '<25>{#f/0}* Ezberden çok sabrı sınayan bir tür.',
         '<25>{#f/1}* Çoğu zaman diğer insanlar bundan şikayetçiydi...',
         '<25>{#f/0}* Ama aralarından birisi sağladığı değeri takdir ediyordu.'
      ],
      w_puzzle3: [
         '<25>{#p/toriel}{#f/1}* Bu bulmacada işine yarayabilecek küçük bir ipucu...',
         '<25>{#f/0}* Sıra gösterilirken bile hareket etmeye başlayabiliyor olman.',
         '<25>{#f/5}* ... Sanırım bu noktada sana pek bir faydası olmayacak.',
         '<25>{#f/1}* Ama, eğer herhangi bir sebepten ötürü tekrar çözmen gerekir ise...',
         '<25>{#f/0}* Az önce verdiğim tavsiyeyi deneyebilirsin.'
      ],
      w_puzzle4: [
         '<25>{#p/toriel}{#f/1}* Dikkatimi çeken bir şey var ki, son zamanlarda...',
         '<25>{#f/0}* Yayından kalkmış çizgi roman serisinin eski baskıları satılıyor.',
         '<25>{#f/0}* Belki sıkıldıysan bir tane satın alabilirsin.',
         '<25>{#f/0}* Senin yaşındaki çocuklar bu tür şeylere oldukça düşkündür!'
      ],
      w_mouse: [
         '<25>{#p/toriel}{#f/1}* İlke gereği önemli bulduğum bir şey var ise...',
         '<25>{#f/0}* Bu, durup dinlenmeye yönelik bir odanın tahsis edilmesidir.',
         '<25>{#f/0}* Hayatımda bu tür molaların faydalı olduğunu sıkça görüyorum.',
         '<25>{#f/1}* Burada yaşayan Stærmayt kesinlikle aynı fikirde olacaktır...'
      ],
      w_blooky: () =>
         SAVE.data.b.killed_mettaton
            ? [
                 '<25>{#p/toriel}{#f/1}* Buraya sık sık gelen o hayalet, sebebi her ne ise...',
                 '<25>{#f/5}* Son zamanlarda her zamankinden daha kötü hissediyor kendini.',
                 '<25>{#f/1}* Nedenini sormaya çalıştım ama söylememekte ısrarlıydı...',
                 '<25>{#f/5}* ... O zamandan beri onu bir daha görmedim.'
              ]
            : !SAVE.data.b.a_state_hapstablook || SAVE.data.n.plot < 68
            ? [
                 '<25>{#p/toriel}{#f/0}* Önceden beni arayan o hayalet genellikle bu bölgede bulunuyor.',
                 ...(SAVE.data.b.napsta_performance
                    ? [ '<25>{#f/1}* Gösterdiği performansından sonra daha mutlu olacağını düşünmüştüm...' ]
                    : [ '<25>{#f/1}* Geçmişte onun ruhunu canlandırmaya çalıştım...' ]),
                 '<25>{#f/5}* Ancak sıkıntılarının çözümü o kadar kolay olmayabilir.',
                 '<25>{#f/1}* Keşke onu neyin üzmekte olduğunu bilseydim...'
              ]
            : [
                 '<25>{#p/toriel}{#f/1}* Buraya sık sık gelen o hayalet, sebebi her ne ise...',
                 '<25>{#f/0}* Son zamanlarda çok daha iyi hissediyor kendini.',
                 '<25>{#f/0}* Hatta bunu bana kendisi söylemek için evime bile geldi.',
                 '<25>{#f/1}* Görünüşe göre bu işte senin parmağın var...?',
                 '<25>{#f/0}* Peki öyleyse.\n* Seninle gurur duyuyorum çocuğum.'
              ],
      w_party: [
         '<25>{#p/toriel}{#f/0}* Aktivite odası.\n* Orada gösterilere ev sahipliği yapıyoruz.',
         '<25>{#f/0}* Drama, dans geceleri...\n* Ve en önemlisi, sanatlar.',
         '<25>{#f/0}* Diğerlerinin kendilerini ifade ettiklerini görmek iyidir.',
         '<25>{#f/1}* Bir kere tam o odada bir komedi gösterisine katılmıştım.',
         '<25>{#f/0}* Hayatımda hiç bu kadar çok gülmemiştim!'
      ],
      w_pacing: () => [
         SAVE.data.b.toriel_twinkly
            ? '<25>{#p/toriel}{#f/0}* Duydum ki birisi o konuşan yıldız ile \"arkadaş\" olmuş.'
            : '<25>{#p/toriel}{#f/0}* Duydum ki birisi bir konuşan yıldız ile \"arkadaş\" olmuş.',
         '<25>{#f/1}* Froggit\'lerden birisi, sanıyorum ki...?',
         "<25>{#f/1}* O canavarların güvenliği için endişeleniyorum demek...",
         '<25>{#f/5}* Çok hafif kalan bir ifade olurdu.'
      ],
      w_junction: [
         '<25>{#p/toriel}{#f/1}* Kesişme odası...',
         '<25>{#f/0}* Geçmişte, burada bir tür topluluk alanı planlamıştık.',
         '<25>{#f/0}* Outlands\'e gelen ziyaretçiler sıcak karşılanırlardı.',
         '<25>{#f/1}* Ama zamanla pek fazla bireyin gelmeyeceğini fark ettik...',
         '<25>{#f/0}* Ve böylece, tasarım bugün gördüğün haline getirildi.',
         '<25>{#f/5}* Biraz sıkıcı, ama sanıyorum ki her oda ihtişamlı olamaz...'
      ],
      w_annex: [
         '<25>{#p/toriel}* Buradan çok önemli bir taksi durağına ulaşılabilir.',
         '<25>{#f/1}* Sadece karakolun diğer alanlarına değil...',
         '<25>{#f/0}* Outlands\'in diğer alt bölümlerine de erişim mümkündür.',
         '<25>{#f/1}* Ancak, henüz küçük bir çocuk olmana bakılırsa...',
         '<25>{#f/5}* Sürücünün sana bu seçeneği sunması pek olası değildir.',
         '<25>{#f/0}* Oradaki dükkan ve işletmeler yetişkinlere yönelik.'
      ],
      w_wonder: () => [
         '<25>{#p/toriel}{#f/1}* Yaptığım alışverişten dönerken beni küçük bir mantar karşıladı...',
         SAVE.data.b.snail_pie
            ? '<25>{#f/0}* ... o salyangozlu turta için gerekli malzemeler ile dönüyordum.'
            : '<25>{#f/0}* ... o karamelli turta için gerekli malzemeler ile dönüyordum.',
         '<25>{#f/3}* İlginçtir ki, kapı girişinin yukarısında süzülüyordu...',
         '<25>{#f/0}* O odadaki yer çekimi zayıf olmalı.',
         '<25>{#f/1}* Belki taksinin varlığının bir etkisi vardır...?'
      ],
      w_courtyard: [
         '<25>{#p/toriel}{#f/0}* Ah.\n* Avlu.',
         '<25>{#f/1}* Senin gibi çocukların oynayacağı bir yer olma açısından...',
         '<25>{#f/5}* Biraz eksiklikleri var.',
         '<25>{#f/1}* Buraya gelen her bir insan ile bunu düzeltmeyi düşündüm...',
         '<25>{#f/5}* Ama onlar hep ben fırsat bulamadan buradan ayrıldılar.'
      ],
      w_alley1: [
         '<25>{#p/toriel}{#f/9}* ... sana ayrılman konusunda ders verdiğim oda.',
         '<25>{#f/5}* Düşündüm ki, eğer güç kalkanı hakkında konuşursam...',
         '<25>{#f/5}* Seni burada kalmaya ikna edebilirim.',
         '<25>{#f/1}* ... Diğer insanlara da aynısını söylediğimi hatırlıyorum, ama...',
         '<25>{#f/5}* Onlar için de ancak sende olduğu kadar etkili olmuştu.'
      ],
      w_alley2: [
         '<25>{#p/toriel}{#f/9}* ... seni bekleyen tehlikeler konusunda uyardığım oda.',
         '<25>{#f/5} Buna yönelik inançlarımın yanlış olduğu söylendi, ama...',
         '<25>{#f/5}* Bu riski almanın akıllıca olmadığını düşündüm.',
         '<25>{#f/9}* ... belki de bakış açımı gözden geçirme zamanım gelmiştir.'
      ],
      w_alley3: [
         '<25>{#p/toriel}{#f/9}* ... Burada sana karşı davranışımdan dolayı gerçekten pişmanım.',
         '<25>{#f/5}* Seni kalmaya zorlamaya çalışmam yanlıştı...',
         '<25>{#f/5}* Yalnızca kendi ahmakça arzularım doğrultusunda hareket ediyordum.',
         '<25>{#f/1}* Ama beni çoktan affettiğine eminim...',
         '<25>{#f/5}* Bunu hak edip etmediğime bakmaksızın...'
      ],
      w_alley4: () =>
         SAVE.data.b.w_state_fightroom
            ? [
                 '<32>{#s/phone}{#p/event}* Aranıyor...',
                 '<25>{#p/toriel}{#f/1}* O oda bizim için pek iyi duygular çağrıştırmasa da...',
                 '<25>{#f/0}* Hala Outlands\'deki en sevdiğim yerlerden biridir.',
                 '<25>{#f/1}* Burada zaman zaman ziyarete gelen biri var...',
                 '<25>{#f/6}* Belki de ondan çoktan haberdarsındır.',
                 '<32>{#s/equip}{#p/event}* Klik...'
              ]
            : instance('main', 'toriButNotGarb') === void 0 // NO-TRANSLATE

            ? [
                 '<32>{#s/phone}{#p/event}* Aranıyor...',
                 '<25>{#p/toriel}{#f/1}* Bu kadar erken mi arıyorsun...?',
                 '<25>{#f/0}* ... Henüz eve bile dönmedim!',
                 '<25>{#f/0}* Lütfen, tekrar aramadan önce biraz bekle.',
                 '<32>{#s/equip}{#p/event}* Klik...'
              ]
            : [
                 '<32>{#w.stopThatGoat}{#s/phone}{#p/event}* Aranıyor...',
                 '<25>{#p/toriel}{#f/1}* Bu kadar erken mi arıyorsun...?',
                 '<25>{#f/0}* ... Henüz odadan bile çıkmadım!',
                 '<25>{#f/2}* Biraz nefes alacak zaman iyi olurdu!',
                 '<32>{#w.startThatGoat}{#s/equip}{#p/event}* Klik...'
              ],
      w_bridge: [
         '<25>{#p/toriel}{#f/1}* Karakolun geri kalanına giden köprü...',
         '<25>{#f/5}* Onu neredeyse yok ettiğimi düşünmek utanç verici.',
         '<25>{#f/0}* Elbette, taksi hala buralarda olurdu.',
         '<25>{#f/3}* Ama onun yeterince güvenilir olacağından şüpheliyim.',
         '<25>{#f/1}* Bu köprünün hala yerinde olduğuna sevinelim.'
      ],
      w_exit: () =>
         SAVE.data.n.plot < 16
            ? [
                 '<25>{#p/toriel}{#f/1}* Çocuğum, eğer Outlands\'i terk ediyorsan...',
                 '<25>{#f/0}* Bu durumda... Senden bir şeyi hatırlamanı istiyorum.',
                 '<25>{#f/1}* Ne olursa olsun, önü ne kadar zor görünürse görünsün...',
                 '<25>{#f/0}* Sana olan inancımı bilmeni istiyorum.',
                 '<25>{#f/0}* Doğru olan şeyi yapabileceğini biliyorum.',
                 '<25>{#f/1}* Bunu hatırla, tamam mı?'
              ]
            : SAVE.data.n.plot < 17.001
            ? [
                 '<25>{#p/toriel}{#f/1}* Outlands\'e bu kadar erken mi dönüyorsun...?',
                 '<25>{#f/0}* Yani.\n* Buna karşı olduğumu söyleyemem.',
                 '<25>{#f/1}* İstediğin zaman ayrılabilirsin, tabii ki...',
                 '<25>{#f/0}* Ama şu an için seni görmek güzel.'
              ]
            : [
                 '<25>{#p/toriel}{#f/2}* Ne kadar süredir orada duruyorsun!?',
                 '<25>{#f/1}* Bu kadar yolu sırf beni aramak için mi geri geldin?',
                 '<25>{#f/0}* ... seni şapşal çocuk.',
                 '<25>{#f/0}* Eğer aramak istersen, bu kadar geriye dönmeye gerek yok.'
              ],
      w_toriel_front: [
         '<25>{#p/toriel}{#f/1}* Bu evin başka bir evin yeniden yapımı olduğunu biliyor muydun?',
         '<25>{#f/1}* Geçmişte Hisar\'da yaşıyordum...',
         '<25>{#f/0}* Tam da buna benzeyen bir evin içinde.',
         '<25>{#f/5}* Zaman zaman aslında orada olmadığımı unutuyorum...'
      ],
      w_toriel_hallway: [
         '<25>{#p/toriel}{#f/0}* Koridor hakkında söylenecek çok fazla şey yok.',
         '<26>{#f/1}* Ama eğer istersen aynaya bir bakabilirsin...',
         '<25>{#f/0}* Öz değerlendirmenin güçlü olabileceğini duyuyorum.'
      ],
      w_toriel_asriel: [
         '<25>{#p/toriel}{#f/0}* Ah, bu senin odan!',
         '<25>{#f/5}* Senin... odan...',
         '<25>{#f/9}* ...',
         '<25>{#f/5}* Belki de artık öyle değildir.',
         '<25>{#f/1}* ...',
         '<25>{#f/1}* Aslında, bu kararı sana bırakıyorum...',
         '<25>{#f/0}* Hala dilediğin zaman burada dinlenebilirsin.'
      ],
      w_toriel_toriel: [
         '<25>{#p/toriel}{#f/0}* Demek odama denk geldin.',
         '<25>{#f/0}* Dilersen, kitaplığımdan bir kitap okuyabilirsin.',
         '<25>{#f/0}* Ama, lütfen, yerine geri koymayı unutma.',
         "<25>{#f/23}* Ve o çorap çekmecesini sakın açma!"
      ],
      w_toriel_living: () =>
         toriCheck()
            ? [ '<25>{#p/toriel}{#f/3}* Beni tam buradayken aramana gerek yok, ufaklık.' ]
            : [
                 '<25>{#p/toriel}{#f/1}* Salonu mu keşfediyoruz?',
                 '<25>{#f/0}* Söyle bakalım.\n* Henüz kitapların hepsini okudun mu?',
                 '<25>{#f/1}* Sana salyangoz bilgileri kitabını okumayı düşündüm...',
                 '<25>{#f/0}* Ama senin için biraz fazla tekrara düşebilir diye vazgeçtim.'
              ],
      w_toriel_kitchen: [
         '<25>{#p/toriel}{#f/1}* Mutfak...?',
         '<25>{#f/0}* Senin için buzdolabında bir çikolata bıraktım.',
         '<25>{#f/0}* Duyduğuma göre... insanların eski bir favorisiymiş.',
         '<25>{#f/1}* Umarım beğenirsin...'
      ],
      s_start: () =>
         SAVE.data.n.plot < 17.001
            ? [
                 '<25>{#p/toriel}{#f/0}* Eğer doğruysam, bir arkadaşım ileride olmalı.',
                 '<26>{#f/0}* Korkma, küçüğüm.',
                 '<25>{#f/1}* İlerlemeye devam et...'
              ]
            : [
                 '<25>{#p/toriel}{#f/1}* Hatırladığım kadarıyla, bu uzun oda...',
                 '<26>{#f/0}* ... Starton\'un eteklerindeki bir kasabanın temelini oluşturmuş olacaktı.',
                 '<25>{#f/0}* Elbette, bu hiçbir zaman gerçekleşmedi.',
                 '<25>{#f/2}* Bir kasaba fazlasıyla yeterliydi!'
              ],
      s_sans: () =>
         SAVE.data.n.plot < 17.001
            ? [
                 '<25>{#p/toriel}{#f/0}* Eğer doğruysam, bir arkadaşım ileride olmalı.',
                 '<26>{#f/0}* Korkma, küçüğüm.',
                 '<25>{#f/1}* İlerlemeye devam et...'
              ]
            : [
                 '<25>{#p/toriel}{#f/1}* I presume by now you have heard of the \"gravometric inverter?\"',
                 '<26>{#f/0}* Sans\'in bana hakkında pek çok şey anlattığı bir cihaz bu.',
                 '<25>{#f/1}* Meğer orada bambaşka bir dünya varmış...',
                 '<25>{#f/0}* Öyle bir yer ki, her şey her zaman doğru yöne bakmıyormuş.'
              ],
      s_crossroads: [
         '<25>{#p/toriel}{#f/1}* Bu eski iniş pisti bir zamanlar hareketli bir kavşaktı...',
         '<25>{#f/1}* Gelip giden erzak gemileri...',
         '<25>{#f/1}* Sırada her ne inşa edilecekse yardım etmeye hazırlardı...',
         '<25>{#f/5}* Karakolun genişlemesinin durmuş gibi görünüyor olması üzücü.',
         '<25>{#f/0}* Bir süre için, yeni alanlar inşa etmek kültürümüzü tanımlıyordu!'
      ],
      s_human: [
         "<25>{#p/toriel}* Sans'ın kardeşinin Kraliyet Muhafızına katılmak istediğini duydum.",
         '<25>{#f/1}* Ne kadar da istekli bir genç iskelet...',
         '<25>{#f/0}* Muhafızlara karşı hislerime rağmen, onun hayal etmesi güzel bir şey.',
         '<25>{#f/5}* Son zamanlarda çok fazla kişinin hayallerinden vazgeçtiğinden endişeleniyorum...',
         '<25>{#f/0}* Ama o değil!\n* O iskelet kendisi için en iyisini biliyor.'
      ],
      s_papyrus: [
         '<25>{#p/toriel}* Sans told me all about the gadgets Papyrus added to his station.',
         '<25>{#f/1}* İlk olarak, görevine \"sarkabilmesi\" için bir tutacak...',
         '<25>{#f/1}* Yıldızlar üzerinde \"düzeltme\" yapmak için kullanılan sözde bir \"gökyüzü anahtarı...\"',
         '<25>{#f/0}* Ve birçok sorumluluğunu takip edebilmesi için bir ekran bağlantısı.',
         '<25>{#f/6}* Bu tür icatlara bakınca onun bir laboratuvarda çalıştığını sanırsın.'
      ],
      s_doggo: [
         '<25>{#p/toriel}{#f/5}* Kraliyet Muhafızları sana çok sorun çıkarıyor mu?',
         '<25>{#f/0}* Sans, olası karşılaşmalar konusunda seni uyaracağını söylemişti.',
         '<25>{#f/1}* ...',
         '<25>{#f/1}* Belki de daha fazla endişeli olmalıyım, ama...',
         '<25>{#f/0}* Bir şeyler bana iyi olacağını söylüyor.',
         '<25>{#f/0}* O iskeletin sana göz kulak olacağına inanıyorum.'
      ],
      s_robot: [
         '<25>{#p/toriel}{#f/1}* Ah, ne hoş bir ses...',
         '<25>{#f/0}* Bir inşaatçı botunu her yerde tanırım.',
         '<25>{#f/5}* Yapay zeka programları yasaklandıktan sonra, çoğu devre dışı kaldı...',
         '<25>{#f/1}* But the two whose sentience did not corrupt them...',
         '<25>{#f/0}* Were allowed a more graceful retirement.',
         '<25>{#f/0}* Bunların günümüze kadar ulaşabilmiş olduğunu bilmek güzel.'
      ],
      s_maze: [
         "<25>{#p/toriel}* Sans bana kardeşinin bulmacalara olan düşkünlüğünden bahsetti.",
         '<25>{#f/1}* Hatta duyduğuma göre kendi oluşturduğu birkaç tanesi bile varmış...?',
         '<25>{#f/0}* I am most curious about the \"wall of fire.\"',
         '<25>{#f/1}* Alevler sıcak mı?\n* Yoksa sadece hoşça ılık mı?',
         '<25>{#f/5}* Senin iyiliğin için, ikincisinin doğru olmasını umarım.'
      ],
      s_dogs: [
         '<25>{#p/toriel}{#f/1}* Kraliyet Muhafızlarında evli bir köpek çiftin görev aldığını duydum.',
         '<25>{#f/3}* Aynı anda kraliyet muhafızıyken evli olmak...',
         '<25>{#f/4}* Bu ilişkinin bazı \"ilginç\" motivasyonları olmalı.',
         '<25>{#f/6}* Ama ben ne anlarım ki.\n* Sans\'in dediği gibi, ben sadece bir \"keçiyim!\"'
      ],
      s_lesser: [
         '<25>{#p/toriel}* Bu günlerde Starton\'da ne tür yiyeceklerin satıldığını merak ediyorum.',
         '<25>{#f/1}* Ben en son buradayken, herkes hayalet meyvesi yemeyi severdi...',
         '<25>{#f/0}* Hem hayalet hem de hayalet olmayanların yiyebildiği garip bir yiyecek.',
         '<26>{#f/0}* Şu anki favori her ne ise, eminim onu asla düşleyemezdim.'
      ],
      s_bros: [
         "<25>{#p/toriel}{#f/1}* Sans'in fark-bulma bulmacalarına olan düşkünlüğü...",
         '<25>{#f/0}* Yani, bana hiç mantıklı gelmedi.',
         '<25>{#f/1}* Bu kadar basit bir bulmaca ona nasıl cazip gelebilir?',
         '<26>{#f/3}* ... spesifik olmak gerekirse...',
         '<25>{#f/1}* Bu tür bir bulmacanın içinde mizah nerede?'
      ],
      s_spaghetti: [
         "<25>{#p/toriel}* Sans, Papyrus'un spagetti yemeklerine olan ilgisinden bahsetmişti.",
         '<25>{#f/6}* But why stop there?\n* Just imagine the PASTABILITIES...',
         '<25>{#f/8}* Rigatoni!\n* Fettuccine!\n* Acini di Pepe!',
         '<25>{#f/0}* Some variety could really help him go FARFALLE.',
         '<25>{#f/2}* ... in other words, go BIGOLI or go home!'
      ],
      s_puzzle1: [
         '<25>{#p/toriel}{#f/1}* Starton\'daki bulmacalar her nasılsa, eminim ki...',
         '<25>{#f/0}* Benim ayrıldığım zamanki olanlara hiç benzemiyorlardır.',
         '<25>{#f/5}* Gerçek dışı zorluklarını düşününce...',
         '<25>{#f/5}* Onları birilerinin çözebilmiş olması bile şaşırtıcı.'
      ],
      s_puzzle2: [
         '<25>{#p/toriel}{#f/1}* Bazı bulmacaları çözmenin gizli yolları olduğunu söylerler...',
         '<25>{#f/0}* ... bu tamamen akıl almaz bulduğum bir ifade!',
         '<25>{#f/0}* Gizli bir çözümün olması bulmacanın tüm amacını boşa çıkarır.',
         '<25>{#f/1}* Bulmacalar, en azından gerçekçi zorlukta olanlar...',
         '<25>{#f/2}* Yalnızca amaçlanan şekilde çözülmelidir!'
      ],
      s_jenga: [
         '<25>{#p/toriel}* Bildiğim kadarıyla, Dr. Alphys şu anki kraliyet bilimcisi.',
         '<25>{#f/1}* Selefinin deneyiminin yerini asla tutamayabilir, ama...',
         '<25>{#f/0}* Kendi yolunu bulabilecek kapasitede olduğundan oldukça eminim.',
         '<25>{#f/0}* Bu seni şaşırtabilir, ama bilimcilere karşı belli bir saygım var.',
         '<25>{#f/2}* Ne kadar da parlak zekalar!'
      ],
      s_pacing: [
         '<25>{#p/toriel}{#f/1}* Şüpheli duran satış elemanlarından uzak durman akıllıca olacaktır...',
         '<25>{#f/0}* Onların dizginleri nasıl ellerine alacağını asla bilemezsin.',
         '<25>{#f/0}* Ya da kucağına ne tür ay taşların düşebileceğini.',
         '<25>{#f/3}* Bu, ne yazık ki zor yoldan öğrendiğim bir derstir...'
      ],
      s_puzzle3: [
         '<25>{#p/toriel}{#f/1}* Bu odadaki bulmaca bir hafıza bulmacası, öyle değil mi?',
         '<25>{#f/1}* Sans, kardeşinin düzeni sık sık güncellediğinden bahsetti...',
         '<25>{#f/0}* ... böylece güçlü bir \"döngüsel şifreyi\" koruyabilirmiş.',
         '<25>{#f/6}* Ne komik!',
         '<25>{#f/0}* Outlands\'de, hafıza bulmacalarımız talep üzerine güncellenir.'
      ],
      s_greater: [
         '<25>{#p/toriel}{#f/1}* O köpek kulübesinin eski sahibi, Canis Maximus...',
         '<25>{#f/0}* ... uzun zaman önce muhafızlıktan emekli olmuştu.',
         '<25>{#f/7}* Neyse ki, yeni sahibinin köpek yavrusu gibi enerjik olduğu söyleniyor!',
         '<25>{#f/0}* Açıkça, böyle bilge bir ustadan çok iyi bir şekilde öğrenmiş.'
      ],
      s_math: [
         '<25>{#p/toriel}{#f/1}* Lütfen, birisi \"köpek adaletini\" açıklayabilir mi?',
         '<25>{#f/0}* Bu ara sıra duymaya devam ettiğim tuhaf bir ifade.',
         '<25>{#f/5}* Bazen Outlands\'i ziyaret eden küçük bir yavru köpeği biliyorum...',
         '<25>{#f/0}* Belki de adaleti hak eden odur.'
      ],
      s_bridge: [
         '<25>{#p/toriel}{#f/1}* Bu köprü ilk inşa edildiğinde...',
         "<25>{#f/0}* Tehlikeli yapısı karakolun sistemlerinin yükseltilmesine yol açtı.",
         '<25>{#f/0}* Kısa sürede, yerinde bir isimle \"yerçekimi korkulukları\" eklendi.',
         '<25>{#f/0}* Bunlar platformlardan düşmeni engelleyen şeylerdir.'
      ],
      s_town1: [
         '<25>{#p/toriel}{#f/0}* Ah...\n* Starton\'un kasabası.',
         '<25>{#f/1}* Oradaki bir \"Grillby\'nin Yeri\" hakkında çok şey duydum...',
         '<25>{#f/0}* ... ve hem yeni hem eski, çok çeşitli müşterilere sahipmiş.',
         '<25>{#f/0}* Sans sık sık oraya yemek yemeye gidiyor, anlarsın.',
         '<25>{#f/7}* Barmenin oldukça \"ateşli\" olduğunu duydum.'
      ],
      s_taxi: [
         '<25>{#p/toriel}{#f/1}* Kasabanın yanında bir taksi durağı mı?',
         '<25>{#f/1}* ... hımm...',
         '<25>{#f/0}* Acaba Outlands\'dekinden farklı mı, merak ediyorum.',
         '<25>{#f/1}* Elbette, bunu görmeden bilmemin imkanı olmazdı...',
         '<25>{#f/0}* Bunu lüks bir teleskop olmadan yapmamın bir yolu yok.',
         '<25>{#f/0}* Onlardan birini nereden bulabilirim, merak ediyorum.'
      ],
      s_town2: [
         '<25>{#p/toriel}{#f/1}* Napstablook yakın bir zamanda bana bir dükkan açtığından bahsetti.',
         '<25>{#f/5}* ... kasabanın \"güney tarafında.\"',
         '<25>{#f/1}* Bu ne anlama geliyor olabilir?',
         '<25>{#f/0}* Organize ettiğimi hatırladığım kasaba, büyük ve birleşik bir meydandı.',
         '<25>{#f/1}* Belki de bir noktada bir ayrışma olmuştur?',
         '<25>{#f/5}* Orijinal görünüşü düşününce, bu çok yazık olurdu...'
      ],
      s_battle: [
         '<25>{#p/toriel}{#f/1}* Sans\'in beni en çok uyarmak istediği şey...',
         '<25>{#f/0}* Kardeşinin sözde \"özel saldırısıydı.\"',
         '<25>{#f/1}* Eğer Papyrus seninle karşılaşmayı seçerse, mutlaka kaçınmalısın.',
         '<25>{#f/2}* Tekrar ediyorum, özel saldırıdan kaçın!\n* Ne pahasına olursa olsun!',
         '<25>{#f/0}* Bu konuda söyleyeceklerim bu kadar.'
      ],
      s_exit: [
         '<25>{#p/toriel}{#f/1}* Eğer Starton\'dan ayrılmaya karar verirsen, şunu anlamalısın...',
         '<25>{#f/5}* Benim telefonum eski, ve fabrikanın yalnızca belirli odalarına erişebiliyor.',
         '<25>{#f/9}* Çıkış yolunu bulana kadar beni araman zor olacaktır.',
         '<25>{#f/1}* Beni affet.\n* Sadece sana haber vermem gerektiğini düşündüm.'
      ],
      f_entrance: [
         '<25>{#p/toriel}{#f/7}* Demek fabrikada iyi sinyal alan bir yer buldun...?',
         '<25>{#f/1}* ... kapalı olmayan bir alanda bulunuyor olmalısın...',
         '<25>{#f/0}* Which also implies the nearby presence of synth-bushes.',
         '<25>{#f/3}* Those things are terrible to get stuck in...',
         '<25>{#f/4}* Getting you all itchy and scratchy...',
         '<25>{#f/0}* Fortunately, I know you are smart enough not to run into them.'
      ],
      f_bird: () =>
         SAVE.data.n.plot !== 47.2 && SAVE.data.n.plot > 42 && SAVE.data.s.state_foundry_deathroom !== 'f_bird' // NO-TRANSLATE

            ? [
                 '<25>{#p/toriel}{#f/0}* O korkusuz küçük kuşun cıvıltısına benzeyen hiçbir şey yok.',
                 '<25>{#f/1}* Bir kova suyun içinde yaşadığı zamanlarda bile...',
                 '<25>{#f/1}* O küçük kudretli kanatlarını uçururdu...',
                 '<25>{#f/1}* Bizi bir yerlere götürürdü...',
                 '<25>{#f/0}* Market alışverişlerimi taşımak için sık sık bu hizmeti kullanıyordum.',
                 '<25>{#f/5}* ... o zamanlar biz tür olarak hepimiz o eski fabrikada yaşıyorduk.'
              ]
            : [
                 '<25>{#p/toriel}{#f/5}* Bulunduğun yerde her şey fazlasıyla sessiz gibi...',
                 '<25>{#f/5}* Sanki bir şey eksikmiş gibi.',
                 '<25>{#f/5}* Önemli bir şey...',
                 '<25>{#f/0}* Neyse, sorun değil.\n* Hayal gücüm bazen fazlasıyla çılgınlaşıyor.',
                 '<25>{#f/1}* ...',
                 '<25>{#f/1}* Cik, cik, cik, cik, cik...'
              ],
      f_taxi: [
         "<25>{#p/toriel}{#f/1}* Demek fabrikanın taksi durağını buldun...?",
         '<25>{#f/0}* Belki de o Kraliyet Muhafızı kaptanından kaçmak için kullanabilirsin.',
         '<25>{#f/1}* Buradaki bir ziyaretçi onun mızraklara olan tutkusundan bahsetmişti...',
         '<25>{#f/0}* Ne kadar da tuhaf.\n* Tanıdığım kaptan kılıç meraklısıydı.'
      ],
      f_battle: [
         '<25>{#p/toriel}{#f/0}* Ah, işte buradasın.',
         "<25>{#f/0}* Şu an orada fabrikanın kenarındasın.",
         '<26>{#f/1}* Bu noktadan sonra, seni neyin beklediğini bilmiyorum.',
         '<25>{#f/5}* Ben ayrılmadan önce, burada yalnızca Hisar\'a giden bir asansör vardı.',
         '<25>{#f/1}* Ancak, şimdi, \"Aerialis\" adı verilen bir alan var...',
         '<25>{#f/23}* ... Acaba bu ismi KİM buldu?'
      ],
      f_exit: toriel_aerialis,
      a_start: toriel_aerialis,
      a_path1: toriel_aerialis,
      a_path2: toriel_aerialis,
      a_path3: toriel_aerialis,
      a_rg1: toriel_aerialis,
      a_path4: toriel_aerialis,
      a_barricade1: toriel_aerialis,
      a_puzzle1: toriel_aerialis,
      a_mettaton1: toriel_aerialis,
      a_elevator1: toriel_aerialis,
      a_elevator2: toriel_aerialis,
      a_sans: toriel_aerialis,
      a_pacing: toriel_aerialis,
      a_prepuzzle: toriel_aerialis,
      a_puzzle2: toriel_aerialis,
      a_mettaton2: toriel_aerialis,
      a_rg2: toriel_aerialis,
      a_barricade2: toriel_aerialis,
      a_split: toriel_aerialis,
      a_offshoot1: toriel_aerialis,
      a_elevator3: toriel_aerialis,
      a_elevator4: toriel_aerialis,
      a_auditorium: toriel_aerialis,
      a_aftershow: toriel_aerialis,
      a_hub1: toriel_aerialis,
      a_hub2: toriel_aerialis,
      a_lookout: toriel_aerialis,
      a_hub3: toriel_aerialis,
      a_plaza: toriel_aerialis,
      a_elevator5: toriel_aerialis,
      a_hub4: toriel_aerialis,
      a_sleeping1: toriel_aerialis,
      a_hub5: toriel_aerialis
   },
   c_call_toriel_early: () =>
      game.room === 'w_bridge' || game.room.startsWith('w_alley') // NO-TRANSLATE

         ? [ '<25>{#p/toriel}{#f/3}* ...', '<25>{#f/2}* Hemen eve geri dön!' ]
         : [
              3 <= SAVE.data.n.cell_insult
                 ? '<25>{#p/toriel}{#f/23}* Bana olan tavırlarından sonra yorulmadın mı?'
                 : SAVE.data.n.state_wastelands_napstablook === 5
                 ? '<25>{#p/toriel}{#f/1}* Bu kadar uzun süre bekledikten sonra yorulmadın mı?'
                 : '<25>{#p/toriel}{#f/1}* Yaşadıklarından sonra yorulmadın mı?',
              3 <= SAVE.data.n.cell_insult
                 ? game.room.startsWith('w_toriel') // NO-TRANSLATE

                    ? '<25>{#f/0}* Belki de misafir odasında sana hazırladığım yatağı görmelisin.'
                    : '<25>{#f/0}* Belki de evde sana hazırladığım yatağı görmelisin.'
                 : game.room.startsWith('w_toriel') // NO-TRANSLATE

                 ? '<25>{#f/0}* Koridora gel, ve sana bir şey göstereceğim.'
                 : '<25>{#f/0}* Eve gel, ve sana bir şey göstereceğim.'
           ],
   c_call_toriel_late: () =>
      SAVE.data.n.plot === 8.1
         ? [ '<32>{#p/human}* (Ancak hat meşguldü.)' ]
         : game.room === 'w_bridge' || game.room.startsWith('w_alley') // NO-TRANSLATE

         ? [ '<25>{#p/toriel}{#f/3}* ...', '<25>{#f/2}* Hemen eve geri dön!' ]
         : [
              '<25>{#p/toriel}{#f/1}* Beni telefonda aramana gerek yok, çocuğum.',
              3 <= SAVE.data.n.cell_insult
                 ? '<26>{#f/23}* Bunun genellikle nereye vardığını zaten biliyoruz.'
                 : game.room === 'w_toriel_living' // NO-TRANSLATE

                 ? toriCheck()
                    ? '<25>{#f/0}* Ne de olsa, seninle aynı odadayım.'
                    : '<25>{#f/0}* Kısa bir süre içerisinde hazır olacağım.'
                 : game.room.startsWith('w_toriel') // NO-TRANSLATE

                 ? toriCheck()
                    ? '<25>{#f/0}* Beni görmek istiyorsan, salona gelebilirsin.'
                    : '<25>{#f/0}* Beni görmek istiyorsan, salonda bekleyebilirsin.'
                 : '<25>{#f/0}* Beni görmek istiyorsan, eve gelebilirsin.'
           ],
   c_call_asriel: () =>
      [
         [
            "<25>{#p/asriel2}{#f/3}* Bil diye söylüyorum, onu açmayacağım.",
            '<25>{#p/asriel2}{#f/4}* Yapacağımız daha önemli şeyler var.'
         ],
         [ '<25>{#p/asriel2}{#f/4}* ...' ],
         [ '<25>{#p/asriel2}{#f/4}* ... cidden mi?' ],
         [ '<25>{#p/asriel2}{#f/3}* Canın GERÇEKTEN sıkılmış olmalı.' ],
         []
      ][Math.min(SAVE.flag.n.ga_asrielCall++, 4)],
   s_save_outlands: {
      w_courtyard: {
         name: 'Outlands - Avlu',
         text: () =>
            SAVE.data.n.plot > 16
               ? [
                    6 <= world.population
                       ? '<32>{#p/human}* (Ziyaret ederken bile, bu küçük ev içini azimle dolduruyor.)'
                       : '<32>{#p/human}* (Ziyaret ederken bile, bu ev içini azimle dolduruyor.)'
                 ]
               : 6 <= world.population
               ? [ '<32>{#p/human}* (Bu küçük şirin ev içini azimle dolduruyor.)' ]
               : [ '<32>{#p/human}* (Metalik duvarların ortasındaki bir ev içini azimle dolduruyor.)' ]
      },
      w_entrance: {
         name: 'Outlands - Giriş',
         text: () =>
            world.runaway
               ? [
                    '<32>{#p/human}* (Endüstriyel Outlands sessizliğe bürünüyor ve içini azimle dolduruyor.)',
                    '<32>{#p/human}* (CANIN tamamen yenilendi.)'
                 ]
               : SAVE.data.n.plot < 48
               ? [
                    '<32>{#p/human}* (Endüstriyel Outlands önünde uzanıyor ve içini azimle dolduruyor.)',
                    '<32>{#p/human}* (CANIN tamamen yenilendi.)'
                 ]
               : [
                    '<32>{#p/human}* (Uzun bir aradan sonra, her şeyin başladığı yere dönmek...)',
                    '<32>{#p/human}* (işte bu içini azimle dolduruyor.)',
                    '<32>{#p/human}* (CANIN tamamen yenilendi.)'
                 ]
      },
      w_froggit: {
         name: 'Outlands - Dinlenme Yeri',
         text: () =>
            SAVE.data.n.state_wastelands_toriel === 2 || world.runaway || roomKills().w_froggit > 0
               ? SAVE.data.n.plot < 8.1
                  ? [
                       '<32>{#p/human}* (Hava pis kokmaya başladı.)\n* (Bir şekilde, bu içini azimle dolduruyor.)',
                       '<32>{#p/human}* (CANIN tamamen yenilendi.)'
                    ]
                  : [
                       '<32>{#p/human}* (Hava tamamen kurudu.)\n* (Bilakis, bu içini azimle dolduruyor.)',
                       '<32>{#p/human}* (CANIN tamamen yenilendi.)'
                    ]
               : SAVE.data.b.svr
               ? [
                    '<32>{#p/human}* (Bu bölge boşaltıldı, ancak havası temiz duruyor.)',
                    '<32>{#p/human}* (Bu da tabi ki içini azimle dolduruyor.)',
                    '<32>{#p/human}* (CANIN tamamen yenilendi.)'
                 ]
               : [
                    '<32>{#p/human}* (Tuhaf ve muhteşem yaratıkları görmek içini azimle dolduruyor.)',
                    '<32>{#p/human}* (CANIN tamamen yenilendi.)'
                 ]
      },
      w_mouse: {
         name: 'Outlands - Stærmayt Deliği',
         text: () =>
            world.population > 5 && !SAVE.data.b.svr && !world.runaway
               ? [
                    '<32>{#p/human}* (Stærmayt\'ın bir gün ortaya çıkacağını bilmek...)',
                    '<32>{#p/human}* (Bunu düşünmek içini æzimle dolduruyor.)'
                 ]
               : [
                    '<32>{#p/human}* (Stærmayt tekrar ortaya çıkmasa bile...)',
                    '<32>{#p/human}* (Bu durum içini æzimle dolduruyor.)'
                 ]
      },
      w_start: {
         name: 'Çarpışma Alanı',
         text: []
      }
   }
};


// END-TRANSLATE
