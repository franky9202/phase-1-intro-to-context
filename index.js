// Your code here
const createEmployeeRecord = (array) => {
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}
const createEmployeeRecords = (employeeRecords) =>{
    const records = []
    employeeRecords.forEach(employee => {
        records.push(createEmployeeRecord(employee));
    });
    return records
}
const createTimeInEvent = (employeeRecord, timeStamp) =>{
    const time = {
        type: "TimeIn",
        hour: parseInt(timeStamp.slice(-4),10),
        date: timeStamp.split(" ")[0]
    }
    employeeRecord.timeInEvents.push(time)
    return employeeRecord
}
const createTimeOutEvent = (employeeRecord, timeStamp) =>{
    const time = {
        type: "TimeOut",
        hour: parseInt(timeStamp.slice(-4),10),
        date: timeStamp.split(" ")[0]
    }
    employeeRecord.timeOutEvents.push(time)
    return employeeRecord
}
const hoursWorkedOnDate = (employeeRecord, date) => {
    const timeIn = employeeRecord.timeInEvents.find(e => {
        return e.date === date
    }).hour
    const timeOut = employeeRecord.timeOutEvents.find(e => {
        return e.date === date
    }).hour
    return (timeOut - timeIn) / 100

}
const wagesEarnedOnDate = (employeeRecord, date) => {
    const hours = hoursWorkedOnDate(employeeRecord,date)
    let pay = hours * employeeRecord.payPerHour
    return pay
}
const allWagesFor = (employeeRecord) => {
    let pay = 0
    for (let i = 0; i < employeeRecord.timeInEvents.length; i++) {       
        let payday = wagesEarnedOnDate(employeeRecord, employeeRecord.timeInEvents[i].date)
        pay += payday
    }
    return pay
    
}
const calculatePayroll = (array) => {
    const sumPay = array.reduce((acc, record) => {
        const sumPayForEmployee = allWagesFor(record)
        return acc + sumPayForEmployee
    },0)
    return sumPay
}
calculatePayroll(employees)