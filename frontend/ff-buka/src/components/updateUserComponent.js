import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import Alert from 'react-bootstrap/Alert'
// import Table from 'react-bootstrap/Table';
import axios from 'axios';
// import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const UpdateUser = (props) => {
    const [data, setData] = useState([]);
        const {id} = useParams();
        const [msg, setMsg] = useState('');

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
        axios.get(`/users/${id}`)
        .then((res)=>{
            setData(res.data);
            console.log(res.data);
            // setMsg(res.data);
        })
        .catch((err)=>console.log(`Error: ${err}`));
    }, [id]);
    const handler = (e) => {
        axios.post(`/users/update/${props.match.params.id}`, data)
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

    return(
        <Form className='text-left my-5 pt-5' onSubmit={showMe}>
            {msg ? <Alert variant="success">{msg}</Alert> : <Alert variant="primary">please fill the form</Alert>}
            <Form.Group controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <Form.Control name="name" value={data.name} onChange={onInputChange} type="text" placeholder="Enter your name" />
                <Form.Text className="text-muted">
                We'll never share your name with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control name="email" value={data.email} onChange={onInputChange} type="email" placeholder="Enter email" />
                <Form.Text className="text-muted">
                We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            {/* <Form.Group controlId="formBasicPhone">
                <Form.Label>Phone address</Form.Label>
                <Form.Control name="phone" value={data.phone} onChange={onInputChange} type="tel" placeholder="Enter phone number" />
                <Form.Text className="text-muted">
                We'll never share your phone with anyone else.
                </Form.Text>
            </Form.Group> */}

            <Form.Group controlId="formBasicIsAdmin">
                <Form.Label>User Type</Form.Label>
                <Form.Control name="isAdmin" Value={data.isAdmin? 'Admin' : 'Customer'} onChange={onInputChange} as="select" custom>
                {/* <option value="Customer">Select User Type</option> */}
                <option value={false}>Customer</option>
                <option vlaue={true}>Admin</option>
                {/* <option value="Worker">Worker</option> */}
                </Form.Control>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control name="password" value={data.password} onChange={onInputChange} type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={handler}>
                Submit
            </Button>
        </Form>
    )
}
export default UpdateUser;