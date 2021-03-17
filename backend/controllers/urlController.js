import asyncHandler from 'express-async-handler'
import urlModel from '../models/urlModel.js'

// @desc    Auth add url 
// @route   POST /api/url/addurl
const addUrl = asyncHandler(async (req, res) => {

    const url = req.body.url;
    const responseTime = req.body.responseTime;
    const userId = req.body.userId;


    const urladd = await urlModel.create({
        url,
        responseTime,
        userId
    })
    
    if (urladd) {
        res.status(201).json({urladd})
      } else {
        res.status(400)
        throw new Error('Invalid user data')
      }  
})

// @desc    Auth add url 
// @route   POST /api/url/geturl
const geturl = asyncHandler(async (req, res) => {

    urlModel.find({}, function(err, data) {
        if (err) {
        res.send(err);
        } else {        
        res.send(data);
        }
    });   
})




export {
    addUrl,geturl
}
