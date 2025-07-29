
import { useSelector } from "react-redux";


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
import { selectIsCartOPen } from "../../store/cart/cart.selector";

const Nav = () => {
    const currentUser = useSelector(currentUserSelector)
    const isCartOpen = useSelector(selectIsCartOPen);

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
