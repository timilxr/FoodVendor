import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {Redirect} from 'react-router-dom';
import Table from './Table';
import { Alert} from 'react-bootstrap';
const ProductsRecords = (props) => {
    const [records, setRecords] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [msg, setMsg] = useState('');

    useEffect(()=>{
        const fetchData = async() => {
            await axios.get('http://localhost:2000/meals/')
        .then(res=>{
            setRecords(res.data);
            setIsLoading(false);
        })
        .catch(err=>console.log(`Error: ${err}`));
        }

        fetchData();
        // setRecords(props);
    }, []);

    const delData = (g) => {
        axios.delete(`http://localhost:2000/meals/${g}`)
        .then(res=>setMsg(res.data))
        .catch(err=>console.log(`Error: ${err}`));
    }

    const upData = (g) => {
        return(<Redirect to={"http://localhost:3000/admin/meals/"+g} />)
    }
    return(
        <div>
            {msg ? <Alert variant="success">{msg}</Alert> : ''}
            {isLoading ? 
                <h1>Loading...</h1>
            : 
            (records.length > 0 ?
                <Table data={records} edFunc="product" delFunc={delData} />
                // "table"
            : <h1>No Data in The Table</h1>)
            }
        </div>
    )
}

export default ProductsRecords;