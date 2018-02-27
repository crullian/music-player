import React from 'react';
import moment from 'moment';

const TimeRemaining = ({time}) => (
  <h3>{moment(time).format('mm:ss')}</h3>
);

export default TimeRemaining;