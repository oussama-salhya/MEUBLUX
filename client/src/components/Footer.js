import React from 'react'
import { BsInstagram, BsPinterest, BsTwitter } from 'react-icons/bs'
import { FaFacebookF } from 'react-icons/fa'
import { TiSocialFacebook } from 'react-icons/ti'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Footer = () => {
    return (
        <Wrapper>
            <div className="container">
                <div className='intro'>
                    <h5>Get in touch</h5>
                    <h3>
                        We are looking <br /> forward to hearing from you
                    </h3>
                </div>
                <div className="footer-info">
                    <div>
                        <h4 className='footer-title'>
                            visit us
                        </h4>
                        <p>
                            16 Boulevard AlQods <br />
                            75005 Casablanca, <br />
                            Morroco
                        </p>
                    </div>
                    <div>
                        <h4 className='footer-title'>
                            Phone / Email
                        </h4>
                        <p>
                            <span>info@meublux.com</span>
                            <span>+212 6 50 61 32 62</span>
                        </p>
                    </div>
                    <div>
                        <h4 className='footer-title'>
                            Follow Us
                        </h4>
                        <div className="icons">
                            <Link to='/about'><FaFacebookF /></Link>
                            <Link to='/about'><BsTwitter /></Link>
                            <Link to='/about'><BsPinterest /></Link>
                            <Link to='/about'><BsInstagram /></Link>
                        </div>

                    </div>
                </div>

            </div>
        </Wrapper>
    )
}

const Wrapper = styled.footer`
    background : #161616 ;
    color : white ; 
    padding:100px 0 80px 0;
    .container{
        display : grid;
    }
    .intro{
        position : relative;
    }
    h5{
        font-size: .85rem;
        color: var(--gold);
        line-height: 12px;
        text-align: left;
        font-weight: 700 !important;
        letter-spacing: 3px;
        text-transform: uppercase;
        position : absolute;
        top : -30px;
    }
    h3{
        font-size: 2.4rem;
        max-width: 15ch;
        font-weight: 600;
        text-transform : initial;
        line-height: 1.13;
    }
    .footer-title{
        font-size: 1.4rem;
        line-height: 30px;
        text-align: left;
        margin-bottom: 10px;
        font-weight: 600;
        letter-spacing: 1px;
    }
    p{
        color: #bcbcbc;
        font-size: 1.15rem;
        line-height: 1.7;
        font-weight: 300;
        letter-spacing: 1px;
        margin-bottom: 1.875rem;
    }
    p span{
        display : block;
    }
    .icons{
        display : flex;
        gap : 20px; 
        font-size : 24px;
        margin-top : 15px;
    }
    .icons a{
        position : relative;
        color : white;
        transition : .5s ease ;
        z-index : 1;
    }
    .icons a:hover{
        color : black ;
    }
    .icons a:hover svg{
        transform : scale(0.8);
    }
    .icons a::after{
        content : '';
        position : absolute;
        top : 0; 
        left : 0; 
        background :white; 
        width : 100%;
        height : 100%;
        transform: scale(0);
        transform-origin : center;
        transition : .5s ease;
        border-radius : 50%;
        z-index : -1;
    }
    .icons a:hover::after{
        transform : scale(1.5);
    }
    @media screen and (min-width : 992px){
        .container{
            grid-template-columns : 41.666667% 58.33333333%;
        } 
        .footer-info > div{
            float : left;
            width: 50%;
        }
    }
    @media screen and (min-width : 1200px){
        .container{
            grid-template-columns : 33.33333333% 66.66666667%;
        } 
        .footer-info > div{
            width: 33.33333333%;
        } 
    }
    @media screen and (max-width : 992px){
        h3{
            max-width: 30ch;
            font-size: 2.2rem;
        }
        .footer-info{
            margin-top: 40px;
        }
    }
    @media screen and (max-width : 768px){
        h3{
            font-size : 1.6rem;
        }
    }

`

export default Footer
