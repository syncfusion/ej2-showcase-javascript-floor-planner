ej.base.enableRipple(true);
ej.diagrams.Diagram.Inject(ej.diagrams.UndoRedo);
ej.diagrams.Diagram.Inject(ej.diagrams.PrintAndExport);
var selectedItem; 
window.onload = function ()
{
  diagram = document.getElementById("diagram").ej2_instances[0];
  document.getElementById('btnHideToolbar').onclick = hideMenuBar.bind(this);
  hyperlinkDialog = document.getElementById("hyperlinkDialog").ej2_instances[0];
  
  // document.onmouseover = menumouseover.bind(this);
  // selectedItem = document.getElementById("diagram").ej2_instances[0];
}
var NodeProperties = (function () {
  function NodeProperties() {
      this.m_offsetX = 0;
      this.m_offsetY = 0;
      this.m_width = 0;
      this.m_height = 0;
      this.m_rotateAngle = 0;
      this.m_fillColor = '#ffffff';
      this.m_strokeColor = '#000000';
      this.m_strokeStyle = 'None';
      this.m_strokeWidth = 1;
      this.m_opacity = 0;
      this.opacityText = '0%';
      this.m_aspectRatio = false;
      this.m_gradient = false;
      this.m_gradientDirection = 'BottomToTop';
      this.m_gradientColor = '#ffffff';
  }
  NodeProperties.prototype.getGradient = function (node) {
    var gradientValue = this.getGradientDirectionValue(nodeProperties.gradientDirection.value);
    node.style.gradient = {
        type: 'Linear',
        x1: gradientValue.x1, x2: gradientValue.x2, y1: gradientValue.y1, y2: gradientValue.y2,
        stops: [
            { color: node.style.fill, offset: 0 },
            { color: this.getColor(nodeProperties.gradientColor.value), offset: 1 }
        ]
    };
};
NodeProperties.prototype.getGradientDirectionValue = function (direction) {
    var gradientValue = {};
    var x1 = 0, x2 = 0, y1 = 0, y2 = 0;
    if (direction === 'LeftToRight') {
        x1 = 100;
    }
    else if (direction === 'BottomToTop') {
        y2 = 100;
    }
    else if (direction === 'RightToLeft') {getColornodePropertyContainer
        x2 = 100;
    }
    else {
        y1 = 100;
    }
    gradientValue = { x1: x1, y1: y1, x2: x2, y2: y2 };
    return gradientValue;
};
NodeProperties.prototype.getColor = function (colorName) {
    if (window.navigator.msSaveBlob && colorName.length === 9) {
        return colorName.substring(0, 7);
    }
    return colorName;
};

  return NodeProperties;
}())
var nodeProperties=new NodeProperties();

var ConnectorProperties = (function () {
  function ConnectorProperties() {
      this.m_lineColor = '#ffffff';
  }
 
  return ConnectorProperties;
}());
var connectorProperties =new ConnectorProperties();

var ExportSettings = (function () {
  function ExportSettings() {
      this.m_fileName = 'Diagram';
      this.m_format = 'JPG';
      this.m_region = 'PageSettings';
  }
  Object.defineProperty(ExportSettings.prototype, "fileName", {
      get: function () {
          return this.m_fileName;
      },
      set: function (fileName) {
          this.m_fileName = fileName;
      },
      enumerable: true,
      configurable: true
  });
  Object.defineProperty(ExportSettings.prototype, "format", {
      get: function () {
          return this.m_format;
      },
      set: function (format) {
          this.m_format = format;
      },
      enumerable: true,
      configurable: true
  });
  Object.defineProperty(ExportSettings.prototype, "region", {
      get: function () {
          return this.m_region;
      },
      set: function (region) {
          this.m_region = region;
      },
      enumerable: true,
      configurable: true
  });
  return ExportSettings;
}());
var exportSettings = new ExportSettings();

var TextProperties = (function () {
  function TextProperties() {
      this.m_textPosition = '';
      this.m_fontFamily = 'Arial';
      this.m_fontColor = '#ffffff';
      this.textPositionDataSource = this.getNodeTextPositions();
  }
  TextProperties.prototype.getNodeTextPositions = function () {
      return [
          { text: 'TopLeft', value: 'TopLeft' }, { text: 'TopCenter', value: 'TopCenter' },
          { text: 'TopRight', value: 'TopRight' }, { text: 'MiddleLeft', value: 'MiddleLeft' },
          { text: 'Center', value: 'Center' }, { text: 'MiddleRight', value: 'MiddleRight' },
          { text: 'BottomLeft', value: 'BottomLeft' }, { text: 'BottomCenter', value: 'BottomCenter' },
          { text: 'BottomRight', value: 'BottomRight' },
      ];
  };
  TextProperties.prototype.getConnectorTextPositions = function () {
      return [
          { text: 'Before', value: 'Before' }, { text: 'Center', value: 'Center' },
          { text: 'After', value: 'After' },
      ];
  };
  TextProperties.prototype.triggerPropertyChange = function (propertyName, propertyValue) {
      if (!ej.base.isNullOrUndefined(this.propertyChange)) {
          this.propertyChange.call(this, { propertyName: propertyName, propertyValue: propertyValue });
      }
  };
  return TextProperties;
}());
var textProperties = new TextProperties();

function  getHexColor (colorStr) {
  var a = document.createElement('div');
  a.style.color = colorStr;
  var colors = window.getComputedStyle(document.body.appendChild(a)).color.match(/\d+/g).map(function (a) {
      return parseInt(a, 10);
  });
  document.body.removeChild(a);
  return (colors.length >= 3) ? '#' + (((1 << 24) + (colors[0] << 16) + (colors[1] << 8) + colors[2]).toString(16).substr(1)) : '';
};
function bindNodeProperties(node){
  nodeProperties.offsetX.value = node.offsetX;
  nodeProperties.offsetY.value = node.offsetY;
  nodeProperties.width.value = node.width;
  nodeProperties.height.value = node.height;
  nodeProperties.rotateAngle.value = node.rotateAngle;
  nodeProperties.fillColor.value = getHexColor(node.style.fill);
  nodeProperties.strokeColor.value = getHexColor(node.style.strokeColor);
  nodeProperties.strokeWidth.value = node.style.strokeWidth;
  nodeProperties.strokeStyle.value = node.style.strokeDashArray ? node.style.strokeDashArray :'None';
  nodeProperties.opacity.value = node.style.opacity*100;
}
function bindConnectorProperties(connector){
 
 connectorProperties.lineColor.value = this.getHexColor(connector.style.strokeColor);
  connectorProperties.lineStyle.value = connector.style.strokeDashArray ? connector.style.strokeDashArray : 'None';
  connectorProperties.lineType.value = connector.type;
  connectorProperties.lineWidth.value = connector.style.strokeWidth;
  connectorProperties.sourceType.value = connector.sourceDecorator.shape;
  connectorProperties.targetType.value = connector.targetDecorator.shape;
  connectorProperties.opacity.value = connector.style.opacity * 100;
  connectorProperties.lineJumpSize.value = connector.bridgeSpace;
  connectorProperties.lineJump.checked = connector.constraints & ej.diagrams.ConnectorConstraints.Bridging ? true : false;
  connectorProperties.targetSize.value = connector.targetDecorator.width;
  connectorProperties.sourceSize.value = connector.sourceDecorator.width;
  
}
function nodePropertyChange(args) {
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
                      this.applyNodeStyle(propertyName1, node, args.propertyValue);
                  }
                  else {
                      for (var j = 0; j < node.children.length; j++) {
                          this.applyNodeStyle(propertyName1, diagram.getObject(node.children[j]), args.propertyValue);
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
                          connectorProperties.lineColor.value = getColor(nodeProperties.strokeColor.value);
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
function connectorPropertyChange(args) {
      if (diagram && diagram.selectedItems.connectors.length > 0) {
          var selectedNodes = diagram.selectedItems.connectors;
          for (var i = 0; i < selectedNodes.length; i++) {
              var connector = selectedNodes[i];
              switch (args.propertyName.toString().toLowerCase()) {
                  case 'linecolor':
                      connector.style.strokeColor = this.getColor(connectorProperties.lineColor.value);
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
 function toolbarTextStyleChange (args) {
  textPropertyChange(args.item.tooltipText, false);
};
 function toolbarTextSubAlignChange (args) {
  var propertyName = args.item.tooltipText.replace(/[' ']/g, '');
  textPropertyChange(propertyName, propertyName);
};
  function toolbarTextAlignChange(args) {
  var propertyName = args.item.tooltipText.replace('Align ', '');
  textPropertyChange(propertyName, propertyName);
};
function updateTextProperties (propertyName, annotation) {
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
function textPropertyChange (args) {
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
                              updateTextProperties(propertyName, annotation);
                          }
                      }
                      else if (node.shape && node.shape.type === 'Text') {
                          updateTextProperties(propertyName, node.style);
                      }
                  }
              }
              diagram.dataBind();
              this.isModified = true;
          }
      }
};

var nodes =[ 
    {
    id :'node1',
    // Position of the node
    offsetX: 370,
    offsetY: 210,
    // Size of the node
    width: 100,
    height: 60,
     shape: { type: 'Basic', shape: 'Rectangle' },
     
      },
      {
      id :'node2',
      // Position of the node
      offsetX: 533.5,
      offsetY: 210,
      // Size of the node
      width: 100,
      height: 60,
      shape: { type: 'Basic', shape: 'Rectangle' }
    },
  {
    id :'node3',
    //Position of the node
    offsetX: 640,
    offsetY: 220,
    //Size of the node
    width: 40,
    height: 80,
    shape: { type: 'Basic', shape: 'Rectangle' }
  },
  {
    id :'node4',
    offsetX: 730,
    offsetY: 200,
    // Size of the node
    width: 20,
    height: 40,
    shape: {type: 'Path', data: 'M540.3643,137.9336L546.7973,159.7016L570.3633,159.7296L550.7723,171.9366L558.9053,194.9966L540.3643,179.4996L521.8223,194.9966L529.9553,171.9366L510.3633,159.7296L533.9313,159.7016L540.3643,137.9336z' }
  },
  {
    id :'node5',
    // Position of the node
    offsetX: 820,
    offsetY: 210,
    // Size of the node
    width: 40,
    height: 70,
    shape: { type: 'Basic', shape: 'Ellipse' }
  },
  {
    id :'node6',
    // Position of the node
    offsetX: 850,
    offsetY: 274.8,
    // Size of the node
    width: 50,
    height: 50,
    shape: { type: 'Basic', shape: 'Ellipse' }
  },
  {
    id :'node7',
    // Position of the node
    offsetX: 855,
    offsetY: 349.2,
    // Size of the node
    width: 50,
    height: 20,
    shape: {type: 'Path', data: 'M540.3643,137.9336L546.7973,159.7016L570.3633,159.7296L550.7723,171.9366L558.9053,194.9966L540.3643,179.4996L521.8223,194.9966L529.9553,171.9366L510.3633,159.7296L533.9313,159.7016L540.3643,137.9336z' }
  },
  {
    id :'node8',
    // Position of the node
    offsetX: 850,
    offsetY: 426,
   // Size of the node
    width: 50,
    height: 50,
    shape: { type: 'Basic', shape: 'Rectangle' }
  },
  {
    id :'node9',
    // Position of the node
    offsetX: 760.1,
    offsetY: 359.8,
    // Size of the node
    width: 100,
    height: 50,
    shape: { type: 'Basic', shape: 'Rectangle' }
  },
  {
    id :'node10',
    // Position of the node
    offsetX: 680,
    offsetY: 426,
    // Size of the node
    width: 50,
    height: 50,
    shape: { type: 'Basic', shape: 'Rectangle' }
  },
  {
    id :'node11',
    // Position of the node
    offsetX: 773.1,
    offsetY: 534.8,
    // Size of the node
    width: 100,
    height: 20,
    shape: { type: 'Basic', shape: 'Rectangle' }
    },
  {
    id :'node12',
    // Position of the node
    offsetX: 550,
    offsetY: 270,
     // Size of the node
    width: 40,
    height: 20,
    shape: { type: 'Basic', shape: 'Rectangle' }
  },
  {
    id :'node13',
    // Position of the node
    offsetX: 550,
    offsetY: 300,
    // Size of the node
    width: 50,
    height: 20,
    shape: { type: 'Flow', shape: 'Terminator' }
  },
  {
    id :'node14',
   // Position of the node
   offsetX: 400,
   offsetY: 270,
   // Size of the node
   width: 40,
   height: 20,
   shape: { type: 'Basic', shape: 'Rectangle' }
  },
  {
    id :'node15',
    // Position of the node
    offsetX: 400,
    offsetY: 300,
    // Size of the node
    width: 50,
    height: 20,
    shape: { type: 'Flow', shape: 'Terminator' }
  },
  {
    id :'node16',
    // Position of the node
    offsetX: 560,
    offsetY: 340,
    // Size of the node
    width: 90,
    height: 30,
    shape: { type: 'Basic', shape: 'Rectangle' }
  },
  {
    id :'node32',
   // Position of the node
    offsetX: 785,
    offsetY: 273.5,
    // Size of the node
    width: 50,
    height: 50,
    // flip :'Horizontal',
    shape: { type: 'Path', data: 'M1 1H49V4.05882H1V1ZM49 4.05882C49 31.0829 27.5043 53 0.999999 53V4.05882' }
  },
  {
    id :'node33',
   // Position of the node
   offsetX: 486,
   offsetY: 298,
   // Size of the node
   width: 50,
   height: 50,
   flip : 'Vertical',
   shape: { type: 'Path', data:'M1 1H49V4.05882H1V1ZM49 4.05882C49 31.0829 27.5043 53 0.999999 53V4.05882'},
  },
  {
     id :'node17',
    // Position of the node
    offsetX: 643,
    offsetY: 298,
    // Size of the node
    width: 50,
    height: 50,
    flip : 'Vertical',
    shape: { type: 'Path', data:'M1 1H49V4.05882H1V1ZM49 4.05882C49 31.0829 27.5043 53 0.999999 53V4.05882'},
  },
  {
    id :'node18',
    // Position of the node
    offsetX: 323,
    offsetY: 298,
    // Size of the node
    width: 50,
    height: 50,
    flip : 'Vertical',
    shape: { type: 'Path', data:'M1 1H49V4.05882H1V1ZM49 4.05882C49 31.0829 27.5043 53 0.999999 53V4.05882'},
  },
  {
    id :'node19',
    // Position of the node
    offsetX: 250,
    offsetY: 360,
    // Size of the node
    width: 60,
    height:30,
    shape: { type: 'Basic', shape: 'Ellipse' }
  },
  {
    id :'node20',
    // Position of the node
    offsetX: 230,
    offsetY: 422,
    // Size of the node
    width:40,
    height: 20,
    shape: { type: 'Basic', shape: 'Rectangle' }
  },
  {
    id :'node21',
    // Position of the node
    offsetX: 400,
    offsetY: 422,
    // Size of the node
    width:80,
    height: 30,
    shape: { type: 'Basic', shape: 'Rectangle' }
    },
   {
      id :'node22',
      // Position of the node
      offsetX: 336,
      offsetY: 378,
      // Size of the node
      width: 50,
      height: 50,
      flip : 'Vertical',
      shape: { type: 'Path', data:'M1 1H49V4.05882H1V1ZM49 4.05882C49 31.0829 27.5043 53 0.999999 53V4.05882'},
      },                                 
    {
      id :'node23',
      // Position of the node
      offsetX:240,
      offsetY:515,
      // Size of the node
      width: 40,
      height: 20,
      shape: { type: 'Basic', shape: 'Rectangle' }
    },
    {
      id :'node24',
      // Position of the node
      offsetX: 240,
      offsetY: 540,
      // Size of the node
      width: 50,
      height: 20,
      shape: { type: 'Flow', shape: 'Terminator' }
    },
    {
      id :'node25',
      // Position of the node
      offsetX: 300,
      offsetY: 520,
      // Size of the node
      width: 50,
      height: 20,
      shape: {type: 'Path', data: 'M540.3643,137.9336L546.7973,159.7016L570.3633,159.7296L550.7723,171.9366L558.9053,194.9966L540.3643,179.4996L521.8223,194.9966L529.9553,171.9366L510.3633,159.7296L533.9313,159.7016L540.3643,137.9336z' }
    },
    {
      id :'node26',
    // Position of the node
      offsetX: 390,
      offsetY: 515,
    // Size of the node
      width: 100,
      height: 60,
      shape: { type: 'Basic', shape: 'Rectangle' }
    },
    {
      id :'node27',
    // Position of the node
      offsetX: 535,
      offsetY: 478,
    // Size of the node
      width: 100,
      height: 120,
      shape: { type: 'Basic', shape: 'Rectangle' }
    },
    {
      id :'node28',
      // Position of the node
      offsetX: 675,
      offsetY: 538,
      // Size of the node
      width: 50,
      height: 50,
      flip : 'Vertical',
      shape: { type: 'Path', data:'M1 1H49V4.05882H1V1ZM49 4.05882C49 31.0829 27.5043 53 0.999999 53V4.05882'},
      },
    {
      id :'node29',
      // Position of the node
      offsetX: 908,
      offsetY: 495,
      // Size of the node
      width: 50,
      height: 50,
      shape: { type: 'Path', data: 'M1 1H49V4.05882H1V1ZM49 4.05882C49 31.0829 27.5043 53 0.999999 53V4.05882' }
    },
    {
      id :'node30',
    // Position of the node
      offsetX: 952,
      offsetY: 357,
    // Size of the node
      width: 100,
      height: 50,
      shape: { type: 'Basic', shape: 'Rectangle' }
    },
    {
      id :'node31',
    // Position of the node
      offsetX: 1016,
      offsetY: 450,
    // Size of the node
      width: 60,
      height: 100,
      shape: { type: 'Basic', shape: 'Rectangle' }
    },
  ];
  var connectors = [{
    id: "connector1",
    style: {
    strokeWidth: 4
  },
    sourcePoint: {
        x: 280,
        y: 160
    },
    targetPoint: {
        x: 885,
        y: 160
    },
    targetDecorator: {
      shape: 'none',
    }
  },
  {
    id: "connector2",
    style: {
    strokeWidth: 4
  },
    sourcePoint: {
        x: 200,
        y: 320
    },
    targetPoint: {
        x: 300,
        y: 320
    },
    targetDecorator: {
      shape: 'none',
    }
  },
  {
    id: "connector3",
    style: {
    strokeWidth: 4
  },
    sourcePoint: {
        x: 350,
        y: 320
    },
    targetPoint: {
        x: 460,
        y: 320
    },
    targetDecorator: {
      shape: 'none',
    }
  },
  {
    id: "connector4",
    style: {
    strokeWidth: 4
  },
    sourcePoint: {
        x: 510,
        y: 320
    },
    targetPoint: {
        x: 620,
        y: 320
    },
    targetDecorator: {
      shape: 'none',
    }
  },
  {
    id: "connector5",
    style: {
    strokeWidth: 4
  },
    sourcePoint: {
        x: 670,
        y: 320
    },
    targetPoint: {
        x: 1060,
        y: 320
    },
    targetDecorator: {
      shape: 'none',
    }
  },
  {
    id: "connector6",
    style: {
    strokeWidth: 4
  },
    sourcePoint: {
        x: 200,
        y: 560
    },
    targetPoint: {
        x: 655,
        y: 560
    },
    targetDecorator: {
      shape: 'none',
    }
  },
  {
    id: "connector7",
    style: {
    strokeWidth: 4
  },
    sourcePoint: {
        x: 700,
        y: 560
    },
    targetPoint: {
        x: 1060,
        y: 560
    },
    targetDecorator: {
      shape: 'none',
    }
  },
  {
    id: "connector8",
    style: {
    strokeWidth: 4
  },
    sourcePoint: {
        x: 280,
        y: 160
    },
    targetPoint: {
        x: 280,
        y: 320
    },
    targetDecorator: {
      shape: 'none',
    }
  },
  {
    id: "connector9",
    style: {
    strokeWidth: 4
  },
    sourcePoint: {
        x: 440,
        y: 160
    },
    targetPoint: {
        x: 440,
        y: 320
    },
    targetDecorator: {
      shape: 'none',
    }
  },
  {
    id: "connector10",
    style: {
    strokeWidth: 4
  },
    sourcePoint: {
        x: 600,
        y: 160
    },
    targetPoint: {
        x: 600,
        y: 320
    },
    targetDecorator: {
      shape: 'none',
    }
  },
  {
    id: "connector11",
    style: {
    strokeWidth: 4
  },
    sourcePoint: {
        x: 760,
        y: 160
    },
    targetPoint: {
        x: 760,
        y: 250
    },
    targetDecorator: {
      shape: 'none',
    }
  },
  {
    id: "connector12",
    style: {
    strokeWidth: 4
  },
    sourcePoint: {
        x: 760,
        y: 300
    },
    targetPoint: {
        x: 760,
        y: 320
    },
    targetDecorator: {
      shape: 'none',
    }
  },
  {
    id: "connector13",
    style: {
    strokeWidth: 4
  },
    sourcePoint: {
        x: 885,
        y: 160
    },
    targetPoint: {
        x: 885,
        y: 470
    },
    targetDecorator: {
      shape: 'none',
    }
  },
  {
    id: "connector14",
    style: {
    strokeWidth: 4
  },
    sourcePoint: {
        x: 885,
        y: 520
    },
    targetPoint: {
        x: 885,
        y: 560
    },
    targetDecorator: {
      shape: 'none',
    }
  },
  {
    id: "connector15",
    style: {
    strokeWidth: 4
  },
    sourcePoint: {
        x: 200,
        y: 320
    },
    targetPoint: {
        x: 200,
        y: 560
    },
    targetDecorator: {
      shape: 'none',
    }
  },
  {
    id: "connector16",
    style: {
    strokeWidth: 4
  },
    sourcePoint: {
        x: 300,
        y: 320
    },
    targetPoint: {
        x: 300,
        y: 400
    },
    targetDecorator: {
      shape: 'none',
    }
  },
  {
    id: "connector17",
    style: {
    strokeWidth: 4
  },
    sourcePoint: {
        x: 260,
        y: 400
    },
    targetPoint: {
        x: 310,
        y: 400
    },
    targetDecorator: {
      shape: 'none',
    }
  },
  {
    id: "connector18",
    style: {
    strokeWidth: 4
  },
    sourcePoint: {
        x: 360,
        y: 400
    },
    targetPoint: {
        x: 460,
        y: 400
    },
    targetDecorator: {
      shape: 'none',
    }
  },
  {
    id: "connector19",
    style: {
    strokeWidth: 4
  },
    sourcePoint: {
        x: 460,
        y: 400
    },
    targetPoint: {
        x: 460,
        y: 560
    },
    targetDecorator: {
      shape: 'none',
    }
  },
  {
    id: "connector20",
    style: {
    strokeWidth: 4
  },
    sourcePoint: {
        x: 1060,
        y: 320
    },
    targetPoint: {
        x: 1060,
        y: 560
    },
    targetDecorator: {
      shape: 'none',
    }
  },
  ]
  // { text: 'Send To Back', iconCss: 'sf-icon-Sendback' }, { text: 'Bring To Front', iconCss: 'sf-icon-BringFront' },
  //           { text: 'Send Backward', iconCss: 'sf-icon-SendBackward' }, { text: 'Bring Forward', iconCss: 'sf-icon-BringForward' },
  //           { separator: true },
  //           {
  //               text: 'Align Objects', items: [
  //                   { text: 'Left', iconCss: 'sf-icon-AlignLeft' }, { text: 'Right', iconCss: 'sf-icon-AlignRight' },
  //                   { text: 'Center', iconCss: 'sf-icon-AlignHorizontally' }, { text: 'Top', iconCss: 'sf-icon-AilgnTop' },
  //                   { text: 'Bottom', iconCss: 'sf-icon-AlignBottom' }, { text: 'Middle', iconCss: 'sf-icon-AlignVertically' }
  //               ]
  //           },
  //           {
  //               text: 'Distribute Objects', items: [
  //                   { text: 'Horizontally', iconCss: 'sf-icon-DistributeHorizontal' },
  //                   { text: 'Vertically', iconCss: 'sf-icon-DistributeVertical' }
  //               ]
  //           },
  //           {
  //               text: 'Match Size', items: [
  //                   { text: 'Both Width and Height' }, { text: 'Width' }, { text: 'Height' }
  //               ]
  //           }, { separator: true },
  //           { text: 'Lock' }, { text: 'Unlock' }, { separator: true },
  //           { text: 'Group' }, { text: 'Ungroup' }
  var diagram = new ej.diagrams.Diagram({
    width: '100%',
    // height: '100%',
    // nodes : nodes, connectors: connectors,
    rulerSettings: {
        showRulers: true
    },
    snapSettings: {
        horizontalGridlines: {
            lineIntervals: [1, 9, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75],
            lineColor: '#EEEEEE'
        },
        verticalGridlines: {
            lineIntervals: [1, 9, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75],
            lineColor: '#EEEEEE'
        },
        constraints: (ej.diagrams.SnapConstraints.All & ~ej.diagrams.SnapConstraints.SnapToLines)
    },
    pageSettings: {
        background: { color: 'white' }, width: 816, height: 1056, multiplePage: true, margin: { left: 5, top: 5 },
        orientation: 'Landscape'
    },
    contextMenuSettings: {
        show: true,
        showCustomMenuOnly: false,
    },
    scrollSettings: { canAutoScroll: true, scrollLimit: 'Infinity', minZoom: 0.25, maxZoom: 30 },
    selectedItems: { constraints: ej.diagrams.SelectorConstraints.All & ~ej.diagrams.SelectorConstraints.ToolTip },
    getNodeDefaults: function (node, diagram) {
        if (node.style) {
            if (node.style.fill === 'transparent' && !node.children) {
                node.style.fill = 'white';
            }
        }
        var node1 = {
            style: { strokeWidth: 2 }
        };
        return node1;
    },
    getConnectorDefaults: function (connector, diagram) {
        var connector1 = {
            annotations: [
                { content: '', style: { fill: 'transparent' } }
            ],
            style: { strokeWidth: 2 },
            commandManager: getCommandSettings,
        };
        
        return connector1;
    },
    backgroundColor: 'transparent',
  selectionChange:selectionChange,
  positionChange:positionChange,
  sizeChange:sizeChange,
  rotateChange:rotationChange,
  dragEnter:dragEnter
});
diagram.appendTo('#diagram');
diagram.fitToPage({ mode: 'Page', region: 'Content', margin: { left: 0, top: 0, right: 0, bottom: 0 } });

//Menu Items
var getFileMenuItems =[
        { text : 'New', iconCss:'e-ddb-icons e-new'},
        { text : 'Open', iconCss:'sf-icon-InsertImage tb-icons'},
        { text : 'Save', iconCss:'sf-icon-Save'},
        { text : 'Export', iconCss:'sf-icon-Export',items:[{ text: 'JPG' }, { text: 'PNG' },
                                                           { text: 'BMP' }, { text: 'SVG' }]},
        { text : 'Print' ,iconCss:'sf-icon-Print'},
  ];
  var getEditMenuItems=[{ text : 'Undo', iconCss:'sf-icon-Undo'},
                           { text : 'Redo', iconCss:'sf-icon-Redo'},
                           { separator: true },
                           { text : 'Copy', iconCss:'sf-icon-Copy'},
                           { text : 'Cut', iconCss:'sf-icon-Cut'},
                           { text : 'Paste', iconCss:'sf-icon-Paste'},
                           { separator: true },
                           { text: 'Delete', iconCss: 'sf-icon-Delete'}
  ];
  var getInsertMenuItems=[
    { text: 'Insert Picture',tooltipText:'Insert Picture' ,iconCss:'sf-icon-InsertImage tb-icons'},
    { text: 'Insert Link', tooltipText:'Insert link',iconCss: 'sf-icon-InsertLink tb-icons'},
  ];
  var getDesignMenuItems=[
    { text: 'Orientation', items:[{ text : 'Landscape'},{text : 'Portrait'}]},
    { text: 'Page Size' , items:[
                              { text : 'Letter'},
                              {text : 'Tabloid'},
                              {text : 'Legal'},
                              {text : 'A3'},
                              {text : 'A4'},
                              {text : 'A5'},
                              {text : 'A6'}
                            
                            ]},
    { text: 'Background'},
  ]
  var getViewMenuItems = [
    { text: 'Show Rulers' },
    { text: 'Show Grid', iconCss: 'sf-icon-Selection' }, { separator: true },
    { text: 'Snap To Grid' },
    { text: 'Page Break'},{ separator: true },
    { text: 'Fit To Screen' }, { separator: true },
     { text: 'Show Guides', iconCss: 'sf-icon-Selection' }, 
];
var btnFileMenu = new ej.splitbuttons.DropDownButton({
  cssClass: 'db-dropdown-menu',
  items: getFileMenuItems,
  content: 'File',
  select: menuClick,
  // beforeItemRender: beforeItemRender,
  // beforeOpen: arrangeMenuBeforeOpen,
  // beforeClose: arrangeMenuBeforeClose
});
btnFileMenu.appendTo('#btnFileMenu');

var btnEditMenu=new ej.splitbuttons.DropDownButton({
  cssClass: 'db-dropdown-menu',
  items: getEditMenuItems,
  content: 'Edit',
  select: menuClick,
});
btnEditMenu.appendTo('#btnEditMenu');

var btnInsertMenu=new ej.splitbuttons.DropDownButton({
  cssClass: 'db-dropdown-menu',
  items: getInsertMenuItems,
  content: 'Insert',
  select: menuClick,
});
btnInsertMenu.appendTo('#btnInsertMenu');

// var btnDesignMenu=new ej.splitbuttons.DropDownButton({
//   cssClass: 'db-dropdown-menu',
//   items: getDesignMenuItems,
//   content: 'Design',
//   select: menuClick,
// });
// btnDesignMenu.appendTo('#btnDesignMenu');
var btnDesignMenu = new ej.splitbuttons.DropDownButton({
  cssClass: 'db-dropdown-menu',
  target: '.e-contextmenu-wrapper.designMenu',
  content: 'Design',
  beforeItemRender: beforeItemRender,
  beforeOpen: arrangeMenuBeforeOpen,
  beforeClose: arrangeMenuBeforeClose
});
btnDesignMenu.appendTo('#btnDesignMenu');
var btnViewMenu = new ej.splitbuttons.DropDownButton({
    cssClass: 'db-dropdown-menu',
    items: getViewMenuItems,
    content: 'View',
    select: menuClick,
});
btnViewMenu.appendTo('#btnViewMenu');

function menuClick(args) {
  // var buttonElement = document.getElementsByClassName('e-btn-hover')[0];
  // if (buttonElement) {
  //     buttonElement.classList.remove('e-btn-hover');
  // }
  var command  = args.item.text.replace(/[' ']/g, '').toLowerCase();
  switch(command){
    case 'new':
            diagram.clear();
            break;
    case 'save':
            download();
            break;
    case 'export':
          exportDialog.show();
    case 'open':
            document.getElementsByClassName('e-file-select-wrap')[0].querySelector('button').click();
            break;
    case 'jpg':
    case 'png':
    case 'bmp':
    case 'svg':
            exportDiagram(args);          
            break;
    case 'print':
            print() ;
            break;
    case 'undo':
            diagram.undo();
            break;
    case 'redo':
            diagram.redo();
            break;
    case 'cut':
            diagram.cut();
            break;
    case 'copy':
            diagram.copy();
            break;
    case 'paste':
            diagram.paste();
            break;
    case 'delete':
            diagram.remove();
            break;
    case 'insertpicture':

            break;
    case 'showguides':
            diagram.snapSettings.constraints = diagram.snapSettings.constraints ^ ej.diagrams.SnapConstraints.SnapToObject;
            args.item.iconCss = args.item.iconCss ? '' : 'sf-icon-Selection';
            break;
    case 'showgrid':
            diagram.snapSettings.constraints = diagram.snapSettings.constraints ^ ej.diagrams.SnapConstraints.ShowLines;
            args.item.iconCss = args.item.iconCss ? '' : 'sf-icon-Selection';
            break;
    case 'snaptogrid':
            diagram.snapSettings.constraints = diagram.snapSettings.constraints ^ ej.diagrams.SnapConstraints.SnapToLines;
            args.item.iconCss = args.item.iconCss ? '' : 'sf-icon-Selection';
            break;
    case 'fittoscreen':
            diagram.fitToPage({ mode: 'Page', region: 'Content', margin: { left: 0, top: 0, right: 0, bottom: 0 } });
            break;
    case 'fittowidth':
            diagram.fitToPage({ mode: 'Width', region: 'Content', margin: { left: 0, top: 0, right: 0, bottom: 0 } });
            break;
    case 'showrulers':
            diagram.rulerSettings.showRulers = !diagram.rulerSettings.showRulers;
            break;
    case 'pagebreak':
          args.item.iconCss = args.item.iconCss ? '' : 'sf-icon-Selection';
          if(args.item.iconCss){
            diagram.pageSettings.showPageBreaks = true;
          }
          else{
            diagram.pageSettings.showPageBreaks = false;
          }
    case 'portrait':
          diagram.pageSettings.orientation = 'Portrait';
          break;
    case 'landscape':
          diagram.pageSettings.orientation ='Landscape';
          break;
    case 'letter':
    case 'tabloid':
    case 'legal':
    case 'A4':
    case 'A3':
    case 'A5':
    case 'A6':
          paperListChange(args)
          break;
    case 'insertpicture':
        document.getElementsByClassName('e-file-select-wrap')[0].querySelector('button').click();
        break;
    case 'insertlink':
        toolbarInsertClick(args)
        break;
  }
}
function getShortCutKey(menuItem) {
  var shortCutKey = navigator.platform.indexOf('Mac') > -1 ? 'Cmd' : 'Ctrl';
  switch (menuItem) {
      case 'New':
          shortCutKey = 'Shift' + '+N';
          break;
      case 'Open':
          shortCutKey = shortCutKey + '+O';
          break;
      case 'Save':
          shortCutKey = shortCutKey + '+S';
          break;
      case 'Undo':
          shortCutKey = shortCutKey + '+Z';
          break;
      case 'Redo':
          shortCutKey = shortCutKey + '+Y';
          break;
      case 'Cut':
          shortCutKey = shortCutKey + '+X';
          break;
      case 'Copy':
          shortCutKey = shortCutKey + '+C';
          break;
      case 'Paste':
          shortCutKey = shortCutKey + '+V';
          break;
      case 'Delete':
          shortCutKey = 'Delete';
          break;
      case 'Duplicate':
          shortCutKey = shortCutKey + '+D';
          break;
      case 'Select All':
          shortCutKey = shortCutKey + '+A';
          break;
      case 'Zoom In':
          shortCutKey = shortCutKey + '++';
          break;
      case 'Zoom Out':
          shortCutKey = shortCutKey + '+-';
          break;
      case 'Group':
          shortCutKey = shortCutKey + '+G';
          break;
      case 'Ungroup':
          shortCutKey = shortCutKey + '+U';
          break;
      case 'Send To Back':
          shortCutKey = shortCutKey + '+Shift+B';
          break;
      case 'Bring To Front':
          shortCutKey = shortCutKey + '+Shift+F';
          break;
      default:
          shortCutKey = '';
          break;
  }
  return shortCutKey;
}
 function addCommonCommands (commands) {
  commands.push({
      gesture: { key: ej.diagrams.Keys.N, keyModifiers: ej.diagrams.KeyModifiers.Shift }, canExecute: this.canExecute,
      execute: diagram.clear(), name: 'New'
  });
  commands.push({
      gesture: { key: ej.diagrams.Keys.O, keyModifiers: ej.diagrams.KeyModifiers.Control }, canExecute: this.canExecute,
      execute: this.open, name: 'Open'
  });
  commands.push({
      gesture: { key: ej.diagrams.Keys.S, keyModifiers: ej.diagrams.KeyModifiers.Control }, canExecute: this.canExecute,
      execute: this.download.bind(this), name: 'Save'
  });
  // commands.push({
  //     gesture: { key: ej.diagrams.Keys.Plus, keyModifiers: ej.diagrams.KeyModifiers.Control }, canExecute: this.canExecute,
  //     execute: this.zoomIn.bind(this), name: 'ZoomIn'
  // });
  // commands.push({
  //     gesture: { key: ej.diagrams.Keys.Minus, keyModifiers: ej.diagrams.KeyModifiers.Control }, canExecute: this.canExecute,
  //     execute: this.zoomOut.bind(this), name: 'ZoomOut'
  // });
  return commands;
};
function getCommandSettings() {
  var commandManager = {
      commands: [
          {
              gesture: { key: Keys.B, keyModifiers: KeyModifiers.Control | KeyModifiers.Shift }, canExecute: this.canExecute,
              execute: diagram.sendToBack(), name: 'SendToBack'
          },
          {
              gesture: { key: Keys.F, keyModifiers: KeyModifiers.Control | KeyModifiers.Shift }, canExecute: this.canExecute,
              execute:diagram.bringToFront(), name: 'BringToFront'
          },
          {
              gesture: { key: Keys.G, keyModifiers: KeyModifiers.Control }, canExecute: this.canExecute,
              execute: diagram.group(), name: 'Group'
          },
          {
              gesture: { key: Keys.U, keyModifiers: KeyModifiers.Control }, canExecute: this.canExecute,
              execute: diagram.ungrou(), name: 'Ungroup'
          },
          {
              gesture: { key: Keys.X, keyModifiers: KeyModifiers.Control }, canExecute: this.canExecute,
              execute: diagram.cut(), name: 'cutObjects'
          },
          {
              gesture: { key: Keys.C, keyModifiers: KeyModifiers.Control }, canExecute: this.canExecute,
              execute: diagram.copy(), name: 'copyObjects'
          },
          {
              gesture: { key: Keys.V, keyModifiers: KeyModifiers.Control }, canExecute: this.canExecute,
              execute: diagram.paste(), name: 'pasteObjects'
          },
          {
              gesture: { key: Keys.Z, keyModifiers: KeyModifiers.Control }, canExecute: this.canExecute,
              execute: diagram.undo(), name: 'undo'
          },
          {
              gesture: { key: Keys.Y, keyModifiers: KeyModifiers.Control }, canExecute: this.canExecute,
              execute:diagram.redo(), name: 'redo'
          },
          {
              gesture: { key: Keys.Delete, keyModifiers: KeyModifiers.None }, canExecute: this.canExecute,
              execute: this.delete.bind(this), name: 'delete'
          },
          {
              gesture: { key: Keys.A, keyModifiers: KeyModifiers.Control }, canExecute: this.canExecute,
              execute: this.selectAll.bind(this), name: 'selectAll'
          }
      ]
  };
  commandManager.commands = addCommonCommands(commandManager.commands);
  return commandManager;
}
function canExecute() {
  return true;
}
var paperList = [
  { text: 'Letter (8.5 in x 11 in)', value: 'Letter' }, { text: 'Legal (8.5 in x 14 in)', value: 'Legal' },
  { text: 'Tabloid (279 mm x 432 mm)', value: 'Tabloid' }, { text: 'A3 (297 mm x 420 mm)', value: 'A3' },
  { text: 'A4 (210 mm x 297 mm)', value: 'A4' }, { text: 'A5 (148 mm x 210 mm)', value: 'A5' },
  { text: 'A6 (105 mm x 148 mm)', value: 'A6' }, { text: 'Custom', value: 'Custom' },
];

var pageSettingsList = new ej.dropdowns.DropDownList({
  dataSource:  paperList,
  change: function (args) { paperListChange(args) },
  fields: { text: 'text', value: 'value' },
  index: 0
});
pageSettingsList.appendTo('#pageSettingsList');

var pagePortrait = new ej.buttons.RadioButton({
  label: 'Portrait',
  name: 'pageSettings',
  checked: false,
  change: function (args) {pageOrientationChange(args); },
});
pagePortrait.appendTo('#pagePortrait');

var pageLandscape = new ej.buttons.RadioButton({
  label: 'Landscape',
  name: 'pageSettings',
  checked: true,
  change: function (args) {pageOrientationChange(args); },
});
pageLandscape.appendTo('#pageLandscape');

var pageBgColor = new ej.inputs.ColorPicker({
  mode: 'Palette',
  width: '100%',
  value: diagram.pageSettings.background.color,
  change: function (args) { pageBackgroundChange1(args); }
});
pageBgColor.appendTo('#pageBgColor');

var pageBgColorPickerBtn = new ej.buttons.Button({ iconCss: 'sf-icon-ColorPickers tb-icons' });
pageBgColorPickerBtn.appendTo('#pageBgColorPickerBtn');

var showPageBreaks = new ej.buttons.CheckBox({ label: 'Page Breaks', checked: diagram.pageSettings.pageBreaks, change: function (args) { pageBreaksChange(args); } });
showPageBreaks.appendTo('#showPageBreaks');

var nodeOffsetX = new ej.inputs.NumericTextBox({
  format: 'n0',
  change: function(args) {
      if(args.isInteracted) {
         nodeProperties.offsetX.value = args.value;
         nodePropertyChange({ propertyName: 'offsetX', propertyValue: args });
      }
  }
});
nodeOffsetX.appendTo('#nodeOffsetX');
nodeProperties.offsetX = nodeOffsetX;

var nodeOffsetY = new ej.inputs.NumericTextBox({
  format: 'n0',
  change: function(args) {
      if(args.isInteracted) {
        nodeProperties.offsetY.value = args.value;
        nodePropertyChange({ propertyName: 'offsetY', propertyValue: args });
      }
  }
});
nodeOffsetY.appendTo('#nodeOffsetY');
nodeProperties.offsetY = nodeOffsetY;

var nodeWidth = new ej.inputs.NumericTextBox({
  format: 'n0',
  min: 1,
  change: function(args) {
      if(args.isInteracted) {
        nodeProperties.width.value = args.value;
        nodePropertyChange({ propertyName: 'width', propertyValue: args });
      }
  }
});
nodeWidth.appendTo('#nodeWidth');
nodeProperties.width = nodeWidth;

var nodeHeight = new ej.inputs.NumericTextBox({
  format: 'n0',
  min: 1,
  change: function(args) {
      if(args.isInteracted) {
       nodeProperties.height.value = args.value;
       nodePropertyChange({ propertyName: 'height', propertyValue: args });
      }
  }
});
nodeHeight.appendTo('#nodeHeight');
nodeProperties.height = nodeHeight;

var aspectRatio = new ej.buttons.CheckBox({ label: 'Aspect Ratio',
change: function(args) {
  nodePropertyChange({propertyName: 'aspectRatio', propertyValue: args.checked});
 }
});
aspectRatio.appendTo('#aspectRatio');
nodeProperties.aspectRatio = aspectRatio;

var rotateIconBtn = new ej.buttons.Button({ iconCss: 'sf-icon-Rotate1 tb-icons' });
rotateIconBtn.appendTo('#rotateIconBtn');

var nodeRotateAngle = new ej.inputs.NumericTextBox({
  format: 'n0',
  change: function(args) {
      nodeProperties.rotateAngle.value = args.value;
      nodePropertyChange({ propertyName: 'rotateAngle', propertyValue: args });
  }
});
nodeRotateAngle.appendTo('#nodeRotateAngle');
nodeProperties.rotateAngle = nodeRotateAngle;

var toolbarNodeInsert = new ej.navigations.Toolbar({
  overflowMode: 'Scrollable',
  clicked: toolbarInsertClick,
  items: [
      { prefixIcon: 'sf-icon-InsertLink tb-icons', tooltipText: 'Insert Link', cssClass: 'tb-item-start' },
      { prefixIcon: 'sf-icon-InsertImage tb-icons', tooltipText: 'Insert Image', cssClass: 'tb-item-end' }
  ]
});
toolbarNodeInsert.appendTo('#toolbarNodeInsert');

var nodeFillColor = new ej.inputs.ColorPicker({
  mode: 'Palette',
  change: function(args) {
     nodePropertyChange({propertyName: 'fillColor', propertyValue: args.currentValue.hex});
  }
});
nodeFillColor.appendTo('#nodeFillColor');
nodeProperties.fillColor = nodeFillColor;

var fillColorIconBtn = new ej.buttons.Button({ iconCss: 'sf-icon-ColorPickers tb-icons' });
fillColorIconBtn.appendTo('#fillColorIconBtn');

var gradient = new ej.buttons.CheckBox({ label: 'Gradient',
change: function(args) {
  var gradientElement = document.getElementById('gradientStyle');
  if (args.checked) {
      gradientElement.className = 'row db-prop-row db-gradient-style-show';
  }
  else {
      gradientElement.className = 'row db-prop-row db-gradient-style-hide';
  }
  nodePropertyChange({ propertyName: 'gradient', propertyValue: args });
}
});
gradient.appendTo('#gradient');
nodeProperties.gradient = gradient;

var gradientDirections = [
  { text: 'BottomToTop', value: 'BottomToTop' }, { text: 'TopToBottom', value: 'TopToBottom' },
  { text: 'RightToLeft', value: 'RightToLeft' }, { text: 'LeftToRight', value: 'LeftToRight' }
];

var gradientDirectionDropdown = new ej.dropdowns.DropDownList({
  dataSource: gradientDirections,
  fields: { text: 'text', value: 'value' },
  popupWidth: '200px',
  index: 0,
  change: function(args) {
      nodeProperties.gradientDirection.value = args.itemData.text;
      nodePropertyChange({ propertyName: 'gradientDirection', propertyValue: args });
  }
});
gradientDirectionDropdown.appendTo('#gradientDirectionDropdown');
nodeProperties.gradientDirection = gradientDirectionDropdown;

var nodeGradientColor = new ej.inputs.ColorPicker({
  mode: 'Palette',
  change: function(args) {
      nodeProperties.gradientColor.value = args.currentValue.hex;
      nodePropertyChange({ propertyName: 'gradientColor', propertyValue: args });
  }
});
nodeGradientColor.appendTo('#nodeGradientColor');
nodeProperties.gradientColor = nodeGradientColor;

var gradientColorIconBtn = new ej.buttons.Button({ iconCss: 'sf-icon-ColorPickers tb-icons' });
gradientColorIconBtn.appendTo('#gradientColorIconBtn');

var nodeStrokeColor = new ej.inputs.ColorPicker({
  mode: 'Palette',
  change: function(args) {
      nodeProperties.strokeColor.value = args.currentValue.hex;
      nodePropertyChange({ propertyName: 'strokeColor', propertyValue: args });
  }
});
nodeStrokeColor.appendTo('#nodeStrokeColor');
nodeProperties.strokeColor = nodeStrokeColor;

var strokeColorIconBtn = new ej.buttons.Button({ iconCss: 'sf-icon-Pickers tb-icons' });
strokeColorIconBtn.appendTo('#strokeColorIconBtn');

var borderStyles = [
  { text: 'None', value: 'None', className: 'ddl-svg-style ddl_linestyle_none' },
  { text: '1,2', value: '1,2', className: 'ddl-svg-style ddl_linestyle_one_two' },
  { text: '3,3', value: '3,3', className: 'ddl-svg-style ddl_linestyle_three_three' },
  { text: '5,3', value: '5,3', className: 'ddl-svg-style ddl_linestyle_five_three' },
  { text: '4,4,1', value: '4,4,1', className: 'ddl-svg-style ddl_linestyle_four_four_one' }
];
var nodeBorderStyle = new ej.dropdowns.DropDownList({
  dataSource:borderStyles,
  fields: { text: 'text', value: 'value' },
  index: 0,
  popupWidth: '160px',
  itemTemplate: '<div class="db-ddl-template-style"><span class="${className}"></span></div>',
  valueTemplate: '<div class="db-ddl-template-style"><span class="${className}"></span></div>',
  change: function (args) {
      nodeProperties.strokeStyle.value= args.itemData.text;
      nodePropertyChange({ propertyName: 'strokeStyle', propertyValue: args });
  }
});
nodeBorderStyle.appendTo('#nodeBorderStyle');
nodeProperties.strokeStyle = nodeBorderStyle;

var nodeStrokeWidth = new ej.inputs.NumericTextBox({
   min: 0,
   step: 0.5,
   change: function (args) {
      nodeProperties.strokeWidth.value= args.value;
      nodePropertyChange({ propertyName: 'strokeWidth', propertyValue: args });
  }
});
nodeStrokeWidth.appendTo('#nodeStrokeWidth');
nodeProperties.strokeWidth = nodeStrokeWidth;

var nodeOpacitySlider = new ej.inputs.Slider({
   min: 0,
   max: 100,
   step: 10,
   type: 'MinRange',
   value: 0,
   change: function (args) {
      nodeProperties.opacity.value= args.value;
      nodePropertyChange({ propertyName: 'opacity', propertyValue: args });
  }
});
nodeOpacitySlider.appendTo('#nodeOpacitySlider');
nodeProperties.opacity =  nodeOpacitySlider;

var lineTypes = [
  { text: 'Straight', value: 'Straight' }, { text: 'Orthogonal', value: 'Orthogonal' },
  { text: 'Bezier', value: 'Bezier' }
];
var lineTypeDropdown = new ej.dropdowns.DropDownList({
  dataSource: lineTypes,
  fields: { text: 'text', value: 'value' },
  change: function(args) {
      connectorProperties.lineType.value = args.value;
      connectorPropertyChange({ propertyName: 'lineType', propertyValue: args });
  }
});
lineTypeDropdown.appendTo('#lineTypeDropdown');
connectorProperties.lineType = lineTypeDropdown;

var lineColor = new ej.inputs.ColorPicker({
  mode: 'Palette',
  change: function(args) {
     connectorProperties.lineColor.value = args.currentValue.hex;
      connectorPropertyChange({ propertyName: 'lineColor', propertyValue: args });
  }
});
lineColor.appendTo('#lineColor');
connectorProperties.lineColor = lineColor;

var lineColorIconBtn = new ej.buttons.Button({ iconCss: 'sf-icon-Pickers tb-icons' });
lineColorIconBtn.appendTo('#lineColorIconBtn');

var lineStyle = new ej.dropdowns.DropDownList({
  dataSource: borderStyles,
  fields: { text: 'text', value: 'value' },
  itemTemplate: '<div class="db-ddl-template-style"><span class="${className}"></span></div>',
  valueTemplate: '<div class="db-ddl-template-style"><span class="${className}"></span></div>',
  change: function(args) {
      connectorProperties.lineStyle.value = args.value;
      connectorPropertyChange({ propertyName: 'lineStyle', propertyValue: args });
  }
});
lineStyle.appendTo('#lineStyle');
connectorProperties.lineStyle =  lineStyle;

var lineWidth = new ej.inputs.NumericTextBox({
  min: 0.5,
  step: 0.5,
  change: function(args) {
      connectorProperties.lineWidth.value = args.value;
      connectorPropertyChange({ propertyName: 'lineWidth', propertyValue: args });
  }
});
lineWidth.appendTo('#lineWidth');
connectorProperties.lineWidth = lineWidth;

var decoratorList = [
  { text: 'None', value: 'None' },
  { text: 'Arrow', value: 'Arrow' },
  { text: 'Diamond', value: 'Diamond' },
  { text: 'OpenArrow', value: 'OpenArrow' },
  { text: 'Circle', value: 'Circle' },
  { text: 'Square', value: 'Square' },
  { text: 'Fletch', value: 'Fletch' },
  { text: 'OpenFetch', value: 'OpenFetch' },
  { text: 'IndentedArrow', value: 'IndentedArrow' },
  { text: 'OutdentedArrow', value: 'OutdentedArrow' },
  { text: 'DoubleArrow', value: 'DoubleArrow' }
];
var sourceType = new ej.dropdowns.DropDownList({
  dataSource: decoratorList,
  fields: { text: 'text', value: 'value' },
  change: function(args) {
      connectorProperties.sourceType.value = args.value;
      connectorPropertyChange({ propertyName: 'sourceType', propertyValue: args });
  }
});
sourceType.appendTo('#sourceType');
connectorProperties.sourceType = sourceType;

var sourceSize = new ej.inputs.NumericTextBox({
  min: 1,
  step: 1,
  change: function(args) {
      connectorProperties.sourceSize.value = args.value;
      connectorPropertyChange({ propertyName: 'sourceSize', propertyValue: args });
  }
});
sourceSize.appendTo('#sourceSize');
connectorProperties.sourceSize = sourceSize;


var targetType = new ej.dropdowns.DropDownList({
  dataSource:decoratorList,
  fields: { text: 'text', value: 'value' },
  change: function(args) {
      connectorProperties.targetType.value = args.value;
      connectorPropertyChange({ propertyName: 'targetType', propertyValue: args });
  }
});
targetType.appendTo('#targetType');
connectorProperties.targetType = targetType;

var targetSize = new ej.inputs.NumericTextBox({
  min: 1,
  step: 1,
  change: function(args) {
      connectorProperties.targetSize.value = args.value;
      connectorPropertyChange({ propertyName: 'targetSize', propertyValue: args });
  }
});
targetSize.appendTo('#targetSize');
connectorProperties.targetSize = targetSize;

var lineJump = new ej.buttons.CheckBox({ label: 'Bridging',
change: function(args) {
  if (args.checked) {
      document.getElementById('lineJumpSizeDiv').style.display = '';
  }
  else {
      document.getElementById('lineJumpSizeDiv').style.display = 'none';
  }
  connectorPropertyChange({propertyName: 'lineJump', propertyValue: args});
 }
});
lineJump.appendTo('#lineJump');
connectorProperties.lineJump = lineJump;

var lineJumpSize = new ej.inputs.NumericTextBox({
  min: 1,
  step: 1,
  change: function(args) {
      connectorProperties.lineJumpSize.value = args.value;
      connectorPropertyChange({propertyName: 'lineJumpSize', propertyValue: args});
   }
});
lineJumpSize.appendTo('#lineJumpSize');
connectorProperties.lineJumpSize = lineJumpSize;

 
var default1 = new ej.inputs.Slider({
  min: 0,
  max: 100,
  step: 10,
  type: 'MinRange',
  value: 0,
  change: function (args) {
      connectorProperties.opacity.value= args.value;
      connectorPropertyChange({ propertyName: 'opacity', propertyValue: args });
  }
});
default1.appendTo('#default1');
connectorProperties.opacity = default1;
//save the diagram object in json data.
function download(data) {
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
 function openUploadBox (isOpen, extensionType) {
  var defaultUpload = document.getElementById('defaultfileupload');
  defaultUpload = defaultUpload.ej2_instances[0];
  defaultUpload.clearAll();
  this.selectedItem.orgDataSettings.extensionType = defaultUpload.allowedExtensions = extensionType;
  defaultUpload.dataBind();
  this.isOpen = isOpen;
  document.getElementsByClassName('e-file-select-wrap')[0].children[0].click();
};
 function enableArrangeMenuItems (selectedItem) {
  var contextInstance = document.getElementById('arrangeContextMenu');
  var contextMenu = contextInstance.ej2_instances[0];
  var selectedItems = selectedItem.selectedDiagram.selectedItems.nodes;
  selectedItems = selectedItems.concat(selectedItem.selectedDiagram.selectedItems.connectors);
  for (var i = 0; i < contextMenu.items.length; i++) {
      contextMenu.enableItems([contextMenu.items[i].text], false);
  }
  if (selectedItem.diagramType === 'GeneralDiagram') {
      if (selectedItems.length > 1) {
          contextMenu.enableItems(['Align Objects', 'Distribute Objects', 'Match Size', 'Lock', 'Unlock', 'Group'], true);
      }
      else if (selectedItems.length === 1) {
          contextMenu.enableItems(['Send To Back', 'Bring To Front', 'Send Backward', 'Bring Forward']);
          var object = selectedItems[0];
          if (object instanceof ej.diagrams.Node) {
              if (object.children && object.children.length > 0) {
                  contextMenu.enableItems(['Ungroup']);
              }
              if (object.constraints & ej.diagrams.NodeConstraints.Drag) {
                  contextMenu.enableItems(['Lock'], true);
              }
              else {
                  contextMenu.enableItems(['Unlock'], true);
              }
          }
      }
  }
};
 function enableMenuItems (itemText, selectedItem) {
  var selectedDiagram = diagram.ej2_instances ? diagram.ej2_instances[0] : diagram;
  var selectedItems = selectedDiagram.selectedItems.nodes;
  selectedItems = selectedItems.concat(selectedDiagram.selectedItems.connectors);
  if (itemText) {
      var commandType = itemText.replace(/[' ']/g, '');
      if (selectedItems.length === 0 || selectedItem.diagramType !== 'GeneralDiagram') {
          switch (commandType.toLowerCase()) {
              case 'edittooltip':
                  var disable = false;
                  if (!(selectedItems.length === 1)) {
                      disable = true;
                  }
                  return disable;
              case 'cut':
                  return true;
              case 'copy':
                  return true;
              case 'delete':
                  return true;
              case 'duplicate':
                  return true;
          }
      }
      if (selectedItems.length > 1) {
          switch (commandType.toLowerCase()) {
              case 'edittooltip':
                  return true;
          }
      }
      if ( itemText === 'Paste') {
          return true;
      }
      if (itemText === 'Undo' && selectedItem.selectedDiagram.historyManager.undoStack.length === 0) {
          return true;
      }
      if (itemText === 'Redo' && selectedItem.selectedDiagram.historyManager.redoStack.length === 0) {
          return true;
      }
      if (itemText === 'Select All') {
          if (selectedItem.diagramType !== 'GeneralDiagram' || (selectedItem.selectedDiagram.nodes.length === 0 && selectedItem.selectedDiagram.connectors.length === 0)) {
              return true;
          }
      }
      // if (selectedItem.diagramType !== 'GeneralDiagram') {
      //     if (itemText === 'Themes' || itemgetShortCutKeyText === 'Paste' || itemText === 'Show Rulers' || itemText === 'Show Guides'
      //         || itemText === 'Show Grid' || itemText === 'Snap To Grid' || itemText === 'Show Stencil') {
      //         return true;
      //     }
      // }
  }
  return false;
};
function arrangeContextMenuBeforeOpen(args) {
  selectedItem.utilityMethods.enableArrangeMenuItems(selectedItem);
}

function beforeItemRender(args) {
  var shortCutText = getShortCutKey(args.item.text);
  if (shortCutText) {
      var shortCutSpan = document.createElement('span');
      var text = args.item.text;
      shortCutSpan.textContent = shortCutText;
      shortCutSpan.style.pointerEvents = 'none';
      args.element.appendChild(shortCutSpan);
      shortCutSpan.setAttribute('class', 'db-shortcut');
  }
  var status = enableMenuItems(args.item.text, selectedItem);
  if (status) {
      args.element.classList.add('e-disabled');
  } else {
      if (args.element.classList.contains('e-disabled')) {
          args.element.classList.remove('e-disabled');
      }
  }
}
function arrangeMenuBeforeOpen(args) {
  for (var i = 0; i < args.element.children.length; i++) {
      args.element.children[i].style.display = 'block';
  }
  //(args.element.children[0]).style.display = 'block';
  if (args.event && ej.base.closest(args.event.target, '.e-dropdown-btn') !== null) {
      args.cancel = true;
  }
}

function arrangeMenuBeforeClose (args) {
  if (args.event && ej.base.closest(args.event.target, '.e-dropdown-btn') !== null) {
      args.cancel = true;
  }
  if (!args.element) {
      args.cancel = true;
  }
}
function arrangeContextMenuOpen (args) {
  if (args.element.classList.contains('e-menu-parent')) {
      var popup = document.querySelector('#btnArrangeMenu-popup');
      args.element.style.left = ej.base.formatUnit(parseInt(args.element.style.left, 10) - parseInt(popup.style.left, 10));
      args.element.style.top = ej.base.formatUnit(parseInt(args.element.style.top, 10) - parseInt(popup.style.top, 10));
  }
}
//Export the diagraming object based on the format.
function exportDiagram(args) {
  var exportOptions = {};
  exportOptions.format = args.item.text;
  exportOptions.mode = 'Download';
  exportOptions.region = 'PageSettings';
  // exportOptions.multiplePage = checkBoxObj.checked;
  exportOptions.fileName = 'Export';
  exportOptions.margin = { left: 0, top: 0, bottom: 0, right: 0 };
  diagram.exportDiagram(exportOptions);
}
//click event to perform printing the diagraming objects.
function print(args) {
  
  var printOptions = {};
  printOptions.mode = 'Data';
  printOptions.region = 'PageSettings';
  // printOptions.multiplePage = checkBoxObj.checked;
  printOptions.margin = { left: 0, top: 0, bottom: 0, right: 0 };
  diagram.print(printOptions);

}
function paperListChange (args) {
  document.getElementById('pageDimension').style.display ='none';
  document.getElementById('pageOrientation').style.display ='';
  var value = args.value;
  var paperSize = getPaperSize(value);
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
      diagram.dataBind();
    }
  else{
    document.getElementById('pageDimension').style.display ='none';
    document.getElementById('pageOrientation').style.display ='';  
  }
};
var PaperSize = (function () {
function PaperSize() {
}
return PaperSize;
}());
function getPaperSize(args)
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
 function pageOrientationChange(args) {
  if (args.event) {
      var target = args.event.target;
      
      switch (target.id) {
          case 'pagePortrait':
              diagram.pageSettings.isPortrait = true;
              diagram.pageSettings.isLandscape = false;
              diagram.pageSettings.orientation = 'Portrait';
              break;
          case 'pageLandscape':
              diagram.pageSettings.isPortrait = false;
              diagram.pageSettings.isLandscape = true;
              diagram.pageSettings.orientation = 'Landscape';
              break;
      }
      diagram.dataBind();
      diagram.pageSettings.pageWidth = diagram.pageSettings.width;
      diagram.pageSettings.pageHeight = diagram.pageSettings.height;
  }
};
 function pageBackgroundChange1 (args) {
  if (args.currentValue) {
      // let target: HTMLInputElement = args.target as HTMLInputElement;
      diagram.pageSettings.background = {
          color: args.currentValue.rgba
      };
      diagram.dataBind();
  }
}
pageBreaksChange = function (args) {
  if (args.event) {
      diagram.pageSettings.pageBreaks = args.checked;
      diagram.pageSettings.showPageBreaks = args.checked;
  }
}; 
function applyNodeStyle (propertyName, node, value) {
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
 function getColor (colorName) {
  if (window.navigator.msSaveBlob && colorName.length === 9) {
      return colorName.substring(0, 7);
  }
  return colorName;
};

  var exportItems = [{ text :'PNG'} , {text : 'SVG'}, { text: 'BMP'} , { text : 'JPG'}]
  var btnObj = new ej.splitbuttons.DropDownButton({
    items: exportItems, iconCss: 'sf-icon-Export', select: exportDiagram,
  });
  var flipItems = [
    { tooltipText : 'Horizontal Flip', text:'Flip Horizontal'},
    { tooltipText : 'Vertical Flip',text:'Flip Vertical'}
   ]
 var flipbtn = new ej.splitbuttons.DropDownButton({
   items: flipItems ,select:toolbarEditorClick,content:'Flip'
 });
 var groupItems=[
  { iconCss: 'sf-icon-Group tb-icons', tooltipText: 'Group',text: 'Group' },
  { iconCss: 'sf-icon-Ungroup tb-icons', tooltipText: 'Ungroup', text: 'Ungroup'}
]
var grpbtn = new ej.splitbuttons.DropDownButton({
 items: groupItems,iconCss: 'sf-icon-Group tb-icons',select:toolbarEditorClick,
});
var forwardbackwarditems=[
  { iconCss: 'sf-icon-BringForward', tooltipText: 'Bring Forward',text:'Bring Forward' },
  { iconCss: 'sf-icon-SendBackward', tooltipText: 'Send Backward' ,text:'Send Backward'},
  { iconCss: 'sf-icon-BringFront', tooltipText: 'Bring To Front',text:'Bring To Front' },
  { iconCss: 'sf-icon-Sendback', tooltipText: 'Send To Back' ,text:'Send To Back'}
 
]
var forwardbackward = new ej.splitbuttons.DropDownButton({
  items: forwardbackwarditems , iconCss: 'sf-icon-Order',select:toolbarEditorClick
 })
 var connectortypes =[
  { tooltipText: 'Straight', text: 'Straight',iconCss:'sf-icon-StraightLine' },
  { tooltipText: 'Orthogonal', text: 'Orthogonal' ,iconCss:'sf-icon-ConnectorMode'},
  { tooltipText: 'Bezier', text: 'Bezier',iconCss:'sf-icon-BeizerLine' },
]
var connectortype = new ej.splitbuttons.DropDownButton({
  items: connectortypes,iconCss: 'sf-icon-ConnectorMode',select:toolbarEditorClick
 })
 var btnHideToolbar = new ej.buttons.Button({ iconCss: 'sf-icon-Collapse tb-icons' });
 btnHideToolbar.appendTo('#btnHideToolbar'); 

 var uploadObj = new ej.inputs.Uploader({
  asyncSettings: {
      saveUrl: 'https://aspnetmvc.syncfusion.com/services/api/uploadbox/Save',
      removeUrl: 'https://aspnetmvc.syncfusion.com/services/api/uploadbox/Remove'
  },
  success: onUploadSuccess,
  showFileList:false
});
uploadObj.appendTo('#fileupload');
function onUploadSuccess(args) {
  var file1 = args.file;
  var file = file1.rawFile;
  var reader = new FileReader();
  reader.readAsText(file);
  reader.onloadend = loadDiagram;
}
//Load the diagraming object.
function loadDiagram(event) {
  diagram.loadDiagram(event.target.result);
}

function selectionChange(args){
  if(args.newValue.length>0 && args.newValue[0] instanceof ej.diagrams.Node){
    var showTextPanel = checkTextAnnotation();
    if(diagram.selectedItems.nodes.length>0){
      bindNodeProperties(args.newValue[0]);
    }
    
    document.getElementById("diagramPropertyContainer").style.display ='none'
    document.getElementById("nodePropertyContainer").style.display ='block'
    document.getElementById('textPropertyContainer').style.display = 'none';
    document.getElementById("connectorPropertyContainer").style.display ="none"
    if(showTextPanel){
      document.getElementById('textPropertyContainer').style.display = 'block';
      bindTextProperties(args.newValue[0]);
      }
    // var node = diagram.selectedItems.nodes;
    // if(node.annotations>0){
    //   if(annotations.length>0){
    //     document.getElementById("diagramPropertyContainer").style.display ='none'
    //     document.getElementById("nodePropertyContainer").style.display ='block'
    //     document.getElementById('textPropertyContainer').style.display = 'block';
    //     document.getElementById("connectorPropertyContainer").style.display ="none"
    //   }
    // }
  }
  else if(args.newValue.length>0 && args.newValue[0] instanceof ej.diagrams.Connector){
    var showTextPanel = checkTextAnnotation();
    document.getElementById('diagramPropertyContainer').style.display = 'none';
    document.getElementById('nodePropertyContainer').style.display = 'none';
    document.getElementById('textPropertyContainer').style.display = 'none';
    document.getElementById('connectorPropertyContainer').style.display = 'block';
    bindConnectorProperties(args.newValue[0]);
    if(showConTextPanel){
      document.getElementById('textPropertyContainer').style.display = 'block';
      bindTextProperties(args.newValue[0])
      }
  }
  else{
    document.getElementById('nodePropertyContainer').style.display = 'none';
    document.getElementById('connectorPropertyContainer').style.display = 'none';
    document.getElementById('textPropertyContainer').style.display = 'none';
    document.getElementById('diagramPropertyContainer').style.display = 'block';
}
  
}
function checkTextAnnotation(){
  var objects = diagram.selectedItems.nodes.concat(diagram.selectedItems.connectors);
  var showPanel = false;
  for (i=0;i<objects.length;i++){
    if(objects[i].annotations.length){
      for (j=0;i<objects[i].annotations.length ;j++){
        if(objects[i].annotations[j]){
          showPanel = true;
        }
      }
    }
  }
  return showPanel;
}
function positionChange(args){
  if(diagram.selectedItems.nodes.concat(diagram.selectedItems.connectors).length===1){
    nodeProperties.offsetX.value = args.newValue.offsetX;
    nodeProperties.offsetY.value = args.newValue.offsetY;
    }
}
function sizeChange(args){
  if(diagram.selectedItems.nodes.concat(diagram.selectedItems.connectors).length===1){
    nodeProperties.offsetX.value = args.newValue.offsetX;
    nodeProperties.offsetY.value = args.newValue.offsetY;
    nodeProperties.width.value = args.newValue.width;
    nodeProperties.height.value = args.newValue.height;
    
    }
}
function rotationChange(args){
  if(diagram.selectedItems.nodes.concat(diagram.selectedItems.connectors).length===1){
    nodeProperties.rotateAngle.value = args.newValue.rotateAngle;
    
    }
}
 function dragEnter (args) {
  var obj = args.element;
  var ratio = 100 / obj.width;
  obj.width = 100;
  obj.height *= ratio;
};
  var hyperlinkDialog = new ej.popups.Dialog({
    width: '400px',
    header: 'Insert Link',
    target: document.body,
    isModal:true,
    animationSettings: { effect: 'None' },
    showCloseIcon: true,
    visible: false,
    buttons: getDialogButtons('hyperlink'),
    content: '<div id="hyperlinkDialogContent"><div class="row"><div class="row">Enter URL</div><div class="row db-dialog-child-prop-row"><input type="text" id="hyperlink">' +
    '</div></div><div class="row db-dialog-prop-row"><div class="row">Link Text (Optional)</div><div class="row db-dialog-child-prop-row"><input type="text" id="hyperlinkText"></div></div></div>'
  });
  hyperlinkDialog.appendTo('#hyperlinkDialog');
  
  var exportDialog = new ej.popups.Dialog({
    width: '400px',
    header: 'Export Diagram',
    target: document.body,
    isModal: true,
    animationSettings: { effect: 'None' },
    buttons: getDialogButtons('export'),
    visible: false,
    showCloseIcon: true,
    content: '<div id="exportDialogContent"><div class="row"><div class="row"> File Name </div> <div class="row db-dialog-child-prop-row">' +
     '<input type="text" id="exportfileName" value = "Untitled Diagram"></div></div>' +
     '<div class="row db-dialog-prop-row"> <div class="col-xs-6 db-col-left"> <div class="row"> Format </div>' +
     '<div class="row db-dialog-child-prop-row"> <input type="text" id="exportFormat"/> </div> </div>' +
     '<div class="col-xs-6 db-col-right"> <div class="row"> Region </div> <div class="row db-dialog-child-prop-row">' +
     '<input type="text" id="exportRegion"/></div></div></div></div>'
});
exportDialog.appendTo('#exportDialog');
  
var fileFormats = [
  { text: 'JPG', value: 'JPG' }, { text: 'PNG', value: 'PNG' },
  { text: 'BMP', value: 'BMP' }, { text: 'SVG', value: 'SVG' }
];
// dropdown template for exportDialog control
  var exportFormat = new ej.dropdowns.DropDownList({
    dataSource: fileFormats,
    fields: { text: 'text', value: 'value' },
    value: exportSettings.format
});
exportFormat.appendTo('#exportFormat');

var diagramRegions = [
  { text: 'Content', value: 'Content' }, { text: 'PageSettings', value: 'PageSettings' }
];
  // dropdown template for exportDialog control
var exportRegion = new ej.dropdowns.DropDownList({
    dataSource: diagramRegions,
    fields: { text: 'text', value: 'value' },
    value: exportSettings.region
});
exportRegion.appendTo('#exportRegion');

var fontFamilyList = [
  { text: 'Arial', value: 'Arial' },
  { text: 'Aharoni', value: 'Aharoni' },
  { text: 'Bell MT', value: 'Bell MT' },
  { text: 'Fantasy', value: 'Fantasy' },
  { text: 'Times New Roman', value: 'Times New Roman' },
  { text: 'Segoe UI', value: 'Segoe UI' },
  { text: 'Verdana', value: 'Verdana' },
];
var fontFamily = new ej.dropdowns.DropDownList({
  dataSource: fontFamilyList,
  height: '34px',
  fields: { text: 'text', value: 'value' },
  change: function (args) {
      textProperties.fontFamily.value = args.value;
      textPropertyChange({propertyName: 'fontFamily', propertyValue: args});
  }
});
fontFamily.appendTo('#fontFamily');
textProperties.fontFamily = fontFamily;

var fontSizeTextProperties = new ej.inputs.NumericTextBox({
  min: 1,
  step: 1,
  change: function (args) {
      textProperties.fontSize.value = args.value;
     textPropertyChange({propertyName: 'fontSize', propertyValue: args});
  }
});
fontSizeTextProperties.appendTo('#fontSizeTextProperties');
textProperties.fontSize = fontSizeTextProperties;

var textPosition = [
  { text: 'TopLeft', value: 'TopLeft' }, { text: 'TopCenter', value: 'TopCenter' },
  { text: 'TopRight', value: 'TopRight' }, { text: 'MiddleLeft', value: 'MiddleLeft' },
  { text: 'Center', value: 'Center' }, { text: 'MiddleRight', value: 'MiddleRight' },
  { text: 'BottomLeft', value: 'BottomLeft' }, { text: 'BottomCenter', value: 'BottomCenter' },
  { text: 'BottomRight', value: 'BottomRight' },
];
var ddlTextPosition = new ej.dropdowns.DropDownList({
  dataSource: textPosition,
  fields: { text: 'text', value: 'value' },
  index: 4,
  change: function (args) { textPositionChange(args); }
});
ddlTextPosition.appendTo('#ddlTextPosition');

var textColor = new ej.inputs.ColorPicker({
  mode: 'Palette',
  change: function (args) {
      textProperties.fontColor.value = args.currentValue.hex;
      textPropertyChange({propertyName: 'fontColor', propertyValue: args});
  }
});
textColor.appendTo('#textColor');
textProperties.fontColor = textColor;

var fontColorBtn = new ej.buttons.Button({ iconCss: 'sf-icon-ColorPickers tb-icons' });
fontColorBtn.appendTo('#fontColorBtn');

var toolbarTextStyle = new ej.navigations.Toolbar({
  overflowMode: 'Scrollable',
  clicked: function (args) { toolbarTextStyleChange(args); },
  items: [
      { prefixIcon: 'sf-icon-Bold tb-icons', tooltipText: 'Bold', cssClass: 'tb-item-start' },
      { prefixIcon: 'sf-icon-Italic tb-icons', tooltipText: 'Italic', cssClass: 'tb-item-middle' },
      { prefixIcon: 'sf-icon-Underline tb-icons', tooltipText: 'Underline', cssClass: 'tb-item-end' }
  ]
});
toolbarTextStyle.appendTo('#toolbarTextStyle');

var toolbarTextSubAlignment = new ej.navigations.Toolbar({
  overflowMode: 'Scrollable',
  clicked:  function (args) { toolbarTextSubAlignChange(args); },
  items: [
      { prefixIcon: 'sf-icon-ParaAlignLeft tb-icons', tooltipText: 'Align Text Left', cssClass: 'tb-item-start' },
      { prefixIcon: 'sf-icon-ParaAlignCenter tb-icons', tooltipText: 'Align Text Center', cssClass: 'tb-item-middle' },
      { prefixIcon: 'sf-icon-ParaAlignRight tb-icons', tooltipText: 'Align Text Right', cssClass: 'tb-item-end' }
  ]
});
toolbarTextSubAlignment.appendTo('#toolbarTextSubAlignment');

var toolbarTextAlignment = new ej.navigations.Toolbar({
  overflowMode: 'Scrollable',
  clicked: function (args) { toolbarTextAlignChange(args); },
  items: [
      { prefixIcon: 'sf-icon-TextLeft tb-icons', tooltipText: 'Align Right', cssClass: 'tb-item-start' },
      { prefixIcon: 'sf-icon-TextVerticalCenter tb-icons', tooltipText: 'Align Center', cssClass: 'tb-item-middle' },
      { prefixIcon: 'sf-icon-TextRight tb-icons', tooltipText: 'Align Left', cssClass: 'tb-item-middle' },
      { prefixIcon: 'sf-icon-TextTop tb-icons', tooltipText: 'Align Bottom', cssClass: 'tb-item-middle' },
      { prefixIcon: 'sf-icon-TextHorizontalCenter tb-icons', tooltipText: 'Align Middle', cssClass: 'tb-item-middle' },
      { prefixIcon: 'sf-icon-TextBottom tb-icons', tooltipText: 'Align Top', cssClass: 'tb-item-end' }
  ]
});
toolbarTextAlignment.appendTo('#toolbarTextAlignment');

var opacityTextSlider = new ej.inputs.Slider({
  min: 0,
  max: 100,
  step: 10,
  type: 'MinRange',
  value: 0,
  change: function (args) {
      textProperties.opacity.value= args.value;
      textPropertyChange({ propertyName: 'opacity', propertyValue: args });
  }
});
opacityTextSlider.appendTo('#opacityTextSlider');
textProperties.opacity = opacityTextSlider;

 function textPositionChange (args) {
  if (args.value !== null) {
      this.textPropertyChange('textPosition', args.value);
  }
};
function toolbarInsertClick(args) {
  var commandType = args.item.tooltipText.replace(/[' ']/g, '').toLowerCase();
  if (diagram.selectedItems.nodes.length > 0) {
      switch (commandType.toLowerCase()) {
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

function getDialogButtons(dialogType) {
  var buttons= [];
  switch (dialogType) {
      case 'export':
          buttons.push({
              click: btnExportClick.bind(this), buttonModel: { content: 'Export', cssClass: 'e-flat e-db-primary', isPrimary: true }
          });
          break;
      case 'hyperlink':
          buttons.push({
              click: btnHyperLink.bind(this),
              buttonModel: { content: 'Apply', cssClass: 'e-flat e-db-primary', isPrimary: true }
          });
          break;
  }
  buttons.push({
      click: btnCancelClick.bind(this),
      buttonModel: { content: 'Cancel', cssClass: 'e-flat', isPrimary: true }
  });
  return buttons;
}
function btnHyperLink() {
  var node = diagram.selectedItems.nodes[0];
  if (node.annotations.length > 0) {
      node.annotations[0].hyperlink.link = document.getElementById('hyperlink').value;
      node.annotations[0].hyperlink.content = document.getElementById('hyperlinkText').value;
      applyToolTipforHyperlink(node);
      diagram.dataBind();
  } else {
      var annotation = {
          hyperlink: {
              content: document.getElementById('hyperlinkText').value,
              link: document.getElementById('hyperlink').value
          }
      };
      diagram.addLabels(node, [annotation]);
      applyToolTipforHyperlink(node);
      diagram.dataBind();
  }
  hyperlinkDialog.hide();
}

function applyToolTipforHyperlink(node) {
  node.constraints = ej.diagrams.NodeConstraints.Default & ~ej.diagrams.NodeConstraints.InheritTooltip | ej.diagrams.NodeConstraints.Tooltip;
  node.tooltip = {
      content: node.annotations[0].hyperlink.link, relativeMode: 'Object',
      position: 'TopCenter', showTipPointer: true,
  };
}
function btnExportClick() {
  
    diagram.exportDiagram({
        fileName: document.getElementById("exportfileName").value,
        format:exportSettings.format,
        region: exportSettings.region
    });
    exportDialog.hide();
}
function btnCancelClick(args) {
  var ss = args.target;
  var key = ss.offsetParent.id;
  switch (key) {
      case 'exportDialog':
          exportDialog.hide();
          break;
      case 'hyperlinkDialog':
          this.hyperlinkDialog.hide();
          break;
    
  }
}

///Toolbar functionalities
var toolbarEditor = new ej.navigations.Toolbar({
    overflowMode: 'Scrollable',
    clicked: toolbarEditorClick,
    items: [
        {
            prefixIcon: 'sf-icon-Save', tooltipText: 'Save As'
        },
        {
            prefixIcon: 'e-ddb-icons e-open', tooltipText: 'Open' 
        },
        {
            prefixIcon: 'sf-icon-Print', tooltipText: 'Print' },
        {
            type: 'Input',prefixIcon:'sf-icon-Export', template: '<button id="custombtn" style="width:100%;"></button>'},
        {
            type: 'Separator'
        },
        {
            prefixIcon: 'sf-icon-Cut', tooltipText: 'Cut' },
        {
            prefixIcon: 'sf-icon-Copy', tooltipText: 'Copy' },
        {
            prefixIcon: 'sf-icon-Paste', tooltipText: 'Paste' },
        {
            type: 'Separator' },
        {
            prefixIcon: 'sf-icon-Undo tb-icons', tooltipText: 'Undo'},
        {
            prefixIcon: 'sf-icon-Redo tb-icons', tooltipText: 'Redo'},
        {
            type: 'Separator'
        },
        {
          prefixIcon: 'sf-icon-ZoomOut tb-icons', tooltipText: 'Zoom Out(Ctrl + -)', cssClass: 'tb-item-start'
        },
        {
          cssClass: 'tb-item-end tb-zoom-dropdown-btn', template: '<button id="btnZoomIncrement"></button>'
        },
        {
          prefixIcon: 'sf-icon-ZoomIn tb-icons', tooltipText: 'Zoom In(Ctrl + +)', cssClass: 'tb-item-end'
        },
        {
            type: 'Separator'
        },
        {
          text:'Connect Tool', template: '<button id="connectortype"></button>' },
        {
            prefixIcon: 'sf-icon-Pan tb-icons', tooltipText: 'Pan Tool', cssClass: 'tb-item-start'
        },
        {
            prefixIcon: 'sf-icon-Selector tb-icons', tooltipText: 'Select Tool', cssClass: 'tb-item-middle tb-item-selected'
        },
        {
            prefixIcon: 'sf-icon-TextInput tb-icons', tooltipText: 'Text Tool', cssClass: 'tb-item-end tb-custom-diagram-disable'
        },
        {
            type: 'Separator'
        },
        {
          prefixIcon: 'sf-icon-Lock tb-icons', tooltipText: 'Lock', 
        },
        {
          prefixIcon: 'sf-icon-Delete tb-icons', tooltipText: 'Delete',
        },
        {
        type: 'Separator'
        },
        // {
        //     prefixIcon: 'sf-icon-ColorPickers tb-icons', mode: 'Palette', tooltipText: 'Fill Color'},
        // {
        //     prefixIcon: 'sf-icon-Pickers tb-icons', mode: 'Palette', tooltipText: 'Border Color',
        // },
        // {
        //     type: 'Separator'
        // },
        {
         template: '<button id="flipbtn" style="width:100%;"></button>' },
        {
          type: 'Separator' },
        {
          text:'Group',template: '<button id="grpbtn" style="width:100%;"></button>' },
        {
          type: 'Separator'
        },
        {
          template: '<button id="forwardbackward" style="width:100%;"></button>'},
    ]
});
toolbarEditor.appendTo('#toolbarEditor');
btnObj.appendTo('#custombtn');
flipbtn.appendTo('#flipbtn');
grpbtn.appendTo('#grpbtn');
forwardbackward.appendTo('#forwardbackward');
connectortype.appendTo('#connectortype');
var zoomMenuItems = [
  { text: '400%' }, { text: '300%' }, { text: '200%' }, { text: '150%' },
  { text: '100%' }, { text: '75%' }, { text: '50%' }, { text: '25%' }, { separator: true },
  { text: 'Fit To Screen' }
 
];
var btnZoomIncrement = new ej.splitbuttons.DropDownButton({ items:zoomMenuItems, content:Math.round(diagram.scrollSettings.currentZoom*100)+'%',select: zoomChange });
btnZoomIncrement.appendTo('#btnZoomIncrement');
function toolbarEditorClick(args) {
  var commandType = args.item.tooltipText.replace(/[' ']/g, '').toLowerCase();
    switch (commandType) {
        case 'undo':
            diagram.undo();
            break;
        case 'redo':
            diagram.redo();
            break;
        case 'open':
            document.getElementsByClassName('e-file-select-wrap')[0].querySelector('button').click();
            break;
        case 'zoomin(ctrl++)':
            diagram.zoomTo({ type: 'ZoomIn', zoomFactor: 0.2 });
            zoomCurrentValue.content = diagram.scrollSettings.currentZoom = (diagram.scrollSettings.currentZoom * 100).toFixed() + '%';
            break;
        case 'zoomout(ctrl+-)':
            diagram.zoomTo({ type: 'ZoomOut', zoomFactor: 0.2 });
            zoomCurrentValue.content = diagram.scrollSettings.currentZoom = (diagram.scrollSettings.currentZoom * 100).toFixed() + '%';
            break;
        case 'cut':
            diagram.cut();
            break;
        case 'copy':
            diagram.copy();
            break;
        case 'paste':
            diagram.paste();
            break;
        case 'print':
            print() ;
            break;
        case 'save':
            download();
            break;
        case 'fillcolor':
            showColorPicker('nodeFillColor', 'tb-item-fill');
            break;
        case 'bordercolor':
              if (diagram.selectedItems.nodes.length > 0) {
                  showColorPicker('nodeStrokeColor', 'tb-item-stroke');
              } else {
                  showColorPicker('lineColor', 'tb-item-stroke');
              }
              break;
        case 'bringtofront':
          diagram.bringToFront();
            break;
        case 'sendtoback':
            diagram.sendToBack();
            break;
        case 'sendbackward':
            diagram.sendBackward();
            break;
        case 'bringforward':
            diagram.moveForward();
            break;
        case 'pantool':
            diagram.tool =  ej.diagrams.DiagramTools.ZoomPan;
            break;
        case 'selecttool':
            diagram.tool =  ej.diagrams.DiagramTools.Default;
            break;
        case 'group':
            diagram.group();
            break;
        case 'ungroup':
            diagram.unGroup();
            break;
        case 'delete':
            diagram.remove();
            break;
        case 'lock':
        case 'unlock':
              lockObject();
              break;
        // case 'bold':
        //       updateAnnotation('bold');
        //       break;
        // case 'underline':
        //       updateAnnotation('underline');
        //       break;
        // case 'italic':
        //       updateAnnotation('italic'); 
        //       break;
        case 'alignleft':
        case 'alignright':
        case 'aligntop':
        case 'alignbottom':
        case 'alignmiddle':
        case 'aligncenter':
              var alignType = commandType.replace('align', '');
              var alignType1 = alignType.charAt(0).toUpperCase() + alignType.slice(1);
              diagram.align(alignType1);
              break;
        case 'horizontalflip':
              diagram.selectedItems.nodes[0].flip  = 'Horizontal'     
              break;
        case 'verticalflip':
              diagram.selectedItems.nodes[0].flip ='Vertical'
        case 'texttool' : 
              diagram.drawingObject = { shape: { type: 'Text' }, style: { strokeColor: 'none', fill: 'none' } };
              diagram.tool = ej.diagrams.DiagramTools.ContinuousDraw;
              break;
        case 'straight' : 
              diagram.drawingObject = { type: 'Straight' } ;
              diagram.tool = ej.diagrams.DiagramTools.ContinuousDraw;
              break;
        case 'orthogonal' : 
              diagram.drawingObject = { type: 'Orthogonal' } ;
              diagram.tool = ej.diagrams.DiagramTools.ContinuousDraw;
              break;
        case 'bezier' : 
              diagram.drawingObject = { type: 'Bezier' } ;
              diagram.tool = ej.diagrams.DiagramTools.ContinuousDraw;
              break;
        
   }
}
function showColorPicker (propertyName, toolbarName) {
  var fillElement =
      document.getElementById(propertyName).parentElement.getElementsByClassName('e-dropdown-btn')[0];
  fillElement.click();
  var popupElement = document.getElementById(fillElement.id + '-popup');
  var bounds = document.getElementsByClassName(toolbarName)[0].getBoundingClientRect();
  popupElement.style.left = bounds.left + 'px';
  popupElement.style.top = (bounds.top + 40) + 'px';
}

function hideMenuBar() {
  var expandcollapseicon = document.getElementById('btnHideToolbar');
  var button1 = expandcollapseicon.ej2_instances[0];
  if (button1.iconCss.indexOf('sf-icon-Collapse tb-icons') > -1) {
      button1.iconCss = 'sf-icon-DownArrow2 tb-icons';
  } else {
      button1.iconCss = 'sf-icon-Collapse tb-icons';
  }
  hideElements('hide-menubar',diagram);
  // selectedItem.selectedDiagram.refresh();
}
 function hideElements (elementType, diagram, diagramType) {
  var diagramContainer = document.getElementsByClassName('diagrambuilder-container')[0];
  if (diagramContainer.classList.contains(elementType)) {
      if (!(diagramType === 'mindmap-diagram' || diagramType === 'orgchart-diagram')) {
          diagramContainer.classList.remove(elementType);
      }
  }
  else {
      diagramContainer.classList.add(elementType);
  }
  if (diagram) {
      diagram.updateViewPort();
  }
};

function updateAnnotation(value, fontSize, fontFamily) {
  for (var i = 0; i < diagram.selectedItems.nodes.length; i++) {
      var node = diagram.selectedItems.nodes[i];
      for (var j = 0; j < node.annotations.length; j++) {
          var annotationStyle = node.annotations[j].style;
          if (value === 'fontsize') {
              annotationStyle.fontSize = fontSize.value;
          } else if (value === 'underline') {
              annotationStyle.textDecoration = 'Underline';
          } else if (value === 'fontfamily') {
              annotationStyle.fontFamily = fontFamily.value.toString();
          } else if (value === 'bold') {
              annotationStyle.bold = true;
          } else if (value === 'italic') {
              annotationStyle.italic = true;
          } 
          diagram.dataBind();
      }
  }
}
function zoomChange(args) {
  zoomCurrentValue = document.getElementById("btnZoomIncrement").ej2_instances[0];
  if (args.item.text === 'Custom') {
      var ss = '';
  } else if (args.item.text === 'Fit To Screen') {
      zoomCurrentValue.content = selectedItem.scrollSettings.currentZoom = 'Fit ...';
      diagram.fitToPage({ mode: 'Page', region: 'Content', margin: { left: 0, top: 0, right: 0, bottom: 0 } });
  } else {
      var currentZoom = diagram.scrollSettings.currentZoom;

      var zoom = {};
      switch (args.item.text) {
          case '400%':
              zoom.zoomFactor = (4 / currentZoom) - 1;
              break;
          case '300%':
              zoom.zoomFactor = (3 / currentZoom) - 1;
              break;
          case '200%':
              zoom.zoomFactor = (2 / currentZoom) - 1;
              break;
          case '150%':
              zoom.zoomFactor = (1.5 / currentZoom) - 1;
              break;
          case '100%':
              zoom.zoomFactor = (1 / currentZoom) - 1;
              break;
          case '75%':
              zoom.zoomFactor = (0.75 / currentZoom) - 1;
              break;
          case '50%':
              zoom.zoomFactor = (0.5 / currentZoom) - 1;
              break;
          case '25%':
              zoom.zoomFactor = (0.25 / currentZoom) - 1;
              break;
      }
      zoomCurrentValue.content = diagram.scrollSettings.currentZoom = args.item.text;
      diagram.zoomTo(zoom);
  }
}
function lockObject (args) {
  // selectedItem.isModified = true;
  for (var i = 0; i < diagram.selectedItems.nodes.length; i++) {
      var node = diagram.selectedItems.nodes[i];
      if (node.constraints & ej.diagrams.NodeConstraints.Drag) {
          node.constraints = ej.diagrams.NodeConstraints.PointerEvents | ej.diagrams.NodeConstraints.Select;
      } else {
          node.constraints = ej.diagrams.NodeConstraints.Default;
      }
  }
  for (var j = 0; j < diagram.selectedItems.connectors.length; j++) {
      var connector = diagram.selectedItems.connectors[j];
      if (connector.constraints & ej.diagrams.ConnectorConstraints.Drag) {
          connector.constraints = ej.diagrams.ConnectorConstraints.PointerEvents | ej.diagrams.ConnectorConstraints.Select;
      } else {
          connector.constraints = ej.diagrams.ConnectorConstraints.Default;
      }
  }
  diagram.dataBind();
}

var doors = [
  { id: 'Door close',style:{ strokeColor:'green',fill:'red'}, shape: { type: 'Path', data: 'M1 71L1 79L72 79V71M1 71L72 71M1 71C1 32.3401 32.3401 1 71 1H72V71' }},
  { id: 'Door open', style:{  strokeColor:'red',fill:'green'},shape: { type: 'Path', data: 'M64.9999 1H71.9999V78H64.9999V1ZM64.9999 1C42.6666 3.16667 -1.30006 21.9 1.49994 79.5' }},
  { id: 'Double door close', style:{  strokeColor:'red',fill:'green'},shape: { type: 'Path', data:"M143 71V79L1 79L1 71M143 71L1 71M143 71V1H142C103.34 1 72 32.3401 72 71M143 71H72M1 71L1 1H2C40.6599 1 72 32.3401 72 71M1 71L72 71M72 78.5V71"}},
  {id: 'Double door open', shape: { type: 'Path', data:"M143 1V79H135V1L143 1Z M1 1L1 79H9L9 1L1 1Z M72 79V72M72 72C72 32.7878 103.788 1 143 1M72 72C72 32.7878 40.2122 1 1 1M143 1V79H135V1L143 1ZM1 1L1 79H9L9 1L1 1Z"}},
  {id: 'Single Door Double Action Close ', shape: { type: 'Path', data:"M72 79L1 79M72 79V71M72 79V149H71C32.3401 149 1 117.66 1 79M1 79L1 71M1 71L72 71M1 71C1 32.3401 32.3401 1 71 1H72V71"}},
  {id: 'Double Door Double Action Close', shape: { type: 'Path', data:'M143 79L72 79M143 79V71M143 79V149H142C103.34 149 72 117.66 72 79M72 79V71M72 79L1 79M72 79C72 117.66 40.6599 149 2 149H1V79M72 71L143 71M72 71L1 71M72 71C72 32.3401 103.34 1 142 1H143V71M72 71C72 32.3401 40.6599 1 2 1H1L1 71M1 79L1 71'}},
  // {id: 'Single Door Double Action Open', shape: { type: 'Path', data:"M72 1H72.5V0.5H72V1ZM64 79H63.5V79.5H64V79ZM64 1V0.5H63.5V1H64ZM72 149V149.5H72.5V149H72ZM1.5 79V72H0.5V79H1.5ZM72 0.5C32.5116 0.5 0.5 32.5116 0.5 72H1.5C1.5 33.0639 33.0639 1.5 72 1.5V0.5ZM71.5 1V79H72.5V1H71.5ZM72 78.5H64V79.5H72V78.5ZM64.5 79V1H63.5V79H64.5ZM64 1.5L72 1.5V0.5L64 0.5V1.5ZM71 149.5H72V148.5H71V149.5ZM72.5 149V79H71.5V149H72.5ZM71 148.5C32.6162 148.5 1.5 117.384 1.5 79H0.5C0.5 117.936 32.0639 149.5 71 149.5V148.5Z"}},
  
  // {id: 'Double Door Double Action Open', shape: { type: 'Path', data:'M58.5 72.5L58.5 1.5L66.5 1.5L66.5 72.5H58.5Z M67 139C58.3328 139 49.7504 137.215 41.7429 133.748C33.7354 130.28 26.4596 125.198 20.331 118.79C14.2023 112.383 9.34076 104.777 6.02395 96.4052C2.70714 88.0337 1 79.0612 1 70C1 60.9388 2.70714 51.9663 6.02395 43.5948C9.34076 35.2234 14.2023 27.6169 20.331 21.2096C26.4596 14.8024 33.7354 9.71988 41.7429 6.25231C49.7504 2.78474 58.3328 0.999999 67 1L67 139Z'}},
  // {id: 'Double Door Double Action Open', shape: { type: 'Path', data:'M67 70C67 79.0612 68.7071 88.0337 72.024 96.4052C75.3408 104.777 80.2023 112.383 86.331 118.79C92.4596 125.198 99.7354 130.28 107.743 133.748C115.75 137.215 124.333 139 133 139L133 1C124.333 0.999999 115.75 2.78474 107.743 6.25231C99.7354 9.71988 92.4596 14.8024 86.331 21.2096C80.2023 27.6169 75.3408 35.2234 72.024 43.5948C68.7071 51.9663 67 60.9388 67 70ZM67 70C67 79.0612 65.2929 88.0337 61.9761 96.4052C58.6592 104.777 53.7977 112.383 47.6691 118.79C41.5404 125.198 34.2646 130.28 26.2571 133.748C18.2496 137.215 9.66725 139 1 139L1 1C9.66724 0.999999 18.2496 2.78474 26.2571 6.25231C34.2646 9.71988 41.5404 14.8024 47.669 21.2096C53.7977 27.6169 58.6592 35.2234 61.9761 43.5948C65.2929 51.9663 67 60.9388 67 70ZM124.5 72.5L124.5 1.5L132.5 1.5L132.5 72.5H124.5ZM9.50001 72.5L9.5 1.5L1.5 1.5L1.5 72.5H9.50001Z'}},
];
var diningRoom = [
  {id:'Rectangle Dining Table',style:{fill:'red'}, shape :{ type: 'Path', data: 'M26.5284 6.47992C26.2452 3.54248 28.5543 1 31.5053 1H47.4947C50.4457 1 52.7548 3.54248 52.4716 6.47992L51.65 15L27.35 15L26.5284 6.47992Z M46 2C46 4.20914 44.2091 6 42 6L37 6C34.7909 6 33 4.20914 33 2V1L46 1V2Z M52.4716 73.5201C52.7548 76.4575 50.4457 79 47.4947 79H31.5053C28.5543 79 26.2452 76.4575 26.5284 73.5201L27.35 65H51.65L52.4716 73.5201Z M33 78C33 75.7909 34.7909 74 37 74H42C44.2091 74 46 75.7909 46 78V79H33V78Z M73.5201 27.5284C76.4575 27.2452 79 29.5543 79 32.5053V48.4947C79 51.4457 76.4575 53.7548 73.5201 53.4716L65 52.65V28.35L73.5201 27.5284Z M78 47C75.7909 47 74 45.2091 74 43V38C74 35.7909 75.7909 34 78 34H79V47H78Z M6.47992 53.4716C3.54248 53.7548 1 51.4457 1 48.4947L1 32.5053C1 29.5543 3.54249 27.2452 6.47992 27.5284L15 28.35L15 52.65L6.47992 53.4716Z M61 15H19C16.7909 15 15 16.7909 15 19V61C15 63.2091 16.7909 65 19 65H61C63.2091 65 65 63.2091 65 61V19C65 16.7909 63.2091 15 61 15Z M2 34C4.20914 34 6 35.7909 6 38L6 43C6 45.2091 4.20914 47 2 47H1L1 34H2Z' }},
  {id:'Oblong Dining Table', style:{fill:'red'},shape :{ type: 'Path', data:"M25.0284 6.47992C24.7452 3.54248 27.0543 1 30.0053 1H45.9947C48.9457 1 51.2548 3.54248 50.9716 6.47992L50.15 15L25.85 15L25.0284 6.47992ZM58.0284 6.47992C57.7452 3.54248 60.0543 1 63.0053 1H78.9947C81.9457 1 84.2548 3.54248 83.9716 6.47992L83.15 15L58.85 15L58.0284 6.47992Z M84.9716 73.5201C85.2548 76.4575 82.9457 79 79.9947 79H64.0053C61.0543 79 58.7452 76.4575 59.0284 73.5201L59.85 65H84.15L84.9716 73.5201Z M51.9716 73.5201C52.2548 76.4575 49.9457 79 46.9947 79H31.0053C28.0543 79 25.7452 76.4575 26.0284 73.5201L26.85 65H51.15L51.9716 73.5201Z M6.47992 53.4716C3.54249 53.7548 1 51.4457 1 48.4947L1 32.5053C1 29.5543 3.54249 27.2452 6.47992 27.5284L15 28.35V52.65L6.47992 53.4716Z M103.52 27.5284C106.458 27.2452 109 29.5543 109 32.5053V48.4947C109 51.4457 106.458 53.7548 103.52 53.4716L95 52.65V28.35L103.52 27.5284Z M91 15H19C16.7909 15 15 16.7909 15 19V61C15 63.2091 16.7909 65 19 65H91C93.2091 65 95 63.2091 95 61V19C95 16.7909 93.2091 15 91 15Z M50.15 15V15.5H50.6041L50.6477 15.048L50.15 15ZM25.85 15L25.3523 15.048L25.3959 15.5H25.85V15ZM50.9716 6.47992L50.4739 6.43192L50.9716 6.47992ZM25.0284 6.47992L24.5307 6.52791L25.0284 6.47992ZM32 1V0.5L31.5 0.5V1H32ZM45 1H45.5V0.500001L45 0.500001V1ZM36 6V5.5V6ZM32 2L32.5 2V2H32ZM41 6V6.5V6ZM45 2H45.5H45ZM83.15 15V15.5H83.6041L83.6477 15.048L83.15 15ZM58.85 15L58.3523 15.048L58.3959 15.5H58.85V15ZM83.9716 6.47992L83.4739 6.43192L83.9716 6.47992ZM58.0284 6.47992L58.5261 6.43192L58.0284 6.47992ZM65 1V0.5L64.5 0.5V1H65ZM78 1H78.5V0.500001L78 0.500001V1ZM69 6V5.5V6ZM65 2L65.5 2V2H65ZM74 6V6.5V6ZM78 2H78.5H78ZM59.85 65V64.5H59.3959L59.3523 64.952L59.85 65ZM84.15 65L84.6477 64.952L84.6041 64.5H84.15V65ZM59.0284 73.5201L59.5261 73.5681L59.0284 73.5201ZM84.9716 73.5201L84.4739 73.5681L84.9716 73.5201ZM78 79V79.5H78.5V79H78ZM65 79H64.5V79.5H65V79ZM74 74V73.5V74ZM78 78H77.5H78ZM69 74V74.5V74ZM65 78H64.5H65ZM26.85 65V64.5H26.3959L26.3523 64.952L26.85 65ZM51.15 65L51.6477 64.952L51.6041 64.5H51.15V65ZM26.0284 73.5201L26.5261 73.5681L26.0284 73.5201ZM51.9716 73.5201L51.4739 73.5681L51.9716 73.5201ZM15 28.35H15.5V27.8959L15.048 27.8523L15 28.35ZM15 52.65L15.048 53.1477L15.5 53.1041V52.65H15ZM1 32.5053H0.500002H1ZM6.47992 27.5284L6.43193 28.0261L6.47992 27.5284ZM1 48.4947H1.5H1ZM6.47992 53.4716L6.43192 52.9739L6.47992 53.4716ZM45 79V79.5H45.5V79H45ZM32 79H31.5V79.5H32V79ZM41 74V73.5V74ZM45 78H44.5H45ZM36 74V74.5V74ZM32 78H31.5H32ZM1 47H0.5L0.5 47.5H1V47ZM1 34V33.5H0.500002L0.500002 34H1ZM6 43H6.5H6ZM2 47L2 46.5H2V47ZM6 38H5.5H6ZM2 34V33.5V34ZM95 52.65H94.5V53.1041L94.952 53.1477L95 52.65ZM95 28.35L94.952 27.8523L94.5 27.8959V28.35H95ZM109 48.4947H109.5H109ZM103.52 53.4716L103.472 53.9693L103.52 53.4716ZM109 32.5053H108.5H109ZM103.52 27.5284L103.568 28.0261L103.52 27.5284ZM109 34H109.5V33.5H109V34ZM109 47V47.5H109.5V47H109ZM104 38H103.5H104ZM108 34V34.5V34ZM104 43H104.5H104ZM108 47V47.5V47ZM30.0053 1.5H45.9947V0.5H30.0053V1.5ZM50.4739 6.43192L49.6523 14.952L50.6477 15.048L51.4693 6.52791L50.4739 6.43192ZM50.15 14.5L25.85 14.5V15.5L50.15 15.5V14.5ZM26.3477 14.952L25.5261 6.43192L24.5307 6.52791L25.3523 15.048L26.3477 14.952ZM45.9947 1.5C48.6506 1.5 50.7288 3.78824 50.4739 6.43192L51.4693 6.52791C51.7808 3.29673 49.2408 0.5 45.9947 0.5V1.5ZM30.0053 0.5C26.7592 0.5 24.2192 3.29673 24.5307 6.52791L25.5261 6.43192C25.2712 3.78824 27.3494 1.5 30.0053 1.5V0.5ZM41 5.5L36 5.5V6.5L41 6.5V5.5ZM32.5 2V1H31.5V2H32.5ZM32 1.5L45 1.5V0.500001L32 0.5V1.5ZM44.5 1V2H45.5V1H44.5ZM36 5.5C34.067 5.5 32.5 3.933 32.5 2L31.5 2C31.5 4.48528 33.5147 6.5 36 6.5V5.5ZM41 6.5C43.4853 6.5 45.5 4.48528 45.5 2H44.5C44.5 3.933 42.933 5.5 41 5.5V6.5ZM63.0053 1.5H78.9947V0.5H63.0053V1.5ZM83.4739 6.43192L82.6523 14.952L83.6477 15.048L84.4693 6.52791L83.4739 6.43192ZM83.15 14.5L58.85 14.5V15.5L83.15 15.5V14.5ZM59.3477 14.952L58.5261 6.43192L57.5307 6.52791L58.3523 15.048L59.3477 14.952ZM78.9947 1.5C81.6506 1.5 83.7288 3.78824 83.4739 6.43192L84.4693 6.52791C84.7809 3.29673 82.2408 0.5 78.9947 0.5V1.5ZM63.0053 0.5C59.7592 0.5 57.2192 3.29673 57.5307 6.52791L58.5261 6.43192C58.2712 3.78824 60.3494 1.5 63.0053 1.5V0.5ZM74 5.5L69 5.5V6.5L74 6.5V5.5ZM65.5 2V1H64.5V2H65.5ZM65 1.5L78 1.5V0.500001L65 0.5V1.5ZM77.5 1V2H78.5V1H77.5ZM69 5.5C67.067 5.5 65.5 3.933 65.5 2L64.5 2C64.5 4.48528 66.5147 6.5 69 6.5V5.5ZM74 6.5C76.4853 6.5 78.5 4.48528 78.5 2H77.5C77.5 3.933 75.933 5.5 74 5.5V6.5ZM79.9947 78.5H64.0053V79.5H79.9947V78.5ZM59.5261 73.5681L60.3477 65.048L59.3523 64.952L58.5307 73.4721L59.5261 73.5681ZM59.85 65.5H84.15V64.5H59.85V65.5ZM83.6523 65.048L84.4739 73.5681L85.4693 73.4721L84.6477 64.952L83.6523 65.048ZM64.0053 78.5C61.3494 78.5 59.2712 76.2118 59.5261 73.5681L58.5307 73.4721C58.2192 76.7033 60.7592 79.5 64.0053 79.5V78.5ZM79.9947 79.5C83.2408 79.5 85.7809 76.7033 85.4693 73.4721L84.4739 73.5681C84.7288 76.2118 82.6506 78.5 79.9947 78.5V79.5ZM69 74.5H74V73.5H69V74.5ZM77.5 78V79H78.5V78H77.5ZM78 78.5H65V79.5H78V78.5ZM65.5 79V78H64.5V79H65.5ZM74 74.5C75.933 74.5 77.5 76.067 77.5 78H78.5C78.5 75.5147 76.4853 73.5 74 73.5V74.5ZM69 73.5C66.5147 73.5 64.5 75.5147 64.5 78H65.5C65.5 76.067 67.067 74.5 69 74.5V73.5ZM46.9947 78.5H31.0053V79.5H46.9947V78.5ZM26.5261 73.5681L27.3477 65.048L26.3523 64.952L25.5307 73.4721L26.5261 73.5681ZM26.85 65.5H51.15V64.5H26.85V65.5ZM50.6523 65.048L51.4739 73.5681L52.4693 73.4721L51.6477 64.952L50.6523 65.048ZM31.0053 78.5C28.3494 78.5 26.2712 76.2118 26.5261 73.5681L25.5307 73.4721C25.2192 76.7033 27.7592 79.5 31.0053 79.5V78.5ZM46.9947 79.5C50.2408 79.5 52.7808 76.7033 52.4693 73.4721L51.4739 73.5681C51.7288 76.2118 49.6506 78.5 46.9947 78.5V79.5ZM1.5 48.4947L1.5 32.5053H0.500002L0.500001 48.4947H1.5ZM6.43193 28.0261L14.952 28.8477L15.048 27.8523L6.52791 27.0307L6.43193 28.0261ZM14.5 28.35V52.65H15.5V28.35H14.5ZM14.952 52.1523L6.43192 52.9739L6.52791 53.9693L15.048 53.1477L14.952 52.1523ZM1.5 32.5053C1.5 29.8494 3.78824 27.7712 6.43193 28.0261L6.52791 27.0307C3.29674 26.7192 0.500002 29.2592 0.500002 32.5053H1.5ZM0.500001 48.4947C0.500001 51.7408 3.29673 54.2808 6.52791 53.9693L6.43192 52.9739C3.78824 53.2288 1.5 51.1506 1.5 48.4947H0.500001ZM36 74.5H41V73.5H36V74.5ZM44.5 78V79H45.5V78H44.5ZM45 78.5H32V79.5H45V78.5ZM32.5 79V78H31.5V79H32.5ZM41 74.5C42.933 74.5 44.5 76.067 44.5 78H45.5C45.5 75.5147 43.4853 73.5 41 73.5V74.5ZM36 73.5C33.5147 73.5 31.5 75.5147 31.5 78H32.5C32.5 76.067 34.067 74.5 36 74.5V73.5ZM5.5 38L5.5 43H6.5L6.5 38H5.5ZM2 46.5H1V47.5H2V46.5ZM1.5 47L1.5 34H0.500002L0.5 47H1.5ZM1 34.5H2V33.5H1V34.5ZM5.5 43C5.5 44.933 3.933 46.5 2 46.5L2 47.5C4.48528 47.5 6.5 45.4853 6.5 43H5.5ZM6.5 38C6.5 35.5147 4.48528 33.5 2 33.5L2 34.5C3.933 34.5 5.5 36.067 5.5 38H6.5ZM108.5 32.5053V48.4947H109.5V32.5053H108.5ZM103.568 52.9739L95.048 52.1523L94.952 53.1477L103.472 53.9693L103.568 52.9739ZM95.5 52.65V28.35H94.5V52.65H95.5ZM95.048 28.8477L103.568 28.0261L103.472 27.0307L94.952 27.8523L95.048 28.8477ZM108.5 48.4947C108.5 51.1506 106.212 53.2288 103.568 52.9739L103.472 53.9693C106.703 54.2808 109.5 51.7408 109.5 48.4947H108.5ZM109.5 32.5053C109.5 29.2592 106.703 26.7192 103.472 27.0307L103.568 28.0261C106.212 27.7712 108.5 29.8494 108.5 32.5053H109.5ZM104.5 43V38H103.5V43H104.5ZM108 34.5H109V33.5H108V34.5ZM108.5 34V47H109.5V34H108.5ZM109 46.5H108V47.5H109V46.5ZM104.5 38C104.5 36.067 106.067 34.5 108 34.5V33.5C105.515 33.5 103.5 35.5147 103.5 38H104.5ZM103.5 43C103.5 45.4853 105.515 47.5 108 47.5V46.5C106.067 46.5 104.5 44.933 104.5 43H103.5ZM19 15.5H91V14.5H19V15.5ZM94.5 19V61H95.5V19H94.5ZM91 64.5H19V65.5H91V64.5ZM15.5 61V19H14.5V61H15.5ZM19 64.5C17.067 64.5 15.5 62.933 15.5 61H14.5C14.5 63.4853 16.5147 65.5 19 65.5V64.5ZM94.5 61C94.5 62.933 92.933 64.5 91 64.5V65.5C93.4853 65.5 95.5 63.4853 95.5 61H94.5ZM91 15.5C92.933 15.5 94.5 17.067 94.5 19H95.5C95.5 16.5147 93.4853 14.5 91 14.5V15.5ZM19 14.5C16.5147 14.5 14.5 16.5147 14.5 19H15.5C15.5 17.067 17.067 15.5 19 15.5V14.5Z"}},
  { id:'Oval Dining Table',style:{fill:'orange'}, shape :{ type: 'Path', data:"M22.0284 6.47992C21.7452 3.54248 24.0543 1 27.0053 1H42.9947C45.9457 1 48.2548 3.54248 47.9716 6.47992L47.5 11C47.5 11 35.2044 11.2442 32.7044 11.3676C29.5 11.5 22.85 15 22.85 15L22.0284 6.47992Z M42 2C42 4.20914 40.2091 6 38 6L33 6C30.7909 6 29 4.20914 29 2V1L42 1V2Z M55.0284 6.47992C54.7452 3.54248 57.0543 1 60.0053 1H75.9947C78.9457 1 81.2548 3.54248 80.9716 6.47992L80.2454 14.7933C76.3282 11.875 70.5 11.2431 68.6396 11.0529L55.5 11L55.0284 6.47992Z M75 2C75 4.20914 73.2091 6 71 6L66 6C63.7909 6 62 4.20914 62 2V1L75 1V2Z M81.9716 65.5201C82.2548 68.4575 79.9457 71 76.9947 71H61.0053C58.0543 71 55.7452 68.4575 56.0284 65.5201L57 61L67.5 60.9951C73.0289 60.6225 76.0202 59.7634 81.15 57L81.9716 65.5201Z M62 70C62 67.7909 63.7909 66 66 66H71C73.2091 66 75 67.7909 75 70V71H62V70Z M48.9716 65.5201C49.2548 68.4575 46.9457 71 43.9947 71H28.0053C25.0543 71 22.7452 68.4575 23.0284 65.5201L24 57.3584C24 57.3584 29 60.5 36.3178 60.9909L48.5 61L48.9716 65.5201Z M6.47992 49.4716C3.54249 49.7548 1 47.4457 1 44.4947L1 28.5053C1 25.5543 3.54249 23.2452 6.47992 23.5284L15 24C15 24 12 29.5 12.0148 36.8689C12 42 15.3446 48.5 15.3446 48.5L6.47992 49.4716Z M29 70C29 67.7909 30.7909 66 33 66H38C40.2091 66 42 67.7909 42 70V71H29V70Z M2 30C4.20914 30 6 31.7909 6 34L6 39C6 41.2091 4.20914 43 2 43H1L1 30H2Z M97.5201 23.5284C100.458 23.2452 103 25.5543 103 28.5053V44.4947C103 47.4457 100.458 49.7548 97.5201 49.4716L89 48.65C89 48.65 92 42.5 91.9951 36.5C92 30 89.1049 24.3114 89.1049 24.3114L97.5201 23.5284Z M102 43C99.7909 43 98 41.2091 98 39V34C98 31.7909 99.7909 30 102 30H103V43H102Z M67 11H37C23.1929 11 12 22.1929 12 36C12 49.8071 23.1929 61 37 61H67C80.8071 61 92 49.8071 92 36C92 22.1929 80.8071 11 67 11Z"}},
  { id:'Circle Dining Table', shape :{ type: 'Path', data: 'M36.5 12C41 12 48 14.5 48 14.5L48.8831 6.55216C49.2122 3.59033 46.8937 1 43.9137 1H28.9858C26.0418 1 23.735 3.5309 24.0072 6.46229L24.8 15C24.8 15 29.5 12 36.5 12ZM36.5 12C22.6929 12 11.5 23.1929 11.5 37C11.5 50.8071 22.6929 62 36.5 62C50.3071 62 61.5 50.8071 61.5 37C61.5 23.1929 50.3071 12 36.5 12ZM30.5 1V2C30.5 4.20914 32.2909 6 34.5 6L38.5 6C40.7091 6 42.5 4.20914 42.5 2V1L30.5 1ZM25 59.5L24.1169 67.4478C23.7878 70.4097 26.1063 73 29.0863 73H44.1301C47.0318 73 49.3242 70.5381 49.1174 67.6438L48.5 59C48.5 59 43 62 36 62C31.5 62 25 59.5 25 59.5ZM42.5 73V72C42.5 69.7909 40.7091 68 38.5 68H34.5C32.2909 68 30.5 69.7909 30.5 72V73H42.5ZM59 25.5L66.9478 24.6169C69.9097 24.2878 72.5 26.6063 72.5 29.5863V45.4357C72.5 48.4079 69.9226 50.7239 66.9673 50.4072L58.5 49.5C58.5 49.5 61.5 43.5 61.5 37.5C61.5 29 59 25.5 59 25.5ZM72.5 44H71.5C69.2909 44 67.5 42.2091 67.5 40V35C67.5 32.7909 69.2909 31 71.5 31H72.5V44ZM14 25.5L6.57312 24.6431C3.60432 24.3005 1 26.6216 1 29.6101L1 45.4137C1 48.3937 3.59033 50.7122 6.55216 50.3831L14.5 49.5C14.5 49.5 11.5 44.5 11.5 37.5C11.5 30.5 14 25.5 14 25.5ZM1 44H2C4.20914 44 6 42.2091 6 40L6 35C6 32.7909 4.20914 31 2 31H1L1 44Z'}},
  { id:'Rectangular Table for Two', shape :{ type: 'Path', data:  'M12.5284 6.47992C12.2452 3.54248 14.5543 1 17.5053 1H33.4947C36.4457 1 38.7548 3.54248 38.4716 6.47992L37.65 15L13.35 15L12.5284 6.47992Z M38.4716 73.5201C38.7548 76.4575 36.4457 79 33.4947 79H17.5053C14.5543 79 12.2452 76.4575 12.5284 73.5201L13.35 65H37.65L38.4716 73.5201Z M47 15H5C2.79086 15 1 16.7909 1 19V61C1 63.2091 2.79086 65 5 65H47C49.2091 65 51 63.2091 51 61V19C51 16.7909 49.2091 15 47 15Z M37.65 15V15.5H38.1041L38.1477 15.048L37.65 15ZM13.35 15L12.8523 15.048L12.8959 15.5H13.35V15ZM38.4716 6.47992L37.9739 6.43192L38.4716 6.47992ZM12.5284 6.47992L13.0261 6.43192L12.5284 6.47992ZM19 1V0.5L18.5 0.5V1H19ZM32 1H32.5V0.500001L32 0.500001V1ZM23 6V5.5V6ZM19 2L19.5 2V2H19ZM28 6V6.5V6ZM32 2H32.5H32ZM13.35 65V64.5H12.8959L12.8523 64.952L13.35 65ZM37.65 65L38.1477 64.952L38.1041 64.5H37.65V65ZM17.5053 79V79.5V79ZM12.5284 73.5201L13.0261 73.5681L12.5284 73.5201ZM33.4947 79V78.5V79ZM38.4716 73.5201L37.9739 73.5681L38.4716 73.5201ZM32 79V79.5H32.5V79H32ZM19 79H18.5V79.5H19V79ZM19 78H19.5H19ZM17.5053 1.5H33.4947V0.5H17.5053V1.5ZM37.9739 6.43192L37.1523 14.952L38.1477 15.048L38.9693 6.52791L37.9739 6.43192ZM37.65 14.5L13.35 14.5V15.5L37.65 15.5V14.5ZM13.8477 14.952L13.0261 6.43192L12.0307 6.52791L12.8523 15.048L13.8477 14.952ZM33.4947 1.5C36.1506 1.5 38.2288 3.78824 37.9739 6.43192L38.9693 6.52791C39.2808 3.29673 36.7408 0.5 33.4947 0.5V1.5ZM17.5053 0.5C14.2592 0.5 11.7192 3.29673 12.0307 6.52791L13.0261 6.43192C12.7712 3.78824 14.8494 1.5 17.5053 1.5V0.5ZM28 5.5L23 5.5V6.5L28 6.5V5.5ZM19.5 2V1H18.5V2H19.5ZM19 1.5L32 1.5V0.500001L19 0.5V1.5ZM31.5 1V2H32.5V1H31.5ZM23 5.5C21.067 5.5 19.5 3.933 19.5 2L18.5 2C18.5 4.48528 20.5147 6.5 23 6.5V5.5ZM28 6.5C30.4853 6.5 32.5 4.48528 32.5 2H31.5C31.5 3.933 29.933 5.5 28 5.5V6.5ZM33.4947 78.5H17.5053V79.5H33.4947V78.5ZM13.0261 73.5681L13.8477 65.048L12.8523 64.952L12.0307 73.4721L13.0261 73.5681ZM13.35 65.5H37.65V64.5H13.35V65.5ZM37.1523 65.048L37.9739 73.5681L38.9693 73.4721L38.1477 64.952L37.1523 65.048ZM17.5053 78.5C14.8494 78.5 12.7712 76.2118 13.0261 73.5681L12.0307 73.4721C11.7192 76.7033 14.2592 79.5 17.5053 79.5V78.5ZM33.4947 79.5C36.7408 79.5 39.2808 76.7033 38.9693 73.4721L37.9739 73.5681C38.2288 76.2118 36.1506 78.5 33.4947 78.5V79.5ZM23 74.5H28V73.5H23V74.5ZM31.5 78V79H32.5V78H31.5ZM32 78.5H19V79.5H32V78.5ZM19.5 79V78H18.5V79H19.5ZM28 74.5C29.933 74.5 31.5 76.067 31.5 78H32.5C32.5 75.5147 30.4853 73.5 28 73.5V74.5ZM23 73.5C20.5147 73.5 18.5 75.5147 18.5 78H19.5C19.5 76.067 21.067 74.5 23 74.5V73.5ZM5 15.5H47V14.5H5V15.5ZM50.5 19V61H51.5V19H50.5ZM47 64.5H5V65.5H47V64.5ZM1.5 61V19H0.5V61H1.5ZM5 64.5C3.067 64.5 1.5 62.933 1.5 61H0.5C0.5 63.4853 2.51472 65.5 5 65.5V64.5ZM50.5 61C50.5 62.933 48.933 64.5 47 64.5V65.5C49.4853 65.5 51.5 63.4853 51.5 61H50.5ZM47 15.5C48.933 15.5 50.5 17.067 50.5 19H51.5C51.5 16.5147 49.4853 14.5 47 14.5V15.5ZM5 14.5C2.51472 14.5 0.5 16.5147 0.5 19H1.5C1.5 17.067 3.067 15.5 5 15.5V14.5Z' }},   
  { id:'Rectangle Study Table', shape :{ type: 'Path', data:'M79 1H3C1.89543 1 1 1.89543 1 3V49C1 50.1046 1.89543 51 3 51H79C80.1046 51 81 50.1046 81 49V3C81 1.89543 80.1046 1 79 1Z'}},
  {id:'Circle Study Table', style:{fill:'orange'}, shape :{ type: 'Path', data:"M57 29C57 44.464 44.464 57 29 57C13.536 57 1 44.464 1 29C1 13.536 13.536 1 29 1C44.464 1 57 13.536 57 29Z"}},
  {id:'Circular Table for Two', style:{fill:'green'}, shape :{ type: 'Path', data:"M12.7839 6.68319C12.3695 3.67862 14.704 1 17.737 1H33.4357C36.4079 1 38.7239 3.57736 38.4072 6.53267L37.5 14.7962C33 12.2962 30.4479 12.2502 25.5 12.0049C20.8774 12.1817 18.4551 13.0876 13.9551 15.0876L12.7839 6.68319Z M32 2C32 4.20914 30.2091 6 28 6L23 6C20.7909 6 19 4.20914 19 2V1L32 1V2Z M38.6314 67.656C38.8308 70.546 36.5401 73 33.6433 73H17.5439C14.579 73 12.2654 70.4347 12.5705 67.4855L13.4604 58.6325C17.7149 60.6639 20.3595 61.8118 25.5 61.9951C30.7634 61.8969 34.0464 60.4596 38.1993 58.8266L38.6314 67.656Z M19 72C19 69.7909 20.7909 68 23 68H28C30.2091 68 32 69.7909 32 72V73H19V72Z M51 37C51 50.8071 39.8071 62 26 62C12.1929 62 1 50.8071 1 37C1 23.1929 12.1929 12 26 12C39.8071 12 51 23.1929 51 37Z M48 37C48 49.1503 38.1503 59 26 59C13.8497 59 4 49.1503 4 37C4 24.8497 13.8497 15 26 15C38.1503 15 48 24.8497 48 37Z"}},
];
var bedRoom = [
{ id:'Double bed', shape :{ type: 'Path', data:'M1 54V2C1 1.44772 1.44772 1 2 1H44C44.5523 1 45 1.44771 45 2V54C45 54.5523 44.5523 55 44 55H2C1.44772 55 1 54.5523 1 54Z M7.57446 14.4176C8.01615 12.4296 7.72961 10.0298 7.34925 8.31942C7.20247 7.65937 7.68924 7 8.36541 7H19.6515C20.3227 7 20.8097 7.6496 20.6533 8.3023C20.4282 9.24153 20.1765 10.5125 20.1765 11.5C20.1765 12.4875 20.4282 13.7585 20.6533 14.6977C20.8097 15.3504 20.3227 16 19.6515 16H8.68924C7.9291 16 7.4096 15.1596 7.57446 14.4176Z M25.5745 14.4176C26.0161 12.4296 25.7296 10.0298 25.3493 8.31942C25.2025 7.65937 25.6892 7 26.3654 7H37.6515C38.3227 7 38.8097 7.6496 38.6533 8.3023C38.4282 9.24153 38.1765 10.5125 38.1765 11.5C38.1765 12.4875 38.4282 13.7585 38.6533 14.6977C38.8097 15.3504 38.3227 16 37.6515 16H26.6892C25.9291 16 25.4096 15.1596 25.5745 14.4176Z M45 53V27.695C41.8333 26.4298 34.1 24.6584 28.5 27.695C22.9 30.7316 16.5 25.5863 14 22.6341C10.1667 18.2057 2.2 13.0182 1 27.6951V53H45Z M1 54V2C1 1.44772 1.44772 1 2 1H44C44.5523 1 45 1.44771 45 2V54C45 54.5523 44.5523 55 44 55H2C1.44772 55 1 54.5523 1 54Z M7.57446 14.4176C8.01615 12.4296 7.72961 10.0298 7.34925 8.31942C7.20247 7.65937 7.68924 7 8.36541 7H19.6515C20.3227 7 20.8097 7.6496 20.6533 8.3023C20.4282 9.24153 20.1765 10.5125 20.1765 11.5C20.1765 12.4875 20.4282 13.7585 20.6533 14.6977C20.8097 15.3504 20.3227 16 19.6515 16H8.68924C7.9291 16 7.4096 15.1596 7.57446 14.4176Z M25.5745 14.4176C26.0161 12.4296 25.7296 10.0298 25.3493 8.31942C25.2025 7.65937 25.6892 7 26.3654 7H37.6515C38.3227 7 38.8097 7.6496 38.6533 8.3023C38.4282 9.24153 38.1765 10.5125 38.1765 11.5C38.1765 12.4875 38.4282 13.7585 38.6533 14.6977C38.8097 15.3504 38.3227 16 37.6515 16H26.6892C25.9291 16 25.4096 15.1596 25.5745 14.4176Z M25.5745 14.4176C26.0161 12.4296 25.7296 10.0298 25.3493 8.31942C25.2025 7.65937 25.6892 7 26.3654 7H37.6515C38.3227 7 38.8097 7.6496 38.6533 8.3023C38.4282 9.24153 38.1765 10.5125 38.1765 11.5C38.1765 12.4875 38.4282 13.7585 38.6533 14.6977C38.8097 15.3504 38.3227 16 37.6515 16H26.6892C25.9291 16 25.4096 15.1596 25.5745 14.4176Z'}},
{ id:'Single bed', style:{fill:'green'},shape :{ type: 'Path', data:'M1 2C1 1.44771 1.44772 1 2 1H26C26.5523 1 27 1.44772 27 2V54C27 54.5523 26.5523 55 26 55H2C1.44772 55 1 54.5523 1 54V2Z M1 27.5941C1 27.5432 1.0038 27.4928 1.01218 27.4426C1.13134 26.7284 2.13402 21.153 4.41646 21.0198C4.47147 21.0165 4.52813 21.0118 4.58296 21.0063C7.51272 20.7131 9.98932 30.7524 14.8322 30.9965C14.9423 31.002 15.0553 30.9826 15.1593 30.946C18.0006 29.9475 18.036 28.9499 20 28.5008C22.6744 27.8892 25.3331 28.7977 26.4505 29.2665C26.794 29.4106 27 29.7509 27 30.1234V52.0177C27 52.5699 26.5523 53.0177 26 53.0177H2C1.44772 53.0177 1 52.5699 1 52.0177V27.5941Z M7.47077 8.3988C7.27248 7.71969 7.76957 7 8.47703 7H19.0951C19.901 7 20.4243 7.93945 20.1178 8.68485C19.7917 9.47806 19.5 10.4742 19.5 11.5C19.5 12.5349 19.7571 13.4842 20.0583 14.2413C20.363 15.007 19.824 16 19 16H8.47703C7.76957 16 7.27248 15.2803 7.47077 14.6012C7.73012 13.7129 8 12.539 8 11.5C8 10.461 7.73012 9.28707 7.47077 8.3988Z'}},
{ id:'Large Plant', shape :{ type: 'Path', data:'M25.9813 23.5141C27.2901 23.5993 48.6838 19.0468 41.4746 10.8333C36.916 5.63963 21.1089 23.1968 25.9813 23.5141Z M23.6253 25.9234C23.1736 27.1547 21.4942 48.9629 31.4103 44.3689C37.6806 41.464 25.3067 21.3392 23.6253 25.9234Z M25.5989 25.6003C26.3978 26.6405 43.9262 39.7237 45.3483 28.888C46.2474 22.0363 22.6249 21.7278 25.5989 25.6003Z M24.7197 20.7567C25.6675 19.8502 36.7808 1.01108 25.8549 0.76778C18.9461 0.613932 21.191 24.1316 24.7197 20.7567Z M20.8885 22.8171C19.6966 22.2698 -1.91128 18.8763 1.88665 29.1238C4.2882 35.6035 25.3258 24.8547 20.8885 22.8171Z M21.6607 25.6193C20.3938 25.9588 1.59406 37.1385 11.0585 42.6028C17.0432 46.0581 26.3771 24.3556 21.6607 25.6193Z M22.3667 20.2554C21.8975 19.0306 8.82513 1.49408 4.37366 11.475C1.55885 17.7863 24.1136 24.815 22.3667 20.2554Z M40.0382 18.2498C40.7878 20.1543 41.1995 22.2289 41.1995 24.3996C41.1995 24.5507 41.1975 24.7013 41.1935 24.8515M35.2235 11.5507C33.6921 10.2594 31.9267 9.2368 30 8.55572M39 32.7159C37.5069 35.3317 35.3311 37.5074 32.7153 39.0004M24.8419 41.1939C24.6949 41.1977 24.5474 41.1996 24.3995 41.1996C21.7821 41.1996 19.3046 40.6011 17.0963 39.5334M10.7727 34.2278C9.9752 33.1239 9.30848 31.9193 8.79533 30.6367M7.70563 22.5004C7.89672 20.8019 8.34106 19.1801 9 17.6736M13.9123 11.274C16.1576 9.47777 18.8737 8.24563 21.846 7.79239M25.9813 23.5141C27.2901 23.5993 48.6838 19.0468 41.4746 10.8333C36.916 5.63963 21.1089 23.1968 25.9813 23.5141ZM23.6253 25.9234C23.1736 27.1547 21.4942 48.9629 31.4103 44.3689C37.6806 41.464 25.3067 21.3392 23.6253 25.9234ZM25.5989 25.6003C26.3978 26.6405 43.9262 39.7237 45.3483 28.888C46.2474 22.0363 22.6249 21.7278 25.5989 25.6003ZM24.7197 20.7567C25.6675 19.8502 36.7808 1.01108 25.8549 0.76778C18.9461 0.613932 21.191 24.1316 24.7197 20.7567ZM20.8885 22.8171C19.6966 22.2698 -1.91128 18.8763 1.88665 29.1238C4.2882 35.6035 25.3258 24.8547 20.8885 22.8171ZM21.6607 25.6193C20.3938 25.9588 1.59406 37.1385 11.0585 42.6028C17.0432 46.0581 26.3771 24.3556 21.6607 25.6193ZM22.3667 20.2554C21.8975 19.0306 8.82513 1.49408 4.37366 11.475C1.55885 17.7863 24.1136 24.815 22.3667 20.2554Z'}},
{ id:'Small Plant', shape :{ type: 'Path', data:'M41.0021 14.6256C39.4786 15.0878 15.4174 23.8084 24.9086 22.7805C30.9102 22.1305 46.6742 12.9049 41.0021 14.6256Z M30.6226 40.7355C30.095 39.2334 20.3422 15.5718 21.7796 25.0097C22.6885 30.9776 32.587 46.328 30.6226 40.7355Z M40.8599 30.8341C39.4811 30.038 16.6684 18.4377 23.9067 24.6624C28.4837 28.5985 45.9932 33.7978 40.8599 30.8341Z M24.9451 2.15326C24.5331 3.69113 19.2324 28.7289 23.3715 20.1262C25.9889 14.6864 26.4792 -3.57215 24.9451 2.15326Z M2.19397 25.3449C3.78608 25.3449 29.3427 23.9847 19.9617 22.2131C14.0299 21.0929 -3.73342 25.3449 2.19397 25.3449Z M14.4307 41.966C15.2268 40.5872 26.8271 17.7744 20.6024 25.0127C16.6664 29.5898 11.467 47.0992 14.4307 41.966Z M9.34308 7.01354C10.1391 8.39235 24.0954 29.8449 20.9391 20.835C18.9434 15.1378 6.37938 1.88027 9.34308 7.01354Z M8.74609 23.1317C8.74609 19.0028 10.6305 15.3141 13.5861 12.8786M25.2568 10.2486C29.1467 11.2213 32.3568 13.9095 34.0367 17.4627M23.5 9.93362C23.0157 9.88011 22.5236 9.85264 22.0251 9.85264C19.3319 9.85264 16.826 10.6544 14.733 12.0323M34.6489 19.0003C35.0742 20.3006 35.3041 21.6893 35.3041 23.1317C35.3041 24.7546 35.013 26.3095 34.4801 27.747M33.7595 29.3531C32.4773 31.7665 30.4723 33.7373 28.0333 34.9769M26.5361 35.6249C25.1278 36.1335 23.6088 36.4107 22.0251 36.4107C20.4153 36.4107 18.8723 36.1242 17.4445 35.5995M15.8519 34.8916C12.0702 32.9023 9.36529 29.1424 8.83942 24.7143M41.0021 14.6256C39.4786 15.0878 15.4174 23.8084 24.9086 22.7805C30.9102 22.1305 46.6742 12.9049 41.0021 14.6256ZM30.6226 40.7355C30.095 39.2334 20.3422 15.5718 21.7796 25.0097C22.6885 30.9776 32.587 46.328 30.6226 40.7355ZM40.8599 30.8341C39.4811 30.038 16.6684 18.4377 23.9067 24.6624C28.4837 28.5985 45.9932 33.7978 40.8599 30.8341ZM24.9451 2.15326C24.5331 3.69113 19.2324 28.7289 23.3715 20.1262C25.9889 14.6864 26.4792 -3.57215 24.9451 2.15326ZM2.19397 25.3449C3.78608 25.3449 29.3427 23.9847 19.9617 22.2131C14.0299 21.0929 -3.73342 25.3449 2.19397 25.3449ZM14.4307 41.966C15.2268 40.5872 26.8271 17.7744 20.6024 25.0127C16.6664 29.5898 11.467 47.0992 14.4307 41.966ZM9.34308 7.01354C10.1391 8.39235 24.0954 29.8449 20.9391 20.835C18.9434 15.1378 6.37938 1.88027 9.34308 7.01354Z'}},
{ id:'Lamp light', shape :{ type: 'Path', data:"M17 7C11.4772 7 7 11.4772 7 17C7 22.5228 11.4772 27 17 27C22.5228 27 27 22.5228 27 17C27 11.4772 22.5228 7 17 7ZM17 7V13.5M20.2363 18.5593L25.3654 21.3093M13.7544 18.4305L8.2541 21.6805M33 17C33 25.8366 25.8366 33 17 33C8.16344 33 1 25.8366 1 17C1 8.16344 8.16344 1 17 1C25.8366 1 33 8.16344 33 17ZM25.5 17C25.5 21.6944 21.6944 25.5 17 25.5C12.3056 25.5 8.5 21.6944 8.5 17C8.5 12.3056 12.3056 8.5 17 8.5C21.6944 8.5 25.5 12.3056 25.5 17ZM21 17C21 19.2091 19.2091 21 17 21C14.7909 21 13 19.2091 13 17C13 14.7909 14.7909 13 17 13C19.2091 13 21 14.7909 21 17Z"}},
{ id:'Book Case', shape :{ type: 'Path', data:'M113 9V1H1V9M113 9H1M113 9V29H1V9M4 12H11V25H4V12ZM13 12H20V25H13V12ZM22 12H29V25H22V12ZM31 12H38V25H31V12ZM40 12H47V25H40V12ZM49 12H56V25H49V12ZM58 12H65V25H58V12ZM67 12H74V25H67V12ZM76 12H83V25H76V12ZM85 12H92V25H85V12ZM94 12H101V25H94V12ZM103 12H110V25H103V12Z'}}
]
var livingRoom=[
{ id:'TV', shape :{ type: 'Path', data:'M55 23H4C2.34315 23 1 24.3431 1 26V40H58V26C58 24.3431 56.6569 23 55 23ZM55 23L48.1968 4.29128C47.4783 2.31534 45.6004 1 43.4979 1H16.5021C14.3996 1 12.5217 2.31533 11.8032 4.29128L5 23H55ZM16 1V23M25 1V23M34 1V23M43 1V23M1 36.5H58'}},
{ id:'Flat TV', shape :{ type: 'Path', data:'M1 15H92M1 15V20H92V15M1 15V10H92V15M79 7L85 1M79 20L85 26M14 7L8 1M14 20L8 26M37 2V7M39 2V7M41 2V7M43 2V7M45 2V7M47 2V7M49 2V7M51 2V7M53 2V7M55 2V7M23 2H70L76 7H17L23 2ZM5 7H88V10H5V7Z'}},
{ id:'Flat TV1', shape :{ type: 'Path', data:'M1 14H92M1 14V19H92V14M1 14V9H92V14M37 1V6M39 1V6M41 1V6M43 1V6M45 1V6M47 1V6M49 1V6M51 1V6M53 1V6M55 1V6M23 1H70L76 6H17L23 1ZM5 6H88V9H5V6Z'}},
{ id:' Sofa', shape :{ type: 'Path', data:'M145 17H137C134.791 17 133 18.7909 133 21V45C133 47.2091 134.791 49 137 49H145C147.209 49 149 47.2091 149 45V21C149 18.7909 147.209 17 145 17ZM145 17H5M145 17C147.209 17 149 15.2091 149 13V5.00001C149 2.79087 147.209 1.00001 145 1.00001L5 1C2.79086 1 1 2.79086 1 5L1 13C1 15.2091 2.79086 17 5 17M5 17H13C15.2091 17 17 18.7909 17 21V45C17 47.2091 15.2091 49 13 49H5C2.79086 49 1 47.2091 1 45L1 21C1 18.7909 2.79086 17 5 17ZM20 49H130C131.657 49 133 47.6569 133 46V20C133 18.3431 131.657 17 130 17H20C18.3431 17 17 18.3431 17 20V46C17 47.6569 18.3431 49 20 49ZM59 49H92C93.6569 49 95 47.6569 95 46V20C95 18.3431 93.6569 17 92 17H59C57.3431 17 56 18.3431 56 20V46C56 47.6569 57.3431 49 59 49Z'}},
{ id:'Double Sofa', shape :{ type: 'Path', data:'M55 46V20M55 46C55 47.6569 53.6569 49 52 49H20C18.3431 49 17 47.6569 17 46V20C17 18.3431 18.3431 17 20 17H52C53.6569 17 55 18.3431 55 20M55 46C55 47.6569 56.3431 49 58 49H91C92.6569 49 94 47.6569 94 46V20C94 18.3431 92.6569 17 91 17H58C56.3431 17 55 18.3431 55 20M106 17H98C95.7909 17 94 18.7909 94 21V45C94 47.2091 95.7909 49 98 49H106C108.209 49 110 47.2091 110 45V21C110 18.7909 108.209 17 106 17ZM106 17H5M106 17C108.209 17 110 15.2091 110 13V5.00001C110 2.79087 108.209 1.00001 106 1.00001L5 1C2.79086 1 1 2.79086 1 5L1 13C1 15.2091 2.79086 17 5 17M5 17H13C15.2091 17 17 18.7909 17 21V45C17 47.2091 15.2091 49 13 49H5C2.79086 49 1 47.2091 1 45L1 21C1 18.7909 2.79086 17 5 17Z'}},
{ id:'Single Sofa', shape :{ type: 'Path', data:'M67 17L59 17C56.7909 17 55 18.7909 55 21V45C55 47.2091 56.7909 49 59 49H67C69.2091 49 71 47.2091 71 45V21C71 18.7909 69.2091 17 67 17ZM67 17L5 17M67 17C69.2091 17 71 15.2091 71 13V5.00001C71 2.79087 69.2091 1.00001 67 1.00001L5 1C2.79086 1 1 2.79086 1 5L1 13C1 15.2091 2.79086 17 5 17M5 17L13 17C15.2091 17 17 18.7909 17 21V45C17 47.2091 15.2091 49 13 49H5C2.79086 49 1 47.2091 1 45L1 21C1 18.7909 2.79086 17 5 17ZM20 49H52C53.6569 49 55 47.6569 55 46V20C55 18.3431 53.6569 17 52 17H20C18.3431 17 17 18.3431 17 20V46C17 47.6569 18.3431 49 20 49Z'}},
{ id:'Chair', shape :{ type: 'Path', data:'M22 9V14M28 9.08984V14M13 54H37C41.4183 54 45 50.4183 45 46V22C45 17.5817 41.4183 14 37 14H13C8.58172 14 5 17.5817 5 22V46C5 50.4183 8.58172 54 13 54ZM3 45C1.89543 45 1 44.1046 1 43V25C1 23.8954 1.89543 23 3 23C4.10457 23 5 23.8954 5 25V43C5 44.1046 4.10457 45 3 45ZM11 5.79143C11 3.97975 12.2614 2.40196 14.0423 2.06981C22.0186 0.582241 27.6274 0.696364 35.7954 2.09976C37.6588 2.41991 39 4.05364 39 5.94429C39 8.4118 36.7616 10.2627 34.325 9.87346C27.5467 8.79067 22.4382 8.5351 15.7921 9.68406C13.3336 10.1091 11 8.28636 11 5.79143ZM47 45C45.8954 45 45 44.1046 45 43V25C45 23.8954 45.8954 23 47 23C48.1046 23 49 23.8954 49 25V43C49 44.1046 48.1046 45 47 45Z'}},
{ id:'Chair1', shape :{ type: 'Path', data:'M7 27.5V56C7 56.5523 6.55228 57 6 57H2C1.44772 57 1 56.5523 1 56V26.5C1 12.4167 12.4167 1 26.5 1C40.5833 1 52 12.4167 52 26.5V56C52 56.5523 51.5523 57 51 57H47C46.4477 57 46 56.5523 46 56V27.5M7 27.5C7 16.7304 15.7304 8 26.5 8C37.2696 8 46 16.7304 46 27.5M7 27.5V58C7 58.5523 7.44772 59 8 59H45C45.5523 59 46 58.5523 46 58V27.5'}},
{id:'Stool', shape :{ type: 'Path', data:"M58 31C58 46.464 45.6878 59 30.5 59C15.3122 59 3 46.464 3 31C3 15.536 15.3122 3 30.5 3C45.6878 3 58 15.536 58 31Z  M29 59V61H25V59H29Z M29 1V3H25V1L29 1Z M36 59V61H32V59H36Z M36 1V3H32V1L36 1Z M3 29H1L1 25H3L3 29Z M60 29H58V25H60V29Z M3 36H1L1 32H3L3 36Z M60 36H58V32H60V36Z"}},
{ id:'Window1', shape :{ type: 'Path', data:'M22 5.5L124 5.50001M145 9L128 9V1L145 1V9ZM1 1L18 1L18 9L1 9L1 1ZM128 8L124 8V2L128 2V8ZM18 2L22 2L22 8L18 8L18 2Z'}},
{ id:'Window2', shape :{ type: 'Path', data:"M22 3.5L124 3.50001M22 6.5L124 6.50001M145 9L128 9V1L145 1V9ZM1 1L18 1L18 9L1 9L1 1ZM128 8L124 8V2L128 2V8ZM18 2L22 2L22 8L18 8L18 2Z"}},
{id:'Printer', shape :{ type: 'Path', data:"M1 12.1687C1 8.76181 3.76181 6 7.16867 6H58.8313C62.2382 6 65 8.76181 65 12.1687V39.8313C65 43.2382 62.2382 46 58.8313 46H7.16867C3.76181 46 1 43.2382 1 39.8313V12.1687Z M5 13.8554C5 11.7261 6.72613 10 8.85542 10H48.1446C50.2739 10 52 11.7261 52 13.8554V38.1446C52 40.2739 50.2739 42 48.1446 42H8.85542C6.72613 42 5 40.2739 5 38.1446V13.8554Z M10 4.08434C10 2.3809 11.3809 1 13.0843 1H51.9157C53.6191 1 55 2.3809 55 4.08434V6H10V4.08434Z M56 55.9157C56 57.6191 54.6191 59 52.9157 59L14.0843 59C12.3809 59 11 57.6191 11 55.9157V46L56 46V55.9157Z M54 29.7711C54 29.3452 54.3452 29 54.7711 29H57.2289C57.6548 29 58 29.3452 58 29.7711V30.2289C58 30.6548 57.6548 31 57.2289 31H54.7711C54.3452 31 54 30.6548 54 30.2289V29.7711Z M54 25.7711C54 25.3452 54.3452 25 54.7711 25H57.2289C57.6548 25 58 25.3452 58 25.7711V26.2289C58 26.6548 57.6548 27 57.2289 27H54.7711C54.3452 27 54 26.6548 54 26.2289V25.7711Z M59 29.7711C59 29.3452 59.3452 29 59.7711 29H62.2289C62.6548 29 63 29.3452 63 29.7711V30.2289C63 30.6548 62.6548 31 62.2289 31H59.7711C59.3452 31 59 30.6548 59 30.2289V29.7711Z M59 25.7711C59 25.3452 59.3452 25 59.7711 25H62.2289C62.6548 25 63 25.3452 63 25.7711V26.2289C63 26.6548 62.6548 27 62.2289 27H59.7711C59.3452 27 59 26.6548 59 26.2289V25.7711Z M54 18.7711C54 18.3452 54.3452 18 54.7711 18H62.2289C62.6548 18 63 18.3452 63 18.7711V22.2289C63 22.6548 62.6548 23 62.2289 23H54.7711C54.3452 23 54 22.6548 54 22.2289V18.7711Z"}},
{id:'Laptop', shape :{ type: 'Path', data:"M1.06567 5.71554C0.619244 3.26018 2.50554 1 5.00115 1H61.0006C63.4675 1 65.3464 3.21135 64.9481 5.64595L61.7571 25.146C61.4407 27.08 59.7695 28.5 57.8096 28.5H8.54661C6.61347 28.5 4.95694 27.1175 4.61113 25.2155L1.06567 5.71554Z M3.7083 33C3.7083 30.7909 5.49916 29 7.7083 29H58.7083C60.9174 29 62.7083 30.7909 62.7083 33V55C62.7083 57.2091 60.9174 59 58.7083 59H7.7083C5.49916 59 3.7083 57.2091 3.7083 55V33Z M26.7083 50C26.7083 49.4477 27.156 49 27.7083 49H38.7083C39.2606 49 39.7083 49.4477 39.7083 50V54C39.7083 54.5523 39.2606 55 38.7083 55H27.7083C27.156 55 26.7083 54.5523 26.7083 54V50Z M8.7083 35.5C8.7083 35.2239 8.93216 35 9.2083 35H12.2083C12.4844 35 12.7083 35.2239 12.7083 35.5V36.5C12.7083 36.7761 12.4844 37 12.2083 37H9.2083C8.93216 37 8.7083 36.7761 8.7083 36.5V35.5Z M8.7083 38.5C8.7083 38.2239 8.93216 38 9.2083 38H12.2083C12.4844 38 12.7083 38.2239 12.7083 38.5V39.5C12.7083 39.7761 12.4844 40 12.2083 40H9.2083C8.93216 40 8.7083 39.7761 8.7083 39.5V38.5Z M8.7083 41.5C8.7083 41.2239 8.93216 41 9.2083 41H12.2083C12.4844 41 12.7083 41.2239 12.7083 41.5V42.5C12.7083 42.7761 12.4844 43 12.2083 43H9.2083C8.93216 43 8.7083 42.7761 8.7083 42.5V41.5Z M8.7083 44.5C8.7083 44.2239 8.93216 44 9.2083 44H12.2083C12.4844 44 12.7083 44.2239 12.7083 44.5V45.5C12.7083 45.7761 12.4844 46 12.2083 46H9.2083C8.93216 46 8.7083 45.7761 8.7083 45.5V44.5Z M13.7083 35.5C13.7083 35.2239 13.9322 35 14.2083 35H17.2083C17.4844 35 17.7083 35.2239 17.7083 35.5V36.5C17.7083 36.7761 17.4844 37 17.2083 37H14.2083C13.9322 37 13.7083 36.7761 13.7083 36.5V35.5Z M13.7083 38.5C13.7083 38.2239 13.9322 38 14.2083 38H17.2083C17.4844 38 17.7083 38.2239 17.7083 38.5V39.5C17.7083 39.7761 17.4844 40 17.2083 40H14.2083C13.9322 40 13.7083 39.7761 13.7083 39.5V38.5Z M13.7083 41.5C13.7083 41.2239 13.9322 41 14.2083 41H17.2083C17.4844 41 17.7083 41.2239 17.7083 41.5V42.5C17.7083 42.7761 17.4844 43 17.2083 43H14.2083C13.9322 43 13.7083 42.7761 13.7083 42.5V41.5Z M13.7083 44.5C13.7083 44.2239 13.9322 44 14.2083 44H17.2083C17.4844 44 17.7083 44.2239 17.7083 44.5V45.5C17.7083 45.7761 17.4844 46 17.2083 46H14.2083C13.9322 46 13.7083 45.7761 13.7083 45.5V44.5Z M18.7083 35.5C18.7083 35.2239 18.9322 35 19.2083 35H22.2083C22.4844 35 22.7083 35.2239 22.7083 35.5V36.5C22.7083 36.7761 22.4844 37 22.2083 37H19.2083C18.9322 37 18.7083 36.7761 18.7083 36.5V35.5Z M18.7083 38.5C18.7083 38.2239 18.9322 38 19.2083 38H22.2083C22.4844 38 22.7083 38.2239 22.7083 38.5V39.5C22.7083 39.7761 22.4844 40 22.2083 40H19.2083C18.9322 40 18.7083 39.7761 18.7083 39.5V38.5Z M18.7083 41.5C18.7083 41.2239 18.9322 41 19.2083 41H22.2083C22.4844 41 22.7083 41.2239 22.7083 41.5V42.5C22.7083 42.7761 22.4844 43 22.2083 43H19.2083C18.9322 43 18.7083 42.7761 18.7083 42.5V41.5Z M18.7083 44.5C18.7083 44.2239 18.9322 44 19.2083 44H22.2083C22.4844 44 22.7083 44.2239 22.7083 44.5V45.5C22.7083 45.7761 22.4844 46 22.2083 46H19.2083C18.9322 46 18.7083 45.7761 18.7083 45.5V44.5Z M23.7083 35.5C23.7083 35.2239 23.9322 35 24.2083 35H27.2083C27.4844 35 27.7083 35.2239 27.7083 35.5V36.5C27.7083 36.7761 27.4844 37 27.2083 37H24.2083C23.9322 37 23.7083 36.7761 23.7083 36.5V35.5Z M23.7083 38.5C23.7083 38.2239 23.9322 38 24.2083 38H27.2083C27.4844 38 27.7083 38.2239 27.7083 38.5V39.5C27.7083 39.7761 27.4844 40 27.2083 40H24.2083C23.9322 40 23.7083 39.7761 23.7083 39.5V38.5Z M23.7083 41.5C23.7083 41.2239 23.9322 41 24.2083 41H27.2083C27.4844 41 27.7083 41.2239 27.7083 41.5V42.5C27.7083 42.7761 27.4844 43 27.2083 43H24.2083C23.9322 43 23.7083 42.7761 23.7083 42.5V41.5Z M23.7083 44.5C23.7083 44.2239 23.9322 44 24.2083 44H42.2083C42.4844 44 42.7083 44.2239 42.7083 44.5V45.5C42.7083 45.7761 42.4844 46 42.2083 46H24.2083C23.9322 46 23.7083 45.7761 23.7083 45.5V44.5Z M28.7083 35.5C28.7083 35.2239 28.9322 35 29.2083 35H32.2083C32.4844 35 32.7083 35.2239 32.7083 35.5V36.5C32.7083 36.7761 32.4844 37 32.2083 37H29.2083C28.9322 37 28.7083 36.7761 28.7083 36.5V35.5Z M28.7083 38.5C28.7083 38.2239 28.9322 38 29.2083 38H32.2083C32.4844 38 32.7083 38.2239 32.7083 38.5V39.5C32.7083 39.7761 32.4844 40 32.2083 40H29.2083C28.9322 40 28.7083 39.7761 28.7083 39.5V38.5Z M28.7083 41.5C28.7083 41.2239 28.9322 41 29.2083 41H32.2083C32.4844 41 32.7083 41.2239 32.7083 41.5V42.5C32.7083 42.7761 32.4844 43 32.2083 43H29.2083C28.9322 43 28.7083 42.7761 28.7083 42.5V41.5Z M33.7083 35.5C33.7083 35.2239 33.9322 35 34.2083 35H37.2083C37.4844 35 37.7083 35.2239 37.7083 35.5V36.5C37.7083 36.7761 37.4844 37 37.2083 37H34.2083C33.9322 37 33.7083 36.7761 33.7083 36.5V35.5Z M33.7083 38.5C33.7083 38.2239 33.9322 38 34.2083 38H37.2083C37.4844 38 37.7083 38.2239 37.7083 38.5V39.5C37.7083 39.7761 37.4844 40 37.2083 40H34.2083C33.9322 40 33.7083 39.7761 33.7083 39.5V38.5Z M33.7083 41.5C33.7083 41.2239 33.9322 41 34.2083 41H37.2083C37.4844 41 37.7083 41.2239 37.7083 41.5V42.5C37.7083 42.7761 37.4844 43 37.2083 43H34.2083C33.9322 43 33.7083 42.7761 33.7083 42.5V41.5Z M38.7083 35.5C38.7083 35.2239 38.9322 35 39.2083 35H42.2083C42.4844 35 42.7083 35.2239 42.7083 35.5V36.5C42.7083 36.7761 42.4844 37 42.2083 37H39.2083C38.9322 37 38.7083 36.7761 38.7083 36.5V35.5Z M38.7083 38.5C38.7083 38.2239 38.9322 38 39.2083 38H42.2083C42.4844 38 42.7083 38.2239 42.7083 38.5V39.5C42.7083 39.7761 42.4844 40 42.2083 40H39.2083C38.9322 40 38.7083 39.7761 38.7083 39.5V38.5Z M38.7083 41.5C38.7083 41.2239 38.9322 41 39.2083 41H42.2083C42.4844 41 42.7083 41.2239 42.7083 41.5V42.5C42.7083 42.7761 42.4844 43 42.2083 43H39.2083C38.9322 43 38.7083 42.7761 38.7083 42.5V41.5Z M43.7083 35.5C43.7083 35.2239 43.9322 35 44.2083 35H47.2083C47.4844 35 47.7083 35.2239 47.7083 35.5V36.5C47.7083 36.7761 47.4844 37 47.2083 37H44.2083C43.9322 37 43.7083 36.7761 43.7083 36.5V35.5Z M43.7083 38.5C43.7083 38.2239 43.9322 38 44.2083 38H47.2083C47.4844 38 47.7083 38.2239 47.7083 38.5V39.5C47.7083 39.7761 47.4844 40 47.2083 40H44.2083C43.9322 40 43.7083 39.7761 43.7083 39.5V38.5Z M43.7083 41.5C43.7083 41.2239 43.9322 41 44.2083 41H47.2083C47.4844 41 47.7083 41.2239 47.7083 41.5V42.5C47.7083 42.7761 47.4844 43 47.2083 43H44.2083C43.9322 43 43.7083 42.7761 43.7083 42.5V41.5Z M43.7083 44.5C43.7083 44.2239 43.9322 44 44.2083 44H47.2083C47.4844 44 47.7083 44.2239 47.7083 44.5V45.5C47.7083 45.7761 47.4844 46 47.2083 46H44.2083C43.9322 46 43.7083 45.7761 43.7083 45.5V44.5Z M48.7083 35.5C48.7083 35.2239 48.9322 35 49.2083 35H52.2083C52.4844 35 52.7083 35.2239 52.7083 35.5V36.5C52.7083 36.7761 52.4844 37 52.2083 37H49.2083C48.9322 37 48.7083 36.7761 48.7083 36.5V35.5Z M48.7083 38.5C48.7083 38.2239 48.9322 38 49.2083 38H52.2083C52.4844 38 52.7083 38.2239 52.7083 38.5V39.5C52.7083 39.7761 52.4844 40 52.2083 40H49.2083C48.9322 40 48.7083 39.7761 48.7083 39.5V38.5Z M48.7083 41.5C48.7083 41.2239 48.9322 41 49.2083 41H52.2083C52.4844 41 52.7083 41.2239 52.7083 41.5V42.5C52.7083 42.7761 52.4844 43 52.2083 43H49.2083C48.9322 43 48.7083 42.7761 48.7083 42.5V41.5Z M48.7083 44.5C48.7083 44.2239 48.9322 44 49.2083 44H52.2083C52.4844 44 52.7083 44.2239 52.7083 44.5V45.5C52.7083 45.7761 52.4844 46 52.2083 46H49.2083C48.9322 46 48.7083 45.7761 48.7083 45.5V44.5Z M53.7083 35.5C53.7083 35.2239 53.9322 35 54.2083 35H57.2083C57.4844 35 57.7083 35.2239 57.7083 35.5V36.5C57.7083 36.7761 57.4844 37 57.2083 37H54.2083C53.9322 37 53.7083 36.7761 53.7083 36.5V35.5Z M53.7083 38.5C53.7083 38.2239 53.9322 38 54.2083 38H57.2083C57.4844 38 57.7083 38.2239 57.7083 38.5V39.5C57.7083 39.7761 57.4844 40 57.2083 40H54.2083C53.9322 40 53.7083 39.7761 53.7083 39.5V38.5Z M53.7083 41.5C53.7083 41.2239 53.9322 41 54.2083 41H57.2083C57.4844 41 57.7083 41.2239 57.7083 41.5V42.5C57.7083 42.7761 57.4844 43 57.2083 43H54.2083C53.9322 43 53.7083 42.7761 53.7083 42.5V41.5Z M53.7083 44.5C53.7083 44.2239 53.9322 44 54.2083 44H57.2083C57.4844 44 57.7083 44.2239 57.7083 44.5V45.5C57.7083 45.7761 57.4844 46 57.2083 46H54.2083C53.9322 46 53.7083 45.7761 53.7083 45.5V44.5Z"}},
{id:'Room', shape :{ type: 'Path', data:"M4 4H104V104H4V4Z"}},
{id:'T Room', shape :{ type: 'Path', data:"M4 4H273V145.749H192.981V250H71.25V110.312H4V4Z"}},
{id:'L Room', shape :{ type: 'Path', data:"M4 4H273V250H146.5V110.312H4V4Z"}},
{ id:'Wall Corner', shape :{ type: 'Path', data:"M104 4H4V104"}},
{ id:'Wall Horizontal', shape :{ type: 'Path', data:"M100 4.00001L0 4"}},
{ id:'Wall Vertical', shape :{ type: 'Path', data:"M4.44535 100.999L3.99951 1"}},
{ id:'T Wall', shape :{ type: 'Path', data:"M106 4.00002L206 4.00004M106 4.00002L106 104M106 4.00002L0 4"}},
{id:'Window Garden', shape :{ type: 'Path', data:"M1.5 0H0V1.5V38.5H3V3H152V38.5H155V1.5V0H153.5H1.5ZM6.5 5H5V6.5V38.5H8V8H53V38.5H56V8H100V38.5H103V8H147V38.5H150V6.5V5H148.5H103H101.5H100H56H54.5H53H6.5Z"}},
]
var kitchen=[
{ id:'Small Gas Range' ,shape :{ type: 'Path', data:'M67.5828 1.96454C67.5828 1.43184 67.151 1 66.6183 1L1.96405 1.00001C1.43135 1.00001 0.999512 1.43184 0.999512 1.96454L0.999515 34.0355C0.999515 34.5682 1.43135 35 1.96405 35L66.6183 35C67.151 35 67.5828 34.5682 67.5828 34.0355V1.96454Z M33.5828 4.79852C33.5828 4.26582 33.151 3.83398 32.6183 3.83398L4.79737 3.83399C4.26467 3.83399 3.83283 4.26583 3.83283 4.79853L3.83284 31.2028C3.83284 31.7355 4.26468 32.1673 4.79738 32.1673L32.6183 32.1673C33.151 32.1673 33.5828 31.7355 33.5828 31.2028L33.5828 4.79852Z M64.7488 4.79852C64.7488 4.26582 64.317 3.83398 63.7843 3.83398L35.9634 3.83399C35.4307 3.83399 34.9988 4.26583 34.9988 4.79853L34.9989 31.2028C34.9989 31.7355 35.4307 32.1673 35.9634 32.1673L63.7843 32.1673C64.317 32.1673 64.7489 31.7355 64.7489 31.2028L64.7488 4.79852Z M26.4988 18C26.4988 22.6944 22.6933 26.5 17.9988 26.5C13.3044 26.5 9.49885 22.6944 9.49885 18C9.49885 13.3056 13.3044 9.5 17.9988 9.5C22.6933 9.5 26.4988 13.3056 26.4988 18Z M25.4363 18C25.4363 22.1076 22.1065 25.4375 17.9988 25.4375C13.8912 25.4375 10.5613 22.1076 10.5613 18C10.5613 13.8924 13.8912 10.5625 17.9988 10.5625C22.1065 10.5625 25.4363 13.8924 25.4363 18Z M25.0574 24.6826L24.6818 25.0583L22.0015 22.378L22.3772 22.0024L25.0574 24.6826Z M13.9442 13.5703L13.5685 13.946L10.888 11.2655L11.2637 10.8898L13.9442 13.5703Z M24.786 11.0938L25.1616 11.4694L22.4813 14.1497L22.1057 13.774L24.786 11.0938Z M13.7733 21.9844L14.1489 22.36L11.4686 25.0403L11.093 24.6646L13.7733 21.9844Z M21.452 18C21.452 19.9071 19.906 21.4531 17.9988 21.4531C16.0917 21.4531 14.5457 19.9071 14.5457 18C14.5457 16.0929 16.0917 14.5469 17.9988 14.5469C19.906 14.5469 21.452 16.0929 21.452 18Z M57.6658 18C57.6658 22.6944 53.8603 26.5 49.1658 26.5C44.4714 26.5 40.6658 22.6944 40.6658 18C40.6658 13.3056 44.4714 9.5 49.1658 9.5C53.8603 9.5 57.6658 13.3056 57.6658 18Z M56.6033 18C56.6033 22.1076 53.2735 25.4375 49.1658 25.4375C45.0582 25.4375 41.7283 22.1076 41.7283 18C41.7283 13.8924 45.0582 10.5625 49.1658 10.5625C53.2735 10.5625 56.6033 13.8924 56.6033 18Z M56.2235 24.6826L55.8478 25.0583L53.1675 22.378L53.5432 22.0024L56.2235 24.6826Z M45.1121 13.5703L44.7365 13.946L42.056 11.2655L42.4317 10.8898L45.1121 13.5703Z M55.952 11.0938L56.3276 11.4694L53.6474 14.1497L53.2717 13.774L55.952 11.0938Z M44.9403 21.9844L45.3159 22.36L42.6356 25.0403L42.26 24.6646L44.9403 21.9844Z M52.619 18C52.619 19.9071 51.0729 21.4531 49.1658 21.4531C47.2587 21.4531 45.7127 19.9071 45.7127 18C45.7127 16.0929 47.2587 14.5469 49.1658 14.5469C51.0729 14.5469 52.619 16.0929 52.619 18Z'}},
{  id:'Large Gas Range' , style:{fill:'green'},shape :{ type: 'Path', data:"M101.999 1.96454C101.999 1.43184 101.567 1 101.034 1L1.96356 1.00001C1.43086 1.00001 0.999023 1.43185 0.999023 1.96455L0.999026 34.0355C0.999026 34.5682 1.43087 35 1.96357 35L101.034 35C101.567 35 101.999 34.5682 101.999 34.0355V1.96454Z M33.583 4.79803C33.583 4.26533 33.1512 3.8335 32.6185 3.8335L4.79755 3.8335C4.26485 3.8335 3.83301 4.26534 3.83301 4.79804L3.83301 31.2023C3.83301 31.735 4.26485 32.1668 4.79755 32.1668L32.6185 32.1668C33.1512 32.1668 33.583 31.735 33.583 31.2023L33.583 4.79803Z M98.749 4.96454C98.749 4.43184 98.3172 4 97.7845 4L69.9636 4C69.4309 4 68.999 4.43184 68.999 4.96454L68.999 31.3688C68.999 31.9015 69.4309 32.3333 69.9636 32.3333L97.7845 32.3333C98.3172 32.3333 98.749 31.9015 98.749 31.3688V4.96454Z M60.999 9.61601C60.999 9.2758 60.7232 9 60.383 9L42.615 9C42.2748 9 41.999 9.2758 41.999 9.61601L41.999 26.4792C41.999 26.8195 42.2748 27.0953 42.615 27.0953L60.383 27.0953C60.7232 27.0953 60.999 26.8195 60.999 26.4792V9.61601Z M26.499 18C26.499 22.6944 22.6934 26.5 17.999 26.5C13.3046 26.5 9.49902 22.6944 9.49902 18C9.49902 13.3056 13.3046 9.5 17.999 9.5C22.6934 9.5 26.499 13.3056 26.499 18Z M25.4365 18C25.4365 22.1076 22.1066 25.4375 17.999 25.4375C13.8914 25.4375 10.5615 22.1076 10.5615 18C10.5615 13.8924 13.8914 10.5625 17.999 10.5625C22.1066 10.5625 25.4365 13.8924 25.4365 18Z M25.0576 24.6826L24.682 25.0583L22.0017 22.378L22.3774 22.0024L25.0576 24.6826Z M13.9443 13.5698L13.5687 13.9455L10.8882 11.265L11.2639 10.8894L13.9443 13.5698Z M24.7861 11.0938L25.1618 11.4694L22.4815 14.1497L22.1059 13.774L24.7861 11.0938Z M13.7734 21.9844L14.1491 22.36L11.4688 25.0403L11.0932 24.6646L13.7734 21.9844Z M21.4521 18C21.4521 19.9071 19.9061 21.4531 17.999 21.4531C16.0919 21.4531 14.5459 19.9071 14.5459 18C14.5459 16.0929 16.0919 14.5469 17.999 14.5469C19.9061 14.5469 21.4521 16.0929 21.4521 18Z M91.665 18.1665C91.665 22.8609 87.8595 26.6665 83.165 26.6665C78.4706 26.6665 74.665 22.8609 74.665 18.1665C74.665 13.4721 78.4706 9.6665 83.165 9.6665C87.8595 9.6665 91.665 13.4721 91.665 18.1665Z M90.6025 18.1665C90.6025 22.2741 87.2727 25.604 83.165 25.604C79.0574 25.604 75.7275 22.2741 75.7275 18.1665C75.7275 14.0589 79.0574 10.729 83.165 10.729C87.2727 10.729 90.6025 14.0589 90.6025 18.1665Z M90.2236 24.8491L89.848 25.2248L87.1677 22.5445L87.5434 22.1689L90.2236 24.8491Z M79.1104 13.7363L78.7347 14.112L76.0542 11.4315L76.4299 11.0559L79.1104 13.7363Z M89.9521 11.2603L90.3278 11.6359L87.6475 14.3162L87.2719 13.9405L89.9521 11.2603Z M78.9404 22.1509L79.3161 22.5265L76.6358 25.2068L76.2602 24.8311L78.9404 22.1509Z M86.6182 18.1665C86.6182 20.0736 85.0721 21.6196 83.165 21.6196C81.2579 21.6196 79.7119 20.0736 79.7119 18.1665C79.7119 16.2594 81.2579 14.7134 83.165 14.7134C85.0721 14.7134 86.6182 16.2594 86.6182 18.1665Z M56.4753 18.0477C56.4753 21.0458 54.0449 23.4763 51.0467 23.4763C48.0486 23.4763 45.6182 21.0458 45.6182 18.0477C45.6182 15.0496 48.0486 12.6191 51.0467 12.6191C54.0449 12.6191 56.4753 15.0496 56.4753 18.0477Z M55.7979 18.0479C55.7979 20.6712 53.6712 22.7979 51.0479 22.7979C48.4245 22.7979 46.2979 20.6712 46.2979 18.0479C46.2979 15.4245 48.4245 13.2979 51.0479 13.2979C53.6712 13.2979 55.7979 15.4245 55.7979 18.0479Z M55.5557 22.3154L55.3158 22.5553L53.604 20.8436L53.8439 20.6037L55.5557 22.3154Z M48.458 15.2183L48.2181 15.4582L46.5062 13.7463L46.7461 13.5064L48.458 15.2183Z M55.3818 13.6367L55.6217 13.8766L53.91 15.5884L53.6701 15.3485L55.3818 13.6367Z M48.3486 20.5923L48.5885 20.8322L46.8768 22.544L46.6369 22.3041L48.3486 20.5923Z M53.2525 18.0476C53.2525 19.2656 52.2651 20.253 51.0472 20.253C49.8292 20.253 48.8418 19.2656 48.8418 18.0476C48.8418 16.8297 49.8292 15.8423 51.0472 15.8423C52.2651 15.8423 53.2525 16.8297 53.2525 18.0476Z"}},
{  id:'Refrigerator', style:{fill:'green'},shape :{ type: 'Path', data:"M1 8.58323H61V58.0356H1V8.58323Z M1 58.8332H61V63.6189C61 65.381 59.5716 66.8094 57.8095 66.8094H4.19048C2.42843 66.8094 1 65.381 1 63.6189V58.8332Z M57.0527 8.17857L4.158 8.17857L4.158 4.19047C4.158 2.42842 5.58642 1 7.34847 1L53.8623 1C55.6243 1 57.0527 2.42843 57.0527 4.19048V8.17857Z M1 8.58323V8.08323H0.5V8.58323H1ZM61 8.58323H61.5V8.08323H61V8.58323ZM61 58.0356V58.5356H61.5V58.0356H61ZM1 58.0356H0.5V58.5356H1V58.0356ZM1 58.8332V58.3332H0.5V58.8332H1ZM61 58.8332H61.5V58.3332H61V58.8332ZM6.52686 66.8094V66.3094H6.02686V66.8094H6.52686ZM16.79 66.8094H17.29V66.3094H16.79V66.8094ZM57.0527 8.17857V8.67857H57.5527V8.17857H57.0527ZM4.158 8.17857H3.658V8.67857H4.158V8.17857ZM53.8623 1V0.500004V1ZM57.0527 4.19048H56.5527H57.0527ZM4.158 4.19047H3.658H4.158ZM7.34847 1V1.5V1ZM1 9.08323H61V8.08323H1V9.08323ZM60.5 8.58323V58.0356H61.5V8.58323H60.5ZM61 57.5356H1V58.5356H61V57.5356ZM1.5 58.0356V8.58323H0.5V58.0356H1.5ZM1 59.3332H61V58.3332H1V59.3332ZM60.5 58.8332V63.6189H61.5V58.8332H60.5ZM57.8095 66.3094H4.19048V67.3094H57.8095V66.3094ZM1.5 63.6189V58.8332H0.5V63.6189H1.5ZM4.19048 66.3094C2.70457 66.3094 1.5 65.1049 1.5 63.6189H0.5C0.5 65.6571 2.15228 67.3094 4.19048 67.3094V66.3094ZM60.5 63.6189C60.5 65.1049 59.2954 66.3094 57.8095 66.3094V67.3094C59.8477 67.3094 61.5 65.6571 61.5 63.6189H60.5ZM6.52686 67.3094H16.79V66.3094H6.52686V67.3094ZM13.5995 69.4999H9.71733V70.4999H13.5995V69.4999ZM9.71733 69.4999C8.23142 69.4999 7.02686 68.2953 7.02686 66.8094H6.02686C6.02686 68.8476 7.67914 70.4999 9.71733 70.4999V69.4999ZM16.29 66.8094C16.29 68.2953 15.0854 69.4999 13.5995 69.4999V70.4999C15.6377 70.4999 17.29 68.8476 17.29 66.8094H16.29ZM57.0527 7.67857L4.158 7.67857V8.67857L57.0527 8.67857V7.67857ZM4.658 8.17857L4.658 4.19047H3.658L3.658 8.17857H4.658ZM7.34847 1.5L53.8623 1.5V0.500004L7.34847 0.5V1.5ZM56.5527 4.19048V8.17857H57.5527V4.19048H56.5527ZM53.8623 1.5C55.3482 1.5 56.5527 2.70457 56.5527 4.19048H57.5527C57.5527 2.15229 55.9005 0.500004 53.8623 0.500004V1.5ZM4.658 4.19047C4.658 2.70456 5.86256 1.5 7.34847 1.5V0.5C5.31028 0.5 3.658 2.15228 3.658 4.19047H4.658Z"}},
{ id:'Water Cooler',shape :{ type: 'Path', data:'M49 1H3C1.89543 1 1 1.89543 1 3V49C1 50.1046 1.89543 51 3 51H49C50.1046 51 51 50.1046 51 49V3C51 1.89543 50.1046 1 49 1Z M47 26C47 37.598 37.598 47 26 47C14.402 47 5 37.598 5 26C5 14.402 14.402 5 26 5C37.598 5 47 14.402 47 26Z M30 26C30 28.2091 28.2091 30 26 30C23.7909 30 22 28.2091 22 26C22 23.7909 23.7909 22 26 22C28.2091 22 30 23.7909 30 26Z M49 1H3C1.89543 1 1 1.89543 1 3V49C1 50.1046 1.89543 51 3 51H49C50.1046 51 51 50.1046 51 49V3C51 1.89543 50.1046 1 49 1Z M47 26C47 37.598 37.598 47 26 47C14.402 47 5 37.598 5 26C5 14.402 14.402 5 26 5C37.598 5 47 14.402 47 26Z M30 26C30 28.2091 28.2091 30 26 30C23.7909 30 22 28.2091 22 26C22 23.7909 23.7909 22 26 22C28.2091 22 30 23.7909 30 26Z'}},
{ id:'Double Sink',shape :{ type: 'Path', data:'M1 9C1 4.58172 4.58172 1 9 1H115C119.418 1 123 4.58172 123 9V41C123 45.4183 119.418 49 115 49H9C4.58172 49 1 45.4183 1 41V9Z M7 13C7 10.7909 8.79086 9 11 9H55C57.2091 9 59 10.7909 59 13V37C59 39.2091 57.2091 41 55 41H11C8.79086 41 7 39.2091 7 37V13Z M65 13C65 10.7909 66.7909 9 69 9H113C115.209 9 117 10.7909 117 13V37C117 39.2091 115.209 41 113 41H69C66.7909 41 65 39.2091 65 37V13Z M35 25.5C35 26.8807 33.8807 28 32.5 28C31.1193 28 30 26.8807 30 25.5C30 24.1193 31.1193 23 32.5 23C33.8807 23 35 24.1193 35 25.5Z M93 25.5C93 26.8807 91.8807 28 90.5 28C89.1193 28 88 26.8807 88 25.5C88 24.1193 89.1193 23 90.5 23C91.8807 23 93 24.1193 93 25.5Z M64.3638 10.4863C64.3638 10.4863 65.071 10.4863 65.7781 9.77915C66.4852 9.07204 66.4852 8.36493 66.4852 8.36493L74.4865 15.2232C75.5104 16.1009 75.5705 17.6644 74.6169 18.618C73.6633 19.5716 72.0998 19.5115 71.2221 18.4876L64.3638 10.4863Z M65.4246 4.47532C66.7915 5.84216 66.7915 8.05823 65.4246 9.42507C64.0578 10.7919 61.8417 10.7919 60.4749 9.42507C59.108 8.05823 59.108 5.84216 60.4749 4.47532C61.8417 3.10849 64.0578 3.10849 65.4246 4.47532Z'}},
]
var bathRoom =[
{ id:'Toilet', shape :{ type: 'Path', data: 'M46.4065 37.9425C46.4065 55.0951 36.823 69.0002 25.0011 69.0002C13.1792 69.0002 3.5957 55.0951 3.5957 37.9425C3.5957 30.1141 5.2059 23.4623 8.5 18C8.61402 18 25 18 25 18H41.2425C44.5366 23.4623 46.4065 30.1141 46.4065 37.9425Z M41.2161 43.5006C41.2161 53.9728 33.9559 62.4621 24.9999 62.4621C16.0439 62.4621 8.78369 53.9728 8.78369 43.5006C8.78369 33.0284 16.0439 24.5391 24.9999 24.5391C33.9559 24.5391 41.2161 33.0284 41.2161 43.5006Z M1 3.61538C1 2.17095 2.17095 1 3.61538 1H46.3846C47.8291 1 49 2.17095 49 3.61538V15.3846C49 16.8291 47.8291 18 46.3846 18H3.61538C2.17095 18 1 16.8291 1 15.3846V3.61538Z M26.9995 9C26.9995 10.1046 26.1041 11 24.9995 11C23.8949 11 22.9995 10.1046 22.9995 9C22.9995 7.89543 23.8949 7 24.9995 7C26.1041 7 26.9995 7.89543 26.9995 9Z M31 33C31 37.4183 28.3137 41 25 41C21.6863 41 19 37.4183 19 33C19 28.5817 21.6863 25 25 25C28.3137 25 31 28.5817 31 33Z '}},
{ id:'Shower', shape :{ type: 'Path', data:"M6.70817 7.37289L45.3371 42.6307M44.3387 7.36777L6.33874 42.3678M23.3536 22.8447L28.3536 27.8447M28.3641 22.5409L23.3641 27.8532M1 1L45 1.19812V7.19812H6.17647V42.1981H45V49H1V1ZM32 25.1982C32 28.512 29.3137 31.1982 26 31.1982C22.6863 31.1982 20 28.512 20 25.1982C20 21.8845 22.6863 19.1982 26 19.1982C29.3137 19.1982 32 21.8845 32 25.1982ZM29.75 25.1982C29.75 27.2693 28.0711 28.9482 26 28.9482C23.9289 28.9482 22.25 27.2693 22.25 25.1982C22.25 23.1272 23.9289 21.4482 26 21.4482C28.0711 21.4482 29.75 23.1272 29.75 25.1982ZM27.5 25.1982C27.5 26.0267 26.8284 26.6982 26 26.6982C25.1716 26.6982 24.5 26.0267 24.5 25.1982C24.5 24.3698 25.1716 23.6982 26 23.6982C26.8284 23.6982 27.5 24.3698 27.5 25.1982Z"}},
{ id:'Corner Shower', shape :{ type: 'Path', data:"M7.46424 6.8143L15.4642 26.8143M23.1506 36.5232L42.1506 42.5232M14.3536 35.3536L7.35355 42.3536M31.4327 7.25052L20.4327 26.2505M42.1411 26.4797L25.1411 31.4797M16.5984 29.3311L21.749 34.1759M21.3641 29.3427L16.3641 34.6549M1 1H32.0332V7H7.03382V43L42.0338 42.9219V26H48.0338V49.1981H1.03382L1 1ZM25 32C25 35.3137 22.3137 38 19 38C15.6863 38 13 35.3137 13 32C13 28.6863 15.6863 26 19 26C22.3137 26 25 28.6863 25 32ZM22.75 32C22.75 34.0711 21.0711 35.75 19 35.75C16.9289 35.75 15.25 34.0711 15.25 32C15.25 29.9289 16.9289 28.25 19 28.25C21.0711 28.25 22.75 29.9289 22.75 32ZM20 32C20 32.5523 19.5523 33 19 33C18.4477 33 18 32.5523 18 32C18 31.4477 18.4477 31 19 31C19.5523 31 20 31.4477 20 32Z"}},
{ id:'Wash Basin', shape :{ type: 'Path', data:"M1 4C1 2.34315 2.34315 1 4 1H62C63.6569 1 65 2.34315 65 4V25C65 38.2548 54.2548 49 41 49H25C11.7452 49 1 38.2548 1 25V4Z M57 25C57 33.2843 46.2548 40 33 40C19.7452 40 9 33.2843 9 25C9 16.7157 19.7452 10 33 10C46.2548 10 57 16.7157 57 25Z M31 10C31 10 31.5 10.5 32.5 10.5C33.5 10.5 34 10 34 10L34.8083 20.5074C34.9117 21.8519 33.8486 23 32.5 23C31.1514 23 30.0883 21.8519 30.1917 20.5074L31 10Z M36 6.5C36 8.433 34.433 10 32.5 10C30.567 10 29 8.433 29 6.5C29 4.567 30.567 3 32.5 3C34.433 3 36 4.567 36 6.5Z M35 28.5C35 29.8807 33.8807 31 32.5 31C31.1193 31 30 29.8807 30 28.5C30 27.1193 31.1193 26 32.5 26C33.8807 26 35 27.1193 35 28.5Z"}},
{ id:'Wash Basin', shape :{ type: 'Path', data:'M1 9C1 4.58172 4.58172 1 9 1H57C61.4183 1 65 4.58172 65 9V41C65 45.4183 61.4183 49 57 49H9C4.58172 49 1 45.4183 1 41V9Z M7 13C7 10.7909 8.79086 9 11 9H55C57.2091 9 59 10.7909 59 13V37C59 39.2091 57.2091 41 55 41H11C8.79086 41 7 39.2091 7 37V13Z M35 25.5C35 26.8807 33.8807 28 32.5 28C31.1193 28 30 26.8807 30 25.5C30 24.1193 31.1193 23 32.5 23C33.8807 23 35 24.1193 35 25.5Z M31.7433 9.05588C31.7433 9.05588 32.3556 9.40943 33.3216 9.15061C34.2875 8.89179 34.641 8.27942 34.641 8.27942L38.1413 18.2196C38.5892 19.4916 37.8594 20.8757 36.5568 21.2247C35.2542 21.5737 33.9302 20.7399 33.6821 19.4144L31.7433 9.05588Z M35.6673 4.38071C36.1676 6.24784 35.0596 8.16702 33.1925 8.66732C31.3253 9.16762 29.4062 8.05958 28.9059 6.19245C28.4056 4.32532 29.5136 2.40614 31.3807 1.90584C33.2479 1.40554 35.1671 2.51358 35.6673 4.38071Z'}},
{ id:'Bath Tub',style:{fill:'red'} ,shape :{ type: 'Path', data:"M1 9C1 4.58172 4.58172 1 9 1H84C88.4183 1 92 4.58172 92 9V40C92 44.4183 88.4183 48 84 48H9C4.58172 48 1 44.4183 1 40V9Z M12 24.5C12 14.2827 20.2827 6 30.5 6H61.5C71.7173 6 80 14.2827 80 24.5C80 34.7173 71.7173 43 61.5 43H30.5C20.2827 43 12 34.7173 12 24.5Z M11.5 26.5C11.5 26.5 12 26 12 25C12 24 11.5 23.5 11.5 23.5L22.0074 22.6917C23.3519 22.5883 24.5 23.6514 24.5 25C24.5 26.3486 23.3519 27.4117 22.0074 27.3083L11.5 26.5Z M8 21.5C9.933 21.5 11.5 23.067 11.5 25C11.5 26.933 9.933 28.5 8 28.5C6.067 28.5 4.5 26.933 4.5 25C4.5 23.067 6.067 21.5 8 21.5Z"}}
]  

//Initializes the symbol palette
var palette = new ej.diagrams.SymbolPalette({
expandMode: 'Multiple' ,
enableSearch: true , iconCss: 'e-search-icon',
palettes: [
    { id: 'door', expanded: true, symbols: doors, iconCss: 'e-ddb-icons e-flow', title: 'Doors' },
    { id: 'diningRoom', expanded: true, symbols: diningRoom, iconCss: 'e-ddb-icons e-flow', title: 'Dining Room' },
    { id:'storageUnit', expanded: true, symbols: kitchen, iconCss: 'e-ddb-icons e-flow', title: 'Kitchen'},
    { id: 'bedRoom', expanded: true, symbols: bedRoom, iconCss: 'e-ddb-icons e-flow', title: 'Bed Room' },
    { id: 'livingRoom', expanded: true, symbols: livingRoom, iconCss: 'e-ddb-icons e-flow', title: 'Living Room' },
    { id: 'bathRoom', expanded: true, symbols: bathRoom, iconCss: 'e-ddb-icons e-flow', title: 'Bath Room' },
],
    width: '100%', height: '700px', symbolHeight: 60, symbolWidth: 60,
    getNodeDefaults: function (symbol) {
        if (symbol.id === 'terminator' || symbol.id === 'process') {
            symbol.width = 80;
            symbol.height = 40;
        }
        else if (symbol.id === 'decision' || symbol.id === 'document' || symbol.id === 'preDefinedProcess' ||
            symbol.id === 'paperTap' || symbol.id === 'directData' || symbol.id === 'multiDocument' || symbol.id === 'data') {
            symbol.width = 50;
            symbol.height = 40;
        }
        else {
            symbol.width = 50;
            symbol.height = 50;
        }
        symbol.style.strokeColor = 'red';
        symbol.style.fill = 'green';
        
    },
    symbolMargin: { left: 15, right: 15, top: 15, bottom: 15 },
    getSymbolInfo: function (symbol) {
        return { fit: true };
    }
});
palette.appendTo('#symbolpalette');

