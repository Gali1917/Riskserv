import { Schema, model } from "mongoose";

export const ROLES = ["user", "admin", "moderator"];
const roleSchema = Schema({
    name: String
}, {
    versionKey: false
});

export default model("Role", roleSchema);