/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { DashboardData } from '../../types/dashboard';
import './dashboard.scss';

const ApexRadial = ({ dashbordData }: { dashbordData: DashboardData }) => {
  const options = {
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 135,
        dataLabels: {
          name: {
            fontSize: '13px',
            color: 'void 0',
            offsetY: 60,
          },
          value: {
            offsetY: 22,
            fontSize: '16px',
            color: 'void 0',
            formatter: function (e: any) {
              return e + '%';
            },
          },
        },
      },
    },
    colors: ['#556ee6'],
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        shadeIntensity: 0.15,
        inverseColors: !1,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 50, 65, 91],
      },
    },
    stroke: {
      dashArray: 4,
    },
    labels: ['Notification Delivery %'],
  };
  const series = [
    Math.round(
      (dashbordData?.sentAndDeliveredNotificationsCount?.deliveredUsersCount /
        dashbordData?.sentAndDeliveredNotificationsCount?.sentUsersCount) *
        100
    ) || 0,
  ];

  return (
    <React.Fragment>
      <ReactApexChart
        options={options}
        series={series}
        type="radialBar"
        height="200"
        className="apex-charts"
      />
    </React.Fragment>
  );
};

export default ApexRadial;
