const HttpStatus = require("http-status");
//const { response } = require("../app");

const defaultResponse = (data, status = HttpStatus.OK) => ({
  data,
  status
});

const errortResponse = (message, status = HttpStatus.BAD_REQUEST) => defaultResponse({  
  error: message,
  status
}, status);

/* const errortResponse = (message, status = HttpStatus.BAD_REQUEST) => ({
  menssage,
  status
}); */

class UsersController {

  constructor(modelUser){
    this.Users = modelUser;
  }

  getAll(){
    return this.Users
      .findAll({})
      .then(rs => defaultResponse(rs))
      .catch(e => errortResponse(e.message));
  }

  getById(params){
    return this.Users
      .findOne({where: params})
      .then(rs => defaultResponse(rs))
      .catch(e => errortResponse(e.message));
  }

  create(data){
    return this.Users
      .create(data)
      .then(rs => defaultResponse(rs, HttpStatus.CREATED))
      .catch(e => errortResponse(e.message, HttpStatus.UNPROCESSABLE_ENTITY));
  }

  update(data, params){
    return this.Users
      .update({
        name: data.name,
        birthday: data.birthday,
        origin: data.origin,
        email: data.email,
        password: data.password,
        gender: data.gender,
        image: data.image
      }, {where: params})
      .then(rs => defaultResponse(rs))
      .catch(e => errortResponse(e.message, HttpStatus.UNPROCESSABLE_ENTITY));
  }

  delete(params){
    return this.Users
      .destroy({where: params})
      .then(rs => defaultResponse(rs, HttpStatus.NO_CONTENT))
      .catch(e => errortResponse(e.message));
  }

  async signin(data) {
    const response = {
      login: {
        id: null,
        isValid: false,
        message: "Login inválido"
      }
    };

    if(data.email && data.password) {
      const email = data.email;
      const password = data.password;

      try {
        const result = await this.Users.findOne({where: { email } });
        const user = await result;

        if(user) {
          const isPassword = await this.Users.verifyPassword(user.password, password);
          console.log("Verificação da senha -> " + isPassword);

          if(isPassword){
            response.login.id = user.id;
            response.login.isValid = isPassword;
            response.login.message = "Logado com sucesso!";
            
            return response;
          } // end if

        } // end if

      } catch (e) {
        console.error(e);
      }

    } // end if
    return response;
  }
}

module.exports = UsersController;