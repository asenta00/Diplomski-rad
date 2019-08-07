import React, { Component } from "react";
import { listByUser } from "../post/apiPost";
import { listOfStudents } from "../user/apiUser";
import { isAuthenticated } from "../auth/index";
import { Link } from "react-router-dom";
import { string } from "prop-types";

class AlgorithmCompany extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      students: [],
      calculated: [],
      dict: {}
    };
  }

  tokenize(text) {
    // Split into array of tokens
    return text.match(/\S+/g);
  }

  // A function to validate a token
  validate(token) {
    return /\w{2,}/.test(token);
  }

  // Count the words
  termFreq(data) {
    var tokens = this.tokenize(data);
    var totalwords = 0;
    // For every token
    for (var i = 0; i < tokens.length; i++) {
      // Lowercase everything to ignore case
      var token = tokens[i].toLowerCase();
      if (this.validate(token)) {
        totalwords++;
      }
    }
    return totalwords;
  }

  postFreq(data, id, fieldOfStudy, capacity, title) {
    const { calculated, dict, students } = this.state;
    if (students) {
      var list = [];
      var tokens = this.tokenize(data);
      let totalwords = this.termFreq(data);
      var listTf = {};
      // A temporary dictionary of words in this document
      var tempDict = {};
      // For every token
      for (var i = 0; i < tokens.length; i++) {
        // Lowercase everything to ignore case
        var token = tokens[i].toLowerCase();
        // Simpler we just need to see if it exists or not
        if (this.validate(token) && tempDict[token] === undefined) {
          tempDict[token] = true;
        }
      }
      // For every student calculate frequency
      for (var j = 0; j < students.length; j++) {
        for (var i = 0; i < students[j].interest.length; i++) {
          var key = students[j].interest[i].toLowerCase();
          // is there word in tempDict?
          if (tempDict[key]) {
            dict[key] = dict[key] ? parseInt(dict[key]) + 1 : (dict[key] = 1);
          }
          listTf[key] = dict[key] / totalwords;
        }

        var suma = 0;
        for (var item in listTf) {
          if (listTf[item]) {
            suma = suma + listTf[item];
          }
        }

        var pusham = {
          suma: suma,
          fieldOfStudy: fieldOfStudy,
          studentId: students[j]._id,
          studentName: students[j].firstName
        };

        if (fieldOfStudy === students[j].fieldOfStudy) {
          list.push(pusham);
        }
      }
      calculated.push({
        postId: id,
        list: list,
        capacity: capacity,
        title: title
      });
    }
  }

  loadPosts = userId => {
    const token = isAuthenticated().token;
    listByUser(userId, token).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        console.log("Posts: ", data);
        this.setState({ posts: data });
      }
    });
  };

  loadStudents = () => {
    listOfStudents().then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({ students: data });
      }
    });
  };

  componentDidMount() {
    const userId = this.props.match.params.userId;
    this.loadPosts(userId);
    this.loadStudents();
  }

  sorting = lista => {
    var sorted = lista.sort((a, b) => {
      if (a.suma < b.suma) return 1;
      if (a.suma > b.suma) return -1;
      return 0;
    });
    return sorted;
  };

  checkStudents = (capacity, list) => {
    var students = [];
    if (list.length >= capacity) {
      for (var i = 0; i < capacity; i++)
        students.push({
          suma: list[i].suma,
          studentName: list[i].studentName,
          studentId: list[i].studentId
        });
    } else if (list.length < capacity) {
      for (var i = 0; i < list.length; i++)
        students.push({
          suma: list[i].suma,
          studentName: list[i].studentName,
          studentId: list[i].studentId
        });
    }
    return students;
  };
  render() {
    const { posts, calculated } = this.state;
    var sorted = "";
    return (
      <div>
        {posts.map(post => {
          this.postFreq(
            post.body,
            post._id,
            post.fieldOfStudy,
            post.capacity,
            post.title
          );
        })}

        <div className="container mt-5">
          {calculated &&
            calculated.map((row, index) => {
              return (
                <ul key={index}>
                  <div>
                    <h4>{row.title}</h4>
                  </div>
                  <div>
                    <ul>
                      {(sorted = this.sorting(row.list)) &&
                        this.checkStudents(row.capacity, row.list).map(
                          (item, index) => {
                            return (
                              <li key={index}>
                                <Link to={`/user/${item.studentId}`}>
                                  {item.studentName}
                                </Link>
                                <hr />
                              </li>
                            );
                          }
                        )}
                    </ul>
                  </div>
                </ul>
              );
            })}
        </div>
      </div>
    );
  }
}

export default AlgorithmCompany;
