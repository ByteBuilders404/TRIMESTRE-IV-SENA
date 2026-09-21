import { Link, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "../services/supabase";

function Empleado() {
    const navigate = useNavigate();

    const [usuario, setUsuario] = useState(null);
    const [pedidos, setPedidos] = useState([]);
    const [productos, setProductos] = useState([]);
    const [pqrs, setPqrs] = useState([]);
    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        const cargarDatos = async () => {
            const {
                data: { user }
            } = await supabase.auth.getUser();

            setUsuario(user);

            const pedidosGuardados =
                JSON.parse(localStorage.getItem("pedidos")) || [];

            const productosGuardados =
                JSON.parse(localStorage.getItem("productos")) || [];

            const pqrsGuardadas =
                JSON.parse(localStorage.getItem("pqrs")) || [];

            const ticketsGuardados =
                JSON.parse(localStorage.getItem("tickets")) || [];

            setPedidos(pedidosGuardados);
            setProductos(productosGuardados);
            setPqrs(pqrsGuardadas);
            setTickets(ticketsGuardados);
        };

        cargarDatos();
    }, []);

    const cerrarSesion = async () => {
        await supabase.auth.signOut();
        navigate("/");
    };

    const totalPedidos = pedidos.length;

    const pedidosPendientes = pedidos.filter(
        (pedido) =>
            pedido.estado === "Recibido" ||
            pedido.estado === "Pendiente"
    ).length;

    const pedidosEnProceso = pedidos.filter(
        (pedido) =>
            pedido.estado === "Revisado" ||
            pedido.estado === "Fabricando" ||
            pedido.estado === "Preparado"
    ).length;

    const pedidosEntregados = pedidos.filter(
        (pedido) => pedido.estado === "Entregado"
    ).length;

    const totalIngresos = useMemo(() => {
        return pedidos.reduce((total, pedido) => {
            const valor =
                Number(pedido.total) ||
                Number(pedido.subtotal) ||
                0;

            return total + valor;
        }, 0);
    }, [pedidos]);

    const nombreUsuario =
        usuario?.user_metadata?.nombre ||
        usuario?.email?.split("@")[0] ||
        "Empleado";

    const actividades = [
        {
            icono: "bi-bag-check",
            titulo: "Pedidos registrados",
            descripcion: `${totalPedidos} pedidos en el sistema`,
            tiempo: "Actual"
        },
        {
            icono: "bi-box-seam",
            titulo: "Productos registrados",
            descripcion: `${productos.length} productos disponibles`,
            tiempo: "Actual"
        },
        {
            icono: "bi-ticket",
            titulo: "Tickets registrados",
            descripcion: `${tickets.length} tickets en el sistema`,
            tiempo: "Actual"
        },
        {
            icono: "bi-chat-left-text",
            titulo: "PQRS registradas",
            descripcion: `${pqrs.length} solicitudes registradas`,
            tiempo: "Actual"
        }
    ];

    return (
        <div className="admin-layout page-animated">
            <aside className="sidebar animate-slide-left">
                <div className="sidebar-logo logo-animated">
                    <Link to="/empleado">
                        <img
                            src="/assets/img/image.png"
                            alt="Dotaciones Fortuna IJ"
                        />
                    </Link>
                </div>

                <div className="sidebar-user animate-slide-up">
                    <div className="user-icon animate-pulse-soft">
                        <i className="bi bi-person"></i>
                    </div>

                    <div>
                        <strong>{nombreUsuario}</strong>
                        <span>Empleado</span>
                    </div>
                </div>

                <nav className="sidebar-nav">
                    <Link
                        to="/empleado"
                        className="sidebar-link active nav-item-animated"
                    >
                        <i className="bi bi-grid icon-animated"></i>
                        <span>Panel</span>
                    </Link>

                    <Link
                        to="/productos"
                        className="sidebar-link nav-item-animated delay-100"
                    >
                        <i className="bi bi-box-seam icon-animated"></i>
                        <span>Productos</span>
                    </Link>

                    <Link
                        to="/ventas"
                        className="sidebar-link nav-item-animated delay-200"
                    >
                        <i className="bi bi-cart icon-animated"></i>
                        <span>Ventas</span>
                    </Link>

                    <Link
                        to="/inventario"
                        className="sidebar-link nav-item-animated delay-300"
                    >
                        <i className="bi bi-boxes icon-animated"></i>
                        <span>Inventario</span>
                    </Link>

                    <Link
                        to="/pedidos-admin"
                        className="sidebar-link nav-item-animated delay-400"
                    >
                        <i className="bi bi-bag-check icon-animated"></i>
                        <span>Pedidos</span>
                    </Link>

                    <Link
                        to="/tickets"
                        className="sidebar-link nav-item-animated delay-500"
                    >
                        <i className="bi bi-ticket icon-animated"></i>
                        <span>Tickets</span>
                    </Link>

                    <Link
                        to="/pqrs-admin"
                        className="sidebar-link nav-item-animated delay-600"
                    >
                        <i className="bi bi-chat-left-text icon-animated"></i>
                        <span>PQRS</span>
                    </Link>

                    <Link
                        to="/perfil"
                        className="sidebar-link nav-item-animated delay-700"
                    >
                        <i className="bi bi-person-circle icon-animated"></i>
                        <span>Mi perfil</span>
                    </Link>
                </nav>

                <div className="sidebar-bottom">
                    <button
                        type="button"
                        className="btn btn-link text-danger text-decoration-none btn-animated"
                        onClick={cerrarSesion}
                    >
                        Cerrar sesión
                    </button>
                </div>
            </aside>

            <main className="admin-content">
                <header className="admin-header animate-slide-down">
                    <div>
                        <span className="breadcrumb">
                            Inicio / Panel de empleado
                        </span>

                        <h1>Panel de Empleado</h1>

                        <p>
                            Gestión operativa de Dotaciones Fortuna IJ
                        </p>
                    </div>

                    <div className="header-user animate-slide-right">
                        <i className="bi bi-person-circle icon-animated"></i>

                        <div>
                            <strong>{nombreUsuario}</strong>
                            <span>Empleado</span>
                        </div>
                    </div>
                </header>

                <section className="stats-grid stagger">
                    <div className="stat-card card-animated hover-lift">
                        <div className="stat-icon">
                            <i className="bi bi-bag-check icon-animated"></i>
                        </div>

                        <div>
                            <span>Pedidos</span>
                            <strong>{totalPedidos}</strong>
                            <small>
                                Pedidos registrados
                            </small>
                        </div>
                    </div>

                    <div className="stat-card card-animated hover-lift">
                        <div className="stat-icon">
                            <i className="bi bi-box-seam icon-animated"></i>
                        </div>

                        <div>
                            <span>Productos</span>
                            <strong>{productos.length}</strong>
                            <small>
                                Productos registrados
                            </small>
                        </div>
                    </div>

                    <div className="stat-card card-animated hover-lift">
                        <div className="stat-icon">
                            <i className="bi bi-ticket icon-animated"></i>
                        </div>

                        <div>
                            <span>Tickets</span>
                            <strong>{tickets.length}</strong>
                            <small>
                                Tickets registrados
                            </small>
                        </div>
                    </div>

                    <div className="stat-card card-animated hover-lift">
                        <div className="stat-icon">
                            <i className="bi bi-chat-left-text icon-animated"></i>
                        </div>

                        <div>
                            <span>PQRS</span>
                            <strong>{pqrs.length}</strong>
                            <small>
                                Solicitudes registradas
                            </small>
                        </div>
                    </div>
                </section>

                <section className="dashboard-grid">
                    <div className="dashboard-card card-animated animate-slide-left">
                        <div className="card-header">
                            <div>
                                <h2>Resumen de pedidos</h2>

                                <p>
                                    Estado de los pedidos actuales
                                </p>
                            </div>

                            <i className="bi bi-bar-chart icon-animated"></i>
                        </div>

                        <div className="order-summary">
                            <div className="summary-item">
                                <span>Pendientes</span>
                                <strong>
                                    {pedidosPendientes}
                                </strong>
                            </div>

                            <div className="summary-item">
                                <span>En proceso</span>
                                <strong>
                                    {pedidosEnProceso}
                                </strong>
                            </div>

                            <div className="summary-item">
                                <span>Entregados</span>
                                <strong>
                                    {pedidosEntregados}
                                </strong>
                            </div>
                        </div>

                        <div className="mt-3">
                            <Link
                                to="/pedidos-admin"
                                className="btn btn-outline-primary w-100 btn-animated"
                            >
                                Ver pedidos
                            </Link>
                        </div>
                    </div>

                    <div className="dashboard-card card-animated animate-slide-right">
                        <div className="card-header">
                            <div>
                                <h2>Accesos rápidos</h2>

                                <p>
                                    Herramientas de trabajo
                                </p>
                            </div>

                            <i className="bi bi-speedometer2 icon-animated"></i>
                        </div>

                        <div className="d-grid gap-2">
                            <Link
                                to="/productos"
                                className="btn btn-outline-primary btn-animated"
                            >
                                <i className="bi bi-box-seam me-2"></i>
                                Productos
                            </Link>

                            <Link
                                to="/inventario"
                                className="btn btn-outline-primary btn-animated"
                            >
                                <i className="bi bi-boxes me-2"></i>
                                Inventario
                            </Link>

                            <Link
                                to="/pedidos-admin"
                                className="btn btn-outline-primary btn-animated"
                            >
                                <i className="bi bi-bag-check me-2"></i>
                                Pedidos
                            </Link>

                            <Link
                                to="/tickets"
                                className="btn btn-outline-primary btn-animated"
                            >
                                <i className="bi bi-ticket me-2"></i>
                                Tickets
                            </Link>

                            <Link
                                to="/pqrs-admin"
                                className="btn btn-outline-secondary btn-animated"
                            >
                                <i className="bi bi-chat-left-text me-2"></i>
                                PQRS
                            </Link>
                        </div>
                    </div>
                </section>

                <section className="dashboard-card card-animated animate-slide-up">
                    <div className="card-header">
                        <div>
                            <h2>Actividad reciente</h2>

                            <p>
                                Resumen de movimientos del sistema
                            </p>
                        </div>

                        <Link
                            to="/pedidos-admin"
                            className="btn btn-outline-secondary btn-animated"
                        >
                            Ver pedidos
                        </Link>
                    </div>

                    <div className="activity-list stagger">
                        {actividades.map((actividad) => (
                            <div
                                className="activity-item"
                                key={actividad.titulo}
                            >
                                <div className="activity-icon">
                                    <i
                                        className={`bi ${actividad.icono} icon-animated`}
                                    ></i>
                                </div>

                                <div>
                                    <strong>
                                        {actividad.titulo}
                                    </strong>

                                    <span>
                                        {actividad.descripcion}
                                    </span>
                                </div>

                                <small>
                                    {actividad.tiempo}
                                </small>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="dashboard-card card-animated animate-scale-in">
                    <div className="card-header">
                        <div>
                            <h2>Información del empleado</h2>

                            <p>
                                Datos de la sesión actual
                            </p>
                        </div>

                        <i className="bi bi-person-badge icon-animated"></i>
                    </div>

                    <div className="row g-3">
                        <div className="col-md-4">
                            <div className="summary-item">
                                <span>Nombre</span>
                                <strong>
                                    {nombreUsuario}
                                </strong>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="summary-item">
                                <span>Correo</span>
                                <strong>
                                    {usuario?.email || "No disponible"}
                                </strong>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="summary-item">
                                <span>Rol</span>
                                <strong>
                                    Empleado
                                </strong>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default Empleado;