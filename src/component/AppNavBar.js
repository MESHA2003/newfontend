import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import toastr from 'toastr';
import { useNavigate } from "react-router-dom";
import 'toastr/build/toastr.css';
import logo from "../Asset/image/MeshackMandia.png";

const AppNavBar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");

  const handleLogout = () => {
    // Clear the token from localStorage
    localStorage.removeItem("authToken");

    toastr.success("Successfully Logging Out");

    // Navigate to the login page
    navigate("/");
  };

  const navLinkStyle = {
    color: "#fff",
    fontSize: "16px",
    fontWeight: "bold",
    textDecoration: "none",
    margin: "0 10px",
    padding: "10px 15px",
    borderRadius: "5px",
    transition: "all 0.3s ease",
  };

  // const navLinkHoverStyle = {
  //   backgroundColor: "#f9a826",
  //   color: "#000",
  // };

  const navBarStyle = {
    backgroundColor: "#343a40",
    padding: "10px 0",
  };

  const brandStyle = {
    color: "#f9a826",
    fontSize: "22px",
    fontWeight: "bold",
    textDecoration: "none",
  };

  return (
    <>
      {/* Navbar */}
      <Navbar style={navBarStyle} expand="lg">
        <Container>
          <Navbar.Brand href="/" style={brandStyle} className="fw-bold">
            <img src={logo} alt="logo" style={{ width: "60px", marginRight: "10px" }} />
            Mydiary
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link
                href="/"
                style={navLinkStyle}
                onMouseEnter={(e) => (e.target.style.backgroundColor = "#f9a826")}
                onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
              >
                Home
              </Nav.Link>

              {/* Show Searchbar only if the user is logged in */}
              {token && (
                <Nav.Link
                  href="/Searchbar"
                  style={navLinkStyle}
                  onMouseEnter={(e) => (e.target.style.backgroundColor = "#f9a826")}
                  onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
                >
                  Searchbar
                </Nav.Link>
              )}

              {token ? (
                <Nav.Link
                  as="span"
                  onClick={handleLogout}
                  style={navLinkStyle}
                  onMouseEnter={(e) => (e.target.style.backgroundColor = "#f9a826")}
                  onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
                >
                  Logout
                </Nav.Link>
              ) : (
                <>
                  <Nav.Link
                    href="/login"
                    style={navLinkStyle}
                    onMouseEnter={(e) => (e.target.style.backgroundColor = "#f9a826")}
                    onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
                  >
                    Login
                  </Nav.Link>
                  <Nav.Link
                    href="/register"
                    style={navLinkStyle}
                    onMouseEnter={(e) => (e.target.style.backgroundColor = "#f9a826")}
                    onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
                  >
                    Register
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default AppNavBar;
