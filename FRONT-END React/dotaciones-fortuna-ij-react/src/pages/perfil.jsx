import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { supabase } from "../services/supabase";

function Perfil() {
    const navigate = useNavigate();

    const [usuario, setUsuario] = useState(null);
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmarPassword, setConfirmarPassword] = useState("");
    const [guardando, setGuardando] = useState(false);
    const [actualizandoPassword, setActualizandoPassword] = useState(false);

    useEffect(() => {
        let activo = true;

        const cargarUsuario = async () => {
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
            setEmail(user.email || "");
            setNombre(user.user_metadata?.nombre || "");
        };

        cargarUsuario();

        return () => {
            activo = false;
        };
    }, [navigate]);

    const guardarPerfil = async (e) => {
        e.preventDefault();

        const nombreLimpio = nombre.trim();

        if (!nombreLimpio) {
            await Swal.fire({
                icon: "error",
                title: "Nombre requerido",
                text: "El nombre no puede estar vacío.",
                confirmButtonText: "Entendido"
            });

            return;
        }

        const confirmacion = await Swal.fire({
            icon: "question",
            title: "¿Guardar cambios?",
            text: "Se actualizará la información de tu perfil.",
            showCancelButton: true,
            confirmButtonText: "Sí, guardar",
            cancelButtonText: "Cancelar",
            reverseButtons: true
        });

        if (!confirmacion.isConfirmed) {
            return;
        }

        setGuardando(true);

        const { data, error: errorSupabase } =
            await supabase.auth.updateUser({
                data: {
                    nombre: nombreLimpio
                }
            });

        if (errorSupabase) {
            setGuardando(false);

            await Swal.fire({
                icon: "error",
                title: "No se pudo actualizar",
                text: errorSupabase.message,
                confirmButtonText: "Entendido"
            });

            return;
        }

        setUsuario(data.user);
        setNombre(
            data.user?.user_metadata?.nombre ||
            nombreLimpio
        );

        setGuardando(false);

        await Swal.fire({
            icon: "success",
            title: "Perfil actualizado",
            text: "La información de tu perfil se actualizó correctamente.",
            confirmButtonText: "Continuar"
        });
    };

    const cambiarPassword = async (e) => {
        e.preventDefault();

        if (password.length < 6) {
            await Swal.fire({
                icon: "error",
                title: "Contraseña inválida",
                text: "La contraseña debe tener mínimo 6 caracteres.",
                confirmButtonText: "Entendido"
            });

            return;
        }

        if (password !== confirmarPassword) {
            await Swal.fire({
                icon: "error",
                title: "Las contraseñas no coinciden",
                text: "Verifica que ambas contraseñas sean iguales.",
                confirmButtonText: "Entendido"
            });

            return;
        }

        const confirmacion = await Swal.fire({
            icon: "warning",
            title: "¿Cambiar contraseña?",
            text: "Se actualizará la contraseña de acceso a tu cuenta.",
            showCancelButton: true,
            confirmButtonText: "Sí, cambiar",
            cancelButtonText: "Cancelar",
            reverseButtons: true
        });

        if (!confirmacion.isConfirmed) {
            return;
        }

        setActualizandoPassword(true);

        const { error: errorSupabase } =
            await supabase.auth.updateUser({
                password
            });

        if (errorSupabase) {
            setActualizandoPassword(false);

            await Swal.fire({
                icon: "error",
                title: "No se pudo actualizar",
                text: errorSupabase.message,
                confirmButtonText: "Entendido"
            });

            return;
        }

        setPassword("");
        setConfirmarPassword("");
        setActualizandoPassword(false);

        await Swal.fire({
            icon: "success",
            title: "Contraseña actualizada",
            text: "Tu contraseña se cambió correctamente.",
            confirmButtonText: "Continuar"
        });
    };

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

        navigate("/");
    };

    const nombreMostrar =
        usuario?.user_metadata?.nombre ||
        nombre ||
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
                            {nombreMostrar}
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
                        className="sidebar-link"
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
                        className="sidebar-link active"
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
                            Inicio / Mi perfil
                        </span>

                        <h1>
                            Mi perfil
                        </h1>

                        <p>
                            Administra la información de tu cuenta
                        </p>

                    </div>

                    <div className="header-user animate-fade-in">

                        <i className="bi bi-person-circle"></i>

                        <div>

                            <strong>
                                {nombreMostrar}
                            </strong>

                            <span>
                                Administrador
                            </span>

                        </div>

                    </div>

                </header>

                <section className="row g-4">

                    <div className="col-lg-5">

                        <div className="dashboard-card card-animated animate-slide-left">

                            <div className="card-header">

                                <div>

                                    <h2>
                                        Información personal
                                    </h2>

                                    <p>
                                        Datos principales de tu cuenta
                                    </p>

                                </div>

                            </div>

                            <div className="text-center mb-4">

                                <div
                                    className="account-avatar animate-scale-in mx-auto"
                                    style={{
                                        width: "100px",
                                        height: "100px",
                                        borderRadius: "50%",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        fontSize: "42px"
                                    }}
                                >
                                    <i className="bi bi-person"></i>
                                </div>

                                <h3 className="mt-3 mb-1">
                                    {nombreMostrar}
                                </h3>

                                <span>
                                    Gerente General
                                </span>

                            </div>

                            <form onSubmit={guardarPerfil}>

                                <div className="mb-3 form-animated">

                                    <label
                                        htmlFor="nombre"
                                        className="form-label"
                                    >
                                        Nombre
                                    </label>

                                    <input
                                        id="nombre"
                                        type="text"
                                        className="form-control input-animated"
                                        value={nombre}
                                        onChange={(e) =>
                                            setNombre(e.target.value)
                                        }
                                        placeholder="Nombre completo"
                                        required
                                    />

                                </div>

                                <div className="mb-3 form-animated delay-100">

                                    <label
                                        htmlFor="email"
                                        className="form-label"
                                    >
                                        Correo electrónico
                                    </label>

                                    <input
                                        id="email"
                                        type="email"
                                        className="form-control"
                                        value={email}
                                        readOnly
                                    />

                                    <small className="text-muted">
                                        El correo está asociado a tu cuenta de acceso.
                                    </small>

                                </div>

                                <div className="mb-3 form-animated delay-200">

                                    <label className="form-label">
                                        Rol
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        value="Administrador"
                                        readOnly
                                    />

                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary btn-animated"
                                    disabled={guardando}
                                >
                                    <i className="bi bi-check-lg me-2"></i>

                                    {guardando
                                        ? "Guardando..."
                                        : "Guardar cambios"}
                                </button>

                            </form>

                        </div>

                    </div>

                    <div className="col-lg-7">

                        <div className="dashboard-card card-animated animate-slide-right">

                            <div className="card-header">

                                <div>

                                    <h2>
                                        Seguridad
                                    </h2>

                                    <p>
                                        Actualiza la contraseña de acceso
                                    </p>

                                </div>

                                <i className="bi bi-shield-lock fs-3"></i>

                            </div>

                            <form onSubmit={cambiarPassword}>

                                <div className="mb-3 form-animated">

                                    <label
                                        htmlFor="password"
                                        className="form-label"
                                    >
                                        Nueva contraseña
                                    </label>

                                    <input
                                        id="password"
                                        type="password"
                                        className="form-control input-animated"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        placeholder="Mínimo 6 caracteres"
                                        minLength="6"
                                        required
                                    />

                                </div>

                                <div className="mb-4 form-animated delay-100">

                                    <label
                                        htmlFor="confirmarPassword"
                                        className="form-label"
                                    >
                                        Confirmar contraseña
                                    </label>

                                    <input
                                        id="confirmarPassword"
                                        type="password"
                                        className="form-control input-animated"
                                        value={confirmarPassword}
                                        onChange={(e) =>
                                            setConfirmarPassword(
                                                e.target.value
                                            )
                                        }
                                        placeholder="Repite la nueva contraseña"
                                        minLength="6"
                                        required
                                    />

                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary btn-animated"
                                    disabled={actualizandoPassword}
                                >
                                    <i className="bi bi-lock me-2"></i>

                                    {actualizandoPassword
                                        ? "Actualizando..."
                                        : "Cambiar contraseña"}
                                </button>

                            </form>

                        </div>

                        <div className="dashboard-card card-animated animate-slide-right delay-200 mt-4">

                            <div className="card-header">

                                <div>

                                    <h2>
                                        Accesos rápidos
                                    </h2>

                                    <p>
                                        Accede rápidamente a las principales funciones
                                    </p>

                                </div>

                            </div>

                            <div className="row g-3">

                                <div className="col-md-6">

                                    <Link
                                        to="/productos"
                                        className="text-decoration-none"
                                    >
                                        <div className="p-3 border rounded card-animated hover-lift">

                                            <i className="bi bi-box-seam fs-3 d-block mb-2"></i>

                                            <strong className="d-block">
                                                Productos
                                            </strong>

                                            <span>
                                                Administrar catálogo
                                            </span>

                                        </div>
                                    </Link>

                                </div>

                                <div className="col-md-6">

                                    <Link
                                        to="/inventario"
                                        className="text-decoration-none"
                                    >
                                        <div className="p-3 border rounded card-animated hover-lift">

                                            <i className="bi bi-boxes fs-3 d-block mb-2"></i>

                                            <strong className="d-block">
                                                Inventario
                                            </strong>

                                            <span>
                                                Controlar existencias
                                            </span>

                                        </div>
                                    </Link>

                                </div>

                                <div className="col-md-6">

                                    <Link
                                        to="/pedidos-admin"
                                        className="text-decoration-none"
                                    >
                                        <div className="p-3 border rounded card-animated hover-lift">

                                            <i className="bi bi-bag-check fs-3 d-block mb-2"></i>

                                            <strong className="d-block">
                                                Pedidos
                                            </strong>

                                            <span>
                                                Gestionar pedidos
                                            </span>

                                        </div>
                                    </Link>

                                </div>

                                <div className="col-md-6">

                                    <Link
                                        to="/pqrs-admin"
                                        className="text-decoration-none"
                                    >
                                        <div className="p-3 border rounded card-animated hover-lift">

                                            <i className="bi bi-chat-left-text fs-3 d-block mb-2"></i>

                                            <strong className="d-block">
                                                PQRS
                                            </strong>

                                            <span>
                                                Revisar solicitudes
                                            </span>

                                        </div>
                                    </Link>

                                </div>

                            </div>

                        </div>

                    </div>

                </section>

            </main>

        </div>
    );
}

export default Perfil;