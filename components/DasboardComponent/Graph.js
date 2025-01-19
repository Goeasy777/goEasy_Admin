// import { BarChart, PieChart } from "@mui/x-charts";
// import React from "react";

// const Graph = () => {
//   option = {
//     title: {
//       text: "Referer of a Website",
//       subtext: "Fake Data",
//       left: "center",
//     },
//     tooltip: {
//       trigger: "item",
//     },
//     legend: {
//       orient: "vertical",
//       left: "left",
//     },
//     series: [
//       {
//         name: "Access From",
//         type: "pie",
//         radius: "50%",
//         data: [
//           { value: 1048, name: "Search Engine" },
//           { value: 735, name: "Direct" },
//           { value: 580, name: "Email" },
//           { value: 484, name: "Union Ads" },
//           { value: 300, name: "Video Ads" },
//         ],
//         emphasis: {
//           itemStyle: {
//             shadowBlur: 10,
//             shadowOffsetX: 0,
//             shadowColor: "rgba(0, 0, 0, 0.5)",
//           },
//         },
//       },
//     ],
//   };
//   return (
//     <div className="h-[60vh] w-full grid grid-cols-2 items-center justify-center gap-10 bg-formBG rounded-md">
//       {/* <div>
//         <BarChart
//           xAxis={[
//             { scaleType: "band", data: ["group A", "group B", "group C"] },
//           ]}
//           series={[
//             { data: [4, 3, 5] },
//             { data: [1, 6, 3] },
//             { data: [2, 5, 6] },
//           ]}
//           width={500}
//           height={300}
//         />
//       </div> */}

//       {/* <div>
//         <PieChart
//           series={[
//             {
//               data: [
//                 { id: 0, value: 10, label: "series A" },
//                 { id: 1, value: 15, label: "series B" },
//                 { id: 2, value: 20, label: "series C" },
//               ],
//             },
//           ]}
//           width={400}
//           height={200}
//         />
//       </div> */}
//     </div>
//   );
// };

// export default Graph;
"use client";
import React, { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";

const Graph = () => {
  const pieRef = useRef(null);
  const barRef = useRef(null);
  const [oncus, setCuson] = useState();
  const [offcus, setCusoff] = useState();
  const [onpat, setPaton] = useState();
  const [offpat, setPatoff] = useState();

  const fetchCustomer = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/fetchUser`);
      const Data = await response.json();
      setCuson(Data.activeUser);
      setCusoff(Data.deactiveUser);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPartner = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/partner/fetchpartnerford`
      );
      const Data = await response.json();
      setPaton(Data.activePartner);
      setPatoff(Data.deactivePartner);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCustomer();
    fetchPartner();
  }, []);

  // Update pie chart when `on` and `off` values change
  useEffect(() => {
    if (
      oncus !== undefined &&
      offcus !== undefined &&
      onpat !== undefined &&
      offpat !== undefined
    ) {
      const pieChart = echarts.init(pieRef.current);

      const option = {
        // title: {
        //   text: "Referer of a Website",
        //   subtext: "Fake Data",
        //   left: "center",
        // },
        tooltip: {
          trigger: "item",
        },
        series: [
          {
            name: "Access From",
            type: "pie",
            radius: "50%",
            data: [
              { value: oncus, name: "Active Customer" },
              { value: offcus, name: "Deactive Customer" },
              { value: onpat, name: "Active Partner" },
              { value: offpat, name: "Deactive Partner" },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };

      pieChart.setOption(option);

      return () => {
        pieChart.dispose();
      };
    }
  }, [oncus, offcus, onpat, offpat]);

  // Initialize bar chart once
  useEffect(() => {
    const barChart = echarts.init(barRef.current);

    const option = {
      tooltip: {},
      dataset: {
        dimensions: ["product", "2015", "2016", "2017"],
        source: [
          { product: "Matcha Latte", 2015: 43.3, 2016: 85.8, 2017: 93.7 },
          { product: "Milk Tea", 2015: 83.1, 2016: 73.4, 2017: 55.1 },
          { product: "Cheese Cocoa", 2015: 86.4, 2016: 65.2, 2017: 82.5 },
          { product: "Walnut Brownie", 2015: 72.4, 2016: 53.9, 2017: 39.1 },
        ],
      },
      xAxis: { type: "category" },
      yAxis: {},
      series: [{ type: "bar" }, { type: "bar" }, { type: "bar" }],
    };

    barChart.setOption(option);

    return () => {
      barChart.dispose();
    };
  }, []);

  return (
    // <div className="h-[60vh] w-full grid grid-cols-2 items-center justify-center gap-10 bg-formBG rounded-md p-5 shadow-md">
    //   <div ref={barRef} className="h-full w-full" />
    //   <div ref={pieRef} className="h-full w-full" />
    // </div>
    <div className="h-auto w-full grid grid-cols-1 sm:grid-cols-2 items-center gap-5 sm:gap-10 bg-formBG rounded-md p-5 shadow-md">
      {/* Bar Chart */}
      <div ref={barRef} className="h-[40vh] w-full sm:h-[60vh]" />

      {/* Pie Chart */}
      <div ref={pieRef} className="h-[40vh] w-full sm:h-[60vh]" />
    </div>
  );
};

export default Graph;
