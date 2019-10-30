exports.run = (client, message, args, giphy) => {
  if (message.member.hasPermission("BAN_MEMBERS")) {
    // Ban Players-----
    let member = message.mentions.members.first();
    member.ban().then(member => {
      //Select one random gif
      giphy
        .search("gifs", { q: "ban" }) // Searches gifs with the keyword ban
        .then(response => {
          let totalResponses = response.data.length;
          let responseIndex =
            Math.floor(Math.random() * 10 + 1) % totalResponses;
          let responseFinal = response.data[responseIndex];

          message.channel.send(
            member.displayName + " has been banned! We dont want you here!",
            {
              files: [responseFinal.images.fixed_height.url]
            }
          );
        })
        .catch(() => {
          message.channel.send("Error ugh!");
        });
    });
  }
};

exports.help = {
  name: "kick"
};
