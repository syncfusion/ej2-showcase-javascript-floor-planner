var PropertyChange = (function () {
    function PropertyChange() {
    };
    //Method define node property change
    PropertyChange.prototype.nodePropertyChange = function(args)
    {
            if (diagram) {
                if (diagram.selectedItems.nodes.length > 0) {
                    var selectedNodes = diagram.selectedItems.nodes;
                    for (var i = 0; i < selectedNodes.length; i++) {
                        var node = selectedNodes[i];
                        var propertyName1 = args.propertyName.toString().toLowerCase();
                        switch (propertyName1) {
                            case 'offsetx':
                                node.offsetX = nodeProperties.offsetX.value;
                                break;
                            case 'offsety':
                                node.offsetY = nodeProperties.offsetY.value;
                                break;
                            case 'width':
                                node.width = nodeProperties.width.value;
                                break;
                            case 'height':
                                node.height = nodeProperties.height.value;
                                break;
                            case 'rotateangle':
                                node.rotateAngle = nodeProperties.rotateAngle.value;
                                break;
                            case 'aspectratio':
                                node.constraints = node.constraints ^ ej.diagrams.NodeConstraints.AspectRatio;
                                break;
                        }
                        if (!node.children) {
                            UtilityMethods.prototype.applyNodeStyle(propertyName1, node, args.propertyValue);
                        }
                        else {
                            for (var j = 0; j < node.children.length; j++) {
                            UtilityMethods.prototype.applyNodeStyle(propertyName1, diagram.getObject(node.children[j]), args.propertyValue);
                            }
                        }
                    }
                    this.isModified = true;
                }
                if (diagram.connectors.length > 0) {
                    var selectedNodes = diagram.selectedItems.connectors;
                    for (var i = 0; i < selectedNodes.length; i++) {
                        switch (args.propertyName.toString().toLowerCase()) {
                            case 'strokecolor':
                                connectorProperties.lineColor.value = UtilityMethods.prototype.getColor(nodeProperties.strokeColor.value);
                                break;
                            case 'strokewidth':
                                connectorProperties.lineWidth.value = nodeProperties.strokeWidth.value;
                                break;
                            case 'strokestyle':
                                connectorProperties.lineStyle.value = nodeProperties.strokeStyle.value;
                                break;
                            case 'opacity':
                                connectorProperties.opacity.value = nodeProperties.opacity.value;
                                break;
                        }
                    }
                    this.isModified = true;
                }
                diagram.dataBind();
            }
        
      };
      //Method define connector property change
      PropertyChange.prototype.connectorPropertyChange = function(args)
    {
            if (diagram && diagram.selectedItems.connectors.length > 0) {
                var selectedNodes = diagram.selectedItems.connectors;
                for (var i = 0; i < selectedNodes.length; i++) {
                    var connector = selectedNodes[i];
                    switch (args.propertyName.toString().toLowerCase()) {
                        case 'linecolor':
                            connector.style.strokeColor = UtilityMethods.prototype.getColor(connectorProperties.lineColor.value);
                            connector.sourceDecorator.style = { fill: connector.style.strokeColor, strokeColor: connector.style.strokeColor };
                            connector.targetDecorator.style = { fill: connector.style.strokeColor, strokeColor: connector.style.strokeColor };
                            break;
                        case 'linewidth':
                            connector.style.strokeWidth = connectorProperties.lineWidth.value;
                            if (connector.sourceDecorator.style) {
                                connector.sourceDecorator.style.strokeWidth = connector.style.strokeWidth;
                            }
                            else {
                                connector.sourceDecorator.style = { strokeWidth: connector.style.strokeWidth };
                            }
                            if (connector.targetDecorator.style) {
                                connector.targetDecorator.style.strokeWidth = connector.style.strokeWidth;
                            }
                            else {
                                connector.targetDecorator.style = { strokeWidth: connector.style.strokeWidth };
                            }
                            break;
                        case 'linestyle':
                            connector.style.strokeDashArray = connectorProperties.lineStyle.value;
                            break;
                        case 'linetype':
                            connector.type = connectorProperties.lineType.value;
                            break;
                        case 'sourcetype':
                            connector.sourceDecorator.shape = connectorProperties.sourceType.value;
                            break;
                        case 'targettype':
                            connector.targetDecorator.shape = connectorProperties.targetType.value;
                            break;
                        case 'sourcesize':
                            connector.sourceDecorator.width = connector.sourceDecorator.height = connectorProperties.sourceSize.value;
                            break;
                        case 'targetsize':
                            connector.targetDecorator.width = connector.targetDecorator.height = connectorProperties.targetSize.value;
                            break;
                        case 'opacity':
                            connector.style.opacity = connectorProperties.opacity.value / 100;
                            connector.targetDecorator.style.opacity = connector.style.opacity;
                            connector.sourceDecorator.style.opacity = connector.style.opacity;
                            document.getElementById("connectorOpacitySliderText").value = connectorProperties.opacity.value + '%';
                            break;
                        case 'linejump':
                            if (args.propertyValue.checked) {
                                connector.constraints = connector.constraints | ej.diagrams.ConnectorConstraints.Bridging;
                            }
                            else {
                                connector.constraints = connector.constraints & ~ej.diagrams.ConnectorConstraints.Bridging;
                            }
                            break;
                        case 'linejumpsize':
                            connector.bridgeSpace = connectorProperties.lineJumpSize.value;
                            break;
                    }
                }
                diagram.dataBind();
                this.isModified = true;
            }  
    };
    //Method define text property change
    PropertyChange.prototype.textPropertyChange = function(args)
    {
    if (diagram) {
        var selectedObjects = diagram.selectedItems.nodes;
        selectedObjects = selectedObjects.concat(diagram.selectedItems.connectors);
        var propertyName = args.propertyName.toString().toLowerCase();
        if (selectedObjects.length > 0) {
            for (var i = 0; i < selectedObjects.length; i++) {
                var node = selectedObjects[i];
                if (node instanceof ej.diagrams.Node || node instanceof ej.diagrams.Connector) {
                    if (node.annotations.length > 0) {
                        for (var j = 0; j < node.annotations.length; j++) {
                            var annotation = node.annotations[j].style;
                            UtilityMethods.prototype.updateTextFontProperties(propertyName, annotation);
                        }
                    }
                    else if (node.shape && node.shape.type === 'Text') {
                        UtilityMethods.prototype.updateTextFontProperties(propertyName, node.style);
                    }
                }
            }
            diagram.dataBind();
            this.isModified = true;
        }
    }
};
PropertyChange.prototype.textPropertiesChange = function(propertyName,propertyValue)
{
    var selectedObjects = diagram.selectedItems.nodes;
    selectedObjects = selectedObjects.concat(diagram.selectedItems.connectors);
    propertyName = propertyName.toLowerCase();
    if (selectedObjects.length > 0) {
        for (var i = 0; i < selectedObjects.length; i++) {
            var node = selectedObjects[i];
            if (node instanceof ej.diagrams.Node || node instanceof ej.diagrams.Connector) {
                if (node.annotations.length > 0) {
                    for (var j = 0; j < node.annotations.length; j++) {
                        var annotation = null;
                        if (node.annotations[j] instanceof ej.diagrams.ShapeAnnotation) {
                            annotation = node.annotations[j];
                            if (propertyName === 'textposition') {
                               textProperties.textPosition = propertyValue.toString();
                                annotation.offset =UtilityMethods.prototype.getOffset(propertyValue);
                            }
                        }
                        else if (node.annotations[j] instanceof ej.diagrams.PathAnnotation) {
                            annotation = node.annotations[j];
                            if (propertyName === 'textposition') {
                                textProperties.textPosition = propertyValue.toString();
                                annotation.alignment =textProperties.textPosition;
                            }
                        }
                        if (propertyName === 'left' || propertyName === 'right' || propertyName === 'center') {
                            annotation.horizontalAlignment = propertyValue;
                            UtilityMethods.prototype.updateHorVertAlign(annotation.horizontalAlignment, annotation.verticalAlignment);
                        }
                        else if (propertyName === 'top' || propertyName === 'bottom') {
                            annotation.verticalAlignment = propertyValue;
                            UtilityMethods.prototype.updateHorVertAlign(annotation.horizontalAlignment, annotation.verticalAlignment);
                        }
                        else if (propertyName === 'middle') {
                            annotation.verticalAlignment = 'Center';
                            UtilityMethods.prototype.updateHorVertAlign(annotation.horizontalAlignment, annotation.verticalAlignment);
                        }
                        else {
                            UtilityMethods.prototype.updateTextProperties1(propertyName, propertyValue, annotation.style);
                        }
                    }
                }
                else if (node.shape && node.shape.type === 'Text') {
                    UtilityMethods.prototype.updateTextProperties1(propertyName, propertyValue, node.style);
                }
            }
        }
        diagram.dataBind();
    }
};
return PropertyChange;
}());