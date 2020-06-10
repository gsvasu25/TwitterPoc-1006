import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Delayed from "./Delayed";
class PostsGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      errorMsg: false,
      isLoading: true,
      searchKey: "",
    };
    this.divClickHandle = this.divClickHandle.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.renderChildren = this.renderChildren.bind(this);
  }
  divClickHandle(val) {
    this.props.gridShow(false, val.currentTarget.dataset.postid);
  }
  handleSearch() {
    this.fetchData();
  }
  handleChange = (event) => {
    this.setState({ searchKey: event.target.value });
  };
  renderChildren() {
    const posts = this.state.posts;
    posts.map((post, i) =>
      setTimeout(() => {
        <div
          onClick={this.divClickHandle}
          key={post.id}
          data-postid={post.id}
          className="col-md-4"
        >
          <div className="title">
            <div className="post-user">UserID:{post.userId}</div>
            <div>Title:{post.title}</div>
          </div>
        </div>;
      }, 1000 * posts.length - 1000 * i)
    );
  }
  fetchData() {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        let data = response.data;
        if (this.state.searchKey != "") {
          let searchRecords = [];
          for (let i = 0; i < data.length; i++) {
            if (
              data[i].title.includes(this.state.searchKey) ||
              data[i].body.includes(this.state.searchKey)
            )
              searchRecords.push(data[i]);
            this.setState({
              posts: searchRecords.sort((a, b) => b.id - a.id),
              isLoading: false,
            });
          }
        } else
          this.setState({
            posts: data.sort((a, b) => b.id - a.id),
            isLoading: false,
          });
      })
      .catch((error) => {
        this.setState({ errorMsg: true, isLoading: false });
      });
  }
  componentDidMount() {
    this.fetchData();
  }
  render() {
    const { posts, isLoading, errorMsg } = this.state;

    return (
      <div>
        <nav className="navbar navbar-light bg-light justify-content-between">
          <Link to="/login">Logout</Link>
          <div className="form-inline">
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              onChange={this.handleChange}
            />
            <button
              className="btn btn-outline-success my-2 my-sm-0"
              type="submit"
              onClick={this.handleSearch}
            >
              Search
            </button>
          </div>
        </nav>
        {!isLoading && !errorMsg && (
          <div className="row">
            {posts.length
              ? posts.map((post, i) => (
                  <div
                    style={{
                      transitionDelay: `${i * 5000}ms`,
                      transitionDuration: `${i * 5000}ms`,
                    }}
                    onClick={this.divClickHandle}
                    key={post.id}
                    data-postid={post.id}
                    className="col-md-4"
                  >
                    <div className="title">
                      <div className="post-user">UserID:{post.userId}</div>
                      <div>Title:{post.title}</div>
                    </div>
                  </div>
                ))
              : null}
          </div>
        )}
        {isLoading && (
          <div className="col-md-12 spinner">
            <div className="spinner-border text-primary" role="status">
              <span className="sr-only">Loading...</span>
            </div>{" "}
          </div>
        )}
        {errorMsg && !isLoading && (
          <div className="col-md-12 spinner">
            <div className="alert alert-danger" role="alert">
              Something Went Wrong.
            </div>{" "}
          </div>
        )}
      </div>
    );
  }
}

export default PostsGrid;
