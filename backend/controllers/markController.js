const markModel = require('../models/markModel');

   const markController = {
       createMark: async (req, res, next) => {
           try {
               const { student_id, subject, score } = req.body;
               const newMark = await markModel.create(student_id, subject, score);
               res.status(201).json(newMark);
           } catch (error) {
               next(error);
           }
       },

       getMarksByStudentId: async (req, res, next) => {
           try {
               const { student_id } = req.params;
               const marks = await markModel.getByStudentId(student_id);
               res.json(marks);
           } catch (error) {
               next(error);
           }
       },

        updateMark: async (req, res, next) => {
            try {
                const { mark_id } = req.params;
                const { subject, score } = req.body;
                const updatedMark = await markModel.update(mark_id, subject, score);
                if (!updatedMark) {
                    return res.status(404).json({ message: "Mark not found" });
                }
                res.json(updatedMark);
            } catch (error) {
                next(error);
            }
        },

        deleteMark: async (req, res, next) => {
            try {
                const { mark_id } = req.params;
                const deletedMark = await markModel.delete(mark_id);
                if (!deletedMark) {
                    return res.status(404).json({ message: "Mark not found" });
                }
                res.json({ message: "Mark deleted" });
            } catch (error) {
                next(error);
            }
        },

   };

   module.exports = markController;