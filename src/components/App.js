import React , {Component} from 'react';
import axios from 'axios';
// import blogs from '../data/data';
import Search from './Search';
import CreateBlog from './CreateBlog';
import Blogs from './Blogs';
import UpdateBlog from './UpdateBlog';

class App extends Component {
    constructor(){
        super()
        this.state = {
            blogs: [],
            searchTerm: '',
            toggle: true,
            blog: {}
        };
    };
    loadBlogs = () => {
        const url = '/blogs';
        axios.get(url).then((blogs) => {
            // return console.log(blogs.data);
            return this.setState({blogs: blogs.data})
        })
    }
    loadBlog = (id) => {
        axios.get(`/blog/${id}`).then((blog) => {
            // return console.log(blog.data)
            this.setState({
                toggle: false,
                blog: blog.data,
            })
        })
    }
    onDelete = (id) => {
        // const updatedBlogs = this.state.blogs.filter((item => item.objectId !== id));
        // this.setState({blogs:updatedBlogs});
        axios.delete(`/blog/${id}`).then(() => {
            this.loadBlogs();
        })
    };
    onUpdate = (id) => {
        // return console.log(`Update : ${id}`)
        this.loadBlog(id);
    };
    handleChange = (event) => {
        this.setState({searchTerm:event.target.value}, ()=> {
            console.log(this.state.searchTerm)
        })
    };
    handleCreateBlogSubmit = (event,blog) => {
        event.preventDefault();
        // let updatedBlogs=[blog, ...this.state.blogs];
        // this.setState({blogs: updatedBlogs}, () => {
        //     console.log(this.state.blogs)
        // })
        let axiosConfig = {
            headers:{
                'Content-Type':'application/json;charset=UTF-8',
                'Access-Control-Allow-Origin':'*'
            }
        };
        axios.post('/blog', blog, axiosConfig).then(() => {
            this.loadBlogs();
        });
    };
    handleUpdateBlogSubmit = (event, blog, id) => {
        event.preventDefault();
        this.setState({
            toggle: true
        });
        let axiosConfig = {
            headers:{
                'Content-Type':'application/json;charset=UTF-8',
                'Access-Control-Allow-Origin':'*'
            }
        };
        axios.put(`/blog/${id}`, blog, axiosConfig).then(() => {
            this.loadBlogs();
        })
    }
    componentDidMount(){
        this.loadBlogs();
    }
    render () {
        console.log('Blogs...', this.state.blogs)
        return (
            <div style={{
                marginTop:'100px',
                display:'flex', 
                justifyContent:'center', 
                alignItems: 'center', 
                flexDirection:'column'
            }}>
                <Search handleChange={this.handleChange} searchTerm={this.state.searchTerm} />
                <hr style={{width:'75%', color:'#3b3b3b', margin:'50px 0'}} />
                {this.state.toggle ? (<CreateBlog handleCreateBlogSubmit={this.handleCreateBlogSubmit} />) : (<UpdateBlog blog={this.state.blog} handleUpdateBlogSubmit={this.handleUpdateBlogSubmit} />)}
                <Blogs blogs={this.state.blogs} searchTerm={this.state.searchTerm} onDelete={this.onDelete} onUpdate={this.onUpdate} />
            </div>
        )
    };
};

export default App;