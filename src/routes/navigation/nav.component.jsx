
import { useDispatch, useSelector } from "react-redux";


import crownLogo from "../../assets/crown.svg";

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
import { signOutStart } from "../../store/user/user.action";

const Nav = () => {
    const currentUser = useSelector(currentUserSelector)
    const isCartOpen = useSelector(selectIsCartOPen);
    const dispatch = useDispatch()

    const signOutHandler = () => dispatch(signOutStart())

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
