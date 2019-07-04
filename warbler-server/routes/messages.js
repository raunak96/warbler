const router=require("express").Router({mergeParams:true}); //allows to use req.params.id
const {createMessage,deleteMessage,getMessage,updateMessage}=require("../handlers/messages");

//for route like /api/users/:id/messages
router.route("/").post(createMessage);


//for routes like /api/users/:id/messages/:message_id
router.route("/:message_id")
.get(getMessage)
.put(updateMessage)
.delete(deleteMessage);

module.exports=router;