import React, { Component } from "react";
import axios from "axios";

class PostDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: [],
      errorMsg: false,
      isLoading: true,
    };
    this.btnBackClickHandle = this.btnBackClickHandle.bind(this);
  }
  componentDidMount() {
    let URL = "https://jsonplaceholder.typicode.com/posts/" + this.props.postId;
    axios
      .get(URL)
      .then((response) => {
        this.setState({ post: response.data, isLoading: false });
      })
      .catch((error) => {
        this.setState({ errorMsg: true, isLoading: false });
      });
  }
  btnBackClickHandle() {
    this.props.gridShow(true, 0);
  }

  render() {
    const { post, errorMsg, isLoading } = this.state;
    return (
      <div>
        <div className="row">
          <div className="col-md-12">
            <button
              onClick={this.btnBackClickHandle}
              className="btn btn-back btn-primary"
            >
              Back
            </button>
          </div>
          {isLoading && (
            <div className="col-md-12 spinner">
              <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
              </div>{" "}
            </div>
          )}
          {!errorMsg && !isLoading && (
            <div className="col-md-12">
              <div className="shadow">
                <div className="post-box">
                  <ul className="list-group">
                    <li className="list-group-item">
                      <b>
                        <u>UserId:</u>{" "}
                      </b>
                      {post.userId}
                    </li>
                    <li className="list-group-item">
                      <b>
                        <u>Id:</u>{" "}
                      </b>
                      {post.id}
                    </li>
                    <li className="list-group-item">
                      <b>
                        <u>Title:</u>{" "}
                      </b>
                      {post.title}
                    </li>
                    <li className="list-group-item">
                      <b>
                        <u>Body:</u>{" "}
                      </b>
                      {post.body}
                    </li>
                  </ul>
                </div>{" "}
              </div>{" "}
            </div>
          )}
          {errorMsg && !isLoading && (
            <div className="col-md-12 spinner">
              <div class="alert alert-danger" role="alert">
                Something Went Wrong.
              </div>{" "}
            </div>
          )}
        </div>
      </div>
    );
  }
}
export default PostDetail;
