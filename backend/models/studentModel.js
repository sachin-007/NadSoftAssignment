const pool = require('../config/db');

   const studentModel = {
       create: async (name, email, age, parent_id) => {
           const result = await pool.query(
               "INSERT INTO students (name, email, age, parent_id) VALUES($1, $2, $3, $4) RETURNING *",
               [name, email, age, parent_id]
           );
           return result.rows[0];
       },

       getAll: async (limit, offset) => {
           const result = await pool.query(
               "SELECT * FROM students LIMIT $1 OFFSET $2",
               [limit, offset]
           );
           return result.rows;
       },

       countAll: async () => {
           const result = await pool.query('SELECT COUNT(*) FROM students');
           return result.rows[0].count;
       },

       getById: async (id) => {
           const result = await pool.query("SELECT * FROM students WHERE student_id = $1", [id]);
           return result.rows[0];
       },

       update: async (id, name, email, age, parent_id) => {
           const result = await pool.query(
               "UPDATE students SET name = $1, email = $2, age = $3, parent_id = $4 WHERE student_id = $5 RETURNING *",
               [name, email, age, parent_id, id]
           );
           return result.rows[0];
       },

       delete: async (id) => {
           const result = await pool.query("DELETE FROM students WHERE student_id = $1 RETURNING *", [id]);
           return result.rows[0];
       },
   };

   module.exports = studentModel;