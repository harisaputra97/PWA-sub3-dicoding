function getResultKlasmenJSON(data) {
  let standings = "";
  let number = 1;
  let standingHTML = "";

  data.standings[0].table.forEach(function (standing) {
      standings += `
              <tr>
                  <td>${number}</td>
                  <td>
                  <img src="${standing.team.crestUrl.replace(/^http:\/\//i, 'https://')}" width="40px" alt="badge"/></td>
                  <td>
                    <a href="/detailTeam.html?id=${standing.team.id}">
                      <p>${standing.team.name}</p>
                    </a>
                  </td>
                  <td>${standing.points}</td>
                  <td>${standing.won}</td>
                  <td>${standing.draw}</td>
                  <td>${standing.lost}</td>
                  <td>${standing.goalsFor}</td>
                  <td>${standing.goalsAgainst}</td>
                  <td>${standing.goalDifference}</td>
              </tr>
      `;
      number++;
  });

standingHTML = `
              <div class="card klasemen" >

              <table class="striped responsive-table">
                  <thead>
                      <tr>
                          <th>No.</th>
                          <th></th>
                          <th>Team Name</th>
                          <th>P</th>
                          <th>W</th>
                          <th>D</th>
                          <th>L</th>
                          <th>GF</th>
                          <th>GA</th>
                          <th>GD</th>
                      </tr>
                  </thead>
                  <tbody>
                      ${standings}
                  </tbody>
              </table>
              
              </div>
  `;
  document.getElementById("klasemen").innerHTML = standingHTML;
}
