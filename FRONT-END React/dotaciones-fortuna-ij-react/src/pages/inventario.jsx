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
        imagen: "/assets/img/image.png"
    },
    {
        id: 2,
        nombre: "Botas de Seguridad",
        categoria: "Calzado",
        precio: 14333,
        stock: 8,
        imagen: "/assets/img/botas-industriales-negras.png"
    },
    {
        id: 3,
        nombre: "Casco Industrial Amarillo",
        categoria: "Seguridad",
        precio: 28000,
        stock: 12,
        imagen: "/assets/img/casco-industrial-amarillo.png"
    },
    {
        id: 4,
        nombre: "Chaleco Alta Visibilidad",
        categoria: "Seguridad",
        precio: 18000,
        stock: 8,
        imagen: "/assets/img/chaleco-naranja.png"
    },
    {
        id: 5,
        nombre: "Overol Industrial Azul",
        categoria: "Uniformes",
        precio: 85000,
        stock: 15,
        imagen: "/assets/img/overol-industrial-azul-real.png"
    },
    {
        id: 6,
        nombre: "Parka Impermeable",
        categoria: "Ropa Industrial",
        precio: 95000,
        stock: 5,
        imagen: "/assets/img/parka-impermeable-amarilla.png"
    }
];

function Inventario() {
    const navigate = useNavigate();

    const [usuario, setUsuario] = useState(null);
    const [productos, setProductos] = useState([]);
    const [busqueda, setBusqueda] = useState("");
    const [estadoFiltro, setEstadoFiltro] = useState("");
    const [categoriaFiltro, setCategoriaFiltro] = useState("");
    const [actualizando, setActualizando] = useState(false);

    useEffect(() => {
        cargarUsuario();
        cargarProductos();
    }, []);

    const cargarUsuario = async () => {
        const { data, error } = await supabase.auth.getUser();

        if (!error) {
            setUsuario(data?.user || null);
        }
    };

    const cargarProductos = () => {
        const guardados = localStorage.getItem("productos");

        if (guardados) {
            try {
                const productosGuardados = JSON.parse(guardados);
                setProductos(productosGuardados);
            } catch {
                localStorage.setItem(
                    "productos",
                    JSON.stringify(productosIniciales)
                );

                setProductos(productosIniciales);
            }
        } else {
            localStorage.setItem(
                "productos",
                JSON.stringify(productosIniciales)
            );

            setProductos(productosIniciales);
        }
    };

    const guardarProductos = (productosActualizados) => {
        setProductos(productosActualizados);

        localStorage.setItem(
            "productos",
            JSON.stringify(productosActualizados)
        );
    };

    const cambiarStock = async (id, cantidad) => {
        const producto = productos.find(
            (item) => item.id === id
        );

        if (!producto) {
            return;
        }

        const stockActual = Number(producto.stock || 0);
        const nuevoStock = Math.max(
            0,
            stockActual + cantidad
        );

        if (cantidad < 0 && stockActual === 0) {
            return;
        }

        const productosActualizados = productos.map((item) => {
            if (item.id !== id) {
                return item;
            }

            return {
                ...item,
                stock: nuevoStock
            };
        });

        guardarProductos(productosActualizados);

        await Swal.fire({
            icon: "success",
            title: cantidad > 0
                ? "Stock aumentado"
                : "Stock disminuido",
            html: `
                <p class="mb-1">
                    Producto:
                    <strong>${producto.nombre}</strong>
                </p>

                <p class="mb-0">
                    Existencias actuales:
                    <strong>${nuevoStock}</strong>
                </p>
            `,
            confirmButtonText: "Continuar",
            timer: 1800,
            timerProgressBar: true
        });
    };

    const actualizarInventario = async () => {
        setActualizando(true);

        cargarProductos();

        setTimeout(async () => {
            setActualizando(false);

            await Swal.fire({
                icon: "success",
                title: "Inventario actualizado",
                text: "La información del inventario fue actualizada correctamente.",
                confirmButtonText: "Continuar",
                timer: 1800,
                timerProgressBar: true
            });
        }, 500);
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

    const obtenerNombreUsuario = () => {
        return (
            usuario?.user_metadata?.nombre ||
            usuario?.email?.split("@")[0] ||
            "Administrador"
        );
    };

    const obtenerEstado = (stock) => {
        const cantidad = Number(stock || 0);

        if (cantidad === 0) {
            return {
                texto: "Agotado",
                clase: "bg-danger"
            };
        }

        if (cantidad <= 5) {
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

    const categorias = useMemo(() => {
        return [
            ...new Set(
                productos.map(
                    (producto) => producto.categoria
                )
            )
        ]
            .filter(Boolean)
            .sort();
    }, [productos]);

    const productosFiltrados = useMemo(() => {
        return productos.filter((producto) => {
            const nombre = String(
                producto.nombre || ""
            ).toLowerCase();

            const categoria = String(
                producto.categoria || ""
            ).toLowerCase();

            const coincideBusqueda =
                nombre.includes(
                    busqueda.toLowerCase()
                );

            const coincideCategoria =
                !categoriaFiltro ||
                categoria === categoriaFiltro.toLowerCase();

            const estado = obtenerEstado(
                producto.stock
            );

            let coincideEstado = true;

            if (estadoFiltro === "disponible") {
                coincideEstado =
                    estado.texto === "Disponible";
            }

            if (estadoFiltro === "bajo") {
                coincideEstado =
                    estado.texto === "Stock bajo";
            }

            if (estadoFiltro === "agotado") {
                coincideEstado =
                    estado.texto === "Agotado";
            }

            return (
                coincideBusqueda &&
                coincideCategoria &&
                coincideEstado
            );
        });
    }, [
        productos,
        busqueda,
        estadoFiltro,
        categoriaFiltro
    ]);

    const estadisticas = useMemo(() => {
        const total = productos.length;

        const disponibles = productos.filter(
            (producto) =>
                Number(producto.stock || 0) > 5
        ).length;

        const stockBajo = productos.filter(
            (producto) => {
                const stock = Number(
                    producto.stock || 0
                );

                return stock > 0 && stock <= 5;
            }
        ).length;

        const agotados = productos.filter(
            (producto) =>
                Number(producto.stock || 0) === 0
        ).length;

        return {
            total,
            disponibles,
            stockBajo,
            agotados
        };
    }, [productos]);

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
                        <span>
                            Administración
                        </span>
                    </Link>

                    <Link
                        to="/productos"
                        className="sidebar-link nav-item-animated"
                    >
                        <i className="bi bi-box-seam"></i>
                        <span>
                            Productos
                        </span>
                    </Link>

                    <Link
                        to="/ventas"
                        className="sidebar-link nav-item-animated"
                    >
                        <i className="bi bi-cart"></i>
                        <span>
                            Ventas
                        </span>
                    </Link>

                    <Link
                        to="/inventario"
                        className="sidebar-link active nav-item-animated"
                    >
                        <i className="bi bi-boxes"></i>
                        <span>
                            Inventario
                        </span>
                    </Link>

                    <Link
                        to="/pedidos-admin"
                        className="sidebar-link nav-item-animated"
                    >
                        <i className="bi bi-bag-check"></i>
                        <span>
                            Pedidos
                        </span>
                    </Link>

                    <Link
                        to="/tickets"
                        className="sidebar-link nav-item-animated"
                    >
                        <i className="bi bi-ticket"></i>
                        <span>
                            Tickets
                        </span>
                    </Link>

                    <Link
                        to="/pqrs-admin"
                        className="sidebar-link nav-item-animated"
                    >
                        <i className="bi bi-chat-left-text"></i>
                        <span>
                            PQRS
                        </span>
                    </Link>

                    <Link
                        to="/perfil"
                        className="sidebar-link nav-item-animated"
                    >
                        <i className="bi bi-person-circle"></i>
                        <span>
                            Mi perfil
                        </span>
                    </Link>
                </nav>

                <div className="sidebar-bottom">
                    <button
                        type="button"
                        className="sidebar-link nav-item-animated w-100 border-0 bg-transparent text-start"
                        onClick={cerrarSesion}
                    >
                        <i className="bi bi-box-arrow-right"></i>
                        <span>
                            Cerrar sesión
                        </span>
                    </button>
                </div>
            </aside>

            <main className="admin-content">
                <header className="admin-header animate-slide-down">
                    <div>
                        <span className="breadcrumb">
                            Inicio / Inventario
                        </span>

                        <h1>
                            Gestión de Inventario
                        </h1>

                        <p>
                            Control de existencias y disponibilidad de productos
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
                            <i className="bi bi-boxes"></i>
                        </div>

                        <div>
                            <span>
                                Productos
                            </span>

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
                            <i className="bi bi-check-circle"></i>
                        </div>

                        <div>
                            <span>
                                Disponibles
                            </span>

                            <strong>
                                {estadisticas.disponibles}
                            </strong>

                            <small>
                                Stock normal
                            </small>
                        </div>
                    </div>

                    <div className="stat-card card-animated">
                        <div className="stat-icon icon-animated">
                            <i className="bi bi-exclamation-triangle"></i>
                        </div>

                        <div>
                            <span>
                                Stock bajo
                            </span>

                            <strong>
                                {estadisticas.stockBajo}
                            </strong>

                            <small>
                                Requieren atención
                            </small>
                        </div>
                    </div>

                    <div className="stat-card card-animated">
                        <div className="stat-icon icon-animated">
                            <i className="bi bi-x-circle"></i>
                        </div>

                        <div>
                            <span>
                                Agotados
                            </span>

                            <strong>
                                {estadisticas.agotados}
                            </strong>

                            <small>
                                Sin existencias
                            </small>
                        </div>
                    </div>
                </section>

                <section className="dashboard-card animate-slide-up">
                    <div className="card-header">
                        <div>
                            <h2>
                                Control de existencias
                            </h2>

                            <p>
                                Estado actual del inventario
                            </p>
                        </div>

                        <button
                            type="button"
                            className="btn btn-primary btn-animated"
                            onClick={actualizarInventario}
                            disabled={actualizando}
                        >
                            <i
                                className={`bi ${
                                    actualizando
                                        ? "bi-arrow-repeat spinner"
                                        : "bi-arrow-repeat"
                                }`}
                            ></i>

                            {actualizando
                                ? "Actualizando..."
                                : "Actualizar"}
                        </button>
                    </div>

                    <div className="row mb-4">
                        <div className="col-md-6">
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

                                <option value="disponible">
                                    Disponible
                                </option>

                                <option value="bajo">
                                    Stock bajo
                                </option>

                                <option value="agotado">
                                    Agotado
                                </option>
                            </select>
                        </div>

                        <div className="col-md-3">
                            <select
                                className="form-select"
                                value={categoriaFiltro}
                                onChange={(e) =>
                                    setCategoriaFiltro(
                                        e.target.value
                                    )
                                }
                            >
                                <option value="">
                                    Todas las categorías
                                </option>

                                {categorias.map(
                                    (categoria) => (
                                        <option
                                            key={categoria}
                                            value={categoria}
                                        >
                                            {categoria}
                                        </option>
                                    )
                                )}
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
                                        Existencias
                                    </th>

                                    <th>
                                        Mínimo
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
                                {productosFiltrados.length > 0 ? (
                                    productosFiltrados.map(
                                        (producto) => {
                                            const estado =
                                                obtenerEstado(
                                                    producto.stock
                                                );

                                            return (
                                                <tr
                                                    key={producto.id}
                                                    className="table-row-animated"
                                                >
                                                    <td>
                                                        <div className="table-user">
                                                            <div>
                                                                <img
                                                                    src={
                                                                        producto.imagen ||
                                                                        "/assets/img/image.png"
                                                                    }
                                                                    alt={
                                                                        producto.nombre
                                                                    }
                                                                    width="50"
                                                                    height="50"
                                                                    className="image-hover"
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
                                                        <strong>
                                                            {Number(
                                                                producto.stock ||
                                                                0
                                                            )}
                                                        </strong>
                                                    </td>

                                                    <td>
                                                        5
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
                                                            type="button"
                                                            className="btn btn-sm btn-outline-primary me-2 btn-animated"
                                                            onClick={() =>
                                                                cambiarStock(
                                                                    producto.id,
                                                                    1
                                                                )
                                                            }
                                                            title="Aumentar stock"
                                                        >
                                                            <i className="bi bi-plus-lg"></i>
                                                        </button>

                                                        <button
                                                            type="button"
                                                            className="btn btn-sm btn-outline-secondary btn-animated"
                                                            onClick={() =>
                                                                cambiarStock(
                                                                    producto.id,
                                                                    -1
                                                                )
                                                            }
                                                            disabled={
                                                                Number(
                                                                    producto.stock ||
                                                                    0
                                                                ) === 0
                                                            }
                                                            title="Disminuir stock"
                                                        >
                                                            <i className="bi bi-dash-lg"></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            );
                                        }
                                    )
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="6"
                                            className="text-center py-5"
                                        >
                                            <div className="animate-scale-in">
                                                <i className="bi bi-box-seam fs-1 d-block mb-3"></i>

                                                <h5>
                                                    No se encontraron productos
                                                </h5>

                                                <p className="mb-0">
                                                    Intenta cambiar los filtros
                                                    de búsqueda.
                                                </p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default Inventario;