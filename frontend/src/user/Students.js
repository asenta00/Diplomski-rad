import React, { Component } from "react";
import { listOfStudents } from "./apiUser";
import { Link } from "react-router-dom";

class Students extends Component {
  constructor() {
    super();
    this.state = {
      students: []
    };
  }
  componentDidMount() {
    listOfStudents().then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({ students: data });
      }
    });
  }
  renderStudents = students => (
    <div className="row mt-2 ml-2 mr-2">
      {students.map((student, i) => (
        <div className="card col-md-4 mt-1 mb-1 ml-1 mr-1 mx-auto" key={i}>
          <div className="card-body">
            <h5 className="card-title">
              {student.firstName} {student.lastName}
            </h5>
            <p className="card-text">Smjer: {student.fieldOfStudy}</p>
            <Link
              to={`/user/${student._id}`}
              className="btn btn-raised btn-primary btn-sm"
            >
              Više o studentu
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
  render() {
    const { students } = this.state;
    return (
      <div className="container mt-5">{this.renderStudents(students)}</div>
    );
  }
}

export default Students;
