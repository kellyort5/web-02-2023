import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"

import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import ProductPage from "./pages/ProductPage"
import ProductFormPage from "./pages/ProductFormPage"
import ProfilePage from "./pages/ProfilePage"
import HomePage from "./pages/HomePage"

import ProtectedRoute from "./ProtectedRoute"
import { ProductProvider } from "./context/ProductContext"
import Navbar from "./components/Navbar"

function App() {
  return (
    <AuthProvider>
      <ProductProvider>

        <BrowserRouter>
        <Navbar />
          <main className="container mx-auto px-5 ">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/products" element={<ProductPage />} />
              <Route path="/add-products" element={<ProductFormPage />} />
              <Route path="/products/:id" element={<ProductFormPage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Route>
          </Routes>
          </main>
        </BrowserRouter>

      </ProductProvider>
    </AuthProvider>
  )
}

export default App;