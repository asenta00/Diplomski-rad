import React, { Component } from "react";
class CompanyProfile extends Component {
  render() {
    const company = this.props.user;
    return (
      <div>
        <h2 className="mt-5 mb-5">{company.name}</h2>
        <p>{company.body}</p>
        <p>Email: {company.email}</p>
        <p>Kontakt: {company.contact}</p>
        <p>
          {company.name} se pridružuje:{" "}
          {`${new Date(company.created).toLocaleDateString()}`}
        </p>
      </div>
    );
  }
}

export default CompanyProfile;
