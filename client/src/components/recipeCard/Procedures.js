import React from 'react';
import TextArea from './TextArea';

const Procedures = ({
  value,
  changeHandler,
}) => {

  return (
    <div className="procedures">
      <div className="title">Procedures:</div>
        <div className="item">
          <TextArea
            placeholder="Add Procedure"
            value={value}
            name="procedures"
            changeHandler={changeHandler}
          />
      </div>
    </div>
  )
}

export default Procedures;
