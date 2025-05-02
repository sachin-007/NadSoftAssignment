const studentModel = require('../models/studentModel');
   const markModel = require('../models/markModel');
   const { calculatePagination } = require('../utils/pagination');

   const studentController = {
       createStudent: async (req, res, next) => {
           try {
               const { name, email, age, parent_id } = req.body;
               const newStudent = await studentModel.create(name, email, age, parent_id);
               res.status(201).json(newStudent);
           } catch (error) {
               next(error);
           }
       },

       getAllStudents: async (req, res, next) => {
           try {
               const { page = 1, limit = 10 } = req.query;
               const { offset, totalPages } = calculatePagination(page, limit, await studentModel.countAll());
               const students = await studentModel.getAll(parseInt(limit), offset);

               res.json({
                   data: students,
                   totalCount: await studentModel.countAll(),
                   currentPage: parseInt(page),
                   totalPages,
               });
           } catch (error) {
               next(error);
           }
       },

       getStudentById: async (req, res, next) => {
           try {
               const { id } = req.params;
               const student = await studentModel.getById(id);
               if (!student) {
                   return res.status(404).json({ message: "Student not found" });
               }
               const marks = await markModel.getByStudentId(id);
               res.json({ student, marks });
           } catch (error) {
               next(error);
           }
       },

       updateStudent: async (req, res, next) => {
           try {
               const { id } = req.params;
               const { name, email, age, parent_id } = req.body;
               const updatedStudent = await studentModel.update(id, name, email, age, parent_id);
               if (!updatedStudent) {
                   return res.status(404).json({ message: "Student not found" });
               }
               res.json(updatedStudent);
           } catch (error) {
               next(error);
           }
       },

       deleteStudent: async (req, res, next) => {
           try {
               const { id } = req.params;
               const deletedStudent = await studentModel.delete(id);
               if (!deletedStudent) {
                   return res.status(404).json({ message: "Student not found" });
               }
               res.json({ message: "Student deleted" });
           } catch (error) {
               next(error);
           }
       },
   };

   module.exports = studentController;