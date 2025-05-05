const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Yoga = require("./models/Yoga");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const yogaPoses = [
  {
    condition: "back_pain",
    title: "Cat-Cow Pose",
    description: "Improves spine flexibility and reduces back pain.",
    imageUrl: "./public/images/cat-cow.jpeg",
    pageUrl: "./yoga_sessions/catCow.html"
  },
  {
    condition: "back_pain",
    title: "Child’s Pose",
    description: "Relieves tension in the lower back.",
    imageUrl: "./public/images/childpose.avif",
    pageUrl: "./yoga_sessions/catCow.html"
  },
  {
    condition: "back_pain",
    title: "Cobra Pose",
    description: "Relieves tension in the lower back.",
    imageUrl: "./public/images/cobra.jpeg",
    pageUrl: "./yoga_sessions/catCow.html"
  },
  {
    condition: "back_pain",
    title: "Bridge Pose",
    description: "Relieves tension in the lower back.",
    imageUrl: "./public/images/bridgepose.avif",
    pageUrl: "./yoga_sessions/catCow.html"
  },
  {
    condition: "stress",
    title: "Padmasana",
    description: "Promotes relaxation and deep breathing.",
    imageUrl: "./public/images/padmasana.jpeg",
    pageUrl: "./yoga_sessions/catCow.html"
  },
  {
    condition: "weight_loss",
    title: "Surya Namaskar",
    description: "Boosts metabolism and burns calories.",
    imageUrl: "./public/images/suryanamaskar.jpeg",
    pageUrl: "./yoga_sessions/catCow.html"
  }
];

const seedDatabase = async () => {
  try {
    await Yoga.deleteMany(); // Clears existing data
    await Yoga.insertMany(yogaPoses);
    console.log("Yoga poses added successfully!");
    mongoose.connection.close();
  } catch (err) {
    console.error("Error seeding database:", err);
  }
};

seedDatabase();
