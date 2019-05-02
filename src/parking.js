/* eslint-disable no-case-declarations */

'use strict';

require('colors');
const readline = require('readline');
const {
  createLots,
  leaveParking,
  parkVehicle,
  listCarsWithColor,
  listSlotWithColor,
  showParkingStatus,
  slotWithReg
} = require('./parkingLot');

const { addVehicle } = require('./vehicle');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

let parkingLot = null;
const vehicles = [];

const promptInput = (prompt, handler) => {
  rl.question(prompt, input => {
    if (handler(input) !== false) {
      promptInput(prompt, handler);
    } else {
      rl.close();
    }
  });
};

const start = () => {
  let newVehicleId = 1;
  promptInput('', input => {
    console.warn(`Input==>    ${input}`.yellow);
    const command = input.split(' ');
    switch (command[0]) {
      case 'create_parking_lot':
        parkingLot = createLots(parseInt(command[1], 10));
        break;
      case 'park':
        const vehicle = addVehicle({ id: newVehicleId, regNumber: command[1], color: command[2] });
        vehicles.push(vehicle);
        newVehicleId += 1;
        parkingLot = parkVehicle(vehicle, parkingLot);
        break;
      case 'leave':
        parkingLot = leaveParking(parseInt(command[1], 10), parkingLot);
        break;
      case 'status':
        showParkingStatus(false, parkingLot, vehicles);
        break;
      case 'registration_numbers_for_cars_with_colour':
        listCarsWithColor(command[1], parkingLot, vehicles);
        break;
      case 'slot_numbers_for_cars_with_colour':
        listSlotWithColor(command[1], parkingLot, vehicles);
        break;
      case 'slot_number_for_registration_number':
        slotWithReg(command[1], parkingLot, vehicles);
        break;
      case 'exit':
        console.info('Bye!');
        return false;
      default:
        return undefined;
    }
    return undefined;
  });
};

module.exports = {
  start
};
