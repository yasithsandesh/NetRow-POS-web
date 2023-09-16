import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";

export default function CompanySelecter({ newCompanyRe }) {
  const [select, setSelect] = React.useState("");
  const [data, setData] = React.useState();

  const handleChange = (event) => {
    setSelect(event.target.value);
  };

  const allcompany = async () => {
    await axios
      .get("http://localhost:8000/api/all-company")
      .then((res) => {
        setData(res.data.allCompany);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  React.useEffect(() => {
    allcompany();
  }, [newCompanyRe]);

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
          {data && data.map((d, index) => {
            <MenuItem key={index} value={d.id}>{d.c_name}</MenuItem>;
          })}
        </Select>
      </FormControl>
    </Box>
  );
}
