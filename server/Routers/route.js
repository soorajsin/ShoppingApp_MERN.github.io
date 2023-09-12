const express = require("express");
const router = new express.Router();
const userdb = require("../Model/userSchema");
const bcrypt = require("bcryptjs");
const authentication=require("../Middleware/Authentication");


router.post("/register", async (req, res) => {
          // console.log(req.body);
          try {
                    const {
                              name,
                              email,
                              password,
                              cpassword
                    } = req.body;

                    if (!name || !email || !password || !cpassword) {
                              return res.status(400).json({
                                        message: "All fields are required"
                              })
                    } else {
                              const preUser = await userdb.findOne({
                                        email
                              });

                              if (preUser) {
                                        return res.status(201).send('Email Already Exists');
                              } else {
                                        // console.log("done");

                                        const newUser = new userdb({
                                                  name,
                                                  email,
                                                  password,
                                                  cpassword
                                        });


                                        const saveData = await newUser.save();
                                        // console.log(saveData);


                                        res.status(201).json({
                                                  status: 201,
                                                  message: "Registration Successfully done",
                                                  saveData
                                        })


                              }
                    }



          } catch (error) {
                    res.status(422).json({
                              error: "Internal Server Error"
                    })
          }
});




router.post("/login", async (req, res) => {
          // console.log(req.body);
          try {
                    const {
                              email,
                              password
                    } = req.body;

                    if (!email || !password) {
                              throw 'Please enter all the details';
                    } else {
                              const preUser = await userdb.findOne({
                                        email
                              });

                              if (!preUser) {
                                        return res.status(403).json({
                                                  error: "User not found"
                                        })
                              } else {
                                        const isMatchPassword = await bcrypt.compare(password, preUser.password);

                                        if (!isMatchPassword) {
                                                  return res.status(500).json({
                                                            error: "User password not matched"
                                                  })
                                        } else {
                                                  // console.log("done user");

                                                  const token = await preUser.getSignedToken();
                                                  // console.log(token);

                                                  //generate cookie
                                                  res.cookie("auth_token", token, {
                                                            httpOnly: true, // Ensures the cookie is only accessible on the server
                                                            secure: true, // Ensures the cookie is only sent over HTTPS (in a production environment)
                                                            maxAge: 24 * 60 * 60 * 1000, // 24 hours in milliseconds (adjust as needed)
                                                  });

                                                  const result = {
                                                            preUser,
                                                            token
                                                  };


                                                  res.status(200).json({
                                                            status: 202,
                                                            message: "Login Successful",
                                                            result: result
                                                  });
                                        }
                              }
                    }

          } catch (error) {
                    res.status(422).json({
                              error: "Internal Server Error"
                    })
          }
});



router.get("/validUser", authentication, async (req, res) => {
          // console.log("done");

          if (req.getData) {
                    // console.log("done");
                    res.status(201).json({
                              status: 205,
                              message: "User Authenticate",
                              getData: req.getData
                    })

          } else {
                    // console.log("no");
                    res.status(422).json({
                              error: "User data not found"
                    })
          }
})



module.exports = router;