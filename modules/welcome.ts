module.exports = {
    welcome(client) {

        //Runs when a member joins a guild
        client.on('guildMemberAdd', join => {
            if (join.guild.id !== `698590629344575500`) return;
            const channel = join.guild.channels.cache.find(channel => channel.id == `698591277205422171`);
            channel.send(`Welcome ${join} to ICOC Teens! <a:wavehi:769217908373979156>`);
            join.send(`Welcome ${join} to ICOC Teens! <a:wavehi:769217908373979156>\n\nThanks for checking out the server. To join the server please fill out this form!\n\n<https://docs.google.com/forms/d/e/1FAIpQLSfatFjGGgYmdMjsPFZKM-KX8zEuWvlKi76KX8XNceGTbEiMlw/viewform>\nIf you have any issues/questions filling out the form, feel free to dm a staff member <:smileanime:790423498370580480>`);
        });

    },
};