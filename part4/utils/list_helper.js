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


module.exports = {
    dummy,
    totalLikes
};