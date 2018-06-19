const express = require('express')
const path = require('path')
const bodyParser = require('body-parser');
const youtubedl = require('youtube-dl');

const app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('build'));

app.get('/api', (req, res) => {
  res.send('Hello People');
});

app.post('/getUrl', (req, res) => {
  youtubedl.getInfo(req.body.url, ['--format=mp4'], (err, info) => {
    if (err) {
      console.log('ERROR:', err);
      res.send({error: err});
    } else {
      res.send({
        id: info.id,
        url: info.url,
        ext: info.ext,
        title: info.title,
        duration: info.duration,
        thumbnail: info.thumbnail,
        description: info.description,
        filename: info._filename,
        format_id: info.format_id
      });
    }
  });
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
