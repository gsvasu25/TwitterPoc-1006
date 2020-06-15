import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
class PostsGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      errorMsg: false,
      isLoading: true,
      searchKey: "",
      renderedPosts: [],
      itemsRendered: 0,
    };
    this.divClickHandle = this.divClickHandle.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.updateRenderedPosts = this.updateRenderedPosts.bind(this);
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
        this.scheduleNextPost();
      })
      .catch((error) => {
        this.setState({ errorMsg: true, isLoading: false });
      });
  }
  componentDidMount() {
    this.fetchData();
  }

  scheduleNextPost() {
    this.timer = setTimeout(this.updateRenderedPosts, 500);
  }

  updateRenderedPosts() {
    const itemsRendered = this.state.itemsRendered;
    const updatedState = {
      renderedPosts: this.state.renderedPosts.concat(
        this.state.posts[this.state.itemsRendered]
      ),
      itemsRendered: itemsRendered + 1,
    };
    this.setState(updatedState);
    if (updatedState.itemsRendered < this.state.posts.length) {
      this.scheduleNextPost();
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }
  render() {
    const { posts, isLoading, errorMsg } = this.state;
    console.log(this.state.renderedPosts);
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
            {this.state.renderedPosts
              ? this.state.renderedPosts.map((post, i) => (
                  <div
                    onClick={this.divClickHandle}
                    key={post.id}
                    data-postid={post.id}
                    className="col-md-4 "
                  >
                    <div className="shadow">
                      <div className="post-box">
                        <div className="title">
                          <div className="post-user">UserID: {post.userId}</div>
                          <div>
                            <b>Title: </b>
                            {post.title}
                          </div>
                        </div>
                      </div>
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
