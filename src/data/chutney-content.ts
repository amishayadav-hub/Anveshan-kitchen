// Tips + FAQs for each chutney, merged into the recipes in chutney-recipes.ts.
// Kept separate so the recipe file stays focused on ingredients/steps, mirroring
// how the main recipes pull their tips/faqs from seo-content.ts.

export interface RecipeFaq {
  question: string;
  answer: string;
}
export interface RecipeExtras {
  tips: string[];
  faqs: RecipeFaq[];
}

export const CHUTNEY_CONTENT: Record<string, RecipeExtras> = {
  "pudina-chutney": {
    tips: [
      "Blanch the mint for 10 seconds and shock in ice water to lock in a bright green colour that won't darken.",
      "Add ice cubes instead of water while grinding — it keeps the blades cool so the chutney stays vivid.",
      "The spoon of Anveshan Groundnut Oil isn't just for shine; it also slows oxidation so the colour holds for days.",
    ],
    faqs: [
      { question: "How long does mint chutney stay fresh?", answer: "Up to 5 days in an airtight jar in the fridge. For longer, freeze it in an ice-cube tray and thaw cubes as needed." },
      { question: "Why does my mint chutney turn black?", answer: "Heat and oxidation. Grind with ice, avoid over-blending, and the film of Anveshan Groundnut Oil on top helps keep it green." },
      { question: "Can I make it without green chillies?", answer: "Yes — skip them or use half a deseeded chilli for a mild version that's still fragrant." },
    ],
  },
  "dhaniya-chutney": {
    tips: [
      "Use the tender coriander stalks too — they carry a lot of flavour and blend smooth.",
      "A pinch of sugar or a small piece of jaggery balances the sharpness without making it sweet.",
      "Grind thick and loosen with water only at the end, so you control the consistency.",
    ],
    faqs: [
      { question: "Coriander or mint — which chutney is spicier?", answer: "They're similar; adjust heat with the number of green chillies. Coriander chutney is a touch more tangy thanks to extra lemon." },
      { question: "Can I freeze coriander chutney?", answer: "Yes. Freeze in small portions; the colour and flavour hold well for up to a month." },
      { question: "What do I serve it with?", answer: "Pakoras, sandwiches, chaat, dosa, or as a spread inside wraps and rolls." },
    ],
  },
  "garlic-chutney": {
    tips: [
      "Roast the garlic low and slow in Anveshan Groundnut Oil — rushing it makes the chutney bitter.",
      "For a dry version (great on vada pav), skip the water and grind coarse with a little dry coconut.",
      "Kashmiri chillies give colour without excessive heat; add one hotter chilli if you want more kick.",
    ],
    faqs: [
      { question: "Is garlic chutney very spicy?", answer: "It's punchy but you control it — use Kashmiri chillies for colour and add hot chillies only to taste." },
      { question: "How long does it keep?", answer: "About a week refrigerated. The layer of Anveshan Groundnut Oil on top helps it last." },
      { question: "Dry or wet — which is better?", answer: "Dry garlic chutney suits vada pav and sprinkling; the wet version is better as a dip or with dosa." },
    ],
  },
  "imli-chutney": {
    tips: [
      "Strain the tamarind pulp well — any fibre or seed makes the chutney gritty.",
      "It thickens a lot as it cools, so pull it off the heat while still slightly runny.",
      "Anveshan Jaggery Powder dissolves faster if you add it after the pulp is warm.",
    ],
    faqs: [
      { question: "Why use jaggery instead of sugar?", answer: "Anveshan Jaggery Powder gives a deeper, rounded sweetness and retains natural minerals, unlike refined white sugar." },
      { question: "How long does tamarind chutney last?", answer: "Up to 3 weeks in the fridge, or a few months frozen — it's a great make-ahead chaat staple." },
      { question: "It's too sour — how do I fix it?", answer: "Simmer in a little more jaggery a spoon at a time until the sweet-sour balance is right for you." },
    ],
  },
  "coconut-chutney": {
    tips: [
      "Fresh coconut gives the best texture; if using frozen, thaw fully and drain before grinding.",
      "Roasted chana dal is what makes it creamy and helps it hold — don't skip it.",
      "Add the mustard-curry-leaf tempering in Anveshan Coconut Oil just before serving for the freshest aroma.",
    ],
    faqs: [
      { question: "Why temper in coconut oil?", answer: "Anveshan Wood-Pressed Coconut Oil doubles down on the natural coconut aroma and keeps the chutney true to its South-Indian roots." },
      { question: "How long does coconut chutney stay good?", answer: "It's best fresh, the same day. Refrigerate leftovers up to 2 days; it may need a splash of water to loosen." },
      { question: "Can I make it without dal?", answer: "You can, but roasted chana dal gives body and a longer set — otherwise it separates quickly." },
    ],
  },
  "peanut-chutney": {
    tips: [
      "Roast the peanuts well and rub off the skins for a smoother, sweeter chutney.",
      "Grind the peanuts warm — they blend creamier than cold ones.",
      "Keep it thick for dosa and loosen with water for idli, so it clings the way you want.",
    ],
    faqs: [
      { question: "Is peanut chutney healthy?", answer: "Yes — peanuts add plant protein and healthy fats, and it's tempered in Anveshan Wood-Pressed Groundnut Oil rather than refined oil." },
      { question: "How long does it keep?", answer: "2–3 days refrigerated. It thickens in the fridge, so stir in a little water before serving." },
      { question: "Can I use peanut butter instead?", answer: "In a pinch, but freshly roasted peanuts give a far better flavour and texture." },
    ],
  },
  "tomato-chutney": {
    tips: [
      "Cook the tomatoes until the oil separates — that's when the rawness is gone and the flavour deepens.",
      "A pinch of jaggery balances very sour tomatoes.",
      "For a smoky note, char the tomatoes on an open flame before cooking.",
    ],
    faqs: [
      { question: "How long does tomato chutney last?", answer: "4–5 days refrigerated in an airtight jar." },
      { question: "Can I make it without onion and garlic?", answer: "Yes — skip both and add a pinch of asafoetida (hing) in the tempering for a no-onion-no-garlic version." },
      { question: "What goes well with it?", answer: "Dosa, idli, uttapam, or simply spread on toast." },
    ],
  },
  "mango-chutney": {
    tips: [
      "Use firm ripe mangoes so the chutney has texture and doesn't turn to mush.",
      "Cook on medium heat and stir often once the Anveshan Jaggery Powder melts, so it doesn't catch.",
      "It sets further as it cools — stop when it's glossy and just coats the spoon.",
    ],
    faqs: [
      { question: "Ripe or raw mango for this chutney?", answer: "This one uses sweet ripe mango. For the tangy North-Indian version, see the Raw Mango Launji." },
      { question: "How long does mango chutney keep?", answer: "Up to 3 weeks in a sterilised jar in the fridge, thanks to the jaggery acting as a natural preserver." },
      { question: "Is it spicy or sweet?", answer: "Primarily sweet with a warm, gently spiced finish — adjust the chilli powder to taste." },
    ],
  },
  "red-chilli-chutney": {
    tips: [
      "Soak the dry chillies until fully soft so the chutney grinds silky, not grainy.",
      "Warm the Anveshan Mustard Oil to smoking then cool it slightly before mixing — this tames its raw sharpness.",
      "A little goes a long way; start with a teaspoon on your plate.",
    ],
    faqs: [
      { question: "Why mustard oil here?", answer: "Anveshan kachi-ghani Mustard Oil gives this chutney its signature pungent bite and also helps preserve it." },
      { question: "How spicy is it?", answer: "Quite spicy. Use Kashmiri chillies for colour with milder heat, or deseed the chillies to tone it down." },
      { question: "How long does it last?", answer: "Up to 2 weeks refrigerated — the oil layer on top keeps it well." },
    ],
  },
  "amla-chutney": {
    tips: [
      "Steam the amla just until soft; over-boiling washes out the vitamin C.",
      "Balance the natural sourness gradually with Anveshan Jaggery Powder, tasting as you go.",
      "Grind slightly coarse for a fresher, brighter chutney.",
    ],
    faqs: [
      { question: "Is amla chutney good for immunity?", answer: "Amla is one of the richest natural sources of vitamin C, so this chutney is a tasty way to work it into everyday meals." },
      { question: "It's too sour — what do I do?", answer: "Add a little more Anveshan Jaggery Powder; the goal is a balanced sweet-tangy taste, not sourness." },
      { question: "Can I use frozen amla?", answer: "Yes — thaw and steam briefly before grinding." },
    ],
  },
  "ginger-chutney": {
    tips: [
      "Roast the ginger until it loses its raw smell — this is the key to a mellow allam pachadi.",
      "Anveshan Sesame Oil is traditional here; it carries the flavour and preserves the chutney.",
      "Balance with Anveshan Jaggery Powder so the heat of ginger and chilli is rounded, not raw.",
    ],
    faqs: [
      { question: "What is allam pachadi?", answer: "It's the classic Andhra ginger chutney — sweet, sour, spicy and deeply aromatic, usually served with idli, dosa or pesarattu." },
      { question: "How long does it keep?", answer: "Up to 2 weeks refrigerated; the sesame oil helps it last." },
      { question: "Is it very spicy?", answer: "It's bold but balanced by tamarind and jaggery. Reduce the dry chillies for a milder version." },
    ],
  },
  "onion-chutney": {
    tips: [
      "Cook the onions slowly in Anveshan Groundnut Oil until deep golden — that caramelisation is the whole flavour.",
      "A little tamarind keeps it from being flat; a pinch of jaggery rounds it off.",
      "Grind coarse for dosa, smooth for a dip.",
    ],
    faqs: [
      { question: "How long does onion chutney last?", answer: "3–4 days refrigerated in an airtight jar." },
      { question: "Can I use red or white onions?", answer: "Both work; red onions give a sweeter chutney, white ones a sharper one." },
      { question: "What do I eat it with?", answer: "Dosa, idli, uttapam, or as a sandwich spread." },
    ],
  },
  "curry-leaves-chutney": {
    tips: [
      "Sauté the curry leaves until crisp — that's what makes the chutney fragrant instead of grassy.",
      "Roast the dals to golden for a nutty depth and better shelf life.",
      "Finish with raw Anveshan Sesame Oil to preserve it and add body.",
    ],
    faqs: [
      { question: "Is karivepaku chutney healthy?", answer: "Very — curry leaves are rich in iron and antioxidants, and it's made in Anveshan Wood-Pressed Sesame Oil." },
      { question: "How long does it keep?", answer: "Up to a week refrigerated." },
      { question: "Can I use dried curry leaves?", answer: "Fresh leaves are far better here; dried ones lack the aroma this chutney depends on." },
    ],
  },
  "til-chutney": {
    tips: [
      "Roast the sesame on low until just golden — burnt sesame turns the chutney bitter.",
      "Grind while the seeds are still warm for a creamier paste.",
      "A finish of Anveshan Sesame Oil deepens the toasted-sesame flavour.",
    ],
    faqs: [
      { question: "Is sesame chutney good for you?", answer: "Yes — sesame is rich in calcium and healthy fats, especially paired with Anveshan Wood-Pressed Sesame Oil." },
      { question: "How long does it last?", answer: "Up to a week refrigerated; it thickens, so loosen with water before serving." },
      { question: "White or black sesame?", answer: "White gives a milder, nuttier chutney; black sesame makes it earthier and darker." },
    ],
  },
  "khajoor-imli-chutney": {
    tips: [
      "Blend and strain for the smooth, glossy texture chaat needs.",
      "Dates add natural body, so you need less Anveshan Jaggery Powder than a plain tamarind chutney.",
      "Make it a touch thinner than you want — it thickens as it cools.",
    ],
    faqs: [
      { question: "What is this chutney used for?", answer: "It's the sweet, dark meethi chutney drizzled over chaat, samosas, tikki and dahi vada." },
      { question: "How long does it keep?", answer: "Up to 3 weeks refrigerated, or a few months frozen." },
      { question: "Can I skip the tamarind?", answer: "Tamarind provides the essential tang; without it the chutney is only sweet, not the classic sweet-sour." },
    ],
  },
  "raw-mango-chutney": {
    tips: [
      "Slice the raw mango thin so it softens quickly and evenly.",
      "Heat the Anveshan Mustard Oil to smoking, then lower the flame before adding the seeds — this removes its raw pungency.",
      "Add the Anveshan Jaggery Powder last and simmer to a glossy syrup that coats the mango.",
    ],
    faqs: [
      { question: "What is aam launji?", answer: "A North-Indian sweet-and-tangy raw mango relish, tempered with fennel and nigella in mustard oil — served with parathas and dal-rice." },
      { question: "How long does it keep?", answer: "Up to 2 weeks refrigerated; the mustard oil and jaggery help preserve it." },
      { question: "Can I make it less sweet?", answer: "Yes — reduce the jaggery for a sharper, more tangy launji." },
    ],
  },
  "gongura-chutney": {
    tips: [
      "Cook the gongura until all its moisture evaporates, or the chutney won't keep.",
      "Anveshan Sesame Oil is traditional and acts as a natural preservative here.",
      "Grind coarse — gongura pachadi is meant to be a little rustic.",
    ],
    faqs: [
      { question: "What is gongura?", answer: "Gongura (sorrel) is a tangy leafy green from Andhra; this pachadi is its most famous use, eaten with hot rice and a spoon of ghee." },
      { question: "How long does it last?", answer: "Up to 2 weeks refrigerated, thanks to the sesame oil." },
      { question: "Where do I find gongura?", answer: "At Indian grocers, especially those stocking Andhra/Telangana produce; spinach is not a substitute as it lacks the sourness." },
    ],
  },
  "beetroot-chutney": {
    tips: [
      "Grate the beetroot so it cooks fast and grinds smooth.",
      "Roast the chana dal first for a nutty base that offsets beetroot's earthiness.",
      "A squeeze of lemon at the end brightens the colour and flavour.",
    ],
    faqs: [
      { question: "Does beetroot chutney taste earthy?", answer: "The dal, chilli and tempering balance it into a mild, subtly sweet chutney — the earthiness is gentle." },
      { question: "How long does it keep?", answer: "3–4 days refrigerated." },
      { question: "Is it good for kids?", answer: "Yes — it's mild, colourful and a sneaky way to add beetroot to a meal. Reduce the chillies for young children." },
    ],
  },
  "carrot-chutney": {
    tips: [
      "Sauté the carrot until it softens fully so the chutney is sweet, not raw-tasting.",
      "A little coconut makes it creamier and rounds off the sweetness.",
      "Keep the tempering simple so the carrot stays the star.",
    ],
    faqs: [
      { question: "Is carrot chutney sweet?", answer: "Mildly — carrots bring natural sweetness balanced by chilli and tamarind. It's family-friendly." },
      { question: "How long does it keep?", answer: "3–4 days refrigerated." },
      { question: "What do I serve it with?", answer: "Dosa, idli, or as a colourful side with rice." },
    ],
  },
  "karela-chutney": {
    tips: [
      "Fry the karela in Anveshan Groundnut Oil until crisp and golden — this is the single biggest step in cutting bitterness.",
      "Tamarind and Anveshan Jaggery Powder together balance the bitterness into a sweet-sour taste.",
      "Don't try to hide the bitterness completely; a gentle edge is what makes karela chutney special.",
    ],
    faqs: [
      { question: "Is karela chutney very bitter?", answer: "No — frying, tamarind and jaggery mellow it into a balanced sweet-sour-bitter chutney that even karela-sceptics enjoy." },
      { question: "Is it good for diabetics?", answer: "Bitter gourd is traditionally valued for blood-sugar support. Use the jaggery sparingly if you're watching sweetness." },
      { question: "How long does it keep?", answer: "Up to a week refrigerated." },
    ],
  },
  "akhrot-chutney": {
    tips: [
      "Soak the walnuts for 10 minutes and rub off loose skins to reduce any bitterness.",
      "Keep it thick and creamy — doon chetin is more a dip than a runny chutney.",
      "Just a few drops of Anveshan Mustard Oil is enough for that authentic Kashmiri pungency.",
    ],
    faqs: [
      { question: "What is doon chetin?", answer: "The traditional Kashmiri walnut chutney, creamy with curd and finished with pungent mustard oil — served with rice and Kashmiri meals." },
      { question: "How long does it keep?", answer: "It's best eaten the same day since it contains curd; refrigerate up to a day." },
      { question: "Can I skip the curd?", answer: "Yes — use a little water for a dairy-free version, though curd gives the classic creaminess." },
    ],
  },
  "green-chilli-chutney": {
    tips: [
      "Blister the chillies in Anveshan Groundnut Oil first — it removes the raw bite and makes them digestible.",
      "Deseed some of the chillies to control the heat without losing flavour.",
      "Lemon and salt sharpen it; add both at the end and taste.",
    ],
    faqs: [
      { question: "How hot is this chutney?", answer: "It's meant to be fiery, but you decide — deseed the chillies and use fewer for a milder version." },
      { question: "How long does it keep?", answer: "Up to 10 days refrigerated." },
      { question: "What do I eat it with?", answer: "Theplas, parathas, khichdi, or a smear alongside a heavy meal — use it sparingly." },
    ],
  },
  "apple-chutney": {
    tips: [
      "A firm, slightly tart apple holds its shape and balances the Anveshan Jaggery Powder.",
      "The vinegar is important — it keeps the chutney from being cloying and helps it last.",
      "Cook until jammy but stop while it still has a little bite.",
    ],
    faqs: [
      { question: "What do I serve apple chutney with?", answer: "It's lovely with cheese, cold cuts, parathas, or in a grilled cheese toastie." },
      { question: "How long does it keep?", answer: "Up to 3 weeks in a sterilised jar in the fridge." },
      { question: "Which apples work best?", answer: "Firm, tart varieties hold up best; very soft sweet apples turn to sauce and need less jaggery." },
    ],
  },
  "thecha": {
    tips: [
      "Roast the chillies and garlic in Anveshan Groundnut Oil until blistered for that signature smoky heat.",
      "Pound it coarse (a mortar and pestle is ideal) — thecha should be chunky, never a smooth paste.",
      "Peanuts are optional but add body and a Maharashtrian touch.",
    ],
    faqs: [
      { question: "How spicy is thecha?", answer: "Very — it's a fiery Maharashtrian condiment. Use fewer chillies or milder ones to tone it down." },
      { question: "How long does it keep?", answer: "Up to a week refrigerated; the groundnut oil helps preserve it." },
      { question: "What do I eat thecha with?", answer: "Bhakri, jowar/bajra roti, dal-rice, or as a fiery side to any simple meal." },
    ],
  },
};
