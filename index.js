const app = require("./app");

app.listen(app.get('port'), () => {
    console.log(`\nAPI rodando na porta ${app.get('port')}\n`);
});
