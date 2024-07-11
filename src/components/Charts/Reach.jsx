import React, { useEffect, useState } from 'react';

import { BarChart, Bar,ResponsiveContainer, CartesianGrid, Legend , Tooltip ,XAxis , YAxis} from 'recharts';

// getting data 
import { getData } from '../../pages/Profile/Reach.js';

const Reach = ({userData}) => {
  let [data, setData] = useState([]);
 

  useEffect(() => {
     const  fetchData = async () => { 
      try {
        const result = await getData(userData);
        setData(result);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };

    console.log("data of user" , userData ) ;
    if( userData && userData.email){
      fetchData() ;
    }
  }, [userData]);

  return (
    <ResponsiveContainer width="100%" height={300} style={{ display: 'block' }}>
    <BarChart width="100%" height="100%" data={data} margin={{ top: 10, right: 30, left: 0, bottom: 20 }}>
      <CartesianGrid strokeDasharray="2 2" />
      <Tooltip />
      <Legend />
      <XAxis dataKey="category" tick={{ fill: '#333', fontWeight: 'bold' }} interval={0} />
      <YAxis tick={{ fill: '#333', fontWeight: 'bold' }} />
      <Bar
        type='monotone'
        dataKey="Reach"
        stroke='#ccc'
        fill='#8e0b3a'
        fillOpacity={0.8} // Adjust transparency as needed
      />
    </BarChart>
  </ResponsiveContainer>
  );
}

export default Reach;
