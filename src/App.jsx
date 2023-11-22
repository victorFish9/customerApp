import { useState } from 'react'
import { Tabs, Tab } from '@mui/material'
import CustomersList from './components/customersList'
import TrainingList from './components/TrainingList'


function App() {
  const [value, setValue] = useState("Home")
  const handleChange = (event, value) => {
    setValue(value)
  }

  return (
    <>
      <Tabs value={value} onChange={handleChange}>
        <Tab label="Customers" value="Customers" />
        <Tab label="Training" value="Training" />
      </Tabs>
      <h2>Customer App</h2>
      {value === "Customers" && <CustomersList />}
      {value === "Training" && <TrainingList />}
    </>
  )
}

export default App
