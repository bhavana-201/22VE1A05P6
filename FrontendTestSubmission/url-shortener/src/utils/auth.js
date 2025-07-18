
export async function getAuthToken() {
  const response = await fetch("http://20.244.56.144/evaluation-service/auth", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      "email": "bhavanapendyala9@gmail.com",
        "name" : "Bhavana Pendyala",
        "mobileNo" : "9440522336",
        "githubUsername" : "bhavana-201",
        "rollNo":"22VE1A05P6",
        "accessCode" : "NNZDGq",
        "clientID": "974571d1-be99-4ae3-9111-76fbe4a3a4ba",
        "clientSecret": "aCkAAnEPXEppdzbc"
    })
  });

  const data = await response.json();
  return data.access_token; 
}