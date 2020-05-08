import React from 'react'

function MyCard({ front, back, status }) {
    return (
        <div>
            {

                status ?
                    <img src={front} alt={'pizarron'} />
                    :
                    <img src={back} alt={'imagen'} />
            }
        </div>
    )
}

export default MyCard