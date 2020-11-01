const PresetsController = require('../controllers/presets');

module.exports = (app) => {

  const presetsController = new PresetsController(app.datasource.models.presets);

  app.route('/presets')
    .all(app.auth.authenticate())
    .get((req, res) => {
      presetsController
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
      presetsController
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

    app.route('/presets/:id')
      .all(app.auth.authenticate())
      .get((req, res) => {
        presetsController
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
        presetsController
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
        presetsController
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