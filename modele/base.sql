SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


CREATE TABLE IF NOT EXISTS `Personne`(
   `idPers` INT(11) NOT NULL AUTO_INCREMENT,
   `nom` VARCHAR(50) NOT NULL,
   `mdp` VARCHAR(50) NOT NULL,
   PRIMARY KEY(`idPers`)
)ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=73 ;


INSERT INTO `Personne` (`idPers`, `nom`, `mdp`) VALUES

(1, 'Suly', 'e7yabzB1g5Ink'),
(2, 'Pinson', '6f.GBojfb9XWA'),
(3, 'Emery', '2coXXuq2ZDjT.'),
(4, 'Daire', '2akkshins72fA'),
(5, 'Yart', 'd7VnhQweQY.hY');