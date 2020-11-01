const HttpStatus = require("http-status");

const defaultResponse = (data, status = HttpStatus.OK) => ({
  data,
  status
});

const errortResponse = (message, status = HttpStatus.BAD_REQUEST) => defaultResponse({  
  error: message,
  status
}, status);

class GeolocalizationsController {
  constructor(modelGeolocalization){
    this.Geolocalizations = modelGeolocalization;
  }

  getAll(){
    return this.Geolocalizations
      .findAll({})
      .then(rs => defaultResponse(rs))
      .catch(e => errortResponse(e.message));
  }

  getById(params){
    return this.Geolocalizations
      .findOne({where: params})
      .then(rs => defaultResponse(rs))
      .catch(e => errortResponse(e.message));
  }

  create(data){
    return this.Geolocalizations
      .create(data)
      .then(rs => defaultResponse(rs, HttpStatus.CREATED))
      .catch(e => errortResponse(e.message, HttpStatus.UNPROCESSABLE_ENTITY));
  }

  update(data, params){
    return this.Geolocalizations
      .update({
        id_user: data.id_user,
        lat: data.lat,
        long: data.long
      }, {where: params})
      .then(rs => defaultResponse(rs))
      .catch(e => errortResponse(e.message, HttpStatus.UNPROCESSABLE_ENTITY));
  }

  delete(params){
    return this.Geolocalizations
      .destroy({where: params})
      .then(rs => defaultResponse(rs, HttpStatus.NO_CONTENT))
      .catch(e => errortResponse(e.message));
  }
}

module.exports = GeolocalizationsController;