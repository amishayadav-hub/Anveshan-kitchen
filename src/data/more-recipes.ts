// ─── Extra recipes: snacks/starters + dry-chutney "podis" ────────────────────
// A small additive set of four snacks/starters and six chutneys (including four
// South-Indian / Maharashtrian dry "podi" chutneys). Same shape as the entries
// in seed.ts and the regional sets. Each is built around a real Anveshan product
// as the hero — a wood-pressed oil for frying or the traditional gingelly
// (sesame) oil the podis are mixed with, plus Khapli Atta / Ghee where they fit.
// Images are intentionally blank; the UI falls back to the site placeholder and
// real photos can be added later via the admin dashboard.

export interface MoreIngredient {
  name: string;
  quantity: string;
  unit: string;
  anveshan: boolean;
  anveshanProductId?: string;
  note?: string;
}

export interface MoreRecipe {
  id: string;
  slug: string;
  name: string;
  description: string;
  image: string;
  prepTime: string;
  cookTime: string;
  servings: number;
  category: "snack" | "starter" | "chutney";
  tags: string[];
  anveshanProducts: string[];
  ingredients: MoreIngredient[];
  steps: string[];
  tips: string[];
  faqs: { question: string; answer: string }[];
}

export const moreRecipes: MoreRecipe[] = [
  {
    id: "veg-chilli-sticks",
    slug: "veg-chilli-sticks",
    name: "Veg Chilli Sticks",
    description:
      "Crisp batter-coated vegetable sticks deep-fried in Anveshan Wood-Pressed Groundnut Oil and tossed in a hot-sweet chilli-garlic sauce finished with Anveshan Wood-Pressed Sesame Oil — a moreish Indo-Chinese starter.",
    image: "",
    prepTime: "20 min",
    cookTime: "20 min",
    servings: 4,
    category: "starter",
    tags: ["indo-chinese", "starter", "fried", "spicy"],
    anveshanProducts: ["groundnut-oil", "sesame-oil"],
    ingredients: [
      { name: "Mixed vegetables cut into sticks (paneer, carrot, capsicum, baby corn)", quantity: "3", unit: "cups", anveshan: false },
      { name: "Cornflour and maida", quantity: "0.75", unit: "cup", anveshan: false },
      { name: "Ginger-garlic and green chilli", quantity: "1", unit: "tbsp", anveshan: false },
      { name: "Soy sauce, chilli sauce, vinegar, a little sugar", quantity: "3", unit: "tbsp", anveshan: false },
      { name: "Spring onion", quantity: "0.25", unit: "cup", anveshan: false },
      { name: "Anveshan Wood-Pressed Groundnut Oil", quantity: "2.5", unit: "cups", anveshan: true, anveshanProductId: "groundnut-oil", note: "Wood-pressed oil fries the sticks crisp and clean." },
      { name: "Anveshan Wood-Pressed Sesame Oil", quantity: "1", unit: "tbsp", anveshan: true, anveshanProductId: "sesame-oil", note: "A drizzle of toasty sesame oil gives the sauce its authentic Indo-Chinese aroma." },
    ],
    steps: [
      "Make a thick batter with cornflour, maida, salt and a little water; coat the vegetable sticks.",
      "Deep-fry the sticks in the Anveshan Groundnut Oil until golden and crisp; drain.",
      "In a hot wok with the Anveshan Sesame Oil, sauté ginger-garlic and green chilli, then add soy, chilli sauce, vinegar and sugar.",
      "Toss the fried sticks in the sauce until glossy and coated.",
      "Finish with spring onion and serve hot.",
    ],
    tips: [
      "Fry the sticks twice (or on high heat) so they stay crisp after tossing in the sauce.",
      "Toss quickly over high heat — long simmering makes the sticks go soggy.",
    ],
    faqs: [
      { question: "Can I make it less spicy?", answer: "Yes — reduce the green chilli and chilli sauce, and add a touch more sugar for a sweeter, milder toss." },
      { question: "What vegetables work best?", answer: "Firm ones that hold their shape — paneer, carrot, capsicum and baby corn; avoid watery vegetables." },
    ],
  },
  {
    id: "cheesy-roti-tacos",
    slug: "cheesy-roti-tacos",
    name: "Cheesy Roti Tacos",
    description:
      "A quick fusion snack — folded Anveshan Khapli Atta rotis crisped in Anveshan Bilona Ghee, stuffed with a cheesy spiced vegetable filling.",
    image: "",
    prepTime: "15 min",
    cookTime: "20 min",
    servings: 4,
    category: "snack",
    tags: ["fusion", "snack", "kids", "quick"],
    anveshanProducts: ["khapli-atta", "ghee"],
    ingredients: [
      { name: "Anveshan Khapli Atta", quantity: "2", unit: "cups", anveshan: true, anveshanProductId: "khapli-atta", note: "Stone-ground whole wheat makes a wholesome, sturdy taco shell." },
      { name: "Grated cheese (mozzarella/cheddar)", quantity: "1", unit: "cup", anveshan: false },
      { name: "Onion, capsicum, sweet corn, tomato", quantity: "2", unit: "cups", anveshan: false },
      { name: "Chaat masala, chilli flakes, oregano", quantity: "1", unit: "tbsp", anveshan: false },
      { name: "Anveshan Bilona Ghee", quantity: "3", unit: "tbsp", anveshan: true, anveshanProductId: "ghee", note: "Ghee crisps the folded roti into a golden taco shell." },
    ],
    steps: [
      "Knead the Anveshan Khapli Atta into a soft dough and roll thin rotis; cook lightly on a tawa.",
      "Sauté the chopped vegetables with chaat masala, chilli flakes and oregano into a quick filling.",
      "Fold each roti in half, brush with Anveshan Ghee and crisp on the tawa to hold a taco shape.",
      "Fill with the vegetables and grated cheese; return to low heat until the cheese melts.",
      "Serve hot with chutney or ketchup.",
    ],
    tips: [
      "Cook the roti only lightly first, then crisp it folded so it holds the taco shape without cracking.",
      "Melt the cheese on low heat so the shell stays crisp, not burnt.",
    ],
    faqs: [
      { question: "Can I use leftover rotis?", answer: "Yes — leftover rotis fold and crisp beautifully in ghee, making this a great use-up snack." },
      { question: "How do I keep the shell crisp?", answer: "Crisp it well in ghee and add the hot filling just before serving." },
    ],
  },
  {
    id: "aloo-namkeen",
    slug: "aloo-namkeen",
    name: "Aloo Namkeen (Potato Sev)",
    description:
      "Crunchy spiced potato namkeen — fine potato strands deep-fried in Anveshan Wood-Pressed Groundnut Oil and tossed with a light chaat spicing, a classic teatime snack.",
    image: "",
    prepTime: "20 min",
    cookTime: "20 min",
    servings: 6,
    category: "snack",
    tags: ["namkeen", "snack", "teatime", "crunchy"],
    anveshanProducts: ["groundnut-oil"],
    ingredients: [
      { name: "Potatoes, boiled and mashed", quantity: "4", unit: "medium", anveshan: false },
      { name: "Cornflour and rice flour", quantity: "0.5", unit: "cup", anveshan: false },
      { name: "Black pepper, chaat masala, black salt", quantity: "1", unit: "tbsp", anveshan: false },
      { name: "Salt", quantity: "1", unit: "tsp", anveshan: false },
      { name: "Anveshan Wood-Pressed Groundnut Oil", quantity: "2.5", unit: "cups", anveshan: true, anveshanProductId: "groundnut-oil", note: "Wood-pressed oil fries the namkeen light, crisp and clean-tasting." },
    ],
    steps: [
      "Mix the mashed potato with cornflour, rice flour and salt into a smooth, stiff dough.",
      "Press the dough through a sev press (fine disc) directly over hot Anveshan Groundnut Oil.",
      "Fry on medium heat until the strands are crisp and pale golden; drain well.",
      "While warm, toss with black pepper, chaat masala and black salt.",
      "Cool completely and store airtight.",
    ],
    tips: [
      "Keep the dough smooth and lump-free so it presses through the sev disc cleanly.",
      "Fry on medium heat — too hot and the sev browns before it crisps.",
    ],
    faqs: [
      { question: "Why is my namkeen not crisp?", answer: "The dough had too much moisture or the oil wasn't hot enough. Keep the dough stiff and fry on steady medium heat." },
      { question: "How long does it keep?", answer: "Up to 2 weeks in an airtight container once fully cooled." },
    ],
  },
  {
    id: "peanut-namkeen",
    slug: "peanut-namkeen",
    name: "Peanut Namkeen (Masala Coated)",
    description:
      "Crunchy besan-coated peanuts deep-fried in Anveshan Wood-Pressed Groundnut Oil and lightly spiced — a crisp, protein-rich teatime namkeen.",
    image: "",
    prepTime: "10 min",
    cookTime: "15 min",
    servings: 6,
    category: "snack",
    tags: ["namkeen", "snack", "peanuts", "crunchy"],
    anveshanProducts: ["groundnut-oil"],
    ingredients: [
      { name: "Raw peanuts", quantity: "2", unit: "cups", anveshan: false },
      { name: "Besan (gram flour) and rice flour", quantity: "1", unit: "cup", anveshan: false },
      { name: "Turmeric, red chilli, chaat masala", quantity: "1", unit: "tbsp", anveshan: false },
      { name: "Salt", quantity: "1", unit: "tsp", anveshan: false },
      { name: "Anveshan Wood-Pressed Groundnut Oil", quantity: "2", unit: "cups", anveshan: true, anveshanProductId: "groundnut-oil", note: "Frying groundnuts in wood-pressed groundnut oil keeps the flavour pure." },
    ],
    steps: [
      "Sprinkle the peanuts with a little water so the coating sticks.",
      "Toss the damp peanuts in the besan, rice flour, turmeric, chilli and salt until evenly coated.",
      "Deep-fry in the Anveshan Groundnut Oil on medium heat, stirring, until golden and crunchy.",
      "Drain well and toss with chaat masala while warm.",
      "Cool completely and store airtight.",
    ],
    tips: [
      "Dampen the peanuts just enough for the coating to cling — too wet and they clump.",
      "Fry on medium heat so the peanuts cook through and the coating crisps evenly.",
    ],
    faqs: [
      { question: "How is this different from masala peanuts?", answer: "These are besan-coated and fried for a crunchy shell, unlike simply spice-tossed roasted peanuts." },
      { question: "Can I air-fry them?", answer: "Yes — coat lightly and air-fry at 180°C, shaking often, though deep-frying gives the crispest shell." },
    ],
  },
  {
    id: "schezwan-chutney",
    slug: "schezwan-chutney",
    name: "Schezwan Chutney",
    description:
      "A fiery Indo-Chinese red chutney of dry red chillies, garlic and ginger cooked down in Anveshan Wood-Pressed Groundnut Oil and finished with Anveshan Wood-Pressed Sesame Oil.",
    image: "",
    prepTime: "15 min",
    cookTime: "15 min",
    servings: 12,
    category: "chutney",
    tags: ["chutney", "indo-chinese", "spicy", "schezwan"],
    anveshanProducts: ["groundnut-oil", "sesame-oil"],
    ingredients: [
      { name: "Dry red chillies (soaked)", quantity: "20", unit: "pieces", anveshan: false },
      { name: "Garlic and ginger", quantity: "0.5", unit: "cup", anveshan: false },
      { name: "Soy sauce, vinegar, a little sugar", quantity: "2", unit: "tbsp", anveshan: false },
      { name: "Salt", quantity: "1", unit: "tsp", anveshan: false },
      { name: "Anveshan Wood-Pressed Groundnut Oil", quantity: "0.5", unit: "cup", anveshan: true, anveshanProductId: "groundnut-oil", note: "A generous wood-pressed oil base cooks and preserves the chutney." },
      { name: "Anveshan Wood-Pressed Sesame Oil", quantity: "1", unit: "tbsp", anveshan: true, anveshanProductId: "sesame-oil", note: "A finishing drizzle of sesame oil gives the classic Schezwan aroma." },
    ],
    steps: [
      "Soak the dry red chillies in hot water, then grind with garlic and ginger to a coarse paste.",
      "Heat the Anveshan Groundnut Oil and fry the chilli-garlic paste on low until the oil separates and the raw smell goes.",
      "Add soy sauce, vinegar, sugar and salt; cook a few minutes more.",
      "Finish with the Anveshan Sesame Oil and cool.",
      "Store in a clean jar in the fridge; use as a spread or stir-fry base.",
    ],
    tips: [
      "Cook until the oil separates — that's when the chutney is done and keeps well.",
      "Deseed some of the chillies to control the heat without losing the red colour.",
    ],
    faqs: [
      { question: "How long does it keep?", answer: "2–3 weeks refrigerated, as the oil layer on top preserves it." },
      { question: "What do I use it for?", answer: "As a dip, a spread for rolls and sandwiches, or the base for schezwan fried rice and noodles." },
    ],
  },
  {
    id: "momo-chutney",
    slug: "momo-chutney",
    name: "Momo Chutney",
    description:
      "The fiery red dip that goes with momos — tomatoes, dry red chillies and garlic blended smooth with a tempering of Anveshan Wood-Pressed Groundnut Oil.",
    image: "",
    prepTime: "10 min",
    cookTime: "15 min",
    servings: 10,
    category: "chutney",
    tags: ["chutney", "momo", "spicy", "dip"],
    anveshanProducts: ["groundnut-oil"],
    ingredients: [
      { name: "Tomatoes", quantity: "4", unit: "medium", anveshan: false },
      { name: "Dry red chillies (soaked)", quantity: "8", unit: "pieces", anveshan: false },
      { name: "Garlic and ginger", quantity: "2", unit: "tbsp", anveshan: false },
      { name: "Roasted peanuts or sesame (optional, for body)", quantity: "2", unit: "tbsp", anveshan: false },
      { name: "Salt and a little vinegar", quantity: "1", unit: "tbsp", anveshan: false },
      { name: "Anveshan Wood-Pressed Groundnut Oil", quantity: "2", unit: "tbsp", anveshan: true, anveshanProductId: "groundnut-oil", note: "A wood-pressed oil tempering cooks the chutney and gives it a glossy finish." },
    ],
    steps: [
      "Boil or roast the tomatoes until soft; peel.",
      "Blend the tomatoes with soaked red chillies, garlic, ginger and peanuts to a smooth chutney.",
      "Heat the Anveshan Groundnut Oil, add the blended chutney and cook until it thickens and the oil separates.",
      "Season with salt and a little vinegar.",
      "Cool and serve with momos; refrigerate up to a week.",
    ],
    tips: [
      "Cook the blended chutney down until glossy — it deepens the flavour and helps it keep.",
      "Add a spoon of roasted peanuts or sesame for a thicker, richer dip.",
    ],
    faqs: [
      { question: "Smooth or coarse?", answer: "Momo chutney is usually blended smooth, but you can keep it a little coarse for texture." },
      { question: "Too spicy — what do I do?", answer: "Use fewer chillies or deseed them, and add an extra tomato to mellow the heat." },
    ],
  },
  {
    id: "idli-podi",
    slug: "idli-podi",
    name: "Idli Podi (Gunpowder Dry Chutney)",
    description:
      "The classic South-Indian 'gunpowder' — roasted lentils, chillies and sesame ground into a spicy dry chutney, served mixed with Anveshan Wood-Pressed Sesame Oil.",
    image: "",
    prepTime: "10 min",
    cookTime: "15 min",
    servings: 16,
    category: "chutney",
    tags: ["chutney", "podi", "dry", "south-indian"],
    anveshanProducts: ["sesame-oil"],
    ingredients: [
      { name: "Urad dal and chana dal", quantity: "0.5", unit: "cup", anveshan: false },
      { name: "Dry red chillies", quantity: "10", unit: "pieces", anveshan: false },
      { name: "White sesame seeds", quantity: "3", unit: "tbsp", anveshan: false },
      { name: "Curry leaves, hing, salt", quantity: "1", unit: "tbsp", anveshan: false },
      { name: "Anveshan Wood-Pressed Sesame Oil", quantity: "3", unit: "tbsp", anveshan: true, anveshanProductId: "sesame-oil", note: "Gingelly (sesame) oil is the traditional partner — mix the podi with it before serving." },
    ],
    steps: [
      "Dry-roast the urad dal and chana dal until golden, then the red chillies, sesame, curry leaves and hing.",
      "Cool completely.",
      "Grind everything with salt to a coarse powder (not a paste).",
      "Store the dry podi airtight.",
      "To serve, mix a little podi with warm Anveshan Sesame Oil and serve with idli or dosa.",
    ],
    tips: [
      "Roast each ingredient on low and cool fully before grinding, or the podi turns pasty.",
      "Grind coarse — a slightly grainy podi tastes better than a fine powder.",
    ],
    faqs: [
      { question: "Why mix it with oil?", answer: "Sesame (gingelly) oil turns the dry podi into a rich paste to scoop with idli or dosa — it's the classic way to eat it." },
      { question: "How long does the dry podi keep?", answer: "A month or more airtight; the oil is added only at serving time." },
    ],
  },
  {
    id: "peanut-podi",
    slug: "peanut-podi",
    name: "Peanut Podi (Dry Chutney)",
    description:
      "A quick dry peanut chutney powder with garlic and red chilli, served sprinkled over rice or idli and mixed with Anveshan Wood-Pressed Groundnut Oil.",
    image: "",
    prepTime: "5 min",
    cookTime: "10 min",
    servings: 16,
    category: "chutney",
    tags: ["chutney", "podi", "dry", "peanut"],
    anveshanProducts: ["groundnut-oil"],
    ingredients: [
      { name: "Roasted peanuts", quantity: "1", unit: "cup", anveshan: false },
      { name: "Dry red chillies", quantity: "6", unit: "pieces", anveshan: false },
      { name: "Garlic cloves", quantity: "6", unit: "cloves", anveshan: false },
      { name: "Cumin, curry leaves, salt", quantity: "1", unit: "tbsp", anveshan: false },
      { name: "Anveshan Wood-Pressed Groundnut Oil", quantity: "3", unit: "tbsp", anveshan: true, anveshanProductId: "groundnut-oil", note: "Groundnut oil is the natural partner for a peanut podi — mix in before serving." },
    ],
    steps: [
      "Dry-roast the peanuts if using raw ones, along with the red chillies and cumin, until fragrant; cool.",
      "Add the garlic, curry leaves and salt.",
      "Pulse to a coarse dry powder — do not over-grind or it turns to butter.",
      "Store the dry podi airtight.",
      "To serve, mix with warm Anveshan Groundnut Oil over hot rice, idli or dosa.",
    ],
    tips: [
      "Pulse in short bursts — peanuts release oil and turn pasty if over-ground.",
      "Roast the garlic lightly with the peanuts for a mellower, sweeter flavour.",
    ],
    faqs: [
      { question: "Peanut podi vs peanut chutney?", answer: "Podi is a dry, long-keeping powder mixed with oil at serving time; the wet chutney is freshly ground with water." },
      { question: "Can I skip the garlic?", answer: "Yes — a no-garlic version keeps even longer and is milder." },
    ],
  },
  {
    id: "sesame-podi",
    slug: "sesame-podi",
    name: "Sesame Podi (Til Dry Chutney)",
    description:
      "A nutty, calcium-rich dry chutney of roasted sesame, red chilli and garlic, served mixed with Anveshan Wood-Pressed Sesame Oil.",
    image: "",
    prepTime: "5 min",
    cookTime: "10 min",
    servings: 16,
    category: "chutney",
    tags: ["chutney", "podi", "dry", "sesame"],
    anveshanProducts: ["sesame-oil"],
    ingredients: [
      { name: "White sesame seeds", quantity: "1", unit: "cup", anveshan: false },
      { name: "Dry red chillies", quantity: "6", unit: "pieces", anveshan: false },
      { name: "Garlic cloves", quantity: "5", unit: "cloves", anveshan: false },
      { name: "Cumin and salt", quantity: "1", unit: "tbsp", anveshan: false },
      { name: "Anveshan Wood-Pressed Sesame Oil", quantity: "3", unit: "tbsp", anveshan: true, anveshanProductId: "sesame-oil", note: "Sesame oil doubles the til flavour — mix the podi with it to serve." },
    ],
    steps: [
      "Dry-roast the sesame seeds until they pop and turn golden; cool.",
      "Lightly roast the red chillies and cumin.",
      "Grind the sesame, chillies, cumin, garlic and salt to a coarse dry powder.",
      "Store the dry podi airtight.",
      "To serve, mix with warm Anveshan Sesame Oil over hot rice or with idli/dosa.",
    ],
    tips: [
      "Roast the sesame just until it pops — burnt sesame turns the podi bitter.",
      "Keep the grind coarse so the podi stays dry and free-flowing.",
    ],
    faqs: [
      { question: "Sesame podi vs til chutney?", answer: "Podi is a dry, long-keeping powder mixed with oil at serving time; the wet til chutney is freshly ground with water and eaten fresh." },
      { question: "Is sesame podi healthy?", answer: "Yes — sesame is rich in calcium and healthy fats, especially paired with wood-pressed sesame oil." },
      { question: "How long does it keep?", answer: "About a month airtight; add the oil only when serving." },
    ],
  },
  {
    id: "flaxseed-podi",
    slug: "flaxseed-podi",
    name: "Flaxseed Podi (Alsi Dry Chutney)",
    description:
      "A wholesome dry chutney of roasted flaxseeds with garlic and red chilli — the Maharashtrian jawas/alsi chutney, served mixed with Anveshan Wood-Pressed Groundnut Oil.",
    image: "",
    prepTime: "5 min",
    cookTime: "10 min",
    servings: 16,
    category: "chutney",
    tags: ["chutney", "podi", "dry", "flaxseed", "omega-3"],
    anveshanProducts: ["groundnut-oil"],
    ingredients: [
      { name: "Flaxseeds (alsi/jawas)", quantity: "1", unit: "cup", anveshan: false },
      { name: "Dry red chillies", quantity: "6", unit: "pieces", anveshan: false },
      { name: "Garlic cloves", quantity: "6", unit: "cloves", anveshan: false },
      { name: "Cumin and salt", quantity: "1", unit: "tbsp", anveshan: false },
      { name: "Anveshan Wood-Pressed Groundnut Oil", quantity: "3", unit: "tbsp", anveshan: true, anveshanProductId: "groundnut-oil", note: "A little groundnut oil turns the dry podi into a rich chutney at serving." },
    ],
    steps: [
      "Dry-roast the flaxseeds on low until they crackle and smell nutty; cool.",
      "Lightly roast the red chillies and cumin.",
      "Grind the flaxseeds, chillies, cumin, garlic and salt to a coarse dry powder.",
      "Store the dry podi airtight.",
      "To serve, mix with warm Anveshan Groundnut Oil over jowar/bajra bhakri or rice.",
    ],
    tips: [
      "Roast the flaxseeds on low heat — they burn quickly and turn bitter.",
      "Grind coarse and in small batches; flaxseeds release oil and clump if over-ground.",
    ],
    faqs: [
      { question: "Why is flaxseed podi good for you?", answer: "Flaxseeds are rich in omega-3 and fibre, making this a nourishing everyday chutney." },
      { question: "What is it eaten with?", answer: "Traditionally with jowar or bajra bhakri in Maharashtra, or spooned over hot rice with oil." },
    ],
  },
];
