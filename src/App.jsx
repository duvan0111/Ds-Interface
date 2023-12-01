import { Route, Routes } from "react-router-dom"
import LayoutUser from "./layout/User"
import Home from "./pages/User/Home"

function App() {

  return (
    <Routes>
      <Route element={<LayoutUser />}>
        <Route path="/" element={<Home />}/>
      </Route>
    </Routes>
  )
}

export default App
