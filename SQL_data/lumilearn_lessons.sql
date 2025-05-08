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
-- Table structure for table `lessons`
--

DROP TABLE IF EXISTS `lessons`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lessons` (
  `Id` char(36) CHARACTER SET ascii COLLATE ascii_general_ci NOT NULL,
  `Title` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `CourseId` char(36) CHARACTER SET ascii COLLATE ascii_general_ci NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `IX_Lessons_CourseId` (`CourseId`),
  CONSTRAINT `FK_Lessons_Courses_CourseId` FOREIGN KEY (`CourseId`) REFERENCES `courses` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lessons`
--

LOCK TABLES `lessons` WRITE;
/*!40000 ALTER TABLE `lessons` DISABLE KEYS */;
INSERT INTO `lessons` VALUES ('24253e72-6d76-44d6-af27-f4f626cc4e31','Academy','d28fee64-62ae-4e1c-9b08-20c128558659'),('244c9091-3b1d-4ebb-9381-ddd76d05c091','Hokage','d28fee64-62ae-4e1c-9b08-20c128558659'),('2ae2ed27-ecb5-4e9a-8f33-7d07cbc644a7','a','8102c509-e3e6-4d83-b77a-5b365f8f0f91'),('2b715312-aaa8-4aff-a1b1-1ee77e7998be','a','8102c509-e3e6-4d83-b77a-5b365f8f0f91'),('38afb0f4-e1b9-495f-ad67-9f628a04d72e','b','8102c509-e3e6-4d83-b77a-5b365f8f0f91'),('41ed8834-019b-4e9c-a07a-52730871fc77','Lesson Test With Noti','a1a4a6dc-9ba7-4d79-b1ab-e10766813460'),('531fd38d-b268-4c81-9ecb-b4477a0ba533','L1','4dee65c2-418a-48fe-bb17-f5c6a804bee5'),('7ba89728-ab5b-4ed7-bc69-5ada9ecda318','Jonin','d28fee64-62ae-4e1c-9b08-20c128558659'),('95ce6cba-e569-4524-ba16-d1201a5c06f8','Genin','d28fee64-62ae-4e1c-9b08-20c128558659'),('b8c1d5a8-a642-43d0-a056-e6066098bf60','Chunin','d28fee64-62ae-4e1c-9b08-20c128558659');
/*!40000 ALTER TABLE `lessons` ENABLE KEYS */;
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
