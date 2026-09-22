import { Link, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "../services/supabase";

const estadosPedido = [
    "Recibido",
    "Revisado",
    "Fabricando",
    "Preparado",
    "Enviado",
    "Entregado"
];

function PedidosAdmin() {
    const navigate = useNavigate();

    const [usuario, setUsuario] = useState(null);
    const [pedidos, setPedidos] = useState([]);
    const [busqueda, setBusqueda] = useState("");
    const [estadoFiltro, setEstadoFiltro] = useState("");
    const [ordenFecha, setOrdenFecha] = useState("reciente");
    const [pedidoSeleccionado, setPedidoSeleccionado] = useState(null);
    const [actualizando, setActualizando] = useState(false);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const iniciar = async () => {
            await cargarUsuario();
            await cargarPedidos();
        };

        iniciar();
    }, []);

    const cargarUsuario = async () => {
        const { data, error } = await supabase.auth.getUser();

        if (!error) {
            setUsuario(data?.user || null);
        }
    };

    const cargarPedidos = async () => {
        setCargando(true);

        const { data, error } = await supabase
            .from("pedidos")
            .select("*")
            .order("fecha", {
                ascending: false
            });

        if (error) {
            console.error("Error al cargar pedidos:", error);
            setPedidos([]);
            setCargando(false);
            return;
        }

        setPedidos(data || []);
        setCargando(false);
    };

    const obtenerNombreUsuario = () => {
        return (
            usuario?.user_metadata?.nombre ||
            usuario?.email?.split("@")[0] ||
            "Administrador"
        );
    };

    const obtenerEstado = (pedido) => {
        const estado =
            pedido?.estado ||
            pedido?.status ||
            pedido?.estadoPedido ||
            "Recibido";

        const estadoNormalizado = String(estado)
            .trim()
            .toLowerCase();

        const encontrados = estadosPedido.find(
            (item) => item.toLowerCase() === estadoNormalizado
        );

        return encontrados || "Recibido";
    };

    const obtenerCliente = (pedido) => {
        return (
            pedido?.cliente_nombre ||
            pedido?.cliente ||
            pedido?.nombreCliente ||
            pedido?.nombre ||
            pedido?.usuario ||
            pedido?.cliente_email ||
            pedido?.email ||
            "Cliente"
        );
    };

    const obtenerEmailCliente = (pedido) => {
        return (
            pedido?.cliente_email ||
            pedido?.email ||
            "Sin correo"
        );
    };

    const obtenerProductos = (pedido) => {
        if (Array.isArray(pedido?.productos)) {
            return pedido.productos;
        }

        if (Array.isArray(pedido?.items)) {
            return pedido.items;
        }

        if (Array.isArray(pedido?.carrito)) {
            return pedido.carrito;
        }

        return [];
    };

    const obtenerCantidadProductos = (pedido) => {
        const cantidadDirecta =
            pedido?.cantidad_productos ??
            pedido?.cantidadProductos ??
            pedido?.cantidad;

        if (
            cantidadDirecta !== undefined &&
            cantidadDirecta !== null
        ) {
            return Number(cantidadDirecta) || 0;
        }

        const productos = obtenerProductos(pedido);

        return productos.reduce((total, producto) => {
            return (
                total +
                Number(
                    producto?.cantidad ||
                        producto?.cantidadProducto ||
                        producto?.quantity ||
                        1
                )
            );
        }, 0);
    };

    const obtenerTotal = (pedido) => {
        const totalDirecto =
            pedido?.total ??
            pedido?.totalPedido ??
            pedido?.valorTotal ??
            pedido?.precioTotal;

        if (
            totalDirecto !== undefined &&
            totalDirecto !== null &&
            totalDirecto !== ""
        ) {
            return Number(totalDirecto) || 0;
        }

        const productos = obtenerProductos(pedido);

        return productos.reduce((total, producto) => {
            const precio = Number(
                producto?.producto?.precio ||
                    producto?.precio ||
                    producto?.price ||
                    producto?.valor ||
                    0
            );

            const cantidad = Number(
                producto?.cantidad ||
                    producto?.cantidadProducto ||
                    producto?.quantity ||
                    1
            );

            return total + precio * cantidad;
        }, 0);
    };

    const obtenerFecha = (pedido) => {
        return (
            pedido?.fecha ||
            pedido?.fechaPedido ||
            pedido?.created_at ||
            pedido?.createdAt ||
            pedido?.date ||
            null
        );
    };

    const formatearFecha = (pedido) => {
        const fecha = obtenerFecha(pedido);

        if (!fecha) {
            return "Sin fecha";
        }

        const fechaObjeto = new Date(fecha);

        if (Number.isNaN(fechaObjeto.getTime())) {
            return String(fecha);
        }

        return fechaObjeto.toLocaleDateString("es-CO", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
        });
    };

    const formatearFechaCompleta = (pedido) => {
        const fecha = obtenerFecha(pedido);

        if (!fecha) {
            return "Sin fecha";
        }

        const fechaObjeto = new Date(fecha);

        if (Number.isNaN(fechaObjeto.getTime())) {
            return String(fecha);
        }

        return fechaObjeto.toLocaleString("es-CO", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        });
    };

    const formatearMoneda = (valor) => {
        return new Intl.NumberFormat("es-CO", {
            style: "currency",
            currency: "COP",
            maximumFractionDigits: 0
        }).format(Number(valor) || 0);
    };

    const obtenerIdPedido = (pedido, indice) => {
        return (
            pedido?.id ||
            pedido?.numero ||
            pedido?.codigo ||
            pedido?.pedidoId ||
            `PED-${String(indice + 1).padStart(3, "0")}`
        );
    };

    const obtenerClaseEstado = (estado) => {
        switch (estado) {
            case "Recibido":
                return "bg-secondary";

            case "Revisado":
                return "bg-info text-dark";

            case "Fabricando":
                return "bg-warning text-dark";

            case "Preparado":
                return "bg-primary";

            case "Enviado":
                return "bg-dark";

            case "Entregado":
                return "bg-success";

            default:
                return "bg-secondary";
        }
    };

    const cambiarEstado = async (pedido, nuevoEstado) => {
        if (!pedido?.id || actualizando) {
            return;
        }

        setActualizando(true);

        const { data, error } = await supabase
            .from("pedidos")
            .update({
                estado: nuevoEstado,
                updated_at: new Date().toISOString()
            })
            .eq("id", pedido.id)
            .select()
            .single();

        if (error) {
            console.error("Error al actualizar estado:", error);
            setActualizando(false);
            return;
        }

        setPedidos((pedidosActuales) =>
            pedidosActuales.map((item) =>
                item.id === pedido.id
                    ? data
                    : item
            )
        );

        setPedidoSeleccionado((actual) => {
            if (!actual || actual.id !== pedido.id) {
                return actual;
            }

            return data;
        });

        setActualizando(false);
    };

    const avanzarPedido = async (pedido) => {
        const estadoActual = obtenerEstado(pedido);
        const indiceEstado = estadosPedido.indexOf(estadoActual);

        if (
            indiceEstado === -1 ||
            indiceEstado >= estadosPedido.length - 1
        ) {
            return;
        }

        await cambiarEstado(
            pedido,
            estadosPedido[indiceEstado + 1]
        );
    };

    const retrocederPedido = async (pedido) => {
        const estadoActual = obtenerEstado(pedido);
        const indiceEstado = estadosPedido.indexOf(estadoActual);

        if (indiceEstado <= 0) {
            return;
        }

        await cambiarEstado(
            pedido,
            estadosPedido[indiceEstado - 1]
        );
    };

    const actualizarPedidos = async () => {
        setActualizando(true);

        await cargarPedidos();

        setActualizando(false);
    };

    const exportarPedidos = () => {
        if (pedidos.length === 0) {
            return;
        }

        const encabezado =
            "Pedido;Cliente;Correo;Productos;Total;Estado;Fecha";

        const filas = pedidos.map((pedido, indice) => {
            const id = obtenerIdPedido(pedido, indice);
            const cliente = obtenerCliente(pedido);
            const email = obtenerEmailCliente(pedido);
            const cantidad = obtenerCantidadProductos(pedido);
            const total = obtenerTotal(pedido);
            const estado = obtenerEstado(pedido);
            const fecha = formatearFecha(pedido);

            return [
                id,
                cliente,
                email,
                cantidad,
                total,
                estado,
                fecha
            ]
                .map((valor) =>
                    `"${String(valor).replaceAll('"', '""')}"`
                )
                .join(";");
        });

        const contenido = [
            encabezado,
            ...filas
        ].join("\n");

        const blob = new Blob(
            ["\ufeff" + contenido],
            {
                type: "text/csv;charset=utf-8;"
            }
        );

        const url = URL.createObjectURL(blob);
        const enlace = document.createElement("a");

        enlace.href = url;
        enlace.download = "pedidos-dotaciones-fortuna.csv";
        enlace.click();

        URL.revokeObjectURL(url);
    };

    const pedidosFiltrados = useMemo(() => {
        const resultado = pedidos.filter((pedido) => {
            const id = String(
                pedido?.id ||
                    pedido?.numero ||
                    pedido?.codigo ||
                    ""
            ).toLowerCase();

            const cliente = String(
                obtenerCliente(pedido)
            ).toLowerCase();

            const email = String(
                obtenerEmailCliente(pedido)
            ).toLowerCase();

            const textoBusqueda =
                busqueda.toLowerCase();

            const coincideBusqueda =
                id.includes(textoBusqueda) ||
                cliente.includes(textoBusqueda) ||
                email.includes(textoBusqueda);

            const coincideEstado =
                !estadoFiltro ||
                obtenerEstado(pedido).toLowerCase() ===
                    estadoFiltro.toLowerCase();

            return (
                coincideBusqueda &&
                coincideEstado
            );
        });

        resultado.sort((a, b) => {
            const fechaA = new Date(
                obtenerFecha(a) || 0
            ).getTime();

            const fechaB = new Date(
                obtenerFecha(b) || 0
            ).getTime();

            if (
                Number.isNaN(fechaA) ||
                Number.isNaN(fechaB)
            ) {
                return 0;
            }

            return ordenFecha === "antiguo"
                ? fechaA - fechaB
                : fechaB - fechaA;
        });

        return resultado;
    }, [
        pedidos,
        busqueda,
        estadoFiltro,
        ordenFecha
    ]);

    const estadisticas = useMemo(() => {
        const total = pedidos.length;

        const pendientes = pedidos.filter(
            (pedido) =>
                obtenerEstado(pedido) === "Recibido"
        ).length;

        const enProceso = pedidos.filter((pedido) =>
            [
                "Revisado",
                "Fabricando",
                "Preparado"
            ].includes(obtenerEstado(pedido))
        ).length;

        const entregados = pedidos.filter(
            (pedido) =>
                obtenerEstado(pedido) === "Entregado"
        ).length;

        return {
            total,
            pendientes,
            enProceso,
            entregados
        };
    }, [pedidos]);

    const cerrarSesion = async () => {
        await supabase.auth.signOut();
        navigate("/");
    };

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
                    <div className="user-icon animate-pulse-soft">
                        <i className="bi bi-person"></i>
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

                <nav className="sidebar-nav">
                    <Link
                        to="/admin"
                        className="sidebar-link nav-item-animated"
                    >
                        <i className="bi bi-grid"></i>
                        <span>Administración</span>
                    </Link>

                    <Link
                        to="/productos"
                        className="sidebar-link nav-item-animated"
                    >
                        <i className="bi bi-box-seam"></i>
                        <span>Productos</span>
                    </Link>

                    <Link
                        to="/ventas"
                        className="sidebar-link nav-item-animated"
                    >
                        <i className="bi bi-cart"></i>
                        <span>Ventas</span>
                    </Link>

                    <Link
                        to="/inventario"
                        className="sidebar-link nav-item-animated"
                    >
                        <i className="bi bi-boxes"></i>
                        <span>Inventario</span>
                    </Link>

                    <Link
                        to="/pedidos-admin"
                        className="sidebar-link active nav-item-animated"
                    >
                        <i className="bi bi-bag-check"></i>
                        <span>Pedidos</span>
                    </Link>

                    <Link
                        to="/tickets"
                        className="sidebar-link nav-item-animated"
                    >
                        <i className="bi bi-ticket"></i>
                        <span>Tickets</span>
                    </Link>

                    <Link
                        to="/pqrs-admin"
                        className="sidebar-link nav-item-animated"
                    >
                        <i className="bi bi-chat-left-text"></i>
                        <span>PQRS</span>
                    </Link>

                    <Link
                        to="/perfil"
                        className="sidebar-link nav-item-animated"
                    >
                        <i className="bi bi-person-circle"></i>
                        <span>Mi perfil</span>
                    </Link>
                </nav>

                <div className="sidebar-bottom">
                    <button
                        type="button"
                        className="sidebar-link nav-item-animated w-100 border-0 bg-transparent text-start"
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
                            Inicio / Pedidos
                        </span>

                        <h1>
                            Gestión de Pedidos
                        </h1>

                        <p>
                            Consulta y seguimiento de los pedidos de los clientes
                        </p>
                    </div>

                    <div className="header-user animate-fade-in">
                        <i className="bi bi-person-circle icon-animated"></i>

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
                            <i className="bi bi-bag"></i>
                        </div>

                        <div>
                            <span>Total pedidos</span>
                            <strong>
                                {estadisticas.total}
                            </strong>
                            <small>
                                Registrados
                            </small>
                        </div>
                    </div>

                    <div className="stat-card card-animated">
                        <div className="stat-icon icon-animated">
                            <i className="bi bi-clock"></i>
                        </div>

                        <div>
                            <span>Pendientes</span>
                            <strong>
                                {estadisticas.pendientes}
                            </strong>
                            <small>
                                Por revisar
                            </small>
                        </div>
                    </div>

                    <div className="stat-card card-animated">
                        <div className="stat-icon icon-animated">
                            <i className="bi bi-gear"></i>
                        </div>

                        <div>
                            <span>En proceso</span>
                            <strong>
                                {estadisticas.enProceso}
                            </strong>
                            <small>
                                Fabricación
                            </small>
                        </div>
                    </div>

                    <div className="stat-card card-animated">
                        <div className="stat-icon icon-animated">
                            <i className="bi bi-check-circle"></i>
                        </div>

                        <div>
                            <span>Entregados</span>
                            <strong>
                                {estadisticas.entregados}
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
                                Pedidos registrados
                            </h2>

                            <p>
                                Seguimiento del estado de cada pedido
                            </p>
                        </div>

                        <div className="d-flex gap-2">
                            <button
                                type="button"
                                className="btn btn-outline-light btn-animated"
                                onClick={actualizarPedidos}
                                disabled={actualizando}
                            >
                                <i
                                    className={`bi ${
                                        actualizando
                                            ? "bi-arrow-repeat spinner"
                                            : "bi-arrow-repeat"
                                    }`}
                                ></i>

                                Actualizar
                            </button>

                            <button
                                type="button"
                                className="btn btn-primary btn-animated"
                                onClick={exportarPedidos}
                                disabled={pedidos.length === 0}
                            >
                                <i className="bi bi-download"></i>
                                Exportar
                            </button>
                        </div>
                    </div>

                    <div className="row mb-4">
                        <div className="col-md-5">
                            <div className="input-group input-animated">
                                <span className="input-group-text">
                                    <i className="bi bi-search"></i>
                                </span>

                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Buscar pedido o cliente..."
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
                                className="form-select"
                                value={estadoFiltro}
                                onChange={(e) =>
                                    setEstadoFiltro(
                                        e.target.value
                                    )
                                }
                            >
                                <option value="">
                                    Todos los estados
                                </option>

                                {estadosPedido.map(
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
                            <select
                                className="form-select"
                                value={ordenFecha}
                                onChange={(e) =>
                                    setOrdenFecha(
                                        e.target.value
                                    )
                                }
                            >
                                <option value="reciente">
                                    Más recientes
                                </option>

                                <option value="antiguo">
                                    Más antiguos
                                </option>
                            </select>
                        </div>
                    </div>

                    <div className="table-responsive">
                        <table className="table align-middle">
                            <thead>
                                <tr>
                                    <th>Pedido</th>
                                    <th>Cliente</th>
                                    <th>Productos</th>
                                    <th>Total</th>
                                    <th>Estado</th>
                                    <th>Fecha</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>

                            <tbody>
                                {cargando ? (
                                    <tr>
                                        <td
                                            colSpan="7"
                                            className="text-center py-5"
                                        >
                                            <div className="animate-scale-in">
                                                <div className="spinner-border"></div>

                                                <p className="mt-3 mb-0">
                                                    Cargando pedidos...
                                                </p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : pedidosFiltrados.length > 0 ? (
                                    pedidosFiltrados.map(
                                        (pedido, indice) => {
                                            const estado =
                                                obtenerEstado(
                                                    pedido
                                                );

                                            const cantidad =
                                                obtenerCantidadProductos(
                                                    pedido
                                                );

                                            return (
                                                <tr
                                                    key={
                                                        pedido.id ||
                                                        `${obtenerIdPedido(
                                                            pedido,
                                                            indice
                                                        )}-${indice}`
                                                    }
                                                    className="table-row-animated"
                                                >
                                                    <td>
                                                        <strong>
                                                            #
                                                            {obtenerIdPedido(
                                                                pedido,
                                                                indice
                                                            )}
                                                        </strong>
                                                    </td>

                                                    <td>
                                                        {obtenerCliente(
                                                            pedido
                                                        )}
                                                    </td>

                                                    <td>
                                                        {cantidad}{" "}
                                                        {cantidad ===
                                                        1
                                                            ? "producto"
                                                            : "productos"}
                                                    </td>

                                                    <td>
                                                        {formatearMoneda(
                                                            obtenerTotal(
                                                                pedido
                                                            )
                                                        )}
                                                    </td>

                                                    <td>
                                                        <span
                                                            className={`badge ${obtenerClaseEstado(
                                                                estado
                                                            )}`}
                                                        >
                                                            {estado}
                                                        </span>
                                                    </td>

                                                    <td>
                                                        {formatearFecha(
                                                            pedido
                                                        )}
                                                    </td>

                                                    <td>
                                                        <button
                                                            type="button"
                                                            className="btn btn-sm btn-outline-primary me-2 btn-animated"
                                                            title="Ver pedido"
                                                            onClick={() =>
                                                                setPedidoSeleccionado(
                                                                    pedido
                                                                )
                                                            }
                                                        >
                                                            <i className="bi bi-eye"></i>
                                                        </button>

                                                        <button
                                                            type="button"
                                                            className="btn btn-sm btn-outline-success btn-animated"
                                                            title="Avanzar estado"
                                                            onClick={() =>
                                                                avanzarPedido(
                                                                    pedido
                                                                )
                                                            }
                                                            disabled={
                                                                estado ===
                                                                    "Entregado" ||
                                                                actualizando
                                                            }
                                                        >
                                                            <i className="bi bi-arrow-right"></i>
                                                        </button>
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
                                                <i className="bi bi-bag-x fs-1 d-block mb-3"></i>

                                                <h5>
                                                    No hay pedidos registrados
                                                </h5>

                                                <p className="mb-0">
                                                    Los pedidos realizados por
                                                    los clientes aparecerán aquí.
                                                </p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </section>

                <section className="dashboard-card animate-slide-up">
                    <div className="card-header">
                        <div>
                            <h2>
                                Flujo del pedido
                            </h2>

                            <p>
                                Estados utilizados para realizar el seguimiento
                            </p>
                        </div>
                    </div>

                    <div className="row text-center stagger">
                        <div className="col-md-2 mb-3">
                            <div className="p-3 border rounded card-animated">
                                <i className="bi bi-inbox fs-3 icon-animated"></i>

                                <h6 className="mt-2">
                                    Recibido
                                </h6>
                            </div>
                        </div>

                        <div className="col-md-2 mb-3">
                            <div className="p-3 border rounded card-animated">
                                <i className="bi bi-search fs-3 icon-animated"></i>

                                <h6 className="mt-2">
                                    Revisado
                                </h6>
                            </div>
                        </div>

                        <div className="col-md-2 mb-3">
                            <div className="p-3 border rounded card-animated">
                                <i className="bi bi-gear fs-3 icon-animated"></i>

                                <h6 className="mt-2">
                                    Fabricando
                                </h6>
                            </div>
                        </div>

                        <div className="col-md-2 mb-3">
                            <div className="p-3 border rounded card-animated">
                                <i className="bi bi-box-seam fs-3 icon-animated"></i>

                                <h6 className="mt-2">
                                    Preparado
                                </h6>
                            </div>
                        </div>

                        <div className="col-md-2 mb-3">
                            <div className="p-3 border rounded card-animated">
                                <i className="bi bi-truck fs-3 icon-animated"></i>

                                <h6 className="mt-2">
                                    Enviado
                                </h6>
                            </div>
                        </div>

                        <div className="col-md-2 mb-3">
                            <div className="p-3 border rounded card-animated">
                                <i className="bi bi-check-circle fs-3 icon-animated"></i>

                                <h6 className="mt-2">
                                    Entregado
                                </h6>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {pedidoSeleccionado && (
                <div
                    className="modal d-block"
                    tabIndex="-1"
                    role="dialog"
                    style={{
                        backgroundColor: "rgba(0, 0, 0, 0.75)"
                    }}
                >
                    <div className="modal-dialog modal-lg modal-dialog-centered animate-scale-in">
                        <div className="modal-content">
                            <div className="modal-header">
                                <div>
                                    <h5 className="modal-title">
                                        Detalle del pedido
                                    </h5>

                                    <small>
                                        Pedido #
                                        {obtenerIdPedido(
                                            pedidoSeleccionado,
                                            pedidos.indexOf(
                                                pedidoSeleccionado
                                            )
                                        )}
                                    </small>
                                </div>

                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() =>
                                        setPedidoSeleccionado(
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
                                            {obtenerCliente(
                                                pedidoSeleccionado
                                            )}
                                        </p>
                                    </div>

                                    <div className="col-md-6">
                                        <strong>
                                            Correo
                                        </strong>

                                        <p>
                                            {obtenerEmailCliente(
                                                pedidoSeleccionado
                                            )}
                                        </p>
                                    </div>

                                    <div className="col-md-6">
                                        <strong>
                                            Fecha
                                        </strong>

                                        <p>
                                            {formatearFechaCompleta(
                                                pedidoSeleccionado
                                            )}
                                        </p>
                                    </div>

                                    <div className="col-md-6">
                                        <strong>
                                            Estado actual
                                        </strong>

                                        <p>
                                            <span
                                                className={`badge ${obtenerClaseEstado(
                                                    obtenerEstado(
                                                        pedidoSeleccionado
                                                    )
                                                )}`}
                                            >
                                                {obtenerEstado(
                                                    pedidoSeleccionado
                                                )}
                                            </span>
                                        </p>
                                    </div>

                                    <div className="col-md-6">
                                        <strong>
                                            Cantidad de productos
                                        </strong>

                                        <p>
                                            {obtenerCantidadProductos(
                                                pedidoSeleccionado
                                            )}
                                        </p>
                                    </div>

                                    <div className="col-md-6">
                                        <strong>
                                            Total
                                        </strong>

                                        <p>
                                            {formatearMoneda(
                                                obtenerTotal(
                                                    pedidoSeleccionado
                                                )
                                            )}
                                        </p>
                                    </div>
                                </div>

                                <hr />

                                <h6>
                                    Productos
                                </h6>

                                {obtenerProductos(
                                    pedidoSeleccionado
                                ).length > 0 ? (
                                    <div className="table-responsive">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th>
                                                        Producto
                                                    </th>

                                                    <th>
                                                        Cantidad
                                                    </th>

                                                    <th>
                                                        Precio
                                                    </th>

                                                    <th>
                                                        Subtotal
                                                    </th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {obtenerProductos(
                                                    pedidoSeleccionado
                                                ).map(
                                                    (
                                                        producto,
                                                        productoIndex
                                                    ) => {
                                                        const datosProducto =
                                                            producto?.producto ||
                                                            producto;

                                                        const cantidad =
                                                            Number(
                                                                producto?.cantidad ||
                                                                    producto?.cantidadProducto ||
                                                                    producto?.quantity ||
                                                                    1
                                                            );

                                                        const precio =
                                                            Number(
                                                                datosProducto?.precio ||
                                                                    datosProducto?.price ||
                                                                    datosProducto?.valor ||
                                                                    0
                                                            );

                                                        return (
                                                            <tr
                                                                key={
                                                                    productoIndex
                                                                }
                                                            >
                                                                <td>
                                                                    {datosProducto?.nombre ||
                                                                        datosProducto?.name ||
                                                                        "Producto"}
                                                                </td>

                                                                <td>
                                                                    {cantidad}
                                                                </td>

                                                                <td>
                                                                    {formatearMoneda(
                                                                        precio
                                                                    )}
                                                                </td>

                                                                <td>
                                                                    {formatearMoneda(
                                                                        precio *
                                                                            cantidad
                                                                    )}
                                                                </td>
                                                            </tr>
                                                        );
                                                    }
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                ) : (
                                    <p>
                                        No hay detalle de productos disponible.
                                    </p>
                                )}
                            </div>

                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-outline-secondary btn-animated"
                                    onClick={() =>
                                        retrocederPedido(
                                            pedidoSeleccionado
                                        )
                                    }
                                    disabled={
                                        obtenerEstado(
                                            pedidoSeleccionado
                                        ) === "Recibido" ||
                                        actualizando
                                    }
                                >
                                    <i className="bi bi-arrow-left"></i>
                                    Estado anterior
                                </button>

                                <button
                                    type="button"
                                    className="btn btn-primary btn-animated"
                                    onClick={() =>
                                        avanzarPedido(
                                            pedidoSeleccionado
                                        )
                                    }
                                    disabled={
                                        obtenerEstado(
                                            pedidoSeleccionado
                                        ) === "Entregado" ||
                                        actualizando
                                    }
                                >
                                    <i className="bi bi-arrow-right"></i>
                                    Avanzar estado
                                </button>

                                <button
                                    type="button"
                                    className="btn btn-secondary btn-animated"
                                    onClick={() =>
                                        setPedidoSeleccionado(
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

export default PedidosAdmin;