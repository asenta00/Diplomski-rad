import React, { Component } from "react";
import { Link } from "react-router-dom";

class ShowPosts extends Component {
  render() {
    const { posts } = this.props;
    return (
      <div className="mx-auto">
        {posts.map((post, i) => (
          <div key={i}>
            <div>
              <Link to={`/post/${post._id}`}>
                <div>
                  <p className="lead">{post.title}</p>
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default ShowPosts;
