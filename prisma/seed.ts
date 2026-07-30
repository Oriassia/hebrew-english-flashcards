// Load .env before importing the db singleton, which reads DATABASE_URL at
// module-eval time. Enables both `npm run seed` and `npx prisma db seed`.
import "dotenv/config";
import { db } from "../src/db";
import { Tier } from "../src/generated/prisma/client";

type Card = { hebrew: string; english: string; transliteration?: string };
type LeafSet = { typeLabel: string | null; cards: Card[] };
type LevelSeed = {
  name: string;
  tier: Tier;
  colorHex: string;
  sets: LeafSet[];
};

// Shorthand card constructor to keep the taxonomy readable.
const c = (hebrew: string, english: string, transliteration: string): Card => ({
  hebrew,
  english,
  transliteration,
});

// Full taxonomy: Tier -> Level -> (Type/Pack) -> Flashcards.
// Untyped levels have a single set with typeLabel = null.
const taxonomy: LevelSeed[] = [
  // ── Foundation ──────────────────────────────────────────────
  {
    name: "Red",
    tier: Tier.Foundation,
    colorHex: "#ef4444",
    sets: [
      {
        typeLabel: null,
        cards: [
          c("שָׁלוֹם", "Hello / Peace", "shalom"),
          c("תּוֹדָה", "Thank you", "toda"),
          c("בְּבַקָּשָׁה", "Please / You're welcome", "bevakasha"),
          c("כֵּן", "Yes", "ken"),
          c("לֹא", "No", "lo"),
          c("סְלִיחָה", "Excuse me / Sorry", "slicha"),
          c("בֹּקֶר טוֹב", "Good morning", "boker tov"),
          c("לְהִתְרָאוֹת", "See you / Goodbye", "lehitraot"),
        ],
      },
    ],
  },
  {
    name: "Orange",
    tier: Tier.Foundation,
    colorHex: "#f97316",
    sets: [
      {
        typeLabel: null,
        cards: [
          c("אֶחָד", "One", "echad"),
          c("שְׁנַיִם", "Two", "shnayim"),
          c("שְׁלוֹשָׁה", "Three", "shlosha"),
          c("אַרְבָּעָה", "Four", "arba'a"),
          c("חֲמִשָּׁה", "Five", "chamisha"),
          c("שִׁשָּׁה", "Six", "shisha"),
          c("שִׁבְעָה", "Seven", "shiv'a"),
          c("שְׁמוֹנָה", "Eight", "shmona"),
          c("תִּשְׁעָה", "Nine", "tish'a"),
          c("עֲשָׂרָה", "Ten", "asara"),
        ],
      },
    ],
  },
  {
    name: "Pink",
    tier: Tier.Foundation,
    colorHex: "#ec4899",
    sets: [
      {
        typeLabel: null,
        cards: [
          c("אָדֹם", "Red", "adom"),
          c("כָּתֹם", "Orange", "katom"),
          c("צָהֹב", "Yellow", "tsahov"),
          c("יָרֹק", "Green", "yarok"),
          c("כָּחֹל", "Blue", "kachol"),
          c("סָגֹל", "Purple", "sagol"),
          c("וָרֹד", "Pink", "varod"),
          c("שָׁחֹר", "Black", "shachor"),
          c("לָבָן", "White", "lavan"),
        ],
      },
    ],
  },
  {
    name: "Yellow",
    tier: Tier.Foundation,
    colorHex: "#F9E24C",
    sets: [
      {
        typeLabel: null,
        cards: [
          c("אַבָּא", "Dad", "aba"),
          c("אִמָּא", "Mom", "ima"),
          c("אָח", "Brother", "ach"),
          c("אָחוֹת", "Sister", "achot"),
          c("סַבָּא", "Grandpa", "saba"),
          c("סַבְתָא", "Grandma", "savta"),
          c("בֵּן", "Son", "ben"),
          c("בַּת", "Daughter", "bat"),
          c("מִשְׁפָּחָה", "Family", "mishpacha"),
        ],
      },
    ],
  },

  // ── Flow ────────────────────────────────────────────────────
  {
    name: "Light Blue",
    tier: Tier.Flow,
    colorHex: "#38bdf8",
    sets: [
      {
        typeLabel: null,
        cards: [
          c("לֶחֶם", "Bread", "lechem"),
          c("מַיִם", "Water", "mayim"),
          c("קָפֶה", "Coffee", "kafe"),
          c("חָלָב", "Milk", "chalav"),
          c("בֵּיצָה", "Egg", "beitsa"),
          c("גְּבִינָה", "Cheese", "gvina"),
          c("תַּפּוּחַ", "Apple", "tapuach"),
          c("יַיִן", "Wine", "yayin"),
        ],
      },
    ],
  },
  {
    name: "Blue",
    tier: Tier.Flow,
    colorHex: "#3b82f6",
    sets: [
      {
        typeLabel: null,
        cards: [
          c("יוֹם", "Day", "yom"),
          c("שָׁבוּעַ", "Week", "shavua"),
          c("חֹדֶשׁ", "Month", "chodesh"),
          c("שָׁנָה", "Year", "shana"),
          c("הַיּוֹם", "Today", "hayom"),
          c("מָחָר", "Tomorrow", "machar"),
          c("אֶתְמוֹל", "Yesterday", "etmol"),
          c("שָׁעָה", "Hour", "sha'a"),
        ],
      },
    ],
  },
  {
    name: "Lime",
    tier: Tier.Flow,
    colorHex: "#84cc16",
    sets: [
      {
        typeLabel: null,
        cards: [
          c("לֶאֱכֹל", "To eat", "le'echol"),
          c("לִשְׁתּוֹת", "To drink", "lishtot"),
          c("לָלֶכֶת", "To go / walk", "lalechet"),
          c("לָבוֹא", "To come", "lavo"),
          c("לִרְאוֹת", "To see", "lir'ot"),
          c("לִשְׁמֹעַ", "To hear", "lishmoa"),
          c("לְדַבֵּר", "To speak", "ledaber"),
          c("לִלְמֹד", "To learn / study", "lilmod"),
        ],
      },
    ],
  },
  {
    name: "Green",
    tier: Tier.Flow,
    colorHex: "#22c55e",
    sets: [
      {
        typeLabel: null,
        cards: [
          c("בַּיִת", "House", "bayit"),
          c("רְחוֹב", "Street", "rechov"),
          c("חֲנוּת", "Shop", "chanut"),
          c("בֵּית קָפֶה", "Café", "beit kafe"),
          c("שׁוּק", "Market", "shuk"),
          c("תַּחֲנָה", "Station", "tachana"),
          c("בֵּית חוֹלִים", "Hospital", "beit cholim"),
          c("גַּן", "Park / garden", "gan"),
        ],
      },
    ],
  },

  // ── Freedom ─────────────────────────────────────────────────
  {
    name: "Dark Green",
    tier: Tier.Freedom,
    colorHex: "#15803d",
    sets: [
      {
        typeLabel: "Pack 1",
        cards: [
          c("עֲבוֹדָה", "Work", "avoda"),
          c("מִשְׂרָד", "Office", "misrad"),
          c("פְּגִישָׁה", "Meeting", "pgisha"),
          c("מְנַהֵל", "Manager", "menahel"),
          c("מַחְשֵׁב", "Computer", "machshev"),
          c("טֶלֶפוֹן", "Telephone", "telefon"),
          c("מִכְתָּב", "Letter", "michtav"),
          c("כֶּסֶף", "Money", "kesef"),
        ],
      },
      {
        typeLabel: "Pack 2",
        cards: [
          c("שָׂמֵחַ", "Happy", "sameach"),
          c("עָצוּב", "Sad", "atsuv"),
          c("כּוֹעֵס", "Angry", "ko'es"),
          c("עָיֵף", "Tired", "ayef"),
          c("מְפֻחָד", "Scared", "mefuchad"),
          c("גֵּאֶה", "Proud", "ge'e"),
          c("אֹשֶׁר", "Happiness", "osher"),
          c("אַהֲבָה", "Love", "ahava"),
        ],
      },
      {
        typeLabel: "Pack 3",
        cards: [
          c("מָטוֹס", "Airplane", "matos"),
          c("שְׂדֵה תְּעוּפָה", "Airport", "sde te'ufa"),
          c("מָלוֹן", "Hotel", "malon"),
          c("כַּרְטִיס", "Ticket", "kartis"),
          c("מִזְוָדָה", "Suitcase", "mizvada"),
          c("דַּרְכּוֹן", "Passport", "darkon"),
          c("מַפָּה", "Map", "mapa"),
          c("חוֹף", "Beach", "chof"),
        ],
      },
      {
        typeLabel: "Pack 4",
        cards: [
          c("שֶׁמֶשׁ", "Sun", "shemesh"),
          c("יָרֵחַ", "Moon", "yareach"),
          c("כּוֹכָב", "Star", "kochav"),
          c("עֵץ", "Tree", "ets"),
          c("פֶּרַח", "Flower", "perach"),
          c("יָם", "Sea", "yam"),
          c("הַר", "Mountain", "har"),
          c("שָׁמַיִם", "Sky", "shamayim"),
        ],
      },
    ],
  },
  {
    name: "Turquoise",
    tier: Tier.Freedom,
    colorHex: "#2dd4bf",
    sets: [
      {
        typeLabel: "Pack 1",
        cards: [
          c("רֹאשׁ", "Head", "rosh"),
          c("יָד", "Hand", "yad"),
          c("רֶגֶל", "Leg / foot", "regel"),
          c("עַיִן", "Eye", "ayin"),
          c("אֹזֶן", "Ear", "ozen"),
          c("פֶּה", "Mouth", "pe"),
          c("אַף", "Nose", "af"),
          c("לֵב", "Heart", "lev"),
        ],
      },
      {
        typeLabel: "Pack 2",
        cards: [
          c("חֻלְצָה", "Shirt", "chultsa"),
          c("מִכְנָסַיִם", "Pants", "michnasayim"),
          c("נַעֲלַיִם", "Shoes", "na'alayim"),
          c("שִׂמְלָה", "Dress", "simla"),
          c("כּוֹבַע", "Hat", "kova"),
          c("מְעִיל", "Coat", "me'il"),
          c("גַּרְבַּיִם", "Socks", "garbayim"),
          c("חֲגוֹרָה", "Belt", "chagora"),
        ],
      },
      {
        typeLabel: "Pack 3",
        cards: [
          c("מֶזֶג אֲוִיר", "Weather", "mezeg avir"),
          c("גֶּשֶׁם", "Rain", "geshem"),
          c("שֶׁלֶג", "Snow", "sheleg"),
          c("רוּחַ", "Wind", "ruach"),
          c("עָנָן", "Cloud", "anan"),
          c("חַם", "Hot", "cham"),
          c("קַר", "Cold", "kar"),
          c("סוּפָה", "Storm", "sufa"),
        ],
      },
      {
        typeLabel: "Pack 4",
        cards: [
          c("דֶּלֶת", "Door", "delet"),
          c("חַלּוֹן", "Window", "chalon"),
          c("שֻׁלְחָן", "Table", "shulchan"),
          c("כִּסֵּא", "Chair", "kise"),
          c("מִטָּה", "Bed", "mita"),
          c("מִטְבָּח", "Kitchen", "mitbach"),
          c("חֶדֶר", "Room", "cheder"),
          c("מַפְתֵּחַ", "Key", "mafteach"),
        ],
      },
    ],
  },
  {
    name: "Indigo",
    tier: Tier.Freedom,
    colorHex: "#4f46e5",
    sets: [
      {
        typeLabel: "Pack 1",
        cards: [
          c("גָּדוֹל", "Big", "gadol"),
          c("קָטָן", "Small", "katan"),
          c("חָדָשׁ", "New", "chadash"),
          c("יָשָׁן", "Old", "yashan"),
          c("טוֹב", "Good", "tov"),
          c("רַע", "Bad", "ra"),
          c("יָפֶה", "Beautiful", "yafe"),
          c("קָשֶׁה", "Difficult", "kashe"),
        ],
      },
      {
        typeLabel: "Pack 2",
        cards: [
          c("מְאֹד", "Very", "me'od"),
          c("גַּם", "Also", "gam"),
          c("אֲבָל", "But", "aval"),
          c("כִּי", "Because", "ki"),
          c("אוּלַי", "Maybe", "ulay"),
          c("תָּמִיד", "Always", "tamid"),
          c("אַף פַּעַם", "Never", "af pa'am"),
          c("עַכְשָׁיו", "Now", "achshav"),
        ],
      },
      {
        typeLabel: "Pack 3",
        cards: [
          c("לִקְנוֹת", "To buy", "liknot"),
          c("לִמְכֹּר", "To sell", "limkor"),
          c("מְחִיר", "Price", "mechir"),
          c("מִבְצָע", "Sale", "mivtsa"),
          c("קַבָּלָה", "Receipt", "kabala"),
          c("עֹדֶף", "Change", "odef"),
          c("יָקָר", "Expensive", "yakar"),
          c("זוֹל", "Cheap", "zol"),
        ],
      },
      {
        typeLabel: "Pack 4",
        cards: [
          c("רוֹפֵא", "Doctor", "rofe"),
          c("חוֹלֶה", "Sick", "chole"),
          c("בָּרִיא", "Healthy", "bari"),
          c("כְּאֵב", "Pain", "ke'ev"),
          c("תְּרוּפָה", "Medicine", "trufa"),
          c("בֵּית מִרְקַחַת", "Pharmacy", "beit mirkachat"),
          c("חֹם", "Fever", "chom"),
          c("מִרְפָּאָה", "Clinic", "mirpa'a"),
        ],
      },
      {
        typeLabel: "Pack 5",
        cards: [
          c("מַחְשֵׁב", "Computer", "machshev"),
          c("מָסָךְ", "Screen", "masach"),
          c("אִינְטֶרְנֶט", "Internet", "internet"),
          c("אִימֵייל", "Email", "email"),
          c("סִיסְמָה", "Password", "sisma"),
          c("קֹבֶץ", "File", "kovets"),
          c("יִישׂוּמוֹן", "App", "yisumon"),
          c("מִקְלֶדֶת", "Keyboard", "mikledet"),
        ],
      },
      {
        typeLabel: "Pack 6",
        cards: [
          c("זְמַן", "Time", "zman"),
          c("אֱמֶת", "Truth", "emet"),
          c("חֹפֶשׁ", "Freedom", "chofesh"),
          c("חֲלוֹם", "Dream", "chalom"),
          c("רַעְיוֹן", "Idea", "ra'ayon"),
          c("זִכָּרוֹן", "Memory", "zikaron"),
          c("מַזָּל", "Luck", "mazal"),
          c("שִׂנְאָה", "Hatred", "sin'a"),
        ],
      },
    ],
  },
  {
    name: "Purple",
    tier: Tier.Freedom,
    colorHex: "#9333ea",
    sets: [
      {
        typeLabel: null,
        cards: [
          c("בְּתֵאָבוֹן", "Bon appétit", "bete'avon"),
          c("כָּל הַכָּבוֹד", "Well done", "kol hakavod"),
          c("בְּהַצְלָחָה", "Good luck", "behatslacha"),
          c("אֵין בְּעָיָה", "No problem", "ein be'aya"),
          c("מַה נִּשְׁמָע", "What's up", "ma nishma"),
          c("יַאללָה", "Come on / let's go", "yalla"),
          c("חֲבָל עַל הַזְּמַן", "Amazing (idiom)", "chaval al hazman"),
          c("סַבָּבָה", "Cool / okay", "sababa"),
        ],
      },
    ],
  },
];

async function main() {
  // Idempotent: clear then re-insert. Cascades remove children, but we
  // delete explicitly for clarity and determinism.
  await db.flashcard.deleteMany();
  await db.cardSet.deleteMany();
  await db.level.deleteMany();

  for (const [levelIndex, level] of taxonomy.entries()) {
    await db.level.create({
      data: {
        name: level.name,
        tier: level.tier,
        colorHex: level.colorHex,
        order: levelIndex,
        cardSets: {
          create: level.sets.map((set, setIndex) => ({
            typeLabel: set.typeLabel,
            order: setIndex,
            flashcards: {
              create: set.cards.map((card, cardIndex) => ({
                hebrew: card.hebrew,
                english: card.english,
                transliteration: card.transliteration ?? null,
                order: cardIndex,
              })),
            },
          })),
        },
      },
    });
  }

  const levels = await db.level.count();
  const sets = await db.cardSet.count();
  const cards = await db.flashcard.count();
  console.log(
    `Seed complete: ${levels} levels, ${sets} card sets, ${cards} flashcards.`
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
