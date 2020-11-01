const HttpStatus = require("http-status");

const defaultResponse = (data, status = HttpStatus.OK) => ({
  data,
  status
});

const errortResponse = (message, status = HttpStatus.BAD_REQUEST) => defaultResponse({  
  error: message,
  status
}, status);

class SharingsController {

  constructor(modelSharing){
    this.Sharings = modelSharing;
  }

  getAll(){
    return this.Sharings
      .findAll({})
      .then(rs => defaultResponse(rs))
      .catch(e => errortResponse(e.message));
  }

  getById(params){
    return this.Sharings
      .findOne({where: params})
      .then(rs => defaultResponse(rs))
      .catch(e => errortResponse(e.message));
  }

  create(data){
    return this.Sharings
      .create(data)
      .then(rs => defaultResponse(rs, HttpStatus.CREATED))
      .catch(e => errortResponse(e.message, HttpStatus.UNPROCESSABLE_ENTITY));
  }

  update(data, params){
    return this.Sharings
      .update({
        id_user: data.id_user,
        url: data.url,
        preset: data.preset,
        destination: data.destination
      }, {where: params})
      .then(rs => defaultResponse(rs))
      .catch(e => errortResponse(e.message, HttpStatus.UNPROCESSABLE_ENTITY));
  }

  delete(params){
    return this.Sharings
      .destroy({where: params})
      .then(rs => defaultResponse(rs, HttpStatus.NO_CONTENT))
      .catch(e => errortResponse(e.message));
  }  
}

module.exports = SharingsController;