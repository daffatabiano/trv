import useGet from "@/hooks/useGet";
import { useEffect, useState } from "react";

export default function Category() {
    const { getData } = useGet();
    const [data, setData] = useState([]);
    const [token, setToken] = useState('');

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setToken(localStorage.getItem('token'));
        }
    }, []);

    const getProfile = async () => {
        const res = await getData('categories', token);
        setData(res.data.data);
    };

    useEffect(() => {
        getProfile();
    }, [token]);

    return (
        <div>
            <h1>Category</h1>
        </div>
    );
}
