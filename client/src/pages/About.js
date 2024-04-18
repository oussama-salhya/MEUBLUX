import React from 'react'
import carpenter from '../assets/carpenter.jpg'
import about2 from '../assets/about-2.jpeg';
import styled from 'styled-components'
import { useEffect } from 'react'
const About = () => {
    useEffect(() => {
        document.body.classList.add('black');
        return () => {
            document.body.classList.remove('black');
        }
    }, [])
    const expertStyle = {
        background: `linear-gradient(rgb(0 0 0 / 96%), rgb(0 0 0 / 65%)),
        url(${about2}) center/ cover`
    }
    return (
        <Wrapper>
            <section className='brand'>
                <div className="section-desc">
                    <div>
                        <h4>OUR IDENTITY</h4>
                        <h1>
                            <span>Behind</span> <br />
                            <span>the Brand</span>
                        </h1>
                        <p>
                            We stay up-to-date with the latest global trends in interior design, incorporating them into our designs which are brought to life by our skilled craftsmen, giving you the perfect blend of inspiration and expertise.
                        </p>
                    </div>
                </div>
                <div className="section-img">
                    <img src={carpenter} alt="carpenter" />
                </div>
            </section>
            <section className="experts" style={expertStyle}>
                <div className="section-desc">
                    <h4>OUR STORY</h4>
                    <h1>From kitchen experts <br />
                        to high-end interior specialists</h1>
                    <p>Because craftsmanship outlives every trend</p>
                </div>
            </section>
        </Wrapper>
    )
}

const Wrapper = styled.div` 
    .brand{
        display: grid;
        flex-wrap: wrap;
        min-height : 100vh;
    }
    h4{
        font-size: 12px;
        color: #cba14a;
        line-height: 12px;
        text-align: left;
        font-weight: 700 !important;
        letter-spacing: 3px;
    }
    .section-desc h1{
        font-weight: 600;
        font-size: 3.5rem;
    }
    .section-desc p{
        font-size: 1.3rem;
        color: #bcbcbc;
        line-height: 40px;
        text-align: left;
        font-weight: 300;
    }
    .section-img{
        position : relative
    }
    .section-img img{
        height: 100vh;
        width : 100%;
    }
    .section-img::after{
        content : "";
        position : absolute;
        top : 0 ; 
        left : 0; 
        width : 100%;
        height : 100%;
        background : linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)) ;
    }
    @media screen and (min-width: 1000px){
        .brand{
            margin-top : -7rem ; 
            grid-template-columns : 2fr 1.1fr ;
            align-items: center;
        }
    }
    @media screen and (min-width: 1200px){
        .brand{
            grid-template-columns : 1fr 1fr ;
        }
    }

    
    @media screen and (min-width: 1000px){
        .section-desc > div{
            width: 66%;
            padding: 0 10%;
            margin: 0 auto;
        }
        .section-desc h1 span:first-child{
            margin-left: -2rem;
        }
    }
    @media screen and (max-width: 1000px){
        .section-desc{
            width: 90%;
            max-width: 50ch;
            margin: 3rem auto;
            padding-top: 25vw;
            margin-top: 0;
        } 
        br{
            display : none;
        }
        .section-desc h1{
            font-size: 2.75rem;
        }
        .section-desc p{
            font-size : 1.15rem
        }

    }
    @media screen and (max-width : 768px){
        .section-desc h1{
            font-size: 2.15rem;
        }
    }
    .experts{
        min-height : 60vh;
        display : flex ; 
        justify-content : center ; 
        align-items : center ; 
    }


`

export default About
