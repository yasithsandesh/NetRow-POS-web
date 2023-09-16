import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function TypeSelect() {
  const [type, setType] = useState();
  console.log(type);

  const [data, setData] = useState();

  const fetchTyepes = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/employee-types");
      setData(res.data.types);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTyepes();
  }, []);

  const handleChange = (event) => {
    setType(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={type}
          label="Gender"
          onChange={handleChange}
        >
          {data &&
            data.map((tdata, index) => <MenuItem value={10}>{tdata.name}</MenuItem>)}
        </Select>
      </FormControl>
    </Box>
  );
}
