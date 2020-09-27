let name = document.getElementById('user_name');

function sort_date_desc(a,b) {
    let date1 = new Date(a.updated_at)
    let date2 = new Date(b.updated_at)
    if (date1 > date2) return -1;
    if (date1 < date2) return 1;
    return 0;
}

// Alternative to sort_date_desc 
// function sort_date_desc(a,b) {
//   return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
// }

function find() {
    document.getElementById("element").style.display = "block";
 let new1 = "https://api.github.com/users/".concat(name.value);
 let gist_url_new = "https://api.github.com/users/".concat(name.value)+"/gists";
//  alert(new1);

 fetch(new1)
    .then(response => response.json())
    .then(data => {
        let user_date = new Date(data.created_at);
        document.getElementById('name').innerHTML = data.name;
        document.getElementById('login').innerHTML = data.login;
        document.getElementById('followers').innerHTML = data.followers;
        document.getElementById('following').innerHTML = data.following;
        document.getElementById('location').innerHTML = data.location;
        document.getElementById('public_repos').innerHTML = data.public_repos;
        document.getElementById('public_gists').innerHTML = data.public_gists;
        document.getElementById('date').innerHTML = user_date.toLocaleDateString();
        
        // document.getElementById('avatar_url').innerHTML = data.avatar_url;
        document.getElementById('following').innerHTML = data.following;
        let avatar_url = data.avatar_url;
        let html_url = data.html_url;
        document.getElementById('profile_url').href = data.html_url ;

        
        fetch(avatar_url)
            .then(response => {console.log(response);
                                return response.blob();
            })
            .then(blob => {
                console.log(blob);
                document.getElementById('picture').src = URL.createObjectURL(blob);
                document.getElementById('picture_url').href = URL.createObjectURL(blob);
                
            });
        
        
        // let a = `<span>REPOS</span> ${data.public_repos};
        let repos_url = data.repos_url;     

        fetch(repos_url) 
        // Converting received data to JSON 
        .then(response => response.json()) 
        .then(json => {

          // sort repos by last updated date
          json.sort(sort_date_desc)
            
            // Create a variable to store HTML 
            let li = ``; 
            
            // Loop through each data and add a table row 
            json.forEach(repos => { 
                if (repos.description==null){
                    content = " ";
                }
                else{
                    content = repos.description;
                }

                let d = new Date(repos.updated_at);
                li += `<div class="row">
                        <div class="col s12 ">
                          <div class="card blue-grey darken-1">
                            <div class="card-content white-text">
                              <a href="${repos.html_url}" class="card-title mono" style="text-decoration: none; color:white">${repos.name}</a>
                              <p>${content}</p>
                              
                            </div>
                            <div class="card-action">
                              <a class="sans"> Language : ${repos.language}</a>
                            
                              <a class="sans" >Last Updated On: ${d.toDateString()}</a>
                            </div>
                          </div>
                        </div>
                      </div>`; 
            }); 
       
        // Display result 
        document.getElementById("repo").innerHTML = li; 
    }); 

    
       

    fetch(gist_url_new ) 
    // Converting received data to JSON 
    .then(response => response.json()) 
    .then(json => { 
        
        json.sort(sort_date_desc)
        // Create a variable to store HTML 
        let li = ``; 
        
        // Loop through each data and add a table row 
        json.forEach(gists => { 
           
            let d = new Date(gists.updated_at);
            li += `<div class="row">
                    <div class="col s12 ">
                      <div class="card blue-grey darken-1">
                        <div class="card-content white-text">
                          <a href="${gists.html_url}" class="card-title mono" style="text-decoration: none; color:white">${gists.id}</a>
                                                    
                        </div>
                        <div class="card-action">
                          <a class="sans" >Last Updated On: ${d.toDateString()}</a>
                          <a class="sans"> Comments : ${gists.comments}</a>
                        </div>
                      </div>
                    </div>
                  </div>`; 
        }); 
   
    // Display result 
    document.getElementById("gists").innerHTML = li; 
}); 


    }).catch((error) => {
       alert(error);
      });
   

     
}
