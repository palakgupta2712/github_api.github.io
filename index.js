let name  = document.getElementById('user_name');
function find() {
    document.getElementById("element").style.display = "block";
 let new1 = "https://api.github.com/users/".concat(name.value);
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

                let d = new Date(repos.created_at);
                li += `<div class="row">
                        <div class="col s12 ">
                          <div class="card blue-grey darken-1">
                            <div class="card-content white-text">
                              <a href="${repos.html_url}" class="card-title mono" style="text-decoration: none; color:white">${repos.name}</a>
                              <p>${content}</p>
                              
                            </div>
                            <div class="card-action">
                              <a class="sans"> Language : ${repos.language}</a>
                            
                              <a class="sans" >Created On: ${d.toDateString()}</a>
                            </div>
                          </div>
                        </div>
                      </div>`; 
            }); 
       
        // Display result 
        document.getElementById("inbox").innerHTML = li; 
    }); 

    }).catch((error) => {
       alert(error);
      });
   

     
}
