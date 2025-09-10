import { Router } from "express";
import { validateCreateAccountData } from "../../utils/validations";
import User from "../../models/user";
import bcrypt from "bcrypt";

export const createAccountRouter = (router: Router) => {
    router.post('/createAccount', async (req, res) => {
        try {
            await validateCreateAccountData(req);
            const { body: {firstName, lastName, email, age, password, gender, photoUrl, skills } } = req;
            const encodedPassword = await bcrypt.hashSync(password, 10);
            const isEmailExists = await User.findOne({ emailId: email });
            if (isEmailExists) {
                return res.status(400).send({ message: 'Email already exists' });
            }
            const newUser = new User({
                firstName,
                lastName,
                emailId: email,
                age,
                password: encodedPassword,
                gender,
                photoUrl,
                skills
            });
           const savedUser =  await newUser.save();
           const token = await savedUser.getJWT();
            res.cookie('token', token, { expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), secure: process.env.NODE_ENV === 'production' });
            res.status(201).send({ message: 'Account created successfully' });
        } catch (error) {
            console.log(error)
            res.status(500).send({ message: `Server error:${error}` });
        }
    });
}