import React from 'react';

const Procedures = ({ children }) => (
  <div className='procedures'>
    <div className='title'>Procedures:</div>
    <div className='item'>
      {children}
    </div>
  </div>
);

export default Procedures;
