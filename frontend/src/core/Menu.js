import React from "react";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Nav from "react-bootstrap/Nav";
import { withRouter } from "react-router-dom";
import { isAuthenticated, signout } from "../user/apiUser";
const isActive = (history, path) => {
  if (history.location.pathname === path) return { color: "	#20B2AA" };
  else return { color: "#000000" };
};

const Menu = ({ history }) => (
  <Navbar bg="light" expand="lg">
    <Navbar.Brand href="/">Diplomski rad</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        <Nav.Link href="/" style={isActive(history, "/")}>
          Home
        </Nav.Link>

        {!isAuthenticated() && (
          <>
            <NavDropdown title="Signup" id="basic-nav-dropdown">
              <NavDropdown.Item
                href="/signup/student"
                style={isActive(history, "/signup/student")}
              >
                Student
              </NavDropdown.Item>
              <NavDropdown.Item
                href="/signup/company"
                style={isActive(history, "/signup/company")}
              >
                Tvrtka
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="/signin" style={isActive(history, "/signin")}>
              Sign In
            </Nav.Link>
          </>
        )}

        {isAuthenticated() && (
          <>
            <Nav.Link href="/posts" style={isActive(history, "/posts")}>
              Prakse
            </Nav.Link>
            {isAuthenticated().user.role === "company" && (
              <>
                <Nav.Link
                  href={`/students/${isAuthenticated().user._id}`}
                  style={isActive(
                    history,
                    `/students/${isAuthenticated().user._id}`
                  )}
                >
                  Predloženi studenti
                </Nav.Link>
                <Nav.Link
                  href={`/post/create`}
                  style={isActive(history, `/post/create`)}
                >
                  Kreiraj oglas
                </Nav.Link>
              </>
            )}
            {isAuthenticated().user.role === "student" && (
              <Nav.Link
                href={`/suggestions/${isAuthenticated().user._id}`}
                style={isActive(
                  history,
                  `/suggestions/${isAuthenticated().user._id}`
                )}
              >
                Predložene prakse
              </Nav.Link>
            )}
            {isAuthenticated().user.role === "admin" && (
              <>
                <Nav.Link
                  href="/students"
                  style={isActive(history, "/students")}
                >
                  Studenti
                </Nav.Link>
                <Nav.Link
                  href="/companies"
                  style={isActive(history, "/companies")}
                >
                  Tvrtke
                </Nav.Link>
              </>
            )}
            {isAuthenticated().user.role !== "admin" && (
              <Nav.Link
                href={`/user/${isAuthenticated().user._id}`}
                style={isActive(history, `/user/${isAuthenticated().user._id}`)}
              >
                {isAuthenticated().user.firstName ||
                  isAuthenticated().user.name}
              </Nav.Link>
            )}
            <Nav.Link
              style={
                (isActive(history, "/signout"),
                { cursor: "pointer", color: "fff" })
              }
              onClick={() => signout(() => history.push("/"))}
            >
              Sign Out
            </Nav.Link>
          </>
        )}
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

export default withRouter(Menu);
