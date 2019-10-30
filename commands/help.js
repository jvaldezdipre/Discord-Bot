exports.run = (client, message, args) => {
  message.channel
    .send(
      "This is a list of all my commands.\nSorry currently under constuction."
    )
    .catch(console.error);
};

exports.help = {
  name: "help"
};
