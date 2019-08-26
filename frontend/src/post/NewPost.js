import React, { Component } from "react";
import { isAuthenticated } from "../user/apiUser";
import { Redirect } from "react-router-dom";
import { create } from "./apiPost";

class NewPost extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      body: "",
      fieldOfStudy: "",
      period: "",
      paid: "",
      capacity: "",
      error: "",
      user: {},
      redirectToProfile: false
    };
  }

  componentDidMount() {
    this.postData = new FormData();
    this.setState({ user: isAuthenticated().user });
  }
  handleChange = name => event => {
    this.postData.set(name, event.target.value);
    this.setState({ [name]: event.target.value });
  };

  isValid = () => {
    const { title, body, period, capacity } = this.state;
    if (title.length === 0) {
      this.setState({ error: "Polje Naslov prakse ne smije biti prazno!" });
      return false;
    }
    if (body.length === 0) {
      this.setState({ error: "Polje Opis prakse ne smije biti prazno!" });
      return false;
    }
    if (period.length === 0) {
      this.setState({ error: "Polje Period ne smije biti prazno!" });
      return false;
    }
    if (capacity.length === 0) {
      this.setState({ error: "Polje Broj studenata ne smije biti prazno!" });
      return false;
    }
    return true;
  };
  clickSubmit = event => {
    event.preventDefault();
    if (this.isValid()) {
      const companyId = isAuthenticated().user._id;
      const token = isAuthenticated().token;
      create(companyId, token, this.postData).then(data => {
        if (data.error) this.setState({ error: data.error });
        else {
          this.setState({
            redirectToProfile: true,
            title: "",
            body: "",
            fieldOfStudy: "",
            period: "",
            paid: "",
            capacity: ""
          });
        }
      });
    }
  };
  newPostForm = (title, body, fieldOfStudy, period, paid, capacity) => (
    <form>
      <div className="form-group">
        <label className="text-muted">Naslov prakse</label>
        <input
          onChange={this.handleChange("title")}
          type="text"
          className="form-control"
          value={title}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Opis prakse</label>
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
        <label className="text-muted">Studij</label>
        <select
          className="browser-default custom-select "
          onChange={this.handleChange("fieldOfStudy")}
          value={fieldOfStudy}
        >
          <option value="" selected disabled>
            Odaberi smjer studija
          </option>
          <option value="Elektrotehnika">Elektrotehnika</option>
          <option value="Elektronika">Elektronika</option>
          <option value="Racunarstvo">Računarstvo</option>
          <option value="Strojarstvo">Strojarstvo</option>
        </select>
      </div>
      <div className="form-group">
        <label className="text-muted">Trajanje prakse</label>
        <input
          onChange={this.handleChange("period")}
          type="text"
          className="form-control"
          value={period}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Broj mjesta</label>
        <input
          onChange={this.handleChange("capacity")}
          type="text"
          className="form-control"
          value={capacity}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Plaćena praksa?</label>
        <select
          className="browser-default custom-select "
          onChange={this.handleChange("paid")}
          value={paid}
        >
          <option value="" selected disabled>
            Mogući odabir: DA/NE
          </option>
          <option value="true">DA</option>
          <option value="false">NE</option>
        </select>
      </div>

      <button onClick={this.clickSubmit} className="btn btn-raised btn-primary">
        Kreiraj oglas
      </button>
    </form>
  );
  render() {
    const {
      title,
      body,
      fieldOfStudy,
      period,
      paid,
      capacity,
      user,
      redirectToProfile,
      error
    } = this.state;
    if (redirectToProfile) {
      if (isAuthenticated().user.role == "admin")
        return <Redirect to={`/posts`} />;
      else return <Redirect to={`/user/${user._id}`} />;
    }
    return (
      <div className="container mt-5">
        <div
          className="alert alert-danger"
          style={{ display: error ? "" : "none" }}
        >
          {error}
        </div>
        {this.newPostForm(title, body, fieldOfStudy, period, paid, capacity)}
      </div>
    );
  }
}

export default NewPost;
