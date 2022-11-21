const express = require('express');
const router = express.Router();
const Chat = require("../models/chatModel");
//const {chats}=require("../models/data");
const User = require("../models/User");
const Conversation = require("../models/Conversation")
const UserProfile = require("../models/UserProfile")
const mongoose = require('mongoose')

// router.get('/', (req, res)=>{
//     console.log("Hello",req.params);
//     res.send(chats);
// })

// router.post('/', async(req, res)=>{
//     //console.log("Hello",req.params);
//     // res.send(chats);
//     const { userId,userId1 } = req.body;

//     console.log("Here user ID is",userId);
//     //console.log("req._id",req);

//   if (!userId) {
//     console.log("UserId param not sent with request");
//     return res.sendStatus(400);
//   }

//   var isChat = await Chat.find({
//     //isGroupChat: false,
//     $and: [
//       { users: { $elemMatch: { $eq: userId1 } } },
//       { users: { $elemMatch: { $eq: userId } } },
//     ],
//   })
//     .populate("users", "-password")
//     .populate("latestMessage");

//   isChat = await User.populate(isChat, {
//     path: "latestMessage.sender",
//     select: "name pic email",
//   });

//   if (isChat.length > 0) {
//     res.send(isChat[0]);
//   } else {
//     var chatData = {
//       chatName: "sender",
//       //isGroupChat: false,
//       users: [userId1, userId],
//     };
//     console.log("Chat data here is ",chatData);
//     try {
//       const createdChat = await Chat.create(chatData);
//       console.log("createdChat data here is ",createdChat);
    
//       res.status(200).json(createdChat);
//     } catch (error) {
//       res.status(400);
//       throw new Error(error.message);
//     }
//   }
// });

// router.get('/', async(req, res)=>{
//   try{
//     // results=Chat.find();
//     // res.status(200).send(results);

//     Chat.find({})
//     .populate("latestMessage")
//     .then((ans) => {
//       //console.log(ans);
//       res.status(200).send(ans);
//   });

//     // Chat.find()
//     //   .populate("users", "-password")
//     //   .populate("latestMessage")
//     //   .sort({ updatedAt: -1 })
//     //   .then(async (results) => {
//     //     results = await User.populate(results, {
//     //       path: "latestMessage.sender",
//     //       select: "name pic email",
//     //     });
//     //     res.status(200).send(results);
//     //   });

//   }catch (error) {
//     res.status(400);
//     throw new Error(error.message);
//   }
// });


// router.get('/', (req, res) => {
//     //const { query } = req.query;
//     const userProfiles = []
//     User.find({ role: "trainer" }).populate("profile").then(user => {
//         if (!user) {
//             res.status(404).json({ data: 'No videos found for your search query' })
//         }
//         else {
//             user.forEach(profile => {
//                 userProfiles.push(profile.profile)
//             })
//             return res.status(200).json({ data: userProfiles })
//         }
//     })
// });


// router.get('/:id', (req, res)=>{
//     const singleChat=chats.find((c)=>c._id===req.params._id);
//     console.log("Hello",req.params);
//     console.log("Hello",req.params);
//     res.send(singleChat);
// })

router.post('/add', (req,res) => {
  var {userId} = req.body
  var {trainerId} = req.body
  var {conversationId} = req.body
  userId = userId.trim()
  trainerId = trainerId.trim()
  conversationId = conversationId.trim()
  var hex = /[0-9A-Fa-f]{6}/g;
  Conversation.find({userId}).then((user) => {
    if(user)
    {
      var found = false
      trainerId = (hex.test(trainerId))? mongoose.Types.ObjectId(trainerId) : trainerId;
      user.forEach((u) => {
        if(u.chatWith.equals(trainerId)) {
          found = true
        }
      })
      if(!found){
        userid = (hex.test(userId))? mongoose.Types.ObjectId(userId) : userId;
        const newChat = new Conversation({
          userId: userId,
          chatWith: trainerId,
          conversationId: conversationId
        })
  
        newChat.save()
        .then(user => { return res.json(user.conversationId) })
        .catch(err => console.log(err));
      }
      else {
        user.forEach((u) => {
          if(u.chatWith.equals(trainerId)) {
            return res.status(200).json({conversationId: u.conversationId})
          }
        })
      }
    }
    else {
      userid = (hex.test(userId))? mongoose.Types.ObjectId(userId) : userId;
      trainerId = (hex.test(trainerId))? mongoose.Types.ObjectId(trainerId) : trainerId;
      const newChat = new Conversation({
        userId: userId,
        chatWith: trainerId,
        conversationId: conversationId
      })

      newChat.save()
      .then(user => { return res.json(user) })
      .catch(err => console.log(err));
    }
  })
})

router.get('/list', (req, res) => {
  const {userId} = req.params
  Conversation.find(userId).then((user) => {
    if(!user)
    {
      return res.status(404).json("No data")
    }
    else {
      return res.status(200).json({list: user})
    }
  })
})

router.get('/userid', (req, res) => {
  const {email} = req.query.email
  User.findOne(email).then((user) => {
    if(!user)
    {
      return res.status(404).json("No data")
    }
    else {
      return res.status(200).json({user: user._id})
    }
  })
})

router.get('/trainerid', (req, res) => {
  const {email} = req.query.email
  UserProfile.findOne(email).then((user) => {
    if(!user)
    {
      return res.status(404).json("No data")
    }
    else {
      return res.status(200).json({user: user._id})
    }
  })
})

router.get('/trainerlist', (req, res) => {
  const {chatWith} = req.query
  var hex = /[0-9A-Fa-f]{6}/g;
  var trainerId = (hex.test(chatWith))? mongoose.Types.ObjectId(chatWith) : chatWith;
  Conversation.find({chatWith: trainerId}).then((user) => {
    if(!user)
    {
      return res.status(404).json("No data")
    }
    else {
      return res.status(200).json({list: user})
    }
  })
})

module.exports = router;
