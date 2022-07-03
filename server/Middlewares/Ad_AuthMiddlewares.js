const Admin = require("../Models/AdminModel");
const jwt = require('jsonwebtoken');
const Users = require('../Models/UserModel')

module.exports.checkAdmin = async (req, res, next) => {

    const token = req.cookies.adminjwt;

    const usersList = await Users.find().select('-password');
    console.log(usersList);

    if (token) {
        jwt.verify(token, "trippholic admin", async (err, decodedToken) => {
            if (err) {
                res.json({ status: false });
                next();
            }
            else {
                const admin = await Admin.findById(decodedToken.id);
                console.log('uuuuu' , usersList);
                if (admin) res.json({ status: true, adminMail: admin.email , usersList })
                else res.json({ status: false })
                next();

            }
        })
    }
    else {
        res.json({ status: false });
        next();
    }
} 