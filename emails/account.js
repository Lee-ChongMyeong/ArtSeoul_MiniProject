const sgMail = require('@sendgrid/mail')
require('dotenv').config();

const sendgridAPIKey = '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'

sgMail.setApiKey(sendgridAPIKey)

const sendWelcomeEmail = (email, nickname) => {
    sgMail.send({
        to: email,
        from: 'skylearnermy@gmail.com',
        subject: 'Thanks for joining in Art Seoul!',
        html: `<h3> 아트서울 회원 가입 완료! </h3> <br>
               안녕하세요. ${nickname}님!  <br><br>
               회원가입이 완료되었습니다.<br><br>
                
               아트서울의 다양한 플랫폼을 활용하여 즐거운 시간을 보내세요.<br>
               감사합니다.
        `,
    })
}

const sendCancelationEmail = (email, nickname) => {
    sgMail.send({
        to: email,
        from: 'skylearnermy@gmail.com',
        subject: 'Sorry to see you go!',
        text: `Goodbye, ${nickname}. I hope to see you back sometime soon.`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancelationEmail
}