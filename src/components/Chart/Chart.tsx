import React, { useEffect, useState } from "react";
import { fetchDailyData } from '../../api';
import { Line, Bar } from 'react-chartjs-2';

import styles from './Chart.module.css';
import { IChartModel } from "../../model/IChartModel";

const Chart = () => {
    
    const [dailyData, setDailyData] = useState< IChartModel[] >([]);

    useEffect(() => {
        const fetchData = async() => {
            const dailyData : IChartModel[] = await fetchDailyData();
            setDailyData(dailyData);
            
        }
        fetchData();
    }, []);

    const lineChart : JSX.Element | null = ( 
        dailyData.length !== 0 ? (<Line 
            data={{
                labels: dailyData.map(({date}) => date),
                datasets: [{
                    data : dailyData.map(({confirmed}) => confirmed),
                    label: 'Infected',
                    borderColor: '#3333ff',
                    fill: true,
                }, {
                    data : dailyData.map(({deaths}) => deaths),
                    label: 'Deaths',
                    borderColor: 'red',
                    backgroundColor: 'rgba(255, 0, 0, 0.5)',
                    fill: true,
                }],
            }}
        />) : null
    );

    return (
        <>
            <div className={styles.container}>
                {lineChart}
            </div>
        </>
    );
}

export default Chart;