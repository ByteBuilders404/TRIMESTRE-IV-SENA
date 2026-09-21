import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useAuth } from "../context/AuthContext";

function Carrito() {
    const navigate = useNavigate();

    const {
        usuario,
        cerrarSesion
    } = useAuth();

    const [carrito, setCarrito] = useState([]);

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

    function actualizarCarrito(nuevoCarrito) {
        setCarrito(nuevoCarrito);

        localStorage.setItem(
            "carrito",
            JSON.stringify(nuevoCarrito)
        );
    }

    function aumentarCantidad(id) {
        const nuevoCarrito = carrito.map(
            (item) =>
                item.producto?.id === id
                    ? {
                          ...item,
                          cantidad:
                              Number(item.cantidad || 1) + 1
                      }
                    : item
        );

        actualizarCarrito(nuevoCarrito);
    }

    function disminuirCantidad(id) {
        const nuevoCarrito = carrito
            .map(
                (item) =>
                    item.producto?.id === id
                        ? {
                              ...item,
                              cantidad:
                                  Number(item.cantidad || 1) - 1
                          }
                        : item
            )
            .filter(
                (item) =>
                    Number(item.cantidad || 0) > 0
            );

        actualizarCarrito(nuevoCarrito);
    }

    async function eliminarProducto(id) {
        const productoEncontrado = carrito.find(
            (item) =>
                item.producto?.id === id
        );

        const nombreProducto =
            productoEncontrado?.producto?.nombre ||
            "este producto";

        const confirmacion = await Swal.fire({
            icon: "warning",
            title: "¿Eliminar producto?",
            text: `¿Deseas eliminar ${nombreProducto} del carrito?`,
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar",
            reverseButtons: true
        });

        if (!confirmacion.isConfirmed) {
            return;
        }

        const nuevoCarrito = carrito.filter(
            (item) =>
                item.producto?.id !== id
        );

        actualizarCarrito(nuevoCarrito);

        Swal.fire({
            icon: "success",
            title: "Producto eliminado",
            text: "El producto fue eliminado del carrito.",
            confirmButtonText: "Aceptar",
            timer: 1800,
            timerProgressBar: true
        });
    }

    async function vaciarCarrito() {
        if (carrito.length === 0) {
            return;
        }

        const confirmacion = await Swal.fire({
            icon: "warning",
            title: "¿Vaciar carrito?",
            text: "Se eliminarán todos los productos seleccionados.",
            showCancelButton: true,
            confirmButtonText: "Sí, vaciar",
            cancelButtonText: "Cancelar",
            reverseButtons: true
        });

        if (!confirmacion.isConfirmed) {
            return;
        }

        localStorage.removeItem("carrito");
        setCarrito([]);

        Swal.fire({
            icon: "success",
            title: "Carrito vacío",
            text: "Todos los productos fueron eliminados.",
            confirmButtonText: "Aceptar",
            timer: 1800,
            timerProgressBar: true
        });
    }

    async function finalizarPedido() {
        if (
            carrito.length === 0 ||
            !usuario
        ) {
            return;
        }

        const cantidadProductos =
            carrito.reduce(
                (acumulado, item) =>
                    acumulado +
                    Number(item.cantidad || 1),
                0
            );

        const subtotal =
            carrito.reduce(
                (total, item) => {
                    const producto = item.producto;

                    return (
                        total +
                        Number(producto?.precio || 0) *
                        Number(item.cantidad || 1)
                    );
                },
                0
            );

        const confirmacion = await Swal.fire({
            icon: "question",
            title: "¿Confirmar pedido?",
            html: `
                <div>
                    <p>
                        Estás a punto de realizar tu pedido.
                    </p>

                    <strong>
                        ${cantidadProductos} producto${
                            cantidadProductos !== 1
                                ? "s"
                                : ""
                        }
                    </strong>

                    <br />

                    <strong>
                        Total: $${subtotal.toLocaleString(
                            "es-CO"
                        )}
                    </strong>
                </div>
            `,
            showCancelButton: true,
            confirmButtonText: "Sí, realizar pedido",
            cancelButtonText: "Revisar carrito",
            reverseButtons: true
        });

        if (!confirmacion.isConfirmed) {
            return;
        }

        const pedidos =
            JSON.parse(
                localStorage.getItem("pedidos")
            ) || [];

        const total = carrito.reduce(
            (acumulado, item) => {
                const producto = item.producto;

                return (
                    acumulado +
                    Number(producto?.precio || 0) *
                    Number(item.cantidad || 1)
                );
            },
            0
        );

        const nuevoPedido = {
            id: `PED-${String(
                pedidos.length + 1
            ).padStart(3, "0")}`,

            fecha:
                new Date().toISOString(),

            cliente:
                usuario.user_metadata?.nombre ||
                usuario.email?.split("@")[0] ||
                "Cliente",

            email: usuario.email,

            productos: carrito,

            cantidadProductos,

            total,

            estado: "Recibido"
        };

        localStorage.setItem(
            "pedidos",
            JSON.stringify([
                ...pedidos,
                nuevoPedido
            ])
        );

        localStorage.removeItem("carrito");

        setCarrito([]);

        await Swal.fire({
            icon: "success",
            title: "Pedido confirmado",
            text: `Tu pedido ${nuevoPedido.id} fue registrado correctamente.`,
            confirmButtonText: "Ver mis pedidos"
        });

        navigate("/pedidos");
    }

    const nombreCliente =
        usuario?.user_metadata?.nombre ||
        usuario?.email?.split("@")[0] ||
        "Cliente";

    const cantidadTotal =
        carrito.reduce(
            (total, item) =>
                total +
                Number(item.cantidad || 1),
            0
        );

    const subtotal =
        carrito.reduce(
            (total, item) => {
                const producto = item.producto;

                return (
                    total +
                    Number(producto?.precio || 0) *
                    Number(item.cantidad || 1)
                );
            },
            0
        );

    const envio = subtotal > 0 ? 0 : 0;

    const total = subtotal + envio;

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
                        className="client-cart cart-active icon-animated"
                        onClick={() =>
                            navigate("/carrito")
                        }
                    >
                        <i className="bi bi-cart3"></i>

                        {cantidadTotal > 0 && (
                            <span className="cart-badge-animated">
                                {cantidadTotal}
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

                <section className="cart-page-header animate-slide-up">

                    <div>

                        <span className="section-kicker">
                            TU COMPRA
                        </span>

                        <h1>
                            Carrito de compras
                        </h1>

                        <p>
                            Revisa tus productos antes de
                            realizar el pedido.
                        </p>

                    </div>

                    {carrito.length > 0 && (

                        <button
                            className="clear-cart-btn btn-animated"
                            onClick={vaciarCarrito}
                        >
                            <i className="bi bi-trash3"></i>
                            Vaciar carrito
                        </button>

                    )}

                </section>

                {carrito.length === 0 ? (

                    <section className="cart-empty animate-scale-in">

                        <div className="cart-empty-icon animate-float">
                            <i className="bi bi-cart-x"></i>
                        </div>

                        <h2>
                            Tu carrito está vacío
                        </h2>

                        <p>
                            Explora nuestro catálogo y agrega
                            los productos que necesitas.
                        </p>

                        <button
                            className="client-primary-btn btn-animated"
                            onClick={() =>
                                navigate("/catalogo")
                            }
                        >
                            <i className="bi bi-shop"></i>
                            Ir al catálogo
                        </button>

                    </section>

                ) : (

                    <section className="cart-layout">

                        <div className="cart-products animate-slide-left">

                            <div className="cart-products-header">

                                <div>

                                    <h2>
                                        Productos seleccionados
                                    </h2>

                                    <span>
                                        {cantidadTotal} producto
                                        {cantidadTotal !== 1
                                            ? "s"
                                            : ""}
                                    </span>

                                </div>

                            </div>

                            <div className="cart-product-list stagger">

                                {carrito.map(
                                    (item) => {

                                        const producto =
                                            item.producto;

                                        const cantidad =
                                            Number(
                                                item.cantidad || 1
                                            );

                                        const precio =
                                            Number(
                                                producto?.precio || 0
                                            );

                                        return (
                                            <article
                                                className="cart-product-item card-animated"
                                                key={producto?.id}
                                            >

                                                <div className="cart-product-image image-hover">

                                                    <img
                                                        src={
                                                            producto?.imagen
                                                        }
                                                        alt={
                                                            producto?.nombre
                                                        }
                                                    />

                                                </div>

                                                <div className="cart-product-details">

                                                    <span>
                                                        {
                                                            producto?.categoria ||
                                                            "Producto"
                                                        }
                                                    </span>

                                                    <h3>
                                                        {
                                                            producto?.nombre
                                                        }
                                                    </h3>

                                                    <strong>
                                                        $
                                                        {precio.toLocaleString(
                                                            "es-CO"
                                                        )}
                                                    </strong>

                                                </div>

                                                <div className="cart-quantity">

                                                    <button
                                                        className="btn-animated"
                                                        onClick={() =>
                                                            disminuirCantidad(
                                                                producto?.id
                                                            )
                                                        }
                                                    >
                                                        <i className="bi bi-dash"></i>
                                                    </button>

                                                    <span>
                                                        {cantidad}
                                                    </span>

                                                    <button
                                                        className="btn-animated"
                                                        onClick={() =>
                                                            aumentarCantidad(
                                                                producto?.id
                                                            )
                                                        }
                                                    >
                                                        <i className="bi bi-plus"></i>
                                                    </button>

                                                </div>

                                                <div className="cart-product-total">

                                                    <span>
                                                        $
                                                        {(
                                                            precio *
                                                            cantidad
                                                        ).toLocaleString(
                                                            "es-CO"
                                                        )}
                                                    </span>

                                                    <button
                                                        className="icon-animated"
                                                        onClick={() =>
                                                            eliminarProducto(
                                                                producto?.id
                                                            )
                                                        }
                                                        title="Eliminar producto"
                                                    >
                                                        <i className="bi bi-trash3"></i>
                                                    </button>

                                                </div>

                                            </article>
                                        );
                                    }
                                )}

                            </div>

                        </div>

                        <aside className="cart-summary animate-slide-right">

                            <div className="cart-summary-header">

                                <h2>
                                    Resumen del pedido
                                </h2>

                                <i className="bi bi-receipt icon-animated"></i>

                            </div>

                            <div className="cart-summary-lines">

                                <div>

                                    <span>
                                        Productos
                                    </span>

                                    <strong>
                                        {cantidadTotal}
                                    </strong>

                                </div>

                                <div>

                                    <span>
                                        Subtotal
                                    </span>

                                    <strong>
                                        $
                                        {subtotal.toLocaleString(
                                            "es-CO"
                                        )}
                                    </strong>

                                </div>

                                <div>

                                    <span>
                                        Envío
                                    </span>

                                    <strong className="free-shipping">
                                        Gratis
                                    </strong>

                                </div>

                            </div>

                            <div className="cart-summary-total">

                                <span>
                                    Total
                                </span>

                                <strong>
                                    $
                                    {total.toLocaleString(
                                        "es-CO"
                                    )}
                                </strong>

                            </div>

                            <button
                                className="checkout-btn btn-animated"
                                onClick={finalizarPedido}
                            >
                                Realizar pedido
                                <i className="bi bi-arrow-right"></i>
                            </button>

                            <button
                                className="continue-shopping-btn btn-animated"
                                onClick={() =>
                                    navigate("/catalogo")
                                }
                            >
                                <i className="bi bi-arrow-left"></i>
                                Continuar comprando
                            </button>

                            <div className="cart-security card-animated">

                                <i className="bi bi-shield-check icon-animated"></i>

                                <div>

                                    <strong>
                                        Compra segura
                                    </strong>

                                    <span>
                                        Tus datos son tratados
                                        de forma segura.
                                    </span>

                                </div>

                            </div>

                        </aside>

                    </section>

                )}

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

export default Carrito;