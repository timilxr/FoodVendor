import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {Redirect} from 'react-router-dom';
import Table from './Table';
import Alert from 'react-bootstrap/Alert'
const OrdersRecords = (props) => {
    const [records, setRecords] = useState([]);
    const [mealls, setMealls] = useState([]);
    const [msg, setMsg] = useState('');

    useEffect((props)=>{
        axios.get('http://localhost:2000/orders/')
        .then(data=>{
            setRecords(data);
            axios.get('http://localhost:2000/meals/')
            .then(data=>{
                setMealls(data);
            })
            .catch(err=>console.log(`Error: ${err}`));
        })
        .catch(err=>console.log(`Error: ${err}`));
        // setRecords(props);
    });

    const delData = (g) => {
        axios.delete(`http://localhost:2000/orders/${g}`)
        .then(data=>setMsg(data))
        .catch(err=>console.log(`Error: ${err}`));
    }

    const upData = (g) => {
        return(<Redirect to={"http://localhost:3000/admin/orders/"+g} />)
    }
    return(
        <div>
            {msg ? <Alert variant="success">{msg}</Alert> : ''}
            <Table data={records} edFunc="order" delFunc={delData} />
        </div>
    )
}

export default OrdersRecords;