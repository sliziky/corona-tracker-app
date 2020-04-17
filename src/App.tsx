import React, { useEffect, useState } from "react";
import { Cards, Chart, CountryPicker } from "./components";
import styles from './App.module.css';
import { fetchData } from "./api";
import { IData } from "./model/IData";
import coronaImage from "./images/covid.png";

const App = () => {

    const [data, setData] = useState< IData >();
    const [country, setCountry] = useState< string >();

    const handleCountryChange = async(country : string) => {
        setCountry(country);
        const data : IData = await fetchData(country);
        setData(data);
    }

    useEffect(() => {
        const fetchAll = async () => {
            const data : IData = await fetchData("");
            setData(data);
        }
        fetchAll();
    }, []);

    return (
        <div className={styles.container}>
            <img className={styles.image} src={coronaImage} alt="COVID-19"/>
            <Cards data={data}/>
            <CountryPicker handleCountryChange={handleCountryChange}/>
            <Chart data={data} country={country}/>
        </div>
    );
}


export default App;