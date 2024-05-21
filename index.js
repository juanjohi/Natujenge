

function sendSMS() {

    var apiUrl = "https://api.tiaraconnect.io/api/messaging/sendsms"
    var apiKey = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIzNjEiLCJvaWQiOjM2MSwidWlkIjoiOTRiNDYxYWQtMTNkZC00ZjgzLWJhYTktMjI3NjkxZGFhMThjIiwiYXBpZCI6Mjc3LCJpYXQiOjE3MTQ5ODk5NzUsImV4cCI6MjA1NDk4OTk3NX0.SmlHq6UvVgSRx7NABT_MGxEdjYVY7nq-xwAzT_1xyv35QekDOcIOdOASSwxiUfzr4j14HamFZ-LxOH_6kbB4TA'
    var connection = document.getElementById("from").value;
    var message = document.getElementById("messageField").value;
    var to = document.getElementById("to").value;

    const formData = {
        from: connection,
        to: to,
        message: message
    }

    fetch(apiUrl, {
        mode: "cors",
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
            "Content-type": "application/json",
            'Authorization': `Bearer ${apiKey}`
        }

    }).then(function (response) {
        return response.text();
    }).then(function (text) {
        console.log(text);
    }).catch(function (error) {
        console.log(error);
    })
}
