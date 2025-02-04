const _ = require("lodash");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const likes = blogs.reduce((total, current) => {
    return total + current.likes;
  }, 0);
  return likes;
};

const favoriteBlog = (blogs) => {
  const likes = blogs.map((blog) => {
    return blog.likes;
  });

  const maxLike = likes.reduce((a, b) => Math.max(a, b), -Infinity);

  const favoriteBlog = blogs.map((blog) => {
    if (blog.likes === maxLike) {
      return blog;
    } else {
      return;
    }
  });

  for (let i = 0; i < favoriteBlog.length; i++) {
    if (favoriteBlog[i] === undefined || favoriteBlog[i] === null) {
      continue;
    } else {
      return {
        title: favoriteBlog[i].title,
        author: favoriteBlog[i].author,
        likes: favoriteBlog[i].likes,
      };
    }
  }
};

const biggerList = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 14,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0,
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0,
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0,
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 12,
    __v: 0,
  },
];

const mostBlogs = (blogs) => {
  const authorCount = _.countBy(blogs, "author");

  const maxAuthor = Object.keys(authorCount).reduce(function (a, b) {
    return authorCount[a] > authorCount[b] ? a : b;
  });
  return {
    author: maxAuthor,
    blogs: authorCount[maxAuthor],
  };
};

const mostLikes = (blogs) => {
  const authorCount = _.groupBy(blogs, "author");

  const likes = _.mapValues(authorCount, (o) =>
    o.reduce((acc, cur) => acc + cur.likes, 0),
  );
  const mostLikedAuthor = Object.keys(likes).reduce((a, b) =>
    likes[a] > likes[b] ? a : b,
  );
  return {
    author: mostLikedAuthor,
    likes: likes[mostLikedAuthor],
  };
};

module.exports = {
  totalLikes,
  dummy,
  favoriteBlog,
  mostBlogs,
};
