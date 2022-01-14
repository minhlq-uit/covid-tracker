import React, { useEffect, useState } from 'react';
import { sortBy } from 'lodash';
import { Container } from '@mui/material';
import ProvinceSelector from './components/ProvinceSelector';
import Highlight from './components/Highlight';
import Summary from './components/Summary';
import { getReport } from './components/apis';
function App() {

  const [data, setData] = useState({})
  const [provinces, setProvinces] = useState([])
  const [provinceSelected, setProvinceSelected] = useState('')
  const [report, setReport] = useState([])

  useEffect(() => {
    getReport()
      .then(res => setData(res.data))
  }, [])

  useEffect(() => {
    if(data.locations) {
      let provincesName = data.locations.map((location) => {
        return location.name
      })
      provincesName = sortBy(provincesName)
      setProvinces(provincesName)

      setProvinceSelected('TP. Hồ Chí Minh')
    }
  }, [data])

  const handleOnChange = (e) => {
    setProvinceSelected(e.target.value)
  }
  // console.log(data)
  
  useEffect(() => {
    // provinces.forEach((province, index) => {
    //   if(province === provinceSelected) {
    //     setReport(() => data.locations[index])
    //   }
    // })
    setReport(() => data.locations.find(location => {
      location.name === provinceSelected
    }))
  }, [provinceSelected])
  console.log('report', report)
  return (
    <Container>
      <ProvinceSelector value={provinceSelected} provinces={provinces} handleOnChange={handleOnChange}/>
      <Highlight report={report}/>
      <Summary overview={data.overview}/>
    </Container>
  );
}

export default App;
