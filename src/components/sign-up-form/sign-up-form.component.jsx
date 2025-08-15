import { useState } from "react";
import { useDispatch } from "react-redux";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import { SignUpContainer } from "./sign-up-form-styles";
import { signUpStart } from "../../store/user/user.action";

const defaultFormFields = {
    displayName: "",
    email: "",
    confirmPassword: "",
    password: "",
};

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;
    const dispatch = useDispatch()

    const onchangeHandler = (e) => {
        const { name, value } = e.target;
        setFormFields((prevForm) => ({
            ...prevForm,
            [name]: value,
        }));
    };

    const formSubmitHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("password do not match")
            return
        }
        try {

            dispatch(signUpStart(email, password, displayName))
            setFormFields(defaultFormFields);
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <SignUpContainer>
            <h2>Don't have an account</h2>
            <span>Sign In With Your Email and Password</span>
            <form onSubmit={formSubmitHandler}>
                <FormInput
                    label="Display Name"
                    id="Display Name"
                    required
                    type="text"
                    name="displayName"
                    value={displayName}
                    onChange={onchangeHandler}
                />
                <FormInput
                    label="Email"
                    id="Email"
                    required
                    type="email"
                    name="email"
                    value={email}
                    onChange={onchangeHandler}
                />
                <FormInput
                    label="Password"
                    id="Password"
                    required
                    type="password"
                    name="password"
                    value={password}
                    onChange={onchangeHandler}
                />
                <FormInput
                    label="Confirm Password"
                    id="Confirm Password"
                    required
                    type="password"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={onchangeHandler}
                />

                <Button type="submit">Sign Up</Button>
            </form>
        </SignUpContainer>
    );
};

export default SignUpForm;
