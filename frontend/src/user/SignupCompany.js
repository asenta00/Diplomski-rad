import React, { Component } from "react";
import { signupCompany } from "./apiUser";
import { Link } from "react-router-dom";
class SignupCompany extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      body: "",
      email: "",
      contact: "",
      password: "",
      role: "company",
      error: "",
      open: false,
      type: "password"
    };

    this.showHide = this.showHide.bind(this);
  }
  showHide(e) {
    e.preventDefault();
    e.stopPropagation();
    this.setState({
      type: this.state.type === "password" ? "input" : "password"
    });
  }
  handleChange = name => event => {
    this.setState({ error: "" });
    this.setState({ [name]: event.target.value });
  };
  clickSubmit = event => {
    event.preventDefault();
    const { name, body, email, contact, password, role } = this.state;
    const company = {
      name,
      body,
      email,
      contact,
      password,
      role
    };
    console.log("info o company ", company);
    signupCompany(company).then(data => {
      console.log("data iz signup company ", data);
      if (data.error) this.setState({ error: data.error });
      else
        this.setState({
          name: "",
          body: "",
          email: "",
          contact: "",
          password: "",
          role: "company",
          error: "",
          open: true
        });
    });
  };

  signupForm = (name, body, email, contact, password) => (
    <form>
      <div className="form-group">
        <label className="text-muted">Ime tvrtke</label>
        <input
          onChange={this.handleChange("name")}
          type="text"
          className="form-control"
          value={name}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Opis tvrtke</label>
        <textarea
          rows="4"
          style={{ height: "100%" }}
          onChange={this.handleChange("body")}
          type="text"
          className="form-control"
          value={body}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Kontakt</label>
        <textarea
          rows="2"
          style={{ height: "100%" }}
          onChange={this.handleChange("contact")}
          type="text"
          className="form-control"
          value={contact}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Email</label>
        <input
          onChange={this.handleChange("email")}
          type="email"
          className="form-control"
          value={email}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Lozinka</label>
        <input
          onChange={this.handleChange("password")}
          type={this.state.type}
          className="form-control"
          value={password}
        />
        <button className="btn btn-primary btn-sm" onClick={this.showHide}>
          {this.state.type === "password"
            ? "Prikaži lozinku"
            : "Sakrij lozinku"}
        </button>
      </div>
      <button onClick={this.clickSubmit} className="btn btn-raised btn-primary">
        Kreiraj profil
      </button>
    </form>
  );

  render() {
    const { name, body, email, contact, password, error, open } = this.state;
    return (
      <div className="container">
        <h2 className="mt-5 mb-5">SignUp - Tvrtka</h2>
        <div
          className="alert alert-danger"
          style={{ display: error ? "" : "none" }}
        >
          {error}
        </div>
        <div
          className="alert alert-info"
          style={{ display: open ? "" : "none" }}
        >
          Profil je uspješno kreiran. Sada se možete prijaviti u sustav{" "}
          <Link to="/signin">(SignIn).</Link>
        </div>
        {this.signupForm(name, body, email, contact, password)}
      </div>
    );
  }
}

export default SignupCompany;
