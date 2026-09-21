import { BrowserRouter, Routes, Route } from "react-router-dom";

import Empleado from "./pages/empleado";
import Cliente from "./pages/cliente";
import Cuenta from "./pages/cuenta";
import Pqrs from "./pages/pqrs";
import Registro from "./pages/registro";
import Pedidos from "./pages/pedidos";
import Carrito from "./pages/carrito";
import Catalogo from "./pages/catalogo";
import Perfil from "./pages/perfil";
import PqrsAdmin from "./pages/pqrs-admin";
import Tickets from "./pages/tickets";
import PedidosAdmin from "./pages/pedidos-admin";
import Ventas from "./pages/ventas";
import Inventario from "./pages/inventario";
import Productos from "./pages/productos";
import Login from "./pages/login";
import Inicio from "./pages/inicio";
import Admin from "./pages/admin";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={<Inicio />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/registro"
                    element={<Registro />}
                />

                <Route
                    path="/admin"
                    element={
                        <ProtectedRoute rolRequerido="admin">
                            <Admin />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/empleado"
                    element={
                        <ProtectedRoute rolRequerido="empleado">
                            <Empleado />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/productos"
                    element={
                        <ProtectedRoute
                            rolesPermitidos={[
                                "admin",
                                "empleado"
                            ]}
                        >
                            <Productos />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/inventario"
                    element={
                        <ProtectedRoute
                            rolesPermitidos={[
                                "admin",
                                "empleado"
                            ]}
                        >
                            <Inventario />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/ventas"
                    element={
                        <ProtectedRoute
                            rolesPermitidos={[
                                "admin",
                                "empleado"
                            ]}
                        >
                            <Ventas />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/pedidos-admin"
                    element={
                        <ProtectedRoute
                            rolesPermitidos={[
                                "admin",
                                "empleado"
                            ]}
                        >
                            <PedidosAdmin />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/tickets"
                    element={
                        <ProtectedRoute
                            rolesPermitidos={[
                                "admin",
                                "empleado"
                            ]}
                        >
                            <Tickets />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/pqrs-admin"
                    element={
                        <ProtectedRoute
                            rolesPermitidos={[
                                "admin",
                                "empleado"
                            ]}
                        >
                            <PqrsAdmin />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/perfil"
                    element={
                        <ProtectedRoute
                            rolesPermitidos={[
                                "admin",
                                "empleado"
                            ]}
                        >
                            <Perfil />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/cliente"
                    element={
                        <ProtectedRoute rolRequerido="cliente">
                            <Cliente />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/catalogo"
                    element={
                        <ProtectedRoute rolRequerido="cliente">
                            <Catalogo />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/carrito"
                    element={
                        <ProtectedRoute rolRequerido="cliente">
                            <Carrito />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/pedidos"
                    element={
                        <ProtectedRoute rolRequerido="cliente">
                            <Pedidos />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/pqrs"
                    element={
                        <ProtectedRoute rolRequerido="cliente">
                            <Pqrs />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/cuenta"
                    element={
                        <ProtectedRoute rolRequerido="cliente">
                            <Cuenta />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;