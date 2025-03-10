import React from "react";

function ProgressBar({ memorizedCount, totalCards }) {
  const percentage = totalCards > 0 ? (memorizedCount / totalCards) * 100 : 0;

  return (
    <div className="progress-container">
      <div className="progress-info">
        <span>
          Words memorised: {memorizedCount} / {totalCards}
        </span>
        <span>{percentage.toFixed(1)}%</span>
      </div>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
}

export default ProgressBar;
