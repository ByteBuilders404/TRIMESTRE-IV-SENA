CREATE DATABASE  IF NOT EXISTS `bd_gestion_pedidos` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */;
USE `bd_gestion_pedidos`;
-- MySQL dump 10.13  Distrib 8.0.46, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: bd_gestion_pedidos
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `auditoria`
--

DROP TABLE IF EXISTS `auditoria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auditoria` (
  `id_auditoria` int(11) NOT NULL AUTO_INCREMENT,
  `modulo` varchar(50) NOT NULL,
  `accion` varchar(50) NOT NULL,
  `descripcion` varchar(500) DEFAULT NULL,
  `fecha` datetime DEFAULT current_timestamp(),
  `id_registro` int(11) DEFAULT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_auditoria`),
  KEY `idx_auditoria_usuario` (`id_usuario`),
  KEY `idx_auditoria_modulo` (`modulo`),
  KEY `idx_auditoria_fecha` (`fecha`),
  CONSTRAINT `fk_auditoria_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auditoria`
--

LOCK TABLES `auditoria` WRITE;
/*!40000 ALTER TABLE `auditoria` DISABLE KEYS */;
INSERT INTO `auditoria` VALUES (1,'Pedidos','Cambio de estado','El pedido #1 cambio de Pendiente a Entregado','2026-09-22 20:23:07',1,6),(2,'Pedidos','Cambio de estado','El pedido #2 cambio de Pendiente a Entregado','2026-09-22 20:23:07',2,7),(3,'Pedidos','Cambio de estado','El pedido #3 cambio de Pendiente a Entregado','2026-09-22 20:23:07',3,8),(4,'Pedidos','Cambio de estado','El pedido #4 cambio de Pendiente a Entregado','2026-09-22 20:23:07',4,9),(5,'Pedidos','Cambio de estado','El pedido #5 cambio de Pendiente a Entregado','2026-09-22 20:23:07',5,10),(6,'Pedidos','Cambio de estado','El pedido #6 cambio de Pendiente a Entregado','2026-09-22 20:23:07',6,11),(7,'Pedidos','Cambio de estado','El pedido #7 cambio de Pendiente a Entregado','2026-09-22 20:23:07',7,12),(8,'Pedidos','Cambio de estado','El pedido #8 cambio de Pendiente a Entregado','2026-09-22 20:23:07',8,13),(9,'Pedidos','Cambio de estado','El pedido #9 cambio de Pendiente a Entregado','2026-09-22 20:23:07',9,14),(10,'Pedidos','Cambio de estado','El pedido #10 cambio de Pendiente a Entregado','2026-09-22 20:23:07',10,15),(11,'Pedidos','Cambio de estado','El pedido #11 cambio de Pendiente a Enviado','2026-09-22 20:23:07',11,16),(12,'Pedidos','Cambio de estado','El pedido #12 cambio de Pendiente a Enviado','2026-09-22 20:23:07',12,17),(13,'Pedidos','Cambio de estado','El pedido #13 cambio de Pendiente a Enviado','2026-09-22 20:23:07',13,18),(14,'Pedidos','Cambio de estado','El pedido #14 cambio de Pendiente a Enviado','2026-09-22 20:23:07',14,19),(15,'Pedidos','Cambio de estado','El pedido #15 cambio de Pendiente a Enviado','2026-09-22 20:23:07',15,20),(16,'Pedidos','Cambio de estado','El pedido #16 cambio de Pendiente a Enviado','2026-09-22 20:23:07',16,21),(17,'Pedidos','Cambio de estado','El pedido #17 cambio de Pendiente a Enviado','2026-09-22 20:23:07',17,22),(18,'Pedidos','Cambio de estado','El pedido #18 cambio de Pendiente a Enviado','2026-09-22 20:23:07',18,23),(19,'Pedidos','Cambio de estado','El pedido #19 cambio de Pendiente a Enviado','2026-09-22 20:23:07',19,24),(20,'Pedidos','Cambio de estado','El pedido #20 cambio de Pendiente a Enviado','2026-09-22 20:23:07',20,25),(21,'Pedidos','Cambio de estado','El pedido #21 cambio de Pendiente a Revisado','2026-09-22 20:23:07',21,26),(22,'Pedidos','Cambio de estado','El pedido #22 cambio de Pendiente a Revisado','2026-09-22 20:23:07',22,27),(23,'Pedidos','Cambio de estado','El pedido #23 cambio de Pendiente a Revisado','2026-09-22 20:23:07',23,28),(24,'Pedidos','Cambio de estado','El pedido #24 cambio de Pendiente a Revisado','2026-09-22 20:23:07',24,29),(25,'Pedidos','Cambio de estado','El pedido #25 cambio de Pendiente a Revisado','2026-09-22 20:23:07',25,30),(26,'Pedidos','Cambio de estado','El pedido #26 cambio de Pendiente a Revisado','2026-09-22 20:23:07',26,6),(27,'Pedidos','Cambio de estado','El pedido #27 cambio de Pendiente a Revisado','2026-09-22 20:23:07',27,7),(28,'Pedidos','Cambio de estado','El pedido #28 cambio de Pendiente a Revisado','2026-09-22 20:23:07',28,8),(29,'Pedidos','Cambio de estado','El pedido #29 cambio de Pendiente a Revisado','2026-09-22 20:23:07',29,9),(30,'Pedidos','Cambio de estado','El pedido #30 cambio de Pendiente a Revisado','2026-09-22 20:23:07',30,10);
/*!40000 ALTER TABLE `auditoria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bodega`
--

DROP TABLE IF EXISTS `bodega`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bodega` (
  `id_bodega` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `ubicacion` varchar(200) DEFAULT NULL,
  `capacidad` int(11) DEFAULT NULL,
  `descripcion` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id_bodega`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bodega`
--

LOCK TABLES `bodega` WRITE;
/*!40000 ALTER TABLE `bodega` DISABLE KEYS */;
INSERT INTO `bodega` VALUES (1,'Bodega Principal','Bogotá - Zona Industrial',5000,'Almacenamiento principal de materiales'),(2,'Bodega Textil','Bogotá - Puente Aranda',3500,'Almacenamiento de telas'),(3,'Bodega Insumos','Bogotá - Fontibon',2500,'Almacenamiento de insumos de confección'),(4,'Bodega Distribución','Bogotá - Montevideo',4000,'Almacenamiento para despacho');
/*!40000 ALTER TABLE `bodega` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detalle_producto`
--

DROP TABLE IF EXISTS `detalle_producto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `detalle_producto` (
  `id_detalle_producto` int(11) NOT NULL AUTO_INCREMENT,
  `cantidad` int(11) NOT NULL,
  `precio_unitario` decimal(12,2) NOT NULL,
  `id_pedido` int(11) NOT NULL,
  `id_producto_talla` int(11) NOT NULL,
  PRIMARY KEY (`id_detalle_producto`),
  KEY `idx_detalle_pedido` (`id_pedido`),
  KEY `idx_detalle_producto_talla` (`id_producto_talla`),
  CONSTRAINT `fk_detalle_pedido` FOREIGN KEY (`id_pedido`) REFERENCES `pedido` (`id_pedido`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_detalle_producto_talla` FOREIGN KEY (`id_producto_talla`) REFERENCES `producto_talla` (`id_producto_talla`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detalle_producto`
--

LOCK TABLES `detalle_producto` WRITE;
/*!40000 ALTER TABLE `detalle_producto` DISABLE KEYS */;
INSERT INTO `detalle_producto` VALUES (1,2,85000.00,1,1),(2,3,88000.00,2,2),(3,2,87000.00,3,3),(4,4,55000.00,4,4),(5,3,52000.00,5,5),(6,2,54000.00,6,6),(7,3,65000.00,7,7),(8,2,68000.00,8,8),(9,4,67000.00,9,9),(10,2,110000.00,10,10),(11,3,115000.00,11,11),(12,2,125000.00,12,12),(13,4,45000.00,13,13),(14,3,42000.00,14,14),(15,2,60000.00,15,15),(16,3,72000.00,16,16),(17,4,38000.00,17,17),(18,2,58000.00,18,18),(19,3,78000.00,19,19),(20,2,70000.00,20,20),(21,3,98000.00,21,21),(22,2,105000.00,22,22),(23,4,62000.00,23,23),(24,3,75000.00,24,24),(25,2,118000.00,25,25),(26,3,80000.00,26,26),(27,2,120000.00,27,27),(28,4,50000.00,28,28),(29,3,60000.00,29,29),(30,2,125000.00,30,30);
/*!40000 ALTER TABLE `detalle_producto` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER trg_validar_stock_pedido
BEFORE INSERT ON detalle_producto
FOR EACH ROW
BEGIN
    DECLARE v_stock INT;

    SELECT stock
    INTO v_stock
    FROM producto_talla
    WHERE id_producto_talla = NEW.id_producto_talla;

    IF v_stock IS NULL THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'El producto y talla no existen';
    END IF;

    IF NEW.cantidad <= 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'La cantidad del pedido debe ser mayor que cero';
    END IF;

    IF NEW.cantidad > v_stock THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Stock insuficiente para realizar el pedido';
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER trg_descontar_stock_pedido
AFTER INSERT ON detalle_producto
FOR EACH ROW
BEGIN
    UPDATE producto_talla
    SET stock = stock - NEW.cantidad
    WHERE id_producto_talla = NEW.id_producto_talla;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER trg_actualizar_total_pedido_insert
AFTER INSERT ON detalle_producto
FOR EACH ROW
BEGIN
    UPDATE pedido
    SET total = (
        SELECT COALESCE(
            SUM(cantidad * precio_unitario),
            0
        )
        FROM detalle_producto
        WHERE id_pedido = NEW.id_pedido
    )
    WHERE id_pedido = NEW.id_pedido;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER trg_validar_stock_pedido_update
BEFORE UPDATE ON detalle_producto
FOR EACH ROW
BEGIN
    DECLARE v_stock INT;

    SELECT stock
    INTO v_stock
    FROM producto_talla
    WHERE id_producto_talla = NEW.id_producto_talla;

    IF v_stock IS NULL THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'El producto y talla no existen';
    END IF;

    IF NEW.cantidad <= 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'La cantidad debe ser mayor que cero';
    END IF;

    IF NEW.id_producto_talla = OLD.id_producto_talla THEN

        IF NEW.cantidad > OLD.cantidad + v_stock THEN
            SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Stock insuficiente para aumentar la cantidad';
        END IF;

    ELSE

        IF NEW.cantidad > v_stock THEN
            SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Stock insuficiente para el nuevo producto';
        END IF;

    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER trg_actualizar_detalle_pedido
AFTER UPDATE ON detalle_producto
FOR EACH ROW
BEGIN

    IF OLD.id_producto_talla = NEW.id_producto_talla THEN

        UPDATE producto_talla
        SET stock = stock + OLD.cantidad - NEW.cantidad
        WHERE id_producto_talla = NEW.id_producto_talla;

    ELSE

        UPDATE producto_talla
        SET stock = stock + OLD.cantidad
        WHERE id_producto_talla = OLD.id_producto_talla;

        UPDATE producto_talla
        SET stock = stock - NEW.cantidad
        WHERE id_producto_talla = NEW.id_producto_talla;

    END IF;

    UPDATE pedido
    SET total = (
        SELECT COALESCE(
            SUM(cantidad * precio_unitario),
            0
        )
        FROM detalle_producto
        WHERE id_pedido = NEW.id_pedido
    )
    WHERE id_pedido = NEW.id_pedido;

END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER trg_restaurar_stock_pedido
AFTER DELETE ON detalle_producto
FOR EACH ROW
BEGIN

    UPDATE producto_talla
    SET stock = stock + OLD.cantidad
    WHERE id_producto_talla = OLD.id_producto_talla;

    UPDATE pedido
    SET total = (
        SELECT COALESCE(
            SUM(cantidad * precio_unitario),
            0
        )
        FROM detalle_producto
        WHERE id_pedido = OLD.id_pedido
    )
    WHERE id_pedido = OLD.id_pedido;

END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `material`
--

DROP TABLE IF EXISTS `material`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `material` (
  `id_material` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `codigo_referencia` varchar(50) DEFAULT NULL,
  `color` varchar(50) DEFAULT NULL,
  `cantidad_stock` decimal(12,2) DEFAULT 0.00,
  `categoria` varchar(80) DEFAULT NULL,
  `unidad_medida` varchar(30) DEFAULT 'Unidad',
  `stock_minimo` decimal(12,2) DEFAULT 0.00,
  `id_bodega` int(11) DEFAULT NULL,
  `id_proveedor` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_material`),
  UNIQUE KEY `uq_material_codigo` (`codigo_referencia`),
  KEY `idx_material_bodega` (`id_bodega`),
  KEY `idx_material_proveedor` (`id_proveedor`),
  CONSTRAINT `fk_material_bodega` FOREIGN KEY (`id_bodega`) REFERENCES `bodega` (`id_bodega`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_material_proveedor` FOREIGN KEY (`id_proveedor`) REFERENCES `proveedor` (`id_proveedor`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `material`
--

LOCK TABLES `material` WRITE;
/*!40000 ALTER TABLE `material` DISABLE KEYS */;
INSERT INTO `material` VALUES (1,'Tela Dril Industrial','TEL-001','Azul',850.00,'Tela','Metro',100.00,2,1),(2,'Tela Dril Industrial','TEL-002','Negro',720.00,'Tela','Metro',100.00,2,1),(3,'Tela Dril Industrial','TEL-003','Gris',650.00,'Tela','Metro',100.00,2,1),(4,'Tela Antifluido','TEL-004','Azul',500.00,'Tela','Metro',80.00,2,1),(5,'Tela Antifluido','TEL-005','Blanco',480.00,'Tela','Metro',80.00,2,1),(6,'Tela Reflectiva','TEL-006','Amarillo',300.00,'Tela','Metro',50.00,2,1),(7,'Hilo Poliester','HIL-001','Azul',120.00,'Hilo','Cono',20.00,3,3),(8,'Hilo Poliester','HIL-002','Negro',150.00,'Hilo','Cono',20.00,3,3),(9,'Hilo Poliester','HIL-003','Blanco',100.00,'Hilo','Cono',20.00,3,3),(10,'Hilo Poliester','HIL-004','Rojo',80.00,'Hilo','Cono',15.00,3,3),(11,'Boton Industrial','BOT-001','Negro',2500.00,'Boton','Unidad',300.00,3,3),(12,'Boton Industrial','BOT-002','Blanco',2200.00,'Boton','Unidad',300.00,3,3),(13,'Cierre Industrial','CIE-001','Negro',900.00,'Cierre','Unidad',100.00,3,5),(14,'Cierre Industrial','CIE-002','Azul',750.00,'Cierre','Unidad',100.00,3,5),(15,'Cierre Industrial','CIE-003','Gris',600.00,'Cierre','Unidad',100.00,3,5),(16,'Cinta Reflectiva','CIN-001','Plata',450.00,'Cinta','Metro',50.00,3,5),(17,'Cinta Reflectiva','CIN-002','Amarillo',350.00,'Cinta','Metro',50.00,3,5),(18,'Elastico Industrial','ELA-001','Negro',300.00,'Elastico','Metro',40.00,3,2),(19,'Elastico Industrial','ELA-002','Blanco',280.00,'Elastico','Metro',40.00,3,2),(20,'Velcro Industrial','VEL-001','Negro',400.00,'Velcro','Metro',50.00,3,2),(21,'Velcro Industrial','VEL-002','Verde',300.00,'Velcro','Metro',50.00,3,2),(22,'Entretela Industrial','ENT-001','Blanco',500.00,'Entretela','Metro',80.00,2,4),(23,'Entretela Industrial','ENT-002','Negro',400.00,'Entretela','Metro',80.00,2,4),(24,'Tela Oxford','OXF-001','Negro',450.00,'Tela','Metro',70.00,2,1),(25,'Tela Oxford','OXF-002','Azul',420.00,'Tela','Metro',70.00,2,1),(26,'Tela Gabardina','GAB-001','Caqui',380.00,'Tela','Metro',60.00,2,1),(27,'Tela Gabardina','GAB-002','Gris',350.00,'Tela','Metro',60.00,2,1),(28,'Cordón Industrial','COR-001','Negro',700.00,'Cordón','Metro',100.00,3,2),(29,'Banda Elástica','BAN-001','Negro',500.00,'Banda','Metro',70.00,3,2),(30,'Etiqueta Textil','ETI-001','Blanco',5000.00,'Etiqueta','Unidad',500.00,3,4);
/*!40000 ALTER TABLE `material` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `movimiento_inventario`
--

DROP TABLE IF EXISTS `movimiento_inventario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `movimiento_inventario` (
  `id_movimiento` int(11) NOT NULL AUTO_INCREMENT,
  `tipo_movimiento` varchar(20) NOT NULL,
  `fecha` datetime DEFAULT current_timestamp(),
  `cantidad` decimal(12,2) NOT NULL,
  `saldo_nuevo` decimal(12,2) NOT NULL,
  `observacion` varchar(255) DEFAULT NULL,
  `id_material` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  PRIMARY KEY (`id_movimiento`),
  KEY `idx_movimiento_material` (`id_material`),
  KEY `idx_movimiento_usuario` (`id_usuario`),
  KEY `idx_movimiento_fecha` (`fecha`),
  CONSTRAINT `fk_movimiento_material` FOREIGN KEY (`id_material`) REFERENCES `material` (`id_material`) ON UPDATE CASCADE,
  CONSTRAINT `fk_movimiento_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `movimiento_inventario`
--

LOCK TABLES `movimiento_inventario` WRITE;
/*!40000 ALTER TABLE `movimiento_inventario` DISABLE KEYS */;
INSERT INTO `movimiento_inventario` VALUES (1,'Entrada','2026-08-01 08:00:00',100.00,850.00,'Ingreso de tela industrial',1,3),(2,'Salida','2026-08-02 09:00:00',30.00,720.00,'Salida para producción',2,4),(3,'Entrada','2026-08-03 10:00:00',50.00,650.00,'Ingreso de material',3,5),(4,'Salida','2026-08-04 11:00:00',20.00,500.00,'Consumo de producción',4,3),(5,'Entrada','2026-08-05 12:00:00',80.00,480.00,'Recepción de tela',5,4),(6,'Salida','2026-08-06 13:00:00',15.00,300.00,'Salida para confección',6,5),(7,'Entrada','2026-08-07 14:00:00',20.00,120.00,'Ingreso de hilo',7,3),(8,'Salida','2026-08-08 15:00:00',10.00,150.00,'Consumo de hilo',8,4),(9,'Entrada','2026-08-09 08:00:00',25.00,100.00,'Ingreso de hilo blanco',9,5),(10,'Salida','2026-08-10 09:00:00',8.00,80.00,'Consumo de hilo rojo',10,3),(11,'Entrada','2026-08-11 10:00:00',500.00,2500.00,'Ingreso de botones',11,4),(12,'Salida','2026-08-12 11:00:00',150.00,2200.00,'Salida de botones',12,5),(13,'Entrada','2026-08-13 12:00:00',100.00,900.00,'Ingreso de cierres',13,3),(14,'Salida','2026-08-14 13:00:00',50.00,750.00,'Salida de cierres',14,4),(15,'Entrada','2026-08-15 14:00:00',80.00,600.00,'Ingreso de cierres',15,5),(16,'Salida','2026-08-16 15:00:00',30.00,450.00,'Consumo de cinta',16,3),(17,'Entrada','2026-08-17 08:30:00',50.00,350.00,'Ingreso de cinta reflectiva',17,4),(18,'Salida','2026-08-18 09:30:00',20.00,300.00,'Salida de elastico',18,5),(19,'Entrada','2026-08-19 10:30:00',40.00,280.00,'Ingreso de elastico',19,3),(20,'Salida','2026-08-20 11:30:00',25.00,400.00,'Consumo de velcro',20,4),(21,'Entrada','2026-08-21 12:30:00',50.00,300.00,'Ingreso de velcro',21,5),(22,'Salida','2026-08-22 13:30:00',40.00,500.00,'Consumo de entretela',22,3),(23,'Entrada','2026-08-23 14:30:00',30.00,400.00,'Ingreso de entretela',23,4),(24,'Salida','2026-08-24 15:30:00',25.00,450.00,'Salida de tela Oxford',24,5),(25,'Entrada','2026-08-25 08:30:00',40.00,420.00,'Ingreso de tela Oxford',25,3),(26,'Salida','2026-08-26 09:30:00',20.00,380.00,'Consumo de gabardina',26,4),(27,'Entrada','2026-08-27 10:30:00',30.00,350.00,'Ingreso de gabardina',27,5),(28,'Salida','2026-08-28 11:30:00',50.00,700.00,'Salida de cordon',28,3),(29,'Entrada','2026-08-29 12:30:00',60.00,500.00,'Ingreso de banda elastica',29,4),(30,'Salida','2026-08-30 13:30:00',200.00,5000.00,'Salida de etiquetas textiles',30,5);
/*!40000 ALTER TABLE `movimiento_inventario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pedido`
--

DROP TABLE IF EXISTS `pedido`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pedido` (
  `id_pedido` int(11) NOT NULL AUTO_INCREMENT,
  `fecha` datetime DEFAULT current_timestamp(),
  `estado` varchar(30) NOT NULL DEFAULT 'Pendiente',
  `total` decimal(12,2) DEFAULT 0.00,
  `observaciones` varchar(500) DEFAULT NULL,
  `id_usuario` int(11) NOT NULL,
  PRIMARY KEY (`id_pedido`),
  KEY `idx_pedido_usuario` (`id_usuario`),
  KEY `idx_pedido_estado` (`estado`),
  KEY `idx_pedido_fecha` (`fecha`),
  CONSTRAINT `fk_pedido_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedido`
--

LOCK TABLES `pedido` WRITE;
/*!40000 ALTER TABLE `pedido` DISABLE KEYS */;
INSERT INTO `pedido` VALUES (1,'2026-08-01 08:30:00','Entregado',170000.00,'Pedido empresarial de dotacion',6),(2,'2026-08-02 09:15:00','Entregado',264000.00,'Solicitud de uniformes industriales',7),(3,'2026-08-03 10:00:00','Entregado',174000.00,'Pedido para personal operativo',8),(4,'2026-08-04 11:20:00','Entregado',220000.00,'Dotacion mensual',9),(5,'2026-08-05 14:30:00','Entregado',156000.00,'Pedido de overoles',10),(6,'2026-08-06 15:10:00','Entregado',108000.00,'Pedido empresarial',11),(7,'2026-08-07 08:45:00','Entregado',195000.00,'Dotacion de seguridad',12),(8,'2026-08-08 09:40:00','Entregado',136000.00,'Uniformes para empleados',13),(9,'2026-08-09 10:25:00','Entregado',268000.00,'Pedido de camisas',14),(10,'2026-08-10 11:50:00','Entregado',220000.00,'Pedido de pantalones',15),(11,'2026-08-11 13:15:00','Enviado',345000.00,'Dotacion industrial',16),(12,'2026-08-12 14:45:00','Enviado',250000.00,'Pedido de chaquetas',17),(13,'2026-08-13 08:20:00','Enviado',180000.00,'Pedido de chalecos',18),(14,'2026-08-14 09:35:00','Enviado',126000.00,'Dotacion de personal',19),(15,'2026-08-15 10:10:00','Enviado',120000.00,'Pedido empresarial',20),(16,'2026-08-16 11:25:00','Enviado',216000.00,'Uniformes de trabajo',21),(17,'2026-08-17 12:40:00','Enviado',152000.00,'Pedido industrial',22),(18,'2026-08-18 14:00:00','Enviado',116000.00,'Dotacion de empleados',23),(19,'2026-08-19 15:20:00','Enviado',234000.00,'Pedido de uniformes',24),(20,'2026-08-20 08:10:00','Enviado',140000.00,'Pedido de pantalon industrial',25),(21,'2026-08-21 09:25:00','Revisado',294000.00,'Pedido de overoles',26),(22,'2026-08-22 10:40:00','Revisado',210000.00,'Dotacion empresarial',27),(23,'2026-08-23 11:55:00','Revisado',248000.00,'Pedido de camisas',28),(24,'2026-08-24 13:10:00','Revisado',225000.00,'Pedido industrial',29),(25,'2026-08-25 14:25:00','Revisado',236000.00,'Pedido de chaquetas',30),(26,'2026-08-26 15:40:00','Revisado',240000.00,'Dotacion completa',6),(27,'2026-08-27 08:35:00','Revisado',240000.00,'Pedido de chalecos',7),(28,'2026-08-28 09:50:00','Revisado',200000.00,'Pedido de uniformes',8),(29,'2026-08-29 11:05:00','Revisado',180000.00,'Dotacion industrial',9),(30,'2026-08-30 12:20:00','Revisado',250000.00,'Pedido empresarial',10);
/*!40000 ALTER TABLE `pedido` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER trg_auditoria_estado_pedido
AFTER UPDATE ON pedido
FOR EACH ROW
BEGIN

    IF NOT (OLD.estado <=> NEW.estado) THEN

        INSERT INTO auditoria
        (
            modulo,
            accion,
            descripcion,
            id_registro,
            id_usuario
        )
        VALUES
        (
            'Pedidos',
            'Cambio de estado',
            CONCAT(
                'El pedido #',
                NEW.id_pedido,
                ' cambio de ',
                OLD.estado,
                ' a ',
                NEW.estado
            ),
            NEW.id_pedido,
            NEW.id_usuario
        );

    END IF;

END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `pqrs`
--

DROP TABLE IF EXISTS `pqrs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pqrs` (
  `id_pqrs` int(11) NOT NULL AUTO_INCREMENT,
  `tipo` varchar(30) NOT NULL,
  `descripcion` text NOT NULL,
  `archivo_adjunto` varchar(255) DEFAULT NULL,
  `fecha` datetime DEFAULT current_timestamp(),
  `estado` varchar(30) NOT NULL DEFAULT 'Pendiente',
  `anonimo` tinyint(1) DEFAULT 0,
  `id_usuario` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_pqrs`),
  KEY `idx_pqrs_usuario` (`id_usuario`),
  KEY `idx_pqrs_estado` (`estado`),
  KEY `idx_pqrs_fecha` (`fecha`),
  CONSTRAINT `fk_pqrs_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pqrs`
--

LOCK TABLES `pqrs` WRITE;
/*!40000 ALTER TABLE `pqrs` DISABLE KEYS */;
INSERT INTO `pqrs` VALUES (1,'Petición','Solicitud de información sobre tiempos de entrega.',NULL,'2026-08-01 09:00:00','Pendiente',0,6),(2,'Queja','Retraso en la entrega de una dotacion anterior.',NULL,'2026-08-02 10:00:00','Recibida',0,7),(3,'Reclamo','Solicitud de revisión de talla recibida.',NULL,'2026-08-03 11:00:00','En revisión',0,8),(4,'Sugerencia','Sugerencia para agregar nuevos colores.',NULL,'2026-08-04 12:00:00','Pendiente',0,9),(5,'Petición','Solicitud de catálogo actualizado.',NULL,'2026-08-05 13:00:00','Recibida',0,10),(6,'Queja','Inconformidad con el tiempo de respuesta.',NULL,'2026-08-06 14:00:00','En revisión',0,11),(7,'Reclamo','Producto recibido con talla incorrecta.',NULL,'2026-08-07 09:30:00','Pendiente',0,12),(8,'Sugerencia','Agregar más opciones de productos.',NULL,'2026-08-08 10:30:00','Recibida',0,13),(9,'Petición','Solicitud de cotización empresarial.',NULL,'2026-08-09 11:30:00','En revisión',0,14),(10,'Queja','Inconformidad con el empaque.',NULL,'2026-08-10 12:30:00','Pendiente',0,15),(11,'Reclamo','Solicitud de cambio de producto.',NULL,'2026-08-11 13:30:00','Recibida',0,16),(12,'Sugerencia','Sugerencia para mejorar el catálogo.',NULL,'2026-08-12 14:30:00','En revisión',0,17),(13,'Petición','Solicitud de disponibilidad de tallas.',NULL,'2026-08-13 09:15:00','Pendiente',0,18),(14,'Queja','Retraso en la confirmación del pedido.',NULL,'2026-08-14 10:15:00','Recibida',0,19),(15,'Reclamo','Producto recibido con defecto de confección.',NULL,'2026-08-15 11:15:00','En revisión',0,20),(16,'Sugerencia','Incluir más productos de seguridad.',NULL,'2026-08-16 12:15:00','Pendiente',0,21),(17,'Petición','Solicitud de información sobre materiales.',NULL,'2026-08-17 13:15:00','Recibida',0,22),(18,'Queja','Demora en respuesta a solicitud.',NULL,'2026-08-18 14:15:00','En revisión',0,23),(19,'Reclamo','Solicitud de revisión de pedido.',NULL,'2026-08-19 09:45:00','Pendiente',0,24),(20,'Sugerencia','Agregar opción de personalización.',NULL,'2026-08-20 10:45:00','Recibida',0,25),(21,'Petición','Solicitud de tiempos de confección.',NULL,'2026-08-21 11:45:00','En revisión',0,26),(22,'Queja','Inconformidad con una entrega.',NULL,'2026-08-22 12:45:00','Pendiente',0,27),(23,'Reclamo','Solicitud de cambio de talla.',NULL,'2026-08-23 13:45:00','Recibida',0,28),(24,'Sugerencia','Sugerencia para nuevos diseños.',NULL,'2026-08-24 14:45:00','En revisión',0,29),(25,'Petición','Solicitud de disponibilidad de productos.',NULL,'2026-08-25 09:20:00','Pendiente',0,30),(26,'Queja','Demora en entrega del pedido.',NULL,'2026-08-26 10:20:00','Recibida',0,6),(27,'Reclamo','Producto con inconveniente de fabricación.',NULL,'2026-08-27 11:20:00','En revisión',0,7),(28,'Sugerencia','Sugerencia sobre nuevos materiales.',NULL,'2026-08-28 12:20:00','Pendiente',0,8),(29,'Petición','Solicitud de nueva cotización.',NULL,'2026-08-29 13:20:00','Recibida',0,9),(30,'Queja','Inconformidad con el servicio recibido.',NULL,'2026-08-30 14:20:00','En revisión',0,10);
/*!40000 ALTER TABLE `pqrs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `producto_material`
--

DROP TABLE IF EXISTS `producto_material`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `producto_material` (
  `id_producto_material` int(11) NOT NULL AUTO_INCREMENT,
  `cantidad_material` decimal(12,2) NOT NULL,
  `id_producto` int(11) NOT NULL,
  `id_material` int(11) NOT NULL,
  PRIMARY KEY (`id_producto_material`),
  UNIQUE KEY `uq_producto_material` (`id_producto`,`id_material`),
  KEY `idx_producto_material_producto` (`id_producto`),
  KEY `idx_producto_material_material` (`id_material`),
  CONSTRAINT `fk_producto_material_material` FOREIGN KEY (`id_material`) REFERENCES `material` (`id_material`) ON UPDATE CASCADE,
  CONSTRAINT `fk_producto_material_producto` FOREIGN KEY (`id_producto`) REFERENCES `producto_terminado` (`id_producto`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `producto_material`
--

LOCK TABLES `producto_material` WRITE;
/*!40000 ALTER TABLE `producto_material` DISABLE KEYS */;
INSERT INTO `producto_material` VALUES (1,3.50,1,1),(2,3.50,2,2),(3,3.50,3,3),(4,2.20,4,1),(5,2.20,5,5),(6,2.20,6,3),(7,2.50,7,1),(8,2.50,8,2),(9,2.50,9,3),(10,3.00,10,1),(11,3.00,11,2),(12,3.20,12,6),(13,1.50,13,6),(14,1.50,14,1),(15,2.00,15,5),(16,2.00,16,4),(17,1.20,17,5),(18,1.80,18,1),(19,2.70,19,2),(20,2.50,20,3),(21,4.00,21,4),(22,4.00,22,6),(23,2.30,23,24),(24,2.70,24,25),(25,3.00,25,24),(26,2.80,26,26),(27,3.20,27,27),(28,1.70,28,2),(29,2.00,29,1),(30,4.50,30,1);
/*!40000 ALTER TABLE `producto_material` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `producto_talla`
--

DROP TABLE IF EXISTS `producto_talla`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `producto_talla` (
  `id_producto_talla` int(11) NOT NULL AUTO_INCREMENT,
  `stock` int(11) NOT NULL DEFAULT 0,
  `id_producto` int(11) NOT NULL,
  `id_talla` int(11) NOT NULL,
  PRIMARY KEY (`id_producto_talla`),
  UNIQUE KEY `uq_producto_talla` (`id_producto`,`id_talla`),
  KEY `idx_producto_talla_talla` (`id_talla`),
  CONSTRAINT `fk_producto_talla_producto` FOREIGN KEY (`id_producto`) REFERENCES `producto_terminado` (`id_producto`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_producto_talla_talla` FOREIGN KEY (`id_talla`) REFERENCES `talla` (`id_talla`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `producto_talla`
--

LOCK TABLES `producto_talla` WRITE;
/*!40000 ALTER TABLE `producto_talla` DISABLE KEYS */;
INSERT INTO `producto_talla` VALUES (1,48,1,3),(2,42,2,3),(3,38,3,4),(4,56,4,3),(5,52,5,3),(6,48,6,4),(7,42,7,3),(8,38,8,3),(9,46,9,4),(10,33,10,4),(11,27,11,3),(12,38,12,4),(13,56,13,3),(14,52,14,3),(15,43,15,4),(16,47,16,3),(17,41,17,3),(18,58,18,4),(19,37,19,3),(20,48,20,3),(21,32,21,4),(22,38,22,3),(23,46,23,3),(24,42,24,4),(25,28,25,3),(26,32,26,4),(27,28,27,3),(28,41,28,3),(29,47,29,4),(30,28,30,3);
/*!40000 ALTER TABLE `producto_talla` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `producto_terminado`
--

DROP TABLE IF EXISTS `producto_terminado`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `producto_terminado` (
  `id_producto` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(120) NOT NULL,
  `descripcion` varchar(500) DEFAULT NULL,
  `categoria` varchar(80) DEFAULT NULL,
  `precio` decimal(12,2) NOT NULL,
  `imagen` varchar(255) DEFAULT NULL,
  `tiempo_confeccion_minutos` int(11) DEFAULT NULL,
  `estado` varchar(20) DEFAULT 'Disponible',
  PRIMARY KEY (`id_producto`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `producto_terminado`
--

LOCK TABLES `producto_terminado` WRITE;
/*!40000 ALTER TABLE `producto_terminado` DISABLE KEYS */;
INSERT INTO `producto_terminado` VALUES (1,'Overol Industrial Azul','Overol industrial de dril color azul','Overol',85000.00,'/assets/img/overol-azul.png',90,'Disponible'),(2,'Overol Industrial Negro','Overol industrial de dril color negro','Overol',88000.00,'/assets/img/overol-negro.png',90,'Disponible'),(3,'Overol Industrial Gris','Overol industrial de dril color gris','Overol',87000.00,'/assets/img/overol-gris.png',90,'Disponible'),(4,'Camisa Industrial Azul','Camisa de trabajo industrial color azul','Camisa',55000.00,'/assets/img/camisa-azul.png',60,'Disponible'),(5,'Camisa Industrial Blanca','Camisa de trabajo industrial color blanco','Camisa',52000.00,'/assets/img/camisa-blanca.png',60,'Disponible'),(6,'Camisa Industrial Gris','Camisa de trabajo industrial color gris','Camisa',54000.00,'/assets/img/camisa-gris.png',60,'Disponible'),(7,'Pantalon Industrial Azul','Pantalon industrial de dril color azul','Pantalon',65000.00,'/assets/img/pantalon-azul.png',70,'Disponible'),(8,'Pantalon Industrial Negro','Pantalon industrial de dril color negro','Pantalon',68000.00,'/assets/img/pantalon-negro.png',70,'Disponible'),(9,'Pantalon Industrial Gris','Pantalon industrial de dril color gris','Pantalon',67000.00,'/assets/img/pantalon-gris.png',70,'Disponible'),(10,'Chaqueta Industrial Azul','Chaqueta industrial para trabajo','Chaqueta',110000.00,'/assets/img/chaqueta-azul.png',120,'Disponible'),(11,'Chaqueta Industrial Negra','Chaqueta industrial color negro','Chaqueta',115000.00,'/assets/img/chaqueta-negra.png',120,'Disponible'),(12,'Chaqueta Reflectiva','Chaqueta industrial con material reflectivo','Chaqueta',125000.00,'/assets/img/chaqueta-reflectiva.png',130,'Disponible'),(13,'Chaleco Reflectivo','Chaleco de seguridad con cinta reflectiva','Chaleco',45000.00,'/assets/img/chaleco-reflectivo.png',45,'Disponible'),(14,'Chaleco Industrial Azul','Chaleco industrial de trabajo','Chaleco',42000.00,'/assets/img/chaleco-azul.png',45,'Disponible'),(15,'Bata Industrial Blanca','Bata industrial para personal operativo','Bata',60000.00,'/assets/img/bata-blanca.png',65,'Disponible'),(16,'Bata Antifluido','Bata fabricada en tela antifluido','Bata',72000.00,'/assets/img/bata-antifluido.png',70,'Disponible'),(17,'Mandil Industrial','Mandil industrial para labores operativas','Mandil',38000.00,'/assets/img/mandil.png',40,'Disponible'),(18,'Camisa Polo Industrial','Camisa tipo polo para dotacion empresarial','Camisa',58000.00,'/assets/img/polo.png',55,'Disponible'),(19,'Pantalon Cargo Industrial','Pantalon cargo con bolsillos laterales','Pantalon',78000.00,'/assets/img/cargo.png',80,'Disponible'),(20,'Sudadera Industrial','Sudadera industrial para trabajo operativo','Sudadera',70000.00,'/assets/img/sudadera.png',75,'Disponible'),(21,'Overol Antifluido','Overol industrial fabricado en material antifluido','Overol',98000.00,'/assets/img/overol-antifluido.png',100,'Disponible'),(22,'Overol Reflectivo','Overol industrial con cinta reflectiva','Overol',105000.00,'/assets/img/overol-reflectivo.png',105,'Disponible'),(23,'Camisa Oxford Industrial','Camisa industrial fabricada en tela Oxford','Camisa',62000.00,'/assets/img/camisa-oxford.png',65,'Disponible'),(24,'Pantalon Oxford Industrial','Pantalon industrial fabricado en tela Oxford','Pantalon',75000.00,'/assets/img/pantalon-oxford.png',75,'Disponible'),(25,'Chaqueta Oxford','Chaqueta industrial en tela Oxford','Chaqueta',118000.00,'/assets/img/chaqueta-oxford.png',125,'Disponible'),(26,'Pantalon Gabardina','Pantalon industrial en tela gabardina','Pantalon',80000.00,'/assets/img/pantalon-gabardina.png',80,'Disponible'),(27,'Chaqueta Gabardina','Chaqueta industrial en tela gabardina','Chaqueta',120000.00,'/assets/img/chaqueta-gabardina.png',125,'Disponible'),(28,'Chaleco Cargo','Chaleco industrial con bolsillos cargo','Chaleco',50000.00,'/assets/img/chaleco-cargo.png',50,'Disponible'),(29,'Camisa Corporativa','Camisa para dotacion corporativa empresarial','Camisa',60000.00,'/assets/img/camisa-corporativa.png',60,'Disponible'),(30,'Uniforme Industrial Completo','Conjunto de camisa y pantalon industrial','Uniforme',125000.00,'/assets/img/uniforme-completo.png',120,'Disponible');
/*!40000 ALTER TABLE `producto_terminado` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `proveedor`
--

DROP TABLE IF EXISTS `proveedor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `proveedor` (
  `id_proveedor` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(150) NOT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `correo` varchar(100) DEFAULT NULL,
  `direccion` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id_proveedor`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `proveedor`
--

LOCK TABLES `proveedor` WRITE;
/*!40000 ALTER TABLE `proveedor` DISABLE KEYS */;
INSERT INTO `proveedor` VALUES (1,'Textiles Nacionales SAS','6013001001','ventas@textilesnacionales.com','Carrera 68 # 17-20, Bogotá'),(2,'Insumos Industriales Colombia','6013001002','ventas@insumosindustriales.com','Calle 13 # 60-18, Bogotá'),(3,'Hilos y Botones SAS','6013001003','contacto@hilosybotones.com','Carrera 30 # 12-40, Bogotá'),(4,'Distribuciones Textilera','6013001004','ventas@distribucionestextilera.com','Calle 19 # 68-25, Bogotá'),(5,'Accesorios Confección Colombia','6013001005','info@accesoriosconfeccion.com','Carrera 53 # 10-15, Bogotá'),(6,'Proveedora Industrial SAS','6013001006','ventas@proveedoraindustrial.com','Calle 22 # 80-30, Bogotá');
/*!40000 ALTER TABLE `proveedor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rol`
--

DROP TABLE IF EXISTS `rol`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rol` (
  `id_rol` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_rol` varchar(50) NOT NULL,
  `descripcion` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`id_rol`),
  UNIQUE KEY `uq_rol_nombre` (`nombre_rol`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rol`
--

LOCK TABLES `rol` WRITE;
/*!40000 ALTER TABLE `rol` DISABLE KEYS */;
INSERT INTO `rol` VALUES (1,'Administrador','Gestiona usuarios, productos, inventario, pedidos, PQRS y tickets'),(2,'Cliente','Realiza pedidos, consulta estados y gestiona PQRS'),(3,'Empleado','Gestiona pedidos, inventario, tickets y procesos internos');
/*!40000 ALTER TABLE `rol` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `talla`
--

DROP TABLE IF EXISTS `talla`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `talla` (
  `id_talla` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_talla` varchar(20) NOT NULL,
  PRIMARY KEY (`id_talla`),
  UNIQUE KEY `uq_talla_nombre` (`nombre_talla`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `talla`
--

LOCK TABLES `talla` WRITE;
/*!40000 ALTER TABLE `talla` DISABLE KEYS */;
INSERT INTO `talla` VALUES (4,'L'),(3,'M'),(2,'S'),(7,'Única'),(5,'XL'),(1,'XS'),(6,'XXL');
/*!40000 ALTER TABLE `talla` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ticket`
--

DROP TABLE IF EXISTS `ticket`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ticket` (
  `id_ticket` int(11) NOT NULL AUTO_INCREMENT,
  `asunto` varchar(150) NOT NULL,
  `descripcion` text NOT NULL,
  `prioridad` varchar(20) NOT NULL DEFAULT 'Media',
  `estado` varchar(30) NOT NULL DEFAULT 'Abierto',
  `fecha_creacion` datetime DEFAULT current_timestamp(),
  `fecha_actualizacion` datetime DEFAULT current_timestamp(),
  `id_usuario` int(11) NOT NULL,
  `id_asignado` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_ticket`),
  KEY `idx_ticket_usuario` (`id_usuario`),
  KEY `idx_ticket_asignado` (`id_asignado`),
  KEY `idx_ticket_estado` (`estado`),
  KEY `idx_ticket_prioridad` (`prioridad`),
  CONSTRAINT `fk_ticket_asignado` FOREIGN KEY (`id_asignado`) REFERENCES `usuario` (`id_usuario`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_ticket_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ticket`
--

LOCK TABLES `ticket` WRITE;
/*!40000 ALTER TABLE `ticket` DISABLE KEYS */;
INSERT INTO `ticket` VALUES (1,'Consulta sobre pedido','Solicitud de información sobre el estado del pedido.','Alta','Abierto','2026-08-01 08:00:00','2026-08-01 08:00:00',6,3),(2,'Problema de talla','El cliente reporta inconveniente con la talla.','Media','En revisión','2026-08-02 09:00:00','2026-08-02 09:00:00',7,4),(3,'Consulta de catálogo','Solicitud de información sobre productos.','Baja','Abierto','2026-08-03 10:00:00','2026-08-03 10:00:00',8,5),(4,'Problema de entrega','El pedido presenta retraso en la entrega.','Alta','En revisión','2026-08-04 11:00:00','2026-08-04 11:00:00',9,3),(5,'Solicitud de cotización','Cliente solicita cotización empresarial.','Media','Abierto','2026-08-05 12:00:00','2026-08-05 12:00:00',10,4),(6,'Consulta de producto','Solicitud de características del producto.','Baja','En revisión','2026-08-06 13:00:00','2026-08-06 13:00:00',11,5),(7,'Problema con pedido','Cliente reporta diferencia en el pedido.','Alta','Abierto','2026-08-07 14:00:00','2026-08-07 14:00:00',12,3),(8,'Consulta de inventario','Solicitud de disponibilidad de productos.','Media','En revisión','2026-08-08 08:30:00','2026-08-08 08:30:00',13,4),(9,'Solicitud de cambio','Cliente solicita cambio de producto.','Alta','Abierto','2026-08-09 09:30:00','2026-08-09 09:30:00',14,5),(10,'Consulta de factura','Solicitud de información de facturación.','Baja','En revisión','2026-08-10 10:30:00','2026-08-10 10:30:00',15,3),(11,'Problema de producto','Cliente reporta inconveniente con producto.','Alta','Abierto','2026-08-11 11:30:00','2026-08-11 11:30:00',16,4),(12,'Consulta de materiales','Solicitud de información sobre materiales.','Media','En revisión','2026-08-12 12:30:00','2026-08-12 12:30:00',17,5),(13,'Consulta de disponibilidad','Cliente consulta disponibilidad de tallas.','Baja','Abierto','2026-08-13 13:30:00','2026-08-13 13:30:00',18,3),(14,'Problema de entrega','Cliente reporta retraso en despacho.','Alta','En revisión','2026-08-14 14:30:00','2026-08-14 14:30:00',19,4),(15,'Solicitud de devolución','Cliente solicita revisión para devolución.','Alta','Abierto','2026-08-15 08:15:00','2026-08-15 08:15:00',20,5),(16,'Consulta de tallas','Solicitud de guía de tallas.','Baja','En revisión','2026-08-16 09:15:00','2026-08-16 09:15:00',21,3),(17,'Solicitud empresarial','Cliente solicita información empresarial.','Media','Abierto','2026-08-17 10:15:00','2026-08-17 10:15:00',22,4),(18,'Problema de pedido','Cliente reporta diferencia en cantidades.','Alta','En revisión','2026-08-18 11:15:00','2026-08-18 11:15:00',23,5),(19,'Consulta de tiempos','Solicitud de tiempos de confección.','Baja','Abierto','2026-08-19 12:15:00','2026-08-19 12:15:00',24,3),(20,'Solicitud de personalización','Cliente solicita personalización de prendas.','Media','En revisión','2026-08-20 13:15:00','2026-08-20 13:15:00',25,4),(21,'Consulta de precios','Cliente solicita precios de productos.','Baja','Abierto','2026-08-21 14:15:00','2026-08-21 14:15:00',26,5),(22,'Problema de pago','Cliente solicita revisión de pago.','Alta','En revisión','2026-08-22 08:45:00','2026-08-22 08:45:00',27,3),(23,'Consulta de entrega','Cliente solicita información de despacho.','Media','Abierto','2026-08-23 09:45:00','2026-08-23 09:45:00',28,4),(24,'Problema de confección','Cliente reporta problema de confección.','Alta','En revisión','2026-08-24 10:45:00','2026-08-24 10:45:00',29,5),(25,'Consulta general','Cliente solicita información general.','Baja','Abierto','2026-08-25 11:45:00','2026-08-25 11:45:00',30,3),(26,'Solicitud de cambio de talla','Cliente solicita cambio de talla.','Media','En revisión','2026-08-26 12:45:00','2026-08-26 12:45:00',6,4),(27,'Consulta de producto','Cliente solicita información adicional.','Baja','Abierto','2026-08-27 13:45:00','2026-08-27 13:45:00',7,5),(28,'Problema de entrega','Cliente reporta inconveniente de entrega.','Alta','En revisión','2026-08-28 14:45:00','2026-08-28 14:45:00',8,3),(29,'Solicitud de cotización','Cliente solicita nueva cotización.','Media','Abierto','2026-08-29 08:50:00','2026-08-29 08:50:00',9,4),(30,'Consulta de pedido','Cliente solicita seguimiento de pedido.','Baja','En revisión','2026-08-30 09:50:00','2026-08-30 09:50:00',10,5);
/*!40000 ALTER TABLE `ticket` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER trg_actualizar_ticket
BEFORE UPDATE ON ticket
FOR EACH ROW
BEGIN
    SET NEW.fecha_actualizacion = CURRENT_TIMESTAMP;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `ticket_respuesta`
--

DROP TABLE IF EXISTS `ticket_respuesta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ticket_respuesta` (
  `id_respuesta` int(11) NOT NULL AUTO_INCREMENT,
  `respuesta` text NOT NULL,
  `fecha` datetime DEFAULT current_timestamp(),
  `id_ticket` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  PRIMARY KEY (`id_respuesta`),
  KEY `idx_respuesta_ticket` (`id_ticket`),
  KEY `idx_respuesta_usuario` (`id_usuario`),
  CONSTRAINT `fk_respuesta_ticket` FOREIGN KEY (`id_ticket`) REFERENCES `ticket` (`id_ticket`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_respuesta_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ticket_respuesta`
--

LOCK TABLES `ticket_respuesta` WRITE;
/*!40000 ALTER TABLE `ticket_respuesta` DISABLE KEYS */;
INSERT INTO `ticket_respuesta` VALUES (1,'Se revisó el estado del pedido y continúa en proceso.','2026-08-01 10:00:00',1,3),(2,'Se verificará la talla solicitada con el área de producción.','2026-08-02 11:00:00',2,4),(3,'El catálogo actualizado fue enviado al cliente.','2026-08-03 12:00:00',3,5),(4,'Se realizó seguimiento al proceso de entrega.','2026-08-04 13:00:00',4,3),(5,'La solicitud de cotización fue recibida correctamente.','2026-08-05 14:00:00',5,4),(6,'Se enviaron las características solicitadas.','2026-08-06 15:00:00',6,5),(7,'Se revisó la diferencia reportada en el pedido.','2026-08-07 15:30:00',7,3),(8,'Se confirmó la disponibilidad solicitada.','2026-08-08 10:30:00',8,4),(9,'La solicitud de cambio fue enviada al área correspondiente.','2026-08-09 11:30:00',9,5),(10,'La información de facturación fue verificada.','2026-08-10 12:30:00',10,3),(11,'Se recibió el reporte del inconveniente.','2026-08-11 13:30:00',11,4),(12,'Se compartió información sobre los materiales disponibles.','2026-08-12 14:30:00',12,5),(13,'Se confirmó la disponibilidad de tallas.','2026-08-13 15:30:00',13,3),(14,'Se realizó seguimiento al despacho.','2026-08-14 16:00:00',14,4),(15,'La solicitud fue remitida para revisión.','2026-08-15 10:00:00',15,5),(16,'Se envió la guía de tallas al cliente.','2026-08-16 11:00:00',16,3),(17,'Se recibió correctamente la solicitud empresarial.','2026-08-17 12:00:00',17,4),(18,'Se revisaron las cantidades del pedido.','2026-08-18 13:00:00',18,5),(19,'Se informó el tiempo estimado de confección.','2026-08-19 14:00:00',19,3),(20,'La solicitud fue enviada al área de producción.','2026-08-20 15:00:00',20,4),(21,'Se enviaron los precios actualizados.','2026-08-21 16:00:00',21,5),(22,'El área administrativa revisará el pago reportado.','2026-08-22 10:30:00',22,3),(23,'Se verificó el estado del despacho.','2026-08-23 11:30:00',23,4),(24,'Se recibió el reporte de confección.','2026-08-24 12:30:00',24,5),(25,'Se respondió la consulta general del cliente.','2026-08-25 13:30:00',25,3),(26,'La solicitud de cambio de talla fue recibida.','2026-08-26 14:30:00',26,4),(27,'Se enviaron detalles adicionales del producto.','2026-08-27 15:30:00',27,5),(28,'Se realizó seguimiento al inconveniente de entrega.','2026-08-28 16:30:00',28,3),(29,'La nueva cotización fue registrada.','2026-08-29 10:30:00',29,4),(30,'Se informó el estado actual del pedido.','2026-08-30 11:30:00',30,5);
/*!40000 ALTER TABLE `ticket_respuesta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `id_usuario` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `correo` varchar(100) NOT NULL,
  `contrasena` varchar(64) DEFAULT NULL,
  `estado` varchar(20) DEFAULT 'Activo',
  `telefono` varchar(20) DEFAULT NULL,
  `direccion` varchar(200) DEFAULT NULL,
  `documento` varchar(30) DEFAULT NULL,
  `id_rol` int(11) NOT NULL,
  PRIMARY KEY (`id_usuario`),
  UNIQUE KEY `uq_usuario_correo` (`correo`),
  KEY `idx_usuario_rol` (`id_rol`),
  CONSTRAINT `fk_usuario_rol` FOREIGN KEY (`id_rol`) REFERENCES `rol` (`id_rol`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,'Carlos Mendoza','carlos.mendoza@fortunaij.com','3b612c75a7b5048a435fb6ec81e52ff92d6d795a8b5a9c17070f6a63c97a53b2','Activo','3001000001','Carrera 7 # 12-15, Bogotá','1001000001',1),(2,'Laura Rodriguez','laura.rodriguez@fortunaij.com','3b612c75a7b5048a435fb6ec81e52ff92d6d795a8b5a9c17070f6a63c97a53b2','Activo','3001000002','Calle 18 # 8-22, Bogotá','1001000002',1),(3,'Andres Martinez','andres.martinez@fortunaij.com','d90ca2b319506bc8dd4dc77b7484226d5e7524c397e1d9d419be7a2d84b30098','Activo','3001000003','Carrera 10 # 20-30, Bogotá','1001000003',3),(4,'Sofia Herrera','sofia.herrera@fortunaij.com','d90ca2b319506bc8dd4dc77b7484226d5e7524c397e1d9d419be7a2d84b30098','Activo','3001000004','Calle 25 # 15-40, Bogotá','1001000004',3),(5,'Miguel Torres','miguel.torres@fortunaij.com','d90ca2b319506bc8dd4dc77b7484226d5e7524c397e1d9d419be7a2d84b30098','Activo','3001000005','Carrera 14 # 30-18, Bogotá','1001000005',3),(6,'Daniela Castro','daniela.castro@gmail.com','34e422278ea745b5d87ba6592f0ea3fe32a2eb7593f5960ac72d7094fb121f3d','Activo','3011000006','Calle 45 # 20-11, Bogotá','1001000006',2),(7,'Juan Perez','juan.perez@gmail.com','34e422278ea745b5d87ba6592f0ea3fe32a2eb7593f5960ac72d7094fb121f3d','Activo','3011000007','Carrera 32 # 18-25, Bogotá','1001000007',2),(8,'Valentina Gomez','valentina.gomez@gmail.com','34e422278ea745b5d87ba6592f0ea3fe32a2eb7593f5960ac72d7094fb121f3d','Activo','3011000008','Calle 63 # 40-16, Bogotá','1001000008',2),(9,'Sebastian Rojas','sebastian.rojas@gmail.com','34e422278ea745b5d87ba6592f0ea3fe32a2eb7593f5960ac72d7094fb121f3d','Activo','3011000009','Carrera 50 # 22-14, Bogotá','1001000009',2),(10,'Camila Vargas','camila.vargas@gmail.com','34e422278ea745b5d87ba6592f0ea3fe32a2eb7593f5960ac72d7094fb121f3d','Activo','3011000010','Calle 72 # 15-30, Bogotá','1001000010',2),(11,'Nicolas Ramirez','nicolas.ramirez@gmail.com','34e422278ea745b5d87ba6592f0ea3fe32a2eb7593f5960ac72d7094fb121f3d','Activo','3011000011','Carrera 19 # 80-12, Bogotá','1001000011',2),(12,'Mariana Silva','mariana.silva@gmail.com','34e422278ea745b5d87ba6592f0ea3fe32a2eb7593f5960ac72d7094fb121f3d','Activo','3011000012','Calle 90 # 12-45, Bogotá','1001000012',2),(13,'Felipe Moreno','felipe.moreno@gmail.com','34e422278ea745b5d87ba6592f0ea3fe32a2eb7593f5960ac72d7094fb121f3d','Activo','3011000013','Carrera 24 # 65-17, Bogotá','1001000013',2),(14,'Natalia Jimenez','natalia.jimenez@gmail.com','34e422278ea745b5d87ba6592f0ea3fe32a2eb7593f5960ac72d7094fb121f3d','Activo','3011000014','Calle 52 # 27-19, Bogotá','1001000014',2),(15,'Diego Castillo','diego.castillo@gmail.com','34e422278ea745b5d87ba6592f0ea3fe32a2eb7593f5960ac72d7094fb121f3d','Activo','3011000015','Carrera 38 # 44-21, Bogotá','1001000015',2),(16,'Paula Sanchez','paula.sanchez@gmail.com','34e422278ea745b5d87ba6592f0ea3fe32a2eb7593f5960ac72d7094fb121f3d','Activo','3011000016','Calle 31 # 16-28, Bogotá','1001000016',2),(17,'Alejandro Ortiz','alejandro.ortiz@gmail.com','34e422278ea745b5d87ba6592f0ea3fe32a2eb7593f5960ac72d7094fb121f3d','Activo','3011000017','Carrera 15 # 55-36, Bogotá','1001000017',2),(18,'Isabella Torres','isabella.torres@gmail.com','34e422278ea745b5d87ba6592f0ea3fe32a2eb7593f5960ac72d7094fb121f3d','Activo','3011000018','Calle 68 # 21-40, Bogotá','1001000018',2),(19,'Mateo Gutierrez','mateo.gutierrez@gmail.com','34e422278ea745b5d87ba6592f0ea3fe32a2eb7593f5960ac72d7094fb121f3d','Activo','3011000019','Carrera 45 # 70-18, Bogotá','1001000019',2),(20,'Sara Mendoza','sara.mendoza@gmail.com','34e422278ea745b5d87ba6592f0ea3fe32a2eb7593f5960ac72d7094fb121f3d','Activo','3011000020','Calle 22 # 34-12, Bogotá','1001000020',2),(21,'Julian Arias','julian.arias@gmail.com','34e422278ea745b5d87ba6592f0ea3fe32a2eb7593f5960ac72d7094fb121f3d','Activo','3011000021','Carrera 8 # 75-22, Bogotá','1001000021',2),(22,'Gabriela Leon','gabriela.leon@gmail.com','34e422278ea745b5d87ba6592f0ea3fe32a2eb7593f5960ac72d7094fb121f3d','Activo','3011000022','Calle 41 # 19-33, Bogotá','1001000022',2),(23,'Santiago Reyes','santiago.reyes@gmail.com','34e422278ea745b5d87ba6592f0ea3fe32a2eb7593f5960ac72d7094fb121f3d','Activo','3011000023','Carrera 27 # 60-15, Bogotá','1001000023',2),(24,'Manuela Diaz','manuela.diaz@gmail.com','34e422278ea745b5d87ba6592f0ea3fe32a2eb7593f5960ac72d7094fb121f3d','Activo','3011000024','Calle 57 # 31-20, Bogotá','1001000024',2),(25,'Tomas Fernandez','tomas.fernandez@gmail.com','34e422278ea745b5d87ba6592f0ea3fe32a2eb7593f5960ac72d7094fb121f3d','Activo','3011000025','Carrera 41 # 23-17, Bogotá','1001000025',2),(26,'Laura Cardenas','laura.cardenas@gmail.com','34e422278ea745b5d87ba6592f0ea3fe32a2eb7593f5960ac72d7094fb121f3d','Activo','3011000026','Calle 35 # 42-10, Bogotá','1001000026',2),(27,'Cristian Pardo','cristian.pardo@gmail.com','34e422278ea745b5d87ba6592f0ea3fe32a2eb7593f5960ac72d7094fb121f3d','Activo','3011000027','Carrera 22 # 48-26, Bogotá','1001000027',2),(28,'Ana Martinez','ana.martinez@gmail.com','34e422278ea745b5d87ba6592f0ea3fe32a2eb7593f5960ac72d7094fb121f3d','Activo','3011000028','Calle 76 # 25-14, Bogotá','1001000028',2),(29,'Esteban Ruiz','esteban.ruiz@gmail.com','34e422278ea745b5d87ba6592f0ea3fe32a2eb7593f5960ac72d7094fb121f3d','Activo','3011000029','Carrera 36 # 67-19, Bogotá','1001000029',2),(30,'Julieta Navarro','julieta.navarro@gmail.com','b83ed6a62a1ec35d54ef54d9445d5e9506e5838ab67eb40caac3cca264bf5c99','Activo','3011000030','Calle 49 # 18-31, Bogotá','1001000030',2),(31,'Samuel Peña','Samuel@gmail.com','8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92','Activo','3011000031','Calle 63 # 12-59, Bogotá','1001000031',2),(32,'Brayan Corpa','Brayan@gmail.com','be85115daad705f4cd6945808dbe41cfc037bcefe5d664e7cff7093cc837fbe8','Activo','3011000032','Carrera 10 # 79-28, Bogotá','1001000032',2);
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER trg_encriptar_contrasena_nuevo_usuario
BEFORE INSERT ON usuario
FOR EACH ROW
BEGIN
    SET NEW.contrasena = SHA2(NEW.contrasena, 256);
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER trg_encriptar_contrasena_update
BEFORE UPDATE ON usuario
FOR EACH ROW
BEGIN
    IF NEW.contrasena <> OLD.contrasena THEN
        SET NEW.contrasena = SHA2(NEW.contrasena, 256);
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Temporary view structure for view `vw_inventario_materiales`
--

DROP TABLE IF EXISTS `vw_inventario_materiales`;
/*!50001 DROP VIEW IF EXISTS `vw_inventario_materiales`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `vw_inventario_materiales` AS SELECT 
 1 AS `id_material`,
 1 AS `material`,
 1 AS `codigo_referencia`,
 1 AS `categoria`,
 1 AS `color`,
 1 AS `unidad_medida`,
 1 AS `cantidad_stock`,
 1 AS `stock_minimo`,
 1 AS `estado_stock`,
 1 AS `bodega`,
 1 AS `proveedor`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `vw_ventas`
--

DROP TABLE IF EXISTS `vw_ventas`;
/*!50001 DROP VIEW IF EXISTS `vw_ventas`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `vw_ventas` AS SELECT 
 1 AS `id_venta`,
 1 AS `fecha`,
 1 AS `total`,
 1 AS `estado`,
 1 AS `id_usuario`,
 1 AS `cliente`,
 1 AS `documento`*/;
SET character_set_client = @saved_cs_client;

--
-- Dumping events for database 'bd_gestion_pedidos'
--

--
-- Dumping routines for database 'bd_gestion_pedidos'
--
/*!50003 DROP FUNCTION IF EXISTS `fn_material_necesario` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `fn_material_necesario`(p_id_producto INT,
    p_cantidad_prendas INT
) RETURNS decimal(12,2)
    DETERMINISTIC
BEGIN
    DECLARE v_material DECIMAL(12,2);

    SELECT COALESCE(
        SUM(cantidad_material),
        0
    ) * p_cantidad_prendas
    INTO v_material
    FROM producto_material
    WHERE id_producto = p_id_producto;

    RETURN v_material;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `fn_stock_producto_talla` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `fn_stock_producto_talla`(p_id_producto INT,
    p_id_talla INT
) RETURNS int(11)
    DETERMINISTIC
BEGIN
    DECLARE v_stock INT;

    SELECT stock
    INTO v_stock
    FROM producto_talla
    WHERE id_producto = p_id_producto
      AND id_talla = p_id_talla;

    RETURN COALESCE(v_stock, 0);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `fn_total_pedido` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `fn_total_pedido`(p_id_pedido INT
) RETURNS decimal(12,2)
    DETERMINISTIC
BEGIN
    DECLARE v_total DECIMAL(12,2);

    SELECT COALESCE(
        SUM(cantidad * precio_unitario),
        0
    )
    INTO v_total
    FROM detalle_producto
    WHERE id_pedido = p_id_pedido;

    RETURN v_total;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `actualizar_estado_pedido` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `actualizar_estado_pedido`(
    IN p_id_pedido INT,
    IN p_nuevo_estado VARCHAR(30)
)
BEGIN
    UPDATE pedido
    SET estado = p_nuevo_estado
    WHERE id_pedido = p_id_pedido;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `consultar_pedido` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `consultar_pedido`(
    IN p_id_pedido INT
)
BEGIN
    SELECT
        p.id_pedido,
        p.fecha,
        p.estado,
        u.nombre AS cliente,
        u.documento,
        u.direccion,
        pt.nombre AS producto,
        pt.categoria,
        t.nombre_talla AS talla,
        dp.cantidad,
        dp.precio_unitario,
        (dp.cantidad * dp.precio_unitario) AS subtotal,
        pt.tiempo_confeccion_minutos
    FROM pedido p
    INNER JOIN usuario u
        ON p.id_usuario = u.id_usuario
    INNER JOIN detalle_producto dp
        ON p.id_pedido = dp.id_pedido
    INNER JOIN producto_talla ptt
        ON dp.id_producto_talla = ptt.id_producto_talla
    INNER JOIN producto_terminado pt
        ON ptt.id_producto = pt.id_producto
    INNER JOIN talla t
        ON ptt.id_talla = t.id_talla
    WHERE p.id_pedido = p_id_pedido;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `registrar_entrada_material` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `registrar_entrada_material`(
    IN p_id_material INT,
    IN p_cantidad DECIMAL(12,2),
    IN p_id_usuario INT,
    IN p_observacion VARCHAR(255)
)
BEGIN
    DECLARE v_stock_actual DECIMAL(12,2);
    DECLARE v_nuevo_stock DECIMAL(12,2);

    IF p_cantidad <= 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'La cantidad debe ser mayor que cero';
    END IF;

    SELECT cantidad_stock
    INTO v_stock_actual
    FROM material
    WHERE id_material = p_id_material;

    IF v_stock_actual IS NULL THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'El material no existe';
    END IF;

    SET v_nuevo_stock = v_stock_actual + p_cantidad;

    UPDATE material
    SET cantidad_stock = v_nuevo_stock
    WHERE id_material = p_id_material;

    INSERT INTO movimiento_inventario
    (
        tipo_movimiento,
        cantidad,
        saldo_nuevo,
        observacion,
        id_material,
        id_usuario
    )
    VALUES
    (
        'Entrada',
        p_cantidad,
        v_nuevo_stock,
        p_observacion,
        p_id_material,
        p_id_usuario
    );
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `registrar_salida_material` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `registrar_salida_material`(
    IN p_id_material INT,
    IN p_cantidad DECIMAL(12,2),
    IN p_id_usuario INT,
    IN p_observacion VARCHAR(255)
)
BEGIN
    DECLARE v_stock_actual DECIMAL(12,2);
    DECLARE v_nuevo_stock DECIMAL(12,2);

    IF p_cantidad <= 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'La cantidad debe ser mayor que cero';
    END IF;

    SELECT cantidad_stock
    INTO v_stock_actual
    FROM material
    WHERE id_material = p_id_material;

    IF v_stock_actual IS NULL THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'El material no existe';
    END IF;

    IF v_stock_actual < p_cantidad THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Stock insuficiente para realizar la salida';
    END IF;

    SET v_nuevo_stock = v_stock_actual - p_cantidad;

    UPDATE material
    SET cantidad_stock = v_nuevo_stock
    WHERE id_material = p_id_material;

    INSERT INTO movimiento_inventario
    (
        tipo_movimiento,
        cantidad,
        saldo_nuevo,
        observacion,
        id_material,
        id_usuario
    )
    VALUES
    (
        'Salida',
        p_cantidad,
        v_nuevo_stock,
        p_observacion,
        p_id_material,
        p_id_usuario
    );
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_pqrs_pendientes` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_pqrs_pendientes`()
BEGIN
    SELECT
        pq.id_pqrs,
        pq.tipo,
        pq.descripcion,
        pq.fecha,
        pq.estado,
        pq.anonimo,
        u.nombre AS usuario
    FROM pqrs pq
    LEFT JOIN usuario u
        ON pq.id_usuario = u.id_usuario
    WHERE pq.estado IN (
        'Pendiente',
        'Recibida',
        'En revisión'
    )
    ORDER BY pq.fecha ASC;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_tickets_pendientes` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_tickets_pendientes`()
BEGIN
    SELECT
        t.id_ticket,
        t.asunto,
        t.descripcion,
        t.prioridad,
        t.estado,
        t.fecha_creacion,
        u.nombre AS usuario,
        a.nombre AS asignado
    FROM ticket t
    INNER JOIN usuario u
        ON t.id_usuario = u.id_usuario
    LEFT JOIN usuario a
        ON t.id_asignado = a.id_usuario
    WHERE t.estado IN (
        'Abierto',
        'En revisión'
    )
    ORDER BY t.fecha_creacion ASC;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Final view structure for view `vw_inventario_materiales`
--

/*!50001 DROP VIEW IF EXISTS `vw_inventario_materiales`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `vw_inventario_materiales` AS select `m`.`id_material` AS `id_material`,`m`.`nombre` AS `material`,`m`.`codigo_referencia` AS `codigo_referencia`,`m`.`categoria` AS `categoria`,`m`.`color` AS `color`,`m`.`unidad_medida` AS `unidad_medida`,`m`.`cantidad_stock` AS `cantidad_stock`,`m`.`stock_minimo` AS `stock_minimo`,case when `m`.`cantidad_stock` <= `m`.`stock_minimo` then 'Bajo' else 'Disponible' end AS `estado_stock`,`b`.`nombre` AS `bodega`,`pr`.`nombre` AS `proveedor` from ((`material` `m` left join `bodega` `b` on(`m`.`id_bodega` = `b`.`id_bodega`)) left join `proveedor` `pr` on(`m`.`id_proveedor` = `pr`.`id_proveedor`)) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `vw_ventas`
--

/*!50001 DROP VIEW IF EXISTS `vw_ventas`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `vw_ventas` AS select `p`.`id_pedido` AS `id_venta`,`p`.`fecha` AS `fecha`,`p`.`total` AS `total`,`p`.`estado` AS `estado`,`u`.`id_usuario` AS `id_usuario`,`u`.`nombre` AS `cliente`,`u`.`documento` AS `documento` from (`pedido` `p` join `usuario` `u` on(`p`.`id_usuario` = `u`.`id_usuario`)) where `p`.`estado` = 'Entregado' */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-09-22 23:02:54
