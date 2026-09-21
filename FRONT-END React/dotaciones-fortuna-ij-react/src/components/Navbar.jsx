import { Link, useNavigate } from "react-router-dom";
import { obtenerSesion, cerrarSesion } from "../services/auth";

function Navbar() {
    const navigate = useNavigate();
    const usuario = obtenerSesion();

    const manejarCerrarSesion = () => {
        cerrarSesion();
        navigate("/");
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">

                {/* Logo / Nombre de la empresa */}
                <Link
                    to={usuario?.rol === "admin" ? "/admin" : "/catalogo"}
                    className="navbar-brand fw-bold"
                >
                    Dotaciones Fortuna IJ
                </Link>

                {/* Botón responsive */}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#menuPrincipal"
                    aria-controls="menuPrincipal"
                    aria-expanded="false"
                    aria-label="Mostrar navegación"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div
                    className="collapse navbar-collapse"
                    id="menuPrincipal"
                >

                    {/* Menú del administrador */}
                    {usuario?.rol === "admin" && (
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                            <li className="nav-item">
                                <Link
                                    to="/admin"
                                    className="nav-link"
                                >
                                    Dashboard
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link
                                    to="/productos"
                                    className="nav-link"
                                >
                                    Productos
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link
                                    to="/inventario"
                                    className="nav-link"
                                >
                                    Inventario
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link
                                    to="/pedidos-admin"
                                    className="nav-link"
                                >
                                    Pedidos
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link
                                    to="/pqrs-admin"
                                    className="nav-link"
                                >
                                    PQRS
                                </Link>
                            </li>

                        </ul>
                    )}

                    {/* Menú del cliente */}
                    {usuario?.rol === "cliente" && (
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                            <li className="nav-item">
                                <Link
                                    to="/catalogo"
                                    className="nav-link"
                                >
                                    Catálogo
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link
                                    to="/carrito"
                                    className="nav-link"
                                >
                                    Carrito
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link
                                    to="/pedidos"
                                    className="nav-link"
                                >
                                    Mis pedidos
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link
                                    to="/pqrs"
                                    className="nav-link"
                                >
                                    PQRS
                                </Link>
                            </li>

                        </ul>
                    )}

                    {/* Información del usuario */}
                    {usuario && (
                        <div className="d-flex align-items-center gap-3">

                            <span className="text-light">
                                <i className="bi bi-person-circle me-1"></i>
                                {usuario.nombre}
                            </span>

                            <button
                                type="button"
                                className="btn btn-outline-light btn-sm"
                                onClick={manejarCerrarSesion}
                            >
                                <i className="bi bi-box-arrow-right me-1"></i>
                                Cerrar sesión
                            </button>

                        </div>
                    )}

                </div>
            </div>
        </nav>
    );
}

export default Navbar;