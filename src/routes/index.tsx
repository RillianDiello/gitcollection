import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
//import { Dashboard } from '../pages/Dashboard';
//import { Repo } from '../pages/Repo';
const Dashboard = lazy(() => import(
    /* webpackChunkName: "dashboard" */
    /* webpackPrefetch: true */
'../pages/Dashboard'))
const Repo = lazy(() => import(
    /* webpackChunkName: "repo" */
    /* webpackPrefetch: true */
  '../pages/Repo'))
export const MainRoutes: React.FC = ()  => {


  return (  
    
    <Suspense fallback={'...Loading'}>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/repositories/:repository" element={<Repo />} />        
      </Routes>
    </Suspense>
  );
}


