import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { BiChevronDown } from 'react-icons/bi'
import NavGroup from './NavGroup'
import NavItem from './NavItem'
import NavLink from './NavLink'
import links from '../utils/links'
const SidebarLayout = ({ isSidebaropen, toggleSidebar }) => {
    return (
        <aside id="sidebar-left" className="sidebar-left">

            <div className="sidebar-header">
                <div className="sidebar-toggle">
                    <button className="toggle-sidebar">
                        <div className="hamburger-menu" >
                            <div className="line-1" ></div>
                            <div className="line-2"></div>
                        </div>
                    </button>
                </div>
            </div>
            <div className="nano">
                <div>
                    <nav id="menu">
                        <ul className="nav-main">
                            {
                                links.map((link, index) => {
                                    const { subLinks, groupLabel, icon, label, path } = link
                                    if (subLinks) {
                                        return <NavGroup key={index} subLinks={subLinks} groupLabel={groupLabel} />
                                    }
                                    return <NavItem key={index} path={path} icon={icon} label={label} />
                                })
                            }
                        </ul>
                    </nav>
                </div>
            </div>
        </aside >

    )
}



export default SidebarLayout
