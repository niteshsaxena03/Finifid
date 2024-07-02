import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';


import Charts from '../../components/Charts/Charts';

export default function FunctionSection() {
  const [value, setValue] = React.useState('one');
  const [chart , setChat ] = React.useState("reach") ;  

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function handleClick(value){

    if( value == "clicks"){
      setChat("clicks")
    }
    else{
      setChat("reach")
    }

  }



  return (
    <>
    
    <Box sx={{ width: '100%' }}>
   
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
        aria-label="secondary tabs example"
        sx={{
          '& .MuiTab-root': {
            color: '#8e0b3a',
          },
          '& .Mui-selected': {
            color: '#8e0b3a',
          },
          '& .MuiTabs-indicator': {
            backgroundColor: '#8e0b3a',
          },
          '& .MuiTabs-flexContainer': {
            justifyContent: 'center',
          },
        }}
      >
        <Tab value="one" label="Reach"onClick={()=>handleClick("reach")} sx={{  flex: 1  }} />
      </Tabs>
    </Box>

    
    {

      ( chart == "reach") ? <Charts name = {"reach"}/>:  null 

    }
    
    </>
  );
}
