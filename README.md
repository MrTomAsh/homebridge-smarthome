# homebridge plugin and webapp for smarthome
[![npm package](https://nodei.co/npm/homebridge-smarthome-plus.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/homebridge-smarthome-plus/)

[![npm](https://img.shields.io/npm/dt/homebridge-smarthome.svg)](https://www.npmjs.com/package/homebridge-smarthome) 
[![npm](https://img.shields.io/npm/v/homebridge-smarthome.svg)](https://www.npmjs.com/package/homebridge-smarthome)
[![Dependency Status](https://img.shields.io/versioneye/d/nodejs/homebridge-smarthome.svg)](https://www.versioneye.com/nodejs/homebridge-smarthome/)


## mijia & broadlink & more...

Thanks for 
0. [rench](https://github.com/rench)(the author of [homebridge-smarthome](https://github.com/rench/homebridge-smarthome))
1. [snOOrz](https://github.com/snOOrz)(the author of [homebridge-aqara](https://github.com/snOOrz/homebridge-aqara))
2. [YinHangCode](https://github.com/YinHangCode/homebridge-mi-aqara)(the author of [homebridge-mi-aqara](https://github.com/YinHangCode/homebridge-mi-aqara))
3. [aholstenson](https://github.com/aholstenson/miio)(the author of [miio](https://github.com/aholstenson/miio))
4. all other developer and testers.   

**Note: I have only a part of these devices, some devices do not have been tested. If you find bugs, please submit them to [issues](https://github.com/rench/homebridge-smarthome/issues).**

## Mijia & Aqara Accessory for homebridge.   

### Zigbee
![](http://7fv93h.com1.z0.glb.clouddn.com/Gateway.jpg)
![](http://7fv93h.com1.z0.glb.clouddn.com/ContactSensor.jpg)
![](http://7fv93h.com1.z0.glb.clouddn.com/MotionSensor.jpg)
![](http://7fv93h.com1.z0.glb.clouddn.com/Button.jpg)
![](http://7fv93h.com1.z0.glb.clouddn.com/TemperatureAndHumiditySensor.jpg)
![](http://7fv93h.com1.z0.glb.clouddn.com/SingleSwitch.jpg)
![](http://7fv93h.com1.z0.glb.clouddn.com/DuplexSwitch.jpg)
![](http://7fv93h.com1.z0.glb.clouddn.com/SingleSwitchLN.jpg)
![](http://7fv93h.com1.z0.glb.clouddn.com/DuplexSwitchLN.jpg)
![](http://7fv93h.com1.z0.glb.clouddn.com/SingleButton86.jpg)
![](http://7fv93h.com1.z0.glb.clouddn.com/DuplexButton86.jpg)
![](http://7fv93h.com1.z0.glb.clouddn.com/PlugBase.jpg)
![](http://7fv93h.com1.z0.glb.clouddn.com/PlugBase86.jpg)
![](http://7fv93h.com1.z0.glb.clouddn.com/MagicSquare.jpg)
![](http://7fv93h.com1.z0.glb.clouddn.com/SmokeDetector.jpg)
![](http://7fv93h.com1.z0.glb.clouddn.com/NatgasDetector.jpg)
![](http://7fv93h.com1.z0.glb.clouddn.com/ElectricCurtain.jpg)
![](https://raw.githubusercontent.com/MrTomAsh/homebridge-smarthome/master/images/WaterLeakDetector.jpg)
![](https://raw.githubusercontent.com/MrTomAsh/homebridge-smarthome/master/images/XiaomiPhilipsBulb.jpg)
![](https://raw.githubusercontent.com/MrTomAsh/homebridge-smarthome/master/images/XiaomiPhilipsBulbCandle.jpg)

### Wifi
![](http://7fv93h.com1.z0.glb.clouddn.com/AirPurifier.jpg)
![](http://7fv93h.com1.z0.glb.clouddn.com/MiCamera.jpg)
![](http://7fv93h.com1.z0.glb.clouddn.com/MiRobotVacuum.jpg)
![](http://7fv93h.com1.z0.glb.clouddn.com/Yeelight.jpg)
![](http://7fv93h.com1.z0.glb.clouddn.com/Yeelight2.png)
![](http://7fv93h.com1.z0.glb.clouddn.com/Yeelight3.png)

### Supported Devices
1. Gateway(LightSensor/Lightbulb[hue])
2. Magent(ContactSensor)
3. TemperatureAndHumiditySensor(HumiditySensor/TemperatureSensor)
4. Motion(MotionSensor)
5. Switch(StatelessProgrammableSwitch)
6. Plug(Outlet)
7. CtrlNeutral1/CtrlNeutral2(Switch)
8. CtrlLN1/CtrlLN2(Switch)
9. 86SW1/86SW2(StatelessProgrammableSwitch)
10. 86Plug(Outlet)
11. Smoke(SmokeSensor)
12. Natgas(SmokeSensor)
13. Curtain(WindowCovering)
14. AirPurifier(AirPurifier/AirQualitySensor/TemperatureSensor/HumiditySensor/Lightbulb)
15. Vacuum(Fan)
16. PowerPlug(Outlet)
17. PowerStrip(Outlet)
18. Yeelight(Lightbulb[hue])
19. Aqara Switch(Switch)
20. Aqara Magent(ContactSensor)
21. Aqara TemperatureAndHumiditySensorAndPressure(HumiditySensor/TemperatureSensor/`CommunityTypes.AtmosphericPressureSensor`)
22. Aqara Motion(MotionSensor)
23. Aqara WaterLeak(LeakSensor)
24. Xiaomi Philips Bulb (and Candle Bulb)

## Broadlink Accessory for homebridge.
![](http://7fv93h.com1.z0.glb.clouddn.com/Broadlink_MP1.jpg)
![](http://7fv93h.com1.z0.glb.clouddn.com/Broadlink_MP2.jpg)

### Supported Devices
1. MP1(Outlet)
2. MP2(Outlet)


## Pre-Requirements
1. Make sure you have V2 of the gateway. V1 has limited space so can't support this feature.  
2. Update gateway firmware to 1.4.1_141.0141 or later. You can contact [@babymoney666](https://github.com/babymoney666) if your firmware is not up to date.  

## Installation
1. Install HomeBridge, please follow it's [README](https://github.com/nfarina/homebridge/blob/master/README.md).  
If you are using Raspberry Pi, please read [Running-HomeBridge-on-a-Raspberry-Pi](https://github.com/nfarina/homebridge/wiki/Running-HomeBridge-on-a-Raspberry-Pi).  
2. Make sure you can see HomeBridge in your iOS devices, if not, please go back to step 1.  
3. Download homebridge-smarthome to your local folder or `npm i homebridge-smarthome`.  

## Configuration
1. Open Aqara gateway's settings, enable [local network protocol](https://github.com/louisZL/lumi-gateway-local-api).  
Please follow the steps in this thread: http://bbs.xiaomi.cn/t-13198850. It's in Chinese so you might need a translator to read it or follow the steps. 
2. You'll need an android device or an emulator (I've used BlueStack and it works fine for me).
3. Install Mi app on the Android device and set up your gateway.
4. Click in the top right corner. 
![](http://cdn.fds.api.xiaomi.com/b2c-bbs/cn/attachment/395a50f6f87dc60020b3ee294a852a56.jpg)
5. Click About tab
![](http://cdn.fds.api.xiaomi.com/b2c-bbs/cn/attachment/e5810d499e74af993c4268d332b4541e.jpg)
6. Click few times bottom area to open the programmer mode
![](http://cdn.fds.api.xiaomi.com/b2c-bbs/cn/attachment/18f753f48051244ed6647c777466c6d2.jpg)
7. Click the LAN protocol 
![](http://cdn.fds.api.xiaomi.com/b2c-bbs/cn/attachment/103173ae850d17a70fd6658073472bfb.jpg)
8. Open the LAN protocol and remember the password (this goes to your config.json file)
![](http://cdn.fds.api.xiaomi.com/b2c-bbs/cn/attachment/ead0e225d236da11e311d27c06aee33b.jpg)
9. Click Information about the gate
![](http://cdn.fds.api.xiaomi.com/b2c-bbs/cn/attachment/f8732c6e298d26f72f7d1fa6a82ed934.jpg)
10. To control the devices, put gateway's MAC address (lower case without colon) and password to ~/.homebridge/config.json.  
![](http://cdn.fds.api.xiaomi.com/b2c-bbs/cn/attachment/14fc4c21e2aa0364d24440db7acdb5d0.jpg)
11. How to get device ip and token? see [miio](https://github.com/aholstenson/miio/blob/master/docs/protocol.md).

Basic (enough for Gateway and ZigBee devices) config.json
```
{
  "bridge": {
    "name": "SmartHome",
    "username": "CC:22:3D:E3:CE:30",
    "port": 51826,
    "pin": "031-45-154"
  },
    "platforms": [
    {
      "platform": "smarthome-mijia",
      "web": {
        "port": 8888
      },
      "mijia": {
        "sids": [
          "34ce0088faed"
        ],
        "passwords": [
          "75ED5A235C4A44D4"
        ],
        "devices": []
      }
    },
    {
      "platform": "smarthome-broadlink",
      "broadlink": {
        "devices": []
      }
    }
  ]
}

```

Advanced (for WiFi and BroadLink devices) config.json
```
{
  "bridge": {
    "name": "SmartHome",
    "username": "CC:22:3D:E3:CE:30",
    "port": 51826,
    "pin": "031-45-154"
  },
    "platforms": [
    {
      "platform": "smarthome-mijia",
      "web": {
        "port": 8888
      },
      "mijia": {
        "sids": [
          "34ce0088faed"
        ],
        "passwords": [
          "75ED5A235C4A44D4"
        ],
        "devices": [
          {
            "sid": "Air Purifier 001",
            "name": "Air Purifier",
            "type": "wifi",
            "model": "air-purifier"
          },
          {
            "sid": "Power Plug 001",
            "name": "Power Plug",
            "type": "wifi",
            "model": "power-plug"
          },
          {
            "sid": "Power Strip 001",
            "name": "Power Strip",
            "type": "wifi",
            "model": "power-strip"
          },
          {
            "sid": "Yeelight 001",
            "name": "Yeelight",
            "type": "wifi",
            "model": "light"
          },
          {
            "sid": "Vacuum Cleaner 001",
            "name": "Vacuum Cleaner",
            "ip": "192.168.2.200",
            "token": "4ac2cd21f3e9272ab21a5c1fd4053ed9",
            "type": "wifi",
            "model": "vacuum"
          }
        ]
      }
    },
    {
      "platform": "smarthome-broadlink",
      "broadlink": {
        "devices": [
          {
            "name": "MP2",
            "type": "MP2",
            "mac": "34:EA:34:D9:FE:B3"
          }
        ]
      }
    }
  ]
}
```
To set Xiaomi Philips Bulbs you'll most likely need a token as auto-token doesn't work properly on them. 
To obtain a token you'll need to reset the bulb to it's factory settings (delete it from Mi Home app and tur on it off and on 5 times as it will start blinking) and connect your PC to it's WiFi called philips-light_xxx and run in your terminal command "miio discover --sync" ([miio](https://github.com/aholstenson/miio) is required).
When sorted all you have to do it's add it to your config.json file like follow:
```
"devices": [
(...)
          {
            "sid": "Your own light name",
            "type": "wifi",
            "model": "philips.light",
            "device_id": "YOUR DEVICE ID",
            "token": "YOUR DEVICE TOKEN"
          }
(...)
        ]
```
    
## Run it

Debug mode:

`homebridge -D`   

Regular mode 

`homebridge`



## Troubleshooting 

- If you receive an `{"error":"Invalid key"}` in your log (in debug mode) while trying to control the gateway light, you should generate the key again using an Android Phone or alternatively an emulator such as [bluestacks](https://www.bluestacks.com). In some instances there is an issue with keys being generated using the iOS application.


## Version Logs 

### 1.1.4

1. `miija` fix & improved magnet sensors
2. `aqara` fix & improved magnet sensors
3. `mijia` improved motion sensors
4. `aqara` improved motion sensors
5. `aqara` disabling pressure form TemperatureAndHumiditySensorAndPressure as it's not supported yet by HomeKit

### 1.1.3
1. `mijia` fix purifier type error.
2. `mijia` fix multi getways.

### 1.1.2
1. `mijia` fix yeelight missing miio require.

### 1.1.1
1. `mijia` fix gateway lighthub.

### 1.1.0

1. `mijia` fix air-purifier accessory(fix multi callback).

### 1.0.7

1. `mijia` fix air-purifier accessory(remove some duplicated code).

### 1.0.6
1. `aqara` magnet,motion,switch,temperature-humidity-pressure accessory.
2. `mijia` change monitor.js->motion.js.
3. `mijia` update miio.

### 1.0.5
1. `mijia` yeelight accessory(bugfix).

### 1.0.4
1. `mijia` yeelight accessory.
2. `mijia` fix wifi device bug.

### 1.0.3
1. `mijia` vacuum accessory.
2. `mijia` powerplug accessory.
3. `mijia` powerstrip accessory.

### 1.0.2
1. `mijia` magnet sensor accessory.
2. `mijia` ctrln1/ctrln2 switch accessory.
3. `mijia` ctrlneutral1/ctrlneutral2 switch accessory.
4. `mijia` motion sensor accessory.
5. `mijia` plug/86plug plug accessory.
6. `mijia` 86sw1/86sw2 switch accessory.
7. `mijia` switch accessory.
8. `mijia` smoke sensor accessory.
9. `mijia` natgas sensor accessory.
10. `mijia` air-purifier accessory.
11. `broadlink` mp1/mp2 plug accessory.
### 1.0.1
1. `mijia` gateway sensor accessory.
2. `mijia` door and window sensor accessory.
3. `mijia` temperature and humidity sensor accessory.
