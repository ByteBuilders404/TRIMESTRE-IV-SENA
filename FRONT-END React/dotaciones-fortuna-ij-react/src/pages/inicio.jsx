import { useState } from "react";
import { Link } from "react-router-dom";

const productos = [
    {
        nombre: "Uniforme Empresarial",
        categoria: "Uniformes SENA",
        precio: 37000,
        descripcion:
            "Uniforme administrativo institucional con acabados empresariales.",
        imagen: "/assets/img/image.png"
    },
    {
        nombre: "Botas de Seguridad",
        categoria: "Calzado Seguridad",
        precio: 14333,
        descripcion:
            "Bota industrial con suela antideslizante y diseño de seguridad.",
        imagen: "/assets/img/botas-industriales-negras.png"
    },
    {
        nombre: "Casco Industrial Amarillo",
        categoria: "Seguridad",
        precio: 28000,
        descripcion:
            "Casco de protección para ambientes industriales.",
        imagen: "/assets/img/casco-industrial-amarillo.png"
    },
    {
        nombre: "Chaleco Alta Visibilidad",
        categoria: "Ropa Industrial",
        precio: 18000,
        descripcion:
            "Chaleco reflectivo para señalización y seguridad.",
        imagen: "/assets/img/chaleco-naranja.png"
    },
    {
        nombre: "Overol Industrial Azul",
        categoria: "Ropa Industrial",
        precio: 85000,
        descripcion:
            "Overol resistente para trabajo operativo y de planta.",
        imagen: "/assets/img/overol-industrial-azul-real.png"
    },
    {
        nombre: "Parka Impermeable",
        categoria: "Ropa Industrial",
        precio: 95000,
        descripcion:
            "Chaqueta impermeable con protección para lluvia.",
        imagen: "/assets/img/parka-impermeable-amarilla.png"
    }
];

const tiposPqrs = [
    "Petición",
    "Queja",
    "Reclamo",
    "Sugerencia"
];

function Inicio() {
    const [mostrarModalPqrs, setMostrarModalPqrs] = useState(false);
    const [mensajePqrs, setMensajePqrs] = useState("");
    const [tipoMensaje, setTipoMensaje] = useState("");

    const [formularioPqrs, setFormularioPqrs] = useState({
        nombre: "",
        email: "",
        tipo: "Petición",
        asunto: "",
        descripcion: "",
        area: "Administrativo"
    });

    const abrirPqrs = () => {
        setMensajePqrs("");
        setTipoMensaje("");

        setFormularioPqrs({
            nombre: "",
            email: "",
            tipo: "Petición",
            asunto: "",
            descripcion: "",
            area: "Administrativo"
        });

        setMostrarModalPqrs(true);
    };

    const cerrarPqrs = () => {
        setMostrarModalPqrs(false);
        setMensajePqrs("");
        setTipoMensaje("");
    };

    const cambiarFormulario = (e) => {
        const { name, value } = e.target;

        setFormularioPqrs((actual) => ({
            ...actual,
            [name]: value
        }));
    };

    const generarRadicado = () => {
        const fecha = new Date();
        const numero = fecha.getTime().toString().slice(-6);

        return `PQ-${numero}`;
    };

    const obtenerFecha = () => {
        return new Date().toLocaleDateString("es-CO");
    };

    const enviarPqrs = (e) => {
        e.preventDefault();

        setMensajePqrs("");
        setTipoMensaje("");

        const asunto = formularioPqrs.asunto.trim();
        const descripcion = formularioPqrs.descripcion.trim();
        const nombre = formularioPqrs.nombre.trim();
        const email = formularioPqrs.email.trim().toLowerCase();

        if (!asunto || !descripcion) {
            setTipoMensaje("danger");
            setMensajePqrs(
                "Completa el asunto y la descripción de la solicitud."
            );
            return;
        }

        if (email && !email.includes("@")) {
            setTipoMensaje("danger");
            setMensajePqrs(
                "Ingresa un correo electrónico válido."
            );
            return;
        }

        const pqrsGuardadas =
            JSON.parse(localStorage.getItem("pqrs")) || [];

        const textoBusqueda =
            `${asunto} ${descripcion}`.toLowerCase();

        const nuevaPqrs = {
            id: generarRadicado(),
            cliente: nombre || "Anónimo",
            email: email || "No proporcionado",
            tipo: formularioPqrs.tipo,
            asunto,
            descripcion,
            area: formularioPqrs.area,
            estado: "Abierta",
            fecha: obtenerFecha(),
            origen: "Publico",
            anonima: !email,
            solicitudDesbloqueo:
                textoBusqueda.includes("desbloqueo") ||
                textoBusqueda.includes("bloqueada") ||
                textoBusqueda.includes("bloqueado")
        };

        const nuevasPqrs = [
            ...pqrsGuardadas,
            nuevaPqrs
        ];

        localStorage.setItem(
            "pqrs",
            JSON.stringify(nuevasPqrs)
        );

        setTipoMensaje("success");

        setMensajePqrs(
            `PQRS registrada correctamente. Radicado: ${nuevaPqrs.id}`
        );

        setFormularioPqrs({
            nombre: "",
            email: "",
            tipo: "Petición",
            asunto: "",
            descripcion: "",
            area: "Administrativo"
        });

        setTimeout(() => {
            cerrarPqrs();
        }, 2500);
    };

    return (
        <div className="public-page page-animated">

            <header className="topbar animate-slide-down">

                <Link
                    to="/"
                    className="brand logo-animated"
                >
                    <img
                        src="/assets/img/image-2.png"
                        alt="Logo Dotaciones Fortuna IJ"
                    />

                    <span>
                        Dotaciones Fortuna IJ
                    </span>
                </Link>

                <nav className="mainnav">

                    <a
                        className="nav-link-custom active nav-item-animated"
                        href="#inicio"
                    >
                        Inicio
                    </a>

                    <a
                        className="nav-link-custom nav-item-animated delay-100"
                        href="#nosotros"
                    >
                        Nosotros
                    </a>

                    <Link
                        className="nav-link-custom nav-item-animated delay-200"
                        to="/login"
                    >
                        Catálogo
                    </Link>

                    <Link
                        className="nav-link-custom nav-item-animated delay-300"
                        to="/login"
                    >
                        Iniciar Sesión
                    </Link>

                    <Link
                        className="nav-link-custom nav-item-animated delay-400"
                        to="/registro"
                    >
                        Registrarse
                    </Link>

                </nav>

            </header>

            <section
                className="hero-public"
                id="inicio"
            >

                <div className="hero-content animate-slide-left">

                    <span className="hero-badge animate-fade-in">
                        Vestimos tu trabajo, impulsamos tu empresa
                    </span>

                    <h1 className="animate-slide-up">
                        Dotaciones
                        <br />
                        <span>
                            Fortuna IJ
                        </span>
                    </h1>

                    <p className="animate-slide-up delay-100">
                        Dotaciones profesionales de calidad superior.
                        Uniformes, equipos de seguridad y todo lo que
                        tu empresa necesita.
                    </p>

                    <div className="hero-actions animate-slide-up delay-200">

                        <Link
                            className="public-btn btn-animated"
                            to="/registro"
                        >
                            Conocer Ahora
                        </Link>

                        <Link
                            className="public-btn-secondary btn-animated"
                            to="/login"
                        >
                            Iniciar Sesión
                        </Link>

                    </div>

                    <div className="mt-4 animate-slide-up delay-300">

                        <button
                            type="button"
                            className="public-btn-secondary btn-animated"
                            onClick={abrirPqrs}
                        >
                            <i className="bi bi-chat-left-text me-2"></i>
                            PQRS Anónima
                        </button>

                    </div>

                </div>

                <div className="hero-visual-public animate-slide-right">

                    <img
                        className="image-hover"
                        src="/assets/img/image-2.png"
                        alt="Uniformes Dotaciones Fortuna IJ"
                    />

                </div>

            </section>

            <section
                className="public-section"
                id="nosotros"
            >

                <div className="public-section-title animate-slide-up">

                    <h2>
                        Nuestros Productos
                    </h2>

                    <p>
                        Las mejores dotaciones para tu empresa
                    </p>

                </div>

                <div className="public-products-grid stagger">

                    {productos.map((producto) => (

                        <article
                            className="public-product-card card-animated hover-lift"
                            key={producto.nombre}
                        >

                            <div className="public-product-img">

                                <img
                                    className="image-hover"
                                    src={producto.imagen}
                                    alt={producto.nombre}
                                />

                            </div>

                            <div className="public-product-info">

                                <span className="public-tag">
                                    {producto.categoria}
                                </span>

                                <h3>
                                    {producto.nombre}
                                </h3>

                                <p>
                                    {producto.descripcion}
                                </p>

                                <div className="public-row-between">

                                    <strong className="public-price">
                                        $
                                        {producto.precio.toLocaleString(
                                            "es-CO"
                                        )}
                                    </strong>

                                    <Link
                                        className="public-btn-secondary small btn-animated"
                                        to="/login"
                                    >
                                        Ver más
                                    </Link>

                                </div>

                            </div>

                        </article>

                    ))}

                </div>

            </section>

            <section className="about-public">

                <div className="animate-slide-left">

                    <span className="hero-badge">
                        Dotaciones Fortuna IJ
                    </span>

                    <h2>
                        Calidad y seguridad para cada jornada
                    </h2>

                    <p>
                        Trabajamos para ofrecer dotaciones funcionales,
                        resistentes y pensadas para las necesidades de
                        cada empresa.
                    </p>

                </div>

                <div className="about-public-card card-animated hover-lift animate-slide-right">

                    <i className="bi bi-shield-check icon-animated"></i>

                    <h3>
                        Soluciones empresariales
                    </h3>

                    <p>
                        Uniformes y elementos de protección para
                        diferentes sectores laborales.
                    </p>

                </div>

                <div className="about-public-card card-animated hover-lift animate-slide-right delay-200">

                    <i className="bi bi-box-seam icon-animated"></i>

                    <h3>
                        Atención y seguimiento
                    </h3>

                    <p>
                        Consulta productos, realiza pedidos y haz
                        seguimiento desde nuestro portal.
                    </p>

                </div>

            </section>

            <footer className="public-footer animate-fade-in">

                <div className="footer-company animate-slide-left">

                    <img
                        className="image-hover"
                        src="/assets/img/image-2.png"
                        alt="Logo Dotaciones Fortuna IJ"
                    />

                    <p className="footer-slogan">
                        Vestimos tu trabajo, impulsamos tu empresa
                    </p>

                    <p>
                        312 388 8729 - 313 851 6917
                    </p>

                    <p>
                        dotacionesfortunaij@gmail.com
                    </p>

                    <p>
                        dotacionesfortunaij
                    </p>

                </div>

                <div className="footer-location animate-slide-right">

                    <h3>
                        Ubicación
                    </h3>

                    <p>
                        Cra 63 No. 22 - 22 sur
                    </p>

                    <iframe
                        src="https://www.google.com/maps?q=Cra%2063%20No.%2022-22%20Sur%2C%20Bogot%C3%A1%2C%20Colombia&output=embed"
                        loading="lazy"
                        title="Mapa Dotaciones Fortuna IJ"
                    ></iframe>

                    <p>
                        © 2026 Dotaciones Fortuna IJ. Todos los derechos
                        reservados.
                    </p>

                </div>

            </footer>

            {mostrarModalPqrs && (

                <div
                    className="pqrs-modal-overlay"
                    onClick={cerrarPqrs}
                >

                    <div
                        className="pqrs-modal animate-scale-in"
                        onClick={(e) => e.stopPropagation()}
                    >

                        <div className="pqrs-modal-header">

                            <div>

                                <h3>
                                    Registrar PQRS
                                </h3>

                                <p>
                                    Puedes enviar tu solicitud sin iniciar sesión.
                                </p>

                            </div>

                            <button
                                type="button"
                                className="pqrs-modal-close"
                                onClick={cerrarPqrs}
                            >
                                <i className="bi bi-x-lg"></i>
                            </button>

                        </div>

                        <form onSubmit={enviarPqrs}>

                            <div className="pqrs-modal-body">

                                {mensajePqrs && (

                                    <div
                                        className={`alert alert-${tipoMensaje} alert-animated`}
                                    >
                                        {mensajePqrs}
                                    </div>

                                )}

                                <div className="alert alert-info">

                                    <strong>
                                        Solicitud anónima
                                    </strong>

                                    <div className="mt-1">
                                        El nombre y correo son opcionales.
                                        Si deseas que el administrador pueda
                                        contactarte, deja tu correo.
                                    </div>

                                </div>

                                <div className="row g-3">

                                    <div className="col-md-6">

                                        <label className="form-label">
                                            Nombre
                                        </label>

                                        <input
                                            type="text"
                                            name="nombre"
                                            className="form-control"
                                            value={formularioPqrs.nombre}
                                            onChange={cambiarFormulario}
                                            placeholder="Opcional"
                                        />

                                    </div>

                                    <div className="col-md-6">

                                        <label className="form-label">
                                            Correo electrónico
                                        </label>

                                        <input
                                            type="email"
                                            name="email"
                                            className="form-control"
                                            value={formularioPqrs.email}
                                            onChange={cambiarFormulario}
                                            placeholder="Opcional"
                                        />

                                        <small className="text-secondary">
                                            Déjalo si deseas recibir respuesta
                                            o solicitar desbloqueo de tu cuenta.
                                        </small>

                                    </div>

                                    <div className="col-md-6">

                                        <label className="form-label">
                                            Tipo de solicitud
                                        </label>

                                        <select
                                            name="tipo"
                                            className="form-select"
                                            value={formularioPqrs.tipo}
                                            onChange={cambiarFormulario}
                                        >

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

                                    <div className="col-md-6">

                                        <label className="form-label">
                                            Área
                                        </label>

                                        <select
                                            name="area"
                                            className="form-select"
                                            value={formularioPqrs.area}
                                            onChange={cambiarFormulario}
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

                                    <div className="col-12">

                                        <label className="form-label">
                                            Asunto
                                        </label>

                                        <input
                                            type="text"
                                            name="asunto"
                                            className="form-control"
                                            value={formularioPqrs.asunto}
                                            onChange={cambiarFormulario}
                                            placeholder="Escribe el asunto de tu solicitud"
                                            required
                                        />

                                    </div>

                                    <div className="col-12">

                                        <label className="form-label">
                                            Descripción
                                        </label>

                                        <textarea
                                            name="descripcion"
                                            className="form-control"
                                            rows="5"
                                            value={formularioPqrs.descripcion}
                                            onChange={cambiarFormulario}
                                            placeholder="Describe detalladamente tu solicitud"
                                            required
                                        ></textarea>

                                    </div>

                                </div>

                            </div>

                            <div className="pqrs-modal-actions">

                                <button
                                    type="button"
                                    className="btn btn-secondary btn-animated"
                                    onClick={cerrarPqrs}
                                >
                                    Cancelar
                                </button>

                                <button
                                    type="submit"
                                    className="btn btn-primary btn-animated"
                                >
                                    <i className="bi bi-send me-2"></i>
                                    Enviar PQRS
                                </button>

                            </div>

                        </form>

                    </div>

                </div>

            )}

        </div>
    );
}

export default Inicio;