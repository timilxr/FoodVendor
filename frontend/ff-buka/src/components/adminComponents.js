import React, {useState, useEffect, useContext} from 'react';
import Input from './form/input';
import Select from './form/select';
import {Redirect, Link} from 'react-router-dom';
import Alert from 'react-bootstrap/Alert'
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { getMeals, MealsStateContext, MealsDispatchContext } from '../contexts/products';
import { getOrders, OrdersStateContext, OrdersDispatchContext } from '../contexts/orders';
import { getUsers, UsersStateContext, UsersDispatchContext } from '../contexts/users';
// import { CardActionArea } from '@material-ui/core';


export const Dashboard = () => {
    const [data, setData] = useState({
        users: [],
        orders: [],
        products: []
    });
    const {meals, loading: mloading, loaded: mloaded} = useContext(MealsStateContext);
    const {orders, loading: oloading, loaded: oloaded} = useContext(OrdersStateContext);
    const {users, loading: uloading, loaded: uloaded} = useContext(UsersStateContext);

    const mealsDispatch = useContext(MealsDispatchContext);
    const ordersDispatch = useContext(OrdersDispatchContext);
    const usersDispatch = useContext(UsersDispatchContext);

    const [msg, setMsg] = useState('');

    useEffect(()=>{
        const fetchData = () => {
            getMeals(mealsDispatch);
            getOrders(ordersDispatch);
            getUsers(usersDispatch);
        }
        fetchData();
        console.log(users, orders, meals);
        setData({
            users: users,
            orders: orders,
            meals: meals
        })
    }, [users, orders, meals, usersDispatch, ordersDispatch, mealsDispatch])

    if(meals){
        return(
            <Row>
                {Object.entries(data).map(entry=>
                <Col key={entry[0]}>
                    <Card className='my-3 p-3 rounded'>
                        <Card.Body>
                            <Row>
                                <Col>
                                <i className="far fa-newspaper display-3"></i>
                                    {/* <Card.Img src={product.image} variant='top' /> */}
                                </Col>
                                <Col bg='dark'>
                                    {/* <Link to={`/product/${product._id}`}> */}
                                    <Card.Title as='h2' className="ml-auto text-right">
                                        <strong>{entry[0].toUpperCase()}</strong>
                                    </Card.Title>
                                    {/* </Link> */}
    
                                    <Card.Text as='h2' className="ml-auto text-right">{entry[1].length}</Card.Text>
                                </Col>
                            </Row>
                            
                        </Card.Body>
                        <Card.Footer className="text-right">
                            <Link to={`/${entry[0]}`}><Card.Link as='h4'>{`View ${entry[0]}`}</Card.Link></Link>
                        </Card.Footer>
                    </Card>
                </Col>)}
            </Row>
        )
    }

    return(<h1>Loading...</h1>)
}

export const SignUp = () => {
    const formData = {
        name: {
            type: 'text',
            label: 'Fullname',
            name: 'name',
            value: ''
        },
        email: {
            type: 'email',
            label: 'Email',
            name: 'email',
            value: ''
        },
        password: {
            type: 'password',
            label: 'Password',
            name: 'password',
            value: ''
        }
    };
    const [data, setData] = useState({
        name: '',
        email: '',
        // phone: Number,
        isAdmin: false,
        password: ''
    });
    const [errors, setErrors] = useState({});
    const [msg, setMsg] = useState('');
    const [validated, setValidated] = useState(false);

    const onInputChange = (e) => {
        const {name, value} = e.target;
        setData((prevState)=>{
            return{
                ...prevState,
                [name]: value
            };
        });
        setValidated(false);
    };
    const handler = (e) => {
        axios.post('http://localhost:2000/users/register', data)
        .then((res)=>{
            console.log(res);
            if(res.status === 200){
                setErrors({
                    email: res.data
                });
                setMsg(res.data);
            }
            if(res.status === 201){
                setMsg(res.data);
            }
            if(res.status === 202){
                setErrors(res.data);
            }
        })
        .catch((err)=>console.log(`Error: ${err}`));
        // console.log("state");
        // alert(data);
        console.log(data);
        setValidated(true);
        e.preventDefault();
    };

    const showMe = () => {
        alert(data);
    };

    return(
        <Form noValidate validated={validated} className='text-left my-5 pt-5' onSubmit={showMe}>
            {
                msg && !errors ? <Alert variant="success">{msg}</Alert> : 
                    (msg ? <Alert variant="danger">{msg}</Alert> : <Alert variant="primary">please fill the form</Alert>)
            }
            {
                Object.entries(formData).map(field => {
                    if(field[1].type === 'select'){
                        return <Select key={field[0]} errors={errors} data={field[1]} getInput={onInputChange} />
                    }
                    return <Input key={field[0]} errors={errors} data={field[1]} getInput={onInputChange}/>
                })
            }
            <Button variant="primary" type="submit" onClick={handler}>
                Submit
            </Button>
        </Form>
    )
}

export const Records = (props) => {
    const [msg, setMsg] = useState('');
    const [rec, setRec] = useState([3,4]);

    useEffect(()=>{
        // axios.get('http://localhost:2000/users/')
        // .then((res)=>{
        //     // console.log(res.data);
        //     setRec(res.data);
        // })
        // .catch((err)=>console.log(`Error: ${err}`));
    console.log(props.data);
    setRec(props);
    // console.log(props.data);
    }, [props]);

    const delData = (g) => {
        axios.delete(`http://localhost:2000/user/${g}`)
        .then((res)=>{
            console.log(res.data);
            setMsg(res.data);
            let h = rec.filter((el)=>el._id !== g);
            console.log(h);
            setRec(h);
            // setRec((prev)=>{
            //     return {
            //         hits: prev.hits.filter((el)=>el._id === g)}
            // });
            console.log(rec);
        })
        .catch((err)=>console.log(`Error: ${err}`));
    }
    const upData = (g) => {
        return(<Redirect to={"http://localhost:3000/admin/users/"+g} />)
    }

    return(
            <div>
                {msg ? <Alert variant="success">{msg}</Alert> : ''}
                <Table striped bordered hover variant="dark" className="mt-4">
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>FirstName</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>User Type</th>
                        <th></th>
                        <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {rec.map((value, index)=>{
                            // console.log(value);
                            return <tr key={value._id}>
                                        <td>{index + 1}</td>
                                        <td>{value.firstname}</td>
                                        <td>{value.email}</td>
                                        <td>{value.phone}</td>
                                        <td>{value.userType}</td>
                                        <td>
                                        <Button variant="info" type="button" onClick={()=>upData(value._id)}>Edit</Button>{' '}
                                        </td>
                                        <td>
                                            <Button variant="danger" type="button" onClick={()=>delData(value._id)}>Delete</Button>{' '}
                                        </td>
                                    </tr>
                        })}
                    </tbody>
                </Table>
            </div>
    );
};

export const Update = (props) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [msg, setMsg] = useState('');
    const [formData, setFormData] = useState({
        name: {
            type: 'text',
            label: 'Fullname',
            name: 'name',
            value: ''
        },
        email: {
            type: 'email',
            label: 'Email',
            name: 'email',
            value: ''
        },
        password: {
            type: 'password',
            label: 'Password',
            name: 'password',
            value: ''
        }
    });
    const [errors, setErrors] = useState({});
    const [validated, setValidated] = useState(false);

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
        axios.get(`http://localhost:2000/users/${props.match.params.userId}`)
        .then((res)=>{
            setData(res.data);
            console.log(res.data);
            setFormData({
                name: {
                    type: 'text',
                    label: 'Fullname',
                    name: 'name',
                    value: res.data.name
                },
                email: {
                    type: 'email',
                    label: 'Email',
                    name: 'email',
                    value: res.data.email
                },
                password: {
                    type: 'password',
                    label: 'Password',
                    name: 'password',
                    value: res.data.password
                }
            })
            setLoading(false);
            // setMsg(res.data);
        })
        .catch((err)=>console.log(`Error: ${err}`));
    }, [props.match.params.id]);

    const handler = (e) => {
        axios.post(`http://localhost:2000/users/update/${props.match.params.id}`)
        .then((res)=>{
            console.log(res.data);
            if(res.status === 200 || res.status === 201){
                setMsg(res.data);
            }
        })
        .catch((err)=>console.log(`Error: ${err}`));
        // console.log("state");
        console.log(data);
        setValidated(true);
        e.preventDefault();
    };

    const showMe = () => {
        alert(data);
    };

    return(
        <div>
            { loading ?
                <h1>Loading data...</h1>
                :
                (<Form noValidate validated={validated} className='text-left my-5 pt-5' onSubmit={showMe}>
                    {
                        msg && !errors ? <Alert variant="success">{msg}</Alert> : 
                            (msg ? <Alert variant="danger">{msg}</Alert> : <Alert variant="primary">please fill the form</Alert>)
                    }
                    {
                        Object.entries(formData).map(field => {
                            if(field[1].type === 'select'){
                                return <Select key={field[0]} errors={errors} data={field[1]} getInput={onInputChange} />
                            }
                            return <Input key={field[0]} errors={errors} data={field[1]} getInput={onInputChange}/>
                        })
                    }
                    <Button variant="primary" type="submit" onClick={handler}>
                        Submit
                    </Button>
                </Form>)
            }
        </div>
    )
}