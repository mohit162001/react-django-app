import React from 'react'
import Hero from '../Component/Hero/Hero'
import Popular from '../Component/Popular/Popular';
import Offers from '../Component/Offers/Offers';
import NewCollections from '../Component/NewCollections/NewCollections';
export const Shop = () => {
  return (
    <>
    <Hero />
    <Popular/>
    <Offers/>
    <NewCollections/>
    </>
  )
}

export default Shop;