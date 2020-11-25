const base_url = "https://api.football-data.org/v2";
const api_token = "39efa684cc564932bcdf7a45e6cbe4c7";
const id_liga = 2021;

// top scorers
const endpoint_top_scorers = `${base_url}/competitions/PL/scorers`;

// klasemen
const endpoint_klasmen = `${base_url}/competitions/${id_liga}/standings?standingType=TOTAL`;

// detail team dan player
const endpoint_team = `${base_url}/teams/`;
const endpoint_player = `${base_url}/players/`;

const teamData = "team";
const playerData = "player";
const storeTeam = "favoriteTeam";
const storePlayer = "favoritePlayer";

// cek api
function status(response) {
    if (response.status !== 200) {
        console.log("[api.js][status] Error : " + response.status);
        return Promise.reject(new Error(response.statusText));
    } else {
        return Promise.resolve(response);
    }
}
function json(response) {
    return response.json();
}

function error(error) {
    console.log("[api.js][error] Error : " + error);
}

function fetchAPI(endpoint) {
    return fetch(endpoint, {
        headers: {
            "X-Auth-Token": api_token
        }
    });
}

// klasemen
function getKlasmen() {
    return new Promise(function(resolve, reject) {
        if ("caches" in window) {
            caches.match(endpoint_klasmen).then(function(response) {
                if (response) {
                    response.json().then(function(data) {
                        getResultKlasmenJSON(data);
                        resolve(data);
                    });
                }
            });
        }
    
        fetchAPI(endpoint_klasmen)
            .then(status)
            .then(json)
            .then(function(data) {
                getResultKlasmenJSON(data);
                resolve(data);
            })
    
        .catch(error => {
          console.log(error)
        });
    });
}

// top score
function getTopScorers() {
  return new Promise(function(resolve, reject) {
    if("caches" in window) {
      caches.match(endpoint_top_scorers).then(function(response) {
        if (response) {
          response.json().then(function(data) {
            getResultTopScorersJSON(data);
            resolve(data);
          });
        }
      });
    }

    fetchAPI(endpoint_top_scorers)
    .then(json)
    .then(function(data){
      getResultTopScorersJSON(data);
      resolve(data);
    })
    .catch(error);
  });
}

function getTeam() {
    return new Promise(function(resolve, reject) {
      let urlParams = new URLSearchParams(window.location.search);
      let idParam = urlParams.get("id");
        if ("caches" in window) {
            caches.match(endpoint_team + idParam).then(function(response) {
                if (response) {
                    response.json().then(function(data) {
                        getTeamJSON(data);
                        resolve(data);
                    });
                }
            });
        }

        fetchAPI(endpoint_team + idParam)
            .then(status)
            .then(json)
            .then(function(data) {
              getTeamJSON(data);
                resolve(data);
            })
        .catch(error);
    });  
}

function getPlayer() {
    return new Promise(function(resolve, reject) {
      let urlParams = new URLSearchParams(window.location.search);
      let idParam = urlParams.get("id");
        if ("caches" in window) {
            caches.match(endpoint_player + idParam).then(function(response) {
                if (response) {
                    response.json().then(function(data) {
                      getPlayerJSON(data);
                        resolve(data);
                    });
                }
            });
        }
    
        fetchAPI(endpoint_player + idParam)
            .then(status)
            .then(json)
            .then(function(data) {
                getPlayerJSON(data);
                resolve(data);
            })
        .catch(error);
    });
}

function getFavById(typeData, id) {
  if (typeData === teamData) {
    getDataById(id, storeTeam)
      .then(data => {
        getTeamJSON(data)
      });
  }
  else if (typeData === playerData) {
    getDataById(id, storePlayer)
      .then(data => {
        getPlayerJSON(data);
      });
  }
}

function favorite(typeData) {
  if (typeData === teamData) {
    getAllData(storeTeam)
      .then(data => {
        getTeamFavJSON(data);
      });
  }
  else if (typeData === playerData) {
    getAllData(storePlayer)
      .then(data => {
        getPlayerFavJSON(data);
      });
  }
}