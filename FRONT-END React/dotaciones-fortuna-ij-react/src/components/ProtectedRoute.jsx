import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({
    children,
    rolRequerido,
    role,
    rolesPermitidos
}) {
    const {
        usuario,
        cargando
    } = useAuth();

    if (cargando) {
        return (
            <div className="protected-loading">
                <div className="protected-loading-content">
                    <img
                        src="/assets/img/image-2.png"
                        alt="Dotaciones Fortuna IJ"
                    />

                    <div className="protected-spinner"></div>

                    <span>
                        Cargando...
                    </span>
                </div>
            </div>
        );
    }

    if (!usuario) {
        return (
            <Navigate
                to="/"
                replace
            />
        );
    }

    const rolUsuario =
        usuario.user_metadata?.rol;

    const rolNecesario =
        rolRequerido || role;

    if (rolesPermitidos?.length) {
        if (!rolesPermitidos.includes(rolUsuario)) {
            if (rolUsuario === "admin") {
                return (
                    <Navigate
                        to="/admin"
                        replace
                    />
                );
            }

            if (rolUsuario === "empleado") {
                return (
                    <Navigate
                        to="/empleado"
                        replace
                    />
                );
            }

            return (
                <Navigate
                    to="/cliente"
                    replace
                />
            );
        }

        return children;
    }

    if (
        rolNecesario &&
        rolUsuario !== rolNecesario
    ) {
        if (rolUsuario === "admin") {
            return (
                <Navigate
                    to="/admin"
                    replace
                />
            );
        }

        if (rolUsuario === "empleado") {
            return (
                <Navigate
                    to="/empleado"
                    replace
                />
            );
        }

        return (
            <Navigate
                to="/cliente"
                replace
            />
        );
    }

    return children;
}

export default ProtectedRoute;