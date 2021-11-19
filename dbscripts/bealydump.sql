-- MySQL dump 10.13  Distrib 8.0.27, for macos10.15 (x86_64)
--
-- Host: localhost    Database: bealy
-- ------------------------------------------------------
-- Server version	8.0.27

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `bealy`
--

CREATE DATABASE IF NOT EXISTS `bealy` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `bealy`;

--
-- Table structure for table `files`
--

DROP TABLE IF EXISTS `files`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `files` (
  `fileId` varchar(128) NOT NULL,
  `fileContents` blob,
  `roomId` varchar(128) NOT NULL,
  PRIMARY KEY (`fileId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `files`
--

LOCK TABLES `files` WRITE;
/*!40000 ALTER TABLE `files` DISABLE KEYS */;
INSERT INTO `files` VALUES ('Avenant Traineeship Agreement GF_signed.pdf',_binary 'blob:http://localhost:3000/ccd792e5-e0eb-425f-b59d-13d2796cf0c3','bob.aaa'),('download (3).html',_binary 'blob:http://localhost:3000/58d64c8e-9dbb-4de9-ad15-6d124f9e7047','bob.aaa'),('FR CV (1).pdf',_binary 'blob:http://localhost:3000/d44aec05-e6c4-42bc-ae25-fff892748390','undefined'),('GIUSEPPEFITZSIMMONS CV_FR.pdf',_binary 'blob:http://localhost:3000/cfefdd5d-b164-4513-a55b-22c7c352c615','bob.aaa'),('home.html',_binary 'blob:http://localhost:3000/94a1976d-5d62-4d80-8a32-ceb3fd10946a','bob.aaa'),('Lettre de motivation FR.pdf',_binary 'blob:http://localhost:3000/2e71434d-f0f0-44d8-8507-d4990dec7866','bob.aaa'),('Pino CV.docx',_binary 'blob:http://localhost:3000/af54aad0-2b34-427b-9c70-24a92edba06e','bob.aaa'),('pino italian passport.jpg',_binary 'blob:http://localhost:3000/dbad9f89-ebf1-4e6b-a2e6-2ae41d1f0a89','bob.aaa'),('uimjpcI.html',_binary 'blob:http://localhost:3000/5a985966-3062-4686-8729-b7e85d38c9d8','bob.aaa'),('Untitled Diagram.png',_binary 'blob:http://localhost:3000/7ab8bb88-54dc-49d7-abbf-57f935d80c67','bob.aaa'),('Untitled document (1).docx',_binary 'blob:http://localhost:3000/9ba054c9-fdaf-4d6d-8fc8-1904aa125c3b','undefined');
/*!40000 ALTER TABLE `files` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `room`
--

DROP TABLE IF EXISTS `room`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `room` (
  `currentUser` varchar(45) NOT NULL,
  `invitedUser` varchar(45) NOT NULL,
  PRIMARY KEY (`currentUser`,`invitedUser`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `room`
--

LOCK TABLES `room` WRITE;
/*!40000 ALTER TABLE `room` DISABLE KEYS */;
INSERT INTO `room` VALUES ('bob','aaa'),('bob','aezrgrtgfdsq'),('bob','undefined'),('undefined','undefined');
/*!40000 ALTER TABLE `room` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` varchar(45) NOT NULL,
  `password` varchar(256) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('bob','218df44e1d172a4df5cc9d6e8d7d88ffaeaad3c96796f1d098375d883e1a4418'),('bob2','218df44e1d172a4df5cc9d6e8d7d88ffaeaad3c96796f1d098375d883e1a4418'),('bob3','218df44e1d172a4df5cc9d6e8d7d88ffaeaad3c96796f1d098375d883e1a4418');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-11-19 17:59:14
