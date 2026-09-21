import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Cliente() {
    const navigate = useNavigate();

    const {
        usuario,
        cerrarSesion
    } = useAuth();

    if (!usuario) {
        return null;
    }

    const nombre =
        usuario.user_metadata?.nombre ||
        usuario.email?.split("@")[0] ||
        "Cliente";

    const inicial = nombre.charAt(0).toUpperCase();

    return (
        <div className="client-page page-animated">

            <nav className="client-navbar animate-slide-down">

                <div
                    className="client-brand"
                    onClick={() => navigate("/cliente")}
                    style={{ cursor: "pointer" }}
                >
                    <img
                        src="/assets/img/image-2.png"
                        alt="Fortuna IJ"
                        className="logo-animated"
                    />

                    <div>
                        <strong>FORTUNA IJ</strong>

                        <span>
                            Dotaciones Empresariales
                        </span>
                    </div>
                </div>

                <div className="client-menu">

                    <button
                        className="client-menu-link active nav-item-animated"
                        onClick={() => navigate("/cliente")}
                    >
                        <i className="bi bi-house"></i>
                        Inicio
                    </button>

                    <button
                        className="client-menu-link nav-item-animated"
                        onClick={() => navigate("/catalogo")}
                    >
                        <i className="bi bi-grid"></i>
                        Catálogo
                    </button>

                    <button
                        className="client-menu-link nav-item-animated"
                        onClick={() => navigate("/pedidos")}
                    >
                        <i className="bi bi-box-seam"></i>
                        Mis pedidos
                    </button>

                    <button
                        className="client-menu-link nav-item-animated"
                        onClick={() => navigate("/pqrs")}
                    >
                        <i className="bi bi-chat-square-text"></i>
                        PQRS
                    </button>

                    <button
                        className="client-menu-link nav-item-animated"
                        onClick={() => navigate("/cuenta")}
                    >
                        <i className="bi bi-person"></i>
                        Mi cuenta
                    </button>

                </div>

                <div className="client-actions">

                    <button
                        className="client-cart icon-animated"
                        onClick={() => navigate("/carrito")}
                        title="Carrito"
                    >
                        <i className="bi bi-cart3"></i>
                    </button>

                    <div className="client-user">

                        <div className="client-avatar animate-pulse-soft">
                            {inicial}
                        </div>

                        <div className="client-user-info">

                            <strong>{nombre}</strong>

                            <small>Cliente</small>

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

                <section className="client-home-hero">

                    <div className="client-home-hero-content animate-slide-left">

                        <span className="section-kicker">
                            BIENVENIDO A FORTUNA IJ
                        </span>

                        <h1>
                            Hola, {nombre}
                        </h1>

                        <h2>
                            Vestimos tu trabajo,
                            impulsamos tu empresa.
                        </h2>

                        <p>
                            Encuentra soluciones de dotación
                            empresarial, seguridad industrial,
                            uniformes y productos diseñados para
                            acompañar cada jornada laboral.
                        </p>

                        <button
                            className="public-btn btn-animated"
                            onClick={() => navigate("/catalogo")}
                        >
                            <i className="bi bi-grid"></i>
                            Ver catálogo
                        </button>

                    </div>

                    <div className="client-home-hero-image animate-slide-right">

                        <img
                            src="/assets/img/image.png"
                            alt="Dotaciones Fortuna IJ"
                            className="image-hover"
                        />

                    </div>

                </section>

                <section className="client-home-section">

                    <div className="client-section-heading animate-slide-up">

                        <span className="section-kicker">
                            FORTUNA IJ
                        </span>

                        <h2>
                            Soluciones para tu empresa
                        </h2>

                        <p>
                            Conoce nuestras principales soluciones
                            antes de explorar el catálogo.
                        </p>

                    </div>

                    <div className="client-home-cards stagger">

                        <article className="client-home-card card-animated">

                            <div className="client-home-card-icon icon-animated">
                                <i className="bi bi-person-badge"></i>
                            </div>

                            <h3>
                                Uniformes empresariales
                            </h3>

                            <p>
                                Prendas pensadas para fortalecer
                                la presentación e identidad de los
                                equipos de trabajo.
                            </p>

                        </article>

                        <article className="client-home-card card-animated">

                            <div className="client-home-card-icon icon-animated">
                                <i className="bi bi-shield-check"></i>
                            </div>

                            <h3>
                                Seguridad industrial
                            </h3>

                            <p>
                                Elementos de protección para
                                diferentes ambientes y actividades
                                laborales.
                            </p>

                        </article>

                        <article className="client-home-card card-animated">

                            <div className="client-home-card-icon icon-animated">
                                <i className="bi bi-box-seam"></i>
                            </div>

                            <h3>
                                Dotaciones completas
                            </h3>

                            <p>
                                Encuentra ropa, calzado y elementos
                                complementarios para tus necesidades
                                de dotación.
                            </p>

                        </article>

                    </div>

                </section>

                <section className="client-home-about">

                    <div className="client-home-about-image animate-slide-left">

                        <img
                            src="/assets/img/image-1.png"
                            alt="Dotaciones Fortuna IJ"
                            className="image-hover"
                        />

                    </div>

                    <div className="client-home-about-content animate-slide-right">

                        <span className="section-kicker">
                            SOBRE FORTUNA IJ
                        </span>

                        <h2>
                            Calidad y seguridad
                            para cada jornada
                        </h2>

                        <p>
                            En Dotaciones Fortuna IJ trabajamos
                            para ofrecer soluciones funcionales,
                            resistentes y pensadas para las
                            necesidades de cada empresa.
                        </p>

                        <p>
                            Nuestro objetivo es facilitar el acceso
                            a productos de dotación empresarial
                            mediante una plataforma sencilla,
                            organizada y fácil de utilizar.
                        </p>

                        <div className="client-home-checks stagger">

                            <div>
                                <i className="bi bi-check-circle-fill icon-animated"></i>

                                <span>
                                    Soluciones para diferentes sectores
                                </span>
                            </div>

                            <div>
                                <i className="bi bi-check-circle-fill icon-animated"></i>

                                <span>
                                    Productos de dotación empresarial
                                </span>
                            </div>

                            <div>
                                <i className="bi bi-check-circle-fill icon-animated"></i>

                                <span>
                                    Seguimiento de pedidos
                                </span>
                            </div>

                        </div>

                    </div>

                </section>

                <section className="client-home-catalog interactive">

                    <div className="animate-slide-left">

                        <span className="section-kicker">
                            NUESTRO CATÁLOGO
                        </span>

                        <h2>
                            ¿Ya sabes qué necesitas?
                        </h2>

                        <p>
                            Explora todos nuestros productos,
                            revisa sus características y agrega
                            los que necesites a tu carrito.
                        </p>

                    </div>

                    <button
                        className="public-btn btn-animated animate-slide-right"
                        onClick={() => navigate("/catalogo")}
                    >
                        Explorar catálogo
                        <i className="bi bi-arrow-right icon-animated"></i>
                    </button>

                </section>

                <section className="client-home-location">

                    <div className="client-section-heading animate-slide-up">

                        <span className="section-kicker">
                            UBICACIÓN
                        </span>

                        <h2>
                            Estamos para atenderte
                        </h2>

                        <p>
                            Encuentra nuestra ubicación y nuestros
                            canales de contacto.
                        </p>

                    </div>

                    <div className="client-home-location-grid">

                        <div className="client-home-contact stagger">

                            <div className="client-home-contact-item card-animated">

                                <div className="client-home-contact-icon icon-animated">
                                    <i className="bi bi-geo-alt"></i>
                                </div>

                                <div>
                                    <strong>
                                        Dirección
                                    </strong>

                                    <span>
                                        Cra 63 No. 22 - 22 sur
                                    </span>
                                </div>

                            </div>

                            <div className="client-home-contact-item card-animated">

                                <div className="client-home-contact-icon icon-animated">
                                    <i className="bi bi-telephone"></i>
                                </div>

                                <div>
                                    <strong>
                                        Teléfonos
                                    </strong>

                                    <span>
                                        312 388 8729
                                    </span>

                                    <span>
                                        313 851 6917
                                    </span>
                                </div>

                            </div>

                            <div className="client-home-contact-item card-animated">

                                <div className="client-home-contact-icon icon-animated">
                                    <i className="bi bi-envelope"></i>
                                </div>

                                <div>
                                    <strong>
                                        Correo
                                    </strong>

                                    <span>
                                        dotacionesfortunaij@gmail.com
                                    </span>
                                </div>

                            </div>

                        </div>

                        <div className="client-home-map animate-scale-in">

                            <iframe
                                src="https://www.google.com/maps?q=Cra%2063%20No.%2022-22%20Sur%2C%20Bogot%C3%A1%2C%20Colombia&output=embed"
                                loading="lazy"
                                title="Ubicación Dotaciones Fortuna IJ"
                            ></iframe>

                        </div>

                    </div>

                </section>

            </main>

            <footer className="client-footer animate-fade-in">

                <div>

                    <strong>
                        FORTUNA IJ
                    </strong>

                    <span>
                        Vestimos tu trabajo,
                        impulsamos tu empresa
                    </span>

                </div>

                <span>
                    © 2026 Dotaciones Fortuna IJ
                </span>

            </footer>

        </div>
    );
}

export default Cliente;