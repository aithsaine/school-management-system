import React from 'react';
import PropTypes from 'prop-types';

function StatisticsCard({color,  icon, title, value }) {
    const colors = ["red","purple","sky","blue", "green","indigo","violet"]
  return (
    <div  className={`${color} p-4 m-2 rounded-lg`}>
      <div className="flex items-center">
        {icon}
        <span className="ml-2 text-white text-lg font-semibold">{title}</span>
      </div>
      <div className="mt-2 text-white text-3xl font-bold">{value}</div>
    </div>
  );
}

StatisticsCard.defaultProps = {
  color: "blue",
  footer: null,
};

StatisticsCard.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,

};

export default StatisticsCard;
