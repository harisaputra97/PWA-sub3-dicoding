function dbase (idb) {
  const dbPromise = idb.open("submission-3-dicoding", 1, function (upgradeDB) {
    if (!upgradeDB.objectStoreNames.contains(storeTeam)) {
      const teamStore = upgradeDB.createObjectStore(storeTeam, {
        keypath: "id",
        autoIncrement: false
      })
      teamStore.createIndex("teamName", "name", {
        unique: false
      })
    }

    if(!upgradeDB.objectStoreNames.contains(storePlayer)) {
      const playerStore = upgradeDB.createObjectStore(storePlayer, {
        keypath: "id",
        autoIncrement: false
      })
      playerStore.createIndex('playerName', 'name', {
        unique: false
      })
    }
  });
  return dbPromise;
}

function dataCek(storeName, id) {
  return new Promise(function (resolve, reject) {
    dbase(idb)
      .then(db => {
        const tx = db.transaction(storeName, "readonly");
        const store = tx.objectStore(storeName);
        return store.get(id);
      })
      .then(function (data) {
        if (data != undefined) {
            resolve("merupakan data favorite")
        } else {
          reject("bukan data favorite")
        }
      });
  });
}

function hapusDataFav(storeName, data) {
  dbase(idb)
    .then(db => {
      const tx = db.transaction(storeName, "readwrite");
      const store = tx.objectStore(storeName);
      store.delete(data);
      return tx.complete;
    })
}

function buatFav(storeName, data) {
  var createData;
  if(storeName === storeTeam) {
    createData = data.id;
  }
  else if(storeName === storePlayer) {
    createData = data.id
  }

  dbase(idb)
    .then(db => {
      const tx = db.transaction(storeName, "readwrite");
      const store = tx.objectStore(storeName);
      store.put(data, createData);
      return tx.complete;
    })
}

// function buatDataFav(dataType, data) {
//   let storeName = "";
//   let createData = {}
//   if (dataType === "team") {
//     storeName = "favoriteTeam";
//     createData = {
//       id: data.id,
//       name: data.name,
//       shortName: data.shortName,
//       founded: data.founded,
//       tla: data.tla,
//       address: data.address,
//       phone: data.phone,
//       website: data.website,
//       email: data.email,
//       clubColors: data.clubColors,
//       venue: data.venue
//     }
//   } else if (dataType ==="player") {
//     storeName = "favoritePlayer"
//     createData = {
//       id: data.id,
//       name: data.name,
//       firstName: data.firstName,
//       lastName: data.lastName,
//       countryOfBirth: data.countryOfBirth,
//       dateOfBirth: data.dateOfBirth,
//       nationality: data.nationality,
//       position: data.position,
//       shirtNumber: data.shirtNumber
//     }
//   }

//   dbase(idb)
//     .then(db => {
//       let tx = db.transaction(storeName, "readwrite");
//       tx.objectStore(storeName).put(createData);
//       return tx.complete;
//     });
// }

function getDataById(storeName, id) {
  return new Promise(function(resolve, reject) {
    dbase(idb)
      .then(db => {
        const tx = db.transaction(storeName, "readonly");
        const store = tx.objectStore(storeName);
        return store.get(id);
      })
      .then(data => {
        resolve(data);
      });
  });
}

function getAllData (storeName) {
  return new Promise (function(resolve, reject) {
    dbase(idb)
      .then(db => {
        const tx = db.transaction(storeName, "readonly");
        const store = tx.objectStore(storeName);
        return store.getAll();
      })
      .then(data => {
        resolve(data);
      });
  });
}

