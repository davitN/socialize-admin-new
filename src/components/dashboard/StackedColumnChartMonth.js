/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react';
import PropTypes from 'prop-types';
import ReactApexChart from 'react-apexcharts';

const StackedColumnChartMonth = ({ periodData }) => {
  const monthDays = [];
  const date = new Date();
  for (let i = 0; i < 30; i++) {
    monthDays.unshift(date.getDate());
    date.setDate(date.getDate() - 1);
  }
  const options = {
    chart: {
      stacked: !0,
      toolbar: {
        show: 1,
      },
      zoom: {
        enabled: !0,
      },
    },
    plotOptions: {
      bar: {
        horizontal: !1,
        columnWidth: '15%',
        // endingShape: "rounded"
      },
    },
    dataLabels: {
      enabled: !1,
    },
    xaxis: {
      show: true,
      categories: monthDays,
      labels: {
        show: true,
      },
    },
    colors: ['#556ee6', '#f1b44c', '#34c38f'],
    legend: {
      position: 'bottom',
    },
    fill: {
      opacity: 1,
    },
  };
  return (
    <React.Fragment>
      <ReactApexChart
        options={options}
        series={[...periodData]}
        type="bar"
        height="359"
        className="apex-charts"
      />
    </React.Fragment>
  );
};

StackedColumnChartMonth.propTypes = {
  periodData: PropTypes.any,
};
export default StackedColumnChartMonth;
