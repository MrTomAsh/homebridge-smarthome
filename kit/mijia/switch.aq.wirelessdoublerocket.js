const Base = require('./base');
let PlatformAccessory, Accessory, Service, Characteristic, UUIDGen;
class SwitchAqWDl extends Base {
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
      let { voltage, channel_0, channel_1, dual_channel } = data;
      this.mijia.log.debug(`${model} ${cmd} voltage->${voltage} channel_0->${channel_0} channel_1->${channel_1} dual_channel->${dual_channel}`);
      this.setSwitch(sid, voltage, channel_0, channel_1, dual_channel);
      //this.setSwitch(sid, voltage, channel_1, 1);
      //this.setSwitch(sid, voltage, dual_channel, 2);
  }
  /**
   * set up Switch(aqara Switch)
   * @param {*device id} sid 
   * @param {*device voltage} voltage 
   * @param {*device status} status 
   */
  setSwitch(sid, voltage, status_0, status_1, status_dc) {
    let uuid = UUIDGen.generate('Aqara Double Rocket Wireless Switch @' + sid);
    let accessory = this.mijia.accessories[uuid];
    let service;
    if (!accessory) {
      //init a new homekit accessory
      let name = 'Aqara Double Rocket Wireless Switch ' + sid.substring(sid.length - 4);
      accessory = new PlatformAccessory(name, uuid, Accessory.Categories.PROGRAMMABLE_SWITCH);
      accessory.getService(Service.AccessoryInformation)
        .setCharacteristic(Characteristic.Manufacturer, "Aqara")
        .setCharacteristic(Characteristic.Model, "Aqara Wireless Double Rocket Switch")
        .setCharacteristic(Characteristic.SerialNumber, sid);
      accessory.on('identify', function (paired, callback) {
        callback();
      });

      service = new Service.StatelessProgrammableSwitch(name + " Channel 1", "Channel 1");
      accessory.addService(service, name + " Channel 1");

        service = new Service.StatelessProgrammableSwitch(name + " Channel 2", "Channel 2");
        accessory.addService(service, name + " Channel 2");

        service = new Service.StatelessProgrammableSwitch(name + " Both Channels", "Both Channels");
        accessory.addService(service, name + " Both Channels");

      accessory.addService(new Service.BatteryService(name), name);
    } else {
      service = accessory.getService(Service.StatelessProgrammableSwitch);
    }

    service.getCharacteristic(Characteristic.ProgrammableSwitchEvent)
        .setProps({
            minValue: 0,
            maxValue: 8,
            validValues: [
                0,1,2,3,4,5,6,7,8
            ]
        });

    accessory.reachable = true;
    accessory.context.sid = sid;
    accessory.context.model = 'remote.b286acn01';
    this.mijia.log.info("CH1: " + status_0);
      this.mijia.log.info("CH2: " + status_1);
      this.mijia.log.info("DCH: " + status_dc);

    // Channel 1
    if (status_0 !== undefined) {
      var event = service.getCharacteristic(Characteristic.ProgrammableSwitchEvent);
      if (status_0 === 'click') {
        event.updateValue(Characteristic.ProgrammableSwitchEvent.SINGLE_PRESS); //0
      } else if (status_0 === 'double_click') {
        event.updateValue(Characteristic.ProgrammableSwitchEvent.DOUBLE_PRESS); //1
      } else if (status_0 === 'long_click') {
          event.updateValue(Characteristic.ProgrammableSwitchEvent.LONG_PRESS); //2
      }
    }

      // Channel 2
      if (status_1 !== undefined) {
          var event = service.getCharacteristic(Characteristic.ProgrammableSwitchEvent);
          if (status_1 === 'click') {
              event.updateValue(3); //0
          } else if (status_1 === 'double_click') {
              event.updateValue(4); //1
          } else if (status_1 === 'long_click') {
              event.updateValue(5); //2
          }
      }

      // Dual Channel
      if (status_dc !== undefined) {
          var event = service.getCharacteristic(Characteristic.ProgrammableSwitchEvent);
          if (status_dc === 'both_click') {
              event.updateValue(6); //0
          } else if (status_dc === 'double_both_click') {
              event.updateValue(7); //1
          } else if (status_dc === 'long_both_click') {
              event.updateValue(8); //2
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
module.exports = SwitchAqWDl;