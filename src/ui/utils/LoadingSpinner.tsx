import React from 'react';

export const LoadingSpinner = () => {
  return (
    <div className="d-flex w-100 h-100 align-items-center justify-content-center">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};
