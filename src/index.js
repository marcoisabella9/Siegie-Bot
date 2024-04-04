require('dotenv').config();

const {Client, IntentsBitField} = require('discord.js');

const client = new Client ({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
        IntentsBitField.Flags.GuildPresences,
    ]
});

client.on('ready', (c) => {
    console.log(`${c.user.username} is online. 😊 Type '!checkSiege' to check the Squad!`);
});

client.on('messageCreate', (message) => {
    if (message.content === '!checkSiege') {
        const guild = message.guild;
        const activityToCheck = 'Rainbow Six Siege';  //can change activity to any desired game

        let count = 0;
        guild.members.cache.forEach(member => {
            member.presence.activities.forEach(activity => {
                if (activity.type === 'PLAYING' && activity.name === activityToCheck) {
                    count++;
                }
            });
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

client.login(process.env.TOKEN);