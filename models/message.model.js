import mongoose from "mongoose";



const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Yeh 'User' collection se connected rahega
      required: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
      required: true,
    }
  },
  { timestamps: true } // Yeh createdAt & updatedAt fields automatically add karega
);

const Message = mongoose.model("Message", messageSchema);
export default Message;
