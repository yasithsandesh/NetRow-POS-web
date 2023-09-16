import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function StockSort({select,setSelect}) {


    const handleChange = (event) => {
      setSelect(event.target.value);
    };
  
    // Stock ID ASC, Stock ID DESC, Brand ASC, Brand DESC, Name ASC, Name DESC, Selling Price ASC, Selling Price DESC, Qty ASC, Qty DESC

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
            <MenuItem value={1}>Stock ID ASC</MenuItem>
            <MenuItem value={2}>Stock ID DESC</MenuItem>
            <MenuItem value={3}>Brand ASC</MenuItem>
            <MenuItem value={4}>Brand DESC</MenuItem>
            <MenuItem value={5}>Name ASC</MenuItem>
            <MenuItem value={6}>Name DESC</MenuItem>
            <MenuItem value={7}>Selling Price ASC</MenuItem>
            <MenuItem value={8}>Selling Price DESC</MenuItem>
            <MenuItem value={9}>Qty ASC</MenuItem>
            <MenuItem value={10}>Qty DESC</MenuItem>
          </Select>
        </FormControl>
      </Box>
    );
}
