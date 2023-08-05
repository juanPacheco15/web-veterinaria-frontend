import React from "react";
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import LoginPage from "./vistas/LoginPage";
import HomePage from "./vistas/HomePage";
import HomePage2 from "./vistas/HomePage2";
import UsuariosPage from "./vistas/UsuariosPage";
import InventarioPage from "./vistas/InventarioPage";
import MascotasPages from "./vistas/MascotasPages";
import DetallePedido from "./vistas/DetallePedidos";
import DetalleVenta from "./vistas/DetalleVenta";
import DetalleGanancia from "./vistas/DetalleGanancia";
import Citas from "./vistas/CitasPages";
import CitasPages from "./vistas/CitasPages";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/*Generales*/}
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          {/*Admin*/}
          <Route path="/home" element={<HomePage />} />
          <Route path="/usuarios" element={<UsuariosPage />} />
          <Route path="/inventario" element={<InventarioPage />} />
          <Route path="/detallePedido" element={<DetallePedido />} />
          <Route path="/detalleVenta" element={<DetalleVenta />} />
          <Route path="/detalleGanancia" element={<DetalleGanancia />} />
          {/*Veterinario*/}
          <Route path="/home2" element={<HomePage2 />} />
          <Route path="/consultaMascotas" element={<MascotasPages />} />
          <Route path="/citas" element={<CitasPages />} />
        </Routes>
        <Outlet />
      </div>
    </Router>
  );
}

export default App;
