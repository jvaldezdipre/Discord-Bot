exports.run = (client, message, args) => {
  //display username
  const name = message.member.displayName;
  message.delete();
  message.channel.send(`Your name is ${name}.`);
};

exports.help = {
  name: "say"
};
