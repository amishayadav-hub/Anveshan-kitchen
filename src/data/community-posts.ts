// Community "Real Peeps" feed — full-screen image posts of recipes people cooked
// with Anveshan products. Distinct from the recipes in the main recipe panel.
//
// `products` are ids from PRODUCT_CATALOG so each maps to a real add-to-cart line.
// `description` is an Instagram-style caption that includes the recipe + hashtags.
// `images` are keyword-matched food photos RELATED to each dish (LoremFlickr,
// tag-based + locked seed = stable). Each post uses ONE dish keyword so every
// slide shows the same dish. Swap the base URL for your own CDN photos anytime.

export interface CommunityPost {
  id: string;
  title: string;
  description: string; // IG-style caption, includes the recipe (\n line breaks)
  author: string;
  handle: string;
  date: string;
  images: string[]; // 1 = single image, 2+ = carousel (same dish)
  tags: string[];
  products: string[]; // Anveshan product ids used (keys of PRODUCT_CATALOG)
  likes: number; // seed like count (250–500)
}

// Related food image by keyword. `lock` keeps the same photo across reloads.
const img = (keyword: string, lock: number) =>
  `https://loremflickr.com/1080/1920/${encodeURIComponent(keyword)}?lock=${lock}`;

// Build N slides for one post, all matching the SAME dish keyword.
const pics = (keyword: string, base: number, count: number) =>
  Array.from({ length: count }, (_, i) => img(keyword, base + i));

export const COMMUNITY_POSTS: CommunityPost[] = [
  { id: "cp01", title: "Khapli Atta Banana Pancakes", description: "Fluffy banana pancakes, zero maida 🥞\n\nRecipe:\n• Mash 2 ripe bananas + 1 cup Anveshan Khapli Atta + ½ cup milk + a spoon of honey.\n• Rest 5 min, cook on Anveshan Ghee till golden.\nHigh-fibre & kid-approved!", author: "Ananya Rao", handle: "@ananyacooks", date: "Jun 28, 2026", images: pics("pancakes", 101, 3), tags: ["breakfast", "highfibre", "kids"], products: ["khapli-atta", "ghee", "honey"], likes: 486 },
  { id: "cp02", title: "Turmeric Latte Chia Pudding", description: "Golden overnight chia 🍵\n\nRecipe:\n• Mix 3 tbsp chia + 1 cup milk + 1 tsp Anveshan Turmeric Latte + honey.\n• Chill overnight, top with fruit.\nAnti-inflammatory breakfast, done.", author: "Vikram Menon", handle: "@vik.eats", date: "Jun 24, 2026", images: pics("pudding", 201, 2), tags: ["mealprep", "antiinflammatory"], products: ["turmeric-latte-mix", "honey"], likes: 331 },
  { id: "cp03", title: "Sesame Oil Garlic Noodles", description: "15-min nutty garlic noodles 🍜\n\nRecipe:\n• Toss boiled noodles in 2 tbsp Anveshan Black Sesame Oil + lots of garlic, soy & chilli.\n• Finish with spring onion.\nWeeknight saviour.", author: "Priya Nair", handle: "@priyainthekitchen", date: "Jun 20, 2026", images: pics("noodles", 301, 1), tags: ["quick", "vegan"], products: ["sesame-oil"], likes: 402 },
  { id: "cp04", title: "Jaggery Peanut Butter Cups", description: "No-sugar PB cups 🍫\n\nRecipe:\n• Melt dark chocolate with a little Anveshan Groundnut Oil.\n• Fill with peanut butter + Anveshan Jaggery Powder.\n• Set in freezer 20 min.", author: "Rahul Deshmukh", handle: "@rahulbakes", date: "Jun 15, 2026", images: pics("chocolate", 401, 2), tags: ["dessert", "nosugar"], products: ["jaggery-powder", "groundnut-oil"], likes: 458 },
  { id: "cp05", title: "Saffron Almond Milkshake", description: "Kesar badam shake 🥛\n\nRecipe:\n• Blend soaked almonds + milk + honey + a few Anveshan Saffron strands.\n• Serve chilled.\nFestive in a glass.", author: "Sneha Iyer", handle: "@snehasips", date: "Jun 11, 2026", images: pics("milkshake", 501, 1), tags: ["drinks", "festive"], products: ["saffron", "honey"], likes: 377 },
  { id: "cp06", title: "Coconut Oil Granola Bars", description: "Chewy granola bars 🥣\n\nRecipe:\n• Mix oats + nuts, bind with Anveshan Coconut Oil, honey & Anveshan Jaggery.\n• Press & bake 18 min.\nGrab-and-go snack.", author: "Arjun Kapoor", handle: "@arjun.fit", date: "Jun 6, 2026", images: pics("granola", 601, 3), tags: ["snack", "mealprep"], products: ["coconut-oil", "honey", "jaggery-powder"], likes: 290 },
  { id: "cp07", title: "Khapli Chocolate Muffins", description: "Guilt-free cocoa muffins 🧁\n\nRecipe:\n• 1½ cups Anveshan Khapli Atta + cocoa + Anveshan Jaggery.\n• Add milk + Anveshan Ghee, bake 20 min.\nMoist & rich.", author: "Meera Joshi", handle: "@meerabakes", date: "May 31, 2026", images: pics("muffin", 701, 2), tags: ["dessert", "baking"], products: ["khapli-atta", "ghee", "jaggery-powder"], likes: 344 },
  { id: "cp08", title: "Olive Oil Lemon Herb Hummus", description: "Silky hummus 🫓\n\nRecipe:\n• Blend chickpeas + tahini + lemon + garlic.\n• Swirl generously with Anveshan Extra-Virgin Olive Oil.\nScoop everything.", author: "Karan Malhotra", handle: "@karan.plates", date: "May 26, 2026", images: pics("hummus", 801, 1), tags: ["dip", "vegan"], products: ["olive-oil"], likes: 268 },
  { id: "cp09", title: "Mustard Oil Street Aloo Chaat", description: "Smoky aloo chaat 🥔\n\nRecipe:\n• Crisp boiled potatoes in Anveshan Mustard Oil.\n• Toss with chaat masala, onion & chutneys.\nStreet-style at home.", author: "Divya Reddy", handle: "@divyachaat", date: "May 20, 2026", images: pics("chaat", 901, 2), tags: ["streetfood", "chaat"], products: ["mustard-oil"], likes: 471 },
  { id: "cp10", title: "Amlaprash Energy Balls", description: "Immunity bites ⚡\n\nRecipe:\n• Blend dates + nuts + 2 tbsp Anveshan Amlaprash + Anveshan Dry Fruit Paak.\n• Roll into balls, chill.\nNo bake, all good.", author: "Aditya Sharma", handle: "@aditya.wellness", date: "May 14, 2026", images: pics("ladoo", 1001, 1), tags: ["immunity", "nobake"], products: ["amlaprash", "dry-fruit-paak"], likes: 312 },
  { id: "cp11", title: "Ghee Roasted Makhana Mix", description: "Crunchy trail mix 🌰\n\nRecipe:\n• Roast makhana in Anveshan Ghee till crisp.\n• Toss with Anveshan Dry Fruit Paak & seeds.\n4pm snack sorted.", author: "Nisha Verma", handle: "@nishasnacks", date: "May 9, 2026", images: pics("makhana", 1101, 2), tags: ["snack", "roasted"], products: ["ghee", "dry-fruit-paak"], likes: 359 },
  { id: "cp12", title: "Sunflower Oil Veggie Tempura", description: "Crispy veggie tempura 🍤\n\nRecipe:\n• Dip veggies in a light batter.\n• Fry in Anveshan Sunflower Oil till golden.\nStays crisp, not greasy.", author: "Rohan Gupta", handle: "@rohanfries", date: "May 3, 2026", images: pics("tempura", 1201, 1), tags: ["fried", "veggies"], products: ["sunflower-oil"], likes: 285 },
  { id: "cp13", title: "Ashwagandha Moon Milk", description: "Bedtime moon milk 🌙\n\nRecipe:\n• Warm milk + 1 tsp Anveshan Ashwagandha Mix + honey + a pinch of nutmeg.\n• Sip & unwind.\nBetter-sleep ritual.", author: "Kavya Pillai", handle: "@kavya.calm", date: "Apr 27, 2026", images: pics("goldenmilk", 1301, 2), tags: ["drinks", "sleep"], products: ["ashwagandha-mix", "honey"], likes: 421 },
  { id: "cp14", title: "Khandsari Caramel Popcorn", description: "Caramel popcorn 🍿\n\nRecipe:\n• Pop corn in Anveshan Coconut Oil.\n• Coat in melted Anveshan Khandsari caramel.\nMovie-night upgrade.", author: "Sameer Khanna", handle: "@sameersnacks", date: "Apr 21, 2026", images: pics("caramelpopcorn", 1401, 1), tags: ["snack", "sweet"], products: ["khandsari", "coconut-oil"], likes: 344 },
  { id: "cp15", title: "Multigrain Veggie Crackers", description: "Baked veggie crackers 🥨\n\nRecipe:\n• Knead Anveshan Multigrain Atta with grated veggies + Anveshan Sesame Oil.\n• Roll thin, bake till crisp.", author: "Tara Bhatt", handle: "@tarabakes", date: "Apr 15, 2026", images: pics("crackers", 1501, 2), tags: ["baking", "snack"], products: ["multigrain-atta", "sesame-oil"], likes: 301 },
  { id: "cp16", title: "Honey Ginger Immunity Shots", description: "2-ingredient wellness shots 🍯\n\nRecipe:\n• Mix raw Anveshan Honey with fresh ginger juice + lemon.\n• Down it every morning.", author: "Manav Sethi", handle: "@manav.wellness", date: "Apr 9, 2026", images: pics("lemonade", 1601, 1), tags: ["immunity", "quick"], products: ["honey"], likes: 264 },
  { id: "cp17", title: "Dry Fruit Paak Stuffed Dates", description: "Festive stuffed dates 🌴\n\nRecipe:\n• Pit Medjool dates.\n• Stuff with Anveshan Dry Fruit Paak, top with pistachio.\n5-min mithai.", author: "Ishita Chawla", handle: "@ishita.treats", date: "Apr 3, 2026", images: pics("medjool", 1701, 2), tags: ["festive", "nobake"], products: ["dry-fruit-paak"], likes: 389 },
];
