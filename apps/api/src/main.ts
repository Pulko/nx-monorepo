import * as express from 'express';
import * as cors from 'cors'

import { pokemon } from './pokemon';

const app = express();

app.use(cors());

app.get('/pokemon', (_, res) => {
  res.send(pokemon)
})

app.get('/search', (req, res) => {
  res.send(pokemon.filter(p => {
    const pokemonName = p.name.english.toLowerCase()
    const requestInput = (req.query.q as string).toLowerCase()

    return pokemonName.includes(requestInput)
  }))
})

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
server.on('error', console.error);