import axios from 'axios';

   const API_BASE_URL = 'http://localhost:5000/students';

   export const fetchStudents = async (page = 1, limit = 5) => {
       try {
           const response = await axios.get(`${API_BASE_URL}?page=${page}&limit=${limit}`);
           return response.data;
       } catch (error) {
           throw error;
       }
   };

   export const getStudentById = async (id) => {
       try {
           const response = await axios.get(`${API_BASE_URL}/${id}`);
           return response.data.student;
       } catch (error) {
           throw error;
       }
   };

   export const createStudent = async (studentData) => {
       try {
           const response = await axios.post(API_BASE_URL, studentData);
           return response.data;
       } catch (error) {
           throw error;
       }
   };

   export const updateStudent = async (id, studentData) => {
       try {
           const response = await axios.put(`${API_BASE_URL}/${id}`, studentData);
           return response.data;
       } catch (error) {
           throw error;
       }
   };

   export const deleteStudent = async (id) => {
       try {
           const response = await axios.delete(`${API_BASE_URL}/${id}`);
           return response.data;
       } catch (error) {
           throw error;
       }
   };