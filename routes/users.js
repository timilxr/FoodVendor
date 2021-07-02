const router = require('express').Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
// const router = Router;
// load user model and session model
const User = require('../models/user.model');
const UserSession = require('../models/usersession.model');

// Load input validation
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

router.route('/add').post((req, res)=>{
    console.log(req.body);
    const name = req.body.name;
    // const phone = req.body.phone;
    const email = req.body.email.toLowerCase();
    const password = req.body.password;
    const isAdmin = req.body.isAdmin;
    // const date = new Date().now;

    const newUser =  new User({
        name, email, password, isAdmin
    });
    newUser.password = newUser.generateHash(newUser.password);

    newUser.save()
    .then(()=>res.json('new user added: '+ name +', user may now sign in'))
    .catch(err => {
        res.status(400).json('An error has occured please check and try again');
        console.log('Error: '+err);
    });
});

router.route('/').get((req, res)=>{
    User.find()
    .then(users=>{
        res.json(users);
        // console.log(users);
    })
    .catch(err => {
        res.status(400).json('An error has occured please check and try again');
        console.log('Error: '+err);
    })
});

router.route('/:id').get((req, res)=>{
    User.findById(req.params.id)
    .then(user=>res.json(user))
    .catch(err => {
        res.status(400).json('An error has occured please check and try again');
        console.log('Error: '+err);
    });
});

router.route('/email/:email').get((req, res)=>{
    User.find({email: req.params.email})
    .then(user=>{user= user[0];res.json(user);})
    .catch(err => {
        res.status(400).json('An error has occured please check and try again');
        console.log('Error: '+err);
    });
});

router.route('/:id').delete((req, res)=>{
    User.findByIdAndDelete(req.params.id)
    .then(()=>res.json('user deleted succesfully'))
    .catch(err => {
        res.status(400).json('An error has occured please check and try again');
        console.log('Error: '+err);
    });
});

router.route('/update/:id').post((req, res)=>{

    User.findById(req.params.id)
    .then(user => {
        console.log(req.body);
        if(req.body.passuserType === 'New Password'){
            user.password = req.body.password.generateHash(password);
        }
        user.name = req.body.name;
        // user.phone = req.body.phone;
        user.email = req.body.email.toLowerCase();
        user.isAdmin = req.body.isAdmin;
        // user.date = Date.now;
        console.log(user);

        user.save()
        .then(()=>res.json(`user ${user.name} updated`))
        .catch(err => {res.status(400).json('Error Occured while saving Please try again'); console.log(err);});
    })
    .catch(err => {
        res.status(400).json('An error has occured trying to find the user please check and try again');
        console.log('Error: '+err);
    });
});

router.route('/update_profile/:email').post((req, res)=>{

    newUser.find({email: req.params.email})
    .then(user => {
        const pass = req.body.oldpassword;
        // const user = users[0];
        if(!user.validPassword(pass)){
            res.json({success: false, message: 'Invalid Password'});
        }
        user.name = req.body.name;
        // user.phone = req.body.phone;
        // user.phone = req.body.phone;
        // user.bio = req.body.bio;
        user.email = req.body.email.toLowerCase();
        user.password = req.body.password.generateHash(password);
        // user.userType = req.body.userType;
        // user.date = new Date();

        user.save()
        .then(()=>res.json(`user${name} updated`))
        .catch(err => {
            res.status(400).json('An error has occured please check and try again');
            console.log('Error: '+err);
        });
    })
    .catch(err => {
        res.status(400).json('An error has occured please check and try again');
        console.log('Error: '+err);
    });
});

router.route('/register').post((req, res)=>{
    // Form validation
    const { errors, isValid } = validateRegisterInput(req.body);
    // Check validation
    if (!isValid) {
        return res.status(202).json(errors);
    }
    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
        return res.status(200).json("Email already exists");
        } else {
        const newUser = new User({
            name: req.body.name,
            email: req.body.email.toLowerCase(),
            password: req.body.password,
            // phone: req.body.phone,
            isAdmin: req.body.isAdmin
            // date: new Date().now
        });
    // Hash password before saving in database
    newUser.password = newUser.generateHash(newUser.password);
    // bcrypt.genSalt(10, (err, salt) => {
    //         bcrypt.hash(newUser.password, salt, (err, hash) => {
    //         if (err) throw err;
    //         newUser.password = hash;
            // newUser.save()
            //     .then(user => res.status(201).json(`user ${newUser.name} added successfully`))
            //     .catch(err => console.log(err));
    //         });
    //     });
        }
    });
});

router.route('/verifyy').post((req, res)=>{
    let header = req.body.token;
    // let header = req.headers['Authorization'] || req.headers['x-access-token'];
    // console.log(req.body.token);
    if(typeof header !== 'undefined' && header.startsWith('Bearer ')){
        const bearer = header.split(' ');
        const token = bearer[1];
        // console.log(token);
        jwt.verify(token,keys.secretOrKey,(err, decoded)=>{
            if(err) {
                res.status(400).json("error");
                console.log(err);
                console.log("me");
            }
            if(decoded){ 
                console.log("success");
                res.status(200).json("success");
            };
        });
    } else {
        res.status(400).json("error");
        console.log("hi");
    }
});

router.route('/login').post((req, res)=>{
    // Form validation
    const { errors, isValid } = validateLoginInput(req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const email = req.body.email;
    const password = req.body.password;
    // Find user by email
    User.findOne({ email }).then(user => {
        // Check if user exists
        if (!user) {
        return res.status(404).json({ emailnotfound: "Email not found" });
        }
    // Check password
        bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
            // User matched
            // Create JWT Payload
            const payload = {
            id: user._id,
            name: user.name,
            isAdmin: user.isAdmin
            };
    // Sign token
            jwt.sign(
            payload,
            keys.secretOrKey,
            {
                expiresIn: 31556926 // 1 year in seconds
            },
            (err, token) => {
                res.json({
                success: true,
                token: "Bearer " + token
                });
            }
            );
        } else {
            return res.status(400).json({ passwordincorrect: "Password incorrect" });
        }
        });
    });
});

// router.route('/signin').post((req, res, next)=>{
//     const pass = req.body.password;
//     User.find({email: req.body.email})
//     .then(users=>{
//         // console.log(users.length);
//         if(users.length !== 1){
//             res.json({success: false, message: 'Invalid User'});
//         }
//         const user = users[0];
//         if(!user.validPassword(pass)){
//             res.json({success: false, message: 'Invalid Password'});
//         }
//         UserSession.find({'userId': user._id})
//         .then(sessions=>{
//             // console.log(sessions.length);
//             if(sessions.length == 0){
//                 console.log('no session set before');
//                 const userSession = new UserSession();
//                 userSession.userId = user._id;
//                 console.log(userSession);
//                 userSession.save()
//                 .then(()=>{res.json({success: true, message: 'Valid sign in2', token: user._id, user: user.firstname+" "+user.phone});console.log(userSession.userId);})
//                 .catch(err => {
//                     res.status(400).json('An error has occured please check and try again');
//                     console.log('Error: '+err);
//                 });
//             } else {
//                 const session = sessions[0];
//                 session.isDeleted = false;
//                 console.log(session.isDeleted);
//                 console.log(session.userId);
//                 // console.log('this might');
//                 session.save()
//                     .then(()=>{res.json({success: true, message: 'Valid sign in', token: user._id, user: user.firstname+" "+user.phone});})
//                     .catch(err => {
//                         res.status(400).json('An error has occured please check and try again');
//                         console.log('Error: '+err);
//                     });
//             }
            
//         })
//     .    catch(err => {
//         res.status(400).json('An error has occured please check and try again');
//         console.log('Error: '+err);
//     });
//     })
//     .catch(err => {
//         res.status(400).json('An error has occured please check and try again');
//         console.log('Error: '+err);
//     });
// });

router.route('/verify/:token').get((req, res)=>{
    console.log(req.params.token);
    UserSession.find({userId: req.params.token, isDeleted: false})
    .then(users=>{
        console.log(users.length);
        if(users.length !== 1){
            res.json('Invalid user');
        } else {
            User.find({_id: req.params.token})
            .then(persons=>{
                const person = persons[0];
            const user = users[0];
            res.json({success: true, message: 'not deleted', token: user.token, mail: person.email, userType: person.userType, user: person.firstname+" "+person.phone});
        })
    .    catch(err => {
        res.status(400).json('An error has occured please check and try again');
        console.log('Error: '+err);
    });
        }
    })
    .catch(err => {
        res.status(400).json('An error has occured please check and try again');
        console.log('Error: '+err);
    });
    // {success: true, message: err, token: user.token}
});

//logout
router.route('/logout/:token').get((req, res, next)=>{
    UserSession.find({userId: req.params.token, isDeleted: false})
    .then(users=>{
        if(users.length !== 1){
            res.json('Invalid user');
        }
        const user = users[0];
        user.isDeleted = true;
        user.save()
        .then(()=>res.json('session is deleted'))
        .catch(err => res.status(400).json('Error: '+err))
    })
    .catch(err => {
        res.status(400).json('An error has occured please check and try again');
        console.log('Error: '+err);
    });
});

module.exports = router;