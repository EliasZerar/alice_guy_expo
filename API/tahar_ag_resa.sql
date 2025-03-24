-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:3306
-- Généré le : lun. 24 mars 2025 à 21:38
-- Version du serveur : 11.4.5-MariaDB
-- Version de PHP : 8.3.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `tahar_ag_resa`
--

-- --------------------------------------------------------

--
-- Structure de la table `reservation`
--

CREATE TABLE `reservation` (
  `id` int(11) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `phone_number` varchar(10) NOT NULL,
  `email` varchar(320) NOT NULL,
  `date_time` datetime NOT NULL,
  `participants` int(2) NOT NULL,
  `promo_code` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `reservation`
--

INSERT INTO `reservation` (`id`, `last_name`, `first_name`, `phone_number`, `email`, `date_time`, `participants`, `promo_code`) VALUES
(173, 'Andre', 'Anna', '0686555673', 'anna.andre@example.com', '2025-04-08 17:00:00', 6, 1),
(174, 'Boucher', 'Émile', '0675221263', 'émile.boucher@example.com', '2025-05-23 14:00:00', 7, 0),
(175, 'Picard', 'Adrien', '0665101773', 'adrien.picard@example.com', '2025-03-29 15:00:00', 9, 0),
(176, 'Lucas', 'Zoé', '0618796503', 'zoé.lucas@example.com', '2025-05-03 14:00:00', 6, 1),
(177, 'Rey', 'Paul', '0674424308', 'paul.rey@example.com', '2025-03-30 15:00:00', 7, 1),
(178, 'Leclerc', 'Jade', '0680233470', 'jade.leclerc@example.com', '2025-04-19 10:00:00', 4, 1),
(179, 'Menard', 'Lilian', '0688696750', 'lilian.menard@example.com', '2025-05-13 14:00:00', 5, 1),
(180, 'Adam', 'Maé', '0648400850', 'maé.adam@example.com', '2025-04-15 16:00:00', 4, 1),
(181, 'Boucher', 'Eva', '0693437902', 'eva.boucher@example.com', '2025-05-13 13:00:00', 8, 1),
(182, 'Gomez', 'Léna', '0675596171', 'léna.gomez@example.com', '2025-05-08 14:00:00', 3, 0),
(183, 'Fernandez', 'Sarah', '0694763686', 'sarah.fernandez@example.com', '2025-04-30 11:00:00', 10, 1),
(184, 'Pires', 'Thomas', '0696425498', 'thomas.pires@example.com', '2025-05-14 13:00:00', 4, 0),
(185, 'Noel', 'Louis', '0615356736', 'louis.noel@example.com', '2025-05-02 15:00:00', 8, 0),
(186, 'Millet', 'Maxime', '0690703634', 'maxime.millet@example.com', '2025-05-12 10:00:00', 4, 1),
(187, 'Albert', 'Noa', '0641254739', 'noa.albert@example.com', '2025-05-02 17:00:00', 1, 0),
(188, 'Langlois', 'Émile', '0632943170', 'émile.langlois@example.com', '2025-03-31 13:00:00', 9, 1),
(189, 'Delorme', 'David', '0641989545', 'david.delorme@example.com', '2025-04-21 12:00:00', 2, 1),
(190, 'Brun', 'Nina', '0695656932', 'nina.brun@example.com', '2025-04-26 14:00:00', 9, 1),
(191, 'Fernandez', 'Léna', '0664970914', 'léna.fernandez@example.com', '2025-04-04 15:00:00', 9, 1),
(192, 'Durant', 'Sophie', '0667371782', 'sophie.durant@example.com', '2025-05-23 13:00:00', 4, 1),
(193, 'Philippe', 'Élise', '0690350867', 'élise.philippe@example.com', '2025-05-03 16:00:00', 5, 1),
(194, 'Leclerc', 'Lucie', '0640384913', 'lucie.leclerc@example.com', '2025-04-06 15:00:00', 6, 1),
(195, 'Colin', 'Théo', '0627258157', 'théo.colin@example.com', '2025-05-16 16:00:00', 4, 1),
(196, 'Gomez', 'Louis', '0618535020', 'louis.gomez@example.com', '2025-04-14 12:00:00', 7, 1),
(197, 'Brun', 'Théo', '0663165290', 'théo.brun@example.com', '2025-03-24 17:00:00', 4, 1),
(198, 'Weiss', 'Lilian', '0699120480', 'lilian.weiss@example.com', '2025-04-02 10:00:00', 10, 1),
(199, 'Adam', 'Mila', '0655413118', 'mila.adam@example.com', '2025-05-22 10:00:00', 7, 1),
(200, 'Hubert', 'Théo', '0687331251', 'théo.hubert@example.com', '2025-05-19 15:00:00', 8, 0),
(201, 'Lucas', 'Hugo', '0672130434', 'hugo.lucas@example.com', '2025-04-17 16:00:00', 7, 1),
(202, 'Bouvier', 'Jade', '0669233827', 'jade.bouvier@example.com', '2025-04-19 11:00:00', 10, 0),
(203, 'Weiss', 'Jade', '0682795205', 'jade.weiss@example.com', '2025-04-13 12:00:00', 1, 0),
(204, 'Arnaud', 'Émile', '0669290556', 'émile.arnaud@example.com', '2025-04-13 10:00:00', 1, 1),
(205, 'Jacques', 'Lilian', '0637576786', 'lilian.jacques@example.com', '2025-04-20 14:00:00', 6, 1),
(206, 'Guillon', 'Lilian', '0663364525', 'lilian.guillon@example.com', '2025-03-29 11:00:00', 2, 1),
(207, 'Hubert', 'Marc', '0616466960', 'marc.hubert@example.com', '2025-04-05 14:00:00', 4, 0),
(208, 'Noel', 'Anna', '0641309044', 'anna.noel@example.com', '2025-03-26 15:00:00', 1, 0),
(209, 'Arnaud', 'Émilie', '0670801978', 'émilie.arnaud@example.com', '2025-05-08 13:00:00', 2, 0),
(210, 'Lopez', 'Maxime', '0657275939', 'maxime.lopez@example.com', '2025-05-01 12:00:00', 10, 0),
(211, 'Rey', 'Sophie', '0623706794', 'sophie.rey@example.com', '2025-04-08 10:00:00', 1, 1),
(212, 'Delattre', 'Aaron', '0660849747', 'aaron.delattre@example.com', '2025-05-19 11:00:00', 4, 0),
(213, 'Pires', 'Eva', '0623831059', 'eva.pires@example.com', '2025-04-23 15:00:00', 5, 0),
(214, 'Picard', 'Aaron', '0654658623', 'aaron.picard@example.com', '2025-04-19 17:00:00', 7, 1),
(215, 'Fernandez', 'Lucie', '0692457806', 'lucie.fernandez@example.com', '2025-04-12 12:00:00', 1, 1),
(216, 'Andre', 'Noa', '0665479781', 'noa.andre@example.com', '2025-04-14 17:00:00', 8, 0),
(217, 'Menard', 'Émile', '0676782054', 'émile.menard@example.com', '2025-05-07 12:00:00', 5, 1),
(218, 'Lucas', 'Maxime', '0685381433', 'maxime.lucas@example.com', '2025-04-15 11:00:00', 6, 0),
(219, 'Guillon', 'Thomas', '0667355709', 'thomas.guillon@example.com', '2025-04-18 13:00:00', 8, 1),
(220, 'Noel', 'Esteban', '0673992288', 'esteban.noel@example.com', '2025-04-09 14:00:00', 6, 0),
(221, 'Gomez', 'Noa', '0655936587', 'noa.gomez@example.com', '2025-04-02 12:00:00', 5, 1),
(222, 'Boucher', 'Hugo', '0699389688', 'hugo.boucher@example.com', '2025-05-18 10:00:00', 9, 0),
(223, 'Perret', 'Élise', '0620353080', 'élise.perret@example.com', '2025-05-12 11:00:00', 7, 1),
(224, 'Pires', 'Maé', '0698599219', 'maé.pires@example.com', '2025-04-04 16:00:00', 8, 1),
(225, 'Colin', 'Marc', '0647332360', 'marc.colin@example.com', '2025-05-17 13:00:00', 7, 0),
(226, 'Weiss', 'Bastien', '0657596249', 'bastien.weiss@example.com', '2025-05-20 15:00:00', 9, 1),
(227, 'Delorme', 'Émile', '0652468900', 'émile.delorme@example.com', '2025-03-30 12:00:00', 8, 1),
(228, 'Lopez', 'Bastien', '0639226516', 'bastien.lopez@example.com', '2025-05-05 11:00:00', 4, 1),
(229, 'Hubert', 'Paul', '0698294143', 'paul.hubert@example.com', '2025-04-29 10:00:00', 4, 0),
(230, 'Guillon', 'Mila', '0685897135', 'mila.guillon@example.com', '2025-04-12 16:00:00', 9, 1),
(231, 'Perret', 'Julie', '0647338533', 'julie.perret@example.com', '2025-04-18 17:00:00', 6, 0),
(232, 'Adam', 'Bastien', '0678232731', 'bastien.adam@example.com', '2025-05-18 17:00:00', 5, 0),
(233, 'Delorme', 'David', '0647831295', 'david.delorme@example.com', '2025-04-10 15:00:00', 3, 1),
(234, 'Adam', 'Julie', '0683398151', 'julie.adam@example.com', '2025-04-04 11:00:00', 8, 1),
(235, 'Rollin', 'Léna', '0633153872', 'léna.rollin@example.com', '2025-03-28 15:00:00', 5, 1),
(236, 'Chevalier', 'Paul', '0661615633', 'paul.chevalier@example.com', '2025-05-12 15:00:00', 2, 0),
(237, 'Poirier', 'Louis', '0682418594', 'louis.poirier@example.com', '2025-03-24 14:00:00', 2, 0),
(238, 'Delorme', 'Paul', '0663735770', 'paul.delorme@example.com', '2025-04-04 14:00:00', 10, 0),
(239, 'Delattre', 'Élise', '0667564226', 'élise.delattre@example.com', '2025-05-23 10:00:00', 5, 1),
(240, 'Benoît', 'Bastien', '0689163156', 'bastien.benoît@example.com', '2025-04-04 17:00:00', 10, 0),
(241, 'Gomez', 'Quentin', '0643792509', 'quentin.gomez@example.com', '2025-05-22 13:00:00', 2, 0),
(242, 'Menard', 'Émilie', '0680178711', 'émilie.menard@example.com', '2025-04-13 14:00:00', 3, 0),
(243, 'Masson', 'Clara', '0698722656', 'clara.masson@example.com', '2025-04-09 11:00:00', 8, 1),
(244, 'Langlois', 'Anna', '0646841296', 'anna.langlois@example.com', '2025-04-20 12:00:00', 5, 1),
(245, 'Langlois', 'Lucie', '0643926097', 'lucie.langlois@example.com', '2025-04-16 10:00:00', 10, 0),
(246, 'Henry', 'Émile', '0679335729', 'émile.henry@example.com', '2025-04-13 13:00:00', 3, 1),
(247, 'Chevalier', 'Louis', '0617273982', 'louis.chevalier@example.com', '2025-04-16 13:00:00', 5, 1),
(248, 'Henry', 'Léna', '0669822131', 'léna.henry@example.com', '2025-04-24 11:00:00', 5, 1),
(249, 'Fernandez', 'Hugo', '0679617781', 'hugo.fernandez@example.com', '2025-05-04 12:00:00', 8, 0),
(250, 'Picard', 'Tom', '0665870214', 'tom.picard@example.com', '2025-04-19 13:00:00', 6, 1),
(251, 'Colin', 'Marc', '0639807053', 'marc.colin@example.com', '2025-04-16 16:00:00', 10, 0),
(252, 'Benoît', 'Hugo', '0615900177', 'hugo.benoît@example.com', '2025-03-25 13:00:00', 3, 1),
(253, 'Masson', 'Élise', '0645290305', 'élise.masson@example.com', '2025-03-24 16:00:00', 10, 1),
(254, 'Colin', 'Noa', '0670464863', 'noa.colin@example.com', '2025-04-26 15:00:00', 7, 1),
(255, 'Andre', 'Camille', '0630445824', 'camille.andre@example.com', '2025-05-07 16:00:00', 7, 1),
(256, 'Albert', 'Sarah', '0680138479', 'sarah.albert@example.com', '2025-05-17 17:00:00', 8, 0),
(257, 'Lopez', 'Camille', '0651221552', 'camille.lopez@example.com', '2025-04-05 10:00:00', 7, 0),
(258, 'Brun', 'Théo', '0662156837', 'théo.brun@example.com', '2025-05-05 15:00:00', 4, 1),
(259, 'Masson', 'Noa', '0616313446', 'noa.masson@example.com', '2025-04-04 10:00:00', 5, 0),
(260, 'Masson', 'Sarah', '0699608257', 'sarah.masson@example.com', '2025-04-29 15:00:00', 2, 0),
(261, 'Pires', 'Tom', '0630425845', 'tom.pires@example.com', '2025-03-27 12:00:00', 9, 0),
(262, 'Millet', 'Maé', '0621335615', 'maé.millet@example.com', '2025-04-02 15:00:00', 2, 1),
(263, 'Poirier', 'Paul', '0673851413', 'paul.poirier@example.com', '2025-04-19 14:00:00', 5, 1),
(264, 'Durant', 'Clara', '0670355570', 'clara.durant@example.com', '2025-05-06 14:00:00', 8, 0),
(265, 'Perret', 'Lilian', '0686632929', 'lilian.perret@example.com', '2025-05-09 17:00:00', 3, 0),
(266, 'Millet', 'Hugo', '0653925981', 'hugo.millet@example.com', '2025-05-11 11:00:00', 9, 1),
(267, 'Leclerc', 'Léa', '0648978157', 'léa.leclerc@example.com', '2025-05-15 15:00:00', 10, 1),
(268, 'Masson', 'Louis', '0678607868', 'louis.masson@example.com', '2025-04-27 16:00:00', 6, 1),
(269, 'Hubert', 'Maé', '0658577463', 'maé.hubert@example.com', '2025-04-28 10:00:00', 6, 0),
(270, 'Benoît', 'Émilie', '0659344907', 'émilie.benoît@example.com', '2025-04-12 11:00:00', 7, 0),
(271, 'Durant', 'Camille', '0658504832', 'camille.durant@example.com', '2025-04-21 13:00:00', 3, 1),
(272, 'Arnaud', 'Anna', '0674718849', 'anna.arnaud@example.com', '2025-05-10 17:00:00', 6, 0),
(273, 'Andre', 'Léna', '0677579123', 'léna.andre@example.com', '2025-04-15 14:00:00', 1, 0),
(274, 'Poirier', 'Clara', '0619592296', 'clara.poirier@example.com', '2025-05-12 16:00:00', 5, 1),
(275, 'Colin', 'Jade', '0652993744', 'jade.colin@example.com', '2025-04-03 15:00:00', 9, 1),
(276, 'Philippe', 'Camille', '0679137642', 'camille.philippe@example.com', '2025-05-03 10:00:00', 10, 0),
(277, 'Leclerc', 'Émilie', '0639883041', 'émilie.leclerc@example.com', '2025-04-19 15:00:00', 2, 1),
(278, 'Andre', 'Julie', '0666274446', 'julie.andre@example.com', '2025-05-11 15:00:00', 5, 0),
(279, 'Jacques', 'Anna', '0617407618', 'anna.jacques@example.com', '2025-04-11 17:00:00', 6, 1),
(280, 'Poirier', 'Émile', '0641656968', 'émile.poirier@example.com', '2025-05-01 16:00:00', 7, 0),
(281, 'Menard', 'Sophie', '0620739098', 'sophie.menard@example.com', '2025-03-28 16:00:00', 7, 0),
(282, 'Weiss', 'Noa', '0628343467', 'noa.weiss@example.com', '2025-04-22 11:00:00', 8, 1),
(283, 'Lopez', 'Maxime', '0695109853', 'maxime.lopez@example.com', '2025-04-01 15:00:00', 8, 1),
(284, 'Bouvier', 'Théo', '0619563187', 'théo.bouvier@example.com', '2025-04-06 12:00:00', 6, 1),
(285, 'Lopez', 'Émile', '0668986365', 'émile.lopez@example.com', '2025-05-06 10:00:00', 5, 0),
(286, 'Durant', 'Lilian', '0623348728', 'lilian.durant@example.com', '2025-04-23 16:00:00', 7, 1),
(287, 'Leclerc', 'Aaron', '0699409571', 'aaron.leclerc@example.com', '2025-04-25 11:00:00', 1, 1),
(288, 'Adam', 'Hugo', '0682819112', 'hugo.adam@example.com', '2025-04-12 14:00:00', 1, 1);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `reservation`
--
ALTER TABLE `reservation`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `reservation`
--
ALTER TABLE `reservation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=381;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
