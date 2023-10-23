const dummy = (blogs) => {
    return 1;
};
const totalLikes = (posts) => {
    let sum = 0;

    posts.forEach(p => {
        sum += p.likes;
    });
    return sum;
};

const favoriteBlog = (blogs) => {

    if (blogs.length === 0) {
        return null;
    }

    let maxLikes = -1;
    let favorite = null;

    blogs.forEach(b => {
        if(b.likes > maxLikes) {
            maxLikes = b.likes;
            favorite = {
                title: b.title,
                author: b.author,
                likes: b.likes
            };
        }
    });
    return favorite;
};

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
};