import React from 'react';
import moment from 'moment';

const TimeRemaining = ({time}) => (
  <h3>{time ? moment(time).format('mm:ss') : "00:00"}</h3>
);

export default TimeRemaining;