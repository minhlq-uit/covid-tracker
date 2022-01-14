import React, { useEffect } from "react";
import { useState } from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import { Button, ButtonGroup } from "@mui/material";

const generateOptions = (data, reportType) => {
    const categories = data.map(item => item.date)

    const {type, color} = {...reportType}

    const series = [
        {
            name: type === 'cases' ? 'Ca mắc mới' : type === 'recovered' ? 'Khỏi bệnh' : 'Tử vong',
            data: data.map((item) => item[type]),
        },
    ]

    return {
      chart: {
        height: 500,
      },
      title: {
        text: 'Thống kê dữ liệu covid 19 theo ngày',
      },
      xAxis: {
        categories: categories,
        crosshair: true,
      },
      colors: [color],
      yAxis: {
        min: 0,
        title: {
          text: null,
        },
        labels: {
          align: 'right',
        },
      },
      tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat:
          '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
          '<td style="padding:0"><b>{point.y} ca</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true,
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0,
        },
      },
      series: [
        ...series
      ],
    };
  };

export default function LineChart({ data }) {
    const [options, setOptions] = useState({})
    const [reportType, setReportType] = useState({type: 'cases', color: 'red'})

    useEffect(() => {
        if(data) {
            setOptions(generateOptions(data, reportType))
        }
    }, [data, reportType])
    return (
        <>
            <ButtonGroup size='small' style={{display: 'flex', justifyContent: 'flex-end'}}>
                <Button 
                    color={reportType.type === 'cases' ? 'secondary' : 'primary'}
                    onClick={() => setReportType({type: 'cases', color: 'red'})}
                >
                    Ca mắc mới
                </Button>
                <Button 
                    color={reportType.type === 'recovered' ? 'secondary' : 'primary'}
                    onClick={() => setReportType({type: 'recovered', color: 'green'})}
                >
                    Khỏi bệnh
                </Button>
                <Button 
                    color={reportType.type === 'death' ? 'secondary' : 'primary'}
                    onClick={() => setReportType({type: 'death', color: 'gray'})}
                >
                    Tử vong
                </Button>
            </ButtonGroup>
            <HighchartsReact 
                highcharts={Highcharts}
                options={options}
            />
        </>
    )
}