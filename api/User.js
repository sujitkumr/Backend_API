const express=require('express');
const router=express.Router();
const otpGenerator = require('otp-generator');
const User=require('./../models/User');
const nodemailer = require('nodemailer');
const bcrypt=require('bcrypt');
const { fail } = require('assert');

// GETTING ALL THE USERS

// Add this at the end of your existing code
router.get('/get-all-users', async (req, res) => {
    try {
        // Retrieve all users from the database
        const allUsers = await User.find();

        res.json({
            status: 'SUCCESS',
            message: 'All users retrieved successfully.',
            data: allUsers,
        });
    } catch (err) {
        console.error('Error in get-all-users endpoint:', err);
        res.json({
            status: 'FAILED',
            message: 'An error occurred while fetching all users.',
        });
    }
});

router.post('/signup', (req,res)=>{
    let{name,email,password, dateOfBirth}=req.body;
    name=name.trim();
    email =email.trim();
    password=password.trim();
    dateOfBirth=dateOfBirth.trim();

    if(name =="" || email=="" || password=="" || dateOfBirth==""){
        res.json({
            status:"Failed",
            message: "Empty input fields!"
        });
    }
    else if(!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email))
    {
        res.json({
            status:"Failed",
            message:"Invalid email entered"
        })
    }
    else if(!new Date(dateOfBirth).getTime()){
        res.json({
            status:"Failed",
            message:"Invalid date of birth"
        })
    }
    else if(password.length<8){
        res.json({
            status:"Failed",
            message:"Password is too short!"
        })
    }
    else{
        User.find({email}).then(result =>{
            if(result.length){
                res.json({
                    status:"Failed",
                    message:"User with provided email already exists"
                })
            } else{


                const saltRounds = 10;
                bcrypt.hash(password, saltRounds).then(hashedPassword =>{
                    const newUser = new User({
                        name,
                        email,
                        password:hashedPassword,
                        dateOfBirth
                    });
                    newUser.save().then(result =>{
                        res.json({
                            status:"SUCCESS",
                            message:"Signup successful",
                            data: result,
                        })
                    })
                    .catch(err=>{
                        res.json({
                            status:"Failed",
                            message:"An error occured while saving user account!"
                        })
                    })
                })
                .catch(err=>{
                    res.json({
                        status:"Failed",
                        message:"An error occured while hashing password!"
                    })
                })
            }
        }).catch(err=>{
            console.log(err);
            res.json({
                status:"Failed",
                message:"An error occured while checking for existing"
            })
        })
    }
})
router.post('/signin', async (req, res) => {
    try {
        let { email, password } = req.body;
        email = email.trim();
        password = password.trim();

        if (email == "" || password == "") {
            res.json({
                status: "FAILED",
                message: "Empty credentials supplied"
            });
        } else {
            const data = await User.find({ email });

            if (data.length > 0) {
                const hashedPassword = data[0].password;
                const result = await bcrypt.compare(password, hashedPassword);

                if (result) {
                    res.json({
                        status: "SUCCESS",
                        message: "Sign successful",
                        data: data
                    });
                } else {
                    res.json({
                        status: "FAILED",
                        message: "Invalid password entered!"
                    });
                }
            } else {
                res.json({
                    status: "FAILED",
                    message: "Invalid credentials entered!"
                });
            }
        }
    } catch (err) {
        res.json({
            status: "FAILED",
            message: "An error occurred: " + err.message
        });
    }
});

function generateResetToken() {
    const expirationTime = 60 * 60 * 1000; // 1 hour in milliseconds
    const expiryDate = Date.now() + expirationTime;
    const token = Math.random().toString(36).substr(2) + expiryDate.toString(36);
    return token;
}





// Nodemailer configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'sujitkymar101@gmail.com',
        pass: 'hofjontzvpirsfga'
    }
});

router.post('/forget-password', async (req, res) => {
    try {
        const { email } = req.body;
        const resetToken = generateResetToken();

        // Update user's resetToken in the database
        await User.findOneAndUpdate({ email }, { $set: { resetToken } });

        // Send an email with the reset link
        const resetLink = `http://your-reset-website.com/reset-password?token=${encodeURIComponent(resetToken)}`;
        const mailOptions = {
            from: 'sujitkymar101@gmail.com', 
            to: email,
            subject: 'Password Reset',
            text: `Click on the following link to reset your password: ${resetLink}`
        };

        await transporter.sendMail(mailOptions);

        console.log('Password reset link sent to:', email);
        res.json({
            status: 'SUCCESS',
            message: 'Password reset link sent to your email.'
        });
    } catch (err) {
        console.error('Error in forget-password endpoint:', err);
        res.json({
            status: 'FAILED',
            message: 'An error occurred while processing your request.'
        });
    }
});

router.post('/reset-password', async (req, res) => {
    try {
        const { email, token, newPassword } = req.body;

        console.log('Received reset-password request:', { email, token });

        // Validate the reset token
        const user = await User.findOne({
            email: { $regex: new RegExp(email, 'i') },
            resetToken: token
        });

        console.log('Found User:', user);

        if (!user) {
            console.log('Invalid or expired reset token.');
            return res.json({
                status: 'FAILED',
                message: 'Invalid or expired reset token.'
            });
        }

        // Check token expiration
        const tokenExpiry = parseInt(token.substr(-1), 36); // Extract expiry from token
        if (Date.now() > tokenExpiry) {
            console.log('Reset token has expired.');
            return res.json({
                status: 'FAILED',
                message: 'Reset token has expired.'
            });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update the user's password and resetToken
        await User.findOneAndUpdate({ email }, { $set: { password: hashedPassword, resetToken: null } });

        console.log('Password reset successful for:', email);
        res.json({
            status: 'SUCCESS',
            message: 'Password reset successful.'
        });
    } catch (err) {
        console.error('Error in reset-password endpoint:', err);
        res.json({
            status: 'FAILED',
            message: 'An error occurred while resetting your password.'
        });
    }
});

module.exports=router;