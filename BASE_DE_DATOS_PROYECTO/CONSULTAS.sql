# Consulta 1

#Productos más vendidos
#Regla de negocio: determinar qué productos tienen mayor cantidad de unidades vendidas y cuántos clientes los han comprado.

SELECT
    pt.nombre AS producto,
    COUNT(dp.id_detalle_producto) AS veces_vendido,
    SUM(dp.cantidad) AS unidades_vendidas,
    COUNT(DISTINCT p.id_usuario) AS cantidad_clientes
FROM producto_terminado AS pt
INNER JOIN producto_talla AS pta
    ON pt.id_producto = pta.id_producto
INNER JOIN detalle_producto AS dp
    ON pta.id_producto_talla = dp.id_producto_talla
INNER JOIN pedido AS p
    ON dp.id_pedido = p.id_pedido
INNER JOIN usuario AS u
    ON p.id_usuario = u.id_usuario
INNER JOIN rol AS r
    ON u.id_rol = r.id_rol
WHERE r.nombre_rol = 'Cliente'
GROUP BY
    pt.id_producto,
    pt.nombre
ORDER BY
    unidades_vendidas DESC;
    
#Consulta 2

#Materiales por proveedor y bodega
#Regla de negocio: consultar qué materiales suministra cada proveedor, dónde están almacenados, cuál es su stock y cuántos movimientos de inventario han tenido.

SELECT
    UPPER(pr.nombre) AS proveedor,
    m.nombre AS material,
    b.nombre AS bodega,
    m.categoria,
    m.color,
    m.cantidad_stock,
    COUNT(mi.id_movimiento) AS movimientos,
    SUM(mi.cantidad) AS cantidad_movilizada
FROM proveedor AS pr
INNER JOIN material AS m
    ON pr.id_proveedor = m.id_proveedor
INNER JOIN bodega AS b
    ON m.id_bodega = b.id_bodega
INNER JOIN movimiento_inventario AS mi
    ON m.id_material = mi.id_material
GROUP BY
    pr.id_proveedor,
    pr.nombre,
    m.id_material,
    m.nombre,
    b.id_bodega,
    b.nombre,
    m.categoria,
    m.color,
    m.cantidad_stock
ORDER BY
    m.cantidad_stock DESC;
    
# Consulta 3

#Movimientos realizados por cada usuario
#Regla de negocio: conocer cuánto material ha movilizado cada usuario del sistema y qué cantidad de movimientos ha realizado.

SELECT
    UPPER(u.nombre) AS usuario,
    r.nombre_rol AS rol,
    COUNT(mi.id_movimiento) AS cantidad_movimientos,
    SUM(mi.cantidad) AS cantidad_material,
    AVG(mi.cantidad) AS promedio_material_movilizado,
    MAX(mi.cantidad) AS mayor_movimiento,
    MIN(mi.cantidad) AS menor_movimiento
FROM usuario AS u
INNER JOIN rol AS r
    ON u.id_rol = r.id_rol
INNER JOIN movimiento_inventario AS mi
    ON u.id_usuario = mi.id_usuario
INNER JOIN material AS m
    ON mi.id_material = m.id_material
GROUP BY
    u.id_usuario,
    u.nombre,
    r.nombre_rol
ORDER BY
    cantidad_material DESC;

# Consulta 4

#Material requerido por cada producto
#Regla de negocio: mostrar qué materiales necesita cada producto terminado, cuánto material requiere, qué proveedor lo suministra y en qué bodega se encuentra.

SELECT
    pt.nombre AS producto,
    pt.precio,
    pt.estado,
    m.nombre AS material,
    m.categoria,
    m.color,
    pm.cantidad_material,
    pr.nombre AS proveedor,
    b.nombre AS bodega,
    m.cantidad_stock AS stock_disponible
FROM producto_terminado AS pt
INNER JOIN producto_material AS pm
    ON pt.id_producto = pm.id_producto
INNER JOIN material AS m
    ON pm.id_material = m.id_material
INNER JOIN proveedor AS pr
    ON m.id_proveedor = pr.id_proveedor
INNER JOIN bodega AS b
    ON m.id_bodega = b.id_bodega
GROUP BY
    pt.id_producto,
    pt.nombre,
    pt.precio,
    pt.estado,
    m.id_material,
    m.nombre,
    m.categoria,
    m.color,
    pm.cantidad_material,
    pr.id_proveedor,
    pr.nombre,
    b.id_bodega,
    b.nombre,
    m.cantidad_stock
ORDER BY
    pt.nombre ASC,
    m.nombre ASC;
    
# Consulta 5

#Total comprado por cada cliente
#Regla de negocio: conocer cuánto dinero ha gastado cada cliente y mostrar su nombre en mayúsculas.

SELECT
    UPPER(u.nombre) AS cliente,
    COUNT(DISTINCT p.id_pedido) AS cantidad_pedidos,
    SUM(dp.cantidad * dp.precio_unitario) AS total_comprado
FROM usuario AS u
INNER JOIN rol AS r
    ON u.id_rol = r.id_rol
INNER JOIN pedido AS p
    ON u.id_usuario = p.id_usuario
INNER JOIN detalle_producto AS dp
    ON p.id_pedido = dp.id_pedido
INNER JOIN producto_talla AS pta
    ON dp.id_producto_talla = pta.id_producto_talla
INNER JOIN producto_terminado AS pt
    ON pta.id_producto = pt.id_producto
WHERE r.nombre_rol = 'Cliente'
GROUP BY
    u.id_usuario,
    u.nombre
ORDER BY
    total_comprado DESC;