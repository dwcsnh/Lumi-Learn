-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: lumilearn
-- ------------------------------------------------------
-- Server version	8.0.36

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
-- Table structure for table `flashcards`
--

DROP TABLE IF EXISTS `flashcards`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `flashcards` (
  `Id` char(36) CHARACTER SET ascii COLLATE ascii_general_ci NOT NULL,
  `Term` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Definition` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `FlashCardSetId` char(36) CHARACTER SET ascii COLLATE ascii_general_ci NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `IX_FlashCards_FlashCardSetId` (`FlashCardSetId`),
  CONSTRAINT `FK_FlashCards_FlashCardSets_FlashCardSetId` FOREIGN KEY (`FlashCardSetId`) REFERENCES `flashcardsets` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `flashcards`
--

LOCK TABLES `flashcards` WRITE;
/*!40000 ALTER TABLE `flashcards` DISABLE KEYS */;
INSERT INTO `flashcards` VALUES ('3b226302-da33-4ce0-a642-18cfd862c895','Chakra','The essential energy used by ninja to perform jutsu, created by combining physical and spiritual energies.','7088512f-0125-406d-9f30-6d3371c35cd7'),('4fac9d4c-43c1-49d8-8dfd-72260e985c2b','Shinobi','Another word for ninja; trained warriors who use chakra-based techniques to complete missions.','7088512f-0125-406d-9f30-6d3371c35cd7'),('63c3d736-75ec-43a9-b9ac-0ea1a15b5e6b','Jutsu','Techniques or skills used by shinobi, powered by chakra, and divided into ninjutsu, genjutsu, and taijutsu.','7088512f-0125-406d-9f30-6d3371c35cd7'),('66b53b9a-f912-43b4-87b7-899f0aee9bd0','Ninjutsu','A broad category of jutsu that involves the use of chakra to perform various supernatural effects.','7088512f-0125-406d-9f30-6d3371c35cd7'),('876b9c29-373a-4666-96b8-43e462567870','Tailed Beast','Powerful chakra monsters, each with a number of tails, that can be sealed inside humans as jinchuriki.','7088512f-0125-406d-9f30-6d3371c35cd7'),('8916b007-8d7f-49d0-a1ef-49cb90abeb5d','Taijutsu','Hand-to-hand combat techniques that rely on martial arts skills and physical strength, without chakra.','7088512f-0125-406d-9f30-6d3371c35cd7'),('c27d8ec3-d728-40b4-a17f-eae02b43e722','Summoning Jutsu','A technique allowing a ninja to summon animals or objects to aid in battle by using a blood contract.','7088512f-0125-406d-9f30-6d3371c35cd7'),('d7941429-1c28-4d8b-8aca-d2d9bd21dec6','Kekkei Genkai','Genetic abilities passed down through bloodlines, such as the Sharingan or Byakugan.','7088512f-0125-406d-9f30-6d3371c35cd7'),('ef80aff9-d9d7-47e7-b32c-809458365df0','Genjutsu','Illusion-based techniques that manipulate the opponent’s senses, causing hallucinations or disorientation.','7088512f-0125-406d-9f30-6d3371c35cd7');
/*!40000 ALTER TABLE `flashcards` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-08 13:53:56
