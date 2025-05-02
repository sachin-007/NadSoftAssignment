import axios from 'axios';

   const API_BASE_URL = 'http://localhost:5000/marks';

   export const getMarksByStudentId = async (studentId) => {
       try {
           const response = await axios.get(`${API_BASE_URL}/student/${studentId}`);
           return response.data;
       } catch (error) {
           throw error;
       }
   };

   export const createMark = async (markData) => {
        try {
            const response = await axios.post(API_BASE_URL, markData);
            return response.data;
        } catch (error) {
            throw error;
        }
    };

    export const updateMark = async (markId, updatedMarkData) => {
        try {
            const response = await axios.put(`${API_BASE_URL}/${markId}`, updatedMarkData);
            return response.data;
        } catch (error) {
            throw error;
        }
    };
    
    export const deleteMark = async (markId) => {
        try {
            const response = await axios.delete(`${API_BASE_URL}/${markId}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    };
    