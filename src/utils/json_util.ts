import { Product } from "@/types/authTypes";
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
import FruitVegetables from "@assets/images/Fruits&Vegetables.jpg";
import FruitPreserved from "@assets/images/Fruits&Preserved.jpg";
import DryFruits from "@assets/images/DryFruits.jpg";
import FreshVegetables from "@assets/images/FreshVegetables.webp";
import ExoticVegetables from "@assets/images/ExoticVegetables.webp";
import ExoticFruits from "@assets/images/ExoticFruit.webp";
import LeafyGreen from "@assets/images/LeafyGreen.webp";
import FertilizerKit from "@assets/images/FertilizerKit.webp";
import ChemicalFertilizer from "@assets/images/ChemicalFertilizer.webp";
import OrganicFertilizer from "@assets/images/OraganicFertlizer.webp";
import PlantGrowth from "@assets/images/PlantGrowth.webp";
import MicroNutrients from "@assets/images/Micronutrients.webp";
import SoilConditioners from "@assets/images/SoilConditioners.webp";
import Herbicides from "@assets/images/Herbicides.webp";
import Fungicides from "@assets/images/Fungicides.webp";
import WeedControl from "@assets/images/WeedControl.webp";
import Rodenticides from "@assets/images/Rodenticides.webp";
import BioPesticides from "@assets/images/Biopesticides.webp";
import Insecticides from "@assets/images/Insecticidies.webp";
import FarmAccessories from "@assets/images/FarmAccessories.webp";
import Tractor from "@assets/images/Tractors.webp";
import Sprayers from "@assets/images/Sprayers.webp";
import Harvestors from "@assets/images/Harvesters.webp";
import PowerTiller from "@assets/images/PowerTriller.webp";
import IrrigationTools from "@assets/images/IrrigationTools.webp";
import irrigation from "@assets/images/Irrigation.jpg";
import sprinklar from "@assets/images/sprinklar.jpg";
import pumps from "@assets/images/pumps.jpg";
import waterstorage from "@assets/images/waterstorage.jpg";
import pipesandfittings from "@assets/images/pipesandfittings.jpg";
import waterfilter from "@assets/images/waterfilter.jpg";
import cattlefeed from "@assets/images/cattlefeed.jpg";
import poultryfood from "@assets/images/poultryfood.jpg";
import vetenarymedichine from "@assets/images/vetenarymedichine.jpg";
import dairyequipment from "@assets/images/dairyequipment.jpg";
import fencing from "@assets/images/Fencing.jpg";
import healthkit from "@assets/images/healthkit.jpg";
import Nursery from "@assets/images/Nursery.jpg";
import GardenTool from "@assets/images/Garden-Tool.jpg";
import pottery from "@assets/images/Pottery.jpg";
import landscape from "@assets/images/landscape.jpg";
import plantcare from "@assets/images/plantcare.jpg";
import Decor from "@assets/images/Decor.jpg";
import soiltesting from "@assets/images/soil-testing.jpg";
import drone from "@assets/images/drone.jpg";
import consultancy from "@assets/images/consultancy.jpg";
import training from "@assets/images/training.jpg";
import rental from "@assets/images/rental.jpg";
import insurance from "@assets/images/insurance.jpg";
import fruits from "@assets/images/fruits.jpg";
import spices from "@assets/images/spices.jpg";
import processedfood from "@assets/images/processed-food.jpg";
import Vegetable1 from "@assets/images/vegetables1.webp";
import Flowers from "@assets/images/Flowers.webp";
import Grains from "@assets/images/grains.webp";

export const products: Product[] = [
  {
    id: 1,
    name: "Organic Grain",
    image: "/src/assets/card_images/wheat.jpg",
    price: "$18.00 / 10kg",
  },
  {
    id: 2,
    name: "Paddy ",
    image: "/src/assets/card_images/paddy.jpg",
    price: "$6.50",
  },
  {
    id: 3,
    name: "Fresh Cow Milk ",
    image: "/src/assets/card_images/milk.jpg",
    price: "$3.25",
  },
  {
    id: 4,
    name: "Honey ",
    image: "/src/assets/card_images/honey.jpg",
    price: "$12.00 / 500g",
  },
  {
    id: 5,
    name: "Seasonal veggies",
    image: "/src/assets/card_images/veggies.jpg",
    price: "$25.00 / box",
  },
  {
    id: 6,
    name: "Farm-Raised ",
    image: "/src/assets/card_images/sunflower.jpg",
    price: "$15.00 / kg",
  },
  {
    id: 7,
    name: "Organic Fertilizer",
    image: "/src/assets/card_images/tractor.jpg",
    price: "$10.00 / bag",
  },
  {
    id: 8,
    name: "Fertilizer",
    image: "/src/assets/card_images/fertilizer.jpg",
    price: "$7.00 / bale",
  },
];

export const Market_Category_data: CategoryData = {
  categories: [
    {
      leftCard: {
        title: "Fruits & Vegetables",
        description:
          "Fresh and high-quality fruits and vegetables for everyday needs.",
        image: FruitVegetables,
      },
      categories: [
        {
          title: "Fresh, Dried & Preserved Fruits",
          image: FruitPreserved,
          items: ["Apple", "Banana", "Mango"],
        },
        {
          title: "Dry Fruits & Nuts",
          image: DryFruits,
          items: ["Almonds", "Cashew Nuts", "Walnuts"],
        },
        {
          title: "Leafy Greens",
          image: LeafyGreen,
          items: ["Spinach", "Lettuce", "Kale"],
        },
        {
          title: "Exotic Fruits",
          image: ExoticFruits,
          items: ["Dragon Fruit", "Kiwi", "Avocado"],
        },
        {
          title: "Exotic Vegetables",
          image: ExoticVegetables,
          items: ["Broccoli", "Zucchini", "Bell Peppers"],
        },
        {
          title: "Fresh Vegetables",
          image: FreshVegetables,
          items: ["Tomato", "Carrot", "Cucumber"],
        },
      ],
    },

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
          image: ChemicalFertilizer,
          items: ["Urea", "DAP", "Potash"],
        },
        {
          title: "Organic Fertilizers",
          image: OrganicFertilizer,
          items: ["Compost", "Vermicompost", "Manure"],
        },
        {
          title: "Plant Growth Promoters",
          image: PlantGrowth,
          items: ["Hormones", "Bio-stimulants", "Foliar Sprays"],
        },
        {
          title: "Micronutrients",
          image: MicroNutrients,
          items: ["Iron", "Zinc", "Manganese"],
        },
        {
          title: "Soil Conditioners",
          image: SoilConditioners,
          items: ["Gypsum", "Lime", "Humic Acid"],
        },
        {
          title: "Fertilizer Kits",
          image: FertilizerKit,
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
          image: Insecticides,
          items: ["Neem Oil", "Chlorpyrifos", "Imidacloprid"],
        },
        {
          title: "Fungicides",
          image: Fungicides,
          items: ["Sulphur", "Mancozeb", "Tricyclazole"],
        },
        {
          title: "Herbicides",
          image: Herbicides,
          items: ["Glyphosate", "Paraquat", "Atrazine"],
        },
        {
          title: "Biopesticides",
          image: BioPesticides,
          items: ["Bt", "Trichoderma", "Pseudomonas"],
        },
        {
          title: "Rodenticides",
          image: Rodenticides,
          items: ["Zinc Phosphide", "Bromadiolone", "Coumatetralyl"],
        },
        {
          title: "Weed Control Kits",
          image: WeedControl,
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
          image: Tractor,
          items: ["Mini Tractor", "Utility Tractor", "Heavy Tractor"],
        },
        {
          title: "Power Tillers",
          image: PowerTiller,
          items: ["2-Wheel Tiller", "Rotary Tiller", "Cultivator"],
        },
        {
          title: "Irrigation Tools",
          image: IrrigationTools,
          items: ["Sprinklers", "Drip Irrigation", "Pipes"],
        },
        {
          title: "Harvesters",
          image: Harvestors,
          items: ["Combine Harvester", "Reaper", "Thresher"],
        },
        {
          title: "Sprayers",
          image: Sprayers,
          items: ["Hand Sprayer", "Knapsack Sprayer", "Power Sprayer"],
        },
        {
          title: "Farm Accessories",
          image: FarmAccessories,
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
          image: irrigation,
          items: ["Drip Kits", "Emitters", "Pipes"],
        },
        {
          title: "Sprinkler Systems",
          image: sprinklar,
          items: ["Mini Sprinklers", "Impact Sprinklers", "Rain Guns"],
        },
        {
          title: "Pumps",
          image: pumps,
          items: ["Centrifugal Pump", "Submersible Pump", "Solar Pump"],
        },
        {
          title: "Water Storage",
          image: waterstorage,
          items: ["Tanks", "Ponds", "Reservoirs"],
        },
        {
          title: "Pipes & Fittings",
          image: pipesandfittings,
          items: ["PVC Pipes", "HDPE Pipes", "Couplers"],
        },
        {
          title: "Water Filters",
          image: waterfilter,
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
          image: cattlefeed,
          items: ["Dairy Feed", "Calf Starter", "Mineral Mixture"],
        },
        {
          title: "Poultry Feed",
          image: poultryfood,
          items: ["Broiler Feed", "Layer Feed", "Chick Starter"],
        },
        {
          title: "Veterinary Medicines",
          image: vetenarymedichine,
          items: ["Dewormers", "Antibiotics", "Supplements"],
        },
        {
          title: "Dairy Equipment",
          image: dairyequipment,
          items: ["Milking Machine", "Chilling Unit", "Milk Can"],
        },
        {
          title: "Housing & Fencing",
          image: fencing,
          items: ["Barbed Wire", "Electric Fencing", "Netting"],
        },
        {
          title: "Health Care Kits",
          image: healthkit,
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
          image: Nursery,
          items: ["Fruit Saplings", "Ornamental Plants", "Medicinal Plants"],
        },
        {
          title: "Garden Tools",
          image: GardenTool,
          items: ["Pruners", "Shovels", "Rakes"],
        },
        {
          title: "Pottery & Grow Bags",
          image: pottery,
          items: ["Clay Pots", "Plastic Pots", "Grow Bags"],
        },
        {
          title: "Landscaping",
          image: landscape,
          items: ["Grass Rolls", "Pebbles", "Artificial Turf"],
        },
        {
          title: "Plant Care Products",
          image: plantcare,
          items: ["Fertilizer Sticks", "Neem Oil Spray", "Growth Boosters"],
        },
        {
          title: "Decor Items",
          image: Decor,
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
          image: soiltesting,
          items: ["pH Testing", "NPK Testing", "Micro Nutrient Testing"],
        },
        {
          title: "Drone Spraying",
          image: drone,
          items: [
            "Crop Monitoring",
            "Pesticide Spraying",
            "Fertilizer Spraying",
          ],
        },
        {
          title: "Farm Consultancy",
          image: consultancy,
          items: [
            "Organic Farming",
            "Precision Farming",
            "Irrigation Planning",
          ],
        },
        {
          title: "Machinery Rental",
          image: rental,
          items: ["Tractor Rental", "Harvester Rental", "Sprayer Rental"],
        },
        {
          title: "Training Programs",
          image: training,
          items: ["Soil Health", "Crop Protection", "Organic Farming"],
        },
        {
          title: "Insurance Services",
          image: insurance,
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
          image: Grains,
          items: ["Rice", "Wheat", "Maize"],
        },
        {
          title: "Fruits",
          image: fruits,
          items: ["Banana", "Mango", "Papaya"],
        },
        {
          title: "Vegetables",
          image: Vegetable1,
          items: ["Tomato", "Onion", "Potato"],
        },
        {
          title: "Spices",
          image: spices,
          items: ["Turmeric", "Chilli", "Coriander"],
        },
        {
          title: "Flowers",
          image: Flowers,
          items: ["Rose", "Jasmine", "Marigold"],
        },
        {
          title: "Processed Foods",
          image: processedfood,
          items: ["Pickles", "Jams", "Flours"],
        },
      ],
    },
  ],
};
