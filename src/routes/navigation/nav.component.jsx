import { useContext } from "react";
import { useSelector } from "react-redux";


import { CartContext } from "../../components/contexts/cart.context";

import crownLogo from "../../assets/crown.svg";
import { signOutUser } from "../../utils/firebase/firebase.utils";

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import { currentUserSelector } from "../../store/user/user.selector";

import {
    Navigation,
    LogoContainer,
    NavLinks,
    NavLink,
    NavLogo
} from "./nav.styles";

const Nav = () => {
    const currentUser = useSelector(currentUserSelector)
    const { isCartOpen } = useContext(CartContext);

    const signOutHandler = async () => {
        await signOutUser();
    };

    return (
        <Navigation>
            <LogoContainer to="/">
                <NavLogo src={crownLogo} alt="crown-logo" />
            </LogoContainer>

            <NavLinks>
                <NavLink to="/shop">SHOP</NavLink>
                {currentUser ? (
                    <NavLink as="span" onClick={signOutHandler}>SIGN OUT</NavLink>
                ) : (
                    <NavLink to="/auth">SIGN IN</NavLink>
                )}
                <CartIcon />
            </NavLinks>

            {isCartOpen && <CartDropdown />}
        </Navigation>
    );
};

export default Nav;
