import { Link, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import Swal from "sweetalert2";
import { supabase } from "../services/supabase";

const productosIniciales = [
    {
        id: 1,
        nombre: "Uniforme Empresarial",
        categoria: "Uniformes",
        precio: 37000,
        stock: 15,
        imagen: "/assets/img/image.png",
        descripcion:
            "Uniforme administrativo institucional con acabados empresariales."
    },
    {
        id: 2,
        nombre: "Botas de Seguridad",
        categoria: "Calzado",
        precio: 14333,
        stock: 8,
        imagen: "/assets/img/botas-industriales-negras.png",
        descripcion:
            "Bota industrial con suela antideslizante y diseño de seguridad."
    },
    {
        id: 3,
        nombre: "Casco Industrial Amarillo",
        categoria: "Seguridad",
        precio: 28000,
        stock: 12,
        imagen: "/assets/img/casco-industrial-amarillo.png",
        descripcion:
            "Casco de protección para ambientes industriales."
    },
    {
        id: 4,
        nombre: "Chaleco Alta Visibilidad",
        categoria: "Seguridad",
        precio: 18000,
        stock: 8,
        imagen: "/assets/img/chaleco-naranja.png",
        descripcion:
            "Chaleco reflectivo para señalización y seguridad."
    },
    {
        id: 5,
        nombre: "Overol Industrial Azul",
        categoria: "Uniformes",
        precio: 85000,
        stock: 15,
        imagen: "/assets/img/overol-industrial-azul-real.png",
        descripcion:
            "Overol resistente para trabajo operativo y de planta."
    },
    {
        id: 6,
        nombre: "Parka Impermeable",
        categoria: "Ropa Industrial",
        precio: 95000,
        stock: 5,
        imagen: "/assets/img/parka-impermeable-amarilla.png",
        descripcion:
            "Chaqueta impermeable con protección para lluvia."
    }
];

function Productos() {
    const navigate = useNavigate();

    const [usuario, setUsuario] = useState(null);
    const [productos, setProductos] = useState([]);
    const [busqueda, setBusqueda] = useState("");
    const [categoria, setCategoria] = useState("");
    const [mostrarModal, setMostrarModal] = useState(false);
    const [productoEditando, setProductoEditando] = useState(null);

    const [formulario, setFormulario] = useState({
        nombre: "",
        categoria: "Uniformes",
        precio: "",
        stock: "",
        imagen: "/assets/img/image.png",
        descripcion: ""
    });

    useEffect(() => {
        const cargarDatos = async () => {
            const {
                data: { user }
            } = await supabase.auth.getUser();

            setUsuario(user);

            const productosGuardados = JSON.parse(
                localStorage.getItem("productos")
            );

            if (
                Array.isArray(productosGuardados) &&
                productosGuardados.length > 0
            ) {
                setProductos(productosGuardados);
            } else {
                localStorage.setItem(
                    "productos",
                    JSON.stringify(productosIniciales)
                );

                setProductos(productosIniciales);
            }
        };

        cargarDatos();
    }, []);

    const guardarProductos = (lista) => {
        setProductos(lista);

        localStorage.setItem(
            "productos",
            JSON.stringify(lista)
        );
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

    const abrirNuevoProducto = () => {
        setProductoEditando(null);

        setFormulario({
            nombre: "",
            categoria: "Uniformes",
            precio: "",
            stock: "",
            imagen: "/assets/img/image.png",
            descripcion: ""
        });

        setMostrarModal(true);
    };

    const abrirEditarProducto = (producto) => {
        setProductoEditando(producto);

        setFormulario({
            nombre: producto.nombre,
            categoria: producto.categoria,
            precio: producto.precio,
            stock: producto.stock,
            imagen: producto.imagen,
            descripcion: producto.descripcion || ""
        });

        setMostrarModal(true);
    };

    const cerrarModal = () => {
        setMostrarModal(false);
        setProductoEditando(null);
    };

    const cambiarFormulario = (e) => {
        const { name, value } = e.target;

        setFormulario((actual) => ({
            ...actual,
            [name]: value
        }));
    };

    const guardarProducto = async (e) => {
        e.preventDefault();

        if (!formulario.nombre.trim()) {
            await Swal.fire({
                icon: "warning",
                title: "Nombre requerido",
                text: "Ingresa el nombre del producto.",
                confirmButtonText: "Entendido"
            });

            return;
        }

        if (
            formulario.precio === "" ||
            Number(formulario.precio) < 0
        ) {
            await Swal.fire({
                icon: "warning",
                title: "Precio inválido",
                text: "Ingresa un precio válido para el producto.",
                confirmButtonText: "Entendido"
            });

            return;
        }

        if (
            formulario.stock === "" ||
            Number(formulario.stock) < 0
        ) {
            await Swal.fire({
                icon: "warning",
                title: "Stock inválido",
                text: "Ingresa una cantidad de stock válida.",
                confirmButtonText: "Entendido"
            });

            return;
        }

        const producto = {
            id: productoEditando
                ? productoEditando.id
                : Date.now(),
            nombre: formulario.nombre.trim(),
            categoria: formulario.categoria,
            precio: Number(formulario.precio),
            stock: Number(formulario.stock),
            imagen:
                formulario.imagen.trim() ||
                "/assets/img/image.png",
            descripcion: formulario.descripcion.trim()
        };

        if (productoEditando) {
            const actualizados = productos.map((item) =>
                item.id === productoEditando.id
                    ? producto
                    : item
            );

            guardarProductos(actualizados);
            cerrarModal();

            await Swal.fire({
                icon: "success",
                title: "Producto actualizado",
                text: "Los cambios se guardaron correctamente.",
                confirmButtonText: "Continuar"
            });

            return;
        }

        guardarProductos([
            ...productos,
            producto
        ]);

        cerrarModal();

        await Swal.fire({
            icon: "success",
            title: "Producto registrado",
            text: "El producto se agregó correctamente al catálogo.",
            confirmButtonText: "Continuar"
        });
    };

    const eliminarProducto = async (id) => {
        const producto = productos.find(
            (item) => item.id === id
        );

        if (!producto) {
            return;
        }

        const confirmacion = await Swal.fire({
            icon: "warning",
            title: "¿Eliminar producto?",
            html: `
                <p>
                    Estás a punto de eliminar:
                </p>

                <strong>
                    ${producto.nombre}
                </strong>

                <p class="mt-2 mb-0">
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

        const actualizados = productos.filter(
            (item) => item.id !== id
        );

        guardarProductos(actualizados);

        await Swal.fire({
            icon: "success",
            title: "Producto eliminado",
            text: `"${producto.nombre}" fue eliminado correctamente.`,
            confirmButtonText: "Continuar"
        });
    };

    const productosFiltrados = useMemo(() => {
        return productos.filter((producto) => {
            const textoBusqueda =
                busqueda.toLowerCase();

            const coincideBusqueda =
                producto.nombre
                    .toLowerCase()
                    .includes(textoBusqueda) ||
                producto.categoria
                    .toLowerCase()
                    .includes(textoBusqueda);

            const coincideCategoria =
                categoria === "" ||
                producto.categoria === categoria;

            return (
                coincideBusqueda &&
                coincideCategoria
            );
        });
    }, [productos, busqueda, categoria]);

    const totalProductos = productos.length;

    const productosDisponibles = productos.filter(
        (producto) => producto.stock > 5
    ).length;

    const productosStockBajo = productos.filter(
        (producto) =>
            producto.stock > 0 &&
            producto.stock <= 5
    ).length;

    const productosAgotados = productos.filter(
        (producto) => producto.stock === 0
    ).length;

    const obtenerEstado = (stock) => {
        if (stock === 0) {
            return {
                texto: "Agotado",
                clase: "bg-danger"
            };
        }

        if (stock <= 5) {
            return {
                texto: "Stock bajo",
                clase: "bg-warning text-dark"
            };
        }

        return {
            texto: "Disponible",
            clase: "bg-success"
        };
    };

    const nombreUsuario =
        usuario?.user_metadata?.nombre ||
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
                        className="sidebar-link nav-item-animated"
                    >
                        <i className="bi bi-grid icon-animated"></i>

                        <span>
                            Administración
                        </span>
                    </Link>

                    <Link
                        to="/productos"
                        className="sidebar-link active nav-item-animated delay-100"
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
                        <i className="bi bi-box-arrow-right me-2"></i>
                        Cerrar sesión
                    </button>
                </div>
            </aside>

            <main className="admin-content">
                <header className="admin-header animate-slide-down">
                    <div>
                        <span className="breadcrumb">
                            Inicio / Productos
                        </span>

                        <h1>
                            Gestión de Productos
                        </h1>

                        <p>
                            Administración del catálogo de productos
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
                            <i className="bi bi-box-seam icon-animated"></i>
                        </div>

                        <div>
                            <span>
                                Total productos
                            </span>

                            <strong>
                                {totalProductos}
                            </strong>

                            <small>
                                Registrados
                            </small>
                        </div>
                    </div>

                    <div className="stat-card card-animated hover-lift">
                        <div className="stat-icon">
                            <i className="bi bi-check-circle icon-animated"></i>
                        </div>

                        <div>
                            <span>
                                Disponibles
                            </span>

                            <strong>
                                {productosDisponibles}
                            </strong>

                            <small>
                                En catálogo
                            </small>
                        </div>
                    </div>

                    <div className="stat-card card-animated hover-lift">
                        <div className="stat-icon">
                            <i className="bi bi-exclamation-triangle icon-animated"></i>
                        </div>

                        <div>
                            <span>
                                Stock bajo
                            </span>

                            <strong>
                                {productosStockBajo}
                            </strong>

                            <small>
                                Revisar inventario
                            </small>
                        </div>
                    </div>

                    <div className="stat-card card-animated hover-lift">
                        <div className="stat-icon">
                            <i className="bi bi-x-circle icon-animated"></i>
                        </div>

                        <div>
                            <span>
                                Agotados
                            </span>

                            <strong>
                                {productosAgotados}
                            </strong>

                            <small>
                                Sin existencias
                            </small>
                        </div>
                    </div>
                </section>

                <section className="dashboard-card card-animated animate-slide-up">
                    <div className="card-header">
                        <div>
                            <h2>
                                Productos
                            </h2>

                            <p>
                                Productos registrados en Dotaciones Fortuna IJ
                            </p>
                        </div>

                        <button
                            className="btn btn-primary btn-animated"
                            type="button"
                            onClick={abrirNuevoProducto}
                        >
                            <i className="bi bi-plus-lg me-2"></i>
                            Agregar producto
                        </button>
                    </div>

                    <div className="row mb-4">
                        <div className="col-md-6 mb-3 mb-md-0">
                            <div className="input-group input-animated">
                                <span className="input-group-text">
                                    <i className="bi bi-search"></i>
                                </span>

                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Buscar producto..."
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
                                value={categoria}
                                onChange={(e) =>
                                    setCategoria(
                                        e.target.value
                                    )
                                }
                            >
                                <option value="">
                                    Todas las categorías
                                </option>

                                <option value="Uniformes">
                                    Uniformes
                                </option>

                                <option value="Calzado">
                                    Calzado
                                </option>

                                <option value="Seguridad">
                                    Seguridad
                                </option>

                                <option value="Ropa Industrial">
                                    Ropa Industrial
                                </option>
                            </select>
                        </div>
                    </div>

                    <div className="table-responsive">
                        <table className="table align-middle">
                            <thead>
                                <tr>
                                    <th>
                                        Producto
                                    </th>

                                    <th>
                                        Categoría
                                    </th>

                                    <th>
                                        Precio
                                    </th>

                                    <th>
                                        Stock
                                    </th>

                                    <th>
                                        Estado
                                    </th>

                                    <th>
                                        Acciones
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {productosFiltrados.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan="6"
                                            className="text-center py-5"
                                        >
                                            <i className="bi bi-search fs-2 d-block mb-2"></i>

                                            No se encontraron productos.
                                        </td>
                                    </tr>
                                ) : (
                                    productosFiltrados.map(
                                        (producto) => {
                                            const estado =
                                                obtenerEstado(
                                                    Number(
                                                        producto.stock
                                                    )
                                                );

                                            return (
                                                <tr
                                                    key={producto.id}
                                                    className="animate-fade-in"
                                                >
                                                    <td>
                                                        <div className="table-user">
                                                            <div>
                                                                <img
                                                                    className="image-hover"
                                                                    src={
                                                                        producto.imagen
                                                                    }
                                                                    alt={
                                                                        producto.nombre
                                                                    }
                                                                    width="50"
                                                                    height="50"
                                                                />
                                                            </div>

                                                            <span>
                                                                {
                                                                    producto.nombre
                                                                }
                                                            </span>
                                                        </div>
                                                    </td>

                                                    <td>
                                                        {
                                                            producto.categoria
                                                        }
                                                    </td>

                                                    <td>
                                                        $
                                                        {Number(
                                                            producto.precio
                                                        ).toLocaleString(
                                                            "es-CO"
                                                        )}
                                                    </td>

                                                    <td>
                                                        {
                                                            producto.stock
                                                        }
                                                    </td>

                                                    <td>
                                                        <span
                                                            className={`badge ${estado.clase}`}
                                                        >
                                                            {
                                                                estado.texto
                                                            }
                                                        </span>
                                                    </td>

                                                    <td>
                                                        <button
                                                            className="btn btn-sm btn-outline-primary me-2 btn-animated"
                                                            type="button"
                                                            onClick={() =>
                                                                abrirEditarProducto(
                                                                    producto
                                                                )
                                                            }
                                                            title="Editar producto"
                                                        >
                                                            <i className="bi bi-pencil"></i>
                                                        </button>

                                                        <button
                                                            className="btn btn-sm btn-outline-danger btn-animated"
                                                            type="button"
                                                            onClick={() =>
                                                                eliminarProducto(
                                                                    producto.id
                                                                )
                                                            }
                                                            title="Eliminar producto"
                                                        >
                                                            <i className="bi bi-trash"></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            );
                                        }
                                    )
                                )}
                            </tbody>
                        </table>
                    </div>
                </section>
            </main>

            {mostrarModal && (
                <div
                    className="modal fade show d-block animate-fade-in"
                    tabIndex="-1"
                    role="dialog"
                    style={{
                        backgroundColor:
                            "rgba(0, 0, 0, 0.75)"
                    }}
                    onMouseDown={(e) => {
                        if (
                            e.target ===
                            e.currentTarget
                        ) {
                            cerrarModal();
                        }
                    }}
                >
                    <div
                        className="modal-dialog modal-lg modal-dialog-centered animate-scale-in"
                        role="document"
                    >
                        <div className="modal-content">
                            <div className="modal-header">
                                <div>
                                    <h5 className="modal-title">
                                        {productoEditando
                                            ? "Editar producto"
                                            : "Agregar producto"}
                                    </h5>

                                    <p className="mb-0">
                                        Completa la información del producto
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={cerrarModal}
                                ></button>
                            </div>

                            <form
                                onSubmit={
                                    guardarProducto
                                }
                            >
                                <div className="modal-body">
                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">
                                                Nombre del producto
                                            </label>

                                            <input
                                                type="text"
                                                name="nombre"
                                                className="form-control input-animated"
                                                value={
                                                    formulario.nombre
                                                }
                                                onChange={
                                                    cambiarFormulario
                                                }
                                                required
                                            />
                                        </div>

                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">
                                                Categoría
                                            </label>

                                            <select
                                                name="categoria"
                                                className="form-select input-animated"
                                                value={
                                                    formulario.categoria
                                                }
                                                onChange={
                                                    cambiarFormulario
                                                }
                                            >
                                                <option value="Uniformes">
                                                    Uniformes
                                                </option>

                                                <option value="Calzado">
                                                    Calzado
                                                </option>

                                                <option value="Seguridad">
                                                    Seguridad
                                                </option>

                                                <option value="Ropa Industrial">
                                                    Ropa Industrial
                                                </option>
                                            </select>
                                        </div>

                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">
                                                Precio
                                            </label>

                                            <input
                                                type="number"
                                                name="precio"
                                                className="form-control input-animated"
                                                min="0"
                                                value={
                                                    formulario.precio
                                                }
                                                onChange={
                                                    cambiarFormulario
                                                }
                                                required
                                            />
                                        </div>

                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">
                                                Stock
                                            </label>

                                            <input
                                                type="number"
                                                name="stock"
                                                className="form-control input-animated"
                                                min="0"
                                                value={
                                                    formulario.stock
                                                }
                                                onChange={
                                                    cambiarFormulario
                                                }
                                                required
                                            />
                                        </div>

                                        <div className="col-12 mb-3">
                                            <label className="form-label">
                                                Ruta de imagen
                                            </label>

                                            <input
                                                type="text"
                                                name="imagen"
                                                className="form-control input-animated"
                                                value={
                                                    formulario.imagen
                                                }
                                                onChange={
                                                    cambiarFormulario
                                                }
                                                placeholder="/assets/img/image.png"
                                            />
                                        </div>

                                        <div className="col-12 mb-3">
                                            <label className="form-label">
                                                Descripción
                                            </label>

                                            <textarea
                                                name="descripcion"
                                                className="form-control input-animated"
                                                rows="3"
                                                value={
                                                    formulario.descripcion
                                                }
                                                onChange={
                                                    cambiarFormulario
                                                }
                                            ></textarea>
                                        </div>
                                    </div>
                                </div>

                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn btn-secondary btn-animated"
                                        onClick={cerrarModal}
                                    >
                                        Cancelar
                                    </button>

                                    <button
                                        type="submit"
                                        className="btn btn-primary btn-animated"
                                    >
                                        <i className="bi bi-check-lg me-2"></i>

                                        {productoEditando
                                            ? "Guardar cambios"
                                            : "Guardar producto"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Productos;