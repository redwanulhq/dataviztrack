import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import useDataFormatter from "../../hooks/useDataFormatter";

const LineGraphViz = () => {
  const data = useDataFormatter("line");

  console.log(data);

  return (
    <div style={{ paddingRight: "20px" }}>
      <div style={{ height: "600px", p: "20px 15px 20px 0" }}>
        <ResponsiveContainer width="99%" height="100%">
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
            <Line
              type="monotone"
              dataKey="pv"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
            <Line type="bump" dataKey="total_working_hour" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LineGraphViz;
