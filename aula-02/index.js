/*  
    Obter o usuário
    Precisamos obter o numero do telefone do usuario a partir de seu id
    Obter o número do usuário
*/

function getUser(callback) {
  // Simular o retorno de uma execuçnao externa
  setTimeout(function() {
    return callback(null, {
      id: 1,
      nome: "Marcus",
      address: "Rua j n4",
      birthDate: new Date()
    });
  }, 1000);
}

function getPhone(idUser, callback) {
  setTimeout(function() {
    return callback(null, {
      telefone: "555-5555",
      ddd: "82"
    });
  }, 2000);
}

function getAddress(idUser, callback) {
  setTimeout(function() {
    return callback(null, {
      street: "Rua J",
      number: "4"
    });
  }, 2000);
}

//Aninhamento de funções para sincronizar execuções e conseguir valores
getUser(function resolveUser(err, user) {
  if (err) {
    console.log("Deu Ruim user");
    return;
  }

  getPhone(user.id, function resolvePhone(err1, phone) {
    if (err1) {
      console.log("Deu Ruim Phone");
      return;
    }

    getAddress(user.id, function resolveAddress(err2, address) {
      if (err2) {
        console.log("Deu Ruim address");
        return;
      }
      console.log(
        `${user.nome}, Address: ${address.street}, Phone: ${phone.telefone}`
      );
    });
  });
});
