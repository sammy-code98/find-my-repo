import MY_TOKEN from "./apikey.js";
let button = document.getElementById("search");
const userDetails = document.getElementById("user-details");
const spinner = document.getElementById("spinner");
button.addEventListener("click", submit);
function submit() {
  var query = document.getElementById("username").value;
  // const token = "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";
  spinner.removeAttribute("hidden");
  fetch("https://api.github.com/graphql?delay=9000ms", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "bearer " + MY_TOKEN,
    },

    body: JSON.stringify({
      query: `
        query ($queryString: String!) {
          search(query: $queryString, type: USER, first: 1) {
            edges {
              node {
                ... on User {
                  name
                  updatedAt
                  location
                  bio
                  avatarUrl
                  
                  repositories(first:100){
                    nodes{
                      name
                      description
                      forkCount
                      updatedAt
                      stargazers{
                        totalCount
                      }
                      primaryLanguage{
                        name
                      }
                      
                    }
                    totalCount
                  }
                }
                
              }
            }
            
          }
        
        }
       
        `,
      variables: {
        queryString: query,
      },
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      spinner.setAttribute("hidden", query);
      query = "";
      let result = data.data.search.edges[0].node;
      var _html = "";
      for (var i = 0; i < result.repositories.nodes.length; i++) {
        var repo = `<div class="user-card">
        <h4 class="repo-name">${result.repositories.nodes[i].name}</h4>
       <p class="repo-desc">${result.repositories.nodes[i].description}</p>
       <span class="fas fa-circle"> ${
         result.repositories.nodes[i].primaryLanguage
           ? result.repositories.nodes[i].primaryLanguage.name
           : "null"
       }</span>
      <span class="far fa-star"> ${
        result.repositories.nodes[i].stargazers.totalCount
      }</span> 

       <span class="fas fa-code-branch"> ${
         result.repositories.nodes[i].forkCount
       }</span>
       

       
       <span>Updated on  ${result.repositories.nodes[i].updatedAt}</span>

       
       </div>`;
        _html += repo;
      }

      document.getElementById("user-details").innerHTML = `
       <div class="details-container">
       <div>
       <img class="user-avatar" src=${result.avatarUrl}></img>
       <h1 class="user-name">${result.name}</h1>
       <p class="user-bio">${result.bio}</p>
       
      </div>

       <div>
       <div>${_html}</div>
       </div>

       
       </div>
      `;
    })
    .catch((err) => console.log(JSON.stringify(err)));
}
