import { Card, Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import UpdateCustomers from "./UpdateCustomers";

const TABLE_HEAD = [
  "Mobile",
  "First Name",
  "Last Name",
  "Email",
  "Points",
  "Action",
];

export default function AllCustomers({refersh,setRefersh,searchMobile,TABLE_ROWS,SETTABLE_ROWS}) {
  const [open, setOpen] = useState();


  const AllCustomersfetch = () => {
    axios
      .get(`http://localhost:8000/api/all-customers/${searchMobile}`)
      .then((res) => {
        SETTABLE_ROWS(res.data.all);
      })
      .catch();
  };

  useEffect(() => {
    AllCustomersfetch();
  }, [refersh,searchMobile]);

  const [data, setData] = useState();

  return (
    <Card className="overflow-scroll h-full w-full table-dark">
      <UpdateCustomers setOpen={setOpen} open={open} data={data} setRefersh={setRefersh}/>
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

            return (
              <tr key={data.mobile}>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {data?.mobile}
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
                    {data.email}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {data.points}
                  </Typography>
                </td>

                <td className={classes}>
                  <Typography
                    as="a"
                    variant="small"
                    color="blue"
                    className="font-medium"
                    onClick={() => {
                      setOpen(true);
                      setData({ 
                        updateMobile: data?.mobile, 
                        name: `${data.fname} ${data.lname}`
                      });
                    }}
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
