import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

const NavItem = ({ path, label, icon }) => {
    return (
        <li>
            <Link className="nav-link" to={path}>
                {icon}
                <span>{label}</span>
            </Link>
        </li>
    )
}

export default NavItem
