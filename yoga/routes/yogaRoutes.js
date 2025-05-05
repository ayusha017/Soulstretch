const express = require("express");
const Yoga = require("../models/Yoga"); // Import Yoga model
const router = express.Router();

// ✅ Get Yoga poses by condition (with query params support)
router.get("/", async (req, res) => {
    try {
        const { condition } = req.query;

        if (!condition) {
            return res.status(400).json({ error: "Condition is required" });
        }

        // Fetch filtered yoga poses
        const yogaPoses = await Yoga.find({ condition });

        if (yogaPoses.length === 0) {
            return res.status(404).json({ message: "No yoga poses found for this condition." });
        }

        res.json(yogaPoses);
    } catch (error) {
        console.error("Error fetching yoga poses:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;

