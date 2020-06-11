import express from "express";
import { check, validationResult} from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const router = express.Router();
import { User } from "../../models/User";
import {Token} from '../../models/Token';
import auth from "../middleware/auth"
import mailer from  "../../email/init"
import emailData from  "../../email/emailData"
import crypto from "crypto";

//TODO gmail fb signup
router.post("/login/social", [], async (req, res) => {
    const { email, method, fbId } = req.body;
    if (!email  && !fbId) {
      return res.status(400).json({
        Invalid: "Fields missing"
      });
    }
    try {
      let user;

      if(email && method ==='google'){
        user = await User.findOne({ email });
      }
      if(fbId && method ==='facebook'){
        user = await User.findOne({ fbId});
      }

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(payload, "secret", { expiresIn: '60 days' }, (err, token) => {
          if (err) throw err;
          res.status(200).json({ token });
        }
      );

    } catch (err) {
      console.log(err.message);
      res.status(500).send("Internal error");
    }
  }

);

router.post(
  "/login",
  [
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Please enter a valid password").isLength({
      min: 6
    })
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email }).select("+password");

      if (!user){
        return res.status(400).json({
          message: "User not found"
        });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({
          message: "Incorrect password"
        });
      const payload = {
        user: {
          id: user.id
        }
      };

      const token = jwt.sign(payload, "secret");
      res.cookie('accessToken', token, {
        expires: new Date(Date.now() + 700 * 3600000) ,
        httpOnly: true
      });
      res.status(200).end();

    } catch (e) {
      console.error(e);
      res.status(500).json({
        message: "Internal error"
      });
    }
  }
);


router.post(
  "/signup",
  [
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Please enter a valid password").isLength({
      min: 6
    })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }
    const {
      email,
      password
    } = req.body;
    try {
      let user = await User.findOne({
        email
      });
      if (user) {
        return res.status(409).json({
          msg: "Conflict with existing user"
        });
      }

      user = new User({
        email,
        password
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();
      const regToken = new Token({ _userId: user._id, token: crypto.randomBytes(16).toString('hex') });
      const payload = {
        user: {
          id: user.id
        }
      };
      await regToken.save();
      await mailer.send(emailData('reg',user.email, {regToken: regToken.token}));
      const token = jwt.sign(payload, "secret");
      res.cookie('accessToken', token, {
        expires: new Date(Date.now() + 700 * 3600000) ,
        httpOnly: true
      });
      res.status(200).end();

    } catch (err) {
      console.log(err.message);
      res.status(500).send("Internal error");
    }
  }
);

router.get("/profile", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (user) res.json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Internal error");
  }
});

router.post('/logout', auth,(req,res)=> {
  res.clearCookie('accessToken');
  res.status(204).send();
});

export default router;
