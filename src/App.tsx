import React, { useEffect } from "react";
import { Cards, Chart, CountryPicker } from "./components";
import styles from './App.module.css';
import { fetchData } from "./api";
const App = () => {

    useEffect(() => {
        const fetchAll = async () => {
            const response : Promise<any> = await fetchData();
            console.log(response);
        }
        fetchAll();
    });

    return (
        <div className={styles.container}>
            <Cards/>
            <CountryPicker/>
            <Chart/>
        </div>
    );
}


export default App;