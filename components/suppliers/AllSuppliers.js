import { Card, Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import UpdateSuppliers from "./UpdateSuppliers";
import EmailIcon from "@mui/icons-material/Email";
import EmailSend from "../emailSend/EmailSend";

const TABLE_HEAD = [
  "Mobile",
  "First Name",
  "Last Name",
  "Email",
  "Company",
  "Action",
];

export default function AllSuppliers({ setRefersh, refersh, supplierM }) {
  const [open, setOpen] = useState();
  const [updateData, setUpdateData] = useState();

  const [TABLE_ROWS, SETTABLE_ROWS] = useState([
    {
      mobile: "Yasith",
      fname: "Yasith",
      lname: "Sandesh",
      email: "yaithsandesh@gmail.com",
      company: "0",
    },
  ]);

  const allSuppliers = async () => {
    await axios
      .get(`http://localhost:8000/api/all-suppliers/${supplierM}`)
      .then((res) => {
        SETTABLE_ROWS(res.data.all);
        console.log(res.data.all);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    allSuppliers();
  }, [refersh, supplierM]);

  const [openEmail, setOpenEmail] = React.useState(false);

  const [sendEmail,setSendEmail] = useState();
  const [fromEmail,setFromEmail] = useState('yayasithsandesh16@gmail.com');

  return (
    <Card className="overflow-scroll h-full w-full table-dark">
      <UpdateSuppliers
        setOpen={setOpen}
        open={open}
        updateData={updateData}
        setRefersh={setRefersh}
      />
      <EmailSend openEmail={openEmail} setOpenEmail={setOpenEmail} sendEmail={sendEmail} fromEmail={fromEmail}/>
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
                    {data.c_name}
                  </Typography>
                </td>

                <td className={classes}>
                  <div className=" flex flex-row gap-3">
                    <Typography
                      as="a"
                      variant="small"
                      color="blue"
                      className="font-medium"
                      onClick={() => {
                        setOpen(true);
                        setUpdateData({
                          upMobile: data.mobile,
                          sname: `${data.fname} ${data.lname}`,
                        });
                      }}
                    >
                      Edit
                    </Typography>
                    <button className="flex flex-row items-center gap-1" onClick={()=>{
                  
                          setOpenEmail(true)
                          setSendEmail(data.email)
                      
                    }}>Send<EmailIcon /></button>
                 
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Card>
  );
}
