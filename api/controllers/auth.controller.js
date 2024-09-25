import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
import { sendEmail } from "../utils/sendEmail.js";

export const signup = async (req, res, next) => {
  const { email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({
    email,
    password: hashedPassword,
    admin: "no-access",
  });
  try {
    await newUser.save();
    res.status(201).json({ message: "user created successfully" });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, "User not found"));
    const validPassword = bcryptjs.compareSync(password, validUser.password);

    if (!validPassword) return next(errorHandler(401, "Wrong Credentials"));

    if (!validUser.termsAgreed)
      return next(errorHandler(403, "Please agree to terms of aggrement"));
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const expiryDate = new Date(Date.now() + 360000);

    validUser.lastActivity = new Date();
    await validUser.save();

    const { password: hashedPassword, ...rest } = validUser._doc;

    res
      .cookie("access_token", token, { httpOnly: true, expiryDate: expiryDate })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

export const signout = (req, res) => {
  res
    .clearCookie("access_token")
    .status(200)
    .json({ message: "Signout successfull" });
};

export const updateTerms = async (req, res) => {
  const { email, termsAgreed } = req.body;

  try {
    const user = await User.findOneAndUpdate(
      { email },
      { $set: { termsAgreed: true } },
      { new: true }
    );

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.json({ success: true, message: "Terms agreement updated" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

export const resetPassword = async (req, res, next) => {
  const { email, type } = req.body;

  let expiryTime;
  if (type === "new-user") {
    expiryTime = "1d";
  } else if (type === "old-user") {
    expiryTime = "5m";
  } else {
    return res
      .status(400)
      .json({ success: false, message: "Invalid user type" });
  }
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: expiryTime,
  });

  const resetURL = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

  let Emailtext = `Hello, 

A request to reset your password on learningwithseabird.ca has been made.

To reset your password, click the following link:
${resetURL}

To report this request if it was not made by you, please send an email to our team at PARCCollab@ufv.ca.
`;

try {
    await sendEmail({
      to: user.email,
      subject: "Password Reset",
      text: type === "old-user" ? Emailtext : `Welcome to Learning With Seabird!
    
    We are pleased to inform you that you have been granted access to all of Learning With Seabird’s restricted materials.
    
    Login Details:
    
    Email: ${email}
    Token: ${resetToken}
    Please follow these steps to get started:
    
    1. Change Password: Use the token provided above to change your password by clicking the link below. The token will expire in 24 hours, so please make sure to complete this step promptly.
    ${resetURL}
    
    2. Log In: After changing your password, you can log in to learningwithseabird.ca using your email and the new password you created.
    
    3. Review Terms of Use: Before accessing any restricted materials, please read our Terms of Use. It is important to understand and agree to our terms before proceeding.
    If you encounter any issues or have questions, feel free to reach out to us.
    
    PARCCollab@ufv.ca.
    `,
    });
    
    return res
      .status(200)
      .json({ success: true, message: "Password reset email sent" });
} catch (error) {
    next(errorHandler(500, 'Cannot Send the Email'))
}

};

export const updatePassword = async (req, res) => {
  const { token, password } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid token" });
    }

    user.password = bcryptjs.hashSync(password, 10);
    await user.save();

    res.json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: "Invalid or expired token" });
  }
};
