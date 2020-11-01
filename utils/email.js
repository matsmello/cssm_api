const nodemailer = require('nodemailer');

class Email {

  constructor(config){
    this.developer = "loh.piotz@gmail.com";

    //console.log(config)
    
    const host = config.email.host;
    const port = config.email.port;
    const user = config.email.auth.user;
    const pass = config.email.auth.pass;

    this.transporter = nodemailer.createTransport({
      host: host,
      port: port,
      auth: {
        user: user,
        pass: pass
      }
    });

  }

  send(destiny){
    this.transporter.sendMail({
      from: this.developer,
      to: destiny,
      subject: 'Confirmarção de cadastro',
      html: `
        <center>
          <h1 style="color: red"> Cadastrodo com sucesso! </h1>
          <p> Obrigado! Acompanhe as novidade! </p>
        </center>
      `
      //text: 'Sua conta foi criada com sucesso! Obrigado'
    },(error, info) => {
      if(error){
        console.error(error);
        return;
      }else{
        console.log('Email enviado.');
        //console.log(info);
      }
    });

  }

}

module.exports = Email;