import React from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import App from '../App'
import TopCustomers from './TopCustomers'
import WithAuth from '../components/shared/WithAuth'
import WithoutAuth from '../components/shared/WithoutAuth'
import Companies from './Companies'
import CompanyForm from './CompanyForm'
import Dashboard from './Dashboard'
import LatestPosts from './LatestPosts'
import Login from './Login'
import VenueForm from './VenueForm'
import Venues from './Venues'
import { RootState } from '../store/configureStore'
import { useSelector } from 'react-redux'


const AppRoutes = () => {
  const userRole = useSelector((state: RootState) => state.authReducer?.userData?.role?.name);
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="/" element={<Navigate to="/auth" />} />
        <Route
          path="/dashboard"
          element={
            <WithAuth>
              <Dashboard />
            </WithAuth>
          }
        />
        {
          userRole === 'SuperAdmin' ? 
          <Route
            path="/venues"
            element={
              <WithAuth>
                <Venues />
              </WithAuth>
            }
          /> : null
        }
        <Route
          path="/venues/:id"
          element={
            <WithAuth>
              <VenueForm />
            </WithAuth>
          }
        />
        <Route
          path="/company"
          element={
            <WithAuth>
              <Companies />
            </WithAuth>
          }
        />
        <Route
            path="/company/:id"
            element={
              <WithAuth>
                <CompanyForm />
              </WithAuth>
            }
        />
        <Route
          path="/latest-posts"
          element={
            <WithAuth>
              <LatestPosts />
            </WithAuth>
          }
        />
        <Route
          path="/top-customers"
          element={
            <WithAuth>
              <TopCustomers />
            </WithAuth>
          }
        />
        <Route
          path="auth"
          element={
            <WithoutAuth>
              <Login />
            </WithoutAuth>
          }
        />
        <Route
          path="*"
          element={
            <main style={{ padding: '1rem' }}>
              <p>{"There's nothing here!"}</p>
            </main>
          }
        />
      </Route>
    </Routes>
  </BrowserRouter>
  )
}

export default AppRoutes
