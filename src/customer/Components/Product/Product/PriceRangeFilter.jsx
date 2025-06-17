import React, { useState } from 'react';
import { Slider, Typography } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { styled } from '@mui/material/styles';

const CustomSlider = styled(Slider)(({ theme }) => ({
  color: 'white', // Slider track and thumb color
  '& .MuiSlider-markLabel': {
    color: 'white', // Label color
  },
  '& .MuiSlider-markLabelActive': {
    color: 'white', // Label color when active
  },
}));


const PriceRangeFilter = ({ section}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [value, setValue] = useState([0, 50000]); 
  
    const handleSliderChange = (event, newValue) => {
      setValue(newValue);
    };
  
    const handleSliderChangeCommitted = (event, newValue) => {
      const searchParams = new URLSearchParams(location.search);
      searchParams.set(section.id, `${newValue[0]}-${newValue[1]}`);
      const query = searchParams.toString();
      navigate({ search: `?${query}` });
    };
  
    return (
      <div>
        <CustomSlider
        style={{width:"90%"}}
          value={value}
          onChange={handleSliderChange}
          onChangeCommitted={handleSliderChangeCommitted}
          valueLabelDisplay="auto"
          min={0}
          max={50000}
          step={1000}
          marks={[
            { value: 0, label: '0' },
            { value: 25000, label: '$25000' },
            { value: 50000, label: '$50000+' },
          ]}
        />
      </div>
    );
  };
  
  export default PriceRangeFilter;
  