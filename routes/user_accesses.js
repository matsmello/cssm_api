const User_accessesController = require('../controllers/user_accesses');

module.exports = (app) => {

  const user_accessesController = new User_accessesController(app.datasource.models.user_accesses);

  app.route('/user_accesses')
    .all(app.auth.authenticate())
    .get((req, res) => {
      user_accessesController
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
      user_accessesController
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

    app.route('/user_accesses/:id')
      .all(app.auth.authenticate())
      .get((req, res) => {
        user_accessesController
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
        user_accessesController
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
        user_accessesController
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