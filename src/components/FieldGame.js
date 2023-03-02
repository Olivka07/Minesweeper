import {useState} from 'react'
import { useGame } from '../context/GameContext'
import Zone from './Zone'

export default function FieldGame() {

    const {sizeX, sizeY} = useGame()
    
    

    return (
            <div className='field'> 
                {Array(sizeY).fill('').map((_, i) => {
                    return (
                        <div key={i} className='row'>
                            {Array(sizeX).fill('').map((_, j) => {
                                return (
                                    <Zone i={i} j={j} key={i+j} />
                                )
                            })}
                        </div>
                    )
                })}
            </div>
    )
}