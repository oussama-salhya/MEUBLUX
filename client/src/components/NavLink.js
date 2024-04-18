import React from 'react'
import { Link } from 'react-router-dom'
import { GrCart } from 'react-icons/gr'
import { BiChevronRight } from 'react-icons/bi'
const NavLinkComponent = ({ label, path }) => {
    // nav-active
    return (
        <li className="nav-active">
            <Link to={path} className="nav-link">
                - {label}
            </Link>
        </li>
    )
}

export default NavLinkComponent
