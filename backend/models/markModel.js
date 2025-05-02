const pool = require('../config/db');

   const markModel = {
       create: async (student_id, subject, score) => {
           const result = await pool.query(
               "INSERT INTO marks (student_id, subject, score) VALUES($1, $2, $3) RETURNING *",
               [student_id, subject, score]
           );
           return result.rows[0];
       },

       getByStudentId: async (student_id) => {
           const result = await pool.query("SELECT * FROM marks WHERE student_id = $1", [student_id]);
           return result.rows;
       },

       getById: async (mark_id) => {
        const result = await pool.query("SELECT * FROM marks WHERE mark_id = $1", [mark_id]);
        return result.rows[0];
        },

        update: async (mark_id, subject, score) => {
            const result = await pool.query(
                "UPDATE marks SET subject = $1, score = $2 WHERE mark_id = $3 RETURNING *",
                [subject, score, mark_id]
            );
            return result.rows[0];
        },

        delete: async (mark_id) => {
            const result = await pool.query("DELETE FROM marks WHERE mark_id = $1 RETURNING *", [mark_id]);
            return result.rows[0];
        },
        
   };

   module.exports = markModel;