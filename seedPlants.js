const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/loginDB")
//mongoose.connect("mongodb+srv://karthikj:karthikj@cluster0.hkz6yzz.mongodb.net/loginDB?retryWrites=true&w=majority")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("❌ MongoDB Connection Error:", err));

const plantSchema = new mongoose.Schema({
  name: String,
  category: String,
  waterNeed: String,
  sunlight: String,
  price: Number,
  img: String,
  badge: String,
  availableSizes: [String],
  stock: Number
});

const Plant = mongoose.model("Plant", plantSchema);

const plants = [
  {
    name: "Monstera Deliciosa",
    category: "Indoor",
    waterNeed: "Moderate",
    sunlight: "Partial Shade",
    price: 1299,
    img: "https://nurserylive.com/cdn/shop/products/nurserylive-air-purifier-money-plant_305x305.jpg?v=1634212709",
    badge: "Trending",
    availableSizes: ["6 inch", "8 inch", "10 inch"],
    stock: 15
  },
  {
    name: "Snake Plant Laurentii",
    category: "Indoor",
    waterNeed: "Low",
    sunlight: "Low Light",
    price: 899,
    img: "https://nurserylive.com/cdn/shop/files/predict-3dfb876f-1478-4d4e-96dc-34c04c771ced-1_305x305.webp?v=1763573030",
    badge: "Air Purifier",
    availableSizes: ["4 inch", "6 inch", "8 inch"],
    stock: 20
  },
  {
    name: "Jade Plant (Crassula)",
    category: "Succulent",
    waterNeed: "Low",
    sunlight: "Full Sun",
    price: 549,
    img: "https://nurserylive.com/cdn/shop/products/nurserylive-g-jasminum-sambac-mogra-arabian-jasmine-1_229x305.jpg?v=1634222610",
    badge: "Lucky Plant",
    availableSizes: ["4 inch", "6 inch"],
    stock: 25
  },
  {
    name: "Peace Lily Spathiphyllum",
    category: "Flowering",
    waterNeed: "Moderate",
    sunlight: "Partial Shade",
    price: 1099,
    img: "https://nurserylive.com/cdn/shop/files/nurserylive-g-ixora-any-color-plant-920988_fa0621d9-aca9-42fa-b693-a89b82cfae39_305x305.jpg?v=1763573021",
    badge: "White Blooms",
    availableSizes: ["6 inch", "8 inch", "10 inch"],
    stock: 12
  },
  {
    name: "Areca Palm",
    category: "Outdoor",
    waterNeed: "Moderate",
    sunlight: "Full Sun",
    price: 1599,
    img: "https://nurserylive.com/cdn/shop/files/predict-939f48a9-788c-4b3f-9f62-aeeb1e9fb8c7-1_305x305.webp?v=1763573021",
    badge: "Tropical",
    availableSizes: ["8 inch", "10 inch", "12 inch"],
    stock: 10
  },
  {
    name: "Aloe Vera",
    category: "Succulent",
    waterNeed: "Low",
    sunlight: "Full Sun",
    price: 399,
    img: "https://nurserylive.com/cdn/shop/products/nurserylive-damascus-rose-scented-rose-any-color-plant_305x305.jpg?v=1634217615",
    badge: "Medicinal",
    availableSizes: ["4 inch", "6 inch"],
    stock: 30
  },
  {
    name: "Fiddle Leaf Fig",
    category: "Indoor",
    waterNeed: "Moderate",
    sunlight: "Partial Shade",
    price: 2499,
    img: "https://nurserylive.com/cdn/shop/files/predict-8eb811fc-c50a-4070-957a-4c5dfaead142-3_305x305.webp?v=1763534590",
    badge: "Statement Plant",
    availableSizes: ["8 inch", "10 inch", "12 inch"],
    stock: 8
  },
  {
    name: "Rose Plant (Red)",
    category: "Flowering",
    waterNeed: "High",
    sunlight: "Full Sun",
    price: 699,
    img: "https://nurserylive.com/cdn/shop/products/nurserylive-combo-packs-plants-pack-of-3-good-luck-jade-plants-in-ceramic-pots-16969154297996_600x600.jpg?v=1634225377",
    badge: "Fragrant",
    availableSizes: ["6 inch", "8 inch"],
    stock: 18
  },
  {
    name: "Monstera Deliciosa",
    category: "Indoor",
    waterNeed: "Moderate",
    sunlight: "Partial Shade",
    price: 1299,
    img: "https://nurserylive.com/cdn/shop/products/nurserylive-air-purifier-money-plant_305x305.jpg?v=1634212709",
    badge: "Trending",
    availableSizes: ["6 inch", "8 inch", "10 inch"],
    stock: 15
  },
  {
    name: "Snake Plant Laurentii",
    category: "Indoor",
    waterNeed: "Low",
    sunlight: "Low Light",
    price: 899,
    img: "https://nurserylive.com/cdn/shop/files/predict-3dfb876f-1478-4d4e-96dc-34c04c771ced-1_305x305.webp?v=1763573030",
    badge: "Air Purifier",
    availableSizes: ["4 inch", "6 inch", "8 inch"],
    stock: 20
  },
  {
    name: "Jade Plant (Crassula)",
    category: "Succulent",
    waterNeed: "Low",
    sunlight: "Full Sun",
    price: 549,
    img: "https://nurserylive.com/cdn/shop/products/nurserylive-g-jasminum-sambac-mogra-arabian-jasmine-1_229x305.jpg?v=1634222610",
    badge: "Lucky Plant",
    availableSizes: ["4 inch", "6 inch"],
    stock: 25
  },
  {
    name: "Peace Lily Spathiphyllum",
    category: "Flowering",
    waterNeed: "Moderate",
    sunlight: "Partial Shade",
    price: 1099,
    img: "https://nurserylive.com/cdn/shop/files/nurserylive-g-ixora-any-color-plant-920988_fa0621d9-aca9-42fa-b693-a89b82cfae39_305x305.jpg?v=1763573021",
    badge: "White Blooms",
    availableSizes: ["6 inch", "8 inch", "10 inch"],
    stock: 12
  },
  {
    name: "Areca Palm",
    category: "Outdoor",
    waterNeed: "Moderate",
    sunlight: "Full Sun",
    price: 1599,
    img: "https://nurserylive.com/cdn/shop/files/predict-939f48a9-788c-4b3f-9f62-aeeb1e9fb8c7-1_305x305.webp?v=1763573021",
    badge: "Tropical",
    availableSizes: ["8 inch", "10 inch", "12 inch"],
    stock: 10
  },
  {
    name: "Aloe Vera",
    category: "Succulent",
    waterNeed: "Low",
    sunlight: "Full Sun",
    price: 399,
    img: "https://nurserylive.com/cdn/shop/products/nurserylive-damascus-rose-scented-rose-any-color-plant_305x305.jpg?v=1634217615",
    badge: "Medicinal",
    availableSizes: ["4 inch", "6 inch"],
    stock: 30
  },
  {
    name: "Fiddle Leaf Fig",
    category: "Indoor",
    waterNeed: "Moderate",
    sunlight: "Partial Shade",
    price: 2499,
    img: "https://nurserylive.com/cdn/shop/files/predict-8eb811fc-c50a-4070-957a-4c5dfaead142-3_305x305.webp?v=1763534590",
    badge: "Statement Plant",
    availableSizes: ["8 inch", "10 inch", "12 inch"],
    stock: 8
  },
  {
    name: "Rose Plant (Red)",
    category: "Flowering",
    waterNeed: "High",
    sunlight: "Full Sun",
    price: 699,
    img: "https://nurserylive.com/cdn/shop/products/nurserylive-combo-packs-plants-pack-of-3-good-luck-jade-plants-in-ceramic-pots-16969154297996_600x600.jpg?v=1634225377",
    badge: "Fragrant",
    availableSizes: ["6 inch", "8 inch"],
    stock: 18
  }
];

async function seedDatabase() {
  try {
    // Clear existing plants
    await Plant.deleteMany({});
    console.log("✅ Cleared existing plants");
    
    // Insert new plants
    const inserted = await Plant.insertMany(plants);
    console.log(`✅ Inserted ${inserted.length} plants`);
    
    console.log("🌱 Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
}

seedDatabase();