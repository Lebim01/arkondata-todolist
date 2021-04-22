import { v4 } from 'uuid'

const titles = ["Read a Book in One Day","Learn How to Play the Piano","Learn to Say “Hello” in 15 Languages","Fall in Love Accidentally","Run London Marathon","Create a College Photo Album","Spend Time in the Amazon Rainforest","Make at Least $1000 a Month from the Internet","Bake my Own Bread","Complete a Dakar Rally","Feed a Homeless","Visit 15 Attractions of the Unesco World Heritage List","Start a Memory Jar","Make a Family Photo Album","Do a 1St Aid Course","Make a Quotes Board","Take a Shot of Vodka in Red Square, Moscow","Sail on the Nile River","Learn How to Play at Least One Song With Guitar","Write a Book","Host my Own Travel Documentary","Participate in a Tomato Battle","Have a Podcast","Hang Out of a Sunroof While Someone Is Driving","Attend One of Anthony Robbins' Events","Bake Halloween Cookies","Read Oprah's Entire Book List","Reach all Six Provinces of the Bicol Region","Grow my Hair Long","Go Red Back Spider Hunting","Appear As an Extra in a Period Drama","Paint my Front Door Pink","Explore Asia and the Far East","Laugh Daily","Build A Healthier America","Go to the Bermuda Triangle","Eat Cajun Food in New Orleans","Open a Coffee Shop","Go to an Indian Wedding","Learn to Do a Handstand","Master the Scorpion Yoga Pose","Let my Hair Get Really Long","Drink 10 Different Cocktails","Hike the Entire Bruce Trail","Do a Firewalking","Learn How to Paddle Board","Learn to Hang Glide","Make a Gingerbread House","Attend a 10-Day Vipassana Meditation Course","Be in a Front Row at Rock Concert"]
const durations = [
    {
        id: 1,
        title: 'Corto',
        description: '-30m',
        color: 'success',
        secDuration: 30 * 60
    },
    {
        id: 2,
        title: 'Medio',
        description: '30m - 1h',
        color: 'info',
        secDuration: 60 * 60
    },
    {
        id: 3,
        title: 'Largo',
        description: '1h+',
        color: 'warning',
        secDuration: 2 * 60 * 60
    }
]

function substractDays(days){
    let dateOffset = (24*60*60*1000) * days; 
    let myDate = new Date();
    myDate.setTime(myDate.getTime() - dateOffset);
    return myDate
}

function between(min, max) {  
    return Math.floor(
        Math.random() * (max - min + 1) + min
    )
}

export const getData = () => {
    let todos = []

    for(let i  = 1; i <= 50; i++){
        let date = substractDays(between(1, 7))
        let duration = durations[between(0, 2)]
        let progress = duration.secDuration * (between(8, 10))/10

        todos.push({
            uuid: v4(),
            title: titles[i-1],
            duration,
            progress,
            completed: true,
            completed_at: date
        })
    }

    return todos
}