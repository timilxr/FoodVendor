import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import {Button, Form, Alert} from 'react-bootstrap';

const UpdateProduct = (props) => {
    const {id} = useParams();
    const [msg, setMsg] = useState('');
    const [data, setData] = useState([]);

    const onInputChange = (e) => {
        const {name, value} = e.target;
        setData((prevState)=>{
            return{
                ...prevState,
                [name]: value
            };
        });
    };

    useEffect(()=>{
        axios.get(`http://localhost:2000/meals/${id}`)
        .then((res)=>{
            setData(res.data);
            console.log(res.data);
            // setMsg(res.data);
        })
        .catch((err)=>console.log(`Error: ${err}`));
    }, [id]);
    const handler = (e) => {
        axios.post(`http://localhost:2000/meals/update/${props.match.params.id}`, data)
        .then((res)=>{
            console.log(res.data);
            setMsg(res.data);
        })
        .catch((err)=>console.log(`Error: ${err}`));
        console.log("state");
        console.log(data);
        e.preventDefault();
    };

    const showMe = () => {
        alert(data);
    };
    return (
        <Form className='text-left my-5 pt-5' onSubmit={showMe}>
            {msg ? <Alert variant="success">{msg}</Alert> : <Alert variant="primary">please fill the form</Alert>}
            <Form.Group controlId="formBasicMeal">
                <Form.Label>Meal</Form.Label>
                <Form.Control name="meal" value={data.meal} onChange={onInputChange} type="text" placeholder="Enter meal" />
                <Form.Text className="text-muted">
                We'll never share your name with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicQuantity">
                <Form.Label>Quantity</Form.Label>
                <Form.Control name="quantity" value={data.quantity} onChange={onInputChange} type="num" placeholder="Enter quantity" />
                <Form.Text className="text-muted">
                We'll never share your quantity with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicSoldQuantity">
                <Form.Label>Sold Quantity</Form.Label>
                <Form.Control name="soldQuantity" value={data.soldQuantity} onChange={onInputChange} type="num" placeholder="Enter sold Quantity" />
                <Form.Text className="text-muted">
                We'll never share your sold quantity with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicUnitPrice">
                <Form.Label>Unit Price</Form.Label>
                <Form.Control name="unitPrice" value={data.unitPrice} onChange={onInputChange} type="num" placeholder="Enter unit Price" />
                <Form.Text className="text-muted">
                We'll never share your unit price with anyone else.
                </Form.Text>
            </Form.Group>

            {/* <Form.Group controlId="formBasicUserType">
                <Form.Label>User Type</Form.Label>
                <Form.Control name="userType" Value={data.userType} onChange={onInputChange} as="select" custom>
                <option value="Customer">Select User Type</option>
                <option value="Customer">Customer</option>
                <option vlaue="Admin">Admin</option>
                <option value="Worker">Worker</option>
                </Form.Control>
            </Form.Group> */}

            {/* <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control name="password" value={data.password} onChange={onInputChange} type="password" placeholder="Password" />
            </Form.Group> */}
            {/* <Form.Group controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
            </Form.Group> */}
            <Button variant="primary" type="submit" onClick={handler}>
                Submit
            </Button>
        </Form>
    )
}

export default UpdateProduct;