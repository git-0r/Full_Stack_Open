const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    let sum = 0
    blogs.forEach(blog => sum += blog.likes)

    return blogs.length === 0 ? 0 : sum
}

const favouriteBlog = (blogs) => {

    const sortedArray = [...blogs].sort((a, b) => b.likes - a.likes)

    switch (blogs.length) {

        case 0:
            return "none"
            break;
        case 1:
            return blogs[0]
            break;
        default:
            return sortedArray[0];
    }
}

const mostBlogs = (blogs) => {

    const reducedObj = {}

    blogs.forEach(blog => {
        reducedObj[blog.author] === undefined ? reducedObj[blog.author] = 1 : reducedObj[blog.author] += 1

    })

    const totalBlogsArray = []

    for (const author in reducedObj) [
        totalBlogsArray.push({ author: `${author}`, blogs: reducedObj[author] })
    ]

    const sortedArray = [...totalBlogsArray].sort((a, b) => b.blogs - a.blogs)

    switch (blogs.length) {

        case 0:
            return "none"
            break;
        case 1:
            return blogs[0]
            break;
        default:
            return sortedArray[0];
    }
}


const mostLikes = (blogs) => {

    const reducedObj = {}

    blogs.forEach(blog => {
        reducedObj[blog.author] === undefined ? reducedObj[blog.author] = blog.likes : reducedObj[blog.author] += blog.likes

    })

    const totalLikesArray = []

    for (const author in reducedObj) [
        totalLikesArray.push({ author: `${author}`, likes: reducedObj[author] })
    ]

    const sortedArray = [...totalLikesArray].sort((a, b) => b.likes - a.likes)

    switch (blogs.length) {

        case 0:
            return "none"
            break;
        case 1:
            return blogs[0]
            break;
        default:
            return sortedArray[0];
    }
}

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog,
    mostBlogs,
    mostLikes
}