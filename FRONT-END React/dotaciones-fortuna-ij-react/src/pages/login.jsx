import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { supabase } from "../services/supabase";

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const mostrarError = (mensaje) => {
        Swal.fire({
            icon: "error",
            title: "No se pudo iniciar sesión",
            text: mensaje,
            confirmButtonText: "Aceptar"
        });
    };

    const mostrarBienvenida = async (nombre, rol) => {
        let titulo = "Bienvenido";
        let texto = `Hola ${nombre}, has iniciado sesión correctamente.`;

        if (rol === "admin") {
            titulo = "Bienvenido, administrador";
            texto = `Hola ${nombre}, tu sesión de administrador ha iniciado correctamente.`;
        }

        if (rol === "empleado") {
            titulo = "Bienvenido, empleado";
            texto = `Hola ${nombre}, tu sesión de empleado ha iniciado correctamente.`;
        }

        if (rol === "cliente") {
            titulo = "Bienvenido";
            texto = `Hola ${nombre}, nos alegra tenerte de nuevo.`;
        }

        await Swal.fire({
            icon: "success",
            title: titulo,
            text: texto,
            confirmButtonText: "Continuar",
            timer: 2500,
            timerProgressBar: true
        });
    };

    const manejarLogin = async (e) => {
        e.preventDefault();

        setError("");

        const emailLimpio = email.trim().toLowerCase();

        const usuarios =
            JSON.parse(localStorage.getItem("usuarios")) || [];

        const usuarioLocal = usuarios.find(
            (usuario) =>
                usuario.email?.toLowerCase() === emailLimpio
        );

        if (usuarioLocal?.estado === "Bloqueado") {
            const mensaje =
                "Tu cuenta se encuentra bloqueada. Comunícate con el administrador.";

            setError(mensaje);
            mostrarError(mensaje);
            return;
        }

        const { data, error } =
            await supabase.auth.signInWithPassword({
                email: emailLimpio,
                password
            });

        if (error) {
            const mensaje =
                "Correo o contraseña incorrectos.";

            setError(mensaje);
            mostrarError(mensaje);
            return;
        }

        const usuario = data.user;

        const rolSupabase =
            usuario.user_metadata?.rol;

        const rolLocal =
            usuarioLocal?.rol;

        let rol = rolSupabase || rolLocal;

        if (!rol) {
            if (
                emailLimpio ===
                "admin@dotacionesfortuna.ij"
            ) {
                rol = "admin";
            } else if (
                emailLimpio.endsWith(
                    "@dotacionesfortuna.ij"
                )
            ) {
                rol = "empleado";
            } else {
                rol = "cliente";
            }
        }

        const usuariosActualizados =
            JSON.parse(localStorage.getItem("usuarios")) || [];

        const usuarioRegistrado =
            usuariosActualizados.find(
                (usuarioLocal) =>
                    usuarioLocal.email?.toLowerCase() ===
                    usuario.email?.toLowerCase()
            );

        if (
            usuarioRegistrado?.estado ===
            "Bloqueado"
        ) {
            await supabase.auth.signOut();

            const mensaje =
                "Tu cuenta se encuentra bloqueada. Comunícate con el administrador.";

            setError(mensaje);
            mostrarError(mensaje);
            return;
        }

        const nombre =
            usuario.user_metadata?.nombre ||
            usuarioRegistrado?.nombre ||
            emailLimpio.split("@")[0];

        const tipo =
            usuario.user_metadata?.tipo ||
            usuarioRegistrado?.tipo ||
            (rol === "empleado"
                ? "empleado"
                : "cliente");

        const estado =
            usuario.user_metadata?.estado ||
            usuarioRegistrado?.estado ||
            "Activo";

        const usuarioActualizado = {
            id: usuario.id,
            nombre,
            email: usuario.email,
            tipo,
            rol,
            estado
        };

        const existeUsuario =
            usuariosActualizados.some(
                (usuarioLocal) =>
                    usuarioLocal.email?.toLowerCase() ===
                    usuario.email?.toLowerCase()
            );

        if (existeUsuario) {
            const usuariosNuevos =
                usuariosActualizados.map(
                    (usuarioLocal) => {
                        if (
                            usuarioLocal.email?.toLowerCase() ===
                            usuario.email?.toLowerCase()
                        ) {
                            return {
                                ...usuarioLocal,
                                ...usuarioActualizado
                            };
                        }

                        return usuarioLocal;
                    }
                );

            localStorage.setItem(
                "usuarios",
                JSON.stringify(usuariosNuevos)
            );
        } else {
            localStorage.setItem(
                "usuarios",
                JSON.stringify([
                    ...usuariosActualizados,
                    usuarioActualizado
                ])
            );
        }

        await mostrarBienvenida(
            nombre,
            rol
        );

        if (rol === "admin") {
            navigate("/admin");
            return;
        }

        if (rol === "empleado") {
            navigate("/empleado");
            return;
        }

        navigate("/cliente");
    };

    return (
        <div className="auth-page page-animated">
            <div className="auth-wrapper">

                <section className="auth-brand animate-slide-left">
                    <img
                        src="/assets/img/image-2.png"
                        alt="Fortuna IJ"
                        className="logo-animated"
                    />

                    <h1>FORTUNA IJ</h1>

                    <p>
                        Sistema de gestión de dotaciones, pedidos y atención al cliente.
                    </p>
                </section>

                <section className="auth-form animate-slide-right">
                    <h2>Iniciar sesión</h2>

                    <p className="text-secondary mb-4">
                        Ingresa con tu cuenta para continuar.
                    </p>

                    {error && (
                        <div className="alert alert-danger alert-animated">
                            {error}
                        </div>
                    )}

                    <form
                        onSubmit={manejarLogin}
                        className="form-animated"
                    >
                        <div className="mb-3">
                            <label className="form-label">
                                Correo electrónico
                            </label>

                            <input
                                type="email"
                                className="form-control input-animated"
                                placeholder="correo@ejemplo.com"
                                value={email}
                                onChange={(e) =>
                                    setEmail(
                                        e.target.value
                                    )
                                }
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">
                                Contraseña
                            </label>

                            <input
                                type="password"
                                className="form-control input-animated"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) =>
                                    setPassword(
                                        e.target.value
                                    )
                                }
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary w-100 py-2 btn-animated"
                        >
                            Ingresar
                        </button>

                        <div className="text-center mt-3">
                            <Link
                                to="/"
                                className="public-btn-secondary btn-animated d-inline-flex justify-content-center align-items-center"
                            >
                                Volver al inicio
                            </Link>
                        </div>
                    </form>

                    <p className="text-secondary text-center mt-4 mb-0">
                        ¿No tienes una cuenta?{" "}
                        <Link
                            to="/registro"
                            className="auth-link"
                        >
                            Crear cuenta
                        </Link>
                    </p>
                </section>

            </div>
        </div>
    );
}

export default Login;