let usernameField = document.querySelector(
  '.head form [placeholder="GitHub User Name"]'
);
let submitButton = document.querySelector('form [type="submit"]');
let reposArea = document.querySelector(".repos div");

submitButton.addEventListener("click", (e) => {
  e.preventDefault();
  getRepositories(usernameField.value);
});

async function getRepositories(userName) {
  try {
    if (usernameField.value == "") {
      reposArea.innerHTML = `<p>Enter a valid username.</p>`;
    } else {
      fetch(`https://api.github.com/users/${userName}/repos`)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (data.length === 0) {
            reposArea.innerHTML = `<p>This username is unvalid.</p>`;
          } else {
            reposArea.innerHTML = data
              .map((item, index) => {
                let repoUrl = item.html_url;
                return `<div>
                      <p>${index + 1} - ${item.name}</p>
                      <p><a href='${repoUrl}' target='_blank'>${
                  item.html_url
                }</a></p>
                      </div>`;
              })
              .join("");
          }
        });
    }
  } catch (err) {
    throw err;
  }
}
