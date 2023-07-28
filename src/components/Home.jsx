import React from 'react'
import { useSelector } from 'react-redux'

function Home() {
    const userToken = useSelector(state => state.auth.userToken)
    console.log(userToken)
  return (
    <div id="home">
        <div id="ezguild-intro">
            <h1 id="ezguild-title">EZGuild</h1>
            <p id="ezguild-description">
                Having been a guild leader I can sympathize with how annoying it can be to try and manage everything. That's I've created EZ Guild. EZ guild keeps everything in one place. After making an account, you can manage your guild's raid roster, track professions, and view guild logs.
                <br />
                <br />
                EZGuild is a work in progress. I'm currently working on adding more features and improving the UI. If you have any suggestions, please feel free to reach out to me on discord @nesaima.
            </p>
        </div>
    </div>
  )
}

export default Home