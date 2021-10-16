//https://discord.gg/developer-support
//الاكواد حقوقي وحقوق دفلوبر سبورت
//https://discord.gg/developer-support خشو سيرفرهم
const express = require('express');
const app = express();
app.get('/', (req, res) => {
    res.send('Hello Express app!')
});
app.listen(3000, () => {
    console.log('server started');
});

const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const moment = require('moment');
const ms = require("ms");
client.on('ready', () => {
    console.log(`Bot : ${client.user.tag}`);
    client.user.setStatus('online')
    client.user.setActivity(`${prefix}help`);
});
const prefix = "!"; //بريفكس البوت
//الاكواد العامه
//help
client.on('message', function(message) {
    if (message.content.startsWith(prefix + "help")) {
        let embed = new Discord.MessageEmbed()
            .setTitle("**Bot Commands Help**")
            .setColor("RANDOM")
            .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
            .setDescription(`
    __**public**__
${prefix}bot - info bot
${prefix}user - info user
${prefix}server - info server
${prefix}invites - info invite
${prefix}profile - show profile for probot
${prefix}avatar - See someone's avatar
${prefix}ping - to show ping bot
${prefix}id- to show your id 
${prefix}trash - mems trash
${prefix}credit - to show credit
${prefix}daily - To take the daily
__**admin**__
${prefix}ban - to ban member
${prefix}unban - to unban member
${prefix}unban-all - to unban all member
${prefix}kick - to kick member
${prefix}show - Show channel
${prefix}hide - Hide channel
${prefix}lock - Lock Channel
${prefix}unlock - Unlock Channel
${prefix}clear - Clear a chat
${prefix}role - to give member role
`)
        message.channel.send(embed)
    }
});
//info bot 
client.on('message', message => {
    if (message.content === prefix + 'bot') {
        const embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle('Info Bot’s !')
            .setThumbnail(`${client.user.displayAvatarURL({ dynamic: true })}`)
            .addField('Bot Neme', `${client.user.tag}`)
            .addField('Bot owner', `<@520505184120471572>`)
            .addField('Bot ping', `${client.ws.ping}ms`)
            .addField('Channels', `${client.channels.cache.size}`)
            .addField('Users', `${client.users.cache.size}`)
            .addField('Servers', client.guilds.cache.size)
            .setFooter(`Requested By ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
        message.channel.send(embed)
    }
});
//user
client.on("message", message => {
    if (message.content.startsWith(prefix + "user")) {
        var userr = message.mentions.users.first() || message.author;
        var memberr = message.mentions.members.first() || message.member;
        let userinfo = userr.displayAvatarURL({ size: 2048, dynamic: true });
        let embed = new Discord.MessageEmbed()
            .setColor("BLUE")
            .setAuthor(userr.username, userr.avatarURL({ dynamic: true }))
            .setThumbnail(userinfo)
            .addField(`Joind Discord :`, `\`${moment(userr.createdAt).format('YYYY/M/D')} ${moment(userr.createdAt).format('LTS')}\`\n**${moment(userr.createdAt, "YYYYMMDD").fromNow()}**`, true)
            .addField(`Joined Server :`, `\`${moment(memberr.joinedAt).format('YYYY/M/D')} ${moment(memberr.joinedAt).format('LTS')}\`\n**${moment(memberr.joinedAt, "YYYYMMDD").fromNow()}**`, true)
            .setFooter(userr.tag, userr.avatarURL({ dynamic: true }))
        message.channel.send(embed)
    }
})

//avatar all size 
client.on('message', message => {
        if (message.content.startsWith(prefix + 'avatar')) {
            let args = message.content.substring(prefix.length).split(" ");
            const user = message.mentions.users.first()
            if (!user && !args[1]) {
                const uavatar = message.author.avatarURL({ size: 4096, dynamic: true })
                const embed3 = new Discord.MessageEmbed()
                    .setTitle(`${message.member.user.username} avatar`)
                    .setDescription(`[Avatar URL of **${message.member.user.username}**](${uavatar})`)
                    .setColor('RANDOM')
                    .setImage(uavatar)
                message.channel.send(embed3)
            }
            if (args[1] === 'server') {
                const savatar = message.guild.iconURL({ size: 4096, dynamic: true })
                const embed2 = new Discord.MessageEmbed()
                    .setTitle(`${message.guild.name} avatar`)
                    .setDescription(`[Avatar URL of **${message.guild.name}**](${savatar})`)
                    .setColor('RANDOM')
                    .setImage(savatar)
                message.channel.send(embed2)
            }
            if (user) {
                const avatar = user.displayAvatarURL({ size: 4096, dynamic: true });
                const embed = new Discord.MessageEmbed()
                    .setTitle(`${user.username} avatar`)
                    .setDescription(`[Avatar URL of **${user.username}**](${avatar})`)
                    .setColor('RANDOM')
                    .setImage(avatar)
                message.channel.send(embed)
            }
        }
    })
    //invites 
client.on('message', msg => {
        if (msg.content.split(' ')[0].toLowerCase() == prefix + 'invites') {
            let guild = msg.guild
            var codes = [""]
            var nul = 0

            guild.fetchInvites()
                .then(invites => {
                    invites.forEach(invite => {
                        if (invite.inviter === msg.author) {
                            nul += invite.uses
                            codes.push(`discord.gg/${invite.code}`)
                        }

                    })
                    if (nul > 0) {
                        const e = new Discord.MessageEmbed()
                            .addField(`${msg.author.username}`, `لقد قمت بدعوة **${nul}** شخص`)
                            .setColor('#36393e')
                        msg.channel.send(e)
                    } else {
                        var embed = new Discord.MessageEmbed()
                            .setColor("#000000")
                            .addField(`${msg.author.username}`, `لم تقم بدعوة أي شخص لهذة السيرفر`)

                        msg.channel.send({ embed: embed });
                        return;
                    }
                })
        }
    })
    //credit 
    //daily
const cool = [];
client.on('message', message => {
        if (message.author.bot) return;
        if (!message.channel.guild) return;
        const args = message.content.split(' ');
        const credits = require('./credits.json');
        const path = './credits.json';
        const user = message.mentions.users.first() || client.users.cache.get(args[1]) || message.author;
        const member = message.mentions.users.first() || client.users.cache.get(args[1]);
        const author = message.author.id;
        const daily = Math.floor(Math.random() * 380) + 10;
        const money = args[2];
        if (!credits[author]) credits[author] = { credits: 0 };
        if (!credits[user.id]) credits[user.id] = { credits: 0 };
        fs.writeFile(path, JSON.stringify(credits, null, 5), function(err) { if (err) console.log(err) });
        if (message.content.startsWith(prefix + "credit")) {
            if (args[0] !== `${prefix}credit` && args[0] !== `${prefix}credits`) return;
            if (args[2]) {
                if (isNaN(args[2])) return message.channel.send('**Numbers Plese.!**');
                if (member.bot) return message.channel.send(`**Bots cant have credits**`);
                if (user.id === message.author.id) return message.channel.send('**You cant transfer to your self**');
                if (credits[author].credits < money) return message.channel.send('**You dont have that much**');
                /*
     var one = Math.floor(Math.random() * 9) + 1;
      var two = Math.floor(Math.random() * 9) + 1;
      var three = Math.floor(Math.random() * 9) + 1;
      var four = Math.floor(Math.random() * 9) + 1;
      var number = `${one}${two}${three}${four}`;
      */
                const Captcha = require("captcha-generator-better");
                let captcha = new Captcha();
                let percentToGet = 3;
                let percent = (percentToGet / 100) * money;
                let fees = '';
                let newbalance = money - percent;
                if (money >= 1000) fees = `Fees: \`$${Math.floor(percent)}\`,`
                message.channel.send(`**Write down the verification Number, ${fees} Amount: \`$${Math.floor(newbalance)}\`, You have 15s. **`, new Discord.MessageAttachment(captcha.JPEGStream, "captcha.jpeg")).then(layer => {
                    message.channel.awaitMessages(layer => layer.author.id === message.author.id, { max: 1, time: 15000 }).then(text => {
                        if (!text.first()) return layer.delete(message.channel.send(`**The transfer has been canceled**`))
                        if (text.first().content !== captcha.value) return layer.delete(message.channel.send(`**The transfer has been canceled**`));
                        if (text.first().content === captcha.value) {
                            layer.delete();
                            if (money >= 1000) {
                                let percentToGet = 5;
                                let percent = (percentToGet / 100) * money;
                                let newbalance = money - percent;
                                credits[author].credits += Math.floor((-money));
                                credits[user.id].credits += Math.floor((+newbalance));
                                message.channel.send(`** 💰 ${message.author.username}, has transferd \`$${Math.floor(newbalance)}\` to ${user.username}**`);
                            } else {
                                credits[author].credits += Math.floor((-money));
                                credits[user.id].credits += Math.floor((+money));
                                message.channel.send(`** 💰 ${message.author.username}, has transferd \`$${Math.floor(money)}\` to ${user.username}**`);
                            }
                            fs.writeFile(path, JSON.stringify(credits, null, 5), function(err) { if (err) console.log(err) });
                        } else if (c.first().content !== captcha.value) {
                            layer.delete();
                            message.channel.send(`**The transferd has been canceled**`);
                        }
                    });
                });
            }
            if (!args[2]) {
                if (user.bot) return message.channel.send(`**Bots dont have credits.**`);
                message.channel.send(`**${user.username}, :credit_card: balance is **\`$${credits[user.id].credits}\``);
            }
        }
        if (message.content.startsWith(prefix + "daily")) {
            if (cool.includes(message.author.id)) return message.channel.send(`**Plese wait 1 day to take your daily again**`);
            if (member) return;
            if (author) {
                credits[author].credits += (+daily);
                fs.writeFile(path, JSON.stringify(credits, null, 5), function(err) { if (err) console.log(err) });

                message.channel.send(`** 💰 Your daily amount has been received : \`$${daily}\`**`);
            }
            cool.unshift(message.author.id);

            setTimeout(() => {
                cool.shift(message.author.id);
            }, ms("1d"));
        }
    })
    //profile probot
client.on('message', message => {
    let args = message.content.split(' ');
    if (message.content.startsWith(prefix + 'profile')) {
        let member = message.mentions.users.first();

        if (args[0] && !args[1]) {
            message.channel.startTyping();
            setTimeout(() => {
                message.channel.stopTyping();
            }, Math.random() * (1 - 3) + 1 * 1000);
            message.channel.send(`https://api.probot.io/profile/${message.author.id}`);
        }
        if (member) {
            message.channel.startTyping();
            setTimeout(() => {
                message.channel.stopTyping();
            }, Math.random() * (1 - 3) + 1 * 1000);
            message.channel.send(`https://api.probot.io/profile/${member.id}`);
        } else if (args[1] && !member) {
            client.users.fetch(args[1]).then(userr => {
                message.channel.stopTyping();
                setTimeout(() => {
                    message.channel.stopTyping();
                }, Math.random() * (1 - 3) + 1 * 1000);
                message.channel.send(`https://api.probot.io/profile/${userr.id}`);
            });
        }
    }
});
//server
client.on("message", message => {
    if (message.content.startsWith(`${prefix}server`)) {
        if (message.author.bot || message.channel.type == "dm") return;
        let onlineM = message.guild.members.cache.filter(m => m.presence.status !== "offline");
        let verifyL = ["0", "1", "2", "3", "4"];
        let region = { 'brazil': "brazi`", 'eu-central': "Central Europ`", 'singapore': "Singapore", 'us-central': "US Central", 'sydney': "Sydney", 'us-east': "US East", 'us-south': "US South", 'us-west': "US West", 'eu-west': "Western Europe", 'london': "London", 'amsterdam': "Amsterdam", 'hongkong': "Hong Kong", 'russia': "Russia" };
        var args = message.content.split(" ").slice(1);
        let user = message.mentions.users.first();
        var men = message.mentions.users.first();
        var heg;
        if (men) {
            heg = men
        } else {
            heg = message.author
        }
        var mentionned = message.mentions.members.first();
        var h;
        if (mentionned) {
            h = mentionned
        } else {
            h = message.member
        }
        moment.locale('en-TN');
        let serverEmbed = new Discord.MessageEmbed()
            .setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))
            .setColor("#000000")
            .addField(":id: Server ID", `${message.guild.id}`, true)
            .addField(":calendar: Created On", `${moment(message.guild.createdAt).format('D/MM/YYYY h:mm')}\n${moment(message.guild.createdTimestamp).fromNow()}`, true)
            .addField(":crown: Owned by", `<@${message.guild.ownerID}>`, true)
            .addField(`:busts_in_silhouette:  Members (${message.guild.memberCount})`, `**${onlineM.size}** Online\n**${message.guild.premiumSubscriptionCount}** Boosts ✨`, true)
            .addField(`:speech_balloon: Channels (${message.guild.channels.cache.size})`, `**${message.guild.channels.cache.filter(m => m.type == 'text').size}** Text | **${message.guild.channels.cache.filter(m => m.type == 'voice').size}** Voice`, true)
            .addField(":earth_africa: Others", `**Region:** ${message.guild.region}\n**Verification Level:** ${message.guild.verificationLevel}`, true)
            .addField(`:closed_lock_with_key:  **Roles** (${message.guild.roles.cache.size})`, `To see a list with all roles use **#roles**`, true)
        message.channel.send(serverEmbed);

    }
})

client.on('message', message => {
    if (message.author.bot) return;
    if (message.content.startsWith(prefix + 'id')) {
        var user = message.guild.member(message.mentions.members.first() || message.author);
        const embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .addField(`ID USER : [ ${user.id} ]`, `${user.user}`)
            .setThumbnail(user.user.avatarURL())
            .setFooter(`- Requested By: ${message.author.tag}`)
        message.channel.send({ embed });
    }
});
client.on("message", async(message) => {
    let DIG = require("discord-image-generation");
    if (message.content.startsWith(prefix + "trash")) {
        let user = message.mentions.users.first();
        if (!user) return message.reply("need mention user")

        const avatar2 = user.displayAvatarURL({ dynamic: false, format: 'png' });
        let img = await new DIG.Trash().getImage(`${avatar2}`);
        let attach = new Discord.MessageAttachment(img, "Trash.png");;
        message.channel.send(attach)
    }
});
client.on('message', message => {
        if (message.content === prefix + "ping") {
            let start = Date.now();
            message.channel.send(new Discord.MessageEmbed().setAuthor(message.author.username, message.author.avatarURL({ dynamic: true })).addField("**Time Taken:**", `${Date.now() - start} ms 📶 | 🟡 Not Bad`, true).addField("**Websocket:**", `${client.ws.ping.toFixed(0)} ms 📶 | 🟢 Excellent`, true).setColor("#00e8ff").setFooter(`Request By ${message.author.tag}`).setTimestamp())
        }
    })
    //ادمن
    //role 
client.on("message", message => {
    let cmd = message.content.toLowerCase().split(" ")[0];
    cmd = cmd.slice(prefix.length);
    if (cmd === "role") {
        if (!message.channel.guild || message.author.bot) return;
        let args = message.content.split(" ");
        let user = message.guild.member(
            message.mentions.users.first() || message.guild.members.cache.get(args[1])
        );
        var role = message.content.split(" ").slice(2).join(" ").toLowerCase();
        var role1 = message.guild.roles.cache.filter(r => r.name.toLowerCase().indexOf(role) > -1).first();
        if (!message.guild.member(client.user).hasPermission("MANAGE_ROLES"))
            return message.channel.send(`:x: **I Need Permissions !!**`);
        if (!message.guild.member(message.author).hasPermission("MANAGE_ROLES"))
            return;
        if (!user) return message.channel.send(`**✅ ${prefix}role <@mention or iD> role**`);
        if (!role) return message.channel.send(`**✅ ${prefix}role <@mention or iD> role**`);
        if (!role1) return message.channel.send(`**✅ ${prefix}role <@mention or iD> role**`);
        if (user.roles.cache.find(c => c.id === role1.id))
            return user.roles.remove(role1).then(() => {
                message.channel.send(`**✅ Changed roles for ${user.user}  removed ${role1.name}**`);
            }).catch(err => message.channel.send("Error: **" + err.message + "**"));
        user.roles.add(role1).then(() => {
                message.channel.send(
                    `**✅ Changed roles for ${user.user} ${role1.name}**`
                );
            })
            .catch(err => message.channel.send("Error: **" + err.message + "**"));
    }
});

//show & hide
client.on('message', message => {
    if (message.content === prefix + "hide") {
        if (!message.member.hasPermission('MANAGE_CHANNELS')) return message.reply(' ** You dont have `MANAGE_CHANNELS` permission **');
        let everyone = message.guild.roles.cache.find(hyper => hyper.name === '@everyone');
        message.channel.createOverwrite(everyone, {
            VIEW_CHANNEL: false
        }).then(() => {
            const embed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setThumbnail(message.guild.iconURL())
                .setDescription(`> **Done Hide This Room ${message.channel}**`)
                .setFooter(`By ${message.author.username}`)
            message.channel.send(embed)
        })
    }
});
client.on('message', message => {
    if (message.content === prefix + "show") {
        if (!message.member.hasPermission('MANAGE_CHANNELS')) return message.reply(' ** You dont have `MANAGE_CHANNELS` permission **');
        let everyone = message.guild.roles.cache.find(hyper => hyper.name === '@everyone');
        message.channel.createOverwrite(everyone, {
            VIEW_CHANNEL: true
        }).then(() => {
            const embed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setThumbnail(message.guild.iconURL())
                .setDescription(`> **Done Show This Room ${message.channel}**`)

            .setFooter(`By ${message.author.username}`)
            message.channel.send(embed)
        })
    }
});
// unban & unban all
client.on('message', async message => {

    if (message.content.startsWith(prefix + 'unban')) {

        if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send("You dont have the currect permission !")

        let userID = message.content.split(' ').slice(1).join(' ')

        if (!userID || isNaN(userID)) {
            return message.channel.send('Please enter the user id !')
        } else {

            let member;

            try {
                member = await client.users.fetch(userID)
            } catch (e) {
                return message.channel.send('Not a valid user!').then(m => m.delete({ timeout: 5000 }));
            }

            message.guild.fetchBans().then(bans => {

                const user = bans.find(ban => ban.user.id === member.id);

                if (user) {

                    let embed = new Discord.MessageEmbed()
                        .setColor('#00ff00')
                        .setTitle('Unban member')
                        .addField('Moderator', `${message.author} (\`${message.author.username}\`)`, true)
                        .addField('User', `${user.user} (\`${user.user.username}\`)`, true)
                    message.guild.members.unban(user.user.id).then(() => message.channel.send(embed))

                } else {
                    message.channel.send(`User ${member.tag} isn't banned!`)
                }

            }).catch(e => {
                console.log(e)
                message.channel.send('An error has occurred!')
            });
        }
    }
})
client.on("message", message => {
    switch (message.content.toLowerCase()) {
        case (prefix + "unban-all"):
            if (message.member.hasPermission("ADMINISTRATOR")) {
                message.guild.fetchBans().then(bans => {
                    if (bans.size == 0) { message.reply("There are no banned users."); throw "No members to unban." };
                    bans.forEach(ban => {
                        message.guild.members.unban(ban.user.id);
                    });
                }).then(() => message.reply("Unbanned all users.")).catch(e => console.log(e))
            } else { message.reply("You do not have enough permissions for this command.") }
            break;
    }
});
//ban
client.on('message', async msg => {
        if (msg.content.startsWith(prefix + "ban")) {
            if (!msg.member.hasPermission('BAN_MEMBERS')) return msg.channel.send("You don't have permissions")
            if (!msg.guild.me.hasPermission('BAN_MEMBERS')) return msg.channel.send("I don't have permissions")
            const args = msg.content.slice(prefix.length).trim().split(/ +/g);
            var member = msg.mentions.members.first() || msg.guild.members.cache.get(args[1]) || msg.guild.members.cache.find(m => m.user.username === args.slice(1).join(' '));
            if (!member) return msg.channel.send(`**Please Mention user or Type the user ID|Username ${args.slice(1).join(' ')} **`)
            if (member.id === msg.author.id) return msg.reply(`**You can't ban yourself**`)
            if (member.id === msg.guild.me.id) return msg.reply(`**You can't ban me dumbass**`)
            if (!member.bannable) return msg.channel.send(`**The member role is higher than me**`);

            await member.ban({ reason: `He/She just got bannned` })
            msg.channel.send(`**${member.user.username} Has been BANNNED ✈**`)
        }
    })
    //kick
client.on('message', msg => {
    if (!msg.guild) return;
    if (msg.content.startsWith(prefix + 'kick') || msg.content.startsWith(prefix + 'طرد')) {
        if (!msg.guild.member(msg.author).hasPermission("KICK_MEMBERS"))
            return msg.reply("**You Don't Have ` KICK_MEMBERS ` Permission**");
        if (!msg.guild.member(client.user).hasPermission("KICK_MEMBERS"))
            return msg.reply("**I Don't Have ` KICK_MEMBERS ` Permission**");
        const user = msg.mentions.users.first();
        if (user) {
            const member = msg.guild.member(user);
            if (member) {
                member
                    .kick('Optional reason that will display in the audit logs')
                    .then(() => {


                        const embed = new Discord.MessageEmbed()
                            .setColor("00e8ff")
                            .setTitle(`Successfully kicked ${user.tag}`)
                        msg.channel.send(embed);

                    })
                    .catch(err => {

                        ncr.reply(`🙄 - I couldn't kick that user. Please check my permissions and role position.`);

                        console.error(err);
                    });
            } else {

                msg.reply("**🙄 - I can't find this member**");
            }

        } else {

            const embed = new Discord.MessageEmbed()
                .setColor("00e8ff")
                .setTitle(`**Command: kick**`)
                .setDescription(
                    `Kicks a member.
 
**Usage:**
#kick (user) (reason)
 
**Examples:**
#kick ${msg.author}`)

            msg.channel.send(embed);
        }
    }
});
//lock & unlock
client.on('message', async message => {
    if (message.content.startsWith(prefix + 'lock')) {
        if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send(`>>> \`\`\`You Don't have the permission : \`\`\` \n\n **\`MANAGE_CHANNELS\`**`);
        let channel = message.mentions.channels.first();
        let channel_find = message.guild.channels.cache.find(ch => ch.id == channel);
        if (!channel) channel_find = message.channel
        if (!channel_find) return;
        channel_find.updateOverwrite(message.guild.id, {
            SEND_MESSAGES: false
        });
        message.channel.send(
            new Discord.MessageEmbed()
            .setDescription(`\`\`\`js\n🔒 | Done Locked ${channel_find.name}\n\`\`\``)
        );
    }
});
client.on('message', async message => {
    if (message.content.startsWith(prefix + 'unlock')) {
        if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send(`>>> \`\`\`You Don't have the permission : \`\`\` \n\n **\`MANAGE_CHANNELS\`**`);
        let channel = message.mentions.channels.first();
        let channel_find = message.guild.channels.cache.find(ch => ch.id == channel);
        if (!channel) channel_find = message.channel;
        if (!channel_find) return;
        channel_find.updateOverwrite(message.guild.id, {
            SEND_MESSAGES: true
        });
        message.channel.send(
            new Discord.MessageEmbed()
            .setDescription(`\`\`\`js\n🔓 | Done Unlocked ${channel_find.name}\n\`\`\``)
        );
    }
});
//mute & unmute
client.on("message", (message) => {
    if (message.content.toLowerCase().startsWith(prefix + "mute")) {
        if (!message.member.hasPermission('MANAGE_ROLES')) return message.channel.send(
            new Discord.MessageEmbed().setColor("RED")
            .setDescription("❌" + " **You Need `MANAGE_ROLES` Permission To Use This Command!**")
            .setFooter(`Request By ${message.author.tag}`).setTimestamp()
        )
        if (!message.guild.me.hasPermission('MANAGE_ROLES')) return message.channel.send(
            new Discord.MessageEmbed().setColor("RED")
            .setDescription("❌" + " **I Can't Mute Any Member In This Server Becuse I Don't Have `MANAGE_ROLES` Permission!**")
            .setFooter(`Request By ${message.author.tag}`).setTimestamp()
        )
        let member = message.mentions.users.first() || client.users.cache.get(message.content.split(' ')[1])
        var user = message.guild.member(member)
        if (!user) return message.channel.send(
            new Discord.MessageEmbed().setColor("RED")
            .setDescription("❌" + " **Please Mention/ID Same One!**")
            .setFooter(`Request By ${message.author.tag}`).setTimestamp()
        )
        if (user.id === message.author.id) return message.reply(
            new Discord.MessageEmbed().setColor("YELLOW")
            .setDescription("⚠" + " **WTF Are You Doing ??**")
            .setFooter(`Request By ${message.author.tag}`).setTimestamp()
        )
        if (user.id === client.user.id) return message.channel.send(
            new Discord.MessageEmbed().setColor("YELLOW")
            .setDescription("⚠" + " **WTF Are You Doing ??**")
            .setFooter(`Request By ${message.author.tag}`).setTimestamp()
        )
        if (!message.guild.member(user).bannable) return message.reply(
            new Discord.MessageEmbed().setColor("RED")
            .setDescription("❌" + " **Soory I Can't Mute Same One High Than Me >_<**")
            .setFooter(`Request By ${message.author.tag}`).setTimestamp()
        )
        let muteRole = message.guild.roles.cache.find(n => n.name === 'Muted')
        if (!muteRole) {
            message.guild.roles.create({
                data: {
                    name: "Muted",
                }
            }).then(async(role) => {
                await message.guild.channels.cache.forEach(channel => {
                    channel.overwritePermissions([{
                        id: role.id,
                        deny: ["SEND_MESSAGES"]
                    }]);
                })
            })
        }
        user.roles.add(muteRole)
        var time = message.content.split(' ')[2]
        if (!time) time = '24h'
        message.channel.send(new Discord.MessageEmbed().setColor("GREEN").setDescription("✅" + ` **${user} Has Ben Muted By <@!${message.author.id}>, For a ${ms(ms(time))}**`).setFooter(`Request By ${message.author.tag}`).setTimestamp())
        setTimeout(() => {
            user.roles.remove(muteRole);
        }, ms(time));
        return;
    }
})
client.on('message', msg => {
        const error = "❌";
        const timeing = "⏱";
        const success = "✅";
        const lodeing = "🤔";
        let args = msg.content.split(" ");
        if (args[0] === prefix + 'unmute') {
            if (msg.author.bot) return;
            if (msg.channel.type == "dm") return msg.channel.send(new Discord.MessageEmbed().setColor("RED").setDescription(error + ` **You Can't Use This Command In DM's!**`).setFooter(`Request By ${msg.author.tag}`).setTimestamp())
            if (!msg.member.hasPermission('MANAGE_ROLES')) return msg.channel.send(new Discord.MessageEmbed().setDescription(error + " **You Need `MANAGE_ROLES` Permission To Use This Command!**").setFooter(`Request By ${msg.author.tag}`).setTimestamp())
            if (!msg.guild.me.hasPermission('MANAGE_ROLES')) return msg.channel.send(new Discord.MessageEmbed().setDescription(error + " **I Can't Kick Any Member In This Server Becuse I Don't Have `MANAGE_ROLES` Permission!**").setFooter(`Request By ${msg.author.tag}`).setTimestamp())
            let user = msg.mentions.members.first()
            if (!user) return msg.channel.send(new Discord.MessageEmbed().setDescription(error + " **Please Mention Same One!**").setFooter(`Request By ${msg.author.tag}`).setTimestamp())
            if (user.id === msg.author.id) return msg.reply(new Discord.MessageEmbed().setDescription(lodeing + " **WTF Are You Doing ??**").setFooter(`Request By ${msg.author.tag}`).setTimestamp())
            if (!msg.guild.member(user).bannable) return msg.reply(new Discord.MessageEmbed().setDescription(error + " **I Can't Unmute one high than me >_<**").setFooter(`Request By ${msg.author.tag}`).setTimestamp())
            var muteRole = msg.guild.roles.cache.find(n => n.name === 'Muted')
            if (!muteRole) return msg.channel.send(new Discord.MessageEmbed().setDescription(lodeing + ` **WTF Is That ?? [ Super Error ]**`).setFooter(`Request By ${msg.author.tag}`).setTimestamp())
            user.roles.remove(muteRole)
            msg.channel.send(lodeing + " **Processing The Unmute Function**").then((m) => {
                m.edit(success + " **Processing is complete**")
            })
            msg.channel.send(new Discord.MessageEmbed().setDescription(success + ` **${user} Has Ben Unmuted By <@!${msg.author.id}>**`).setFooter(`Request By ${msg.author.tag}`).setTimestamp())
        }
    })
    //Clear
client.on('message', async message => {
    if (message.content.startsWith(prefix + "clear")) {
        if (message.author.bot) return;
        if (message.channel.type == 'dm') return;
        if (!message.member.hasPermission('MANAGE_GUILD'))
            return message.channel.send(' **❌|You Dont Have MANAGE_GUILD Permission!**');
        if (!message.guild.member(client.user).hasPermission('MANAGE_GUILD'))
            return message.channel.send(" **❌|I Don't Have MANAGE_GUILD Permission!**");

        let args = message.content.split(' ').slice(1);
        let msgscount = parseInt(args);
        if (args > 100)
            return message.channel.send("i cant delete more than 100 messages")
                .then(messages => messages.delete(5000));
        if (!msgscount) msgscount = '100';
        message.channel.messages
            .fetch({ limit: 100 })
            .then(messages => message.channel.bulkDelete(msgscount))
            .then(msgs => {
                message.channel
                    .send(`\`\`\`Done ${msgs.size} messages cleared\`\`\``)
                    .then(messages => messages.delete({ timeout: 5000 }));
            });
    }
});

client.login(process.env.token);
