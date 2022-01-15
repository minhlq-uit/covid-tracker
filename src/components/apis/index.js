import axios from 'axios'

// export const getProvince = () => axios.get()

export const getReport = () => 
  axios.get('https://static.pipezero.com/covid/data.json')

// export const getMapDataByCountryId = (countryId) =>
// import(
//   `@highcharts/map-collection/countries/${countryId}/${countryId}-all.geo.json`
// );