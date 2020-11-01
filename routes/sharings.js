const SharingsController = require('../controllers/sharings');

module.exports = (app) => {

  const sharingsController = new SharingsController(app.datasource.models.sharings);

  app.route('/sharings')
    .all(app.auth.authenticate())
    .get((req, res) => {
      sharingsController
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
      sharingsController
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

    app.route('/sharings/:id')
      .all(app.auth.authenticate())
      .get((req, res) => {
        sharingsController
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
        sharingsController
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
        sharingsController
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