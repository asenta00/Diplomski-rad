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
        console.log(data.postedBy._id);
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
    console.log(post);
    const posterId = post.postedBy ? `/user/${post.postedBy._id}` : "/posts";
    console.log("saljem", postedById);
    console.log(posterId);
    const posterName = post.postedBy ? post.postedBy.name : "Nepoznat";
    return (
      //   <div className="card col-md-4 mt-1 mb-1 ml-1 mr-1 mx-auto">
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
        <p className="font-italic mark">
          <b>Autor:</b> <Link to={`${posterId}`}> {posterName} </Link>
          {new Date(post.created).toLocaleDateString()}
        </p>
        <hr />
        <div className="d-inline-block">
          <Link to={`/posts`} className="btn btn-raised btn-primary">
            Svi oglasi
          </Link>
          {(isAuthenticated().user._id == postedById ||
            isAuthenticated().user.role === "admin") &&
            isAuthenticated().user && (
              <>
                <Link
                  to={`/post/edit/${post._id}`}
                  className="btn btn-raised btn-info ml-5"
                >
                  Uredi post
                </Link>
                <button
                  onClick={this.deleteConfirmed}
                  className="btn btn-raised btn-danger ml-5"
                >
                  Izbriši post
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
        <h2 className="display-4 mt-5 mb-5 mx-auto">{post.title}</h2>
        {this.renderPost(post, postedById)}
      </div>
    );
  }
}

export default SinglePost;
