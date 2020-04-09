const express = require('express')
const path = require('path')
const bodyParser = require('body-parser');
const youtubedl = require('ytdl-core');
const fs = require('fs');

const app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('build'));

app.get('/api', (req, res) => {
  res.send('Hello People');
});

app.post('/getUrl', (req, res) => {
  const url = req.body.url;
  console.log('URL\n', url);
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
  // let video = youtubedl(url,
  //   // Optional arguments passed to youtube-dl.
  //   ['--format=mp4'],
  //   // Additional options can be given for calling `child_process.execFile()`.
  //   { cwd: __dirname }
  // );

  // // Will be called when the download starts.
  // video.on('info', function(info) {
  //   console.log('Download started');
  //   console.log('filename: ' + info._filename);
  //   console.log('size: ' + info.size);
  // });

  // video.pipe(fs.createWriteStream('myvideo.mp4'));
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
