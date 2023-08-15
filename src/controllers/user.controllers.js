import Exam from "../models/Exam.js";
import User from "../models/User.js";

export const createUser = (req, res) => {
  res.json("Usuario creado");
};

export const deleteUserAndTasks = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    const exam = await Exam.find({ _id: { $in: user.exam } });
    for (const exam of ex) {
      await ex.deleteOne();
    }
    await user.deleteOne();
    return res.json({ message: "Usuario y examen eliminados con exito" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getUserId = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId)
    .populate([
      {
        path: 'roles'
      },{
        path: 'exam'
      }
    ])
    .exec();
    if (!user) return res.sendStatus(404);
    return res.json( user );
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const usuarios = await User.find()
    .populate([
      {
        path: 'roles'
      },{
        path: 'exam'
      }
    ]);
    res.json(usuarios);
  } catch (error) {
    console.log(error);
  }
};
