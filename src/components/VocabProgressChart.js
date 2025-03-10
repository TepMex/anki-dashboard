import Chart from "react-apexcharts";

export function VocabProgressChart({ data = [], mistakesData = [] }) {
  if (!data || !mistakesData) {
    return <div>Loading chart data...</div>;
  }

  const options = {
    chart: {
      width: "100%",
      height: 350,
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: data.map((d) => d[0]),
      type: "datetime",
    },
    yaxis: [
      {
        title: {
          text: "Words Learned",
        },
      },
      {
        opposite: true,
        title: {
          text: "Review Mistakes",
        },
        min: 0,
      },
    ],
    colors: ["#ff8080", "#ff4d4d"],
    theme: {
      mode: "dark",
    },
    stroke: {
      width: [2, 0],
      curve: "smooth",
    },
    fill: {
      type: ["gradient", "solid"],
      gradient: {
        shade: "dark",
        type: "vertical",
        opacityFrom: 0.5,
        opacityTo: 0.1,
        colorStops: [
          {
            offset: 0,
            color: "#ff8080",
            opacity: 0.5,
          },
          {
            offset: 100,
            color: "#ff8080",
            opacity: 0.1,
          },
        ],
      },
      opacity: [1, 0.7],
    },
    legend: {
      labels: {
        colors: "#ffffff",
      },
    },
    plotOptions: {
      bar: {
        columnWidth: "50%",
        borderRadius: 2,
      },
    },
    responsive: [
      {
        breakpoint: 1000,
        options: {
          chart: {
            width: "100%",
          },
        },
      },
    ],
  };

  const series = [
    {
      name: "Words Learned",
      type: "area",
      data: data.map((d) => d[1]),
    },
    {
      name: "Review Mistakes",
      type: "bar",
      data: mistakesData.map((d) => d[1]),
    },
  ];

  return (
    <div style={{ width: "100%" }}>
      <Chart
        options={options}
        series={series}
        type="line"
        width="100%"
        height={350}
      />
    </div>
  );
}

export default VocabProgressChart;
