import React, { Component } from "react";
import { list } from "../post/apiPost";
import { read } from "../user/apiUser";
import { isAuthenticated } from "../auth/index";
import RenderPost from "../post/RenderPost";

class AlgorithmStudent extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      dict: {},
      calculated: [],
      user: ""
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

  postFreq(data, id, fieldOfStudy) {
    const { calculated, dict, user } = this.state;
    if (user) {
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

      for (var i = 0; i < user.interest.length; i++) {
        var key = user.interest[i].toLowerCase();
        // da li postoji rijec u post-u
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
      calculated.push({ suma: suma, postId: id, fieldOfStudy: fieldOfStudy });
    }
  }

  init = () => {
    const token = isAuthenticated().token;
    const userId = this.props.match.params.userId;
    read(userId, token).then(data => {
      if (data.error) {
        this.setState({ redirectToSignin: true });
      } else {
        this.setState({
          user: data
        });
      }
    });
    list().then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({ posts: data });
      }
    });
  };

  componentDidMount() {
    this.init();
  }

  render() {
    const { posts, calculated, user } = this.state;
    var sorted = [];
    return (
      <div className="container">
        {posts.map(post => {
          this.postFreq(post.body, post._id, post.fieldOfStudy);
        })}
        <div className="row mt-2 ml-2 mr-2">
          {calculated &&
            (sorted = calculated.sort((a, b) => {
              if (a.suma < b.suma) return 1;
              if (a.suma > b.suma) return -1;
              return 0;
            }))}

          {sorted &&
            sorted.map(item => {
              if (item.fieldOfStudy === user.fieldOfStudy) {
                return <RenderPost key={item.postId} postId={item.postId} />;
              }
            })}
        </div>
      </div>
    );
  }
}

export default AlgorithmStudent;
