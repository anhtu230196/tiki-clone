import React from 'react'
import Header from '../Header/Header'
import MenuHeader from '../MenuHeader/MenuHeader'

function Layout({ children }) {
    return (
        <>
            <Header />
            <MenuHeader />
            {
                children
            }
        </>
    )
}

export default Layout
