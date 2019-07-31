import React, { Component } from "react";
import { listOfCompanies } from "./apiUser";
import { Link } from "react-router-dom";

class Companies extends Component {
  constructor() {
    super();
    this.state = {
      companies: []
    };
  }
  componentDidMount() {
    listOfCompanies().then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({ companies: data });
      }
    });
  }

  renderCompanies = companies => (
    <div className="row mt-2 ml-2 mr-2 ">
      {companies.map((company, i) => (
        <div className="card col-md-4 mt-1 mb-1 ml-1 mr-1 mx-auto" key={i}>
          <div className="card-body">
            <h5 className="card-title">{company.name}</h5>
            <p className="card-text"> {company.body.substring(0, 100)}...</p>
            <Link
              to={`/user/${company._id}`}
              className="btn btn-raised btn-primary btn-sm"
            >
              Više o tvrtki
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
  render() {
    const { companies } = this.state;
    return (
      <div className="container mt-5">{this.renderCompanies(companies)}</div>
    );
  }
}

export default Companies;
