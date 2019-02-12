const express = require('express')
const path = require('path')
const bodyParser = require('body-parser');
const youtubedl = require('ytdl-core');

const app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('build'));

app.get('/api', (req, res) => {
  res.send('Hello People');
});

app.post('/getUrl', (req, res) => {
  youtubedl.getInfo(req.body.url, ['--format=mp4'], (err, info) => {
    console.log('INFO', info)
    if (err) {
      console.log('ERROR:', err);
      res.send({error: err});
    } else {
      // res.send({info: info})
      res.send({
        id: info.video_id,
        url: info.formats[0].url,
        ext: info.formats[0].container,
        title: info.title,
        duration: info.length_seconds,
        thumbnail: info.thumbnail_url,
      //   description: info.description,
      //   filename: info._filename,
      //   format_id: info.format_id
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
