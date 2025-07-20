import { useContext } from "react";
import { UserContext } from "../../components/contexts/userContext.component";
import { CartContext } from "../../components/contexts/cart.context";

import crownLogo from "../../assets/crown.svg";
import { signOutUser } from "../../utils/firebase/firebase.utils";

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import {
    Navigation,
    LogoContainer,
    NavLinks,
    NavLink,
    NavLogo
} from "./nav.styles";

const Nav = () => {
    const { currentUser } = useContext(UserContext);
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
