import CHINA from '../common/china'
import * as echarts from 'echarts'; 
import React, { useEffect, useRef } from 'react';
import DefaultLayout from '../layout/DefaultLayout';

const Home: React.FC = () => {
  const echart = useRef(null)
  const chartRef: any = { value: null }
  const drawEChart = () => {
    const myChart = echarts.init(echart.current);
    chartRef.value = myChart
    echarts.registerMap('CHINA', CHINA);
    const option = {
      geo: {
        type: "map",
        map: "CHINA",
        label: {
          show: true,
          color: "#ACDCE1",
          fontSize: 16,
          fontWeight: "normal"
        },
        itemStyle: {
          color: "#0D2947",
          borderColor: "#01DBF3",
          borderWidth: 2
        },
        emphasis: {
          label: {
            show: true,
            color: "#ACDCE1",
            fontSize: 16,
            fontWeight: "normal"
          },
          itemStyle: {
            areaColor: "#0D2947",
            borderColor: "#01DBF3",
            borderWidth: 2,
            opacity: 0.9
          }
        }
      }
    };
    myChart.setOption(option);
  }
  useEffect(() => {
    setTimeout(() => {
      drawEChart()
    }, 0)
    return () => {
      if (chartRef.value) {
        console.log('===dispose===')
        chartRef.value.dispose()
        chartRef.value = null
      }
    }
  }, [])
  window.addEventListener('resize', () => {
    if (chartRef.value) {
      chartRef.value.resize()
    }
  })
  return (
    <DefaultLayout>
      <div className="card p-5 card-compact w-auto bg-base-100 shadow-xl">
        <div style={{ width: '100%', minHeight: '500px' }} ref={echart} />
      </div>
    </DefaultLayout>
  );
};

export default Home;
