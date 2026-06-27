// Generates a SYNTHETIC dataset of up to 10,000 Indian recipes as
// [{ name, description, ingredients[], steps[], location }].
// Built combinatorially from dish-families × fillings/styles × regions, with
// per-family step templates (prep → serve) and Anveshan product branding.
// NOTE: synthetic data — coherent and complete, but methods are templated
// per family (formulaic), not unique artisanal prose.
import { writeFileSync } from "fs";

const CAP = 10000;

const COMMON = ["salt", "turmeric powder", "red chilli powder", "cumin seeds", "oil"];

// region → adjective + signature ingredient
const REGIONS = [
  { state: "Punjab", adj: "Punjabi", sig: "butter" },
  { state: "Maharashtra", adj: "Maharashtrian", sig: "goda masala" },
  { state: "Gujarat", adj: "Gujarati", sig: "jaggery" },
  { state: "Rajasthan", adj: "Rajasthani", sig: "dried red chilli" },
  { state: "West Bengal", adj: "Bengali", sig: "mustard oil" },
  { state: "Tamil Nadu", adj: "Tamil", sig: "curry leaves" },
  { state: "Kerala", adj: "Kerala", sig: "coconut" },
  { state: "Karnataka", adj: "Karnataka", sig: "tamarind" },
  { state: "Andhra Pradesh", adj: "Andhra", sig: "Guntur red chilli" },
  { state: "Telangana", adj: "Telangana", sig: "tamarind" },
  { state: "Uttar Pradesh", adj: "Awadhi", sig: "kewra water" },
  { state: "Bihar", adj: "Bihari", sig: "mustard oil" },
  { state: "Madhya Pradesh", adj: "Malwa", sig: "peanuts" },
  { state: "Goa", adj: "Goan", sig: "kokum" },
  { state: "Jammu & Kashmir", adj: "Kashmiri", sig: "saffron" },
  { state: "Himachal Pradesh", adj: "Pahari", sig: "Himalayan herbs" },
  { state: "Uttarakhand", adj: "Kumaoni", sig: "jakhya seeds" },
  { state: "Odisha", adj: "Odia", sig: "panch phoron" },
  { state: "Assam", adj: "Assamese", sig: "bhut jolokia" },
  { state: "Haryana", adj: "Haryanvi", sig: "ghee" },
  { state: "Delhi", adj: "Delhi-style", sig: "garam masala" },
  { state: "Telangana", adj: "Hyderabadi", sig: "saffron" },
  { state: "Chhattisgarh", adj: "Chhattisgarhi", sig: "rice flour" },
  { state: "Jharkhand", adj: "Jharkhandi", sig: "mustard oil" },
];

const STYLE_EXTRAS = {
  Masala: ["garam masala", "coriander powder"],
  Spicy: ["green chillies", "black pepper"],
  Garlic: ["garlic"],
  Butter: ["butter", "cream"],
  Cheesy: ["cheese"],
  Stuffed: ["ghee"],
  Dry: [],
  "Dhaba-style": ["kasuri methi", "garam masala"],
  "Home-style": [],
  Kadai: ["capsicum", "kadai masala"],
  Handi: ["cream", "whole spices"],
  Tadka: ["ghee", "asafoetida", "dried red chilli"],
  Fry: ["onion", "garlic"],
  Festive: ["ghee", "whole spices", "saffron"],
  Quick: [],
  Roasted: ["ghee"],
  Classic: [],
  Punjabi: ["butter", "kasuri methi"],
  Crispy: ["bread crumbs"],
  Tava: ["oil"],
  Spiced: ["whole spices"],
};

// Ingredient → branded Anveshan product (applied to ingredients AND steps).
const BRAND = {
  ghee: "Anveshan Ghee",
  jaggery: "Anveshan Jaggery",
  oil: "Anveshan Wood-Pressed Oil",
  "mustard oil": "Anveshan Mustard Oil",
  "groundnut oil": "Anveshan Groundnut Oil",
  "coconut oil": "Anveshan Coconut Oil",
  "sesame oil": "Anveshan Sesame Oil",
  "whole wheat flour": "Anveshan Khapli Atta",
  honey: "Anveshan Wild Forest Honey",
  saffron: "Anveshan Kashmiri Saffron",
};
const brand = (x) => BRAND[x.toLowerCase()] || x;
const brandList = (arr) => [...new Set(arr.filter(Boolean).map((s) => brand(s.trim())))];

function describe(name, label, region, ingredients) {
  const anv = ingredients.filter((i) => i.startsWith("Anveshan")).slice(0, 3);
  const anvText = anv.length ? ` made with ${anv.join(", ")}` : "";
  return `${name} is a ${region} ${label} recipe${anvText}. Easy step-by-step instructions from preparation to serving.`;
}

const regionStep = (c) =>
  c.regionTouch ? [`Regional touch: finish with a little ${c.regionTouch} for authentic ${c.region} flavour.`] : [];

// Each family: dish-noun format, base ingredients, fillings, styles, and a
// step-template (prep → cook → serve) keyed to that family's cooking method.
const FAMILIES = [
  {
    label: "stuffed paratha",
    fmt: (style, main) => `${style} ${main.name} Paratha`.trim(),
    base: ["whole wheat flour", "ghee", "water"],
    mains: [
      ["Aloo", ["potatoes"]], ["Gobi", ["cauliflower"]], ["Paneer", ["paneer"]],
      ["Mooli", ["radish"]], ["Methi", ["fenugreek leaves"]], ["Onion", ["onions"]],
      ["Mixed Veg", ["mixed vegetables"]], ["Palak", ["spinach"]], ["Matar", ["green peas"]],
      ["Carrot", ["grated carrot"]], ["Cabbage", ["cabbage"]], ["Dal", ["cooked dal"]],
      ["Sattu", ["roasted gram flour"]], ["Beetroot", ["beetroot"]], ["Pyaaz", ["onions"]],
    ],
    styles: ["Classic", "Masala", "Spicy", "Garlic", "Stuffed", "Cheesy"],
    steps: (c) => [
      `Make the dough: Knead Anveshan Khapli Atta with a spoonful of Anveshan Ghee, salt and water into a soft, pliable dough and rest for 15 minutes.`,
      `Prepare the ${c.main} filling: Mash or finely chop the ${c.mains}, then mix with salt, red chilli powder, cumin and a little coriander.`,
      `Stuff and roll: Divide the dough into balls, fill each with the ${c.main} mixture, seal well and roll out gently into a round paratha.`,
      `Cook: Roast on a hot tava, brushing both sides with Anveshan Ghee, until golden-brown spots appear.`,
      ...regionStep(c),
      `Serve: Serve the ${c.name} hot with curd, pickle or white butter.`,
    ],
  },
  {
    label: "dry sabzi",
    fmt: (style, main) => `${style} ${main.name}`.trim(),
    base: ["onion", "tomato", "ginger-garlic paste", "coriander powder"],
    mains: [
      ["Aloo Gobi", ["potatoes", "cauliflower"]], ["Bhindi", ["okra"]], ["Baingan Bharta", ["eggplant"]],
      ["Lauki", ["bottle gourd"]], ["Tori", ["ridge gourd"]], ["Aloo Matar", ["potatoes", "green peas"]],
      ["Mushroom", ["mushrooms"]], ["Mix Veg", ["mixed vegetables"]], ["Capsicum", ["capsicum"]],
      ["Karela", ["bitter gourd"]], ["Arbi", ["colocasia"]], ["Sem", ["broad beans"]],
      ["Gajar Matar", ["carrot", "green peas"]], ["Tinda", ["apple gourd"]], ["Kaddu", ["pumpkin"]],
    ],
    styles: ["Masala", "Dry", "Spicy", "Dhaba-style", "Home-style"],
    steps: (c) => [
      `Prep: Chop the ${c.mains} and keep aside; finely chop the onion and tomato.`,
      `Temper: Heat Anveshan Wood-Pressed Oil, crackle cumin seeds, add onion and ginger-garlic paste and sauté until golden.`,
      `Cook: Add tomato, turmeric, red chilli and coriander powder, then the ${c.mains}; cook covered on low until tender.`,
      `Finish: Sprinkle garam masala and fresh coriander and toss well.`,
      ...regionStep(c),
      `Serve: Serve ${c.name} hot with roti or steamed rice.`,
    ],
  },
  {
    label: "gravy curry",
    fmt: (style, main) => `${style} ${main.name}`.trim(),
    base: ["onion", "tomato", "ginger-garlic paste", "garam masala", "cream"],
    mains: [
      ["Paneer", ["paneer"]], ["Chana Masala", ["chickpeas"]], ["Rajma", ["kidney beans"]],
      ["Kofta", ["vegetable kofta"]], ["Malai Kofta", ["paneer", "potato kofta"]], ["Dum Aloo", ["baby potatoes"]],
      ["Mushroom Matar", ["mushrooms", "green peas"]], ["Aloo Tamatar", ["potatoes"]], ["Chole", ["chickpeas"]],
      ["Soya Chunk", ["soya chunks"]], ["Veg Korma", ["mixed vegetables", "cashew paste"]], ["Methi Matar Malai", ["fenugreek", "green peas"]],
    ],
    styles: ["Masala", "Butter", "Kadai", "Handi", "Punjabi"],
    steps: (c) => [
      `Make the base: Sauté onion, ginger-garlic paste and tomato in Anveshan Wood-Pressed Oil until soft, then cool and blend to a smooth paste.`,
      `Cook the gravy: Return the paste to the pan with turmeric, red chilli, coriander powder and a little water; simmer until the oil separates.`,
      `Add ${c.main}: Stir in the ${c.mains} and simmer until cooked through and well coated.`,
      `Finish: Add cream and garam masala and cook two more minutes.`,
      ...regionStep(c),
      `Serve: Serve ${c.name} hot with naan, roti or jeera rice.`,
    ],
  },
  {
    label: "dal",
    fmt: (style, main) => `${main.name} ${style}`.trim(),
    base: ["onion", "tomato", "ghee", "garlic"],
    mains: [
      ["Toor Dal", ["pigeon pea lentils"]], ["Moong Dal", ["split green gram"]], ["Masoor Dal", ["red lentils"]],
      ["Chana Dal", ["bengal gram"]], ["Dal Makhani", ["black urad", "kidney beans", "butter"]], ["Mixed Dal", ["five lentils"]],
      ["Lauki Chana Dal", ["bottle gourd", "bengal gram"]], ["Palak Dal", ["spinach", "lentils"]], ["Dhuli Moong", ["skinned green gram"]],
    ],
    styles: ["Tadka", "Fry", "Home-style", "Punjabi", "Dhaba-style"],
    steps: (c) => [
      `Boil the dal: Pressure-cook the ${c.mains} with turmeric and salt until soft and creamy.`,
      `Make the tadka: Heat Anveshan Ghee, crackle cumin seeds, then add garlic, onion and tomato and sauté.`,
      `Combine: Pour the tadka into the cooked dal, add red chilli powder and simmer for 5 minutes.`,
      `Finish: Garnish with fresh coriander and a spoon of Anveshan Ghee.`,
      ...regionStep(c),
      `Serve: Serve ${c.name} hot with steamed rice or roti.`,
    ],
  },
  {
    label: "rice pulao",
    fmt: (style, main) => `${style} ${main.name}`.trim(),
    base: ["basmati rice", "ghee", "whole spices", "onion"],
    mains: [
      ["Veg Pulao", ["mixed vegetables"]], ["Jeera Rice", ["cumin seeds"]], ["Peas Pulao", ["green peas"]],
      ["Ghee Rice", ["fried onions"]], ["Lemon Rice", ["lemon", "curry leaves", "peanuts"]], ["Curd Rice", ["yogurt", "curry leaves"]],
      ["Tomato Rice", ["tomatoes"]], ["Coconut Rice", ["grated coconut"]], ["Tahri", ["mixed vegetables", "potatoes"]],
      ["Corn Pulao", ["sweet corn"]], ["Paneer Pulao", ["paneer"]], ["Masala Khichdi", ["moong dal", "mixed vegetables"]],
    ],
    styles: ["Classic", "Spiced", "Festive", "Quick"],
    steps: (c) => [
      `Prep: Rinse and soak the basmati rice for 20 minutes, then drain.`,
      `Temper: Heat Anveshan Ghee, add the whole spices and onion and sauté until golden.`,
      `Cook: Add the ${c.mains} and the rice, sauté briefly, then add measured water and salt.`,
      `Steam: Cover and cook on low heat until the rice is fluffy and each grain is separate.`,
      ...regionStep(c),
      `Serve: Fluff gently and serve ${c.name} hot with raita.`,
    ],
  },
  {
    label: "sweet",
    fmt: (style, main) => `${style} ${main.name}`.trim(),
    base: ["ghee", "cardamom"],
    mains: [
      ["Besan Ladoo", ["gram flour", "jaggery"]], ["Atta Ladoo", ["whole wheat flour", "jaggery"]], ["Coconut Ladoo", ["grated coconut", "condensed milk"]],
      ["Til Ladoo", ["sesame seeds", "jaggery"]], ["Sattu Ladoo", ["roasted gram flour", "jaggery"]], ["Dry Fruit Ladoo", ["dates", "mixed nuts"]],
      ["Moong Dal Halwa", ["split green gram", "milk"]], ["Gajar Halwa", ["carrots", "milk"]], ["Rava Kesari", ["semolina", "saffron"]],
      ["Besan Barfi", ["gram flour", "sugar"]], ["Nariyal Barfi", ["coconut", "milk"]], ["Peanut Chikki", ["peanuts", "jaggery"]],
    ],
    styles: ["Classic", "Festive", "Roasted"],
    steps: (c) => [
      `Roast: On low heat, roast the ${c.mains} in Anveshan Ghee until golden and aromatic.`,
      `Sweeten: Mix in Anveshan Jaggery (or sugar) with cardamom and stir until evenly combined.`,
      `Bind and set: Cook until the mixture leaves the sides of the pan, then shape into ladoos or spread in a greased tray and cut.`,
      `Garnish: Top with chopped nuts and a thread of saffron.`,
      ...regionStep(c),
      `Serve: Cool completely and serve, or store ${c.name} in an airtight jar.`,
    ],
  },
  {
    label: "cheela / dosa",
    fmt: (style, main) => `${style} ${main.name}`.trim(),
    base: ["batter", "oil"],
    mains: [
      ["Moong Dal Cheela", ["split green gram"]], ["Besan Cheela", ["gram flour"]], ["Rava Dosa", ["semolina", "rice flour"]],
      ["Onion Uttapam", ["dosa batter", "onions"]], ["Masala Dosa", ["dosa batter", "potato masala"]], ["Adai", ["mixed lentils", "rice"]],
      ["Sattu Cheela", ["roasted gram flour"]], ["Vegetable Appe", ["dosa batter", "vegetables"]],
    ],
    styles: ["Classic", "Masala", "Spicy", "Cheesy"],
    steps: (c) => [
      `Make the batter: Blend the ${c.mains} with salt and water into a smooth, pourable batter and rest briefly.`,
      `Heat: Heat a tava and grease it lightly with Anveshan Wood-Pressed Oil.`,
      `Cook: Pour a ladle of batter, spread thin, drizzle Anveshan Wood-Pressed Oil and cook until golden and crisp, then flip.`,
      `Fill: Add the toppings or filling, then fold or roll.`,
      ...regionStep(c),
      `Serve: Serve ${c.name} hot with coconut chutney and sambar.`,
    ],
  },
  {
    label: "snack",
    fmt: (style, main) => `${style} ${main.name}`.trim(),
    base: ["onion", "green chillies", "coriander leaves", "oil"],
    mains: [
      ["Aloo Tikki", ["potatoes", "bread crumbs"]], ["Veg Cutlet", ["mixed vegetables", "bread crumbs"]], ["Pakora", ["gram flour"]],
      ["Sabudana Vada", ["sago", "peanuts"]], ["Corn Cutlet", ["sweet corn"]], ["Hara Bhara Kebab", ["spinach", "green peas"]],
      ["Bread Roll", ["bread", "potato filling"]], ["Moong Dal Pakora", ["split green gram"]], ["Onion Bhaji", ["onions", "gram flour"]],
    ],
    styles: ["Crispy", "Spicy", "Masala", "Tava"],
    steps: (c) => [
      `Prep the mixture: Mash and mix the ${c.mains} with onion, green chillies, coriander and spices until it binds.`,
      `Shape: Form the mixture into tikkis or small portions and coat lightly.`,
      `Fry: Shallow- or deep-fry in hot Anveshan Wood-Pressed Oil until crisp and golden on all sides.`,
      `Drain: Lift out and drain on paper to keep them crisp.`,
      ...regionStep(c),
      `Serve: Serve ${c.name} hot with green chutney and tamarind chutney.`,
    ],
  },
];

const seen = new Set();
const out = [];

function buildEntry(fam, main, style, region, withAdj) {
  const baseName = fam.fmt(style, { name: main[0] });
  const name = withAdj ? `${region.adj} ${baseName}` : baseName;
  const key = name.toLowerCase().replace(/\s+/g, " ").trim();
  if (seen.has(key) || out.length >= CAP) return;
  seen.add(key);

  const rawIngredients = [
    ...fam.base,
    ...main[1],
    ...(STYLE_EXTRAS[style] || []),
    ...COMMON,
    ...(withAdj ? [region.sig] : []),
  ];
  const ingredients = brandList(rawIngredients);
  const ctx = {
    name,
    main: main[0],
    mains: main[1].join(" and "),
    region: region.state,
    regionTouch: withAdj ? region.sig : null,
  };
  out.push({
    name,
    description: describe(name, fam.label, region.state, ingredients),
    ingredients,
    steps: fam.steps(ctx),
    location: region.state,
  });
}

// 1) Base combos (no regional adjective), rotating a default region per combo.
const baseCombos = [];
let r = 0;
for (const fam of FAMILIES) {
  for (const main of fam.mains) {
    for (const style of fam.styles) {
      const region = REGIONS[r++ % REGIONS.length];
      baseCombos.push({ fam, main, style });
      buildEntry(fam, main, style, region, false);
    }
  }
}

// 2) Regional variants until the cap is reached.
outer: for (const region of REGIONS) {
  for (const c of baseCombos) {
    if (out.length >= CAP) break outer;
    buildEntry(c.fam, c.main, c.style, region, true);
  }
}

writeFileSync("indian-recipes.json", JSON.stringify(out, null, 2));
console.log(`base combos: ${baseCombos.length}`);
console.log(`total recipes written: ${out.length}`);
console.log("sample:", JSON.stringify(out[0], null, 2));
