/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { ApexOptions } from 'apexcharts';
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { CustomerTrend } from '../../types/dashboard';

const correctTrends = (incomeArr: CustomerTrend[]) => {
  const yearData = [
    {
      name: 'First Visit',
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    {
      name: 'Second Visit',
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    {
      name: 'Regular Customer',
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    }
  ];
  incomeArr.map(item => {
    const idx = (10 + parseInt(item.visitYearMonthDate.split('-')[1]) - new Date().getMonth()) % 12;
    yearData[0].data[idx] = item.firstTimeVisitor;
    yearData[1].data[idx] = item.secondTimeVisitor;
    yearData[2].data[idx] = item.regular;
  });
  return yearData;
}

const StackedColumnChartYear = ({ incomeData }: {incomeData: CustomerTrend[]}) => {
  const [periodData, setPeriodData] = useState([]);
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  useEffect(() => {
    if (incomeData) {
      const years = correctTrends(incomeData);
      setPeriodData(years);
    }
  }, [incomeData]);

  const monthList = [];
  for (let i = new Date().getMonth() + 1; i < 12 + new Date().getMonth() + 1; i++) {
    monthList.push(months[i % 12]);
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
      categories: monthList,
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

export default StackedColumnChartYear;
