import { Navigate, Route, Routes } from "react-router-dom"

import { NavBar } from "../../ui"
import { DcPages, HeroPage, MarvelPages, SearchPage } from "../../heroes"



export const HeroesRoutes = () => {
  return (
    <>
        <NavBar />

        <div className="container">

            <Routes>

            <Route path="/marvel" element={ <MarvelPages />} />
            <Route path="/dc" element={ <DcPages />} />

            <Route path="/search" element={ <SearchPage />} />
            <Route path="/hero/:id" element={ <HeroPage />} />

            <Route path="/" element={ <Navigate to='/marvel' />} />

            </Routes>

        </div>


    </>
  )
}
