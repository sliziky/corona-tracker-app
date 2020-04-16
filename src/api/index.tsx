import axios from 'axios';

const URL : string = 'https://covid19.mathdro.id/api';

export const fetchData = async () : Promise<any> => {
    const response = await axios.get(URL);
    return response;
}