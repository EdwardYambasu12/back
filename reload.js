const { register_model } = require("./auth.js");
const axios = require("axios");
const admin = require('./firebaseAdmin'); // Adjust the path as necessary
const path = require('path');

const image = path.join(__dirname, 'sportsup.png');
let previousData = [];

async function fetchData() {
    try {
        const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const userCode = await getUserCountryCode();
        const formattedDate = getFormattedDate();

        const newData = await fetchMatches(formattedDate, userTimeZone, userCode);
        const changes = findChanges(previousData, newData);

        processChanges(changes);
        previousData = newData;  // Update previousData

    } catch (error) {
        console.error('Error fetching data:', error);
    } finally {
        setTimeout(fetchData, 10000);  // Fetch data again after 10 seconds
    }
}

async function getUserCountryCode() {
    const response = await fetch('https://ipapi.co/json/');
    const { country_code: userCode } = await response.json();
    return userCode;
}

function getFormattedDate() {
    const date = new Date();
    return `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}`;
}

async function fetchMatches(date, timezone, countryCode) {
    const res = await axios.get('https://www.fotmob.com/api/matches', {
        params: { date, timezone, ccode3: countryCode },
        headers: { /* your headers here */ }
    });
    return res.data.leagues.flatMap(league => league.matches);
}
 
async function findChanges(previousData, newData) {
    // Ensure changes is an array
 const changes = [];
    for (const newItem of newData) {
        const foundInPrevious = previousData.find(item => item.id === newItem.id);
        
        if (!foundInPrevious) {
            changes.push({ type: 'start', match: JSON.stringify(newItem) }); // New match started
        } else {


            if (newItem.status.finished && !foundInPrevious.status.finished) {
                send_notification({ type: 'end', match : JSON.stringify(newItem)  }); // Match ended
            }

            if (newItem.home.score !== foundInPrevious.home.score) {
                send_notification({ type: 'goal', match : JSON.stringify(newItem) , team: newItem.home.name });
            }

            if (newItem.away.score !== foundInPrevious.away.score) {
                send_notification({ type: 'goal', match : JSON.stringify(newItem) , team: newItem.away.name });
            }
        }
    }

    return changes; // Always return an array
}

function processChanges(changes) {
    if (!Array.isArray(changes)) {
        console.error('Expected changes to be an array, but got:', changes);
        return;
    }

    changes.forEach(change => {
        switch (change.type) {
            case 'start':
                send_notification(`Match Started: ${change.home.name} vs ${change.away.name}`);
                break;
            case 'end':
                send_notification(`Match Ended: ${change.home.name} ${change.home.score} - ${change.away.score} ${change.away.name}`);
                break;
            case 'goal':
                send_notification(`Goal! ${change.home.name} ${change.home.score} - ${change.away.score} ${change.away.name}. Scorer: ${change.team}`);
                break;
        }
    });
}

async function send_notification(message) {

  
                async function final_sender(token, title, body, id) {
    const message = {
        notification: {
            title: title,
            body: body,
            click_action: "www.sportsupd.com/result/"+id
        },
        data: {
            icon: image, // Add your image URL here
        },
        token: token, // The FCM registration token of the device
    };

    try {
        const response = await admin.messaging().send(message);
        console.log('Successfully sent message:', response);
    } catch (error) {
        console.error('Error sending message:', error);
    }



    }
    
    const change = JSON.parse(message.match)
     switch (message.type) {
            case 'start':
                console.log(`Match Started: ${change.home.name} vs ${change.away.name}`);
                break;
            case 'end':
                console.log(`Match Ended: ${change.home.name} ${change.home.score} - ${change.away.score} ${change.away.name}`);
                break;
            case 'goal':
                console.log(`Goal! ${change.home.name} ${change.home.score} - ${change.away.score} ${change.away.name}. Scorer: ${change.team}`);
                break;
        }

        const item = await register_model.find()


        item.map((user)=>{

            let notify = false

               if (user.favorite_league.length > 0) {
                const leagueMatches = user.favorite_league.filter(i => JSON.parse(i).id === change.leagueId);
                if (leagueMatches.length > 0) notify = true;
            }

            else if (user.favorite_team.length > 0) {
                const teamMatches = user.favorite_team.filter(i => 
                    JSON.parse(i).id === change.home.id || 
                    JSON.parse(i).id === change.away.id
                );
                if (teamMatches.length > 0) notify = true;
            }

           else if (user.pinned_matches.length > 0) {
                const pinnedMatches = user.pinned_matches.filter(i => JSON.parse(i).id === change.id);
                if (pinnedMatches.length > 0) notify = true;
            }

            
             if (notify) {
                console.log("found for notification", user.phone_string);
                 switch (message.type) {
            case 'start':
                final_sender(user.phone_string, "Match Started", `Match Started: ${change.home.name} vs ${change.away.name}`, change.id);
                break;
            case 'end':
                final_sender(user.phone_string, "Match Ended", `Match Ended: ${change.home.name} ${change.home.score} - ${change.away.score} ${change.away.name}`, change.id);
                break;
            case 'goal':
                final_sender(user.phone_string, "Goal", `Goal! ${change.home.name} ${change.home.score} - ${change.away.score} ${change.away.name}.`, change.id);
                break;
        }
            }
        })

}

// Start fetching data
fetchData();
