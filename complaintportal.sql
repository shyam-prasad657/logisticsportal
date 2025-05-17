-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 13, 2025 at 11:45 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

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
-- Table structure for table `order_history`
--

CREATE TABLE `order_history` (
  `id` int(11) NOT NULL,
  `accountid` varchar(255) NOT NULL,
  `action` varchar(255) NOT NULL,
  `remarks` varchar(255) DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT 1,
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order_history`
--

INSERT INTO `order_history` (`id`, `accountid`, `action`, `remarks`, `status`, `created_at`) VALUES
(1, '12321312', 'UPDATE', 'test in process', 1, '2025-03-26 21:04:07'),
(2, '12321312', 'UPDATE', 'test resolved', 3, '2025-03-26 21:25:51'),
(3, '12321312', 'UPDATE', 'test pending', 2, '2025-03-26 21:29:19'),
(4, '1234567895', '1234567893', 'I', 0, '2025-03-26 21:50:06'),
(5, '1234567895', '1234567893', 'IMPORT UPDATE', 0, '2025-03-26 21:50:46'),
(6, '1234567895', 'IMPORT UPDATE', '1', 0, '2025-03-26 22:49:38'),
(7, '1234567893', 'IMPORT UPDATE', '3', 0, '2025-03-26 22:49:38'),
(8, '1234567895', 'IMPORT UPDATE', 'test Inprocess', 1, '2025-03-26 22:50:59'),
(9, '1234567893', 'IMPORT UPDATE', 'test resolved', 3, '2025-03-26 22:50:59'),
(10, '1234567895', 'IMPORT UPDATE', 'test Inprocess', 1, '2025-03-26 22:52:08'),
(11, '1234567893', 'IMPORT UPDATE', 'test resolved', 3, '2025-03-26 22:52:08'),
(12, '1234567893', 'IMPORT UPDATE', 'nil2', 1, '2025-03-26 22:52:58'),
(13, '1234567895', 'IMPORT UPDATE', 'nil', 3, '2025-03-26 22:52:58'),
(14, '12321312', 'UPDATE', 'test raised', 4, '2025-03-27 15:36:17'),
(15, '12321312', 'UPDATE', 'test resolved', 3, '2025-03-27 16:21:23'),
(16, '0987654321', 'UPDATE', 'sdasdasdas', 1, '2025-04-29 15:07:11'),
(17, '2435675746352432543657658768', 'CREATE', NULL, 1, '2025-04-29 16:14:49'),
(18, 'testacc123', 'CREATE', NULL, 1, '2025-04-29 16:17:17'),
(19, 'test dsjfndsjlfna', 'CREATE', NULL, 1, '2025-04-29 16:27:48'),
(21, 'jskndwjaqreh21j4311', 'CREATE', NULL, 1, '2025-04-29 16:45:26'),
(22, 'dnlqwrj12321', 'CREATE', NULL, 1, '2025-04-29 16:45:57'),
(23, '0987654321', 'IMPORT UPDATE', 'test update', 3, '2025-04-29 17:11:36'),
(24, '1234567891', 'IMPORT UPDATE', 'test update2', 1, '2025-04-29 17:11:36'),
(25, '0987654321', 'IMPORT UPDATE', 'test update', 3, '2025-04-29 17:14:37'),
(26, '1234567891', 'IMPORT UPDATE', 'test update2', 1, '2025-04-29 17:14:37'),
(27, 'dasdasda45', 'IMPORT CREATE', NULL, 1, '2025-04-29 17:57:20'),
(28, 'dasdasda456', 'IMPORT CREATE', NULL, 1, '2025-04-29 18:02:35'),
(29, 'dasdasda4567', 'IMPORT CREATE', NULL, 1, '2025-04-29 18:05:19'),
(30, 'dasdasda4567', 'IMPORT CREATE', NULL, 1, '2025-04-29 18:06:52'),
(31, '0987654321', 'IMPORT UPDATE', 'test update', 3, '2025-04-29 18:10:21'),
(32, '1234567891', 'IMPORT UPDATE', 'test update2', 1, '2025-04-29 18:10:21'),
(33, 'dasdasda4567', 'IMPORT CREATE', NULL, 1, '2025-04-29 18:14:06'),
(34, '0987654321', 'IMPORT UPDATE', 'test update', 3, '2025-04-30 09:29:33'),
(35, '0987654321', 'IMPORT UPDATE', 'test update', 3, '2025-04-30 09:32:01'),
(36, '1234567893', 'IMPORT UPDATE', 'test update', 3, '2025-04-30 09:34:08'),
(37, '1234567892', 'IMPORT UPDATE', 'test update', 3, '2025-04-30 09:35:49'),
(38, '0987654321', 'IMPORT UPDATE', 'test update', 3, '2025-04-30 09:35:49'),
(39, '1234567892', 'IMPORT UPDATE', 'test update', 3, '2025-04-30 09:40:15'),
(40, '0987654321', 'IMPORT UPDATE', 'test update', 3, '2025-04-30 09:40:15'),
(41, '0987654321', 'UPDATE', NULL, 3, '2025-04-30 09:41:16'),
(42, '0987654321', 'UPDATE', NULL, 3, '2025-04-30 09:42:13'),
(43, '0987654321', 'UPDATE', 'asdsa', 3, '2025-04-30 09:47:40'),
(44, '0987654321', 'UPDATE', NULL, 3, '2025-04-30 09:47:54'),
(45, '0987654321', 'UPDATE', NULL, 3, '2025-04-30 09:51:07'),
(46, '0987654321', 'UPDATE', NULL, 3, '2025-04-30 09:53:15'),
(47, '0987654321', 'UPDATE', 'sadas', 2, '2025-04-30 09:54:21'),
(48, '0987654321', 'UPDATE', 'asad', 3, '2025-04-30 09:55:02'),
(49, '0987654321', 'UPDATE', 'sadas', 2, '2025-04-30 10:01:45'),
(50, '0987654321', 'UPDATE', NULL, 3, '2025-04-30 10:08:17'),
(51, '0987654321', 'UPDATE', NULL, 1, '2025-04-30 10:09:38'),
(52, '0987654321', 'UPDATE', NULL, 3, '2025-04-30 10:10:26'),
(53, '0987654321', 'UPDATE', 'dasas', 1, '2025-04-30 10:12:26'),
(54, '0987654321', 'UPDATE', 'dfs', 1, '2025-04-30 10:13:03'),
(55, '0987654321', 'UPDATE', 'sadsad', 3, '2025-04-30 10:13:39'),
(56, '0987654321', 'UPDATE', 'sadsada', 1, '2025-04-30 10:14:19'),
(57, '0987654321', 'UPDATE', 'sadasd', 3, '2025-04-30 10:16:35'),
(58, '0987654321', 'UPDATE', 'sadasd', 2, '2025-04-30 10:16:49'),
(59, '0987654321', 'UPDATE', NULL, 1, '2025-04-30 10:23:16'),
(60, '1234567892', 'IMPORT UPDATE', 'test update', 3, '2025-04-30 10:23:35'),
(61, '0987654321', 'IMPORT UPDATE', 'test update', 3, '2025-04-30 10:23:35'),
(62, '23fdq2e', 'CREATE', NULL, 1, '2025-04-30 10:26:02'),
(63, 'dasdasda4567', 'IMPORT CREATE', NULL, 1, '2025-04-30 10:53:12'),
(64, '23fdq2e', 'IMPORT CREATE', NULL, 1, '2025-04-30 10:53:12'),
(65, '1234567892', 'IMPORT UPDATE', 'test update', 3, '2025-04-30 11:10:15'),
(66, '0987654321', 'IMPORT UPDATE', 'test update', 3, '2025-04-30 11:10:15'),
(67, '1234567892', 'IMPORT UPDATE', 'test update', 3, '2025-04-30 11:10:45'),
(68, '0987654321', 'IMPORT UPDATE', 'test update', 3, '2025-04-30 11:10:45'),
(69, '1234567892', 'IMPORT UPDATE', 'test update', 3, '2025-04-30 11:11:33'),
(70, '0987654321', 'IMPORT UPDATE', 'test update', 3, '2025-04-30 11:11:33'),
(71, '1234567892', 'IMPORT UPDATE', 'test update', 3, '2025-04-30 11:12:24'),
(72, '0987654321', 'IMPORT UPDATE', 'test update', 3, '2025-04-30 11:12:24'),
(73, 'dasdasda456723123', 'IMPORT CREATE', NULL, 1, '2025-04-30 11:29:47'),
(74, '23fdq2e', 'IMPORT CREATE', NULL, 1, '2025-04-30 11:29:47'),
(75, '23sad', 'CREATE', NULL, 1, '2025-04-30 11:46:19'),
(76, '0987654321', 'UPDATE', NULL, 1, '2025-04-30 14:18:48'),
(77, '123eqwdsax', 'CREATE', NULL, 1, '2025-04-30 16:27:47'),
(78, '0987654321', 'UPDATE', 'testing history remarks', 3, '2025-05-02 12:41:19'),
(79, '1234567892', 'IMPORT UPDATE', 'test update', 3, '2025-05-05 09:50:33'),
(80, '0987654321', 'IMPORT UPDATE', 'test update', 3, '2025-05-05 09:50:33'),
(82, 'wad123edx', 'CREATE', NULL, 1, '2025-05-05 10:05:37'),
(85, '0987654321', 'UPDATE', NULL, 1, '2025-05-07 15:04:15'),
(86, '0987654321', 'UPDATE', NULL, 5, '2025-05-07 15:04:30'),
(87, '0987654321', 'UPDATE', 'Testing Postman', 3, '2025-05-07 15:20:24'),
(88, '0987654321', 'UPDATE', 'Testing Postman', 1, '2025-05-07 15:21:07'),
(89, '0987654321', 'UPDATE', 'Testing Postman', 1, '2025-05-07 15:44:02'),
(90, '0987654321', 'UPDATE', NULL, 6, '2025-05-08 12:58:09'),
(91, '0987654321', 'UPDATE', NULL, 1, '2025-05-08 13:29:05'),
(92, '0987654321', 'UPDATE', NULL, 6, '2025-05-08 13:30:07'),
(93, '0987654321', 'UPDATE', NULL, 1, '2025-05-08 13:30:57'),
(94, '0987654321', 'UPDATE', NULL, 3, '2025-05-08 13:31:52'),
(95, '0987654321', 'UPDATE', NULL, 6, '2025-05-08 13:32:40'),
(96, '0987654321', 'UPDATE', NULL, 6, '2025-05-09 10:26:29'),
(97, '0987654321', 'UPDATE', NULL, 6, '2025-05-09 12:02:21'),
(98, '0987654321', 'UPDATE', NULL, 6, '2025-05-09 12:03:34'),
(99, '0987654321', 'UPDATE', NULL, 6, '2025-05-09 12:24:15'),
(100, '0987654321', 'UPDATE', NULL, 6, '2025-05-09 12:29:40'),
(101, '0987654321', 'UPDATE', NULL, 6, '2025-05-09 12:50:06'),
(102, '0987654321', 'UPDATE', NULL, 6, '2025-05-09 12:52:40'),
(105, '0987654321', 'UPDATE', '', 3, '2025-05-09 14:58:29'),
(106, '0987654321', 'UPDATE', '', 3, '2025-05-09 15:09:36'),
(107, '0987654321', 'UPDATE', '', 3, '2025-05-09 15:09:51'),
(108, '0987654321', 'UPDATE', '', 3, '2025-05-09 15:10:04'),
(109, '0987654321', 'UPDATE', '', 3, '2025-05-09 15:10:40'),
(110, '0987654321', 'UPDATE', '', 3, '2025-05-09 15:11:10'),
(111, '0987654321', 'UPDATE', '', 3, '2025-05-09 15:11:32'),
(112, '0987654321', 'UPDATE', '', 3, '2025-05-09 15:12:19'),
(113, '0987654321', 'UPDATE', '', 3, '2025-05-09 15:12:45'),
(114, '0987654321', 'UPDATE', '', 3, '2025-05-09 15:15:02'),
(115, '0987654321', 'UPDATE', '', 3, '2025-05-09 15:16:39'),
(116, '0987654321', 'UPDATE', '', 3, '2025-05-09 15:18:42'),
(117, '0987654321', 'UPDATE', '', 3, '2025-05-09 15:19:39'),
(118, '0987654321', 'UPDATE', '', 3, '2025-05-09 15:21:40'),
(119, '0987654321', 'UPDATE', '', 3, '2025-05-09 15:22:16'),
(120, '0987654321', 'UPDATE', '', 3, '2025-05-09 15:22:44'),
(121, '0987654321', 'UPDATE', 'sfdsd', 3, '2025-05-09 15:24:08'),
(122, '0987654321', 'UPDATE', 'sfdsd', 3, '2025-05-09 15:24:29'),
(123, '0987654321', 'UPDATE', 'asda', 3, '2025-05-09 15:25:15'),
(124, '0987654321', 'UPDATE', 'asda', 3, '2025-05-09 15:25:40'),
(125, '0987654321', 'UPDATE', 'asda', 3, '2025-05-09 15:26:19'),
(126, '0987654321', 'UPDATE', 'asda', 3, '2025-05-09 15:27:58'),
(127, '0987654321', 'UPDATE', '', 3, '2025-05-09 17:15:15'),
(128, '0987654321', 'UPDATE', '', 3, '2025-05-09 17:17:44'),
(129, '0987654321', 'UPDATE', '', 3, '2025-05-09 17:18:29'),
(130, '0987654321', 'UPDATE', '', 3, '2025-05-09 17:19:22'),
(131, '0987654321', 'UPDATE', '', 3, '2025-05-09 17:24:14'),
(132, '0987654321', 'UPDATE', '', 3, '2025-05-09 17:24:57'),
(133, '0987654321', 'UPDATE', '', 3, '2025-05-09 17:37:28'),
(134, '0987654321', 'UPDATE', '', 3, '2025-05-09 17:40:10');

-- --------------------------------------------------------

--
-- Table structure for table `pod_files`
--

CREATE TABLE `pod_files` (
  `id` int(11) NOT NULL,
  `accountid` varchar(255) NOT NULL,
  `pod_1` varchar(255) NOT NULL,
  `pod_2` varchar(255) NOT NULL,
  `pod_3` varchar(255) NOT NULL,
  `delivery_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pod_files`
--

INSERT INTO `pod_files` (`id`, `accountid`, `pod_1`, `pod_2`, `pod_3`, `delivery_date`) VALUES
(48, '0987654321', 'uploads/pod1/1746792610058-0987654321-pod1.jpg', 'uploads/pod2/1746792610060-0987654321-pod2.jpg', 'uploads/pod3/1746792610061-0987654321-pod3.jpg', '2025-05-09 17:40:10');

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
(6, 'DC Uploaded'),
(1, 'In Process'),
(5, 'Replacement Done'),
(4, 'Replacement Raised'),
(2, 'Resolution Pending'),
(3, 'Resolved');

-- --------------------------------------------------------

--
-- Table structure for table `test_userdb`
--

CREATE TABLE `test_userdb` (
  `id` int(11) NOT NULL,
  `complaintDate` date NOT NULL,
  `customerName` varchar(100) NOT NULL,
  `customerPhone` bigint(20) NOT NULL,
  `mfi` int(10) NOT NULL,
  `branch` int(100) NOT NULL,
  `state` int(50) NOT NULL,
  `status` int(50) NOT NULL DEFAULT 1,
  `issue` text DEFAULT NULL,
  `clientid` varchar(20) NOT NULL,
  `accountid` varchar(20) NOT NULL,
  `vendorName` int(100) NOT NULL,
  `remarks` text DEFAULT NULL,
  `dc_path` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `test_userdb`
--

INSERT INTO `test_userdb` (`id`, `complaintDate`, `customerName`, `customerPhone`, `mfi`, `branch`, `state`, `status`, `issue`, `clientid`, `accountid`, `vendorName`, `remarks`, `dc_path`) VALUES
(1, '2023-01-12', 'Ravi Kumar', 9123456780, 1, 1, 1, 3, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vehicula orci at mauris.', '123456', '0987654321', 9, '', NULL),
(2, '2023-01-15', 'Lakshmi Nair', 9123456781, 2, 2, 2, 1, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vehicula orci at mauris.', '123456', '1234567891', 8, 'test update2', 'none'),
(3, '2023-01-18', 'Rajesh Reddy', 9123456782, 3, 3, 3, 3, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vehicula orci at mauris.', '123456', '1234567892', 7, 'test update', 'none'),
(4, '2023-01-20', 'Priya Menon', 9123456783, 4, 4, 2, 3, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vehicula orci at mauris.', '123456', '1234567893', 6, 'test update', 'none'),
(5, '2023-01-22', 'Venkatesh Iyer', 9123456784, 5, 5, 1, 4, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vehicula orci at mauris.', '123456', '1234567894', 5, 'Awaiting replacement confirmation.', 'none'),
(6, '2023-01-24', 'Meenakshi Sundaram', 9123456785, 6, 6, 4, 3, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vehicula orci at mauris.', '123456', '1234567895', 4, 'nil', 'none'),
(7, '2023-01-26', 'Anand Narayanan', 9123456786, 7, 7, 1, 5, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vehicula orci at mauris.', '123456', '1234567896', 3, 'Issue fixed, no further action required.', 'none'),
(8, '2023-01-28', 'Divya Ramesh', 9123456787, 8, 8, 1, 2, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vehicula orci at mauris.', '123456', '1234567897', 2, 'Need more information from customer.', 'none'),
(9, '2023-01-30', 'Suresh Babu', 9123456788, 9, 9, 3, 2, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vehicula orci at mauris.', '123456', '1234567898', 1, 'Escalated to higher authority.', 'none'),
(10, '2023-02-01', 'Lakshmanan Pillai', 9123456789, 10, 10, 2, 1, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vehicula orci at mauris.', '123456', '1234567899', 1, 'Under review by technical team.', 'none'),
(11, '2023-02-02', 'Arjun Menon', 9123456790, 3, 2, 1, 2, 'Customer reported delayed delivery.', '123457', '1234567900', 5, 'Follow-up required with vendor.', 'none'),
(12, '2023-02-04', 'Shweta Sharma', 9123456791, 4, 3, 2, 3, 'Received damaged product.', '123457', '1234567901', 6, 'Replacement initiated.', 'none'),
(13, '2023-02-06', 'Nikhil Raj', 9123456792, 2, 5, 3, 1, 'Issue with product installation.', '123458', '1234567902', 4, 'Technician visit scheduled.', 'none'),
(14, '2023-02-08', 'Asha Gupta', 9123456793, 6, 7, 4, 4, 'Product missing from order.', '123459', '1234567903', 3, 'Replacement in progress.', 'none'),
(15, '2023-02-10', 'Prakash Singh', 9123456794, 7, 8, 1, 5, 'Warranty claim submitted.', '123459', '1234567904', 2, 'Issue resolved, claim approved.', 'none'),
(16, '2023-02-12', 'Rekha Nair', 9123456795, 1, 9, 2, 2, 'Payment issue reported.', '123460', '1234567905', 7, 'Resolved by payment gateway.', 'none'),
(17, '2023-02-14', 'Gopal Krishnan', 9123456796, 9, 10, 3, 3, 'Customer requested refund.', '123461', '1234567906', 8, 'Refund processed successfully.', 'none'),
(18, '2023-02-16', 'Deepa Rajan', 9123456797, 5, 4, 4, 1, 'Delivery address incorrect.', '123462', '1234567907', 1, 'Updated address and re-dispatched.', 'none'),
(19, '2023-02-18', 'Kiran Kumar', 9123456798, 8, 6, 1, 2, 'Issue with product quality.', '123463', '1234567908', 9, 'Investigation underway.', 'none'),
(20, '2023-02-20', 'Sahana Mohan', 9123456799, 10, 7, 2, 4, 'Duplicate product delivered.', '123464', '1234567909', 5, 'Replacement initiated.', 'none'),
(21, '2023-02-22', 'Ajay Prasad', 9123456800, 3, 1, 3, 5, 'Defective product reported.', '123465', '1234567910', 6, 'Issue resolved after inspection.', 'none'),
(22, '2023-02-24', 'Meera Nair', 9123456801, 4, 2, 4, 3, 'Wrong product received.', '123466', '1234567911', 4, 'Replacement processed.', 'none'),
(23, '2023-02-26', 'Rohit Shetty', 9123456802, 2, 3, 1, 1, 'Customer wants to cancel order.', '123467', '1234567912', 3, 'Order cancellation completed.', 'none'),
(24, '2023-02-28', 'Preeti Sharma', 9123456803, 6, 4, 2, 2, 'Shipping delay reported.', '123468', '1234567913', 2, 'Issue resolved, product delivered.', 'none'),
(25, '2023-03-02', 'Vikram Iyer', 9123456804, 7, 5, 3, 4, 'Incorrect item dispatched.', '123469', '1234567914', 8, 'Replacement in progress.', 'none'),
(26, '2023-03-04', 'Latha Pillai', 9123456805, 8, 6, 4, 5, 'Warranty claim rejected.', '123470', '1234567915', 7, 'Issue resolved after review.', 'none'),
(27, '2023-03-06', 'Ramesh Babu', 9123456806, 1, 7, 1, 3, 'Customer unhappy with service.', '123471', '1234567916', 5, 'Escalated to support team.', 'none'),
(28, '2023-03-08', 'Varsha Jain', 9123456807, 9, 8, 2, 1, 'Order not delivered.', '123472', '1234567917', 4, 'Delivery expedited.', 'none'),
(29, '2023-03-10', 'Suraj Das', 9123456808, 10, 9, 3, 2, 'Issue with refund process.', '123473', '1234567918', 6, 'Refund issued successfully.', 'none'),
(30, '2023-03-12', 'Maya Sundaram', 9123456809, 5, 10, 4, 4, 'Customer reported missing item.', '123474', '1234567919', 3, 'Replacement initiated.', 'none'),
(31, '2023-03-14', 'Abhinav Reddy', 9123456810, 3, 1, 1, 5, 'Customer wants faster delivery.', '123475', '1234567920', 9, 'Order prioritized.', 'none'),
(32, '2023-03-16', 'Nandini Prasad', 9123456811, 4, 2, 2, 3, 'Received damaged product.', '123476', '1234567921', 8, 'Replacement processed.', 'none'),
(33, '2023-03-18', 'Pradeep Menon', 9123456812, 2, 3, 3, 1, 'Issue with product packaging.', '123477', '1234567922', 7, 'Investigation underway.', 'none'),
(34, '2023-03-20', 'Arun Gupta', 9123456813, 6, 4, 4, 2, 'Complaint about customer service.', '123478', '1234567923', 5, 'Training provided to support staff.', 'none'),
(35, '2023-03-22', 'Isha Mohan', 9123456814, 7, 5, 1, 4, 'Wrong product delivered.', '123479', '1234567924', 6, 'Replacement in progress.', 'none'),
(36, '2023-03-24', 'Rajeev Pillai', 9123456815, 8, 6, 2, 5, 'Warranty claim approved.', '123480', '1234567925', 4, 'Issue resolved, claim processed.', 'none'),
(37, '2023-03-26', 'Leena Ramesh', 9123456816, 1, 7, 3, 3, 'Complaint about delivery delay.', '123481', '1234567926', 2, 'Delivery expedited.', 'none'),
(38, '2023-03-28', 'Aditya Nair', 9123456817, 9, 8, 4, 1, 'Customer requested order modification.', '123482', '1234567927', 1, 'Modification completed.', 'none'),
(39, '2023-03-30', 'Ritu Sharma', 9123456818, 10, 9, 1, 2, 'Issue with payment confirmation.', '123483', '1234567928', 9, 'Issue resolved with payment gateway.', 'none'),
(40, '2023-04-01', 'Sachin Joshi', 9123456819, 5, 10, 2, 4, 'Product not as described.', '123484', '1234567929', 8, 'Replacement in progress.', 'none'),
(41, '2023-04-03', 'Neha Reddy', 9123456820, 3, 1, 3, 5, 'Defective product reported.', '123485', '1234567930', 7, 'Issue resolved after inspection.', 'none'),
(42, '2023-04-05', 'Arvind Kumar', 9123456821, 4, 2, 4, 3, 'Wrong product received.', '123486', '1234567931', 5, 'Replacement processed.', 'none'),
(43, '2023-04-07', 'Meenal Jain', 9123456822, 2, 3, 1, 1, 'Customer wants to cancel order.', '123487', '1234567932', 3, 'Order cancellation completed.', 'none'),
(44, '2023-04-09', 'Siddharth Das', 9123456823, 6, 4, 2, 2, 'Shipping delay reported.', '123488', '1234567933', 2, 'Issue resolved, product delivered.', 'none'),
(45, '2023-04-11', 'Kavya Pillai', 9123456824, 7, 5, 3, 4, 'Incorrect item dispatched.', '123489', '1234567934', 8, 'Replacement in progress.', 'none'),
(46, '2023-04-13', 'Hari Krishnan', 9123456825, 8, 6, 4, 5, 'Warranty claim rejected.', '123490', '1234567935', 7, 'Issue resolved after review.', 'none'),
(47, '2023-04-15', 'Aditi Ramesh', 9123456826, 1, 7, 1, 3, 'Customer unhappy with service.', '123491', '1234567936', 5, 'Escalated to support team.', 'none'),
(48, '2023-04-17', 'Manoj Shetty', 9123456827, 9, 8, 2, 1, 'Order not delivered.', '123492', '1234567937', 4, 'Delivery expedited.', 'none'),
(50, '2025-01-30', '24234234', 24323423424, 2, 1, 1, 1, NULL, '434', '3424245', 2, NULL, 'none'),
(53, '2025-01-30', '24234234', 24323423424, 2, 1, 1, 1, 'testing import post backend routing', '434', '3424246', 2, NULL, 'none'),
(54, '2001-05-22', 'fsdsf', 21123123, 3, 1, 2, 1, '7978797', '2123312', '3121233', 6, NULL, 'none'),
(55, '0212-02-22', 'fdssdfs', 312321, 1, 10, 4, 5, 'iojho..', '21312', '213123', 7, 'uuyt', 'none'),
(56, '2001-05-27', 'Shyam Prasad', 123123, 3, 10, 3, 1, 'issue testing post dynamic state management', '321312', '312312', 6, NULL, 'none'),
(58, '2001-05-27', 'shyams', 322133, 2, 10, 1, 1, 'testing post state management2', '312312', '231231', 5, NULL, 'none'),
(59, '0000-00-00', 'shyasd', 42432, 9, 10, 4, 1, '', '2312321', '21312313222', 7, NULL, 'none'),
(133, '2025-01-30', '24234234', 24323423424, 2, 1, 1, 1, 'testing accountid validation', '434', '213123123', 2, NULL, 'none'),
(134, '2025-01-30', '24234234', 24323423424, 2, 1, 1, 1, 'testing acountid validation', '434', '132312312', 2, NULL, 'none'),
(135, '2025-01-30', '24234234', 24323423424, 2, 1, 1, 1, 'testing accountid validation', '434', '213123121', 2, NULL, 'none'),
(136, '2025-01-30', '24234234', 24323423424, 2, 1, 1, 1, 'testing acountid validation', '434', '132312311', 2, NULL, 'none'),
(137, '2025-01-30', '24234234', 24323423424, 2, 1, 1, 1, 'testing accountid validation', '434', '2131231211', 2, NULL, 'none'),
(138, '2025-01-30', '24234234', 24323423424, 2, 1, 1, 1, 'testing acountid validation', '434', '1323123112', 2, NULL, 'none'),
(139, '2025-01-30', '24234234', 24323423424, 2, 1, 1, 1, 'testing accountid validation', '434', '3', 2, NULL, 'none'),
(140, '2025-01-30', '24234234', 24323423424, 2, 1, 1, 1, 'testing acountid validation', '434', '4', 2, NULL, 'none'),
(141, '2025-01-30', '24234234', 24323423424, 2, 1, 1, 1, 'testing accountid validation', '434', '5', 2, NULL, 'none'),
(142, '2025-01-30', '24234234', 24323423424, 2, 1, 1, 1, 'testing acountid validation', '434', '7', 2, NULL, 'none'),
(143, '2025-01-30', '24234234', 24323423424, 2, 1, 1, 1, 'testing accountid validation', '434', '8', 2, NULL, 'none'),
(144, '2025-01-30', '24234234', 24323423424, 2, 1, 1, 1, 'testing acountid validation', '434', '9', 2, NULL, 'none'),
(145, '2025-01-30', '24234234', 24323423424, 2, 1, 1, 1, 'testing accountid validation', '434', '10', 2, NULL, 'none'),
(146, '2025-01-30', '24234234', 24323423424, 2, 1, 1, 1, 'testing acountid validation', '434', '11', 2, NULL, 'none'),
(163, '2025-01-30', '24234234', 24323423424, 2, 1, 1, 3, 'testing accountid validation', '434', '12', 2, NULL, 'none'),
(164, '2025-01-30', '24234234', 24323423424, 2, 1, 1, 1, 'testing acountid validation', '434', '13', 2, NULL, 'none'),
(165, '2025-01-30', '24234234', 24323423424, 2, 1, 1, 4, 'testing accountid validation', '434', '14', 2, NULL, 'none'),
(166, '2025-01-30', '24234234', 24323423424, 2, 1, 1, 1, 'testing acountid validation', '434', '15', 2, NULL, 'none'),
(169, '2025-01-30', '24234234', 24323423424, 2, 1, 1, 1, 'testing accountid validation', '434', '16', 2, NULL, 'none'),
(171, '0001-03-22', 'dsasdsa', 123123213, 1, 7, 4, 3, 'ertyui', '21312312', '12321312', 7, 'test resolved', 'none'),
(172, '2025-01-30', '24234234', 24323423424, 2, 1, 1, 1, 'testing accountid validation', '434', '17', 2, NULL, 'none'),
(173, '2025-01-30', '24234234', 24323423424, 2, 1, 1, 1, 'testing acountid validation', '434', '18', 2, NULL, 'none'),
(174, '2025-01-30', '24234234', 24323423424, 2, 1, 1, 1, 'testing accountid validation', '434', '19', 2, NULL, 'none'),
(175, '2025-01-30', '24234234', 24323423424, 2, 1, 1, 1, 'testing acountid validation', '434', '20', 2, NULL, 'none'),
(176, '2025-01-30', '24234234', 24323423424, 2, 1, 1, 1, 'testing accountid validation', '434', '21', 2, NULL, 'none'),
(177, '2025-01-30', '24234234', 24323423424, 2, 1, 1, 1, 'testing acountid validation', '434', '22', 2, NULL, 'none'),
(178, '2002-05-24', 'asdasdsadsad', 123456782222, 9, 10, 1, 1, 'testing history update for creations', 'tesetcliente', 'testaccountesi', 2, NULL, 'none'),
(179, '2222-05-22', 'asdsad', 1123321, 7, 1, 2, 1, 'testing create with order history', '2321312', '23321312312312321', 3, NULL, 'none'),
(180, '2222-02-21', 'afsadas', 213213, 5, 1, 4, 1, 'test order create with history table', 'asad', '0987654345678987654', 8, NULL, 'none'),
(181, '2222-02-22', 'asdasdas', 22223432423, 7, 10, 4, 1, 'saddas', 'sadasd', '24356757463524325436', 3, NULL, 'none'),
(182, '2222-02-22', 'sadas', 23123, 5, 3, 4, 1, 'dfsasd', 'asdas', 'testacc123', 8, NULL, 'none'),
(183, '2222-02-22', 'Shyam', 123123, 5, 1, 4, 1, 'test order create with order history, removed prev return', 'sadjasdas', 'test dsjfndsjlfna', 3, NULL, 'none');

-- --------------------------------------------------------

--
-- Table structure for table `userdb`
--

CREATE TABLE `userdb` (
  `id` int(11) NOT NULL,
  `complaintDate` date NOT NULL,
  `customerName` varchar(100) NOT NULL,
  `customerPhone` bigint(20) NOT NULL,
  `mfi` int(10) NOT NULL,
  `branch` int(100) NOT NULL,
  `state` int(50) NOT NULL,
  `status` int(50) NOT NULL DEFAULT 1,
  `issue` text DEFAULT NULL,
  `clientid` varchar(20) NOT NULL,
  `accountid` varchar(20) NOT NULL,
  `vendorName` int(100) NOT NULL,
  `remarks` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `userdb`
--

INSERT INTO `userdb` (`id`, `complaintDate`, `customerName`, `customerPhone`, `mfi`, `branch`, `state`, `status`, `issue`, `clientid`, `accountid`, `vendorName`, `remarks`) VALUES
(1, '2023-01-12', 'Ravi Kumar', 9123456780, 1, 1, 1, 1, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vehicula orci at mauris.', '123456', '0987654321', 9, 'test_accountid'),
(2, '2023-01-15', 'Lakshmi Nair', 9123456781, 2, 2, 2, 1, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vehicula orci at mauris.', '123456', '1234567891', 8, 'test'),
(3, '2023-01-18', 'Rajesh Reddy', 9123456782, 3, 3, 3, 1, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vehicula orci at mauris.', '123456', '1234567892', 7, 'Follow-up required.'),
(4, '2023-01-20', 'Priya Menon', 9123456783, 4, 4, 2, 4, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vehicula orci at mauris.', '123456', '1234567893', 6, 'Replacement in progress.'),
(5, '2023-01-22', 'Venkatesh Iyer', 9123456784, 5, 5, 1, 4, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vehicula orci at mauris.', '123456', '1234567894', 5, 'Awaiting replacement confirmation.'),
(6, '2023-01-24', 'Meenakshi Sundaram', 9123456785, 6, 6, 4, 2, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vehicula orci at mauris.', '123456', '1234567895', 4, 'Pending further investigation.'),
(7, '2023-01-26', 'Anand Narayanan', 9123456786, 7, 7, 1, 5, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vehicula orci at mauris.', '123456', '1234567896', 3, 'Issue fixed, no further action required.'),
(8, '2023-01-28', 'Divya Ramesh', 9123456787, 8, 8, 1, 2, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vehicula orci at mauris.', '123456', '1234567897', 2, 'Need more information from customer.'),
(9, '2023-01-30', 'Suresh Babu', 9123456788, 9, 9, 3, 2, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vehicula orci at mauris.', '123456', '1234567898', 1, 'Escalated to higher authority.'),
(10, '2023-02-01', 'Lakshmanan Pillai', 9123456789, 10, 10, 2, 1, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vehicula orci at mauris.', '123456', '1234567899', 1, 'Under review by technical team.'),
(16, '0000-00-00', '24234234', 432423, 2, 1, 1, 1, NULL, '434', '3424231', 2, NULL),
(18, '0000-00-00', '24234234', 432423, 2, 1, 1, 1, NULL, '434', '3424232', 2, NULL),
(21, '0000-00-00', '24234234', 432423, 2, 1, 1, 1, NULL, '434', '3424233', 2, NULL),
(23, '0000-00-00', '', 24323423424, 2, 1, 1, 1, NULL, '434', '3424234', 2, NULL),
(25, '0000-00-00', '24234234', 24323423424, 2, 1, 1, 1, NULL, '434', '3424235', 2, NULL),
(26, '0000-00-00', '24234234', 24323423424, 2, 1, 1, 1, NULL, '434', '3424236', 2, NULL),
(30, '0000-00-00', '24234234', 24323423424, 2, 1, 1, 1, NULL, '434', '3424237', 2, NULL),
(40, '0000-00-00', '24234234', 24323423424, 2, 1, 1, 1, NULL, '434', '3424238', 2, NULL),
(48, '0000-00-00', '24234234', 24323423424, 2, 1, 1, 1, NULL, '434', '3424239', 2, NULL),
(50, '2025-01-30', '24234234', 24323423424, 2, 1, 1, 1, NULL, '434', '3424240', 2, NULL),
(51, '2025-01-30', '24234234', 24323423424, 2, 1, 1, 1, NULL, '434', '3424241', 2, NULL),
(52, '2025-01-30', '24234234', 24323423424, 2, 1, 1, 1, NULL, '434', '3424242', 2, NULL),
(56, '2025-01-30', '24234234', 24323423424, 0, 0, 0, 1, NULL, '434', '3424243', 0, NULL),
(59, '2025-01-30', '24234234', 24323423424, 2, 1, 1, 1, NULL, '434', '3424244', 2, NULL),
(74, '2025-01-30', '24234234', 24323423424, 2, 1, 1, 1, NULL, '434', '3424245', 2, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user_master`
--

CREATE TABLE `user_master` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `is_verified` tinyint(1) DEFAULT NULL,
  `access_token` varchar(255) DEFAULT NULL,
  `reset_token` varchar(255) DEFAULT NULL,
  `reset_token_expiry` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL,
  `role` enum('admin','create','viewer') DEFAULT 'admin'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_master`
--

INSERT INTO `user_master` (`id`, `username`, `password`, `email`, `is_verified`, `access_token`, `reset_token`, `reset_token_expiry`, `created_at`, `updated_at`, `role`) VALUES
(1, 'Shyam', '$2b$10$CEUAlZM9T4qPQN2mIuQ0DOjXrEpgJMd0uUiCKsjEwMylR3N7FYXCe', 'tech@grameenext.com', NULL, NULL, NULL, NULL, '2025-05-03 10:33:15', NULL, 'admin');

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
-- Indexes for table `order_history`
--
ALTER TABLE `order_history`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pod_files`
--
ALTER TABLE `pod_files`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `accountid` (`accountid`);

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
-- Indexes for table `test_userdb`
--
ALTER TABLE `test_userdb`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `accountid` (`accountid`);

--
-- Indexes for table `userdb`
--
ALTER TABLE `userdb`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `accountid` (`accountid`);

--
-- Indexes for table `user_master`
--
ALTER TABLE `user_master`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

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
-- AUTO_INCREMENT for table `order_history`
--
ALTER TABLE `order_history`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=156;

--
-- AUTO_INCREMENT for table `pod_files`
--
ALTER TABLE `pod_files`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT for table `states`
--
ALTER TABLE `states`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `status`
--
ALTER TABLE `status`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `test_userdb`
--
ALTER TABLE `test_userdb`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=284;

--
-- AUTO_INCREMENT for table `userdb`
--
ALTER TABLE `userdb`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=83;

--
-- AUTO_INCREMENT for table `user_master`
--
ALTER TABLE `user_master`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `vendor`
--
ALTER TABLE `vendor`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
