#!/usr/bin/env sh

tail -f /dev/null#!/usr/bin/env sh

cat <<EOF

|''||''|             .|''''|,        '||            ||
   ||                ||    ||         ||      ''    ||
   ||     ||''|,     ||    || '||''|  ||''|,  ||  ''||''
   ||     ||  ||     ||    ||  ||     ||  ||  ||    ||
|..||..| .||  ||. ..  |....|' .||.   .||..|' .||.    |..'

Repository: https://github.com/andersonbosa/nlw-in-orbit

ENVIRONMENT: ${NODE_ENV:-development}

EOF

echo "INFO: Running 'npm install' "
npm install

echo "INFO: Running 'npm run db:setup' "
npm run db:setup

echo "INFO: Running 'npm run start:dev' "
npm run start:dev

tail -f /dev/null
