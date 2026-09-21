import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../services/supabase";

function Cuenta() {
    const navigate = useNavigate();

    const {
        usuario,
        cerrarSesion
    } = useAuth();

    const [mostrarModal, setMostrarModal] = useState(false);

    const [passwordActual, setPasswordActual] = useState("");
    const [passwordNueva, setPasswordNueva] = useState("");
    const [confirmarPassword, setConfirmarPassword] = useState("");

    const [cargando, setCargando] = useState(false);

    const [mensaje, setMensaje] = useState("");
    const [tipoMensaje, setTipoMensaje] = useState("");

    const abrirModalPassword = () => {
        setPasswordActual("");
        setPasswordNueva("");
        setConfirmarPassword("");
        setMensaje("");
        setTipoMensaje("");
        setMostrarModal(true);
    };

    const cerrarModalPassword = () => {
        if (cargando) {
            return;
        }

        setMostrarModal(false);
        setPasswordActual("");
        setPasswordNueva("");
        setConfirmarPassword("");
        setMensaje("");
        setTipoMensaje("");
    };

    const mostrarError = (titulo, texto) => {
        Swal.fire({
            icon: "error",
            title: titulo,
            text: texto,
            confirmButtonText: "Aceptar"
        });
    };

    const cambiarPassword = async (e) => {
        e.preventDefault();

        setMensaje("");
        setTipoMensaje("");

        if (
            !passwordActual ||
            !passwordNueva ||
            !confirmarPassword
        ) {
            mostrarError(
                "Campos incompletos",
                "Completa todos los campos."
            );
            return;
        }

        if (passwordNueva.length < 6) {
            mostrarError(
                "Contraseña inválida",
                "La nueva contraseña debe tener mínimo 6 caracteres."
            );
            return;
        }

        if (passwordNueva !== confirmarPassword) {
            mostrarError(
                "Las contraseñas no coinciden",
                "La nueva contraseña y su confirmación deben ser iguales."
            );
            return;
        }

        if (passwordActual === passwordNueva) {
            mostrarError(
                "Contraseña no válida",
                "La nueva contraseña debe ser diferente a la actual."
            );
            return;
        }

        if (!usuario?.email) {
            mostrarError(
                "Error",
                "No se pudo identificar el usuario."
            );
            return;
        }

        const confirmacion = await Swal.fire({
            icon: "warning",
            title: "¿Cambiar contraseña?",
            text: "Se actualizará la contraseña de tu cuenta.",
            showCancelButton: true,
            confirmButtonText: "Sí, cambiar",
            cancelButtonText: "Cancelar",
            reverseButtons: true
        });

        if (!confirmacion.isConfirmed) {
            return;
        }

        setCargando(true);

        const {
            error: verificarError
        } = await supabase.auth.signInWithPassword({
            email: usuario.email,
            password: passwordActual
        });

        if (verificarError) {
            setCargando(false);

            mostrarError(
                "Contraseña actual incorrecta",
                "La contraseña actual que ingresaste no es correcta."
            );

            return;
        }

        const {
            error: actualizarError
        } = await supabase.auth.updateUser({
            password: passwordNueva
        });

        if (actualizarError) {
            setCargando(false);

            mostrarError(
                "No se pudo cambiar",
                "No fue posible actualizar la contraseña."
            );

            return;
        }

        setPasswordActual("");
        setPasswordNueva("");
        setConfirmarPassword("");
        setCargando(false);

        setMostrarModal(false);

        await Swal.fire({
            icon: "success",
            title: "Contraseña actualizada",
            text: "Tu contraseña se cambió correctamente.",
            confirmButtonText: "Continuar"
        });

        setMensaje("");
        setTipoMensaje("");
    };

    if (!usuario) {
        return null;
    }

    const nombre =
        usuario.user_metadata?.nombre ||
        usuario.email?.split("@")[0] ||
        "Cliente";

    const rol =
        usuario.user_metadata?.rol ||
        "cliente";

    const inicial =
        nombre.charAt(0).toUpperCase();

    const fechaRegistro = new Date(
        usuario.created_at
    ).toLocaleDateString(
        "es-CO",
        {
            day: "2-digit",
            month: "long",
            year: "numeric"
        }
    );

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
                        className="logo-animated"
                        src="/assets/img/image-2.png"
                        alt="Fortuna IJ"
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
                        className="client-menu-link nav-item-animated"
                        onClick={() =>
                            navigate("/pqrs")
                        }
                    >
                        <i className="bi bi-chat-square-text"></i>
                        PQRS
                    </button>

                    <button
                        className="client-menu-link active nav-item-animated"
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
                            {inicial}
                        </div>

                        <div className="client-user-info">

                            <strong>
                                {nombre}
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

                <section className="account-header animate-slide-up">

                    <span className="section-kicker">
                        MI PERFIL
                    </span>

                    <h1>
                        Mi cuenta
                    </h1>

                    <p>
                        Administra tu información personal
                        y la seguridad de tu cuenta.
                    </p>

                </section>

                <section className="account-layout">

                    <div className="account-profile-card card-animated animate-slide-left">

                        <div className="account-profile-top">

                            <div className="account-avatar animate-scale-in">
                                {inicial}
                            </div>

                            <div>
                                <h2>
                                    {nombre}
                                </h2>

                                <span>
                                    Cliente Fortuna IJ
                                </span>
                            </div>

                        </div>

                        <div className="account-status animate-fade-in">

                            <i className="bi bi-check-circle-fill"></i>

                            Cuenta activa

                        </div>

                        <div className="account-info">

                            <div className="account-info-item">
                                <span>
                                    Nombre
                                </span>

                                <strong>
                                    {nombre}
                                </strong>
                            </div>

                            <div className="account-info-item">
                                <span>
                                    Correo electrónico
                                </span>

                                <strong>
                                    {usuario.email}
                                </strong>
                            </div>

                            <div className="account-info-item">
                                <span>
                                    Tipo de cuenta
                                </span>

                                <strong>
                                    {rol === "admin"
                                        ? "Administrador"
                                        : "Cliente"}
                                </strong>
                            </div>

                            <div className="account-info-item">
                                <span>
                                    Miembro desde
                                </span>

                                <strong>
                                    {fechaRegistro}
                                </strong>
                            </div>

                        </div>

                    </div>

                    <div className="account-security-card card-animated animate-slide-right">

                        <div className="account-card-heading">

                            <div className="account-card-icon icon-animated">
                                <i className="bi bi-shield-lock"></i>
                            </div>

                            <div>
                                <h2>
                                    Seguridad
                                </h2>

                                <p>
                                    Protege el acceso a tu cuenta.
                                </p>
                            </div>

                        </div>

                        <div className="security-item">

                            <div className="security-item-info">

                                <div className="security-icon icon-animated">
                                    <i className="bi bi-key"></i>
                                </div>

                                <div>
                                    <strong>
                                        Contraseña
                                    </strong>

                                    <span>
                                        Mantén tu contraseña actualizada.
                                    </span>
                                </div>

                            </div>

                            <button
                                className="change-password-btn btn-animated"
                                onClick={
                                    abrirModalPassword
                                }
                            >
                                <i className="bi bi-key"></i>
                                Cambiar contraseña
                            </button>

                        </div>

                    </div>

                </section>

                <section className="account-shortcuts stagger">

                    <div className="account-shortcut card-animated">

                        <div className="shortcut-icon icon-animated">
                            <i className="bi bi-box-seam"></i>
                        </div>

                        <div>
                            <strong>
                                Mis pedidos
                            </strong>

                            <span>
                                Consulta el estado de tus pedidos.
                            </span>
                        </div>

                        <button
                            onClick={() =>
                                navigate("/pedidos")
                            }
                        >
                            Ver
                            <i className="bi bi-arrow-right"></i>
                        </button>

                    </div>

                    <div className="account-shortcut card-animated">

                        <div className="shortcut-icon icon-animated">
                            <i className="bi bi-chat-square-text"></i>
                        </div>

                        <div>
                            <strong>
                                Mis PQRS
                            </strong>

                            <span>
                                Consulta tus solicitudes.
                            </span>
                        </div>

                        <button
                            onClick={() =>
                                navigate("/pqrs")
                            }
                        >
                            Ver
                            <i className="bi bi-arrow-right"></i>
                        </button>

                    </div>

                    <div className="account-shortcut card-animated">

                        <div className="shortcut-icon icon-animated">
                            <i className="bi bi-cart3"></i>
                        </div>

                        <div>
                            <strong>
                                Mi carrito
                            </strong>

                            <span>
                                Revisa los productos seleccionados.
                            </span>
                        </div>

                        <button
                            onClick={() =>
                                navigate("/carrito")
                            }
                        >
                            Ver
                            <i className="bi bi-arrow-right"></i>
                        </button>

                    </div>

                </section>

            </main>

            <footer className="client-footer animate-fade-in">

                <span>
                    © 2026 Dotaciones Fortuna IJ
                </span>

                <span>
                    Tu información está protegida
                </span>

            </footer>

            {mostrarModal && (

                <div
                    className="password-modal-overlay animate-fade-in"
                    onClick={cerrarModalPassword}
                >

                    <div
                        className="password-modal animate-scale-in"
                        onClick={(e) =>
                            e.stopPropagation()
                        }
                    >

                        <div className="password-modal-header">

                            <div className="password-modal-icon icon-animated">
                                <i className="bi bi-shield-lock"></i>
                            </div>

                            <div>
                                <span className="section-kicker">
                                    SEGURIDAD
                                </span>

                                <h2>
                                    Cambiar contraseña
                                </h2>

                                <p>
                                    Actualiza la contraseña
                                    de tu cuenta.
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={cerrarModalPassword}
                                disabled={cargando}
                                className="icon-animated"
                            >
                                <i className="bi bi-x-lg"></i>
                            </button>

                        </div>

                        <form onSubmit={cambiarPassword}>

                            <div className="password-form-group form-animated">

                                <label>
                                    Contraseña actual
                                </label>

                                <input
                                    type="password"
                                    value={passwordActual}
                                    onChange={(e) =>
                                        setPasswordActual(
                                            e.target.value
                                        )
                                    }
                                    placeholder="Ingresa tu contraseña actual"
                                    disabled={cargando}
                                    autoComplete="current-password"
                                    className="input-animated"
                                />

                            </div>

                            <div className="password-form-group form-animated delay-100">

                                <label>
                                    Nueva contraseña
                                </label>

                                <input
                                    type="password"
                                    value={passwordNueva}
                                    onChange={(e) =>
                                        setPasswordNueva(
                                            e.target.value
                                        )
                                    }
                                    placeholder="Mínimo 6 caracteres"
                                    disabled={cargando}
                                    autoComplete="new-password"
                                    className="input-animated"
                                />

                            </div>

                            <div className="password-form-group form-animated delay-200">

                                <label>
                                    Confirmar nueva contraseña
                                </label>

                                <input
                                    type="password"
                                    value={confirmarPassword}
                                    onChange={(e) =>
                                        setConfirmarPassword(
                                            e.target.value
                                        )
                                    }
                                    placeholder="Repite la nueva contraseña"
                                    disabled={cargando}
                                    autoComplete="new-password"
                                    className="input-animated"
                                />

                            </div>

                            <div className="password-modal-actions">

                                <button
                                    type="button"
                                    className="password-cancel btn-animated"
                                    onClick={
                                        cerrarModalPassword
                                    }
                                    disabled={cargando}
                                >
                                    Cancelar
                                </button>

                                <button
                                    type="submit"
                                    className="password-submit btn-animated"
                                    disabled={cargando}
                                >
                                    {cargando ? (
                                        <>
                                            <span className="password-spinner"></span>
                                            Cambiando...
                                        </>
                                    ) : (
                                        <>
                                            <i className="bi bi-check2"></i>
                                            Cambiar contraseña
                                        </>
                                    )}
                                </button>

                            </div>

                        </form>

                    </div>

                </div>

            )}

        </div>
    );
}

export default Cuenta;