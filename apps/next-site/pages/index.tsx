import React, { useCallback, useEffect, useState } from 'react';

import { Pokemon } from '@nx-monorepo/shared-types'

import styles from './index.module.css';

interface IndexProps {
  query: string
  data: Pokemon[]
}

export function Index(props: IndexProps) {
  const {
    query,
    data
  } = props

  const [search, setSearch] = useState<string>(query)
  const [pokemon, setPokemon] = useState<Pokemon[]>(data)

  useEffect(() => {
    if (query !== search) {
      fetch(`http://localhost:3333/search?q=${search}`)
        .then(res => res.json())
        .then(data => { setPokemon(data) })
    }
  }, [search, query])

  const onChangeSearch = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value

    setSearch(value || "")
  }, [])

  return (
    <div className={styles.page}>
      <input value={search} onChange={onChangeSearch} className={styles.input} />

      <ul className={styles.list}>
        {pokemon.map(element => <li key={element.id}>{element.name.english}</li>)}
      </ul>
    </div>
  );
}

export async function getServerSideProps(context) {
  const query = context.query.q || ""
  let data = []

  if (query) {
    const res = await fetch(`http://localhost:3333/search?q=${query}`)
    data = await res.json()
  }

  return {
    props: {
      data,
      query
    }
  }

}

export default Index;
