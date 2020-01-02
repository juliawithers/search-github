'use strict';

// render the results in browser
function renderResults(responseJson){
    $('#returned-results').empty();
    for(let i=0;i<responseJson.length;i++){
        $('#returned-results').append(
            `<li>
            <p>${i+1}: ${responseJson[i].name}(<a href= ${responseJson[i].html_url} target="_blank">Link</a>)</p>
            </li>`)
    };
    if(responseJson.length === 0){
        $('#other').text(`No Repos for this user`)
    }  
    $('#results').removeClass('hidden');
}

// fetch the data
function getRepos(username){
    const source= `https://api.github.com/users/${username}/repos`
    console.log(source)

    fetch(source)
    .then(response => {
        if (response.ok){
        return response.json()
        }
        throw new Error (response.Status)})
    .then(responseJson=> renderResults(responseJson))
    .catch(err=>{
        $('#error').text(`Something went wrong: ${err.message}`);
    });
}

// watch for the submission
function watchForm(){
    $('form').submit(e=>{
        e.preventDefault();
        const handleSearch=$('#search').val();
        getRepos(handleSearch);
    })
}

$(watchForm)