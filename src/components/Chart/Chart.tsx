import React, { useEffect, useState } from "react";
import { fetchDailyData } from '../../api';
import { Line, Bar } from 'react-chartjs-2';

import styles from './Chart.module.css';
import { IChartModel } from "../../model/IChartModel";
import { IData } from "../../model/IData";

interface IChartProps {
    data : IData | undefined;
    country : string | undefined;
}

const Chart : React.FC<IChartProps> = ({ data, country }) => {
    
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

    const barChart : JSX.Element | null = (
        data?.confirmed ? (
        <Bar
            data = {{
                labels: ['Infected', 'Recovered', 'Deaths'],
                datasets : [{
                    label: 'People',
                    backgroundColor: [`rgba(0, 0, 255, 0.5)`,`rgba(0, 255, 0, 0.5)`,`rgba(255, 0, 0, 0.5)`],
                    data: [data.confirmed.value, data.recovered.value, data.deaths.value]
                }]
            }}
            options={{
                legend: { display : false },
                title : { display : true, text: `Current state in ${country}` }
            }}>
            
        </Bar>) : null
    );

    return (
        <>
            <div className={styles.container}>
                {country ? barChart : lineChart}
            </div>
        </>
    );
}

export default Chart;