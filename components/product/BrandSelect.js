import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";

export default function BrandSelect() {
  const [brand, setBrand] = React.useState([]);
  const [selectBrand, setSelectBrand] = React.useState("");

  const handleChange = (event) => {
    setSelectBrand(event.target.value);
  };

  const allBrand = async () => {
    await axios
      .get("http://localhost:8000/api/all-brand")
      .then((res) => {
        setBrand(res.data.brands);
        console.log(res.data.brands);
      })
      .catch();
  };

  React.useEffect(() => {
    allBrand();
  }, []);

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Brand</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectBrand}
          label="Brand"
          onChange={handleChange}
        >
          {brand &&
            brand.map((data) => (
              <MenuItem key={data.id} value={data.id}>
                {data.bran_name}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </Box>
  );
}
