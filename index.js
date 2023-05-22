// Require the necessary discord.js classes
const { Client, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions] });

// When the client is ready, run this code (only once)
client.once('ready', c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.on('messageReactionAdd', reaction => {
	if (reaction.emoji.name === 'cringe' && reaction.count === 1) {
		reaction.message.reply("pretty cringe my guy");
	}
	else if (reaction.emoji.name === 'cringe' && reaction.count === 2) {
		reaction.message.reply("whoa tone it down, very cringe");
	} else return;
});

client.on('interactionCreate', async interaction => {
	console.log(interaction);
	if (!interaction.isChatInputCommand()) return;

	const { commandName } = interaction;

	if (commandName === 'ping') {
		await interaction.reply('Pong!');
	} else if (commandName === 'server') {
		await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);
	} else if (commandName === 'user') {
		await interaction.reply(`Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`);
	}
});

/*
client.on('messageReactionAdd', messageReaction => {
	messageReaction.message.reply(`This is cringe ${messageReaction.emoji}`);
	
	if (messageReaction.emoji.name === 'cringe') {
        messageReaction.message.channel.send(`@${messageReaction.message.author.username} that is a bit cringe my guy - tone it down`);
    }
	
}); */

// Login to Discord with your client's token
client.login(token);