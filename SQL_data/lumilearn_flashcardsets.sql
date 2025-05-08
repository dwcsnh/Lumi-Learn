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
-- Table structure for table `flashcardsets`
--

DROP TABLE IF EXISTS `flashcardsets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `flashcardsets` (
  `Id` char(36) CHARACTER SET ascii COLLATE ascii_general_ci NOT NULL,
  `Title` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `LessonId` char(36) CHARACTER SET ascii COLLATE ascii_general_ci NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `IX_FlashCardSets_LessonId` (`LessonId`),
  CONSTRAINT `FK_FlashCardSets_Lessons_LessonId` FOREIGN KEY (`LessonId`) REFERENCES `lessons` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `flashcardsets`
--

LOCK TABLES `flashcardsets` WRITE;
/*!40000 ALTER TABLE `flashcardsets` DISABLE KEYS */;
INSERT INTO `flashcardsets` VALUES ('1f2b8e37-e2a4-4944-b943-394f6d343c30','Rasen Shuriken','7ba89728-ab5b-4ed7-bc69-5ada9ecda318'),('229a2fe9-bc53-46bb-af61-5e579ae11eb7','Test trim function with long lesson title','531fd38d-b268-4c81-9ecb-b4477a0ba533'),('2e4c5e4b-9640-4b27-ac27-3e49120a4c5f','Edo Tensei','244c9091-3b1d-4ebb-9381-ddd76d05c091'),('32b5927f-c94d-466a-a5f9-2053fbd59d62','Basic Genjutsu','95ce6cba-e569-4524-ba16-d1201a5c06f8'),('3afc268f-8317-45b5-b0bd-08716f2a4500','Sage Mode','7ba89728-ab5b-4ed7-bc69-5ada9ecda318'),('485790d5-8f9b-43ff-b588-080b369cafa7','FlashCardSet Test With Notifi','41ed8834-019b-4e9c-a07a-52730871fc77'),('522da7a5-7795-4701-b394-33d578cab9b9','FS1','531fd38d-b268-4c81-9ecb-b4477a0ba533'),('541cc184-3566-47b3-9d02-c78a2ad093d7','Summoning Jutsu','b8c1d5a8-a642-43d0-a056-e6066098bf60'),('5a0f2e19-8c8b-4c33-b8a5-352da451310e','Advanced Taijutsu','7ba89728-ab5b-4ed7-bc69-5ada9ecda318'),('5e1be25f-7724-48bd-9fc2-04c9b8582bc5','FCS5','531fd38d-b268-4c81-9ecb-b4477a0ba533'),('621efdd1-a141-4b6d-acc7-be607287f452','FCS3','531fd38d-b268-4c81-9ecb-b4477a0ba533'),('6616255f-57d4-4e1d-9106-1b4b2c08902a','FCS1','531fd38d-b268-4c81-9ecb-b4477a0ba533'),('7088512f-0125-406d-9f30-6d3371c35cd7','Clone Jutsu','24253e72-6d76-44d6-af27-f4f626cc4e31'),('71725d54-003c-44a6-962b-f2b0495858d4','Hiraishin','244c9091-3b1d-4ebb-9381-ddd76d05c091'),('72018bf6-f37a-4263-91cb-8d11b99e4186','Raikiri','244c9091-3b1d-4ebb-9381-ddd76d05c091'),('7f0d2dd7-4239-419b-9da3-572afabc8af3','FS3','531fd38d-b268-4c81-9ecb-b4477a0ba533'),('833421b2-b81e-49c4-8f08-d8345c59eded','Shadow Clone Jutsu','7ba89728-ab5b-4ed7-bc69-5ada9ecda318'),('a855afeb-4a6f-4c11-83fd-dd212c9e212a','Rasengan','b8c1d5a8-a642-43d0-a056-e6066098bf60'),('b1de9b4a-25af-44a2-af87-d3e5491152ef','Chakra Control','95ce6cba-e569-4524-ba16-d1201a5c06f8'),('b93a70c4-fbd9-4ae4-8c4d-20b567047c6d','FCS4','531fd38d-b268-4c81-9ecb-b4477a0ba533'),('c073d117-3fd3-4900-97fa-da4f86b98d3f','FCS2','531fd38d-b268-4c81-9ecb-b4477a0ba533'),('cc9085e7-c9c7-4f70-8a0d-a901c960f5d8','Transformation Jutsu','24253e72-6d76-44d6-af27-f4f626cc4e31'),('e681f6ed-c074-4b07-8a25-0834d4c202e5','Why Noti Not Working','41ed8834-019b-4e9c-a07a-52730871fc77'),('f15ea756-17e0-47ac-a9ee-d4493d83807b','Shiki Fujin','244c9091-3b1d-4ebb-9381-ddd76d05c091'),('f477f2e7-f4e9-4aa1-88a9-e0cc8d59b9b2','FS2','531fd38d-b268-4c81-9ecb-b4477a0ba533'),('f77e4467-149a-4e60-ad57-e87b9a978875','Fireball Jutsu','b8c1d5a8-a642-43d0-a056-e6066098bf60'),('f8058987-8c3c-477f-b69a-55f200993ed5','Basic Taijutsu','95ce6cba-e569-4524-ba16-d1201a5c06f8');
/*!40000 ALTER TABLE `flashcardsets` ENABLE KEYS */;
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
