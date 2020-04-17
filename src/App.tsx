import React, { useEffect, useState } from "react";
import { Cards, Chart, CountryPicker } from "./components";
import styles from './App.module.css';
import { fetchData } from "./api";
import { IData } from "./model/IData";
const App = () => {

    const [data, setData] = useState< IData >();

    useEffect(() => {
        const fetchAll = async () => {
            const data : IData = await fetchData();
            setData(data);
            console.log(data.deaths.value);
        }
        fetchAll();
    }, []);

    return (
        <div className={styles.container}>
            <Cards data={data}/>
            <CountryPicker/>
            <Chart/>
        </div>
    );
}


export default App;