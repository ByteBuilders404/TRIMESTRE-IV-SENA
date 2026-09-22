import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../services/supabase";

function Pedidos() {
    const navigate = useNavigate();
    const { usuario, cerrarSesion } = useAuth();

    const [pedidos, setPedidos] = useState([]);
    const [filtro, setFiltro] = useState("Todos");
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        if (!usuario) {
            setPedidos([]);
            setCargando(false);
            return;
        }

        cargarPedidos();
    }, [usuario]);

    async function cargarPedidos() {
        setCargando(true);

        const { data, error } = await supabase
            .from("pedidos")
            .select("*")
            .eq("usuario_id", usuario.id)
            .order("fecha", {
                ascending: false
            });

        if (error) {
            console.error(
                "Error al cargar los pedidos:",
                error
            );

            setPedidos([]);
            setCargando(false);
            return;
        }

        const pedidosFormateados = (data || []).map(
            (pedido) => ({
                ...pedido,

                fecha: pedido.fecha,

                cliente:
                    pedido.cliente_nombre ||
                    usuario.user_metadata?.nombre ||
                    usuario.email?.split("@")[0] ||
                    "Cliente",

                email:
                    pedido.cliente_email ||
                    usuario.email,

                cantidadProductos:
                    pedido.cantidad_productos || 0,

                productos:
                    Array.isArray(pedido.productos)
                        ? pedido.productos
                        : [],

                total:
                    Number(pedido.total || 0),

                estado:
                    pedido.estado || "Recibido"
            })
        );

        setPedidos(pedidosFormateados);
        setCargando(false);
    }

    const nombreCliente =
        usuario?.user_metadata?.nombre ||
        usuario?.email?.split("@")[0] ||
        "Cliente";

    const pedidosFiltrados =
        filtro === "Todos"
            ? pedidos
            : pedidos.filter(
                  (pedido) =>
                      pedido.estado === filtro
              );

    const totalPedidos = pedidos.length;

    const pedidosActivos = pedidos.filter(
        (pedido) =>
            pedido.estado !== "Entregado"
    ).length;

    const pedidosEntregados = pedidos.filter(
        (pedido) =>
            pedido.estado === "Entregado"
    ).length;

    function obtenerClaseEstado(estado) {
        switch (estado) {
            case "Recibido":
                return "status-recibido";

            case "Revisado":
                return "status-revisado";

            case "Fabricando":
                return "status-fabricando";

            case "Preparado":
                return "status-preparado";

            case "Enviado":
                return "status-enviado";

            case "Entregado":
                return "status-entregado";

            default:
                return "status-recibido";
        }
    }

    function obtenerIconoEstado(estado) {
        switch (estado) {
            case "Recibido":
                return "bi-inbox";

            case "Revisado":
                return "bi-search";

            case "Fabricando":
                return "bi-gear";

            case "Preparado":
                return "bi-box-seam";

            case "Enviado":
                return "bi-truck";

            case "Entregado":
                return "bi-check-circle";

            default:
                return "bi-box";
        }
    }

    function obtenerPasoEstado(estado) {
        const estados = [
            "Recibido",
            "Revisado",
            "Fabricando",
            "Preparado",
            "Enviado",
            "Entregado"
        ];

        const posicion =
            estados.indexOf(estado);

        return posicion === -1
            ? 0
            : posicion;
    }

    function formatearFecha(fecha) {
        if (!fecha) {
            return "Fecha no disponible";
        }

        const fechaFormateada =
            new Date(fecha);

        if (
            Number.isNaN(
                fechaFormateada.getTime()
            )
        ) {
            return fecha;
        }

        return fechaFormateada.toLocaleDateString(
            "es-CO",
            {
                day: "2-digit",
                month: "long",
                year: "numeric"
            }
        );
    }

    function obtenerProductosPedido(pedido) {
        return Array.isArray(pedido.productos)
            ? pedido.productos
            : [];
    }

    function obtenerNombreProducto(item) {
        return (
            item?.producto?.nombre ||
            item?.nombre ||
            "Producto"
        );
    }

    function obtenerImagenProducto(item) {
        return (
            item?.producto?.imagen ||
            item?.imagen ||
            "/assets/img/image.png"
        );
    }

    function obtenerCategoriaProducto(item) {
        return (
            item?.producto?.categoria ||
            item?.categoria ||
            "Producto"
        );
    }

    function obtenerPrecioProducto(item) {
        return Number(
            item?.producto?.precio ||
            item?.precio ||
            0
        );
    }

    function obtenerCantidadProducto(item) {
        return Number(
            item?.cantidad || 1
        );
    }

    function obtenerSubtotalProducto(item) {
        return (
            obtenerPrecioProducto(item) *
            obtenerCantidadProducto(item)
        );
    }

    return (
        <div className="client-page page-animated">

            <header className="client-navbar animate-slide-down">

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
                        className="client-menu-link nav-item-animated"
                        onClick={() =>
                            navigate("/catalogo")
                        }
                    >
                        <i className="bi bi-shop"></i>
                        Catálogo
                    </button>

                    <button
                        className="client-menu-link active nav-item-animated"
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

                <section className="orders-header animate-slide-up">

                    <div>

                        <span className="section-kicker">
                            SEGUIMIENTO
                        </span>

                        <h1>
                            Mis pedidos
                        </h1>

                        <p>
                            Consulta el estado y los
                            detalles de tus pedidos.
                        </p>

                    </div>

                    <button
                        className="client-primary-btn btn-animated"
                        onClick={() =>
                            navigate("/catalogo")
                        }
                    >
                        <i className="bi bi-plus-lg"></i>
                        Nuevo pedido
                    </button>

                </section>

                <section className="client-summary stagger">

                    <div className="client-summary-card card-animated">

                        <div className="summary-icon icon-animated">
                            <i className="bi bi-box-seam"></i>
                        </div>

                        <div>

                            <span>
                                Total pedidos
                            </span>

                            <strong>
                                {totalPedidos}
                            </strong>

                        </div>

                    </div>

                    <div className="client-summary-card card-animated">

                        <div className="summary-icon icon-animated">
                            <i className="bi bi-arrow-repeat"></i>
                        </div>

                        <div>

                            <span>
                                En proceso
                            </span>

                            <strong>
                                {pedidosActivos}
                            </strong>

                        </div>

                    </div>

                    <div className="client-summary-card card-animated">

                        <div className="summary-icon icon-animated">
                            <i className="bi bi-check-circle"></i>
                        </div>

                        <div>

                            <span>
                                Entregados
                            </span>

                            <strong>
                                {pedidosEntregados}
                            </strong>

                        </div>

                    </div>

                    <div className="client-summary-card card-animated">

                        <div className="summary-icon icon-animated">
                            <i className="bi bi-clock-history"></i>
                        </div>

                        <div>

                            <span>
                                Último pedido
                            </span>

                            <strong>
                                {pedidos.length > 0
                                    ? `#${pedidos[0].id}`
                                    : "—"}
                            </strong>

                        </div>

                    </div>

                </section>

                <section className="orders-panel animate-fade-in">

                    <div className="orders-panel-header">

                        <div className="animate-slide-left">

                            <h2>
                                Historial de pedidos
                            </h2>

                            <p>
                                Revisa todos los pedidos
                                realizados desde tu cuenta.
                            </p>

                        </div>

                        <div className="orders-filters animate-slide-right">

                            {[
                                "Todos",
                                "Recibido",
                                "Revisado",
                                "Fabricando",
                                "Preparado",
                                "Enviado",
                                "Entregado"
                            ].map((estado) => (

                                <button
                                    key={estado}
                                    className={
                                        filtro === estado
                                            ? "order-filter active"
                                            : "order-filter"
                                    }
                                    onClick={() =>
                                        setFiltro(estado)
                                    }
                                >
                                    {estado}
                                </button>

                            ))}

                        </div>

                    </div>

                    {cargando ? (

                        <div className="orders-empty animate-scale-in">

                            <div className="orders-empty-icon icon-animated">
                                <i className="bi bi-arrow-repeat"></i>
                            </div>

                            <h3>
                                Cargando pedidos
                            </h3>

                            <p>
                                Estamos consultando tus
                                pedidos registrados.
                            </p>

                        </div>

                    ) : pedidosFiltrados.length === 0 ? (

                        <div className="orders-empty animate-scale-in">

                            <div className="orders-empty-icon icon-animated">
                                <i className="bi bi-box-seam"></i>
                            </div>

                            <h3>
                                No tienes pedidos todavía
                            </h3>

                            <p>
                                Cuando realices una compra,
                                podrás consultar aquí todo
                                su seguimiento.
                            </p>

                            <button
                                className="client-primary-btn btn-animated"
                                onClick={() =>
                                    navigate("/catalogo")
                                }
                            >
                                <i className="bi bi-shop"></i>
                                Explorar catálogo
                            </button>

                        </div>

                    ) : (

                        <div className="orders-list stagger">

                            {pedidosFiltrados.map(
                                (pedido) => {

                                    const pasoActual =
                                        obtenerPasoEstado(
                                            pedido.estado
                                        );

                                    const productos =
                                        obtenerProductosPedido(
                                            pedido
                                        );

                                    return (

                                        <article
                                            className="order-card card-animated"
                                            key={pedido.id}
                                        >

                                            <div className="order-card-top">

                                                <div className="order-identification">

                                                    <div className="order-icon icon-animated">
                                                        <i className="bi bi-box-seam"></i>
                                                    </div>

                                                    <div>

                                                        <span>
                                                            Pedido
                                                        </span>

                                                        <h3>
                                                            #{pedido.id}
                                                        </h3>

                                                        <small>
                                                            {formatearFecha(
                                                                pedido.fecha
                                                            )}
                                                        </small>

                                                    </div>

                                                </div>

                                                <div
                                                    className={`order-status ${obtenerClaseEstado(
                                                        pedido.estado
                                                    )}`}
                                                >

                                                    <i
                                                        className={`bi ${obtenerIconoEstado(
                                                            pedido.estado
                                                        )}`}
                                                    ></i>

                                                    {pedido.estado}

                                                </div>

                                            </div>

                                            <div className="order-info-grid">

                                                <div>

                                                    <span>
                                                        Productos
                                                    </span>

                                                    <strong>
                                                        {
                                                            pedido.cantidadProductos ||
                                                            productos.reduce(
                                                                (
                                                                    total,
                                                                    item
                                                                ) =>
                                                                    total +
                                                                    obtenerCantidadProducto(
                                                                        item
                                                                    ),
                                                                0
                                                            )
                                                        }
                                                    </strong>

                                                </div>

                                                <div>

                                                    <span>
                                                        Total
                                                    </span>

                                                    <strong>
                                                        $
                                                        {Number(
                                                            pedido.total ||
                                                            0
                                                        ).toLocaleString(
                                                            "es-CO"
                                                        )}
                                                    </strong>

                                                </div>

                                                <div>

                                                    <span>
                                                        Cliente
                                                    </span>

                                                    <strong>
                                                        {
                                                            pedido.cliente ||
                                                            nombreCliente
                                                        }
                                                    </strong>

                                                </div>

                                            </div>

                                            <div className="order-progress">

                                                {[
                                                    "Recibido",
                                                    "Revisado",
                                                    "Fabricando",
                                                    "Preparado",
                                                    "Enviado",
                                                    "Entregado"
                                                ].map(
                                                    (
                                                        estado,
                                                        index
                                                    ) => (

                                                        <div
                                                            className={
                                                                index <=
                                                                pasoActual
                                                                    ? "progress-step completed"
                                                                    : "progress-step"
                                                            }
                                                            key={estado}
                                                        >

                                                            <div className="progress-dot">

                                                                {index <=
                                                                pasoActual ? (
                                                                    <i className="bi bi-check"></i>
                                                                ) : (
                                                                    index +
                                                                    1
                                                                )}

                                                            </div>

                                                            <span>
                                                                {estado}
                                                            </span>

                                                        </div>

                                                    )
                                                )}

                                            </div>

                                            <div className="order-products">

                                                <span className="order-products-title">
                                                    Productos del pedido
                                                </span>

                                                <div className="order-product-list">

                                                    {productos.map(
                                                        (
                                                            item,
                                                            index
                                                        ) => (

                                                            <div
                                                                className="order-product"
                                                                key={
                                                                    item?.producto
                                                                        ?.id ||
                                                                    item?.id ||
                                                                    index
                                                                }
                                                            >

                                                                <img
                                                                    src={obtenerImagenProducto(
                                                                        item
                                                                    )}
                                                                    alt={obtenerNombreProducto(
                                                                        item
                                                                    )}
                                                                    className="image-hover"
                                                                />

                                                                <div>

                                                                    <span>
                                                                        {obtenerCategoriaProducto(
                                                                            item
                                                                        )}
                                                                    </span>

                                                                    <strong>
                                                                        {obtenerNombreProducto(
                                                                            item
                                                                        )}
                                                                    </strong>

                                                                    <small>
                                                                        Cantidad:{" "}
                                                                        {obtenerCantidadProducto(
                                                                            item
                                                                        )}
                                                                    </small>

                                                                    <small>
                                                                        Precio
                                                                        unitario:{" "}
                                                                        $
                                                                        {obtenerPrecioProducto(
                                                                            item
                                                                        ).toLocaleString(
                                                                            "es-CO"
                                                                        )}
                                                                    </small>

                                                                    <small>
                                                                        Subtotal:{" "}
                                                                        $
                                                                        {obtenerSubtotalProducto(
                                                                            item
                                                                        ).toLocaleString(
                                                                            "es-CO"
                                                                        )}
                                                                    </small>

                                                                </div>

                                                            </div>

                                                        )
                                                    )}

                                                </div>

                                            </div>

                                        </article>

                                    );
                                }
                            )}

                        </div>

                    )}

                </section>

            </main>

            <footer className="client-footer animate-fade-in">

                <div>

                    <strong>
                        Dotaciones Fortuna IJ
                    </strong>

                    <span>
                        Vestimos tu trabajo,
                        impulsamos tu empresa.
                    </span>

                </div>

                <span>
                    © 2026 Dotaciones Fortuna IJ
                </span>

            </footer>

        </div>
    );
}

export default Pedidos;