const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// ------------------ MongoDB Connection ------------------
//mongoose.connect("mongodb://127.0.0.1:27017/loginDB")
mongoose.connect("mongodb+srv://karthikj:karthikj@cluster0.hkz6yzz.mongodb.net/loginDB?retryWrites=true&w=majority")


  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("❌ MongoDB Connection Error:", err));

// ------------------ User Schema ------------------
const User = mongoose.model("User", {
  username: String,
  password: String,
  phone: String
});

// ------------------ Plant Schema ------------------
const plantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  waterNeed: { type: String, required: true },
  sunlight: { type: String, required: true },
  price: { type: Number, required: true },
  img: { type: String, required: true },
  badge: { type: String },
  availableSizes: { type: [String], required: true },
  stock: { type: Number, default: 10 }
});

const Plant = mongoose.model("Plant", plantSchema);

// ------------------ Middleware ------------------
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(session({
  secret: "secretkey",
  resave: false,
  saveUninitialized: true
}));

// ------------------ Routes ------------------

// Login Page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Register Page
app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "register.html"));
});

// ------------------ Registration ------------------
app.post("/register", async (req, res) => {
  try {
    console.log("📌 Registration Request Body:", req.body);

    const { username, phone, password } = req.body;

    if (!username || !phone || !password) {
      console.log("⚠️ Missing fields");
      return res.send("❌ All fields are required");
    }

    const trimmedUsername = username.trim();
    const trimmedPhone = phone.toString().trim();

    console.log("🔹 Trimmed Username:", trimmedUsername);
    console.log("🔹 Trimmed Phone:", trimmedPhone);

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ username: trimmedUsername }, { phone: trimmedPhone }]
    });

    console.log("🔹 Existing User Found:", existingUser);

    if (existingUser) {
      if (existingUser.username === trimmedUsername) {
        console.log("⚠️ Username already exists");
        return res.send("❌ Username already exists");
      }
      if (existingUser.phone === trimmedPhone) {
        console.log("⚠️ Phone number already registered");
        return res.send("❌ Phone number already registered");
      }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("🔹 Hashed Password:", hashedPassword);

    // Create new user
    const user = new User({
      username: trimmedUsername,
      phone: trimmedPhone,
      password: hashedPassword
    });

    const savedUser = await user.save();
    console.log("✅ User Saved:", savedUser);

    res.send("✅ Registration successful");
  } catch (err) {
    console.log("❌ Error in /register:", err);
    res.send("❌ Error registering user");
  }
});

// ------------------ Login ------------------
app.post("/login", async (req, res) => {
  try {
    console.log("📌 Login Request Body:", req.body);

    const { username, phone, password } = req.body;

    // Trim safely
    const trimmedUsername = username ? username.trim() : "";
    const trimmedPhone = phone ? phone.toString().trim() : "";

    // ❗ Check at least one is provided
    if (!trimmedUsername && !trimmedPhone) {
      return res.send("❌ Enter username or phone");
    }

    // 🔍 Find user by username OR phone
    const user = await User.findOne({
      $or: [
        trimmedUsername ? { username: trimmedUsername } : null,
        trimmedPhone ? { phone: trimmedPhone } : null
      ].filter(Boolean)
    });

    if (!user) {
      return res.send("❌ User not found");
    }

    // 🔐 Check password
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("🔹 Password Match:", isMatch);

    if (!isMatch) return res.send("❌ Wrong password");

    // ✅ Success
    req.session.user = user.username;
    res.send("✅ Login successful");

  } catch (err) {
    console.log("❌ Error in /login:", err);
    res.send("❌ Error logging in");
  }
});

// ------------------ API Routes for Plants ------------------

// Get all plants
app.get("/api/plants", async (req, res) => {
  try {
    const plants = await Plant.find();
    res.json(plants);
  } catch (err) {
    console.log("❌ Error fetching plants:", err);
    res.status(500).json({ error: "Error fetching plants" });
  }
});

// Get single plant by ID
app.get("/api/plants/:id", async (req, res) => {
  try {
    const plant = await Plant.findById(req.params.id);
    if (!plant) {
      return res.status(404).json({ error: "Plant not found" });
    }
    res.json(plant);
  } catch (err) {
    console.log("❌ Error fetching plant:", err);
    res.status(500).json({ error: "Error fetching plant" });
  }
});

// Add new plant (Admin only - you can add authentication later)
app.post("/api/plants", async (req, res) => {
  try {
    const { name, category, waterNeed, sunlight, price, img, badge, availableSizes, stock } = req.body;
    
    const plant = new Plant({
      name,
      category,
      waterNeed,
      sunlight,
      price,
      img,
      badge: badge || "Fresh",
      availableSizes,
      stock: stock || 10
    });
    
    const savedPlant = await plant.save();
    res.status(201).json(savedPlant);
  } catch (err) {
    console.log("❌ Error adding plant:", err);
    res.status(500).json({ error: "Error adding plant" });
  }
});

// Update plant
app.put("/api/plants/:id", async (req, res) => {
  try {
    const updatedPlant = await Plant.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedPlant) {
      return res.status(404).json({ error: "Plant not found" });
    }
    res.json(updatedPlant);
  } catch (err) {
    console.log("❌ Error updating plant:", err);
    res.status(500).json({ error: "Error updating plant" });
  }
});

// Delete plant
app.delete("/api/plants/:id", async (req, res) => {
  try {
    const deletedPlant = await Plant.findByIdAndDelete(req.params.id);
    if (!deletedPlant) {
      return res.status(404).json({ error: "Plant not found" });
    }
    res.json({ message: "Plant deleted successfully" });
  } catch (err) {
    console.log("❌ Error deleting plant:", err);
    res.status(500).json({ error: "Error deleting plant" });
  }
});

// ------------------ Dashboard ------------------
app.get("/dashboard", (req, res) => {
  if (!req.session.user) return res.redirect("/");
  res.sendFile(path.join(__dirname, "public", "dashboard.html"));
});

// ------------------ Logout ------------------
app.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

// ------------------ Start Server ------------------
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});