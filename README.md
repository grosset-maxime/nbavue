# nbavue

## Project setup
```
npm install --legacy-peer-deps # --legacy-peer-deps to by-pass dev package prettier-airbnb-config deps on very old version of prettier.
cp ./.env.local.dist ./.env.local
```

### Compiles and hot-reloads for development
```
npm run dev
```

### Compiles and minifies for production
1. Update file `.env.local` with expected values.
1. Install p7zip utils: `brew install p7zip`
1. Run in local:
    ```
    npm run build
    mv ./dist/index.html ./dist/index.php
    7za a ./dist.7z ./dist/*
    ```
1. Copy manually 7z file `dist.7z` to maxou home.
1. Run in nas:
    ```
    cd /var/services/web/nba/public/
    rm -dR /var/services/web/nba/public/temp
    mkdir /var/services/web/nba/public/temp
    mv /var/services/web/nba/public/js /var/services/web/nba/public/temp
    mv /var/services/web/nba/public/css /var/services/web/nba/public/temp
    mv /var/services/web/nba/public/index.php /var/services/web/nba/public/temp
    7z x /volume1/homes/maxou/dist.7z
    ```
1. Should need to restart nginx ??

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
