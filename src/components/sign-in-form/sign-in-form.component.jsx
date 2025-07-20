import {
    createUserDocumentFromAuth,
    signInWithGooglePopUp,
    signInAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/form-input.component";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";

import { useState } from "react";
import { SignInContainer } from "./sign-in-form.styles"; // 🧠 imported styled component

const defaultFormFields = {
    email: "",
    password: "",
};

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const signInWithGoogle = async () => {
        const { user } = await signInWithGooglePopUp();
        await createUserDocumentFromAuth(user);
    };

    const onchangeHandler = (e) => {
        const { name, value } = e.target;
        setFormFields((prevForm) => ({
            ...prevForm,
            [name]: value,
        }));
    };

    const formSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            await signInAuthUserWithEmailAndPassword(email, password);
            setFormFields(defaultFormFields);
        } catch (err) {
            console.log(err);
            if (err.code === "auth/invalid-credential") {
                alert("Please enter valid credentials");
            }
        }
    };

    return (
        <SignInContainer>
            <h2>Already have an account</h2>
            <span>Sign In With Your Email and Password</span>
            <form onSubmit={formSubmitHandler}>
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
                <div className="buttons-container">
                    <Button type="submit">Sign In</Button>
                    <Button type="button" buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogle}>
                        Google Sign In
                    </Button>
                </div>
            </form>
        </SignInContainer>
    );
};

export default SignInForm;
