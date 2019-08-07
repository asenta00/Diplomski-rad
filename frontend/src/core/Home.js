import React, { useState, useEffect } from "react";
import desktopImage from "../images/backgroundDesktop.jpg";
import mobileImage from "../images/backgroundMobile.jpg";
import student from "../images/student.jpg";
import company from "../images/company.jpg";
import { Link } from "react-router-dom";

const useWindowWidth = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleWindowResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return windowWidth;
};

const Home = () => {
  const imageUrl = useWindowWidth() >= 700 ? desktopImage : mobileImage;
  const heightImg = useWindowWidth() >= 700 ? "550px" : "390px";
  return (
    <div>
      <header
        className="masthead text-center text-white"
        style={{
          backgroundImage: `url(${imageUrl})`,
          width: "auto",
          height: heightImg
        }}
      />
      <div className="container mt-5">
        <section>
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6 order-lg-2">
                <img
                  className="ml-5 p-5 rounded-circle"
                  style={{
                    backgroundImage: `url(${student})`,
                    height: "200px",
                    width: "350px",
                    backgroundSize: "cover"
                  }}
                />
              </div>
              <div className="col-lg-6 order-lg-1">
                <div className="p-5">
                  <h2 className="display-4">Studenti</h2>
                  <p>
                    Nakon registracije student se prijavljuje u sustav. Prijavom
                    u sustav student može vidjeti sve prakse koje objave tvrtke,
                    kao i prakse koje najbolje odgovaraju njegovom profilu.
                  </p>
                  <Link
                    to={`/signup/student`}
                    className="btn btn-raised btn-primary btn-sm"
                  >
                    Sign Up
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6">
                <img
                  className="ml-5 p-5 rounded-circle"
                  style={{
                    backgroundImage: `url(${company})`,
                    height: "200px",
                    width: "350px",
                    backgroundSize: "cover"
                  }}
                />
              </div>
              <div className="col-lg-6">
                <div className="p-5">
                  <h2 className="display-4">Tvrtke</h2>
                  <p>
                    Nakon registracije tvrtka se prijavljuje u sustav. Prijavom
                    u sustav tvrtka može kreirati oglas prakse i vidjeti
                    studente koji najbolje odgovaraju njihovim kriterijima.
                  </p>
                  <Link
                    to={`/signup/company`}
                    className="btn btn-raised btn-primary btn-sm"
                  >
                    Sign Up
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <footer
        className="footer py-5 bg-black"
        style={{ backgroundColor: "#22c3bb" }}
      >
        <div className="container">
          <p className="m-0 text-center text-black small">
            Copyright &copy; Web aplikacija za studentske prakse 2019
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
