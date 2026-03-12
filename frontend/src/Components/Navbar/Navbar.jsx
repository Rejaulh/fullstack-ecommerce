import React, {useContext} from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";
import { CartContext } from "../Context/CartContext";

const Navbar = () => {
  const { cartItems } = useContext(CartContext);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="navbar">
      {/* Logo */}
      <div className="navbar-logo">
        <Link to="/">ShopZone</Link>
      </div>

      {/* Navigation Links */}
      <nav className="navbar-links">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/men">Men</NavLink>
        <NavLink to="/women">Women</NavLink>
        <NavLink to="/kids">Kids</NavLink>
        <NavLink to="/electronics">Electronics</NavLink>
      </nav>

      {/* Search + Cart + Login */}
      <div className="navbar-right">
        <input
          type="text"
          placeholder="Search products..."
          className="search-input"
        />

        <Link to="/cart" className="cart">
          🛒
          {cartCount > 0 && (
          <span className="cart-count">{cartCount}</span>
          )}
        </Link>
        <Link to="/login">
          <button className="login-btn">Login</button>
        </Link>
      </div>
    </header>
  );
};

export default Navbar;




// import React, { useContext, useState } from "react";
// import { Link, NavLink } from "react-router-dom";
// import { ShopContext } from "../../context/ShopContext";
// import "./Navbar.css";

// const Navbar = () => {
//   const { cartItems, toggleDarkMode } = useContext(ShopContext);
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [profileOpen, setProfileOpen] = useState(false);

//   return (
//     <header className="navbar">
//       <div className="logo">
//         <Link to="/">ShopPro</Link>
//       </div>

//       {/* Hamburger */}
//       <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
//         ☰
//       </div>

//       {/* Menu */}
//       <nav className={`nav-links ${menuOpen ? "active" : ""}`}>
//         <NavLink to="/" end>Home</NavLink>
//         <NavLink to="/men">Men</NavLink>
//         <NavLink to="/women">Women</NavLink>
//         <NavLink to="/kids">Kids</NavLink>
//       </nav>

//       {/* Right Section */}
//       <div className="right-section">
//         {/* Dark Mode */}
//         <button className="dark-btn" onClick={toggleDarkMode}>
//           🌙
//         </button>

//         {/* Cart */}
//         <Link to="/cart" className="cart">
//           🛒
//           <span>{cartItems}</span>
//         </Link>

//         {/* Profile */}
//         <div className="profile">
//           <span onClick={() => setProfileOpen(!profileOpen)}>👤</span>
//           {profileOpen && (
//             <div className="dropdown">
//               <Link to="/profile">My Profile</Link>
//               <Link to="/orders">My Orders</Link>
//               <Link to="/logout">Logout</Link>
//             </div>
//           )}
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Navbar;