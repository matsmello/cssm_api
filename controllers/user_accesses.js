const HttpStatus = require("http-status");

const defaultResponse = (data, status = HttpStatus.OK) => ({
  data,
  status
});

const errortResponse = (message, status = HttpStatus.BAD_REQUEST) => defaultResponse({  
  error: message,
  status
}, status);

class User_accessesController {

  constructor(modelUser_access){
    this.User_accesses = modelUser_access;
  }

  getAll(){
    return this.User_accesses
      .findAll({})
      .then(rs => defaultResponse(rs))
      .catch(e => errortResponse(e.message));
  }

  getById(params){
    return this.User_accesses
      .findOne({where: params})
      .then(rs => defaultResponse(rs))
      .catch(e => errortResponse(e.message));
  }

  create(data){
    return this.User_accesses
      .create(data)
      .then(rs => defaultResponse(rs, HttpStatus.CREATED))
      .catch(e => errortResponse(e.message, HttpStatus.UNPROCESSABLE_ENTITY));
  }

  update(data, params){
    return this.User_accesses
      .update({
        id_user: data.id_user,
        url: data.url,
        title: data.title
      }, {where: params})
      .then(rs => defaultResponse(rs))
      .catch(e => errortResponse(e.message, HttpStatus.UNPROCESSABLE_ENTITY));
  }

  delete(params){
    return this.User_accesses
      .destroy({where: params})
      .then(rs => defaultResponse(rs, HttpStatus.NO_CONTENT))
      .catch(e => errortResponse(e.message));
  }
}

module.exports = User_accessesController;