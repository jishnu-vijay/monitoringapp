import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import User from '../models/authModels.js'
import  validationResult from "express-validator"



// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {

  const userName = req.body.username;
  const password = req.body.password;

  const errors = validationResult(req);

  if(!errors.isEmpty())
  {
    console.log(errors)
    return res.status(422).json({
      error: errors.array()[0].msg
    });
  }
  else
  {
    const user = await User.findOne({ userName })

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        userName: user.userName,
        email: user.email,
        userType: user.userType,
        token: generateToken(user._id),
      })
    } else {
      res.status(401)
      throw new Error('Invalid email or password')
    }
  }

  
})

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {

    const userName = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const rpassword = req.body.rpassword;
    const userType = req.body.userType;

    const errors = validationResult(req);

    if(!errors.isEmpty())
    {
      console.log(errors)
      return res.status(422).json({
        error: errors.array()[0].msg
      });
    }
    else
    {
      const userExists = await User.findOne({ email,userName })

      if (userExists) {
        res.status(400)
        throw new Error('User already exists')
      }

      const user = await User.create({
        userName,
        email,
        password,
        userType
      })

      if (user) {
        res.status(201).json({
          _id: user._id,
          userName: user.userName,
          email: user.email,
          userType: user.userType,
          token: generateToken(user._id),
        })
      } else {
        res.status(400)
        throw new Error('Invalid user data')
      }
    }

    
})


// @desc    Get user by ID
// @route   GET /api/auth/:id
const getUserById = asyncHandler(async (req, res) => {

  User.findById(req.params.id, function(err, result) {
    if (err) {
      res.status(404)
      throw new Error('User not found')
    } else {
      res.json(result)
    }
  });

})


export {
  authUser,
  registerUser,
  getUserById,
}
