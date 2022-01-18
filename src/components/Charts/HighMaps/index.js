import React, { useEffect, useRef, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import highchartsMap from 'highcharts/modules/map';
import { cloneDeep } from 'lodash';

highchartsMap(Highcharts);

const initOptions = {
    chart: {
      height: '500',
    },
    title: {
      text: null,
    },
    mapNavigation: {
      enabled: true,
    },
    colorAxis: {
      min: 0,
      stops: [
        [0.1, '#fae2d8'],
        [0.2, '#fad0be'],
        [0.3, '#FFC4AA'],
        [0.4, '#FF8A66'],
        [0.6, '#FF392B'],
        [0.8, '#B71525'],
        [1, '	#7A0826'],
      ],
    },
    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'bottom',
    },
    series: [
      {
        mapData: {},
        name: 'Tổng ca nhiễm',
        joinBy: ['hc-key', 'key'],
      },
    ],
  };

  const HighMaps = ({ mapData, data }) => {
    const [options, setOptions] = useState({});
    const [mapLoaded, setMapLoaded] = useState(false);
    const [customData, setCustomData] = useState([])
    const chartRef = useRef(null);
  
    function removeVietnameseTones(str) {
      if(!str) {
        return null
      }
      str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"?"); 
      str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"?"); 
      str = str.replace(/ì|í|ị|ỉ|ĩ/g,"?"); 
      str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"?"); 
      str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"?"); 
      str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"?"); 
      str = str.replace(/đ/g,"?");
      str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "?");
      str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "?");
      str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "?");
      str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "?");
      str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "?");
      str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "?");
      str = str.replace(/Đ/g, "?");
      // Some system encode vietnamese combining accent as individual utf-8 characters
      // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
      str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
      str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
      // Remove extra spaces
      // Bỏ các khoảng trắng liền nhau
      str = str.replace(/ + /g," ");
      str = str.trim();
      // Remove punctuations
      // Bỏ dấu câu, kí tự đặc biệt
      str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g," ");
      return str;
  }
  useEffect(() => {
    setCustomData(() => {
      if(data.locations) {
        const custom = data.locations.map(location => {
          if(location.name === "TP. Hồ Chí Minh") {
            return (
              {
                ...location,
                name: 'H  Ch  Minh city'
              }
            )
          }
          if(location.name === 'Hà Nội') {
            return (
              {
                ...location,
                name: 'Ha Noi'
              }
            )
          }
          return (
            {
              ...location,
              name: removeVietnameseTones(location.name)
            }
          )
        })
        return custom
      }
    })
  }, [data])
  function getValue(feature, index) {
    if(data.locations) {
      // console.log('tim', feature, index)
      const name = removeVietnameseTones(feature)
      // console.log('tim', name, index)


      let value 
      for(let i=0; i<customData.length; i++) {
        if(customData[i].name === name) {
          // console.log('value', customData[i].cases)
          value = customData[i].cases
        }
      }
      // console.log('value', value)
      return value ? value : -1
    }
  }
    useEffect(() => {
      if (mapData && Object.keys(mapData).length) {
        const fakeData = mapData.features.map((feature, index) => ({
          key: feature.properties['hc-key'],
          value: getValue(feature.properties.name, index)
        }));

        setOptions(() => ({
          ...initOptions,
          title: {
            text: mapData.title,
          },
          series: [
            { ...initOptions.series[0], mapData: mapData, data: fakeData },
          ],
        }));
  
        if (!mapLoaded) setMapLoaded(true);
      }
    }, [mapData, data]);
    // console.log(mapData.features);
  
    useEffect(() => {
      if (chartRef && chartRef.current) {
        chartRef.current.chart.series[0].update({
          mapData,
        });
      }
    }, [mapData]);
  
    if (!mapLoaded) return null;
  
    return (
      <HighchartsReact
        highcharts={Highcharts}
        options={cloneDeep(options)}
        constructorType={'mapChart'}
        ref={chartRef}
      />
    );
  };
  
  HighMaps.defaultProps = {
    mapData: {},
  };
  
  export default React.memo(HighMaps);