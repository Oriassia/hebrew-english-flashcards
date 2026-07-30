import { Tier } from "../src/generated/prisma/client";

export type Pair = {
  hebrew: string;
  english: string;
  transliteration?: string;
};

export type Leaf = {
  level: string;
  type: string | null;
  pairs: Pair[];
};

export type LevelMeta = {
  name: string;
  tier: Tier;
  colorHex: string;
  order: number;
};

export const LEVEL_META: LevelMeta[] = [
  {
    name: "Red",
    tier: Tier.Foundation,
    colorHex: "#ef4444",
    order: 0,
  },
  {
    name: "Orange",
    tier: Tier.Foundation,
    colorHex: "#f97316",
    order: 1,
  },
  {
    name: "Pink",
    tier: Tier.Foundation,
    colorHex: "#ec4899",
    order: 2,
  },
  {
    name: "Yellow",
    tier: Tier.Foundation,
    colorHex: "#F9E24C",
    order: 3,
  },
  {
    name: "Light Blue",
    tier: Tier.Flow,
    colorHex: "#38bdf8",
    order: 4,
  },
  {
    name: "Blue",
    tier: Tier.Flow,
    colorHex: "#3b82f6",
    order: 5,
  },
  {
    name: "Lime",
    tier: Tier.Flow,
    colorHex: "#84cc16",
    order: 6,
  },
  {
    name: "Green",
    tier: Tier.Flow,
    colorHex: "#22c55e",
    order: 7,
  },
  {
    name: "Dark Green",
    tier: Tier.Freedom,
    colorHex: "#15803d",
    order: 8,
  },
  {
    name: "Turquoise",
    tier: Tier.Freedom,
    colorHex: "#2dd4bf",
    order: 9,
  },
  {
    name: "Indigo",
    tier: Tier.Freedom,
    colorHex: "#4f46e5",
    order: 10,
  },
  {
    name: "Purple",
    tier: Tier.Freedom,
    colorHex: "#9333ea",
    order: 11,
  },
];

// Assignment-shaped leaves: { level, type, pairs }
export const LEAVES: Leaf[] = [
  {
    level: "Red",
    type: null,
    pairs: [
      { hebrew: "שָׁלוֹם", english: "Hello / Peace", transliteration: "shalom" },
      { hebrew: "תּוֹדָה", english: "Thank you", transliteration: "toda" },
      { hebrew: "בְּבַקָּשָׁה", english: "Please / You're welcome", transliteration: "bevakasha" },
      { hebrew: "כֵּן", english: "Yes", transliteration: "ken" },
      { hebrew: "לֹא", english: "No", transliteration: "lo" },
      { hebrew: "סְלִיחָה", english: "Excuse me / Sorry", transliteration: "slicha" },
      { hebrew: "בֹּקֶר טוֹב", english: "Good morning", transliteration: "boker tov" },
      { hebrew: "לְהִתְרָאוֹת", english: "See you / Goodbye", transliteration: "lehitraot" },
    ],
  },
  {
    level: "Orange",
    type: null,
    pairs: [
      { hebrew: "אֶחָד", english: "One", transliteration: "echad" },
      { hebrew: "שְׁנַיִם", english: "Two", transliteration: "shnayim" },
      { hebrew: "שְׁלוֹשָׁה", english: "Three", transliteration: "shlosha" },
      { hebrew: "אַרְבָּעָה", english: "Four", transliteration: "arba'a" },
      { hebrew: "חֲמִשָּׁה", english: "Five", transliteration: "chamisha" },
      { hebrew: "שִׁשָּׁה", english: "Six", transliteration: "shisha" },
      { hebrew: "שִׁבְעָה", english: "Seven", transliteration: "shiv'a" },
      { hebrew: "שְׁמוֹנָה", english: "Eight", transliteration: "shmona" },
      { hebrew: "תִּשְׁעָה", english: "Nine", transliteration: "tish'a" },
      { hebrew: "עֲשָׂרָה", english: "Ten", transliteration: "asara" },
    ],
  },
  {
    level: "Pink",
    type: null,
    pairs: [
      { hebrew: "אָדֹם", english: "Red", transliteration: "adom" },
      { hebrew: "כָּתֹם", english: "Orange", transliteration: "katom" },
      { hebrew: "צָהֹב", english: "Yellow", transliteration: "tsahov" },
      { hebrew: "יָרֹק", english: "Green", transliteration: "yarok" },
      { hebrew: "כָּחֹל", english: "Blue", transliteration: "kachol" },
      { hebrew: "סָגֹל", english: "Purple", transliteration: "sagol" },
      { hebrew: "וָרֹד", english: "Pink", transliteration: "varod" },
      { hebrew: "שָׁחֹר", english: "Black", transliteration: "shachor" },
      { hebrew: "לָבָן", english: "White", transliteration: "lavan" },
    ],
  },
  {
    level: "Yellow",
    type: null,
    pairs: [
      { hebrew: "אַבָּא", english: "Dad", transliteration: "aba" },
      { hebrew: "אִמָּא", english: "Mom", transliteration: "ima" },
      { hebrew: "אָח", english: "Brother", transliteration: "ach" },
      { hebrew: "אָחוֹת", english: "Sister", transliteration: "achot" },
      { hebrew: "סַבָּא", english: "Grandpa", transliteration: "saba" },
      { hebrew: "סַבְתָא", english: "Grandma", transliteration: "savta" },
      { hebrew: "בֵּן", english: "Son", transliteration: "ben" },
      { hebrew: "בַּת", english: "Daughter", transliteration: "bat" },
      { hebrew: "מִשְׁפָּחָה", english: "Family", transliteration: "mishpacha" },
    ],
  },
  {
    level: "Light Blue",
    type: null,
    pairs: [
      { hebrew: "לֶחֶם", english: "Bread", transliteration: "lechem" },
      { hebrew: "מַיִם", english: "Water", transliteration: "mayim" },
      { hebrew: "קָפֶה", english: "Coffee", transliteration: "kafe" },
      { hebrew: "חָלָב", english: "Milk", transliteration: "chalav" },
      { hebrew: "בֵּיצָה", english: "Egg", transliteration: "beitsa" },
      { hebrew: "גְּבִינָה", english: "Cheese", transliteration: "gvina" },
      { hebrew: "תַּפּוּחַ", english: "Apple", transliteration: "tapuach" },
      { hebrew: "יַיִן", english: "Wine", transliteration: "yayin" },
    ],
  },
  {
    level: "Blue",
    type: null,
    pairs: [
      { hebrew: "יוֹם", english: "Day", transliteration: "yom" },
      { hebrew: "שָׁבוּעַ", english: "Week", transliteration: "shavua" },
      { hebrew: "חֹדֶשׁ", english: "Month", transliteration: "chodesh" },
      { hebrew: "שָׁנָה", english: "Year", transliteration: "shana" },
      { hebrew: "הַיּוֹם", english: "Today", transliteration: "hayom" },
      { hebrew: "מָחָר", english: "Tomorrow", transliteration: "machar" },
      { hebrew: "אֶתְמוֹל", english: "Yesterday", transliteration: "etmol" },
      { hebrew: "שָׁעָה", english: "Hour", transliteration: "sha'a" },
    ],
  },
  {
    level: "Lime",
    type: null,
    pairs: [
      { hebrew: "לֶאֱכֹל", english: "To eat", transliteration: "le'echol" },
      { hebrew: "לִשְׁתּוֹת", english: "To drink", transliteration: "lishtot" },
      { hebrew: "לָלֶכֶת", english: "To go / walk", transliteration: "lalechet" },
      { hebrew: "לָבוֹא", english: "To come", transliteration: "lavo" },
      { hebrew: "לִרְאוֹת", english: "To see", transliteration: "lir'ot" },
      { hebrew: "לִשְׁמֹעַ", english: "To hear", transliteration: "lishmoa" },
      { hebrew: "לְדַבֵּר", english: "To speak", transliteration: "ledaber" },
      { hebrew: "לִלְמֹד", english: "To learn / study", transliteration: "lilmod" },
    ],
  },
  {
    level: "Green",
    type: null,
    pairs: [
      { hebrew: "בַּיִת", english: "House", transliteration: "bayit" },
      { hebrew: "רְחוֹב", english: "Street", transliteration: "rechov" },
      { hebrew: "חֲנוּת", english: "Shop", transliteration: "chanut" },
      { hebrew: "בֵּית קָפֶה", english: "Café", transliteration: "beit kafe" },
      { hebrew: "שׁוּק", english: "Market", transliteration: "shuk" },
      { hebrew: "תַּחֲנָה", english: "Station", transliteration: "tachana" },
      { hebrew: "בֵּית חוֹלִים", english: "Hospital", transliteration: "beit cholim" },
      { hebrew: "גַּן", english: "Park / garden", transliteration: "gan" },
    ],
  },
  {
    level: "Dark Green",
    type: "Pack 1",
    pairs: [
      { hebrew: "עֲבוֹדָה", english: "Work", transliteration: "avoda" },
      { hebrew: "מִשְׂרָד", english: "Office", transliteration: "misrad" },
      { hebrew: "פְּגִישָׁה", english: "Meeting", transliteration: "pgisha" },
      { hebrew: "מְנַהֵל", english: "Manager", transliteration: "menahel" },
      { hebrew: "מַחְשֵׁב", english: "Computer", transliteration: "machshev" },
      { hebrew: "טֶלֶפוֹן", english: "Telephone", transliteration: "telefon" },
      { hebrew: "מִכְתָּב", english: "Letter", transliteration: "michtav" },
      { hebrew: "כֶּסֶף", english: "Money", transliteration: "kesef" },
    ],
  },
  {
    level: "Dark Green",
    type: "Pack 2",
    pairs: [
      { hebrew: "שָׂמֵחַ", english: "Happy", transliteration: "sameach" },
      { hebrew: "עָצוּב", english: "Sad", transliteration: "atsuv" },
      { hebrew: "כּוֹעֵס", english: "Angry", transliteration: "ko'es" },
      { hebrew: "עָיֵף", english: "Tired", transliteration: "ayef" },
      { hebrew: "מְפֻחָד", english: "Scared", transliteration: "mefuchad" },
      { hebrew: "גֵּאֶה", english: "Proud", transliteration: "ge'e" },
      { hebrew: "אֹשֶׁר", english: "Happiness", transliteration: "osher" },
      { hebrew: "אַהֲבָה", english: "Love", transliteration: "ahava" },
    ],
  },
  {
    level: "Dark Green",
    type: "Pack 3",
    pairs: [
      { hebrew: "מָטוֹס", english: "Airplane", transliteration: "matos" },
      { hebrew: "שְׂדֵה תְּעוּפָה", english: "Airport", transliteration: "sde te'ufa" },
      { hebrew: "מָלוֹן", english: "Hotel", transliteration: "malon" },
      { hebrew: "כַּרְטִיס", english: "Ticket", transliteration: "kartis" },
      { hebrew: "מִזְוָדָה", english: "Suitcase", transliteration: "mizvada" },
      { hebrew: "דַּרְכּוֹן", english: "Passport", transliteration: "darkon" },
      { hebrew: "מַפָּה", english: "Map", transliteration: "mapa" },
      { hebrew: "חוֹף", english: "Beach", transliteration: "chof" },
    ],
  },
  {
    level: "Dark Green",
    type: "Pack 4",
    pairs: [
      { hebrew: "שֶׁמֶשׁ", english: "Sun", transliteration: "shemesh" },
      { hebrew: "יָרֵחַ", english: "Moon", transliteration: "yareach" },
      { hebrew: "כּוֹכָב", english: "Star", transliteration: "kochav" },
      { hebrew: "עֵץ", english: "Tree", transliteration: "ets" },
      { hebrew: "פֶּרַח", english: "Flower", transliteration: "perach" },
      { hebrew: "יָם", english: "Sea", transliteration: "yam" },
      { hebrew: "הַר", english: "Mountain", transliteration: "har" },
      { hebrew: "שָׁמַיִם", english: "Sky", transliteration: "shamayim" },
    ],
  },
  {
    level: "Turquoise",
    type: "Pack 1",
    pairs: [
      { hebrew: "רֹאשׁ", english: "Head", transliteration: "rosh" },
      { hebrew: "יָד", english: "Hand", transliteration: "yad" },
      { hebrew: "רֶגֶל", english: "Leg / foot", transliteration: "regel" },
      { hebrew: "עַיִן", english: "Eye", transliteration: "ayin" },
      { hebrew: "אֹזֶן", english: "Ear", transliteration: "ozen" },
      { hebrew: "פֶּה", english: "Mouth", transliteration: "pe" },
      { hebrew: "אַף", english: "Nose", transliteration: "af" },
      { hebrew: "לֵב", english: "Heart", transliteration: "lev" },
    ],
  },
  {
    level: "Turquoise",
    type: "Pack 2",
    pairs: [
      { hebrew: "חֻלְצָה", english: "Shirt", transliteration: "chultsa" },
      { hebrew: "מִכְנָסַיִם", english: "Pants", transliteration: "michnasayim" },
      { hebrew: "נַעֲלַיִם", english: "Shoes", transliteration: "na'alayim" },
      { hebrew: "שִׂמְלָה", english: "Dress", transliteration: "simla" },
      { hebrew: "כּוֹבַע", english: "Hat", transliteration: "kova" },
      { hebrew: "מְעִיל", english: "Coat", transliteration: "me'il" },
      { hebrew: "גַּרְבַּיִם", english: "Socks", transliteration: "garbayim" },
      { hebrew: "חֲגוֹרָה", english: "Belt", transliteration: "chagora" },
    ],
  },
  {
    level: "Turquoise",
    type: "Pack 3",
    pairs: [
      { hebrew: "מֶזֶג אֲוִיר", english: "Weather", transliteration: "mezeg avir" },
      { hebrew: "גֶּשֶׁם", english: "Rain", transliteration: "geshem" },
      { hebrew: "שֶׁלֶג", english: "Snow", transliteration: "sheleg" },
      { hebrew: "רוּחַ", english: "Wind", transliteration: "ruach" },
      { hebrew: "עָנָן", english: "Cloud", transliteration: "anan" },
      { hebrew: "חַם", english: "Hot", transliteration: "cham" },
      { hebrew: "קַר", english: "Cold", transliteration: "kar" },
      { hebrew: "סוּפָה", english: "Storm", transliteration: "sufa" },
    ],
  },
  {
    level: "Turquoise",
    type: "Pack 4",
    pairs: [
      { hebrew: "דֶּלֶת", english: "Door", transliteration: "delet" },
      { hebrew: "חַלּוֹן", english: "Window", transliteration: "chalon" },
      { hebrew: "שֻׁלְחָן", english: "Table", transliteration: "shulchan" },
      { hebrew: "כִּסֵּא", english: "Chair", transliteration: "kise" },
      { hebrew: "מִטָּה", english: "Bed", transliteration: "mita" },
      { hebrew: "מִטְבָּח", english: "Kitchen", transliteration: "mitbach" },
      { hebrew: "חֶדֶר", english: "Room", transliteration: "cheder" },
      { hebrew: "מַפְתֵּחַ", english: "Key", transliteration: "mafteach" },
    ],
  },
  {
    level: "Indigo",
    type: "Pack 1",
    pairs: [
      { hebrew: "גָּדוֹל", english: "Big", transliteration: "gadol" },
      { hebrew: "קָטָן", english: "Small", transliteration: "katan" },
      { hebrew: "חָדָשׁ", english: "New", transliteration: "chadash" },
      { hebrew: "יָשָׁן", english: "Old", transliteration: "yashan" },
      { hebrew: "טוֹב", english: "Good", transliteration: "tov" },
      { hebrew: "רַע", english: "Bad", transliteration: "ra" },
      { hebrew: "יָפֶה", english: "Beautiful", transliteration: "yafe" },
      { hebrew: "קָשֶׁה", english: "Difficult", transliteration: "kashe" },
    ],
  },
  {
    level: "Indigo",
    type: "Pack 2",
    pairs: [
      { hebrew: "מְאֹד", english: "Very", transliteration: "me'od" },
      { hebrew: "גַּם", english: "Also", transliteration: "gam" },
      { hebrew: "אֲבָל", english: "But", transliteration: "aval" },
      { hebrew: "כִּי", english: "Because", transliteration: "ki" },
      { hebrew: "אוּלַי", english: "Maybe", transliteration: "ulay" },
      { hebrew: "תָּמִיד", english: "Always", transliteration: "tamid" },
      { hebrew: "אַף פַּעַם", english: "Never", transliteration: "af pa'am" },
      { hebrew: "עַכְשָׁיו", english: "Now", transliteration: "achshav" },
    ],
  },
  {
    level: "Indigo",
    type: "Pack 3",
    pairs: [
      { hebrew: "לִקְנוֹת", english: "To buy", transliteration: "liknot" },
      { hebrew: "לִמְכֹּר", english: "To sell", transliteration: "limkor" },
      { hebrew: "מְחִיר", english: "Price", transliteration: "mechir" },
      { hebrew: "מִבְצָע", english: "Sale", transliteration: "mivtsa" },
      { hebrew: "קַבָּלָה", english: "Receipt", transliteration: "kabala" },
      { hebrew: "עֹדֶף", english: "Change", transliteration: "odef" },
      { hebrew: "יָקָר", english: "Expensive", transliteration: "yakar" },
      { hebrew: "זוֹל", english: "Cheap", transliteration: "zol" },
    ],
  },
  {
    level: "Indigo",
    type: "Pack 4",
    pairs: [
      { hebrew: "רוֹפֵא", english: "Doctor", transliteration: "rofe" },
      { hebrew: "חוֹלֶה", english: "Sick", transliteration: "chole" },
      { hebrew: "בָּרִיא", english: "Healthy", transliteration: "bari" },
      { hebrew: "כְּאֵב", english: "Pain", transliteration: "ke'ev" },
      { hebrew: "תְּרוּפָה", english: "Medicine", transliteration: "trufa" },
      { hebrew: "בֵּית מִרְקַחַת", english: "Pharmacy", transliteration: "beit mirkachat" },
      { hebrew: "חֹם", english: "Fever", transliteration: "chom" },
      { hebrew: "מִרְפָּאָה", english: "Clinic", transliteration: "mirpa'a" },
    ],
  },
  {
    level: "Indigo",
    type: "Pack 5",
    pairs: [
      { hebrew: "מַחְשֵׁב", english: "Computer", transliteration: "machshev" },
      { hebrew: "מָסָךְ", english: "Screen", transliteration: "masach" },
      { hebrew: "אִינְטֶרְנֶט", english: "Internet", transliteration: "internet" },
      { hebrew: "אִימֵייל", english: "Email", transliteration: "email" },
      { hebrew: "סִיסְמָה", english: "Password", transliteration: "sisma" },
      { hebrew: "קֹבֶץ", english: "File", transliteration: "kovets" },
      { hebrew: "יִישׂוּמוֹן", english: "App", transliteration: "yisumon" },
      { hebrew: "מִקְלֶדֶת", english: "Keyboard", transliteration: "mikledet" },
    ],
  },
  {
    level: "Indigo",
    type: "Pack 6",
    pairs: [
      { hebrew: "זְמַן", english: "Time", transliteration: "zman" },
      { hebrew: "אֱמֶת", english: "Truth", transliteration: "emet" },
      { hebrew: "חֹפֶשׁ", english: "Freedom", transliteration: "chofesh" },
      { hebrew: "חֲלוֹם", english: "Dream", transliteration: "chalom" },
      { hebrew: "רַעְיוֹן", english: "Idea", transliteration: "ra'ayon" },
      { hebrew: "זִכָּרוֹן", english: "Memory", transliteration: "zikaron" },
      { hebrew: "מַזָּל", english: "Luck", transliteration: "mazal" },
      { hebrew: "שִׂנְאָה", english: "Hatred", transliteration: "sin'a" },
    ],
  },
  {
    level: "Purple",
    type: null,
    pairs: [
      { hebrew: "בְּתֵאָבוֹן", english: "Bon appétit", transliteration: "bete'avon" },
      { hebrew: "כָּל הַכָּבוֹד", english: "Well done", transliteration: "kol hakavod" },
      { hebrew: "בְּהַצְלָחָה", english: "Good luck", transliteration: "behatslacha" },
      { hebrew: "אֵין בְּעָיָה", english: "No problem", transliteration: "ein be'aya" },
      { hebrew: "מַה נִּשְׁמָע", english: "What's up", transliteration: "ma nishma" },
      { hebrew: "יַאללָה", english: "Come on / let's go", transliteration: "yalla" },
      { hebrew: "חֲבָל עַל הַזְּמַן", english: "Amazing (idiom)", transliteration: "chaval al hazman" },
      { hebrew: "סַבָּבָה", english: "Cool / okay", transliteration: "sababa" },
    ],
  },
];
