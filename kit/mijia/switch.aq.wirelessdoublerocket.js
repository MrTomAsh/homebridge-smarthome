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
    this.buttonMap = {};
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
  }
  /**
   * set up Switch(aqara Switch)
   * @param {*device id} sid 
   * @param {*device voltage} voltage 
   * @param status_0
   * @param status_1
   * @param status_dc
   */
  setSwitch(sid, voltage, status_0, status_1, status_dc) {
    let uuid = UUIDGen.generate('Aqara Double Rocker Wireless Switch @' + sid);
    let accessory = this.mijia.accessories[uuid];
    let name = 'Aqara Double Rocket Wireless Switch ' + sid.substring(sid.length - 4);

    if (!accessory) {
        //init a new homekit accessory
        accessory = new PlatformAccessory(name, uuid, Accessory.Categories.PROGRAMMABLE_SWITCH);
        accessory.getService(Service.AccessoryInformation)
          .setCharacteristic(Characteristic.Manufacturer, "Aqara")
          .setCharacteristic(Characteristic.Model, "Aqara Wireless Double Rocker Switch")
          .setCharacteristic(Characteristic.SerialNumber, sid);
        accessory.on('identify', function (paired, callback) {
          callback();
        });

        this.createButton(1, accessory, name, "Channel 1");
        this.createButton(2, accessory, name, "Channel 2");
        this.createButton(3, accessory, name, "Both Channels");

        accessory.addService(new Service.BatteryService(name), name);
    } else {
        this.getButton(1, accessory, name, "Channel 1");
        this.getButton(2, accessory, name, "Channel 2");
        this.getButton(3, accessory, name, "Both Channels");
    }

    accessory.reachable = true;
    accessory.context.sid = sid;
    accessory.context.model = 'remote.b286acn01';

    // Channel 1
    if (status_0 !== undefined) {
      if (status_0 === 'click') {
          this.buttonPressed(1, Characteristic.ProgrammableSwitchEvent.SINGLE_PRESS); //0
      } else if (status_0 === 'double_click') {
          this.buttonPressed(1, Characteristic.ProgrammableSwitchEvent.DOUBLE_PRESS); //1
      } else if (status_0 === 'long_click') {
          this.buttonPressed(1, Characteristic.ProgrammableSwitchEvent.LONG_PRESS); //2
      }
    }

      // Channel 2
      if (status_1 !== undefined) {
          if (status_1 === 'click') {
              this.buttonPressed(2, Characteristic.ProgrammableSwitchEvent.SINGLE_PRESS); //0
          } else if (status_1 === 'double_click') {
              this.buttonPressed(2, Characteristic.ProgrammableSwitchEvent.DOUBLE_PRESS); //1
          } else if (status_1 === 'long_click') {
              this.buttonPressed(2, Characteristic.ProgrammableSwitchEvent.LONG_PRESS); //2
          }
      }

      // Dual Channel
      if (status_dc !== undefined) {
          if (status_dc === 'both_click') {
              this.buttonPressed(3, Characteristic.ProgrammableSwitchEvent.SINGLE_PRESS); //0
          } else if (status_dc === 'double_both_click') {
              this.buttonPressed(3, Characteristic.ProgrammableSwitchEvent.DOUBLE_PRESS); //1
          } else if (status_dc === 'long_both_click') {
              this.buttonPressed(3, Characteristic.ProgrammableSwitchEvent.LONG_PRESS); //2
          }
      }

    this.setBatteryService(sid, voltage, accessory);
    if (!this.mijia.accessories[uuid]) {
      this.mijia.accessories[uuid] = accessory;
      this.registerAccessory([accessory]);
    }
    return accessory;
  }

  buttonPressed(buttonIndex, action) {
      this.buttonMap[buttonIndex]
          .updateCharacteristic(Characteristic.ProgrammableSwitchEvent, action)
  }

  getButton(buttonIndex, accessory, name, buttonName) {
      this.buttonMap['' + buttonIndex] = accessory.getService(name + " " + buttonName);
  }

  createButton(buttonIndex, accessory, name, buttonName) {
      let service = new Service.StatelessProgrammableSwitch(name + " " + buttonName, buttonName);
      service.getCharacteristic(Characteristic.ProgrammableSwitchEvent)
          .setProps({
              minValue: Characteristic.ProgrammableSwitchEvent.SINGLE_PRESS,
              maxValue: Characteristic.ProgrammableSwitchEvent.LONG_PRESS,
              validValues: [
                  Characteristic.ProgrammableSwitchEvent.SINGLE_PRESS,
                  Characteristic.ProgrammableSwitchEvent.DOUBLE_PRESS,
                  Characteristic.ProgrammableSwitchEvent.LONG_PRESS
              ]
          });
      service.getCharacteristic(Characteristic.ServiceLabelIndex)
          .setValue(buttonIndex);
      this.buttonMap['' + buttonIndex] = service;
      accessory.addService(service, name + " " + buttonName);
  }
}
module.exports = SwitchAqWDl;