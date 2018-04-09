({
  init: function(component, event, helper) {
    component.set("v.shelfDataColumns", [
      { label: "Label", fieldName: "label", type: "text" },
      { label: "Count", fieldName: "count", type: "number" },
      { label: "Share of Shelf", fieldName: "percentage", type: "percent" }
    ]);
  },
  readFile: function(component, event, helper) {

    var files = component.get("v.files");
    if (files && files.length > 0) {
      var file = files[0][0];
      if (file.size > 5000000) {
        return alert("The file exceeds the limit of 5MB.");
      }
      //if (file.size > 2300000) {
      //  return alert("The file exceeds the limit of 2MB.");
      //}
      var reader = new FileReader();
      reader.onloadend = function() {
        var dataURL = reader.result;
        
        //MOCK?
        //var dataURL = "http://icon-park.com/imagefiles/apple_green.png";
        //console.log("***Data URL   " + dataURL);
        //console.log("***FileName" + file.name);
        
        //component.set("v.pictureSrc", dataURL);
        component.set("v.fileName", file.name);
          
        //MOCK?
        //component.set("v.fileName", "apple_green.png");
        //helper.upload(component, "apple_green.png", dataURL.match(/,(.*)$/)[1]);
		
        //Calling helper
        helper.resize1(component, helper, file, dataURL);
        //helper.upload(component, file.name, dataURL.match(/,(.*)$/)[1]);
          
      };
      reader.readAsDataURL(file);
    }
  },
  store: function(component, fileName, base64Data) {
    var action = component.get("c.storeScanResults");
    var shelfData = component.get("v.shelfData");
    action.setParams({
      jsonString: JSON.stringify(shelfData)
    });
    action.setCallback(this, function(a) {
        console.log("Got classification response");
      var state = a.getState();
      var toastEvent = $A.get("e.force:showToast");
      var type = "success";
      var message = "The shelf scan has been saved.";
      if (state === "ERROR") {
        type = "error";
        message = "An error has occurred.";
      }
      toastEvent.setParams({
        type: type,
        message: message
      });
      $A.get("e.force:refreshView").fire();
      toastEvent.fire();
   
    });
    $A.enqueueAction(action);
  }

});