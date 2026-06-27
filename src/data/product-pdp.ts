// Real Shelf Life / Benefits / FAQ content scraped from live anveshan.farm PDPs,
// keyed by Shopify product handle. Rendered on recipe pages for the recipe’s
// primary Anveshan product (see ProductInfoTabs / RecipeView).
export interface ProductPdp {
  shelfLife?: { duration?: string | null; storage?: string | null } | null;
  benefits?: { title: string; desc: string }[];
  faqs?: { question: string; answer: string }[];
}

export const PRODUCT_PDP: Record<string, ProductPdp> = {
  "jaggerypowder": {
    "shelfLife": {
      "duration": "Best to use it before 12 months from the date of packaging.",
      "storage": ""
    },
    "benefits": [
      {
        "title": "Immunity Booster",
        "desc": "Micronutrients like zinc and selenium help fight infections and maintain immunity."
      },
      {
        "title": "Gut Health",
        "desc": "Relieves constipation by activating digestive enzymes in the body."
      },
      {
        "title": "Antioxidant-rich",
        "desc": "Contains vitamins B1 and B2 that reduce oxidative stress."
      },
      {
        "title": "Healthy Carbohydrates Source",
        "desc": "Complex carbs provide gradual energy release, preventing fatigue and weakness."
      },
      {
        "title": "Purifies Blood",
        "desc": "Regular limited consumption helps detoxify the body."
      }
    ],
    "faqs": []
  },
  "gir-cow-ghee": {
    "shelfLife": null,
    "benefits": [
      {
        "title": "Gut Health",
        "desc": "Add a spoonful of ghee to a glass of warm milk in the morning for a healthier gut."
      },
      {
        "title": "Cooking Versatility",
        "desc": "Can be used for all types of cooking because of its high smoke point."
      },
      {
        "title": "Digestive Relief",
        "desc": "Consuming it at night after a meal also relieves constipation."
      },
      {
        "title": "Skincare",
        "desc": "A great choice for skincare to get glowing supple skin."
      },
      {
        "title": "Baby Care",
        "desc": "Perfect for baby massages due to its natural moisturising properties."
      }
    ],
    "faqs": [
      {
        "question": "Why is Anveshan Desi Cow Ghee costly as compared to other ghee?",
        "answer": "It is made from desi cow milk, which yields only 2-3L daily compared to more from foreign breeds. The cows receive no hormone injections, and the ghee is made using bi-directional bilona churning with a wooden churner, giving it a grainy texture, superior flavour and better nutrition."
      },
      {
        "question": "What should the consistency of my ghee be?",
        "answer": "The consistency of ghee depends on the temperature at which you store it. It is perfectly normal for ghee to be liquid, solid or a combination of consistencies."
      },
      {
        "question": "How can we identify pure cow ghee?",
        "answer": "Use the pan test: pure ghee melts immediately and turns dark brown, while adulterated versions melt slowly and remain yellow."
      },
      {
        "question": "What are cows being fed?",
        "answer": "The cows graze freely and receive natural fodder and buttermilk byproducts; no hormone injections are used."
      },
      {
        "question": "How is the taste of your ghee different from any other ghee in the market?",
        "answer": "It is made from churned curd rather than cream, which preserves more nutrients and natural nourishment."
      },
      {
        "question": "Does Anveshan ghee come in a plastic jar?",
        "answer": "No, our ghee is available in eco-friendly glass jars and reusable tin cans."
      }
    ]
  },
  "wood-pressed-groundnut-oil": {
    "shelfLife": null,
    "benefits": [
      {
        "title": "Stir-frying",
        "desc": "Use for stir-frying vegetables, adding a distinctive nutty flavour."
      },
      {
        "title": "Deep-frying",
        "desc": "Perfect for deep-frying snacks and appetizers, achieving a crispy texture with less oil absorption."
      },
      {
        "title": "Tandoor & Roti",
        "desc": "Spray on tandoors for making rotis."
      },
      {
        "title": "Heart Health Support",
        "desc": "Rich in monounsaturated fats (MUFAs), antioxidants and Vitamin E."
      },
      {
        "title": "Natural Antimicrobial Properties",
        "desc": "Offers health benefits beyond flavour."
      }
    ],
    "faqs": [
      {
        "question": "What makes Anveshan Groundnut Oil different from regular oils?",
        "answer": "It is extracted using the traditional cold-press method which helps retain natural nutrients, flavour and aroma, unlike refined oils that undergo high heat and chemical processing."
      },
      {
        "question": "Is this oil 100% pure and free from additives?",
        "answer": "Yes, it contains only pure groundnut oil with no palm oil, preservatives or additives, just clean unrefined oil as it should be."
      },
      {
        "question": "What are the health benefits of this oil?",
        "answer": "It is rich in monounsaturated fats (MUFAs), antioxidants and Vitamin E which support heart health, immunity and overall wellness."
      },
      {
        "question": "Can I use this oil for everyday Indian cooking?",
        "answer": "Absolutely. It is versatile and works well for tadka, sauteing, frying, roasting and even making rotis, while adding a natural nutty flavour."
      },
      {
        "question": "Is it suitable for deep frying?",
        "answer": "Yes, it performs well for deep frying and helps achieve a crispy texture with relatively lower oil absorption, making it a great everyday cooking oil."
      }
    ]
  },
  "wild-forest-honey": {
    "shelfLife": {
      "duration": "",
      "storage": "Store it in a cool dry place with the cap tightly closed. Refrigeration is not required. Ensure no water enters the bottle to maintain its purity."
    },
    "benefits": [
      {
        "title": "Gut Health",
        "desc": "Natural enzymes that help maintain your digestive health and lead to better nutrient absorption."
      },
      {
        "title": "Antioxidant-Rich",
        "desc": "Contains antioxidants that eliminate free radicals to support your immune function."
      },
      {
        "title": "Anti-inflammatory Properties",
        "desc": "Significantly helps relieve pain caused by burns, wounds, etc. and acts as a natural remedy."
      },
      {
        "title": "Weight Management",
        "desc": "Low GI (glycemic index) which supports weight loss."
      }
    ],
    "faqs": [
      {
        "question": "Is it safe for daily consumption?",
        "answer": "Yes, it is completely safe for daily consumption. You can use it as a natural sweetener or a wellness booster."
      },
      {
        "question": "Does it crystallize?",
        "answer": "Yes, crystallization is a natural sign of pure raw honey. If you prefer it liquid, simply place the bottle in warm water."
      },
      {
        "question": "Can I use it in hot water or tea?",
        "answer": "Yes, but avoid adding it to boiling water. Let the water cool slightly before mixing to preserve the honey's natural nutrients."
      },
      {
        "question": "Is it suitable for kids and elders?",
        "answer": "Yes, it is suitable for all age groups except under 5 years."
      },
      {
        "question": "Is this honey vegan?",
        "answer": "Honey is not considered vegan by some due to bee involvement. However, this honey is completely natural, chemical-free and sustainably sourced."
      },
      {
        "question": "What makes it different from regular honey?",
        "answer": "It is single-origin and forest-sourced, minimally processed and free from added sugar, additives or preservatives."
      },
      {
        "question": "How is it packed?",
        "answer": "Packaged in a squeezy bottle for easy, mess-free use."
      }
    ]
  },
  "wood-pressed-coconut-oil": {
    "shelfLife": null,
    "benefits": [
      {
        "title": "Versatile Cooking Oil",
        "desc": "Adds a pleasant tropical flavour to a variety of dishes."
      },
      {
        "title": "Natural Moisturizer",
        "desc": "Hydrates skin and hair, reducing dryness inside out."
      },
      {
        "title": "Oral Hygiene Support",
        "desc": "Helps remove bacteria and reduce plaque buildup."
      },
      {
        "title": "Makeup Remover",
        "desc": "Effectively removes makeup while nourishing and hydrating."
      },
      {
        "title": "Metabolism Support",
        "desc": "Supports a healthy metabolism."
      }
    ],
    "faqs": [
      {
        "question": "What is the difference between refined and cold-pressed oils?",
        "answer": "Refined oils are processed with solvents at high heat (up to 100C), degrading taste and nutrition and creating trans fats. Cold-pressed oils use wooden presses below 50C, retaining natural flavour, aroma, nutrients, and beneficial fats."
      },
      {
        "question": "Why are Anveshan cooking oils expensive?",
        "answer": "They are cold-pressed using wooden Kolhu equipment in a single pressing, and remain unrefined and unbleached. This preserves genuine flavour, aroma, antioxidants, and nutrients."
      },
      {
        "question": "What is the difference between virgin and wood pressed coconut oil?",
        "answer": "Both offer similar nutritional benefits and are superior to refined oils. The difference is the extraction method: cold-pressed uses dried coconut flesh while virgin uses coconut milk."
      },
      {
        "question": "Does it solidify and melt on its own?",
        "answer": "The coconut oil remains liquid at room temperature and solidifies at lower temperatures, especially during winters."
      },
      {
        "question": "Can coconut oil be used for oil pulling?",
        "answer": "Yes, it is natural, preservative-free, easily absorbable, and has antimicrobial properties ideal for oil pulling."
      },
      {
        "question": "Can I use it for my hair and skin?",
        "answer": "Yes, it is 100% pure and chemical-free with fatty acids and antioxidants. A patch test is recommended as a precaution."
      }
    ]
  },
  "cold-pressed-khapli-atta-low-100-emmer-wheat-gi-high-fiber-stone-ground-flour": {
    "shelfLife": {
      "duration": "Best consumed within 6 months of milling.",
      "storage": "Store airtight in a cool, dry place."
    },
    "benefits": [
      {
        "title": "Cold-Pressed, Stone-Ground",
        "desc": "Ground below 40C using traditional chakkis to preserve fiber, bran, and micronutrients."
      },
      {
        "title": "Easy on Digestion",
        "desc": "Naturally low in gluten and high in fiber, gentle on the gut for everyday meals."
      },
      {
        "title": "100% Ancient Grain",
        "desc": "Grown from native Emmer (Khapli) wheat that is unhybridised and nutrient-rich."
      },
      {
        "title": "Lower Glycemic Response",
        "desc": "Breaks down slower than regular atta, helping with sustained energy."
      }
    ],
    "faqs": [
      {
        "question": "What makes Khapli different from regular atta?",
        "answer": "Khapli is an ancient wheat variety with naturally low gluten and high fiber. Unlike modern wheat it doesn't spike sugar levels and supports digestion and energy."
      },
      {
        "question": "How is it processed?",
        "answer": "It's cold-pressed under 40C using traditional stone grinding. This retains the bran, germ, and micronutrients typically lost in commercial atta."
      },
      {
        "question": "Is it good for diabetics?",
        "answer": "Khapli wheat is a whole grain with naturally high fiber and a lower glycemic response than refined flours. While individual responses vary, it's often considered a better option for those mindful of blood sugar."
      },
      {
        "question": "Can I use it daily?",
        "answer": "Absolutely. It's gentle on the stomach and makes soft, nutritious rotis, perfect for everyday use by kids, adults, and the elderly."
      },
      {
        "question": "Why is it more expensive than regular atta?",
        "answer": "Khapli wheat gives lower yield, takes longer to grow, and is sourced seasonally from single-origin farms. Its benefits and purity make it worth the value."
      },
      {
        "question": "What recipes work best with Khapli?",
        "answer": "Roti, thepla, puri, paratha, cookies, and even pancakes. Its nutty flavor and light texture shine across recipes."
      },
      {
        "question": "Who is it for?",
        "answer": "Health-focused families, diabetics, clean-eaters, and anyone looking for a traditional alternative to commercial wheat atta."
      },
      {
        "question": "Is it fortified?",
        "answer": "No. Unlike commercial atta, we don't add synthetic iron or fiber. Khapli is naturally rich in magnesium and zinc."
      }
    ]
  },
  "wood-pressed-mustard-oil": {
    "shelfLife": null,
    "benefits": [
      {
        "title": "Cooking & Pickling",
        "desc": "Enhanced flavour for traditional Indian cooking and preservation."
      },
      {
        "title": "Massage",
        "desc": "Relieves muscle tension, promotes relaxation, and provides a comforting sensation."
      },
      {
        "title": "Hair Care",
        "desc": "Deeply moisturises the scalp, promotes blood circulation, and strengthens hair follicles."
      },
      {
        "title": "Skin Care",
        "desc": "Keeps the skin hydrated, soft, and supple, ideal for dry or dehydrated skin."
      }
    ],
    "faqs": [
      {
        "question": "What is the difference between refined and cold-pressed oils?",
        "answer": "Refined oils use solvents and high-speed grinding up to 100C, degrading taste and nutrition and producing trans fats. Cold-pressed oils extract below 50C, retaining natural flavour, aroma, and nutritional value with antioxidants and vitamins."
      },
      {
        "question": "Why are Anveshan cooking oils expensive?",
        "answer": "Premium quality comes from wooden Kolhu pressing, first-pressed in a single crushing, and remains unrefined and unbleached. This retains genuine flavour, aroma, antioxidants, and nutrients."
      },
      {
        "question": "How can I use yellow mustard oil for cooking?",
        "answer": "Its high smoke point suits sauteing and stir-frying. It is also used for marination, salad dressing, natural preservation in pickles, and tadka."
      },
      {
        "question": "Can I use it for body massage?",
        "answer": "Yes, it relieves aching joints and muscles. A patch test is recommended first."
      },
      {
        "question": "Is mustard oil good for hair?",
        "answer": "Yes, it hydrates hair and contains vitamin E and omega-3 fatty acids that protect the scalp and hair."
      },
      {
        "question": "What is the difference between Yellow and Black Mustard Oil?",
        "answer": "Yellow is less pungent, more aromatic, and richer in vitamin E, and it maintains the original flavour of food."
      }
    ]
  },
  "sunflower-oil": {
    "shelfLife": null,
    "benefits": [
      {
        "title": "Heart-Healthy Support",
        "desc": "Heart-healthy MUFA and PUFA support digestion while keeping skin and hair beautiful."
      },
      {
        "title": "Reduces Cell Damage",
        "desc": "Helps reduce cell damage and aids digestion."
      },
      {
        "title": "High Smoke Point",
        "desc": "Suitable for high-heat cooking methods like deep frying."
      },
      {
        "title": "Digestive Support",
        "desc": "Promotes gut health alongside cardiovascular wellness."
      }
    ],
    "faqs": [
      {
        "question": "What is the difference between refined and cold-pressed oils?",
        "answer": "Refined oils use solvents and high-speed grinding generating heat up to 100C, degrading taste and nutrition and producing trans fats. Cold-pressed oils extract below 50C, retaining natural flavour, aroma, and nutritional value with antioxidants and beneficial fats."
      },
      {
        "question": "Why are Anveshan cooking oils expensive?",
        "answer": "Anveshan uses wooden Kolhu cold-pressing with single-press extraction. The oils remain unrefined, unbleached, and natural, retaining authentic flavour, aroma, antioxidants, and nutrients."
      },
      {
        "question": "What type of cooking is it suitable for?",
        "answer": "It suits deep frying due to its high smoke point and light taste, as well as low-heat applications like sauces or seed butter."
      },
      {
        "question": "Is it safe to use sunflower oil on the skin?",
        "answer": "Yes, it is abundant in Vitamin E for sun protection, and the pure, chemical-free version is safe. A patch test is recommended."
      },
      {
        "question": "How does it taste and smell?",
        "answer": "It has a mild flavour and aroma with subtle fatty notes that are more pronounced in unrefined versions, with no added flavouring or chemicals."
      }
    ]
  },
  "wood-pressed-black-sesame-oil": {
    "shelfLife": {
      "duration": "Best to use it before 12 months from the date of packaging.",
      "storage": null
    },
    "benefits": [
      {
        "title": "Immunity Booster",
        "desc": "Contains compounds that support immune function and help strengthen the body's defence against infections and diseases."
      },
      {
        "title": "Hair & Skin Health",
        "desc": "It helps to nourish the skin and hair. Regular use can moisturise the skin, improve skin elasticity, and promote shiny and lustrous hair."
      },
      {
        "title": "Antioxidant-Rich",
        "desc": "It is packed with antioxidants that promote overall cellular health."
      },
      {
        "title": "Heart Health",
        "desc": "Black sesame oil contains MUFA & PUFA which have been linked to improved heart health."
      }
    ],
    "faqs": [
      {
        "question": "What is the difference between refined and cold-pressed oils?",
        "answer": "Refined oils are processed with solvents at high temperatures (up to 100°C), degrading nutrients and creating trans fats. Cold-pressed oils use mechanical pressing below 50°C, retaining natural flavor, aroma, and nutritional value."
      },
      {
        "question": "Why are Anveshan cooking oils expensive?",
        "answer": "They're first-pressed, unrefined, and cold-extracted using wooden Kolhu, preserving genuine flavor, aroma, and nutrients without altering oil properties."
      },
      {
        "question": "Is sesame oil good for hair?",
        "answer": "Yes—it has antifungal/antibacterial properties, moisturizes hair, improves scalp health, and enhances blood circulation for hair growth."
      },
      {
        "question": "Can I cook with Anveshan Black Sesame Oil?",
        "answer": "Use for stir-frying, garnishing, salad dressing, and baking—not deep-frying due to low smoke point."
      },
      {
        "question": "How to use sesame oil for massage? Is it safe for skin?",
        "answer": "Heat oil to comfortable temperature, massage body, rest 15 minutes, then bathe. It's 100% pure and safe; perform a patch test first."
      },
      {
        "question": "Can I use it for oil pulling?",
        "answer": "Yes—sesame oil's antibacterial, anti-inflammatory, and antioxidant properties help control oral problems."
      }
    ]
  },
  "extra-virgin-olive-oil": {
    "shelfLife": {
      "duration": "Best to use it before 12 months from the date of packaging.",
      "storage": null
    },
    "benefits": [
      {
        "title": "Healthier Heart",
        "desc": "Olive oil reduces the risk of heart-related diseases."
      },
      {
        "title": "Anti-inflammatory Properties",
        "desc": "Oleic acid, the most prominent fatty acid in olive oil, has been shown to reduce inflammation."
      },
      {
        "title": "Antioxidant-rich",
        "desc": "It is loaded with powerful antioxidants that are biologically active and may reduce the risk of chronic diseases."
      },
      {
        "title": "Energy Source",
        "desc": "The healthy monounsaturated fatty acids in olive oil help to boost your energy, fuel your metabolism, and support cell repair."
      },
      {
        "title": "Better Brain Health",
        "desc": "The presence of polyunsaturated fats also known as good fats can help the brain function more efficiently."
      }
    ],
    "faqs": []
  },
  "khapli-multigrain-atta": {
    "shelfLife": {
      "duration": "Best Before 6 Months from the date of manufacture.",
      "storage": "Store in a cool, dry place in an airtight container to maintain freshness and prevent moisture absorption."
    },
    "benefits": [
      {
        "title": "Lower Glycemic Response",
        "desc": "Breaks down slower than regular atta, helping with sustained energy and mindful eating."
      },
      {
        "title": "Rich in Fiber and Protein",
        "desc": "Aids satiety and provides sustained energy throughout the day."
      }
    ],
    "faqs": [
      {
        "question": "Is protein atta good for health?",
        "answer": "Yes. It addresses protein deficiency by providing all 9 essential amino acids needed for immunity, muscle retention and hair health. Since it uses low-GI Khapli wheat it also aids digestion and keeps energy levels stable."
      },
      {
        "question": "Can I eat Protein Atta daily?",
        "answer": "Absolutely. It is designed to replace your regular flour offering 3X more protein without changing your eating habits."
      },
      {
        "question": "How is this different from regular atta?",
        "answer": "Regular atta provides limited protein (~10–12g per 100g), while this product delivers ~30g of protein per 100g making it nutritionally far superior."
      },
      {
        "question": "Who can consume this atta?",
        "answer": "It is suitable for working professionals, fitness enthusiasts, elderly individuals, growing children and families looking to improve protein intake naturally."
      },
      {
        "question": "What proteins are used?",
        "answer": "The protein comes from Pea Protein Isolate, Brown Rice Protein and naturally protein-rich Khapli wheat."
      },
      {
        "question": "Will rotis become hard, rubbery, or dry?",
        "answer": "Not at all. We spent months testing nearly 90 recipes to make sure the rotis feel and taste just right."
      },
      {
        "question": "Is it suitable for diabetics?",
        "answer": "Yes. The use of Emmer Wheat (Khapli) makes it naturally lower in GI compared to regular wheat aiding in better blood sugar management."
      },
      {
        "question": "Can I give this to children?",
        "answer": "Absolutely. It is an excellent way to ensure growing children get the necessary protein for muscle and immune health."
      },
      {
        "question": "What micronutrients are present?",
        "answer": "Contains Vitamin B complex, Calcium (Ca), Magnesium (Mg), Phosphorus (P) and Potassium (K)."
      }
    ]
  },
  "turmeric-latte": {
    "shelfLife": null,
    "benefits": [],
    "faqs": [
      {
        "question": "What does it taste like?",
        "answer": "Our Turmeric Latte is warm and soothing with a hint of spice."
      },
      {
        "question": "Does it only contain turmeric?",
        "answer": "No, our Turmeric Latte is a blend of seven incredibly beneficial spices namely Turmeric, Cardamom, Black Pepper, Ashwagandha, Ginger Root (Sunthi), Long Pepper (Pippali) and Liquorice (Mulethi)."
      },
      {
        "question": "Is it only for winters?",
        "answer": "No, we soak our turmeric roots in buttermilk which allows one to enjoy this wonderful drink all year round."
      },
      {
        "question": "Does it contain a sweetener?",
        "answer": "No, our Turmeric Latte does not contain any sweeteners. Feel free to add healthy sweeteners like honey or jaggery powder."
      }
    ]
  },
  "kashmiri-mongra-saffron": {
    "shelfLife": null,
    "benefits": [
      {
        "title": "Immunity & Digestion Boost",
        "desc": "Improves immunity, mood, and digestion with rejuvenating properties that aid post-meal wellness."
      },
      {
        "title": "Culinary Enhancement",
        "desc": "Adds enticing flavour, aroma, and royalty to your food through its superior quality and deep red color."
      },
      {
        "title": "Skincare Application",
        "desc": "Make a face pack or drink saffron water for glowing and healthy skin."
      }
    ],
    "faqs": [
      {
        "question": "What is the best way to consume saffron?",
        "answer": "4 to 5 strands in lukewarm water after meals as it has rejuvenating property and aids digestion."
      },
      {
        "question": "How much saffron should you consume daily?",
        "answer": "Taking up to 1.5 grams of saffron daily is generally safe but overeating is not. Researchers consider 5g to be a toxic dose."
      },
      {
        "question": "Why is Kashmiri Mongra Saffron expensive?",
        "answer": "Superior quality stigma and labor-intensive handpicking of mongra threads followed by sun-drying make it costly and sought-after."
      },
      {
        "question": "Is Saffron good for pregnant mothers?",
        "answer": "For pregnant women it is advised to take 250mg daily but make sure to consult your doctor first."
      }
    ]
  },
  "amlaprash": {
    "shelfLife": null,
    "benefits": [
      {
        "title": "Immunity Strengthening",
        "desc": "Strengthens immunity through its antioxidant-rich formula to help the body combat fatigue and oxidative stress."
      },
      {
        "title": "Digestive Support",
        "desc": "Aids digestion and helps users feel lighter and more active after consumption."
      },
      {
        "title": "Skin Enhancement",
        "desc": "Enhances skin glow as part of its comprehensive wellness benefits."
      },
      {
        "title": "Respiratory Health",
        "desc": "Improves respiratory health alongside its other wellness properties."
      },
      {
        "title": "Natural Detoxification",
        "desc": "Helps detoxify the body while promoting overall wellness without artificial additives."
      }
    ],
    "faqs": [
      {
        "question": "What is Amlaprash?",
        "answer": "Natural health supplement made primarily from Amla (Indian Gooseberry) which is rich in Vitamin C and antioxidants, focused on immunity and digestion."
      },
      {
        "question": "Who can consume Amlaprash?",
        "answer": "Suitable for adults, elderly people, and children above 5 years. Consult a doctor if pregnant, breastfeeding, or on medications."
      },
      {
        "question": "How should I consume Amlaprash?",
        "answer": "Take 1-2 teaspoons daily ideally on an empty stomach in the morning, or mixed with warm milk or water."
      },
      {
        "question": "What are the health benefits of Amlaprash?",
        "answer": "Strengthens immunity, aids digestion, enhances skin glow, improves respiratory health, and fights fatigue through antioxidants."
      },
      {
        "question": "Does Amlaprash contain added sugar or preservatives?",
        "answer": "Made with natural sweeteners and contains no artificial colors, preservatives, or refined sugar."
      }
    ]
  },
  "dry-fruit-paak-bites": {
    "shelfLife": {
      "duration": "Best before 6 months from the date of packaging.",
      "storage": "Sealed using MAP for long-lasting freshness."
    },
    "benefits": [
      {
        "title": "Balanced Blood Sugar",
        "desc": "Formulated with low glycemic index ingredients to support stable energy levels."
      },
      {
        "title": "Rich in Fiber and Protein",
        "desc": "Promotes satiety and sustained energy without crashes."
      },
      {
        "title": "No Added Sugar or Preservatives",
        "desc": "Contains less than 1g natural sugar from dates; safe for daily consumption."
      },
      {
        "title": "Lower Glycemic Response",
        "desc": "Breaks down slower than regular sweets, supporting sustained energy."
      },
      {
        "title": "Plant-Based Nutrition",
        "desc": "Delivers plant-based protein and fiber for nourishment."
      }
    ],
    "faqs": [
      {
        "question": "What makes it better than traditional sweets?",
        "answer": "Unlike conventional sweets made with sugar or vegetable oils, this paak is rich in fiber and protein with essential minerals. It is easier to digest and keeps you fuller without sugar crashes."
      },
      {
        "question": "Is it suitable for people with diabetes?",
        "answer": "Each bite contains less than 1g natural sugar from dates with low glycemic load, making it a safer alternative. Consulting a doctor is recommended."
      },
      {
        "question": "Is it safe for children?",
        "answer": "Yes, it's free from harmful additives and made with clean ingredients. Kids enjoy the taste while parents trust the nutrition."
      },
      {
        "question": "How long will it stay fresh?",
        "answer": "Thanks to MAP technology, the product remains fresh and crisp for up to 9 months without preservatives."
      },
      {
        "question": "How is this different from energy bars?",
        "answer": "Energy bars often contain syrups and emulsifiers, whereas this is made in small batches with familiar kitchen-level ingredients."
      },
      {
        "question": "Can I eat it every day?",
        "answer": "Yes, 1-2 bites daily support energy, satiety, and curbing sweet cravings without guilt."
      },
      {
        "question": "Who should try this?",
        "answer": "It's ideal for clean eaters, parents, fitness enthusiasts, and busy professionals seeking healthier sweets."
      }
    ]
  }
};
