import axios from 'axios';
import { IData } from "./../model/IData";
import { IChartModel } from '../model/IChartModel';
const URL : string = 'https://covid19.mathdro.id/api';

export const fetchData = async (country : string) : Promise< IData > => {
    let changeableUrl = URL;
    if (country) {
        changeableUrl = `${URL}/countries/${country}`;
    }
    const { data } = await axios.get(changeableUrl);
    return data;
}

export const fetchDailyData = async () : Promise< IChartModel[] > => {
    const { data } = await axios.get(`${URL}/daily`);
    const modifiedData = data.map((dailyData : any) => ({
        confirmed : dailyData.confirmed.total,
        deaths: dailyData.deaths.total,
        date: dailyData.reportDate,
    }));
    return modifiedData;
}

export const fetchCountries = async() => {
    const { data : { countries }} = await axios.get(`${URL}/countries`);
    return countries.map((country : any) => country.name);
}