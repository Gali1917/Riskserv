import { Schema, model } from "mongoose";

const examSchema = new Schema(
  {
    pdf: {
      url: String,
      public_id: String,
    },
    user: {
      ref: "User",
      type: Schema.Types.ObjectId,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("Exam", examSchema);
