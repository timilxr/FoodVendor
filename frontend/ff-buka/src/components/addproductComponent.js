import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {VerifyToken} from './actions';
// import {useParams} from 'react-router-dom';
import {Button, Form, Alert} from 'react-bootstrap';

const AddProduct = (props) => {
    
    const initialProduct = {
        user: '',
        name: '',
        brand: '',
        category: '',
        price: '',
        countInStock: '',
        description: ''
    };
    // const {id} = useParams();
    const [msg, setMsg] = useState('');
    const [data, setData] = useState(initialProduct);

    const onInputChange = (e) => {
        const {name, value} = e.target;
        setData((prevState)=>{
            return{
                ...prevState,
                [name]: value
            };
        });
    };

    const handler = (e) => {
        axios.post(`/meals/add`, data)
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
        <div className="p-3 mx-5">
            <Form className='text-left my-5 pt-5 bg-dark rounded p-4' onSubmit={showMe}>
                {msg ? <Alert variant="success">{msg}</Alert> : <Alert variant="primary">please fill the form</Alert>}
                <Form.Group controlId="formBasicName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control name="name" value={data.name} onChange={onInputChange} type="text" placeholder="Enter name of product" />
                    <Form.Text className="text-muted">
                    Iphone
                    </Form.Text>
                </Form.Group>

                {/* <Form.Group controlId="formBasicBrand">
                    <Form.Label>Brand</Form.Label>
                    <Form.Control name="brand" value={data.brand} onChange={onInputChange} type="text" placeholder="Enter brand" />
                    <Form.Text className="text-muted">
                    Samsung
                    </Form.Text>
                </Form.Group> */}

                <Form.Group controlId="formBasicCategory">
                    <Form.Label>Category</Form.Label>
                    <Form.Control name="category" value={data.category} onChange={onInputChange} type="text" placeholder="Enter category" />
                    <Form.Text className="text-muted">
                    Samsung
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicCountInStock">
                    <Form.Label>Count In Stock</Form.Label>
                    <Form.Control name="countInStock" value={data.countInStock} onChange={onInputChange} type="num" placeholder="Enter count in stock" />
                    <Form.Text className="text-muted">
                    20
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPrice">
                    <Form.Label>Unit Price</Form.Label>
                    <Form.Control name="Price" value={data.price} onChange={onInputChange} type="num" placeholder="Enter unit Price" />
                    <Form.Text className="text-muted">
                    #10000
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control name="description" value={data.description} onChange={onInputChange} type="text" placeholder="Enter description" />
                    <Form.Text className="text-muted">
                    Samsung
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
        </div>
    )
}

export default AddProduct;