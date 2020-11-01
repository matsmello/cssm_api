const UsersController = require('../controllers/users');

module.exports = (app) => {

  const usersController = new  UsersController(app.datasource.models.users);

  app.route('/users')
  .post((req, res) => {
    usersController
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
  })
    .all(app.auth.authenticate())
    .get((req, res) => {
      usersController
        .getAll()
        .then(rs => {
          res.json(rs.data);
        })
        .catch(error => {
          console.error(error.message);
          res.status(error.status);
        });
    });

    app.route('/users/:id')
      .all(app.auth.authenticate())
      .get((req, res) => {
        usersController
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
        usersController
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
        usersController
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

      /* app.route('/login')
        .post( async (req, res) => {
          try{
            const response = await usersController.signin(req.body);
            res.json(response);
          } catch (e) {
            console.error(e);            
            res.status(422);
          } 
        }); */
};