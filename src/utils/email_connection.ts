const nodeMailer = require('nodemailer');
const handlebars = require('nodemailer-express-handlebars');
const path = require('path');
const emailConnection = nodeMailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

emailConnection.use('compile', handlebars({
    viewEngine:{
        extName: '.handlebars',
        partialsDir: path.resolve('./src/utils/templates'),
        defaultLayout: false
    },
    viewPath: path.resolve('./src/utils/templates'),
    extName:".handlebars"
    
}))

module.exports = emailConnection;