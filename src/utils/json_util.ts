import { FooterData } from "@/types/footerType";
import { CategoryData } from "@/types/marketTypes";
import FlowerSeed from "@/assets/images/FlowerSeed.jpg";
import GrassSeed from "@/assets/images/GrassSeeds.jpg";
import SoilFertilizer from "@/assets/images/SoilFertilizers.jpg";
import VegetableSeed from "@/assets/images/VegetableSeed.jpg";
import FruitSeed from "@/assets/images/FruitSeed.png";
import HerbSeed from "@/assets/images/HerbSeed.jpg";
import HybridSeed from "@/assets/images/HybridSeed.jpg";
import CropProtection from "@/assets/images/CropProtection.jpg";
import FarmingEquipment from "@/assets/images/FarmingEquipment.jpg";
import Irrigation from "@/assets/images/Irrigation.jpg";
import AnimalHusbandry from "@/assets/images/AnimalHusbandry.jpg";
import CropRaw from "@/assets/images/Crop&Raw.jpg";
import AgriProducts from "@/assets/images/AgriProducts.jpg";
import AgriServices from "@/assets/images/AgriServices.jpg";
import SeedPlanting from "@/assets/images/SeedPlanting.jpg";

export const footer_data: FooterData = {
  footerHeaderText: "We are here to help you!",
  goMobile: "Go Mobile:",
  followUsOn: "Follow us on:",
  aboutUs: [
    "About Us",
    "IndiaMART Export",
    "join Sales",
    "Success Stories",
    "Press Section",
    "Advertise with us",
  ],
  jobCareers: [
    "Job & Careers",
    "Help",
    "Feedback",
    "Complaints",
    "Customer Care",
    "Contact us",
  ],
  buyToolkit: [
    "Supplier Tool Kit",
    "Sell on IndiaMART",
    "Latest BuyLead",
    "Learning Centre",
  ],
  accountingSolutions: [
    "Buyer Tool Kit",
    "Post Your Requirement",
    "join Sales",
    "Products You Buy",
    "Search Products & Supplier",
  ],
  supplierToolkit: ["Accounting Software", "Tally On Mobile", "GST e-Invoice"],
  copyRight:
    "Copyright © 1996-2025 IndiaMART InterMESH Ltd. All rights reserved.",
  termsUse: "Terms of Use-Privacy Policy Link to Us",
};

export const Market_Category_data: CategoryData = {
  categories: [
    {
      leftCard: {
        title: "Seeds & Planting",
        description:
          "High-quality seeds for different crops and planting needs.",
        image: SeedPlanting,
      },
      categories: [
        {
          title: "Vegetable Seeds",
          image: VegetableSeed,
          items: ["Tomato", "Onion", "Chilli"],
        },
        {
          title: "Fruit Seeds",
          image: FruitSeed,
          items: ["Mango", "Papaya", "Banana"],
        },
        {
          title: "Hybrid Seeds",
          image: HybridSeed,
          items: ["Hybrid Paddy", "Hybrid Maize", "Hybrid Cotton"],
        },
        {
          title: "Herb Seeds",
          image: HerbSeed,
          items: ["Basil", "Coriander", "Mint"],
        },
        {
          title: "Flower Seeds",
          image: FlowerSeed,
          items: ["Marigold", "Sunflower", "Rose"],
        },
        {
          title: "Grass & Turf Seeds",
          image: GrassSeed,
          items: ["Bermuda", "Fescue", "Ryegrass"],
        },
      ],
    },

    {
      leftCard: {
        title: "Fertilizers & Soil Enhancers",
        description:
          "Boost crop yield with the right fertilizers and soil enhancers.",
        image: SoilFertilizer,
      },
      categories: [
        {
          title: "Chemical Fertilizers",
          image: VegetableSeed,
          items: ["Urea", "DAP", "Potash"],
        },
        {
          title: "Organic Fertilizers",
          image: FruitSeed,
          items: ["Compost", "Vermicompost", "Manure"],
        },
        {
          title: "Plant Growth Promoters",
          image: HybridSeed,
          items: ["Hormones", "Bio-stimulants", "Foliar Sprays"],
        },
        {
          title: "Micronutrients",
          image: HerbSeed,
          items: ["Iron", "Zinc", "Manganese"],
        },
        {
          title: "Soil Conditioners",
          image: FlowerSeed,
          items: ["Gypsum", "Lime", "Humic Acid"],
        },
        {
          title: "Fertilizer Kits",
          image: GrassSeed,
          items: ["Starter Kit", "Grow Kit", "Flowering Kit"],
        },
      ],
    },

    {
      leftCard: {
        title: "Crop Protection",
        description: "Protect crops from pests, diseases, and weeds.",
        image: CropProtection,
      },
      categories: [
        {
          title: "Insecticides",
          image: VegetableSeed,
          items: ["Neem Oil", "Chlorpyrifos", "Imidacloprid"],
        },
        {
          title: "Fungicides",
          image: FruitSeed,
          items: ["Sulphur", "Mancozeb", "Tricyclazole"],
        },
        {
          title: "Herbicides",
          image: HybridSeed,
          items: ["Glyphosate", "Paraquat", "Atrazine"],
        },
        {
          title: "Biopesticides",
          image: HerbSeed,
          items: ["Bt", "Trichoderma", "Pseudomonas"],
        },
        {
          title: "Rodenticides",
          image: FlowerSeed,
          items: ["Zinc Phosphide", "Bromadiolone", "Coumatetralyl"],
        },
        {
          title: "Weed Control Kits",
          image: GrassSeed,
          items: ["Weeder Spray Kit", "Herbicide Pack", "Knapsack Kit"],
        },
      ],
    },

    {
      leftCard: {
        title: "Farming Equipment",
        description:
          "Modern equipment to make farming easier and more efficient.",
        image: FarmingEquipment,
      },
      categories: [
        {
          title: "Tractors",
          image: VegetableSeed,
          items: ["Mini Tractor", "Utility Tractor", "Heavy Tractor"],
        },
        {
          title: "Power Tillers",
          image: FruitSeed,
          items: ["2-Wheel Tiller", "Rotary Tiller", "Cultivator"],
        },
        {
          title: "Irrigation Tools",
          image: HybridSeed,
          items: ["Sprinklers", "Drip Irrigation", "Pipes"],
        },
        {
          title: "Harvesters",
          image: HerbSeed,
          items: ["Combine Harvester", "Reaper", "Thresher"],
        },
        {
          title: "Sprayers",
          image: FlowerSeed,
          items: ["Hand Sprayer", "Knapsack Sprayer", "Power Sprayer"],
        },
        {
          title: "Farm Accessories",
          image: GrassSeed,
          items: ["Plough", "Seed Drill", "Weeders"],
        },
      ],
    },

    {
      leftCard: {
        title: "Irrigation & Water Management",
        description: "Save water and ensure efficient irrigation solutions.",
        image: Irrigation,
      },
      categories: [
        {
          title: "Drip Irrigation",
          image: VegetableSeed,
          items: ["Drip Kits", "Emitters", "Pipes"],
        },
        {
          title: "Sprinkler Systems",
          image: FruitSeed,
          items: ["Mini Sprinklers", "Impact Sprinklers", "Rain Guns"],
        },
        {
          title: "Pumps",
          image: HybridSeed,
          items: ["Centrifugal Pump", "Submersible Pump", "Solar Pump"],
        },
        {
          title: "Water Storage",
          image: HerbSeed,
          items: ["Tanks", "Ponds", "Reservoirs"],
        },
        {
          title: "Pipes & Fittings",
          image: FlowerSeed,
          items: ["PVC Pipes", "HDPE Pipes", "Couplers"],
        },
        {
          title: "Water Filters",
          image: GrassSeed,
          items: ["Sand Filter", "Screen Filter", "Disc Filter"],
        },
      ],
    },

    {
      leftCard: {
        title: "Animal Husbandry",
        description: "Quality products for livestock care and management.",
        image: AnimalHusbandry,
      },
      categories: [
        {
          title: "Cattle Feed",
          image: VegetableSeed,
          items: ["Dairy Feed", "Calf Starter", "Mineral Mixture"],
        },
        {
          title: "Poultry Feed",
          image: FruitSeed,
          items: ["Broiler Feed", "Layer Feed", "Chick Starter"],
        },
        {
          title: "Veterinary Medicines",
          image: HybridSeed,
          items: ["Dewormers", "Antibiotics", "Supplements"],
        },
        {
          title: "Dairy Equipment",
          image: HerbSeed,
          items: ["Milking Machine", "Chilling Unit", "Milk Can"],
        },
        {
          title: "Housing & Fencing",
          image: FlowerSeed,
          items: ["Barbed Wire", "Electric Fencing", "Netting"],
        },
        {
          title: "Health Care Kits",
          image: GrassSeed,
          items: ["First Aid Kit", "Vaccination Kit", "Cleaning Kit"],
        },
      ],
    },

    {
      leftCard: {
        title: "Horticulture",
        description: "Everything you need for gardening and horticulture.",
        image: CropRaw,
      },
      categories: [
        {
          title: "Nursery Plants",
          image: VegetableSeed,
          items: ["Fruit Saplings", "Ornamental Plants", "Medicinal Plants"],
        },
        {
          title: "Garden Tools",
          image: FruitSeed,
          items: ["Pruners", "Shovels", "Rakes"],
        },
        {
          title: "Pottery & Grow Bags",
          image: HybridSeed,
          items: ["Clay Pots", "Plastic Pots", "Grow Bags"],
        },
        {
          title: "Landscaping",
          image: HerbSeed,
          items: ["Grass Rolls", "Pebbles", "Artificial Turf"],
        },
        {
          title: "Plant Care Products",
          image: FlowerSeed,
          items: ["Fertilizer Sticks", "Neem Oil Spray", "Growth Boosters"],
        },
        {
          title: "Decor Items",
          image: GrassSeed,
          items: ["Garden Lights", "Statues", "Fountains"],
        },
      ],
    },

    {
      leftCard: {
        title: "Agri Services",
        description: "Professional services for modern farming.",
        image: AgriServices,
      },
      categories: [
        {
          title: "Soil Testing",
          image: VegetableSeed,
          items: ["pH Testing", "NPK Testing", "Micro Nutrient Testing"],
        },
        {
          title: "Drone Spraying",
          image: FruitSeed,
          items: [
            "Crop Monitoring",
            "Pesticide Spraying",
            "Fertilizer Spraying",
          ],
        },
        {
          title: "Farm Consultancy",
          image: HybridSeed,
          items: [
            "Organic Farming",
            "Precision Farming",
            "Irrigation Planning",
          ],
        },
        {
          title: "Machinery Rental",
          image: HerbSeed,
          items: ["Tractor Rental", "Harvester Rental", "Sprayer Rental"],
        },
        {
          title: "Training Programs",
          image: FlowerSeed,
          items: ["Soil Health", "Crop Protection", "Organic Farming"],
        },
        {
          title: "Insurance Services",
          image: GrassSeed,
          items: [
            "Crop Insurance",
            "Livestock Insurance",
            "Equipment Insurance",
          ],
        },
      ],
    },

    {
      leftCard: {
        title: "Agri Marketplace",
        description: "Buy and sell agricultural products online.",
        image: AgriProducts,
      },
      categories: [
        {
          title: "Grains",
          image: VegetableSeed,
          items: ["Rice", "Wheat", "Maize"],
        },
        {
          title: "Fruits",
          image: FruitSeed,
          items: ["Banana", "Mango", "Papaya"],
        },
        {
          title: "Vegetables",
          image: HybridSeed,
          items: ["Tomato", "Onion", "Potato"],
        },
        {
          title: "Spices",
          image: HerbSeed,
          items: ["Turmeric", "Chilli", "Coriander"],
        },
        {
          title: "Flowers",
          image: FlowerSeed,
          items: ["Rose", "Jasmine", "Marigold"],
        },
        {
          title: "Processed Foods",
          image: GrassSeed,
          items: ["Pickles", "Jams", "Flours"],
        },
      ],
    },
  ],
};

export const heroIcons = []