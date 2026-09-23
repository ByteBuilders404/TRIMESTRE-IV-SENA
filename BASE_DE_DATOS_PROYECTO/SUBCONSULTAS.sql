##Productos que tienen alguna talla con stock bajo
#Regla de negocio: identificar productos terminados que tengan al menos una talla con menos de 10 unidades disponibles.

SELECT
    pt.id_producto,
    UPPER(pt.nombre) AS producto,
    pt.precio,
    pt.estado
FROM producto_terminado AS pt
WHERE pt.id_producto IN (
    SELECT DISTINCT pta.id_producto
    FROM producto_talla AS pta
    WHERE pta.stock < 30
)
ORDER BY pt.nombre ASC;

-- Usuarios cuyo gasto total en pedidos supera el promedio general de gasto
--    por usuario. Sirve para identificar "clientes premium".
-- ----------------------------------------------------------------------------
SELECT
    u.id_usuario,
    u.nombre,
    u.correo,
    (
        SELECT SUM(p.total)
        FROM pedido p
        WHERE p.id_usuario = u.id_usuario
    ) AS total_gastado
FROM usuario u
WHERE (
        SELECT SUM(p.total)
        FROM pedido p
        WHERE p.id_usuario = u.id_usuario
      ) > (
        SELECT AVG(total_por_usuario)
        FROM (
            SELECT SUM(p2.total) AS total_por_usuario
            FROM pedido p2
            GROUP BY p2.id_usuario
        ) AS sub_totales
      )
ORDER BY total_gastado DESC;

-- ----------------------------------------------------------------------------
--    Productos terminados que NUNCA han sido incluidos en ningún pedido
--    (a través de ninguna de sus tallas). Útil para detectar catálogo muerto.
-- ----------------------------------------------------------------------------
SELECT
    pt.id_producto,
    pt.nombre,
    pt.categoria,
    pt.precio,
    pt.estado
FROM producto_terminado pt
WHERE NOT EXISTS (
    SELECT 1
    FROM producto_talla pta
    JOIN detalle_producto dp ON dp.id_producto_talla = pta.id_producto_talla
    WHERE pta.id_producto = pt.id_producto
);

#Esta consulta identifica al cliente que más pedidos ha realizado en toda la historia del sistema
# (el usuario con mayor número de registros en la tabla pedido), mostrando su nombre, correo y cuántos pedidos tiene en total.

SELECT
    u.id_usuario,
    u.nombre,
    u.correo,
    (
        SELECT COUNT(*)
        FROM pedido AS p
        WHERE p.id_usuario = u.id_usuario
    ) AS cantidad_pedidos
FROM usuario AS u
WHERE u.id_usuario = (
    SELECT p2.id_usuario
    FROM pedido AS p2
    GROUP BY p2.id_usuario
    ORDER BY COUNT(*) DESC
    LIMIT 1
);


#Identificar el producto que genera el mayor ingreso total a partir de las ventas realizadas.


SELECT
    pterm.id_producto,
    pterm.nombre,
    SUM(dp.cantidad * dp.precio_unitario) AS ingresos
FROM producto_terminado pterm
JOIN producto_talla pta   ON pta.id_producto = pterm.id_producto
JOIN detalle_producto dp  ON dp.id_producto_talla = pta.id_producto_talla
WHERE pterm.id_producto = (
    SELECT pta2.id_producto
    FROM detalle_producto dp2
    JOIN producto_talla pta2 ON pta2.id_producto_talla = dp2.id_producto_talla
    GROUP BY pta2.id_producto
    ORDER BY SUM(dp2.cantidad * dp2.precio_unitario) DESC
    LIMIT 1
)
GROUP BY pterm.id_producto, pterm.nombre;