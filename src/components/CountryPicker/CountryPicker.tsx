import React, { useState, useEffect } from "react";
import { NativeSelect, FormControl } from '@material-ui/core';

import styles from './CountryPicker.module.css';

import { fetchCountries } from '../../api';

interface ICountryPickerProps {
    handleCountryChange : (country : string) => void;
}

const CountryPicker : React.FC<ICountryPickerProps> = ({ handleCountryChange }) => {

    const [countries, setCountries] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
            const data = await fetchCountries();
            console.log(data);
            setCountries(data);
        }
        fetchAPI();
        
    }, [setCountries]);
    
    return (
        <>
            <FormControl className={styles.formContorl}>
                <NativeSelect defaultValue="" onChange={(e) => handleCountryChange(e.target.value)}>
                    <option value="">Global</option>
                    {countries.map((country, i) => <option key={i} value={country}>{country}</option>)}
                </NativeSelect>
            </FormControl>
        </>
    );
}

export default CountryPicker;