/* eslint-disable react/jsx-key */
import {
  CartesianGrid,
  Customized,
  Legend,
  Line,
  LineChart,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import useDataFormatter from "../../hooks/useDataFormatter";

const BarChartViz = () => {
  const data = useDataFormatter("bar");
  console.log(data);

  return (
    <div style={{ paddingRight: "20px" }}>
      <div style={{ height: "600px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={500}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis domain={[0, 24]} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="check_in" stroke="#8884d8" />
            <Line type="monotone" dataKey="checkout" stroke="#82ca9d" />
            <Customized component={CustomizedRectangle} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BarChartViz;

const CustomizedRectangle = (props) => {
  const { formattedGraphicalItems } = props;

  // get first and second series in the chart
  const firstSeries = formattedGraphicalItems[0];
  const secondSeries = formattedGraphicalItems[1];

  // render custom content using points from the graph
  return firstSeries?.props?.points.map((_, index) => {
    const firstSeriesPoint = firstSeries?.props?.points[index];
    const secondSeriesPoint = secondSeries?.props?.points[index];
    const yDiff = firstSeriesPoint.y - secondSeriesPoint.y;

    return (
      <Rectangle
        width={10}
        height={-yDiff}
        x={firstSeriesPoint.x - 5}
        y={firstSeriesPoint.y}
        fill={yDiff > 0 ? "#5886d9" : yDiff < 0 ? "#5886d9" : "none"}
      />
    );
  });
};
