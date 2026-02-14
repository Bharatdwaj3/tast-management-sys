import bycrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User  from "../models/user.model.js";
import { setAccessToken, setRefreshToken, clearAuthCookies, revokeRefreshToken, refreshTokenHandler} from '../middleware/token.middleware.js';



const registerUser=async(req, res)=>{
  try{
      const {userName, fullName, email, accountType, password}= req.body;

    if(!userName || !fullName || !email || !accountType || !password){
      return res.status(400).json({
        success: false,
        message: 'All fields are req!!',
        code: 'VALIDATION_ERROR'
      });
    }
    const existingUser = await User.findOne({ email });
      if(existingUser){
        return res.status(400).json({
          success:false,
          message: 'User with this email already exists!',
          code: 'EMAIL_EXISTS'
        });
      }

    const user=new User({
      userName: userName,
      fullName: fullName,
      email: email,
      accountType: accountType,
      password: password
    })
    const salt=await bycrypt.genSalt(10);
    user.password=await bycrypt.hash(password, salt);

    await user.save();
    
    setAccessToken(res, user);
    await setRefreshToken(res, user);
    return res.status(201).json({
      success: true,
      message: 'Registered Check email for verification code',
      requiresVerfication: true,
      user: {id: user._id, email: user.email}
    });


  }catch(error){
    console.error('Error registering user: ',error);
    res.status(500).json({
      success: false,
      message:'Server Error',
      code: 'REGISTRATION_FAILED'
    });
  }
};

const loginUser=async(req, res)=>{
  try{
    const {email, password}=req.body;
    if(!email || !password){
      return res.status(400).json({
        success: false,
        message: 'Email and password are required',
        code: 'MISSING_CREDENTIALS'
      });
    }
    const user=await User.findOne({email}).select('+password');
    if(!user){
      return res.status(400).json({
        success: false,
        message:'Invalid credentials',
        code: 'INVALID_CREDENTIALS'
      });
    }
    if(!user.isActive){
      return  res.status(403).json({
        success: false,
        message: 'Account is deactivated',
        code: 'ACCOUNT_INACTIVE'
      });
    }
    const isMatch=await bycrypt.compare(password, user.password);
    if(!isMatch){
        return res.status(400).json({
          success: false,
          message: 'Invalid credentials',
          code: 'INVALID_CREDENTIALS'
        });
    }

    setAccessToken(res, user);
    await setRefreshToken(res, user);

    res.json({
      success: true,
      message: 'Login successful',
      user: {
        id: user._id,
        userName: user.userName,
        fullName: user.fullName,
        email: user.email,
        accountType: user.accountType,
        lastLogin: user.lastLogin
      }
    });
  }catch(error){
    console.error('Error logging in : ',error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
      code: 'LOGIN_FAILED'
    });
  }
};


const logoutUser=async(req, res)=>{
  try{
    if(req.user?.id){
      await revokeRefreshToken(req.user.id);
    }
    clearAuthCookies(res);
    res.json({
      success: true,
      message: 'User logged out successfully',
      code: 'LOGOUT_SUCCESS'
    });
  }catch(error){
    console.error('Logout error: ',error);
    res.status(500).json({
      success: false,
      message: 'Logout failed',
      code: 'LOGOUT_FAILED'
    });
  }
}

const profileUser=async(req, res)=>{
  
  
  try{
    const user=await User.findById(req.user.id)
  
    .select('-password -accounType -refreshTokenn -googleId -discordId')
  
    if(!user){
      return res.status(404).json({
        success: false,
        message: 'User not found',
        code: 'USER_NOT_FOUND'
      });
    }
    res.status(200).json({
      success: true,
      message: 'Welcome to your dashboard!',
      user:{
        id: user.id,
        userName: user.userName,
        fullName: user.fullName,
        email: user.email,
        accountType: user.accountType,
        avatar: user.avatar,
        isActive: user.isActive,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        lastLogin: user.lastLogin
      }
    });
  }catch(error){
    console.error('Error fetching profile: ',error);
    res.status(500).json({message: 'Server error'});
  }
};

const refreshToken = async (req, res) => {
  return refreshTokenHandler(req, res);
};




export{
  registerUser,
  refreshToken,
  loginUser,
  logoutUser,
  profileUser,
};