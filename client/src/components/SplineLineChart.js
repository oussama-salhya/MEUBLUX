import React from 'react'
import ApexCharts from 'react-apexcharts'
import formatPrice from '../utils/formatPrice'

const SplineLineChart = ({ data, label, color, name, type }) => {
    const categories = data.map(item => item._id)
    console.log('====================================');
    console.log(data, label);
    console.log('====================================');
    const options = {
        chart: {
            // height: 350,
            type: type || 'line',
            zoom: {
                enabled: false
            }
        },
        plotOptions: {
            bar: {
                width: 10,
            }
        },
        series: [
            {
                name,
                data: data.map(item => {
                    if (label === 'totalPrice') {
                        return item[label] / 100
                    }
                    return item[label]
                }),
            }
        ],
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth',
            colors: [color]
        },
        xaxis: {
            categories,
        },
        // yaxis: {
        //     seriesName: 'sales',
        //     showAlways: true,
        // },
        markers: {
            colors: color,
            strokeWidth: 2,
            strokeColors: '#fff'
        },
        tooltip: {
            custom: function ({ series, seriesIndex, dataPointIndex, w }) {
                return `<div class="arrow_box" style="font-size:12px;">
                    <span style="background:#ECEFF1; display:block; padding : 6px;">${categories[dataPointIndex]}</span>
                    <div style="display : flex ; align-items : center ; padding : 6px;">
                        <span style="background:${color};
                            width: 12px;
                            height: 12px;
                            position: relative;
                            display : inline-block;
                            margin-right: 10px;
                            border-radius: 50%;"></span>
                    <span style="text-transform:capitalize; margin-right: 10px;"> ${name} </span> 
                    <span style="font-weight:bold;">${series[seriesIndex][dataPointIndex]}</span> 
                    </div>
                </div>`
            }
        }
    }
    if (data.length === 0) {
        return <div >
            <h2 style={{ textAlign: 'center' }}>No results for this search</h2>
        </div >
    }

    return (
        <ApexCharts
            options={options}
            series={options.series}
            type={type || 'line'}
            height={'100%'} />
    )
}

export default SplineLineChart
