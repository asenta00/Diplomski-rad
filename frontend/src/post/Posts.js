import React, { Component } from "react";
import { list } from "./apiPost";
import { Link } from "react-router-dom";

class Posts extends Component {
  constructor() {
    super();
    this.state = {
      posts: []
    };
  }
  componentDidMount() {
    list().then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({ posts: data });
      }
    });
  }
  renderPosts = posts => {
    return (
      <div className="row mt-2 ml-2 mr-2">
        {posts.map((post, i) => {
          const posterId = post.postedBy
            ? `/user/${post.postedBy._id}`
            : "/posts";
          const posterName = post.postedBy ? post.postedBy.name : "Nepoznat";
          return (
            <div className="card col-md-4 mt-1 mb-1 ml-1 mr-1 mx-auto" key={i}>
              <div className="card-body">
                <h5 className="card-title">{post.title}</h5>
                <p className="card-text">{post.body.substring(0, 150)} ...</p>
                <Link
                  to={`/post/${post._id}`}
                  className="btn btn-raised btn-primary btn-sm"
                >
                  Više o praksi
                </Link>
                <br />
                <hr />
                <p className="font-italic mark">
                  Autor: <Link to={`${posterId}`}> {posterName} </Link>
                  {new Date(post.created).toLocaleDateString()}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  render() {
    const { posts } = this.state;
    return <div className="container mt-5">{this.renderPosts(posts)}</div>;
  }
}

export default Posts;
