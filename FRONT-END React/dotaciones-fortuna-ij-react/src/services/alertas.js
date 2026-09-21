import Swal from "sweetalert2";

export const alertaBienvenida = (nombre) => {
    return Swal.fire({
        icon: "success",
        title: `Bienvenido, ${nombre}`,
        text: "Has iniciado sesión correctamente.",
        confirmButtonText: "Continuar"
    });
};

export const alertaConfirmar = async ({
    titulo,
    texto,
    confirmar = "Confirmar",
    cancelar = "Cancelar"
}) => {
    return Swal.fire({
        icon: "warning",
        title: titulo,
        text: texto,
        showCancelButton: true,
        confirmButtonText: confirmar,
        cancelButtonText: cancelar,
        reverseButtons: true
    });
};

export const alertaExito = (
    titulo,
    texto
) => {
    return Swal.fire({
        icon: "success",
        title: titulo,
        text: texto,
        confirmButtonText: "Aceptar"
    });
};

export const alertaError = (
    titulo,
    texto
) => {
    return Swal.fire({
        icon: "error",
        title: titulo,
        text: texto,
        confirmButtonText: "Aceptar"
    });
};