const _ = require('lodash');

const dummy = () => {
    return 1;
};
const totalLikes = (blogs) => {
    let sum = 0;

    blogs.forEach(b => {
        sum += b.likes;
    });
    return sum;
};

const favoriteBlog = (blogs) => {

    if (blogs.length === 0) {
        return null;
    }

    let maxLikes = blogs[0].likes;
    let { title, author, likes } = blogs[0];

    blogs.forEach(b => {
        if(b.likes > maxLikes) {
            maxLikes = b.likes;
            ({ title, author, likes } = b);
        }
    });
    return { title, author, likes };
};

const mostBlogs = (blogs) => {

    if (blogs.length === 0) {
        return null;
    }

    const groupedAuthors = _.groupBy(blogs, 'author');
    const authorWithMostBlogs = _.maxBy(Object.keys(groupedAuthors, author => groupedAuthors[author].length));
    const numberOfBlogs = groupedAuthors[authorWithMostBlogs].length;

    return {
        author: authorWithMostBlogs,
        blogs: numberOfBlogs,
    };
};

const mostLikes = (blogs) => {
    if (blogs.length === 0) {
        return null;
    }
    const groupedAuthors = _.groupBy(blogs, 'author');
    const authorWithMostLikes = _.maxBy(Object.keys(groupedAuthors), author =>
        _.sumBy(groupedAuthors[author], 'likes'));
    const totalLikes = _.sumBy(groupedAuthors[authorWithMostLikes], 'likes');


    return {
        author: authorWithMostLikes,
        likes: totalLikes,
    };
};

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
};