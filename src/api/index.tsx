import axios from 'axios';
import { IData } from "./../model/IData";
const URL : string = 'https://covid19.mathdro.id/api';

export const fetchData = async () : Promise< IData > => {
    const { data } = await axios.get(URL);
    return data;
}