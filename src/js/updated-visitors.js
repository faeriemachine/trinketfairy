  // this script is under the MIT license (https://max.nekoweb.org/resources/license.txt)

let username = "trinketfairy.nekoweb.org"; // <<<--- Insert your username here!

const options3_tls = { year: "numeric", month: "long", day: "numeric" };
  (async () => {
    try {
      const request = await fetch(`https://nekoweb.org/api/site/info/${username}`,);
      const json = await request.json();

      const updated = new Date(json.updated_at).toLocaleDateString("en-CA", options3_tls); // Formats Last Updated text
      const created = new Date(json.created_at).toLocaleDateString("en-CA", options3_tls); // Formats Creation Date text

      if (document.getElementById("updated")) document.getElementById("updated").innerHTML = `<strong>Last updated:</strong> ${updated}`;
    } catch (error) {
      console.error(error);
      // If you wish to insert some fallback here, you may do so!
    }
  })();
