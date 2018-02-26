const songs = [
  {
    artistName: 'Miles Davis',
    trackName: 'So What',
    albumName: 'Kind of Blue',
    artwork: 'http://is2.mzstatic.com/image/thumb/Music/v4/f3/d5/eb/f3d5eb6b-34f6-69db-1b2c-477c46ee7662/source/100x100bb.jpg',
    previewUrl: 'https://audio-ssl.itunes.apple.com/apple-assets-us-std-000001/Music/v4/75/5e/86/755e86b3-97f7-f90d-ba17-badfdc3d563a/mzaf_1917470554783382218.plus.aac.p.m4a',
    trackTimeMillis: 547983,
    releaseDate: '1959-08-17T07:00:00Z'
  },
  {
    artistName: 'Miles Davis Quintet',
    trackName: 'When I Fall In Love',
    albumName: 'Miles Davis Plays for Lovers (Remastered)',
    artwork: 'http://is1.mzstatic.com/image/thumb/Music/v4/ae/57/b9/ae57b98c-3517-5f5b-2cc7-76a43f0f8f87/source/100x100bb.jpg',
    previewUrl: 'https://audio-ssl.itunes.apple.com/apple-assets-us-std-000001/Music/e4/60/c8/mzm.hlqqflyv.aac.p.m4a',
    trackTimeMillis: 261303,
    releaseDate: '1966-01-01T08:00:00Z'
  },
  {
    artistName: 'Miles Davis',
    trackName: 'Some Day My Prince Will Come',
    albumName: 'Someday My Prince Will Come',
    artwork: 'http://is4.mzstatic.com/image/thumb/Music6/v4/ae/55/b7/ae55b74a-5c34-41a6-01a5-1889ca1b393d/source/100x100bb.jpg',
    previewUrl: 'https://audio-ssl.itunes.apple.com/apple-assets-us-std-000001/Music/b2/71/34/mzm.flvanxpy.aac.p.m4a',
    trackTimeMillis: 542400,
    releaseDate: '1961-12-11T08:00:00Z'
  },
  {
    artistName: 'Miles Davis',
    trackName: '\'Round Midnight',
    albumName: 'The Complete Columbia Recordings: Miles Davis & John Coltrane',
    artwork: 'http://is2.mzstatic.com/image/thumb/Music/v4/0f/b5/3f/0fb53f77-83c4-79ae-5b7c-316d72003b9b/source/100x100bb.jpg',
    previewUrl: 'https://audio-ssl.itunes.apple.com/apple-assets-us-std-000001/Music/0e/01/2f/mzm.zipybwkv.aac.p.m4a',
    trackTimeMillis: 354773,
    releaseDate: '1957-03-04T08:00:00Z'
  },
  {
    artistName: 'Miles Davis & The Modern Jazz Giants',
    trackName: 'Doxy',
    albumName: 'The Best of Miles Davis',
    artwork: 'http://is1.mzstatic.com/image/thumb/Music/v4/53/e8/14/53e8145a-6872-f6ca-7b64-3888a8cd1c58/source/100x100bb.jpg',
    previewUrl: 'https://audio-ssl.itunes.apple.com/apple-assets-us-std-000001/Music/69/a2/dd/mzm.usadmwky.aac.p.m4a',
    trackTimeMillis: 292933,
    releaseDate: '1954-01-01T08:00:00Z'
  },
  {
    artistName: 'Miles Davis',
    trackName: 'Blue In Green',
    albumName: 'Kind of Blue',
    artwork: 'http://is2.mzstatic.com/image/thumb/Music/v4/f3/d5/eb/f3d5eb6b-34f6-69db-1b2c-477c46ee7662/source/100x100bb.jpg',
    previewUrl: 'https://audio-ssl.itunes.apple.com/apple-assets-us-std-000001/Music/v4/41/a7/92/41a7921e-fcd8-43c4-324d-84ec1f5c7b48/mzaf_4162017111569296762.plus.aac.p.m4a',
    trackTimeMillis: 335939,
    releaseDate: '1959-08-17T07:00:00Z'
  },
  {
    artistName: 'Miles Davis',
    trackName: 'Freddie Freeloader',
    albumName: 'Kind of Blue',
    artwork: 'http://is2.mzstatic.com/image/thumb/Music/v4/f3/d5/eb/f3d5eb6b-34f6-69db-1b2c-477c46ee7662/source/100x100bb.jpg',
    previewUrl: 'https://audio-ssl.itunes.apple.com/apple-assets-us-std-000001/Music/v4/4f/21/20/4f21208c-9807-976b-8ff3-c1eddc7fdf87/mzaf_9000770334418201668.plus.aac.p.m4a',
    trackTimeMillis: 588411,
    releaseDate: '1959-08-17T07:00:00Z'
  },
  {
    artistName: 'Miles Davis',
    trackName: 'On Green Dolphin Street',
    albumName: 'The Complete Columbia Recordings: Miles Davis & John Coltrane',
    artwork: 'http://is2.mzstatic.com/image/thumb/Music/v4/0f/b5/3f/0fb53f77-83c4-79ae-5b7c-316d72003b9b/source/100x100bb.jpg',
    previewUrl: 'https://audio-ssl.itunes.apple.com/apple-assets-us-std-000001/Music/6a/08/c7/mzm.viqeupqs.aac.p.m4a',
    trackTimeMillis: 588067,
    releaseDate: '1958-01-01T08:00:00Z'
  },
  {
    artistName: 'Miles Davis',
    trackName: 'Flamenco Sketches',
    albumName: 'Kind of Blue',
    artwork: 'http://is2.mzstatic.com/image/thumb/Music/v4/f3/d5/eb/f3d5eb6b-34f6-69db-1b2c-477c46ee7662/source/100x100bb.jpg',
    previewUrl: 'https://audio-ssl.itunes.apple.com/apple-assets-us-std-000001/Music/v4/73/5b/b7/735bb7e5-af47-f6e5-57d8-114d61771980/mzaf_3652485779637598222.plus.aac.p.m4a',
    trackTimeMillis: 567105,
    releaseDate: '1959-08-17T07:00:00Z'
  },
  {
    artistName: 'Miles Davis',
    trackName: 'E.S.P.',
    albumName: 'E.S.P.',
    artwork: 'http://is5.mzstatic.com/image/thumb/Music/v4/54/2b/d3/542bd385-012e-7a23-3f03-200b1a7c518c/source/100x100bb.jpg',
    previewUrl: 'https://audio-ssl.itunes.apple.com/apple-assets-us-std-000001/Music/c8/c2/67/mzm.uztlkswz.aac.p.m4a',
    trackTimeMillis: 328427,
    releaseDate: '1965-08-16T07:00:00Z'
  },
  {
    artistName: 'Miles Davis',
    trackName: 'Seven Steps to Heaven',
    albumName: 'Seven Steps to Heaven',
    artwork: 'http://is3.mzstatic.com/image/thumb/Music4/v4/dc/97/e5/dc97e57c-6513-5d58-b37c-be3ff731bc45/source/100x100bb.jpg',
    previewUrl: 'https://audio-ssl.itunes.apple.com/apple-assets-us-std-000001/Music/d9/e0/72/mzm.admdaesk.aac.p.m4a',
    trackTimeMillis: 383560,
    releaseDate: '1963-07-15T07:00:00Z'
  },
  {
    artistName: 'Miles Davis',
    trackName: 'Summertime',
    albumName: 'The Essential Miles Davis',
    artwork: 'http://is4.mzstatic.com/image/thumb/Music/v4/74/76/5f/74765fe7-2622-d9d7-a490-6997e0b3443a/source/100x100bb.jpg',
    previewUrl: 'https://audio-ssl.itunes.apple.com/apple-assets-us-std-000001/Music/aa/76/44/mzm.tpjudloe.aac.p.m4a',
    trackTimeMillis: 197467,
    releaseDate: '1958-01-01T08:00:00Z'
  },
  {
    artistName: 'Miles Davis & The Modern Jazz Giants',
    trackName: 'Airegin',
    albumName: 'The Best of Miles Davis',
    artwork: 'http://is1.mzstatic.com/image/thumb/Music/v4/53/e8/14/53e8145a-6872-f6ca-7b64-3888a8cd1c58/source/100x100bb.jpg',
    previewUrl: 'https://audio-ssl.itunes.apple.com/apple-assets-us-std-000001/Music/bc/c8/92/mzm.tykdwwon.aac.p.m4a',
    trackTimeMillis: 299173,
    releaseDate: '1954-01-01T08:00:00Z'
  },
  {
    artistName: 'Miles Davis',
    trackName: 'Jean Pierre',
    albumName: 'The Essential Miles Davis',
    artwork: 'http://is4.mzstatic.com/image/thumb/Music/v4/74/76/5f/74765fe7-2622-d9d7-a490-6997e0b3443a/source/100x100bb.jpg',
    previewUrl: 'https://audio-ssl.itunes.apple.com/apple-assets-us-std-000001/Music/1a/ae/7f/mzm.fjahawxm.aac.p.m4a',
    trackTimeMillis: 241440,
    releaseDate: '1972-01-01T08:00:00Z'
  },
  {
    artistName: 'Miles Davis',
    trackName: 'All Blues',
    albumName: 'Kind of Blue',
    artwork: 'http://is2.mzstatic.com/image/thumb/Music/v4/f3/d5/eb/f3d5eb6b-34f6-69db-1b2c-477c46ee7662/source/100x100bb.jpg',
    previewUrl: 'https://audio-ssl.itunes.apple.com/apple-assets-us-std-000001/Music/v4/39/8f/78/398f78c7-23f9-5e75-ac61-6d7e171726dc/mzaf_5807231952945330144.plus.aac.p.m4a',
    trackTimeMillis: 692897,
    releaseDate: '1959-08-17T07:00:00Z'
  },
  {
    artistName: 'Miles Davis',
    trackName: 'A Night In Tunisia',
    albumName: 'The Best of Miles Davis',
    artwork: 'http://is1.mzstatic.com/image/thumb/Music/v4/53/e8/14/53e8145a-6872-f6ca-7b64-3888a8cd1c58/source/100x100bb.jpg',
    previewUrl: 'https://audio-ssl.itunes.apple.com/apple-assets-us-std-000001/Music/3f/ad/3a/mzm.tryjggte.aac.p.m4a',
    trackTimeMillis: 441200,
    releaseDate: '1955-01-01T08:00:00Z'
  },
  {
    artistName: 'Miles Davis',
    trackName: 'Footprints',
    albumName: 'Miles Smiles',
    artwork: 'http://is1.mzstatic.com/image/thumb/Music3/v4/e9/1c/93/e91c93a3-8c38-3440-c65d-f0dcda7fa5ca/source/100x100bb.jpg',
    previewUrl: 'https://audio-ssl.itunes.apple.com/apple-assets-us-std-000001/Music4/v4/af/8b/87/af8b87e8-262b-86c5-e41c-270388b1e0db/mzaf_680540639796492852.plus.aac.p.m4a',
    trackTimeMillis: 588694,
    releaseDate: '1967-01-01T08:00:00Z'
  },
  {
    artistName: 'Miles Davis',
    trackName: 'I\'ll Remember April',
    albumName: 'The Best of Miles Davis',
    artwork: 'http://is1.mzstatic.com/image/thumb/Music/v4/53/e8/14/53e8145a-6872-f6ca-7b64-3888a8cd1c58/source/100x100bb.jpg',
    previewUrl: 'https://audio-ssl.itunes.apple.com/apple-assets-us-std-000001/Music/a0/42/56/mzm.qmsgxnrn.aac.p.m4a',
    trackTimeMillis: 472267,
    releaseDate: '1954-12-24T08:00:00Z'
  },
  {
    artistName: 'Miles Davis',
    trackName: 'Générique',
    albumName: 'Jazz In Paris: Ascenseur pour l\'échafaud',
    artwork: 'http://is4.mzstatic.com/image/thumb/Music/v4/3d/7a/46/3d7a46ed-7106-6ed2-a027-92fcd772e174/source/100x100bb.jpg',
    previewUrl: 'https://audio-ssl.itunes.apple.com/apple-assets-us-std-000001/Music2/v4/51/22/aa/5122aa68-4d90-174d-82ae-d08c3da5f26e/mzaf_3378398219443207302.plus.aac.p.m4a',
    trackTimeMillis: 168400,
    releaseDate: '1958-01-01T08:00:00Z'
  },
  {
    artistName: 'Miles Davis',
    trackName: 'Flamenco Sketches',
    albumName: 'Kind of Blue (Legacy Edition)',
    artwork: 'http://is3.mzstatic.com/image/thumb/Music6/v4/70/55/0e/70550ee5-945f-0267-b6a1-6d855cfef24f/source/100x100bb.jpg',
    previewUrl: 'https://audio-ssl.itunes.apple.com/apple-assets-us-std-000001/Music4/v4/09/7d/14/097d149e-49a1-ddca-64a6-ba019701f5f7/mzaf_4741576021562210439.plus.aac.p.m4a',
    trackTimeMillis: 566133,
    releaseDate: '1959-08-17T07:00:00Z'
  }
];

export default songs;