import React, { Component } from "react";
import { singlePost, remove } from "./apiPost";
import { Link, Redirect } from "react-router-dom";
import { isAuthenticated } from "../auth";

class SinglePost extends Component {
  state = {
    post: "",
    postedById: "",
    redirectToPosts: false
  };
  componentDidMount = () => {
    const postId = this.props.match.params.postId;
    console.log(postId);
    singlePost(postId).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({ post: data, postedById: data.postedBy._id });
      }
    });
  };
  deletePost = () => {
    const postId = this.props.match.params.postId;
    const token = isAuthenticated().token;
    remove(postId, token).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({ redirectToPosts: true });
      }
    });
  };

  deleteConfirmed = () => {
    let answer = window.confirm("Sigurno želite izbrisati oglas prakse?");
    if (answer) {
      this.deletePost();
    }
  };
  renderPost = (post, postedById) => {
    const posterId = post.postedBy ? `/user/${post.postedBy._id}` : "/posts";
    const posterName = post.postedBy ? post.postedBy.name : "Nepoznat";
    return (
      <div className="card-body">
        <p className="card-text">
          <b>Opis prakse: </b>
          {post.body}
        </p>
        <p className="card-text">
          <b>Studij:</b> {post.fieldOfStudy}
        </p>
        <p className="card-text">
          <b>Trajanje prakse:</b> {post.period}
        </p>
        <p className="card-text">
          <b>Broj mjesta:</b> {post.capacity}
        </p>
        <p className="card-text">
          <b>Plaćena praksa:</b> {post.paid ? "DA" : "NE"}
        </p>
        <hr />
        <p className="card-text">
          <b>Autor: </b>
          <Link className="font-italic" to={`${posterId}`}>
            {posterName}{" "}
          </Link>
          <label className="font-italic">
            {new Date(post.created).toLocaleDateString()}
          </label>
        </p>
        <hr />
        <div className="d-inline-block">
          <Link to={`/posts`} className="btn btn-raised btn-primary">
            Svi oglasi
          </Link>
          {isAuthenticated().user.role === "student" && (
            <Link
              to={`/suggestions/${isAuthenticated().user._id}`}
              className="btn btn-raised btn-primary ml-3"
            >
              Predložene prakse
            </Link>
          )}

          {(isAuthenticated().user._id == postedById ||
            isAuthenticated().user.role === "admin") &&
            isAuthenticated().user && (
              <>
                <Link
                  to={`/post/edit/${post._id}`}
                  className="btn btn-raised btn-info ml-5"
                >
                  Uredi oglas
                </Link>
                <button
                  onClick={this.deleteConfirmed}
                  className="btn btn-raised btn-danger ml-5"
                >
                  Izbriši oglas
                </button>
              </>
            )}
        </div>
      </div>
    );
  };
  render() {
    const { post, postedById, redirectToPosts } = this.state;
    if (redirectToPosts) {
      return <Redirect to={`/posts`} />;
    }
    return (
      <div className="container">
        <h2
          className="display-4 mt-5 mb-5 mx-auto"
          style={{ textAlign: "center" }}
        >
          {post.title}
        </h2>
        {this.renderPost(post, postedById)}
      </div>
    );
  }
}

export default SinglePost;
