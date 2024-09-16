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

echo "INFO: Running 'npm run start:dev' "
npm run start:dev -- --host 0.0.0.0 --port ${HTTP_PORT:-8080}

tail -f /dev/null
