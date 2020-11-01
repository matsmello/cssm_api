const HttpStatus = require("http-status");

const defaultResponse = (data, status = HttpStatus.OK) => ({
  data,
  status
});

const errortResponse = (message, status = HttpStatus.BAD_REQUEST) => defaultResponse({  
  error: message,
  status
}, status);

class PresetsController {

  constructor(modelPreset){
    this.Presets = modelPreset;
  }

  getAll(){
    return this.Presets
      .findAll({})
      .then(rs => defaultResponse(rs))
      .catch(e => errortResponse(e.message));
  }

  getById(params){
    return this.Presets
      .findOne({where: params})
      .then(rs => defaultResponse(rs))
      .catch(e => errortResponse(e.message));
  }

  create(data){
    return this.Presets
      .create(data)
      .then(rs => defaultResponse(rs, HttpStatus.CREATED))
      .catch(e => errortResponse(e.message, HttpStatus.UNPROCESSABLE_ENTITY));
  }

  update(data, params){
    return this.Presets
      .update({
        id_user: data.id_user,
        preset: data.preset
      }, {where: params})
      .then(rs => defaultResponse(rs))
      .catch(e => errortResponse(e.message, HttpStatus.UNPROCESSABLE_ENTITY));
  }

  delete(params){
    return this.Presets
      .destroy({where: params})
      .then(rs => defaultResponse(rs, HttpStatus.NO_CONTENT))
      .catch(e => errortResponse(e.message));
  }  
}

module.exports = PresetsController;