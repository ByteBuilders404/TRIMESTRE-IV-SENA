# Trigger para encriptar contraseña de nuevo usuario
DELIMITER $$

CREATE TRIGGER trg_encriptar_contrasena_nuevo_usuario
BEFORE INSERT ON usuario
FOR EACH ROW
BEGIN
    SET NEW.contrasena = SHA2(NEW.contrasena, 256);
END$$

DELIMITER ;

# trigger para encriptar nueva contraseña de usuario existente 
USE bd_gestion_pedidos;

DELIMITER $$

CREATE TRIGGER trg_encriptar_contrasena_update
BEFORE UPDATE ON usuario
FOR EACH ROW
BEGIN
    IF NEW.contrasena <> OLD.contrasena THEN
        SET NEW.contrasena = SHA2(NEW.contrasena, 256);
    END IF;
END$$

DELIMITER ;
show triggers from bd_gestion_pedidos;
