-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 28, 2025 at 04:15 PM
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
-- Table structure for table `test-userdb`
--

CREATE TABLE `test-userdb` (
  `id` int(11) NOT NULL,
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
-- Dumping data for table `test-userdb`
--

INSERT INTO `test-userdb` (`id`, `complaintDate`, `customerName`, `customerPhone`, `mfi`, `branch`, `state`, `status`, `issue`, `clientid`, `accountid`, `vendorName`, `remarks`) VALUES
(1, '2023-01-12', 'Ravi Kumar', 9123456780, 1, 1, 1, 3, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vehicula orci at mauris.', '123456', '0987654321', 9, 'Issue resolved promptly.'),
(2, '2023-01-15', 'Lakshmi Nair', 9123456781, 2, 2, 2, 3, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vehicula orci at mauris.', '123456', '1234567891', 8, 'Customer satisfied with the resolution.'),
(3, '2023-01-18', 'Rajesh Reddy', 9123456782, 3, 3, 3, 1, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vehicula orci at mauris.', '123456', '1234567892', 7, 'Follow-up required.'),
(4, '2023-01-20', 'Priya Menon', 9123456783, 4, 4, 2, 4, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vehicula orci at mauris.', '123456', '1234567893', 6, 'Replacement in progress.'),
(5, '2023-01-22', 'Venkatesh Iyer', 9123456784, 5, 5, 1, 4, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vehicula orci at mauris.', '123456', '1234567894', 5, 'Awaiting replacement confirmation.'),
(6, '2023-01-24', 'Meenakshi Sundaram', 9123456785, 6, 6, 4, 2, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vehicula orci at mauris.', '123456', '1234567895', 4, 'Pending further investigation.'),
(7, '2023-01-26', 'Anand Narayanan', 9123456786, 7, 7, 1, 5, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vehicula orci at mauris.', '123456', '1234567896', 3, 'Issue fixed, no further action required.'),
(8, '2023-01-28', 'Divya Ramesh', 9123456787, 8, 8, 1, 2, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vehicula orci at mauris.', '123456', '1234567897', 2, 'Need more information from customer.'),
(9, '2023-01-30', 'Suresh Babu', 9123456788, 9, 9, 3, 2, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vehicula orci at mauris.', '123456', '1234567898', 1, 'Escalated to higher authority.'),
(10, '2023-02-01', 'Lakshmanan Pillai', 9123456789, 10, 10, 2, 1, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vehicula orci at mauris.', '123456', '1234567899', 1, 'Under review by technical team.'),
(11, '2023-02-02', 'Arjun Menon', 9123456790, 3, 2, 1, 2, 'Customer reported delayed delivery.', '123457', '1234567900', 5, 'Follow-up required with vendor.'),
(12, '2023-02-04', 'Shweta Sharma', 9123456791, 4, 3, 2, 3, 'Received damaged product.', '123457', '1234567901', 6, 'Replacement initiated.'),
(13, '2023-02-06', 'Nikhil Raj', 9123456792, 2, 5, 3, 1, 'Issue with product installation.', '123458', '1234567902', 4, 'Technician visit scheduled.'),
(14, '2023-02-08', 'Asha Gupta', 9123456793, 6, 7, 4, 4, 'Product missing from order.', '123459', '1234567903', 3, 'Replacement in progress.'),
(15, '2023-02-10', 'Prakash Singh', 9123456794, 7, 8, 1, 5, 'Warranty claim submitted.', '123459', '1234567904', 2, 'Issue resolved, claim approved.'),
(16, '2023-02-12', 'Rekha Nair', 9123456795, 1, 9, 2, 2, 'Payment issue reported.', '123460', '1234567905', 7, 'Resolved by payment gateway.'),
(17, '2023-02-14', 'Gopal Krishnan', 9123456796, 9, 10, 3, 3, 'Customer requested refund.', '123461', '1234567906', 8, 'Refund processed successfully.'),
(18, '2023-02-16', 'Deepa Rajan', 9123456797, 5, 4, 4, 1, 'Delivery address incorrect.', '123462', '1234567907', 1, 'Updated address and re-dispatched.'),
(19, '2023-02-18', 'Kiran Kumar', 9123456798, 8, 6, 1, 2, 'Issue with product quality.', '123463', '1234567908', 9, 'Investigation underway.'),
(20, '2023-02-20', 'Sahana Mohan', 9123456799, 10, 7, 2, 4, 'Duplicate product delivered.', '123464', '1234567909', 5, 'Replacement initiated.'),
(21, '2023-02-22', 'Ajay Prasad', 9123456800, 3, 1, 3, 5, 'Defective product reported.', '123465', '1234567910', 6, 'Issue resolved after inspection.'),
(22, '2023-02-24', 'Meera Nair', 9123456801, 4, 2, 4, 3, 'Wrong product received.', '123466', '1234567911', 4, 'Replacement processed.'),
(23, '2023-02-26', 'Rohit Shetty', 9123456802, 2, 3, 1, 1, 'Customer wants to cancel order.', '123467', '1234567912', 3, 'Order cancellation completed.'),
(24, '2023-02-28', 'Preeti Sharma', 9123456803, 6, 4, 2, 2, 'Shipping delay reported.', '123468', '1234567913', 2, 'Issue resolved, product delivered.'),
(25, '2023-03-02', 'Vikram Iyer', 9123456804, 7, 5, 3, 4, 'Incorrect item dispatched.', '123469', '1234567914', 8, 'Replacement in progress.'),
(26, '2023-03-04', 'Latha Pillai', 9123456805, 8, 6, 4, 5, 'Warranty claim rejected.', '123470', '1234567915', 7, 'Issue resolved after review.'),
(27, '2023-03-06', 'Ramesh Babu', 9123456806, 1, 7, 1, 3, 'Customer unhappy with service.', '123471', '1234567916', 5, 'Escalated to support team.'),
(28, '2023-03-08', 'Varsha Jain', 9123456807, 9, 8, 2, 1, 'Order not delivered.', '123472', '1234567917', 4, 'Delivery expedited.'),
(29, '2023-03-10', 'Suraj Das', 9123456808, 10, 9, 3, 2, 'Issue with refund process.', '123473', '1234567918', 6, 'Refund issued successfully.'),
(30, '2023-03-12', 'Maya Sundaram', 9123456809, 5, 10, 4, 4, 'Customer reported missing item.', '123474', '1234567919', 3, 'Replacement initiated.'),
(31, '2023-03-14', 'Abhinav Reddy', 9123456810, 3, 1, 1, 5, 'Customer wants faster delivery.', '123475', '1234567920', 9, 'Order prioritized.'),
(32, '2023-03-16', 'Nandini Prasad', 9123456811, 4, 2, 2, 3, 'Received damaged product.', '123476', '1234567921', 8, 'Replacement processed.'),
(33, '2023-03-18', 'Pradeep Menon', 9123456812, 2, 3, 3, 1, 'Issue with product packaging.', '123477', '1234567922', 7, 'Investigation underway.'),
(34, '2023-03-20', 'Arun Gupta', 9123456813, 6, 4, 4, 2, 'Complaint about customer service.', '123478', '1234567923', 5, 'Training provided to support staff.'),
(35, '2023-03-22', 'Isha Mohan', 9123456814, 7, 5, 1, 4, 'Wrong product delivered.', '123479', '1234567924', 6, 'Replacement in progress.'),
(36, '2023-03-24', 'Rajeev Pillai', 9123456815, 8, 6, 2, 5, 'Warranty claim approved.', '123480', '1234567925', 4, 'Issue resolved, claim processed.'),
(37, '2023-03-26', 'Leena Ramesh', 9123456816, 1, 7, 3, 3, 'Complaint about delivery delay.', '123481', '1234567926', 2, 'Delivery expedited.'),
(38, '2023-03-28', 'Aditya Nair', 9123456817, 9, 8, 4, 1, 'Customer requested order modification.', '123482', '1234567927', 1, 'Modification completed.'),
(39, '2023-03-30', 'Ritu Sharma', 9123456818, 10, 9, 1, 2, 'Issue with payment confirmation.', '123483', '1234567928', 9, 'Issue resolved with payment gateway.'),
(40, '2023-04-01', 'Sachin Joshi', 9123456819, 5, 10, 2, 4, 'Product not as described.', '123484', '1234567929', 8, 'Replacement in progress.'),
(41, '2023-04-03', 'Neha Reddy', 9123456820, 3, 1, 3, 5, 'Defective product reported.', '123485', '1234567930', 7, 'Issue resolved after inspection.'),
(42, '2023-04-05', 'Arvind Kumar', 9123456821, 4, 2, 4, 3, 'Wrong product received.', '123486', '1234567931', 5, 'Replacement processed.'),
(43, '2023-04-07', 'Meenal Jain', 9123456822, 2, 3, 1, 1, 'Customer wants to cancel order.', '123487', '1234567932', 3, 'Order cancellation completed.'),
(44, '2023-04-09', 'Siddharth Das', 9123456823, 6, 4, 2, 2, 'Shipping delay reported.', '123488', '1234567933', 2, 'Issue resolved, product delivered.'),
(45, '2023-04-11', 'Kavya Pillai', 9123456824, 7, 5, 3, 4, 'Incorrect item dispatched.', '123489', '1234567934', 8, 'Replacement in progress.'),
(46, '2023-04-13', 'Hari Krishnan', 9123456825, 8, 6, 4, 5, 'Warranty claim rejected.', '123490', '1234567935', 7, 'Issue resolved after review.'),
(47, '2023-04-15', 'Aditi Ramesh', 9123456826, 1, 7, 1, 3, 'Customer unhappy with service.', '123491', '1234567936', 5, 'Escalated to support team.'),
(48, '2023-04-17', 'Manoj Shetty', 9123456827, 9, 8, 2, 1, 'Order not delivered.', '123492', '1234567937', 4, 'Delivery expedited.'),
(49, '2023-04-19', 'Anjali Mohan', 9123456828, 10, 9, 3, 2, 'Issue with refund process.', '123493', '1234567938', 6, 'Refund issued successfully.');

-- --------------------------------------------------------

--
-- Table structure for table `userdb`
--

CREATE TABLE `userdb` (
  `id` int(11) NOT NULL,
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
  `remarks` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `userdb`
--

INSERT INTO `userdb` (`id`, `complaintDate`, `customerName`, `customerPhone`, `mfi`, `branch`, `state`, `status`, `issue`, `clientid`, `accountid`, `vendorName`, `remarks`) VALUES
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
-- Indexes for table `test-userdb`
--
ALTER TABLE `test-userdb`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `accountid` (`accountid`);

--
-- Indexes for table `userdb`
--
ALTER TABLE `userdb`
  ADD PRIMARY KEY (`id`),
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
-- AUTO_INCREMENT for table `status`
--
ALTER TABLE `status`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `test-userdb`
--
ALTER TABLE `test-userdb`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT for table `userdb`
--
ALTER TABLE `userdb`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `vendor`
--
ALTER TABLE `vendor`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
