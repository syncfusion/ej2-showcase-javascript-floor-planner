var UtilityMethods = (function () {
    function UtilityMethods() {
        //Method define the style of nodes
        UtilityMethods.prototype.applyNodeStyle = function(propertyName, node, value)
        {
            var addInfo = node.addInfo || {};
            switch (propertyName) {
                case 'fillcolor':
                    node.style.fill = this.getColor(value);
                    if (value && value.checked) {
                        NodeProperties.prototype.getGradient(node);
                    }
                    break;
                case 'strokecolor':
                    node.style.strokeColor = this.getColor(nodeProperties.strokeColor.value);
                    break;
                case 'strokewidth':
                    node.style.strokeWidth = nodeProperties.strokeWidth.value;
                    break;
                case 'strokestyle':
                    node.style.strokeDashArray = nodeProperties.strokeStyle.value;
                    break;
                case 'opacity':
                    node.style.opacity =nodeProperties.opacity.value / 100;
                    document.getElementById("nodeOpacitySliderText").value = nodeProperties.opacity.value + '%';
                    break;
                case 'gradient':
                    if (value && !value.checked) {
                        node.style.gradient.type = 'None';
                    }
                    else {
                        NodeProperties.prototype.getGradient(node);
                    }
                    break;
                case 'gradientdirection':
                case 'gradientcolor':
                    NodeProperties.prototype.getGradient(node);
                    break;
            }
          };
    };
    UtilityMethods.prototype.getColor = function(colorName)
    {
        if (window.navigator.msSaveBlob && colorName.length === 9) {
            return colorName.substring(0, 7);
        }
        return colorName;
      };
      //Method define the update in text properties
      UtilityMethods.prototype.updateTextFontProperties = function(propertyName, annotation)
      {
          switch (propertyName) {
              case 'fontfamily':
                  annotation.fontFamily = textProperties.fontFamily.value;
                  break;
              case 'fontsize':
                  annotation.fontSize = textProperties.fontSize.value;
                  break;
              case 'fontcolor':
                  annotation.color = this.getColor(textProperties.fontColor.value);
                  break;
              case 'opacity':
                  annotation.opacity = textProperties.opacity.value / 100;
                  document.getElementById("textOpacityText").value = textProperties.opacity.value + '%';
                  break;
          }
      };
      UtilityMethods.prototype.updateToolbarState = function(toolbarName, isSelected, index)
     {
        var toolbarTextStyle = document.getElementById(toolbarName);
        if (toolbarTextStyle) {
            toolbarTextStyle = toolbarTextStyle.ej2_instances[0];
        }
        if (toolbarTextStyle) {
            var cssClass = toolbarTextStyle.items[index].cssClass;
            toolbarTextStyle.items[index].cssClass = isSelected ? cssClass + ' tb-item-selected' : cssClass.replace(' tb-item-selected', '');
            toolbarTextStyle.dataBind();
        }
      };
      //Method define the text align
      UtilityMethods.prototype.updateTextAlign= function(textAlign)
     {
        var toolbarTextSubAlignment = document.getElementById('toolbarTextSubAlignment');
        if (toolbarTextSubAlignment) {
            toolbarTextSubAlignment = toolbarTextSubAlignment.ej2_instances[0];
        }
        if (toolbarTextSubAlignment) {
            for (var i = 0; i < toolbarTextSubAlignment.items.length; i++) {
                toolbarTextSubAlignment.items[i].cssClass = toolbarTextSubAlignment.items[i].cssClass.replace(' tb-item-selected', '');
            }
            var index = textAlign === 'Left' ? 0 : (textAlign === 'Center' ? 1 : 2);
            toolbarTextSubAlignment.items[index].cssClass = toolbarTextSubAlignment.items[index].cssClass + ' tb-item-selected';
        }
      };
      //Method define the horizontal/vertical text align
      UtilityMethods.prototype.updateHorVertAlign = function(horizontalAlignment, verticalAlignment)
        {
        var toolbarHorVerAlignment = document.getElementById('toolbarTextAlignment');
        if (toolbarHorVerAlignment) {
            toolbarHorVerAlignment = toolbarHorVerAlignment.ej2_instances[0];
        }
        if (toolbarHorVerAlignment) {
            for (var i = 0; i < toolbarHorVerAlignment.items.length; i++) {
                toolbarHorVerAlignment.items[i].cssClass = toolbarHorVerAlignment.items[i].cssClass.replace(' tb-item-selected', '');
            }
            var index = horizontalAlignment === 'Right' ? 0 : (horizontalAlignment === 'Center' ? 1 : 2);
            toolbarHorVerAlignment.items[index].cssClass = toolbarHorVerAlignment.items[index].cssClass + ' tb-item-selected';
            index = verticalAlignment === 'Bottom' ? 3 : (verticalAlignment === 'Center' ? 4 : 5);
            toolbarHorVerAlignment.items[index].cssClass = toolbarHorVerAlignment.items[index].cssClass + ' tb-item-selected';
        }
      };
      //Method define the text properties
      UtilityMethods.prototype.updateTextProperties1 = function(propertyName, propertyValue, annotation)
       {
        switch (propertyName) {
            case 'bold':
                annotation.bold = !annotation.bold;
                this.updateToolbarState('toolbarTextStyle', annotation.bold, 0);
                break;
            case 'italic':
                annotation.italic = !annotation.italic;
                this.updateToolbarState('toolbarTextStyle', annotation.italic, 1);
                break;
            case 'underline':
               textProperties.textDecoration = !textProperties.textDecoration;
                annotation.textDecoration = annotation.textDecoration === 'None' || !annotation.textDecoration ? 'Underline' : 'None';
                this.updateToolbarState('toolbarTextStyle',textProperties.textDecoration, 2);
                break;
            case 'aligntextleft':
            case 'aligntextright':
            case 'aligntextcenter':
                annotation.textAlign = propertyValue.toString().replace('AlignText', '');
               this.updateTextAlign(annotation.textAlign);
                break;
        }
    };
    // Method define the offset values of the text
    UtilityMethods.prototype.getOffset = function(position){
        switch (position.toLowerCase()) {
            case 'topleft':
                return { x: 0, y: 0 };
            case 'topcenter':
                return { x: 0.5, y: 0 };
            case 'topright':
                return { x: 1, y: 0 };
            case 'middleleft':
                return { x: 0, y: 0.5 };
            default:
                return { x: 0.5, y: 0.5 };
            case 'middleright':
                return { x: 1, y: 0.5 };
            case 'bottomleft':
                return { x: 0, y: 1 };
            case 'bottomcenter':
                return { x: 0.5, y: 1 };
            case 'bottomright':
                return { x: 1, y: 1 };
        }
      };
      //Method define the enable and disable of icons in single selection in toolbar
    UtilityMethods.prototype.onClickDisable = function(args)
{
  if(args === false)
  {
      for(i=8;i<33;i++)
      {
          if(toolbarEditor.items[i].type !=='Separator'){
              if(i<=17)
              {
                toolbarEditor.items[i].template = '<div></div>';
              }
              else if(i>17 && i!==31){
                toolbarEditor.items[i].template = '';
              }
              else if(i === 31) {
                var obj =  diagram.selectedItems.nodes.length>0 ?diagram.selectedItems.nodes[0] : diagram.selectedItems.connectors[0];
                if((obj.annotations.length && obj.annotations[0].content )|| (obj.shape.type === "Text")) 
                {
                  toolbarEditor.items[i].template = '';
                  toolbarEditor.hideItem(i+1,false);
                }
                else{
                  toolbarEditor.items[i].template = '<div></div>';
                  toolbarEditor.hideItem(i+1,true);
                }
             }
          }
      }
  }
  else{
      for(i=8;i<33;i++)
      {
          if(toolbarEditor.items[i].type !=='Separator'){
            toolbarEditor.items[i].template = '<div></div>';
          }
         
      }
  }
};

//save the diagram object in json data.
UtilityMethods.prototype.download = function(data)
 {
    if (window.navigator.msSaveBlob) {
        var blob = new Blob([data], { type: 'data:text/json;charset=utf-8,' });
        window.navigator.msSaveOrOpenBlob(blob, 'Diagram.json');
    }
    else {
        var dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(data);
        var a = document.createElement('a');
        a.href = dataStr;
        a.download = 'Diagram.json';
        document.body.appendChild(a);
        a.click();
        a.remove();
    }
  }
  //Method for synchronization of page orientation between menubar and property panel
  UtilityMethods.prototype.updateSelection = function(item)
 {
    for(i=0;i<item.parentObj.items.length;i++)
    {
        if(item.text === item.parentObj.items[i].text){
            item.parentObj.items[i].iconCss = 'sf-icon-check-tick';
        }
        else{
            item.parentObj.items[i].iconCss = '';
        }
    }
 }
 //Method o remove the selection highlight in toolbar
 UtilityMethods.prototype.removeSelectedToolbarItem = function()
{
    var toolbarEditor = document.getElementById('toolbarEditor').ej2_instances[0];;
    for (var i = 0; i < toolbarEditor.items.length; i++) {
        var item = toolbarEditor.items[i];
        if (item.cssClass.indexOf('tb-item-selected') !== -1) {
            item.cssClass = item.cssClass.replace(' tb-item-selected', '');
        }
    }
    toolbarEditor.dataBind();
  }
  //Method define the paper size
  UtilityMethods.prototype.getPaperSize = function(args)
{
    var paperSize = new PaperSize();
    switch (args) {
        case 'Letter':
            paperSize.pageWidth = 816;
            paperSize.pageHeight = 1056;
            break;
        case 'Legal':
            paperSize.pageWidth = 816;
            paperSize.pageHeight = 1344;
            break;
        case 'Tabloid':
            paperSize.pageWidth = 1056;
            paperSize.pageHeight = 1632;
            break;
        case 'A0':
            paperSize.pageWidth = 3179;
            paperSize.pageHeight = 4494;
            break;
         case 'A1':
            paperSize.pageWidth = 2245;
            paperSize.pageHeight = 3179;
            break;
         case 'A2':
            paperSize.pageWidth = 1587;
            paperSize.pageHeight = 2245;
            break;
        case 'A3':
            paperSize.pageWidth = 1122;
            paperSize.pageHeight = 1587;
            break;
        case 'A4':
            paperSize.pageWidth = 793;
            paperSize.pageHeight = 1122;
            break;
        case 'A5':
            paperSize.pageWidth = 559;
            paperSize.pageHeight = 793;
            break;
        case 'A6':
            paperSize.pageWidth = 396;
            paperSize.pageHeight = 559;
            break;
    }
    return paperSize;
};
//Method to change paper size 
UtilityMethods.prototype.paperListChange = function(args)
{
    document.getElementById('pageDimension').style.display ='none';
    document.getElementById('pageOrientation').style.display ='';
    var value = args.value || args.item.value;
    var paperSize =  UtilityMethods.prototype.getPaperSize(value);
    var pageWidth = paperSize.pageWidth;
    var pageHeight = paperSize.pageHeight;
    if (pageWidth && pageHeight) {
        if (diagram.pageSettings.orientation = 'Portrait') {
            if (pageWidth > pageHeight) {
                var temp = pageWidth;
                pageWidth = pageHeight;
                pageHeight = temp;
            }
        }
        else {
            if (pageHeight > pageWidth) {
                var temp = pageHeight;
                pageHeight = pageWidth;
                pageWidth = temp;
            }
        }
        diagram.pageSettings.width = pageWidth;
        diagram.pageSettings.height = pageHeight;
        
      }
    else{
      document.getElementById('pageOrientation').style.display = 'none';
      document.getElementById('pageDimension').style.display = '';
      diagram.pageSettings.width = 1460;
      diagram.pageSettings.height = 600;
    }
    this.bindPaperSize(designContextMenu.items[1],args.value);
    diagram.dataBind();
    
  };
  //Method to synchronize the paper size between menubar and property panel
  UtilityMethods.prototype.bindPaperSize = function(items,value)
{
    for(i=0;i<items.items.length;i++){
      if(value === items.items[i].value) 
      {
        items.items[i].iconCss = 'sf-icon-check-tick';
      }
      else{
        items.items[i].iconCss = '';
      }
    }
  }
  //Method defines the page orientation change
  UtilityMethods.prototype.pageOrientationChange = function(args)
{
    if (args.target) {
        var target = args.target;
            var items = designContextMenu.items;
            var option = target.id ? target.id : (args.currentTarget.ej2_instances[0].iconCss === 'sf-icon-portrait'? 'pagePortrait':'pageLandscape');  
            switch (option) {
                case 'pagePortrait':
                    diagram.pageSettings.isPortrait = true;
                    diagram.pageSettings.isLandscape = false;
                    diagram.pageSettings.orientation = 'Portrait';
                    items[0].items[0].iconCss = '';
                    items[0].items[1].iconCss = 'sf-icon-check-tick';
                    document.getElementById('pageLandscape').classList.remove('e-active');
                    break;
                case 'pageLandscape':
                    diagram.pageSettings.isPortrait = false;
                    diagram.pageSettings.isLandscape = true;
                    diagram.pageSettings.orientation = 'Landscape';
                    items[0].items[0].iconCss = 'sf-icon-check-tick';
                    items[0].items[1].iconCss = '';
                    document.getElementById('pagePortrait').classList.remove('e-active');
                    break;
        }
        
        diagram.dataBind();
        diagram.pageSettings.pageWidth = diagram.pageSettings.width;
        diagram.pageSettings.pageHeight = diagram.pageSettings.height;
    }
  };
  UtilityMethods.prototype.pageDimensionChange = function(args)
{
    if (args.event) {
        var pageWidth = Number(diagram.pageSettings.width);
        var pageHeight = Number(diagram.pageSettings.height);
        var target = args.event.target;
        if (target.tagName.toLowerCase() === 'span') {
            target = target.parentElement.children[0];
        }
        if (target.id === 'pageWidth') {
            pageWidth = Number(target.value.replace(/,/g, ''));
        }
        else {
            pageHeight = Number(target.value.replace(/,/g, ''));
        }
        if (pageWidth && pageHeight) {
            if (pageWidth > pageHeight) {
              diagram.pageSettings.isPortrait = false;
              diagram.pageSettings.isLandscape = true;
              diagram.pageSettings.orientation = 'Landscape';
            }
            else {
              diagram.pageSettings.isPortrait = true;
              diagram.pageSettings.isLandscape = false;
              diagram.pageSettings.orientation = 'Portrait';
            }
            diagram.pageSettings.pageWidth = diagram.pageSettings.width = pageWidth;
            diagram.pageSettings.pageHeight = diagram.pageSettings.height = pageHeight;
            diagram.dataBind();
        }
    }
  };
  //Method define background color change
  UtilityMethods.prototype.pageBackgroundChange1= function(args)
  {
    if (args.currentValue) {
        // let target: HTMLInputElement = args.target as HTMLInputElement;
        diagram.pageSettings.background = {
            color: args.currentValue.rgba
        };
        diagram.dataBind();
    }
  }
  //Method define page breaks
  UtilityMethods.prototype.pageBreaksChange = function(args)
  {
    var items = btnViewMenu.items;
    if (args.event) {
        diagram.pageSettings.pageBreaks = args.checked;
        diagram.pageSettings.showPageBreaks = args.checked;
        if(args.checked === true){
            items[5].iconCss = 'sf-icon-check-tick';
        }
        else
        {
        items[5].iconCss = '';    
        }
    }
  }; 
  //Method define the text position
  UtilityMethods.prototype.getPosition = function(offset)
  {
    if (offset.x === 0 && offset.y === 0) {
        return 'TopLeft';
    }
    else if (offset.x === 0.5 && offset.y === 0) {
        return 'TopCenter';
    }
    else if (offset.x === 1 && offset.y === 0) {
        return 'TopRight';
    }
    else if (offset.x === 0 && offset.y === 0.5) {
        return 'MiddleLeft';
    }
    else if (offset.x === 1 && offset.y === 0.5) {
        return 'MiddleRight';
    }
    else if (offset.x === 0 && offset.y === 1) {
        return 'BottomLeft';
    }
    else if (offset.x === 0.5 && offset.y === 1) {
        return 'BottomCenter';
    }
    else if (offset.x === 1 && offset.y === 1) {
        return 'BottomRight';
    }
    else {
        return 'Center';
    }
  };
  //Method define the text color
  UtilityMethods.prototype.getHexColor= function(colorStr)
 {
    var a = document.createElement('div');
    a.style.color = colorStr;
    var colors = window.getComputedStyle(document.body.appendChild(a)).color.match(/\d+/g).map(function (a) {
        return parseInt(a, 10);
    });
    document.body.removeChild(a);
    return (colors.length >= 3) ? '#' + (((1 << 24) + (colors[0] << 16) + (colors[1] << 8) + colors[2]).toString(16).substr(1)) : '';
  };
  //Method define the Insert link and insert image
  UtilityMethods.prototype.toolbarInsertClick = function(args)
{      
    var commandType =(args.item ? args.item.text : args.target.id).replace(/[' ']/g, '').toLowerCase();
    if (diagram.selectedItems.nodes.length > 0) {
        switch (commandType) {
            case 'insertlink':
                 document.getElementById('hyperlink').value = '';
                 document.getElementById('hyperlinkText').value = '';
                if (diagram.selectedItems.nodes[0].annotations.length > 0) {
                    var annotation = diagram.selectedItems.nodes[0].annotations[0];
                    if (annotation.hyperlink.link || annotation.content) {
                        document.getElementById('hyperlink').value = annotation.hyperlink.link;
                        document.getElementById('hyperlinkText').value = annotation.hyperlink.content || annotation.content;
                    }
                }
                hyperlinkDialog.show();
                break;
            case 'insertimage':
              openUploadBox(false, '.jpg,.png,.bmp');
              break;
        }
    }
  }
  //Method define the aspect ratio
  UtilityMethods.prototype.aspectRatioClick = function(args)
    {
    var isAspect = true;
    if(document.getElementById('aspectRatioBtn').classList.contains('e-active'))
    {
        isAspect = true;
        aspectRatioBtn.iconCss =  'sf-icon-lock'
    }
    else{
        isAspect = false;
        aspectRatioBtn.iconCss = 'sf-icon-unlock';
    }
    PropertyChange.prototype.nodePropertyChange({propertyName: 'aspectRatio', propertyValue: isAspect}); 
    };
    //Method define the dialog for export,print,hyperlink
    UtilityMethods.prototype.getDialogButtons = function(dialogType)
     {
        var buttons= [];
        switch (dialogType) {
            case 'export':
                buttons.push({
                    click: this.btnExportClick.bind(this), buttonModel: { content: 'Export', cssClass: 'e-flat e-db-primary', isPrimary: true }
                });
                break;
            case 'print':
                buttons.push({
                click: this.btnPrintClick.bind(this),
                buttonModel: { content: 'Print', cssClass: 'e-flat e-db-primary', isPrimary: true }
                });
                break;
            case 'hyperlink':
                buttons.push({
                    click: this.btnHyperLink.bind(this),
                    buttonModel: { content: 'Apply', cssClass: 'e-flat e-db-primary', isPrimary: true }
                });
                break;
        }
        buttons.push({
            click: this.btnCancelClick.bind(this),
            buttonModel: { content: 'Cancel', cssClass: 'e-outline', isPrimary: true }
        });
        return buttons;
      }
      //Method define the export dialog
      UtilityMethods.prototype.btnExportClick = function()
       {
  
        diagram.exportDiagram({
            fileName: document.getElementById("exportfileName").value,
            format:exportFormat.value,
            region: exportRegion.value
        });
        exportDialog.hide();
    }
     //Method define the print dialog
    UtilityMethods.prototype.btnPrintClick = function()
 {
        var pageWidth = printSettings.pageWidth;
        var pageHeight =printSettings.pageHeight;
        var paperSize = UtilityMethods.prototype.getPaperSize(printSettings.paperSize);
        if (paperSize.pageHeight && paperSize.pageWidth) {
            pageWidth = paperSize.pageWidth;
            pageHeight = paperSize.pageHeight;
        }
        if (diagram.pageSettings.isPortrait) {
            if (pageWidth > pageHeight) {
                var temp = pageWidth;
                pageWidth = pageHeight;
                pageHeight = temp;
            }
        } else {
            if (pageHeight > pageWidth) {
                var temp1 = pageHeight;
                pageHeight = pageWidth;
                pageWidth = temp1;
            }
        }
        diagram.print({
            region: printSettings.region, pageHeight: pageHeight, pageWidth: pageWidth,
            multiplePage: !printSettings.multiplePage,
            pageOrientation: printSettings.isPortrait ? 'Portrait' : 'Landscape'
        });
        printDialog.hide();
      }
       //Method define the hyperlink dialog
      UtilityMethods.prototype.btnHyperLink = function()
      {
        var node = diagram.selectedItems.nodes[0];
        if (node.annotations.length > 0) {
            node.annotations[0].hyperlink.link = document.getElementById('hyperlink').value;
            node.annotations[0].hyperlink.content = document.getElementById('hyperlinkText').value;
            this.applyToolTipforHyperlink(node);
            diagram.dataBind();
        } else {
            var annotation = {
                hyperlink: {
                    content: document.getElementById('hyperlinkText').value,
                    link: document.getElementById('hyperlink').value
                }
            };
            diagram.addLabels(node, [annotation]);
            this.applyToolTipforHyperlink(node);
            diagram.dataBind();
        }
        hyperlinkDialog.hide();
      }
       //Method define the ecancel for the dialog
      UtilityMethods.prototype.btnCancelClick = function(args)
     {
        var ss = args.target;
        var key = ss.offsetParent.id;
        switch (key) {
            case 'exportDialog':
                exportDialog.hide();
                break;
            case 'hyperlinkDialog':
                hyperlinkDialog.hide();
                break;
            case 'printDialog':
                printDialog.hide();
                break;
          
        }
      }
      UtilityMethods.prototype.applyToolTipforHyperlink = function(node)
      {
        node.constraints = ej.diagrams.NodeConstraints.Default & ~ej.diagrams.NodeConstraints.InheritTooltip | ej.diagrams.NodeConstraints.Tooltip;
        node.tooltip = {
            content: node.annotations[0].hyperlink.link, relativeMode: 'Object',
            position: 'TopCenter', showTipPointer: true,
        };
      }
//     //Method for property panel hide
      UtilityMethods.prototype.hideElements = function(elementType, diagram)
    {
        var diagramContainer = document.getElementsByClassName('diagrambuilder-container')[0];
        if (diagramContainer.classList.contains(elementType)) {
                diagramContainer.classList.remove(elementType);
                document.getElementById('hideProperty').style.backgroundColor = ''
                hidePropertyBtn.isPrimary = true;
        }
        else {
            diagramContainer.classList.add(elementType);
            document.getElementById('hideProperty').style.backgroundColor = '#e3e3e3'
            hidePropertyBtn.isPrimary = false;
        }
        if (diagram) {
            diagram.updateViewPort();
        }
    };
     //Method to define the position of color picker
    UtilityMethods.prototype.showColorPicker = function(propertyName, toolbarName)
    {
        var fillElement =
            document.getElementById(propertyName).parentElement.getElementsByClassName('e-dropdown-btn')[0];
        fillElement.click();
        var popupElement = document.getElementById(fillElement.id + '-popup');
        var bounds = document.getElementsByClassName(toolbarName)[0].getBoundingClientRect();
        popupElement.style.left = bounds.left + 'px';
        popupElement.style.top = (bounds.top + 40) + 'px';
      }

return UtilityMethods;
}());