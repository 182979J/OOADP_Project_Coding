const express = require('express');
const router = express.Router();
const deli = require('../models/Delivery');
const orderItem = require('../models/OrderItems');
const alertMessage = require('../helpers/messenger'); //to test flash-messenger
const MySQLStore = require('express-mysql-session');
let config = require('../config/db.js');
const mysql = require('mysql');

const pool = mysql.createPool({
    host: 'localhost',
    database: 'delivery_db',
    username: 'itp211',
    password: 'itp211'
});

router.get('/delForm', (req, res) => {
    res.render("enterDb")
});


//throw later when db received
router.post('/enterDb', (req, res) => {
    let cOrderNo = req.body.cOrderNo; //req.body -> retrieve input form fields
    let cName = req.body.cName; //Since the story field size in the videos table is 2000, only the first 2000 characters of the input is retrieved
    let cAddr = req.body.cAddr;
    let cPostal_Code = req.body.cPostal_Code;
    let cEmailAddr = req.body.cEmailAddr;
    let cPhoneNo = req.body.cPhoneNo;
    let delDate = req.body.deliDate.toString();
    let delPickUpTime = req.body.delPickUpTime;
    let delMan = req.body.delMan;
    let cRegion = req.body.region;

    if (cName != "") {
        deli.create({ cOrderNo, cName, cAddr, cPostal_Code, cRegion, cEmailAddr, cPhoneNo, delDate, delPickUpTime, delMan }) //masuk db
        orderItem.create({cOrderNo})
        console.log('luar')
        // .then(deliveries => {
        //                     // alertMessage(res, 'success', delivery.cName + ' added.', 'fas fa-sign-in-alt', true);
        //                     console.log('info created')
        //                     res.redirect('/delivery');
        //                 })
        res.redirect('/delivery')

    }
    res.render('enterDb')
});

// router.get('/', (req, res) => {

//     console.log("teerr");
// });

router.get('/delivery', (req, res) => {
    console.log("tesyert")
    deli.findAll({ // retrieves all videos using the userId defined in the where object in ascending order by title.
        raw: true
    }).then((deliveries) => { //The promise .then((videos) returns a videos object that contains all records retrieved from Video.findAll.

        res.render('admin/del_admin', { //passing the videos object to display all the videos retrieved.

            deliveries: deliveries


        })
        //got error

    }).catch(err => console.log(err));
});

router.get('/del_details/:id', (req, res) => {
    var dMId = req.params.id;
    deli.findOne({
        where: {
            id: dMId,
            // userId: userId
        },
    }).then((deliveries) => {
        //    console.log("videoIdToDelete.user: " + video.userId);
        //    console.log("req.user.id : " + req.user.id);
        console.log(dMId, "tryyyyyyyyyyyyyyyyyy");
        res.render('admin/del_details', {
            deliveries: deliveries
        })
    })
});

router.put('/updateDelDetails/:id', (req, res) => {
    // Retrieves edited values from req.body
    // let title = req.body.title; //req.body -> retrieve input form fields
    // let story = req.body.story.slice(0, 1999); //Since the story field size in the videos table is 2000, only the first 2000 characters of the input is retrieved
    // let dateRelease = moment(req.body.dateRelease, 'DD/MM/YYYY');
    // let language = req.body.language.toString(); //For grouped input form objects, req.body returns an array of string objects, which cannot be directly stored into MySQL. So it has to be converted to a string using req.body.language.toString()
    // let subtitles = req.body.subtitles === undefined ? '' :
    //     req.body.subtitles.toString();
    // let classification = req.body.classification;
    // let userId = req.user.id;


    let delDate = req.body.delDate;
    let delPickUpTime = req.body.delPickUpTime;
    let delMan = req.body.delMan;


    deli.update({
        // Set variables here to save to the videos table
        delDate,
        delPickUpTime,
        delMan
    }, {
            where: {
                id: req.params.id
            }
        }).then(() => {
            // After saving, redirect to router.get(/listVideos...) to retrieve all updated
            // videos

            // alertMessage(res, 'success','Update Successful!', 'fas fa-sign-in-alt', true);
            res.redirect('/delivery');
        }).catch(err => console.log(err));
});

router.get('/delManH', (req, res) => {
    deli.findAll({

    }).then((deliveries) => { //The promise .then((videos) returns a videos object that contains all records retrieved from Video.findAll.
        res.render('deliveryMan/dMan_home', { //passing the videos object to display all the videos retrieved.
            deliveries: deliveries
        })

    }).catch(err => console.log(err));

});



// try delivery man home
router.get('/home', (req, res) => {
    var d = new Date();

    //var lastDay = new Date(date.getFullYear(), d.getMonth() + 1, 0);
    //document.getElementById('trying').innerHTML = lastDay;
    var month = d.getMonth() + 1;
    var day = d.getDate();
    var year = d.getFullYear();
    // day = day + i;
    var tmr = day + 1;
    var tmr2 = day + 2;
    var tmr3 = day + 3;
    var tmr4 = day + 4;

    if (month < 10) {
        month = '0' + month;
    }


    //i++;
    dateToday = day + "/" + month + "/" + year;
    dateTmr = tmr + "/" + month + "/" + year;
    dateTmr2 = tmr2 + "/" + month + "/" + year;
    dateTmr3 = tmr3 + "/" + month + "/" + year;
    dateTmr4 = tmr4 + "/" + month + "/" + year;
    // date="9/07/2019"
    // console.log(dateToday)
    deli.findAll({

        where: {

            delDate: dateToday,
            // delDate: dateTmr, 
            // delDate : dateTmr2, 
            // delDate : dateTmr3, 
            // delDate : dateTmr4

        }
        
    }).then((deli1) => {
        deli.findAll({

            where: {


                delDate: dateTmr,
                // delDate : dateTmr2, 
                // delDate : dateTmr3, 
                // delDate : dateTmr4

            }
        }).then((deli2) => {
            deli.findAll({

                where: {


                    // delDate: dateTmr,
                    delDate: dateTmr2,
                    // delDate : dateTmr3, 
                    // delDate : dateTmr4

                }
            }).then((deli3) => {
                deli.findAll({

                    where: {


                        // delDate: dateTmr,
                        // delDate : dateTmr2, 
                        delDate: dateTmr3,
                        // delDate : dateTmr4

                    }
                }).then((deli4) => {
                    deli.findAll({

                        where: {

                            
                            // delDate: dateTmr,
                            // delDate : dateTmr2, 
                            // delDate : dateTmr3, 
                            delDate: dateTmr4

                        }
                    }).then((deli5) => {
                        orderItem.findAll({

                            // where: {
    
                                
                            //     // delDate: dateTmr,
                            //     // delDate : dateTmr2, 
                            //     // delDate : dateTmr3, 
                            //     cOrderNo : cOrderNo
    
                            // },
                            raw:true
                        }).then((order) => {
                                console.log(order)
                        res.render('deliveryMan/deliveryHome', {

                            deli1: deli1,
                            deli2: deli2,
                            deli3: deli3,
                            deli4 : deli4,
                            deli5 : deli5, 

                            // technically cn comment the ones below
                            dateToday: dateToday,
                            dateTmr: dateTmr,
                            dateTmr2: dateTmr2,
                            // dateTmr:dateTmr, 
                            // dateTmr2: dateTmr2, 
                            dateTmr3: dateTmr3, 
                            dateTmr4 : dateTmr4,
                            orderItem: order
                            

                        })
                    })
                    
                })
            })
        })

        // deli.findAll({
        // // console.log(deliveries);
        //     where : {
        //         delDate : dateTmr
        //     }
        //     }).then((deliveries) => {

    })
})
        })

// })


module.exports = router;