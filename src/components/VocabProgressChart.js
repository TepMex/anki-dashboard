import Chart from "react-apexcharts";
export function VocabProgressChart({ data }) {
  const options = {
    xaxis: {
      categories: data.map((d) => d[0]),
    },
    colors: ["#ff8080", "#ff0000"],
    theme: {
      mode: "dark",
    },
  };
  const series = [
    {
      name: "vocab",
      data: data.map((d) => d[1]),
    },
    {
      name: "zalupa",
      data: data.map((d) => d[1] - 10),
    },
  ];

  return (
    <Chart width={"1000px"} options={options} series={series} type="area" />
  );
}

export default VocabProgressChart;
