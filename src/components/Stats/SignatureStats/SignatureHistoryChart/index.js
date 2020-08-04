import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  Legend,
  CartesianGrid,
} from 'recharts';
import './index.css';
import '../../../../vars.css';

const SignatureHistoryChart = ({ history, campaign }) => {
  if (!(campaign in history)) {
    return <p>Noch keine Historie für dieses Bundesland</p>;
  }

  return (
    <div className="historyChart">
      <ResponsiveContainer width="100%" aspect={4.0 / 3.0}>
        <LineChart data={history[campaign]}>
          <Line
            type="monotone"
            dataKey="received"
            stroke="var(--chartColorOne)"
            activeDot={{ r: 8 }}
          />
          <Line
            type="monotone"
            dataKey="scanned"
            stroke="var(--linkColor)"
            activeDot={{ r: 8 }}
          />
          <Line
            type="monotone"
            dataKey="downloads"
            stroke="var(--chartColorTwo)"
            activeDot={{ r: 8 }}
          />

          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip formatter={mapTooltipNames} />
          <Legend formatter={mapLegendNames} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

const mapTooltipNames = (value, name) => {
  if (name === 'received') {
    return [value, 'Angekommene Unterschriften'];
  }

  if (name === 'scanned') {
    return [value, 'Von User*innen eingetragene Unterschriften'];
  }

  if (name === 'downloads') {
    return [value, 'Unterschriftendownloads'];
  }
};

const mapLegendNames = (name) => {
  if (name === 'received') {
    return 'Angekommene Unterschriften';
  }

  if (name === 'scanned') {
    return 'Von User*innen eingetragene Unterschriften';
  }

  if (name === 'downloads') {
    return 'Unterschriftendownloads';
  }
};

export default SignatureHistoryChart;
