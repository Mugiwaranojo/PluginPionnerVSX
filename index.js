"use strict";

import Plugin from "../../models/Plugin.js";
import VSXController from "./VSXController.js";

class VSXPlugin extends Plugin {
	
	constructor(path){
		super(path);
		this.controller = new VSXController(this.config.ip, this.config.port);
	}
	
	suscribeEvent(socketClient){
		const obj= this;
		socketClient.on("clientVSXEvent", function(data){
			console.log("clientVSXEvent");
			console.log(data);
			obj.doRequest(data.id, data);
		});
	}
	
	doRequest(id, data) {
		console.log("request : "+id);
		switch(id){
			case "increaseSound":
				this.controller.request("VU", null);
				return "OK";
			case "decreaseSound":
				this.controller.request("VD", null);
				return "OK";
			case "muteSound":
				this.controller.request("MO", null);
				return "OK";
			case "muteOffSound":
				this.controller.request("MF", null);
				return "OK";
			case "setVolumeSound":
				this.controller.request("?V", data.value);
				return "OK";
			case "powerVSXOn":
				this.controller.request("PO", null);
				return "OK";
			case "powerVSXOff":
				this.controller.request("PF", null);
				return "OK";
			default:
				return null;
		}
	}

}

export default new VSXPlugin(__dirname);