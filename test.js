let button = document.getElementById("search");
const userDetails = document.getElementById("user-details");
button.addEventListener("click", submit);
function submit() {
  var query = document.getElementById("username").value;

  // console.log({e,query});
  // event.preventDefault();


 

  const token = "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";
  fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "bearer " + token,
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
                  
                  repositories(first:20){
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
      query = "";
      let result = data.data.search.edges[0].node;

      // console.log(data.data.search.edges[0].node);
      document.getElementById("user-details").innerHTML = `
       <div class="details-container">
       <div>
       <img class="user-avatar" src=${result.avatarUrl}></img>
       <h1 class="user-name">${result.name}</h1>
       <p class="user-bio">${result.bio}</p>
      </div>

       <div>
       <div>${result.repositories}</div>
       </div>

       
       </div>
      `;
    
console.log(result.repositories);
    })
    .catch((err) => console.log(JSON.stringify(err)));
  //
}
