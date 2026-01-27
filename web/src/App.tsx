import { Routes, Route } from "react-router"
import Beans from "./pages/beans"
import Home from "./pages/home"
import NotFound from "./pages/not-found"
import BeanDetails from "./pages/bean-details"
import NavigationBar from "./components/NavigationBar"

export function App() {
    return (
        <div>
            <NavigationBar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/beans" element={<Beans />} />
                <Route path="/beans/:id" element={<BeanDetails />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
    )
}

export default App
