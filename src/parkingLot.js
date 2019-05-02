'use strict';

require('colors');
const { getVehicleById } = require('./vehicle');

class ParkingLot {
  constructor(slotNo) {
    this.id = slotNo;
    this.isOccupied = false;
    this.vehicleId = null;
  }
}

const createLots = slots => {
  // eslint-disable-next-line no-array-constructor
  const lots = [];
  for (let i = 0; i < slots; i++) lots.push(new ParkingLot(i + 1));
  console.info('Created a parking lot with 6 slots'.green);
  return lots;
};

const checkEmptyLot = parkingLot => parkingLot.filter(lot => !lot.isOccupied);

const parkVehicle = (vehicle, parkingLot) => {
  const emptySlots = checkEmptyLot(parkingLot);
  if (emptySlots.length === 0) {
    console.error('Sorry, parking lot is full'.red);
    return parkingLot;
  }
  emptySlots[0].vehicleId = vehicle.id;
  emptySlots[0].isOccupied = true;
  console.info(`Allocated slot number: ${emptySlots[0].id}`.green);
  return parkingLot;
};

const leaveParking = (slNo, parkingLot) => {
  const parking = parkingLot.map(lot => {
    if (lot.id === slNo) {
      lot.isOccupied = false;
      lot.vehicleId = null;
    }
    return lot;
  });
  console.info(`Slot number ${slNo} is free`.green);
  return parking;
};

const showParkingStatus = (respData = false, parkingLot, vehicles) => {
  let data = parkingLot.map(lot => {
    if (lot.isOccupied) {
      lot.vehicle = getVehicleById(lot.vehicleId, vehicles);
    }
    return lot;
  });
  data = data.filter(lot => lot.isOccupied);
  const status = data.map(item => {
    const tmp = {};
    tmp['Slot No.'] = item.id;
    tmp['Registration No'] = item.vehicle.regNumber;
    tmp.Color = item.vehicle.color;
    return tmp;
  });
  if (!respData) console.table(status);
  return data;
};

const listCarsWithColor = (color, parkingLot, vehicles) => {
  let list = showParkingStatus(true, parkingLot, vehicles);
  list = list.filter(item => item.vehicle.color === color);
  console.info(`${Array.prototype.map.call(list, item => item.vehicle.regNumber).join(', ')}`.green);
  return undefined;
};

const listSlotWithColor = (color, parkingLot, vehicles) => {
  let list = showParkingStatus(true, parkingLot, vehicles);
  list = list.filter(item => item.vehicle.color === color);
  console.info(`${Array.prototype.map.call(list, item => item.id).join(', ')}`.green);
  return undefined;
};

const slotWithReg = (regNumber, parkingLot, vehicles) => {
  let list = showParkingStatus(true, parkingLot, vehicles);
  list = list.filter(item => item.vehicle.regNumber === regNumber);
  console.info(list[0] ? `${list[0].id}`.green : 'Not Found'.red);
  return undefined;
};

module.exports = {
  ParkingLot,
  createLots,
  checkEmptyLot,
  showParkingStatus,
  leaveParking,
  parkVehicle,
  listCarsWithColor,
  listSlotWithColor,
  slotWithReg
};
