import { Card, Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import UpdateEmployee from "./UpdateEmployee";
import axios from "axios";

const TABLE_HEAD = [
  "Email",
  "First Name",
  "Last Name",
  "Nic",
  "Mobile",
  "Gender",
  "Type",
  "Password",
  "Date Registered",
  "Action",
];

export default function AllEmployee({ getNewEmployee, search ,setLoading }) {
  const [employee, setEmployeeData] = useState();
  const [getupdateEmployee, setUpdateEmployee] = useState();

  const [open, setOpen] = React.useState(false);
  const [TABLE_ROWS, SETTABLE_ROWS] = useState([]);

  const allEmployeeFetch = () => {
    setLoading(()=>{
      axios
      .get(`http://localhost:8000/api/all-employee/${search}`)
      .then((res) => {
        SETTABLE_ROWS(res.data.allEmployee);
        console.log(res.data.allEmployee);
      })
      .catch((error) => {
        console.log(error);
      })

    });
 
  };

  useEffect(() => {
    allEmployeeFetch();
  }, [getNewEmployee, getupdateEmployee, search]);

  return (
    <Card className="overflow-scroll h-full w-full table-dark">
      <UpdateEmployee
        setOpen={setOpen}
        open={open}
        employee={employee}
        setUpdateEmployee={setUpdateEmployee}
      />
      <table className="w-full min-w-max table-auto text-left table-dark">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th
                key={head}
                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {TABLE_ROWS.map((data, index) => {
            const isLast = index === TABLE_ROWS.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
            let genderName;

            if (data.gender_id == 1) {
              genderName = "Male";
            } else {
              genderName = "Female";
            }

            let employeeType;

            if (data.employee_id == 1) {
              employeeType = "Admin";
            } else {
              employeeType = "Cashier";
            }

            return (
              <tr key={data.email}>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {data?.email}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {data.fname}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {data.lname}
                  </Typography>
                </td>

                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {data.nic}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {data.mobile}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {genderName}
                  </Typography>
                </td>

                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {employeeType}
                  </Typography>
                </td>

                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {data.password}
                  </Typography>
                </td>

                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {data.created_at}
                  </Typography>
                </td>

                <td className={classes}>
                  <Typography
                    as="a"
                    onClick={() => {
                      setEmployeeData({
                        email: data.email,
                        fname: data.fname,
                        lname: data.lname,
                        nic: data.nic,
                        mobile: data.mobile,
                        gender: genderName,
                        employeeType: employeeType,
                        password: data.password,
                        date: data.created_at,
                      });
                      setOpen(true);
                    }}
                    variant="small"
                    color="blue"
                    className="font-medium"
                  >
                    Edit
                  </Typography>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Card>
  );
}
