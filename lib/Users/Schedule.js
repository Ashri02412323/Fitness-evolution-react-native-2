import axios from "axios";

const baseUrl = 'https://evolution-erm4.onrender.com/v0/api/schedule';

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
        console.log("Fetching upcoming schedules");
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
        console.log("Fetching completed schedules");

        const url = `${baseUrl}/myCompleted`;
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
    const fetchRequested = async (token) => {
        console.log("Fetching requested schedules");
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
        console.log("Marking schedule as completed");
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
        console.log("Posting schedule");
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
        console.log("Modifying schedule");
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