import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from "react-router-dom"
import Router from "./routes/Router";
import {QueryClientProvider} from "@tanstack/react-query";
import queryClient from "./utils/queryClient";
import './scss/styles.scss'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={Router}/>
  </QueryClientProvider>
)
