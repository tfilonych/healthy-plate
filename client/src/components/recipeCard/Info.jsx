import React from 'react';

const Info =
  ({
     children,
     className = ''
   }) => {
    return (
      <div className={`recipe-info ${className}`}>
        {children}
      </div>
    );
  };

export default Info;