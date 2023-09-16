import { Card, Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import axios from "axios";

const TABLE_HEAD = [
  "Id",
  "Product Id",
  "Brand",
  "Name",
  "Selling Price",
  "Quantity",
  "MFG",
  "EXP",
];

export default function AllStock({ TABLE_ROWS }) {
  const [employee, setEmployeeData] = useState();
  const [getupdateEmployee, setUpdateEmployee] = useState();

  const [open, setOpen] = React.useState(false);

  return (
    <Card className="overflow-scroll h-full w-full table-dark">
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
              <tr key={data.id}>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {data?.id}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {data.product_id}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {data.brand_name}
                  </Typography>
                </td>

                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {data.product_name}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {data.selling_price}
                  </Typography>
                </td>


                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {data.qty}
                  </Typography>
                </td>

                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {data.mfd}
                  </Typography>
                </td>

                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {data.exp}
                  </Typography>
                </td>

                <td className={classes}></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Card>
  );
}
