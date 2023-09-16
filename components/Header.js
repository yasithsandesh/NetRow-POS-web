import DarkModeIcon from "@mui/icons-material/DarkMode";
import FaceIcon from "@mui/icons-material/Face";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import { ThemeProvider, useTheme } from "next-themes";
import { useEffect, useState } from "react";
const Header = () => {

  const [data,setData] = useState({});

  useEffect(() => {
    const data = window.localStorage.getItem("employeeData");
    setData(JSON.parse(data));
  }, []);

  const { theme, setTheme } = useTheme();
  const handelMode = () => {
    {
      theme == "dark" ? setTheme("light") : setTheme("dark");
    }
  };

  return (
    <ThemeProvider>
      <div className="w-full flex flex-row justify-end mode-dark gap-3 p-4 fixed">
        <div
          className="cursor-pointer flex flex-row justify-center items-center"
          onClick={handelMode}
        >
          {theme == "dark" ? <DarkModeIcon /> : <WbSunnyIcon />}
        </div>

        <div className="flex flex-row justify-center items-center gap-1 userBox">
          <div>
            <FaceIcon />
          </div>

          <h3>{data.name} | {data.employee_type=="1"?"Admin":"Cashier"}</h3>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Header;
