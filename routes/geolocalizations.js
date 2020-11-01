const GeolocalizationsController = require('../controllers/geolocalizations');

module.exports = (app) => {

  const geolocalizationsController = new GeolocalizationsController(app.datasource.models.geolocalizations);

  app.route('/geolocalizations')
    .all(app.auth.authenticate())
    .get((req, res) => {
      geolocalizationsController
        .getAll()
        .then(rs => {
          res.json(rs.data);
        })
        .catch(error => {
          console.error(error.message);
          res.status(error.status);
        });
    })
    .post((req, res) => {
      geolocalizationsController
        .create(req.body)
        .then(rs => {
          res.json(rs.data);
          res.status(rs.status);

          if(rs.status === 201){
            //app.email.send(req.body.email);
          }     
        })
        .catch(error => {
          console.error(error.message);
          res.status(error.status);
        });
    });

    app.route('/geolocalizations/:id')
      .all(app.auth.authenticate())
      .get((req, res) => {
        geolocalizationsController
          .getById(req.params)
          .then(rs => {
            res.json(rs.data);
          })
          .catch(error => {
            console.error(error.message);
          res.status(error.status);
          });
      })
      .put((req, res) => {
        geolocalizationsController
          .update(req.body, req.params)
          .then(rs => {
            res.json(rs.data);
          })
          .catch(error => {
            console.error(error.message);
          res.status(error.status);
          });
      })
      .delete((req, res) => {
        geolocalizationsController
          .delete(req.params)
          .then(rs => {
            res.json(rs.data);
            res.status(rs.status);
          })
          .catch(error => {
            console.error(error.message);
          res.status(error.status);
          });
      });
}