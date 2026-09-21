import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../services/supabase";

const ticketsIniciales = [
    {
        id: "TK-001",
        cliente: "Carlos Rodríguez",
        asunto: "Consulta sobre pedido",
        categoria: "Pedido",
        estado: "Abierta",
        fecha: "14/09/2026",
        descripcion:
            "El cliente solicita información sobre el estado de su pedido."
    },
    {
        id: "TK-002",
        cliente: "María González",
        asunto: "Problema con entrega",
        categoria: "Entrega",
        estado: "En revisión",
        fecha: "13/09/2026",
        descripcion:
            "El cliente reporta inconvenientes relacionados con la entrega."
    },
    {
        id: "TK-003",
        cliente: "Juan Pérez",
        asunto: "Solicitud de cambio",
        categoria: "Producto",
        estado: "Resuelta",
        fecha: "12/09/2026",
        descripcion:
            "Solicitud de cambio de producto atendida por el área administrativa."
    }
];

const estadosTicket = [
    "Abierta",
    "En revisión",
    "Resuelta",
    "Cerrada"
];

const categoriasTicket = [
    "Pedido",
    "Entrega",
    "Producto",
    "Otro"
];

function Tickets() {
    const navigate = useNavigate();

    const [usuario, setUsuario] = useState(null);
    const [tickets, setTickets] = useState([]);
    const [busqueda, setBusqueda] = useState("");
    const [filtroEstado, setFiltroEstado] = useState("Todos");
    const [filtroCategoria, setFiltroCategoria] = useState("Todas");
    const [ticketSeleccionado, setTicketSeleccionado] = useState(null);
    const [actualizando, setActualizando] = useState(false);

    useEffect(() => {
        cargarUsuario();
        cargarTickets();
    }, []);

    const cargarUsuario = async () => {
        const {
            data: { user }
        } = await supabase.auth.getUser();

        setUsuario(user);
    };

    const cargarTickets = () => {
        const ticketsGuardados = localStorage.getItem("tickets");

        if (ticketsGuardados) {
            try {
                const datos = JSON.parse(ticketsGuardados);

                if (Array.isArray(datos)) {
                    setTickets(datos);
                    return;
                }
            } catch {
                localStorage.removeItem("tickets");
            }
        }

        localStorage.setItem(
            "tickets",
            JSON.stringify(ticketsIniciales)
        );

        setTickets(ticketsIniciales);
    };

    const guardarTickets = (ticketsActualizados) => {
        setTickets(ticketsActualizados);

        localStorage.setItem(
            "tickets",
            JSON.stringify(ticketsActualizados)
        );
    };

    const obtenerNombreUsuario = () => {
        return (
            usuario?.user_metadata?.nombre ||
            usuario?.email?.split("@")[0] ||
            "Administrador"
        );
    };

    const cambiarEstado = (id, nuevoEstado) => {
        const ticketsActualizados = tickets.map((ticket) =>
            ticket.id === id
                ? {
                      ...ticket,
                      estado: nuevoEstado
                  }
                : ticket
        );

        guardarTickets(ticketsActualizados);

        if (ticketSeleccionado?.id === id) {
            setTicketSeleccionado((actual) => ({
                ...actual,
                estado: nuevoEstado
            }));
        }
    };

    const verTicket = (ticket) => {
        setTicketSeleccionado(ticket);
    };

    const actualizarTickets = () => {
        setActualizando(true);

        cargarTickets();

        setTimeout(() => {
            setActualizando(false);
        }, 500);
    };

    const cerrarSesion = async () => {
        await supabase.auth.signOut();
        navigate("/");
    };

    const ticketsFiltrados = useMemo(() => {
        return tickets.filter((ticket) => {
            const id = String(ticket.id || "").toLowerCase();
            const cliente = String(
                ticket.cliente || ""
            ).toLowerCase();
            const asunto = String(
                ticket.asunto || ""
            ).toLowerCase();

            const textoBusqueda =
                busqueda.toLowerCase();

            const coincideBusqueda =
                id.includes(textoBusqueda) ||
                cliente.includes(textoBusqueda) ||
                asunto.includes(textoBusqueda);

            const coincideEstado =
                filtroEstado === "Todos" ||
                ticket.estado === filtroEstado;

            const coincideCategoria =
                filtroCategoria === "Todas" ||
                ticket.categoria === filtroCategoria;

            return (
                coincideBusqueda &&
                coincideEstado &&
                coincideCategoria
            );
        });
    }, [
        tickets,
        busqueda,
        filtroEstado,
        filtroCategoria
    ]);

    const ticketsAbiertos = tickets.filter(
        (ticket) => ticket.estado === "Abierta"
    ).length;

    const ticketsRevision = tickets.filter(
        (ticket) => ticket.estado === "En revisión"
    ).length;

    const ticketsResueltos = tickets.filter(
        (ticket) =>
            ticket.estado === "Resuelta" ||
            ticket.estado === "Cerrada"
    ).length;

    const obtenerClaseEstado = (estado) => {
        if (estado === "Abierta") {
            return "bg-danger";
        }

        if (estado === "En revisión") {
            return "bg-warning text-dark";
        }

        if (estado === "Resuelta") {
            return "bg-success";
        }

        if (estado === "Cerrada") {
            return "bg-secondary";
        }

        return "bg-secondary";
    };

    return (
        <div className="admin-layout page-animated">
            <aside className="sidebar animate-slide-left">
                <div className="sidebar-logo logo-animated">
                    <Link to="/admin">
                        <img
                            src="/assets/img/image-2.png"
                            alt="Fortuna IJ"
                        />

                        <div>
                            <strong>FORTUNA IJ</strong>
                            <span>Panel administrativo</span>
                        </div>
                    </Link>
                </div>

                <div className="sidebar-user animate-fade-in">
                    <div className="user-avatar animate-pulse-soft">
                        <i className="bi bi-person-fill"></i>
                    </div>

                    <div>
                        <strong>
                            {obtenerNombreUsuario()}
                        </strong>

                        <span>
                            Gerente General
                        </span>
                    </div>
                </div>

                <nav className="sidebar-menu">
                    <Link
                        to="/admin"
                        className="sidebar-link nav-item-animated"
                    >
                        <i className="bi bi-grid"></i>
                        Administración
                    </Link>

                    <Link
                        to="/productos"
                        className="sidebar-link nav-item-animated"
                    >
                        <i className="bi bi-box-seam"></i>
                        Productos
                    </Link>

                    <Link
                        to="/inventario"
                        className="sidebar-link nav-item-animated"
                    >
                        <i className="bi bi-clipboard-data"></i>
                        Inventario
                    </Link>

                    <Link
                        to="/ventas"
                        className="sidebar-link nav-item-animated"
                    >
                        <i className="bi bi-bar-chart"></i>
                        Ventas
                    </Link>

                    <Link
                        to="/pedidos-admin"
                        className="sidebar-link nav-item-animated"
                    >
                        <i className="bi bi-cart-check"></i>
                        Pedidos
                    </Link>

                    <Link
                        to="/tickets"
                        className="sidebar-link active nav-item-animated"
                    >
                        <i className="bi bi-ticket-perforated"></i>
                        Tickets
                    </Link>

                    <Link
                        to="/pqrs-admin"
                        className="sidebar-link nav-item-animated"
                    >
                        <i className="bi bi-chat-left-text"></i>
                        PQRS
                    </Link>

                    <Link
                        to="/perfil"
                        className="sidebar-link nav-item-animated"
                    >
                        <i className="bi bi-person"></i>
                        Perfil
                    </Link>
                </nav>

                <button
                    type="button"
                    className="sidebar-logout btn-animated"
                    onClick={cerrarSesion}
                >
                    <i className="bi bi-box-arrow-left"></i>
                    Cerrar sesión
                </button>
            </aside>

            <main className="admin-content">
                <header className="admin-header animate-slide-down">
                    <div>
                        <span className="breadcrumb">
                            Inicio / Tickets
                        </span>

                        <h1>Tickets</h1>

                        <p>
                            Gestión y seguimiento de solicitudes
                            de los clientes.
                        </p>
                    </div>

                    <div className="header-user animate-fade-in">
                        <i className="bi bi-bell icon-animated"></i>

                        <div className="header-avatar animate-pulse-soft">
                            <i className="bi bi-person-fill"></i>
                        </div>

                        <div>
                            <strong>
                                {obtenerNombreUsuario()}
                            </strong>

                            <span>
                                Administrador
                            </span>
                        </div>
                    </div>
                </header>

                <section className="stats-grid stagger">
                    <div className="stat-card card-animated">
                        <div className="stat-icon icon-animated">
                            <i className="bi bi-ticket-perforated"></i>
                        </div>

                        <div>
                            <span>Total tickets</span>

                            <strong>
                                {tickets.length}
                            </strong>

                            <small>
                                Registrados
                            </small>
                        </div>
                    </div>

                    <div className="stat-card card-animated">
                        <div className="stat-icon icon-animated">
                            <i className="bi bi-exclamation-circle"></i>
                        </div>

                        <div>
                            <span>Abiertos</span>

                            <strong>
                                {ticketsAbiertos}
                            </strong>

                            <small>
                                Requieren atención
                            </small>
                        </div>
                    </div>

                    <div className="stat-card card-animated">
                        <div className="stat-icon icon-animated">
                            <i className="bi bi-hourglass-split"></i>
                        </div>

                        <div>
                            <span>En revisión</span>

                            <strong>
                                {ticketsRevision}
                            </strong>

                            <small>
                                En proceso
                            </small>
                        </div>
                    </div>

                    <div className="stat-card card-animated">
                        <div className="stat-icon icon-animated">
                            <i className="bi bi-check-circle"></i>
                        </div>

                        <div>
                            <span>Resueltos</span>

                            <strong>
                                {ticketsResueltos}
                            </strong>

                            <small>
                                Finalizados
                            </small>
                        </div>
                    </div>
                </section>

                <section className="dashboard-card animate-slide-up">
                    <div className="card-header">
                        <div>
                            <h2>
                                Gestión de tickets
                            </h2>

                            <p>
                                Consulta y actualiza el estado
                                de las solicitudes.
                            </p>
                        </div>

                        <button
                            type="button"
                            className="btn btn-primary btn-animated"
                            onClick={actualizarTickets}
                            disabled={actualizando}
                        >
                            <i
                                className={`bi ${
                                    actualizando
                                        ? "bi-arrow-repeat spinner"
                                        : "bi-arrow-repeat"
                                }`}
                            ></i>

                            {actualizando
                                ? "Actualizando..."
                                : "Actualizar"}
                        </button>
                    </div>

                    <div className="row g-3 mb-4">
                        <div className="col-md-5">
                            <label className="form-label">
                                Buscar
                            </label>

                            <div className="input-group input-animated">
                                <span className="input-group-text">
                                    <i className="bi bi-search"></i>
                                </span>

                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="ID, cliente o asunto"
                                    value={busqueda}
                                    onChange={(e) =>
                                        setBusqueda(
                                            e.target.value
                                        )
                                    }
                                />
                            </div>
                        </div>

                        <div className="col-md-3">
                            <label className="form-label">
                                Estado
                            </label>

                            <select
                                className="form-select"
                                value={filtroEstado}
                                onChange={(e) =>
                                    setFiltroEstado(
                                        e.target.value
                                    )
                                }
                            >
                                <option value="Todos">
                                    Todos
                                </option>

                                {estadosTicket.map(
                                    (estado) => (
                                        <option
                                            key={estado}
                                            value={estado}
                                        >
                                            {estado}
                                        </option>
                                    )
                                )}
                            </select>
                        </div>

                        <div className="col-md-4">
                            <label className="form-label">
                                Categoría
                            </label>

                            <select
                                className="form-select"
                                value={filtroCategoria}
                                onChange={(e) =>
                                    setFiltroCategoria(
                                        e.target.value
                                    )
                                }
                            >
                                <option value="Todas">
                                    Todas
                                </option>

                                {categoriasTicket.map(
                                    (categoria) => (
                                        <option
                                            key={categoria}
                                            value={categoria}
                                        >
                                            {categoria}
                                        </option>
                                    )
                                )}
                            </select>
                        </div>
                    </div>

                    <div className="table-responsive">
                        <table className="table table-dark table-hover align-middle">
                            <thead>
                                <tr>
                                    <th>Ticket</th>
                                    <th>Cliente</th>
                                    <th>Asunto</th>
                                    <th>Categoría</th>
                                    <th>Fecha</th>
                                    <th>Estado</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>

                            <tbody>
                                {ticketsFiltrados.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan="7"
                                            className="text-center py-5"
                                        >
                                            <div className="animate-scale-in">
                                                <i className="bi bi-ticket-perforated fs-1 d-block mb-3"></i>

                                                <h5>
                                                    No se encontraron
                                                    tickets.
                                                </h5>

                                                <p className="mb-0">
                                                    Intenta cambiar los
                                                    filtros de búsqueda.
                                                </p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    ticketsFiltrados.map(
                                        (ticket) => (
                                            <tr
                                                key={ticket.id}
                                                className="table-row-animated"
                                            >
                                                <td>
                                                    <strong>
                                                        {ticket.id}
                                                    </strong>
                                                </td>

                                                <td>
                                                    {ticket.cliente}
                                                </td>

                                                <td>
                                                    {ticket.asunto}
                                                </td>

                                                <td>
                                                    {ticket.categoria}
                                                </td>

                                                <td>
                                                    {ticket.fecha}
                                                </td>

                                                <td>
                                                    <span
                                                        className={`badge ${obtenerClaseEstado(
                                                            ticket.estado
                                                        )}`}
                                                    >
                                                        {
                                                            ticket.estado
                                                        }
                                                    </span>
                                                </td>

                                                <td>
                                                    <div className="d-flex gap-2">
                                                        <button
                                                            type="button"
                                                            className="btn btn-sm btn-outline-light btn-animated"
                                                            onClick={() =>
                                                                verTicket(
                                                                    ticket
                                                                )
                                                            }
                                                            title="Ver ticket"
                                                        >
                                                            <i className="bi bi-eye"></i>
                                                        </button>

                                                        {ticket.estado !==
                                                            "Resuelta" &&
                                                            ticket.estado !==
                                                                "Cerrada" && (
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-sm btn-outline-success btn-animated"
                                                                    onClick={() =>
                                                                        cambiarEstado(
                                                                            ticket.id,
                                                                            "Resuelta"
                                                                        )
                                                                    }
                                                                    title="Resolver ticket"
                                                                >
                                                                    <i className="bi bi-check2"></i>
                                                                </button>
                                                            )}

                                                        {ticket.estado ===
                                                            "Abierta" && (
                                                            <button
                                                                type="button"
                                                                className="btn btn-sm btn-outline-warning btn-animated"
                                                                onClick={() =>
                                                                    cambiarEstado(
                                                                        ticket.id,
                                                                        "En revisión"
                                                                    )
                                                                }
                                                                title="Poner en revisión"
                                                            >
                                                                <i className="bi bi-hourglass-split"></i>
                                                            </button>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    )
                                )}
                            </tbody>
                        </table>
                    </div>
                </section>
            </main>

            {ticketSeleccionado && (
                <div
                    className="modal d-block"
                    tabIndex="-1"
                    role="dialog"
                    style={{
                        backgroundColor:
                            "rgba(0, 0, 0, 0.75)"
                    }}
                >
                    <div className="modal-dialog modal-dialog-centered animate-scale-in">
                        <div className="modal-content">
                            <div className="modal-header">
                                <div>
                                    <h5 className="modal-title">
                                        Detalle del ticket
                                    </h5>

                                    <small>
                                        {ticketSeleccionado.id}
                                    </small>
                                </div>

                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() =>
                                        setTicketSeleccionado(
                                            null
                                        )
                                    }
                                ></button>
                            </div>

                            <div className="modal-body">
                                <div className="row g-3">
                                    <div className="col-md-6">
                                        <strong>
                                            Cliente
                                        </strong>

                                        <p>
                                            {
                                                ticketSeleccionado.cliente
                                            }
                                        </p>
                                    </div>

                                    <div className="col-md-6">
                                        <strong>
                                            Fecha
                                        </strong>

                                        <p>
                                            {
                                                ticketSeleccionado.fecha
                                            }
                                        </p>
                                    </div>

                                    <div className="col-md-6">
                                        <strong>
                                            Categoría
                                        </strong>

                                        <p>
                                            {
                                                ticketSeleccionado.categoria
                                            }
                                        </p>
                                    </div>

                                    <div className="col-md-6">
                                        <strong>
                                            Estado
                                        </strong>

                                        <p>
                                            <span
                                                className={`badge ${obtenerClaseEstado(
                                                    ticketSeleccionado.estado
                                                )}`}
                                            >
                                                {
                                                    ticketSeleccionado.estado
                                                }
                                            </span>
                                        </p>
                                    </div>

                                    <div className="col-12">
                                        <strong>
                                            Asunto
                                        </strong>

                                        <p>
                                            {
                                                ticketSeleccionado.asunto
                                            }
                                        </p>
                                    </div>

                                    <div className="col-12">
                                        <strong>
                                            Descripción
                                        </strong>

                                        <p>
                                            {ticketSeleccionado.descripcion ||
                                                "No hay descripción disponible."}
                                        </p>
                                    </div>
                                </div>

                                <hr />

                                <label className="form-label">
                                    Cambiar estado
                                </label>

                                <select
                                    className="form-select"
                                    value={
                                        ticketSeleccionado.estado
                                    }
                                    onChange={(e) =>
                                        cambiarEstado(
                                            ticketSeleccionado.id,
                                            e.target.value
                                        )
                                    }
                                >
                                    {estadosTicket.map(
                                        (estado) => (
                                            <option
                                                key={estado}
                                                value={estado}
                                            >
                                                {estado}
                                            </option>
                                        )
                                    )}
                                </select>
                            </div>

                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary btn-animated"
                                    onClick={() =>
                                        setTicketSeleccionado(
                                            null
                                        )
                                    }
                                >
                                    Cerrar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Tickets;