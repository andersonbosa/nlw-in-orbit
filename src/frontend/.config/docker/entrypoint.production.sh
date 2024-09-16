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
npm run start:prod

tail -f /dev/null
