-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 15-04-2024 a las 11:30:51
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `funval_api`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombres` varchar(255) DEFAULT NULL,
  `apellidos` varchar(255) DEFAULT NULL,
  `direccion` varchar(255) DEFAULT NULL,
  `correo_electronico` varchar(255) DEFAULT NULL,
  `dni` varchar(20) DEFAULT NULL,
  `edad` int(11) DEFAULT NULL,
  `fecha_creacion` timestamp NOT NULL DEFAULT current_timestamp(),
  `telefono` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombres`, `apellidos`, `direccion`, `correo_electronico`, `dni`, `edad`, `fecha_creacion`, `telefono`) VALUES
(748, 'Pedro', 'Gutiérrez', 'Calle de la Rosas 890', 'pedro.gutierrez@example.com', 'YZA901234', 22, '2024-04-15 09:10:46', '15:00:00'),
(749, 'Lucía', 'Ramírez', 'Avenida de los Álamos 345', 'lucia.ramirez@example.com', 'BCD567890', 36, '2024-04-15 09:10:46', '16:45:00'),
(750, 'Miguel', 'Torres', 'Calle del Pino 678', 'miguel.torres@example.com', 'EFG234567', 19, '2024-04-15 09:10:46', '18:30:00'),
(751, 'Ana', 'Sánchez', 'Paseo de las Flores 234', 'ana.sanchez@example.com', 'HIJ901234', 28, '2024-04-15 09:10:46', '20:00:00'),
(752, 'Javier', 'Morales', 'Calle del Olmo 567', 'javier.morales@example.com', 'KLM678901', 43, '2024-04-15 09:10:46', '21:15:00'),
(753, 'Marta', 'Díaz', 'Avenida de los Robles 890', 'marta.diaz@example.com', 'NOP234567', 31, '2024-04-15 09:10:46', '22:45:00'),
(754, 'Daniel', 'Castillo', 'Calle de las Jazmines 456', 'daniel.castillo@example.com', 'QRS901234', 25, '2024-04-15 09:10:46', '23:30:00'),
(755, 'Andrés', 'Gómez', 'Calle de las Flores 305', 'andres.gomez@example.com', 'MNO456789', 29, '2024-04-15 09:12:59', '08:30:00'),
(756, 'María', 'Rodríguez', 'Avenida del Sol 201', 'maria.rodriguez@example.com', 'PQR012345', 32, '2024-04-15 09:12:59', '09:45:00'),
(757, 'Juan', 'Hernández', 'Calle del Roble 78', 'juan.hernandez@example.com', 'STU678901', 27, '2024-04-15 09:12:59', '11:20:00'),
(758, 'Sofía', 'Martínez', 'Paseo de las Palmeras 456', 'sofia.martinez@example.com', 'VWX234567', 41, '2024-04-15 09:12:59', '13:15:00');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=759;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
