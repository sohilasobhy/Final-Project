import React from 'react'
import NavBar from '../Components/NavBar'
import Footer from '../Components/Footer'
import { Outlet } from 'react-router-dom'
import Search from '../Components/Search'
import CircleProgress from '../Components/CircleProgress'

export const MainLayout = () => {
    return (
        <>
            <NavBar />
            <Search />
            <CircleProgress />
            <Outlet />
            <Footer />
        </>
    )
}
