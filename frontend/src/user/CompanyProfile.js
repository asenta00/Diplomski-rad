import React, { Component } from "react";
class CompanyProfile extends Component {
  render() {
    const company = this.props.user;
    return (
      <div>
        <h2 className="mt-5 mb-5">{company.name}</h2>
        <p>{company.body}</p>
        <p>
          <b>Email:</b> {company.email}
        </p>
        <p>
          <b>Kontakt:</b> {company.contact}
        </p>
        <p>
          <b>{company.name}</b> se pridružuje:{" "}
          {`${new Date(company.created).toLocaleDateString()}`}
        </p>
      </div>
    );
  }
}

export default CompanyProfile;
