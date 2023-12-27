const Post = require("../models/post");
const validationSession = require("../util/validation-session");
const validation = require("../util/validation");

const getHome = (req, res) => {
  res.render("welcome",);
};

const getAdmin = async (req, res) => {
  if (!res.locals.isAuth) {
    return res.status(401).render("401");
  }

  const posts = await Post.fetchAll();

  const sessionErrorData = validationSession.getSessionErrorData(req, {
    title: "",
    content: "",
  });

  res.render("admin", {
    posts: posts,
    inputData: sessionErrorData,
  });
};

const getPostItem = async (req, res) => {
  const post = new Post(null, null, req.params.id);
  await post.fetchPost(); //fetch the other data: title and content.

  if (!post.title || !post.content) {
    //check if fetchPost() succeed to populate post in title and content.
    return res.render("404"); // 404.ejs is missing at this point - it will be added later!
  }

  const sessionErrorData = validationSession.getSessionErrorData(req, {
    title: post.title,
    content: post.content,
  });

  res.render("single-post", {
    post: post,
    inputData: sessionErrorData,
  });
};

const createPost = async (req, res) => {
  const enteredTitle = req.body.title;
  const enteredContent = req.body.content;

  if (!validation.postIsValid(enteredTitle, enteredContent)) {
    validationSession.flashErrorsToSession(
      req,
      {
        message: "Invalid input - please check your data.",
        title: enteredTitle,
        content: enteredContent,
      },
      () => {
        res.redirect("/admin");
      }
    );

    return; // return res.redirect('/admin'); => Has the same effect
  }

  const newPost = new Post(enteredTitle, enteredContent);
  await newPost.save(); //we can add 'await' because save is async function and all async function return promise.

  res.redirect("/admin");
};

const updatePost = async (req, res) => {
  const enteredTitle = req.body.title;
  const enteredContent = req.body.content;

  if (!validation.postIsValid(enteredTitle, enteredContent)) {
    validationSession.flashErrorsToSession(
      req,
      {
        message: "Invalid input - please check your data.",
        title: enteredTitle,
        content: enteredContent,
      },
      () => {
        res.redirect(`/posts/${req.params.id}/edit`);
      }
    );

    return;
  }

  const post = new Post(enteredTitle, enteredContent, req.params.id);
  post.save();

  res.redirect("/admin");
};

const deletePost = async (req, res) => {
  const postDocument = new Post(null, null, req.params.id); //I create just to delete it.
  postDocument.delete();

  res.redirect("/admin");
};

module.exports = {
  //We export this in an object so that we can group multiple exported functions together.
  getHome: getHome,
  getAdmin: getAdmin,
  getPostItem: getPostItem,
  createPost: createPost,
  updatePost: updatePost,
  deletePost: deletePost,
};
