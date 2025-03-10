import Chart from "react-apexcharts";

export function VocabProgressChart({ data = [], mistakesData = [] }) {
  if (!data || !mistakesData) {
    return <div>Loading chart data...</div>;
  }

  const options = {
    chart: {
      type: "line",
      height: 350,
      background: "#2a2a2a",
      toolbar: {
        show: false,
      },
      animations: {
        enabled: true,
        easing: "easeinout",
        speed: 800,
      },
    },
    xaxis: {
      categories: data.map((d) => d[0]),
      type: "datetime",
      labels: {
        style: {
          colors: "#aaa",
        },
      },
    },
    yaxis: [
      {
        title: {
          text: "Words Learned",
          style: {
            color: "#aaa",
          },
        },
        labels: {
          style: {
            colors: "#aaa",
          },
        },
      },
      {
        opposite: true,
        title: {
          text: "Review Mistakes",
          style: {
            color: "#aaa",
          },
        },
        labels: {
          style: {
            colors: "#aaa",
          },
        },
        min: 0,
      },
    ],
    colors: ["rgba(255, 64, 64, 0.8)", "rgba(255, 64, 64, 0.4)"],
    theme: {
      mode: "dark",
    },
    stroke: {
      width: [3, 0],
      curve: "smooth",
      lineCap: "round",
    },
    fill: {
      type: ["gradient", "solid"],
      gradient: {
        shade: "dark",
        type: "vertical",
        opacityFrom: 0.4,
        opacityTo: 0.1,
        colorStops: [
          {
            offset: 0,
            color: "rgba(255, 64, 64, 0.8)",
            opacity: 0.4,
          },
          {
            offset: 100,
            color: "rgba(255, 64, 64, 0.8)",
            opacity: 0.1,
          },
        ],
      },
      opacity: [0.8, 0.4],
    },
    legend: {
      labels: {
        colors: "#aaa",
      },
    },
    grid: {
      borderColor: "#333",
      strokeDashArray: 3,
      background: "#2a2a2a",
    },
    plotOptions: {
      bar: {
        columnWidth: "50%",
        borderRadius: 3,
        colors: {
          ranges: [
            {
              from: 0,
              to: 100,
              color: "rgba(255, 64, 64, 0.4)",
            },
          ],
        },
      },
    },
    tooltip: {
      theme: "dark",
      x: {
        format: "dd MMM yyyy",
      },
    },
    responsive: [
      {
        breakpoint: 1000,
        options: {
          chart: {
            height: 300,
          },
          legend: {
            position: "bottom",
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
    <div className="widget-container">
      <Chart options={options} series={series} type="line" height={350} />
    </div>
  );
}

export default VocabProgressChart;
