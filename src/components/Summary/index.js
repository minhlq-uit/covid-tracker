import { Grid } from "@mui/material";
import React, { useState, useEffect } from "react";
import LineChart from '../Charts/LineChart'
import HighMaps from '../Charts/HighMaps'

export default function Summary({overview, data}) {
    const [mapData, setMapData] = useState({});

    useEffect(() => {
        import(`@highcharts/map-collection/countries/vn/vn-all.geo.json`)
          .then(res => setMapData(res))
    }, []);
    
    return (
        <Grid container spacing={3} style={{ marginTop: 10 }}>
            <Grid item sm={8} xs={12}>
                <LineChart data={overview}/>
            </Grid>
            <Grid item sm={4} xs={12}>
                <HighMaps mapData={mapData} data={data}/>
            </Grid>
        </Grid>
    )
}