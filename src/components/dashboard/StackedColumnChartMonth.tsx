/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { ApexOptions } from 'apexcharts';
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { CustomerTrend } from '../../types/dashboard';

const correctTrends = (incomeArr: CustomerTrend[]) => {
  const yearData = [
    {
      name: 'First Visit',
      data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    },
    {
      name: 'Second Visit',
      data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    },
    {
      name: 'Regular Customer',
      data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    }
  ];
  incomeArr.map(item => {
    const idx = ((item.visitDayOfMonth - new Date().getDate() + 29) % 30);
    yearData[0].data[idx] = item.firstTimeVisitor;
    yearData[1].data[idx] = item.secondTimeVisitor;
    yearData[2].data[idx] = item.regular;
  });
  return yearData;
}

const StackedColumnChartMonth = ({ incomeData } : {incomeData: CustomerTrend[]}) => {
  const [periodData, setPeriodData] = useState([]);
  const monthDays = [];
  const date = new Date();

  useEffect(() => {
    if (incomeData) {
      const months = correctTrends(incomeData);
      setPeriodData(months);
    }
  }, incomeData);

  for (let i = 0; i < 30; i++) {
    monthDays.unshift(date.getDate());
    date.setDate(date.getDate() - 1);
  }
  const options: ApexOptions = {
    chart: {
      stacked: !0,
      toolbar: {
        show: true,
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

export default StackedColumnChartMonth;
