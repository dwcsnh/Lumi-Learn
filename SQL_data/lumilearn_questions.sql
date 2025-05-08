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
-- Table structure for table `questions`
--

DROP TABLE IF EXISTS `questions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `questions` (
  `Id` char(36) CHARACTER SET ascii COLLATE ascii_general_ci NOT NULL,
  `Content` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `QuizId` char(36) CHARACTER SET ascii COLLATE ascii_general_ci NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `IX_Questions_QuizId` (`QuizId`),
  CONSTRAINT `FK_Questions_Quizzes_QuizId` FOREIGN KEY (`QuizId`) REFERENCES `quizzes` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `questions`
--

LOCK TABLES `questions` WRITE;
/*!40000 ALTER TABLE `questions` DISABLE KEYS */;
INSERT INTO `questions` VALUES ('046b38d2-7d97-48b0-be44-cca6e513712e','What is the name of Naruto’s father?','2b0c2301-a915-4c08-a2c1-dca121ce0898'),('07215da9-a760-4570-a9d2-b5f42731f0c6','Who was Naruto’s first real friend?','2b0c2301-a915-4c08-a2c1-dca121ce0898'),('14830709-53cc-476a-b8b1-4533d5e5a098','Which clan does Sasuke Uchiha belong to?','2b0c2301-a915-4c08-a2c1-dca121ce0898'),('158fbcde-f251-4f97-9d91-de548cec5187','What is the name of the Hidden Leaf Village’s most powerful ninja title?','2b0c2301-a915-4c08-a2c1-dca121ce0898'),('22c1026a-d528-45e6-b216-7c7fb359eeae','What special eye technique does Kakashi possess?','2b0c2301-a915-4c08-a2c1-dca121ce0898'),('4bfd7beb-be8d-4b5c-87a6-84d0c56b7299','What is the name of the nine-tailed beast sealed inside Naruto?','2b0c2301-a915-4c08-a2c1-dca121ce0898'),('5c037750-37e4-47a3-ac6d-facd2ec82b22','Who is the leader of Team 7?','2b0c2301-a915-4c08-a2c1-dca121ce0898'),('6482873e-b8ff-4419-92c7-18b30ff81eda','What is the name of the organization Itachi Uchiha belongs to?','2b0c2301-a915-4c08-a2c1-dca121ce0898'),('916b0dda-3cf7-4326-b31f-bfee9d895897','Who is the Fifth Hokage?','2b0c2301-a915-4c08-a2c1-dca121ce0898'),('f7a33701-eb58-499f-a150-10f5b076797a','What is the name of Naruto\'s signature jutsu?','2b0c2301-a915-4c08-a2c1-dca121ce0898');
/*!40000 ALTER TABLE `questions` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-08 13:53:57
