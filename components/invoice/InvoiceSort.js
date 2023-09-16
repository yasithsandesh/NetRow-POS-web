import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function InvoiceSort({select,setSelect}) {


    const handleChange = (event) => {
      setSelect(event.target.value);
    };
  
  

    return (
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Sort</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={select}
            label="Sort"
            onChange={handleChange}
          >
            <MenuItem value={1}>Invoice Number ASC</MenuItem>
            <MenuItem value={2}>Invoice Number DESC</MenuItem>
            <MenuItem value={3}>Paid Amount ASC</MenuItem>
            <MenuItem value={4}>Paid Amount DESC</MenuItem>
            <MenuItem value={5}>Qty ASC</MenuItem>
            <MenuItem value={6}>Qty DESC</MenuItem>
          </Select>
        </FormControl>
      </Box>
    );
}
