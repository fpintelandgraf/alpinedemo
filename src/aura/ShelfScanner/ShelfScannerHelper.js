({
    upload: function(component, fileName, base64Data) {	
      console.log("UPLOAD entered");
      var imgContainer = component.find("imgContainer").getElement();
      while (imgContainer.firstChild) {
        imgContainer.removeChild(imgContainer.firstChild);
      }
      var action = component.get("c.detectShelfObjects");
      var modelId = component.get("v.modelId");
      action.setParams({
        modelId: modelId,
        base64: base64Data
      });
      action.setCallback(this, function(a) {
     
      component.set("v.spinnerWaiting", false);
        var state = a.getState();
        if (state === "ERROR") {
            console.log(a);
            var errors = a.getError();
            console.log(errors[0]);
            alert("An error has occurred:"  + errors[0].message);
          return;
          console.log(cmp);
          console.log(event);
        }
  
                
        var result = a.getReturnValue();
        var rawPredictions = JSON.stringify(result, null, 4);
        component.set("v.predictions", result);
        component.set("v.rawPredictions", rawPredictions);
        var ro = new ResizeObserver(entries => {
          this.generateSvg(component);
        });
        var img = component.find("imgItself").getElement();
        ro.observe(img);
        this.calculateShelfData(component);
        component.set("v.showDatatable", true);
            
             console.log("Firing scanCompletedEvent");
            var compEvent = component.getEvent("scanCompletedEvent");
          compEvent.fire();      
            
         console.log("Fired scanCompletedEvent");
            
      });
      component.set("v.predictions", null);
      component.set("v.rawPredictions", null);
      component.set("v.spinnerWaiting", true);
      $A.enqueueAction(action);
    },
    generateSvg: function(component) {
      var imgContainer = component.find("imgContainer").getElement();
      var img = component.find("imgItself").getElement();
  
      var proportion = img.clientHeight / img.naturalHeight;
      if (proportion > 1) {
        proportion = 1;
      }
  
      var probabilities = component.get("v.predictions").probabilities;
  
      var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      var svgNS = svg.namespaceURI;
  
         var leftPos = img.offsetLeft;
      var topPos = img.offsetTop;
        
      probabilities.forEach(function(probability) {
        var color = this.getObjectHighlightColor(probability.label);
        // create polygon for box
        var polygon = document.createElementNS(svgNS, "polygon");
        polygon.setAttribute(
          "style",
          "stroke:" + color + ";stroke-width:12;fill-opacity:0.1"
        );
        var points = [];
        points.push(
          (probability.boundingBox.minX * proportion + leftPos) + "," + probability.boundingBox.minY * proportion
        );
        points.push(
          (probability.boundingBox.maxX * proportion  + leftPos)+  "," +  probability.boundingBox.minY * proportion 
        );
        points.push(
          (probability.boundingBox.maxX * proportion + leftPos) +
            "," +
            probability.boundingBox.maxY * proportion
        );
        points.push(
         ( probability.boundingBox.minX * proportion  + leftPos) +
            "," +
            probability.boundingBox.maxY * proportion
        );
        polygon.setAttribute("points", points.join(" "));
        svg.appendChild(polygon);
  
        // create text box
        var div = document.createElement("div");
        div.setAttribute(
          "style",
          "position:absolute;top:" +
            probability.boundingBox.maxY * proportion +
            "px;left:" +
            (probability.boundingBox.minX * proportion + leftPos)+
            "px;width:" +
            (probability.boundingBox.maxX - probability.boundingBox.minX) *
              proportion +
            "px;text-align:center;color:" +
            color +
            ";"
        );
        div.innerHTML = probability.label;
        imgContainer.appendChild(div);
      }, this);
      imgContainer.appendChild(svg);
    },
    getObjectHighlightColor: function(label) {
      if (label === "MyLabel") {
        return "red";
      }
  
      if (label === "Fanta") {
        return "orange";
      }
  
      if (label === "Sprite") {
        return "green";
      }
  
      if (label === "Coca Cola zero") {
        return "black";
      }
  
      if (label === "Coca Cola") {
        return "red";
      }
  
      // Set the color of the marking border
      //return "yellow";
      return "green";
    },
    calculateShelfData: function(component) {
      var probabilities = component.get("v.predictions").probabilities;
      var calcObjects = {};
      var shelfData = [];
      var allObjects = 0;
      probabilities.forEach(function(probability) {
        allObjects += 1;
        if (typeof calcObjects[probability.label] === "undefined") {
          var calcObject = {};
          calcObject.count = 1;
          calcObject.label = probability.label;
          calcObjects[probability.label] = calcObject;
        } else {
          calcObjects[probability.label].count += 1;
        }
      });
      Object.keys(calcObjects).forEach(function(label) {
        calcObjects[label].percentage = (calcObjects[label].count /
          allObjects
        ).toFixed(2);
        shelfData.push(calcObjects[label]);
      });
      component.set("v.shelfData", shelfData);
    }
    //Added resize
    ,
    //resize: function(component, event, isrc, imgFile, cb) {
    resize: function(component, event, isrc, imgFile) {
        const MAX_FILE_SIZE = 235000; // set to 300k
        
        console.log('** Inside Shelf Scanner Resize Helper **');
        
        var helper = this; 
        debugger;
  
        // need to scale vs max size of MAX_FILE_SIZE
        console.log(' Shelf Scanner helper.resize reading file ');
        // var image = new Image();
        // var image = component.find("resizeImg").getElement();
       
        var image = document.getElementById("resizeImg");
        
         // ALTERNATIVE var img = component.find("imgItself").getElement();
        //var image = document.getElementById("imgItself");
        
        image.addEventListener("load", $A.getCallback( function() {
            console.log(' Shelf Scanner Helper -- did the image event listener fire? ');
            var canvas = document.createElement('canvas');
            console.log(' Shelf Scanner Helper -- do I have a canvas? ');
            var ctx = canvas.getContext('2d');
  
            console.log(' original file size ==> ' + imgFile.size);
  
            var oversizeRatio = imgFile.size / MAX_FILE_SIZE;
            var imgScaleFactor = Math.sqrt(oversizeRatio);
  
            console.log(' resizing oversize ratio => ' + oversizeRatio);
            console.log(' resizing scale factor => ' + imgScaleFactor);
  
            var height = Math.floor(image.naturalHeight / imgScaleFactor);
            var width = Math.floor(image.naturalWidth / imgScaleFactor);
  
            console.log(' old height => ' + image.naturalHeight  + '  new height => ' + height);
            console.log(' old width => ' + image.naturalWidth + '  new height => ' + width);
            //ctx.clearRect(0,0,canvas.width,canvas.height);
            ctx.clearRect(0, 0, width, height);
            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(image, 0, 0, width, height);
            var idata = ctx.canvas.toDataURL().toString();
            
            // how big is this in base64? 
            console.log(' Base64 size -> ' + idata.length );
            
            //cb(idata);    
        component.set("v.pictureSrc", idata);
        component.set("v.fileName", imgFile.name);
            helper.upload(component, imgFile.name, idata.match(/,(.*)$/)[1]);
        }));
        component.set("v.pictureSrc", isrc); // can we prime this to fire earlier?        
        image.src = isrc; 
        console.log(' pre-scaled image b64 size -> ' + isrc.length );
  
    } 
    ,      
    resize1: function(component, helper, imgFile, dataUrl) {
        var imgElement = document.createElement("img");
        console.log("after document.createElement imgElement!");
        console.log(imgElement);
        
        try {
            imgElement.src = dataUrl;
            console.log("after imgElement.src=...");
            imgElement.addEventListener("load", function(){ 
                helper.resize2(component, imgFile, dataUrl, imgElement); }
            );    
        }
        catch(e) {
            console.log(e);
        }
  
    },
    resize2: function(component, imgFile, dataURL, imgElement) {
        const MAX_FILE_SIZE = 235000; // set to 300k
        
        console.log('** Inside Shelf Scanner Resize Helper **');
        
        var helper = this; 
        
            console.log(' Shelf Scanner Helper -- did the image event listener fire? ');
            var canvas = document.createElement('canvas');
            console.log(' Shelf Scanner Helper -- do I have a canvas? ');
            var ctx = canvas.getContext('2d');
  
            console.log(' original file size ==> ' + imgFile.size);
  
            var oversizeRatio = imgFile.size / MAX_FILE_SIZE;
            var imgScaleFactor = Math.sqrt(oversizeRatio);
  
            console.log(' resizing oversize ratio => ' + oversizeRatio);
            console.log(' resizing scale factor => ' + imgScaleFactor);
  
            //var height = Math.floor(imgFile.naturalHeight / imgScaleFactor);
            //var width = Math.floor(imgFile.naturalWidth / imgScaleFactor);
        
                /**
            var height = Math.floor(imgFile.clientHeight  / imgScaleFactor);
            var width = Math.floor(imgFile.clientWidth  / imgScaleFactor);
  
          console.log(' IMG Name => ' + imgFile.name);
            console.log(' naturalHeight => ' + imgFile.naturalHeight);
            console.log(' old height => ' + imgFile.clientHeight  + '  new height => ' + height);
            console.log(' old width => ' + imgFile.clientWidth + '  new width => ' + width);
            **/
            //ctx.clearRect(0,0,canvas.width,canvas.height);
            //
  
              var MAX_WIDTH = 640;
              var MAX_HEIGHT = 480;
              var width = imgElement.width;
              var height = imgElement.height;
              console.log("width = " + width + ", height = " + height);
              
              if (width > height) {
                  if (width > MAX_WIDTH) {
                      height *= MAX_WIDTH / width;
                      width = MAX_WIDTH;
                  }
              } else {
                  if (height > MAX_HEIGHT) {
                      width *= MAX_HEIGHT / height;
                      height = MAX_HEIGHT;
                  }
              }
              console.log("width = " + width + ", height = " + height);
              canvas.width = width;
              canvas.height = height;
        
              console.log(' clearRect before ');
  
        ctx.clearRect(0, 0, width, height);
        
  
              console.log(' Draw image before ');
        
              console.log('imgElement');
              console.log(imgElement);
        
  
        
            try {
                ctx.drawImage(imgElement, 0, 0, width, height); 
            } catch (e) {
                console.log('Exception');
                console.log(e);
            }
        
            //ctx.drawImage(imgFile, 0, 0, width, height);
            var idata = ctx.canvas.toDataURL().toString();
            
            // how big is this in base64? 
            console.log(' TEST ');
        
            //console.log(' Base64 size -> ' + idata.length );
            
            //cb(idata);    
           // component.set("v.pictureSrc", idata);
            // component.set("v.fileName", imgFile.name);
            
        //upload(component, imgFile.name, idata.match(/,(.*)$/)[1]);
                component.set("v.pictureSrc", idata);               
           
            
          helper.upload(component, imgFile.name, idata.match(/,(.*)$/)[1]);  
        //}));
        //component.set("v.pictureSrc", isrc); // can we prime this to fire earlier?        
        //image.src = isrc; 
        //console.log(' pre-scaled image b64 size -> ' + isrc.length );
  
    }  
  });