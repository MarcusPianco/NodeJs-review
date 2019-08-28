/*  
    Obter o usuário
    Precisamos obter o numero do telefone do usuario a partir de seu id
    Obter o número do usuário
*/

// Importando módulo interno do NodeJS
const util = require("util");

const getAddressAsync = util.promisify(getAddress);

function getUser() {
  return new Promise(function resolveUser(resolve, reject) {
    // return reject(new Error("Deu Ruim de verdade"));
    // Simular o retorno de uma execuçnao externa
    setTimeout(function() {
      return resolve({
        id: 1,
        nome: "Marcus",
        address: "Rua j n4",
        birthDate: new Date()
      });
    }, 1000);
  });
}

function getPhone(idUser) {
  return new Promise(function resolvePhone(resolve, reject) {
    setTimeout(function() {
      return resolve({
        telefone: "555-5555",
        ddd: "82"
      });
    }, 2000);
  });
}

function getAddress(idUser, callback) {
  setTimeout(function() {
    return callback(null, {
      street: "Rua J",
      number: "4"
    });
  }, 2000);
}
main();
async function main() {
  try {
    console.time("medida-promise");
    const user = await getUser();
    //execução em 5.14s
    // const phone = await getPhone(user.id);
    // const address = await getAddressAsync(user.id);

    //Performatico para métodos que nnao teem interdepedência
    const result = await Promise.all([
      getAddressAsync(user.id),
      getPhone(user.id)
    ]);
    console.log(user, result[1], result[0]);
    console.timeEnd("medida-promise");
  } catch (error) {
    console.log("Deu ruim", error);
  }
}

//Para manipular o sucesso usamos a função then
//Para erros a funçnao catch
// const userPromise = getUser();

// userPromise
//   .then(function(user) {
//     return getPhone(user.id).then(function resolvePhone(result) {
//       return {
//         user: {
//           id: user.id,
//           nome: user.nome
//         },
//         telefone: result
//       };
//     });
//   })
//   .then(function(userPhoneResult) {
//     const address = getAddressAsync(userPhoneResult.user.id);
//     return address.then(function resolveAddress(result) {
//       return {
//         user: userPhoneResult.user,
//         telefone: userPhoneResult.telefone,
//         address: result
//       };
//     });
//   })
//   .then(function(result) {
//     console.log("resultado", result);
//   })
//   .catch(function(error) {
//     console.log("Deu RUum", error);
//   });

// //Aninhamento de funções para sincronizar execuções e conseguir valores
// getUser(function resolveUser(err, user) {
//   if (err) {
//     console.log("Deu Ruim user");
//     return;
//   }

//   getPhone(user.id, function resolvePhone(err1, phone) {
//     if (err1) {
//       console.log("Deu Ruim Phone");
//       return;
//     }

//     getAddress(user.id, function resolveAddress(err2, address) {
//       if (err2) {
//         console.log("Deu Ruim address");
//         return;
//       }
//       console.log(
//         `${user.nome}, Address: ${address.street}, Phone: ${phone.telefone}`
//       );
//     });
//   });
// });
