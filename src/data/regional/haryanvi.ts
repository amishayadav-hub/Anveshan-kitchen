import { RegionalRecipe } from "./types";

// Haryanvi regional recipes. Sweets lean on Anveshan Jaggery Powder / Khandsari
// and Bilona Ghee; kachri chutney is filed under the Chutney category.
const H = "Haryanvi";

export const haryanviRecipes: RegionalRecipe[] = [
  {
    id: "gulgule",
    slug: "gulgule",
    name: "Gulgule",
    description:
      "Soft jaggery-sweetened wheat fritters, deep-fried in Anveshan Wood-Pressed Groundnut Oil — a rustic Haryanvi festive snack.",
    image: "",
    prepTime: "10 min",
    cookTime: "20 min",
    servings: 4,
    category: "sweet",
    region: H,
    tags: ["haryanvi", "sweet", "fried", "jaggery"],
    anveshanProducts: ["jaggery-powder", "groundnut-oil"],
    ingredients: [
      { name: "Whole wheat flour", quantity: "1.5", unit: "cups", anveshan: false },
      { name: "Anveshan Jaggery Powder", quantity: "0.75", unit: "cup", anveshan: true, anveshanProductId: "jaggery-powder", note: "Jaggery gives gulgule their traditional deep, wholesome sweetness." },
      { name: "Fennel seeds", quantity: "1", unit: "tsp", anveshan: false },
      { name: "Cardamom powder", quantity: "0.5", unit: "tsp", anveshan: false },
      { name: "Anveshan Wood-Pressed Groundnut Oil", quantity: "2", unit: "cups", anveshan: true, anveshanProductId: "groundnut-oil", note: "Wood-pressed oil fries them soft inside and crisp outside." },
    ],
    steps: [
      "Dissolve the Anveshan Jaggery Powder in warm water and strain.",
      "Whisk in the wheat flour, fennel and cardamom to a thick, dropping batter; rest 15 minutes.",
      "Heat the Anveshan Groundnut Oil to medium.",
      "Drop small spoonfuls of batter and fry until deep golden and round.",
      "Drain and serve warm.",
    ],
    tips: [
      "Keep the batter thick so the gulgule hold a round shape.",
      "Fry on medium heat so they cook through without browning too fast.",
    ],
    faqs: [
      { question: "Why jaggery, not sugar?", answer: "Anveshan Jaggery Powder is traditional here and gives gulgule their characteristic colour and depth." },
      { question: "Can I make them eggless and vegan?", answer: "They already are — just flour, jaggery, spices and oil." },
    ],
  },
  {
    id: "meethe-chawal",
    slug: "meethe-chawal",
    name: "Meethe Chawal",
    description:
      "Festive sweet saffron rice cooked with Anveshan Khandsari and Anveshan Bilona Ghee, studded with nuts — made on Basant and celebrations.",
    image: "",
    prepTime: "10 min",
    cookTime: "25 min",
    servings: 4,
    category: "sweet",
    region: H,
    tags: ["haryanvi", "sweet", "rice", "festive"],
    anveshanProducts: ["ghee", "khandsari", "saffron"],
    ingredients: [
      { name: "Basmati rice", quantity: "1", unit: "cup", anveshan: false },
      { name: "Anveshan Khandsari", quantity: "0.75", unit: "cup", anveshan: true, anveshanProductId: "khandsari", note: "Unrefined sweetness that keeps the rice light, not cloying." },
      { name: "Anveshan Bilona Ghee", quantity: "0.25", unit: "cup", anveshan: true, anveshanProductId: "ghee", note: "Ghee-tempered whole spices flavour the whole pot." },
      { name: "Anveshan Kashmiri Saffron", quantity: "1", unit: "pinch", anveshan: true, anveshanProductId: "saffron", note: "For the golden colour and aroma." },
      { name: "Whole spices (cloves, cardamom, cinnamon)", quantity: "1", unit: "tbsp", anveshan: false },
      { name: "Mixed nuts and raisins", quantity: "0.25", unit: "cup", anveshan: false },
    ],
    steps: [
      "Boil the rice until 80% done and drain.",
      "Heat the Anveshan Ghee, temper the whole spices and fry the nuts and raisins.",
      "Add the rice, Anveshan Khandsari and saffron soaked in warm milk; mix gently.",
      "Cover and cook on very low heat (dum) until the rice is done and glossy.",
      "Fluff gently and serve warm.",
    ],
    tips: [
      "Cook the rice only 80% before adding the khandsari so the grains stay separate.",
      "Finish on dum (low, covered) so the sweetness soaks in evenly.",
    ],
    faqs: [
      { question: "Jaggery or khandsari?", answer: "Both are used; khandsari keeps the rice golden and light, jaggery gives a darker, deeper version." },
      { question: "Why is my sweet rice sticky?", answer: "The rice was overcooked before sweetening. Par-boil to 80% and finish on dum." },
    ],
  },
  {
    id: "shakkar-para",
    slug: "shakkar-para",
    name: "Shakkar Para",
    description:
      "Crisp, diamond-cut fried pastry glazed in Anveshan Khandsari syrup — a teatime and festival treat fried in Anveshan Bilona Ghee.",
    image: "",
    prepTime: "20 min",
    cookTime: "25 min",
    servings: 6,
    category: "sweet",
    region: H,
    tags: ["haryanvi", "sweet", "fried", "teatime"],
    anveshanProducts: ["ghee", "khandsari"],
    ingredients: [
      { name: "Maida / whole wheat flour", quantity: "2", unit: "cups", anveshan: false },
      { name: "Anveshan Bilona Ghee", quantity: "0.75", unit: "cup", anveshan: true, anveshanProductId: "ghee", note: "Ghee in the dough and for frying gives shakkar para its short, crisp bite." },
      { name: "Anveshan Khandsari", quantity: "1", unit: "cup", anveshan: true, anveshanProductId: "khandsari", note: "Makes the glossy sugar glaze." },
      { name: "Cardamom powder", quantity: "0.5", unit: "tsp", anveshan: false },
      { name: "Salt", quantity: "0.25", unit: "tsp", anveshan: false },
    ],
    steps: [
      "Rub 3 tbsp Anveshan Ghee into the flour with salt and knead a firm dough; rest 20 minutes.",
      "Roll thick and cut into small diamonds.",
      "Fry the diamonds in Anveshan Ghee on low-medium heat until golden and crisp.",
      "Make a two-string Anveshan Khandsari syrup with cardamom.",
      "Toss the fried paras in the syrup until coated with a white sugar crust; cool.",
    ],
    tips: [
      "Fry on low-medium so they cook through and stay crisp.",
      "A two-string syrup gives the classic dry, crystallised coating.",
    ],
    faqs: [
      { question: "Sweet or salty version?", answer: "This is the sweet shakkar para; the savoury cousin (namak para) skips the syrup and adds ajwain and salt." },
      { question: "How long do they keep?", answer: "2–3 weeks in an airtight container." },
    ],
  },
  {
    id: "kachri-chutney",
    slug: "kachri-chutney",
    name: "Kachri Chutney",
    description:
      "A tangy Haryanvi chutney of kachri (wild desert cucumber) ground with garlic and spices, finished with pungent Anveshan Wood-Pressed Mustard Oil.",
    image: "",
    prepTime: "10 min",
    cookTime: "5 min",
    servings: 8,
    category: "chutney",
    region: H,
    tags: ["haryanvi", "chutney", "tangy"],
    anveshanProducts: ["mustard-oil"],
    ingredients: [
      { name: "Kachri (dried), or fresh kachri", quantity: "0.5", unit: "cup", anveshan: false },
      { name: "Garlic", quantity: "5", unit: "cloves", anveshan: false },
      { name: "Green chilli", quantity: "2", unit: "pieces", anveshan: false },
      { name: "Cumin and coriander", quantity: "1", unit: "tsp", anveshan: false },
      { name: "Salt", quantity: "0.75", unit: "tsp", anveshan: false },
      { name: "Anveshan Wood-Pressed Mustard Oil", quantity: "1", unit: "tbsp", anveshan: true, anveshanProductId: "mustard-oil", note: "A drizzle of pungent mustard oil is the traditional Haryanvi finish." },
    ],
    steps: [
      "If using dried kachri, soak it briefly to soften.",
      "Grind the kachri with garlic, green chilli, cumin, coriander and salt to a coarse chutney.",
      "Warm the Anveshan Mustard Oil until it just smokes, cool slightly and mix in.",
      "Serve with roti, bajra khichdi or a Haryanvi thali; refrigerate up to a week.",
    ],
    tips: [
      "Kachri is intensely tangy, so a little chutney goes a long way.",
      "Heating the mustard oil first tames its raw sharpness.",
    ],
    faqs: [
      { question: "What is kachri?", answer: "A small wild melon/cucumber of the arid North-West, prized as a natural souring and tenderising agent." },
      { question: "Where do I find it?", answer: "At Rajasthani/Haryanvi grocers, usually sold dried or as kachri powder." },
    ],
  },
];
