import express from 'express'
import serverRender from './server-render'

const app = express();
app.get('*', serverRender);
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
