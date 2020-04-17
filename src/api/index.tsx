import axios from 'axios';
import { IData } from "./../model/IData";
import { IChartModel } from '../model/IChartModel';
const URL : string = 'https://covid19.mathdro.id/api';

export const fetchData = async () : Promise< IData > => {
    const { data } = await axios.get(URL);
    return data;
}

export const fetchDailyData = async () : Promise< IChartModel[] > => {
    const { data } = await axios.get(`${URL}/daily`);
    const modifiedData = data.map((dailyData : any) => ({
        confirmed : dailyData.confirmed.total,
        deaths: dailyData.deaths.total,
        date: dailyData.reportDate,
    }));
    console.log("MD", modifiedData);
    return modifiedData;
}