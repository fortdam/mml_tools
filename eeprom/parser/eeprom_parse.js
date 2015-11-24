var fs = require('fs');
var proc = require('process');


var param = proc.argv[2];

var fileName = proc.argv[2];
var otpType = proc.argv[3];


if (param && param.toLowerCase().match('help')) {
    console.log("=======================================");
    console.log("  Usage:");
    console.log("  node eeprom_parse.js <input_file> <otp_type>");
    console.log("=======================================");
    console.log("  OTP Type:");
    console.log("  1: For Idol4 3M2 Sunny");
    console.log("=======================================");
}
else if (otpType && parseInt(otpType) == 1) {
    var d = getOTPData(fileName);

    var os = fs.createWriteStream('output.txt');

    os.write("The OTP data for Idol4-3M2-Sunny:\r\n");

    os.write("\r\n\r\n Header:\r\n");
    os.write("===========================================\r\n");
    os.write(" Validate: "+(d[0]==1?'True':'False')+"\r\n");  //Validate flag
    os.write(" ID: " + d[1] +"\r\n");
    os.write(" Date: 20"+d[2]+'/'+d[3]+'/'+d[4]+"\r\n"); //Date: yyyy/mm/dd

    os.write(" Lens ID: "+d[5]+"\r\n");
    os.write(" VCM  ID: "+d[6]+"\r\n");
    os.write(" Driver-IC ID: "+d[7]+"\r\n");

    os.write("\r\n\r\n AWB Information:\r\n");
    os.write("===========================================\r\n");

    os.write("\r\n --Light source 1: " + "\r\n");

    os.write(" R/Gr: "+ (d[9]*256+d[0xa])/1024 + "\r\n");
    os.write(" B/Gr: "+ (d[0xb]*256+d[0xc])/1024 + "\r\n");
    os.write(" Gb/Gr:"+ (d[0xd]*256+d[0xe])/1024 + "\r\n");

    os.write(" R/Gr-Golden: "+ (d[0xf]*256+d[0x10])/1024 + "\r\n");
    os.write(" B/Gr-Golden: "+ (d[0x11]*256+d[0x12])/1024 + "\r\n");
    os.write(" Gb/Gr-Golden:"+ (d[0x13]*256+d[0x14])/1024 + "\r\n");

    os.write("\r\n --Light source 2: " + "\r\n");

    os.write(" R/Gr: "+ (d[0x15]*256+d[0x16])/1024 + "\r\n");
    os.write(" B/Gr: "+ (d[0x17]*256+d[0x18])/1024 + "\r\n");
    os.write(" Gb/Gr:"+ (d[0x19]*256+d[0x1a])/1024 + "\r\n");

    os.write(" R/Gr-Golden: "+ (d[0x1b]*256+d[0x1c])/1024 + "\r\n");
    os.write(" B/Gr-Golden: "+ (d[0x1d]*256+d[0x1e])/1024 + "\r\n");
    os.write(" Gb/Gr-Golden:"+ (d[0x1f]*256+d[0x20])/1024 + "\r\n");

    os.write("\r\n --Light source 3: " + "\r\n");

    os.write(" R/Gr: "+ (d[0x21]*256+d[0x22])/1024 + "\r\n");
    os.write(" B/Gr: "+ (d[0x23]*256+d[0x24])/1024 + "\r\n");
    os.write(" Gb/Gr:"+ (d[0x25]*256+d[0x26])/1024 + "\r\n");

    os.write(" R/Gr-Golden: "+ (d[0x27]*256+d[0x28])/1024 + "\r\n");
    os.write(" B/Gr-Golden: "+ (d[0x29]*256+d[0x2a])/1024 + "\r\n");
    os.write(" Gb/Gr-Golden:"+ (d[0x2b]*256+d[0x2c])/1024 + "\r\n");

    os.write("\r\n\r\n LSC Information:\r\n");
    os.write("===========================================\r\n");
    os.write(" Validate: "+(d[0x2e]==1?'True':'False')+"\r\n");  //Validate flag

    os.write("\r\n Channel-R: \r\n");

    start_index = 0x2f;
    for (var i=0; i<13; i++) {
        var str = "";
        for (var j=0; j<17; j++) {
            value = d[start_index+(i*17+j)*2]*256+d[start_index+(i*17+j)*2+1];
            if (value < 1000){
                str += " ";
            }
            str += value.toString()+", ";
        }
        os.write(str+"\r\n");
    }
    
    os.write("\r\n Channel-Gr: \r\n");
    start_index = 0x1e9;
    for (var i=0; i<13; i++) {
        var str = "";
        for (var j=0; j<17; j++) {
            value = d[start_index+(i*17+j)*2]*256+d[start_index+(i*17+j)*2+1];
            if (value < 1000){
                str += " ";
            }
            str += value.toString()+", ";
        }
        os.write(str+"\r\n");
    }

    os.write("\r\n Channel-Gb: \r\n");
    start_index = 0x3a3;
    for (var i=0; i<13; i++) {
        var str = "";
        for (var j=0; j<17; j++) {
            value = d[start_index+(i*17+j)*2]*256+d[start_index+(i*17+j)*2+1];
            if (value < 1000){
                str += " ";
            }
            str += value.toString()+", ";
        }
        os.write(str+"\r\n");
    }

    os.write("\r\n Channel-B: \r\n");
    start_index = 0x55d;
    for (var i=0; i<13; i++) {
        var str = " ";
        for (var j=0; j<17; j++) {
            value = d[start_index+(i*17+j)*2]*256+d[start_index+(i*17+j)*2+1];
            if (value < 1000){
                str += " ";
            }
            str += value.toString()+", ";
        }
        os.write(str+"\r\n");
    }



    os.write("\r\n\r\n AF Information:\r\n");
    os.write("===========================================\r\n");
    os.write(" Validate: "+(d[0x718]==1?'True':'False')+"\r\n");  //Validate flag
    os.write(" Macro:    "+(d[0x719]*256+d[0x71a]) + "\r\n");
    os.write(" Infinity: "+(d[0x71b]*256+d[0x71c]) + "\r\n");



    os.write("\r\n\r\n PDAF Information:\r\n");
    os.write("===========================================\r\n");
    os.write(" Validate:   "+(d[0x720]==1?'True':'False')+"\r\n");  //Validate flag
    os.write(" Version:    "+(d[0x721]*256+d[0x722]) + "\r\n");
    os.write(" DS Ratio:   "+(d[0x723]*256+d[0x724]) + "\r\n");
    os.write(" Actual Len: "+(d[0x725]*256+d[0x726]) + "\r\n");
    os.write(" DS Len:     "+(d[0x727]*256+d[0x728]) + "\r\n");


    os.write("\r\n Left Gain Map:\r\n");
    start_index = 0x729;
    for (var i=0; i<10; i++) {
        var str = " ";
        for (var j=0; j<13; j++) {
            value = d[start_index+(i*13+j)*2]*256+d[start_index+(i*13+j)*2+1];
            if (value < 1000){
                str += " ";
            }
            str += value.toString()+", ";
        }
        os.write(str+"\r\n");
    }

    os.write("\r\n Right Gain Map:\r\n");
    start_index = 0x82f;
    for (var i=0; i<10; i++) {
        var str = " ";
        for (var j=0; j<13; j++) {
            value = d[start_index+(i*13+j)*2]*256+d[start_index+(i*13+j)*2+1];
            if (value < 1000){
                str += " ";
            }
            str += value.toString()+", ";
        }
        os.write(str+"\r\n");
    }

    os.write("\r\n K-value Validate:"+(d[0xb10]==1?'True':'False')+"\r\n");  //Validate flag
    os.write(" K-value: "+d[0xb11]*256+d[0xb12]);

    os.end();    

}


function getOTPData(fileName){
    var rawData = fs.readFileSync(fileName).toString();
    var splitData = rawData.split(';');
    var outData = new Array();


    splitData.forEach(function (val, index, arr){
        if (val){
            dd = val.match(new RegExp("= (\\w+)"));
            if (dd){
                outData[index] = parseInt(dd[1]);
            }
	}
    });
    return outData;
}