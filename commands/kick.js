exports.run = (client, message, args, giphy) => {
  if (message.member.hasPermission("KICK_MEMBERS")) {
    let member = message.mentions.members.first();
    //Kick Players
    member.kick().then(member => {
      //Select one random gif
      giphy
        .search("gifs", { q: "fail" }) //Searches gif with the key word fail
        .then(response => {
          let totalResponses = response.data.length;
          let responseIndex =
            Math.floor(Math.random() * 10 + 1) % totalResponses;
          let responseFinal = response.data[responseIndex];

          message.channel.send(member.displayName + " has been kicked!", {
            files: [responseFinal.images.fixed_height.url]
          });
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
