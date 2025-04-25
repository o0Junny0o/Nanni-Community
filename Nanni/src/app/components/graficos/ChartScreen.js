import React from 'react';
import PropTypes from 'prop-types';
//import styles from './style';

export default function ChartScreen({ data }) {
  return (
    
  );
}

ChartScreen.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
    }),
  ).isRequired,
};
