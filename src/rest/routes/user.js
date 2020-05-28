import express from "express";
import { check, validationResult} from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const router = express.Router();
import { User } from "../../models/User";
import auth from "../middleware/auth"

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
       // maxAge: 5184000,
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

      const payload = {
        user: {
          id: user.id
        }
      };

      const token = jwt.sign(payload, "secret");
      res.cookie('accessToken', token, {
        //maxAge: 5184000,
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

export default router;
