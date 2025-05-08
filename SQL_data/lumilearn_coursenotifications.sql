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
-- Table structure for table `coursenotifications`
--

DROP TABLE IF EXISTS `coursenotifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `coursenotifications` (
  `CourseId` char(36) CHARACTER SET ascii COLLATE ascii_general_ci NOT NULL,
  `NotificationId` char(36) CHARACTER SET ascii COLLATE ascii_general_ci NOT NULL,
  `Type` int NOT NULL,
  PRIMARY KEY (`CourseId`,`NotificationId`),
  UNIQUE KEY `IX_CourseNotifications_NotificationId` (`NotificationId`),
  CONSTRAINT `FK_CourseNotifications_Courses_CourseId` FOREIGN KEY (`CourseId`) REFERENCES `courses` (`Id`) ON DELETE CASCADE,
  CONSTRAINT `FK_CourseNotifications_Notifications_NotificationId` FOREIGN KEY (`NotificationId`) REFERENCES `notifications` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `coursenotifications`
--

LOCK TABLES `coursenotifications` WRITE;
/*!40000 ALTER TABLE `coursenotifications` DISABLE KEYS */;
INSERT INTO `coursenotifications` VALUES ('1af984e6-bbae-4aca-9c06-d80622230b9a','13b7e620-f0b0-41b5-805a-86556d8cb622',2),('4dee65c2-418a-48fe-bb17-f5c6a804bee5','2d2d3156-26ad-431d-b8bd-1e484965aaad',0),('4dee65c2-418a-48fe-bb17-f5c6a804bee5','3301af49-313b-4c7c-901d-5a5b4d05a6d4',0),('4dee65c2-418a-48fe-bb17-f5c6a804bee5','3cddf7bb-e606-4bb5-b6b4-c4b802692758',1),('4dee65c2-418a-48fe-bb17-f5c6a804bee5','4e98a496-fa54-4cb7-92c9-1202115dc18f',1),('4dee65c2-418a-48fe-bb17-f5c6a804bee5','504507bf-0cc1-48ef-880b-a8646c1cf506',0),('4dee65c2-418a-48fe-bb17-f5c6a804bee5','5246f604-dd0a-4b8d-bfcc-b8d41620cbc6',0),('4dee65c2-418a-48fe-bb17-f5c6a804bee5','657b04b0-3392-4ba4-b768-0c99038e7102',0),('4dee65c2-418a-48fe-bb17-f5c6a804bee5','b97b9cc9-f438-4dfb-9ccc-1666166211e7',1),('4dee65c2-418a-48fe-bb17-f5c6a804bee5','c73a2d5c-5f1f-4c13-83cf-34af57d7584e',0),('4dee65c2-418a-48fe-bb17-f5c6a804bee5','d9fb9d82-a94f-4245-b816-fb014a23ee5e',0),('4dee65c2-418a-48fe-bb17-f5c6a804bee5','ee332888-42c1-4092-a203-126ca4d8b416',0),('651b2849-4022-41da-b7e7-9b4651b1686b','95965c4c-dfcc-482c-8754-a852bac61457',2),('a1a4a6dc-9ba7-4d79-b1ab-e10766813460','4dbbec76-f858-4a60-98af-77909359455e',0),('d28fee64-62ae-4e1c-9b08-20c128558659','02001fba-4c4d-44ca-84cd-07f59184fa29',3),('d28fee64-62ae-4e1c-9b08-20c128558659','0561abdb-f262-42ea-aaed-dc008f541ab6',1),('d28fee64-62ae-4e1c-9b08-20c128558659','08d53be4-9f6c-48c9-8296-39f6a54e3770',3),('d28fee64-62ae-4e1c-9b08-20c128558659','0bd7b7c1-7e64-4f75-a268-13ea0a06a067',1),('d28fee64-62ae-4e1c-9b08-20c128558659','11af5e88-d483-4e0b-b7af-d318d28d68b0',0),('d28fee64-62ae-4e1c-9b08-20c128558659','131aaadd-a057-4003-b3b1-00e8f90b0da5',0),('d28fee64-62ae-4e1c-9b08-20c128558659','1420fecd-50ba-4187-86ba-048b465adb09',1),('d28fee64-62ae-4e1c-9b08-20c128558659','2873c34d-2f24-42c8-bfc0-a688fd096dc9',0),('d28fee64-62ae-4e1c-9b08-20c128558659','2a0c3bac-4540-424d-a26b-c3e5f11a63f2',0),('d28fee64-62ae-4e1c-9b08-20c128558659','49d31ba5-6181-4f7c-be5f-3fdf45f5c101',1),('d28fee64-62ae-4e1c-9b08-20c128558659','5cc08e4f-c7dd-48f7-8b50-d03559195cd1',0),('d28fee64-62ae-4e1c-9b08-20c128558659','7219888e-64e6-4ead-b26d-e1e5f1753d86',1),('d28fee64-62ae-4e1c-9b08-20c128558659','88703a4b-c485-47bd-86df-5c81ce973a53',3),('d28fee64-62ae-4e1c-9b08-20c128558659','8a678822-6d94-41e5-8908-fc6639e99a3b',0),('d28fee64-62ae-4e1c-9b08-20c128558659','8d82faab-f30c-4984-921a-4bf4693f4fb5',1),('d28fee64-62ae-4e1c-9b08-20c128558659','96617b5d-f54f-4e70-889c-ccedbf2e798a',1),('d28fee64-62ae-4e1c-9b08-20c128558659','9f3cdac2-d004-461a-a498-16b3d17c9d0a',0),('d28fee64-62ae-4e1c-9b08-20c128558659','bafa075d-7a96-4026-a1b0-128d029ad780',0),('d28fee64-62ae-4e1c-9b08-20c128558659','bee7eb48-308c-4907-9ff2-d671b2675ca4',0),('d28fee64-62ae-4e1c-9b08-20c128558659','ca50bbf1-421a-485b-a877-eb6f2b2f39f3',1),('d28fee64-62ae-4e1c-9b08-20c128558659','ceffe3fd-a4d1-4d3e-a387-669216fc2690',0),('d28fee64-62ae-4e1c-9b08-20c128558659','e6d64d0b-8b39-4c2d-b5f6-504ddc26a21d',0),('d28fee64-62ae-4e1c-9b08-20c128558659','e83649bc-7554-4276-a037-0c3d7004c684',0),('d28fee64-62ae-4e1c-9b08-20c128558659','ef330e9c-e390-4581-a00c-e0185c3d9c24',1),('d28fee64-62ae-4e1c-9b08-20c128558659','ef46a916-7d85-4900-b937-c1c7c0d3d677',0),('d28fee64-62ae-4e1c-9b08-20c128558659','f5fa61d9-a91b-4362-bf9f-752453ef01c5',1),('d28fee64-62ae-4e1c-9b08-20c128558659','fafb1cea-614c-49ac-8e41-bfccea303950',0),('d28fee64-62ae-4e1c-9b08-20c128558659','fbe2a919-0cb7-41c6-bf30-b51eb65e1cc6',0),('d28fee64-62ae-4e1c-9b08-20c128558659','ffafe6a9-896e-48fe-af3a-537d86f976ba',0);
/*!40000 ALTER TABLE `coursenotifications` ENABLE KEYS */;
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
