import React from 'react'
import ApexCharts from 'react-apexcharts'
const ChartComponent = ({ labelField, serieField, data }) => {

    const series = data.map((item) => {
        return item[serieField]
    })
    let labels = labelField ?
        data.map(item => item[labelField]) : [];
    const options = {
        chart: {
            type: 'donut',
        },
        series,
        labels,
    }
    if (data.length === 0) {
        return <div >
            <h2 style={{ textAlign: 'center' }}>No results for this search</h2>
        </div>
    }
    return (
        <ApexCharts
            options={options}
            series={options.series}
            type="donut"
            width='100%'
            height={500}
        />
    )
}

export default ChartComponent
