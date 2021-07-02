import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import useVerifyToken from '../../components/actions';
import Container from 'react-bootstrap/Container';
import { Redirect, Route, Switch} from 'react-router-dom';
// import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import MiniDrawer from '../../components/adminNavComponent';
import UserRecords from '../../components/viewUsersComponent';
import UpdateUser from '../../components/updateUserComponent';
import SignUp from '../../components/adminSignUp';
import Login from '../../components/adminLogin';
// import {Records, Update} from '../../components/adminComponents';
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
      },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
      },
      content: {
        flexGrow: 1,
        padding: theme.spacing(10),
      }
}));

const Loginn = () => {
    const classes = useStyles();
    const [access, setAccess] = useState(false);
    const [result, setResult] = useVerifyToken();
    useEffect(()=>{
        result ? setAccess(result) : <Redirect to="/" />;   
    }, [result]);
    // if(!access){
    //     return (
    //         <Switch>
    //             <Route path='/user/:id' component = {UpdateUser} />
    //             <Route exact path="/admin" component={Login} />
    //             <Route exact path="/admin/signup" component={SignUp} />
    //         </Switch>
    //         );
    // }
    return(
        <Container>
            <MiniDrawer />
            <main className={classes.content}>
                <div className={classes.toolbar} style={{backgroundColor: 'red'}}>
                    {/* <Router> */}
                        {/* <Switch>
                        <Route path='/user/:id' component = {UpdateUser} />
                        <Route path="/admin/users" component={UserRecords} />
                        <Route exact path="/admin/signup" render={Login()} />
                        </Switch> */}
                    {/* </Router> */}
                </div>
            </main>
            <Row>
                {/* <Col md={{ span: 6, offset: 3 }}>{log()}</Col> */}
            </Row>
            {/* {Records(data)} */}
        </Container>
    )
}

export default Loginn;