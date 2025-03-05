import { useEffect, useState } from "react";

export const useData = () => {
    const [data, setData] = useState([]);
    const [statusData, setStatusdata] = useState([]);
    const [stateData, setStatedata] = useState([]);
    const [branchData, setBranchdata] = useState([]);
    const [mfiData, setMfidata] = useState([]);
    const [vendorData, setVendordata] = useState([]);
    useEffect(()=> {//userdb
        fetch('http://localhost:8081/test-userdb')
        .then(res => res.json())
        .then(data => setData(data))
        .catch(err => console.log(err))
    },[data]);
    useEffect(()=> {//states
        fetch('http://localhost:8081/states')
        .then(res => res.json())
        .then(data => setStatedata(data))
        .catch(err => console.log(err))
    },[stateData]);
    useEffect(()=> {//branch
        fetch('http://localhost:8081/branch')
        .then(res => res.json())
        .then(data => setBranchdata(data))
        .catch(err => console.log(err))
    },[branchData]);
    useEffect(()=> {//status
        fetch('http://localhost:8081/status')
        .then(res => res.json())
        .then(data => setStatusdata(data))
        .catch(err => console.log(err))
    },[statusData]);
    useEffect(()=> {//vendor
        fetch('http://localhost:8081/vendor')
        .then(res => res.json())
        .then(data => setVendordata(data))
        .catch(err => console.log(err))
    },[vendorData]);
    useEffect(()=> {//mfi
        fetch('http://localhost:8081/mfi')
        .then(res => res.json())
        .then(data => setMfidata(data))
        .catch(err => console.log(err))
    },[mfiData]);

    return {data, setData, statusData, setStatusdata, stateData, setStatedata, branchData, setBranchdata, mfiData, setMfidata, vendorData, setVendordata}
}