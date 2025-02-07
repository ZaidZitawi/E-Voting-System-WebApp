import React from 'react';
import './PieChartComponent.css';
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import PropTypes from 'prop-types';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AA336A', '#33AAFF'];

const PieChartComponent = ({ totalVotes, candidates }) => {
  // Prepare data for the donut chart
  const chartData = candidates.map(candidate => ({
    name: candidate.name,
    value: candidate.votes,
  }));

  return (
    <div className="pie-chart">
      <div className="total-votes">
        <h3>Total Votes</h3>
        <p>{totalVotes.toLocaleString()}</p>
      </div>
      <div className="donut-chart-container">
        <ResponsiveContainer width="100%" height={250}>
          <RechartsPieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              innerRadius={50}
              fill="#8884d8"
              label
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => value.toLocaleString()} />
            <Legend />
          </RechartsPieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

PieChartComponent.propTypes = {
  totalVotes: PropTypes.number.isRequired,
  candidates: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      votes: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default PieChartComponent;
