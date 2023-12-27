const { ObjectId } = require('mongodb');
const db = require('../data/database');

/*
we now wanna define a blueprint for a post that describes the data that will eventually be stored in a post.
And that describes the functions, the so-called methods then if they are tied to an object that should be usable on a post.
We're grouping all the posts-related functionalities together into one class.
*/
class Post {
    constructor(title, content, id) { //I'll add id as a last parameter value here so that we could actually also omit it and just pass a title and content because when we create a post, we don't have an ID yet(we need ID for update post).
        this.title = title;  //'this' keyword allows us to refer to that to be created concrete object.
        this.content = content;
        this.id = id;  //may be undefined

        if(id){
            this.id = new ObjectId(id);
        }
    }

    /*
    The special thing about static methods is that you don't call them on the instantiated object, 
    but instead on the class itself ('Post.fetchAll()').
    However, We called save and delete on existing posts objects only.
    */
    static async fetchAll() {
        const posts = await db.getDb().collection('posts').find().toArray();
        return posts;
    }

    async fetchPost() {
        if(!this.id){
            return;
        }

        const postDocument = await db.getDb().collection('posts').findOne({ _id: this.id });
        this.title = postDocument.title;
        this.content = postDocument.content;
    }

    async save() {
        if(this.id){  //update post
            await db
            .getDb()
            .collection('posts')
            .updateOne(
              { _id: this.id },
              { $set: { title: this.title , content: this.content } }
            );

        } else{  //new post

            await db.getDb().collection('posts').insertOne({
                title: this.title,
                content: this.content
            });
        }

    }
    async delete() {
        if(!this.id){
            return;
        }
        await db.getDb().collection('posts').deleteOne({ _id: this.id });
    }


}

module.exports = Post;