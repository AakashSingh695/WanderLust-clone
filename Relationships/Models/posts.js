const mongoose = require("mongoose");
const {Schema} = mongoose;


const MONGO_URL ="mongodb://127.0.0.1:27017/relationDemo";


main().then(()=>{
    console.log("connected to DB");
}).catch(err=>console.log(err));
async function main(){
   await  mongoose.connect(MONGO_URL);
}

const userSchema = new Schema({
    username: String,
    email: String,
});

const postSchema = new Schema({
    content: String,
    likes: Number,
    user: {
        type: Schema.Types.ObjectId,
        ref:"User"
    }
});

const User = mongoose.model("User", userSchema);
const Post = mongoose.model("Post", postSchema);


const addData = async () =>{
    let user1 = new User({
        username: "Aakash",
        email: "aakash@gmail.com"
    });

    // let post1 = new Post({
    //     content: "hello world!",
    //     likes: 7
    // });

     let post2 = new Post({
        content: "Byy byy",
        likes: 10
    });

    post2.user = user1;
    await user1.save();
    await post2.save();

    let result = await Post.find({});
    console.log(result);
}

const getData = async ()=>{
    let result = await Post.findOne({}).populate("user","username");
    console.log(result);
}

getData();