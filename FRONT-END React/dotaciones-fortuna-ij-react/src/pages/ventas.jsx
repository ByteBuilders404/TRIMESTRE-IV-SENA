import { Link, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "../services/supabase";

const obtenerEstado = (pedido) => {
    return pedido?.estado || pedido?.status || pedido?.estadoPedido || "Recibido";
};

const obtenerCliente = (pedido) => {
    const cliente = pedido?.cliente;

    if (typeof cliente === "string") {
        return cliente;
    }

    if (cliente && typeof cliente === "object") {
        return (
            cliente.nombre ||
            cliente.name ||
            cliente.email ||
            cliente.correo ||
            "Cliente"
        );
    }

    return (
        pedido?.nombreCliente ||
        pedido?.nombre ||
        pedido?.usuario ||
        pedido?.email ||
        "Cliente"
    );
};

const obtenerProductos = (pedido) => {
    const productos =
        pedido?.productos ||
        pedido?.items ||
        pedido?.carrito ||
        [];

    if (Array.isArray(productos)) {
        return productos;
    }

    if (productos && typeof productos === "object") {
        return [productos];
    }

    return [];
};

const obtenerNombreProducto = (producto) => {
    if (typeof producto === "string") {
        return producto;
    }

    if (!producto || typeof producto !== "object") {
        return "Producto";
    }

    if (typeof producto.nombre === "string") {
        return producto.nombre;
    }

    if (typeof producto.name === "string") {
        return producto.name;
    }

    if (typeof producto.producto === "string") {
        return producto.producto;
    }

    if (
        producto.producto &&
        typeof producto.producto === "object"
    ) {
        return (
            producto.producto.nombre ||
            producto.producto.name ||
            "Producto"
        );
    }

    return "Producto";
};

const obtenerCantidadProducto = (producto) => {
    if (!producto || typeof producto !== "object") {
        return 1;
    }

    const cantidad =
        producto.cantidad ??
        producto.quantity ??
        producto.qty ??
        1;

    const numero = Number(cantidad);

    return Number.isFinite(numero) && numero > 0
        ? numero
        : 1;
};

const obtenerCantidad = (pedido) => {
    const productos = obtenerProductos(pedido);

    if (productos.length === 0) {
        const cantidad = Number(pedido?.cantidad || 0);

        return Number.isFinite(cantidad)
            ? cantidad
            : 0;
    }

    return productos.reduce(
        (total, producto) =>
            total + obtenerCantidadProducto(producto),
        0
    );
};

const obtenerPrecioProducto = (producto) => {
    if (!producto || typeof producto !== "object") {
        return 0;
    }

    if (
        producto.producto &&
        typeof producto.producto === "object"
    ) {
        return Number(
            producto.precio ??
            producto.producto.precio ??
            producto.producto.price ??
            0
        );
    }

    return Number(
        producto.precio ??
        producto.price ??
        producto.valor ??
        0
    );
};

const obtenerTotal = (pedido) => {
    const totalDirecto =
        pedido?.total ??
        pedido?.totalPedido ??
        pedido?.monto;

    if (
        totalDirecto !== undefined &&
        totalDirecto !== null &&
        totalDirecto !== ""
    ) {
        const total = Number(totalDirecto);

        if (Number.isFinite(total)) {
            return total;
        }
    }

    const productos = obtenerProductos(pedido);

    return productos.reduce((total, producto) => {
        const precio = obtenerPrecioProducto(producto);
        const cantidad = obtenerCantidadProducto(producto);

        return total + precio * cantidad;
    }, 0);
};

const obtenerFecha = (pedido) => {
    return (
        pedido?.fecha ||
        pedido?.created_at ||
        pedido?.createdAt ||
        pedido?.fechaPedido ||
        ""
    );
};

const obtenerId = (pedido, index) => {
    const id =
        pedido?.id ||
        pedido?.idPedido ||
        pedido?.numeroPedido;

    if (
        typeof id === "string" ||
        typeof id === "number"
    ) {
        return id;
    }

    return `V-${String(index + 1).padStart(3, "0")}`;
};

const formatearMoneda = (valor) => {
    return new Intl.NumberFormat("es-CO", {
        style: "currency",
        currency: "COP",
        maximumFractionDigits: 0
    }).format(Number(valor) || 0);
};

const formatearFecha = (fecha) => {
    if (!fecha) {
        return "Sin fecha";
    }

    const fechaObj = new Date(fecha);

    if (Number.isNaN(fechaObj.getTime())) {
        return String(fecha);
    }

    return fechaObj.toLocaleDateString("es-CO");
};

const obtenerFechaFiltro = (fecha) => {
    if (!fecha) {
        return "";
    }

    const fechaObj = new Date(fecha);

    if (Number.isNaN(fechaObj.getTime())) {
        return "";
    }

    const year = fechaObj.getFullYear();
    const month = String(
        fechaObj.getMonth() + 1
    ).padStart(2, "0");
    const day = String(
        fechaObj.getDate()
    ).padStart(2, "0");

    return `${year}-${month}-${day}`;
};

const obtenerClaseEstado = (estado) => {
    switch (estado) {
        case "Entregado":
            return "bg-success";

        case "Enviado":
            return "bg-info text-dark";

        case "Preparado":
            return "bg-primary";

        case "Fabricando":
            return "bg-warning text-dark";

        case "Revisado":
            return "bg-secondary";

        case "Recibido":
        default:
            return "bg-dark";
    }
};

const obtenerCategoriaVenta = (estado) => {
    if (estado === "Entregado") {
        return "Completada";
    }

    if (
        estado === "Fabricando" ||
        estado === "Preparado" ||
        estado === "Enviado"
    ) {
        return "En proceso";
    }

    return "Pendiente";
};

function Ventas() {
    const navigate = useNavigate();

    const [usuario, setUsuario] = useState(null);
    const [pedidos, setPedidos] = useState([]);
    const [busqueda, setBusqueda] = useState("");
    const [filtroEstado, setFiltroEstado] = useState("");
    const [filtroFecha, setFiltroFecha] = useState("");

    useEffect(() => {
        let activo = true;

        const cargarDatos = async () => {
            const {
                data: { user }
            } = await supabase.auth.getUser();

            if (!activo) {
                return;
            }

            if (!user) {
                navigate("/login");
                return;
            }

            setUsuario(user);

            let pedidosGuardados = [];

            try {
                pedidosGuardados = JSON.parse(
                    localStorage.getItem("pedidos") || "[]"
                );
            } catch {
                pedidosGuardados = [];
            }

            if (!Array.isArray(pedidosGuardados)) {
                pedidosGuardados = [];
            }

            setPedidos(pedidosGuardados);
        };

        cargarDatos();

        return () => {
            activo = false;
        };
    }, [navigate]);

    const ventas = useMemo(() => {
        return pedidos.map((pedido, index) => {
            const productos = obtenerProductos(pedido);

            return {
                original: pedido,
                id: obtenerId(pedido, index),
                cliente: obtenerCliente(pedido),
                productos,
                cantidad: obtenerCantidad(pedido),
                total: obtenerTotal(pedido),
                estado: obtenerEstado(pedido),
                fecha: obtenerFecha(pedido)
            };
        });
    }, [pedidos]);

    const ventasFiltradas = useMemo(() => {
        const texto = busqueda.trim().toLowerCase();

        return ventas.filter((venta) => {
            const coincideBusqueda =
                !texto ||
                String(venta.id)
                    .toLowerCase()
                    .includes(texto) ||
                String(venta.cliente)
                    .toLowerCase()
                    .includes(texto) ||
                venta.productos.some((producto) =>
                    obtenerNombreProducto(producto)
                        .toLowerCase()
                        .includes(texto)
                );

            const coincideEstado =
                !filtroEstado ||
                obtenerCategoriaVenta(
                    venta.estado
                ) === filtroEstado;

            const coincideFecha =
                !filtroFecha ||
                obtenerFechaFiltro(venta.fecha) === filtroFecha;

            return (
                coincideBusqueda &&
                coincideEstado &&
                coincideFecha
            );
        });
    }, [
        ventas,
        busqueda,
        filtroEstado,
        filtroFecha
    ]);

    const estadisticas = useMemo(() => {
        const totalVentas = ventas.length;

        const ingresos = ventas.reduce(
            (total, venta) =>
                total + venta.total,
            0
        );

        const pendientes = ventas.filter(
            (venta) =>
                obtenerCategoriaVenta(
                    venta.estado
                ) === "Pendiente"
        ).length;

        const completadas = ventas.filter(
            (venta) =>
                venta.estado === "Entregado"
        ).length;

        const productosVendidos = ventas.reduce(
            (total, venta) =>
                total + venta.cantidad,
            0
        );

        const clientes = new Set(
            ventas.map((venta) =>
                String(
                    venta.cliente
                ).toLowerCase()
            )
        ).size;

        const ventaPromedio =
            totalVentas > 0
                ? ingresos / totalVentas
                : 0;

        return {
            totalVentas,
            ingresos,
            pendientes,
            completadas,
            productosVendidos,
            clientes,
            ventaPromedio
        };
    }, [ventas]);

    const cerrarSesion = async () => {
        await supabase.auth.signOut();
        navigate("/");
    };

    const exportarCSV = () => {
        if (ventasFiltradas.length === 0) {
            return;
        }

        const encabezados = [
            "Venta",
            "Cliente",
            "Productos",
            "Cantidad",
            "Total",
            "Estado",
            "Fecha"
        ];

        const filas = ventasFiltradas.map(
            (venta) => {
                const nombresProductos =
                    venta.productos
                        .map((producto) =>
                            obtenerNombreProducto(
                                producto
                            )
                        )
                        .join(" | ");

                return [
                    venta.id,
                    venta.cliente,
                    nombresProductos,
                    venta.cantidad,
                    venta.total,
                    venta.estado,
                    formatearFecha(
                        venta.fecha
                    )
                ];
            }
        );

        const contenido = [
            encabezados,
            ...filas
        ]
            .map((fila) =>
                fila
                    .map((valor) => {
                        const texto =
                            String(
                                valor ?? ""
                            );

                        return `"${texto.replace(
                            /"/g,
                            '""'
                        )}"`;
                    })
                    .join(",")
            )
            .join("\n");

        const blob = new Blob(
            [contenido],
            {
                type: "text/csv;charset=utf-8;"
            }
        );

        const url =
            URL.createObjectURL(blob);

        const enlace =
            document.createElement("a");

        enlace.href = url;
        enlace.download =
            "ventas-dotaciones-fortuna.csv";

        document.body.appendChild(
            enlace
        );

        enlace.click();

        document.body.removeChild(
            enlace
        );

        URL.revokeObjectURL(url);
    };

    const nombreUsuario =
        usuario?.user_metadata?.nombre ||
        usuario?.email ||
        "Administrador";

    return (
        <div className="admin-layout page-animated">

            <aside className="sidebar animate-slide-left">

                <div className="sidebar-logo logo-animated">
                    <Link to="/admin">
                        <img
                            src="/assets/img/image.png"
                            alt="Dotaciones Fortuna IJ"
                        />
                    </Link>
                </div>

                <div className="sidebar-user animate-fade-in">

                    <div className="user-icon icon-animated">
                        <i className="bi bi-person"></i>
                    </div>

                    <div>
                        <strong>
                            {nombreUsuario}
                        </strong>

                        <span>
                            Gerente General
                        </span>
                    </div>

                </div>

                <nav className="sidebar-nav">

                    <Link
                        to="/admin"
                        className="sidebar-link"
                    >
                        <i className="bi bi-grid"></i>
                        <span>Administración</span>
                    </Link>

                    <Link
                        to="/productos"
                        className="sidebar-link"
                    >
                        <i className="bi bi-box-seam"></i>
                        <span>Productos</span>
                    </Link>

                    <Link
                        to="/ventas"
                        className="sidebar-link active"
                    >
                        <i className="bi bi-cart"></i>
                        <span>Ventas</span>
                    </Link>

                    <Link
                        to="/inventario"
                        className="sidebar-link"
                    >
                        <i className="bi bi-boxes"></i>
                        <span>Inventario</span>
                    </Link>

                    <Link
                        to="/pedidos-admin"
                        className="sidebar-link"
                    >
                        <i className="bi bi-bag-check"></i>
                        <span>Pedidos</span>
                    </Link>

                    <Link
                        to="/tickets"
                        className="sidebar-link"
                    >
                        <i className="bi bi-ticket"></i>
                        <span>Tickets</span>
                    </Link>

                    <Link
                        to="/pqrs-admin"
                        className="sidebar-link"
                    >
                        <i className="bi bi-chat-left-text"></i>
                        <span>PQRS</span>
                    </Link>

                    <Link
                        to="/perfil"
                        className="sidebar-link"
                    >
                        <i className="bi bi-person-circle"></i>
                        <span>Mi perfil</span>
                    </Link>

                </nav>

                <div className="sidebar-bottom">

                    <button
                        type="button"
                        className="sidebar-link w-100 border-0 bg-transparent text-start"
                        onClick={cerrarSesion}
                    >
                        <i className="bi bi-box-arrow-right"></i>
                        <span>Cerrar sesión</span>
                    </button>

                </div>

            </aside>

            <main className="admin-content">

                <header className="admin-header animate-slide-down">

                    <div>

                        <span className="breadcrumb">
                            Inicio / Ventas
                        </span>

                        <h1>
                            Gestión de Ventas
                        </h1>

                        <p>
                            Consulta y seguimiento de las ventas realizadas
                        </p>

                    </div>

                    <div className="header-user animate-fade-in">

                        <i className="bi bi-person-circle"></i>

                        <div>

                            <strong>
                                {nombreUsuario}
                            </strong>

                            <span>
                                Administrador
                            </span>

                        </div>

                    </div>

                </header>

                <section className="stats-grid">

                    <div className="stat-card card-animated animate-slide-up delay-100">

                        <div className="stat-icon icon-animated">
                            <i className="bi bi-receipt"></i>
                        </div>

                        <div>
                            <span>Ventas totales</span>

                            <strong>
                                {estadisticas.totalVentas}
                            </strong>

                            <small>
                                Registradas
                            </small>
                        </div>

                    </div>

                    <div className="stat-card card-animated animate-slide-up delay-200">

                        <div className="stat-icon icon-animated">
                            <i className="bi bi-currency-dollar"></i>
                        </div>

                        <div>
                            <span>Ingresos</span>

                            <strong>
                                {formatearMoneda(
                                    estadisticas.ingresos
                                )}
                            </strong>

                            <small>
                                Valor acumulado
                            </small>
                        </div>

                    </div>

                    <div className="stat-card card-animated animate-slide-up delay-300">

                        <div className="stat-icon icon-animated">
                            <i className="bi bi-clock"></i>
                        </div>

                        <div>
                            <span>Pendientes</span>

                            <strong>
                                {estadisticas.pendientes}
                            </strong>

                            <small>
                                Por procesar
                            </small>
                        </div>

                    </div>

                    <div className="stat-card card-animated animate-slide-up delay-400">

                        <div className="stat-icon icon-animated">
                            <i className="bi bi-check-circle"></i>
                        </div>

                        <div>
                            <span>Completadas</span>

                            <strong>
                                {estadisticas.completadas}
                            </strong>

                            <small>
                                Ventas finalizadas
                            </small>
                        </div>

                    </div>

                </section>

                <section className="dashboard-card card-animated animate-slide-up">

                    <div className="card-header">

                        <div>
                            <h2>
                                Registro de ventas
                            </h2>

                            <p>
                                Información de las ventas realizadas
                            </p>
                        </div>

                        <button
                            type="button"
                            className="btn btn-primary btn-animated"
                            onClick={exportarCSV}
                            disabled={
                                ventasFiltradas.length === 0
                            }
                        >
                            <i className="bi bi-download me-2"></i>
                            Exportar
                        </button>

                    </div>

                    <div className="row mb-4 g-3">

                        <div className="col-md-6">

                            <div className="input-group input-animated">

                                <span className="input-group-text">
                                    <i className="bi bi-search"></i>
                                </span>

                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Buscar venta, cliente o producto..."
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

                            <select
                                className="form-select input-animated"
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

                                <option value="Pendiente">
                                    Pendiente
                                </option>

                                <option value="En proceso">
                                    En proceso
                                </option>

                                <option value="Completada">
                                    Completada
                                </option>
                            </select>

                        </div>

                        <div className="col-md-3">

                            <input
                                type="date"
                                className="form-control input-animated"
                                value={filtroFecha}
                                onChange={(e) =>
                                    setFiltroFecha(
                                        e.target.value
                                    )
                                }
                            />

                        </div>

                    </div>

                    <div className="table-responsive">

                        <table className="table align-middle">

                            <thead>
                                <tr>
                                    <th>Venta</th>
                                    <th>Cliente</th>
                                    <th>Producto</th>
                                    <th>Cantidad</th>
                                    <th>Total</th>
                                    <th>Estado</th>
                                    <th>Fecha</th>
                                </tr>
                            </thead>

                            <tbody>

                                {ventasFiltradas.length > 0 ? (
                                    ventasFiltradas.map(
                                        (venta, index) => {

                                            const nombresProductos =
                                                venta.productos.map(
                                                    (producto) =>
                                                        obtenerNombreProducto(
                                                            producto
                                                        )
                                                );

                                            let productoMostrar =
                                                "Producto";

                                            if (
                                                nombresProductos.length === 1
                                            ) {
                                                productoMostrar =
                                                    nombresProductos[0];
                                            } else if (
                                                nombresProductos.length > 1
                                            ) {
                                                productoMostrar =
                                                    `${nombresProductos[0]} + ${
                                                        nombresProductos.length - 1
                                                    } más`;
                                            }

                                            return (
                                                <tr
                                                    key={`${venta.id}-${index}`}
                                                    className="animate-fade-in"
                                                >

                                                    <td>
                                                        <strong>
                                                            #{String(
                                                                venta.id
                                                            )}
                                                        </strong>
                                                    </td>

                                                    <td>
                                                        {String(
                                                            venta.cliente
                                                        )}
                                                    </td>

                                                    <td>
                                                        {productoMostrar}
                                                    </td>

                                                    <td>
                                                        {venta.cantidad}
                                                    </td>

                                                    <td>
                                                        <strong>
                                                            {formatearMoneda(
                                                                venta.total
                                                            )}
                                                        </strong>
                                                    </td>

                                                    <td>
                                                        <span
                                                            className={`badge ${obtenerClaseEstado(
                                                                venta.estado
                                                            )}`}
                                                        >
                                                            {venta.estado}
                                                        </span>
                                                    </td>

                                                    <td>
                                                        {formatearFecha(
                                                            venta.fecha
                                                        )}
                                                    </td>

                                                </tr>
                                            );
                                        }
                                    )
                                ) : (
                                    <tr>

                                        <td
                                            colSpan="7"
                                            className="text-center py-5"
                                        >

                                            <div className="animate-scale-in">

                                                <i className="bi bi-receipt fs-1 d-block mb-3"></i>

                                                <strong className="d-block mb-2">
                                                    No hay ventas registradas
                                                </strong>

                                                <span>
                                                    Las ventas aparecerán aquí cuando
                                                    existan pedidos realizados.
                                                </span>

                                            </div>

                                        </td>

                                    </tr>
                                )}

                            </tbody>

                        </table>

                    </div>

                </section>

                <section className="dashboard-card card-animated animate-slide-up">

                    <div className="card-header">

                        <div>

                            <h2>
                                Resumen comercial
                            </h2>

                            <p>
                                Información general de las ventas
                            </p>

                        </div>

                    </div>

                    <div className="row g-3">

                        <div className="col-md-4">

                            <div className="p-3 border rounded card-animated hover-lift">

                                <span className="d-block text-muted">
                                    Venta promedio
                                </span>

                                <strong className="fs-4">
                                    {formatearMoneda(
                                        estadisticas.ventaPromedio
                                    )}
                                </strong>

                            </div>

                        </div>

                        <div className="col-md-4">

                            <div className="p-3 border rounded card-animated hover-lift">

                                <span className="d-block text-muted">
                                    Productos vendidos
                                </span>

                                <strong className="fs-4">
                                    {
                                        estadisticas.productosVendidos
                                    }
                                </strong>

                            </div>

                        </div>

                        <div className="col-md-4">

                            <div className="p-3 border rounded card-animated hover-lift">

                                <span className="d-block text-muted">
                                    Clientes
                                </span>

                                <strong className="fs-4">
                                    {estadisticas.clientes}
                                </strong>

                            </div>

                        </div>

                    </div>

                </section>

            </main>

        </div>
    );
}

export default Ventas;