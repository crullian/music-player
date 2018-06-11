const express = require('express')
const path = require('path')
const bodyParser = require('body-parser');
const youtubedl = require('youtube-dl');

const app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('build'));

app.get('/api', (req, res) => {
  res.send('Hello Pigs');
});

app.post('/getUrl', (req, res) => {
  console.log('REQ>>>>>>>>', req.body.url);
  youtubedl.getInfo(req.body.url, null, (err, info) => {
    if (err) {
      console.log('ERROR', err);
    } else {
      // console.log('id:', info.id);
      // console.log('title:', info.title);
      // console.log('url:', info.url);
      // console.log('thumbnail:', info.thumbnail);
      // console.log('description:', info.description);
      // console.log('filename:', info._filename);
      // console.log('format id:', info.format_id);
      res.send({url: info.url});
    }
  });
    // res.send('NOT YET');
})

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
