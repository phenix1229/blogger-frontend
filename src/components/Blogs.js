import React  from 'react';
import {searchIt} from '../services/search';
import BlogItem from './BlogItem';
import PropTypes from 'prop-types';

const Blogs = (props) => {
  return (
    <div>
      {props.blogs
      .filter(searchIt(props.searchTerm))
      .map((blog,idx)=>{
        return (
          <BlogItem  key={blog._id} onDelete={props.onDelete} onUpdate={props.onUpdate} blog={blog} />
        )
      })}
    </div>
  )
};

Blogs.propTypes = {
  onDelete: PropTypes.func,
  onUpdate: PropTypes.func,
  searchTerm: PropTypes.string,
  blogs: PropTypes.arrayOf(
    PropTypes.shape({
      author: PropTypes.string.isRequired,
      subject: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      article: PropTypes.string.isRequired,
      _id: PropTypes.string.isRequired
    })
  )
};

export default Blogs;