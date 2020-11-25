function getTeamJSON(data) {
    data = JSON.parse(JSON.stringify(data).replace(/^http:\/\//i, 'https://'));

    // var overviewHtml = "";
    // var tableSquadHtml = "";

    // let number = 1;
    // data.squad.forEach(function (squad) {
    //     tableSquadHtml += `
    //         <tr>
    //             <td class="center-align">${number}</td>
    //             <td>${squad.name}</td>
    //             <td class="center-align">${squad.position}</td>
    //             <td class="center-align"><a href="./detailPlayer.html?id=${squad.id}">Detail</a></td>
    //         </tr>
    //     `;
    //     number++;
    // });

    document.getElementById("logo").src = data.crestUrl;
    document.getElementById("nameTeam").innerHTML = data.name;
    document.getElementById("preloader").innerHTML = "";

    // overview
    // document.getElementById("overview").innerHTML = overviewHtml;
    document.getElementById("nama").innerHTML = data.name;
    document.getElementById("namaP").innerHTML = data.shortName;
    document.getElementById("didirikan").innerHTML = data.founded;
    document.getElementById("tla").innerHTML = data.tla;
    document.getElementById("alamat").innerHTML = data.address;
    document.getElementById("tlp").innerHTML = data.phone;
    document.getElementById("website").innerHTML = data.website;
    document.getElementById("email").innerHTML = data.email;
    document.getElementById("color").innerHTML = data.clubColors;
    document.getElementById("lokasi").innerHTML = data.venue;
}

function getPlayerJSON(data) {
    var playerDetailHtml = "";

    playerDetailHtml += `
        <table class="striped">
            <thead></thead>
            <tbody>
                <tr>
                    <td style="font-weight: bold;">Nama</td>
                    <td>${data.name}</td>
                </tr>
                <tr>
                    <td style="font-weight: bold;">Nama Depan</td>
                    <td>${data.firstName}</td>
                </tr>
                <tr>
                    <td style="font-weight: bold;">Nama Belakang</td>
                    <td>${data.lastName}</td>
                </tr>
                <tr>
                    <td style="font-weight: bold;">Asal</td>
                    <td>${data.countryOfBirth}</td>
                </tr>
                <tr>
                    <td style="font-weight: bold;">Tanggal Lahir</td>
                    <td>${data.dateOfBirth}</td>
                </tr>
                <tr>
                    <td style="font-weight: bold;">Negara</td>
                    <td>${data.nationality}</td>
                </tr>
                <tr>
                    <td style="font-weight: bold;">Posisi</td>
                    <td>${data.position}</td>
                </tr>
                <tr>
                    <td style="font-weight: bold;">No. Punggung</td>
                    <td>${data.shirtNumber}</td>
                </tr>
            </tbody>
        </table>

        <div class="right-align" style="font-size: 12px;">Last Updated: ${convertDate(new Date(data.lastUpdated).toLocaleDateString())}</div>
    `;

    document.getElementById("preloader").innerHTML = "";
    document.getElementById("playerDetail").innerHTML = playerDetailHtml;
}

function getTeamFavJSON(data) {
    data = JSON.parse(JSON.stringify(data).replace(/^http:\/\//i, 'https://'));

    var tableTeamFavoriteHtml = "";
    let number = 1;

    tableTeamFavoriteHtml += `
        <table class="striped centered">
            <thead>
                <tr>
                    <th>No.</th>
                    <th>Team</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
    `;

    data.forEach(function(team) {
        tableTeamFavoriteHtml += `
            <tr>
                <td>${number}</td>
                <td><a href="./detailTeam.html?id=${team.id}&saved=true">${team.name}</a></td>
                <td>
                    <a class="waves-effect waves-light btn-small red" onclick="removeFromFavorites(${team.id}, 'favoriteTeam')">
                        <i class="large material-icons">delete</i>
                    </a>
                </td>
            </tr>
        `;

        number++;
    });

    tableTeamFavoriteHtml += `
            </tbody>
        </table>
    `;

    document.getElementById("favorite").innerHTML = tableTeamFavoriteHtml;
}

function getPlayerFavJSON(data) {
    var tablePlayerFavoriteHtml = "";
    let number = 1;

    tablePlayerFavoriteHtml += `
        <table class="striped centered">
            <thead>
                <tr>
                    <th>No.</th>
                    <th>Nama</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
    `;

    data.forEach(function(player) {
        tablePlayerFavoriteHtml += `
            <tr>
                <td>${number}</td>
                <td><a href="./detailPlayer.html?id=${player.id}&saved=true">${player.name}</a></td>
                <td>
                    <a class="waves-effect waves-light btn-small red" onclick="removeFromFavorites(${player.id}, 'favoritePlayer')">
                        <i class="large material-icons">delete</i>
                    </a>
                </td>
            </tr>
        `;

        number++;
    });

    tablePlayerFavoriteHtml += `
            </tbody>
        </table>
    `;

    document.getElementById("favorite").innerHTML = tablePlayerFavoriteHtml;   
}