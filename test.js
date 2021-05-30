let button = document.getElementById("search");

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
            repositoryCount
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
      // dom elelmt hee
      // return data.data

      console.log(data.data);
      // console.log(data);
    })
    .catch((err) => console.log(JSON.stringify(err)));
  //
}
