import { env } from './env'
import { app } from './http/server'

app
  .listen({
    port: env.HTTP_PORT,
    host: env.HTTP_HOST,
  })
  .then(liveUrl => {
    console.log(`

|''||''|             .|''''|,        '||            ||
   ||                ||    ||         ||      ''    ||
   ||     ||''|,     ||    || '||''|  ||''|,  ||  ''||''
   ||     ||  ||     ||    ||  ||     ||  ||  ||    ||
|..||..| .||  ||. ..  |....|' .||.   .||..|' .||.    |..'

Documentation: https://github.com/andersonbosa/nlw-in-orbit

HTTP Server Running: "${liveUrl}"`)
  })
