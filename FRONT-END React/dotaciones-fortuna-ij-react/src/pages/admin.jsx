import { Link, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import Swal from "sweetalert2";
import { supabase } from "../services/supabase";

const usuariosIniciales = [
    {
        id: "admin-001",
        nombre: "Administrador",
        email: "admin@dotacionesfortuna.ij",
        tipo: "empleado",
        rol: "admin",
        estado: "Activo"
    }
];

const esEmpleado = (item) => {
    const email = item?.email?.toLowerCase().trim() || "";

    return (
        item?.tipo === "empleado" ||
        item?.rol === "empleado" ||
        item?.rol === "admin" ||
        email.endsWith("@dotacionesfortuna.ij")
    );
};

const normalizarUsuario = (item) => {
    const usuario = {
        ...item,
        id: item.id || `usuario-${Date.now()}-${Math.random()}`,
        nombre: item.nombre || "Usuario",
        email: item.email || "",
        estado: item.estado || "Activo"
    };

    if (esEmpleado(usuario)) {
        return {
            ...usuario,
            tipo: "empleado",
            rol: usuario.rol === "admin" ? "admin" : "empleado"
        };
    }

    return {
        ...usuario,
        tipo: "cliente",
        rol: "cliente"
    };
};

const esAdministradorPrincipal = (item) => {
    const email = item?.email?.toLowerCase().trim() || "";

    return (
        item?.rol === "admin" ||
        email === "admin@dotacionesfortuna.ij"
    );
};

function Admin() {
    const navigate = useNavigate();

    const [usuario, setUsuario] = useState(null);
    const [pedidos, setPedidos] = useState([]);
    const [productos, setProductos] = useState([]);
    const [pqrs, setPqrs] = useState([]);
    const [usuarios, setUsuarios] = useState([]);

    const [tipoUsuarios, setTipoUsuarios] = useState("cliente");
    const [busquedaUsuario, setBusquedaUsuario] = useState("");
    const [filtroEstado, setFiltroEstado] = useState("Todos");

    const [
        mostrarFormularioEmpleado,
        setMostrarFormularioEmpleado
    ] = useState(false);

    const [nombreEmpleado, setNombreEmpleado] = useState("");
    const [correoEmpleado, setCorreoEmpleado] = useState("");
    const [passwordEmpleado, setPasswordEmpleado] = useState("");

    const [mensajeEmpleado, setMensajeEmpleado] = useState("");
    const [
        tipoMensajeEmpleado,
        setTipoMensajeEmpleado
    ] = useState("");

    const [creandoEmpleado, setCreandoEmpleado] = useState(false);

    useEffect(() => {
        const cargarDatos = async () => {
            const {
                data: { user }
            } = await supabase.auth.getUser();

            setUsuario(user);

            const pedidosGuardados =
                JSON.parse(localStorage.getItem("pedidos")) || [];

            const productosGuardados =
                JSON.parse(localStorage.getItem("productos")) || [];

            const pqrsGuardadas =
                JSON.parse(localStorage.getItem("pqrs")) || [];

            const usuariosGuardados =
                JSON.parse(localStorage.getItem("usuarios")) || [];

            let usuariosFinales;

            if (usuariosGuardados.length === 0) {
                usuariosFinales = [...usuariosIniciales];
            } else {
                usuariosFinales =
                    usuariosGuardados.map(
                        normalizarUsuario
                    );
            }

            const administradorExiste =
                usuariosFinales.some(
                    (item) =>
                        esAdministradorPrincipal(item)
                );

            if (!administradorExiste) {
                usuariosFinales = [
                    ...usuariosFinales,
                    usuariosIniciales[0]
                ];
            }

            localStorage.setItem(
                "usuarios",
                JSON.stringify(usuariosFinales)
            );

            setPedidos(pedidosGuardados);
            setProductos(productosGuardados);
            setPqrs(pqrsGuardadas);
            setUsuarios(usuariosFinales);
        };

        cargarDatos();
    }, []);

    const cerrarSesion = async () => {
        const confirmacion = await Swal.fire({
            icon: "question",
            title: "¿Cerrar sesión?",
            text: "Se cerrará tu sesión actual.",
            showCancelButton: true,
            confirmButtonText: "Sí, cerrar sesión",
            cancelButtonText: "Cancelar",
            reverseButtons: true
        });

        if (!confirmacion.isConfirmed) {
            return;
        }

        await supabase.auth.signOut();

        await Swal.fire({
            icon: "success",
            title: "Sesión cerrada",
            text: "Has cerrado sesión correctamente.",
            confirmButtonText: "Continuar",
            timer: 1800,
            timerProgressBar: true
        });

        navigate("/");
    };

    const guardarUsuarios = (nuevosUsuarios) => {
        const usuariosNormalizados =
            nuevosUsuarios.map(normalizarUsuario);

        localStorage.setItem(
            "usuarios",
            JSON.stringify(usuariosNormalizados)
        );

        setUsuarios(usuariosNormalizados);
    };

    const crearEmpleado = async (e) => {
        e.preventDefault();

        setMensajeEmpleado("");
        setTipoMensajeEmpleado("");

        const nombre = nombreEmpleado.trim();
        const email = correoEmpleado.trim().toLowerCase();
        const password = passwordEmpleado;

        if (!nombre || !email || !password) {
            setTipoMensajeEmpleado("danger");
            setMensajeEmpleado(
                "Completa todos los campos."
            );

            await Swal.fire({
                icon: "warning",
                title: "Campos incompletos",
                text: "Completa todos los campos para crear el empleado.",
                confirmButtonText: "Aceptar"
            });

            return;
        }

        if (!email.endsWith("@dotacionesfortuna.ij")) {
            setTipoMensajeEmpleado("danger");
            setMensajeEmpleado(
                "El correo del empleado debe terminar en @dotacionesfortuna.ij."
            );

            await Swal.fire({
                icon: "error",
                title: "Correo no válido",
                text: "El correo del empleado debe terminar en @dotacionesfortuna.ij.",
                confirmButtonText: "Aceptar"
            });

            return;
        }

        if (email === "admin@dotacionesfortuna.ij") {
            setTipoMensajeEmpleado("danger");
            setMensajeEmpleado(
                "Ese correo pertenece al administrador principal."
            );

            await Swal.fire({
                icon: "error",
                title: "Correo no permitido",
                text: "Ese correo pertenece al administrador principal.",
                confirmButtonText: "Aceptar"
            });

            return;
        }

        if (password.length < 6) {
            setTipoMensajeEmpleado("danger");
            setMensajeEmpleado(
                "La contraseña debe tener mínimo 6 caracteres."
            );

            await Swal.fire({
                icon: "warning",
                title: "Contraseña no válida",
                text: "La contraseña debe tener mínimo 6 caracteres.",
                confirmButtonText: "Aceptar"
            });

            return;
        }

        const empleadoExiste = usuarios.some(
            (item) =>
                item.email?.toLowerCase().trim() ===
                email
        );

        if (empleadoExiste) {
            setTipoMensajeEmpleado("danger");
            setMensajeEmpleado(
                "Ya existe un usuario con ese correo."
            );

            await Swal.fire({
                icon: "warning",
                title: "Usuario existente",
                text: "Ya existe un usuario registrado con ese correo.",
                confirmButtonText: "Aceptar"
            });

            return;
        }

        const confirmacion = await Swal.fire({
            icon: "question",
            title: "¿Crear empleado?",
            html: `
                <p>
                    Se creará una cuenta de empleado para:
                </p>

                <strong>
                    ${nombre}
                </strong>

                <br />

                <span>
                    ${email}
                </span>
            `,
            showCancelButton: true,
            confirmButtonText: "Sí, crear empleado",
            cancelButtonText: "Cancelar",
            reverseButtons: true
        });

        if (!confirmacion.isConfirmed) {
            return;
        }

        try {
            setCreandoEmpleado(true);
            setTipoMensajeEmpleado("info");
            setMensajeEmpleado(
                "Creando empleado..."
            );

            const {
                data,
                error
            } = await supabase.functions.invoke(
                "crear-empleado",
                {
                    body: {
                        nombre,
                        email,
                        password
                    }
                }
            );

            if (error) {
                throw new Error(
                    error.message ||
                    "No se pudo crear el empleado."
                );
            }

            if (!data?.success) {
                throw new Error(
                    data?.error ||
                    "No se pudo crear el empleado."
                );
            }

            const nuevoEmpleado = {
                id:
                    data.usuario?.id ||
                    `empleado-${Date.now()}`,
                nombre:
                    data.usuario?.nombre ||
                    nombre,
                email:
                    data.usuario?.email ||
                    email,
                tipo: "empleado",
                rol: "empleado",
                estado: "Activo"
            };

            guardarUsuarios([
                ...usuarios,
                nuevoEmpleado
            ]);

            setNombreEmpleado("");
            setCorreoEmpleado("");
            setPasswordEmpleado("");

            setTipoUsuarios("empleado");
            setBusquedaUsuario("");
            setFiltroEstado("Todos");

            setTipoMensajeEmpleado("success");
            setMensajeEmpleado(
                "Empleado creado correctamente."
            );

            await Swal.fire({
                icon: "success",
                title: "Empleado creado",
                text: `${nombre} fue registrado correctamente como empleado.`,
                confirmButtonText: "Continuar",
                timer: 2500,
                timerProgressBar: true
            });
        } catch (error) {
            console.error(
                "Error al crear empleado:",
                error
            );

            setTipoMensajeEmpleado("danger");
            setMensajeEmpleado(
                error.message ||
                "No se pudo crear el empleado."
            );

            await Swal.fire({
                icon: "error",
                title: "No se pudo crear el empleado",
                text:
                    error.message ||
                    "Ocurrió un error al crear la cuenta.",
                confirmButtonText: "Aceptar"
            });
        } finally {
            setCreandoEmpleado(false);
        }
    };

    const mismoUsuario = (usuarioA, usuarioB) => {
        if (!usuarioA || !usuarioB) {
            return false;
        }

        if (
            usuarioA.id &&
            usuarioB.id &&
            usuarioA.id === usuarioB.id
        ) {
            return true;
        }

        const emailA =
            usuarioA.email?.toLowerCase().trim() || "";

        const emailB =
            usuarioB.email?.toLowerCase().trim() || "";

        return Boolean(
            emailA &&
            emailB &&
            emailA === emailB
        );
    };

    const cambiarEstadoUsuario = async (item) => {
        if (!item || esAdministradorPrincipal(item)) {
            return;
        }

        const bloqueado =
            item.estado === "Bloqueado";

        const nuevoEstado =
            bloqueado
                ? "Activo"
                : "Bloqueado";

        const confirmacion = await Swal.fire({
            icon: bloqueado
                ? "question"
                : "warning",
            title: bloqueado
                ? "¿Desbloquear usuario?"
                : "¿Bloquear usuario?",
            text: bloqueado
                ? `La cuenta de ${item.nombre} volverá a estar activa.`
                : `La cuenta de ${item.nombre} quedará bloqueada.`,
            showCancelButton: true,
            confirmButtonText: bloqueado
                ? "Sí, desbloquear"
                : "Sí, bloquear",
            cancelButtonText: "Cancelar",
            reverseButtons: true
        });

        if (!confirmacion.isConfirmed) {
            return;
        }

        const usuariosActualizados =
            usuarios.map((usuarioItem) => {
                if (
                    !mismoUsuario(
                        usuarioItem,
                        item
                    )
                ) {
                    return usuarioItem;
                }

                return {
                    ...usuarioItem,
                    estado: nuevoEstado
                };
            });

        guardarUsuarios(usuariosActualizados);

        await Swal.fire({
            icon: "success",
            title: bloqueado
                ? "Usuario desbloqueado"
                : "Usuario bloqueado",
            text: bloqueado
                ? `${item.nombre} ahora tiene acceso al sistema.`
                : `${item.nombre} ha sido bloqueado correctamente.`,
            confirmButtonText: "Continuar",
            timer: 2200,
            timerProgressBar: true
        });
    };

    const eliminarUsuario = async (item) => {
        if (!item || esAdministradorPrincipal(item)) {
            return;
        }

        const confirmacion = await Swal.fire({
            icon: "warning",
            title: "¿Eliminar usuario?",
            html: `
                <p>
                    Esta acción eliminará a:
                </p>

                <strong>
                    ${item.nombre}
                </strong>

                <br />

                <span>
                    ${item.email}
                </span>

                <p class="mt-3 mb-0">
                    Esta acción no se puede deshacer.
                </p>
            `,
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar",
            reverseButtons: true
        });

        if (!confirmacion.isConfirmed) {
            return;
        }

        const usuariosActualizados =
            usuarios.filter(
                (usuarioItem) =>
                    !mismoUsuario(
                        usuarioItem,
                        item
                    )
            );

        guardarUsuarios(usuariosActualizados);

        await Swal.fire({
            icon: "success",
            title: "Usuario eliminado",
            text: `${item.nombre} fue eliminado correctamente.`,
            confirmButtonText: "Continuar",
            timer: 2200,
            timerProgressBar: true
        });
    };

    const totalPedidos = pedidos.length;

    const pedidosPendientes = pedidos.filter(
        (pedido) =>
            pedido.estado === "Recibido" ||
            pedido.estado === "Pendiente"
    ).length;

    const pedidosEnProceso = pedidos.filter(
        (pedido) =>
            pedido.estado === "Revisado" ||
            pedido.estado === "Fabricando" ||
            pedido.estado === "Preparado"
    ).length;

    const pedidosEntregados = pedidos.filter(
        (pedido) =>
            pedido.estado === "Entregado"
    ).length;

    const totalIngresos = useMemo(() => {
        return pedidos.reduce(
            (total, pedido) => {
                const valor =
                    Number(pedido.total) ||
                    Number(pedido.subtotal) ||
                    0;

                return total + valor;
            },
            0
        );
    }, [pedidos]);

    const nombreUsuario =
        usuario?.user_metadata?.nombre ||
        "Administrador";

    const clientes = usuarios.filter(
        (item) => !esEmpleado(item)
    );

    const empleados = usuarios.filter(
        (item) => esEmpleado(item)
    );

    const usuariosActivos = usuarios.filter(
        (item) => item.estado === "Activo"
    );

    const usuariosBloqueados = usuarios.filter(
        (item) => item.estado === "Bloqueado"
    );

    const usuariosMostrados = useMemo(() => {
        const lista =
            tipoUsuarios === "cliente"
                ? clientes
                : empleados;

        const textoBusqueda =
            busquedaUsuario
                .toLowerCase()
                .trim();

        return lista.filter((item) => {
            const coincideBusqueda =
                !textoBusqueda ||
                item.nombre
                    ?.toLowerCase()
                    .includes(textoBusqueda) ||
                item.email
                    ?.toLowerCase()
                    .includes(textoBusqueda);

            const coincideEstado =
                filtroEstado === "Todos" ||
                item.estado === filtroEstado;

            return (
                coincideBusqueda &&
                coincideEstado
            );
        });
    }, [
        tipoUsuarios,
        clientes,
        empleados,
        busquedaUsuario,
        filtroEstado
    ]);

    const actividades = [
        {
            icono: "bi-people",
            titulo: "Usuarios registrados",
            descripcion: `${usuarios.length} usuarios en el sistema`,
            tiempo: "Actual"
        },
        {
            icono: "bi-box",
            titulo: "Productos registrados",
            descripcion: `${productos.length} productos disponibles`,
            tiempo: "Actual"
        },
        {
            icono: "bi-bag-check",
            titulo: "Pedidos registrados",
            descripcion: `${totalPedidos} pedidos en el sistema`,
            tiempo: "Actual"
        },
        {
            icono: "bi-chat-left-text",
            titulo: "PQRS registradas",
            descripcion: `${pqrs.length} solicitudes registradas`,
            tiempo: "Actual"
        }
    ];

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

                <div className="sidebar-user animate-slide-up">
                    <div className="user-icon animate-pulse-soft">
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
                        className="sidebar-link active nav-item-animated"
                    >
                        <i className="bi bi-grid icon-animated"></i>

                        <span>
                            Administración
                        </span>
                    </Link>

                    <Link
                        to="/productos"
                        className="sidebar-link nav-item-animated delay-100"
                    >
                        <i className="bi bi-box-seam icon-animated"></i>

                        <span>
                            Productos
                        </span>
                    </Link>

                    <Link
                        to="/ventas"
                        className="sidebar-link nav-item-animated delay-200"
                    >
                        <i className="bi bi-cart icon-animated"></i>

                        <span>
                            Ventas
                        </span>
                    </Link>

                    <Link
                        to="/inventario"
                        className="sidebar-link nav-item-animated delay-300"
                    >
                        <i className="bi bi-boxes icon-animated"></i>

                        <span>
                            Inventario
                        </span>
                    </Link>

                    <Link
                        to="/pedidos-admin"
                        className="sidebar-link nav-item-animated delay-400"
                    >
                        <i className="bi bi-bag-check icon-animated"></i>

                        <span>
                            Pedidos
                        </span>
                    </Link>

                    <Link
                        to="/tickets"
                        className="sidebar-link nav-item-animated delay-500"
                    >
                        <i className="bi bi-ticket icon-animated"></i>

                        <span>
                            Tickets
                        </span>
                    </Link>

                    <Link
                        to="/pqrs-admin"
                        className="sidebar-link nav-item-animated delay-600"
                    >
                        <i className="bi bi-chat-left-text icon-animated"></i>

                        <span>
                            PQRS
                        </span>
                    </Link>

                    <Link
                        to="/perfil"
                        className="sidebar-link nav-item-animated delay-700"
                    >
                        <i className="bi bi-person-circle icon-animated"></i>

                        <span>
                            Mi perfil
                        </span>
                    </Link>
                </nav>

                <div className="sidebar-bottom">
                    <button
                        type="button"
                        className="btn btn-link text-danger text-decoration-none btn-animated"
                        onClick={cerrarSesion}
                    >
                        Cerrar sesión
                    </button>
                </div>
            </aside>

            <main className="admin-content">
                <header className="admin-header animate-slide-down">
                    <div>
                        <span className="breadcrumb">
                            Inicio / Administración
                        </span>

                        <h1>
                            Panel de Administración
                        </h1>

                        <p>
                            Control general del sistema
                        </p>
                    </div>

                    <div className="header-user animate-slide-right">
                        <i className="bi bi-person-circle icon-animated"></i>

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

                <section className="stats-grid stagger">
                    <div className="stat-card card-animated hover-lift">
                        <div className="stat-icon">
                            <i className="bi bi-people icon-animated"></i>
                        </div>

                        <div>
                            <span>
                                Usuarios
                            </span>

                            <strong>
                                {usuarios.length}
                            </strong>

                            <small>
                                Usuarios registrados
                            </small>
                        </div>
                    </div>

                    <div className="stat-card card-animated hover-lift">
                        <div className="stat-icon">
                            <i className="bi bi-box-seam icon-animated"></i>
                        </div>

                        <div>
                            <span>
                                Productos
                            </span>

                            <strong>
                                {productos.length}
                            </strong>

                            <small>
                                Productos registrados
                            </small>
                        </div>
                    </div>

                    <div className="stat-card card-animated hover-lift">
                        <div className="stat-icon">
                            <i className="bi bi-bag-check icon-animated"></i>
                        </div>

                        <div>
                            <span>
                                Pedidos
                            </span>

                            <strong>
                                {totalPedidos}
                            </strong>

                            <small>
                                Pedidos registrados
                            </small>
                        </div>
                    </div>

                    <div className="stat-card card-animated hover-lift">
                        <div className="stat-icon">
                            <i className="bi bi-currency-dollar icon-animated"></i>
                        </div>

                        <div>
                            <span>
                                Ingresos
                            </span>

                            <strong>
                                $
                                {totalIngresos.toLocaleString(
                                    "es-CO"
                                )}
                            </strong>

                            <small>
                                Total acumulado
                            </small>
                        </div>
                    </div>
                </section>

                <section className="dashboard-card card-animated animate-slide-up">
                    <div className="card-header">
                        <div>
                            <h2>
                                Gestión de usuarios
                            </h2>

                            <p>
                                Administra clientes y empleados registrados en el sistema
                            </p>
                        </div>
                    </div>

                    <div className="row g-3 mb-4">
                        <div className="col-md-6">
                            <button
                                type="button"
                                className={`w-100 btn ${
                                    tipoUsuarios === "cliente"
                                        ? "btn-primary"
                                        : "btn-outline-primary"
                                } btn-animated`}
                                onClick={() => {
                                    setTipoUsuarios("cliente");
                                    setFiltroEstado("Todos");
                                    setBusquedaUsuario("");
                                    setMostrarFormularioEmpleado(false);
                                }}
                            >
                                <i className="bi bi-person me-2"></i>

                                Clientes

                                <span className="ms-2">
                                    ({clientes.length})
                                </span>
                            </button>
                        </div>

                        <div className="col-md-6">
                            <button
                                type="button"
                                className={`w-100 btn ${
                                    tipoUsuarios === "empleado"
                                        ? "btn-primary"
                                        : "btn-outline-primary"
                                } btn-animated`}
                                onClick={() => {
                                    setTipoUsuarios("empleado");
                                    setFiltroEstado("Todos");
                                    setBusquedaUsuario("");
                                }}
                            >
                                <i className="bi bi-briefcase me-2"></i>

                                Empleados

                                <span className="ms-2">
                                    ({empleados.length})
                                </span>
                            </button>
                        </div>
                    </div>

                    {tipoUsuarios === "empleado" && (
                        <div className="mb-4 animate-scale-in">
                            <button
                                type="button"
                                className="btn btn-primary btn-animated"
                                onClick={() => {
                                    setMostrarFormularioEmpleado(
                                        !mostrarFormularioEmpleado
                                    );

                                    setMensajeEmpleado("");
                                    setTipoMensajeEmpleado("");
                                }}
                            >
                                <i className="bi bi-person-plus me-2"></i>

                                Crear empleado
                            </button>
                        </div>
                    )}

                    {tipoUsuarios === "empleado" &&
                        mostrarFormularioEmpleado && (
                            <div className="dashboard-card mb-4 animate-slide-down">
                                <div className="card-header">
                                    <div>
                                        <h3>
                                            Crear cuenta de empleado
                                        </h3>

                                        <p>
                                            El correo debe terminar en @dotacionesfortuna.ij
                                        </p>
                                    </div>
                                </div>

                                {mensajeEmpleado && (
                                    <div
                                        className={`alert alert-${tipoMensajeEmpleado} alert-animated`}
                                    >
                                        {mensajeEmpleado}
                                    </div>
                                )}

                                <form
                                    onSubmit={crearEmpleado}
                                >
                                    <div className="row g-3">
                                        <div className="col-md-4">
                                            <label className="form-label">
                                                Nombre completo
                                            </label>

                                            <input
                                                type="text"
                                                className="form-control"
                                                value={
                                                    nombreEmpleado
                                                }
                                                onChange={(e) =>
                                                    setNombreEmpleado(
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Nombre del empleado"
                                                disabled={
                                                    creandoEmpleado
                                                }
                                            />
                                        </div>

                                        <div className="col-md-4">
                                            <label className="form-label">
                                                Correo corporativo
                                            </label>

                                            <input
                                                type="email"
                                                className="form-control"
                                                value={
                                                    correoEmpleado
                                                }
                                                onChange={(e) =>
                                                    setCorreoEmpleado(
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="nombre@dotacionesfortuna.ij"
                                                disabled={
                                                    creandoEmpleado
                                                }
                                            />
                                        </div>

                                        <div className="col-md-4">
                                            <label className="form-label">
                                                Contraseña
                                            </label>

                                            <input
                                                type="password"
                                                className="form-control"
                                                value={
                                                    passwordEmpleado
                                                }
                                                onChange={(e) =>
                                                    setPasswordEmpleado(
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Mínimo 6 caracteres"
                                                disabled={
                                                    creandoEmpleado
                                                }
                                            />
                                        </div>
                                    </div>

                                    <div className="d-flex gap-2 mt-4">
                                        <button
                                            type="submit"
                                            className="btn btn-primary btn-animated"
                                            disabled={
                                                creandoEmpleado
                                            }
                                        >
                                            <i className="bi bi-person-plus me-2"></i>

                                            {creandoEmpleado
                                                ? "Creando..."
                                                : "Crear empleado"}
                                        </button>

                                        <button
                                            type="button"
                                            className="btn btn-outline-secondary btn-animated"
                                            disabled={
                                                creandoEmpleado
                                            }
                                            onClick={() => {
                                                setMostrarFormularioEmpleado(false);
                                                setNombreEmpleado("");
                                                setCorreoEmpleado("");
                                                setPasswordEmpleado("");
                                                setMensajeEmpleado("");
                                                setTipoMensajeEmpleado("");
                                            }}
                                        >
                                            Cancelar
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}

                    <div className="row g-3 mb-4">
                        <div className="col-md-6">
                            <div className="input-group">
                                <span className="input-group-text">
                                    <i className="bi bi-search"></i>
                                </span>

                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Buscar por nombre o correo..."
                                    value={
                                        busquedaUsuario
                                    }
                                    onChange={(e) =>
                                        setBusquedaUsuario(
                                            e.target.value
                                        )
                                    }
                                />
                            </div>
                        </div>

                        <div className="col-md-3">
                            <select
                                className="form-select"
                                value={
                                    filtroEstado
                                }
                                onChange={(e) =>
                                    setFiltroEstado(
                                        e.target.value
                                    )
                                }
                            >
                                <option value="Todos">
                                    Todos los estados
                                </option>

                                <option value="Activo">
                                    Activos
                                </option>

                                <option value="Bloqueado">
                                    Bloqueados
                                </option>
                            </select>
                        </div>

                        <div className="col-md-3">
                            <button
                                type="button"
                                className="btn btn-outline-secondary w-100 btn-animated"
                                onClick={() => {
                                    setBusquedaUsuario("");
                                    setFiltroEstado("Todos");
                                }}
                            >
                                <i className="bi bi-arrow-clockwise me-2"></i>

                                Limpiar
                            </button>
                        </div>
                    </div>

                    <div className="row g-3 mb-4 stagger">
                        <div className="col-md-4">
                            <div className="stat-card card-animated hover-lift">
                                <div className="stat-icon">
                                    <i className="bi bi-people"></i>
                                </div>

                                <div>
                                    <span>
                                        Total
                                    </span>

                                    <strong>
                                        {usuarios.length}
                                    </strong>

                                    <small>
                                        Usuarios
                                    </small>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="stat-card card-animated hover-lift">
                                <div className="stat-icon">
                                    <i className="bi bi-check-circle"></i>
                                </div>

                                <div>
                                    <span>
                                        Activos
                                    </span>

                                    <strong>
                                        {
                                            usuariosActivos.length
                                        }
                                    </strong>

                                    <small>
                                        Con acceso
                                    </small>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="stat-card card-animated hover-lift">
                                <div className="stat-icon">
                                    <i className="bi bi-lock"></i>
                                </div>

                                <div>
                                    <span>
                                        Bloqueados
                                    </span>

                                    <strong>
                                        {
                                            usuariosBloqueados.length
                                        }
                                    </strong>

                                    <small>
                                        Sin acceso
                                    </small>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="table-responsive">
                        <table className="table align-middle">
                            <thead>
                                <tr>
                                    <th>
                                        Usuario
                                    </th>

                                    <th>
                                        Correo
                                    </th>

                                    <th>
                                        Rol
                                    </th>

                                    <th>
                                        Estado
                                    </th>

                                    <th className="text-end">
                                        Acciones
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {usuariosMostrados.length > 0 ? (
                                    usuariosMostrados.map(
                                        (item) => {
                                            const esAdmin =
                                                esAdministradorPrincipal(
                                                    item
                                                );

                                            return (
                                                <tr
                                                    key={
                                                        item.id ||
                                                        item.email
                                                    }
                                                    className="animate-fade-in"
                                                >
                                                    <td>
                                                        <div className="table-user">
                                                            <div>
                                                                <i className="bi bi-person"></i>
                                                            </div>

                                                            <span>
                                                                {
                                                                    item.nombre
                                                                }
                                                            </span>
                                                        </div>
                                                    </td>

                                                    <td>
                                                        {
                                                            item.email
                                                        }
                                                    </td>

                                                    <td>
                                                        <span className="badge bg-secondary">
                                                            {item.rol ===
                                                            "admin"
                                                                ? "Administrador"
                                                                : item.rol ===
                                                                  "empleado"
                                                                    ? "Empleado"
                                                                    : "Cliente"}
                                                        </span>
                                                    </td>

                                                    <td>
                                                        <span
                                                            className={`badge ${
                                                                item.estado ===
                                                                "Activo"
                                                                    ? "bg-success"
                                                                    : "bg-danger"
                                                            }`}
                                                        >
                                                            {
                                                                item.estado
                                                            }
                                                        </span>
                                                    </td>

                                                    <td>
                                                        <div className="d-flex justify-content-end gap-2 flex-wrap">
                                                            <button
                                                                type="button"
                                                                className={`btn btn-sm ${
                                                                    item.estado ===
                                                                    "Activo"
                                                                        ? "btn-outline-warning"
                                                                        : "btn-outline-success"
                                                                } btn-animated`}
                                                                onClick={() =>
                                                                    cambiarEstadoUsuario(
                                                                        item
                                                                    )
                                                                }
                                                                disabled={
                                                                    esAdmin
                                                                }
                                                                title={
                                                                    esAdmin
                                                                        ? "El administrador principal no puede bloquearse"
                                                                        : item.estado ===
                                                                          "Activo"
                                                                            ? "Bloquear usuario"
                                                                            : "Desbloquear usuario"
                                                                }
                                                            >
                                                                <i
                                                                    className={`bi ${
                                                                        item.estado ===
                                                                        "Activo"
                                                                            ? "bi-lock"
                                                                            : "bi-unlock"
                                                                    }`}
                                                                ></i>
                                                            </button>

                                                            <button
                                                                type="button"
                                                                className="btn btn-sm btn-outline-danger btn-animated"
                                                                onClick={() =>
                                                                    eliminarUsuario(
                                                                        item
                                                                    )
                                                                }
                                                                disabled={
                                                                    esAdmin
                                                                }
                                                                title={
                                                                    esAdmin
                                                                        ? "El administrador principal no puede eliminarse"
                                                                        : "Eliminar usuario"
                                                                }
                                                            >
                                                                <i className="bi bi-trash"></i>
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        }
                                    )
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="5"
                                            className="text-center py-5"
                                        >
                                            <div className="animate-scale-in">
                                                <i className="bi bi-people fs-1 d-block mb-3"></i>

                                                <h5>
                                                    No hay usuarios
                                                </h5>

                                                <p className="mb-0">
                                                    No se encontraron usuarios con los filtros seleccionados.
                                                </p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </section>

                <section className="dashboard-grid">
                    <div className="dashboard-card card-animated animate-slide-left">
                        <div className="card-header">
                            <div>
                                <h2>
                                    Resumen de pedidos
                                </h2>

                                <p>
                                    Estado de los pedidos actuales
                                </p>
                            </div>

                            <i className="bi bi-bar-chart icon-animated"></i>
                        </div>

                        <div className="order-summary">
                            <div className="summary-item">
                                <span>
                                    Pendientes
                                </span>

                                <strong>
                                    {
                                        pedidosPendientes
                                    }
                                </strong>
                            </div>

                            <div className="summary-item">
                                <span>
                                    En proceso
                                </span>

                                <strong>
                                    {
                                        pedidosEnProceso
                                    }
                                </strong>
                            </div>

                            <div className="summary-item">
                                <span>
                                    Entregados
                                </span>

                                <strong>
                                    {
                                        pedidosEntregados
                                    }
                                </strong>
                            </div>
                        </div>

                        <div className="mt-3">
                            <Link
                                to="/pedidos-admin"
                                className="btn btn-outline-primary w-100 btn-animated"
                            >
                                Ver pedidos
                            </Link>
                        </div>
                    </div>

                    <div className="dashboard-card card-animated animate-slide-right">
                        <div className="card-header">
                            <div>
                                <h2>
                                    Accesos rápidos
                                </h2>

                                <p>
                                    Administración del sistema
                                </p>
                            </div>

                            <i className="bi bi-speedometer2 icon-animated"></i>
                        </div>

                        <div className="d-grid gap-2">
                            <Link
                                to="/productos"
                                className="btn btn-outline-primary btn-animated"
                            >
                                <i className="bi bi-box-seam me-2"></i>
                                Administrar productos
                            </Link>

                            <Link
                                to="/inventario"
                                className="btn btn-outline-primary btn-animated"
                            >
                                <i className="bi bi-boxes me-2"></i>
                                Administrar inventario
                            </Link>

                            <Link
                                to="/pqrs-admin"
                                className="btn btn-outline-primary btn-animated"
                            >
                                <i className="bi bi-chat-left-text me-2"></i>
                                Administrar PQRS
                            </Link>

                            <Link
                                to="/perfil"
                                className="btn btn-outline-secondary btn-animated"
                            >
                                <i className="bi bi-person-circle me-2"></i>
                                Mi perfil
                            </Link>
                        </div>
                    </div>
                </section>

                <section className="dashboard-card card-animated animate-slide-up">
                    <div className="card-header">
                        <div>
                            <h2>
                                Actividad reciente
                            </h2>

                            <p>
                                Resumen de movimientos del sistema
                            </p>
                        </div>

                        <Link
                            to="/pedidos-admin"
                            className="btn btn-outline-secondary btn-animated"
                        >
                            Ver pedidos
                        </Link>
                    </div>

                    <div className="activity-list stagger">
                        {actividades.map(
                            (actividad) => (
                                <div
                                    className="activity-item"
                                    key={
                                        actividad.titulo
                                    }
                                >
                                    <div className="activity-icon">
                                        <i
                                            className={`bi ${actividad.icono} icon-animated`}
                                        ></i>
                                    </div>

                                    <div>
                                        <strong>
                                            {
                                                actividad.titulo
                                            }
                                        </strong>

                                        <span>
                                            {
                                                actividad.descripcion
                                            }
                                        </span>
                                    </div>

                                    <small>
                                        {
                                            actividad.tiempo
                                        }
                                    </small>
                                </div>
                            )
                        )}
                    </div>
                </section>
            </main>
        </div>
    );
}

export default Admin;