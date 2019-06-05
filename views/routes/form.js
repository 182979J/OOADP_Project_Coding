const express = require('express');
const router = express.Router();
const moment = require('moment');
const Form = require('../models/Form');
const ensureAuthenticated = require('../helpers/auth');



router.get('/saveForm',ensureAuthenticated, (req, res) => {
    Video.findAll({
        where: {
            userId: req.user.id
        },
        order: [
            ['title', 'ASC']
        ],
        raw: true
    }).then((form) => {
        // pass object to saveForm.handlebar
        res.render('form/saveForm', {
            form:form
        });
    }).catch(err => console.log(err));
});

router.get('/showsendForm', ensureAuthenticated, (req, res) => {
    res.render('form/sendForm', { // pass object to saveForm.handlebar
         form: 'Reference Records'
    });
});
router.post('/sendForm', ensureAuthenticated,(req, res) =>{
    let itemCode = req.body.itemCode;
    let description = req.body.description.slice(0, 1999);
    let quantity = req.body.quantity;
    let referenceNo = req.body.referenceNo;
    let dateofDelivery = moment(req.body.dateofDelivery, 'DD/MM/YYYY');

    // res.render('form/sendForm');


    Form.create({
        itemCode,
        description,
        quantity,
        referenceNo,
        dateofDelivery,
    }).then((Form) => {
        res.redirect('/form/saveForm');
    }) .catch(err => console.log(err))

});







module.exports = router;