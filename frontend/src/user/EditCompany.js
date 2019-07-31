import React, { Component } from "react";
import { isAuthenticated } from "../auth";
import { Redirect } from "react-router-dom";
import { read, update } from "./apiUser";

class EditCompany extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      id: "",
      body: "",
      email: "",
      contact: "",
      password: "",
      role: "company",
      error: "",
      redirectToProfile: false,
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
          name: data.name,
          body: data.body,
          email: data.email,
          contact: data.contact,
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
  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  isValid = () => {
    const { name, body, email, contact, password } = this.state;
    if (name.length === 0) {
      this.setState({ error: "Polje Ime tvrtke ne smije biti prazno!" });
      return false;
    }
    if (body.length === 0) {
      this.setState({ error: "Polje Opis tvrtke ne smije biti prazno!" });
      return false;
    }
    if (contact.length === 0) {
      this.setState({ error: "Polje Kontakt ne smije biti prazno!" });
      return false;
    }
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      this.setState({ error: "Email nema ispravan format!" });
      return false;
    }
    if (password.length >= 1 && password.length <= 5) {
      this.setState({ error: "Lozinka mora imati najmanje 6 znakova!" });
      return false;
    }
    return true;
  };
  clickSubmit = event => {
    event.preventDefault();
    if (this.isValid()) {
      const { name, body, email, contact, password, role } = this.state;
      const company = {
        name,
        body,
        email,
        contact,
        password: password || undefined,
        role
      };
      console.log(company);
      const companyId = this.props.userId;
      const token = isAuthenticated().token;
      update(companyId, token, company).then(data => {
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
          onChange={this.handleChange("body")}
          type="text"
          className="form-control"
          value={body}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Kontakt</label>
        <textarea
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
        Spremi promjene
      </button>
    </form>
  );
  render() {
    const {
      name,
      body,
      email,
      contact,
      password,
      redirectToProfile,
      id,
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
        {this.signupForm(name, body, email, contact, password)}
      </div>
    );
  }
}

export default EditCompany;
