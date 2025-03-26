import useSWR from 'swr';

export const useData = () => {
    const fetcher = (url) => fetch(url).then((res) => res.json());
    const {data : data, mutate : setData } = useSWR('http://localhost:8081/test-userdb', fetcher);
    const {data : stateData, mutate : setStatedata } = useSWR('http://localhost:8081/states', fetcher);
    const {data : branchData, mutate : setBranchdata } = useSWR('http://localhost:8081/branch', fetcher);
    const {data : statusData, mutate : setStatusdata } = useSWR('http://localhost:8081/status', fetcher);
    const {data : vendorData, mutate : setVendordata } = useSWR('http://localhost:8081/vendor', fetcher);
    const {data : mfiData, mutate : setMfidata } = useSWR('http://localhost:8081/mfi', fetcher);

    return {data, setData, statusData, setStatusdata, stateData, setStatedata, branchData, setBranchdata, mfiData, setMfidata, vendorData, setVendordata}
}

export const findMaster = (name, masterData, field) => {
    const x = masterData?.find((r) => r.id === name)
    return x ? x[field + '_name'] : `${field} Not found`;
}
