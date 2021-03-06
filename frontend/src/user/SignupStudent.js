import React, { Component } from "react";
import ReactChipInput from "react-chip-input";
import { signupStudent } from "./apiUser";
import { Link } from "react-router-dom";
class SignupStudent extends Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      birthdate: Date,
      fieldOfStudy: "",
      degree: "",
      interests: [],
      role: "student",
      paid: "",
      password: "",
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
  addChip = value => {
    const interests = this.state.interests.slice();
    interests.push(value);
    this.setState({ interests });
  };
  removeChip = index => {
    const interests = this.state.interests.slice();
    interests.splice(index, 1);
    this.setState({ interests });
  };
  handleChange = name => event => {
    this.setState({ error: "" });
    this.setState({ [name]: event.target.value });
  };

  clickSubmit = event => {
    event.preventDefault();
    const {
      firstName,
      lastName,
      email,
      birthdate,
      fieldOfStudy,
      degree,
      interests,
      role,
      paid,
      password
    } = this.state;
    var interest = interests.join();
    const student = {
      firstName,
      lastName,
      email,
      birthdate,
      fieldOfStudy,
      degree,
      interest,
      role,
      paid,
      password
    };
    signupStudent(student).then(data => {
      if (data.error) {
        this.setState({ error: data.error });
        window.scrollTo(0, 0);
      } else {
        this.setState({
          firstName: "",
          lastName: "",
          email: "",
          birthdate: Date,
          fieldOfStudy: "",
          degree: "",
          interests: [],
          role: "student",
          paid: "",
          password: "",
          password_confirm: "",
          error: "",
          open: true
        });
        window.scrollTo(0, 0);
      }
    });
  };

  signupForm = (
    firstName,
    lastName,
    email,
    birthdate,
    fieldOfStudy,
    degree,
    interests,
    paid,
    password
  ) => (
    <form>
      <div className="form-group">
        <label className="text-muted">Ime</label>
        <input
          onChange={this.handleChange("firstName")}
          type="text"
          className="form-control"
          defaultValue={firstName}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Prezime</label>
        <input
          onChange={this.handleChange("lastName")}
          type="text"
          className="form-control"
          value={lastName}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Datum rođenja</label>
        <input
          onChange={this.handleChange("birthdate")}
          type="date"
          className="form-control"
          defaultValue={birthdate}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Razina studija</label>
        <select
          className="browser-default custom-select"
          onChange={this.handleChange("degree")}
          value={degree}
        >
          <option value="" className="selected " disabled>
            Odaberi razinu studija
          </option>
          <option value="Preddiplomski sveučilišni studij">
            Preddiplomski sveučilišni studij
          </option>
          <option value="Preddiplomski stručni studij">
            Preddiplomski stručni studij
          </option>
          <option value="Diplomski studij">Diplomski studij</option>
        </select>
      </div>
      <div className="form-group">
        <label className="text-muted">Smjer studija</label>
        <select
          className="browser-default custom-select "
          onChange={this.handleChange("fieldOfStudy")}
          value={fieldOfStudy}
        >
          <option value="" className="selected " disabled>
            Odaberi smjer studija
          </option>
          <option value="Elektrotehnika">Elektrotehnika</option>
          <option value="Elektronika">Elektronika</option>
          <option value="Racunarstvo">Računarstvo</option>
          <option value="Strojarstvo">Strojarstvo</option>
        </select>
      </div>
      <div className="form-group">
        <label className="text-muted">Područje interesa</label>
        <ReactChipInput
          classes="class1 class2"
          chips={interests}
          onSubmit={value => this.addChip(value)}
          onRemove={index => this.removeChip(index)}
          value={interests}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">
          Je li bitno da je studentska praksa plaćena?
        </label>
        <select
          className="browser-default custom-select "
          onChange={this.handleChange("paid")}
          value={paid}
        >
          <option value="" className="selected " disabled>
            Mogući odabir: DA/NE
          </option>
          <option value="true">DA</option>
          <option value="false">NE</option>
        </select>
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
    const {
      firstName,
      lastName,
      email,
      birthdate,
      fieldOfStudy,
      degree,
      interests,
      paid,
      password,
      error,
      open,
      password_confirm
    } = this.state;
    return (
      <div className="container">
        <h2 className="mt-5 mb-5">SignUp - Student</h2>
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
          Profil je uspješno kreiran. Sada se možete prijaviti u sustav
          <Link to="/signin">(SignIn).</Link>
        </div>
        {this.signupForm(
          firstName,
          lastName,
          email,
          birthdate,
          fieldOfStudy,
          degree,
          interests,
          paid,
          password,
          password_confirm
        )}
      </div>
    );
  }
}

export default SignupStudent;
