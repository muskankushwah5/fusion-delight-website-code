import nodemailer from  'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
      user: 'marc.lehner@ethereal.email',
      pass: 'HQnCCvhA51YAXkbXzg'
  },
  tls:{
    rejectUnauthorized:false
  }
});

export const mailerFunction = (token , email )=>{
    const mailOptions = {
        from: 'marc.lehner@ethereal.email',  
        to: email,
        subject: 'Password Reset Token',  
        text: `Your 6-digit token is: ${token}`, 
    };
    
    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
         throw new Error (error);
        } else {
          return info.response;
        }
    });
}

  export const mailerOrderInfoFunction = (userEmail, deliveringPartnerInfo, orderInfo,totalPrize) => {
    // Construct the email body with order information

    const emailBody = `
      Thank you for ordering from fusion-delight. Your order is on the way for delivery.
  
      Order Information:
      - Delivery Partner: ${deliveringPartnerInfo.name}
      - Delivery Partner Contact Number: ${deliveringPartnerInfo.number}
  
      Order Details:
      ${orderInfo.map((item, index) => `
        ${index + 1}. Food: ${item.foodTitle} x ${item.Quantity}
           Price: $${item.prize}
      `).join('\n')}
  
      Total Price: $${totalPrize}
    `;
    console.log(userEmail);
  
    const mailOptions = {
      from: 'marc.lehner@ethereal.email',
      to: userEmail,
      subject: 'Your Order is on the way',
      text: emailBody, 
    };
  
    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        throw new Error(error);
      } else {
        console.log('Email sent:', info.response);
        return info.response;
      }
    });
}


export const mailTableFunction = ( details) => {
  // Construct the email body with order information

  const emailBody = `
    Thank you for reservation from fusion-delight. 

    Reservation Details:
    date : ${details.date}
    time : ${details.time}
    user : ${details.email}

    Table : $${details.tableNumber}
  `;

  const mailOptions = {
    from: 'marc.lehner@ethereal.email',
    to: details.tableNumber,
    subject: 'Your Reservation :',
    text: emailBody, 
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      throw new Error(error);
    } else {
      console.log('Email sent:', info.response);
      return info.response;
    }
  });
}