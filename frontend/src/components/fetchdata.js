import { createContext, useContext } from 'react';
import useSWR from 'swr';
import axiosInstance from './axiosInstance';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const fetcher = (url) => axiosInstance(url).then((res) => res.json());
    const {data : data, mutate : setData } = useSWR('http://localhost:8081/test-userdb', fetcher);
    const {data : stateData, mutate : setStatedata } = useSWR('http://localhost:8081/states', fetcher);
    const {data : branchData, mutate : setBranchdata } = useSWR('http://localhost:8081/branch', fetcher);
    const {data : statusData, mutate : setStatusdata } = useSWR('http://localhost:8081/status', fetcher);
    const {data : vendorData, mutate : setVendordata } = useSWR('http://localhost:8081/vendor', fetcher);
    const {data : mfiData, mutate : setMfidata } = useSWR('http://localhost:8081/mfi', fetcher);

    return (
        <AuthContext.Provider value = {{data, setData, statusData, setStatusdata, stateData, setStatedata, branchData, setBranchdata, mfiData, setMfidata, vendorData, setVendordata}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useData = () => useContext(AuthContext);

export const findMaster = (name, masterData, field) => {
    const x = masterData?.find((r) => r.id === name)
    return x ? x[field + '_name'] : `${field} Not found`;
}
