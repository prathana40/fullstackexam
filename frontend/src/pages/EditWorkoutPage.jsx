 import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"

const EditWorkoutPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [workoutTitle, setWorkoutTitle] = useState("")
  const [description, setDescription] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  const [sessionPrice, setSessionPrice] = useState("")
  const [fitnessLevel, setFitnessLevel] = useState("")
  const [status, setStatus] = useState("")
  const [requiredEquipment, setRequiredEquipment] = useState("")

  useEffect(() => {
    const fetchWorkout = async () => {
      const res = await fetch(`/api/workouts/${id}`)
      const data = await res.json()

      if (res.ok) {
        setWorkoutTitle(data.workoutTitle)
        setDescription(data.description)

        if (data.location) {
          setCity(data.location.city)
          setState(data.location.state)
        }

        setSessionPrice(data.sessionPrice)
        setFitnessLevel(data.fitnessLevel)
        setStatus(data.status)
        setRequiredEquipment(data.requiredEquipment)
      }
    }

    fetchWorkout()
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const updatedWorkout = {
      workoutTitle,
      description,
      location: {
        city,
        state
      },
      sessionPrice,
      fitnessLevel,
      status,
      requiredEquipment
    }

    const res = await fetch(`/api/workouts/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedWorkout)
    })

    if (res.ok) {
      navigate(`/workouts/${id}`)
    }
  }

  return (
    <div>
      <h2>Edit Workout</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Workout Title"
          value={workoutTitle}
          onChange={(e) => setWorkoutTitle(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="State"
          value={state}
          onChange={(e) => setState(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Session Price"
          value={sessionPrice}
          onChange={(e) => setSessionPrice(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Fitness Level"
          value={fitnessLevel}
          onChange={(e) => setFitnessLevel(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Required Equipment"
          value={requiredEquipment}
          onChange={(e) => setRequiredEquipment(e.target.value)}
          required
        />

        <button type="submit">Update Workout</button>

      </form>
    </div>
  )
}

export default EditWorkoutPage