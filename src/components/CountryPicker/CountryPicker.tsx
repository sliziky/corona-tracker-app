import React, { useState, useEffect } from "react";
import { NativeSelect, FormControl } from '@material-ui/core';

import styles from './CountryPicker.module.css';

import { fetchCountries } from '../../api';

interface ICountryPickerProps {
    handleCountryChange : (country : string) => void;
}

const CountryPicker : React.FC<ICountryPickerProps> = ({ handleCountryChange }) => {

    const [countries, setCountries] = useState< string[] >([]);

    useEffect(() => {
        const fetchAPI = async () => {
            const fetchedCountries : string[] = await fetchCountries();
            setCountries(fetchedCountries);
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