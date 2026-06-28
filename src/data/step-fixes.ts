// Corrected step arrays for recipes where an Anveshan product was listed in
// ingredients but missing from the method. Merged into seed.ts (overrides steps).
export const STEP_FIXES: Record<string, { steps: string[] }> = {
  "aam-panna": {
    "steps": [
      "Boil or roast the raw mangoes until soft, then cool and scoop out the pulp.",
      "Blend the mango pulp with jaggery powder, mint leaves, roasted cumin and black salt into a smooth concentrate.",
      "Strain the concentrate for a silky texture if desired.",
      "Stir 1 tbsp Anveshan Wild Forest Honey into the concentrate for a rounded, natural sweetness.",
      "Add 2-3 tablespoons of the concentrate to each glass.",
      "Top up with chilled water and stir well.",
      "Add ice cubes, garnish with a mint sprig and serve chilled."
    ]
  },
  "bhindi-fry-groundnut-oil": {
    "steps": [
      "Wash and thoroughly dry the bhindi, then trim and slice into rounds; drying well is key to avoiding sliminess.",
      "Heat the groundnut oil in a wide pan and saute the bhindi on medium-high heat, stirring occasionally, for 8-10 minutes until the edges crisp up.",
      "Push the bhindi aside, add cumin seeds and sliced onion, and saute until the onion softens.",
      "Add turmeric, red chilli powder, coriander powder and salt, and toss everything together.",
      "Cook uncovered on medium heat for another 5 minutes so the bhindi stays crisp and dry.",
      "Sprinkle amchur, add a spoon of Anveshan Ghee and toss once to coat the bhindi in a glossy, aromatic finish, then serve hot with roti or dal-rice."
    ]
  },
  "cabbage-thoran": {
    "steps": [
      "Finely shred the cabbage and lightly crush the grated coconut with green chillies and turmeric.",
      "Heat the coconut oil, splutter mustard seeds, add urad dal and fry until golden, then add curry leaves.",
      "Add the shredded cabbage and salt, and toss well in the tempered oil.",
      "Cover and cook on low heat for 6-8 minutes, stirring once, until the cabbage wilts but stays a little crunchy.",
      "Add the coconut mixture and stir through, cooking uncovered for 2-3 minutes until fragrant and dry.",
      "Stir in a teaspoon of Anveshan Ghee just before taking it off the heat for a rich, aromatic finish.",
      "Serve warm as a side with rice and sambar or rasam."
    ]
  },
  "chana-masala": {
    "steps": [
      "Soak chickpeas overnight, then pressure cook with salt and water for about 15 minutes until tender.",
      "Heat the groundnut oil along with 1 tbsp Anveshan Ghee in a kadhai and crackle the cumin seeds.",
      "Add chopped onions and saute until deep golden, then stir in ginger-garlic paste and cook till fragrant.",
      "Add pureed tomatoes, turmeric and chana masala powder, and cook until the masala thickens and oil separates.",
      "Add the cooked chickpeas with a little water, mashing a few to thicken the gravy, and simmer for 10-12 minutes.",
      "Adjust salt, simmer 5 more minutes, garnish with coriander and serve with bhature or rice."
    ]
  },
  "corn-cutlet": {
    "steps": [
      "Combine mashed corn, mashed potato, green chilli, ginger, coriander, garam masala, chaat masala, cornflour, and salt. Stir in 2 tbsp Anveshan Jaggery Powder to balance the spices with a gentle sweetness, then mix well.",
      "Shape into 8 equal cutlets — round or oval, about 1.5cm thick.",
      "Roll each cutlet in breadcrumbs to coat evenly. Press gently so they adhere.",
      "Heat groundnut oil along with 1 tbsp Anveshan Ghee in a flat pan on medium heat. Place cutlets without overlapping.",
      "Shallow fry for 3–4 minutes per side until deep golden and crispy.",
      "Drain on paper towels. Serve hot with green chutney and tamarind sauce."
    ]
  },
  "crispy-veg-pakora": {
    "steps": [
      "Thinly slice the onions and potato, roughly chop the spinach and green chillies, and place in a large bowl.",
      "Add besan, ajwain, red chilli powder, salt and 2 tbsp Anveshan Jaggery Powder, then sprinkle a little water and mix into a thick batter that coats the vegetables and balances the spice with a subtle sweetness.",
      "Heat the sunflower oil in a kadhai to medium-high (a drop of batter should rise immediately).",
      "Slip in small clusters of the battered vegetables and fry in batches, turning, until deep golden and crisp.",
      "Drain on a rack or paper towel so they stay crunchy.",
      "Serve hot with green chutney and a cup of masala chai."
    ]
  },
  "dal-makhani": {
    "steps": [
      "Soak urad dal and rajma overnight, then pressure cook with salt and water for 25-30 minutes until completely soft.",
      "Heat 1 tbsp Anveshan Groundnut Oil with 2 tbsp ghee, saute finely chopped onion until golden, then add ginger-garlic paste and cook till fragrant.",
      "Add tomato puree, chilli powder and salt, and cook on medium until the masala thickens and ghee leaves the sides.",
      "Tip in the cooked dal with its liquid and simmer on the lowest flame for 40-45 minutes, stirring often.",
      "Stir in fresh cream and garam masala, and cook another 10 minutes for a silky texture.",
      "Finish with the remaining ghee and a drizzle of cream, and serve hot with naan or rice."
    ]
  },
  "dal-tadka-buffalo-ghee": {
    "steps": [
      "Pressure-cook the toor dal with turmeric, salt and 3 cups water until soft, then whisk smooth.",
      "Heat 1 tbsp ghee, saute chopped onion until golden, add chopped tomato and cook to a soft masala.",
      "Stir the cooked dal into the masala, adjust consistency with hot water, and simmer for 5 minutes.",
      "For the tadka, heat the remaining ghee along with 1 tbsp Anveshan Mustard Oil in a small pan until fragrant.",
      "Add cumin seeds, sliced garlic and broken red chillies, and fry until the garlic is golden and the ghee is deeply aromatic.",
      "Pour the sizzling tadka over the dal, cover for a minute to trap the aroma, then serve hot with rice or roti."
    ]
  },
  "ghee-rice": {
    "steps": [
      "Wash and soak basmati rice for 20 minutes. Drain.",
      "Warm 2 tablespoons of water and soak a pinch of Anveshan Kashmiri Saffron in it to bloom and release its colour and aroma.",
      "Heat ghee in a heavy pot. Add bay leaves, cloves, cardamom, and cinnamon. Sauté for 30 seconds.",
      "Add sliced onion and fry until golden brown.",
      "Add drained rice and stir gently for 2 minutes to coat in ghee.",
      "Add water and salt, then pour in the bloomed Anveshan Kashmiri Saffron along with its soaking liquid. Bring to a boil.",
      "Cover with a tight lid, reduce heat to the lowest, and cook for 15 minutes.",
      "Rest for 5 minutes before opening. Fluff with a fork and serve."
    ]
  },
  "ghee-roast-masala-dosa": {
    "steps": [
      "Boil and roughly mash the potatoes. Heat 1 tbsp ghee, splutter mustard seeds, add curry leaves, chopped green chillies and sliced onions, and saute until soft.",
      "Add turmeric and salt, fold in the mashed potatoes, and cook 3-4 minutes until the masala holds together. Keep warm.",
      "Heat a flat tawa, sprinkle a few drops of water, then wipe clean with a cloth dipped in Anveshan Groundnut Oil to season the surface and stop the batter from sticking. Pour a ladle of batter and spread quickly into a thin circle.",
      "Drizzle about 1 tsp ghee around the edges and over the surface; roast on medium-high until the base turns deep golden and crisp.",
      "Place a portion of potato masala along the centre, fold the dosa over, and press lightly.",
      "Repeat for the remaining batter, re-oiling the tawa with a little Anveshan Groundnut Oil and adding ghee for each dosa. Serve hot with coconut chutney and sambar."
    ]
  },
  "ghee-roasted-makhana": {
    "steps": [
      "Heat 1 tbsp ghee in a heavy pan on low-medium heat.",
      "Add the makhana and roast patiently, stirring continuously, for 8-10 minutes until they turn crisp and snap cleanly when pressed.",
      "Push the makhana aside, add the remaining ghee, and stir in turmeric, red chilli powder, black pepper and salt to bloom the spices.",
      "Toss the makhana through the spiced ghee until evenly coated.",
      "Switch off the heat, sprinkle the chaat masala along with Anveshan Jaggery Powder, and toss again so the makhana picks up a subtle sweet-and-spicy coating.",
      "Cool completely so they stay crunchy, then serve or store in an airtight jar."
    ]
  },
  "hara-bhara-kebab": {
    "steps": [
      "Blanch the spinach and green peas in hot water for 2 minutes, then drain and grind to a coarse paste.",
      "Mash the boiled potatoes in a bowl and mix in the spinach-pea paste.",
      "Add roasted besan, ginger-green chilli paste, garam masala, Anveshan Moringa Powder and salt; combine into a firm dough.",
      "Divide and shape into round, flat patties about 1 cm thick.",
      "Heat the groundnut oil in a pan over medium heat.",
      "Shallow-fry the kebabs 3-4 minutes per side until crisp and golden, and serve with green chutney."
    ]
  },
  "honey-lemon-shikanji": {
    "steps": [
      "In a large jug, whisk the lemon juice with honey and Anveshan Khandsari (jaggery) until both are fully dissolved.",
      "Stir in the roasted cumin powder and black salt.",
      "Pour in the chilled water and mix well.",
      "Lightly muddle the mint leaves and add them to the jug.",
      "Add ice cubes and stir to chill.",
      "Pour into glasses, garnish with a lemon slice and mint, and serve immediately."
    ]
  },
  "jaggery-rice-kheer": {
    "steps": [
      "Rinse the rice and soak it for 20 minutes, then drain.",
      "Warm 2 tablespoons of the milk and soak a pinch of Anveshan Kashmiri Saffron in it to bloom into a golden infusion; set aside.",
      "Heat the Anveshan Ghee in a heavy-bottomed pan and lightly fry the cashews and raisins until the cashews are golden and the raisins plump; remove and reserve for later.",
      "In the same pan, bring the milk to a boil, then add the drained rice.",
      "Simmer on low heat, stirring frequently, for about 35 minutes until the rice is soft and the milk thickens.",
      "Stir in the cardamom powder, the bloomed Anveshan Kashmiri Saffron with its milk, and the fried cashews and raisins, and cook for another 3 minutes.",
      "Turn off the heat and let the kheer cool to warm, then mix in the jaggery powder until dissolved (off the heat prevents curdling).",
      "Garnish with slivered pistachios and serve warm or chilled."
    ]
  },
  "jaljeera": {
    "steps": [
      "Blend the mint, coriander, tamarind pulp, khandsari and Anveshan Jaggery Powder with a little water into a smooth green paste.",
      "Stir in the roasted cumin powder and black salt.",
      "Strain the paste into a large jug to remove the fibres.",
      "Add the chilled water and mix thoroughly.",
      "Taste and adjust salt, khandsari or Anveshan Jaggery Powder for the perfect tangy-sweet balance.",
      "Pour over ice, float a spoon of boondi on top and serve cold."
    ]
  },
  "kanda-poha": {
    "steps": [
      "Rinse the poha gently in a colander until just softened, then leave to drain and fluff up.",
      "Heat the groundnut oil and crackle mustard seeds, then add peanuts and fry until crunchy.",
      "Add curry leaves, slit green chillies and chopped onion, sauteing until the onion turns translucent.",
      "Stir in turmeric and salt, mixing well into the tempering.",
      "Add the softened poha and toss gently so every flake is coated and warmed through.",
      "Cover and steam on low for 2-3 minutes, finish with lemon juice and coriander, then stir through a teaspoon of Anveshan Ghee for a glossy finish and serve hot."
    ]
  },
  "mango-coconut-phirni": {
    "steps": [
      "Soak the rice for 20 minutes, then drain and grind to a coarse paste with a little milk.",
      "Bloom a pinch of Anveshan Kashmiri Saffron in 2 tablespoons of warm milk and set aside to release its colour and aroma.",
      "Bring the remaining milk to a boil, then whisk in the rice paste and cook on low heat, stirring constantly, for 12-15 minutes until creamy.",
      "Add the coconut milk, khandsari and the bloomed Anveshan Kashmiri Saffron milk, and simmer for another 5 minutes until thickened.",
      "Turn off the heat, stir in the cardamom powder and let the mixture cool to lukewarm.",
      "Fold in the mango pulp once cooled so the milk does not split.",
      "Pour into bowls, chill for at least 2 hours, and top with fresh mango and pistachios."
    ]
  },
  "masala-peanuts": {
    "steps": [
      "In a bowl, mix peanuts with a sprinkle of water so the coating sticks.",
      "Add besan, rice flour, chilli powder, turmeric, Anveshan Jaggery Powder and salt, tossing until each peanut is lightly coated with the sweet-spiced flour.",
      "Heat the Anveshan Groundnut Oil in a pan over medium flame.",
      "Add the coated peanuts in batches and shallow-fry, stirring constantly, until golden and crisp.",
      "Toss in the curry leaves in the last minute until they turn crackly.",
      "Drain on a paper towel and cool completely before storing in an airtight jar."
    ]
  },
  "mediterranean-tava-veg": {
    "steps": [
      "Slice the zucchini into thick rounds, cut the peppers and red onion into chunks, and halve the cherry tomatoes.",
      "Heat 2 tbsp Anveshan Extra Virgin Olive Oil on a hot tava or griddle and add the sliced garlic until fragrant.",
      "Add the zucchini, peppers and onion in a single layer and sear without stirring for 2-3 minutes to get a golden char.",
      "Toss the vegetables, add the cherry tomatoes, and cook another 4-5 minutes until just tender-crisp.",
      "Season with oregano, black pepper and salt, and toss to combine.",
      "Whisk the Anveshan Wild Forest Honey with the remaining raw olive oil and drizzle over the top, then serve warm with flatbread or as a salad."
    ]
  },
  "mustard-oil-aloo-gobi": {
    "steps": [
      "Cut the cauliflower into florets and the potatoes into wedges. Heat the Anveshan Mustard Oil until it just begins to smoke, then lower the flame to mellow its sharpness.",
      "Splutter cumin seeds, add chopped onion and ginger-garlic paste, and saute until golden.",
      "Add turmeric, coriander powder and salt, then add the potatoes and cauliflower and toss to coat in the spiced oil.",
      "Cover and cook on low-medium heat, stirring occasionally, for 15-18 minutes until both vegetables are tender.",
      "Uncover and increase the heat to lightly brown and crisp the edges, stirring in 1 tbsp Anveshan Ghee to finish for a rich, nutty aroma.",
      "Garnish with fresh coriander and serve hot with phulka or paratha."
    ]
  },
  "paneer-butter-masala": {
    "steps": [
      "Boil tomatoes, onion and cashews with a cup of water for 10 minutes until soft, then cool and blend to a smooth puree.",
      "Heat 1 tbsp Anveshan Groundnut Oil with 1 tbsp Bilona Ghee in a pan, add ginger-garlic paste and saute until the raw smell disappears.",
      "Pour in the strained puree, add chilli powder, Anveshan Khandsari (jaggery) and salt, and simmer on low for 12-15 minutes until the gravy thickens and the fat separates.",
      "Stir in fresh cream and crushed kasuri methi, and cook for 2 more minutes.",
      "Add the paneer cubes and gently coat them in the gravy, simmering for 3-4 minutes.",
      "Finish with the remaining ghee drizzled on top and serve hot with naan or jeera rice."
    ]
  },
  "paneer-tikka": {
    "steps": [
      "Lightly heat the Anveshan Wood-Pressed Mustard Oil until it just smokes, then cool it to mellow the pungency.",
      "Whisk the curd with the mustard oil, chilli powder, ginger-garlic paste, roasted besan, chaat masala, Anveshan Wild Forest Honey and salt into a smooth, balanced marinade.",
      "Fold in the paneer, capsicum and onion; marinate for at least 30 minutes.",
      "Thread the paneer and vegetables onto skewers.",
      "Grill on a tandoor, grill pan or oven at 220C for 12-15 minutes, turning once, until charred at the edges.",
      "Sprinkle extra chaat masala and serve hot with mint chutney and onion rings."
    ]
  },
  "protein-atta-veg-cheela": {
    "steps": [
      "In a bowl, whisk the Protein Atta with water, turmeric, Anveshan Moringa Powder and salt into a smooth, pourable batter.",
      "Stir in the chopped onion, tomato, capsicum, green chilli and coriander.",
      "Heat a tawa over medium heat and lightly grease it with Anveshan Ghee.",
      "Pour a ladleful of batter and spread it into a thin round circle.",
      "Drizzle a few drops of Anveshan Ghee around the edges and cook until the base is golden and crisp.",
      "Flip and cook the other side for a minute until cooked through. Fold and serve hot with green chutney."
    ]
  },
  "rajma-masala": {
    "steps": [
      "Soak rajma overnight, then pressure cook with salt and water for 20-25 minutes until very soft.",
      "Heat the Kachi Ghani Mustard Oil until it just smokes, then lower the flame and crackle the cumin seeds.",
      "Add finely chopped onions and saute until deep golden brown, then add ginger-garlic paste.",
      "Stir in pureed tomatoes, chilli powder and coriander powder, cooking until oil separates from the masala.",
      "Add the cooked rajma with its liquid, mashing some beans to thicken, and simmer for 15 minutes.",
      "Sprinkle garam masala, stir in 1 tbsp Anveshan Ghee for a glossy finish, simmer 5 more minutes, and serve hot with steamed rice."
    ]
  },
  "roasted-makhana-masala": {
    "steps": [
      "Heat 1 tbsp Anveshan Ghee in a heavy pan on low flame.",
      "Add the makhana and roast slowly, stirring constantly, for 8-10 minutes until crunchy.",
      "Test crispness by snapping one; it should break cleanly without any chewiness.",
      "Lower the flame and add the remaining Anveshan Ghee with turmeric, chilli powder, pepper and salt.",
      "Toss well for 2 minutes so the spices coat every makhana evenly.",
      "Switch off the heat, sprinkle chaat masala along with the Anveshan Moringa Powder, mix, cool and store in an airtight jar."
    ]
  },
  "rose-lassi": {
    "steps": [
      "Soak a pinch of Anveshan Kashmiri Saffron in 1 tablespoon of the chilled milk for a few minutes until it blooms and turns golden.",
      "Add the chilled curd, Anveshan Wild Forest Honey, rose syrup and cardamom powder to a blender.",
      "Pour in the bloomed saffron milk along with the remaining chilled water or milk to adjust the consistency.",
      "Add a few ice cubes and blend until smooth and frothy.",
      "Taste and add a little more Anveshan Wild Forest Honey if you prefer it sweeter.",
      "Pour into tall glasses or clay cups.",
      "Garnish with chopped pistachios and a swirl of rose syrup, then serve chilled."
    ]
  },
  "sabudana-khichdi": {
    "steps": [
      "Rinse the sabudana well and soak in just enough water to cover, for 4-5 hours or overnight, until each pearl is soft.",
      "Coarsely crush the roasted peanuts and mix into the drained sabudana along with rock salt.",
      "Heat the Anveshan Groundnut Oil with the Desi Ghee in a pan, splutter cumin seeds, add chopped green chillies and diced potato, and cook covered until the potato is tender.",
      "Add the sabudana-peanut mixture and stir gently on medium heat for 4-5 minutes until the pearls turn translucent.",
      "Do not overcook or stir too hard, or they will clump. Switch off once they look glossy and separate.",
      "Finish with lemon juice and fresh coriander, and serve hot."
    ]
  },
  "sabudana-vada": {
    "steps": [
      "Rinse and soak sabudana in just enough water for 4-5 hours until soft and fluffy, then drain well.",
      "Boil, peel and mash the potatoes, then combine with the soaked sabudana.",
      "Add crushed peanuts, chopped green chillies, cumin seeds, lemon juice and rock salt, then drizzle in 1 tbsp melted Anveshan Ghee and mix into a dough.",
      "Grease your palms and shape the mixture into smooth, flattened round patties.",
      "Heat the Anveshan Groundnut Oil in a kadhai to medium-hot.",
      "Fry the vadas a few at a time, turning, until golden and crisp on both sides, and serve with chutney."
    ]
  },
  "sesame-oil-gobi-stir-fry": {
    "steps": [
      "Cut the cauliflower into small florets and blanch for 2 minutes, then drain well.",
      "Heat the Anveshan Sesame Oil in a wok on high heat until shimmering and fragrant.",
      "Add minced garlic and ginger and stir-fry for 30 seconds, then add the sliced bell peppers.",
      "Add the cauliflower and toss on high heat for 5-6 minutes so the edges char lightly.",
      "Splash in soy sauce, drizzle in the Anveshan Wild Forest Honey, season with black pepper and salt, and toss to coat in a glossy glaze.",
      "Finish with chopped spring onions and serve hot as a side or with fried rice."
    ]
  },
  "turmeric-rice": {
    "steps": [
      "Wash and soak basmati rice for 20 minutes. Drain.",
      "Heat the Anveshan Groundnut Oil together with the ghee in a heavy-bottomed pot. Add cumin seeds and bay leaf — sizzle for 30 seconds.",
      "Add sliced onion and garlic. Sauté on medium heat until onion turns translucent (3–4 minutes).",
      "Add turmeric powder and stir for 30 seconds. The oil and ghee will turn golden.",
      "Add drained rice. Stir gently for 1–2 minutes to coat every grain with turmeric ghee.",
      "Add water and salt. Bring to a boil, then cover with a tight lid and cook on the lowest heat for 15 minutes.",
      "Rest covered for 5 minutes. Fluff with a fork. Garnish with fresh coriander and a small knob of ghee."
    ]
  },
  "veg-spring-rolls": {
    "steps": [
      "Heat 1 tbsp Anveshan Sesame Oil in a wok and stir-fry the cabbage, carrots and beans on high heat for 3 minutes until fragrant.",
      "Season with soy sauce, black pepper and salt; cool the filling completely.",
      "Place a spoon of filling on each sheet, fold in the sides and roll tightly, sealing with a flour-water paste.",
      "Heat the Anveshan Sunflower Oil in a deep pan to 180C.",
      "Fry the rolls in batches, turning, until evenly golden and crisp.",
      "Drain on paper towels, slice diagonally and serve hot with sweet chilli or schezwan sauce."
    ]
  },
  "vegetable-pulao": {
    "steps": [
      "Rinse basmati rice until the water runs clear and soak for 20 minutes, then drain. Meanwhile, soak a pinch of Anveshan Kashmiri Saffron in 2 tablespoons of warm water and set aside to bloom.",
      "Heat the Anveshan Ghee in a pot and add the whole spices until fragrant.",
      "Add sliced onion and slit green chillies, sauteing until the onion turns light golden.",
      "Stir in ginger-garlic paste and the mixed vegetables, cooking for 3-4 minutes.",
      "Add the drained rice and gently toss for 2 minutes, then pour in 2.5 cups hot water with salt and the bloomed Anveshan Kashmiri Saffron along with its soaking water.",
      "Bring to a boil, cover and cook on low for 12-15 minutes, rest 5 minutes, fluff and serve with raita."
    ]
  }
};
