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
-- Table structure for table `quizzes`
--

DROP TABLE IF EXISTS `quizzes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `quizzes` (
  `Id` char(36) CHARACTER SET ascii COLLATE ascii_general_ci NOT NULL,
  `Title` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `LessonId` char(36) CHARACTER SET ascii COLLATE ascii_general_ci NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `IX_Quizzes_LessonId` (`LessonId`),
  CONSTRAINT `FK_Quizzes_Lessons_LessonId` FOREIGN KEY (`LessonId`) REFERENCES `lessons` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quizzes`
--

LOCK TABLES `quizzes` WRITE;
/*!40000 ALTER TABLE `quizzes` DISABLE KEYS */;
INSERT INTO `quizzes` VALUES ('1a86fcc5-8234-4b54-b769-d4b0b60e87b7','Villagers\' Recognition','244c9091-3b1d-4ebb-9381-ddd76d05c091'),('2b0c2301-a915-4c08-a2c1-dca121ce0898','Academy Graduate','24253e72-6d76-44d6-af27-f4f626cc4e31'),('5ccccfbe-dca3-4328-b594-cef68db45b07','A-Rank Mission','7ba89728-ab5b-4ed7-bc69-5ada9ecda318'),('6ab27e7d-c87e-467c-a373-63e34bb989fe','Test trim function with long quiz title. Is this long enough','531fd38d-b268-4c81-9ecb-b4477a0ba533'),('90c5b659-aff3-4a65-a614-1e8eda4e66f3','Quiz1','531fd38d-b268-4c81-9ecb-b4477a0ba533'),('ad683190-8ca8-48bb-9ec6-95284a88b644','Jonin Exam Round 2','b8c1d5a8-a642-43d0-a056-e6066098bf60'),('c7e22329-57d2-4506-acb8-f6ae66ef00b1','Villagers\' Trust','244c9091-3b1d-4ebb-9381-ddd76d05c091'),('ce735a43-ad7b-4a34-adba-1ec5459bf437','Quiz3','531fd38d-b268-4c81-9ecb-b4477a0ba533'),('dc707edd-0227-4ace-9f85-c2b9c4bfaa1b','Quiz1','531fd38d-b268-4c81-9ecb-b4477a0ba533'),('e15f50d3-9425-456a-aaa7-2bcd42d15aac','Chunin Exam Round 2','95ce6cba-e569-4524-ba16-d1201a5c06f8'),('e8e89620-d22e-4bde-8210-e1ff4e46bc17','S-Rank Mission','7ba89728-ab5b-4ed7-bc69-5ada9ecda318'),('f1241fc3-6b65-4857-b19f-f141d537346a','Chunin Exam Round 1','95ce6cba-e569-4524-ba16-d1201a5c06f8'),('f124a2f8-9c99-4acb-b061-7761a55800a6','Jonin Exam Round 1','b8c1d5a8-a642-43d0-a056-e6066098bf60'),('fa845abe-8361-43ad-974f-c477056ef799','B-Rank Mission','b8c1d5a8-a642-43d0-a056-e6066098bf60');
/*!40000 ALTER TABLE `quizzes` ENABLE KEYS */;
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
