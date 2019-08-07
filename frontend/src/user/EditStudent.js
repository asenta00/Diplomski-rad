import React, { Component } from "react";
import ReactChipInput from "react-chip-input";
import { isAuthenticated } from "../auth";
import { read, update } from "./apiUser";
import { Redirect } from "react-router-dom";

class EditStudent extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
      firstName: "",
      lastName: "",
      email: "",
      fieldOfStudy: "",
      degree: "",
      interest: [],
      paid: "",
      password: "",
      redirectToProfile: false,
      error: "",
      role: "student",
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
  init = userId => {
    const token = isAuthenticated().token;
    read(userId, token).then(data => {
      if (data.error) {
        this.setState({ redirectToSignin: true });
      } else {
        this.setState({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          fieldOfStudy: data.fieldOfStudy,
          degree: data.degree,
          interest: data.interest,
          paid: data.paid,
          password: data.password,
          id: data._id
        });
      }
    });
  };
  componentDidMount() {
    this.userData = new FormData();
    const userId = this.props.userId;
    this.init(userId);
  }
  addChip = value => {
    const interest = this.state.interest.slice();
    interest.push(value);
    this.setState({ interest });
  };
  removeChip = index => {
    const interest = this.state.interest.slice();
    interest.splice(index, 1);
    this.setState({ interest });
  };
  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  isValid = () => {
    const { firstName, lastName, email, interest, password } = this.state;
    if (firstName.length === 0) {
      this.setState({ error: "Polje Ime ne smije biti prazno!" });
      return false;
    }
    if (lastName.length === 0) {
      this.setState({ error: "Polje Prezime ne smije biti prazno!" });
      return false;
    }
    if (interest.length === 0) {
      this.setState({ error: "Polje Interes ne smije biti prazno!" });
      return false;
    }
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      this.setState({ error: "Email nema ispravan format!" });
      return false;
    }
    if (password !== undefined) {
      if (password.length >= 1 && password.length <= 5) {
        this.setState({ error: "Lozinka mora imati najmanje 6 znakova!" });
        return false;
      }
    }
    return true;
  };

  clickSubmit = event => {
    event.preventDefault();
    if (this.isValid()) {
      const {
        firstName,
        lastName,
        email,
        fieldOfStudy,
        degree,
        interest,
        role,
        paid,
        password
      } = this.state;

      const student = {
        firstName,
        lastName,
        email,
        fieldOfStudy,
        degree,
        interest,
        role,
        paid,
        password: password || undefined
      };

      console.log(student);
      const studentId = this.props.userId;
      const token = isAuthenticated().token;

      update(studentId, token, student).then(data => {
        if (data.error) this.setState({ error: data.error });
        else {
          this.setState({
            redirectToProfile: true,
            error: ""
          });
        }
      });
    }
  };

  signupForm = (
    firstName,
    lastName,
    email,
    fieldOfStudy,
    degree,
    interest,
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
          value={firstName}
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
        <label className="text-muted">Razina studija</label>
        <select
          className="browser-default custom-select"
          onChange={this.handleChange("degree")}
          value={degree}
        >
          <option value="" className="selected" disabled>
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
          <option value="" className="selected" disabled>
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
          chips={interest}
          onSubmit={value => this.addChip(value)}
          onRemove={index => this.removeChip(index)}
          value={interest}
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
          <option value="" className="selected" disabled>
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
        Spremi promjene
      </button>
    </form>
  );
  render() {
    const {
      firstName,
      lastName,
      email,
      fieldOfStudy,
      degree,
      interest,
      paid,
      password,
      id,
      redirectToProfile,
      error
    } = this.state;
    if (redirectToProfile) {
      return <Redirect to={`/user/${id}`} />;
    }
    return (
      <div className="container mt-5">
        <div
          className="alert alert-danger"
          style={{ display: error ? "" : "none" }}
        >
          {error}
        </div>
        {this.signupForm(
          firstName,
          lastName,
          email,
          fieldOfStudy,
          degree,
          interest,
          paid,
          password
        )}
      </div>
    );
  }
}

export default EditStudent;
