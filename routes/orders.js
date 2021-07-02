const router = require('express').Router();
const Order = require('../models/order.model');

router.route('/add').post((req, res)=>{
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      } = req.body;

      if (orderItems && orderItems.length === 0) {
        res.status(400).json('No order was placed');
        return 1;
      }

    const newOrder = new Order({
        user: req.user._id,
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    });

    newOrder.save()
    .then(()=>res.json('Your Order has been placed, please be patient and we\'ll get back to you'))
    .catch((err=>{
        res.status(400).json('Error occured while placing your order, please check and try again');
        console.log(`Error: ${err}`);
    }));
});

router.route('/').get((req, res)=>{
    Order.find()
    .then((order)=>res.json(order))
    .catch((err=>{
        res.status(400).json('Error occured while collecting the orders, please check and try again');
        console.log(`Error: ${err}`);
    }));
});

router.route('/:id').get((req, res)=>{
    Order.findById(req.params.id).populate('user',
    'name email')
    .then((order)=>res.json(order))
    .catch((err=>{
        res.status(400).json('Error occured while collecting the order, please check and try again');
        console.log(`Error: ${err}`);
    }));
});

router.route('/paid/:id').get((req, res)=>{
    Order.findById(req.params.id)
    .then((order)=>{order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
          id: req.body.id,
          status: req.body.status,
          update_time: req.body.update_time,
          email_address: req.body.payer.email_address,
        };
        order.save()
        .then(()=>res.json(`payment updated`))
        .catch(err => {
            res.status(400).json('An error has occured updating payment');
            console.log('Error: '+err);
        });
    })
    .catch((err=>{
        res.status(400).json('Error occured while collecting new orders, please check and try again');
        console.log(`Error: ${err}`);
    }));
});

router.route('/delivered/:id').put((req, res)=>{
    Order.findById(req.params.id)
    .then((order)=>{
        order.isDelivered = true
        order.deliveredAt = Date.now()
        order.save()
        .then(()=>
        res.json('delivered successfully'))
        .catch((err=>{
            res.status(400).json('Error occured while updating the order, please check and try again');
            console.log(`Error: ${err}`);
        }));
    })
    .catch((err=>{
        res.status(400).json('Error occured while finding the order, please check and try again');
        console.log(`Error: ${err}`);
    }));
});

router.route('/myOrders').put((req, res)=>{
    Order.find({user: req.user._id})
    .then((order)=>{
        res.json(order);
    })
    .catch((err=>{
        res.status(400).json('Error occured while finding my order');
        console.log(`Error: ${err}`);
    }));
});

router.route('/').get((req, res)=>{
    Order.find().populate('user',
    'name email')
    .then((order)=>res.json(order))
    .catch((err=>{
        res.status(400).json('Error occured while collecting orders, please check and try again');
        console.log(`Error: ${err}`);
    }));
});

router.route('/:id').delete((req, res)=>{
    Order.findByIdAndDelete(req.params.id)
    .then((order)=>res.json('order has been deleted successfully'))
    .catch((err=>{
        res.status(400).json('Error occured while deleting the order, please check and try again');
        console.log(`Error: ${err}`);
    }));
});

module.exports = router;