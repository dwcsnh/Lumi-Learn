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
-- Table structure for table `courses`
--

DROP TABLE IF EXISTS `courses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `courses` (
  `Id` char(36) CHARACTER SET ascii COLLATE ascii_general_ci NOT NULL,
  `InstructorId` char(36) CHARACTER SET ascii COLLATE ascii_general_ci NOT NULL,
  `Title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Description` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `Thumbnail` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `TopicId` char(36) CHARACTER SET ascii COLLATE ascii_general_ci NOT NULL,
  `Timestamp` datetime(6) NOT NULL DEFAULT '0001-01-01 00:00:00.000000',
  PRIMARY KEY (`Id`),
  UNIQUE KEY `IX_Courses_InstructorId_Title` (`InstructorId`,`Title`),
  KEY `IX_Courses_TopicId` (`TopicId`),
  CONSTRAINT `FK_Courses_Topics_TopicId` FOREIGN KEY (`TopicId`) REFERENCES `topics` (`Id`) ON DELETE CASCADE,
  CONSTRAINT `FK_Courses_Users_InstructorId` FOREIGN KEY (`InstructorId`) REFERENCES `users` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `courses`
--

LOCK TABLES `courses` WRITE;
/*!40000 ALTER TABLE `courses` DISABLE KEYS */;
INSERT INTO `courses` VALUES ('1af984e6-bbae-4aca-9c06-d80622230b9a','6d378aa7-1e5d-4e5a-9c08-a17bd1a62a15','Itachi','sasuke','string','2677ba65-0dd0-42bb-853e-0ef3452f543f','2025-05-02 00:16:01.408435'),('3b2c9228-fe69-4c26-a55e-2b208eb1e9fc','6d378aa7-1e5d-4e5a-9c08-a17bd1a62a15','Newewezzzz',NULL,NULL,'417a8839-4c8a-4ff0-b156-e4622de1414a','2025-04-28 13:30:52.814927'),('4dee65c2-418a-48fe-bb17-f5c6a804bee5','6d378aa7-1e5d-4e5a-9c08-a17bd1a62a15','Not This One',NULL,NULL,'31ed3557-513b-43ef-bed2-2f7b5f088fee','0001-01-01 00:00:00.000000'),('651b2849-4022-41da-b7e7-9b4651b1686b','6d378aa7-1e5d-4e5a-9c08-a17bd1a62a15','UploadImage',NULL,'https://lumi-learn.s3.ap-southeast-2.amazonaws.com/course/651b2849-4022-41da-b7e7-9b4651b1686b','2718ccdd-cdf6-4855-b8c7-65f6f4dd33b9','2025-05-08 11:11:34.822395'),('6fea4d54-8ce9-453c-af2b-5ceda1ce034a','6d378aa7-1e5d-4e5a-9c08-a17bd1a62a15','test create course','course descriptionnnnnn','string','66fce7bd-3fa6-4580-9b49-9c0083304456','2025-05-02 00:14:04.342981'),('7a7c2637-93ff-415b-b4b1-abb0d5bdcad9','6d378aa7-1e5d-4e5a-9c08-a17bd1a62a15','New Title with new Topic','string','string','8420fc8a-ebac-414a-a384-7dec95bb3fd4','0001-01-01 00:00:00.000000'),('8102c509-e3e6-4d83-b77a-5b365f8f0f91','6d378aa7-1e5d-4e5a-9c08-a17bd1a62a15','No bridge log','Javascript logs will be removed from Metro in React Native 0.77','string','66fce7bd-3fa6-4580-9b49-9c0083304456','2025-05-02 00:36:33.662205'),('843e0642-af39-4358-9e84-a2022767aaf3','6d378aa7-1e5d-4e5a-9c08-a17bd1a62a15','Not that One','string','string','417a8839-4c8a-4ff0-b156-e4622de1414a','0001-01-01 00:00:00.000000'),('99ad0bff-ba3b-4a28-aa2b-ee1793783d6f','6d378aa7-1e5d-4e5a-9c08-a17bd1a62a15','TestTitle','Something in here is description','Thumbnail nef','31ed3557-513b-43ef-bed2-2f7b5f088fee','2025-05-07 14:31:34.696139'),('a1a4a6dc-9ba7-4d79-b1ab-e10766813460','7d5797c1-bfab-43a6-a004-d45c0d92fbe6','This belong to dotrongbinhf','string','string','751750c8-f581-456c-91d0-3862651a90a1','0001-01-01 00:00:00.000000'),('aa5985ad-317e-4943-a582-a936567e5706','6d378aa7-1e5d-4e5a-9c08-a17bd1a62a15','Sasuke','Itachi','string','2677ba65-0dd0-42bb-853e-0ef3452f543f','2025-05-02 00:14:58.133607'),('b0d7250c-e9d7-42b3-b585-314ec8d9e649','6d378aa7-1e5d-4e5a-9c08-a17bd1a62a15','New Course','Mmmm','string','31ed3557-513b-43ef-bed2-2f7b5f088fee','2025-05-08 08:52:54.928424'),('d28fee64-62ae-4e1c-9b08-20c128558659','6d378aa7-1e5d-4e5a-9c08-a17bd1a62a15','One day I\'ll be Hokage','Being Hokage means to be acknowledged as the leader of the village and to have the power and will to protect others.','https://lumi-learn.s3.ap-southeast-2.amazonaws.com/course/d28fee64-62ae-4e1c-9b08-20c128558659','2677ba65-0dd0-42bb-853e-0ef3452f543f','2025-05-08 11:37:43.074414'),('ea21102b-63f4-49a0-8d6a-0ecbe86cfcb8','6d378aa7-1e5d-4e5a-9c08-a17bd1a62a15','Newewe','string','string','da1d84b6-5519-4fdf-b43a-aceb1ecf35c4','2025-04-28 13:30:07.232595'),('f639a2f6-2ae0-475c-ae15-b8ce2ee5af1f','6d378aa7-1e5d-4e5a-9c08-a17bd1a62a15','string','string','string','417a8839-4c8a-4ff0-b156-e4622de1414a','0001-01-01 00:00:00.000000');
/*!40000 ALTER TABLE `courses` ENABLE KEYS */;
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
