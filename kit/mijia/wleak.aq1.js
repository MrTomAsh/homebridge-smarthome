const Base = require('./base');
let PlatformAccessory, Accessory, Service, Characteristic, UUIDGen;
class WLeakAq1 extends Base {
  constructor(mijia) {
    super(mijia);
    PlatformAccessory = mijia.PlatformAccessory;
    Accessory = mijia.Accessory;
    Service = mijia.Service;
    Characteristic = mijia.Characteristic;
    UUIDGen = mijia.UUIDGen;
  }
  /**
 * parse the gateway json msg
 * @param {*json} json 
 * @param {*remoteinfo} rinfo 
 */
  parseMsg(json, rinfo) {
    let { cmd, model, sid } = json;
    let data = JSON.parse(json.data);
    let { voltage, status } = data;
    this.mijia.log.debug(`${model} ${cmd} voltage->${voltage} status->${status}`);
    this.setLeakSensor(sid, voltage, status);
    
  }
  /**
   * set up LeakSensor(aqara leak sensor)
   * @param {*device id} sid 
   * @param {*device voltage} voltage 
   * @param {*device status} status 
   */
  setLeakSensor(sid, voltage, status) {
    let uuid = UUIDGen.generate('Aqara-LeakSensor@' + sid);
    let accessory = this.mijia.accessories[uuid];
    let service;
    if (!accessory) {
      //init a new homekit accessory
      let name = "Leak Sensor";//sid.substring(sid.length - 4);
      accessory = new PlatformAccessory(name, uuid, Accessory.Categories.SENSOR);
      accessory.getService(Service.AccessoryInformation)
        .setCharacteristic(Characteristic.Manufacturer, "Aqara")
        .setCharacteristic(Characteristic.Model, "Aqara LeakSensor")
        .setCharacteristic(Characteristic.SerialNumber, sid);
      accessory.on('identify', function (paired, callback) {
        callback();
      });
      service = new Service.LeakSensor(name);
      accessory.addService(service, name);
      accessory.addService(new Service.BatteryService(name), name);
    } else {
      service = accessory.getService(Service.LeakSensor);
    }
    accessory.reachable = true;
    accessory.context.sid = sid;
    accessory.context.model = 'sensor_leak.v1';
    if (status != undefined) {
      service.getCharacteristic(Characteristic.LeakDetected).updateValue('leak' == status);
    }
    this.setBatteryService(sid, voltage, accessory);
    if (!this.mijia.accessories[uuid]) {
      this.mijia.accessories[uuid] = accessory;
      this.registerAccessory([accessory]);
    }
    return accessory;
  }
}
module.exports = WLeakAq1;
