 const Workout = require("../models/workoutModel");

const getAllWorkouts = async (req, res) => {
  const workouts = await Workout.find({});
  res.json(workouts);
};

const createWorkout = async (req, res) => {
  const workout = await Workout.create(req.body);
  res.status(201).json(workout);
};

const getWorkoutById = async (req, res) => {
  const { workoutId } = req.params;

  const workout = await Workout.findById(workoutId);

  if (!workout) {
    return res.status(404).json({ error: "Workout not found" });
  }

  res.json(workout);
};

const updateWorkout = async (req, res) => {
  const { workoutId } = req.params;

  const workout = await Workout.findByIdAndUpdate(
    workoutId,
    req.body,
    { new: true, runValidators: true }
  );

  if (!workout) {
    return res.status(404).json({ error: "Workout not found" });
  }

  res.json(workout);
};

const deleteWorkout = async (req, res) => {
  const { workoutId } = req.params;

  const workout = await Workout.findByIdAndDelete(workoutId);

  if (!workout) {
    return res.status(404).json({ error: "Workout not found" });
  }

  res.json(workout);
};

module.exports = {
  getAllWorkouts,
  createWorkout,
  getWorkoutById,
  updateWorkout,
  deleteWorkout,
};
