import React, { Component } from "react";
import { singlePost, update } from "./apiPost";
import { isAuthenticated } from "../auth/index";
import { Redirect } from "react-router-dom";

class EditPost extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
      title: "",
      body: "",
      period: "",
      paid: "",
      capacity: "",
      fieldOfStudy: "",
      redirectToProfile: false,
      error: ""
    };
  }

  init = userId => {
    singlePost(userId).then(data => {
      if (data.error) {
        this.setState({ redirectToProfile: true });
      } else {
        this.setState({
          title: data.title,
          body: data.body,
          period: data.period,
          paid: data.paid,
          id: data._id,
          capacity: data.capacity,
          fieldOfStudy: data.fieldOfStudy,
          error: ""
        });
      }
    });
  };
  componentDidMount() {
    this.postData = new FormData();
    const postId = this.props.match.params.postId;
    this.init(postId);
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
      const postId = this.state.id;
      const token = isAuthenticated().token;
      update(postId, token, this.postData).then(data => {
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

  editPostForm = (title, body, fieldOfStudy, period, paid, capacity) => (
    <form>
      <div className="form-group">
        <label className="text-muted" style={{ textAlign: "center" }}>
          Naslov prakse
        </label>
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
          <option value="" className="selected" disabled>
            Mogući odabir: DA/NE
          </option>
          <option value="true">DA</option>
          <option value="false">NE</option>
        </select>
      </div>

      <button onClick={this.clickSubmit} className="btn btn-raised btn-primary">
        Spremi promjene
      </button>
    </form>
  );
  render() {
    const {
      title,
      body,
      period,
      paid,
      capacity,
      fieldOfStudy,
      redirectToProfile,
      error,
      id
    } = this.state;
    if (redirectToProfile) {
      if (isAuthenticated().user.role == "admin")
        return <Redirect to={`/post/${id}`} />;
      else return <Redirect to={`/user/${isAuthenticated().user._id}`} />;
    }
    return (
      <div className="container">
        <div
          className="alert alert-danger"
          style={{ display: error ? "" : "none" }}
        >
          {error}
        </div>
        <h2 className="display-4 mt-5 mb-5 mx-auto">{title}</h2>
        {this.editPostForm(title, body, fieldOfStudy, period, paid, capacity)}
      </div>
    );
  }
}
export default EditPost;
