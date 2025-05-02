const express = require('express');
   const cors = require('cors');
   const studentRoutes = require('./routes/studentRoutes');
   const markRoutes = require('./routes/markRoutes');
   const errorHandler = require('./middlewares/errorHandler');

   const app = express();
   const port = process.env.PORT || 5000;

   app.use(cors());
   app.use(express.json());

   app.use('/students', studentRoutes);
   app.use('/marks', markRoutes);

   app.use(errorHandler);

   app.listen(port, () => {
       console.log(`Server is running on port ${port}`);
   });