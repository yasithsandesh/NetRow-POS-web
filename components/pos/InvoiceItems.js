import DeleteIcon from '@mui/icons-material/Delete';

const InvoiceItems = ({data})=>{
    return(
        <div className="invoiceItems">
            <div className="firstBox">
               <div className="qtyC">
                <span className="qty">{data.qty}</span>
               </div>

               <span>{data.brand_name} {data.product_name}</span>

               <DeleteIcon className='removeIcon'/>
            </div>

            <div className="secondView">
                <span>Rs {data.price}</span>
            </div>
           
        </div>
    );
}

export default InvoiceItems;