({
	
 
 	doInit : function(component, event, helper) {
    
        // Get a reference to the function defined in the Apex controller
		var action = component.get("c.getLeadStuff");
        action.setParams({
            "leadid": component.get("v.recordId")
        });
         
        // Register the callback function
        action.setCallback(this, function(response) {
            var data = response.getReturnValue();
            var all_data = data.split('#*#');
            component.set("v.lead1", all_data[0]);
            component.set("v.lead1_title", all_data[1]);
            component.set("v.lead1_company", all_data[2]);
            component.set("v.lead1_location", all_data[3]);
            if(all_data[4] == "92"){
                component.set("v.lead1_escore", "https://www.dropbox.com/s/cd797eil9zeaap9/leadScoreComponent.gif?raw=1");
            }
            else if(all_data[4] == "85"){
                component.set("v.lead1_escore", "https://www.dropbox.com/s/7nd6dsnhrl23n3x/lscore85.gif?raw=1");
            }
            else if(all_data[4] == "70"){
                component.set("v.lead1_escore", "https://www.dropbox.com/s/5640arosaaaut73/lscore70.gif?raw=1");
            }
            else if(all_data[4] == "55"){
                //alert("ji");
                component.set("v.lead1_escore", "https://www.dropbox.com/s/z82id30mjbgl0hy/lscore55.gif?raw=1");
            }
            else{
                component.set("v.lead1_escore", "https://www.dropbox.com/s/cd797eil9zeaap9/leadScoreComponent.gif?raw=1");
            }
            
            if(all_data[20] == "false"){
                    component.set("v.lead1_I1", "https://www.dropbox.com/s/buq92zivq2xlt84/2green.png?raw=1");
                    component.set("v.lead1_I2", "https://www.dropbox.com/s/buq92zivq2xlt84/2green.png?raw=1");
                    component.set("v.lead1_I3", "https://www.dropbox.com/s/16qgs3k03fwbeji/1green.png?raw=1");
                    component.set("v.lead1_I4", "https://www.dropbox.com/s/16qgs3k03fwbeji/1green.png?raw=1");
               		component.set("v.lead1_I5", "https://www.dropbox.com/s/904nmmscy4h7v3a/1red.png?raw=1");
            
                	component.set("v.lead1_T1", "Phone Number is");
                	component.set("v.lead1_TR1", "Valid");
                	component.set("v.lead1_T2", "Title is");
                	component.set("v.lead1_TR2", "Director");
                	component.set("v.lead1_T3", "Downloaded");
                	component.set("v.lead1_TR3", "White Paper");
                	component.set("v.lead1_T4", "Interest in");
                	component.set("v.lead1_TR4", "Cloud Management Services");
                	component.set("v.lead1_T5", "Incomplete");
                	component.set("v.lead1_TR5", "Free Trial Form");
            
            
            }
            else{
                              
                if(all_data[5] == "true"){
                    switch(all_data[21]){
                        case '1':
                            component.set("v.lead1_I1", "https://www.dropbox.com/s/16qgs3k03fwbeji/1green.png?raw=1");
                   			break;
                        case '2':
                            component.set("v.lead1_I1", "https://www.dropbox.com/s/buq92zivq2xlt84/2green.png?raw=1");
                   			break;
                        case '3':
                            component.set("v.lead1_I1", "https://www.dropbox.com/s/09oio24x1wnc1gf/3green2.png?raw=1");
                   			break;
                        default:
                            component.set("v.lead1_I1", "https://www.dropbox.com/s/16qgs3k03fwbeji/1green.png?raw=1");
                   			break;
                    }
                }
                else{
                    switch(all_data[21]){
                        case '1':
                            component.set("v.lead1_I1", "https://www.dropbox.com/s/904nmmscy4h7v3a/1red.png?raw=1");
                   			break;
                        case '2':
                            component.set("v.lead1_I1", "https://www.dropbox.com/s/iafko1p48eb7skc/2red.png?raw=1");
                   			break;
                        case '3':
                            component.set("v.lead1_I1", "https://www.dropbox.com/s/dtfi9igycx0b2g4/3red.png?raw=1");
                   			break;
                        default:
                            component.set("v.lead1_I1", "https://www.dropbox.com/s/904nmmscy4h7v3a/1red.png?raw=1");
                   			break;
                    }
                }
                component.set("v.lead1_T1", all_data[6]);
                component.set("v.lead1_TR1", all_data[7]);
                if(all_data[8] == "true"){
                    switch(all_data[22]){
                        case '1':
                            component.set("v.lead1_I2", "https://www.dropbox.com/s/16qgs3k03fwbeji/1green.png?raw=1");
                   			break;
                        case '2':
                            component.set("v.lead1_I2", "https://www.dropbox.com/s/buq92zivq2xlt84/2green.png?raw=1");
                   			break;
                        case '3':
                            component.set("v.lead1_I2", "https://www.dropbox.com/s/09oio24x1wnc1gf/3green2.png?raw=1");
                   			break;
                        default:
                            component.set("v.lead1_I2", "https://www.dropbox.com/s/16qgs3k03fwbeji/1green.png?raw=1");
                   			break;
                    }
                }
                else{
                    switch(all_data[22]){
                        case '1':
                            component.set("v.lead1_I2", "https://www.dropbox.com/s/904nmmscy4h7v3a/1red.png?raw=1");
                   			break;
                        case '2':
                            component.set("v.lead1_I2", "https://www.dropbox.com/s/iafko1p48eb7skc/2red.png?raw=1");
                   			break;
                        case '3':
                            component.set("v.lead1_I2", "https://www.dropbox.com/s/dtfi9igycx0b2g4/3red.png?raw=1");
                   			break;
                        default:
                            component.set("v.lead1_I2", "https://www.dropbox.com/s/904nmmscy4h7v3a/1red.png?raw=1");
                   			break;
                    }
                }
                component.set("v.lead1_T2", all_data[9]);
                component.set("v.lead1_TR2", all_data[10]);
                if(all_data[11] == "true"){
                    switch(all_data[23]){
                        case '1':
                            component.set("v.lead1_I3", "https://www.dropbox.com/s/16qgs3k03fwbeji/1green.png?raw=1");
                   			break;
                        case '2':
                            component.set("v.lead1_I3", "https://www.dropbox.com/s/buq92zivq2xlt84/2green.png?raw=1");
                   			break;
                        case '3':
                            component.set("v.lead1_I3", "https://www.dropbox.com/s/09oio24x1wnc1gf/3green2.png?raw=1");
                   			break;
                        default:
                            component.set("v.lead1_I3", "https://www.dropbox.com/s/16qgs3k03fwbeji/1green.png?raw=1");
                   			break;
                    }
                }
                else{
                    switch(all_data[23]){
                        case '1':
                            component.set("v.lead1_I3", "https://www.dropbox.com/s/904nmmscy4h7v3a/1red.png?raw=1");
                   			break;
                        case '2':
                            component.set("v.lead1_I3", "https://www.dropbox.com/s/iafko1p48eb7skc/2red.png?raw=1");
                   			break;
                        case '3':
                            component.set("v.lead1_I3", "https://www.dropbox.com/s/dtfi9igycx0b2g4/3red.png?raw=1");
                   			break;
                        default:
                            component.set("v.lead1_I3", "https://www.dropbox.com/s/904nmmscy4h7v3a/1red.png?raw=1");
                   			break;
                    }
                }
                component.set("v.lead1_T3", all_data[12]);
                component.set("v.lead1_TR3", all_data[13]);
                if(all_data[14] == "true"){
                    switch(all_data[24]){
                        case '1':
                            component.set("v.lead1_I4", "https://www.dropbox.com/s/16qgs3k03fwbeji/1green.png?raw=1");
                   			break;
                        case '2':
                            component.set("v.lead1_I4", "https://www.dropbox.com/s/buq92zivq2xlt84/2green.png?raw=1");
                   			break;
                        case '3':
                            component.set("v.lead1_I4", "https://www.dropbox.com/s/09oio24x1wnc1gf/3green2.png?raw=1");
                   			break;
                        default:
                            component.set("v.lead1_I4", "https://www.dropbox.com/s/16qgs3k03fwbeji/1green.png?raw=1");
                   			break;
                    }
                }
                else{
                    switch(all_data[24]){
                        case '1':
                            component.set("v.lead1_I4", "https://www.dropbox.com/s/904nmmscy4h7v3a/1red.png?raw=1");
                   			break;
                        case '2':
                            component.set("v.lead1_I4", "https://www.dropbox.com/s/iafko1p48eb7skc/2red.png?raw=1");
                   			break;
                        case '3':
                            component.set("v.lead1_I4", "https://www.dropbox.com/s/dtfi9igycx0b2g4/3red.png?raw=1");
                   			break;
                        default:
                            component.set("v.lead1_I4", "https://www.dropbox.com/s/904nmmscy4h7v3a/1red.png?raw=1");
                   			break;
                    }
                }        
                component.set("v.lead1_T4", all_data[15]);
                component.set("v.lead1_TR4", all_data[16]);
                if(all_data[17] == "true"){
                    switch(all_data[25]){
                        case '1':
                            component.set("v.lead1_I5", "https://www.dropbox.com/s/16qgs3k03fwbeji/1green.png?raw=1");
                   			break;
                        case '2':
                            component.set("v.lead1_I5", "https://www.dropbox.com/s/buq92zivq2xlt84/2green.png?raw=1");
                   			break;
                        case '3':
                            component.set("v.lead1_I5", "https://www.dropbox.com/s/09oio24x1wnc1gf/3green2.png?raw=1");
                   			break;
                        default:
                            component.set("v.lead1_I5", "https://www.dropbox.com/s/16qgs3k03fwbeji/1green.png?raw=1");
                   			break;
                    }
                }
                else{
                    switch(all_data[25]){
                        case '1':
                            component.set("v.lead1_I5", "https://www.dropbox.com/s/904nmmscy4h7v3a/1red.png?raw=1");
                   			break;
                        case '2':
                            component.set("v.lead1_I5", "https://www.dropbox.com/s/iafko1p48eb7skc/2red.png?raw=1");
                   			break;
                        case '3':
                            component.set("v.lead1_I5", "https://www.dropbox.com/s/dtfi9igycx0b2g4/3red.png?raw=1");
                   			break;
                        default:
                            component.set("v.lead1_I5", "https://www.dropbox.com/s/904nmmscy4h7v3a/1red.png?raw=1");
                   			break;
                    }
                }
                component.set("v.lead1_T5", all_data[18]);
                component.set("v.lead1_TR5", all_data[19]);
            }
        });
        
        // Invoke the service
       $A.enqueueAction(action);
    },
    

        
    scriptLoaded : function (component, event, helper){
        
    },
    hide : function(component, event, helper){
        //var target = document.getElementById('closeBtn').getAttribute("data-id");
        //document.getElementById(target).display("hide");
    }
})