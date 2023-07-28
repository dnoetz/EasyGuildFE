import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createRoster, getRoster } from './slices/rosterSlice'
import CharacterAdd from './CharacterAdd'

function Roster() {
    const dispatch = useDispatch()
    const roster = useSelector(state => state.roster.roster)
    const [rosterName, setRosterName] = useState('')
    const [authLoaded, setAuthLoaded] = useState(false);
    const [name, setName] = useState('')
    const [race, setRace] = useState('')
    const [characterClass, setCharacterClass] = useState('')
    const [spec, setSpec] = useState('')
    const [professions, setProfessions] = useState('')
    const [role, setRole] = useState('')
    const auth = useSelector(state => state.auth);
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

    useEffect(() => {
        if (typeof auth.userToken !== 'undefined' && typeof auth.userName !== 'undefined' && auth.isLoggedIn !== null) {
          setAuthLoaded(true);
        }
    }, [auth]);

    useEffect(() => {
        if (authLoaded && isLoggedIn) {
          dispatch(getRoster());
        }
    }, [authLoaded, isLoggedIn, dispatch]);

    const handleRosterCreation = (rosterName) => {
        const rosterData = {
            roster: {
                name: rosterName
            }
        }
        dispatch(createRoster(rosterData))
    }

    const tanks = roster?.characters?.filter(character => character.role === 'Tank')
    const healers = roster?.characters?.filter(character => character.role === 'Healer')
    const dps = roster?.characters?.filter(character => character.role === 'DPS')

    return (
        <div>
            {isLoggedIn ? (
                Object.keys(roster).length === 0 ? (
                    <div>
                        <h1>You have no roster. Add one to manage your guild.</h1>
                        <input 
                            type="text" 
                            name="rosterName" 
                            id="rosterName" 
                            value={rosterName} 
                            onChange={(e) => setRosterName(e.target.value)}
                        />
                        <button onClick={() => handleRosterCreation(rosterName)}>
                            Create Roster
                        </button>
                    </div>
                ) : (
                    Object.keys(roster.characters).length === 0 ? ( 
                        <div>
                            <h1>{roster.name}</h1>
                            <h2>You have no characters. Add one to manage your guild.</h2>
                            <CharacterAdd />
                        </div>
                    ) : ( 
                        <div id='big-roster-container'>
                            <p className='text-4xl text-center'>{roster.name}</p>
                            <div className="border-solid border-2 border-b-0 border-black w-2/3 m-auto my-4">
                                <div className='flex p-4 border-b-2 border-black'>
                                    <p className='w-1/5'>Name</p>
                                    <p className='w-1/5'>Race</p>
                                    <p className='w-1/5'>Class</p>
                                    <p className='w-1/5'>Spec</p>
                                    <p className='w-1/5'>Profession</p>
                                </div>
                                <div className=''>
                                    <p className='text-center text-3xl p-4 border-b-2 border-black'>Tanks</p>
                                    {tanks.map(character => {
                                        return (
                                            <div className='flex p-4 border-b-2 border-black' key={character.id}>
                                                <p className='w-1/5'>{character.name}</p>
                                                <p className='w-1/5'>{character.race}</p>
                                                <p className='w-1/5'>{character.character_class}</p>
                                                <p className='w-1/5'>{character.spec}</p>
                                                <p className='w-1/5'>{character.professions}</p>
                                            </div>
                                        )
                                    })}
                                </div>
                                <div id="healer-container">
                                    <p className='text-center text-3xl p-4 border-b-2 border-black'>Healers</p>
                                    {healers.map(character => {
                                        return (
                                            <div className='flex p-4 border-b-2 border-black' key={character.id}>
                                                <p className='w-1/5'>{character.name}</p>
                                                <p className='w-1/5'>{character.race}</p>
                                                <p className='w-1/5'>{character.character_class}</p>
                                                <p className='w-1/5'>{character.spec}</p>
                                                <p className='w-1/5'>{character.professions}</p>
                                            </div>
                                        )
                                    })}
                                </div>
                                <div id="dps-container">
                                    <p className='text-center text-3xl p-4 border-b-2 border-black'>DPS</p>
                                    {dps.map(character => {
                                        return (
                                            <div className='flex p-4 border-b-2 border-black' key={character.id}>
                                                <p className='w-1/5'>{character.name}</p>
                                                <p className='w-1/5'>{character.race}</p>
                                                <p className='w-1/5'>{character.character_class}</p>
                                                <p className='w-1/5'>{character.spec}</p>
                                                <p className='w-1/5'>{character.professions}</p>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                            <div>
                                <CharacterAdd />                            
                            </div>
                        </div>
                    )
                )
            ) : (
                <div>
                    <h1>You must be logged in to manage a roster.</h1>
                </div>
            )}
        </div>
    )
}

export default Roster