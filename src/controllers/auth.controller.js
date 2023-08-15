import { userSchema, userSchemaSignIn } from "../libs/schema.validator.js";
import createError from "http-errors";
import User from "../models/User.js";
import Role from "../models/Role.js";
import { signAccessToken } from "../helpers/signAccessToken.js";

export const signup = async (req, res, next) => {
  try {
    const result = await userSchema.validateAsync(req.body);
    const userFoundEmail = await User.findOne({ email: result.email });
    if (userFoundEmail) throw createError.Conflict("El correo ya existe");
    const userFoundDocument = await User.findOne({ document: result.document });
    if (userFoundDocument)
      throw createError.Conflict("El numero de documento ya existe");

    const roleUser = await Role.findOne({ name: "user" });
    const user = new User({
      name: result.name,
      email: result.email,
      password: result.password,
      number: result.number,
      document: result.document,
      roles: roleUser._id,
      exam: {
        url: "",
      },
    });

    user.password = await user.generateHash(user.password);
    const newUser = await user.save();

    const token = await signAccessToken(newUser.id);

    if (result.roles) {
      const foundRoles = await Role.find({ name: { $in: result.roles } });
      newUser.roles = foundRoles.map((role) => role._id);
    } else {
      const role = await Role.findOne({ name: "user" });
      newUser.roles = [role._id];
    }

    res.status(200).json({ token });
  } catch (error) {
    if (error.isJoi) error.status = 400;
    next(error);
  }
};

export const signin = async (req, res, next) => {
  try {
    const result = await userSchemaSignIn.validateAsync(req.body);
    const userFound = await User.findOne({ email: result.email })
      .populate("roles")
      .exec();

    if (!userFound) throw createError.Unauthorized("El usuario no existe");
    const isMatch = await userFound.validPassword(result.password);

    if (!isMatch) throw createError.Unauthorized("Contraseña invalida");

    const token = await signAccessToken(userFound.id);
    res.json({ token });
  } catch (error) {
    if (error.isJoi) error.status = 400;
    next(error);
  }
};

export const profile = async (req, res) => {
  const user = await User.findOne({ _id: req.userId })
    .select("-password")
    .populate("roles")
    .exec();
  if (!user) return res.status(401).json({ message: "Usuario no encontrado" });
  res.json(user);
};

export const profileUpdate = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const updatedUser = await user.save();

    return res.json(updatedUser);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
