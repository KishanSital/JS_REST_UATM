-- MySQL dump 10.13  Distrib 8.0.18, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: cbvs
-- ------------------------------------------------------
-- Server version	8.0.18

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
-- Table structure for table `bank_account`
--

DROP TABLE IF EXISTS `bank_account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bank_account` (
  `account_number` bigint(20) NOT NULL,
  `bank_balance` decimal(19,2) DEFAULT NULL,
  `bankAccountType_id` bigint(20) DEFAULT NULL,
  `bankCard_card_number` bigint(20) DEFAULT NULL,
  `bankCurrency_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`account_number`),
  KEY `FK6pv8gfrxo8k0hfxnuoy7o5rcc` (`bankAccountType_id`),
  KEY `FK9h6ti6dk73tirb69lgclr82dj` (`bankCard_card_number`),
  KEY `FKahwdjx9tbwgdv0sb0t5xhsma2` (`bankCurrency_id`),
  CONSTRAINT `FK6pv8gfrxo8k0hfxnuoy7o5rcc` FOREIGN KEY (`bankAccountType_id`) REFERENCES `bank_account_type` (`id`),
  CONSTRAINT `FK9h6ti6dk73tirb69lgclr82dj` FOREIGN KEY (`bankCard_card_number`) REFERENCES `bank_card` (`card_number`),
  CONSTRAINT `FKahwdjx9tbwgdv0sb0t5xhsma2` FOREIGN KEY (`bankCurrency_id`) REFERENCES `bank_currency` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bank_account`
--

LOCK TABLES `bank_account` WRITE;
/*!40000 ALTER TABLE `bank_account` DISABLE KEYS */;
INSERT INTO `bank_account` VALUES (1,7000.00,1,3553,1),(2,8000.00,2,3553,3),(3,1000.00,2,3553,2);
/*!40000 ALTER TABLE `bank_account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bank_account_type`
--

DROP TABLE IF EXISTS `bank_account_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bank_account_type` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `bank_account_type_description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bank_account_type`
--

LOCK TABLES `bank_account_type` WRITE;
/*!40000 ALTER TABLE `bank_account_type` DISABLE KEYS */;
INSERT INTO `bank_account_type` VALUES (1,'SPAAR\r'),(2,'GIRO');
/*!40000 ALTER TABLE `bank_account_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bank_card`
--

DROP TABLE IF EXISTS `bank_card`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bank_card` (
  `card_number` bigint(20) NOT NULL,
  `bank_pin` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`card_number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bank_card`
--

LOCK TABLES `bank_card` WRITE;
/*!40000 ALTER TABLE `bank_card` DISABLE KEYS */;
INSERT INTO `bank_card` VALUES (3553,8709);
/*!40000 ALTER TABLE `bank_card` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bank_client`
--

DROP TABLE IF EXISTS `bank_client`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bank_client` (
  `id_card` bigint(20) NOT NULL,
  `achternaam` varchar(255) DEFAULT NULL,
  `geboorte_datum` date DEFAULT NULL,
  `voornaam` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_card`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bank_client`
--

LOCK TABLES `bank_client` WRITE;
/*!40000 ALTER TABLE `bank_client` DISABLE KEYS */;
INSERT INTO `bank_client` VALUES (9687,'Kishan','1999-06-03','Sital');
/*!40000 ALTER TABLE `bank_client` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bank_client_card`
--

DROP TABLE IF EXISTS `bank_client_card`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bank_client_card` (
  `bank_client_id_card` bigint(20) NOT NULL,
  `bank_card_card_number` bigint(20) NOT NULL,
  KEY `FKivlbrb07jkm2eho8faq2esdnd` (`bank_card_card_number`),
  KEY `FK26w9r8j2oilu31tcik2jh6ft3` (`bank_client_id_card`),
  CONSTRAINT `FK26w9r8j2oilu31tcik2jh6ft3` FOREIGN KEY (`bank_client_id_card`) REFERENCES `bank_client` (`id_card`),
  CONSTRAINT `FKivlbrb07jkm2eho8faq2esdnd` FOREIGN KEY (`bank_card_card_number`) REFERENCES `bank_card` (`card_number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bank_client_card`
--

LOCK TABLES `bank_client_card` WRITE;
/*!40000 ALTER TABLE `bank_client_card` DISABLE KEYS */;
INSERT INTO `bank_client_card` VALUES (9687,3553);
/*!40000 ALTER TABLE `bank_client_card` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bank_currency`
--

DROP TABLE IF EXISTS `bank_currency`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bank_currency` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `currency_code` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bank_currency`
--

LOCK TABLES `bank_currency` WRITE;
/*!40000 ALTER TABLE `bank_currency` DISABLE KEYS */;
INSERT INTO `bank_currency` VALUES (1,'SRD'),(2,'USD'),(3,'EURO');
/*!40000 ALTER TABLE `bank_currency` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'cbvs'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-01-26 17:04:05
