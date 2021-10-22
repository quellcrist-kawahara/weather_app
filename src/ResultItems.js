import React from 'react';

const ResultItems = ({results, cities}) => (
  <div style={{ display: 'flex', padding: 20 }}>
    {results.map((i, index) => {
      const res = typeof i.result === 'boolean' ? (
        <div style={{color: i.result ? 'green' : 'red', padding: '0 20px'}} key={cities[index]}>
          <p>{i.userInp || 0}</p>
          <p>Was {i.temp?.toFixed() || 0}</p>
        </div>
      ) : null
      return res;
    })}
  </div>
)

export default ResultItems;