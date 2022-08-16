var _ = require('lodash');

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
    return sum = blogs.reduce(
        (previousValue, currentValue) => previousValue + currentValue.likes, 0);
};

const favoriteBlog = (blogs) => {
    return blogs.find(blog => blog.likes === blogs.reduce((acc, blog) => acc = acc > blog.likes ? acc : blog.likes, 0));
}

const mostBlogs = (blogs) => {
    let max = 0;
    Object.values(_.countBy(blogs.map(a => a.author))).forEach(obj => {
        if(max < obj){
            max = obj;
        }
    })
    let author = "";
    Object.entries(_.countBy(blogs.map(a => a.author))).map(a => 
        {if(a[1] === max){
            author = a[0]
        }});
    let object = { author: author, blogs: max} 
    return object;
}

const mostLikes = (blogs) => {
    let objects = []
    blogs.map(a =>  { objects.push({author : a.author, likes : a.likes})})
    
    let array = []
    for (let item of objects){
        if(!array.find(a => a.author === item.author)){
            array.push({author : item.author, likes: item.likes})
        }
        else{
            array.find(a => a.author === item.author).likes += item.likes;
        }
    }

    let max = Math.max(...array.map(o => o.likes))
    let object = { author: array.find(obj => obj.likes === max).author, likes: max}     
    return object;
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
};

