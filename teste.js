const fs = require('fs');

const a = () => {
    fs.writeFile('./talker.json', JSON.stringify([{ a: 'b' }]), (err) => {
        if (err) {
          console.error(err);
        }
        // file written successfully
      });
};
a();