const parseDate = (dateString) => {
    let Date;
    [Date.month, Date.day, Date.year] = dateString.date.split("/"); 
    return Date; 
}

module.exports = parseDate; 