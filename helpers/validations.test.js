const {isStatus, isValidObjectId ,validateSignup} = require('./validations');


test('test status with valid data',()=>{
    expect(isStatus('Open')).toBe(true);
})


test('test status with rendom data',()=>{
    expect(isStatus('test')).toBe(false);
})

test('test status with blank data',()=>{
    expect(isStatus('')).toBe(false);
})



test('check objctId with valid ID',()=>{
    expect(isValidObjectId('62724a9535802fcf6f1d7f3c')).toBe(true);
})

test('check objctId with invalid data',()=>{
    expect(isValidObjectId('testingdata')).toBe(false);
})

test('check objctId with null data',()=>{
    expect(isValidObjectId('')).toBe(false);
})

// test('check objctId with null data',()=>{
//     let c =  validateSignup({
//         email:''
//     });
//     expect('Email is required.').toBe(c);
// })
// test('check objctId with null data',()=>{
//     let c =  validateSignup({
//         email:'fghfgh',
//         password:''
//     });
//     expect('password is required.').toBe(c);
// })
