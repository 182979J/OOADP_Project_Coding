const express = require('express');
const router = express.Router();
const deli = require('../models/Delivery');
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

router.get('/delForm',(req,res)=>{
    res.render("enterDb")
});

router.post('/enterDb', (req,res) => {
    let cOrderNo = req.body.cOrderNo; //req.body -> retrieve input form fields
    let cName = req.body.cName; //Since the story field size in the videos table is 2000, only the first 2000 characters of the input is retrieved
    let cAddr = req.body.cAddr;
    let cPostal_Code = req.body.cPostal_Code;
    let cEmailAddr = req.body.cEmailAddr;
    let cPhoneNo = req.body.cPhoneNo;
    let delDate = req.body.deliDate.toString();
    let delPickUpTime = req.body.delPickUpTime;
    let delMan = req.body.delMan
    let cRegion = "South";

   if (cName != ""){
        deli.create({cOrderNo,cName, cAddr, cPostal_Code, cRegion, cEmailAddr, cPhoneNo, delDate, delPickUpTime, delMan}) //masuk db
        console.log('luar')                
        .then(delivery => {
                            // alertMessage(res, 'success', delivery.cName + ' added.', 'fas fa-sign-in-alt', true);
                            console.log('info created')
                            res.redirect('/');
                        })
    
            }
    res.render('enterDb')
});


router.get('/', (req,res) => {
    deli.findAll({ // retrieves all videos using the userId defined in the where object in ascending order by title.
  })
        .then((deliveries) => { //The promise .then((videos) returns a videos object that contains all video records retrieved from Video.findAll.
            // pass object to listVideos.handlebar
            res.render('admin/del_admin', { //passing the videos object to display all the videos retrieved.

                deliveries: deliveries
            });
        })
        .catch(err => console.log(err));

});

router.get('/del_details/:id', (req,res) => {
        var dMId = req.params.id;
        deli.findOne({
            where: {
            id: dMId,
            // userId: userId
            },
           }).then((deliveries) =>{
            //    console.log("videoIdToDelete.user: " + video.userId);
            //    console.log("req.user.id : " + req.user.id);
            console.log(dMId, "tryyyyyyyyyyyyyyyyyy");
               res.render('admin/del_details', {
                   deliveries:deliveries
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
            res.redirect('/');
        }).catch(err => console.log(err));
});


module.exports = router;