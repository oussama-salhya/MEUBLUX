import React from 'react'
import styled from 'styled-components'

const UserAvatar = ({ name, image }) => {
    return (
        <Wrapper className='user-img'>
            {
                image ?
                    <img src={image} className='image' alt={name} />
                    :
                    <div className="img-name">
                        {
                            name.split(' ').reduce((res, item, index) => {
                                return res + item[0]
                            }, '')
                        }
                    </div>

            }
        </Wrapper>
    )
}
const Wrapper = styled.div`
    &{
        display : flex; 
        justify-content : center ; 
        align-items : center;
    }
   .img-name{
        background : var(--black) ; 
        font-size : 1.6rem ; 
        color : var(--white);
        display : flex; 
        justify-content : center ; 
        align-items : center;
        text-transform : uppercase;
        letter-spacing : 1px;
        font-weight : bold;
   }
   .image{
        width : 100%;
        height : 100%;
   }

`

export default UserAvatar
