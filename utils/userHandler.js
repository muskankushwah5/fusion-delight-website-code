import crypto from "crypto";
export const  generateUniqueUsername = (phone, email)=> {
    const combinedString = phone + email;
  
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let randomString = '';
    for (let i = 0; i < 10; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomString += characters.charAt(randomIndex);
    }
  
    const combinedWithRandom = combinedString + randomString;
  
    const hash = crypto.createHash('sha256').update(combinedWithRandom).digest('hex');
  
    const username = hash.slice(0, 10);
  
    return username;
  }
  

  export const  generateUniqueReferCode = (phone, firstName , lastName)=> {
    const combinedString = phone + firstName + lastName;
  
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let randomString = '';
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomString += characters.charAt(randomIndex);
    }
  
    const combinedWithRandom = combinedString + randomString;
  
    const hash = crypto.createHash('sha256').update(combinedWithRandom).digest('hex');
  
    const refercode = hash.slice(0, 6);
  
    return refercode;
  }
