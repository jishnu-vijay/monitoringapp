import asyncHandler from 'express-async-handler'
import urlModel from '../models/urlModel.js'
import request from 'request'



// @desc    Auth add url 
// @route   POST /api/url/addurl
const addUrl = asyncHandler(async (req, res) => {
console.log(req.body)
    const url = req.body.url;
    const responseTime = req.body.responseTime;
    const userId = req.body.userId;

    const urldata = await urlModel.create({
        url,
        responseTime,
        userId
    })
    
    if (urldata) {
        res.status(201).json({urldata})
      } else {
        res.status(400)
        throw new Error('ERROR')
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

// @desc    Auth add url 
// @route   POST /api/url/getmonitorUrl
const getmonitorUrl = asyncHandler(async (req, res) => {

    urlModel.find({moreThan:true}, function(err, data) {
        if (err) {
        res.send(err);
        } else {    
            console.log(data)    
            res.send(data);
        }
    });   
})

const monitorurls = asyncHandler(async (req, res) => {

    urlModel.find({}, function(err, data) {
        if (err) {
        res.send(err);
        } 
        else 
        {     
            for(var i = 0; i < data.length;i++){
                var urlid=data[i]._id
                var rtime=data[i].responseTime
                console.log(data[i].url);
                request.get({
                    url : data[i].url,
                    time : true
                  },function(err, response){
                    console.log('Request time in ms', response.elapsedTime);
                    var responsetime=response.elapsedTime
                    if(responsetime>rtime)
                    {
                        urlModel.findOneAndUpdate({_id: urlid}, { moreThan: true}, function(err, ulsd) {
                            if (err) {
                              console.log('got an error');
                            }

                          });
                    }
                    else
                    {
                        urlModel.findOneAndUpdate({_id: urlid}, { moreThan: false}, function(err, ulsd) {
                            if (err) {
                              console.log('got an error');
                            }

                          });
                    }
                  });
                 
            }
        }
    });   
})

const deleteUrl = asyncHandler(async (req, res) => {
    urlModel.findOne({_id: req.params.id}, function (error, urldata){
        urldata.remove();
        if (error) {
            res.send(error);
        } else {        
            res.status(201).json({"msg":"url deleted"})
        }
    });  
})


export {
    addUrl,geturl,monitorurls,deleteUrl,getmonitorUrl
}
