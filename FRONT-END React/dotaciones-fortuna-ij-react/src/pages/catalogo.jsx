import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Catalogo() {
    const navigate = useNavigate();

    const {
        usuario,
        cerrarSesion
    } = useAuth();

    const [busqueda, setBusqueda] = useState("");
    const [categoria, setCategoria] = useState("Todos");
    const [carrito, setCarrito] = useState([]);
    const [detalleProducto, setDetalleProducto] = useState(null);
    const [cantidadDetalle, setCantidadDetalle] = useState(1);
    const [productoAgregado, setProductoAgregado] = useState(null);

    const productos = [
        {
            id: 1,
            nombre: "Overol Industrial Azul",
            categoria: "Ropa Industrial",
            precio: 85000,
            imagen: "/assets/img/overol-industrial-azul-real.png",
            descripcion:
                "Overol industrial azul diseñado para brindar comodidad, resistencia y protección durante las actividades laborales.",
            material:
                "Drill 100% algodón de alta resistencia",
            caracteristicas: [
                "Costuras reforzadas",
                "Alta resistencia al desgaste",
                "Diseño cómodo para trabajo prolongado",
                "Disponible en diferentes tallas"
            ],
            cuidados: [
                "Lavar a máquina máximo a 40°C",
                "No utilizar blanqueador",
                "Planchar a temperatura media",
                "No lavar en seco"
            ],
            tallas: [
                "S",
                "M",
                "L",
                "XL",
                "XXL"
            ]
        },
        {
            id: 2,
            nombre: "Chaleco Reflectivo Naranja",
            categoria: "Seguridad",
            precio: 45000,
            imagen: "/assets/img/chaleco-naranja.png",
            descripcion:
                "Chaleco reflectivo de alta visibilidad para mejorar la seguridad del trabajador en ambientes industriales y zonas de tránsito.",
            material:
                "Poliéster de alta visibilidad con bandas reflectivas",
            caracteristicas: [
                "Alta visibilidad",
                "Bandas reflectivas",
                "Diseño liviano",
                "Cierre frontal"
            ],
            cuidados: [
                "Lavar a máquina máximo a 40°C",
                "No utilizar blanqueador",
                "No planchar directamente sobre las bandas reflectivas",
                "Secar al aire"
            ],
            tallas: [
                "S",
                "M",
                "L",
                "XL",
                "XXL"
            ]
        },
        {
            id: 3,
            nombre: "Botas Industriales Negras",
            categoria: "Calzado",
            precio: 120000,
            imagen: "/assets/img/botas-industriales-negras.png",
            descripcion:
                "Botas industriales negras diseñadas para brindar protección y estabilidad durante las jornadas laborales.",
            material:
                "Cuero sintético de alta resistencia con suela antideslizante",
            caracteristicas: [
                "Suela antideslizante",
                "Alta resistencia",
                "Diseño ergonómico",
                "Protección para ambientes industriales"
            ],
            cuidados: [
                "Limpiar con un paño húmedo",
                "No sumergir completamente en agua",
                "Secar a temperatura ambiente",
                "No utilizar productos abrasivos"
            ],
            tallas: [
                "36",
                "37",
                "38",
                "39",
                "40",
                "41",
                "42",
                "43",
                "44",
                "45"
            ]
        },
        {
            id: 4,
            nombre: "Casco Industrial Amarillo",
            categoria: "Seguridad",
            precio: 35000,
            imagen: "/assets/img/casco-industrial-amarillo.png",
            descripcion:
                "Casco industrial amarillo diseñado para brindar protección de la cabeza durante actividades laborales.",
            material:
                "Polietileno de alta densidad",
            caracteristicas: [
                "Alta resistencia al impacto",
                "Diseño liviano",
                "Sistema de ajuste interno",
                "Alta visibilidad"
            ],
            cuidados: [
                "Limpiar con agua y jabón neutro",
                "No utilizar productos químicos abrasivos",
                "Guardar en un lugar seco",
                "Revisar periódicamente su estado"
            ],
            tallas: [
                "Única"
            ]
        },
        {
            id: 5,
            nombre: "Uniforme de Gastronomía",
            categoria: "Gastronomía",
            precio: 75000,
            imagen: "/assets/img/uniforme-gastronomia.png",
            descripcion:
                "Uniforme de gastronomía diseñado para ofrecer comodidad, presentación profesional y facilidad de movimiento.",
            material:
                "Poliéster y algodón de fácil mantenimiento",
            caracteristicas: [
                "Diseño profesional",
                "Fácil mantenimiento",
                "Cómodo para jornadas prolongadas",
                "Tela resistente"
            ],
            cuidados: [
                "Lavar a máquina máximo a 40°C",
                "No utilizar blanqueador",
                "Planchar a temperatura media",
                "No lavar en seco"
            ],
            tallas: [
                "XS",
                "S",
                "M",
                "L",
                "XL",
                "XXL"
            ]
        },
        {
            id: 6,
            nombre: "Buzo Negro",
            categoria: "Dotación",
            precio: 65000,
            imagen: "/assets/img/buzo-negro.png",
            descripcion:
                "Buzo negro de uso corporativo, ideal para complementar diferentes tipos de dotación empresarial.",
            material:
                "Algodón y poliéster",
            caracteristicas: [
                "Diseño corporativo",
                "Cómodo y resistente",
                "Fácil mantenimiento",
                "Uso empresarial"
            ],
            cuidados: [
                "Lavar a máquina máximo a 40°C",
                "No utilizar blanqueador",
                "Planchar a temperatura media",
                "No lavar en seco"
            ],
            tallas: [
                "S",
                "M",
                "L",
                "XL",
                "XXL"
            ]
        },
        {
            id: 7,
            nombre: "Uniforme de Sistemas",
            categoria: "Administrativo",
            precio: 80000,
            imagen: "/assets/img/uniforme-sistemas.png",
            descripcion:
                "Uniforme de sistemas con diseño corporativo pensado para ambientes administrativos y tecnológicos.",
            material:
                "Algodón y poliéster",
            caracteristicas: [
                "Diseño corporativo",
                "Tela cómoda",
                "Fácil mantenimiento",
                "Ideal para ambientes administrativos"
            ],
            cuidados: [
                "Lavar a máquina máximo a 40°C",
                "No utilizar blanqueador",
                "Planchar a temperatura media",
                "No lavar en seco"
            ],
            tallas: [
                "S",
                "M",
                "L",
                "XL",
                "XXL"
            ]
        },
        {
            id: 8,
            nombre: "Gafas de Protección",
            categoria: "Seguridad",
            precio: 25000,
            imagen: "/assets/img/gafas-proteccion.png",
            descripcion:
                "Gafas de protección diseñadas para proteger los ojos durante actividades laborales que puedan generar partículas o residuos.",
            material:
                "Policarbonato resistente",
            caracteristicas: [
                "Protección ocular",
                "Diseño liviano",
                "Lentes resistentes",
                "Cómodas para uso prolongado"
            ],
            cuidados: [
                "Limpiar con paño suave",
                "No utilizar productos abrasivos",
                "Guardar en un estuche o lugar protegido",
                "Evitar rayar los lentes"
            ],
            tallas: [
                "Única"
            ]
        }
    ];

    useEffect(() => {
        if (!usuario) {
            return;
        }

        const carritoGuardado =
            JSON.parse(
                localStorage.getItem("carrito")
            ) || [];

        setCarrito(carritoGuardado);
    }, [usuario]);

    function agregarCarrito(producto, cantidad = 1) {
        const carritoActual =
            JSON.parse(
                localStorage.getItem("carrito")
            ) || [];

        const productoExistente =
            carritoActual.find(
                item =>
                    Number(item.producto?.id) ===
                    Number(producto.id)
            );

        let nuevoCarrito;

        if (productoExistente) {
            nuevoCarrito =
                carritoActual.map(item =>
                    Number(item.producto?.id) ===
                    Number(producto.id)
                        ? {
                              ...item,
                              cantidad:
                                  (item.cantidad || 1) +
                                  cantidad
                          }
                        : item
                );
        } else {
            nuevoCarrito = [
                ...carritoActual,
                {
                    producto,
                    cantidad
                }
            ];
        }

        localStorage.setItem(
            "carrito",
            JSON.stringify(nuevoCarrito)
        );

        setCarrito(nuevoCarrito);
        setProductoAgregado(producto.id);

        setTimeout(() => {
            setProductoAgregado(null);
        }, 1800);
    }

    function abrirDetalle(producto) {
        setDetalleProducto(producto);
        setCantidadDetalle(1);
    }

    function cerrarDetalle() {
        setDetalleProducto(null);
        setCantidadDetalle(1);
    }

    function agregarDesdeDetalle() {
        if (!detalleProducto) {
            return;
        }

        agregarCarrito(
            detalleProducto,
            cantidadDetalle
        );

        cerrarDetalle();
    }

    const categorias = [
        "Todos",
        ...new Set(
            productos.map(
                producto => producto.categoria
            )
        )
    ];

    const productosFiltrados =
        productos.filter(producto => {
            const textoBusqueda =
                busqueda.toLowerCase();

            const coincideBusqueda =
                producto.nombre
                    .toLowerCase()
                    .includes(textoBusqueda) ||
                producto.categoria
                    .toLowerCase()
                    .includes(textoBusqueda);

            const coincideCategoria =
                categoria === "Todos" ||
                producto.categoria === categoria;

            return (
                coincideBusqueda &&
                coincideCategoria
            );
        });

    const cantidadCarrito =
        carrito.reduce(
            (total, item) =>
                total + (item.cantidad || 1),
            0
        );

    const nombreCliente =
        usuario?.user_metadata?.nombre ||
        usuario?.email?.split("@")[0] ||
        "Cliente";

    return (
        <div className="client-page page-animated">

            <header className="client-navbar animate-slide-down">

                <div className="client-brand">

                    <img
                        src="/assets/img/image-2.png"
                        alt="Dotaciones Fortuna IJ"
                        className="logo-animated"
                    />

                    <div>
                        <strong>
                            Dotaciones Fortuna IJ
                        </strong>

                        <span>
                            Portal del cliente
                        </span>
                    </div>

                </div>

                <nav className="client-menu">

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
                        className="client-menu-link active nav-item-animated"
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
                        className="client-menu-link nav-item-animated"
                        onClick={() =>
                            navigate("/pqrs")
                        }
                    >
                        <i className="bi bi-chat-left-text"></i>
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

                </nav>

                <div className="client-actions">

                    <button
                        className="client-cart icon-animated"
                        onClick={() =>
                            navigate("/carrito")
                        }
                    >
                        <i className="bi bi-cart3"></i>

                        {cantidadCarrito > 0 && (
                            <span className="cart-badge-animated">
                                {cantidadCarrito}
                            </span>
                        )}

                    </button>

                    <div className="client-user">

                        <div className="client-avatar animate-pulse-soft">
                            {nombreCliente
                                .charAt(0)
                                .toUpperCase()}
                        </div>

                        <div className="client-user-info">

                            <strong>
                                {nombreCliente}
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

            </header>

            <main className="client-dashboard">

                <section className="client-welcome">

                    <div className="welcome-content animate-slide-left">

                        <span className="welcome-label">
                            PORTAL DEL CLIENTE
                        </span>

                        <h1>
                            Hola, {nombreCliente}
                        </h1>

                        <p>
                            Encuentra las dotaciones que tu empresa
                            necesita y administra tus pedidos desde un
                            solo lugar.
                        </p>

                        <div className="welcome-buttons">

                            <button
                                className="client-primary-btn btn-animated"
                                onClick={() =>
                                    document
                                        .getElementById(
                                            "catalogo-productos"
                                        )
                                        ?.scrollIntoView({
                                            behavior: "smooth"
                                        })
                                }
                            >
                                <i className="bi bi-shop"></i>
                                Ver catálogo
                            </button>

                            <button
                                className="client-secondary-btn btn-animated"
                                onClick={() =>
                                    navigate("/pedidos")
                                }
                            >
                                <i className="bi bi-box-seam"></i>
                                Mis pedidos
                            </button>

                        </div>

                    </div>

                    <div className="welcome-decoration animate-float">
                        <i className="bi bi-box-seam"></i>
                    </div>

                </section>

                <section className="client-summary stagger">

                    <div className="client-summary-card card-animated">

                        <div className="summary-icon icon-animated">
                            <i className="bi bi-grid-3x3-gap"></i>
                        </div>

                        <div>

                            <span>
                                Productos disponibles
                            </span>

                            <strong>
                                {productos.length}
                            </strong>

                        </div>

                    </div>

                    <div className="client-summary-card card-animated">

                        <div className="summary-icon icon-animated">
                            <i className="bi bi-cart3"></i>
                        </div>

                        <div>

                            <span>
                                Productos en carrito
                            </span>

                            <strong>
                                {cantidadCarrito}
                            </strong>

                        </div>

                    </div>

                    <div className="client-summary-card card-animated">

                        <div className="summary-icon icon-animated">
                            <i className="bi bi-tags"></i>
                        </div>

                        <div>

                            <span>
                                Categorías
                            </span>

                            <strong>
                                {categorias.length - 1}
                            </strong>

                        </div>

                    </div>

                    <div className="client-summary-card card-animated">

                        <div className="summary-icon icon-animated">
                            <i className="bi bi-headset"></i>
                        </div>

                        <div>

                            <span>
                                Atención
                            </span>

                            <strong>
                                PQRS
                            </strong>

                        </div>

                    </div>

                </section>

                <section
                    className="client-products-section"
                    id="catalogo-productos"
                >

                    <div className="client-section-header animate-slide-up">

                        <div>

                            <span className="section-kicker">
                                NUESTRA TIENDA
                            </span>

                            <h2>
                                Productos destacados
                            </h2>

                            <p>
                                Explora nuestras dotaciones para
                                empresas.
                            </p>

                        </div>

                        <button
                            className="view-all-btn btn-animated"
                            onClick={() => {
                                setCategoria("Todos");
                                setBusqueda("");
                            }}
                        >
                            Ver todos
                            <i className="bi bi-arrow-right"></i>
                        </button>

                    </div>

                    <div className="client-filters animate-slide-up">

                        <div className="client-search input-animated">

                            <i className="bi bi-search"></i>

                            <input
                                type="text"
                                placeholder="Buscar producto..."
                                value={busqueda}
                                onChange={e =>
                                    setBusqueda(
                                        e.target.value
                                    )
                                }
                            />

                        </div>

                        <div className="client-categories">

                            {categorias.map(cat => (

                                <button
                                    key={cat}
                                    className={
                                        categoria === cat
                                            ? "category-btn active nav-item-animated"
                                            : "category-btn nav-item-animated"
                                    }
                                    onClick={() =>
                                        setCategoria(cat)
                                    }
                                >
                                    {cat}
                                </button>

                            ))}

                        </div>

                    </div>

                    <div className="client-products-grid stagger">

                        {productosFiltrados.map(
                            producto => (

                                <article
                                    className="client-product-card card-animated product-card-animated"
                                    key={producto.id}
                                >

                                    <div
                                        className="client-product-image image-hover"
                                        onClick={() =>
                                            abrirDetalle(
                                                producto
                                            )
                                        }
                                        style={{
                                            cursor: "pointer"
                                        }}
                                    >

                                        <span className="product-category">
                                            {producto.categoria}
                                        </span>

                                        <img
                                            src={
                                                producto.imagen
                                            }
                                            alt={
                                                producto.nombre
                                            }
                                        />

                                        <div className="product-detail-overlay">
                                            <i className="bi bi-eye"></i>
                                            Ver detalle
                                        </div>

                                    </div>

                                    <div className="client-product-content">

                                        <h3>
                                            {producto.nombre}
                                        </h3>

                                        <p>
                                            {producto.descripcion}
                                        </p>

                                        <button
                                            className="product-view-detail btn-animated"
                                            onClick={() =>
                                                abrirDetalle(
                                                    producto
                                                )
                                            }
                                        >
                                            Ver descripción
                                        </button>

                                        <div className="client-product-bottom">

                                            <div>

                                                <small>
                                                    Desde
                                                </small>

                                                <strong>
                                                    $
                                                    {producto.precio.toLocaleString(
                                                        "es-CO"
                                                    )}
                                                </strong>

                                            </div>

                                            <button
                                                className={
                                                    productoAgregado ===
                                                    producto.id
                                                        ? "add-cart-btn added btn-animated"
                                                        : "add-cart-btn btn-animated"
                                                }
                                                onClick={() =>
                                                    agregarCarrito(
                                                        producto
                                                    )
                                                }
                                            >
                                                <i
                                                    className={
                                                        productoAgregado ===
                                                        producto.id
                                                            ? "bi bi-check-lg"
                                                            : "bi bi-cart-plus"
                                                    }
                                                ></i>
                                            </button>

                                        </div>

                                    </div>

                                </article>

                            )
                        )}

                    </div>

                    {productosFiltrados.length === 0 && (

                        <div className="client-no-results animate-scale-in">

                            <i className="bi bi-search"></i>

                            <h3>
                                No encontramos productos
                            </h3>

                            <p>
                                Intenta cambiar la búsqueda o
                                seleccionar otra categoría.
                            </p>

                        </div>

                    )}

                </section>

                <section className="client-help-section card-animated">

                    <div className="help-icon icon-animated">
                        <i className="bi bi-headset"></i>
                    </div>

                    <div className="help-content">

                        <span>
                            ¿Necesitas ayuda?
                        </span>

                        <h3>
                            Estamos aquí para ayudarte
                        </h3>

                        <p>
                            Envía una PQRS y nuestro equipo
                            revisará tu solicitud.
                        </p>

                    </div>

                    <button
                        className="btn-animated"
                        onClick={() =>
                            navigate("/pqrs")
                        }
                    >
                        Crear PQRS
                        <i className="bi bi-arrow-right"></i>
                    </button>

                </section>

            </main>

            <footer className="client-footer animate-fade-in">

                <div>

                    <strong>
                        Dotaciones Fortuna IJ
                    </strong>

                    <span>
                        Vestimos tu trabajo, impulsamos tu empresa.
                    </span>

                </div>

                <span>
                    © 2026 Dotaciones Fortuna IJ
                </span>

            </footer>

            {detalleProducto && (

                <div
                    className="product-detail-modal-overlay animate-fade-in"
                    onClick={cerrarDetalle}
                >

                    <div
                        className="product-detail-modal animate-scale-in"
                        onClick={e =>
                            e.stopPropagation()
                        }
                    >

                        <button
                            className="product-detail-close icon-animated"
                            onClick={cerrarDetalle}
                        >
                            <i className="bi bi-x-lg"></i>
                        </button>

                        <div className="product-detail-image">

                            <img
                                src={
                                    detalleProducto.imagen
                                }
                                alt={
                                    detalleProducto.nombre
                                }
                                className="image-hover"
                            />

                        </div>

                        <div className="product-detail-content">

                            <span className="product-detail-category">
                                {detalleProducto.categoria}
                            </span>

                            <h2>
                                {detalleProducto.nombre}
                            </h2>

                            <div className="product-detail-price">
                                $
                                {detalleProducto.precio.toLocaleString(
                                    "es-CO"
                                )}
                            </div>

                            <p className="product-detail-description">
                                {detalleProducto.descripcion}
                            </p>

                            <div className="product-detail-info">

                                <div>

                                    <strong>
                                        Material
                                    </strong>

                                    <span>
                                        {detalleProducto.material}
                                    </span>

                                </div>

                                <div>

                                    <strong>
                                        Tallas disponibles
                                    </strong>

                                    <div className="product-sizes">

                                        {detalleProducto.tallas.map(
                                            talla => (
                                                <span
                                                    key={talla}
                                                >
                                                    {talla}
                                                </span>
                                            )
                                        )}

                                    </div>

                                </div>

                                <div>

                                    <strong>
                                        Características
                                    </strong>

                                    <ul>

                                        {detalleProducto.caracteristicas.map(
                                            caracteristica => (
                                                <li
                                                    key={
                                                        caracteristica
                                                    }
                                                >
                                                    {caracteristica}
                                                </li>
                                            )
                                        )}

                                    </ul>

                                </div>

                                <div>

                                    <strong>
                                        Cuidados
                                    </strong>

                                    <ul>

                                        {detalleProducto.cuidados.map(
                                            cuidado => (
                                                <li
                                                    key={cuidado}
                                                >
                                                    {cuidado}
                                                </li>
                                            )
                                        )}

                                    </ul>

                                </div>

                                <div className="product-detail-extra">

                                    <div>

                                        <strong>
                                            Origen
                                        </strong>

                                        <span>
                                            Colombia —
                                            Fabricación
                                            nacional
                                        </span>

                                    </div>

                                    <div>

                                        <strong>
                                            Garantía
                                        </strong>

                                        <span>
                                            3 meses por defectos
                                            de fabricación
                                        </span>

                                    </div>

                                </div>

                            </div>

                            <div className="product-detail-actions">

                                <div className="quantity-control">

                                    <button
                                        className="btn-animated"
                                        onClick={() =>
                                            setCantidadDetalle(
                                                cantidadDetalle >
                                                    1
                                                    ? cantidadDetalle - 1
                                                    : 1
                                            )
                                        }
                                    >
                                        <i className="bi bi-dash"></i>
                                    </button>

                                    <span>
                                        {cantidadDetalle}
                                    </span>

                                    <button
                                        className="btn-animated"
                                        onClick={() =>
                                            setCantidadDetalle(
                                                cantidadDetalle +
                                                    1
                                            )
                                        }
                                    >
                                        <i className="bi bi-plus"></i>
                                    </button>

                                </div>

                                <button
                                    className="product-detail-add btn-animated"
                                    onClick={
                                        agregarDesdeDetalle
                                    }
                                >
                                    <i className="bi bi-cart-plus"></i>
                                    Agregar al carrito
                                </button>

                            </div>

                        </div>

                    </div>

                </div>

            )}

        </div>
    );
}

export default Catalogo;