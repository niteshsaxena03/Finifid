import React, { useEffect, useState } from 'react';
import getPostData from '../../pages/Profile/Reach.js';

import { BarChart, Bar,ResponsiveContainer, CartesianGrid, Legend , Tooltip ,XAxis , YAxis} from 'recharts';
// import { XAxis, YAxis } from './CustomAxis'; // Adjust the import path as needed


const Reach = () => {
  let [data, setData] = useState([]);
 

  useEffect(() => {
     const  fetchData = () => { 
      try {
        const result = getPostData();
        setData(result);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };

    fetchData();
  }, []);

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
