require('dotenv').config(); //requires dotenv, used for token

const {Client, IntentsBitField} = require('discord.js');

//client requires certain permissions from discord
const client = new Client ({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
        IntentsBitField.Flags.GuildPresences,
    ]
});

//welcome message when initialized
client.on('ready', (c) => {
    console.log(`${c.user.username} is online. 😊 Type '!checkSiege' to check the Squad!`);
});

client.on('messageCreate', async (message) => { //async function allows for 'await' otherwise will reply multiple times
    if (message.content === '!checkSiege') {
        const activityToCheck = 'Rainbow Six Siege';  //can change activity to any desired game
        let count = 0;
        
        const members = await message.guild.members.fetch();
        members.forEach(member => {
            if (member.presence && member.presence.activities) { //user only counted if has presence and has an activity
                member.presence.activities.forEach(activity => {
                    console.log(`${member.user.username}: ${activity.name}`); //for debugging
                    if (activity.name === activityToCheck) {
                        count++;
                    }
                });
            }
        });

        if (count < 1) {
            message.channel.send(`Nobody is on Siege right now... 😒`);
        }
        else if (count < 4) {
            message.channel.send(`Siege Squad could use some more right now, only ${count} on! 👀`);
        }
        else if (count >= 5) {
            message.channel.send(`Siege Squad is full... 😞 better luck next time.`);
        }
        else {
            message.channel.send(`Act Fast! Only one more spot on Siege! 🏃‍♂️`);
        }
    }
})

client.login(process.env.TOKEN); //uses token from .env to remain private