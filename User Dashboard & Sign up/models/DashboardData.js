const mongoose = require("mongoose");

const dashboardSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  personalDetails: {
    name: String,
    email: String,
  },
  healthMetrics: {
    age: Number,
    height: Number,
    weight: Number,
    bloodGroup: String,
  },
  dailyStreak: {
    streakCount: { type: Number, default: 0 },
    lastActivity: { type: Date, default: null },
  },
  completedSessions: [
    {
      date: Date,
      pose: String,
      duration: Number,
    },
  ],
  plans: {
    yogaPlan: String,
    dietPlan: String,
  },
});

module.exports = mongoose.model("DashboardData", dashboardSchema);