// All purchasable size variants per product handle, pulled from the Anveshan
// Products API. Powers the product info card's selectable size + price rows.
export interface ProductSize {
  label: string;
  price: number;
  variantId: string;
}

export const PRODUCT_SIZES: Record<string, ProductSize[]> = {
  "jaggerypowder": [
    {
      "label": "500g Pouch",
      "price": 105,
      "variantId": "47070925095104"
    }
  ],
  "gir-cow-ghee": [
    {
      "label": "500ml Jar",
      "price": 1250,
      "variantId": "43355933212864"
    },
    {
      "label": "1L Jar",
      "price": 2400,
      "variantId": "43355933245632"
    },
    {
      "label": "2.5L Dolchi",
      "price": 5742,
      "variantId": "46885187223744"
    },
    {
      "label": "5L Dolchi",
      "price": 11050,
      "variantId": "46109628399808"
    }
  ],
  "a2-desi-ghee": [
    {
      "label": "500ml jar",
      "price": 1045,
      "variantId": "32459662557262"
    },
    {
      "label": "1L jar",
      "price": 2025,
      "variantId": "32459662590030"
    },
    {
      "label": "2.5L Dolchi",
      "price": 5000,
      "variantId": "46885371773120"
    },
    {
      "label": "5L Dolchi",
      "price": 9898,
      "variantId": "46109620273344"
    }
  ],
  "desi-buffalo-ghee": [
    {
      "label": "500ml Jar",
      "price": 705,
      "variantId": "45791842533568"
    },
    {
      "label": "1L Jar",
      "price": 1360,
      "variantId": "45791842566336"
    },
    {
      "label": "2.5L Dolchi",
      "price": 3366,
      "variantId": "46885612880064"
    },
    {
      "label": "5L Dolchi",
      "price": 6615,
      "variantId": "46109628825792"
    }
  ],
  "wood-pressed-groundnut-oil": [
    {
      "label": "1L plastic bottle",
      "price": 425,
      "variantId": "43150198866112"
    },
    {
      "label": "2L can",
      "price": 879,
      "variantId": "39911571521728"
    },
    {
      "label": "5L can",
      "price": 1880,
      "variantId": "43844700340416"
    },
    {
      "label": "5L tin can",
      "price": 2066,
      "variantId": "39911595278528"
    },
    {
      "label": "1L glass bottle",
      "price": 564,
      "variantId": "30393551323214"
    }
  ],
  "wild-forest-honey": [
    {
      "label": "0.5 KG",
      "price": 383,
      "variantId": "46476687114432"
    },
    {
      "label": "275 gm",
      "price": 225,
      "variantId": "46476687147200"
    },
    {
      "label": "1 KG",
      "price": 675,
      "variantId": "47226358857920"
    }
  ],
  "wood-pressed-coconut-oil": [
    {
      "label": "1L glass bottle",
      "price": 977,
      "variantId": "30393637404750"
    },
    {
      "label": "2L can",
      "price": 1845,
      "variantId": "39911734804672"
    },
    {
      "label": "5L can",
      "price": 3953,
      "variantId": "43851237392576"
    },
    {
      "label": "1L plastic bottle",
      "price": 884,
      "variantId": "43150198833344"
    },
    {
      "label": "500ml Jar",
      "price": 558,
      "variantId": "44522444128448"
    }
  ],
  "cold-pressed-khapli-atta-low-100-emmer-wheat-gi-high-fiber-stone-ground-flour": [
    {
      "label": "1 Kg",
      "price": 240,
      "variantId": "46719452676288"
    },
    {
      "label": "2 Kg",
      "price": 465,
      "variantId": "48398221967552"
    },
    {
      "label": "5 Kg",
      "price": 1127,
      "variantId": "46719452643520"
    }
  ],
  "wood-pressed-mustard-oil": [
    {
      "label": "1L glass bottle",
      "price": 523,
      "variantId": "30393367396430"
    },
    {
      "label": "2L can",
      "price": 718,
      "variantId": "44283936637120"
    },
    {
      "label": "1L plastic bottle",
      "price": 400,
      "variantId": "43150198767808"
    },
    {
      "label": "5L can",
      "price": 1632,
      "variantId": "43844702404800"
    },
    {
      "label": "5L tin can",
      "price": 1849,
      "variantId": "39908126326976"
    }
  ],
  "sunflower-oil": [
    {
      "label": "1L glass bottle",
      "price": 580,
      "variantId": "43077260607680"
    },
    {
      "label": "2L can",
      "price": 879,
      "variantId": "43077260640448"
    },
    {
      "label": "5L tin can",
      "price": 2233,
      "variantId": "43077260673216"
    },
    {
      "label": "1L plastic bottle",
      "price": 466,
      "variantId": "43150198735040"
    },
    {
      "label": "5L can",
      "price": 2086,
      "variantId": "43844706795712"
    }
  ],
  "wood-pressed-black-sesame-oil": [
    {
      "label": "1L glass bottle",
      "price": 750,
      "variantId": "30393241829454"
    },
    {
      "label": "2L can",
      "price": 1225,
      "variantId": "39910714310848"
    },
    {
      "label": "5L can",
      "price": 2850,
      "variantId": "43851230085312"
    },
    {
      "label": "1L plastic bottle",
      "price": 645,
      "variantId": "43150198800576"
    }
  ],
  "extra-virgin-olive-oil": [
    {
      "label": "250ml",
      "price": 570,
      "variantId": "45426734530752"
    },
    {
      "label": "500ml",
      "price": 920,
      "variantId": "45650215010496"
    },
    {
      "label": "1L",
      "price": 1700,
      "variantId": "45650215043264"
    }
  ],
  "khapli-multigrain-atta": [
    {
      "label": "2 Kg",
      "price": 360,
      "variantId": "48130399207616"
    },
    {
      "label": "5 Kg",
      "price": 850,
      "variantId": "48404977254592"
    }
  ],
  "turmeric-latte": [
    {
      "label": "100gm",
      "price": 370,
      "variantId": "47258532577472"
    }
  ],
  "kashmiri-mongra-saffron": [
    {
      "label": "1g Box",
      "price": 450,
      "variantId": "43376001122496"
    },
    {
      "label": "2g Box",
      "price": 800,
      "variantId": "48232277180608"
    },
    {
      "label": "5g Box",
      "price": 1900,
      "variantId": "48232277213376"
    }
  ],
  "amlaprash": [
    {
      "label": "350G",
      "price": 343,
      "variantId": "46033354064064"
    }
  ],
  "dry-fruit-paak-bites": [
    {
      "label": "200gm",
      "price": 345,
      "variantId": "47258508755136"
    }
  ]
};
