import React, { useState, useEffect } from 'react';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import './index.css';

const DatePicker = ({ updateData }) => {
  const [currentRange, setNewRange] = useState([]);

  useEffect(() => {
    // Only update call function if start and end is set
    if (currentRange && currentRange.length === 2) {
      updateData({
        startDate: currentRange[0].toISOString().substring(0, 10), // we only want to pass YYYY-MM-DD
        endDate: currentRange[1].toISOString().substring(0, 10),
      });
    } else {
      // Range was cleared --> update history without params
      updateData({});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentRange]);

  return (
    <div className="datepicker">
      <SemanticDatepicker
        locale="de-DE"
        onChange={(event, data) => setNewRange(data.value)}
        type="range"
        showToday={false}
      />
    </div>
  );
};

export default DatePicker;
