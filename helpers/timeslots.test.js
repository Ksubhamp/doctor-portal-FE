const splitTime = require('./timeslots');
const moment = require('moment');

test('check time slots',()=>{
    const startTime = new moment({ hour: '10', minute: '00'});
    const endTime = new moment({ hour: '16', minute: '00'});
    let c = splitTime(startTime,endTime,'60');
    expect(c).not.toBeNull();
}) 



test('check time slots with wrong time',()=>{
    const startTime = new moment({ hour: '18', minute: '00'});
    const endTime = new moment({ hour: '16', minute: '00'});
    let c = splitTime(startTime,endTime,'60');
    expect(c).toBeFalsy();
}) 


test('check time slots function with blank value',()=>{
    const startTime = new moment({ hour: '18', minute: '00'});
    const endTime = new moment({ hour: '16', minute: '00'});
    let c = splitTime('','','60');
    expect(c).toBeFalsy();
}) 