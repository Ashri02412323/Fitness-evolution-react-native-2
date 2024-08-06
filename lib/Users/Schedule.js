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

    export {formatDate, formatTime}