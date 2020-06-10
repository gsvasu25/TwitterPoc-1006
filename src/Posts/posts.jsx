import React, { Component } from "react";
import PostsGrid from "./postsGrid";
import PostDetail from "./postDetail";
class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gridShow: true,
      detailsShow: false,
      postId: 0,
    };
    this.gridShow = this.gridShow.bind(this);
  }
  gridShow(val, postid) {
    this.setState({ gridShow: val, detailsShow: !val, postId: postid });
  }

  render() {
    const { gridShow, detailsShow, postId } = this.state;
    return (
      <div>
        {gridShow && <PostsGrid gridShow={this.gridShow} />}
        {detailsShow && <PostDetail postId={postId} gridShow={this.gridShow} />}
      </div>
    );
  }
}
export { Posts };
