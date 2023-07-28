import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addToRoster } from './slices/rosterSlice'

function CharacterAdd() {
    const [name, setName] = useState('')
    const [race, setRace] = useState('')
    const [characterClass, setCharacterClass] = useState('')
    const [spec, setSpec] = useState('')
    const [selectedProfessionOne, setSelectedProfessionOne] = useState([]);
    const [selectedProfessionTwo, setSelectedProfessionTwo] = useState([]);
    const [role, setRole] = useState('')
    const dispatch = useDispatch()

    const raceClassOptions = {
        Human: ['Warrior', 'Hunter', 'Mage', 'Rogue', 'Priest', 'Warlock', 'Paladin', 'Monk', 'Death Knight'],
        Dwarf: ['Warrior', 'Paladin', 'Hunter', 'Rogue', 'Priest', 'Shaman', 'Mage', 'Warlock', 'Monk', 'Death Knight'],
        NightElf: ['Warrior', 'Hunter', 'Rogue', 'Priest', 'Druid', 'Demon Hunter', 'Mage', 'Monk', 'Death Knight'],
        Gnome: ['Warrior', 'Rogue', 'Priest', 'Warlock', 'Mage', 'Monk', 'Death Knight'],
        Draenei: ['Warrior', 'Paladin', 'Hunter', 'Priest', 'Shaman', 'Mage', 'Monk', 'Death Knight'],
        Worgen: ['Warrior', 'Hunter', 'Rogue', 'Priest', 'Druid', 'Mage', 'Warlock', 'Death Knight'],
        Orc: ['Warrior', 'Hunter', 'Rogue', 'Shaman', 'Warlock', 'Monk', 'Death Knight'],
        Undead: ['Warrior', 'Rogue', 'Priest', 'Mage', 'Warlock', 'Monk', 'Death Knight'],
        Tauren: ['Warrior', 'Paladin', 'Hunter', 'Priest', 'Shaman', 'Druid', 'Monk', 'Death Knight'],
        Troll: ['Warrior', 'Hunter', 'Rogue', 'Priest', 'Shaman', 'Druid', 'Mage', 'Monk', 'Death Knight'],
        BloodElf: ['Warrior', 'Paladin', 'Hunter', 'Rogue', 'Priest', 'Mage', 'Warlock', 'Monk', 'Death Knight'],
        Pandaren: ['Warrior', 'Hunter', 'Rogue', 'Priest', 'Shaman', 'Mage', 'Monk'],
        Nightborne: ['Warrior', 'Hunter', 'Rogue', 'Priest', 'Mage', 'Warlock', 'Monk'],
        HighmountainTauren: ['Warrior', 'Hunter', 'Shaman', 'Druid', 'Monk'],
        VoidElf: ['Warrior', 'Hunter', 'Priest', 'Mage', 'Warlock', 'Monk'],
        LightforgedDraenei: ['Warrior', 'Paladin', 'Hunter', 'Priest', 'Mage', 'Warlock', 'Monk'],
        ZandalariTroll: ['Warrior', 'Paladin', 'Hunter', 'Rogue', 'Priest', 'Shaman', 'Druid', 'Mage', 'Monk', 'Death Knight'],
        KulTiran: ['Warrior', 'Hunter', 'Rogue', 'Priest', 'Druid', 'Mage', 'Monk', 'Death Knight'],
        DarkIronDwarf: ['Warrior', 'Paladin', 'Hunter', 'Rogue', 'Priest', 'Shaman', 'Mage', 'Monk', 'Death Knight'],
        Vulpera: ['Warrior', 'Hunter', 'Priest', 'Shaman', 'Mage', 'Monk', 'Death Knight'],
        MagharOrc: ['Warrior', 'Hunter', 'Rogue', 'Shaman', 'Mage', 'Monk', 'Death Knight'],
        Mechagnome: ['Warrior', 'Hunter', 'Priest', 'Mage', 'Monk', 'Death Knight'],
        Dracthyr: ['Evoker']

    }

    const classSpecOptions = {
        Warrior: ['Fury', 'Protection', 'Arms'],
        Paladin: ['Holy', 'Protection', 'Retribution'],
        Hunter: ['Beast Mastery', 'Marksmanship', 'Survival'],
        Rogue: ['Assassination', 'Outlaw', 'Subtlety'],
        Priest: ['Discipline', 'Holy', 'Shadow'],
        DeathKnight: ['Blood', 'Frost', 'Unholy'],
        Shaman: ['Elemental', 'Enhancement', 'Restoration'],
        Mage: ['Arcane', 'Fire', 'Frost'],
        Warlock: ['Affliction', 'Demonology', 'Destruction'],
        Monk: ['Brewmaster', 'Mistweaver', 'Windwalker'],
        Druid: ['Balance', 'Feral', 'Guardian', 'Restoration'],
        DemonHunter: ['Havoc', 'Vengeance'],
        Evoker: ['Devastation', 'Preservation', 'Augmentation']
      };

      const handleSpecChange = (e) => {
        const selectedSpec = e.target.value;
        setSpec(selectedSpec);
        const specToRole = {
            Fury: 'DPS',
            Protection: 'Tank',
            Arms: 'DPS',
            Holy: 'Healer',
            Retribution: 'DPS',
            BeastMastery: 'DPS',
            Marksmanship: 'DPS',
            Survival: 'DPS',
            Assassination: 'DPS',
            Outlaw: 'DPS',
            Subtlety: 'DPS',
            Discipline: 'Healer',
            Shadow: 'DPS',
            Blood: 'Tank',
            Frost: 'DPS',
            Unholy: 'DPS',
            Elemental: 'DPS',
            Enhancement: 'DPS',
            Restoration: 'Healer',
            Arcane: 'DPS',
            Fire: 'DPS',
            Affliction: 'DPS',
            Demonology: 'DPS',
            Destruction: 'DPS',
            Brewmaster: 'Tank',
            Mistweaver: 'Healer',
            Windwalker: 'DPS',
            Balance: 'DPS',
            Feral: 'DPS',
            Guardian: 'Tank',
            Havoc: 'DPS',
            Vengeance: 'Tank',
            Devastation: 'DPS',
            Preservation: 'Healer',
            Augmentation: 'DPS'
        };
        setRole(specToRole[selectedSpec] || '');
      };

      const professionOptions = [
        'Alchemy',
        'Blacksmithing',
        'Enchanting',
        'Engineering',
        'Herbalism',
        'Inscription',
        'Jewelcrafting',
        'Leatherworking',
        'Mining',
        'Skinning',
        'Tailoring',
      ];

      const handleAddCharacter = (e) => {
        const characterData = {
            character: {
                name: name,
                race: race,
                character_class: characterClass,
                spec: spec,
                professions: selectedProfessionOne + '/' + selectedProfessionTwo,
                role: role
            }
        }
        dispatch(addToRoster(characterData))
    }

    return (
        <div>
            <input type="name" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} />
            <select value={race} onChange={(e) => setRace(e.target.value)}>
                <option value="">- Select a race -</option>
                <option value="Human">Human</option>
                <option value="Dwarf">Dwarf</option>
                <option value="Night Elf">Night Elf</option>
                <option value="Gnome">Gnome</option>
                <option value="Draenei">Draenei</option>
                <option value="Worgen">Worgen</option>
                <option value="Orc">Orc</option>
                <option value="Undead">Undead</option>
                <option value="Tauren">Tauren</option>
                <option value="Troll">Troll</option>
                <option value="BloodElf">Blood Elf</option>
                <option value="Goblin">Goblin</option>
                <option value="Pandaren">Pandaren</option>
                <option value="Nightborne">Nightborne</option>
                <option value="HighmountainTauren">Highmountain Tauren</option>
                <option value="VoidElf">Void Elf</option>
                <option value="Lightforged Draenei">Lightforged Draenei</option>
                <option value="ZandalariTroll">Zandalari Troll</option>
                <option value="KulTiran">Kul Tiran</option>
                <option value="DarkIronDwarf">Dark Iron Dwarf</option>
                <option value="Vulpera">Vulpera</option>
                <option value="Mag'harOrc">Mag'har Orc</option>
                <option value="Mechagnome">Mechagnome</option>
                <option value="Dracthyr">Dracthyr</option>
            </select>
            <select value={characterClass} onChange={(e) => setCharacterClass(e.target.value)}>
                <option value="">- Select a class -</option>
                {raceClassOptions[race] &&
                    raceClassOptions[race].map((classOption) => (
                        <option key={classOption} value={classOption}>
                        {classOption}
                        </option>
                    ))}
            </select>
            <select value={spec} onChange={handleSpecChange}>
                <option value="">- Select a spec -</option>
                {classSpecOptions[characterClass] &&
                    classSpecOptions[characterClass].map((specOption) => (
                        <option key={specOption} value={specOption}>
                        {specOption}
                        </option>
                    ))}
            </select>
            <select value={selectedProfessionOne} onChange={(e) => setSelectedProfessionOne(e.target.value)}>
                <option value="">- Select first profession -</option>
                {professionOptions.map((professionOption) => (
                    <option key={professionOption} value={professionOption}>
                    {professionOption}
                    </option>
                ))}
            </select>
            <select value={selectedProfessionTwo} onChange={(e) => setSelectedProfessionTwo(e.target.value)}>
                <option value="">- Select second profession -</option>
                {professionOptions.map((professionOption) => (
                    <option key={professionOption} value={professionOption}>
                    {professionOption}
                    </option>
                ))}
            </select>
            <button onClick={() => handleAddCharacter()}>Add Character</button>
        </div>
    )
}

export default CharacterAdd