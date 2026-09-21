import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { supabase } from "../services/supabase";

function Registro() {
    const navigate = useNavigate();

    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmarPassword, setConfirmarPassword] = useState("");

    const [mensaje, setMensaje] = useState("");
    const [tipoMensaje, setTipoMensaje] = useState("");

    const registrarUsuario = async (e) => {
        e.preventDefault();

        setMensaje("");
        setTipoMensaje("");

        const nombreLimpio = nombre.trim();
        const emailLimpio = email.trim().toLowerCase();

        if (
            !nombreLimpio ||
            !emailLimpio ||
            !password ||
            !confirmarPassword
        ) {
            setTipoMensaje("danger");
            setMensaje("Completa todos los campos.");
            return;
        }

        if (password.length < 6) {
            setTipoMensaje("danger");
            setMensaje("La contraseña debe tener mínimo 6 caracteres.");
            return;
        }

        if (password !== confirmarPassword) {
            setTipoMensaje("danger");
            setMensaje("Las contraseñas no coinciden.");
            return;
        }

        if (emailLimpio.endsWith("@dotacionesfortuna.ij")) {
            setTipoMensaje("danger");
            setMensaje(
                "Los correos @dotacionesfortuna.ij están destinados a empleados."
            );
            return;
        }

        try {
            const { data, error } = await supabase.auth.signUp({
                email: emailLimpio,
                password,
                options: {
                    data: {
                        nombre: nombreLimpio,
                        rol: "cliente",
                        tipo: "cliente",
                        estado: "Activo"
                    }
                }
            });

            if (error) {
                setTipoMensaje("danger");
                setMensaje(error.message);
                return;
            }

            const usuariosActuales =
                JSON.parse(localStorage.getItem("usuarios")) || [];

            const usuarioExiste = usuariosActuales.some(
                (usuario) =>
                    usuario.email?.toLowerCase() === emailLimpio
            );

            if (!usuarioExiste) {
                const nuevoUsuario = {
                    id: data?.user?.id || `usuario-${Date.now()}`,
                    nombre: nombreLimpio,
                    email: emailLimpio,
                    tipo: "cliente",
                    rol: "cliente",
                    estado: "Activo"
                };

                localStorage.setItem(
                    "usuarios",
                    JSON.stringify([
                        ...usuariosActuales,
                        nuevoUsuario
                    ])
                );
            }

            setTipoMensaje("success");
            setMensaje(
                "Registro realizado correctamente. Ahora puedes iniciar sesión."
            );

            setNombre("");
            setEmail("");
            setPassword("");
            setConfirmarPassword("");

            setTimeout(() => {
                navigate("/login");
            }, 1500);
        } catch {
            setTipoMensaje("danger");
            setMensaje("Ocurrió un error al registrar el usuario.");
        }
    };

    return (
        <div className="auth-page page-animated">
            <div className="auth-container animate-scale-in">
                <div className="auth-card card-animated">

                    <div className="text-center mb-4">
                        <Link to="/">
                            <img
                                src="/assets/img/image-2.png"
                                alt="Dotaciones Fortuna IJ"
                                className="auth-logo logo-animated"
                            />
                        </Link>

                        <h1 className="mt-3">
                            Crear cuenta
                        </h1>

                        <p>
                            Regístrate como cliente de Dotaciones Fortuna IJ
                        </p>
                    </div>

                    {mensaje && (
                        <div
                            className={`alert alert-${tipoMensaje} alert-animated`}
                        >
                            {mensaje}
                        </div>
                    )}

                    <form onSubmit={registrarUsuario}>
                        <div className="mb-3 form-animated">
                            <label className="form-label">
                                Nombre completo
                            </label>

                            <input
                                type="text"
                                className="form-control input-animated"
                                value={nombre}
                                onChange={(e) =>
                                    setNombre(e.target.value)
                                }
                                placeholder="Ingresa tu nombre"
                            />
                        </div>

                        <div className="mb-3 form-animated delay-100">
                            <label className="form-label">
                                Correo electrónico
                            </label>

                            <input
                                type="email"
                                className="form-control input-animated"
                                value={email}
                                onChange={(e) =>
                                    setEmail(e.target.value)
                                }
                                placeholder="correo@gmail.com"
                            />
                        </div>

                        <div className="mb-3 form-animated delay-200">
                            <label className="form-label">
                                Contraseña
                            </label>

                            <input
                                type="password"
                                className="form-control input-animated"
                                value={password}
                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }
                                placeholder="Mínimo 6 caracteres"
                            />
                        </div>

                        <div className="mb-4 form-animated delay-300">
                            <label className="form-label">
                                Confirmar contraseña
                            </label>

                            <input
                                type="password"
                                className="form-control input-animated"
                                value={confirmarPassword}
                                onChange={(e) =>
                                    setConfirmarPassword(e.target.value)
                                }
                                placeholder="Repite tu contraseña"
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary w-100 btn-animated"
                        >
                            Crear cuenta
                        </button>
                    </form>

                    <div className="text-center mt-4">
                        <span>
                            ¿Ya tienes una cuenta?
                        </span>

                        <Link
                            to="/login"
                            className="auth-link ms-2"
                        >
                            Iniciar sesión
                        </Link>
                    </div>

                    <div className="text-center mt-3">
                        <Link
                            to="/"
                            className="btn btn-outline-light px-4 py-2 btn-animated"
                        >
                            Volver al inicio
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Registro;
