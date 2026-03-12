 import { useEffect, useState } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"

const WorkoutPage = () => {
  const { id } = useParams()
  const [workout, setWorkout] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchWorkout = async () => {
      const res = await fetch(`/api/workouts/${id}`)
      const data = await res.json()

      if (res.ok) {
        setWorkout(data)
      }
    }

    fetchWorkout()
  }, [id])

  const handleDelete = async () => {
    const res = await fetch(`/api/workouts/${id}`, {
      method: "DELETE"
    })

    if (res.ok) {
      navigate("/")
    }
  }

  if (!workout) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h2>{workout.workoutTitle}</h2>
      <p>{workout.description}</p>

      <p>City: {workout.location.city}</p>
      <p>State: {workout.location.state}</p>

      <p>Session Price: {workout.sessionPrice}</p>
      <p>Fitness Level: {workout.fitnessLevel}</p>
      <p>Status: {workout.status}</p>

      <p>Required Equipment: {workout.requiredEquipment}</p>

      <Link to={`/edit-workout/${id}`}>Edit</Link>

      <button onClick={handleDelete}>Delete</button>
    </div>
  )
}

export default WorkoutPage