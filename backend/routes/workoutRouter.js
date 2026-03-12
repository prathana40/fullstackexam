 const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/requireAuth");
const {
  getAllWorkouts,
  createWorkout,
  getWorkoutById,
  updateWorkout,
  deleteWorkout,
} = require("../controllers/workoutControllers");

// All routes are protected by requireAuth
router.get("/", requireAuth, getAllWorkouts);
router.post("/", requireAuth, createWorkout);
router.get("/:workoutId", requireAuth, getWorkoutById);
router.put("/:workoutId", requireAuth, updateWorkout);
router.delete("/:workoutId", requireAuth, deleteWorkout);

module.exports = router;
