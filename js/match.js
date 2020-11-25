// top scorers
function getResultTopScorersJSON(data) {
  let scorersHTML = "";
  let number = 1;
  let scorersdata = "";

  data.scorers.forEach(function (score) {
      scorers = JSON.parse(JSON.stringify(score).replace(/http:/g, 'https:'));
      

      scorersdata += `
      <tr>
        <td>${number}</td>
        <td>
          <a href="/detailPlayer.html?id=${score.player.id}">
            <p>${score.player.name}</p>
          </a>
        </td>
        <td>
          <a href="/detailTeam.html?id=${score.team.id}">
            <p>${score.team.name}</p>
          </a>
        </td>
        <td>${score.numberOfGoals}</td>
      </tr>
      `;
      number++;

  });

  
  scorersHTML += `
  <div class="card scorers">

    <table class="highlight responsive-table centered">
        <thead>
            <tr>
                <th>No.</th>
                <th>Player</th>
                <th>Team</th>
                <th>Gol</th>
            </tr>
        </thead>
        <tbody>
          ${scorersdata}
        </tbody>
    </table>
  </div>
`;
  document.getElementById("top-score").innerHTML = scorersHTML;
}