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
-- Table structure for table `answeroptions`
--

DROP TABLE IF EXISTS `answeroptions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `answeroptions` (
  `Id` char(36) CHARACTER SET ascii COLLATE ascii_general_ci NOT NULL,
  `Content` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `IsCorrect` tinyint(1) NOT NULL,
  `QuestionId` char(36) CHARACTER SET ascii COLLATE ascii_general_ci NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `IX_AnswerOptions_QuestionId` (`QuestionId`),
  CONSTRAINT `FK_AnswerOptions_Questions_QuestionId` FOREIGN KEY (`QuestionId`) REFERENCES `questions` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `answeroptions`
--

LOCK TABLES `answeroptions` WRITE;
/*!40000 ALTER TABLE `answeroptions` DISABLE KEYS */;
INSERT INTO `answeroptions` VALUES ('0b4adaec-a1cd-443c-87f9-a989797d4ba6','Chunin',0,'158fbcde-f251-4f97-9d91-de548cec5187'),('0ec8151c-4c2c-4c4b-b5c0-b3b709b10a87','Matatabi',0,'4bfd7beb-be8d-4b5c-87a6-84d0c56b7299'),('12bcc452-89c1-4dde-87f0-6ff4ff70cde4','Shukaku',0,'4bfd7beb-be8d-4b5c-87a6-84d0c56b7299'),('13b9ddff-7ba5-4c42-811b-50168496b18a','Kiba Inuzuka',0,'07215da9-a760-4570-a9d2-b5f42731f0c6'),('1ae6ab99-377e-4b7d-b8d2-4fcda4283f45','Orochimaru',0,'916b0dda-3cf7-4326-b31f-bfee9d895897'),('1b15084d-e958-4672-83f3-d2d8d3b12e11','Sasuke Uchiha',1,'07215da9-a760-4570-a9d2-b5f42731f0c6'),('26ab1238-ace4-411b-8f4f-332b2046ab3f','Akatsuki',1,'6482873e-b8ff-4419-92c7-18b30ff81eda'),('3e5c47c8-b281-4fe6-8388-c7bcfa8ec7aa','Yamato',0,'5c037750-37e4-47a3-ac6d-facd2ec82b22'),('4a05467b-0076-4f27-816b-99723ab90c71','Kara',0,'6482873e-b8ff-4419-92c7-18b30ff81eda'),('4ad92638-a315-4eeb-919c-5163fd4fd33f','Asuma Sarutobi',0,'5c037750-37e4-47a3-ac6d-facd2ec82b22'),('4d464e49-5ece-47c3-9416-e43f9120bcff','Tsunade',1,'916b0dda-3cf7-4326-b31f-bfee9d895897'),('57d2a18d-e20c-4202-81c0-144b50237655','Senju',0,'14830709-53cc-476a-b8b1-4533d5e5a098'),('583d2168-200b-407f-a20e-777aa8e78b78','Kakashi Hatake',1,'5c037750-37e4-47a3-ac6d-facd2ec82b22'),('5d05ce3b-c34c-4c27-adcd-eb28a70ceb20','Shikamaru Nara',0,'07215da9-a760-4570-a9d2-b5f42731f0c6'),('62d5d410-5991-439d-b2c8-0d61574df879','Jiraiya',0,'046b38d2-7d97-48b0-be44-cca6e513712e'),('64cc12af-65c5-4a27-8e8f-40cfe5767e1a','Shadow Clone Jutsu',0,'f7a33701-eb58-499f-a150-10f5b076797a'),('696f9f0b-52a4-46bd-9bc6-d45f9a353565','Kakashi Hatake',0,'046b38d2-7d97-48b0-be44-cca6e513712e'),('6afb9669-02b1-4cec-9e60-89cecb4fa3cb','Jiraiya',0,'916b0dda-3cf7-4326-b31f-bfee9d895897'),('6f0298da-320c-4cbd-803c-214bb7af1bfa','Amaterasu',0,'f7a33701-eb58-499f-a150-10f5b076797a'),('7307bfcf-deb1-4b69-b44d-912b88ab56aa','Hyuga',0,'14830709-53cc-476a-b8b1-4533d5e5a098'),('7a8677ce-c3fe-4d9f-84b5-701906689bdb','Nara',0,'14830709-53cc-476a-b8b1-4533d5e5a098'),('7bc6608f-f273-48d6-bf5b-d81495ccc369','Anbu',0,'158fbcde-f251-4f97-9d91-de548cec5187'),('8a6de8c1-7b21-43df-8c83-dfa36d469634','Hiruzen Sarutobi',0,'046b38d2-7d97-48b0-be44-cca6e513712e'),('8aee04ef-4358-4f99-bbea-e71ce976ae0f','Hiruzen Sarutobi',0,'916b0dda-3cf7-4326-b31f-bfee9d895897'),('933ec337-89b2-4ca0-ada4-0bf716f1cbea','Sharingan',1,'22c1026a-d528-45e6-b216-7c7fb359eeae'),('93a6a002-6cfb-42c2-b516-2ac48eb9f353','Jonin',0,'158fbcde-f251-4f97-9d91-de548cec5187'),('9fb77ca4-d5fc-4951-a143-5816fdf36557','Gyuki',0,'4bfd7beb-be8d-4b5c-87a6-84d0c56b7299'),('a1cec014-f3e0-49b1-aaa4-f8bc06608542','Kurama',1,'4bfd7beb-be8d-4b5c-87a6-84d0c56b7299'),('b10b73a7-0e21-4c2e-8153-5c5a18730792','Root',0,'6482873e-b8ff-4419-92c7-18b30ff81eda'),('b144b683-0112-4915-bff4-3378f6e9f370','Tenseigan',0,'22c1026a-d528-45e6-b216-7c7fb359eeae'),('b5d97169-3f1b-4d17-bd51-aa76bb637936','Minato Namikaze',1,'046b38d2-7d97-48b0-be44-cca6e513712e'),('b9b774bf-0115-4e1b-b492-c1ff1aedae0a','Sakura Haruno',0,'07215da9-a760-4570-a9d2-b5f42731f0c6'),('c6518434-599d-48c4-829b-f490907600cd','Byakugan',0,'22c1026a-d528-45e6-b216-7c7fb359eeae'),('cbcc9e81-1977-4d46-8fe9-75e524dfb100','Rasengan',1,'f7a33701-eb58-499f-a150-10f5b076797a'),('db44196c-bcfa-4bac-b9fd-75434f0d19ef','Hokage',1,'158fbcde-f251-4f97-9d91-de548cec5187'),('dfd83a36-2bac-434b-9253-5ca35ea1c28f','Chidori',0,'f7a33701-eb58-499f-a150-10f5b076797a'),('e42e85df-6393-4668-a08a-6d5405064f64','Anbu',0,'6482873e-b8ff-4419-92c7-18b30ff81eda'),('fb52a7f4-9f7b-4df2-b64c-0e7ddff1c092','Iruka Umino',0,'5c037750-37e4-47a3-ac6d-facd2ec82b22'),('fc1ad40d-19d3-4b15-91e4-21d3fca00958','Rinnegan',0,'22c1026a-d528-45e6-b216-7c7fb359eeae'),('fed5f946-001e-4622-9bd1-d77103e28105','Uchiha',1,'14830709-53cc-476a-b8b1-4533d5e5a098');
/*!40000 ALTER TABLE `answeroptions` ENABLE KEYS */;
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
