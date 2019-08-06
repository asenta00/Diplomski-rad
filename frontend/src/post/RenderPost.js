import React, { Component } from "react";
import { singlePost } from "./apiPost";
import { Link, Redirect } from "react-router-dom";

class RenderPost extends Component {
  constructor() {
    super();
    this.state = {
      post: "",
      postedById: "",
      redirectToPosts: false
    };
  }
  componentDidMount = () => {
    const postId = this.props.postId;
    singlePost(postId).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({ post: data, postedById: data.postedBy._id });
      }
    });
  };
  renderPost = () => {
    const { post } = this.state;
    if (post) {
      const i = this.props.postId;
      const posterId = post.postedBy ? `/user/${post.postedBy._id}` : "/posts";
      const posterName = post.postedBy ? post.postedBy.name : "Nepoznat";
      return (
        <div className="card-body" key={i}>
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
      );
    }
  };
  render() {
    const { redirectToPosts } = this.state;
    if (redirectToPosts) {
      return <Redirect to={`/posts`} />;
    }
    return <div>{this.renderPost()}</div>;
  }
}

export default RenderPost;
