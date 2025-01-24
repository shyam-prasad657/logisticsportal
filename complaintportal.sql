-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 24, 2025 at 10:11 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `complaintportal`
--

-- --------------------------------------------------------

--
-- Table structure for table `branch`
--

CREATE TABLE `branch` (
  `id` int(11) NOT NULL,
  `branch_name` varchar(255) NOT NULL,
  `state_id` int(55) NOT NULL COMMENT '1-Tamil Nadu, 2-Kerala, 3-Telangana, 4-Karnataka'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `branch`
--

INSERT INTO `branch` (`id`, `branch_name`, `state_id`) VALUES
(1, 'Mylapore', 1),
(2, 'Ernakulam', 2),
(3, 'Madhapur', 3),
(4, 'Kochi', 2),
(5, 'Coimbatore', 1),
(6, 'Mysore', 4),
(7, 'Madurai', 1),
(8, 'Salem', 1),
(9, 'Hyderabad', 3),
(10, 'Thiruvananthapuram', 2);

-- --------------------------------------------------------

--
-- Table structure for table `mfi`
--

CREATE TABLE `mfi` (
  `id` int(11) NOT NULL,
  `mfi_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `mfi`
--

INSERT INTO `mfi` (`id`, `mfi_name`) VALUES
(5, 'AXIK'),
(7, 'FDRK'),
(3, 'HDFK'),
(4, 'ICIK'),
(10, 'IDFK'),
(2, 'KVBK'),
(8, 'PNBK'),
(1, 'SBIK'),
(6, 'SYNK'),
(9, 'UBIK');

-- --------------------------------------------------------

--
-- Table structure for table `states`
--

CREATE TABLE `states` (
  `id` int(11) NOT NULL,
  `state_name` varchar(55) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `states`
--

INSERT INTO `states` (`id`, `state_name`) VALUES
(4, 'Karnataka'),
(2, 'Kerala'),
(1, 'Tamil Nadu'),
(3, 'Telangana');

-- --------------------------------------------------------

--
-- Table structure for table `status`
--

CREATE TABLE `status` (
  `id` int(11) NOT NULL,
  `status_name` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `status`
--

INSERT INTO `status` (`id`, `status_name`) VALUES
(1, 'In Process'),
(5, 'Replacement Done'),
(4, 'Replacement Raised'),
(2, 'Resolution Pending'),
(3, 'Resolved');

-- --------------------------------------------------------

--
-- Table structure for table `userdb`
--

CREATE TABLE `userdb` (
  `complaintNumber` int(11) NOT NULL,
  `complaintDate` date DEFAULT NULL,
  `customerName` varchar(100) DEFAULT NULL,
  `customerPhone` bigint(20) DEFAULT NULL,
  `mfi` int(10) DEFAULT NULL,
  `branch` int(100) NOT NULL,
  `state` int(50) NOT NULL,
  `status` int(50) NOT NULL,
  `issue` text DEFAULT NULL,
  `clientid` varchar(20) DEFAULT NULL,
  `accountid` varchar(20) DEFAULT NULL,
  `vendorName` int(100) NOT NULL,
  `remarks` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `userdb`
--

INSERT INTO `userdb` (`complaintNumber`, `complaintDate`, `customerName`, `customerPhone`, `mfi`, `branch`, `state`, `status`, `issue`, `clientid`, `accountid`, `vendorName`, `remarks`) VALUES
(1, '2023-01-12', 'Ravi Kumar', 9123456780, 1, 1, 1, 3, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vehicula orci at mauris.', '123456', '0987654321', 9, 'Issue resolved promptly.'),
(2, '2023-01-15', 'Lakshmi Nair', 9123456781, 2, 2, 2, 3, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vehicula orci at mauris.', '123456', '1234567891', 8, 'Customer satisfied with the resolution.'),
(3, '2023-01-18', 'Rajesh Reddy', 9123456782, 3, 3, 3, 1, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vehicula orci at mauris.', '123456', '1234567892', 7, 'Follow-up required.'),
(4, '2023-01-20', 'Priya Menon', 9123456783, 4, 4, 2, 4, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vehicula orci at mauris.', '123456', '1234567893', 6, 'Replacement in progress.'),
(5, '2023-01-22', 'Venkatesh Iyer', 9123456784, 5, 5, 1, 4, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vehicula orci at mauris.', '123456', '1234567894', 5, 'Awaiting replacement confirmation.'),
(6, '2023-01-24', 'Meenakshi Sundaram', 9123456785, 6, 6, 4, 2, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vehicula orci at mauris.', '123456', '1234567895', 4, 'Pending further investigation.'),
(7, '2023-01-26', 'Anand Narayanan', 9123456786, 7, 7, 1, 5, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vehicula orci at mauris.', '123456', '1234567896', 3, 'Issue fixed, no further action required.'),
(8, '2023-01-28', 'Divya Ramesh', 9123456787, 8, 8, 1, 2, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vehicula orci at mauris.', '123456', '1234567897', 2, 'Need more information from customer.'),
(9, '2023-01-30', 'Suresh Babu', 9123456788, 9, 9, 3, 2, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vehicula orci at mauris.', '123456', '1234567898', 1, 'Escalated to higher authority.'),
(10, '2023-02-01', 'Lakshmanan Pillai', 9123456789, 10, 10, 2, 1, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vehicula orci at mauris.', '123456', '1234567899', 1, 'Under review by technical team.');

-- --------------------------------------------------------

--
-- Table structure for table `vendor`
--

CREATE TABLE `vendor` (
  `id` int(11) NOT NULL,
  `vendor_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vendor`
--

INSERT INTO `vendor` (`id`, `vendor_name`) VALUES
(3, 'Bajaj'),
(8, 'Haier'),
(9, 'Hero'),
(2, 'Preethi'),
(1, 'Prestige'),
(4, 'Rico'),
(6, 'Samsung'),
(5, 'Vivo'),
(7, 'Whirlpool');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `branch`
--
ALTER TABLE `branch`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `branch_name` (`branch_name`);

--
-- Indexes for table `mfi`
--
ALTER TABLE `mfi`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `mfi_name` (`mfi_name`);

--
-- Indexes for table `states`
--
ALTER TABLE `states`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `1` (`state_name`);

--
-- Indexes for table `status`
--
ALTER TABLE `status`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `status_name` (`status_name`);

--
-- Indexes for table `userdb`
--
ALTER TABLE `userdb`
  ADD PRIMARY KEY (`complaintNumber`),
  ADD UNIQUE KEY `accountid` (`accountid`);

--
-- Indexes for table `vendor`
--
ALTER TABLE `vendor`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `vendor_name` (`vendor_name`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `branch`
--
ALTER TABLE `branch`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `mfi`
--
ALTER TABLE `mfi`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `states`
--
ALTER TABLE `states`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `vendor`
--
ALTER TABLE `vendor`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
