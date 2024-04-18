import React, { useRef } from 'react'
import { BiHomeAlt, BiCartAlt } from 'react-icons/bi'
import { HiChevronRight } from 'react-icons/hi'
import NavLink from './NavLink'
const NavGroup = ({ groupLabel, subLinks }) => {
    const containerLinks = useRef(null)
    const containerSubLinks = useRef(null)
    const handleClick = (e) => {
        e.currentTarget.classList.toggle('nav-expanded')
        const containerLinksHeight = containerLinks.current.getBoundingClientRect().height;
        const containerSubLinksHeight = containerSubLinks.current.getBoundingClientRect().height;
        if (containerLinksHeight === 0) {
            containerLinks.current.style.height = `${containerSubLinksHeight}px`
        }
        else {
            containerLinks.current.style.height = '0px'
        }

    }
    return (
        <li className="nav-parent nav-active nav-expanded" onClick={handleClick}>
            <a className="nav-link" href="#" onClick={(e) => e.preventDefault()}>
                <BiCartAlt />
                <span>{groupLabel}</span>
                <HiChevronRight />
            </a>
            <ul className="nav nav-children" ref={containerLinks}>
                <div ref={containerSubLinks}>
                    {
                        subLinks.map((item, index) => {
                            return <NavLink key={index} {...item} />
                        })
                    }
                </div>



            </ul>
        </li>
    )
}

export default NavGroup
