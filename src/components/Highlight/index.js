import { Grid } from "@mui/material";
import React from "react";
import HighlightCard from "./HighlightCard";

export default function Highlight({ report }) {
    const summary = [
        {
            title: 'Số ca nhiễm',
            count: report.cases,
            type: 'cases'
        },
        {
            title: 'Ca mắc hôm nay',
            count: report.casesToday,
            type: 'casesToday'
        },
        {
            title: 'Số ca tử vong',
            count: report.death,
            type: 'death'
        }
    ]
    return (
        <Grid container spacing={3}>
            {
                summary.map(item => {
                    return (
                        <Grid item sm={4} xs={12} key={item.type}>
                            <HighlightCard title={item.title} count={item.count} type={item.type} />
                        </Grid>
                    )
                })
            }
        </Grid>
    )
}