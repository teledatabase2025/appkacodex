const VIDEO_URL = 'https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0';

const hint = (...items) => items;
const videoSlide = (title, subtitle, note = '', button = 'Pokračovat') => ({ kind: 'video', title, subtitle, note, videoUrl: VIDEO_URL, button });
const audioSlide = (title, transcript, hints = [], link = null, dynamicChoice = false) => ({ kind: 'audio', title, transcript, hints, link, dynamicChoice });
const single = (caseLabel, question, options, correct, hints) => ({ kind: 'question', type: 'single', caseLabel, question, options, correct, hints });
const multi = (caseLabel, question, options, correct, hints) => ({ kind: 'question', type: 'multi', caseLabel, question, options, correct, hints });
const text = (caseLabel, question, answers, hints, placeholder = 'Zapiš odpověď') => ({ kind: 'question', type: 'text', caseLabel, question, answers, hints, placeholder });
const words = (caseLabel, question, answers, hints, labels = null) => ({ kind: 'question', type: 'words', caseLabel, question, answers, hints, labels });
const acknowledge = (caseLabel, question, options, hints = []) => ({ kind: 'question', type: 'ack', caseLabel, question, options, correct: options, hints });

const slides = [
  {
    kind: 'start', title: 'Interní systém O.R.I.O.N.', subtitle: 'Interní vyšetřovací systém · přístup pouze pro autorizované vyšetřovatele',
    details: [
      ['Režim', 'Detektiv'], ['Případ', '2254578/2026'], ['Interní označení', 'ŠEPOTY STROMŮ'], ['Stav', 'Čeká se na spuštění'], ['Systém', 'Aktivní'],
    ],
    videoUrl: VIDEO_URL,
  },
  videoSlide('1. spis', 'Úvodní video ke kapitole I.'),
  single('1. spis', 'Jakou nesrovnalost jsme ve výpovědích přehlédli?', [
    'Lesník Král tvrdil, že volal z mýtiny, ale přitom se nacházel v Podlesí.',
    'Lesník Král tvrdil, že se opil v hospodě a byl tam minimálně do jedenácti, což není pravda.',
    'Dvořákovi nemohli jít spát tak, jak tvrdí, protože měli mít ještě otevřenou hospodu.',
    'Lesník Král si nemohl chodit pro závadnou vodu z Černého potoka, protože ho před jejími škodlivými účinky Jakub Dvořák varoval.',
  ], 'Lesník Král tvrdil, že se opil v hospodě a byl tam minimálně do jedenácti, což není pravda.', hint(
    'Podívej se na výslech lesníka Krále i manželů Dvořákových.',
    'První možnost nemůže být správná. Přesně tohle totiž bylo u výslechu lesníku Královi vyčteno, takže to nikdo z našich lidí určitě neopomněl.',
    'Poslední možnost taky není správná. Jakub Dvořák sice lesníka Krále před škodlivými účinky vody z Černého potoka varoval, lesník Král si tam ale stejně pro vodu chodil. To víme z deníku Jakuba Dvořáka.',
    'Správně není ani možnost s hospodou Dvořákových. Dvořákovi uvedli, že toho dne všichni návštěvníci odešli dřív.',
    'Správně je výpověď o opilosti v hospodě do jedenácti. Manželé Dvořákovi tvrdí, že lesník odešel neobvykle brzo.'
  )),
  words('1. spis', 'Jaký je význam tří černobílých symbolů v deníku Jakuba Dvořáka?', ['ROD', 'ŘÁD', 'OSUD'], hint(
    'První symbol odkazuje na stranu 127 v deníku. Druhý symbol odkazuje na stranu 126 a srovnává ji se stranou 103. Třetí symbol podle mě taky odkazuje na strany v deníku.',
    'K prvnímu symbolu. Dvořák zřejmě na některou mluvnickou kategorii zapomněl, nemyslíš?',
    'U druhého symbolu jsou písmena VTSVVMMA na straně 103 prvními písmeny z každého řádku druhého odstavce. Nepoužil něco podobného?',
    'Třetí symbol? Není to náhodou označení strany, řádku, slova a písmena?',
    'Čtyři mluvnické kategorie u podstatných jmen jsou pád, číslo, rod a vzor. Na straně 126 první písmena básně také dávají dohromady slovo.',
    'Správné odpovědi jsou ROD, ŘÁD a OSUD.'
  )),
  text('1. spis', 'Koho kontaktujeme za účelem pomoci s odhalením významu symbolů nalezených na místě činu na oltáři a na stromě v blízkosti oltáře? Napiš jeho jméno.', ['Historik', 'historika', 'Tomáš Havelka', 'Tomáše Havelku'], hint(
    'Zkus si ještě jednou a pozorněji prohlédnout Domažlický list Plzeňského kurýra.',
    'Zaměř se na druhou stranu novin a článek, který pojednává o vzácné návštěvě.',
    'Nemohl by nám s tím náhodou pomoci světově uznávaný historik Tomáš Havelka, který je zrovna v Česku?'
  )),
  videoSlide('Závěr 1. spisu', 'Závěrečné video 1. spisu.'),
  videoSlide('2. spis', 'Úvodní video 2. spisu.', '2. spis zatím neotevírej. Shlédni úvodní video a pak si poslechni vzkaz historika Tomáše Havelky.', 'Poslechnout vzkaz'),
  audioSlide('Vzkaz historika Tomáše Havelky', 'Nyní otevři spis a pokračuj.', []),
  text('2. spis', 'Jaké má Jakub Dvořák heslo do své emailové schránky?', ['Veles'], hint('Všimni si v té tabulce abeced v Dvořákově souboru různých barev. Neviděli jsme je už někde?', 'Podívej se do deníku Jakuba Dvořáka. Jsou tam nakreslené symboly a každý je jinou barvou. Nemůže to souviset?', 'Ty šipky vedle symbolů v deníku Jakuba Dvořáka mají jistě určovat směr, jakým se v abecedách máme od konkrétního písmene pohybovat.', 'Nemůže to být náhodou Veles?')),
  single('2. spis', 'Na jakém dokumentu je něco zvláštního a co to je?', ['Výslech Filipa Procházky. Podle konverzace ze sociálních sítí jasně vyplynulo, že se vůbec nesešli.', 'Facebookový příspěvek Jakuba Dvořáka. Filip Procházka odhalil Jakubova vraha.', 'Wikipedie historika a zvláštní poznámka v závorce odkazující na Peruna na nevhodném místě.'], 'Wikipedie historika a zvláštní poznámka v závorce odkazující na Peruna na nevhodném místě.', hint('Projdi si znovu ty dokumenty, ať víš, o čem se tu přesně bavíme.', 'Z konverzace Filipa Procházky a Jakuba Dvořáka určitě nevyplynulo, že se nesešli.', 'To, že je farář vrahem, zdaleka není jisté.', 'Ta poznámka Perun je ale hodně zvláštní, co?')),
  text('2. spis', 'Co znamená Mstitelův tajný vzkaz?', ['Je čas!', 'Je čas'], hint('Podívej se na facebookový příspěvek Jakuba Dvořáka, tam ten vzkaz najdeš.', 'Při bližším prozkoumání mi všechny ty tečky a čárky připomínají Morseův kód.', 'Byla to skutečně zpráva zašifrovaná Morseovou abecedou. Stálo v ní Je čas!')),
  videoSlide('Závěr 2. spisu', 'Závěrečné video 2. spisu.'),
  videoSlide('3. spis', 'Úvodní video 3. spisu.', '3. spis zatím neotevírej. Shlédni úvodní video a pak si poslechni vzkaz historika Tomáše Havelky.', 'Poslechnout vzkaz'),
  audioSlide('Vzkaz historika Tomáše Havelky', 'Nyní otevři spis a pokračuj.', []),
  single('3. spis', 'Ty nápisy v kostele na zdech musejí být z Bible. Ověřil sis, co říkají? V čem se shodují?', ['Připomínají, že utrpení je zkouškou víry spravedlivých.', 'Varují, že pravda bude odhalena a vina nezůstane bez následků.', 'Předpovídají příchod apokalyptických pohrom.', 'Zdůrazňují milosrdenství, které převažuje nad trestem.'], 'Varují, že pravda bude odhalena a vina nezůstane bez následků.', hint('Verše nemluví o náhodném neštěstí. Vždy existuje příčina a odpověď na ni.', 'Texty spojuje myšlenka, že nic nezůstane skryto a žádný čin nezůstane bez odezvy.', 'Utrpení zde není jen osobní. Důsledky mohou přesahovat samotného viníka.', 'Správná odpověď je varování, že pravda bude odhalena a vina nezůstane bez následků.')),
  text('3. spis', 'Jaký tajný vzkaz zanechal neznámý pachatel na náhrobní desce v kostele?', ['smrt'], hint('Zkus se pořádně podívat na tu náhrobní desku. Je tam něco, co tam nepatří.', 'Kamínky na desce jsou systematicky rozmístěné a společně tvoří jeden celek.', 'Když budeš číst písmena, pod kterými jsou kamínky v pořadí, v jakém se čte text, získáš slovo SMRT.')),
  text('3. spis', 'Jakým heslem se dostaneme do přílohy Dvořákova emailu?', ['MORANA'], hint('Dvořák v emailu píše, že význam BSIUAP pochopí pouze ten, kdo zná KubaDvorak87. Neviděli jsme už tuto formulaci někde?', 'KubaDvorak87 vytvořil českou verzi wikipedie o Tomáši Havelkovi. A zřejmě si tam něco ukryl.', 'Vigenèrova šifra funguje podobně jako Caesarova šifra: pracuje s klíčovým slovem a posunem písmen.', 'Když dekódujeme, posouváme písmena dozadu.', 'Systém z Vigenèra vyhodil jedno slovo: MORANA.')),
  text('3. spis', 'Objevila se zpětně nějaká nová nesrovnalost v některém z výslechů? Pokud ano, uveď jméno osoby, které se tato nesrovnalost týká.', ['Kamila Dvořáková', 'Kamily Dvořákové'], hint('Zkus si projít i starší výslechy.', 'Zmíněný výslech se objevil už v prvním spisu.', 'Není ve výpovědích rodičů Jakuba Dvořáka nějaká nesrovnalost s tím, co si on sám zapsal do emailu?', 'Nesrovnalost se jistě týká Kamily Dvořákové.')),
  videoSlide('Závěr 3. spisu', 'Závěrečné video 3. spisu.'),
  videoSlide('4. spis', 'Úvodní video 4. spisu.', '4. spis zatím neotevírej. Shlédni úvodní video a pak si poslechni vzkaz historika Tomáše Havelky.', 'Poslechnout vzkaz'),
  audioSlide('Vzkaz historika Tomáše Havelky', 'Nyní otevři spis a pokračuj.', []),
  single('4. spis', 'Výhružky u Dvořáka na sociálních sítích odkazují očividně znovu na biblické verše. Jaký je jejich hlavní společný význam?', ['Ujištění o Božím milosrdenství a odpuštění bez ohledu na vinu.', 'Varování před nemocí a fyzickým utrpením způsobeným démony.', 'Zdůraznění nevyhnutelného trestu, bolesti a následků hříchu. I skrze generace.'], 'Zdůraznění nevyhnutelného trestu, bolesti a následků hříchu. I skrze generace.', hint('Ve všech citovaných úryvcích se objevuje silná emoce a reakce na předchozí čin.', 'Texty spojuje myšlenka, že bolest není bez příčiny.', 'Ve všech verších se opakuje vzorec provinění a následek.', 'Správná odpověď je nevyhnutelný trest, bolest a následky hříchu.')),
  text('4. spis', 'Všiml sis u Dvořáka na sociálních sítích ještě něčeho? Není tam kromě biblických veršů i jiný vzkaz? Jak zní?', ['Utrpení'], hint('Zkus se podívat znovu na výhružky Dvořákovi. Jsou tam zvláštní bubliny.', 'Bubliny se vzájemně prolínají z jednoho obrázku do druhého.', 'V bublinách je kromě písmene vždy ještě malá indexovaná číslice.', 'Je třeba písmena uspořádat podle čísel.', 'Seřazené bubliny dávají dohromady slovo UTRPENÍ.')),
  single('4. spis', 'Kterou osobu můžeme zbavit podezření, protože má alibi?', ['Rostislava Dvořáka', 'Filipa Procházku', 'Kamilu Dvořákovou', 'Františka Krále', 'Břetislava Macha', 'Růženu Machovou'], 'Františka Krále', hint('Zkus se podívat do místních novin, zda tam nenarazíš na užitečné informace.', 'Jeden z nich to určitě spáchat nemohl, protože byl hospitalizován na protialkoholní záchytné stanici.', 'Nemohl to spáchat František Král.')),
  multi('4. spis', 'Dokážeš identifikovat alespoň dvě osoby z fotky u oltáře, kterou přinesl Dvořák?', ['Kamila Dvořáková', 'Rostislav Dvořák', 'Břetislav Mach', 'Růžena Machová', 'Jakub Dvořák', 'Filip Procházka', 'Norbert Malina'], ['Břetislav Mach', 'Růžena Machová'], hint('Máme školní fotku, která visí na nástěnce v hospodě. Nejsou na ní náhodou stejní lidé?', 'Nemohl by to být někdo z našich podezřelých?', 'Kdo dodnes v Podlesí dodržuje pohanské zvyky?', 'Je tam Břetislav Mach a Růžena Machová.')),
  audioSlide('Meziřeč historika', 'Detektive, ještě jedna věc. Ten rodný list Jakuba Dvořáka je opravdu zajímavý. Chtělo by to o jeho původu zjistit trochu víc. Napiš na analytické oddělení: „Prověřit rodný list Jakuba Dvořáka.“', hint('Zkus se podívat na adresář obvodního oddělení policie města Hvozdná nad Radbuzou.', 'Napiš email na analytické oddělení a počkej na odpověď.')),
  text('4. spis', 'Kdo udal Barboru Novotnou v roce 1986 a kdo byl zároveň spolupracovníkem StB pod krycím jménem VAŘEČKA?', ['Rostislav Dvořák', 'Rostislava Dvořáka'], hint('Zkus se zamyslet nad krycím jménem VAŘEČKA.', 'Neříká ti něco adresa trvalého pobytu spolupracovníka StB?', 'Nebydlel na adrese Podlesí 26 i Jakub Dvořák?', 'Na adrese Podlesí 26 bydlí i Dvořákovi.', 'Spolupracovníkem StB byl Rostislav Dvořák.')),
  videoSlide('Závěr 4. spisu', 'Závěrečné video 4. spisu.'),
  videoSlide('5. spis', 'Úvodní video 5. spisu.', '5. spis zatím neotevírej. Shlédni úvodní video a pak si poslechni vzkaz historika Tomáše Havelky.', 'Poslechnout vzkaz'),
  audioSlide('Vzkaz historika Tomáše Havelky', 'Nyní otevři spis a pokračuj.', []),
  words('5. spis', 'Podařilo se ti zjistit, co se skrývá v ručně psaném vzkazu, který byl nalezen u Machových vložený v knize?', ['Přátelé', 'vracím', 'se', 'co', 'se', 'stalo', 'to', 'se', 'neodpouští', 'potřebuji', 'vaši', 'pomoc'], hint('Vzkaz je zvláštní. Tam, kde by měla být velká písmena, nejsou, a tam, kde by být neměla, jsou.', 'Musí to mít něco společného s velkými písmeny.', 'Zkusme vzít v potaz jen slova s velkými písmeny na začátku.', 'Je tam ukrytý vzkaz: přátelé vracím se co se stalo to se neodpouští potřebuji vaši pomoc.')),
  text('5. spis', 'Jaké je heslo k flashce Jakuba Dvořáka?', ['STRIGA'], hint('Zkus si znovu projít věci nalezené na místě vraždy Jakuba Dvořáka.', 'Mezi věcmi byly i klíče Jakuba Dvořáka a na nich přívěsek.', 'Znaky na přívěsku jsme už někde viděli.', 'Znaky na přívěsku jsou starým slovanským runovým písmem.', 'Heslo k flashce je STRIGA.')),
  text('5. spis', 'Už víme, že Jakub Dvořák byl adoptovaný. Jeho matkou byla Barbora Novotná. Tušíš však, kdo byl nebo je jeho otcem?', ['Tomáš Havelka', 'Tomáše Havelky'], hint('Jméno Barbory Novotné jsme kromě rodného listu a výpisu viděli ještě někde jinde.', 'Prozkoumej rok narození Jakuba Dvořáka a rok smrti Barbory Novotné ve Wikipedii o historikovi.', 'Otcem Jakuba Dvořáka je Tomáš Havelka.')),
  audioSlide('Meziřeč historika', 'Děkuji za tvou zprávu, detektive. Heslo k flashce ti prozradil přívěšek na klíčích. Vrah Jakuba i faráře je zřejmě ve spojení s Machovými. Obsah flashky jsem ti nasdílel. Můžeš se na to podívat ty?', [], 'https://google.com'),
  text('5. spis', 'Komu patří pero nalezené na místě vraždy Jakuba Dvořáka?', ['Tomáši Havelkovi', 'Tomášovi Havelkovi', 'Tomáš Havelka'], hint('Nemůže být odpověď na flashce Jakuba Dvořáka?', 'Neodkazují některé odkazy v dokumentech na flashce na externí zdroje?', 'Zkus se podívat do souboru Úkoly.', 'V souboru Úkoly je externí odkaz na historickou anketu.', 'Nedostal toto ocenění Tomáš Havelka?', 'Tomáš Havelka dostal ocenění, k němuž náleželo pero s nápisem Historia magistra vitae 2022.')),
  videoSlide('Závěr 5. spisu', 'Závěrečné video 5. spisu.'),
  videoSlide('6. spis', 'Úvodní video 6. spisu.', 'Můžeš otevřít 6. spis.'),
  single('6. spis', 'Mohl se Tomáš Havelka dostat do Podlesí? Mohl to stihnout?', ['Ano', 'Ne'], 'Ano', hint('Žádné auto kromě auta Filipa Procházky ten večer do Podlesí nepřijelo. Co takhle jiný dopravní prostředek?', 'Prověř odjezdy autobusů z Plzně a porovnej je s koncem přednášky.', 'Nedívej se jen do jízdních řádů, mrkni taky na starší dokumenty.', 'Nepíše se o tom v novinách?', 'V novinách se píše o posílení spojů. Ano, Havelka se mohl do Podlesí dostat autobusem ve 20:00 z Plzně.')),
  text('6. spis', 'Komu patří prezentér nalezený na místě činu, kde byl zabit Jakub Dvořák?', ['Filipu Procházkovi', 'Filipovi Procházkovi', 'Filip Procházka'], hint('Zkus se podívat na detail rozebraného prezentéru.', 'Není pod krytem prezentéru adresa?', 'Vzpomeneš si, kdo na této škole učí?', 'Neučí tam náhodou Filip Procházka?')),
  text('6. spis', 'Kdo psal výhružný vzkaz faráři a stejně tak i vzkaz, který se objevil u Machů?', ['Tomáš Havelka', 'Tomáše Havelky'], hint('Nejsi grafolog, ale stojí za to písma na vzkazech prozkoumat.', 'Neměli jsme tady ještě nějaký jiný rukopis, o kterém víme, komu patří?', 'Mrkni na věnování v knize Jakuba Dvořáka.', 'Písmo se shoduje s písmem Tomáše Havelky.')),
  acknowledge('Rozhodnutí', 'Koho zadržíme či po kom vyhlásíme pátrání? Rozhoduj moudře, detektive. Špatná volba může způsobit, že pachatele činu už nemusíme nikdy dopadnout.', ['Tomáše Havelku', 'Filipa Procházku']),
  audioSlide('Vyhodnocení rozhodnutí', 'Tak to by mě nenapadlo, detektive. Havelka to skutečně mohl do Podlesí stihnout. Na místě činu bylo Havelkovo pero, ale také prezentér Filipa Procházky. Proti Havelkovi svědčí i výhružný vzkaz. A teď k tvému rozhodnutí.', [], 'https://google.com', true),
  acknowledge('Rozhodnutí', 'Má podle hotelových logů Havelka alibi? Nebo ti tam přijde něco podezřelého?', ['Má alibi', 'Přijde mi tam něco podezřelého'], hint('Projdi si soubor s hotelovými logy a porovnej důležitá data.', 'Stěžejní je den konání přednášky, den pomalování kostela a den vraždy faráře.', 'Jde o 9.3., 12.3. a 13.3.')),
  audioSlide('Telefonát s asistentkou', 'Havelka byl podle hotelových logů na hotelu. Asistentka ale upozornila na zásadní detail: pokoj 307 je její. Pan Havelka je ubytovaný vedle, na pokoji 305.'),
  single('Finále', 'Kdo zabil Jakuba Dvořáka a faráře Norberta Malinu?', ['Filip Procházka', 'Tomáš Havelka'], 'Tomáš Havelka', []),
  text('Finále', 'Jak se Havelka dostal do Podlesí po přednášce v den vraždy Jakuba Dvořáka?', ['autobusem'], hint('Žádné auto, kromě auta Filipa Procházky, ten večer na odbočce do Podlesí nesjelo.', 'Pěšky by se tam určitě nedostal. Zbývá jediný způsob.', 'Autobusem.')),
  words('Finále', 'V kolik hodin vyjížděl Havelka autobusem z Plzně a v kolik měl být v Podlesí?', ['20:00', '21:30'], hint('Podívej se do jízdních řádů a zjisti, jak dlouho trvá cesta do Podlesí z Plzně CAN.', 'Podívej se do novin, v kolik odjížděl jediný autobus do Podlesí, který mohl Havelka stihnout.', 'Z Plzně odjížděl ve 20:00 a na místě byl ve 21:30.'), ['ODJEZD Z PLZNĚ', 'PŘÍJEZD DO PODLESÍ']),
  text('Finále', 'Jak se Havelka dostal do Podlesí, když zanechal farářovi výhružné vzkazy a stejně tak, když ho zavraždil?', ['taxíkem', 'taxikem', 'taxi službou', 'taxislužbou', 'vozem taxislužby'], hint('Podívej se na logy hotelového pokoje 305 ve dnech 12. a 13.3. a zkontroluj i další část dokumentu.', 'Podívej se na Havelkovy objednávky odvozů.', 'Taxíkem.')),
  text('Finále', 'Kde byla v době těchto vražd asistentka Tomáše Havelky?', ['na hotelu', 'v hotelu', 'hotel', 'na pokoji', 'v pokoji', 'pokoj'], hint('Podívej se do hotelových logů Havelkovy asistentky.', 'Je to pokoj 307.', 'Podle hotelových logů byla na pokoji.')),
  { kind: 'final', title: 'Případ je vyřešen', subtitle: 'Podívej se na jeho závěrečné video.', videoUrl: VIDEO_URL },
];

const state = {
  index: 0,
  answers: {},
  verdicts: {},
  revealedHints: {},
  typedHints: {},
  selectedDecision: '',
  accessLog: ['ORION_BOOT: systém aktivní', 'AUTH: detektiv ověřen', 'CASE_LOAD: 2254578/2026'],
};

function key(index = state.index) { return `slide-${index}`; }
function normalize(value) { return String(value || '').toLocaleLowerCase('cs-CZ').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[.!?„“"'’]/g, '').replace(/\s+/g, ' ').trim(); }
function escapeHtml(value) { return String(value ?? '').replace(/[&<>"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[char]); }
function currentSlide() { return slides[state.index]; }
function setLog(entry) { state.accessLog = [entry, ...state.accessLog].slice(0, 5); }
function playableSlides() { return slides.filter((slide) => slide.kind === 'question').length; }
function solvedSlides() { return slides.filter((slide, index) => slide.kind === 'question' && state.verdicts[key(index)]?.ok).length; }

function playTone(kind = 'beep') {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return;
  const ctx = new AudioContext();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = kind === 'phone' ? 'sine' : kind === 'error' ? 'sawtooth' : 'square';
  osc.frequency.setValueAtTime(kind === 'phone' ? 520 : kind === 'error' ? 160 : 760, ctx.currentTime);
  if (kind === 'phone') osc.frequency.linearRampToValueAtTime(880, ctx.currentTime + 0.18);
  gain.gain.setValueAtTime(0.0001, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(kind === 'error' ? 0.18 : 0.1, ctx.currentTime + 0.03);
  gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.55);
  osc.connect(gain); gain.connect(ctx.destination); osc.start(); osc.stop(ctx.currentTime + 0.58);
}

function isCorrect(slide, answer) {
  if (slide.type === 'ack') return Boolean(answer);
  if (slide.type === 'single') return answer === slide.correct;
  if (slide.type === 'multi') {
    const selected = [...(Array.isArray(answer) ? answer : [])].map(normalize).sort();
    const correct = slide.correct.map(normalize).sort();
    return JSON.stringify(selected) === JSON.stringify(correct);
  }
  if (slide.type === 'text') return slide.answers.map(normalize).includes(normalize(answer));
  if (slide.type === 'words') {
    const values = Array.isArray(answer) ? answer.map(normalize).filter(Boolean) : [];
    const correct = slide.answers.map(normalize);
    if (values.length !== correct.length) return false;
    const used = new Array(correct.length).fill(false);
    return values.every((value) => {
      const found = correct.findIndex((entry, index) => !used[index] && entry === value);
      if (found === -1) return false;
      used[found] = true;
      return true;
    });
  }
  return false;
}

function nextSlide() {
  state.index = Math.min(state.index + 1, slides.length - 1);
  setLog(`SLIDE_OPEN: ${String(state.index + 1).padStart(2, '0')}/${slides.length}`);
  render();
}

function previousSlide() {
  state.index = Math.max(state.index - 1, 0);
  render();
}

function setAnswer(value) {
  state.answers[key()] = value;
  render();
}

function submitAnswer(value = state.answers[key()]) {
  const slide = currentSlide();
  const ok = isCorrect(slide, value);
  if (slide.type === 'ack' && value) state.selectedDecision = value;
  state.verdicts[key()] = { ok, neutral: slide.type === 'ack', at: Date.now() };
  setLog(`${slide.type === 'ack' ? 'DECISION' : 'EVIDENCE'}: ${ok ? 'přijato' : 'bez důkazů'}`);
  playTone(ok ? 'beep' : 'error');
  render();
  if (ok) setTimeout(nextSlide, slide.type === 'ack' ? 950 : 1050);
}

function revealHint() {
  const slideKey = key();
  const slide = currentSlide();
  const revealed = state.revealedHints[slideKey] || [];
  if (!slide.hints || revealed.length >= slide.hints.length) return;
  const hintIndex = revealed.length;
  state.revealedHints[slideKey] = [...revealed, hintIndex];
  state.typedHints[`${slideKey}-${hintIndex}`] = '';
  typeHint(slide.hints[hintIndex], slideKey, hintIndex, 0);
  playTone('phone');
  render();
}

function typeHint(text, slideKey, hintIndex, position) {
  state.typedHints[`${slideKey}-${hintIndex}`] = text.slice(0, position);
  render();
  if (position < text.length && key() === slideKey) setTimeout(() => typeHint(text, slideKey, hintIndex, position + 2), 18);
}

function renderYoutube(url) {
  return `<div class="video-shell"><iframe src="${url}" title="YouTube video" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe><div class="video-overlay"><span>SECURE VIDEO FEED</span><b>O.R.I.O.N.</b></div></div>`;
}

function renderQuestion(slide) {
  const answer = state.answers[key()];
  if (slide.type === 'single' || slide.type === 'ack') {
    return `<div class="option-grid">${slide.options.map((option) => `<button class="option ${answer === option ? 'selected' : ''}" data-action="choose" data-value="${escapeHtml(option)}"><span class="option-marker"></span>${escapeHtml(option)}</button>`).join('')}</div>`;
  }
  if (slide.type === 'multi') {
    const selected = Array.isArray(answer) ? answer : [];
    return `<div class="option-grid">${slide.options.map((option) => `<button class="option ${selected.includes(option) ? 'selected' : ''}" data-action="toggle" data-value="${escapeHtml(option)}"><span class="option-marker"></span>${escapeHtml(option)}</button>`).join('')}</div><button class="primary" data-action="submit">Ověřit výběr</button>`;
  }
  if (slide.type === 'words') {
    const values = Array.isArray(answer) ? answer : [];
    return `<div class="word-grid">${slide.answers.map((_, index) => `<label><span>${escapeHtml(slide.labels?.[index] || `Záznam ${index + 1}`)}</span><input value="${escapeHtml(values[index] || '')}" data-action="word" data-index="${index}" autocomplete="off"></label>`).join('')}</div><button class="primary" data-action="submit">Ověřit záznamy</button>`;
  }
  return `<input class="answer-input" value="${escapeHtml(answer || '')}" placeholder="${escapeHtml(slide.placeholder)}" data-action="text" autocomplete="off"><button class="primary" data-action="submit">Ověřit odpověď</button>`;
}

function renderHints(slide) {
  if (!slide.hints?.length) return '';
  const revealed = state.revealedHints[key()] || [];
  return `<aside class="hint-console"><div class="hint-head"><button class="phone" data-action="hint">☎</button><div><strong>Zelená linka nápověd</strong><span>${revealed.length}/${slide.hints.length} odemčeno</span></div></div><div class="hint-list">${revealed.map((hintIndex) => `<article><b>NÁPOVĚDA ${hintIndex + 1}</b><p>${escapeHtml(state.typedHints[`${key()}-${hintIndex}`] || '')}<i class="cursor">█</i></p><button data-action="hint-audio" data-kind="phone">Přehrát zvukovou nápovědu ${hintIndex + 1}</button></article>`).join('')}</div>${revealed.length < slide.hints.length ? `<button class="ghost" data-action="hint">Zobrazit nápovědu ${revealed.length + 1}</button>` : ''}</aside>`;
}

function renderVerdict() {
  const verdict = state.verdicts[key()];
  if (!verdict) return '';
  if (verdict.neutral) return '<div class="verdict neutral">BEREME NA VĚDOMÍ!</div>';
  return `<div class="verdict ${verdict.ok ? 'approved' : 'denied'}">${verdict.ok ? 'SCHVÁLENO' : 'BEZ DŮKAZŮ'}</div>`;
}

function dynamicDecisionText() {
  if (state.selectedDecision === 'Filipa Procházku') return 'Rozhodl ses stíhat Filipa Procházku. Bylo to skutečně správné rozhodnutí? Přišly nám hotelové logy z hotelu, ve kterém se ubytoval Tomáš Havelka. Mrkni na ně a pak mi dej vědět, jestli má Havelka alibi.';
  return 'Rozhodl ses zadržet Tomáše Havelku. Bylo to skutečně správné rozhodnutí? Přišly nám hotelové logy z hotelu, ve kterém se ubytoval Tomáš Havelka. Mrkni na ně a pak mi dej vědět, jestli má Havelka alibi.';
}

function renderSlide(slide) {
  if (slide.kind === 'start') return `<section class="hero-card"><div class="classification">PŘÍSNĚ INTERNÍ · AUTHORIZED PERSONNEL ONLY</div><h1>${slide.title}</h1><p>${slide.subtitle}</p><div class="status-grid">${slide.details.map(([label, value]) => `<div><span>${label}</span><strong>${value}</strong></div>`).join('')}</div>${renderYoutube(slide.videoUrl)}<button class="primary launch" data-action="next">Zahájit vyšetřování</button></section>`;
  if (slide.kind === 'video') return `<section class="case-panel"><span class="case-badge">${slide.title}</span><h2>${slide.subtitle}</h2>${slide.note ? `<p class="warning-note">${slide.note}</p>` : ''}${renderYoutube(slide.videoUrl)}<button class="primary" data-action="next">${slide.button}</button></section>`;
  if (slide.kind === 'audio') return `<section class="case-panel audio-panel"><span class="case-badge">AUDIO ZÁZNAM</span><h2>${slide.title}</h2><button class="phone huge" data-action="hint-audio">☎</button><p class="transcript">${escapeHtml(slide.transcript)}</p>${slide.dynamicChoice ? `<p class="transcript decision"><em>${dynamicDecisionText()}</em></p>` : ''}${slide.link ? `<a class="external-link" href="${slide.link}" target="_blank" rel="noreferrer">Otevřít sdílený materiál</a>` : ''}${renderHints(slide)}<button class="primary" data-action="next">Pokračovat</button></section>`;
  if (slide.kind === 'final') return `<section class="hero-card final"><div class="classification">CASE CLOSED</div><h1>${slide.title}</h1><p>${slide.subtitle}</p>${renderYoutube(slide.videoUrl)}<button class="primary launch" data-action="finish">Ukončit vyšetřování!</button></section>`;
  return `<section class="case-panel"><span class="case-badge">${slide.caseLabel}</span><h2>${escapeHtml(slide.question)}</h2>${renderQuestion(slide)}${renderVerdict()}${renderHints(slide)}</section>`;
}

function render() {
  const progress = Math.round(((state.index + 1) / slides.length) * 100);
  document.querySelector('#app').innerHTML = `
    <aside class="sidebar">
      <div class="seal"><span>◈</span><div><strong>O.R.I.O.N.</strong><small>Operační Rejstřík Interního Ověřování Nálezů</small></div></div>
      <div class="case-id"><span>Případ</span><strong>2254578/2026</strong><em>ŠEPOTY STROMŮ</em></div>
      <nav>${slides.map((slide, index) => `<button class="${index === state.index ? 'active' : ''}" data-action="jump" data-index="${index}"><b>${String(index + 1).padStart(2, '0')}</b><span>${slide.kind === 'question' ? slide.caseLabel : slide.title}</span></button>`).join('')}</nav>
      <section class="progress-card"><span>Postup vyšetřování</span><strong>${progress}%</strong><div class="progress"><i style="width:${progress}%"></i></div><small>${solvedSlides()}/${playableSlides()} ověřených záznamů</small></section>
      <section class="terminal-log"><header>auditní log</header>${state.accessLog.map((entry) => `<code>${escapeHtml(entry)}</code>`).join('')}</section>
    </aside>
    <section class="workspace">
      <header class="topbar"><div><span class="eyebrow">● SYSTÉM AKTIVNÍ</span><h3>Moderní policejní databáze</h3></div><div class="top-actions"><button data-action="prev">← Zpět</button><button data-action="sound">Test spojení</button></div></header>
      ${renderSlide(currentSlide())}
    </section>`;
}

document.addEventListener('click', (event) => {
  const target = event.target.closest('[data-action]');
  if (!target) return;
  const action = target.dataset.action;
  if (action === 'next') nextSlide();
  if (action === 'prev') previousSlide();
  if (action === 'jump') { state.index = Number(target.dataset.index); render(); }
  if (action === 'sound' || action === 'hint-audio') playTone('phone');
  if (action === 'finish') { setLog('CASE_CLOSED: vyšetřování ukončeno'); playTone('beep'); render(); }
  if (action === 'hint') revealHint();
  if (action === 'choose') { setAnswer(target.dataset.value); submitAnswer(target.dataset.value); }
  if (action === 'toggle') {
    const answer = Array.isArray(state.answers[key()]) ? state.answers[key()] : [];
    const value = target.dataset.value;
    setAnswer(answer.includes(value) ? answer.filter((item) => item !== value) : [...answer, value]);
  }
  if (action === 'submit') submitAnswer();
});

document.addEventListener('input', (event) => {
  const action = event.target.dataset.action;
  if (action === 'text') state.answers[key()] = event.target.value;
  if (action === 'word') {
    const answer = Array.isArray(state.answers[key()]) ? [...state.answers[key()]] : [];
    answer[Number(event.target.dataset.index)] = event.target.value;
    state.answers[key()] = answer;
  }
});

render();
