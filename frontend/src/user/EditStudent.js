import React, { Component } from "react";
import ReactChipInput from "react-chip-input";
import { isAuthenticated } from "../auth";
import { read, update, updateUser } from "./apiUser";
import { Redirect } from "react-router-dom";
import DefaultProfile from "../images/avatar.jpg";

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
      type: "password",
      fileSize: 0
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
        var interest = data.interest[0].toString().split(",");
        this.setState({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          fieldOfStudy: data.fieldOfStudy,
          degree: data.degree,
          interest: interest,
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
    this.userData.set("interest", [interest]);
    this.setState({ interest });
  };
  removeChip = index => {
    const interest = this.state.interest.slice();
    interest.splice(index, 1);
    this.setState({ interest });
    this.userData.set("interest", interest);
  };
  handleChange = name => event => {
    this.setState({ error: "" });
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    const fileSize = name === "photo" ? event.target.files[0].size : 0;
    this.userData.set(name, value);
    this.setState({ [name]: value, fileSize });
  };

  isValid = () => {
    const {
      firstName,
      lastName,
      email,
      interest,
      password,
      fileSize
    } = this.state;
    if (firstName.length === 0) {
      this.setState({ error: "Polje Ime ne smije biti prazno!" });
      return false;
    }
    if (lastName.length === 0) {
      this.setState({ error: "Polje Prezime ne smije biti prazno!" });
      return false;
    }
    if (interest.length === 0) {
      this.setState({ error: "Polje Interesa ne smije biti prazno!" });
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
    if (fileSize > 100000) {
      this.setState({ error: "Veličina slike mora biti manja od 100kb!" });
      return false;
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

      const studentId = this.props.userId;
      const token = isAuthenticated().token;
      update(studentId, token, this.userData).then(data => {
        if (data.error) this.setState({ error: data.error });
        else {
          updateUser(data);
          this.setState({
            error: "",
            redirectToProfile: true
          });
        }
      });
    }
  };

  redirect = event => {
    this.setState({ redirectToProfile: true });
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
        <label className="text-muted">Profile Photo</label>
        <input
          onChange={this.handleChange("photo")}
          type="file"
          accept="image/*"
          className="form-control"
        />
      </div>
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
      <button
        onClick={this.redirect}
        className="btn btn-raised btn-warning ml-5"
      >
        Odustani
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
    const photoUrl = id
      ? `${
          process.env.REACT_APP_API_URL
        }/user/photo/${id}?${new Date().getTime()}`
      : DefaultProfile;
    return (
      <div className="container mt-5">
        <div
          className="alert alert-danger"
          style={{ display: error ? "" : "none" }}
        >
          {error}
        </div>
        <img
          style={{ height: "200px", width: "auto" }}
          className="img-thumbnail"
          src={photoUrl}
          onError={i => (i.target.src = `${DefaultProfile}`)}
          alt={firstName}
        />
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
