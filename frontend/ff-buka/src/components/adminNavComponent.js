import React from 'react';
// import Link from 'react-router-dom/Link';
import {Link} from 'react-router-dom';
import {Navbar, Nav, Button} from 'react-bootstrap';
// import Divider from '@material-ui/core/Divider';
// import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';
// import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
// import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

export default function MiniDrawer() {

  return (
    <Navbar collapseOnSelect bg="dark" variant="dark" expand="md">
    {/* <Link to='/' className='nav-link'><Navbar.Brand>BLOG</Navbar.Brand></Link> */}
    <Navbar.Toggle aria-controls="responsive-navbar-nav" className="ml-auto" />
    <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="flex-column" defaultActiveKey={window.location.href}>
            <Nav.Item>
                <Link to='/admin/' className='nav-link mt-3'>
                <MailIcon />
                    &nbsp;&nbsp;DASHBOARD</Link>
            </Nav.Item>
            <Nav.Item>
                <Link to='/admin/login' className='nav-link mt-3'>
                <InboxIcon />
                    &nbsp;&nbsp;Add Post</Link>
            </Nav.Item>
            <Nav.Item>
                <Link to='/admin/view_posts' className='nav-link mt-3'>
                <i className="fas fa-th-list fa-1x"></i>
                    &nbsp;&nbsp;View Posts</Link>
            </Nav.Item>
            <Nav.Item>
                <Link to='/admin/categories' className='nav-link mt-3'>
                <i className="fas fa-layer-group fa-1x"></i>
                    &nbsp;&nbsp;Categories</Link>
            </Nav.Item>
            <Nav.Item>
                <Link to='/admin/add_user' className='nav-link mt-3'>
                <i className="fas fa-user-plus"></i>
                    &nbsp;&nbsp;Add User</Link>
            </Nav.Item>
            <Nav.Item>
                <Link to='/admin/users' className='nav-link mt-3'>
                <i className="fas fa-users"></i>
                    &nbsp;&nbsp;View Users</Link>
            </Nav.Item>
            <Nav.Item>
                <Button variant="outline-danger" className='mt-3'>Log Out</Button>{' '}
                {/* onClick={this.props.logout} */}
            </Nav.Item>
        </Nav>
    </Navbar.Collapse>
</Navbar>
  );
}
