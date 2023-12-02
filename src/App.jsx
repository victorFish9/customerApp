import { useState } from 'react'
import { Tabs, Tab } from '@mui/material'
import CustomersList from './components/customersList'
import TrainingList from './components/TrainingList'
import Schedule from './components/Schedule'


function App() {
  const [value, setValue] = useState("Customers")
  const handleChange = (event, value) => {
    setValue(value)
  }

  return (
    <>
      <Tabs value={value} onChange={handleChange}>
        <Tab label="Customers" value="Customers" />
        <Tab label="Training" value="Training" />
        <Tab label="Schedule" value="Schedule" />
      </Tabs>
      <h2>Customer App</h2>
      {value === "Customers" && <CustomersList />}
      {value === "Training" && <TrainingList />}
      {value === "Schedule" && <Schedule />}
    </>
  )
}

export default App
