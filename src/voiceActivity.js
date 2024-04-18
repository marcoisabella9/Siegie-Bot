require('dotenv').config(); //requires dotenv, used for token

const {Client, IntentsBitField, ActivityType} = require('discord.js'); //imports from discord.js, Client - Bot itself, IntentsBitField - Intents (seen below), ActivityType - for custom status

//client requires certain permissions from discord
const client = new Client ({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
        IntentsBitField.Flags.GuildPresences,
        IntentsBitField.Flags.GuildVoiceStates,
    ]
});

//runs when bot initialized
client.on('ready', (c) => {
    console.log(`${c.user.username} is online. 😊 Type '!checksiege' to check the Squad, or !help`);

    //sets bot custom status
    client.user.setActivity({
        name: 'Type !help',
        type: ActivityType.Custom
    })
});

client.on('messageCreate', async (message) => { //async function allows for 'await' otherwise will reply multiple times
    if (message.content.toLowerCase() === '!help') {
        message.channel.send(`Siegie is online. 😊 Type '!checkSiege' to check the Squad!`);
    }
    
    if (message.content.toLowerCase() === '!checksiege') {
        const activityToCheck = 'Rainbow Six Siege';  //can change activity to any desired game
        let count = 0;
        let voiceCount = 0;

        const guildVoices = await message.guild.members.cache.filter(member => member.voice.channel);

        console.log(guildVoices);
        // guildVoices.forEach(member => {
            
        // });
        
        
        const members = await message.guild.members.fetch();
        
        // members.forEach(member => {
        //     // console.log(`${member.presence} ${member.presence.activities}`);
        //     if (member.presence && member.presence.activities) { //user only counted if has presence and has an activity
        //         member.presence.activities.forEach(activity => {
        //             console.log(`${member.user.username}: ${activity.name}`); //for debugging
        //             if (activity.name.indexOf(activityToCheck) > -1) {
        //                 console.log(`${activity.name} | ${activity.name.indexOf(activityToCheck)}`);
        //                 console.log(activity.name.indexOf(activityToCheck) > -1)
        //                 count++;
        //                 console.log(count);
        //             }
        //         });
        //     }
        // });

        if (voiceCount < 1) {
            message.channel.send(`Nobody is on Siege right now... 😒`);
        }
        else if (voiceCount < 4) {
            message.channel.send(`Siege Squad could use some more right now, only ${count} on! 👀`);
        }
        else if (voiceCount === 4) {
            message.channel.send(`Act Fast! Only one more spot on Siege! 🏃‍♂️`);
        }
        else {
            message.channel.send(`Siege Squad is full... 😞 better luck next time.`);
        }
    }
})

client.login(process.env.TOKEN); //uses token from .env to remain private