import React from 'react'
import NavBar from '../Components/NavBar'
import Footer from '../Components/Footer'
import { Outlet } from 'react-router-dom'
import Search from '../Components/Search'
import CircleProgress from '../Components/CircleProgress'
import SideMenu from '../Components/SideMenu'
import ScrollToTop from '../Components/ScrollToTop'

export const MainLayout = () => {
    return (
        <>
            <NavBar />
            <ScrollToTop/>
            <Search />
            <SideMenu/>
            <CircleProgress />
            <Outlet />
            <Footer />
        </>
    )
}
