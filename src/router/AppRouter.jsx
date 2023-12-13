import { Route, Routes } from "react-router-dom"

import { HeroesRoutes } from "../heroes"
import { LoginPage } from "../auth"
import { PrivateRoute, PublicRoute } from "./index"




export const AppRouter = () => {
  return (
    <>
      
      <Routes>

          <Route path="/login" element={ 
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }/>

          <Route path="/*" element={
            <PrivateRoute>
              <HeroesRoutes />
            </PrivateRoute>
          }/>

          {/* <Route path="/*" element={ <HeroesRoutes />} /> */}

      </Routes>
  </>
  )
}
