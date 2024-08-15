import axios from "axios";

const baseUrl = 'http://192.168.1.5:3000/v0/api/schedule';

// Format date in 24th Jul 2023 format
    const formatDate = (date) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(date).toLocaleDateString(undefined, options);
    }
    // format start and endtime in 12:00 -14:00 format

    const formatTime = (startTime, endTime) => {
        const options = { hour: 'numeric', minute: 'numeric' };
        return `${new Date(startTime).toLocaleTimeString(undefined, options)} - ${new Date(endTime).toLocaleTimeString(undefined, options)}`;
    }

    const fetchUpcoming = async (token) => {
        const url = `${baseUrl}/myUpcoming`;
        try {
            const response = await axios.get(url, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            });
            return response.data;
        }catch(error){
            throw error;
        }
    }

    const fetchCompleted = async (token) => {

        const url = `${baseUrl}/myCompleted`;
        try {
            const response = await axios.get(url, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            });
            return response.data;
        } catch (error) {
            console.error(`Error fetching completed schedules: ${error.message}`);
            return { error: `Failed to fetch completed schedules: ${error.message}` };
        }
    }
    const fetchRequested = async (token) => {
        const url = `${baseUrl}/requestedSchedules`;
        try {
            const response = await axios.get(url, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            });
            return response.data;
        }catch(error){
            throw error;
        }
    }
    const markAsCompleted = async(token,id,status="completed")=>{
        const url = `${baseUrl}/changeStatus/${id}`;
        try {
            const response = await axios.put(url,{
                "status": status
            },{
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            });
            return response.data;
        }catch(error){
            throw error;
        }
    }
    const postSchedule = async (token, data) => {
        const url = `${baseUrl}/create`;
        try {
            const response = await axios.post(url, data, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            });
            return response.data;
        }catch(error){
            throw error;
        }
    }
    const modifySchedule = async (token, id, data) => {
        const url = `${baseUrl}/reschedule/${id}`;
        try {
            const response = await axios.put(url, data, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            });
            return response.data;
        }catch(error){
            throw error;
        }
    }
    export {formatDate, formatTime, fetchUpcoming, fetchCompleted, fetchRequested, markAsCompleted, postSchedule, modifySchedule};