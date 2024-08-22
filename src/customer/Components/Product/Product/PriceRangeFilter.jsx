import React, { useState } from 'react';
import { Slider, Typography } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';


const PriceRangeFilter = ({ section, filter,maxPrice }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [value, setValue] = useState([0, 50000]); // Initial range value
  
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
        <Slider
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
            { value: 50000, label: '$50000' },
          ]}
        />
      </div>
    );
  };
  
  export default PriceRangeFilter;
  