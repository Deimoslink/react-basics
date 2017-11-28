import express from 'express'
import serverRender from './server-render'
import path from 'path';

const app = express();
app.use(express.static(path.join(__dirname, '../dist')));
// app.get('/search/.*', serverRender);
// app.get('/film/.*', serverRender);
// app.get('/', serverRender);
app.all('*', serverRender);

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
