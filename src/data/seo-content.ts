// SEO/AEO content for recipes, keyed by recipe id. Merged into each recipe at
// seed time (see seed.ts). Generated to be keyword-rich and answer-engine
// friendly: "intro" answers the search intent up front, "faqs" feed FAQPage
// schema, "tips" add crawlable expert content.
export interface RecipeSeoContent {
  description?: string;
  intro?: string;
  faqs?: { question: string; answer: string }[];
  tips?: string[];
}

export const SEO_CONTENT: Record<string, RecipeSeoContent> = {
  "aam-panna": {
    "description": "Aam panna is a tangy-sweet raw mango summer cooler spiced with roasted cumin and mint, sweetened with mineral-rich Anveshan jaggery instead of refined sugar for a natural heat-beater.",
    "intro": "Aam panna is a classic Indian raw mango cooler made by roasting or boiling green mangoes, then blending the tangy pulp with roasted cumin, black salt, mint and chilled water. This version skips refined sugar in favour of mineral-rich Anveshan jaggery powder and a spoon of raw honey, so it stays refreshingly tart-sweet while replenishing minerals lost in the summer heat. It comes together in about 30 minutes and serves 4.",
    "faqs": [
      {
        "question": "How do you make aam panna without sugar?",
        "answer": "Cook the raw mangoes, then sweeten the pulp with Anveshan jaggery powder and a little honey instead of refined sugar. You get the same tangy-sweet balance plus the natural minerals of jaggery."
      },
      {
        "question": "How long does it take to make aam panna?",
        "answer": "About 30 minutes in total, with 15 minutes of prep and 15 minutes to cook and cool the mango pulp. The recipe makes 4 glasses."
      },
      {
        "question": "Is aam panna good for summer?",
        "answer": "Yes, aam panna is a traditional heat-beater. The raw mango, black salt and roasted cumin help cool the body, while Anveshan jaggery replaces lost minerals naturally."
      },
      {
        "question": "Can I use honey instead of jaggery in aam panna?",
        "answer": "You can lean more on Anveshan wild forest honey if you prefer, but a mix of jaggery powder and honey gives the most authentic deep, caramel-tart flavour."
      }
    ],
    "tips": [
      "Roast or steam the raw mangoes whole for a smokier, sweeter pulp that needs less added sweetener.",
      "Stir in Anveshan jaggery powder while the pulp is still warm so it dissolves evenly with no grittiness.",
      "Add the raw honey only after the mix has cooled, to keep its natural enzymes intact."
    ]
  },
  "adrak-paak": {
    "description": "Adrak paak is a warming winter sweet of fresh ginger and roasted khapli atta bound in Anveshan ghee and jaggery, loaded with nuts and gond for an immunity-boosting treat.",
    "intro": "Adrak paak is a traditional Indian winter sweet made by roasting ginger paste and khapli atta in ghee, then binding them with jaggery, gond (edible gum) and nuts before setting into rich pieces. This wholesome version uses Anveshan bilona ghee, stone-ground khapli atta and mineral-rich jaggery powder instead of refined sugar, so each bite is warming and nourishing through the cold months. It takes about 50 minutes and yields 12 servings.",
    "faqs": [
      {
        "question": "What is adrak paak good for?",
        "answer": "Adrak paak is a traditional winter immunity treat. Ginger, dry ginger powder, gond and nuts make it warming, while Anveshan ghee and jaggery add wholesome richness for cold weather."
      },
      {
        "question": "How long does adrak paak take to make?",
        "answer": "About 50 minutes in total, with 20 minutes of prep and 30 minutes of cooking. The recipe makes 12 pieces."
      },
      {
        "question": "Can I make adrak paak with khapli atta?",
        "answer": "Yes, this recipe is built around Anveshan khapli atta, which roasts to a nutty depth and is gentler on digestion than regular wheat flour."
      },
      {
        "question": "Why use ghee instead of oil in adrak paak?",
        "answer": "Ghee carries the flavours of ginger and cardamom beautifully and helps the paak set firm. Anveshan bilona ghee gives a rich aroma that oil cannot match."
      }
    ],
    "tips": [
      "Roast the khapli atta in Anveshan ghee on low heat until it turns golden and nutty before adding ginger.",
      "Fry the gond separately in a little ghee until it puffs up, for that signature crunch.",
      "Cook the jaggery to a soft setting consistency so the paak slices cleanly once cooled."
    ]
  },
  "air-fried-sweet-potato-fries": {
    "description": "Air-fried sweet potato fries tossed in a little Anveshan groundnut oil for a crisp, guilt-free crunch, with a drizzle of honey balancing the warm paprika and pepper.",
    "intro": "Air-fried sweet potato fries are crisp-edged sweet potato batons tossed in a touch of oil and cornflour, then air-fried until golden instead of deep-fried. This lighter version uses just two tablespoons of Anveshan wood-pressed groundnut oil and a drizzle of raw Anveshan honey to balance the paprika and black pepper, giving you a crunchy, lower-oil snack in about 35 minutes that serves 4.",
    "faqs": [
      {
        "question": "How do you make sweet potato fries crispy in an air fryer?",
        "answer": "Toss the cut sweet potatoes with cornflour and a little Anveshan groundnut oil, spread them in a single layer, and air-fry. The cornflour and even coating give a crisp edge without deep frying."
      },
      {
        "question": "How long do air fryer sweet potato fries take?",
        "answer": "About 35 minutes total, with 15 minutes of prep and 20 minutes of air frying. The recipe makes 4 servings."
      },
      {
        "question": "Are air-fried sweet potato fries healthy?",
        "answer": "Yes, they use only 2 tablespoons of Anveshan groundnut oil instead of a deep-fry bath, so they are far lighter while still crisp and satisfying."
      }
    ],
    "tips": [
      "Soak the cut fries in water for 20 minutes to remove starch, then pat fully dry for maximum crunch.",
      "Use just enough Anveshan groundnut oil to coat, and avoid crowding the basket so the fries crisp rather than steam.",
      "Drizzle the Anveshan honey on right after air-frying so it clings while the fries are hot."
    ]
  },
  "air-fryer-chicken-breast": {
    "description": "Air fryer chicken breast rubbed with Anveshan olive oil and spices, then finished with a sticky raw honey glaze that caramelises into a glossy, juicy golden crust.",
    "intro": "Air fryer chicken breast is a quick, juicy main where seasoned chicken breasts are rubbed with oil and spices, then air-fried until golden and cooked through. This recipe uses fruity Anveshan olive oil for the rub and a sticky glaze of raw Anveshan honey that caramelises into a glossy crust, so the chicken stays moist with minimal added fat. It takes about 28 minutes and serves 4.",
    "faqs": [
      {
        "question": "How long do you cook chicken breast in an air fryer?",
        "answer": "About 18 minutes of cooking after 10 minutes of prep, flipping halfway. This recipe serves 4 and gives juicy chicken with a caramelised honey crust."
      },
      {
        "question": "How do you keep air fryer chicken breast from drying out?",
        "answer": "Rub the breasts with Anveshan olive oil and the spice blend before cooking, and brush the honey glaze on near the end so it caramelises without burning. The oil coating seals in moisture."
      },
      {
        "question": "Can I use Anveshan olive oil instead of butter for chicken?",
        "answer": "Yes, Anveshan olive oil gives a fruity richness and helps the spice rub adhere, making it a lighter swap for butter in air fryer chicken."
      },
      {
        "question": "What can I serve with air fryer chicken breast?",
        "answer": "It pairs well with a fresh salad, roasted vegetables or rice. The honey-paprika glaze also works beautifully sliced into wraps and grain bowls."
      }
    ],
    "tips": [
      "Pound the breasts to an even thickness so they cook through without the edges drying out.",
      "Brush the Anveshan honey glaze on in the last few minutes so it turns glossy instead of scorching.",
      "Rest the chicken for 5 minutes after cooking to keep the juices locked in."
    ]
  },
  "aloo-tikki-chaat": {
    "description": "Aloo tikki chaat features crisp potato patties shallow-fried in Anveshan groundnut oil, topped with curd, chickpeas, sev and a jaggery-sweetened tamarind chutney.",
    "intro": "Aloo tikki chaat is a beloved North Indian street snack of crisp shallow-fried potato patties topped with whisked curd, tangy chutneys, chickpeas and a flurry of sev. Here the tikkis are shallow-fried in nutty Anveshan wood-pressed groundnut oil and the tamarind chutney is sweetened with mineral-rich Anveshan jaggery powder instead of sugar, for a cleaner, more wholesome plate. It comes together in about 50 minutes and serves 4.",
    "faqs": [
      {
        "question": "How do you make crispy aloo tikki?",
        "answer": "Bind the boiled potatoes with a little cornflour and shallow-fry them in Anveshan groundnut oil over medium heat until deep golden on both sides. The cornflour and patient frying give the crunch."
      },
      {
        "question": "How long does aloo tikki chaat take to make?",
        "answer": "About 50 minutes, with 30 minutes of prep and 20 minutes of cooking. The recipe assembles 4 servings."
      },
      {
        "question": "Can I make the tamarind chutney without sugar?",
        "answer": "Yes, this recipe sweetens the tamarind pulp with Anveshan jaggery powder instead of refined sugar, giving the chutney a deeper, caramel-tangy flavour."
      },
      {
        "question": "What goes on top of aloo tikki chaat?",
        "answer": "Whisked curd, boiled chickpeas, tamarind-jaggery chutney, chaat masala, sev and fresh coriander. Layer them just before serving so the tikki stays crisp."
      }
    ],
    "tips": [
      "Make sure the boiled potatoes are completely dry before mashing, or the tikkis will fall apart while frying.",
      "Shallow-fry the patties in Anveshan groundnut oil and resist flipping too early so a firm crust forms.",
      "Assemble the chaat just before eating so the curd and chutneys do not soften the crisp tikki."
    ]
  },
  "amla-honey-wellness-shot": {
    "description": "An amla honey wellness shot built on vitamin-C-rich Anveshan Amlaprash and mellowed with raw honey, with ginger and pepper for a warming, immunity-boosting morning kick.",
    "intro": "An amla honey wellness shot is a small, concentrated morning drink that delivers a quick dose of vitamin-C-rich amla, balanced with raw honey and warming spices. This no-cook version stirs Anveshan Amlaprash and Anveshan honey into warm water with fresh ginger juice, lemon and a pinch of black pepper, so it is bright, warming and ready in just 5 minutes. It makes 4 small shots.",
    "faqs": [
      {
        "question": "When is the best time to take an amla honey wellness shot?",
        "answer": "First thing in the morning on an empty stomach is ideal, so the vitamin-C-rich Anveshan Amlaprash and honey kick-start your day."
      },
      {
        "question": "How long does it take to make a wellness shot?",
        "answer": "Just 5 minutes with no cooking. You simply stir Anveshan Amlaprash, honey, ginger juice, lemon and pepper into warm water, which makes 4 small shots."
      },
      {
        "question": "Why add black pepper to an amla shot?",
        "answer": "A pinch of black pepper adds gentle warmth and is traditionally believed to aid absorption, rounding off the tartness of amla and the sweetness of Anveshan honey."
      }
    ],
    "tips": [
      "Use warm, not hot, water so the natural enzymes in Anveshan honey are preserved.",
      "Grate and squeeze fresh ginger for the juice rather than using dried powder, for a brighter kick.",
      "Adjust the Anveshan honey to taste, since amla's tartness varies batch to batch."
    ]
  },
  "amlaprash-energy-bites": {
    "description": "No-cook amlaprash energy bites rolled from dates, nuts and immunity-boosting Anveshan Amlaprash, bound with honey and dry fruit paak for a wholesome daily vitamin-C snack.",
    "intro": "Amlaprash energy bites are no-cook wellness balls made by blitzing dates and nuts, then binding them with Anveshan Amlaprash, honey and dry fruit paak before rolling into bite-sized pieces. This recipe needs zero cooking and just 20 minutes, giving you a naturally sweet, vitamin-C-rich snack with no refined sugar that serves 4. They are perfect for a daily immunity boost or a quick energy pick-me-up.",
    "faqs": [
      {
        "question": "Do amlaprash energy bites need to be cooked?",
        "answer": "No, these are completely no-cook. You blend dates and nuts, mix in Anveshan Amlaprash, honey and dry fruit paak, then roll into bites in about 20 minutes."
      },
      {
        "question": "Are amlaprash energy bites healthy?",
        "answer": "Yes, they are sweetened only with dates and Anveshan honey, with no refined sugar, and the Anveshan Amlaprash adds vitamin C and the dry fruit paak adds nutty richness."
      },
      {
        "question": "How should I store amlaprash energy bites?",
        "answer": "Keep them in an airtight container in the fridge, where they stay fresh for a week or more. Serve one or two as a daily wellness snack."
      }
    ],
    "tips": [
      "If the mixture feels dry, add an extra teaspoon of Anveshan honey to help it bind.",
      "Use soft, moist dates so the bites hold together without any cooking.",
      "Roll the finished bites in desiccated coconut for a neat finish and a little extra texture."
    ]
  },
  "antipasto-pasta-salad": {
    "description": "A colourful Italian antipasto pasta salad with mozzarella, salami, olives and peppers, tossed in a bright herb vinaigrette built on Anveshan olive oil and a touch of honey.",
    "intro": "Antipasto pasta salad is a hearty Italian-style cold salad that tosses cooked pasta with mozzarella, salami, olives, roasted peppers and cherry tomatoes in a tangy herb dressing. This version builds the vinaigrette on fruity Anveshan olive oil with a touch of raw Anveshan honey to balance the red wine vinegar, making it a vibrant make-ahead dish. It takes about 32 minutes and serves 6.",
    "faqs": [
      {
        "question": "Can you make antipasto pasta salad ahead of time?",
        "answer": "Yes, it actually tastes better after a few hours as the flavours meld. Toss it in the Anveshan olive oil dressing, chill, and add a fresh splash of dressing before serving."
      },
      {
        "question": "How long does antipasto pasta salad take to make?",
        "answer": "About 32 minutes, with 20 minutes of prep and 12 minutes to cook the pasta. The recipe serves 6, making it ideal for gatherings."
      },
      {
        "question": "What dressing goes on antipasto pasta salad?",
        "answer": "A simple herb vinaigrette of Anveshan olive oil, red wine vinegar, oregano and a touch of Anveshan honey, which balances the tang and brings the salad together."
      },
      {
        "question": "What pasta is best for pasta salad?",
        "answer": "Short shapes like fusilli or penne work best, as their ridges hold the Anveshan olive oil dressing. Cook them just to al dente so they stay firm when chilled."
      }
    ],
    "tips": [
      "Cook the pasta al dente and rinse under cool water so it does not turn mushy in the salad.",
      "Whisk the Anveshan olive oil and honey into the vinegar until emulsified for a dressing that coats every piece.",
      "Toss while the pasta is slightly warm so it soaks up the dressing, then chill before serving."
    ]
  },
  "ashwagandha-moon-milk": {
    "description": "A calming ashwagandha moon milk made with Anveshan Ashwagandha Mix and sweetened with raw wild forest honey, warm and creamy to help you unwind before bed.",
    "intro": "Ashwagandha moon milk is a warm, soothing bedtime drink made by simmering milk with ashwagandha and gentle spices, then sweetening it naturally. This recipe uses Anveshan Ashwagandha Mix with cardamom and a pinch of nutmeg, sweetened with raw Anveshan wild forest honey instead of sugar, for a creamy, comforting nightcap. It takes just 10 minutes and serves 4.",
    "faqs": [
      {
        "question": "When should I drink ashwagandha moon milk?",
        "answer": "Sip it warm about 30 to 60 minutes before bed. The Anveshan Ashwagandha Mix and warm milk make it a calming wind-down ritual."
      },
      {
        "question": "How do you make ashwagandha moon milk?",
        "answer": "Warm milk with Anveshan Ashwagandha Mix, cardamom and nutmeg for about 5 minutes, then stir in raw Anveshan honey off the heat. It takes 10 minutes and serves 4."
      },
      {
        "question": "Can I make ashwagandha moon milk with plant milk?",
        "answer": "Yes, almond or oat milk both work well in place of dairy. The Anveshan Ashwagandha Mix and honey carry the flavour either way."
      }
    ],
    "tips": [
      "Add the Anveshan honey only after taking the milk off the heat, so its natural goodness is preserved.",
      "Whisk well while warming to dissolve the Anveshan Ashwagandha Mix smoothly with no lumps.",
      "A tiny pinch of nutmeg goes a long way, so add it sparingly for a gentle, restful aroma."
    ]
  },
  "atta-jaggery-ladoo": {
    "description": "Rustic atta jaggery ladoos roasted in Anveshan bilona ghee until nutty, sweetened with mineral-rich jaggery and made with stone-ground khapli atta for slow-release energy.",
    "intro": "Atta jaggery ladoo is a comforting Indian sweet made by roasting whole-wheat flour in ghee until nutty, then binding it with jaggery, nuts and gond into round ladoos. This wholesome version uses stone-ground Anveshan khapli atta, Anveshan bilona ghee and mineral-rich jaggery powder instead of refined sugar, giving slow-release energy and a deep roasted aroma. It takes about 30 minutes and serves 4.",
    "faqs": [
      {
        "question": "How do you make atta jaggery ladoo?",
        "answer": "Roast Anveshan khapli atta in bilona ghee until golden and nutty, mix in jaggery powder, nuts and gond, then shape into ladoos. It takes about 30 minutes and makes 4 servings."
      },
      {
        "question": "Can I make atta ladoo with khapli atta?",
        "answer": "Yes, this recipe uses stone-ground Anveshan khapli atta, an ancient wheat that roasts to a rich, nutty flavour and offers slow-release energy."
      },
      {
        "question": "Why use jaggery instead of sugar in atta ladoo?",
        "answer": "Anveshan jaggery powder adds natural minerals and a warm caramel sweetness, making the ladoos more wholesome than versions made with refined sugar."
      }
    ],
    "tips": [
      "Roast the khapli atta on low heat in Anveshan ghee until it smells nutty, as this builds the whole flavour of the ladoo.",
      "Let the roasted flour cool slightly before adding jaggery so it does not melt into a paste.",
      "Shape the ladoos while the mixture is still warm, as it firms up and becomes hard to roll once cold."
    ]
  },
  "atte-ka-sheera-ghee-halwa": {
    "description": "Atte ka sheera is a soul-warming wheat halwa slow-roasted in Anveshan desi ghee and sweetened with jaggery, made with stone-ground khapli atta for a velvety, aromatic finish.",
    "intro": "Atte ka sheera, also called ghee halwa, is a traditional Indian dessert made by slow-roasting wheat flour in ghee, then cooking it with water and a sweetener until thick and glossy. This version uses Anveshan desi ghee, stone-ground khapli atta and mineral-rich jaggery powder in place of refined sugar, turning velvety and deeply aromatic. It takes about 30 minutes and serves 4.",
    "faqs": [
      {
        "question": "How do you make atte ka sheera?",
        "answer": "Roast khapli atta in Anveshan desi ghee until golden, add hot water and jaggery powder, and stir until it thickens to a glossy halwa. It takes about 30 minutes and serves 4."
      },
      {
        "question": "Why is my atte ka sheera lumpy?",
        "answer": "Lumps form when water is added too fast. Pour hot water slowly into the roasted flour while stirring constantly, and the Anveshan ghee will help it stay smooth."
      },
      {
        "question": "Can I sweeten ghee halwa with jaggery?",
        "answer": "Yes, this recipe uses Anveshan jaggery powder instead of sugar, which gives the sheera a warm caramel depth and natural minerals."
      }
    ],
    "tips": [
      "Roast the khapli atta patiently in Anveshan desi ghee until it turns reddish-gold for the best aroma.",
      "Use hot water rather than cold to avoid lumps and to help the sheera come together quickly.",
      "Stir in the jaggery powder off direct high heat so it dissolves evenly without seizing."
    ]
  },
  "bajra-khichdi": {
    "description": "Bajra khichdi is a hearty Rajasthani one-pot of pearl millet and moong dal, enriched with a spoon of Anveshan bilona ghee and balanced with a pinch of jaggery.",
    "intro": "Bajra khichdi is a rustic Rajasthani one-pot dish where soaked pearl millet and yellow moong dal are slow-cooked into a comforting, porridge-like meal. This wholesome version finishes with a generous spoon of nutty Anveshan bilona ghee and a pinch of Anveshan jaggery powder to balance the earthy bajra, making it warming and nourishing. It takes about 50 minutes and serves 4.",
    "faqs": [
      {
        "question": "How do you make bajra khichdi?",
        "answer": "Soak the bajra, then pressure-cook or simmer it with moong dal, cumin and turmeric until soft and porridge-like. Finish with Anveshan bilona ghee and a pinch of jaggery. It takes about 50 minutes and serves 4."
      },
      {
        "question": "Why soak bajra before cooking?",
        "answer": "Soaking the pearl millet softens it and reduces cooking time, helping the khichdi turn creamy and easy to digest."
      },
      {
        "question": "Is bajra khichdi healthy?",
        "answer": "Yes, bajra and moong dal are fibre- and protein-rich, and a spoon of Anveshan bilona ghee adds wholesome richness, making it a comforting winter meal."
      },
      {
        "question": "What do you serve with bajra khichdi?",
        "answer": "It is traditionally served with extra Anveshan ghee, plain curd, jaggery or a dollop of white butter, which balances the earthy millet beautifully."
      }
    ],
    "tips": [
      "Soak the bajra for a few hours so it cooks down to a soft, creamy texture.",
      "Add the Anveshan bilona ghee generously at the end, the way it is traditionally served in Rajasthan.",
      "Adjust the water as it cooks to keep the khichdi loose and porridge-like rather than dry."
    ]
  },
  "bajra-methi-khakhra": {
    "description": "Crisp, paper-thin bajra methi khakhra made with wholesome Anveshan multigrain atta and fresh fenugreek, lightly brushed with ghee for a fibre-rich, roasted Gujarati snack.",
    "intro": "Bajra methi khakhra is a thin, roasted Gujarati flatbread cracker made by kneading multigrain atta with fresh methi and spices, rolling it wafer-thin, and dry-roasting it on a tawa until crisp. This version uses fibre-rich Anveshan multigrain atta and earthy fenugreek for a wholesome crunch, while a light brush of Anveshan ghee gives a rich aroma and golden finish without any deep frying.",
    "faqs": [
      {
        "question": "How long does it take to make bajra methi khakhra?",
        "answer": "About 45 minutes in total: 20 minutes to knead and roll the dough and 25 minutes to roast, yielding around 4 servings."
      },
      {
        "question": "Is bajra methi khakhra healthy?",
        "answer": "Yes, it is dry-roasted rather than fried and built on fibre-rich Anveshan multigrain atta and fresh methi, making it a wholesome, light snack."
      },
      {
        "question": "Can I make khakhra without deep frying?",
        "answer": "Absolutely, khakhra is traditionally dry-roasted on a tawa; a light brush of Anveshan ghee is all you need for a crisp, aromatic finish."
      },
      {
        "question": "What do you serve with bajra methi khakhra?",
        "answer": "It pairs beautifully with chai, pickle or a little chutney, and stays crunchy in an airtight jar for days."
      }
    ],
    "tips": [
      "Roll the dough as thin as possible so the khakhra crisps up evenly and stays crunchy.",
      "Press with a folded cloth while roasting to release steam and prevent soft spots.",
      "Brush with a little Anveshan ghee only at the end to keep the aroma fresh and the crunch intact."
    ]
  },
  "baked-chicken-meatballs": {
    "description": "Tender oven-baked chicken meatballs bound with nutty Anveshan khapli atta breadcrumbs, brushed with Anveshan olive oil and finished with a glossy knob of ghee for a wholesome, juicy bite.",
    "intro": "Baked chicken meatballs are seasoned ground chicken rolled into balls, bound with breadcrumbs and egg, and baked in the oven until golden and juicy instead of fried. This wholesome version swaps regular breadcrumbs for toasted Anveshan khapli atta, brushes the meatballs with fruity Anveshan olive oil and finishes them with a melting knob of Anveshan ghee for richness without heaviness.",
    "faqs": [
      {
        "question": "How long does it take to bake chicken meatballs?",
        "answer": "Around 42 minutes total: 20 minutes to mix and shape and 22 minutes baking, serving 4."
      },
      {
        "question": "Can I use khapli atta instead of breadcrumbs?",
        "answer": "Yes, toasted Anveshan khapli atta works as a nutty, fibre-rich binder in place of regular breadcrumbs and helps keep the meatballs tender."
      },
      {
        "question": "Can I use Anveshan ghee instead of butter?",
        "answer": "Definitely, a final knob of Anveshan ghee gives the baked meatballs a glossy, buttery finish that is richer than butter."
      },
      {
        "question": "What do you serve with chicken meatballs?",
        "answer": "Serve them with pasta, a fresh salad, or tucked into a multigrain bun; the parmesan and oregano make them very versatile."
      }
    ],
    "tips": [
      "Toast the khapli atta lightly before mixing for a deeper, nuttier flavour in the meatballs.",
      "Brush with Anveshan olive oil before baking so they brown evenly without drying out.",
      "Do not overwork the mince; mix just until combined to keep the meatballs soft and juicy."
    ]
  },
  "baked-namak-para": {
    "description": "Crispy, flaky diamond-shaped namak para made with nutty Anveshan khapli atta and bilona ghee, then baked instead of deep-fried for a lighter, guilt-free tea-time crunch.",
    "intro": "Namak para is a savoury Indian tea-time snack of spiced dough cut into diamonds and traditionally deep-fried until crisp; in this version the diamonds are baked instead. Made with nutty Anveshan khapli atta rubbed with Anveshan bilona ghee and seasoned with ajwain and cumin, these baked namak para deliver the same flaky crunch with far less oil.",
    "faqs": [
      {
        "question": "How long does it take to make baked namak para?",
        "answer": "About 45 minutes: 20 minutes to make and cut the dough and 25 minutes to bake, giving roughly 4 servings."
      },
      {
        "question": "Are baked namak para healthier than fried ones?",
        "answer": "Yes, baking instead of deep-frying cuts the oil considerably, and using Anveshan khapli atta and bilona ghee makes them more wholesome."
      },
      {
        "question": "Can I make namak para with khapli atta?",
        "answer": "Yes, this recipe uses Anveshan khapli atta, an ancient emmer wheat that gives the crackers a lovely nutty flavour and flaky texture."
      },
      {
        "question": "How do I store baked namak para?",
        "answer": "Cool them completely and store in an airtight jar where they stay crisp for up to two weeks."
      }
    ],
    "tips": [
      "Rub the Anveshan bilona ghee thoroughly into the flour so the namak para turn out flaky, not hard.",
      "Roll the dough slightly thick and cut even diamonds so they bake uniformly.",
      "Bake until pale golden, then let them cool fully as they crisp up further as they rest."
    ]
  },
  "besan-barfi": {
    "description": "A classic besan barfi slow-roasted in nutty Anveshan bilona ghee until golden, then sweetened with unrefined khandsari and set into rich, melt-in-the-mouth diamonds.",
    "intro": "Besan barfi is a traditional Indian fudge made by slow-roasting gram flour in ghee until aromatic, then binding it with sugar syrup and setting it into diamond pieces. This version roasts the besan in nutty Anveshan bilona ghee for a deep golden flavour and sweetens it with unrefined Anveshan khandsari for a clean, melt-in-the-mouth finish.",
    "faqs": [
      {
        "question": "How long does it take to make besan barfi?",
        "answer": "About 35 minutes: 10 minutes prep and 25 minutes of roasting and setting, yielding around 4 servings."
      },
      {
        "question": "Why use Anveshan ghee for besan barfi?",
        "answer": "Anveshan bilona ghee roasts the gram flour to a rich golden colour and gives the barfi its signature nutty aroma and smooth texture."
      },
      {
        "question": "Can I use khandsari instead of refined sugar?",
        "answer": "Yes, this recipe uses unrefined Anveshan khandsari, which sweetens the barfi cleanly without the harshness of refined white sugar."
      },
      {
        "question": "How do I know when the besan is roasted enough?",
        "answer": "Roast on low heat until the besan turns golden and releases a nutty fragrance; under-roasting leaves a raw, bitter taste."
      }
    ],
    "tips": [
      "Roast the besan on low, steady heat in Anveshan ghee and stir constantly to avoid burning.",
      "Pour the mixture into a greased tray and cut the diamonds while it is still slightly warm.",
      "Garnish with slivered pistachios and press them in gently so they stick as the barfi sets."
    ]
  },
  "besan-ladoo": {
    "description": "Classic festive besan ladoo made with roasted gram flour, pure Anveshan bilona ghee and unrefined khandsari, rolled into rich, melt-in-the-mouth balls for any celebration.",
    "intro": "Besan ladoo is a beloved festive Indian sweet made by roasting gram flour in ghee until fragrant, then mixing in powdered sugar and rolling the mixture into round balls. Here, pure Anveshan bilona ghee and unrefined Anveshan khandsari replace ordinary ghee and white sugar, giving these ladoos a richer aroma and cleaner sweetness while making a generous batch of 20.",
    "faqs": [
      {
        "question": "How many besan ladoos does this recipe make?",
        "answer": "It makes about 20 ladoos, with roughly 15 minutes of prep and 30 minutes of roasting."
      },
      {
        "question": "Can I use Anveshan ghee instead of regular ghee?",
        "answer": "Yes, Anveshan bilona ghee is ideal here; it roasts the besan beautifully and gives the ladoos their classic rich, nutty flavour."
      },
      {
        "question": "Is besan ladoo made with khandsari healthier?",
        "answer": "Using unrefined Anveshan khandsari instead of refined white sugar gives a cleaner sweetness, though ladoos remain an indulgent treat."
      },
      {
        "question": "Why are my besan ladoos not binding?",
        "answer": "The besan may need more roasting or a little extra warm Anveshan ghee; let the mixture cool slightly before rolling so it holds its shape."
      }
    ],
    "tips": [
      "Roast the besan low and slow in Anveshan bilona ghee until it turns golden and aromatic for the best flavour.",
      "Add the powdered khandsari only after the mixture has cooled a little so it does not melt.",
      "If the mix feels dry, drizzle in a spoon of warm Anveshan ghee to help the ladoos bind."
    ]
  },
  "bhindi-fry-groundnut-oil": {
    "description": "Crisp, non-slimy bhindi fry cooked in cold-pressed Anveshan groundnut oil with everyday Indian spices, finished with a touch of bilona ghee for a clean, golden okra stir-fry.",
    "intro": "Bhindi fry is a simple Indian dry stir-fry of okra cooked with onions and spices until crisp and non-slimy. Stir-frying the okra in nutty Anveshan groundnut oil gives it a beautiful golden char and a clean flavour, while a spoon of Anveshan bilona ghee rounds it off, making a quick everyday side that pairs with roti or dal-chawal.",
    "faqs": [
      {
        "question": "How long does it take to make bhindi fry?",
        "answer": "About 30 minutes: 10 minutes to chop and 20 minutes to fry, serving 4."
      },
      {
        "question": "How do I stop bhindi from getting slimy?",
        "answer": "Make sure the okra is fully dry before cutting, cook it on medium-high heat, and use enough Anveshan groundnut oil so it crisps rather than steams."
      },
      {
        "question": "Why use groundnut oil for bhindi fry?",
        "answer": "Cold-pressed Anveshan groundnut oil has a naturally nutty taste and helps the bhindi turn golden and crisp without a greasy finish."
      },
      {
        "question": "What do you serve with bhindi fry?",
        "answer": "It goes wonderfully with phulka, dal and rice, or as a dry side alongside a fuller curry."
      }
    ],
    "tips": [
      "Wash and thoroughly dry the okra before cutting so it does not turn slimy when cooked.",
      "Stir-fry in Anveshan groundnut oil on medium-high heat without covering the pan for the crispiest bhindi.",
      "Add the amchur right at the end for a tangy lift without making the okra soggy."
    ]
  },
  "cabbage-thoran": {
    "description": "A light, fragrant Kerala-style cabbage thoran tempered in cold-pressed Anveshan coconut oil with mustard seeds, curry leaves and fresh grated coconut for an authentic South Indian aroma.",
    "intro": "Cabbage thoran is a classic Kerala stir-fry of finely shredded cabbage tossed with grated coconut and a quick tempering of mustard seeds and curry leaves. Tempering it in pure cold-pressed Anveshan coconut oil delivers that unmistakable South Indian aroma, and a little Anveshan bilona ghee adds gentle richness, making a light, fragrant side that comes together in minutes.",
    "faqs": [
      {
        "question": "How long does it take to make cabbage thoran?",
        "answer": "About 30 minutes: 15 minutes of prep and 15 minutes of cooking, serving 4."
      },
      {
        "question": "Why use coconut oil for thoran?",
        "answer": "Cold-pressed Anveshan coconut oil gives thoran its authentic Kerala flavour and fragrance that ordinary refined oils simply cannot match."
      },
      {
        "question": "Is cabbage thoran healthy?",
        "answer": "Yes, it is a light, lightly cooked vegetable dish with fresh coconut and minimal oil, making it a wholesome everyday side."
      },
      {
        "question": "What do you serve with cabbage thoran?",
        "answer": "It is best served with steamed rice and sambar or rasam as part of a South Indian meal."
      }
    ],
    "tips": [
      "Let the mustard seeds splutter fully in Anveshan coconut oil before adding the cabbage for the right base flavour.",
      "Cook the cabbage on high heat briefly so it stays crunchy rather than turning soft.",
      "Stir in the fresh grated coconut at the end to keep it moist and fragrant."
    ]
  },
  "chana-masala": {
    "description": "Hearty chana masala with chickpeas simmered in a robust onion-tomato gravy, tempered in cold-pressed Anveshan groundnut oil for a clean, earthy depth in this protein-packed curry.",
    "intro": "Chana masala is a popular North Indian curry of chickpeas simmered in a spiced onion-tomato masala until rich and flavourful. This version blooms the spices in cold-pressed Anveshan groundnut oil and a spoon of bilona ghee for a clean, earthy depth, making a protein-packed, satisfying curry that pairs with rice, bhature or roti.",
    "faqs": [
      {
        "question": "How long does it take to make chana masala?",
        "answer": "About 50 minutes: 15 minutes prep and 35 minutes cooking, serving 4, plus soaking time if using dried chickpeas."
      },
      {
        "question": "Is chana masala healthy?",
        "answer": "Yes, chickpeas are rich in plant protein and fibre, and cooking in Anveshan groundnut oil keeps the curry clean and wholesome."
      },
      {
        "question": "What do you serve with chana masala?",
        "answer": "It is delicious with steamed rice, jeera rice, bhatura, or hot phulkas, and a side of sliced onions and lemon."
      },
      {
        "question": "Can I use ghee in chana masala?",
        "answer": "Yes, finishing with a spoon of Anveshan bilona ghee adds a lovely aroma and a richer, more rounded flavour to the gravy."
      }
    ],
    "tips": [
      "Bloom the cumin and ground spices in Anveshan groundnut oil until fragrant to build a deep base flavour.",
      "Cook the onion-tomato masala until the oil separates for the richest, most authentic taste.",
      "Lightly mash a few chickpeas to thicken the gravy naturally without any cream."
    ]
  },
  "chicken-tinga-tacos": {
    "description": "Shredded chicken tinga tacos simmered in a smoky chipotle-tomato sauce bloomed in Anveshan groundnut oil, piled into soft homemade tortillas rolled from nutty Anveshan khapli atta.",
    "intro": "Chicken tinga tacos are a Mexican favourite of chicken simmered in a smoky chipotle-tomato sauce, then shredded and piled into warm tortillas. Here the sauce is bloomed in nutty Anveshan groundnut oil for a clean, earthy base, and the soft tortillas are rolled fresh from fibre-rich Anveshan khapli atta, making the whole plate more wholesome.",
    "faqs": [
      {
        "question": "How long does it take to make chicken tinga tacos?",
        "answer": "About 55 minutes: 25 minutes prep and 30 minutes cooking, serving 4 including the homemade tortillas."
      },
      {
        "question": "Can I make tortillas with khapli atta?",
        "answer": "Yes, this recipe rolls soft tortillas from Anveshan khapli atta, an ancient emmer wheat that adds a nutty flavour and extra fibre."
      },
      {
        "question": "How spicy is chicken tinga?",
        "answer": "The heat comes from chipotle peppers in adobo, so you can adjust the quantity to make it as mild or fiery as you like."
      },
      {
        "question": "What do you serve with chicken tinga tacos?",
        "answer": "Top them with fresh coriander, a squeeze of lime, onions and your favourite salsa or cheese."
      }
    ],
    "tips": [
      "Bloom the chipotle and tomatoes in Anveshan groundnut oil before adding the chicken for the deepest smoky flavour.",
      "Rest the khapli atta dough before rolling so the tortillas stay soft and pliable.",
      "Shred the chicken back into the sauce so every piece soaks up the smoky masala."
    ]
  },
  "chocolate-chia-pudding": {
    "description": "A rich, creamy no-cook chocolate chia pudding made with coconut milk, cocoa and Anveshan honey, set overnight for a wholesome dessert free of refined sugar.",
    "intro": "Chocolate chia pudding is a no-cook dessert made by soaking chia seeds in coconut milk with cocoa and a natural sweetener until they swell into a thick, creamy pudding overnight. This version is sweetened with raw Anveshan honey instead of refined sugar and enriched with a touch of Anveshan wood-pressed coconut oil, giving a fibre-rich, omega-packed treat you can prep ahead.",
    "faqs": [
      {
        "question": "How long does chocolate chia pudding take to set?",
        "answer": "Just 10 minutes of mixing, then leave it overnight in the fridge so the chia seeds swell into a thick pudding, serving 4."
      },
      {
        "question": "Is chocolate chia pudding healthy?",
        "answer": "Yes, it is rich in fibre and omega-3s from chia seeds, sweetened naturally with Anveshan honey and free of refined sugar."
      },
      {
        "question": "Can I use honey instead of sugar in chia pudding?",
        "answer": "Absolutely, raw Anveshan wild forest honey sweetens the pudding beautifully and keeps it free of refined sugar."
      },
      {
        "question": "What can I top chia pudding with?",
        "answer": "Fresh fruit, chopped nuts and a little extra Anveshan honey make lovely toppings for added texture and flavour."
      }
    ],
    "tips": [
      "Whisk well after mixing and again after 10 minutes to stop the chia seeds clumping.",
      "Sweeten with raw Anveshan honey to taste, as cocoa intensity varies between brands.",
      "Stir in a teaspoon of Anveshan coconut oil for a silkier texture and subtle richness."
    ]
  },
  "corn-cutlet": {
    "description": "Crispy shallow-fried corn cutlets that get their golden crunch from Anveshan wood-pressed groundnut oil, with a hint of jaggery, for a healthier, flavour-rich tea-time snack.",
    "intro": "Corn cutlets are crisp, shallow-fried patties made from boiled sweet corn and mashed potato spiced with green chilli, ginger and chaat masala. Shallow-frying them in Anveshan wood-pressed groundnut oil gives a clean golden crunch, while a touch of Anveshan jaggery powder balances the spices, making a wholesome twist on the classic tea-time snack.",
    "faqs": [
      {
        "question": "How many corn cutlets does this recipe make?",
        "answer": "It serves 8, with about 20 minutes of prep and 15 minutes of shallow-frying."
      },
      {
        "question": "Can I air-fry or bake corn cutlets instead of frying?",
        "answer": "Yes, brush them with a little Anveshan groundnut oil and bake or air-fry until golden for an even lighter snack."
      },
      {
        "question": "Why use groundnut oil for corn cutlets?",
        "answer": "Anveshan wood-pressed groundnut oil gives a clean, crisp golden crust without a heavy, greasy taste."
      },
      {
        "question": "What do you serve with corn cutlets?",
        "answer": "They are best served hot with green chutney, tamarind chutney or ketchup alongside a cup of chai."
      }
    ],
    "tips": [
      "Keep the corn coarsely mashed for texture and add breadcrumbs to firm up the mixture so cutlets hold their shape.",
      "Shallow-fry in moderately hot Anveshan groundnut oil so the cutlets crisp up without absorbing excess oil.",
      "A small pinch of Anveshan jaggery powder balances the chilli and chaat masala beautifully."
    ]
  },
  "cozy-veggie-korma": {
    "description": "A comforting, mildly spiced veggie korma with its base bloomed in nutty Anveshan groundnut oil, finished with aromatic ghee and a drizzle of honey for gentle, rounded sweetness.",
    "intro": "Veggie korma is a mild, creamy curry of mixed vegetables simmered in a cashew-based onion-tomato gravy with warming spices. This cozy version blooms the base in nutty Anveshan groundnut oil, finishes with a spoon of aromatic Anveshan ghee, and adds a drizzle of raw Anveshan honey to round off the gravy with a gentle sweetness that balances the spice.",
    "faqs": [
      {
        "question": "How long does it take to make veggie korma?",
        "answer": "About 50 minutes: 20 minutes prep and 30 minutes cooking, serving 4."
      },
      {
        "question": "Can I use Anveshan ghee in korma?",
        "answer": "Yes, finishing the korma with a spoon of Anveshan ghee adds a rich aroma and a restaurant-style depth to the gravy."
      },
      {
        "question": "What vegetables work best in korma?",
        "answer": "Carrot, beans, peas, potato and cauliflower all work beautifully; use a colourful mix for the best texture and flavour."
      },
      {
        "question": "What do you serve with veggie korma?",
        "answer": "It pairs wonderfully with naan, roti, jeera rice or ghee rice for a comforting meal."
      }
    ],
    "tips": [
      "Bloom the spices and cashew paste in Anveshan groundnut oil so the gravy turns rich and smooth.",
      "Add a small drizzle of Anveshan honey at the end to balance the tomato's tang gently.",
      "Finish with a spoon of Anveshan ghee just before serving for a fragrant, glossy korma."
    ]
  },
  "crispy-cabbage-cauliflower-salad": {
    "description": "A crunchy slaw of shredded cabbage and golden roasted cauliflower in a nutty sesame dressing built on toasty Anveshan sesame oil, Anveshan olive oil and a drizzle of honey.",
    "intro": "This crispy cabbage and cauliflower salad is a fresh, crunchy slaw that tosses shredded cabbage and carrot with golden roasted cauliflower in a nutty Asian-style dressing. The cauliflower is roasted in fruity Anveshan olive oil, while the dressing leans on toasty Anveshan sesame oil and a drizzle of raw Anveshan honey to balance the soy and lime, making a wholesome salad with plenty of texture.",
    "faqs": [
      {
        "question": "How long does it take to make this salad?",
        "answer": "About 35 minutes: 15 minutes prep and 20 minutes to roast the cauliflower, serving 4."
      },
      {
        "question": "Why use sesame oil in the dressing?",
        "answer": "Toasty Anveshan sesame oil gives the dressing a deep, nutty aroma that defines this Asian-style slaw."
      },
      {
        "question": "Can I make this salad ahead of time?",
        "answer": "You can prep the vegetables and dressing separately and toss just before serving so the salad stays crisp."
      },
      {
        "question": "Is this cabbage and cauliflower salad healthy?",
        "answer": "Yes, it is packed with crunchy vegetables, roasted in Anveshan olive oil and dressed lightly with sesame oil and honey for a wholesome, fresh dish."
      }
    ],
    "tips": [
      "Roast the cauliflower in Anveshan olive oil until the edges are golden for the best flavour and texture.",
      "Whisk the dressing with Anveshan sesame oil and a drizzle of honey, tasting to balance the soy and lime.",
      "Add the roasted peanuts and coriander right before serving so they stay crunchy and fresh."
    ]
  },
  "crispy-veg-pakora": {
    "description": "Crispy veg pakora is a golden mixed-vegetable fritter deep-fried in light Anveshan sunflower oil for the ultimate crunchy rainy-day snack with masala chai.",
    "intro": "Crispy veg pakora is a classic Indian fritter where onion, potato and spinach are coated in spiced besan batter and deep-fried until golden and crunchy. The trick to grease-free pakoras is a neutral, high-smoke-point oil, and Anveshan wood-pressed sunflower oil keeps each fritter shatteringly crisp without turning heavy. A pinch of mineral-rich jaggery powder rounds off the batter, giving you tea-stall flavour you can feel good about at home.",
    "faqs": [
      {
        "question": "How many people does this veg pakora recipe serve?",
        "answer": "This recipe makes pakoras for 4 servings, with 15 minutes of prep and about 20 minutes of frying."
      },
      {
        "question": "Which oil is best for frying crispy pakoras?",
        "answer": "A light, neutral, high-smoke-point oil works best; this recipe uses Anveshan sunflower oil so the pakoras stay crisp and grease-free instead of soaking up oil."
      },
      {
        "question": "Why add jaggery powder to pakora batter?",
        "answer": "A spoon of Anveshan jaggery powder gently balances the spice and besan, deepening the flavour without making the pakoras sweet."
      },
      {
        "question": "How do I make sure my pakoras turn out crunchy and not soggy?",
        "answer": "Keep the besan batter thick, fry in hot oil in small batches, and drain well; the right oil temperature is what gives that crackly crust."
      }
    ],
    "tips": [
      "Keep the besan batter thick enough to coat the vegetables so the pakoras hold their shape and crisp up.",
      "Heat the sunflower oil fully before frying and add pakoras in small batches to keep the temperature steady.",
      "Add the ajwain and a pinch of salt right into the batter for even seasoning and easier digestion."
    ]
  },
  "dal-makhani": {
    "description": "Dal makhani recipe made with whole black urad dal and rajma slow-simmered into a creamy, smoky dal, finished with Anveshan bilona ghee instead of butter for restaurant-style richness at home.",
    "intro": "Dal makhani is a rich North Indian dal of whole black urad dal and rajma slow-simmered for over an hour until thick, creamy and smoky, then finished with cream and ghee. This version blooms its onion-tomato base in Anveshan wood-pressed groundnut oil and swaps heavy butter for a generous spoon of Anveshan bilona ghee, giving that signature dhaba-style depth with cleaner, farm-direct fats.",
    "faqs": [
      {
        "question": "How long does it take to make dal makhani?",
        "answer": "This recipe needs about 15 minutes of prep and 90 minutes of slow cooking, as the whole urad dal and rajma need long, gentle simmering to turn creamy. The patience is what gives it that authentic smoky depth."
      },
      {
        "question": "Why use ghee instead of butter in dal makhani?",
        "answer": "A spoon of Anveshan bilona ghee delivers the same luxurious mouthfeel as butter but with a nutty aroma and farm-direct purity. It finishes the dal with a glossy richness that ordinary butter cannot match."
      },
      {
        "question": "How many people does this dal makhani serve?",
        "answer": "This recipe serves 4 and pairs beautifully with naan, jeera rice or phulka. You can double the urad dal and rajma for a larger gathering."
      },
      {
        "question": "Can I make dal makhani without cream?",
        "answer": "Yes, you can reduce or skip the 4 tbsp fresh cream and rely on the slow-simmered dal plus a little extra Anveshan bilona ghee for body. The long cooking naturally makes it creamy."
      }
    ],
    "tips": [
      "Soak the urad dal and rajma overnight so they cook down to a silky, creamy texture.",
      "Finish with Anveshan bilona ghee right at the end so its aroma stays fresh and pronounced.",
      "Let the dal simmer on the lowest flame; the longer and slower it cooks, the smokier and richer it tastes."
    ]
  },
  "dal-tadka-buffalo-ghee": {
    "description": "Dal tadka with buffalo ghee recipe: creamy toor dal crowned with a sizzling cumin, garlic and red chilli tempering bloomed in rich Anveshan buffalo ghee for true dhaba-style depth.",
    "intro": "Dal tadka is a comforting yellow dal made from toor dal and finished with a sizzling tempering (tadka) of cumin, garlic and dried red chilli. Here the tadka is bloomed in rich Anveshan buffalo ghee instead of plain oil, with the dal first tempered in pungent Anveshan wood-pressed mustard oil. The richer buffalo ghee gives this dal a deep, dhaba-style aroma that ordinary refined oil simply cannot deliver.",
    "faqs": [
      {
        "question": "What dal is used for dal tadka?",
        "answer": "This recipe uses 1 cup toor dal (split pigeon pea), which cooks down soft and creamy. It serves 4 and is ready in about 40 minutes including prep."
      },
      {
        "question": "Why is buffalo ghee used for the tadka?",
        "answer": "Anveshan buffalo ghee is richer than cow ghee, so it carries the flavour of cumin, garlic and red chilli beautifully and gives the tadka a thick, dhaba-style finish. Just 3 tbsp transforms a simple dal."
      },
      {
        "question": "Can I use mustard oil instead of ghee in dal tadka?",
        "answer": "This recipe uses both — the dal is tempered in Anveshan wood-pressed mustard oil for a pungent base, while the final tadka uses buffalo ghee for richness. Together they give layered flavour."
      }
    ],
    "tips": [
      "Pour the buffalo ghee tadka over the hot dal at the very end so it sizzles and releases maximum aroma.",
      "Let the garlic and dried red chillies turn just golden in the ghee; burnt garlic makes the tadka bitter.",
      "A splash of Anveshan wood-pressed mustard oil in the base adds an earthy depth that sets this dal apart."
    ]
  },
  "date-nut-energy-bars": {
    "description": "No-bake date and nut energy bars recipe bound with Anveshan dry fruit paak and raw honey for clean, refined-sugar-free fuel packed with dates, nuts and seeds.",
    "intro": "Date and nut energy bars are chewy, no-bake snack bars made by blending dates, mixed nuts, oats and seeds, then pressing the mixture into slices — no oven needed. This version uses Anveshan dry fruit paak as a rich, nutty base and a drizzle of raw Anveshan honey to bind everything naturally, so you get clean, sustained energy with no refined sugar.",
    "faqs": [
      {
        "question": "Do energy bars need to be baked?",
        "answer": "No, these are completely no-bake; you simply blend and press the mixture, then chill it to set. Prep takes about 20 minutes with no cooking time."
      },
      {
        "question": "What binds these energy bars without sugar?",
        "answer": "Sticky pitted dates plus Anveshan dry fruit paak and a drizzle of raw Anveshan honey hold the bars together naturally. There is no refined sugar or syrup involved."
      },
      {
        "question": "How many energy bars does this recipe make?",
        "answer": "This recipe serves 4 and uses 1 cup dates, 1 cup mixed nuts, rolled oats and seeds. You can slice into smaller pieces for grab-and-go snacking."
      }
    ],
    "tips": [
      "Chill the pressed mixture for at least an hour so the bars hold their shape when sliced.",
      "Warm the Anveshan honey slightly so it drizzles easily and coats every nut and date.",
      "Press the mixture firmly into the tray so the bars stay compact and do not crumble."
    ]
  },
  "dry-fruit-energy-ladoo": {
    "description": "Dry fruit energy ladoo recipe: no-cook ladoos of almonds, cashews, walnuts and dates bound with Anveshan dry fruit paak and wild forest honey, completely free of refined sugar.",
    "intro": "Dry fruit energy ladoos are wholesome, no-cook sweet balls made by grinding almonds, cashews, walnuts and dates, then rolling them with a natural binder — no sugar or cooking required. Here Anveshan dry fruit paak adds rich nutty depth and a drizzle of Anveshan wild forest honey binds the mixture, making these a refined-sugar-free energy boost for any time of day.",
    "faqs": [
      {
        "question": "Are dry fruit ladoos made without sugar?",
        "answer": "Yes, these ladoos are completely free of refined sugar; their sweetness comes from seedless dates, Anveshan dry fruit paak and a tablespoon of Anveshan honey. They serve 4 and need just 20 minutes of prep."
      },
      {
        "question": "Which dry fruits go into these energy ladoos?",
        "answer": "This recipe uses almonds, cashews and walnuts along with seedless dates and desiccated coconut, finished with cardamom for aroma. Anveshan dry fruit paak ties the flavours together."
      },
      {
        "question": "How long do dry fruit ladoos stay fresh?",
        "answer": "Stored in an airtight container, these ladoos keep well for a couple of weeks thanks to the natural binding of dates, dry fruit paak and Anveshan honey. Keep them refrigerated in warm weather."
      }
    ],
    "tips": [
      "Pulse the nuts coarsely so the ladoos keep a satisfying crunch.",
      "If the mixture feels dry, add a little more Anveshan honey to help the ladoos bind.",
      "Roll the ladoos in desiccated coconut for a pretty finish and extra texture."
    ]
  },
  "elegant-baked-potatoes": {
    "description": "Elegant baked potatoes recipe: crisp-skinned, fluffy russets rubbed with Anveshan olive oil and finished with melting Anveshan ghee instead of butter, loaded with cheese, sour cream and chives.",
    "intro": "Elegant baked potatoes are whole russet potatoes rubbed with oil and salt, then baked until the skin is crisp and the inside turns fluffy, before being loaded with toppings. This version rubs the potatoes in fruity Anveshan olive oil and finishes them with a melting spoon of nutty Anveshan ghee in place of butter, then piles on cheddar, sour cream and chives for a restaurant-style side at home.",
    "faqs": [
      {
        "question": "How long do baked potatoes take in the oven?",
        "answer": "These potatoes bake for about 60 minutes after 10 minutes of prep, until the skin is crisp and a knife slides easily through the centre. Larger potatoes may need a few extra minutes."
      },
      {
        "question": "Why use ghee instead of butter on baked potatoes?",
        "answer": "A melting spoon of Anveshan ghee gives the same luxurious richness as butter but with a nutty aroma and farm-direct purity. It soaks into the fluffy potato beautifully."
      },
      {
        "question": "How do you get crispy skin on baked potatoes?",
        "answer": "Rub the potatoes all over with Anveshan olive oil and sea salt before baking; the oil crisps the skin while the salt draws out moisture. Avoid wrapping them in foil, which steams the skin soft."
      }
    ],
    "tips": [
      "Prick the potatoes a few times before baking so steam escapes and they cook evenly.",
      "Rub generously with Anveshan olive oil and sea salt for the crispiest skin.",
      "Split them open and drop in Anveshan ghee while hot so it melts straight into the fluffy centre."
    ]
  },
  "foxtail-millet-pulao": {
    "description": "Foxtail millet pulao recipe: a light one-pot pulao swapping rice for fibre-rich foxtail millet, sauteed in Anveshan groundnut oil and ghee with a festive touch of Anveshan saffron.",
    "intro": "Foxtail millet pulao is a light, modern one-pot dish that replaces white rice with fibre-rich foxtail millet, sauteed with whole spices and mixed vegetables, then cooked till fluffy. The base is sauteed in heart-friendly Anveshan groundnut oil and finished with aromatic Anveshan ghee, while a few strands of Anveshan saffron lend a festive golden hue and gentle fragrance.",
    "faqs": [
      {
        "question": "Is foxtail millet healthier than rice in pulao?",
        "answer": "Foxtail millet is naturally rich in fibre, making this pulao a wholesome alternative to white-rice versions. Sauteing it in Anveshan groundnut oil keeps the dish light and heart-friendly."
      },
      {
        "question": "How long does foxtail millet pulao take to cook?",
        "answer": "This recipe takes about 15 minutes of prep and 25 minutes of cooking, serving 4. The millet cooks much like rice once the base is sauteed."
      },
      {
        "question": "What gives the pulao its golden colour?",
        "answer": "A pinch of Anveshan saffron infuses the pulao with a festive golden hue and delicate aroma. A spoon of Anveshan ghee added at the finish deepens the fragrance."
      }
    ],
    "tips": [
      "Rinse and lightly soak the foxtail millet so it cooks up fluffy and separate, not mushy.",
      "Bloom the saffron in a spoon of warm milk or water before adding for the richest colour.",
      "Stir in the Anveshan ghee at the end so the pulao smells aromatic and stays glossy."
    ]
  },
  "gajar-ka-halwa": {
    "description": "Gajar ka halwa recipe: grated red carrots slow-cooked in milk until luscious, finished with aromatic Anveshan bilona ghee and sweetened with unrefined Anveshan khandsari instead of sugar.",
    "intro": "Gajar ka halwa is the classic Indian winter dessert of grated red carrots slow-cooked in full-fat milk until thick and luscious, then enriched with ghee, khoya and nuts. This version finishes the halwa with aromatic Anveshan bilona ghee and sweetens it with unrefined Anveshan khandsari instead of refined sugar, giving a clean, mineral-rich sweetness and a deeply fragrant, melt-in-the-mouth texture.",
    "faqs": [
      {
        "question": "How long does it take to make gajar ka halwa?",
        "answer": "This recipe needs about 20 minutes of prep and 40 minutes of slow cooking, serving 4. The carrots must simmer patiently in milk until thick and glossy."
      },
      {
        "question": "Can I make gajar ka halwa without refined sugar?",
        "answer": "Yes, this recipe uses unrefined Anveshan khandsari instead of white sugar, which gives a warm, clean sweetness. The natural sweetness of the carrots does much of the work too."
      },
      {
        "question": "Why add ghee to gajar ka halwa?",
        "answer": "Anveshan bilona ghee roasts the carrots and khoya to a rich, aromatic finish and stops the halwa from sticking. Its nutty depth is what gives this dessert its festive character."
      }
    ],
    "tips": [
      "Use red Delhi carrots in winter for the sweetest, most vibrant halwa.",
      "Cook on a low flame and stir often so the milk reduces without scorching.",
      "Roast the carrots well in Anveshan bilona ghee before adding milk for the deepest flavour."
    ]
  },
  "ghee-bulletproof-coffee": {
    "description": "Ghee bulletproof coffee recipe: black coffee blended with Anveshan bilona ghee and coconut oil for a frothy, creamer-free brew that delivers smooth, sustained energy and focus.",
    "intro": "Bulletproof coffee is hot black coffee blended with healthy fats instead of milk or creamer, creating a frothy, latte-like cup that fuels steady energy. This single-serve version uses Anveshan bilona ghee for velvety body and Anveshan cold-pressed coconut oil for clean MCT fuel, with a touch of cinnamon and vanilla. Blended till foamy, it is a satisfying, low-carb way to start the day.",
    "faqs": [
      {
        "question": "What is bulletproof coffee made of?",
        "answer": "It is brewed black coffee blended with healthy fats — here 1 tbsp Anveshan bilona ghee and 1 tbsp Anveshan coconut oil — plus cinnamon and vanilla. This recipe makes a single serving in about 10 minutes."
      },
      {
        "question": "Why add ghee and coconut oil to coffee?",
        "answer": "Anveshan bilona ghee lends a velvety, creamy body while Anveshan coconut oil adds clean MCT fuel for focus and sustained energy. Together they replace milk or creamer."
      },
      {
        "question": "Do I have to blend bulletproof coffee?",
        "answer": "Yes, blending is essential; it emulsifies the ghee and coconut oil into the coffee so you get a smooth, frothy cup rather than oil floating on top."
      }
    ],
    "tips": [
      "Blend for 20-30 seconds until properly frothy so the fats emulsify fully.",
      "Start with hot, freshly brewed coffee so the Anveshan ghee melts and blends smoothly.",
      "A pinch of cinnamon adds warmth and balances the richness of the coconut oil."
    ]
  },
  "ghee-rice": {
    "description": "Ghee rice recipe: fragrant basmati cooked in pure Anveshan bilona ghee with whole spices and a pinch of saffron — minimal ingredients, maximum aroma, ready in about 35 minutes.",
    "intro": "Ghee rice is fragrant basmati rice cooked in pure ghee with whole spices like bay leaf, clove, cardamom and cinnamon, plus golden fried onions. Made with Anveshan bilona ghee and a pinch of Anveshan saffron, this simple one-pot dish turns rich and aromatic with very few ingredients — the quality of the ghee is the only swap needed to make it taste restaurant-special.",
    "faqs": [
      {
        "question": "What makes ghee rice flavourful with so few ingredients?",
        "answer": "Pure Anveshan bilona ghee and whole spices do all the work — the ghee carries the aroma of cardamom, clove and cinnamon through every grain. A pinch of Anveshan saffron adds colour and fragrance."
      },
      {
        "question": "How much ghee do I need for ghee rice?",
        "answer": "This recipe uses 3 tbsp Anveshan ghee for 2 cups basmati rice, serving 4. The ghee coats the grains and keeps them separate and glossy."
      },
      {
        "question": "How long does ghee rice take to make?",
        "answer": "It takes about 10 minutes of prep and 25 minutes of cooking. Resting the rice for a few minutes after cooking keeps the grains fluffy."
      }
    ],
    "tips": [
      "Rinse and soak the basmati for 20 minutes so the grains cook up long and separate.",
      "Fry the spices in Anveshan ghee until fragrant before adding rice to build deep flavour.",
      "Fluff with a fork rather than a spoon to keep the grains intact and non-sticky."
    ]
  },
  "ghee-roast-masala-dosa": {
    "description": "Ghee roast masala dosa recipe: a crisp golden dosa roasted in nutty Anveshan bilona cow ghee and stuffed with spiced potato masala for that restaurant-style crackle at home.",
    "intro": "Ghee roast masala dosa is a crisp, golden South Indian crepe roasted in ghee and filled with a comforting spiced potato masala. Swapping refined oil for hand-churned Anveshan bilona cow ghee gives the dosa its restaurant-style crackle and rich aroma, while the masala is tempered in Anveshan wood-pressed groundnut oil with mustard seeds and curry leaves for an authentic finish.",
    "faqs": [
      {
        "question": "What makes a dosa a ghee roast dosa?",
        "answer": "A ghee roast dosa is cooked with generous ghee on the tawa instead of oil, giving it a deeper colour, extra crispness and a buttery aroma. This recipe uses 4 tbsp Anveshan bilona cow ghee for that crackle."
      },
      {
        "question": "How long does ghee roast masala dosa take?",
        "answer": "With ready dosa batter, this recipe takes about 20 minutes of prep and 25 minutes of cooking, serving 4. Most of the time goes into making the potato masala."
      },
      {
        "question": "Why use ghee instead of oil for masala dosa?",
        "answer": "Anveshan bilona cow ghee crisps the dosa beautifully and adds a nutty, restaurant-style aroma that refined oil cannot match. It is what gives ghee roast dosas their signature golden crackle."
      }
    ],
    "tips": [
      "Spread the batter thin and even for the crispest ghee roast dosa.",
      "Drizzle Anveshan bilona ghee around the edges as it roasts for an extra-crisp, golden finish.",
      "Keep the tawa on medium-high heat so the dosa crackles rather than turning soft."
    ]
  },
  "ghee-roasted-makhana": {
    "description": "Ghee roasted makhana recipe: fox nuts slow-roasted in Anveshan bilona cow ghee until shatteringly crisp, tossed with warm spices for a guilt-free, buttery snack ready in 20 minutes.",
    "intro": "Ghee roasted makhana is a light, crunchy snack of phool makhana (fox nuts) slow-roasted in ghee until impossibly crisp, then tossed with warm spices. Roasting in Anveshan bilona cow ghee instead of oil makes these fox nuts shatteringly light with a buttery finish, while a pinch of Anveshan jaggery powder balances the chaat masala and chilli for a moreish sweet-savoury bite.",
    "faqs": [
      {
        "question": "How do you make makhana crispy?",
        "answer": "Slow-roast the fox nuts in Anveshan bilona cow ghee on low-medium heat until they feel light and crunchy, about 15 minutes. Patience and low heat are the secret to a shattering crisp."
      },
      {
        "question": "Is ghee roasted makhana a healthy snack?",
        "answer": "Yes, it is a light, guilt-free snack since the makhana is roasted in Anveshan bilona cow ghee rather than deep-fried in oil. It serves 4 and uses just 2 tbsp ghee for 3 cups of fox nuts."
      },
      {
        "question": "What spices go into roasted makhana?",
        "answer": "This recipe uses turmeric, red chilli, black pepper and chaat masala, with a pinch of Anveshan jaggery powder to balance the heat. You can adjust the chilli to taste."
      }
    ],
    "tips": [
      "Roast on low-medium heat and stir constantly so the makhana crisps evenly without burning.",
      "Test for doneness by snapping a fox nut; it should break cleanly when fully roasted.",
      "Toss the spices in while the makhana is hot so they cling to the ghee-coated fox nuts."
    ]
  },
  "golden-turmeric-latte": {
    "description": "Golden turmeric latte recipe: a soothing anti-inflammatory golden milk made with Anveshan turmeric latte mix and sweetened with raw Anveshan wild forest honey instead of sugar.",
    "intro": "A golden turmeric latte, or golden milk, is warm milk infused with turmeric and warming spices for a soothing, anti-inflammatory drink. This easy version uses Anveshan turmeric latte mix with a cinnamon stick and a pinch of crushed black pepper to boost absorption, sweetened with raw Anveshan wild forest honey instead of sugar — creamy, fragrant and perfect for winding down before bed.",
    "faqs": [
      {
        "question": "What is a golden turmeric latte good for?",
        "answer": "Golden milk is a soothing, anti-inflammatory drink traditionally enjoyed to relax and wind down. This version uses Anveshan turmeric latte mix and a pinch of black pepper, which helps the body absorb turmeric better."
      },
      {
        "question": "How do you sweeten a turmeric latte naturally?",
        "answer": "This recipe uses raw Anveshan wild forest honey instead of refined sugar, adding gentle sweetness and floral aroma. Stir it in once the milk has cooled slightly to keep the honey raw."
      },
      {
        "question": "How long does a golden turmeric latte take to make?",
        "answer": "It takes about 5 minutes of prep and 5 minutes of cooking, serving 4. You can use dairy or plant milk depending on your preference."
      }
    ],
    "tips": [
      "Add a pinch of crushed black pepper; it helps your body absorb the turmeric far better.",
      "Stir in the Anveshan honey after the milk cools slightly so its natural goodness stays intact.",
      "Simmer with a cinnamon stick for a few minutes to deepen the warming, fragrant flavour."
    ]
  },
  "hamburger-buns": {
    "description": "Soft multigrain hamburger buns recipe: pillowy sesame-topped buns made wholesome with Anveshan multigrain atta, enriched with Anveshan olive oil and lightly sweetened with raw Anveshan honey.",
    "intro": "Soft multigrain hamburger buns are homemade yeast-risen buns made wholesome with fibre-rich flour, perfect for burgers and sandwiches. This recipe uses Anveshan multigrain atta for a hearty crumb, enriches the dough with Anveshan olive oil for softness, and sweetens it with raw Anveshan honey to feed the yeast naturally — finished with a sesame-seed top for that classic bakery look.",
    "faqs": [
      {
        "question": "Can you make hamburger buns with multigrain atta?",
        "answer": "Yes, Anveshan multigrain atta makes soft, pillowy buns with a wholesome, fibre-rich crumb. The dough is enriched with Anveshan olive oil and milk to keep it tender despite the heartier flour."
      },
      {
        "question": "How long do these hamburger buns take to make?",
        "answer": "This recipe needs about 2 hours of prep, mostly hands-off proving time, and 18 minutes of baking. It makes 8 buns."
      },
      {
        "question": "Why add honey to hamburger bun dough?",
        "answer": "Raw Anveshan honey lightly sweetens the buns and feeds the yeast, helping the dough rise soft and airy. It also gives the baked buns a lovely golden colour."
      }
    ],
    "tips": [
      "Let the dough prove until doubled in a warm spot for the softest, fluffiest buns.",
      "Brush the tops with milk or egg wash before adding sesame seeds so they stick and turn golden.",
      "Knead well so the Anveshan multigrain atta develops enough gluten for a light, pillowy crumb."
    ]
  },
  "hara-bhara-kebab": {
    "description": "Hara bhara kebab are vibrant green spinach, peas and potato patties pan-fried in nutty Anveshan groundnut oil for a crisp, healthy starter boosted with moringa.",
    "intro": "Hara bhara kebab are soft green patties made by mashing blanched spinach, green peas and boiled potato with ginger, green chilli and garam masala, then binding with roasted besan and shallow-frying until golden. This version stays light because the kebabs are pan-fried in wood-pressed groundnut oil rather than deep-fried, and a spoon of Anveshan moringa powder adds plant iron and antioxidants to an already wholesome vegetarian snack.",
    "faqs": [
      {
        "question": "How do I stop hara bhara kebab from breaking while frying?",
        "answer": "Squeeze out all moisture from the spinach and peas, and use 3 tbsp roasted gram flour (besan) to bind the mix firmly. Chilling the patties before frying in Anveshan groundnut oil also helps them hold shape."
      },
      {
        "question": "What does moringa powder add to these kebabs?",
        "answer": "Just 2 tsp of Anveshan moringa powder folds into the green mix without changing the taste much, while adding plant iron, vitamins and antioxidants to the patties."
      },
      {
        "question": "How many hara bhara kebabs does this recipe make?",
        "answer": "This recipe serves 4, with about 15 minutes of cooking time after a 20-minute prep, so you can plate them up as a starter for a small gathering."
      },
      {
        "question": "Can I air-fry instead of pan-frying these kebabs?",
        "answer": "Yes, brush the patties lightly with Anveshan groundnut oil and air-fry until golden, though shallow-frying in groundnut oil gives the crispest crust."
      }
    ],
    "tips": [
      "Blanch the spinach briefly and squeeze it dry so the kebabs are not watery.",
      "Roast the besan before adding it to remove the raw smell and bind better.",
      "Shallow-fry on medium heat in Anveshan groundnut oil for an even golden crust without burning the green colour."
    ]
  },
  "homemade-pizza-sauce": {
    "description": "This homemade pizza sauce simmers blended tomatoes with garlic and oregano in fruity Anveshan olive oil, balanced with a touch of honey for a rich, fresh spread far better than jarred.",
    "intro": "Homemade pizza sauce is a quick simmered tomato base made by cooking passata or blended tomatoes with garlic, oregano and basil until thick and glossy. You make it by blooming minced garlic in fruity Anveshan olive oil, adding the tomatoes and herbs, then rounding off the natural acidity with a touch of raw Anveshan honey instead of sugar. It is fresher, herbier and far better than any jarred sauce, and this batch serves 6.",
    "faqs": [
      {
        "question": "Why add honey to pizza sauce?",
        "answer": "Just 1 tsp of raw Anveshan honey balances the natural acidity of the tomatoes, giving a rounder, mellower sauce without making it sweet."
      },
      {
        "question": "How long does homemade pizza sauce take to make?",
        "answer": "About 10 minutes of prep and 20 minutes of simmering, yielding enough sauce for around 6 servings of pizza."
      },
      {
        "question": "Can I store this pizza sauce?",
        "answer": "Yes, cool it fully and refrigerate in a clean jar for up to a week; the Anveshan olive oil on top helps keep it fresh."
      },
      {
        "question": "Which oil is best for pizza sauce?",
        "answer": "Fruity cold-pressed Anveshan olive oil is ideal as it carries the garlic and oregano flavour beautifully and keeps the sauce heart-friendly."
      }
    ],
    "tips": [
      "Bloom the garlic gently in Anveshan olive oil so it turns fragrant but never bitter.",
      "Simmer uncovered until the sauce thickens so it does not make the pizza base soggy.",
      "Stir in fresh basil only at the end to keep its aroma bright."
    ]
  },
  "honey-chilli-paneer": {
    "description": "Honey chilli paneer is crispy paneer tossed in a sticky sweet-spicy sauce made with raw Anveshan wild forest honey and wood-pressed groundnut oil, better than any restaurant version.",
    "intro": "Honey chilli paneer is an Indo-Chinese starter of cornflour-coated paneer cubes fried crisp, then tossed in a glossy sauce of soy, chilli, garlic and honey. You make it by frying the paneer in Anveshan groundnut oil, then stir-frying capsicum, onion and spring onion before glazing everything with raw Anveshan wild forest honey and chilli sauce. The wild forest honey gives a clean natural sweetness that beats refined sugar, and this dish serves 4.",
    "faqs": [
      {
        "question": "How do I keep honey chilli paneer crispy?",
        "answer": "Coat the paneer well in cornflour, fry in hot Anveshan groundnut oil until golden, and toss in the sauce on high heat just before serving so it stays crisp."
      },
      {
        "question": "What makes the sauce sweet without sugar?",
        "answer": "2 tbsp of raw Anveshan wild forest honey gives the sticky sweet-spicy glaze its natural sweetness, replacing refined sugar entirely."
      },
      {
        "question": "How many people does this honey chilli paneer serve?",
        "answer": "It serves 4 and takes about 15 minutes of prep plus 20 minutes of cooking, making it a quick starter or party snack."
      },
      {
        "question": "Can I make it less spicy?",
        "answer": "Yes, reduce the red chilli sauce and add a little extra Anveshan honey to balance the heat to your taste."
      }
    ],
    "tips": [
      "Fry the paneer in batches in Anveshan groundnut oil so it crisps rather than steams.",
      "Keep the heat high while tossing so the honey glaze turns sticky, not watery.",
      "Add spring onion greens last for a fresh, restaurant-style finish."
    ]
  },
  "honey-lemon-shikanji": {
    "description": "Honey lemon shikanji is a reviving North Indian lemonade spiked with roasted cumin and black salt, sweetened with raw Anveshan wild forest honey instead of refined sugar.",
    "intro": "Honey lemon shikanji is a classic Indian summer lemonade made by stirring fresh lemon juice, roasted cumin and black salt into chilled water for a spicy-tangy cooler. You sweeten it naturally with raw Anveshan wild forest honey and a touch of unrefined Anveshan khandsari instead of refined sugar, then finish with mint and ice. It is far more refreshing than bottled soft drinks, and this jug serves 4.",
    "faqs": [
      {
        "question": "Why use honey instead of sugar in shikanji?",
        "answer": "4 tbsp of raw Anveshan wild forest honey sweetens the shikanji naturally and dissolves easily in chilled water, making a cleaner cooler than refined sugar."
      },
      {
        "question": "What gives shikanji its signature spicy-tangy taste?",
        "answer": "Roasted cumin powder and black salt (kala namak) give that classic kick, balanced by lemon juice and the natural sweetness of Anveshan honey."
      },
      {
        "question": "How many glasses does this shikanji make?",
        "answer": "It serves 4 and comes together in about 10 minutes with no cooking, perfect for a quick summer refresher."
      },
      {
        "question": "Can I make shikanji ahead of time?",
        "answer": "Mix the lemon, spices and Anveshan honey concentrate ahead, then add chilled water, mint and ice just before serving so it stays fizzy-fresh."
      }
    ],
    "tips": [
      "Use freshly roasted and ground cumin for the most aromatic shikanji.",
      "Stir the Anveshan honey into a little warm water first so it dissolves evenly.",
      "Crush the mint leaves lightly to release their oils before adding."
    ]
  },
  "italian-herb-bread": {
    "description": "Italian herb bread is a soft, aromatic loaf made wholesome with fibre-packed Anveshan multigrain atta, perfumed with rosemary, oregano and garlic, and enriched with fruity Anveshan olive oil.",
    "intro": "Italian herb bread is a soft, golden yeasted loaf flavoured with rosemary, oregano and garlic that you make by kneading flour, yeast and water into a dough, proving it, then baking until risen and fragrant. This wholesome version swaps refined maida for fibre-rich Anveshan multigrain atta and uses a generous pour of cold-pressed Anveshan olive oil to give a bakery-style soft crumb and a glossy crust. It serves 4 and fills the kitchen with herby aroma.",
    "faqs": [
      {
        "question": "Can I make herb bread with multigrain atta?",
        "answer": "Yes, this loaf uses 3.5 cups of Anveshan multigrain atta for a fibre-rich crumb; you may need slightly more water as multigrain flour absorbs more than maida."
      },
      {
        "question": "How long does Italian herb bread take?",
        "answer": "Around 75 minutes of prep including proving, plus 35 minutes of baking, so set aside roughly two hours start to finish for 4 servings."
      },
      {
        "question": "What does olive oil do in this bread?",
        "answer": "4 tbsp of Anveshan olive oil keeps the multigrain crumb soft and moist while adding a fruity flavour and golden sheen to the crust."
      },
      {
        "question": "How do I know the dough has proved enough?",
        "answer": "It should roughly double in size and spring back slowly when poked; a warm spot speeds up proving."
      }
    ],
    "tips": [
      "Use lukewarm, not hot, water so the yeast activates without dying.",
      "Brush the top with Anveshan olive oil before baking for a glossy, golden crust.",
      "Add the dried herbs and garlic into the dough for flavour throughout, not just on top."
    ]
  },
  "jaggery-rice-kheer": {
    "description": "Jaggery rice kheer is a creamy slow-simmered rice pudding sweetened with mineral-rich Anveshan jaggery powder instead of sugar, fragrant with cardamom, saffron and nuts.",
    "intro": "Jaggery rice kheer is a traditional Indian rice pudding made by slow-simmering basmati rice in full-fat milk until thick and creamy, then sweetening it with jaggery off the heat. You toast the rice in a spoon of Anveshan ghee, simmer with Anveshan saffron, and finish with mineral-rich Anveshan jaggery powder for a warm caramel depth that refined sugar cannot match. Crowned with cardamom and nuts, this festive dessert serves 4.",
    "faqs": [
      {
        "question": "Why does jaggery kheer curdle and how do I prevent it?",
        "answer": "Adding jaggery to hot milk can split it, so cool the kheer slightly and stir in the Anveshan jaggery powder off the heat once the rice is fully cooked."
      },
      {
        "question": "How much jaggery powder is needed for this kheer?",
        "answer": "This recipe uses 0.75 cup of Anveshan jaggery powder for 1.5 litres of milk, giving a rich caramel sweetness without refined sugar."
      },
      {
        "question": "How long does jaggery rice kheer take to cook?",
        "answer": "About 10 minutes of prep and 45 minutes of slow simmering, yielding 4 generous servings of creamy kheer."
      },
      {
        "question": "Why add ghee to rice kheer?",
        "answer": "Toasting the rice in 1 tbsp of Anveshan ghee deepens the aroma and helps the grains hold their shape in the creamy milk."
      }
    ],
    "tips": [
      "Simmer on low and stir often so the milk reduces evenly without scorching.",
      "Soak Anveshan saffron in a spoon of warm milk first to release its full colour and aroma.",
      "Always add Anveshan jaggery powder off the heat to keep the milk from curdling."
    ]
  },
  "jaggery-saffron-milk": {
    "description": "Jaggery saffron milk is a comforting festive kesar doodh of slow-simmered milk sweetened with mineral-rich Anveshan jaggery powder and gilded with threads of Anveshan saffron.",
    "intro": "Jaggery saffron milk, or kesar doodh, is a warm spiced milk made by simmering full-fat milk with saffron and cardamom, then sweetening it with jaggery once off the boil. You infuse the milk with strands of Anveshan saffron for a golden hue and stir in mineral-rich Anveshan jaggery powder instead of refined sugar for a gentle caramel warmth. Topped with chopped almonds and pistachios, this fragrant nightcap serves 4.",
    "faqs": [
      {
        "question": "How do I stop the milk from curdling when adding jaggery?",
        "answer": "Take the milk off the heat and let it cool slightly before stirring in the Anveshan jaggery powder, as adding it to boiling milk can cause splitting."
      },
      {
        "question": "How much jaggery does this saffron milk need?",
        "answer": "It uses 5 tbsp of Anveshan jaggery powder for 1 litre of full-fat milk, giving a naturally sweet, caramel-rich kesar doodh for 4."
      },
      {
        "question": "What does saffron add to the milk?",
        "answer": "A pinch of Anveshan saffron lends the milk its signature golden colour and a delicate floral aroma that pairs beautifully with cardamom."
      },
      {
        "question": "Can I drink jaggery saffron milk warm or cold?",
        "answer": "Both work, but it is most comforting served warm as a bedtime nightcap; you can also chill it for a festive treat."
      }
    ],
    "tips": [
      "Soak Anveshan saffron strands in a little warm milk to draw out maximum colour.",
      "Simmer the milk gently so it thickens and turns creamy before sweetening.",
      "Stir in Anveshan jaggery powder only after the milk has cooled a little to avoid curdling."
    ]
  },
  "jaljeera": {
    "description": "Jaljeera is a zesty Indian cumin cooler bursting with mint, tamarind and tangy spices, rounded off with unrefined Anveshan khandsari and a touch of jaggery instead of refined sugar.",
    "intro": "Jaljeera is a classic spiced Indian appetiser drink made by blending fresh mint and coriander with roasted cumin, tamarind pulp and black salt, then mixing into chilled water. You sweeten and balance the tang with unrefined Anveshan khandsari and a spoon of Anveshan jaggery powder instead of refined sugar. Cooling, digestive and bursting with flavour, this no-cook jaljeera serves 4.",
    "faqs": [
      {
        "question": "What is jaljeera made of?",
        "answer": "Jaljeera blends fresh mint, coriander, roasted cumin, tamarind pulp and black salt with chilled water, balanced with Anveshan khandsari and a little jaggery powder."
      },
      {
        "question": "Is jaljeera good before a meal?",
        "answer": "Yes, the roasted cumin and black salt make it a traditional digestive appetiser, while Anveshan khandsari keeps it free of refined sugar."
      },
      {
        "question": "How long does jaljeera take to make?",
        "answer": "Just about 15 minutes of prep with no cooking, making 4 refreshing glasses of spiced cumin cooler."
      },
      {
        "question": "Can I make jaljeera concentrate ahead?",
        "answer": "Yes, blend the mint, spices, tamarind and Anveshan khandsari into a paste and refrigerate, then mix with chilled water and boondi when ready to serve."
      }
    ],
    "tips": [
      "Use freshly roasted and ground cumin for the most authentic jaljeera flavour.",
      "Strain the mint-coriander blend for a smoother drink if you prefer.",
      "Add the optional boondi just before serving so it stays slightly crunchy."
    ]
  },
  "kanda-poha": {
    "description": "Kanda poha is a light, fluffy Maharashtrian breakfast of flattened rice tempered with onions, mustard seeds and curry leaves in wholesome Anveshan groundnut oil, finished with lemon.",
    "intro": "Kanda poha is a quick Maharashtrian breakfast made by tempering soaked flattened rice (poha) with onions, mustard seeds, green chillies and curry leaves until fluffy. You bloom the tempering in nutty Anveshan groundnut oil with a touch of Anveshan ghee, then fold in turmeric, roasted peanuts and a squeeze of lemon. Light, savoury and ready in under half an hour, this comforting breakfast serves 4.",
    "faqs": [
      {
        "question": "How do I keep poha from turning mushy?",
        "answer": "Use thick poha, rinse it gently in a colander, and let it soften only with the steam in the pan; tempering in Anveshan groundnut oil keeps the grains separate and fluffy."
      },
      {
        "question": "Which oil is best for kanda poha?",
        "answer": "Wood-pressed Anveshan groundnut oil gives a clean, nutty base, and a teaspoon of Anveshan ghee added to the tempering deepens the aroma."
      },
      {
        "question": "How long does kanda poha take?",
        "answer": "About 10 minutes of prep and 15 minutes of cooking, making a warm breakfast for 4."
      },
      {
        "question": "Can I add vegetables to kanda poha?",
        "answer": "Yes, boiled potato or green peas fold in easily; just saute them in the Anveshan groundnut oil tempering before adding the poha."
      }
    ],
    "tips": [
      "Rinse thick poha briefly and drain well so it softens without going soggy.",
      "Temper mustard seeds in Anveshan groundnut oil until they crackle before adding onions.",
      "Add lemon juice off the heat to keep its fresh tang bright."
    ]
  },
  "kesar-badam-milk": {
    "description": "Kesar badam milk is a rich golden almond milk infused with pure Anveshan saffron and warming cardamom, sweetened with unrefined Anveshan khandsari instead of refined sugar.",
    "intro": "Kesar badam milk is a luxurious Indian almond-saffron milk made by blending soaked peeled almonds into warm milk and simmering it with saffron and cardamom. You infuse it with fragrant strands of Anveshan saffron for a golden hue and sweeten naturally with unrefined Anveshan khandsari instead of refined sugar. Creamy, nourishing and topped with pistachios, this festive drink serves 4.",
    "faqs": [
      {
        "question": "How do I make kesar badam milk creamy?",
        "answer": "Soak and peel 20 almonds, grind them into a smooth paste, and simmer into the milk; this gives a naturally thick, creamy texture without cornflour."
      },
      {
        "question": "How much khandsari sweetens this almond milk?",
        "answer": "It uses 4 tbsp of unrefined Anveshan khandsari for 4 cups of milk, giving a clean sweetness that lets the saffron and almond flavours shine."
      },
      {
        "question": "What does saffron add to kesar badam milk?",
        "answer": "A pinch of Anveshan saffron gives the milk its signature golden colour and a delicate aroma that pairs with cardamom."
      },
      {
        "question": "Can I serve kesar badam milk cold?",
        "answer": "Yes, chill it well and serve over ice in summer, or enjoy it warm in winter; it serves 4 either way."
      }
    ],
    "tips": [
      "Soak almonds overnight so the skins slip off easily for a smoother milk.",
      "Bloom Anveshan saffron in a spoon of warm milk to release its full colour.",
      "Simmer gently after adding the almond paste so the milk thickens without sticking."
    ]
  },
  "kesar-phirni": {
    "description": "Kesar phirni is a classic creamy ground-rice pudding infused with premium Anveshan saffron and delicately sweetened with unrefined Anveshan khandsari, chilled and topped with nuts.",
    "intro": "Kesar phirni is a chilled North Indian dessert made by simmering coarsely ground basmati rice in full-fat milk until thick and creamy, then setting it in small bowls. You perfume it with premium Anveshan saffron and sweeten gently with unrefined Anveshan khandsari instead of refined sugar, finishing with cardamom and chopped nuts. Smooth, fragrant and best served cold, this festive phirni serves 4.",
    "faqs": [
      {
        "question": "What is the difference between phirni and kheer?",
        "answer": "Phirni is made with coarsely ground rice and set chilled in bowls for a smooth, thick texture, while kheer uses whole rice grains; this kesar phirni gets its colour from Anveshan saffron."
      },
      {
        "question": "How much khandsari does kesar phirni need?",
        "answer": "It uses 0.5 cup of unrefined Anveshan khandsari for 4 cups of milk, giving a clean, delicate sweetness that highlights the saffron."
      },
      {
        "question": "How long does kesar phirni take?",
        "answer": "About 15 minutes of prep and 25 minutes of cooking, plus chilling time, to serve 4."
      },
      {
        "question": "Why grind the rice for phirni?",
        "answer": "Coarsely ground basmati rice gives phirni its characteristic smooth, slightly grainy body as it thickens in the milk."
      }
    ],
    "tips": [
      "Soak and coarsely grind the rice so the phirni thickens evenly without lumps.",
      "Bloom Anveshan saffron in warm milk for the best colour and aroma.",
      "Stir constantly on low heat to prevent the milk from sticking or catching."
    ]
  },
  "khapli-atta-banana-pancakes": {
    "description": "Khapli atta banana pancakes are fluffy, naturally sweet pancakes made with nutty Anveshan khapli atta and drizzled with raw Anveshan wild forest honey instead of refined syrup.",
    "intro": "Khapli atta banana pancakes are wholesome breakfast pancakes made by whisking mashed ripe bananas, milk and egg into nutty Anveshan khapli atta, then cooking on a hot griddle until golden and fluffy. The ancient emmer-grain khapli atta is lower in gluten and gentler on digestion, while a drizzle of raw Anveshan wild forest honey replaces refined syrup. Lightly spiced with cinnamon, this guilt-free weekend breakfast serves 4.",
    "faqs": [
      {
        "question": "Can I make banana pancakes with khapli atta?",
        "answer": "Yes, 1.5 cups of Anveshan khapli atta makes fluffy, nutty pancakes; the ripe bananas add natural sweetness and moisture to the batter."
      },
      {
        "question": "Are khapli atta pancakes healthier than regular pancakes?",
        "answer": "Khapli atta is an ancient emmer wheat lower in gluten and richer in fibre than refined flour, and topping with Anveshan honey avoids refined syrup."
      },
      {
        "question": "How can I make these pancakes eggless?",
        "answer": "Swap the egg for 1 tbsp of flax meal mixed with water; the mashed banana and Anveshan khapli atta still bind the batter well."
      },
      {
        "question": "How many pancakes does this recipe make?",
        "answer": "It serves 4 and takes about 10 minutes of prep with 15 minutes of cooking for a quick weekend breakfast."
      }
    ],
    "tips": [
      "Use very ripe bananas for natural sweetness and a tender crumb.",
      "Let the khapli atta batter rest a few minutes so it hydrates and cooks fluffy.",
      "Cook on medium heat and flip only once the bubbles set for even golden pancakes."
    ]
  },
  "khapli-atta-phulka": {
    "description": "Khapli atta phulka are soft, puffed rotis made with ancient-grain Anveshan khapli atta, an emmer wheat lower in gluten, finished with a light brush of bilona ghee.",
    "intro": "Khapli atta phulka are everyday Indian flatbreads made by kneading khapli atta with warm water into a soft dough, rolling thin discs and puffing them over an open flame. Made with ancient emmer-grain Anveshan khapli atta, which is lower in gluten and gentler on digestion than refined wheat, they balloon up beautifully and stay soft. A light brush of Anveshan bilona ghee adds aroma, and this recipe serves 4.",
    "faqs": [
      {
        "question": "Why use khapli atta for phulka?",
        "answer": "Anveshan khapli atta is an ancient emmer wheat lower in gluten and gentler on digestion than refined wheat, giving soft, nutty phulkas that still puff well."
      },
      {
        "question": "How do I get khapli atta phulkas to puff up?",
        "answer": "Knead a soft dough with about 0.75 cup warm water, roll evenly, and cook on a hot tawa before puffing directly over the flame."
      },
      {
        "question": "Should I add ghee to phulka?",
        "answer": "A light brush of Anveshan bilona ghee after cooking keeps the phulkas soft and adds a rich aroma without making them heavy."
      },
      {
        "question": "How many phulkas does this make?",
        "answer": "Using 2 cups of Anveshan khapli atta, it serves 4 with about 15 minutes each of prep and cooking."
      }
    ],
    "tips": [
      "Knead the khapli atta dough soft and let it rest 10 minutes so it rolls easily.",
      "Cook on a hot tawa first, then puff directly over the flame for full balloon.",
      "Brush with Anveshan bilona ghee straight off the heat to keep phulkas soft."
    ]
  },
  "khapli-atta-sourdough": {
    "description": "Khapli atta sourdough bread is a rustic, naturally leavened loaf made with nutty, easy-to-digest Anveshan khapli atta for a deep wheaty crumb and gentler gluten.",
    "intro": "Khapli atta sourdough is a slow-fermented, naturally leavened bread made by mixing khapli atta with an active sourdough starter, then proving, shaping and baking it into a crusty loaf. This version uses ancient emmer-wheat khapli atta, which is naturally lower in gluten and easier on digestion than refined maida, giving the bread a rich, wheaty flavour. A brush of cold-pressed olive oil coaxes the crust glossy and golden.",
    "faqs": [
      {
        "question": "Can I make sourdough bread with khapli atta instead of maida?",
        "answer": "Yes, khapli atta works beautifully for sourdough. This recipe uses 4 cups Anveshan khapli atta with an active starter, and the ancient emmer wheat gives a nuttier flavour and a gentler-on-the-gut crumb than refined flour."
      },
      {
        "question": "Why is khapli atta better for sourdough?",
        "answer": "Khapli atta is an ancient emmer wheat that is naturally lower in gluten and fibre-rich, so the loaf has a deep wheaty taste and is easier to digest while still developing good structure during fermentation."
      },
      {
        "question": "How long does khapli atta sourdough take to make?",
        "answer": "Plan for about 40 minutes of hands-on prep plus a 45-minute bake, on top of the fermentation and proving time the starter needs. The recipe makes one loaf serving roughly 4."
      },
      {
        "question": "What oil should I use for the crust?",
        "answer": "Brush the dough with Anveshan cold-pressed olive oil before baking; it gives the khapli atta loaf a glossy, golden crust and a subtle fruity aroma."
      }
    ],
    "tips": [
      "Use a well-fed, bubbly sourdough starter so the lower-gluten khapli atta gets enough lift.",
      "Hydrate the dough a touch more than usual, as khapli atta and its fibre absorb water readily.",
      "Brush the shaped loaf with olive oil and score it deeply for a glossy, well-opened crust."
    ]
  },
  "khapli-bhakri": {
    "description": "Khapli atta bhakri is a rustic emmer-wheat village flatbread with a soft centre and lightly charred crust, made with fibre-rich Anveshan khapli atta and brushed with bilona ghee.",
    "intro": "Khapli atta bhakri is a rustic Indian village flatbread made by kneading khapli atta with warm water and salt, then patting it into discs and roasting them on a tawa until the centre is soft and the crust is lightly charred. Khapli atta is an ancient emmer wheat that is naturally low in gluten and fibre-rich, making this bhakri wholesome and filling. A brush of aromatic bilona ghee gives each one a rich finish.",
    "faqs": [
      {
        "question": "What is khapli atta bhakri made of?",
        "answer": "It needs just a handful of ingredients: 2 cups Anveshan khapli atta, warm water, salt and a brush of Anveshan bilona ghee, with a little dry flour for dusting."
      },
      {
        "question": "Is khapli atta good for making bhakri?",
        "answer": "Yes, khapli atta is ideal as it is an ancient emmer wheat that is naturally low in gluten and rich in fibre, giving the bhakri a hearty, earthy taste and a satisfying bite."
      },
      {
        "question": "How long does it take to make khapli atta bhakri?",
        "answer": "Around 15 minutes of prep and 20 minutes of cooking, yielding bhakris for about 4 people."
      },
      {
        "question": "How do I keep khapli bhakri soft?",
        "answer": "Knead with warm water, cook on a medium-hot tawa, and brush with Anveshan bilona ghee right after cooking to keep the centre soft and aromatic."
      }
    ],
    "tips": [
      "Knead the khapli atta dough with warm water to make it pliable and easier to pat out.",
      "Press the bhakri with your fingertips rather than rolling, for a more authentic rustic texture.",
      "Brush with bilona ghee straight off the tawa so it soaks in while hot."
    ]
  },
  "lemon-protein-cookie": {
    "description": "Lemon protein cookies are bright, zesty bakes with a soft, protein-rich crumb from Anveshan protein atta, made with ghee and unrefined khandsari instead of butter and white sugar.",
    "intro": "Lemon protein cookies are soft, citrusy cookies made by creaming ghee with khandsari, then folding in protein atta, egg, lemon juice and zest before baking until just set. Using high-protein Anveshan protein atta gives the crumb extra body, while Anveshan ghee and unrefined Anveshan khandsari replace butter and refined white sugar for a guilt-free citrus treat. The recipe makes 18 bright, zesty cookies.",
    "faqs": [
      {
        "question": "How many lemon protein cookies does this recipe make?",
        "answer": "It yields about 18 cookies, with 15 minutes of prep and a 12-minute bake."
      },
      {
        "question": "What makes these cookies higher in protein?",
        "answer": "They are made with 2 cups Anveshan protein atta, a protein-enriched flour that gives the cookies more protein per serving than ones made with plain maida."
      },
      {
        "question": "Can I make lemon cookies without refined sugar and butter?",
        "answer": "Yes; this recipe uses 3/4 cup Anveshan khandsari instead of white sugar and 1/2 cup softened Anveshan bilona ghee instead of butter for a cleaner bake."
      },
      {
        "question": "How do I get a strong lemon flavour?",
        "answer": "Use both 2 tbsp lemon juice and 1 tbsp fresh lemon zest; the zest carries most of the bright citrus aroma."
      }
    ],
    "tips": [
      "Cream the softened ghee and khandsari well so the cookies stay tender, not dense.",
      "Do not overbake; pull them out while the centres are just set for a soft crumb.",
      "Add the lemon zest with the wet ingredients to release maximum citrus oils."
    ]
  },
  "litti-chokha": {
    "description": "Litti chokha is a rustic Bihari dish of whole-wheat dough balls stuffed with spiced Anveshan sattu and mustard oil, baked smoky, drowned in Anveshan ghee and served with mashed chokha.",
    "intro": "Litti chokha is a classic Bihari dish where whole-wheat dough balls are stuffed with a spiced roasted-gram filling, baked until smoky, and served with chokha, a mash of roasted brinjal, tomato and potato. The filling is built on nutty, protein-rich Anveshan sattu and pungent Anveshan mustard oil for authentic depth, and each hot litti is drowned in melted Anveshan ghee. It is hearty, smoky and deeply satisfying.",
    "faqs": [
      {
        "question": "What is the filling in litti made of?",
        "answer": "The litti is stuffed with 1 cup Anveshan sattu seasoned with ginger, garlic, green chillies, ajwain and a drizzle of Anveshan mustard oil for a pungent, savoury filling."
      },
      {
        "question": "How long does litti chokha take to prepare?",
        "answer": "About 30 minutes of prep and 40 minutes of cooking, serving roughly 4 people."
      },
      {
        "question": "Why is sattu used in litti?",
        "answer": "Anveshan sattu is roasted gram flour that is naturally protein-rich, giving the litti filling its signature nutty taste and making the dish filling and nourishing."
      },
      {
        "question": "How are litti traditionally served?",
        "answer": "Each baked litti is drowned in melted Anveshan bilona ghee and served alongside chokha made from roasted brinjal, tomato and potato."
      }
    ],
    "tips": [
      "Bind the sattu filling with mustard oil and a little water so it stays moist inside the baked litti.",
      "Roast the litti over an open flame or coals for that signature smoky aroma.",
      "Dunk the hot litti generously in melted ghee just before serving for the richest flavour."
    ]
  },
  "maharashtrian-pithla": {
    "description": "Pithla is a quick rural Maharashtrian comfort curry of besan simmered into a soft golden gravy, tempered in nutty Anveshan groundnut oil and finished with a spoon of bilona ghee.",
    "intro": "Maharashtrian pithla is a quick, rustic curry made by whisking besan into water and simmering it into a soft, golden gravy spiced with onion, garlic and a tempering of mustard and cumin seeds. It is tempered in nutty, heart-friendly Anveshan groundnut oil and finished with a spoon of aromatic Anveshan bilona ghee, which rounds out the earthy gram flour. Ready in minutes, it pairs beautifully with bhakri.",
    "faqs": [
      {
        "question": "What is pithla made of?",
        "answer": "Pithla is made from 1 cup besan simmered into a gravy with onion, garlic and a tempering of mustard and cumin seeds in Anveshan groundnut oil, finished with Anveshan bilona ghee."
      },
      {
        "question": "How long does it take to make Maharashtrian pithla?",
        "answer": "Just about 10 minutes of prep and 20 minutes of cooking, serving 4."
      },
      {
        "question": "What do you eat pithla with?",
        "answer": "It pairs classically with bhakri or rice; the soft besan gravy and a spoon of bilona ghee make it a comforting everyday meal."
      },
      {
        "question": "How do I avoid lumps in pithla?",
        "answer": "Whisk the besan smoothly into water before adding it to the tempering, and stir continuously as it simmers in the groundnut oil base."
      }
    ],
    "tips": [
      "Whisk besan into the water before pouring it in to keep the gravy lump-free.",
      "Temper mustard and cumin seeds in groundnut oil until they crackle for the best aroma.",
      "Finish with a spoon of bilona ghee off the heat to round out the earthy besan."
    ]
  },
  "makhana-kheer": {
    "description": "Makhana kheer is a creamy festive pudding of roasted phool makhana simmered in milk, sweetened with Anveshan khandsari, perfumed with Anveshan saffron and toasted in bilona ghee.",
    "intro": "Makhana kheer is a creamy Indian dessert made by toasting phool makhana in ghee, then simmering it in milk until soft and thick, sweetened naturally and fragranced with saffron and cardamom. A spoon of Anveshan ghee toasts the makhana golden, unrefined Anveshan khandsari replaces refined sugar, and pure Anveshan saffron lends a festive colour and aroma. It is a comforting pudding for festivals and special occasions.",
    "faqs": [
      {
        "question": "How do you make makhana kheer creamy?",
        "answer": "Simmer 2 cups roasted phool makhana in 1 litre full-fat milk until soft, stirring so it thickens; toasting the makhana in Anveshan ghee first deepens the flavour."
      },
      {
        "question": "Can makhana kheer be made without refined sugar?",
        "answer": "Yes; this recipe uses 0.5 cup Anveshan khandsari instead of refined sugar for a cleaner, mineral-rich sweetness."
      },
      {
        "question": "How long does makhana kheer take to cook?",
        "answer": "Around 10 minutes of prep and 30 minutes of cooking, serving 4."
      },
      {
        "question": "What gives makhana kheer its colour and aroma?",
        "answer": "A pinch of Anveshan saffron lends the kheer its golden hue and fragrance, rounded off with cardamom and chopped nuts."
      }
    ],
    "tips": [
      "Toast the makhana in ghee until crisp before adding milk so they hold their bite.",
      "Add khandsari only once the milk has thickened to control the final sweetness.",
      "Bloom the saffron in a little warm milk first for the deepest colour and aroma."
    ]
  },
  "mango-coconut-phirni": {
    "description": "Mango coconut phirni is a silky chilled ground-rice pudding with sweet mango pulp and creamy coconut milk, sweetened with unrefined Anveshan khandsari and topped with mango and nuts.",
    "intro": "Mango coconut phirni is a chilled Indian pudding made by simmering ground basmati rice in milk and coconut milk, then folding in sweet mango pulp and setting it cool in bowls. Unrefined Anveshan khandsari sweetens it naturally in place of refined sugar, while coconut milk and mango give it a tropical, summery twist. Topped with fresh mango and slivered pistachios, it is a refreshing festive dessert.",
    "faqs": [
      {
        "question": "What makes mango coconut phirni different from regular phirni?",
        "answer": "This version adds 1 cup mango pulp and 0.5 cup coconut milk for a tropical twist, sweetened with Anveshan khandsari instead of refined sugar."
      },
      {
        "question": "How long does mango coconut phirni take to make?",
        "answer": "About 15 minutes of prep and 25 minutes of cooking, plus chilling time, serving 4."
      },
      {
        "question": "Can I sweeten phirni without white sugar?",
        "answer": "Yes; this recipe uses 0.5 cup unrefined Anveshan khandsari, which dissolves smoothly into the ground-rice pudding for a clean sweetness."
      },
      {
        "question": "When should I add the mango pulp?",
        "answer": "Fold the mango pulp in after the rice-milk base has cooled slightly, so the heat does not curdle the pulp or dull its fresh flavour."
      }
    ],
    "tips": [
      "Coarsely grind the soaked basmati rice so the phirni has a soft, grainy texture.",
      "Cool the base before adding mango pulp to keep its fresh flavour intact.",
      "Chill the phirni for a few hours so it sets to a silky, spoonable consistency."
    ]
  },
  "masala-peanuts": {
    "description": "Crunchy masala peanuts tossed with curry leaves, garlic and spices, shallow-fried in cold-pressed Anveshan groundnut oil for a clean, nutty crunch. The perfect homemade chai-time snack.",
    "intro": "Masala peanuts are crispy, spice-coated peanuts made by coating raw peanuts in a seasoned besan-and-rice-flour batter and frying them golden. This version is shallow-fried in cold-pressed Anveshan groundnut oil so the nuts stay light and grease-free, with a naturally nutty flavour the spices cling to. A pinch of mineral-rich jaggery powder rounds off the heat, making them an addictive yet wholesome accompaniment to your evening chai.",
    "faqs": [
      {
        "question": "How long does it take to make masala peanuts?",
        "answer": "About 25 minutes start to finish — roughly 10 minutes of prep and 15 minutes of cooking, yielding around 4 servings."
      },
      {
        "question": "Which oil is best for frying masala peanuts?",
        "answer": "A clean, nutty cold-pressed oil works best. We use Anveshan wood-pressed groundnut oil, which complements the peanuts and keeps them crisp without a greasy aftertaste."
      },
      {
        "question": "Why add jaggery powder to masala peanuts?",
        "answer": "Just a tablespoon of Anveshan jaggery powder balances the chilli and salt with a subtle caramel note, giving the snack that classic sweet-spicy-savoury finish."
      },
      {
        "question": "How do I keep masala peanuts crunchy?",
        "answer": "Coat the peanuts in besan and rice flour for a thin crisp shell, fry on medium heat, then cool them fully before storing in an airtight jar so they stay crunchy for days."
      }
    ],
    "tips": [
      "Toss the peanuts in a little water before adding the flours so the coating sticks evenly.",
      "Fry on medium heat — too hot and the besan browns before the peanuts cook through.",
      "Add the curry leaves to the hot groundnut oil for a few seconds first to release their aroma into the snack."
    ]
  },
  "mediterranean-tava-veg": {
    "description": "Colourful zucchini, bell peppers and cherry tomatoes seared on a tava and finished with herbs and fruity Anveshan extra virgin olive oil for a quick, heart-healthy Mediterranean vegetable medley.",
    "intro": "Mediterranean tava veg is a quick stovetop medley of zucchini, bell peppers and cherry tomatoes seared on a hot griddle with garlic, oregano and a glossy finish of olive oil. Made with cold-pressed Anveshan extra virgin olive oil instead of butter, the vegetables stay vibrant and heart-friendly, while a spoon of raw Anveshan honey balances the natural acidity of the tomatoes. It comes together in about 30 minutes and serves 4 as a light side or salad-bowl base.",
    "faqs": [
      {
        "question": "What vegetables go into Mediterranean tava veg?",
        "answer": "This recipe uses zucchini, bell peppers, cherry tomatoes and red onion with garlic and oregano, all seared on a tava and finished with Anveshan extra virgin olive oil."
      },
      {
        "question": "Why use olive oil instead of butter for tava veg?",
        "answer": "Fruity, cold-pressed Anveshan olive oil keeps the dish heart-healthy and lends a peppery Mediterranean note that butter cannot match, without weighing the vegetables down."
      },
      {
        "question": "How many people does this recipe serve?",
        "answer": "It serves 4 and takes about 30 minutes, with 15 minutes of prep and 15 minutes of cooking."
      },
      {
        "question": "Can I make Mediterranean tava veg sweet and tangy?",
        "answer": "Yes — a tablespoon of Anveshan wild forest honey rounds off the tartness of the cherry tomatoes for a gently sweet-savoury balance."
      }
    ],
    "tips": [
      "Get the tava smoking hot so the vegetables char rather than steam.",
      "Add the olive oil and honey at the end to keep their flavour fresh and prevent burning.",
      "Cut the zucchini and peppers into even pieces so everything cooks at the same rate."
    ]
  },
  "miso-peanut-ramen-bowl": {
    "description": "A cosy miso peanut ramen bowl with fresh noodles hand-cut from nutty Anveshan khapli atta, in a creamy miso-peanut broth built on toasty Anveshan sesame oil and a touch of honey.",
    "intro": "A miso peanut ramen bowl is a comforting noodle bowl of fresh noodles in a rich, creamy broth made from white miso, peanut butter and stock. Here the noodles are hand-cut from nutty Anveshan khapli atta for extra fibre and bite, while the broth gets its toasty depth from Anveshan sesame oil and a gentle sweetness from raw Anveshan honey. Topped with mushrooms, pak choi and soft-boiled eggs, it makes a wholesome, restaurant-style bowl for 4.",
    "faqs": [
      {
        "question": "Can I make ramen noodles from atta at home?",
        "answer": "Yes — this recipe uses 2 cups of Anveshan khapli atta to hand-cut fresh noodles, giving them a nutty flavour and firmer bite than refined-flour ramen."
      },
      {
        "question": "What makes the miso peanut broth creamy?",
        "answer": "White miso paste and peanut butter whisked into vegetable stock create the creamy base, while Anveshan sesame oil adds a toasty finish and Anveshan honey balances the savoury miso."
      },
      {
        "question": "How long does this ramen bowl take to make?",
        "answer": "About 50 minutes in total — 35 minutes of prep including making the noodles, and 15 minutes of cooking, serving 4."
      },
      {
        "question": "What toppings work for a miso peanut ramen bowl?",
        "answer": "Sauteed mushrooms and pak choi, soft-boiled eggs and spring onion work beautifully and add texture and protein to the bowl."
      }
    ],
    "tips": [
      "Rest the khapli atta dough before rolling so the noodles cut and stretch without tearing.",
      "Stir the sesame oil in off the heat to preserve its toasty aroma.",
      "Whisk the miso and peanut butter into warm, not boiling, stock to keep the broth smooth."
    ]
  },
  "moong-dal-halwa": {
    "description": "A rich, slow-cooked North Indian moong dal halwa made with yellow moong dal, pure Anveshan bilona ghee and unrefined Anveshan khandsari in place of refined sugar.",
    "intro": "Moong dal halwa is a classic North Indian festive dessert made by slow-roasting ground yellow moong dal in ghee until golden, then cooking it down with milk and sweetener into a rich, grainy halwa. This version leans on aromatic Anveshan bilona ghee for authentic richness and unrefined Anveshan khandsari instead of white sugar, finished with cardamom, saffron and fried nuts. It takes patience but rewards you with a deeply indulgent halwa that serves 6.",
    "faqs": [
      {
        "question": "Why is moong dal halwa cooked in ghee?",
        "answer": "Slow-roasting the dal in Anveshan bilona ghee is what gives this halwa its signature richness, golden colour and nutty aroma — half a cup of ghee is used here for that authentic taste."
      },
      {
        "question": "Can I make moong dal halwa without refined sugar?",
        "answer": "Yes — this recipe uses three-quarters of a cup of Anveshan khandsari, an unrefined cane sweetener, in place of white sugar for a cleaner sweetness."
      },
      {
        "question": "How long does moong dal halwa take to cook?",
        "answer": "Plan for about 75 minutes total — roughly 30 minutes of prep and 45 minutes of slow cooking, yielding 6 servings."
      },
      {
        "question": "Why does my moong dal halwa turn out lumpy?",
        "answer": "Roast the dal patiently in ghee and add the warm milk-water gradually while stirring constantly, which keeps the halwa smooth and prevents lumps."
      }
    ],
    "tips": [
      "Roast the dal on low heat until it smells nutty and releases the ghee — rushing this step gives a raw taste.",
      "Warm the milk before adding it so the halwa cooks evenly without seizing.",
      "Bloom the saffron in a spoon of warm milk before stirring it in for the best colour and fragrance."
    ]
  },
  "moringa-mathri": {
    "description": "A nutrient-packed twist on classic tea-time mathri using Anveshan moringa powder and ancient-grain Anveshan khapli atta. Flaky, crispy and far better for you than the maida original.",
    "intro": "Moringa mathri is a crisp, flaky North Indian tea-time cracker made by kneading a stiff spiced dough, rolling it thin and frying it golden. This wholesome version swaps refined maida for ancient-grain Anveshan khapli atta and folds in nutrient-rich Anveshan moringa powder, with bilona ghee rubbed through the dough for that classic short, flaky bite. Seasoned with ajwain and pepper, it makes a savoury, better-for-you snack — this batch yields around 30 mathris.",
    "faqs": [
      {
        "question": "What is moringa mathri made of?",
        "answer": "It is made from Anveshan khapli atta and moringa powder bound with Anveshan ghee, ajwain, cumin and pepper, then rolled thin and fried into crisp crackers."
      },
      {
        "question": "Why use khapli atta instead of maida for mathri?",
        "answer": "Anveshan khapli atta is an ancient emmer wheat that is fibre-rich and gentler on digestion, giving the mathri a nuttier flavour than refined maida while staying just as flaky."
      },
      {
        "question": "How many mathris does this recipe make?",
        "answer": "It yields about 30 mathris and takes roughly 45 minutes — 20 minutes of prep and 25 minutes of frying."
      },
      {
        "question": "How do I make mathri extra flaky?",
        "answer": "Rub the Anveshan ghee well into the khapli atta until it resembles breadcrumbs, knead a stiff dough with cold water, and fry on low-medium heat so the layers stay crisp."
      }
    ],
    "tips": [
      "Knead a firm, tight dough — soft dough makes mathris that puff up instead of staying flaky.",
      "Prick each rolled mathri with a fork so it does not bubble while frying.",
      "Fry on low-medium heat so they crisp through to the centre without browning too fast."
    ]
  },
  "moringa-smoothie-bowl": {
    "description": "A bright green moringa smoothie bowl blended thick with frozen banana and mango, powered by Anveshan moringa powder and sweetened naturally with raw Anveshan honey.",
    "intro": "A moringa smoothie bowl is a thick, spoonable blended smoothie made from frozen banana and mango and topped with granola, berries and seeds. This bowl gets its vibrant green colour and nutritional boost from Anveshan moringa powder — a source of plant iron, vitamins and antioxidants — while a drizzle of raw Anveshan honey adds gentle natural sweetness. Ready in about 10 minutes, it makes a quick, energising breakfast for 2.",
    "faqs": [
      {
        "question": "What does moringa powder add to a smoothie bowl?",
        "answer": "Just a teaspoon of Anveshan moringa powder lends a vibrant green colour along with plant iron, vitamins and antioxidants, with a mild earthy note the fruit balances out."
      },
      {
        "question": "How do I make a smoothie bowl thick enough to eat with a spoon?",
        "answer": "Use frozen banana and frozen mango with just half a cup of chilled milk or yoghurt, so it blends into a thick, scoopable base rather than a drinkable smoothie."
      },
      {
        "question": "How many servings does this moringa smoothie bowl make?",
        "answer": "It makes 2 servings and is ready in about 10 minutes with no cooking required."
      },
      {
        "question": "Can I sweeten a moringa smoothie bowl without sugar?",
        "answer": "Yes — a tablespoon of raw Anveshan honey adds natural sweetness that complements the moringa and ripe fruit without any refined sugar."
      }
    ],
    "tips": [
      "Use fully frozen fruit and minimal liquid for a thick, spoonable bowl.",
      "Blend the moringa powder right into the base so its colour and nutrients distribute evenly.",
      "Add the granola and seed toppings just before serving so they stay crunchy."
    ]
  },
  "multigrain-atta-pizza": {
    "description": "A crisp-yet-chewy homemade multigrain atta pizza with a base kneaded from fibre-rich Anveshan multigrain atta, brushed and drizzled with fruity Anveshan olive oil. A feel-good upgrade to takeaway.",
    "intro": "Multigrain atta pizza is a homemade pizza built on a wholesome yeasted base kneaded from multigrain flour instead of refined maida. Using fibre-rich Anveshan multigrain atta gives the crust a satisfying crisp-yet-chewy bite, while fruity Anveshan olive oil brushed into the dough and drizzled on top keeps it supple and golden. Topped with sauce, mozzarella, cherry tomatoes and basil, it is a feel-good upgrade to takeaway pizza that serves 4.",
    "faqs": [
      {
        "question": "Can I make pizza dough with multigrain atta?",
        "answer": "Yes — this recipe kneads 3 cups of Anveshan multigrain atta with yeast, warm water and olive oil into a base that bakes up crisp outside and chewy inside."
      },
      {
        "question": "Why does the recipe use olive oil in the pizza base?",
        "answer": "Anveshan olive oil keeps the multigrain dough soft and pliable and gives the crust a golden, bakery-style finish when brushed on before baking."
      },
      {
        "question": "How long does multigrain pizza take to make?",
        "answer": "Allow about 90 minutes of prep, mostly for the dough to rise, plus 15 minutes of baking, serving 4."
      },
      {
        "question": "How do I get a crisp base with multigrain atta?",
        "answer": "Let the dough rise fully, roll it thin, and bake on a preheated tray or stone at high heat so the multigrain crust crisps up rather than turning dense."
      }
    ],
    "tips": [
      "Give the multigrain dough a full rise so the crust stays light, not heavy.",
      "Preheat your oven and tray as hot as possible for a crisp bottom.",
      "Brush the rim with Anveshan olive oil before baking for a golden, glossy crust."
    ]
  },
  "multigrain-thalipeeth": {
    "description": "A rustic Maharashtrian multigrain thalipeeth made from wholesome Anveshan multigrain atta, onions and warm spices, shallow-fried in heart-friendly Anveshan groundnut oil. Perfect with curd.",
    "intro": "Thalipeeth is a rustic Maharashtrian griddle flatbread made by patting a spiced multigrain dough thin and shallow-frying it until crisp. This version uses fibre-rich Anveshan multigrain atta blended with onion, coriander and warm spices, then fried in heart-friendly Anveshan groundnut oil for a nutty, wholesome result. Earthy and satisfying, it pairs beautifully with white butter and curd, and serves 4.",
    "faqs": [
      {
        "question": "What is thalipeeth made of?",
        "answer": "This thalipeeth is made from Anveshan multigrain atta mixed with chopped onion, coriander, cumin, chilli and turmeric, then shallow-fried in Anveshan groundnut oil."
      },
      {
        "question": "Why use multigrain atta for thalipeeth?",
        "answer": "Anveshan multigrain atta gives the flatbread extra fibre and a wholesome, multi-grain flavour, for slow-release energy compared to plain refined flour."
      },
      {
        "question": "How long does thalipeeth take to make?",
        "answer": "About 35 minutes — 15 minutes of prep and 20 minutes of cooking on the tawa, making 4 servings."
      },
      {
        "question": "How do I shape thalipeeth without it breaking?",
        "answer": "Pat the dough directly onto a greased sheet or hot tawa with wet fingers, make a small hole in the centre, and drizzle Anveshan groundnut oil around the edges so it cooks through and crisps evenly."
      }
    ],
    "tips": [
      "Pat the dough thin with wet fingers rather than rolling, which keeps it tender.",
      "Make a hole in the centre and add a little groundnut oil so it cooks evenly.",
      "Cook on medium heat and flip once for a crisp, golden crust on both sides."
    ]
  },
  "multigrain-veg-paratha": {
    "description": "Soft, flaky multigrain veg paratha stuffed with spiced seasonal vegetables and made with wholesome Anveshan multigrain atta, roasted on a hot tawa with a smear of Anveshan bilona ghee.",
    "intro": "Multigrain veg paratha is a stuffed Indian flatbread made by rolling a spiced vegetable filling into dough and roasting it on a tawa. Made with wholesome Anveshan multigrain atta instead of refined flour, it delivers slow-release energy and extra fibre, while a smear of aromatic Anveshan bilona ghee gives each paratha its flaky, golden finish. Packed with grated seasonal vegetables, it makes a hearty breakfast or lunchbox favourite for 4.",
    "faqs": [
      {
        "question": "What vegetables go into a multigrain veg paratha?",
        "answer": "This recipe uses about 1.5 cups of mixed grated vegetables like carrot, cabbage and capsicum, spiced with green chilli, coriander, turmeric and ajwain."
      },
      {
        "question": "Why make paratha with multigrain atta?",
        "answer": "Anveshan multigrain atta adds fibre and a blend of grains for slow-release energy, making the paratha more filling and wholesome than one made with refined flour."
      },
      {
        "question": "How many parathas does this recipe make?",
        "answer": "It serves 4 and takes about 40 minutes — 20 minutes of prep and 20 minutes of cooking on the tawa."
      },
      {
        "question": "How do I stop veg paratha from tearing while rolling?",
        "answer": "Squeeze excess moisture from the grated vegetables, seal the filling well, and roll gently with even pressure before roasting with a little Anveshan bilona ghee."
      }
    ],
    "tips": [
      "Salt the grated vegetables and squeeze out the water so the filling doesn't make the dough soggy.",
      "Roll gently from the centre outward to keep the stuffing from bursting.",
      "Finish each paratha with a smear of Anveshan bilona ghee for that flaky, aromatic crust."
    ]
  },
  "multigrain-veggie-wrap": {
    "description": "A modern multigrain veggie wrap stuffed with crunchy vegetables and paneer in a soft homemade flatbread of fibre-rich Anveshan multigrain atta, kept supple with Anveshan olive oil.",
    "intro": "A multigrain veggie wrap is an on-the-go meal of crunchy vegetables and paneer rolled into a soft homemade flatbread. The flatbread is made with fibre-rich Anveshan multigrain atta for a wholesome, grain-packed base, kept supple and glossy with a little Anveshan olive oil. Filled with shredded carrot, cabbage and bell pepper, hung curd and chaat masala, it makes a quick, balanced lunch for 4.",
    "faqs": [
      {
        "question": "What goes inside a multigrain veggie wrap?",
        "answer": "This wrap is filled with shredded carrot, cabbage and bell pepper, cubed paneer or tofu, and hung curd seasoned with chaat masala and chilli powder."
      },
      {
        "question": "Why use multigrain atta for the wrap flatbread?",
        "answer": "Anveshan multigrain atta packs in a mix of grains and fibre, giving the flatbread a more wholesome, filling base than refined-flour wraps."
      },
      {
        "question": "How long does it take to make veggie wraps?",
        "answer": "About 35 minutes — 20 minutes of prep and 15 minutes of cooking — making 4 wraps."
      },
      {
        "question": "How do I keep a homemade wrap soft and pliable?",
        "answer": "Knead the multigrain atta with a little Anveshan olive oil and warm water, rest the dough, and cook the flatbreads briefly so they stay soft enough to roll without cracking."
      }
    ],
    "tips": [
      "Add a little Anveshan olive oil to the dough so the flatbreads stay soft and roll without cracking.",
      "Keep the cooked flatbreads under a cloth so they stay pliable until you fill them.",
      "Use thick hung curd so the filling stays creamy without making the wrap soggy."
    ]
  },
  "mustard-oil-aloo-gobi": {
    "description": "A classic dry aloo gobi cooked the North Indian way in pungent, cold-pressed Anveshan mustard oil, which gives the potatoes and cauliflower their signature dhaba flavour and golden colour.",
    "intro": "Aloo gobi is a beloved dry North Indian curry of potatoes and cauliflower cooked with onion, ginger-garlic and everyday spices until golden and tender. Cooking it in pungent, cold-pressed Anveshan mustard oil is what gives the dish its signature dhaba-style flavour and rich golden colour, while a spoon of Anveshan bilona ghee adds a final aromatic touch. Earthy and comforting, it serves 4 and pairs perfectly with hot rotis.",
    "faqs": [
      {
        "question": "Why cook aloo gobi in mustard oil?",
        "answer": "Pungent, cold-pressed Anveshan mustard oil gives aloo gobi its authentic North Indian dhaba flavour and lends the potatoes and cauliflower a deep golden colour."
      },
      {
        "question": "Should I heat mustard oil before cooking aloo gobi?",
        "answer": "Yes — heat the Anveshan mustard oil until it just smokes and turns lighter, which mellows its sharpness before you add the spices and vegetables."
      },
      {
        "question": "How long does aloo gobi take to make?",
        "answer": "About 40 minutes — 15 minutes of prep and 25 minutes of cooking — serving 4."
      },
      {
        "question": "How do I keep aloo gobi dry and not mushy?",
        "answer": "Cook it on medium heat without adding water, cover only briefly to soften the cauliflower, and finish with a spoon of Anveshan bilona ghee for richness."
      }
    ],
    "tips": [
      "Heat the mustard oil to smoking point first to mellow its raw pungency.",
      "Cook uncovered on medium heat so the potatoes and gobi char rather than steam.",
      "Add a spoon of Anveshan bilona ghee at the end for a rich, dhaba-style finish."
    ]
  },
  "nariyal-ladoo": {
    "description": "Soft, melt-in-the-mouth nariyal ladoo rolled in desiccated coconut, sweetened with mineral-rich Anveshan khandsari instead of refined sugar and bound with a touch of Anveshan coconut oil.",
    "intro": "Nariyal ladoo are quick coconut sweets made by cooking desiccated coconut with milk and sweetener, then rolling the mixture into soft, melt-in-the-mouth balls. This version is sweetened with unrefined Anveshan khandsari instead of white sugar and bound with a touch of cold-pressed Anveshan coconut oil for a clean, fragrant finish. Flavoured with cardamom and studded with cashews, these festive ladoos come together in about 30 minutes and serve 4.",
    "faqs": [
      {
        "question": "How do you make nariyal ladoo?",
        "answer": "Cook desiccated coconut with condensed milk, a little milk and Anveshan khandsari until thick, flavour with cardamom, then roll into ladoos and coat in more coconut."
      },
      {
        "question": "Can I make coconut ladoo without refined sugar?",
        "answer": "Yes — this recipe uses half a cup of unrefined Anveshan khandsari for a cleaner sweetness than white sugar, plus the natural sweetness of condensed milk."
      },
      {
        "question": "Why add coconut oil to nariyal ladoo?",
        "answer": "A tablespoon of cold-pressed Anveshan coconut oil helps bind the mixture and deepens that fresh coconut aroma and flavour."
      },
      {
        "question": "How long do nariyal ladoo take to make?",
        "answer": "About 30 minutes — 15 minutes of prep and 15 minutes of cooking — yielding roughly 4 servings."
      }
    ],
    "tips": [
      "Cook the coconut mixture until it leaves the sides of the pan so the ladoos hold their shape.",
      "Let the mixture cool slightly before rolling so it is easy to handle and binds well.",
      "Roll the shaped ladoos in extra desiccated coconut for a pretty, snowy finish."
    ]
  },
  "overnight-coconut-chia-pudding-strawberries": {
    "description": "A make-ahead overnight coconut chia pudding layered with juicy macerated strawberries, sweetened with raw Anveshan honey and Anveshan khandsari and enriched with a spoon of Anveshan coconut oil.",
    "intro": "Overnight coconut chia pudding is a no-cook make-ahead dessert where chia seeds soak in coconut milk overnight to set into a creamy, spoonable pudding, here layered with juicy macerated strawberries. It is sweetened naturally with raw Anveshan honey and a touch of unrefined Anveshan khandsari instead of refined syrup, and enriched with a spoon of cold-pressed Anveshan coconut oil for a silky finish. Just stir, chill and layer — it serves 4.",
    "faqs": [
      {
        "question": "How long does coconut chia pudding need to set?",
        "answer": "Stir the chia seeds into coconut milk and chill for around 9 hours or overnight so they swell into a thick, creamy pudding."
      },
      {
        "question": "How do you sweeten chia pudding without refined sugar?",
        "answer": "This recipe uses raw Anveshan honey along with a little unrefined Anveshan khandsari, which sweeten the pudding and the strawberries without any refined syrup."
      },
      {
        "question": "Why add coconut oil to chia pudding?",
        "answer": "A teaspoon of cold-pressed Anveshan coconut oil gives the coconut chia pudding a silky finish and rounds out its tropical flavour."
      },
      {
        "question": "How many servings does this chia pudding make?",
        "answer": "It makes 4 servings with about 15 minutes of hands-on prep, then chills for roughly 9 hours."
      }
    ],
    "tips": [
      "Whisk the chia and coconut milk twice in the first half hour so the seeds don't clump.",
      "Macerate the strawberries with a little Anveshan honey to draw out their juices before layering.",
      "Warm the coconut oil slightly so it blends smoothly into the chilled coconut milk."
    ]
  },
  "paneer-butter-masala": {
    "description": "Paneer butter masala is soft paneer in a velvety tomato-cashew gravy, made restaurant-rich with Anveshan bilona ghee instead of refined butter.",
    "intro": "Paneer butter masala is a North Indian curry of soft paneer cubes simmered in a smooth, creamy tomato-and-cashew gravy, and the secret to its restaurant-style richness is tempering it in pure ghee rather than processed butter. This version blooms the masala in Anveshan bilona ghee and a little groundnut oil, then balances the tang of five ripe tomatoes with a touch of unrefined khandsari and a sprinkle of kasuri methi. The result is a glossy, indulgent gravy that serves 4 and comes together in about 50 minutes.",
    "faqs": [
      {
        "question": "What makes paneer butter masala so rich and creamy?",
        "answer": "The richness comes from a tomato-cashew base, fresh cream and a tempering of Anveshan bilona ghee, which gives the gravy a velvety body without needing refined butter."
      },
      {
        "question": "How long does paneer butter masala take to make?",
        "answer": "About 50 minutes in total, with 20 minutes of prep and 30 minutes of cooking, serving 4 people."
      },
      {
        "question": "Can I use ghee instead of butter in paneer butter masala?",
        "answer": "Yes, Anveshan bilona ghee is used here in place of butter; it adds a nutty aroma and authentic depth that processed butter cannot match."
      },
      {
        "question": "Why is khandsari added to the gravy?",
        "answer": "A teaspoon of unrefined Anveshan khandsari offsets the natural acidity of the tomatoes, balancing the gravy without an obvious sweetness."
      }
    ],
    "tips": [
      "Soak the cashews before blending so the gravy turns out perfectly smooth and lump-free.",
      "Crush the kasuri methi between your palms before adding it to release its full aroma into the gravy.",
      "Finish with the bilona ghee at the end for a glossy sheen and that signature restaurant fragrance."
    ]
  },
  "paneer-tikka": {
    "description": "Paneer tikka is smoky, charred cubes of yogurt-marinated paneer and peppers, given authentic tandoori depth with pungent Anveshan wood-pressed mustard oil.",
    "intro": "Paneer tikka is a popular Indian starter of paneer cubes and peppers marinated in spiced hung curd, then charred until smoky on a grill, tawa or in the oven. The marinade here is built on pungent Anveshan wood-pressed mustard oil, which gives the tikka its authentic tandoori sharpness, while a spoon of wild forest honey helps the edges caramelise and char beautifully. Besan in the marinade keeps it thick and clinging, so every 400 g of paneer comes out perfectly coated and serves 4.",
    "faqs": [
      {
        "question": "Why is mustard oil used in paneer tikka marinade?",
        "answer": "Anveshan wood-pressed mustard oil gives the marinade a pungent, authentic tandoori depth and helps the spices cling to the paneer for that classic smoky flavour."
      },
      {
        "question": "How do I get a smoky char without a tandoor?",
        "answer": "Grill, air-fry or roast the marinated paneer at high heat, or finish it on a tawa; the honey in the marinade helps the edges caramelise into a charred crust."
      },
      {
        "question": "How long should paneer marinate for tikka?",
        "answer": "Prep is about 25 minutes, and the longer the paneer sits in the hung-curd and mustard oil marinade, the deeper the flavour before its quick 15-minute cook."
      },
      {
        "question": "What does honey do in paneer tikka?",
        "answer": "A tablespoon of Anveshan wild forest honey balances the spice and encourages the lovely caramelised char on the paneer and peppers."
      }
    ],
    "tips": [
      "Use thick hung curd so the marinade stays creamy and coats the paneer instead of sliding off.",
      "Add besan to the marinade to bind it and prevent the yogurt from releasing water on the grill.",
      "Brush a little extra mustard oil while cooking to keep the paneer moist and boost the smoky aroma."
    ]
  },
  "protein-atta-biscuits": {
    "description": "Protein atta biscuits are crisp, golden tea-time cookies baked with high-protein Anveshan protein atta, pure ghee and unrefined khandsari, with no maida or refined sugar.",
    "intro": "Protein atta biscuits are crunchy, wholesome tea-time biscuits made by creaming ghee with unrefined sugar and binding it into high-protein flour before baking till golden. This recipe uses Anveshan protein atta in place of maida and Anveshan khandsari instead of white sugar, with rich bilona ghee giving the classic melt-in-the-mouth crumb. Lightly perfumed with cardamom, this batch yields around 20 biscuits in just 30 minutes, making them a guilt-free companion for your evening chai.",
    "faqs": [
      {
        "question": "How many biscuits does this recipe make?",
        "answer": "It yields about 20 biscuits, with 15 minutes of prep and 15 minutes of baking."
      },
      {
        "question": "Are these protein atta biscuits made without maida or refined sugar?",
        "answer": "Yes, they use Anveshan protein atta instead of maida and unrefined Anveshan khandsari instead of white sugar, so there is no refined flour or sugar."
      },
      {
        "question": "Why use ghee instead of butter in these biscuits?",
        "answer": "Anveshan ghee gives the biscuits a rich, nutty flavour and that signature crisp, melt-in-the-mouth texture without needing processed butter."
      },
      {
        "question": "How do I get the dough to come together if it feels crumbly?",
        "answer": "Add the milk a tablespoon at a time, using just 2 to 3 tablespoons, until the protein atta dough binds into a soft, rollable mass."
      }
    ],
    "tips": [
      "Cream the ghee and powdered khandsari well before adding the flour for a lighter, even crumb.",
      "Add the milk gradually so the dough binds without turning sticky.",
      "Bake until just golden at the edges and let them cool fully to crisp up properly."
    ]
  },
  "protein-atta-energy-cookies": {
    "description": "Protein atta energy cookies are chewy, wholesome bakes made with Anveshan protein atta, jaggery powder and bilona ghee, sweetened naturally with no butter or refined sugar.",
    "intro": "Protein atta energy cookies are chewy, nutrient-dense cookies made by binding protein-rich flour, oats and nuts with ghee and natural sweetener, then baking till golden. This version uses Anveshan protein atta for staying power, sweetens with mineral-rich jaggery powder instead of refined sugar, and binds everything with rich bilona ghee rather than butter. Studded with rolled oats, almonds and walnuts and warmed with cinnamon, they make a satisfying tea-time or post-workout snack.",
    "faqs": [
      {
        "question": "What sweetener is used in these energy cookies?",
        "answer": "They are sweetened with mineral-rich Anveshan jaggery powder instead of refined sugar, giving a warm caramel note."
      },
      {
        "question": "What makes these cookies high in protein and energy?",
        "answer": "They are built on Anveshan protein atta, with rolled oats, almonds and walnuts adding fibre, healthy fats and sustained energy."
      },
      {
        "question": "How long do protein atta energy cookies take to make?",
        "answer": "About 30 minutes total, with 15 minutes of prep and 15 minutes of baking."
      },
      {
        "question": "Can I use ghee instead of butter in these cookies?",
        "answer": "Yes, this recipe uses Anveshan bilona ghee to bind the dough, giving the cookies a rich aroma without any butter."
      }
    ],
    "tips": [
      "Let the dough rest a few minutes so the jaggery powder dissolves and the oats absorb moisture for a chewier cookie.",
      "Press the cookies down slightly before baking, as they spread less than refined-flour dough.",
      "Toast the almonds and walnuts beforehand to deepen their crunch and flavour."
    ]
  },
  "protein-atta-veg-cheela": {
    "description": "Protein atta veg cheela is a high-protein savoury Indian pancake made with Anveshan protein atta and crunchy vegetables for a power-packed breakfast.",
    "intro": "Protein atta veg cheela is a savoury Indian pancake made by whisking protein-rich flour with water and chopped vegetables into a batter, then cooking it thin and golden on a tawa. This recipe swaps regular flour for Anveshan protein atta to deliver more muscle-friendly protein per serving, loads it with onion, tomato and capsicum, and adds a teaspoon of nutrient-dense moringa powder for an extra green boost. Cooked with a little bilona ghee, it serves 4 and is ready in about 25 minutes for a power-packed start to the day.",
    "faqs": [
      {
        "question": "Why is this cheela higher in protein than a regular cheela?",
        "answer": "It is made with Anveshan protein atta instead of ordinary flour, which delivers more muscle-friendly protein per serving."
      },
      {
        "question": "What vegetables go into protein atta veg cheela?",
        "answer": "This recipe uses finely chopped onion, tomato and capsicum with green chilli and coriander, all folded into the protein atta batter."
      },
      {
        "question": "How long does it take to make veg cheela?",
        "answer": "Around 25 minutes in total, with 10 minutes of prep and 15 minutes of cooking, serving 4."
      },
      {
        "question": "What is the moringa powder for in this cheela?",
        "answer": "A teaspoon of Anveshan moringa powder adds a nutrient-dense green boost to the batter without changing the savoury taste."
      }
    ],
    "tips": [
      "Keep the batter to a smooth, pourable consistency with about 1.25 cups water so the cheela spreads thin and cooks evenly.",
      "Cook on a medium-hot tawa greased with a little bilona ghee for crisp edges and easy flipping.",
      "Rest the batter for a few minutes before cooking so the protein atta hydrates fully."
    ]
  },
  "pumpkin-seeds-chivda": {
    "description": "Pumpkin seeds chivda is a crunchy Indian trail mix of pumpkin seeds, peanuts and poha tossed in Anveshan wood-pressed groundnut oil for a guilt-free everyday snack.",
    "intro": "Pumpkin seeds chivda is a light, crunchy Indian trail mix made by tempering thin poha with pumpkin seeds, peanuts and curry leaves in a little oil until crisp. This version is tossed in nutty Anveshan wood-pressed groundnut oil with mustard seeds, green chilli and turmeric, then balanced with a pinch of unrefined khandsari. It makes about 6 servings of a nutritious, grab-and-go namkeen that stays fresh in a jar for everyday munching.",
    "faqs": [
      {
        "question": "How many servings does this pumpkin seeds chivda make?",
        "answer": "It makes around 6 servings, with 10 minutes of prep and about 15 minutes of cooking."
      },
      {
        "question": "Is pumpkin seeds chivda a healthy snack?",
        "answer": "It is a lighter, roasted-style namkeen made with pumpkin seeds, peanuts and poha tossed in heart-friendly Anveshan groundnut oil, rather than deep-fried."
      },
      {
        "question": "How long does homemade chivda stay fresh?",
        "answer": "Once fully cooled, store it in an airtight jar where it keeps crunchy for everyday snacking; cooling completely before sealing is key."
      },
      {
        "question": "Why add a pinch of khandsari to chivda?",
        "answer": "A teaspoon of unrefined Anveshan khandsari gives the classic sweet-salty-spicy balance that makes chivda moreish."
      }
    ],
    "tips": [
      "Use thin poha and roast it well so the chivda turns light and crunchy rather than chewy.",
      "Temper the spices in the groundnut oil until fragrant before adding the poha to coat it evenly.",
      "Cool the chivda completely before storing so it stays crisp in the jar."
    ]
  },
  "quinoa-veg-bowl": {
    "description": "A vibrant quinoa veg bowl with chickpeas, avocado and crisp vegetables in a bright lemon dressing made with fruity Anveshan olive oil and a touch of raw honey.",
    "intro": "A quinoa veg bowl is a wholesome one-bowl meal of fluffy cooked quinoa layered with chickpeas, cucumber, cherry tomatoes and avocado, all tossed in a zesty dressing. This version whisks the dressing with cold-pressed Anveshan olive oil for a smooth, peppery finish and a spoon of raw honey to balance the lemon's tang. High in plant protein and fibre, it comes together in about 35 minutes and serves four as a light lunch or dinner.",
    "faqs": [
      {
        "question": "How do I keep the quinoa from turning mushy?",
        "answer": "Rinse the quinoa well, then cook 1 cup with just under two parts water until the grains turn translucent, and fluff with a fork. Letting it rest off the heat before tossing with the olive oil dressing keeps every grain separate."
      },
      {
        "question": "Can I make this quinoa bowl ahead of time?",
        "answer": "Yes, the quinoa, chickpeas and chopped vegetables keep well for a day in the fridge. Add the sliced avocado and the Anveshan olive oil and honey dressing just before serving so nothing goes soggy."
      },
      {
        "question": "Why use olive oil in the dressing?",
        "answer": "Cold-pressed Anveshan olive oil gives the dressing a smooth, gently peppery body that lets the lemon and honey shine, while keeping the bowl heart-friendly."
      },
      {
        "question": "How many people does this recipe serve?",
        "answer": "This quinoa veg bowl serves 4 and needs about 15 minutes of prep plus 20 minutes of cooking."
      }
    ],
    "tips": [
      "Toast the rinsed quinoa in a dry pan for a minute before boiling for a nuttier flavour.",
      "Whisk the Anveshan honey into the lemon juice first so it dissolves before adding the olive oil.",
      "Add the avocado last and squeeze over extra lemon to stop it browning."
    ]
  },
  "ragda-pattice": {
    "description": "Crisp potato pattice shallow-fried in Anveshan groundnut oil, smothered in a warm white-pea ragda and tangy chutneys balanced with jaggery powder, the classic Mumbai street chaat.",
    "intro": "Ragda pattice is a beloved Maharashtrian street starter where crisp shallow-fried potato patties (pattice) are smothered in a warm, soupy white-pea curry (ragda) and finished with chutneys, onion and sev. Here the patties are shallow-fried in wholesome Anveshan groundnut oil for a clean, golden crust, while a pinch of mineral-rich Anveshan jaggery powder rounds out the tangy tamarind chutney. With about 30 minutes prep and 30 minutes cooking, it serves four as a hearty chaat plate.",
    "faqs": [
      {
        "question": "What is the difference between ragda and pattice?",
        "answer": "Ragda is the warm, lightly spiced curry of soaked dried white peas, while pattice are the shallow-fried mashed-potato patties. Together they make this popular chaat, with the patties crisped in Anveshan groundnut oil."
      },
      {
        "question": "Do I need to soak the white peas in advance?",
        "answer": "Yes, the dried white peas need soaking before cooking so the ragda turns soft and creamy. Plan for the soak on top of the recipe's 30 minutes prep and 30 minutes cook time."
      },
      {
        "question": "How do I stop the pattice from breaking while frying?",
        "answer": "Bind the mashed potato with a little cornflour and shallow-fry on a steady medium heat in Anveshan groundnut oil, turning only once the base is set and golden."
      },
      {
        "question": "Why add jaggery powder to the chutney?",
        "answer": "A pinch of Anveshan jaggery powder balances the sourness of the tamarind chutney with a natural caramel sweetness, the way it is done traditionally instead of refined sugar."
      }
    ],
    "tips": [
      "Use floury boiled potatoes and mash them while warm for smooth, crack-free pattice.",
      "Keep the ragda slightly loose and hot so it soaks into the patties when served.",
      "Assemble each plate just before eating so the pattice stay crisp under the ragda."
    ]
  },
  "rajma-masala": {
    "description": "Creamy red kidney beans simmered in a full-bodied onion-tomato gravy tempered with pungent Anveshan kachi ghani mustard oil for an authentic North Indian rajma.",
    "intro": "Rajma masala is a North Indian comfort curry of red kidney beans (rajma) slow-simmered in a thick, spiced onion-tomato gravy, traditionally served with steamed rice. This version tempers the masala in pungent Anveshan kachi ghani mustard oil for that authentic dhaba-style punch, with a finishing spoon of bilona ghee for richness. It serves four and takes about 15 minutes of prep and 40 minutes of cooking, not counting the bean soak.",
    "faqs": [
      {
        "question": "Should I soak rajma before cooking?",
        "answer": "Yes, soak the 1.5 cups of kidney beans for several hours or overnight so they cook soft and creamy. After soaking, the curry itself takes about 40 minutes."
      },
      {
        "question": "Why is mustard oil used for rajma?",
        "answer": "Cold-pressed Anveshan kachi ghani mustard oil gives rajma masala its signature sharp, full-bodied North Indian flavour that neutral oils cannot match. Heat it until it just smokes to mellow the pungency before adding the spices."
      },
      {
        "question": "How can I make the gravy creamier?",
        "answer": "Mash a few cooked beans into the gravy and finish with a spoon of Anveshan bilona ghee, which thickens the masala and adds a rich aroma."
      },
      {
        "question": "How many does this rajma masala serve?",
        "answer": "This recipe serves 4 and pairs perfectly with plain rice or jeera rice."
      }
    ],
    "tips": [
      "Smoke the Anveshan mustard oil lightly before tempering to tame its raw sharpness.",
      "Cook the onion-tomato masala until the oil separates for a deeper colour and flavour.",
      "Simmer the beans low and slow so they stay whole yet creamy inside."
    ]
  },
  "rava-kesari": {
    "description": "A glossy South Indian rava kesari (semolina pudding) cooked in Anveshan bilona ghee, infused with pure saffron and sweetened with unrefined khandsari, studded with ghee-fried cashews.",
    "intro": "Rava kesari is a fragrant South Indian semolina pudding where roasted rava is cooked with water, sweetener and ghee into a soft, glossy halwa, gilded with saffron. This version is cooked in nutty Anveshan bilona ghee, infused with strands of pure Anveshan saffron and sweetened with unrefined Anveshan khandsari instead of white sugar. Quick to make in about 25 minutes, it serves four and is a classic festive sweet finished with ghee-fried cashews and raisins.",
    "faqs": [
      {
        "question": "How do I keep rava kesari from going lumpy?",
        "answer": "Roast the rava gently in Anveshan ghee first, then add hot water in a steady stream while stirring continuously so it absorbs evenly without lumps."
      },
      {
        "question": "How much saffron does this recipe need?",
        "answer": "Just a pinch of Anveshan saffron, soaked in a little warm milk or water, is enough to give the kesari its golden colour and fragrance for 4 servings."
      },
      {
        "question": "Can I use khandsari instead of regular sugar?",
        "answer": "Yes, this recipe uses 1 cup of unrefined Anveshan khandsari in place of refined sugar, which dissolves smoothly and gives a clean, mellow sweetness."
      },
      {
        "question": "How long does rava kesari take to make?",
        "answer": "It needs about 5 minutes of prep and 20 minutes of cooking, making it a quick festive dessert."
      }
    ],
    "tips": [
      "Keep the water-to-rava ratio generous so the kesari stays soft and does not dry out.",
      "Fry the cashews and raisins in Anveshan ghee first, then stir them in at the end.",
      "Add the khandsari only after the rava has absorbed the water to avoid stickiness."
    ]
  },
  "roasted-makhana-masala": {
    "description": "Light, airy fox nuts (makhana) slow-roasted in Anveshan bilona ghee and tossed with warm spices and moringa powder for an irresistibly crunchy, protein-rich Indian snack.",
    "intro": "Roasted makhana masala is a guilt-free Indian snack of phool makhana (fox nuts) slow-roasted until impossibly crisp and tossed with warm spices. Roasting in Anveshan bilona ghee instead of oil makes them shatteringly light with a buttery finish, while a spoon of Anveshan moringa powder adds a quiet nutrient boost. Ready in about 20 minutes, it serves four as a wholesome tea-time or anytime munch.",
    "faqs": [
      {
        "question": "How do I make makhana really crunchy?",
        "answer": "Roast the fox nuts slowly on a low-medium flame in Anveshan ghee for around 15 minutes, stirring often, until they snap crisp. Cooling them fully locks in the crunch."
      },
      {
        "question": "Is roasted makhana a healthy snack?",
        "answer": "Makhana is naturally light and this version is roasted, not fried, in Anveshan bilona ghee, with a teaspoon of Anveshan moringa powder folded in. It makes a wholesome, protein-rich snack."
      },
      {
        "question": "How long does roasted makhana stay crisp?",
        "answer": "Once fully cooled, store it in an airtight jar for a few days. Re-crisp briefly in a dry pan if it softens."
      },
      {
        "question": "How much makhana does this recipe use?",
        "answer": "It uses 3 cups of fox nuts roasted in 2 tablespoons of Anveshan ghee, serving 4."
      }
    ],
    "tips": [
      "Roast on a steady low flame so the makhana crisps without browning unevenly.",
      "Toss the spices and Anveshan moringa powder in at the very end off the heat so they coat without burning.",
      "Cool completely before storing to keep the fox nuts crunchy."
    ]
  },
  "rose-lassi": {
    "description": "A dreamy blush-pink rose lassi blending chilled curd with fragrant rose and saffron, naturally sweetened with Anveshan wild forest honey and topped with pistachios.",
    "intro": "Rose lassi is a chilled, blush-pink yogurt drink blended with rose and a hint of cardamom, then topped with pistachios. This no-cook version sweetens the curd with floral Anveshan wild forest honey instead of refined sugar and adds a pinch of Anveshan saffron for colour and aroma. It takes just 10 minutes to whip up and serves four, making it a refreshing summer cooler or festive treat.",
    "faqs": [
      {
        "question": "How do I make rose lassi thick and creamy?",
        "answer": "Use chilled thick curd and blend it well with ice; add just a little water or milk to reach a pourable consistency. A spoon of Anveshan honey sweetens it without thinning it down."
      },
      {
        "question": "Can I sweeten rose lassi with honey instead of sugar?",
        "answer": "Yes, this recipe uses 3 tablespoons of Anveshan wild forest honey, which blends smoothly into chilled curd and adds a gentle floral sweetness."
      },
      {
        "question": "What gives rose lassi its colour?",
        "answer": "Rose syrup or rose water provides the flavour, and a pinch of Anveshan saffron adds a natural golden-pink warmth and fragrance to each glass."
      },
      {
        "question": "How many servings does this make?",
        "answer": "This rose lassi serves 4 and comes together in about 10 minutes with no cooking."
      }
    ],
    "tips": [
      "Chill the curd and glasses beforehand for the most refreshing lassi.",
      "Soak the Anveshan saffron in a teaspoon of warm milk to release its colour before blending.",
      "Adjust the Anveshan honey to taste, since rose syrup can already be sweet."
    ]
  },
  "sabudana-khichdi": {
    "description": "Fluffy, non-sticky sabudana khichdi tempered in fragrant Anveshan desi ghee with peanuts, cumin and green chilli, a perfect vrat-friendly fasting dish.",
    "intro": "Sabudana khichdi is a popular Indian fasting (vrat) dish of soaked tapioca pearls tossed with potato, roasted peanuts and cumin until light and fluffy. Cooking it in fragrant Anveshan desi ghee keeps the pearls separate and non-sticky while lending a rich aroma, with a little Anveshan groundnut oil for the tempering. Ready in about 30 minutes, it serves four and works for vrat days or a wholesome breakfast.",
    "faqs": [
      {
        "question": "How do I stop sabudana from turning sticky?",
        "answer": "Soak the pearls until just softened and drained well, then cook them in Anveshan desi ghee on a gentle heat without over-stirring. This keeps each pearl separate and fluffy."
      },
      {
        "question": "Is sabudana khichdi good for vrat?",
        "answer": "Yes, it is a classic vrat recipe made with rock salt (sendha namak), peanuts and potato, cooked in Anveshan desi ghee, making it ideal for fasting days."
      },
      {
        "question": "Why use ghee instead of oil for sabudana khichdi?",
        "answer": "Anveshan desi ghee gives the khichdi a rich aroma and helps keep the tapioca pearls glossy and non-sticky, better than plain oil."
      },
      {
        "question": "How long does it take to make?",
        "answer": "Apart from soaking the sabudana, it needs about 15 minutes prep and 15 minutes cooking, and serves 4."
      }
    ],
    "tips": [
      "Drain the soaked sabudana thoroughly so the khichdi does not clump.",
      "Coarsely crush the roasted peanuts and fold them in for crunch and body.",
      "Finish with a squeeze of lemon and a little Anveshan ghee for a glossy, aromatic plate."
    ]
  },
  "sabudana-vada": {
    "description": "Crispy-outside, soft-inside sabudana vada of soaked sago, potato and crushed peanuts, fried golden in cold-pressed Anveshan groundnut oil, a favourite vrat fasting snack.",
    "intro": "Sabudana vada is a popular Indian fasting snack of soaked sago pearls mixed with mashed potato, crushed peanuts and green chilli, shaped into patties and fried until golden. Frying in cold-pressed Anveshan groundnut oil gives them a crisp, clean crust while a little Anveshan bilona ghee enriches the mix. They take about 20 minutes to fry (plus soaking) and serve four as a vrat-friendly tea-time treat.",
    "faqs": [
      {
        "question": "How do I keep sabudana vada from falling apart while frying?",
        "answer": "Drain the soaked sago well and bind it with mashed potato and crushed peanuts so the mixture holds. Fry in well-heated Anveshan groundnut oil and avoid disturbing the vadas until the base sets."
      },
      {
        "question": "Why do my sabudana vadas absorb too much oil?",
        "answer": "Oil that is not hot enough makes them greasy. Heat the Anveshan groundnut oil to a steady medium-high before slipping the vadas in so they crisp quickly."
      },
      {
        "question": "Can I make sabudana vada for vrat?",
        "answer": "Yes, made with rock salt (sendha namak), potato and peanuts, this is a classic vrat snack, fried in Anveshan groundnut oil with a touch of bilona ghee."
      },
      {
        "question": "How many vadas does this recipe make?",
        "answer": "The recipe serves 4, with about 20 minutes prep and 20 minutes frying after the sago has soaked."
      }
    ],
    "tips": [
      "Soak the sabudana until a pearl mashes easily between your fingers for the right texture.",
      "Add the coarsely crushed peanuts for crunch and to help bind the mixture.",
      "Test one vada first; if it disintegrates, add a little more mashed potato to bind."
    ]
  },
  "saffron-baked-yogurt": {
    "description": "A silky baked yogurt dessert (bhapa-doi style) set with hung curd and naturally sweetened with golden Anveshan honey, stained amber and fragrant with pure Anveshan saffron.",
    "intro": "Saffron baked yogurt is a modern, melt-in-the-mouth dessert in the style of bhapa doi, where hung curd and milk are sweetened and gently baked until just set and silky. This version skips condensed-milk sugar in favour of golden Anveshan honey and uses threads of pure Anveshan saffron to stain it amber and perfume every spoonful. It needs about 15 minutes prep and 30 minutes baking, and serves four chilled.",
    "faqs": [
      {
        "question": "How do I get baked yogurt to set silky-smooth?",
        "answer": "Whisk the hung curd and evaporated milk until lump-free, then bake gently and chill thoroughly. A low, even heat sets it without splitting or graininess."
      },
      {
        "question": "Can I sweeten baked yogurt with honey instead of condensed milk?",
        "answer": "Yes, this recipe uses 4 tablespoons of Anveshan honey for a natural sweetness that lets the saffron come through, instead of sugary condensed milk."
      },
      {
        "question": "How much saffron should I add?",
        "answer": "A pinch of Anveshan saffron, soaked briefly in a little warm milk, gives the baked yogurt its amber colour and fragrance across 4 servings."
      },
      {
        "question": "Should I serve it warm or chilled?",
        "answer": "Chill the baked yogurt fully before serving so it firms into a silky set and the saffron flavour deepens."
      }
    ],
    "tips": [
      "Use thick hung curd so the dessert sets firmly without weeping.",
      "Bloom the Anveshan saffron in warm milk first to draw out its full colour and aroma.",
      "Bake in a water bath for the gentlest, creamiest set."
    ]
  },
  "sattu-ladoo": {
    "description": "A rustic Bihari sattu ladoo of roasted gram flour rolled into melt-in-the-mouth laddus, sweetened with Anveshan jaggery powder and bound with rich Anveshan bilona ghee.",
    "intro": "Sattu ladoo is a rustic Bihari sweet where roasted gram flour (sattu) is bound with ghee and jaggery and rolled into melt-in-the-mouth laddus. This version uses protein-packed Anveshan sattu as the base, mineral-rich Anveshan jaggery powder to sweeten it the traditional way, and Anveshan bilona ghee to bind every bite. Quick to make in about 30 minutes, it yields a wholesome, energy-dense sweet for four.",
    "faqs": [
      {
        "question": "Why is sattu a good base for ladoos?",
        "answer": "Anveshan sattu is roasted gram flour that is naturally protein-rich and nutty, giving these ladoos sustained energy and a satisfying texture without refined flour."
      },
      {
        "question": "How do I bind sattu ladoos so they hold shape?",
        "answer": "Warm the Anveshan jaggery powder slightly and mix it with the Anveshan bilona ghee and sattu while still warm, then roll quickly; the ghee and jaggery set as they cool to hold the laddu together."
      },
      {
        "question": "Can I use jaggery instead of sugar in sattu ladoo?",
        "answer": "Yes, this recipe uses 0.75 cup of Anveshan jaggery powder, the traditional sweetener, which pairs naturally with the earthy sattu."
      },
      {
        "question": "How long do sattu ladoos take to make?",
        "answer": "They need about 15 minutes prep and 15 minutes cooking, and the recipe serves 4."
      }
    ],
    "tips": [
      "Lightly roast the sattu in Anveshan ghee to deepen its nutty aroma before binding.",
      "Roll the ladoos while the mixture is still warm so they shape easily.",
      "Add the chopped almonds and cashews for crunch and extra richness."
    ]
  },
  "sattu-sharbat": {
    "description": "A cooling, protein-rich Bihari sattu sharbat made with Anveshan sattu and lightly sweetened with mineral-rich Anveshan jaggery powder, naturally hydrating and gut-friendly.",
    "intro": "Sattu sharbat is a cooling summer drink from Bihar made by whisking roasted gram flour (sattu) into cold water with lemon, cumin and black salt. This version uses protein-rich Anveshan sattu and lightly sweetens it with mineral-rich Anveshan jaggery powder instead of sugar, making it naturally hydrating and gut-friendly. It is a no-cook drink ready in about 10 minutes and serves four on a hot day.",
    "faqs": [
      {
        "question": "Is sattu sharbat good for summer?",
        "answer": "Yes, Anveshan sattu is known for being cooling and hydrating, and this sweet-savoury sharbat with lemon and cumin is a classic way to beat the summer heat."
      },
      {
        "question": "How do I stop sattu from forming lumps in the drink?",
        "answer": "Add a little cold water to the Anveshan sattu first and whisk into a smooth paste, then top up with the rest of the water and the Anveshan jaggery powder."
      },
      {
        "question": "Can I make a sweet version of sattu sharbat?",
        "answer": "Yes, simply lean on the 4 tablespoons of Anveshan jaggery powder and skip the black salt and cumin for a sweet drink instead of the tangy-savoury one."
      },
      {
        "question": "How many glasses does this recipe make?",
        "answer": "It serves 4 and takes about 10 minutes with no cooking required."
      }
    ],
    "tips": [
      "Whisk the Anveshan sattu into a smooth slurry before adding the rest of the water.",
      "Use very cold water and serve immediately for the most refreshing sharbat.",
      "Balance the Anveshan jaggery powder with lemon and black salt for that classic tangy-sweet taste."
    ]
  },
  "sesame-oil-gobi-stir-fry": {
    "description": "A quick, smoky cauliflower (gobi) stir-fry tossed in aromatic Anveshan sesame oil with garlic, ginger and crunchy peppers for an irresistible Indo-Asian flavour.",
    "intro": "Sesame oil gobi stir-fry is a quick Indo-Asian dish of cauliflower florets and bell peppers tossed on high heat with garlic, ginger and spring onions. Cooking it in toasty, nutty Anveshan sesame oil gives the gobi its signature smoky depth, while a spoon of Anveshan wild forest honey balances the soy with gentle sweetness. Ready in about 25 minutes, it serves four as a side or a light main with rice.",
    "faqs": [
      {
        "question": "How do I get the cauliflower charred but still crunchy?",
        "answer": "Stir-fry the florets on high heat in Anveshan sesame oil without overcrowding the pan, tossing quickly so they catch colour while staying crisp-tender."
      },
      {
        "question": "Why use sesame oil for this stir-fry?",
        "answer": "Anveshan sesame oil has a toasty, nutty aroma that gives the gobi an authentic Indo-Asian depth that neutral oils cannot deliver."
      },
      {
        "question": "What does the honey do in the recipe?",
        "answer": "A tablespoon of Anveshan wild forest honey balances the salty soy sauce and pepper, giving the stir-fry a glossy sweet-savoury finish."
      },
      {
        "question": "How many does this gobi stir-fry serve?",
        "answer": "It serves 4 and takes about 10 minutes prep and 15 minutes cooking."
      }
    ],
    "tips": [
      "Cut the cauliflower into even small florets so they cook through quickly on high heat.",
      "Add the garlic and ginger to the hot Anveshan sesame oil for just a few seconds to avoid burning.",
      "Stir in the Anveshan honey and soy at the end so the glaze coats without scorching."
    ]
  },
  "shahi-tukda": {
    "description": "A regal Mughlai shahi tukda of bread fried golden in Anveshan bilona ghee, soaked in saffron syrup and smothered in rabri, sweetened with khandsari and pure Anveshan saffron.",
    "intro": "Shahi tukda is a regal Mughlai dessert where bread slices are fried golden, soaked in fragrant sugar syrup and smothered in thickened, reduced milk (rabri). This version fries the bread in nutty Anveshan bilona ghee, sweetens the syrup and rabri with unrefined Anveshan khandsari, and perfumes both with strands of pure Anveshan saffron. It takes about 45 minutes in all and serves four for a festive, indulgent finish.",
    "faqs": [
      {
        "question": "How do I make shahi tukda bread crisp and not soggy?",
        "answer": "Fry the bread slices in Anveshan bilona ghee until evenly golden and crisp, then dip them only briefly in the warm saffron syrup so they soak flavour without going limp."
      },
      {
        "question": "Can I sweeten shahi tukda with khandsari instead of sugar?",
        "answer": "Yes, this recipe uses 1 cup of unrefined Anveshan khandsari for both the syrup and the rabri, giving a clean sweetness in place of refined sugar."
      },
      {
        "question": "How do I make the rabri thick?",
        "answer": "Simmer the full-fat milk slowly until it reduces and thickens, then flavour it with cardamom and a pinch of Anveshan saffron for colour and aroma."
      },
      {
        "question": "How many servings does shahi tukda make?",
        "answer": "It serves 4 and needs about 15 minutes prep and 30 minutes cooking."
      }
    ],
    "tips": [
      "Fry the bread in Anveshan ghee over medium heat for an even golden crisp.",
      "Bloom the Anveshan saffron in warm milk to colour both the syrup and the rabri.",
      "Soak the fried bread in syrup briefly, just before assembling, to keep some crunch."
    ]
  },
  "spicy-peanut-soba-noodle-salad": {
    "description": "Spicy peanut soba noodle salad with fresh hand-cut khapli atta noodles tossed cold in a fiery sesame-peanut dressing made with Anveshan sesame oil and raw honey.",
    "intro": "Spicy peanut soba noodle salad is a chilled noodle bowl where fresh noodles are hand-cut and tossed with crunchy vegetables in a bold peanut-soy dressing. Here the noodles are rolled from nutty Anveshan khapli atta and a little ghee, giving a wholesome, easy-to-digest base instead of refined flour. The dressing leans on toasty Anveshan sesame oil and a touch of raw Anveshan honey to balance the heat, making each forkful nutty, tangy and lightly sweet.",
    "faqs": [
      {
        "question": "How long does it take to make spicy peanut soba noodle salad?",
        "answer": "About 40 minutes prep and 10 minutes cooking, since the khapli atta noodles are hand-cut from fresh dough. It serves 4 as a light main or side."
      },
      {
        "question": "Can I make the noodles healthier than regular soba?",
        "answer": "Yes, rolling them from Anveshan khapli atta with a spoon of Anveshan ghee gives a nutty, fibre-rich noodle that is gentler on digestion than refined-flour noodles."
      },
      {
        "question": "Is this noodle salad served hot or cold?",
        "answer": "It is served cold, which makes it perfect for lunchboxes and summer meals; the peanut dressing built on Anveshan sesame oil and honey clings beautifully to the chilled noodles."
      },
      {
        "question": "How do I balance the spice in the dressing?",
        "answer": "A tablespoon and a half of raw Anveshan honey rounds off the soy, lime and red chilli, so adjust the chilli to taste and let the honey mellow the heat."
      }
    ],
    "tips": [
      "Rest the khapli atta dough for 15-20 minutes before rolling so the fresh noodles cut cleanly and hold their shape.",
      "Rinse the cooked noodles in cold water and toss with a little Anveshan sesame oil to stop them clumping.",
      "Dress the salad just before serving so the vegetables stay crunchy and the noodles do not soak up all the dressing."
    ]
  },
  "spicy-tomato-chutney": {
    "description": "Spicy and tasty tomato chutney tempered in nutty Anveshan groundnut oil and balanced with mineral-rich Anveshan jaggery powder. Perfect with dosa, idli or as a sandwich spread.",
    "intro": "Spicy tomato chutney is a tangy South-Indian-style relish of tomatoes, garlic and dried red chillies cooked down and finished with a crackling tempering. This version is tempered in nutty Anveshan groundnut oil and gently balanced with mineral-rich Anveshan jaggery powder instead of refined sugar, so the tang and heat sit on a clean, rounded base. It comes together in about 30 minutes and serves 8, making it ideal alongside dosa and idli or as a sandwich spread.",
    "faqs": [
      {
        "question": "What goes well with spicy tomato chutney?",
        "answer": "It pairs beautifully with dosa, idli and uttapam, and also works as a tangy sandwich spread. This recipe makes enough for around 8 servings."
      },
      {
        "question": "Why add jaggery powder to tomato chutney?",
        "answer": "A tablespoon of Anveshan jaggery powder balances the sharp acidity of the five tomatoes and the heat of the dried red chillies, giving a smoother, more rounded flavour than sugar."
      },
      {
        "question": "Which oil is best for the tempering?",
        "answer": "Anveshan groundnut oil is ideal as its nutty, clean taste carries the mustard seeds, urad dal and curry leaves without overpowering the tomatoes."
      },
      {
        "question": "How long does this chutney keep?",
        "answer": "Cooked down well and stored in a clean airtight jar in the fridge, it keeps for a few days; the groundnut oil tempering helps preserve the flavour."
      }
    ],
    "tips": [
      "Cook the tomatoes until they break down completely and the oil starts to separate for the richest flavour.",
      "Roast the dried red chillies and garlic gently so they turn aromatic without burning and going bitter.",
      "Add the Anveshan jaggery powder towards the end and taste, adjusting to balance the tomatoes' natural tartness."
    ]
  },
  "strawberry-lemonade-cookies": {
    "description": "Soft, crackly strawberry lemonade cookies swirling tangy lemon and sweet strawberry dough, made with cold-pressed Anveshan sunflower oil and dusted in finely powdered Anveshan khandsari.",
    "intro": "Strawberry lemonade cookies are soft, crackly sugar cookies that marble tangy lemon dough with sweet strawberry dough, then get rolled in a sugary coating. This version swaps refined vegetable oil for cold-pressed Anveshan sunflower oil and uses finely powdered Anveshan khandsari in place of confectioner's sugar, for a cleaner bake. With 25 minutes prep and just 13 minutes in the oven, the recipe yields a generous 24 cookies.",
    "faqs": [
      {
        "question": "How many cookies does this recipe make?",
        "answer": "It makes about 24 soft strawberry lemonade cookies, with roughly 25 minutes of prep and 13 minutes of baking."
      },
      {
        "question": "Why use sunflower oil instead of butter in these cookies?",
        "answer": "Cold-pressed Anveshan sunflower oil keeps the crumb soft and tender and is a lighter, cleaner choice than refined vegetable oil, while letting the lemon and strawberry flavours shine."
      },
      {
        "question": "Can I coat the cookies without confectioner's sugar?",
        "answer": "Yes, roll the dough balls in finely powdered Anveshan khandsari instead, which gives the same crackly, sugar-dusted finish from an unrefined sweetener."
      },
      {
        "question": "How do I get the two-tone swirl?",
        "answer": "Keep the lemon and strawberry doughs separate, then press portions of each together before rolling so they marble rather than fully blend."
      }
    ],
    "tips": [
      "Powder the Anveshan khandsari very finely so it coats the cookies evenly and gives a clean crackle.",
      "Do not overbake; pull the cookies at 13 minutes while still soft in the centre so they stay chewy.",
      "Chill the doughs briefly if they feel sticky, making them easier to portion and swirl together."
    ]
  },
  "sugar-cookie-dough-protein-bites": {
    "description": "No-bake sugar cookie dough protein bites packed with Anveshan protein atta, bound with bilona ghee and sweetened with unrefined Anveshan khandsari. Egg-free and ready in 15 minutes.",
    "intro": "Sugar cookie dough protein bites are no-bake, edible cookie-dough balls that taste like classic sugar-cookie dough but pack a protein punch. They are built on heat-treated Anveshan protein atta, bound with softened Anveshan bilona ghee and sweetened with unrefined Anveshan khandsari instead of white sugar, with no eggs and no baking involved. Ready in about 15 minutes, the recipe rolls into 12 wholesome, high-protein bites.",
    "faqs": [
      {
        "question": "Are these protein bites safe to eat raw?",
        "answer": "Yes, they are no-bake and use heat-treated Anveshan protein atta with no eggs, so the dough is meant to be eaten as-is."
      },
      {
        "question": "How many bites does the recipe make?",
        "answer": "It makes about 12 bites and takes roughly 15 minutes to prepare, with no cooking time."
      },
      {
        "question": "What makes these bites high in protein?",
        "answer": "The base is 1.5 cups of Anveshan protein atta, a protein-enriched flour, which gives more muscle-friendly protein than regular flour while staying egg-free."
      },
      {
        "question": "How do I bind the dough if it feels dry?",
        "answer": "Add the milk a tablespoon at a time along with the softened Anveshan bilona ghee until the dough just comes together and rolls smoothly."
      }
    ],
    "tips": [
      "Use protein atta that is labelled heat-treated so the no-bake dough is safe to eat straight away.",
      "Soften the Anveshan bilona ghee to room temperature so it blends smoothly with the khandsari.",
      "Chill the rolled bites for 20-30 minutes to firm them up before serving."
    ]
  },
  "tandoori-mushroom-tikka": {
    "description": "Tandoori mushroom tikka of juicy button mushrooms marinated in spiced yogurt sharpened with Anveshan mustard oil and a touch of Anveshan honey, then char-grilled for a smoky-sweet glaze.",
    "intro": "Tandoori mushroom tikka is a vegetarian take on the classic tandoori starter, where button mushrooms are marinated in spiced yogurt and char-grilled until smoky. The marinade is sharpened with pungent Anveshan mustard oil for authentic tandoori depth and lifted with a touch of raw Anveshan honey for a smoky-sweet glaze. With 25 minutes prep and 15 minutes of grilling, it serves 4 as a quick, modern starter.",
    "faqs": [
      {
        "question": "How long does tandoori mushroom tikka take to make?",
        "answer": "Around 25 minutes to prep and marinate, plus 15 minutes to grill, serving 4 people."
      },
      {
        "question": "Why use mustard oil in the marinade?",
        "answer": "Pungent Anveshan mustard oil gives the yogurt marinade its sharp, authentic tandoori character, much like a traditional tandoor preparation."
      },
      {
        "question": "What does the honey do in this tikka?",
        "answer": "A tablespoon of Anveshan honey adds a smoky-sweet note and helps the marinade caramelise into a glossy glaze as the mushrooms char."
      },
      {
        "question": "Can I make this without a tandoor?",
        "answer": "Yes, char-grill the marinated mushrooms on a grill pan, in an oven or over an open flame; the besan in the marinade helps it cling and crisp up."
      }
    ],
    "tips": [
      "Wipe the mushrooms clean rather than washing them so they char instead of steaming on the grill.",
      "Let them marinate for the full prep time so the mustard oil and spices penetrate the mushrooms.",
      "Brush a little extra Anveshan honey on while grilling for a deeper, glossier glaze."
    ]
  },
  "til-gud-ladoo": {
    "description": "Til gud ladoo are traditional winter sesame ladoos bound with mineral-rich Anveshan jaggery powder instead of refined sugar, made for Makar Sankranti. Crunchy and naturally sweet.",
    "intro": "Til gud ladoo are crunchy winter sesame sweets where roasted til is bound together with melted jaggery and rolled into bite-sized balls, traditionally made for Makar Sankranti. This version uses mineral-rich Anveshan jaggery powder in place of refined sugar and a touch of Anveshan ghee for a clean finish. With 15 minutes prep and 15 minutes cooking, it makes a wholesome, naturally sweet treat for 4.",
    "faqs": [
      {
        "question": "Why are til gud ladoos made in winter?",
        "answer": "Sesame and jaggery are warming, so these ladoos are a traditional Makar Sankranti sweet eaten through the cold months; Anveshan jaggery powder keeps them naturally sweet without refined sugar."
      },
      {
        "question": "How long do til gud ladoos take to make?",
        "answer": "About 15 minutes of prep and 15 minutes of cooking, yielding enough for 4 servings of crunchy ladoos."
      },
      {
        "question": "Why use jaggery powder instead of sugar?",
        "answer": "Mineral-rich Anveshan jaggery powder is the traditional sweetener for til gud ladoo and gives a deep caramel flavour that refined sugar cannot match."
      },
      {
        "question": "How do I stop the ladoos from being too hard?",
        "answer": "Do not overcook the jaggery; melt it just until it forms a soft consistency, add a little Anveshan ghee, and roll the ladoos while the mixture is still warm."
      }
    ],
    "tips": [
      "Roast the sesame seeds on low heat until they just start to pop for the nuttiest crunch.",
      "Melt the Anveshan jaggery powder gently and test a drop in water; it should set soft, not brittle.",
      "Grease your palms with a little Anveshan ghee and shape the ladoos while the mixture is warm and pliable."
    ]
  },
  "tomato-black-pepper-soup": {
    "description": "Tomato and black pepper soup with the base sauteed in Anveshan olive oil, finished with a glossy spoon of Anveshan ghee and a pinch of Anveshan khandsari to round off the tang.",
    "intro": "Tomato and black pepper soup is a warming, peppery bowl of ripe tomatoes simmered with onion and garlic and blended smooth. Here the base is sauteed in fruity Anveshan olive oil, finished with a glossy spoon of Anveshan ghee, and balanced with a pinch of unrefined Anveshan khandsari to round off the tomatoes' tang. Ready in about 35 minutes, it serves 4 as a comforting starter.",
    "faqs": [
      {
        "question": "How long does this tomato black pepper soup take?",
        "answer": "About 10 minutes prep and 25 minutes cooking, serving 4 as a warming starter."
      },
      {
        "question": "What gives the soup its richness without butter?",
        "answer": "The base is sauteed in Anveshan olive oil and finished with a glossy spoon of Anveshan ghee, giving body and aroma in place of butter."
      },
      {
        "question": "Why add khandsari to a savoury soup?",
        "answer": "Just a teaspoon of unrefined Anveshan khandsari softens the natural acidity of the eight ripe tomatoes, balancing the cracked black pepper."
      },
      {
        "question": "Can I make it creamy?",
        "answer": "Yes, this recipe stirs in fresh cream and basil to finish; for a lighter bowl you can reduce the cream and let the Anveshan ghee carry the richness."
      }
    ],
    "tips": [
      "Use ripe, deep-red tomatoes for natural sweetness and a vibrant colour.",
      "Crack the black pepper fresh and add some at the end so its aroma stays sharp.",
      "Stir the spoon of Anveshan ghee in right before serving for a glossy, fragrant finish."
    ]
  },
  "turmeric-rice": {
    "description": "Simple, vibrant turmeric rice made with Anveshan bilona ghee and tempered with cumin and onion. This golden anti-inflammatory rice is ready in 20 minutes and pairs with any dal or curry.",
    "intro": "Turmeric rice is a vibrant golden rice dish where basmati is tempered with cumin, onion and turmeric for a warm, fragrant side. This version blooms the tempering in wood-pressed Anveshan groundnut oil and finishes with aromatic Anveshan bilona ghee, giving the rice a glossy richness. Ready in about 20 minutes of cooking and serving 4, it pairs perfectly with any dal or curry.",
    "faqs": [
      {
        "question": "How quickly can I make turmeric rice?",
        "answer": "It cooks in around 20 minutes with 10 minutes of prep, serving 4, which makes it an easy everyday side."
      },
      {
        "question": "What does turmeric rice go with?",
        "answer": "Its mild, golden flavour pairs with almost any dal or curry; the spoon of Anveshan ghee makes it rich enough to enjoy on its own too."
      },
      {
        "question": "Why use both groundnut oil and ghee?",
        "answer": "Anveshan groundnut oil blooms the cumin and onion cleanly, while a spoon of Anveshan bilona ghee added at the end lends aroma and a glossy finish."
      },
      {
        "question": "How do I keep the rice grains separate?",
        "answer": "Rinse the basmati well, use the recipe's measured 2.5 cups of water for 1.5 cups of rice, and fluff gently with a fork after cooking."
      }
    ],
    "tips": [
      "Rinse and lightly soak the basmati so the grains cook up long and separate.",
      "Bloom the turmeric briefly in the hot Anveshan groundnut oil to deepen its colour and flavour.",
      "Stir in the Anveshan bilona ghee at the end so its aroma stays fresh and fragrant."
    ]
  },
  "turmeric-thandai": {
    "description": "Turmeric thandai is a golden twist on classic Indian thandai, cooling and aromatic, naturally sweetened with Anveshan honey and khandsari. Perfect for summer and festive occasions.",
    "intro": "Turmeric thandai is a golden, spiced milk drink that blends the classic thandai of almonds, fennel and cardamom with warming turmeric for an anti-inflammatory twist. This version is naturally sweetened with raw Anveshan wild forest honey and unrefined Anveshan khandsari instead of refined sugar, keeping it cooling and aromatic. Made with 15 minutes of prep and no cooking, it serves 4 and is perfect for summer and festive occasions.",
    "faqs": [
      {
        "question": "How is turmeric thandai different from regular thandai?",
        "answer": "It adds half a teaspoon of turmeric and a pinch of saffron to the classic nut-and-spice blend for a golden colour and anti-inflammatory edge, while staying cool and creamy."
      },
      {
        "question": "How is this thandai sweetened?",
        "answer": "With a mix of raw Anveshan wild forest honey and unrefined Anveshan khandsari rather than refined sugar, for a more natural sweetness."
      },
      {
        "question": "How long does it take and how many does it serve?",
        "answer": "It needs about 15 minutes of prep and no cooking, and serves 4 over ice."
      },
      {
        "question": "Can I make turmeric thandai ahead of time?",
        "answer": "Yes, blend the nut and spice base, mix into the milk, and chill it; serve over ice with the Anveshan honey and khandsari stirred in for festive gatherings."
      }
    ],
    "tips": [
      "Soak the almonds, cashews and melon seeds before blending for a smoother, creamier thandai.",
      "Stir in the Anveshan honey once the milk is cool so its raw character is preserved.",
      "Chill thoroughly and serve over ice for the most refreshing summer drink."
    ]
  },
  "veg-spring-rolls": {
    "description": "Crisp golden veg spring rolls packed with stir-fried cabbage, carrots and beans, fried in light Anveshan wood-pressed sunflower oil for a shatteringly crunchy, lighter bite.",
    "intro": "Veg spring rolls are crisp golden parcels filled with a stir-fried medley of cabbage, carrots and beans wrapped in thin sheets and fried until shatteringly crunchy. The filling is tossed in toasty Anveshan sesame oil, and the rolls are deep-fried in light, clean-tasting Anveshan wood-pressed sunflower oil for a crisp, less greasy bite. With 25 minutes prep and 20 minutes cooking, the recipe serves 4.",
    "faqs": [
      {
        "question": "Which oil is best for frying spring rolls?",
        "answer": "Light, clean-tasting Anveshan wood-pressed sunflower oil is ideal as it fries the rolls crisp and golden without a heavy, greasy finish."
      },
      {
        "question": "How long do veg spring rolls take to make?",
        "answer": "About 25 minutes to prep the filling and roll, plus 20 minutes of frying, serving 4."
      },
      {
        "question": "Why use sesame oil in the filling?",
        "answer": "A tablespoon of Anveshan sesame oil tossed through the cabbage, carrot and beans gives the filling a toasty, aromatic Indo-Asian depth."
      },
      {
        "question": "How do I keep the rolls crunchy?",
        "answer": "Cool the stir-fried filling before wrapping, seal the sheets well, and fry in hot Anveshan sunflower oil so they crisp quickly without absorbing oil."
      }
    ],
    "tips": [
      "Stir-fry the vegetables on high heat briefly so they stay crunchy and do not release water.",
      "Let the filling cool completely before rolling to keep the sheets from tearing or going soggy.",
      "Fry in batches in hot Anveshan sunflower oil so the temperature stays high and the rolls turn shatteringly crisp."
    ]
  },
  "vegetable-pulao": {
    "description": "Vegetable pulao is fragrant basmati rice cooked with seasonal veggies and whole spices, all bloomed in aromatic Anveshan bilona ghee for a glossy festive one-pot meal.",
    "intro": "Vegetable pulao is a fragrant one-pot dish where basmati rice and mixed vegetables are cooked together with whole spices until fluffy and aromatic. The key to its festive aroma is blooming the spices and onions in pure ghee, and this recipe uses Anveshan bilona ghee for a glossy finish along with a pinch of premium Anveshan saffron for colour and fragrance. With carrot, beans and peas and a base of ginger-garlic and green chilli, it serves 4 and is ready in about 40 minutes.",
    "faqs": [
      {
        "question": "How long does vegetable pulao take to cook?",
        "answer": "About 40 minutes in total, with 15 minutes of prep and 25 minutes of cooking, serving 4."
      },
      {
        "question": "Why cook vegetable pulao in ghee?",
        "answer": "Blooming the whole spices and onion in Anveshan bilona ghee gives the pulao its glossy finish and rich, festive aroma that oil alone cannot deliver."
      },
      {
        "question": "What does saffron add to vegetable pulao?",
        "answer": "A pinch of Anveshan saffron lends a delicate golden colour and a subtle fragrance, making the pulao feel festive."
      },
      {
        "question": "How do I keep the pulao rice fluffy and separate?",
        "answer": "Use basmati rice, sauté it briefly in the ghee with the spices, and avoid over-stirring once the water is added so the grains stay separate."
      }
    ],
    "tips": [
      "Soak the basmati rice for 15 to 20 minutes before cooking for longer, fluffier grains.",
      "Bloom the whole spices in bilona ghee until fragrant before adding the rice to build deep aroma.",
      "Steep the saffron in a spoon of warm milk or water and add it at the end for the best colour and fragrance."
    ]
  }
};
