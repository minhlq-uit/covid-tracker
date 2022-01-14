import React from "react";
import { Typography, Card, CardContent } from "@mui/material";
import { makeStyles } from '@mui/styles';
import CountUp from 'react-countup';


const useStyles = makeStyles({
    wrapper: (props) => {
        if(props.type === 'cases' || props.type === 'casesToday') {
            return {borderLeft: '5px solid red'}
        } else return {borderLeft: '5px solid gray'}
    },
    title: {fontSize: 18, marginBottom: 5},
    count: {fontWeight: 'bold', fontSize: 18},
})
export default function HighlightCard({ title, count, type }) {
    const classes = useStyles({type})
    return (
        <Card className={classes.wrapper}>
            <CardContent>
                <Typography variant="body2" component='p' className={classes.title}>
                    {title}
                </Typography>
                <Typography variant="body2" component='span' className={classes.count}>
                    <CountUp end={count} separator=' ' duration={1.5} />
                </Typography>
            </CardContent>
        </Card>
    )
}