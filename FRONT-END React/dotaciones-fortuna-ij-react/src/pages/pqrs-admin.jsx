import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../services/supabase";

const pqrsIniciales = [
    {
        id: "PQ-001",
        cliente: "Carlos Rodríguez",
        email: "carlos@email.com",
        tipo: "Petición",
        asunto: "Solicitud de cotización",
        descripcion:
            "Solicito información sobre una cotización de dotaciones.",
        area: "Ventas",
        estado: "Abierta",
        fecha: "10/09/2026",
        anonima: false
    },
    {
        id: "PQ-002",
        cliente: "María López",
        email: "maria@email.com",
        tipo: "Reclamo",
        asunto: "Retraso en pedido",
        descripcion:
            "El pedido presenta retraso en la fecha de entrega.",
        area: "Ventas",
        estado: "En revisión",
        fecha: "09/09/2026",
        anonima: false
    },
    {
        id: "PQ-003",
        cliente: "Juan Pérez",
        email: "juan@email.com",
        tipo: "Sugerencia",
        asunto: "Mejorar catálogo",
        descripcion:
            "Sugiero agregar más referencias de calzado industrial.",
        area: "Administrativo",
        estado: "Resuelta",
        fecha: "08/09/2026",
        anonima: false
    }
];

const tiposPqrs = [
    "Petición",
    "Queja",
    "Reclamo",
    "Sugerencia"
];

const estadosPqrs = [
    "Abierta",
    "En revisión",
    "Resuelta",
    "Cerrada"
];

function PqrsAdmin() {
    const navigate = useNavigate();

    const [usuario, setUsuario] = useState(null);
    const [pqrs, setPqrs] = useState([]);
    const [busqueda, setBusqueda] = useState("");
    const [filtroTipo, setFiltroTipo] = useState("");
    const [filtroEstado, setFiltroEstado] = useState("");
    const [pqrsSeleccionada, setPqrsSeleccionada] = useState(null);
    const [actualizando, setActualizando] = useState(false);

    useEffect(() => {
        cargarPqrs();
    }, []);

    const cargarPqrs = async () => {
        const {
            data: { user }
        } = await supabase.auth.getUser();

        setUsuario(user);

        const guardadas = localStorage.getItem("pqrs");

        if (guardadas) {
            try {
                const datos = JSON.parse(guardadas);

                if (Array.isArray(datos)) {
                    setPqrs(datos);
                    return;
                }
            } catch {
                localStorage.removeItem("pqrs");
            }
        }

        localStorage.setItem(
            "pqrs",
            JSON.stringify(pqrsIniciales)
        );

        setPqrs(pqrsIniciales);
    };

    const guardarPqrs = (nuevasPqrs) => {
        setPqrs(nuevasPqrs);

        localStorage.setItem(
            "pqrs",
            JSON.stringify(nuevasPqrs)
        );
    };

    const cambiarEstado = (id, nuevoEstado) => {
        const nuevasPqrs = pqrs.map((solicitud) =>
            solicitud.id === id
                ? {
                      ...solicitud,
                      estado: nuevoEstado
                  }
                : solicitud
        );

        guardarPqrs(nuevasPqrs);

        if (pqrsSeleccionada?.id === id) {
            setPqrsSeleccionada((actual) => ({
                ...actual,
                estado: nuevoEstado
            }));
        }
    };

    const verPqrs = (solicitud) => {
        setPqrsSeleccionada(solicitud);
    };

    const actualizarPqrs = () => {
        setActualizando(true);

        cargarPqrs();

        setTimeout(() => {
            setActualizando(false);
        }, 500);
    };

    const limpiarFiltros = () => {
        setBusqueda("");
        setFiltroTipo("");
        setFiltroEstado("");
    };

    const cerrarSesion = async () => {
        await supabase.auth.signOut();
        navigate("/");
    };

    const pqrsFiltradas = useMemo(() => {
        const texto = busqueda.toLowerCase();

        return pqrs.filter((solicitud) => {
            const id = String(
                solicitud.id || ""
            ).toLowerCase();

            const cliente = solicitud.anonima
                ? "anónimo"
                : String(
                      solicitud.cliente || ""
                  ).toLowerCase();

            const email = solicitud.anonima
                ? "anónima"
                : String(
                      solicitud.email || ""
                  ).toLowerCase();

            const asunto = String(
                solicitud.asunto || ""
            ).toLowerCase();

            const area = String(
                solicitud.area || ""
            ).toLowerCase();

            const coincideBusqueda =
                id.includes(texto) ||
                cliente.includes(texto) ||
                email.includes(texto) ||
                asunto.includes(texto) ||
                area.includes(texto);

            const coincideTipo =
                filtroTipo === "" ||
                solicitud.tipo === filtroTipo;

            const coincideEstado =
                filtroEstado === "" ||
                solicitud.estado === filtroEstado;

            return (
                coincideBusqueda &&
                coincideTipo &&
                coincideEstado
            );
        });
    }, [
        pqrs,
        busqueda,
        filtroTipo,
        filtroEstado
    ]);

    const total = pqrs.length;

    const abiertas = pqrs.filter(
        (solicitud) =>
            solicitud.estado === "Abierta"
    ).length;

    const revision = pqrs.filter(
        (solicitud) =>
            solicitud.estado === "En revisión"
    ).length;

    const resueltas = pqrs.filter(
        (solicitud) =>
            solicitud.estado === "Resuelta" ||
            solicitud.estado === "Cerrada"
    ).length;

    const anonimas = pqrs.filter(
        (solicitud) =>
            solicitud.anonima === true
    ).length;

    const obtenerNombreUsuario = () => {
        return (
            usuario?.user_metadata?.nombre ||
            usuario?.email?.split("@")[0] ||
            "Administrador"
        );
    };

    const obtenerCliente = (solicitud) => {
        if (solicitud.anonima === true) {
            return "Anónimo";
        }

        return solicitud.cliente || "Sin información";
    };

    const obtenerEmail = (solicitud) => {
        if (solicitud.anonima === true) {
            return "PQRS anónima";
        }

        return solicitud.email || "Sin correo";
    };

    const obtenerClaseTipo = (tipo) => {
        if (tipo === "Petición") {
            return "bg-info text-dark";
        }

        if (tipo === "Queja") {
            return "bg-danger";
        }

        if (tipo === "Reclamo") {
            return "bg-warning text-dark";
        }

        if (tipo === "Sugerencia") {
            return "bg-success";
        }

        return "bg-secondary";
    };

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

    const cantidadPorTipo = (tipo) => {
        return pqrs.filter(
            (solicitud) =>
                solicitud.tipo === tipo
        ).length;
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
                            <span>Administración</span>
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
                            Administrador
                        </span>
                    </div>
                </div>

                <nav className="sidebar-menu">
                    <Link
                        to="/admin"
                        className="sidebar-link nav-item-animated"
                    >
                        <i className="bi bi-grid-1x2-fill"></i>
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
                        <i className="bi bi-boxes"></i>
                        Inventario
                    </Link>

                    <Link
                        to="/ventas"
                        className="sidebar-link nav-item-animated"
                    >
                        <i className="bi bi-graph-up"></i>
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
                        className="sidebar-link nav-item-animated"
                    >
                        <i className="bi bi-ticket-detailed"></i>
                        Tickets
                    </Link>

                    <Link
                        to="/pqrs-admin"
                        className="sidebar-link active nav-item-animated"
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
                            Inicio / PQRS
                        </span>

                        <h1>Gestión de PQRS</h1>

                        <p>
                            Administra las peticiones, quejas,
                            reclamos y sugerencias.
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
                            <i className="bi bi-chat-left-text"></i>
                        </div>

                        <div>
                            <span>Total PQRS</span>
                            <strong>{total}</strong>
                            <small>
                                Solicitudes registradas
                            </small>
                        </div>
                    </div>

                    <div className="stat-card card-animated">
                        <div className="stat-icon icon-animated">
                            <i className="bi bi-envelope-open"></i>
                        </div>

                        <div>
                            <span>Abiertas</span>
                            <strong>{abiertas}</strong>
                            <small>
                                Requieren atención
                            </small>
                        </div>
                    </div>

                    <div className="stat-card card-animated">
                        <div className="stat-icon icon-animated">
                            <i className="bi bi-clock-history"></i>
                        </div>

                        <div>
                            <span>En revisión</span>
                            <strong>{revision}</strong>
                            <small>
                                En proceso
                            </small>
                        </div>
                    </div>

                    <div className="stat-card card-animated">
                        <div className="stat-icon icon-animated">
                            <i className="bi bi-incognito"></i>
                        </div>

                        <div>
                            <span>Anónimas</span>
                            <strong>{anonimas}</strong>
                            <small>
                                Sin datos personales
                            </small>
                        </div>
                    </div>
                </section>

                <section className="dashboard-card animate-slide-up">
                    <div className="card-header">
                        <div>
                            <h2>
                                Solicitudes PQRS
                            </h2>

                            <p>
                                Gestiona las solicitudes recibidas
                                desde el portal del cliente.
                            </p>
                        </div>

                        <button
                            type="button"
                            className="btn btn-outline-light btn-animated"
                            onClick={actualizarPqrs}
                            disabled={actualizando}
                        >
                            <i
                                className={`bi ${
                                    actualizando
                                        ? "bi-arrow-repeat spinner"
                                        : "bi-arrow-clockwise"
                                } me-2`}
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
                                    placeholder="Cliente, correo, asunto o área"
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
                                Tipo
                            </label>

                            <select
                                className="form-select"
                                value={filtroTipo}
                                onChange={(e) =>
                                    setFiltroTipo(
                                        e.target.value
                                    )
                                }
                            >
                                <option value="">
                                    Todos los tipos
                                </option>

                                {tiposPqrs.map((tipo) => (
                                    <option
                                        key={tipo}
                                        value={tipo}
                                    >
                                        {tipo}
                                    </option>
                                ))}
                            </select>
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
                                <option value="">
                                    Todos los estados
                                </option>

                                {estadosPqrs.map((estado) => (
                                    <option
                                        key={estado}
                                        value={estado}
                                    >
                                        {estado}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="col-md-1 d-flex align-items-end">
                            <button
                                type="button"
                                className="btn btn-outline-secondary w-100 btn-animated"
                                onClick={limpiarFiltros}
                                title="Limpiar filtros"
                            >
                                <i className="bi bi-x-lg"></i>
                            </button>
                        </div>
                    </div>

                    <div className="table-responsive">
                        <table className="table table-dark table-hover align-middle">
                            <thead>
                                <tr>
                                    <th>Radicado</th>
                                    <th>Cliente</th>
                                    <th>Tipo</th>
                                    <th>Asunto</th>
                                    <th>Área</th>
                                    <th>Fecha</th>
                                    <th>Estado</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>

                            <tbody>
                                {pqrsFiltradas.length > 0 ? (
                                    pqrsFiltradas.map(
                                        (solicitud) => (
                                            <tr
                                                key={
                                                    solicitud.id
                                                }
                                                className="table-row-animated"
                                            >
                                                <td>
                                                    <strong>
                                                        #
                                                        {
                                                            solicitud.id
                                                        }
                                                    </strong>
                                                </td>

                                                <td>
                                                    <div>
                                                        <strong>
                                                            {obtenerCliente(
                                                                solicitud
                                                            )}
                                                        </strong>

                                                        <small className="d-block text-secondary">
                                                            {obtenerEmail(
                                                                solicitud
                                                            )}
                                                        </small>

                                                        {solicitud.anonima && (
                                                            <span className="badge bg-secondary mt-1">
                                                                Anónima
                                                            </span>
                                                        )}
                                                    </div>
                                                </td>

                                                <td>
                                                    <span
                                                        className={`badge ${obtenerClaseTipo(
                                                            solicitud.tipo
                                                        )}`}
                                                    >
                                                        {
                                                            solicitud.tipo
                                                        }
                                                    </span>
                                                </td>

                                                <td>
                                                    {
                                                        solicitud.asunto
                                                    }
                                                </td>

                                                <td>
                                                    {
                                                        solicitud.area
                                                    }
                                                </td>

                                                <td>
                                                    {
                                                        solicitud.fecha
                                                    }
                                                </td>

                                                <td>
                                                    <select
                                                        className={`form-select form-select-sm estado-select ${obtenerClaseEstado(
                                                            solicitud.estado
                                                        )}`}
                                                        value={
                                                            solicitud.estado
                                                        }
                                                        onChange={(
                                                            e
                                                        ) =>
                                                            cambiarEstado(
                                                                solicitud.id,
                                                                e.target.value
                                                            )
                                                        }
                                                    >
                                                        {estadosPqrs.map(
                                                            (
                                                                estado
                                                            ) => (
                                                                <option
                                                                    key={
                                                                        estado
                                                                    }
                                                                    value={
                                                                        estado
                                                                    }
                                                                >
                                                                    {
                                                                        estado
                                                                    }
                                                                </option>
                                                            )
                                                        )}
                                                    </select>
                                                </td>

                                                <td>
                                                    <button
                                                        type="button"
                                                        className="btn btn-sm btn-outline-light btn-animated"
                                                        onClick={() =>
                                                            verPqrs(
                                                                solicitud
                                                            )
                                                        }
                                                        title="Ver solicitud"
                                                    >
                                                        <i className="bi bi-eye"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    )
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="8"
                                            className="text-center py-5"
                                        >
                                            <div className="animate-scale-in">
                                                <i className="bi bi-chat-left-text fs-1 d-block mb-3"></i>

                                                <h5>
                                                    No se encontraron
                                                    solicitudes.
                                                </h5>

                                                <p className="mb-0">
                                                    Intenta cambiar los
                                                    filtros de búsqueda.
                                                </p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </section>

                <section className="dashboard-card mt-4 animate-slide-up">
                    <div className="card-header">
                        <div>
                            <h2>
                                Distribución por tipo
                            </h2>

                            <p>
                                Cantidad de solicitudes según
                                su clasificación.
                            </p>
                        </div>
                    </div>

                    <div className="row g-3 stagger">
                        {tiposPqrs.map((tipo) => (
                            <div
                                className="col-md-3"
                                key={tipo}
                            >
                                <div className="p-3 rounded border border-secondary card-animated">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <span>
                                            {tipo}
                                        </span>

                                        <strong>
                                            {cantidadPorTipo(
                                                tipo
                                            )}
                                        </strong>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            {pqrsSeleccionada && (
                <div
                    className="modal d-block animate-fade-in"
                    tabIndex="-1"
                    role="dialog"
                    style={{
                        backgroundColor:
                            "rgba(0, 0, 0, 0.75)"
                    }}
                >
                    <div className="modal-dialog modal-dialog-centered modal-lg animate-scale-in">
                        <div className="modal-content">
                            <div className="modal-header">
                                <div>
                                    <h5 className="modal-title">
                                        Detalle de PQRS
                                    </h5>

                                    <small>
                                        Radicado #
                                        {
                                            pqrsSeleccionada.id
                                        }
                                    </small>
                                </div>

                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() =>
                                        setPqrsSeleccionada(
                                            null
                                        )
                                    }
                                ></button>
                            </div>

                            <div className="modal-body">
                                {pqrsSeleccionada.anonima && (
                                    <div className="alert alert-secondary">
                                        <i className="bi bi-incognito me-2"></i>
                                        Esta solicitud fue enviada
                                        de forma anónima. No contiene
                                        datos personales del remitente.
                                    </div>
                                )}

                                <div className="row g-4">
                                    <div className="col-md-6">
                                        <strong>
                                            Cliente
                                        </strong>

                                        <p>
                                            {obtenerCliente(
                                                pqrsSeleccionada
                                            )}
                                        </p>
                                    </div>

                                    <div className="col-md-6">
                                        <strong>
                                            Correo
                                        </strong>

                                        <p>
                                            {obtenerEmail(
                                                pqrsSeleccionada
                                            )}
                                        </p>
                                    </div>

                                    <div className="col-md-4">
                                        <strong>
                                            Tipo
                                        </strong>

                                        <p>
                                            <span
                                                className={`badge ${obtenerClaseTipo(
                                                    pqrsSeleccionada.tipo
                                                )}`}
                                            >
                                                {
                                                    pqrsSeleccionada.tipo
                                                }
                                            </span>
                                        </p>
                                    </div>

                                    <div className="col-md-4">
                                        <strong>
                                            Área
                                        </strong>

                                        <p>
                                            {
                                                pqrsSeleccionada.area
                                            }
                                        </p>
                                    </div>

                                    <div className="col-md-4">
                                        <strong>
                                            Fecha
                                        </strong>

                                        <p>
                                            {
                                                pqrsSeleccionada.fecha
                                            }
                                        </p>
                                    </div>

                                    <div className="col-12">
                                        <strong>
                                            Asunto
                                        </strong>

                                        <p>
                                            {
                                                pqrsSeleccionada.asunto
                                            }
                                        </p>
                                    </div>

                                    <div className="col-12">
                                        <strong>
                                            Descripción
                                        </strong>

                                        <div className="p-3 rounded border border-secondary">
                                            {
                                                pqrsSeleccionada.descripcion ||
                                                "No hay descripción disponible."
                                            }
                                        </div>
                                    </div>

                                    <div className="col-12">
                                        <label className="form-label">
                                            Estado de la solicitud
                                        </label>

                                        <select
                                            className="form-select"
                                            value={
                                                pqrsSeleccionada.estado
                                            }
                                            onChange={(e) =>
                                                cambiarEstado(
                                                    pqrsSeleccionada.id,
                                                    e.target.value
                                                )
                                            }
                                        >
                                            {estadosPqrs.map(
                                                (estado) => (
                                                    <option
                                                        key={
                                                            estado
                                                        }
                                                        value={
                                                            estado
                                                        }
                                                    >
                                                        {
                                                            estado
                                                        }
                                                    </option>
                                                )
                                            )}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary btn-animated"
                                    onClick={() =>
                                        setPqrsSeleccionada(
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

export default PqrsAdmin;