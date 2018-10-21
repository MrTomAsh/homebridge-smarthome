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
        let { voltage, status, rotate } = data;
        this.mijia.log.debug(`${model} ${cmd} voltage->${voltage} status->${status} rotate->${rotate}`);
        this.setSwitch(sid, voltage, status, rotate);
    }
    /**
     * set up Switch(aqara Switch)
     * @param {*device id} sid
     * @param {*device voltage} voltage
     * @param {*device status} status
     */
    setSwitch(sid, voltage, status, rotate) {
        let uuid = UUIDGen.generate('Aqara Cube @' + sid);
        let accessory = this.mijia.accessories[uuid];
        let name = 'Aqara Cube ' + sid.substring(sid.length - 4);

        if (!accessory) {
            //init a new homekit accessory
            accessory = new PlatformAccessory(name, uuid, Accessory.Categories.PROGRAMMABLE_SWITCH);
            accessory.getService(Service.AccessoryInformation)
                .setCharacteristic(Characteristic.Manufacturer, "Aqara")
                .setCharacteristic(Characteristic.Model, "Aqara Cube")
                .setCharacteristic(Characteristic.SerialNumber, sid);
            accessory.on('identify', function (paired, callback) {
                callback();
            });

            this.createButton(1, accessory, name, "Channel 1", false);
            this.createButton(2, accessory, name, "Channel 2", false);
            this.createButton(3, accessory, name, "Rotation", true);

            accessory.addService(new Service.BatteryService(name), name);
        } else {
            this.getButton(1, accessory, name, "Channel 1", false);
            this.getButton(2, accessory, name, "Channel 2", false);
            this.getButton(3, accessory, name, "Rotation", true);
        }

        accessory.reachable = true;
        accessory.context.sid = sid;
        accessory.context.model = 'sensor_cube.aqgl01';

        // Channels 1 && 2
        if (status !== undefined) {
            if (status === 'alert') {
                this.buttonPressed(1, Characteristic.ProgrammableSwitchEvent.SINGLE_PRESS); //0
            } else if (status === 'flip90') {
                this.buttonPressed(1, Characteristic.ProgrammableSwitchEvent.DOUBLE_PRESS); //1
            } else if (status === 'flip180') {
                this.buttonPressed(1, Characteristic.ProgrammableSwitchEvent.LONG_PRESS); //2
            } else if (status === 'shake_air') {
                this.buttonPressed(2, Characteristic.ProgrammableSwitchEvent.SINGLE_PRESS); //0
            } else if (status === 'move') {
                this.buttonPressed(2, Characteristic.ProgrammableSwitchEvent.DOUBLE_PRESS); //1
            } else if (status === 'tap_twice') {
                this.buttonPressed(2, Characteristic.ProgrammableSwitchEvent.LONG_PRESS); //2
            }
        }

        // Rotate
        if (rotate !== undefined) {
            rotate = parseInt(rotate);
            if (rotate > 0) {
                this.buttonPressed(3, Characteristic.ProgrammableSwitchEvent.SINGLE_PRESS); //0
            } else if (rotate < 0) {
                this.buttonPressed(3, Characteristic.ProgrammableSwitchEvent.DOUBLE_PRESS); //1
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

    getButton(buttonIndex, accessory, name, buttonName, rotation) {
        this.buttonMap['' + buttonIndex] = accessory.getService(name + " " + buttonName);
    }

    createButton(buttonIndex, accessory, name, buttonName, rotation) {
        let service = new Service.StatelessProgrammableSwitch(name + " " + buttonName, buttonName);
        service.getCharacteristic(Characteristic.ProgrammableSwitchEvent)
            .setProps({
                minValue: Characteristic.ProgrammableSwitchEvent.SINGLE_PRESS,
                maxValue: rotation ? Characteristic.ProgrammableSwitchEvent.DOUBLE_PRESS : Characteristic.ProgrammableSwitchEvent.LONG_PRESS,
                validValues: [
                    Characteristic.ProgrammableSwitchEvent.SINGLE_PRESS,
                    Characteristic.ProgrammableSwitchEvent.DOUBLE_PRESS
                ].concat(rotation ? [] : [Characteristic.ProgrammableSwitchEvent.LONG_PRESS])
            });
        service.getCharacteristic(Characteristic.ServiceLabelIndex)
            .setValue(buttonIndex);
        this.buttonMap['' + buttonIndex] = service;
        accessory.addService(service, name + " " + buttonName);
    }
}
module.exports = SwitchAqWDl;