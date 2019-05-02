'use strict';

class Vehicle {
  constructor(data) {
    const { id, regNumber, color } = data;
    this.id = id;
    this.regNumber = regNumber;
    this.color = color;
  }
}

const addVehicle = data => new Vehicle(data);

const getVehicleById = (id, vehicles) => vehicles.filter(vehicle => vehicle.id === id)[0];

module.exports = {
  Vehicle,
  addVehicle,
  getVehicleById
};
