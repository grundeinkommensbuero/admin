import React, { useState, useEffect } from 'react';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import './index.css';

const DatePicker = ({ updateData }) => {
  const [currentRange, setNewRange] = useState([]);

  useEffect(() => {
    // Only update call function if start and end is set
    if (currentRange) {
      if (currentRange.length === 2) {
        // We have to add one day because of timezone issues
        const startDate = new Date(currentRange[0]);
        startDate.setDate(startDate.getDate() + 1);
        const endDate = new Date(currentRange[1]);
        endDate.setDate(endDate.getDate() + 1);

        updateData({
          startDate: startDate.toISOString().substring(0, 10), // we only want to pass YYYY-MM-DD
          endDate: endDate.toISOString().substring(0, 10),
        });
      }
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
