import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Pqrs() {
    const navigate = useNavigate();

    const {
        usuario,
        cerrarSesion
    } = useAuth();

    const [pqrs, setPqrs] = useState([]);
    const [filtro, setFiltro] = useState("Todas");
    const [mostrarFormulario, setMostrarFormulario] = useState(false);

    const [formulario, setFormulario] = useState({
        tipo: "Petición",
        area: "Administrativo",
        asunto: "",
        descripcion: ""
    });

    useEffect(() => {
        if (!usuario) {
            return;
        }

        const almacenadas = JSON.parse(
            localStorage.getItem("pqrs") || "[]"
        );

        const propias = almacenadas.filter(
            (item) => item.email === usuario.email
        );

        setPqrs(propias);
    }, [usuario]);

    const manejarCambio = (e) => {
        const {
            name,
            value
        } = e.target;

        setFormulario((anterior) => ({
            ...anterior,
            [name]: value
        }));
    };

    const abrirFormulario = () => {
        setFormulario({
            tipo: "Petición",
            area: "Administrativo",
            asunto: "",
            descripcion: ""
        });

        setMostrarFormulario(true);
    };

    const cerrarFormulario = () => {
        setMostrarFormulario(false);
    };

    const crearPqrs = (e) => {
        e.preventDefault();

        if (
            !formulario.asunto.trim() ||
            !formulario.descripcion.trim()
        ) {
            alert("Completa todos los campos.");
            return;
        }

        if (!usuario) {
            return;
        }

        const almacenadas = JSON.parse(
            localStorage.getItem("pqrs") || "[]"
        );

        const nuevaPqrs = {
            id: `PQ-${String(
                almacenadas.length + 1
            ).padStart(3, "0")}`,

            fecha: new Date().toISOString(),

            nombre:
                usuario.user_metadata?.nombre ||
                usuario.email.split("@")[0],

            email: usuario.email,

            tipo: formulario.tipo,

            area: formulario.area,

            asunto:
                formulario.asunto.trim(),

            descripcion:
                formulario.descripcion.trim(),

            estado: "Abierta"
        };

        const actualizadas = [
            nuevaPqrs,
            ...almacenadas
        ];

        localStorage.setItem(
            "pqrs",
            JSON.stringify(actualizadas)
        );

        setPqrs(
            actualizadas.filter(
                (item) =>
                    item.email === usuario.email
            )
        );

        setFormulario({
            tipo: "Petición",
            area: "Administrativo",
            asunto: "",
            descripcion: ""
        });

        setMostrarFormulario(false);
    };

    const pqrsFiltradas =
        filtro === "Todas"
            ? pqrs
            : pqrs.filter(
                (item) =>
                    item.estado === filtro
            );

    const obtenerClaseEstado = (estado) => {
        switch (estado) {
            case "Abierta":
                return "pqrs-status abierta";

            case "En revisión":
                return "pqrs-status revision";

            case "Resuelta":
                return "pqrs-status resuelta";

            case "Cerrada":
                return "pqrs-status cerrada";

            default:
                return "pqrs-status";
        }
    };

    const formatearFecha = (fecha) => {
        return new Date(fecha).toLocaleDateString(
            "es-CO",
            {
                day: "2-digit",
                month: "short",
                year: "numeric"
            }
        );
    };

    return (
        <div className="client-page page-animated">
            <nav className="client-navbar animate-slide-down">
                <div
                    className="client-brand"
                    onClick={() =>
                        navigate("/cliente")
                    }
                    style={{
                        cursor: "pointer"
                    }}
                >
                    <img
                        src="/assets/img/image-2.png"
                        alt="Dotaciones Fortuna IJ"
                        className="logo-animated"
                    />

                    <div>
                        <strong>
                            FORTUNA IJ
                        </strong>

                        <span>
                            Dotaciones Empresariales
                        </span>
                    </div>
                </div>

                <div className="client-menu">
                    <button
                        className="client-menu-link nav-item-animated"
                        onClick={() =>
                            navigate("/cliente")
                        }
                    >
                        <i className="bi bi-house"></i>
                        Inicio
                    </button>

                    <button
                        className="client-menu-link nav-item-animated"
                        onClick={() =>
                            navigate("/catalogo")
                        }
                    >
                        <i className="bi bi-grid"></i>
                        Catálogo
                    </button>

                    <button
                        className="client-menu-link nav-item-animated"
                        onClick={() =>
                            navigate("/pedidos")
                        }
                    >
                        <i className="bi bi-box-seam"></i>
                        Mis pedidos
                    </button>

                    <button
                        className="client-menu-link active nav-item-animated"
                        onClick={() =>
                            navigate("/pqrs")
                        }
                    >
                        <i className="bi bi-chat-square-text"></i>
                        PQRS
                    </button>

                    <button
                        className="client-menu-link nav-item-animated"
                        onClick={() =>
                            navigate("/cuenta")
                        }
                    >
                        <i className="bi bi-person"></i>
                        Mi cuenta
                    </button>
                </div>

                <div className="client-actions">
                    <button
                        className="client-cart icon-animated"
                        onClick={() =>
                            navigate("/carrito")
                        }
                        title="Carrito"
                    >
                        <i className="bi bi-cart3"></i>
                    </button>

                    <div className="client-user">
                        <div className="client-avatar animate-pulse-soft">
                            {usuario
                                ?.user_metadata
                                ?.nombre
                                ?.charAt(0)
                                .toUpperCase() ||
                                usuario?.email
                                    ?.charAt(0)
                                    .toUpperCase()}
                        </div>

                        <div className="client-user-info">
                            <strong>
                                {usuario
                                    ?.user_metadata
                                    ?.nombre ||
                                    usuario?.email?.split(
                                        "@"
                                    )[0]}
                            </strong>

                            <small>
                                Cliente
                            </small>
                        </div>
                    </div>

                    <button
                        className="client-logout icon-animated"
                        onClick={cerrarSesion}
                        title="Cerrar sesión"
                    >
                        <i className="bi bi-box-arrow-right"></i>
                    </button>
                </div>
            </nav>

            <main className="client-dashboard">
                <section className="pqrs-header animate-slide-up">
                    <div>
                        <span className="section-kicker">
                            ATENCIÓN AL CLIENTE
                        </span>

                        <h1>
                            PQRS
                        </h1>

                        <p>
                            Registra tus peticiones, quejas,
                            reclamos o sugerencias y consulta
                            su estado.
                        </p>
                    </div>

                    <button
                        className="pqrs-new-button btn-animated"
                        onClick={abrirFormulario}
                    >
                        <i className="bi bi-plus-lg"></i>
                        Nueva PQRS
                    </button>
                </section>

                <section className="pqrs-summary stagger">
                    <div className="pqrs-summary-card card-animated">
                        <div className="pqrs-summary-icon icon-animated">
                            <i className="bi bi-chat-left-text"></i>
                        </div>

                        <div>
                            <span>
                                Total
                            </span>

                            <strong>
                                {pqrs.length}
                            </strong>
                        </div>
                    </div>

                    <div className="pqrs-summary-card card-animated">
                        <div className="pqrs-summary-icon open icon-animated">
                            <i className="bi bi-envelope-open"></i>
                        </div>

                        <div>
                            <span>
                                Abiertas
                            </span>

                            <strong>
                                {
                                    pqrs.filter(
                                        (item) =>
                                            item.estado ===
                                            "Abierta"
                                    ).length
                                }
                            </strong>
                        </div>
                    </div>

                    <div className="pqrs-summary-card card-animated">
                        <div className="pqrs-summary-icon review icon-animated">
                            <i className="bi bi-hourglass-split"></i>
                        </div>

                        <div>
                            <span>
                                En revisión
                            </span>

                            <strong>
                                {
                                    pqrs.filter(
                                        (item) =>
                                            item.estado ===
                                            "En revisión"
                                    ).length
                                }
                            </strong>
                        </div>
                    </div>

                    <div className="pqrs-summary-card card-animated">
                        <div className="pqrs-summary-icon solved icon-animated">
                            <i className="bi bi-check-circle"></i>
                        </div>

                        <div>
                            <span>
                                Resueltas
                            </span>

                            <strong>
                                {
                                    pqrs.filter(
                                        (item) =>
                                            item.estado ===
                                            "Resuelta" ||
                                            item.estado ===
                                            "Cerrada"
                                    ).length
                                }
                            </strong>
                        </div>
                    </div>
                </section>

                <section className="pqrs-panel animate-fade-in">
                    <div className="pqrs-panel-header">
                        <div className="animate-slide-left">
                            <h2>
                                Mis solicitudes
                            </h2>

                            <p>
                                Historial de PQRS registradas
                            </p>
                        </div>

                        <div className="pqrs-filters animate-slide-right">
                            {[
                                "Todas",
                                "Abierta",
                                "En revisión",
                                "Resuelta",
                                "Cerrada"
                            ].map(
                                (opcion) => (
                                    <button
                                        key={opcion}
                                        className={
                                            filtro === opcion
                                                ? "active"
                                                : ""
                                        }
                                        onClick={() =>
                                            setFiltro(
                                                opcion
                                            )
                                        }
                                    >
                                        {opcion}
                                    </button>
                                )
                            )}
                        </div>
                    </div>

                    <div className="pqrs-list">
                        {pqrsFiltradas.length === 0 ? (
                            <div className="pqrs-empty animate-scale-in">
                                <div className="pqrs-empty-icon icon-animated">
                                    <i className="bi bi-chat-square-dots"></i>
                                </div>

                                <h3>
                                    No tienes solicitudes
                                </h3>

                                <p>
                                    Cuando registres una PQRS,
                                    aparecerá aquí.
                                </p>

                                <button
                                    className="btn-animated"
                                    onClick={
                                        abrirFormulario
                                    }
                                >
                                    Crear una PQRS
                                </button>
                            </div>
                        ) : (
                            <div className="stagger">
                                {pqrsFiltradas.map(
                                    (item) => (
                                        <article
                                            className="pqrs-card card-animated"
                                            key={item.id}
                                        >
                                            <div className="pqrs-card-top">
                                                <div className="pqrs-card-title">
                                                    <span>
                                                        {item.id}
                                                    </span>

                                                    <h3>
                                                        {item.asunto}
                                                    </h3>
                                                </div>

                                                <span
                                                    className={
                                                        obtenerClaseEstado(
                                                            item.estado
                                                        )
                                                    }
                                                >
                                                    {item.estado}
                                                </span>
                                            </div>

                                            <div className="pqrs-card-info">
                                                <div>
                                                    <span>
                                                        Tipo
                                                    </span>

                                                    <strong>
                                                        {item.tipo}
                                                    </strong>
                                                </div>

                                                <div>
                                                    <span>
                                                        Área
                                                    </span>

                                                    <strong>
                                                        {item.area}
                                                    </strong>
                                                </div>

                                                <div>
                                                    <span>
                                                        Fecha
                                                    </span>

                                                    <strong>
                                                        {formatearFecha(
                                                            item.fecha
                                                        )}
                                                    </strong>
                                                </div>
                                            </div>

                                            <div className="pqrs-description">
                                                {item.descripcion}
                                            </div>
                                        </article>
                                    )
                                )}
                            </div>
                        )}
                    </div>
                </section>
            </main>

            <footer className="client-footer animate-fade-in">
                <span>
                    © 2026 Dotaciones Fortuna IJ
                </span>

                <span>
                    Atención y servicio para nuestros clientes
                </span>
            </footer>

            {mostrarFormulario && (
                <div
                    className="pqrs-modal-overlay animate-fade-in"
                    onClick={
                        cerrarFormulario
                    }
                >
                    <div
                        className="pqrs-modal animate-scale-in"
                        onClick={(e) =>
                            e.stopPropagation()
                        }
                    >
                        <div className="pqrs-modal-header">
                            <div>
                                <span className="section-kicker">
                                    NUEVA SOLICITUD
                                </span>

                                <h2>
                                    Registrar PQRS
                                </h2>
                            </div>

                            <button
                                type="button"
                                className="icon-animated"
                                onClick={
                                    cerrarFormulario
                                }
                            >
                                <i className="bi bi-x-lg"></i>
                            </button>
                        </div>

                        <form onSubmit={crearPqrs}>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>
                                        Tipo de solicitud
                                    </label>

                                    <select
                                        name="tipo"
                                        value={
                                            formulario.tipo
                                        }
                                        onChange={
                                            manejarCambio
                                        }
                                    >
                                        <option value="Petición">
                                            Petición
                                        </option>

                                        <option value="Queja">
                                            Queja
                                        </option>

                                        <option value="Reclamo">
                                            Reclamo
                                        </option>

                                        <option value="Sugerencia">
                                            Sugerencia
                                        </option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label>
                                        Área
                                    </label>

                                    <select
                                        name="area"
                                        value={
                                            formulario.area
                                        }
                                        onChange={
                                            manejarCambio
                                        }
                                    >
                                        <option value="Administrativo">
                                            Administrativo
                                        </option>

                                        <option value="Ventas">
                                            Ventas
                                        </option>

                                        <option value="Inventarios">
                                            Inventarios
                                        </option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-group">
                                <label>
                                    Asunto
                                </label>

                                <input
                                    type="text"
                                    name="asunto"
                                    value={
                                        formulario.asunto
                                    }
                                    onChange={
                                        manejarCambio
                                    }
                                    placeholder="Escribe el asunto de tu solicitud"
                                    maxLength="100"
                                />
                            </div>

                            <div className="form-group">
                                <label>
                                    Descripción
                                </label>

                                <textarea
                                    name="descripcion"
                                    value={
                                        formulario.descripcion
                                    }
                                    onChange={
                                        manejarCambio
                                    }
                                    placeholder="Describe detalladamente tu solicitud..."
                                    rows="5"
                                    maxLength="500"
                                />
                            </div>

                            <div className="pqrs-modal-actions">
                                <button
                                    type="button"
                                    className="pqrs-cancel btn-animated"
                                    onClick={
                                        cerrarFormulario
                                    }
                                >
                                    Cancelar
                                </button>

                                <button
                                    type="submit"
                                    className="pqrs-submit btn-animated"
                                >
                                    <i className="bi bi-send"></i>
                                    Enviar solicitud
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Pqrs;