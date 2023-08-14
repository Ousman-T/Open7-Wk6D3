const express = require('express');
const router = express.Router();
const User = require('../models/User');

/**
 * ? Create a User
 */
router.post('/', async (req, res, next) => {
    try{
        const user = await User.create(req.body);
        if(!user){
            throw new Error('No User Created!');
        }
        res.send(user.username);
    }catch(error){
        next(error);
    }
});

// ? READ ALL USERS
router.get("/", async (req, res, next) => {
    try {
      const users = await User.findAll({});
      if (!users) {
        throw new Error("No users found");
      }
      res.send(users);
    } catch (error) {
      next(error);
    }
  });
  
//   ? READ ONE USER
  router.get("/:username", async (req, res, next) => {
    try {
      const user = await User.findOne({
        where: { username: req.params.username },
      });
      if (!user) {
        throw new Error("No user found");
      }
      res.send(user);
    } catch (error) {
      next(error);
    }
  });
  
//   ! UPDATE USER
  router.put("/:username", async (req, res, next) => {
    try {
      const updated = await User.update(req.body, {
        where: { username: req.params.username },
      });
      console.log(updated);
      if (updated[0] === 0) {
        throw new Error("No update made");
      }
      res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  });
  
//   ! DELETE USER
  router.delete("/:username", async (req, res, next) => {
    try {
      const deleted = await User.destroy({
        where: { username: req.params.username },
      });
      if (deleted === 0) {
        throw new Error("No user deleted");
      }
      res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  });
  
  module.exports = router;