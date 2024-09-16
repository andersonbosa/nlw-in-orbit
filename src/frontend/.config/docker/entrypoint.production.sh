#!/usr/bin/env sh

cat <<EOF

|''||''|             .|''''|,        '||            ||
   ||                ||    ||         ||      ''    ||
   ||     ||''|,     ||    || '||''|  ||''|,  ||  ''||''
   ||     ||  ||     ||    ||  ||     ||  ||  ||    ||
|..||..| .||  ||. ..  |....|' .||.   .||..|' .||.    |..'

Repository: https://github.com/andersonbosa/nlw-in-orbit

ENVIRONMENT: ${NODE_ENV:-production}

EOF

echo "INFO: Running 'npm run start:prod' "
npm run start:prod -- --host 0.0.0.0 --port ${HTTP_PORT:-8080}


tail -f /dev/null
