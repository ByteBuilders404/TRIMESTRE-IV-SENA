import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

import { supabase } from "../services/supabase";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [usuario, setUsuario] = useState(null);
    const [accessToken, setAccessToken] = useState(null);
    const [cargando, setCargando] = useState(true);

    const mostrarToken = (token) => {
        if (!token) {
            console.log("JWT activo: No");
            return;
        }

        const tokenCorto =
            `${token.slice(0, 20)}...${token.slice(-10)}`;

        console.log("JWT activo:", tokenCorto);
    };

    useEffect(() => {
        let activo = true;

        const cargarSesion = async () => {
            const {
                data: { session },
                error
            } = await supabase.auth.getSession();

            if (!activo) {
                return;
            }

            if (error) {
                setUsuario(null);
                setAccessToken(null);
                mostrarToken(null);
            } else {
                setUsuario(session?.user || null);
                setAccessToken(session?.access_token || null);
                mostrarToken(session?.access_token);
            }

            setCargando(false);
        };

        cargarSesion();

        const {
            data: { subscription }
        } = supabase.auth.onAuthStateChange(
            (_evento, session) => {
                if (!activo) {
                    return;
                }

                setUsuario(session?.user || null);
                setAccessToken(session?.access_token || null);
                mostrarToken(session?.access_token);
                setCargando(false);
            }
        );

        return () => {
            activo = false;
            subscription.unsubscribe();
        };
    }, []);

    const cerrarSesion = async () => {
        await supabase.auth.signOut();

        setUsuario(null);
        setAccessToken(null);

        console.log("JWT activo: No");
    };

    return (
        <AuthContext.Provider
            value={{
                usuario,
                accessToken,
                cargando,
                cerrarSesion
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}