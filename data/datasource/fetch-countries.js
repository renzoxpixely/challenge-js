import { API_URL } from "../api/api.js";
import Country from "../models/country-model.js";

export async function fetchCountries() {
    try {
        const response = await fetch(`${API_URL}all`);
        if (!response.ok) throw new Error("Error al obtener los países");
        
        const countriesData = await response.json();
        const countries = countriesData.map(country => new Country(country));
        console.log(countries);        
        return countries; 
    } catch (error) {
        console.error("Error:", error);
        return [];
    }
}