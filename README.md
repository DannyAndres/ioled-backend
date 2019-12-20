*Steps*
(1) Create /config folder
(2) Put example.keys.js inside of /config
(3) Change example.keys.js to keys.js and fill the requirements of google+ api and oauth 
(4) Download cloud firebase keys as a json file, and rename it to keys.json
(5) Put keys.json inside /config

*development*
```
npm run start
```

*Production*
```
gcloud functions deploy App --trigger-http --runtime nodejs8
```
