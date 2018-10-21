const miio = require('miio');
const Base = require('./base');
let PlatformAccessory, Accessory, Service, Characteristic, UUIDGen;
class PhilipsLight extends Base {
  constructor(mijia, config) {
    super(mijia);
    this.accessory = null;
    this.service = null;
    this.sid = null;
    this.config = config;
    this.model = config.model;
    this.token = config.token ? config.token : null;
    this.device_id = config.device_id ? config.device_id : null;
    this.devices = {}; //all philips devices
    PlatformAccessory = mijia.PlatformAccessory;
    Accessory = mijia.Accessory;
    Service = mijia.Service;
    Characteristic = mijia.Characteristic;
    UUIDGen = mijia.UUIDGen;
    this.discover();
  }
  /**
   * discover philips on the localnetwork
   */
  discover() {
      
    this.mijia.log.debug('try to discover ' + this.model);
    let browser = miio.browse(); //require a new browse
    browser.on('available', (reg) => {
      if (!reg.token) { //support Auto-token
        if(reg.id === this.device_id) {
            reg.token = this.token;
        }
        if(!reg.token) {
            if(reg.id === this.device_id) this.mijia.log.warn(`You need to obtain the token manually for device id ${this.device_id} and set it on config.json file`);
          return;
        }
      }
      miio.device(reg).then((device) => {
          if(device.model.indexOf('philips.light') === -1) return;
        this.devices[reg.id] = device;
        this.setLightbulb(reg, device);
      });
    });

    browser.on('unavailable', (reg) => {
      if (!reg.token) { //support Auto-token
          reg.token = this.token;
          if(reg.id === this.device_id) reg.token = this.token;
          if(!reg.token) {
              if(reg.id === this.device_id) this.mijia.log.warn(`You need to obtain the token manually for device id ${this.device_id} and set it on config.json file`);
              return;
          }
      }
      if (this.devices[reg.id] !== undefined) {
        this.devices[reg.id].destroy();
        delete this.devices[reg.id];
      }
    });
  }
  /**
   * set up Lightbulb Service
   * @param {* reg} reg
   * @param {* device} device
   */
  setLightbulb(reg, device) {
    this.sid = reg.id;
    let model = device.model;
    let uuid = UUIDGen.generate('Philips-Light@' + this.sid)
    this.accessory = this.mijia.accessories[uuid];
    if (!this.accessory) {
      //init a new homekit accessory
      let name = this.config.sid ? this.config.sid : device.model.replace(/\./g," ").replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
      this.accessory = new PlatformAccessory(name, uuid, Accessory.Categories.LIGHTBULB);
      this.accessory.getService(Service.AccessoryInformation)
        .setCharacteristic(Characteristic.Manufacturer, "Philips")
        .setCharacteristic(Characteristic.Model, device.model.replace(/\./g," ").replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();}))
        .setCharacteristic(Characteristic.SerialNumber, this.sid);
      this.accessory.on('identify', function (paired, callback) {
        callback();
      });
      this.service = new Service.Lightbulb(name);
      //add optional characteristic intent to display color menu in homekit app
      this.service.addCharacteristic(Characteristic.Brightness);
      this.service.addCharacteristic(Characteristic.ColorTemperature);

      this.accessory.addService(this.service, name);
    } else {
      this.service = this.accessory.getService(Service.Lightbulb);
    }
    this.accessory.reachable = true;
    this.accessory.context.sid = this.sid;
    this.accessory.context.model = 'philips';

      this.service.getCharacteristic(Characteristic.On)
          .on('set', this.setPower.bind(this))
          .on('get', this.getPower.bind(this));

      this.service.getCharacteristic(Characteristic.Brightness)
          .on('set', this.setBrightness.bind(this))
          .on('get', this.getBrightness.bind(this));

      this.service.getCharacteristic(Characteristic.ColorTemperature)
          .on('set', this.setColorTemperature.bind(this))
          .on('get', this.getColorTemperature.bind(this));

    if (!this.mijia.accessories[uuid]) {
      this.mijia.accessories[uuid] = this.accessory;
      this.registerAccessory([this.accessory]);
    }

  }

  setPower(value, callback) {
      this.mijia.log.debug(`set philips power state->${value}`);
      let device = this.devices[this.sid];
      if (device) {
          device.call("set_power", [value ? "on" : "off"]).then( result => {
              if(result[0] === "ok") {
                  callback(null);
              } else {
                  callback(new Error(result[0]));
              }
          }).catch(function(err) {
              this.mijia.log.error("Setting Power Error: " + err);
              callback(err);
          });
      }
  }

  getPower(callback) {
      this.mijia.log.debug(`get philips power`);
      let device = this.devices[this.sid];
      if(device)
      device.call("get_prop", ["power"]).then( result => {
          let power = result.indexOf("on") === 0;
          callback(null, power);
      }).catch(function(err) {
          this.mijia.log.error("Getting Power Error: " + err);
          callback(err, null);
      });
  }

  setBrightness(value, callback) {
      this.mijia.log.debug(`set philips brightness->${value}`);
      let device = this.devices[this.sid];
      if (device) {
          device.call('set_bright', [value]).then(result => {
              if(result[0] === "ok") {
                  callback(null);
              } else {
                  callback(new Error(result[0]));
              }
          }).catch(function(err) {
              this.mijia.log.error("Setting Brightness Error: " + err);
              callback(err);
          });
      }
      this.accessory.context.lastBrightness = value;
  }

  getBrightness(callback) {
      this.mijia.log.debug(`get philips brightness`);
      let device = this.devices[this.sid];
      if(device)
      device.call("get_prop", ["bright"]).then( result => {
          this.accessory.context.lastBrightness = result;
          callback(null, result[0])
      }).catch(function(err) {
          this.mijia.log.error("Getting Brightness Error: " + err);
          callback(err, null);
      });
  }

  setColorTemperature(value, callback) {
      this.mijia.log.debug(`set philips color temperature->${value}`);
      let device = this.devices[this.sid];
      if (device) {
          let xiaomi_value = value - 140;
          xiaomi_value = xiaomi_value / 360 * 100;
          xiaomi_value = Math.round(100 - xiaomi_value);
          if(xiaomi_value === 0) {
              xiaomi_value = 1;
          }
          device.call('set_cct', [xiaomi_value]).then(result => {
              this.accessory.context.lastColorTemperature = value;
              callback(null, result[0]);
          }).catch(function(err) {
              this.mijia.log.error("Setting ColorTemperature Error: " + err);
              callback(err, null);
          });
      }

  }

  getColorTemperature(callback) {
      this.mijia.log.debug(`get philips color temperature`);
      let device = this.devices[this.sid];
      if(device)
      device.call("get_prop", ["cct"]).then( result => {
          let value = 140 + (360 - Math.round((500 - 140) * (result / 100)));
          this.accessory.context.lastColorTemperature = value;
          callback(null, value);
      }).catch(function(err) {
          this.mijia.log.error("Getting etColorTemperature Error: " + err);
          callback(err, null);
      });
  }
}
module.exports = PhilipsLight;