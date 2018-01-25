
class VSXController{
	
	constructor(ip, port){
		this.ip= ip;
		this.port= port;
		this.isReady = true;
	}
	
	request(key, val){
		if(this.isReady){
			this.isReady = false;
			try{
				var self= this;
				var spawn = require('child_process').spawn;
				var telnet = spawn('telnet', [this.ip, this.port]);
				
				telnet.stdin.write(key+"\n");
				var start=true;
				telnet.stdout.on('data', (data) => {
				  if(start){
					  start=false;
				  }else if(val && data){
					var tempVal= val*2 +1 ;
					var ampliVal= parseInt(data.toString().substr(3,3));
					if(tempVal == ampliVal){
						telnet.kill('SIGHUP');
					}else if(tempVal>ampliVal){
						telnet.stdin.write("VU\n");	
					}else{
						telnet.stdin.write("VD\n");
					}
				  }else{
					telnet.kill('SIGHUP');
					self.isReady = true;
				  }
				});
				telnet.on("error", function(e) { 
					console.log(e); 
					self.isReady = true;
				});
				telnet.on('exit', (code) => {
				  //console.log(`Child exited with code ${code}`);
					self.isReady = true;
				});
			}catch(err){
			}
		}
	}
	
}

export default VSXController;