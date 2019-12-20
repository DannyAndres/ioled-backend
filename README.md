## Steps
- Create /config folder
- Put example.keys.js inside of /config
- Change example.keys.js to keys.js and fill the requirements of google+ api and oauth 
- Download cloud firebase keys as a json file, and rename it to keys.json
- Put keys.json inside /config

## development
```
npm run start
```

## Production
```
gcloud functions deploy App --trigger-http --runtime nodejs8
```

## Endpoints
#### login
```
http://us-central1-ioled-262100.cloudfunctions.net/App/auth/google
```
#### get user
```
http://us-central1-ioled-262100.cloudfunctions.net/App/auth
```
#### logout
```
http://us-central1-ioled-262100.cloudfunctions.net/App/auth/logout
```
