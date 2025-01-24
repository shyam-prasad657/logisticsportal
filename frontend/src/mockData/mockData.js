export const complaints = [
  {
      complaintNumber: 1, //primary key
      complaintDate: "12-01-2023", //dd-mm-yyyy
      customername: 'Ravi Kumar', //
      customerphone: 9123456780, //
      mfi: 'SBIK', //
      branch: 'Mylapore', //
      state: 'Tamil Nadu', //
      status: "Resolved", //
      issue: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vehicula orci at mauris.",
      clientid: "123456", //
      accountid: "0987654321", //unique key
      vendorName: "Hero", //
      remarks: "Issue resolved promptly." //remarks
  },
  {
      complaintNumber: 2,
      complaintDate: "15-01-2023", //dd-mm-yyyy
      customerName: 'Lakshmi Nair',
      customerPhone: 9123456781,
      mfi: 'KVBK',
      branch: 'Ernakulam',
      state: 'Kerala',
      status: "Resolved",
      issue: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vehicula orci at mauris.",
      clientID: "123456",
      AccountID: "1234567891", //unique
      vendorName: "Haier", //master
      remarks: "Customer satisfied with the resolution." //remarks
  },
  {
      complaintNumber: 3,
      complaintDate: "18-01-2023", //dd-mm-yyyy
      customerName: 'Rajesh Reddy',
      customerPhone: 9123456782,
      mfi: 'HDFK',
      branch: 'Madhapur',
      state: 'Telangana',
      status: "In Process",
      issue: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vehicula orci at mauris.",
      clientID: "123456",
      AccountID: "1234567892", //unique
      vendorName: "Whirlpool", //master
      remarks: "Follow-up required." //remarks
  },
  {
      complaintNumber: 4,
      complaintDate: "20-01-2023", //dd-mm-yyyy
      customerName: 'Priya Menon',
      customerPhone: 9123456783,
      mfi: 'ICIK',
      branch: 'Kochi',
      state: 'Kerala',
      status: "Replacement Raised",
      issue: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vehicula orci at mauris.",
      clientID: "123456",
      AccountID: "1234567893", //unique
      vendorName: "Samsung", //master
      remarks: "Replacement in progress." //remarks
  },
  {
      complaintNumber: 5,
      complaintDate: "22-01-2023", //dd-mm-yyyy
      customerName: 'Venkatesh Iyer',
      customerPhone: 9123456784,
      mfi: 'AXIK',
      branch: 'Coimbatore',
      state: 'Tamil Nadu',
      status: "Replacement Raised",
      issue: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vehicula orci at mauris.",
      clientID: "123456",
      AccountID: "1234567894", //unique
      vendorName: "Vivo", //master
      remarks: "Awaiting replacement confirmation." //remarks
  },
  {
      complaintNumber: 6,
      complaintDate: "24-01-2023", //dd-mm-yyyy
      customerName: 'Meenakshi Sundaram',
      customerPhone: 9123456785,
      mfi: 'SYNK',
      branch: 'Mysore',
      state: 'Karnataka',
      status: "Resolution Pending",
      issue: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vehicula orci at mauris.",
      clientID: "123456",
      AccountID: "1234567895", //unique
      vendorName: "Rico", //master
      remarks: "Pending further investigation." //remarks
  },
  {
      complaintNumber: 7,
      complaintDate: "26-01-2023", //dd-mm-yyyy
      customerName: 'Anand Narayanan',
      customerPhone: 9123456786,
      mfi: 'FDRK',
      branch: 'Madurai',
      state: 'Tamil Nadu',
      status: "Replacement Done",
      issue: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vehicula orci at mauris.",
      clientID: "123456",
      AccountID: "1234567896", //unique
      vendorName: "Bajaj", //master
      remarks: "Issue fixed, no further action required." //remarks
  },
  {
      complaintNumber: 8,
      complaintDate: "28-01-2023", //dd-mm-yyyy
      customerName: 'Divya Ramesh',
      customerPhone: 9123456787,
      mfi: 'PNBK',
      branch: 'Salem',
      state: 'Tamil Nadu',
      status: "Resolution Pending",
      issue: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vehicula orci at mauris.",
      clientID: "123456",
      AccountID: "1234567897", //unique
      vendorName: "Preethi", //master
      remarks: "Need more information from customer." //remarks
  },
  {
      complaintNumber: 9,
      complaintDate: "30-01-2023", //dd-mm-yyyy
      customerName: 'Suresh Babu',
      customerPhone: 9123456788,
      mfi: 'UBIK',
      branch: 'Hyderabad',
      state: 'Telangana',
      status: "Resolution Pending",
      issue: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vehicula orci at mauris.",
      clientID: "123456",
      AccountID: "1234567898", //unique
      vendorName: "Prestige", //master
      remarks: "Escalated to higher authority." //remarks
  },
  {
      complaintNumber: 10,
      complaintDate: "01-02-2023", //dd-mm-yyyy
      customerName: 'Lakshmanan Pillai',
      customerPhone: 9123456789,
      mfi: 'IDFK',
      branch: 'Thiruvananthapuram',
      state: 'Kerala',
      status: "In Process",
      issue: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vehicula orci at mauris.",
      clientID: "123456",
      AccountID: "1234567899", //unique
      vendorName: "Prestige", //master
      remarks: "Under review by technical team." //remarks
  }
];

  export const vendorName = ["Prestige", "Preethi", "Bajaj", "Rico", "Vivo","Samsung", "Whirlpool","Haier","Hero"];
  export const mfi = ["SBIK", "KVBK", "HDFK", "ICIK", "AXIK","SYNK", "FDRK","PNBK","UBIK","IDFK"];
  export const branch = ["Mylapore", "Ernakulam", "Madhapur", "Kochi" ,"Coimbatore", "Mysore", "Madurai", "Salem", "Hyderabad", "Thiruvananthapuram"];
  export const state = ["Tamil Nadu", "Kerala", "Telangana", "Karnataka"];
  export const status = ["In Process", "Resolution Pending", "Resolved", "Replacement Raised", "Replacement Done"];
  export const updateStatus = ["In Process", "Resolution Pending", "Resolved", "Replacement Raised"];

  
  