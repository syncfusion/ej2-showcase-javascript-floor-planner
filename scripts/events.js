var DiagramClientSideEvents = (function () {
    function DiagramClientSideEvents(){
        //Method define the selection change in the diagram
        DiagramClientSideEvents.prototype.selectionChange = function (args) 
        {
            if(args.state === 'Changed')
          {
            {
              var selectedItems = diagram.selectedItems.nodes;
              selectedItems = selectedItems.concat(diagram.selectedItems.connectors);
              enableToolbarItems(selectedItems);
              var nodeContainer = document.getElementById('nodePropertyContainer');
              nodeContainer.classList.remove('multiple');
              nodeContainer.classList.remove('connector');
              if (selectedItems.length > 1) {
                  this.multipleSelectionSettings(selectedItems);
                  toolbarEditor.items[8].tooltipText = 'Group';
                  toolbarEditor.items[8].prefixIcon = 'sf-icon-group';
                  toolbarEditor.items[8].template = '';
                  this.multipleSelection();
                  toolbarEditor.hideItem(9,false);
                  toolbarEditor.hideItem(18,false);
                  toolbarEditor.hideItem(23,false);
                  toolbarEditor.hideItem(26,false);
                  toolbarEditor.hideItem(29,false);
                  toolbarEditor.hideItem(32,true);
              }
              else if (selectedItems.length === 1) {
                  this.singleSelectionSettings(selectedItems[0]);
                  UtilityMethods.prototype.onClickDisable(false);
                  toolbarEditor.hideItem(9,true);
                  toolbarEditor.hideItem(18,false);
                  toolbarEditor.hideItem(23,false);
                  toolbarEditor.hideItem(26,false);
                  toolbarEditor.hideItem(29,false)
                  if(selectedItems[0].children && selectedItems[0].children.length>0)
                              {
                                toolbarEditor.items[8].tooltipText = 'UnGroup';
                                toolbarEditor.items[8].prefixIcon = 'sf-icon-ungroup';
                                toolbarEditor.items[8].disabled = false;
                                toolbarEditor.items[8].template = '';
                              }
              }
              else {
                  this.objectTypeChange('diagram');
                  UtilityMethods.prototype.onClickDisable(true);
                  toolbarEditor.hideItem(9,true);
                  toolbarEditor.hideItem(18,true);
                  toolbarEditor.hideItem(23,true);
                  toolbarEditor.hideItem(26,true);
                  toolbarEditor.hideItem(29,true);
              }
          }
            }  
          }
    };
     //Method define the position change in the diagram
    DiagramClientSideEvents.prototype.positionChange = function(args)
    {
        if(diagram.selectedItems.nodes.concat(diagram.selectedItems.connectors).length===1){
            nodeProperties.offsetX.value = args.newValue.offsetX;
            nodeProperties.offsetY.value = args.newValue.offsetY;
        }
    };
    //Method define the size change in the diagram
    DiagramClientSideEvents.prototype.sizeChange =function(args)
    {
        if(diagram.selectedItems.nodes.concat(diagram.selectedItems.connectors).length===1){
            nodeProperties.width.value = args.newValue.width;
            nodeProperties.height.value = args.newValue.height;
            nodeProperties.offsetX.value = args.newValue.offsetX;
            nodeProperties.offsetY.value = args.newValue.offsetY;
            }
    };
    //Method define the rotation change in the diagram
    DiagramClientSideEvents.prototype.rotateChange =function(args)
    {
        if(args.state === 'Start' || args.state === 'Progress')
        {
            diagram.selectedItems = { constraints: ej.diagrams.SelectorConstraints.None};
        }
        if(args.state === 'Completed'){
            diagram.selectedItems = { constraints: ej.diagrams.SelectorConstraints.All|ej.diagrams.SelectorConstraints.UserHandle };
        }
        if(diagram.selectedItems.nodes.concat(diagram.selectedItems.connectors).length===1){
            nodeProperties.rotateAngle.value = args.newValue.rotateAngle;
        }
    };
    //Method define the history change in the diagram
    DiagramClientSideEvents.prototype.historyChange = function(args)
      {
        var toolbarContainer = document.getElementsByClassName('db-toolbar-container')[0];
        toolbarContainer.classList.remove('db-undo');
        toolbarContainer.classList.remove('db-redo');
        if (diagram.historyManager.undoStack.length > 0) {
            toolbarContainer.classList.add('db-undo');
        }
        if (diagram.historyManager.redoStack.length > 0) {
            toolbarContainer.classList.add('db-redo');
        }
      };
      //Method define the created change in the diagram
      DiagramClientSideEvents.prototype.created= function(args)
    {
        diagram.fitToPage({ mode: 'Page', region: 'Content'});
        // diagram.width = diagram.pageSettings.pageWidth;;
        // diagram.height=diagram.pageSettings.pageHeight;;
    };
    //Method define the drag Enter in the diagram
      DiagramClientSideEvents.prototype.dragEnter = function(args) {
        if(args.element.id.indexOf('Door close')!== -1 || args.element.id.indexOf('Double door close')!== -1 )
        {
        args.element.width = 40;
        args.element.height =40;
        }
        else if(args.element.id.indexOf('Circle Study Table')!== -1 || args.element.id.indexOf('Circular Table for Two')!== -1 || args.element.id.indexOf('Circle Study Table1')!== -1 || args.element.id.indexOf('Circle Study Table2')!== -1 ||args.element.id.indexOf('Circle Study Table3')!== -1 )
        {
            args.element.width = 40;
            args.element.height =40;
        }
        else if(args.element.id.indexOf('Oblong Dining Table')!== -1 || args.element.id.indexOf('Rectangle Dining Table')!== -1 ||args.element.id.indexOf('Circle Dining Table')!== -1 || args.element.id.indexOf('Oval Dining Table')!== -1 )
        {
            args.element.width = 60;
            args.element.height =40;
        }
        else if(args.element.id.indexOf('Rectangular Table for Two')!== -1 )
        {
            args.element.width = 40;
            args.element.height =32;
        }
        else if(args.element.id.indexOf('Rectangle Study Table')!== -1 || args.element.id.indexOf('Rectangle Study Table1')!== -1 )
        {
            args.element.width = 40;
            args.element.height =20;
        }
        else if(args.element.id.indexOf('Refrigerator')!== -1 || args.element.id.indexOf('Water Cooler')!== -1 || args.element.id.indexOf('Chair')!== -1 ||args.element.id.indexOf('Chair1')!== -1 || args.element.id.indexOf('Stool')!== -1 || args.element.id.indexOf('Elevator')!== -1 || args.element.id.indexOf('Wall Corner')!== -1  || args.element.id.indexOf('Wall Corner1')!== -1  )
        {
            args.element.width = 40;
            args.element.height =40;
        }
        else if(args.element.id.indexOf('Double bed')!== -1 || args.element.id.indexOf('Double bed1')!== -1)
        {
            args.element.width = 65;
            args.element.height =63;
        }
        else if(args.element.id.indexOf('Single bed')!== -1 || args.element.id.indexOf('Single bed1')!== -1)
        {
            args.element.width = 40;
            args.element.height =63;
        }
        else if(args.element.id.indexOf('Book Case')!== -1 || args.element.id.indexOf('Warddrobe')!== -1 ||args.element.id.indexOf('Warddrobe1')!== -1)
        {
            args.element.width = 50;
            args.element.height =25;
        }
        else if(args.element.id.indexOf('Large Plant')!== -1 || args.element.id.indexOf('Small Plant')!== -1 ||args.element.id.indexOf('Lamp light')!== -1)
        {
            args.element.width = 25;
            args.element.height =25;
        }
        else if(args.element.id.indexOf('Matte')!== -1 || args.element.id.indexOf('Matte1')!== -1)
        {
            args.element.width = 40;
            args.element.height =20;
        }
        else if(args.element.id.indexOf('Flat TV')!== -1 || args.element.id.indexOf('Flat TV1')!== -1)
        {
            args.elementwidth = 68;
            args.element.height =10;
        }
        else if(args.element.id.indexOf('TV')!== -1)
        {
            args.element.width = 40;
            args.element.height =25;
        }
        else if(args.element.id.indexOf('Single Sofa')!== -1|| args.element.id.indexOf('Couch')!== -1 )
        {
            args.element.width = 40;
            args.element.height =30;
        }
        else if(args.element.id.indexOf('Sofa')!== -1 || args.element.id.indexOf('Double Sofa')!== -1 || node.id.indexOf('Lounge')!== -1)
        {
            args.element.width = 87;
            args.element.height =30;
        }
        else if(args.element.id.indexOf('Window Garden')!== -1 )
        {
            args.element.width = 87;
            args.element.height =40;
        }
        else if( args.element.id.indexOf('Window')!== -1|| args.element.id.indexOf('window1')!== -1 )
        {
            args.element.width = 47;
            args.element.height =6;
        }
        
        else if(args.element.id.indexOf('Piano')!== -1)
        {
            args.element.width = 51;
            args.element.height =29;
        }
        else if( args.element.id.indexOf('Printer')!== -1 ||args.element.id.indexOf('Laptop')!== -1 )
        {
            args.element.width = 30;
            args.element.height =30;
        }
        else if( args.element.id.indexOf('Room')!== -1 || args.element.id.indexOf('T Room')!== -1 ||args.element.id.indexOf('L Room')!== -1  || args.element.id.indexOf('T Wall')!== -1 )
        {
            args.element.width = 50;
            args.element.height =50;
        } 
        else if( args.element.id.indexOf('Toilet1')!== -1 || args.element.id.indexOf('Toilet2')!== -1 || args.element.id.indexOf('Corner Shower')!== -1  ||args.element.id.indexOf('Shower')!== -1 || args.element.id.indexOf('Wash Basin1')!== -1 || args.element.id.indexOf('Wash Basin2')!== -1 || args.element.id.indexOf('Wash Basin3')!== -1 || args.element.id.indexOf('Wash Basin5')!== -1 || args.element.id.indexOf('Wash Basin6')!== -1 || args.element.id.indexOf('Double Sink')!== -1 || args.element.id.indexOf('Double Sink1')!== -1|| args.element.id.indexOf('Double Sink2')!== -1|| args.element.id.indexOf('Double Sink4')!== -1  )
        {
            args.element.width = 30;
            args.element.height =30;
        }
        else if( args.element.id.indexOf('Bath Tub')!== -1 || args.element.id.indexOf('Bath Tub1')!== -1 ||args.element.id.indexOf('Bath Tub2')!== -1  || args.element.id.indexOf('Bath Tub3')!== -1  )
        {
            args.element.width = 55;
            args.element.height =30;
        }
        else
        {
            args.element.width = 50;
            args.element.height =50;
        }
    //   var obj = args.element;
    //   var ratio = 100 / obj.width;
    //   obj.width = 100;
    //   obj.height *= ratio;
      };
      //Method define the multiple selection
      DiagramClientSideEvents.prototype.multipleSelectionSettings = function(selectedItems) 
      {
        this.objectTypeChange('None');
        var showConnectorPanel = false, showNodePanel = false;
        var showTextPanel = false, showConTextPanel = false;
        var nodeContainer = document.getElementById('nodePropertyContainer');
        for (var i = 0; i < selectedItems.length; i++) {
            var object = selectedItems[i];
            if (object instanceof ej.diagrams.Node && (!showNodePanel || !showTextPanel)) {
                showNodePanel = true;
                showTextPanel = object.annotations.length > 0 && object.annotations[0].content ? true : false;
            }
            else if (object instanceof ej.diagrams.Connector && (!showConnectorPanel || !showConTextPanel)) {
                showConnectorPanel = true;
                showConTextPanel = object.annotations.length > 0 && object.annotations[0].content ? true : false;
            }
        }
        var selectItem1 =diagram.selectedItems;
        if (showNodePanel) {
            nodeContainer.style.display = '';
            nodeContainer.classList.add('multiple');
            if (showConnectorPanel) {
                nodeContainer.classList.add('connector');
            }
            this.bindNodeProperties(selectItem1.nodes[0], selectedItem);
        }
        if (showConnectorPanel && !showNodePanel) {
            document.getElementById('connectorPropertyContainer').style.display = '';
            this.bindConnectorProperties(selectItem1.connectors[0], selectedItem);
        }
        if (showTextPanel || showConTextPanel) {
            document.getElementById('textPropertyContainer').style.display = '';
            if (showTextPanel && showConTextPanel) {
                document.getElementById('textPositionDiv').style.display = 'none';
                document.getElementById('textColorDiv').className = 'col-xs-6 db-col-left';
            }
            else {
                document.getElementById('textPositionDiv').style.display = '';
                document.getElementById('textColorDiv').className = 'col-xs-6 db-col-right';
                if (showConTextPanel) {
                    ddlTextPosition.dataSource = textProperties.getConnectorTextPositions();
                    //selectedItem.utilityMethods.bindTextProperties(selectItem1.connectors[0].annotations[0].style, selectedItem);
                }
                else {
                    ddlTextPosition.dataSource = textProperties.getNodeTextPositions();
                    //selectedItem.utilityMethods.bindTextProperties(selectItem1.connectors[0].annotations[0].style, selectedItem);
                }
                ddlTextPosition.dataBind();
            }
        }
      };

      DiagramClientSideEvents.prototype. multipleSelection= function()
{
  for(i=8;i<33;i++)
  {
      if(toolbarEditor.items[i].type !=='Separator'){
          if(i !== 32 &&  i !== 33){
          toolbarEditor.items[i].template= '';
          }
          if(i == 32 || i == 33)
          {
          toolbarEditor.items[i].template= '<div></div>';
          }
      }
  }
}
    //Method define the Single selection
      DiagramClientSideEvents.prototype.singleSelectionSettings = function(selectedObject)
     {
        var object = null;
        if (selectedObject instanceof ej.diagrams.Node) {
            this.objectTypeChange('node');
            object = selectedObject;
            this.bindNodeProperties(object, selectedItem);
        }
        else if (selectedObject instanceof  ej.diagrams.Connector) {
            this.objectTypeChange('connector');
            object = selectedObject;
            this.bindConnectorProperties(object, selectedItem);
        }
        if (object.shape && object.shape.type === 'Text') {
            document.getElementById('textPropertyContainer').style.display = '';
            document.getElementById('toolbarTextAlignmentDiv').style.display = 'none';
            document.getElementById('textPositionDiv').style.display = 'none';
            document.getElementById('textColorDiv').className = 'col-xs-6 db-col-left';
            this.bindTextProperties(object.style, selectedItem);
        }
        else if (object.annotations.length > 0 && object.annotations[0].content) {
            document.getElementById('textPropertyContainer').style.display = '';
            var annotation = null;
            document.getElementById('toolbarTextAlignmentDiv').style.display = '';
            document.getElementById('textPositionDiv').style.display = '';
            document.getElementById('textColorDiv').className = 'col-xs-6 db-col-right';
            this.bindTextProperties(object.annotations[0].style);
            UtilityMethods.prototype.updateHorVertAlign(object.annotations[0].horizontalAlignment, object.annotations[0].verticalAlignment);
            if (object.annotations[0] instanceof ej.diagrams.ShapeAnnotation) {
                annotation = object.annotations[0];
                ddlTextPosition.dataSource = textProperties.getNodeTextPositions();
                ddlTextPosition.value = textProperties.textPosition = null;
                ddlTextPosition.dataBind();
                ddlTextPosition.value = textProperties.textPosition = UtilityMethods.prototype.getPosition(annotation.offset);
                ddlTextPosition.dataBind();
            }
            else if (object.annotations[0] instanceof ej.diagrams.PathAnnotation) {
                annotation = object.annotations[0];
                ddlTextPosition.dataSource = textProperties.getConnectorTextPositions();
                ddlTextPosition.value = textProperties.textPosition = null;
                ddlTextPosition.dataBind();
                ddlTextPosition.value = textProperties.textPosition = annotation.alignment;
                ddlTextPosition.dataBind();
            }
        }
      };
      //Method define the diagram container
      DiagramClientSideEvents.prototype.objectTypeChange = function(objectType)
     {
        document.getElementById('diagramPropertyContainer').style.display = 'none';
        document.getElementById('nodePropertyContainer').style.display = 'none';
        document.getElementById('textPropertyContainer').style.display = 'none';
        document.getElementById('connectorPropertyContainer').style.display = 'none';
        switch (objectType) {
            case 'diagram':
                document.getElementById('diagramPropertyContainer').style.display = '';
                break;
            case 'node':
                document.getElementById('nodePropertyContainer').style.display = '';
                break;
            case 'connector':
              document.getElementById('connectorPropertyContainer').style.display = '';
                break;
        }
      };
      //Method define the node properties binding
      DiagramClientSideEvents.prototype.bindNodeProperties = function(node)
      {
        nodeProperties.offsetX.value = node.offsetX;
        nodeProperties.offsetY.value = node.offsetY;
        nodeProperties.width.value = node.width;
        nodeProperties.height.value = node.height;
        nodeProperties.rotateAngle.value = node.rotateAngle;
        nodeProperties.fillColor.value =  UtilityMethods.prototype.getHexColor(node.style.fill);
        nodeProperties.strokeColor.value =  UtilityMethods.prototype.getHexColor(node.style.strokeColor);
        nodeProperties.strokeWidth.value = node.style.strokeWidth;
        nodeProperties.strokeStyle.value = node.style.strokeDashArray ? node.style.strokeDashArray :'None';
        nodeProperties.opacity.value = node.style.opacity*100;
        nodeProperties.aspectRatio.cssClass = node.constraints & ej.diagrams.NodeConstraints.AspectRatio ? document.getElementById('aspectRatioBtn').classList.add('e-active') : document.getElementById('aspectRatioBtn').classList.remove('e-active');
        node.constraints & ej.diagrams.NodeConstraints.AspectRatio ? aspectRatioBtn.iconCss = 'sf-icon-lock': aspectRatioBtn.iconCss = 'sf-icon-unlock';
      }
      //Method define the connector properties binding
      DiagramClientSideEvents.prototype.bindConnectorProperties = function(connector)
      {
        connectorProperties.lineColor.value =  UtilityMethods.prototype.getHexColor(connector.style.strokeColor);
         connectorProperties.lineWidth.value = connector.style.strokeWidth;
         connectorProperties.opacity.value = connector.style.opacity * 100;
        }
       //Method define the text properties binding
       DiagramClientSideEvents.prototype.bindTextProperties = function(text)
       {
        textProperties.fontColor.value =  UtilityMethods.prototype.getHexColor(text.color);
        textProperties.fontFamily.value = text.fontFamily;
        textProperties.fontSize.value = text.fontSize;
        textProperties.opacity.value = text.opacity * 100;
        var toolbarTextStyle = document.getElementById('toolbarTextStyle');
        if (toolbarTextStyle) {
            toolbarTextStyle = toolbarTextStyle.ej2_instances[0];
        }
        if (toolbarTextStyle) {
            toolbarTextStyle.items[0].cssClass = text.bold ? 'tb-item-start tb-item-selected' : 'tb-item-start';
            toolbarTextStyle.items[1].cssClass = text.italic ? 'tb-item-middle tb-item-selected' : 'tb-item-middle';
            toolbarTextStyle.items[2].cssClass = text.textDecoration === 'Underline' ? 'tb-item-end tb-item-selected' : 'tb-item-end';
        }
        UtilityMethods.prototype.updateTextAlign(text.textAlign);
      };
    return DiagramClientSideEvents;
}());