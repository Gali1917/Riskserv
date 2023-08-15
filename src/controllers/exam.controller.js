import User from "../models/User.js";
import Exam from "../models/Exam.js";
import { SECRET_KEY } from "../config/config.js";
import jwt from "jsonwebtoken";

export const getExams = async (req, res) => {
  try {
    const exam = await Exam.find()
      .populate([
        {
          path: "user",
        },
      ])
      .exec();
    res.send(exam);
  } catch (error) {
    return res
      .sendStatus(500)
      .json({ message: "Error al obtener los comentarios" });
  }
};

export const getExam = async (req, res) => {
  const examId = req.params.examId;
  try {
    if (!examId) {
      return res.status(404).json({ message: "Datos erroneos." });
    }
    const exam = await Exam.findById(examId).populate("user").exec();

    if (!exam) {
      return res.status(404).json({ message: "Examen no encontrado." });
    }

    res.send(exam);
  } catch (error) {
    return res.sendStatus(500).json({ message: "Error al obtener el examen." });
  }
};

export const createExam = async (req, res) => {
  try {
    const { pdf, userId } = req.body;

    const newExam = new Exam({
      pdf,
      userId,
    });

    await newExam.save();

    await User.findByIdAndUpdate(
      userId,
      { $addToSet: { exam: newExam._id } },
      { new: true }
    );

    const result = await Exam.findById(newExam._id).populate([
      { path: "user" },
    ]);
    return res.json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const updateExam = async (req, res) => {
  try {
    const exam = await Exam.findById(req.params.id);

    if (!exam) {
      return res.status(404).json({ message: "Examen no encontrado." });
    }

    exam.url = req.body.url || exam.url;

    const updatedExam = await exam.save();

    return res.json(updatedExam);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const removeExam = async (req, res) => {
  try {
    const removedExam = await Exam.findByIdAndDelete(req.params.id);
    if (!removedExam) return res.sendStatus(404);

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
