const Base = require('./base');
let PlatformAccessory, Accessory, Service, Characteristic, UUIDGen;
class CubeAq extends Base {
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
    this.mijia.log.info(json);
    let { cmd, model, sid } = json;
    let data = JSON.parse(json.data);
    this.mijia.log.info(data);
      /*let { voltage, channel_0, channel_1, dual_channel } = data;
      this.mijia.log.debug(`${model} ${cmd} voltage->${voltage} channel_0->${channel_0} channel_1->${channel_1} dual_channel->${dual_channel}`);
      this.setSwitch(sid, voltage, channel_0, 0);
      this.setSwitch(sid, voltage, channel_1, 1);
      this.setSwitch(sid, voltage, dual_channel, 2);*/
  }
  /**
   * set up Switch(aqara Switch)
   * @param {*device id} sid 
   * @param {*device voltage} voltage 
   * @param {*device status} status 
   */
  setSwitch(sid, voltage, status, index) {
    let uuid = UUIDGen.generate('Aqara Cube ' + sid + '@' + index);
    let accessory = this.mijia.accessories[uuid];
    let service;
    if (!accessory) {
      //init a new homekit accessory
      let name = 'Aqara Cube ' + sid.substring(sid.length - 4) + '_' + index;
      accessory = new PlatformAccessory(name, uuid, Accessory.Categories.PROGRAMMABLE_SWITCH);
      accessory.getService(Service.AccessoryInformation)
        .setCharacteristic(Characteristic.Manufacturer, "Aqara")
        .setCharacteristic(Characteristic.Model, "Aqara Cube")
        .setCharacteristic(Characteristic.SerialNumber, sid);
      accessory.on('identify', function (paired, callback) {
        callback();
      });
      service = new Service.StatelessProgrammableSwitch(name);
      accessory.addService(service, name);
      accessory.addService(new Service.BatteryService(name), name);
    } else {
      service = accessory.getService(Service.StatelessProgrammableSwitch);
    }
    accessory.reachable = true;
    accessory.context.sid = sid;
    accessory.context.model = 'sensor_cube.aqgl01';
    this.mijia.log.info(status);
    if (status != undefined) {
      var event = service.getCharacteristic(Characteristic.ProgrammableSwitchEvent);
      if (status == 'click' || status == 'both_click') {
        event.updateValue(Characteristic.ProgrammableSwitchEvent.SINGLE_PRESS); //0
      } else if (status == 'double_click') {
        event.updateValue(Characteristic.ProgrammableSwitchEvent.DOUBLE_PRESS); //1
      } else if (status == 'long_click') {
          event.updateValue(Characteristic.ProgrammableSwitchEvent.LONG_PRESS); //2
      }

    }
    this.setBatteryService(sid, voltage, accessory);
    if (!this.mijia.accessories[uuid]) {
      this.mijia.accessories[uuid] = accessory;
      this.registerAccessory([accessory]);
    }
    return accessory;
  }
}
module.exports = CubeAq;