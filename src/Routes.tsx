import { Route, Routes } from "react-router-dom"
import { Home } from "./Home"
import { Mine } from "./Mine"

export const BaseRoutes = () => {
    return <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mine/:mine" element={<Mine />} />
    </Routes>

}