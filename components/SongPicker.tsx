import { Autocomplete, TextField } from "@mui/material";
import React, { useCallback, useState } from "react";

const SONGS = [
  "",
  "1（神のちからを）",
  "2（いざやともに）",
  "3（あめつちのみ神をば）",
  "4（よろずのくにびと）",
  "5（こよなくかしこし）",
  "6（我ら主をたたえまし）",
  "7（主のみいつと）",
  "8（きよきみつかいよ）",
  "9（ちからの主を）",
  "10（わがたまたたえよ）",
  "11（あめつちにまさる）",
  "12（めぐみゆたけき主を）",
  "13（こころのよろこび）",
  "14（わがたまさめて）",
  "15（我らの御神は）",
  "16（いときよきみかみよ）",
  "17（空はほがらに）",
  "18（せいなる御神は）",
  "19（みこえきくとて）",
  "20（主をほめよ我がこころ）",
  "21（あさ日のごとくに）",
  "22（めさめよわがたま）",
  "23（くる朝ごとに）",
  "24（父のかみよ）",
  "25（夜を守る月に）",
  "26（こころをかたむけ）",
  "27（とこ世につきせぬ）",
  "28（わがたまたたえよ）",
  "29（ほのぼの昇るあさ日に）",
  "30（あさかぜしずかに）",
  "31（わがみかみよ）",
  "32（あしたにゆうべに）",
  "33（日ごとのつとめを）",
  "34（いのちのたびじは）",
  "35（とこしえの父より）",
  "36（この日の恵みを）",
  "37A（ゆう日はしずみぬ）",
  "37B（ゆう日はしずみぬ）",
  "38（わがたまのひかり）",
  "39（日くれてよもはくらく）",
  "40（今日のひと日も）",
  "41（草木も人も）",
  "42（御力の日はかくれ）",
  "43（み神のたまいし）",
  "44（日かげも沈みて）",
  "45（夕日のなごりは）",
  "46（山の端に日は落ちて）",
  "47（言い知れぬ思い）",
  "48（しずけき夕べの）",
  "49（ゆうひおちて）",
  "50（たそがれややに）",
  "51（日かげしずかに）",
  "52（主のさかえに）",
  "53（栄えある憩いの日よ）",
  "54（よろこびの日よ）",
  "55（きょうはひかりを）",
  "56（なぬかのたびじ）",
  "57（みさかえこよなき）",
  "58（かみよみまえに）",
  "59（神の恵み主イエスの愛）",
  "60（いずこにみたみの）",
  "61（かがやくみとのよ）",
  "62（主イエスのみいつと）",
  "63（いざやともよ）",
  "64（みかみよめぐみを）",
  "65（み殿をいま去る）",
  "66（聖なる聖なる）",
  "67（よろずのもの）",
  "68（ちちなるみかみに）",
  "69（さかえにかがやく）",
  "70（父、み子、み霊の）",
  "71（つくりぬしよ）",
  "72（われ信ず三つなる）",
  "73（くすしきかみ）",
  "74（はてしもしられぬ）",
  "75（ものみなこぞりて）",
  "76（ほめまつれ御神をば）",
  "77（み神はちからの）",
  "78（いときよしあまつ神）",
  "79（ほめたたえよ）",
  "80（わが主のみわざは）",
  "81（恵みのひかりに）",
  "82（ひろしともひろし）",
  "83（めぐみのひかりは）",
  "84（かみにたより）",
  "85（主のまことは）",
  "86（御神の恵みは）",
  "87A（めぐみのひかりは）",
  "87B（めぐみのひかりは）",
  "88（すぎにしむかしも）",
  "89（みかみのみむねは）",
  "90（ここもかみの）",
  "91（とこしえのかみは）",
  "92（ああほむべきかな）",
  "93（みかみのめぐみを）",
  "94（ひさしくまちにし）",
  "95（わがこころは）",
  "96（エサイの根より）",
  "97（あさひはのぼりて）",
  "98（あめにはさかえ）",
  "99（み子のうまれし）",
  "100（いけるものすべて）",
  "101（いずこの家にも）",
  "102（もろびとこえあげ）",
  "103（まきびとひつじを）",
  "104（きたりきけよ）",
  "105（うるわしのよいよ）",
  "106（あらののはてに）",
  "107（まぶねのかたえに）",
  "108（いざうたえいざいわえ）",
  "109（きよしこのよる）",
  "110（やさしくもあいらしき）",
  "111（かみのみこはこよいしも）",
  "112（もろびとこぞりて）",
  "113（みそらをはせゆく）",
  "114（あめなるかみには）",
  "115（ああベツレヘムよ）",
  "116（よろずのほしかげ）",
  "117（清きしらべ空にきこえ）",
  "118（くしきほしよ）",
  "119（ひつじはねむれり）",
  "120（いざうたえ友よ）",
  "121（まぶねのなかに）",
  "122（みどりもふかき）",
  "123（ナザレの村にて）",
  "124（みくにをもみくらをも）",
  "125（わかき預言者）",
  "126（風はげしく）",
  "127（あらしになやめる）",
  "128（みどりのしたたる）",
  "129（あがないぬしに）",
  "130（喜べやたたえよや）",
  "131（わが主はしずかに）",
  "132（めぐみにかがやき）",
  "133（夜はふけわたりぬ）",
  "134（いざいざきたりて）",
  "135（十字架のもとには）",
  "136（ちしおしたたる）",
  "137（かちうたうたいて）",
  "138（ああ主はたがため）",
  "139（うつりゆくよにも）",
  "140（いのちのいのちに）",
  "141（いたましなげかし）",
  "142（さかえの主イエスの）",
  "143（十字架をあおぎて）",
  "144（わがたまいたみて）",
  "145（めぐみのときの）",
  "146（ハレルヤ・戦い終わりて）",
  "147（よろこびたたえよ）",
  "148（救いの主はハレルヤ）",
  "149（とこよにわたりて）",
  "150A（あくまのしばし）",
  "150B（あくまのしばし）",
  "151（よろずの民喜べや）",
  "152（よみのちからは）",
  "153（わがたまよきけ）",
  "154（地よ声たかく）",
  "155（空はうららに）",
  "156A（主はいきたもう）",
  "156B（主はいきたもう）",
  "157（御国に昇りし）",
  "158（あめにはみつかい）",
  "159（あおげや輝く）",
  "160（よろこびの調べ）",
  "161（イマヌエルのきみのみ）",
  "162（あまつみつかいよ）",
  "163（あまつみつかいよ）",
  "164（こひつじをば）",
  "165（わが主のこよなき）",
  "166（イエス君は）",
  "167（いざやもろともに）",
  "168（イエス君の御名に）",
  "169（きけよやひびく）",
  "170（いさみてあおげ）",
  "171（なおしばしの）",
  "172（こころして待て）",
  "173（見よ主はかがやく）",
  "174（起きよ夜はあけぬ）",
  "175（われ世にあるまに）",
  "176（いかりとなげきの）",
  "177（かみのいきよ）",
  "178（きたれやみたまよ）",
  "179（よろこびあふるる）",
  "180（はとのごとくだる）",
  "181（みたまよくだりて）",
  "182（来ませみたまよ）",
  "183（主のみたまくだりまし）",
  "184（みさかえに入りし）",
  "185（きよきみたまよ）",
  "186（めぐみのみたまよ）",
  "187（主よいのちのことばを）",
  "188（みかみのことばよ）",
  "189（世のなかに）",
  "190（あめよりくだり）",
  "191（いともとうとき）",
  "192（ああなつかしい）",
  "193（みかみをあがめて）",
  "194（さかえにみちたる）",
  "195（いのちの君にます主よ）",
  "196（うるわしきは神のみとの）",
  "197（おこりてたおるる）",
  "198（ちちみこみたまの）",
  "199（わがきみイエスよ罪の身は）",
  "200（いとしたわしき）",
  "201（ガリラヤにまししとき）",
  "202（くすしきみすがた）",
  "203（しずけくやすけき）",
  "204（すくいの君なる）",
  "205（わが主よ今ここにて）",
  "206（主のきよき机より）",
  "207（主イエスよこころ）",
  "208（主よ御名によりて）",
  "209（主よ今みまえに）",
  "210（きよきところを）",
  "211（ひつじかいの）",
  "212（たつやシオンの）",
  "213（みどりの牧場に）",
  "214（きたのはてなる）",
  "215（あしたのひかり）",
  "216（ああ麗しきシオンの朝）",
  "217（あまつましみず）",
  "218（世をもるともよ）",
  "219（おのが道うちすてて）",
  "220（日の照るかぎりは）",
  "221（もろくにびと生命の主を）",
  "222（あめなる使いのうたは）",
  "223（今しもこの世は）",
  "224（勝利の主イエスの名と）",
  "225（全ての人にのべ伝えよ）",
  "226（地に住める神の子ら）",
  "227（みそらたかく）",
  "228（ガリラヤのかぜ）",
  "229（まくものいそしみ）",
  "230（あめつちつくれる）",
  "231（みかみの統べます）",
  "232（めぐみの神よ）",
  "233（主よみくにを）",
  "234A（昔主イエスの）",
  "234B（昔主イエスの）",
  "235（主の御民よ奮い立ちて）",
  "236（地の上にまことの）",
  "237（み神の深きみ旨の）",
  "238（疲れたる者よ我にきたり）",
  "239（さまようひとびと）",
  "240（閉ざせるかどを）",
  "241（見よ世をこぞり）",
  "242（なやむものよ）",
  "243（ああ主のひとみ）",
  "244（行けどもゆけども）",
  "245（おもいいずるも）",
  "246（かみのめぐみは）",
  "247（おりをはなれ）",
  "248（ペテロのごとく）",
  "249（われつみびとの）",
  "250（罪の力せまりて）",
  "251（ただ主を仰ぎ）",
  "252（主よ今わが身は）",
  "253（みおしえ聞きつつ）",
  "254（父のみかみよ）",
  "255（はいとちりとの）",
  "256（つみのやみ）",
  "257（十字架のうえに）",
  "258（貴きみかみよ）",
  "259（あめなる主イエスの）",
  "260A（千歳の岩よ）",
  "260B（千歳の岩よ）",
  "261（みやこの外なる）",
  "262（十字架のもとぞ）",
  "263（よろこばしき）",
  "264（うえなくとうとき）",
  "265（世びとの友となりて）",
  "266（この世はわれに）",
  "267（神はわがやぐら）",
  "268（まごごころもて）",
  "269（つみの重荷を）",
  "270（信仰こそ旅路を）",
  "271A（いさおなき我を）",
  "271B（いさおなき我を）",
  "272（ナザレのふせやに）",
  "273A（わがたましいを）",
  "273B（わがたましいを）",
  "274（世人こぞりて）",
  "275（強き神の子）",
  "276（ひかりとやみとの）",
  "277（わがたまをいつくしみて）",
  "278（わが主のみすがた）",
  "279（世のほこる）",
  "280（わが身ののぞみは）",
  "281（いざ主の御腕よ）",
  "282（みさかえは主にあれ）",
  "283（かわべの樹に）",
  "284（主のとうとき御言葉は）",
  "285（主よみ手もて）",
  "286（かみはわがちから）",
  "287（イエス君の御名は）",
  "288（たえなるみちしるべの）",
  "289（みこころならずば）",
  "290（よろずをしらす）",
  "291（主に任せよ汝が身を）",
  "292（はてしも知れぬ）",
  "293（知恵とちからの）",
  "294（みめぐみゆたけき）",
  "295（やすしや罪の世にも）",
  "296（こころみのあらし）",
  "297（あまつよろこび）",
  "298（安かれわがこころよ）",
  "299（うき世のさかえは）",
  "300（みそらのかなたに）",
  "301（山べにむかいてわれ）",
  "302（みかみの風をば）",
  "303（めぐみのみちかい）",
  "304（まことなるみかみを）",
  "305（わがものすべては）",
  "306（今日までこの身を）",
  "307（つきのかげは）",
  "308（いのりは口より）",
  "309（つみのなわめ）",
  "310（しずけきいのりの）",
  "311（花のあけぼのも）",
  "312（いつくしみふかき）",
  "313（このよのつとめ）",
  "314（つかれしものは）",
  "315（うき世のあらなみ）",
  "316（主よこころみ）",
  "317（ガリラヤの湖辺）",
  "318（主よ、主のみまえに）",
  "319（わずらわしき世を）",
  "320（主よみもとに近づかん）",
  "321（わが主イエスよ）",
  "322（神よおじかの）",
  "323（よしや世のひと）",
  "324（主イエスはすくいを）",
  "325（主イエスを死より）",
  "326（ひかりにあゆめよ）",
  "327（あだはかこむとも）",
  "328（いさみ進まん）",
  "329（みまねきかしこし）",
  "330（あめなるわが家を）",
  "331（主にのみ十字架を）",
  "332（主はいのちを）",
  "333（主よわれをば）",
  "334（いつわりの世に）",
  "335（救い主のみ声を聞きて）",
  "336（主イエスよ十字架を）",
  "337（わが生けるは）",
  "338（主よおわりまで）",
  "339（君なるイエスよ）",
  "340（ただ主をたたえて）",
  "341（きよけきこころを）",
  "342（主よ主の愛をば）",
  "343（こよなきめぐみの）",
  "344（とらえたまえ）",
  "345（義の太陽は）",
  "346（たえにうるわしや）",
  "347（心にしのぶも）",
  "348（ならびもなく）",
  "349（うえもなき救い主よ）",
  "350（わが主よ神よ）",
  "351（友という友は）",
  "352（あめなるよろこび）",
  "353（いずみとあふるる）",
  "354（かいぬしわが主よ）",
  "355（主をあおぎみれば）",
  "356（わが君イエスよ、み赦しなくば）",
  "357（ちからのみかみよ）",
  "358（こころみの世にあれど）",
  "359（夕日はかくれて）",
  "360（つかれしこころを）",
  "361（主にありてぞ）",
  "362（寄せくるこの世の）",
  "363（わがたま覚めて）",
  "364（しのべ、しのべ）",
  "365（わが主イエスよ）",
  "366（父の御神よわが世の旅路）",
  "367（大工のわざをば）",
  "368（つとめいそしめ）",
  "369（はたらきびとに）",
  "370（めさめよわが霊）",
  "371（かり入れびとよ）",
  "372（ひたいをおつる）",
  "373（うれしや春べは）",
  "374（主イエスにならいて）",
  "375（見よむらがる悪の霊）",
  "376（正義の君なる）",
  "377（時代のゆうべは）",
  "378（あさひとかがやく）",
  "379（見よや十字架の）",
  "380（たてよいざたて）",
  "381（ちからのかぎりに）",
  "382（いざやともに）",
  "383（十字の旗掲げて）",
  "384（われこそ十字架の）",
  "385（うたがいまよいの）",
  "386（み使いよ人々よ）",
  "387（みかみのことばを）",
  "388（みむねのまにまに）",
  "389（敵を愛せよとの）",
  "390（やさしく友を迎えよ）",
  "391（ナルドの壺ならねど）",
  "392（神のみこえは）",
  "393（かみのひかりは）",
  "394（シオンの丘の）",
  "395（奉仕こそとうとけれ）",
  "396（なやみのあらぬを）",
  "397（やまいの床にも）",
  "398（わが涙我を浸して）",
  "399（悩む者よとく立ちて）",
  "400（主よわが痛みの）",
  "401（主イエスのめぐみと）",
  "402（主のしもべの）",
  "403（かみによりて）",
  "404（山路こえて）",
  "405（神ともにいまして）",
  "406（友とわかるる）",
  "407（はてしもしられぬ）",
  "408（えまいもなみだも）",
  "409（おやみもあらぬ）",
  "410（なれかし鐘の音）",
  "411（すべしらす神よ）",
  "412（きかずやあかぼし）",
  "413（ちちのみかみよ）",
  "414（あらたまの年たちかえり）",
  "415（わが愛する国を守り）",
  "416（くすしきめぐみを）",
  "417（久しく待ちにし光の日は）",
  "418（こころに自由と）",
  "419（主イエスにありては）",
  "420（世界のおさなる）",
  "421（みかみのみむねは）",
  "422（われらたがやし）",
  "423（よろこびうたえ）",
  "424（春よおきよと）",
  "425（ほめまつれ主の恵み）",
  "426（ほがらかにうぶごえあげぬ）",
  "427（月日のながれ）",
  "428（またき愛たまう神よ）",
  "429（あいの御神よ）",
  "430（妹背をちぎる）",
  "431（君を知る家の幸よ）",
  "432（わが家庭よ岩の上）",
  "433（みどりの芝に）",
  "434（みかみを父と）",
  "435（波風あらぶる）",
  "436（恵みのこの日に）",
  "437（子をおもう）",
  "438（わがまくらべに）",
  "439（はるかなる）",
  "440（み神のたまいし）",
  "441（のぞみの星の）",
  "442（かがやくみくらを）",
  "443（神をあがめ）",
  "444（世のはじめさながらに）",
  "445（御神とともにすすめ）",
  "446（かみよりいずる）",
  "447（勇めやはらから）",
  "448（みめぐみを身にうくれば）",
  "449（あめつちの主なる）",
  "450（わかき日のみちを）",
  "451（天地の君なる主よ）",
  "452（正しく清くあらまし）",
  "453（聞けや愛のことばを）",
  "454（うるわしきあさも）",
  "455（ちさき星は空にてり）",
  "456（ひと日を終え）",
  "457（たのしきこえを）",
  "458（再び主イエスの）",
  "459（イエス君、イエス君）",
  "460（おさなき子らよ）",
  "461（主われをあいす）",
  "462（ゆうべのいのり）",
  "463（ささやかなる）",
  "464（いずみのほとりに）",
  "465（うれしき朝よ）",
  "466（この世は花園）",
  "467（思えば昔イエスきみ）",
  "468（こがらしのかぜ）",
  "469（ダビデの村の）",
  "470（信もて世とたたかいて）",
  "471（こころおだやかに）",
  "472（そぼふる小雨の）",
  "473（とうときわが主よ）",
  "474（ああ逝きぬ）",
  "475（うき世の旅行く身は）",
  "476（ややに移りきし）",
  "477（イエス君にありて）",
  "478（海ゆくとも山ゆくとも）",
  "479A（去りにしひとを）",
  "479B（去りにしひとを）",
  "480（おくつき所よ）",
  "481（栄えにかがやく）",
  "482（懐かしくもうかぶ思い）",
  "483（主とともならん）",
  "484（またましらたま）",
  "485（母なるみやこよ）",
  "486（ものはかわり）",
  "487（しずかにゆう日の）",
  "488（はるかに仰ぎ見る）",
  "489（きよき岸べに）",
  "490（あまつみくには）",
  "491（きよき朝よ）",
  "492（神の恵みはいと高し）",
  "493（罪の淵におちいりて）",
  "494（わが行く道いついかに）",
  "495（イエスよこの身を）",
  "496（うるわしの白百合）",
  "497（あめなる日月は）",
  "498（ああみたまよ）",
  "499（みたまよくだりて）",
  "500（御霊なる清き神）",
  "501（生命のみ言葉）",
  "502（いともかしこし）",
  "503（春のあした夏のまひる）",
  "504（実れるたのもは）",
  "505（たえなるめぐみや）",
  "506（たえなる愛かな）",
  "507（ふかきみむねを）",
  "508（主よ日に日に）",
  "509（世の楽しみ失せされ）",
  "510（まぼろしの影を追いて）",
  "511（みゆるしあらずば）",
  "512（わがたましいの）",
  "513（あめにたからつめるものは）",
  "514（弱き者よ我にすべ）",
  "515（十字架の血に清めぬれば）",
  "516（主イエスを知りたる）",
  "517（我に来よと主はいま）",
  "518（いのちのきずなの）",
  "519（わがきみイエスよ）",
  "520（静けき河の岸辺を）",
  "521（イエスよ心に宿りて）",
  "522（道に行きくれし）",
  "523（身に負いえぬ悲しみは）",
  "524（イエス君イエス君み救いに）",
  "525（恵み深き主のほか）",
  "526（主よわが主よ愛の主よ）",
  "527（我が喜びわが望み）",
  "528（かみの秘めたもう）",
  "529（ああ嬉しわが身も）",
  "530（浮き世の嘆きも心にとめじ）",
  "531（こころのおごとに）",
  "532（ひとたびは死にし身も）",
  "533（くしき主のひかり）",
  "534（ほむべきかな主のみ恵み）",
  "535（今日もおくりぬ）",
  "536（むくいをのぞまで）",
  "537（わが主のみまえに）",
  "538（過ぎゆくこの世）",
  "539（あめつちこぞりて）",
  "540（みめぐみあふるる）",
  "541（父、み子、みたまの）",
  "542（世をこぞりて）",
  "543（主イエスのめぐみよ）",
  "544（あまつみたみも）",
  "545A（父の御神に、み子に、きよき御霊に）",
  "545B（父の御神に、み子に、きよき御霊に）",
  "546（聖なるかな、せいなるかな）",
  "547（いまささぐる）",
  "548（ささげまつる）",
  "549A（主はそのきよき宮に）",
  "549B（主はそのきよき宮に）",
  "550A（主は、わが牧者）",
  "550B（主は、わが牧者）",
  "551A（我らをあわれみ、さきわい）",
  "551B（我らをあわれみ、さきわい）",
  "552A（わがたましいよ、主を）",
  "552B（わがたましいよ、主を）",
  "553A（われ山に向かいて目をぞ）",
  "553B（われ山に向かいて目をぞ）",
  "554A（ほむべきかな、主なるイスラエルの）",
  "554B（ほむべきかな、主なるイスラエルの）",
  "555（いざ我ら主にむかいて）",
  "556（新しき歌を、主にむかいて）",
  "557（全地よ、主にむかいて喜ばしき声を）",
  "558（あれ野に水は、湧きて）",
  "559（わがこころ主を）",
  "560（主よ、今こそみことばの）",
  "561（我らの過越、すなわちキリスト）",
  "Ⅱ1（こころを高くあげよう）",
  "Ⅱ2（主はまきびと）",
  "Ⅱ3（わがむねのうちに）",
  "Ⅱ4（この世にあかしをたて）",
  "Ⅱ5（ガリラヤの村を）",
  "Ⅱ6（主はわが牧者）",
  "Ⅱ7（主よ、わたしのさけびを）",
  "Ⅱ8（われらをえらびて）",
  "Ⅱ9（聞きたまえや）",
  "Ⅱ10（みことばたずさえて）",
  "Ⅱ11（この世のものみな）",
  "Ⅱ12（主の教えのべ伝え）",
  "Ⅱ13（イエスのみ名に）",
  "Ⅱ14（見よむらがるあくの霊）",
  "Ⅱ15（いとしたわしき）",
  "Ⅱ16（丘のうえで木にあげられ）",
  "Ⅱ17（みたまのかみ清き愛よ）",
  "Ⅱ18（たかきにいまして）",
  "Ⅱ19（もろびと声合わせて）",
  "Ⅱ20（御神は世界に）",
  "Ⅱ21（ひかりの神のことばは）",
  "Ⅱ22（みちからあふるる）",
  "Ⅱ23（かみともにいまして）",
  "Ⅱ24（世界をすべたもう主よ）",
  "Ⅱ25（うたごえたからかに）",
  "Ⅱ26（ちぃさなかごに花を入れ）",
  "Ⅱ27（立て、つわもの）",
  "Ⅱ28（やみを照らす主よ）",
  "Ⅱ29（イエスきみの使者なれば）",
  "Ⅱ30（ああユダヤよ、きよき地よ）",
  "Ⅱ31（やすきこころの）",
  "Ⅱ32（世界のひとの）",
  "Ⅱ33（やすらかに眠らん）",
  "Ⅱ34（みたまのかよえる）",
  "Ⅱ35（われらのこころの）",
  "Ⅱ36（はたらき人らは）",
  "Ⅱ37（主のふかき愛は）",
  "Ⅱ38（光のくらきに）",
  "Ⅱ39（主イエスはすすみて）",
  "Ⅱ40（ものみなこぞりて）",
  "Ⅱ41（主はわがかいぬし）",
  "Ⅱ42（よろこびあふれ）",
  "Ⅱ43（世界ののぞみなる主よ）",
  "Ⅱ44（みかみのさかえは）",
  "Ⅱ45（いしずえゆるがぬ）",
  "Ⅱ46（まことをあいする）",
  "Ⅱ47（あさぞらはれて）",
  "Ⅱ48（主イエスは近しと）",
  "Ⅱ49（めさめてたたえまつれ）",
  "Ⅱ50（たえなるみうたの）",
  "Ⅱ51（なつかしきしらべ）",
  "Ⅱ52（われらはきたりぬ）",
  "Ⅱ53（星のひかり）",
  "Ⅱ54（われらの主イエスは）",
  "Ⅱ55（主イエスは死に勝ち）",
  "Ⅱ56（主はその群れを）",
  "Ⅱ57（あらしのあとに）",
  "Ⅱ58（いかなればきみはかく）",
  "Ⅱ59（すべてのもの統らすかみよ）",
  "Ⅱ60（望みとよろこび）",
  "Ⅱ61（）",
  "Ⅱ62（とこしえにいます）",
  "Ⅱ63（主のみたまは）",
  "Ⅱ64（のぼれ高く）",
  "Ⅱ65（われ知れり、主のめぐみ）",
  "Ⅱ66（あさのみどりに）",
  "Ⅱ67（ナザレの村の）",
  "Ⅱ68（）",
  "Ⅱ69（）",
  "Ⅱ70（幾千万の母たちの）",
  "Ⅱ71（）",
  "Ⅱ72（）",
  "Ⅱ73（）",
  "Ⅱ74（）",
  "Ⅱ75（）",
  "Ⅱ76（）",
  "Ⅱ77（）",
  "Ⅱ78（）",
  "Ⅱ79（）",
  "Ⅱ80（み言葉をください）",
  "Ⅱ81（）",
  "Ⅱ82（）",
  "Ⅱ83（）",
  "Ⅱ84（）",
  "Ⅱ85（）",
  "Ⅱ86（）",
  "Ⅱ87（）",
  "Ⅱ88（）",
  "Ⅱ89（）",
  "Ⅱ90（）",
  "Ⅱ91（）",
  "Ⅱ92（）",
  "Ⅱ93（）",
  "Ⅱ94（）",
  "Ⅱ95（）",
  "Ⅱ96（）",
  "Ⅱ97（）",
  "Ⅱ98（）",
  "Ⅱ99（）",
  "Ⅱ100（）",
  "Ⅱ101（）",
  "Ⅱ102（）",
  "Ⅱ103（）",
  "Ⅱ104（）",
  "Ⅱ105（）",
  "Ⅱ106（）",
  "Ⅱ107（）",
  "Ⅱ108（）",
  "Ⅱ109（）",
  "Ⅱ110（）",
  "Ⅱ111（）",
  "Ⅱ112（きたりたまえわれらの主よ）",
  "Ⅱ113（太鼓をたたけ）",
  "Ⅱ114（うまやのなかに）",
  "Ⅱ115（たいまつ手に手に）",
  "Ⅱ116（ノエル　ノエル）",
  "Ⅱ117（おうまれだイエスさまが）",
  "Ⅱ118（まぶねにやすけく）",
  "Ⅱ119（ねむるみ子は）",
  "Ⅱ120（み子なるイエス）",
  "Ⅱ121（こよい鳴りわたる）",
  "Ⅱ122（しずかにねむれ）",
  "Ⅱ123（さあ目をさまして）",
  "Ⅱ124（マリヤはあゆみぬ）",
  "Ⅱ125（ねむれやみどりご）",
  "Ⅱ126（この日ひとと）",
  "Ⅱ127（雪はつもり）",
  "Ⅱ128（世のひと忘るな）",
  "Ⅱ129（ひいらぎかざろう）",
  "Ⅱ130（ひつじをまもる）",
  "Ⅱ131（）",
  "Ⅱ132（ハレルヤハレルヤみ墓をやぶり）",
  "Ⅱ133（）",
  "Ⅱ134（）",
  "Ⅱ135（）",
  "Ⅱ136（われ聞きけりかなたには）",
  "Ⅱ137（）",
  "Ⅱ138（）",
  "Ⅱ139（）",
  "Ⅱ140（）",
  "Ⅱ141（）",
  "Ⅱ142（）",
  "Ⅱ143（）",
  "Ⅱ144（すみわたる大空に）",
  "Ⅱ145（かみのたみは）",
  "Ⅱ146（みどりの野辺も）",
  "Ⅱ147（こがねの城を経めぐるとも）",
  "Ⅱ148（父なる神のさずけましし）",
  "Ⅱ149（）",
  "Ⅱ150（）",
  "Ⅱ151（）",
  "Ⅱ152（）",
  "Ⅱ153（）",
  "Ⅱ154（）",
  "Ⅱ155（おそるべきいまの世にぞ）",
  "Ⅱ156（めさめよ、わがたま）",
  "Ⅱ157（この世のなみかぜさわぎ）",
  "Ⅱ158（荒野の風は激しく）",
  "Ⅱ159（みこころにしたがい）",
  "Ⅱ160（父の神の右にます）",
  "Ⅱ161（輝く日を仰ぐとき）",
  "Ⅱ162（主にあるたみみな）",
  "Ⅱ163（主イエスのみ名こそ）",
  "Ⅱ164（）",
  "Ⅱ165（）",
  "Ⅱ166（）",
  "Ⅱ167（われをもすくいし）",
  "Ⅱ168（）",
  "Ⅱ169（）",
  "Ⅱ170（）",
  "Ⅱ171（）",
  "Ⅱ172（）",
  "Ⅱ173（弟子にしてください）",
  "Ⅱ174（）",
  "Ⅱ175（）",
  "Ⅱ176（）",
  "Ⅱ177（あなたも見ていたのか）",
  "Ⅱ178（馬車よおりてこい）",
  "Ⅱ179（）",
  "Ⅱ180（）",
  "Ⅱ181（）",
  "Ⅱ182（丘のうえに十字架たつ）",
  "Ⅱ183（）",
  "Ⅱ184（神はひとり子を）",
  "Ⅱ185（カルバリ山の）",
  "Ⅱ186（）",
  "Ⅱ187（）",
  "Ⅱ188（きみのたまものと）",
  "Ⅱ189（丘の上の教会へ）",
  "Ⅱ190（）",
  "Ⅱ191（）",
  "Ⅱ192（シャロンの花）",
  "Ⅱ193（）",
  "Ⅱ194（おおみ神をほめまつれ）",
  "Ⅱ195（キリストにはかえられません）",
  "Ⅱ196（救い主は待っておられる）",
  "Ⅱ197（あおき牧場ときよきみぎわ）",
  "Ⅱ198（）",
  "Ⅱ199（）",
  "Ⅱ200（）",
  "Ⅱ201（）",
  "Ⅱ202（）",
  "Ⅱ203（）",
  "Ⅱ204（）",
  "Ⅱ205（）",
  "Ⅱ206（）",
  "Ⅱ207（）",
  "Ⅱ208（）",
  "Ⅱ209（）",
  "Ⅱ210（）",
  "Ⅱ211（）",
  "Ⅱ212（）",
  "Ⅱ213（ゆりかごに風吹き）",
  "Ⅱ214（海原を越えてきし）",
  "Ⅱ215（とおい空のかなたから）",
  "Ⅱ216（みつかいうたいて）",
  "Ⅱ217（ひいらぎとつたは）",
  "Ⅱ218（おはようマリア）",
  "Ⅱ219（さやかに星はきらめき）",
  "Ⅱ220（きたれやみ使い）",
  "Ⅱ221（）",
  "Ⅱ222（）",
  "Ⅱ223（）",
  "Ⅱ224（）",
  "Ⅱ225（）",
  "Ⅱ226（）",
  "Ⅱ227（）",
  "Ⅱ228（こころに主イエスを）",
  "Ⅱ229（）",
  "Ⅱ230（）",
  "Ⅱ231（）",
  "Ⅱ232（なやみのときに）",
  "Ⅱ233（栄光、栄光、かみにあれ）",
  "Ⅱ234（世界のはじめに「光あれ」と）",
  "Ⅱ235（ああ主はみことばと）",
  "Ⅱ236（聖なるかな）",
  "Ⅱ237（み弟子らにかこまれ）",
  "Ⅱ238（主のみ言葉は恵みに満つ）",
  "Ⅱ239（主はわが祈りに）",
  "Ⅱ240（主のみいつのまえに）",
  "Ⅱ241（）",
  "Ⅱ242（まきびとひつじを）",
  "Ⅱ243（あらののはてに）",
  "Ⅱ244（きよしこのよる）",
  "Ⅱ245（かみのみこはこよいしも）",
  "Ⅱ246（もろびとこぞりて）",
  "Ⅱ247（）",
  "Ⅱ248（）",
  "Ⅱ249（）",
  "Ⅱ250（）",
  "Ⅱ251（）",
  "Ⅱ252（）",
  "Ⅱ253（）",
  "Ⅱ254（）",
  "Ⅱ255（）",
  "Ⅱ256（）",
  "Ⅱ257（）",
  "Ⅱ258（）",
  "Ⅱ259（）",
];

export const SongPicker: React.FC<{
  id: string;
  // value: string;
  onChange: (val: string) => void;
}> = ({ id, onChange }) => {
  const [value, setValue] = useState("");
  const _onChange = useCallback(
    (_: unknown, val: string | null) => {
      onChange(val ?? "");
      setValue(val ?? "");
    },
    [onChange]
  );

  return (
    <Autocomplete
      value={value}
      onChange={_onChange}
      disablePortal
      id={id}
      options={SONGS}
      fullWidth
      sx={{ marginTop: "16px", marginBottom: "16px", width: 300 }}
      renderInput={(params) => (
        <TextField {...params} fullWidth label="賛美歌" />
      )}
    />
  );
};
