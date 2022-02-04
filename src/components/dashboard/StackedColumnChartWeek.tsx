/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { ApexOptions } from 'apexcharts';
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { CustomerTrend } from '../../types/dashboard';

const correctTrends = (incomeArr: CustomerTrend[]) => {
  const yearData = [
    {
      name: 'First Visit',
      data: [0, 0, 0, 0, 0, 0, 0,],
    },
    {
      name: 'Second Visit',
      data: [0, 0, 0, 0, 0, 0, 0,],
    },
    {
      name: 'Regular Customer',
      data: [0, 0, 0, 0, 0, 0, 0,],
    }
  ];
  incomeArr.map(item => {
    const idx = (2 + item.visitDayOfWeek + new Date().getDay()) % 7;
    yearData[0].data[idx] = item.firstTimeVisitor;
    yearData[1].data[idx] = item.secondTimeVisitor;
    yearData[2].data[idx] = item.regular;
  });
  return yearData;
}

const StackedColumnChartWeek = ({ incomeData }: {incomeData : CustomerTrend[]}) => {
  const [periodData, setPeriodData] = useState([]);
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  useEffect(() => {
    if (incomeData) {
      const week = correctTrends(incomeData);
      setPeriodData(week);
    }
  }, [incomeData])

  const weekList = [];
  for (let i = new Date().getDay() + 1; i < 7 + new Date().getDay() + 1; i++) {
    weekList.push(weekDays[i % 7]);
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
      categories: weekList,
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

export default StackedColumnChartWeek;
