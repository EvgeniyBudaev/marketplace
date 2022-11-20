import axios, { AxiosError } from "axios";
import {useEffect} from "react";

async function getData() {
    const res = await axios.get('https://jsonplaceholder.typicode.com/todos');

    return res;
}

export default async function MirrorsPage() {
    const get = async () => {
        const data = await getData();
        console.log("data: ", data);
    };

    useEffect(() => {
        get();
    }, []);
    return (
        <div>
            <h1>Зеркала</h1>
        </div>
    );
};