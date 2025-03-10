import Chart from "react-apexcharts";

export function VocabProgressChart({
  data = [],
  mistakesData = [],
  reviewsData = [],
}) {
  if (!data || !mistakesData || !reviewsData) {
    return <div>Loading chart data...</div>;
  }

  // Find max value for proper scaling based on reviews
  const maxReviews = Math.max(...reviewsData.map((d) => d[1]));

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
      stacked: false,
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
          text: "Reviews and Mistakes Count",
          style: {
            color: "#aaa",
          },
        },
        labels: {
          style: {
            colors: "#aaa",
          },
          formatter: (value) => Math.round(value), // Ensure whole numbers
        },
        min: 0,
        max: maxReviews,
        tickAmount: 4,
        floating: false,
      },
    ],
    colors: [
      "rgba(255, 64, 64, 0.8)", // Words Learned - red area
      "rgba(255, 64, 64, 0.9)", // Mistakes - bright red bars in foreground
      "rgba(97, 218, 251, 0.3)", // Cards Reviewed - light blue bars in background
    ],
    theme: {
      mode: "dark",
    },
    stroke: {
      width: [3, 0, 0],
      curve: "smooth",
      lineCap: "round",
    },
    fill: {
      type: ["gradient", "solid", "solid"],
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
      opacity: [0.8, 0.3, 0.9],
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
        dataLabels: {
          position: "top",
        },
      },
    },
    tooltip: {
      theme: "dark",
      shared: true,
      x: {
        format: "dd MMM yyyy",
      },
      y: {
        formatter: function (value, { seriesIndex }) {
          if (seriesIndex === 0) return `${value} words learned`;
          if (seriesIndex === 2) return `${value} cards reviewed`;
          return `${value} mistakes`;
        },
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
      name: "Mistakes",
      type: "bar",
      data: mistakesData.map((d) => d[1]),
    },
    {
      name: "Cards Reviewed",
      type: "bar",
      data: reviewsData.map((d) => d[1]),
    },
  ];

  return (
    <div className="widget-container">
      <Chart options={options} series={series} type="line" height={350} />
    </div>
  );
}

export default VocabProgressChart;
