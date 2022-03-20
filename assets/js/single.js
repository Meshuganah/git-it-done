var issueContainerEl = document.querySelector("#issues-container");

var getRepoIssues = function(repo) {
    var apiUrl = `https://api.github.com/repos/${repo}/issues?direction=asc`;

    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                displayIssues(data);
            });
        } else {
            alert("There was a problem with your request!");
        }
    });
};

var displayIssues = function(issues) {
    if (issues.length === 0) {
        issueContainerEl.textContent = "This repo has no open issues!";
        return;
    }

    for (i = 0; i < issues.length; i++) {
        //Create a link element to take users to the issue on github
        var issueEl = document.createElement("a");
        issueEl.classList = "list-item flex-row justify-space-between align-center";
        issueEl.setAttribute("href", issues[i].html_url);
        issueEl.setAttribute("target", "_blank");

        //Create a span to hold issue title
        var titleEL = document.createElement("span");
        titleEL.textContent = issues[i].title;

        //Append to container
        issueEl.appendChild(titleEL);

        //Create a type element
        var typeEl = document.createElement("span");

        //Check if issue is an actual issue or a pull request
        if (issues[i].pull_request) {
            typeEl.textContent = "(Pull request)";
        } else {
            typeEl.textContent = "(Issue)";
        };

        //Append to container
        issueEl.appendChild(typeEl);

        issueContainerEl.appendChild(issueEl);
    };
};

getRepoIssues("meshuganah/robot-gladiators");