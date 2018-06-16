from __future__ import unicode_literals
import webapp2
import youtube_dl

class main(webapp2.RequestHandler):

  def get(self):
    # ydl_opts = {}
    # with youtube_dl.YoutubeDL(ydl_opts) as ydl:
    #     info = ydl.getInfo(['https://www.youtube.com/watch?v=BaW_jenozKc'])
    ydl = youtube_dl.YoutubeDL({'outtmpl': '%(id)s%(ext)s'})

    with ydl:
        result = ydl.extract_info(
            'http://www.youtube.com/watch?v=BaW_jenozKc',
            download=False # We just want to extract the info
        )

    if 'entries' in result:
        # Can be a playlist or a list of videos
        video = result['entries'][0]
    else:
        # Just a video
        video = result

    print(video)
    video_url = video['url']
    print(video_url)
    
    cityName = self.request.headers.get('X-AppEngine-City')
    if cityName:
      self.response.write('City Name is: ' + cityName)
    else:
      self.response.write('NONE')

app = webapp2.WSGIApplication([('/getUrl', main)], debug=True)