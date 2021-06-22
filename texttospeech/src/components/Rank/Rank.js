import React from 'react';

const Rank = (props) => {
  return (
    <div>
    <div className="white f3">
    {`${props.username}, your current rank is: `}
    </div>
    <div className="white f1">
    {props.count}
    </div>
    </div>
  );
}


export default Rank;