
ej.diagrams.Diagram.Inject(ej.diagrams.BpmnDiagrams, ej.diagrams.UndoRedo, ej.diagrams.DiagramContextMenu);
ej.diagrams.SymbolPalette.Inject(ej.diagrams.BpmnDiagrams);
var selectedItem; 
var diagramEvents = new DiagramClientSideEvents();
var dropDownDataSources = new DropDownDataSources();
var propertyChange = new PropertyChange();
var utilityMethods = new UtilityMethods();
window.onload = function ()
{
  diagram = document.getElementById("diagram").ej2_instances[0];
  // document.getElementById('btnHideToolbar').onclick = hideMenuBar.bind(this);
  document.onmouseover = menumouseover.bind(this);
  hyperlinkDialog = document.getElementById("hyperlinkDialog").ej2_instances[0];
 ddlTextPosition = document.getElementById("ddlTextPosition").ej2_instances[0];
//  defaultUpload = document.getElementById('defaultfileupload').ej2_instances[0];
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

var PrintSettings = (function () {
  function PrintSettings() {
      this.m_region = 'PageSettings';
      this.m_pageWidth = 0;
      this.m_pageHeight = 0;
      this.m_isPortrait = true;
      this.m_isLandscape = false;
      this.m_multiplePage = false;
      this.m_paperSize = 'Letter';
  }
  Object.defineProperty(PrintSettings.prototype, "region", {
      get: function () {
          return this.m_region;
      },
      set: function (region) {
          this.m_region = region;
      },
      enumerable: true,
      configurable: true
  });
  Object.defineProperty(PrintSettings.prototype, "pageWidth", {
      get: function () {
          return this.m_pageWidth;
      },
      set: function (pageWidth) {
          this.m_pageWidth = pageWidth;
      },
      enumerable: true,
      configurable: true
  });
  Object.defineProperty(PrintSettings.prototype, "pageHeight", {
      get: function () {
          return this.m_pageHeight;
      },
      set: function (pageHeight) {
          this.m_pageHeight = pageHeight;
      },
      enumerable: true,
      configurable: true
  });
  Object.defineProperty(PrintSettings.prototype, "isPortrait", {
      get: function () {
          return this.m_isPortrait;
      },
      set: function (isPortrait) {
          this.m_isPortrait = isPortrait;
      },
      enumerable: true,
      configurable: true
  });
  Object.defineProperty(PrintSettings.prototype, "isLandscape", {
      get: function () {
          return this.m_isLandscape;
      },
      set: function (isLandscape) {
          this.m_isLandscape = isLandscape;
      },
      enumerable: true,
      configurable: true
  });
  Object.defineProperty(PrintSettings.prototype, "multiplePage", {
      get: function () {
          return this.m_multiplePage;
      },
      set: function (multiplePage) {
          this.m_multiplePage = multiplePage;
      },
      enumerable: true,
      configurable: true
  });
  Object.defineProperty(PrintSettings.prototype, "paperSize", {
      get: function () {
          return this.m_paperSize;
      },
      set: function (paperSize) {
          this.m_paperSize = paperSize;
          document.getElementById('printCustomSize').style.display = 'none';
          document.getElementById('printOrientation').style.display = 'none';
          if (paperSize === 'Custom') {
              document.getElementById('printCustomSize').style.display = '';
          }
          else {
              document.getElementById('printOrientation').style.display = '';
          }
      },
      enumerable: true,
      configurable: true
  });
  return PrintSettings;
}());

var printSettings = new PrintSettings();


var OrgDataSettings = (function () {
  function OrgDataSettings() {
      this.dataSourceColumns = [];
      this.id = '';
      this.parent = '';
      this.nameField = '';
      this.bindingFields = [];
      this.imageField = '';
      this.additionalFields = [];
      this.fileformat = '';
      this.extensionType = '.csv';
      this.buttonContent = 'Download Example CSV';
  }
  return OrgDataSettings;
}());
var orgDataSettings = new OrgDataSettings();
 
var OrgChartUtilityMethods = (function () {
  function OrgChartUtilityMethods() {
    
  }
  OrgChartUtilityMethods.readFile = function (event) {
    this.orgChart = new OrgChartData(this.selectedItem);
    this.columnsList = [];
    var resultString = event.target.result.toString();
    if (this.fileType === 'csv') {
        this.orgDataSource = OrgChartUtilityMethods.convertCsvToJson(resultString);
    }
    else if (this.fileType === 'json') {
        this.orgDataSource = JSON.parse(resultString);
        for (var i = 0; i < this.orgDataSource.length; i++) {
            var attr = this.orgDataSource[i];
            for (var prop in attr) {
                if (this.columnsList.indexOf(prop) === -1) {
                    this.columnsList.push(prop);
                }
            }
        }
    }
    else {
        var parser = new DOMParser();
        var xmlDom = parser.parseFromString(resultString, 'text/xml');
        var element = xmlDom.children[0];
        this.orgDataSource = this.convertXmlToJson(element);
    }
    var columns = this.getDataSourceColumns();
    //this.selectedItem.orgDataSettings.dataSourceColumns = columns;
    document.getElementById("employeeId").ej2_instances[0].dataSource = columns;
    document.getElementById("superVisorId").ej2_instances[0].dataSource = columns;
    document.getElementById("orgNameField").ej2_instances[0].dataSource = columns;
    document.getElementById("orgBindingFields").ej2_instances[0].dataSource = columns;
    document.getElementById("orgImageField").ej2_instances[0].dataSource = columns;
    document.getElementById("orgAdditionalField").ej2_instances[0].dataSource = columns;
};
OrgChartUtilityMethods.getDataSourceColumns = function () {
  var columns = [];
  for (var i = 0; i < this.columnsList.length; i++) {
      if (this.columnsList[i]) {
          columns.push({
              'text': this.columnsList[i], 'value': this.columnsList[i]
          });
      }
  }
  return columns;
};
OrgChartUtilityMethods.convertCsvToJson = function (csvText) {
  var allTextLines = csvText.split(/\r\n|\n/);
  this.columnsList = allTextLines[0].split(',');
  var lines = [];
  for (var i = 1; i < allTextLines.length; i++) {
      if (allTextLines[i]) {
          var data = allTextLines[i].split(',');
          //if (data.length === headers.length) {
          var tarr = {};
          for (var j = 0; j < this.columnsList.length; j++) {
              if (data[j].trim().startsWith('"') && !data[j].trim().endsWith('"')) {
                  while (!data[j].trim().endsWith('"')) {
                      data[j] = data[j] + ',' + data[j + 1];
                      data.splice(j + 1, 1);
                  }
              }
              tarr[this.columnsList[j]] = data[j];
          }
          lines.push(tarr);
          //}
      }
  }
  return lines;
};
OrgChartUtilityMethods.convertXmlToJson = function (element) {
  var dataSource = [];
  for (var i = 0; i < element.children.length; i++) {
      var childElement = element.children[i];
      var rowData = this.generateRowData(childElement, dataSource.length.toString());
      if (Object.keys(rowData).length > 0) {
          dataSource.push(rowData);
      }
      if (childElement.children.length > 0) {
          var key = 'id';
          this.convertChildXmlToJson(childElement, rowData[key].toString(), dataSource);
      }
  }
  return dataSource;
};
OrgChartUtilityMethods.convertChildXmlToJson = function (element, parentId, dataSource) {
  for (var i = 0; i < element.children.length; i++) {
      var childElement = element.children[i];
      var rowData = this.generateRowData(childElement, dataSource.length.toString(), parentId.toString());
      if (Object.keys(rowData).length > 0) {
          dataSource.push(rowData);
      }
      if (childElement.children.length > 0) {
          var key = 'id';
          this.convertChildXmlToJson(childElement, rowData[key].toString(), dataSource);
      }
  }
};
OrgChartUtilityMethods.generateRowData = function (element, id, parentId) {
  var rowData = {};
  for (var i = 0; i < element.attributes.length; i++) {
      var attr = element.attributes[i];
      rowData[attr.name] = attr.value;
      if (this.columnsList.indexOf(attr.name) === -1) {
          this.columnsList.push(attr.name);
      }
  }
  var key = 'id';
  rowData[key] = id;
  if (parentId) {
      key = 'parentId';
      rowData[key] = parentId;
  }
  return rowData;
};
OrgChartUtilityMethods.columnsList = [];
OrgChartUtilityMethods.orgDataSource = [];
OrgChartUtilityMethods.subTreeOrientation = 'Vertical';
OrgChartUtilityMethods.subTreeAlignments = 'Alternate';
OrgChartUtilityMethods.shortCutkeys = [
  { 'key': 'Tab', 'value': 'Add a child to parent' },
  { 'key': 'Enter', 'value': 'Add a child to same level' },
  { 'key': 'Shift + Tab', 'value': 'Move the child parent to next level' },
  { 'key': 'Delete', 'value': 'Delete a child' },
  { 'key': 'Spacebar', 'value': 'Expand/Collapse a shape' },
  { 'key': 'F2', 'value': 'Edit a shape' },
  { 'key': 'Esc', 'value': 'End Editing' },
  { 'key': 'Arrow(Up, Down, Left, Right)', 'value': 'Navigate between child' },
];
  return OrgChartUtilityMethods;
})


function textPositionChange (args) {
    if (args.value !== null) {
      PropertyChange.prototype.textPropertiesChange('textPosition', args.value);
    }
};
 function toolbarTextStyleChange (args) {
  PropertyChange.prototype.textPropertiesChange(args.item.tooltipText, false);
};
 function toolbarTextSubAlignChange (args) {
    var propertyName = args.item.tooltipText.replace(/[' ']/g, '');
    PropertyChange.prototype.textPropertiesChange(propertyName, propertyName);
};
 function toolbarTextAlignChange (args) {
    var propertyName = args.item.tooltipText.replace('Align ', '');
    PropertyChange.prototype.textPropertiesChange(propertyName, propertyName);
};
 //method for rename the diagram
function renameDiagram(args) {
  document.getElementsByClassName('db-diagram-name-container')[0].classList.add('db-edit-name');
  var element = document.getElementById('diagramEditable');
  element.value = document.getElementById('diagramName').innerHTML;
  element.focus();
  element.select();
}

function diagramNameKeyDown(args) {
  if (args.which === 13) {
      document.getElementById('diagramName').innerHTML = document.getElementById('diagramEditable').value;
      document.getElementsByClassName('db-diagram-name-container')[0].classList.remove('db-edit-name');
  }
}

function diagramNameChange(args) {
  document.getElementById('diagramName').innerHTML = document.getElementById('diagramEditable').value;
  document.getElementsByClassName('db-diagram-name-container')[0].classList.remove('db-edit-name');
  document.getElementById("exportfileName").value = document.getElementById('diagramName').innerHTML;
}

  var connectors = [{
    id: "connector1",
    style: {
    strokeWidth: 5
  },
    sourcePoint: {
        x: 20,
        y: 10
    },
    targetPoint: {
        x: 80,
        y: 10
    },
    targetDecorator: {
      shape: 'none',
    }
  },
  {
    id: "connector2",
    style: {
    strokeWidth: 5
  },
    sourcePoint: {
        x: 160,
        y: 10
    },
    targetPoint: {
        x: 240,
        y: 10
    },
    targetDecorator: {
      shape: 'none',
    }
  },
  {
    id: "connector3",
    style: {
    strokeWidth: 5
  },
    sourcePoint: {
        x: 20,
        y: 10
    },
    targetPoint: {
        x: 20,
        y: 80
    },
    targetDecorator: {
      shape: 'none',
    }
  },
  {
    id: "connector4",
    style: {
    strokeWidth: 5
  },
    sourcePoint: {
        x: 240,
        y: 10
    },
    targetPoint: {
      x: 240,
      y: 200
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
        x: 20,
        y: 200
    },
    targetPoint: {
        x: 155,
        y: 200
    },
    targetDecorator: {
      shape: 'none',
    }
  },
  // {
  //   id: "connector6",
  //   style: {
  //   strokeWidth: 4
  // },
  //   sourcePoint: {
  //       x: 140,
  //       y: 200
  //   },
  //   targetPoint: {
  //       x: 187,
  //       y: 200
  //   },
  //   targetDecorator: {
  //     shape: 'none',
  //   }
  // },
  {
    id: "connector7",
    style: {
    strokeWidth: 4
  },
    sourcePoint: {
        x: 185,
        y: 280
    },
    targetPoint: {
        x: 185,
        y: 350
    },
    targetDecorator: {
      shape: 'none',
    }
  },
  {
    id: "connector34",
    style: {
    strokeWidth: 4
  },
    sourcePoint: {
        x: 20,
        y: 350
    },
    targetPoint: {
        x: 155,
        y: 350
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
        x: 185,
        y: 200
    },
    targetPoint: {
        x: 185,
        y: 280
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
        x: 100,
        y: 280
    },
    targetPoint: {
        x: 185,
        y: 280
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
        x: 20,
        y: 200
    },
    targetPoint: {
        x: 20,
        y: 280
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
        x: 20,
        y: 280
    },
    targetPoint: {
        x:185,
        y: 280
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
        x: 20,
        y: 280
    },
    targetPoint: {
        x: 20,
        y: 370
    },
    targetDecorator: {
      shape: 'none',
    }
  },
  {
    id: "connector36",
    style: {
    strokeWidth: 4
  },
    sourcePoint: {
      x: 20,
      y: 420
    },
    targetPoint: {
        x: 20,
        y: 480
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
        x: 20,
        y: 480
    },
    targetPoint: {
        x: 80,
        y: 480
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
        x: 160,
        y: 480
    },
    targetPoint: {
        x: 240,
        y: 480
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
        x: 240,
        y: 280
    },
    targetPoint: {
        x: 240,
        y: 540
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
        x: 240,
        y: 400
    },
    targetPoint: {
        x: 280,
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
        x: 360,
        y: 400
    },
    targetPoint: {
        x: 440,
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
        x: 540,
        y: 400
    },
    targetPoint: {
        x: 580,
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
        x: 580,
        y: 540
    },
    targetPoint: {
        x: 580,
        y: 280
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
        x: 500,
        y: 10
    },
    targetPoint: {
        x: 860,
        y: 10
    },
    targetDecorator: {
      shape: 'none',
    }
  },
  {
    id: "connector21",
    style: {
    strokeWidth: 4
  },
    sourcePoint: {
        x: 500,
        y: 10
    },
    targetPoint: {
        x: 500,
        y: 140
    },
    targetDecorator: {
      shape: 'none',
    }
  },
  // {
  //   id: "connector22",
  //   style: {
  //   strokeWidth: 4
  // },
  //   sourcePoint: {
  //       x: 240,
  //       y: 80
  //   },
  //   targetPoint: {
  //       x: 500,
  //       y: 80
  //   },
  //   targetDecorator: {
  //     shape: 'none',
  //   }
  // },
  // {
  //   id: "connector23",
  //   style: {
  //   strokeWidth: 4
  // },
  //   sourcePoint: {
  //       x: 580,
  //       y:400
  //   },
  //   targetPoint: {
  //       x: 580,
  //       y: 480
  //   },
  //   targetDecorator: {
  //     shape: 'none',
  //   }
  // },
  {
    id: "connector24",
    style: {
    strokeWidth: 4
  },
    sourcePoint: {
        x: 580,
        y:480
    },
    targetPoint: {
        x: 700,
        y: 480
    },
    targetDecorator: {
      shape: 'none',
    }
  },
  {
    id: "connector25",
    style: {
    strokeWidth: 4
  },
    sourcePoint: {
        x: 780,
        y:480
    },
    targetPoint: {
        x: 860,
        y: 480
    },
    targetDecorator: {
      shape: 'none',
    }
  },
  {
    id: "connector26",
    style: {
    strokeWidth: 4
  },
    sourcePoint: {
        x: 860,
        y:480
    },
    targetPoint: {
        x: 860,
        y: 10
    },
    targetDecorator: {
      shape: 'none',
    }
  },
  {
    id: "connector27",
    style: {
    strokeWidth: 4
  },
    sourcePoint: {
        x: 780,
        y:10
    },
    targetPoint: {
        x: 780,
        y: 100
    },
    targetDecorator: {
      shape: 'none',
    }
  },
  {
    id: "connector28",
    style: {
    strokeWidth: 4
  },
    sourcePoint: {
        x: 630,
        y:280
    },
    targetPoint: {
        x: 830,
        y: 280
    },
    targetDecorator: {
      shape: 'none',
    }
  },
  {
    id: "connector29",
    style: {
    strokeWidth: 4
  },
    sourcePoint: {
        x: 660,
        y:150
    },
    targetPoint: {
        x: 860,
        y: 150
    },
    targetDecorator: {
      shape: 'none',
    }
  },
  {
    id: "connector30",
    style: {
    strokeWidth: 4
  },
    sourcePoint: {
        x: 760,
        y:150
    },
    targetPoint: {
        x: 760,
        y: 280
    },
    targetDecorator: {
      shape: 'none',
    }
  },
  // {
  //   id: "connector31",
  //   style: {
  //   strokeWidth: 4
  // },
  //   sourcePoint: {
  //       x: 240,
  //       y:480
  //   },
  //   targetPoint: {
  //       x: 240,
  //       y: 560
  //   },
  //   targetDecorator: {
  //     shape: 'none',
  //   }
  // },
  {
    id: "connector32",
    style: {
    strokeWidth: 4
  },
    sourcePoint: {
        x: 240,
        y:540
    },
    targetPoint: {
        x: 580,
        y: 540
    },
    targetDecorator: {
      shape: 'none',
    }
  },
  // {
  //   id: "connector33",
  //   style: {
  //   strokeWidth: 4
  // },
  //   sourcePoint: {
  //       x: 640,
  //       y:480
  //   },
  //   targetPoint: {
  //       x: 640,
  //       y: 540
  //   },
  //   targetDecorator: {
  //     shape: 'none',
  //   }
  // },
  {
    id: "connector35",
    style: {
    strokeWidth: 4
  },
    sourcePoint: {
        x: 20,
        y:140
    },
    targetPoint: {
        x: 20,
        y: 200
    },
    targetDecorator: {
      shape: 'none',
    }
  },
  {
    id: "connector37",
    style: {
    strokeWidth: 4
  },
    sourcePoint: {
        x: 660,
        y:150
    },
    targetPoint: {
        x: 660,
        y: 250
    },
    targetDecorator: {
      shape: 'none',
    }
  },
  ]

var nodes =[
  {
    id :'room1window',
    offsetX: 118,
    offsetY: 10,
    // Size of the node
    width: 87,
    height: 4,
    shape:{ type : 'Path', data:'M22 5.5L124 5.50001M145 9L128 9V1L145 1V9ZM1 1L18 1L18 9L1 9L1 1ZM128 8L124 8V2L128 2V8ZM18 2L22 2L22 8L18 8L18 2Z'}
  },
  {
    id :'room1window2',
    offsetX: 20,
    offsetY: 110,
    // Size of the node
    width: 59,
    height: 4,
    rotateAngle:90,
    shape:{ type : 'Path', data:'M22 5.5L124 5.50001M145 9L128 9V1L145 1V9ZM1 1L18 1L18 9L1 9L1 1ZM128 8L124 8V2L128 2V8ZM18 2L22 2L22 8L18 8L18 2Z'}
  },
  {
    id :'node2',
    offsetX: 212,
    offsetY: 181,
    // Size of the node
    width: 51,
    height: 38,
    shape:{ type : 'Path', data:'M1 71L1 79L72 79V71M1 71L72 71M1 71C1 32.3401 32.3401 1 71 1H72V71'}
  },
  {
    id :'room1Bed',
    offsetX: 71,
    offsetY: 103,
    // Size of the node
    width: 68,
    height: 87,
    rotateAngle:-90,
    shape:{ type : 'Path', data:'M1 54V2C1 1.44772 1.44772 1 2 1H44C44.5523 1 45 1.44771 45 2V54C45 54.5523 44.5523 55 44 55H2C1.44772 55 1 54.5523 1 54Z M7.57446 14.4176C8.01615 12.4296 7.72961 10.0298 7.34925 8.31942C7.20247 7.65937 7.68924 7 8.36541 7H19.6515C20.3227 7 20.8097 7.6496 20.6533 8.3023C20.4282 9.24153 20.1765 10.5125 20.1765 11.5C20.1765 12.4875 20.4282 13.7585 20.6533 14.6977C20.8097 15.3504 20.3227 16 19.6515 16H8.68924C7.9291 16 7.4096 15.1596 7.57446 14.4176Z M25.5745 14.4176C26.0161 12.4296 25.7296 10.0298 25.3493 8.31942C25.2025 7.65937 25.6892 7 26.3654 7H37.6515C38.3227 7 38.8097 7.6496 38.6533 8.3023C38.4282 9.24153 38.1765 10.5125 38.1765 11.5C38.1765 12.4875 38.4282 13.7585 38.6533 14.6977C38.8097 15.3504 38.3227 16 37.6515 16H26.6892C25.9291 16 25.4096 15.1596 25.5745 14.4176Z M45 53V27.695C41.8333 26.4298 34.1 24.6584 28.5 27.695C22.9 30.7316 16.5 25.5863 14 22.6341C10.1667 18.2057 2.2 13.0182 1 27.6951V53H45Z M1 54V2C1 1.44772 1.44772 1 2 1H44C44.5523 1 45 1.44771 45 2V54C45 54.5523 44.5523 55 44 55H2C1.44772 55 1 54.5523 1 54Z M7.57446 14.4176C8.01615 12.4296 7.72961 10.0298 7.34925 8.31942C7.20247 7.65937 7.68924 7 8.36541 7H19.6515C20.3227 7 20.8097 7.6496 20.6533 8.3023C20.4282 9.24153 20.1765 10.5125 20.1765 11.5C20.1765 12.4875 20.4282 13.7585 20.6533 14.6977C20.8097 15.3504 20.3227 16 19.6515 16H8.68924C7.9291 16 7.4096 15.1596 7.57446 14.4176Z M25.5745 14.4176C26.0161 12.4296 25.7296 10.0298 25.3493 8.31942C25.2025 7.65937 25.6892 7 26.3654 7H37.6515C38.3227 7 38.8097 7.6496 38.6533 8.3023C38.4282 9.24153 38.1765 10.5125 38.1765 11.5C38.1765 12.4875 38.4282 13.7585 38.6533 14.6977C38.8097 15.3504 38.3227 16 37.6515 16H26.6892C25.9291 16 25.4096 15.1596 25.5745 14.4176Z M25.5745 14.4176C26.0161 12.4296 25.7296 10.0298 25.3493 8.31942C25.2025 7.65937 25.6892 7 26.3654 7H37.6515C38.3227 7 38.8097 7.6496 38.6533 8.3023C38.4282 9.24153 38.1765 10.5125 38.1765 11.5C38.1765 12.4875 38.4282 13.7585 38.6533 14.6977C38.8097 15.3504 38.3227 16 37.6515 16H26.6892C25.9291 16 25.4096 15.1596 25.5745 14.4176Z'}
  },
  {
    id :'room1Table',
    offsetX: 41,
    offsetY: 166,
    // Size of the node
    width: 26,
    height: 28,
    shape:{ type : 'Path', data:'M79 1H3C1.89543 1 1 1.89543 1 3V49C1 50.1046 1.89543 51 3 51H79C80.1046 51 81 50.1046 81 49V3C81 1.89543 80.1046 1 79 1Z'}
  },
  {
    id :'room1PotTable',
    offsetX: 41,
    offsetY: 40,
    // Size of the node
    width: 30,
    height: 30,
    shape:{ type : 'Path', data:"M57 29C57 44.464 44.464 57 29 57C13.536 57 1 44.464 1 29C1 13.536 13.536 1 29 1C44.464 1 57 13.536 57 29Z"}
  },
  {
    id :'room1FlowerPot',
    offsetX: 41,
    offsetY: 40,
    // Size of the node
    width: 25,
    height: 25,
    shape:{ type : 'Path', data:'M25.9813 23.5141C27.2901 23.5993 48.6838 19.0468 41.4746 10.8333C36.916 5.63963 21.1089 23.1968 25.9813 23.5141Z M23.6253 25.9234C23.1736 27.1547 21.4942 48.9629 31.4103 44.3689C37.6806 41.464 25.3067 21.3392 23.6253 25.9234Z M25.5989 25.6003C26.3978 26.6405 43.9262 39.7237 45.3483 28.888C46.2474 22.0363 22.6249 21.7278 25.5989 25.6003Z M24.7197 20.7567C25.6675 19.8502 36.7808 1.01108 25.8549 0.76778C18.9461 0.613932 21.191 24.1316 24.7197 20.7567Z M20.8885 22.8171C19.6966 22.2698 -1.91128 18.8763 1.88665 29.1238C4.2882 35.6035 25.3258 24.8547 20.8885 22.8171Z M21.6607 25.6193C20.3938 25.9588 1.59406 37.1385 11.0585 42.6028C17.0432 46.0581 26.3771 24.3556 21.6607 25.6193Z M22.3667 20.2554C21.8975 19.0306 8.82513 1.49408 4.37366 11.475C1.55885 17.7863 24.1136 24.815 22.3667 20.2554Z M40.0382 18.2498C40.7878 20.1543 41.1995 22.2289 41.1995 24.3996C41.1995 24.5507 41.1975 24.7013 41.1935 24.8515M35.2235 11.5507C33.6921 10.2594 31.9267 9.2368 30 8.55572M39 32.7159C37.5069 35.3317 35.3311 37.5074 32.7153 39.0004M24.8419 41.1939C24.6949 41.1977 24.5474 41.1996 24.3995 41.1996C21.7821 41.1996 19.3046 40.6011 17.0963 39.5334M10.7727 34.2278C9.9752 33.1239 9.30848 31.9193 8.79533 30.6367M7.70563 22.5004C7.89672 20.8019 8.34106 19.1801 9 17.6736M13.9123 11.274C16.1576 9.47777 18.8737 8.24563 21.846 7.79239M25.9813 23.5141C27.2901 23.5993 48.6838 19.0468 41.4746 10.8333C36.916 5.63963 21.1089 23.1968 25.9813 23.5141ZM23.6253 25.9234C23.1736 27.1547 21.4942 48.9629 31.4103 44.3689C37.6806 41.464 25.3067 21.3392 23.6253 25.9234ZM25.5989 25.6003C26.3978 26.6405 43.9262 39.7237 45.3483 28.888C46.2474 22.0363 22.6249 21.7278 25.5989 25.6003ZM24.7197 20.7567C25.6675 19.8502 36.7808 1.01108 25.8549 0.76778C18.9461 0.613932 21.191 24.1316 24.7197 20.7567ZM20.8885 22.8171C19.6966 22.2698 -1.91128 18.8763 1.88665 29.1238C4.2882 35.6035 25.3258 24.8547 20.8885 22.8171ZM21.6607 25.6193C20.3938 25.9588 1.59406 37.1385 11.0585 42.6028C17.0432 46.0581 26.3771 24.3556 21.6607 25.6193ZM22.3667 20.2554C21.8975 19.0306 8.82513 1.49408 4.37366 11.475C1.55885 17.7863 24.1136 24.815 22.3667 20.2554Z'}
  },
  {
    id :'room1Bookcase',
    offsetX: 224,
    offsetY: 45,
    // Size of the node
    width: 63,
    height: 22,
    rotateAngle:-90,
    shape:{ type : 'Path', data:'M113 9V1H1V9M113 9H1M113 9V29H1V9M4 12H11V25H4V12ZM13 12H20V25H13V12ZM22 12H29V25H22V12ZM31 12H38V25H31V12ZM40 12H47V25H40V12ZM49 12H56V25H49V12ZM58 12H65V25H58V12ZM67 12H74V25H67V12ZM76 12H83V25H76V12ZM85 12H92V25H85V12ZM94 12H101V25H94V12ZM103 12H110V25H103V12Z'}
  },
  {
    id :'room1WorkTable',
    offsetX: 215,
    offsetY: 118,
    // Size of the node
    width: 43,
    height: 37,
    rotateAngle:90,
    shape:{ type : 'Path', data:"M4 5C4 4.44772 4.44772 4 5 4H83C83.5523 4 84 4.44772 84 5V53C84 53.5523 83.5523 54 83 54H5C4.44772 54 4 53.5523 4 53V5Z M4 6.5C4 6.77614 3.77462 7.00425 3.50231 6.95843C3.08607 6.88841 2.68736 6.73099 2.33329 6.49441C1.83994 6.16477 1.45543 5.69623 1.22836 5.14805C1.0013 4.59987 0.94189 3.99667 1.05765 3.41473C1.1734 2.83279 1.45912 2.29824 1.87868 1.87868C2.29824 1.45912 2.83279 1.1734 3.41473 1.05765C3.99667 0.94189 4.59987 1.0013 5.14805 1.22836C5.69623 1.45543 6.16477 1.83994 6.49441 2.33329C6.73099 2.68736 6.88841 3.08607 6.95843 3.50231C7.00424 3.77462 6.77614 4 6.5 4L4.5 4C4.22386 4 4 4.22386 4 4.5L4 6.5Z M81.5 4C81.2239 4 80.9958 3.77462 81.0416 3.50231C81.1116 3.08607 81.269 2.68736 81.5056 2.33329C81.8352 1.83994 82.3038 1.45543 82.852 1.22836C83.4001 1.0013 84.0033 0.94189 84.5853 1.05765C85.1672 1.1734 85.7018 1.45912 86.1213 1.87868C86.5409 2.29824 86.8266 2.83279 86.9424 3.41473C87.0581 3.99667 86.9987 4.59987 86.7716 5.14805C86.5446 5.69623 86.1601 6.16477 85.6667 6.49441C85.3126 6.73099 84.9139 6.88841 84.4977 6.95843C84.2254 7.00424 84 6.77614 84 6.5V4.5C84 4.22386 83.7761 4 83.5 4L81.5 4Z M6.5 54C6.77614 54 7.00425 54.2254 6.95843 54.4977C6.88841 54.9139 6.73099 55.3126 6.49441 55.6667C6.16477 56.1601 5.69623 56.5446 5.14805 56.7716C4.59987 56.9987 3.99667 57.0581 3.41473 56.9424C2.83279 56.8266 2.29824 56.5409 1.87868 56.1213C1.45912 55.7018 1.1734 55.1672 1.05765 54.5853C0.94189 54.0033 1.0013 53.4001 1.22836 52.852C1.45543 52.3038 1.83994 51.8352 2.33329 51.5056C2.68736 51.269 3.08607 51.1116 3.50231 51.0416C3.77462 50.9958 4 51.2239 4 51.5V53.5C4 53.7761 4.22386 54 4.5 54H6.5Z M84 51.5C84 51.2239 84.2254 50.9958 84.4977 51.0416C84.9139 51.1116 85.3126 51.269 85.6667 51.5056C86.1601 51.8352 86.5446 52.3038 86.7716 52.852C86.9987 53.4001 87.0581 54.0033 86.9424 54.5853C86.8266 55.1672 86.5409 55.7018 86.1213 56.1213C85.7018 56.5409 85.1672 56.8266 84.5853 56.9424C84.0033 57.0581 83.4001 56.9987 82.852 56.7716C82.3038 56.5446 81.8352 56.1601 81.5056 55.6667C81.269 55.3126 81.1116 54.9139 81.0416 54.4977C80.9958 54.2254 81.2239 54 81.5 54H83.5C83.7761 54 84 53.7761 84 53.5V51.5Z"}
  },
  {
    id :'room1Laptop',
    offsetX: 215,
    offsetY: 118,
    // Size of the node
    width: 30,
    height: 30,
    rotateAngle:90,
    shape:{ type : 'Path', data:"M1.06567 5.71554C0.619244 3.26018 2.50554 1 5.00115 1H61.0006C63.4675 1 65.3464 3.21135 64.9481 5.64595L61.7571 25.146C61.4407 27.08 59.7695 28.5 57.8096 28.5H8.54661C6.61347 28.5 4.95694 27.1175 4.61113 25.2155L1.06567 5.71554Z M3.7083 33C3.7083 30.7909 5.49916 29 7.7083 29H58.7083C60.9174 29 62.7083 30.7909 62.7083 33V55C62.7083 57.2091 60.9174 59 58.7083 59H7.7083C5.49916 59 3.7083 57.2091 3.7083 55V33Z M26.7083 50C26.7083 49.4477 27.156 49 27.7083 49H38.7083C39.2606 49 39.7083 49.4477 39.7083 50V54C39.7083 54.5523 39.2606 55 38.7083 55H27.7083C27.156 55 26.7083 54.5523 26.7083 54V50Z M8.7083 35.5C8.7083 35.2239 8.93216 35 9.2083 35H12.2083C12.4844 35 12.7083 35.2239 12.7083 35.5V36.5C12.7083 36.7761 12.4844 37 12.2083 37H9.2083C8.93216 37 8.7083 36.7761 8.7083 36.5V35.5Z M8.7083 38.5C8.7083 38.2239 8.93216 38 9.2083 38H12.2083C12.4844 38 12.7083 38.2239 12.7083 38.5V39.5C12.7083 39.7761 12.4844 40 12.2083 40H9.2083C8.93216 40 8.7083 39.7761 8.7083 39.5V38.5Z M8.7083 41.5C8.7083 41.2239 8.93216 41 9.2083 41H12.2083C12.4844 41 12.7083 41.2239 12.7083 41.5V42.5C12.7083 42.7761 12.4844 43 12.2083 43H9.2083C8.93216 43 8.7083 42.7761 8.7083 42.5V41.5Z M8.7083 44.5C8.7083 44.2239 8.93216 44 9.2083 44H12.2083C12.4844 44 12.7083 44.2239 12.7083 44.5V45.5C12.7083 45.7761 12.4844 46 12.2083 46H9.2083C8.93216 46 8.7083 45.7761 8.7083 45.5V44.5Z M13.7083 35.5C13.7083 35.2239 13.9322 35 14.2083 35H17.2083C17.4844 35 17.7083 35.2239 17.7083 35.5V36.5C17.7083 36.7761 17.4844 37 17.2083 37H14.2083C13.9322 37 13.7083 36.7761 13.7083 36.5V35.5Z M13.7083 38.5C13.7083 38.2239 13.9322 38 14.2083 38H17.2083C17.4844 38 17.7083 38.2239 17.7083 38.5V39.5C17.7083 39.7761 17.4844 40 17.2083 40H14.2083C13.9322 40 13.7083 39.7761 13.7083 39.5V38.5Z M13.7083 41.5C13.7083 41.2239 13.9322 41 14.2083 41H17.2083C17.4844 41 17.7083 41.2239 17.7083 41.5V42.5C17.7083 42.7761 17.4844 43 17.2083 43H14.2083C13.9322 43 13.7083 42.7761 13.7083 42.5V41.5Z M13.7083 44.5C13.7083 44.2239 13.9322 44 14.2083 44H17.2083C17.4844 44 17.7083 44.2239 17.7083 44.5V45.5C17.7083 45.7761 17.4844 46 17.2083 46H14.2083C13.9322 46 13.7083 45.7761 13.7083 45.5V44.5Z M18.7083 35.5C18.7083 35.2239 18.9322 35 19.2083 35H22.2083C22.4844 35 22.7083 35.2239 22.7083 35.5V36.5C22.7083 36.7761 22.4844 37 22.2083 37H19.2083C18.9322 37 18.7083 36.7761 18.7083 36.5V35.5Z M18.7083 38.5C18.7083 38.2239 18.9322 38 19.2083 38H22.2083C22.4844 38 22.7083 38.2239 22.7083 38.5V39.5C22.7083 39.7761 22.4844 40 22.2083 40H19.2083C18.9322 40 18.7083 39.7761 18.7083 39.5V38.5Z M18.7083 41.5C18.7083 41.2239 18.9322 41 19.2083 41H22.2083C22.4844 41 22.7083 41.2239 22.7083 41.5V42.5C22.7083 42.7761 22.4844 43 22.2083 43H19.2083C18.9322 43 18.7083 42.7761 18.7083 42.5V41.5Z M18.7083 44.5C18.7083 44.2239 18.9322 44 19.2083 44H22.2083C22.4844 44 22.7083 44.2239 22.7083 44.5V45.5C22.7083 45.7761 22.4844 46 22.2083 46H19.2083C18.9322 46 18.7083 45.7761 18.7083 45.5V44.5Z M23.7083 35.5C23.7083 35.2239 23.9322 35 24.2083 35H27.2083C27.4844 35 27.7083 35.2239 27.7083 35.5V36.5C27.7083 36.7761 27.4844 37 27.2083 37H24.2083C23.9322 37 23.7083 36.7761 23.7083 36.5V35.5Z M23.7083 38.5C23.7083 38.2239 23.9322 38 24.2083 38H27.2083C27.4844 38 27.7083 38.2239 27.7083 38.5V39.5C27.7083 39.7761 27.4844 40 27.2083 40H24.2083C23.9322 40 23.7083 39.7761 23.7083 39.5V38.5Z M23.7083 41.5C23.7083 41.2239 23.9322 41 24.2083 41H27.2083C27.4844 41 27.7083 41.2239 27.7083 41.5V42.5C27.7083 42.7761 27.4844 43 27.2083 43H24.2083C23.9322 43 23.7083 42.7761 23.7083 42.5V41.5Z M23.7083 44.5C23.7083 44.2239 23.9322 44 24.2083 44H42.2083C42.4844 44 42.7083 44.2239 42.7083 44.5V45.5C42.7083 45.7761 42.4844 46 42.2083 46H24.2083C23.9322 46 23.7083 45.7761 23.7083 45.5V44.5Z M28.7083 35.5C28.7083 35.2239 28.9322 35 29.2083 35H32.2083C32.4844 35 32.7083 35.2239 32.7083 35.5V36.5C32.7083 36.7761 32.4844 37 32.2083 37H29.2083C28.9322 37 28.7083 36.7761 28.7083 36.5V35.5Z M28.7083 38.5C28.7083 38.2239 28.9322 38 29.2083 38H32.2083C32.4844 38 32.7083 38.2239 32.7083 38.5V39.5C32.7083 39.7761 32.4844 40 32.2083 40H29.2083C28.9322 40 28.7083 39.7761 28.7083 39.5V38.5Z M28.7083 41.5C28.7083 41.2239 28.9322 41 29.2083 41H32.2083C32.4844 41 32.7083 41.2239 32.7083 41.5V42.5C32.7083 42.7761 32.4844 43 32.2083 43H29.2083C28.9322 43 28.7083 42.7761 28.7083 42.5V41.5Z M33.7083 35.5C33.7083 35.2239 33.9322 35 34.2083 35H37.2083C37.4844 35 37.7083 35.2239 37.7083 35.5V36.5C37.7083 36.7761 37.4844 37 37.2083 37H34.2083C33.9322 37 33.7083 36.7761 33.7083 36.5V35.5Z M33.7083 38.5C33.7083 38.2239 33.9322 38 34.2083 38H37.2083C37.4844 38 37.7083 38.2239 37.7083 38.5V39.5C37.7083 39.7761 37.4844 40 37.2083 40H34.2083C33.9322 40 33.7083 39.7761 33.7083 39.5V38.5Z M33.7083 41.5C33.7083 41.2239 33.9322 41 34.2083 41H37.2083C37.4844 41 37.7083 41.2239 37.7083 41.5V42.5C37.7083 42.7761 37.4844 43 37.2083 43H34.2083C33.9322 43 33.7083 42.7761 33.7083 42.5V41.5Z M38.7083 35.5C38.7083 35.2239 38.9322 35 39.2083 35H42.2083C42.4844 35 42.7083 35.2239 42.7083 35.5V36.5C42.7083 36.7761 42.4844 37 42.2083 37H39.2083C38.9322 37 38.7083 36.7761 38.7083 36.5V35.5Z M38.7083 38.5C38.7083 38.2239 38.9322 38 39.2083 38H42.2083C42.4844 38 42.7083 38.2239 42.7083 38.5V39.5C42.7083 39.7761 42.4844 40 42.2083 40H39.2083C38.9322 40 38.7083 39.7761 38.7083 39.5V38.5Z M38.7083 41.5C38.7083 41.2239 38.9322 41 39.2083 41H42.2083C42.4844 41 42.7083 41.2239 42.7083 41.5V42.5C42.7083 42.7761 42.4844 43 42.2083 43H39.2083C38.9322 43 38.7083 42.7761 38.7083 42.5V41.5Z M43.7083 35.5C43.7083 35.2239 43.9322 35 44.2083 35H47.2083C47.4844 35 47.7083 35.2239 47.7083 35.5V36.5C47.7083 36.7761 47.4844 37 47.2083 37H44.2083C43.9322 37 43.7083 36.7761 43.7083 36.5V35.5Z M43.7083 38.5C43.7083 38.2239 43.9322 38 44.2083 38H47.2083C47.4844 38 47.7083 38.2239 47.7083 38.5V39.5C47.7083 39.7761 47.4844 40 47.2083 40H44.2083C43.9322 40 43.7083 39.7761 43.7083 39.5V38.5Z M43.7083 41.5C43.7083 41.2239 43.9322 41 44.2083 41H47.2083C47.4844 41 47.7083 41.2239 47.7083 41.5V42.5C47.7083 42.7761 47.4844 43 47.2083 43H44.2083C43.9322 43 43.7083 42.7761 43.7083 42.5V41.5Z M43.7083 44.5C43.7083 44.2239 43.9322 44 44.2083 44H47.2083C47.4844 44 47.7083 44.2239 47.7083 44.5V45.5C47.7083 45.7761 47.4844 46 47.2083 46H44.2083C43.9322 46 43.7083 45.7761 43.7083 45.5V44.5Z M48.7083 35.5C48.7083 35.2239 48.9322 35 49.2083 35H52.2083C52.4844 35 52.7083 35.2239 52.7083 35.5V36.5C52.7083 36.7761 52.4844 37 52.2083 37H49.2083C48.9322 37 48.7083 36.7761 48.7083 36.5V35.5Z M48.7083 38.5C48.7083 38.2239 48.9322 38 49.2083 38H52.2083C52.4844 38 52.7083 38.2239 52.7083 38.5V39.5C52.7083 39.7761 52.4844 40 52.2083 40H49.2083C48.9322 40 48.7083 39.7761 48.7083 39.5V38.5Z M48.7083 41.5C48.7083 41.2239 48.9322 41 49.2083 41H52.2083C52.4844 41 52.7083 41.2239 52.7083 41.5V42.5C52.7083 42.7761 52.4844 43 52.2083 43H49.2083C48.9322 43 48.7083 42.7761 48.7083 42.5V41.5Z M48.7083 44.5C48.7083 44.2239 48.9322 44 49.2083 44H52.2083C52.4844 44 52.7083 44.2239 52.7083 44.5V45.5C52.7083 45.7761 52.4844 46 52.2083 46H49.2083C48.9322 46 48.7083 45.7761 48.7083 45.5V44.5Z M53.7083 35.5C53.7083 35.2239 53.9322 35 54.2083 35H57.2083C57.4844 35 57.7083 35.2239 57.7083 35.5V36.5C57.7083 36.7761 57.4844 37 57.2083 37H54.2083C53.9322 37 53.7083 36.7761 53.7083 36.5V35.5Z M53.7083 38.5C53.7083 38.2239 53.9322 38 54.2083 38H57.2083C57.4844 38 57.7083 38.2239 57.7083 38.5V39.5C57.7083 39.7761 57.4844 40 57.2083 40H54.2083C53.9322 40 53.7083 39.7761 53.7083 39.5V38.5Z M53.7083 41.5C53.7083 41.2239 53.9322 41 54.2083 41H57.2083C57.4844 41 57.7083 41.2239 57.7083 41.5V42.5C57.7083 42.7761 57.4844 43 57.2083 43H54.2083C53.9322 43 53.7083 42.7761 53.7083 42.5V41.5Z M53.7083 44.5C53.7083 44.2239 53.9322 44 54.2083 44H57.2083C57.4844 44 57.7083 44.2239 57.7083 44.5V45.5C57.7083 45.7761 57.4844 46 57.2083 46H54.2083C53.9322 46 53.7083 45.7761 53.7083 45.5V44.5Z"}
  },
  {
    id :'room1Chair',
    offsetX: 178,
    offsetY: 116,
    // Size of the node
    width: 28,
    height: 32,
    rotateAngle:-90,
    shape:{ type : 'Path', data:'M22 9V14M28 9.08984V14M13 54H37C41.4183 54 45 50.4183 45 46V22C45 17.5817 41.4183 14 37 14H13C8.58172 14 5 17.5817 5 22V46C5 50.4183 8.58172 54 13 54ZM3 45C1.89543 45 1 44.1046 1 43V25C1 23.8954 1.89543 23 3 23C4.10457 23 5 23.8954 5 25V43C5 44.1046 4.10457 45 3 45ZM11 5.79143C11 3.97975 12.2614 2.40196 14.0423 2.06981C22.0186 0.582241 27.6274 0.696364 35.7954 2.09976C37.6588 2.41991 39 4.05364 39 5.94429C39 8.4118 36.7616 10.2627 34.325 9.87346C27.5467 8.79067 22.4382 8.5351 15.7921 9.68406C13.3336 10.1091 11 8.28636 11 5.79143ZM47 45C45.8954 45 45 44.1046 45 43V25C45 23.8954 45.8954 23 47 23C48.1046 23 49 23.8954 49 25V43C49 44.1046 48.1046 45 47 45Z'}
  },
  {
    id :'room1Lamp',
    offsetX: 41,
    offsetY:166,
    // Size of the node
    width: 20,
    height: 20,
    shape:{ type : 'Path', data:"M17 7C11.4772 7 7 11.4772 7 17C7 22.5228 11.4772 27 17 27C22.5228 27 27 22.5228 27 17C27 11.4772 22.5228 7 17 7ZM17 7V13.5M20.2363 18.5593L25.3654 21.3093M13.7544 18.4305L8.2541 21.6805M33 17C33 25.8366 25.8366 33 17 33C8.16344 33 1 25.8366 1 17C1 8.16344 8.16344 1 17 1C25.8366 1 33 8.16344 33 17ZM25.5 17C25.5 21.6944 21.6944 25.5 17 25.5C12.3056 25.5 8.5 21.6944 8.5 17C8.5 12.3056 12.3056 8.5 17 8.5C21.6944 8.5 25.5 12.3056 25.5 17ZM21 17C21 19.2091 19.2091 21 17 21C14.7909 21 13 19.2091 13 17C13 14.7909 14.7909 13 17 13C19.2091 13 21 14.7909 21 17Z"}
  },
  {
    id :'room1ToiletDoor',
    offsetX: 169,
    offsetY: 214,
    // Size of the node
    width: 28,
    height: 30,
    rotateAngle:180,
    shape:{ type : 'Path', data:'M1 71L1 79L72 79V71M1 71L72 71M1 71C1 32.3401 32.3401 1 71 1H72V71'}
  },
  {
    id :'room1Warddrobe',
    offsetX: 119,
    offsetY: 176,
    // Size of the node
    width: 73,
    height: 35,
    rotateAngle:180,
    shape:{ type : 'Path', data:"M50.6443 54.406L76 29L80.9998 28.9502H85.9996L55.594 59.3558L50.6443 54.406Z M12 29L36.9996 54.4053L32.0498 59.3551L2 29H12Z M70.7969 44.8594C70.6017 44.6642 70.6017 44.3476 70.7969 44.1523C70.9922 43.957 71.3088 43.957 71.504 44.1523L72.9182 45.5665C73.1135 45.7618 73.1135 46.0784 72.9182 46.2736C72.723 46.4689 72.4064 46.4689 72.2111 46.2736L70.7969 44.8594Z M16.1406 44.1524C16.3358 43.9571 16.6524 43.9571 16.8477 44.1524C17.043 44.3476 17.043 44.6642 16.8477 44.8595L15.4335 46.2737C15.2382 46.469 14.9216 46.469 14.7264 46.2737C14.5311 46.0784 14.5311 45.7619 14.7264 45.5666L16.1406 44.1524Z M1 1L87 1V29H1L1 1Z"}
  },
  {
    id :'toilet1BathTub',
    offsetX: 88,
    offsetY: 263,
    // Size of the node
    width: 50,
    height: 25,
    shape:{ type : 'Path', data:"M1 9C1 4.58172 4.58172 1 9 1H84C88.4183 1 92 4.58172 92 9V40C92 44.4183 88.4183 48 84 48H9C4.58172 48 1 44.4183 1 40V9Z M12 24.5C12 14.2827 20.2827 6 30.5 6H61.5C71.7173 6 80 14.2827 80 24.5C80 34.7173 71.7173 43 61.5 43H30.5C20.2827 43 12 34.7173 12 24.5Z M11.5 26.5C11.5 26.5 12 26 12 25C12 24 11.5 23.5 11.5 23.5L22.0074 22.6917C23.3519 22.5883 24.5 23.6514 24.5 25C24.5 26.3486 23.3519 27.4117 22.0074 27.3083L11.5 26.5Z M8 21.5C9.933 21.5 11.5 23.067 11.5 25C11.5 26.933 9.933 28.5 8 28.5C6.067 28.5 4.5 26.933 4.5 25C4.5 23.067 6.067 21.5 8 21.5Z"}
  },
  {
    id :'toilet1Basin',
    offsetX: 158,
    offsetY: 263,
    // Size of the node
    width: 30,
    height: 25,
    rotateAngle:180,
    shape:{ type : 'Path', data:"M1 4C1 2.34315 2.34315 1 4 1H62C63.6569 1 65 2.34315 65 4V25C65 38.2548 54.2548 49 41 49H25C11.7452 49 1 38.2548 1 25V4Z M57 25C57 33.2843 46.2548 40 33 40C19.7452 40 9 33.2843 9 25C9 16.7157 19.7452 10 33 10C46.2548 10 57 16.7157 57 25Z M31 10C31 10 31.5 10.5 32.5 10.5C33.5 10.5 34 10 34 10L34.8083 20.5074C34.9117 21.8519 33.8486 23 32.5 23C31.1514 23 30.0883 21.8519 30.1917 20.5074L31 10Z M36 6.5C36 8.433 34.433 10 32.5 10C30.567 10 29 8.433 29 6.5C29 4.567 30.567 3 32.5 3C34.433 3 36 4.567 36 6.5Z M35 28.5C35 29.8807 33.8807 31 32.5 31C31.1193 31 30 29.8807 30 28.5C30 27.1193 31.1193 26 32.5 26C33.8807 26 35 27.1193 35 28.5Z"}
  },
  {
    id :'toilet1Faucet',
    offsetX: 43,
    offsetY: 222,
    // Size of the node
    width: 23,
    height: 36,
    rotateAngle:-90,
    shape:{ type : 'Path', data:'M46.4065 37.9425C46.4065 55.0951 36.823 69.0002 25.0011 69.0002C13.1792 69.0002 3.5957 55.0951 3.5957 37.9425C3.5957 30.1141 5.2059 23.4623 8.5 18C8.61402 18 25 18 25 18H41.2425C44.5366 23.4623 46.4065 30.1141 46.4065 37.9425Z M41.2161 43.5006C41.2161 53.9728 33.9559 62.4621 24.9999 62.4621C16.0439 62.4621 8.78369 53.9728 8.78369 43.5006C8.78369 33.0284 16.0439 24.5391 24.9999 24.5391C33.9559 24.5391 41.2161 33.0284 41.2161 43.5006Z M1 3.61538C1 2.17095 2.17095 1 3.61538 1H46.3846C47.8291 1 49 2.17095 49 3.61538V15.3846C49 16.8291 47.8291 18 46.3846 18H3.61538C2.17095 18 1 16.8291 1 15.3846V3.61538Z M26.9995 9C26.9995 10.1046 26.1041 11 24.9995 11C23.8949 11 22.9995 10.1046 22.9995 9C22.9995 7.89543 23.8949 7 24.9995 7C26.1041 7 26.9995 7.89543 26.9995 9Z M31 33C31 37.4183 28.3137 41 25 41C21.6863 41 19 37.4183 19 33C19 28.5817 21.6863 25 25 25C28.3137 25 31 28.5817 31 33Z '}
  },
  {
    id :'room2ToiletDoor',
    offsetX: 168,
    offsetY: 336,
    // Size of the node
    width: 27,
    height: 30,
   
    shape:{ type : 'Path', data:'M1 71L1 79L72 79V71M1 71L72 71M1 71C1 32.3401 32.3401 1 71 1H72V71'}
  },
  {
    id :'toilet2BathTub',
    offsetX: 85,
    offsetY: 332,
    // Size of the node
    width: 50,
    height: 25,
    shape:{ type : 'Path', data:'M1 9C1 4.58172 4.58172 1 9 1H84C88.4183 1 92 4.58172 92 9V40C92 44.4183 88.4183 48 84 48H9C4.58172 48 1 44.4183 1 40V9Z M12 11C12 8.23858 14.2386 6 17 6H75C77.7614 6 80 8.23858 80 11V38C80 40.7614 77.7614 43 75 43H17C14.2386 43 12 40.7614 12 38V11Z M11.5 26.5C11.5 26.5 12 26 12 25C12 24 11.5 23.5 11.5 23.5L22.0074 22.6917C23.3519 22.5883 24.5 23.6514 24.5 25C24.5 26.3486 23.3519 27.4117 22.0074 27.3083L11.5 26.5Z M8 21.5C9.933 21.5 11.5 23.067 11.5 25C11.5 26.933 9.933 28.5 8 28.5C6.067 28.5 4.5 26.933 4.5 25C4.5 23.067 6.067 21.5 8 21.5Z'}
  },
  {
    id :'toilet2Basin',
    offsetX: 157,
    offsetY: 298 ,
    // Size of the node
    width: 30,
    height: 25,
    shape:{ type : 'Path', data:'M1 9C1 4.58172 4.58172 1 9 1H57C61.4183 1 65 4.58172 65 9V41C65 45.4183 61.4183 49 57 49H9C4.58172 49 1 45.4183 1 41V9Z M7 13C7 10.7909 8.79086 9 11 9H55C57.2091 9 59 10.7909 59 13V37C59 39.2091 57.2091 41 55 41H11C8.79086 41 7 39.2091 7 37V13Z M35 25.5C35 26.8807 33.8807 28 32.5 28C31.1193 28 30 26.8807 30 25.5C30 24.1193 31.1193 23 32.5 23C33.8807 23 35 24.1193 35 25.5Z M31 9C31 9 31.5 9.5 32.5 9.5C33.5 9.5 34 9 34 9L34.8083 19.5074C34.9117 20.8519 33.8486 22 32.5 22C31.1514 22 30.0883 20.8519 30.1917 19.5074L31 9Z M36 5.5C36 7.433 34.433 9 32.5 9C30.567 9 29 7.433 29 5.5C29 3.567 30.567 2 32.5 2C34.433 2 36 3.567 36 5.5Z'}
  },
  {
    id :'toilet2Faucet',
    offsetX: 42,
    offsetY: 305,
    // Size of the node
    width: 23,
    height: 37,
    rotateAngle:-90,
    shape:{ type : 'Path', data:'M46.989 33.0731C46.989 53.4671 37.3818 69.9996 25.5307 69.9996C13.6795 69.9996 4.07227 53.4671 4.07227 33.0731C4.07227 19.1497 4 18 4 18C4.17549 18.0144 15.9306 18.2553 26.5002 17.9993C36.1582 17.7654 46.989 17.9999 46.989 17.9999C46.989 17.9999 46.989 21.6119 46.989 33.0731Z M41 44.5C41 54.7173 34.0604 63 25.5 63C16.9396 63 10 54.7173 10 44.5C10 34.2827 16.9396 26 25.5 26C34.0604 26 41 34.2827 41 44.5Z M1 3.61538C1 2.17095 2.17095 1 3.61538 1H46.3846C47.8291 1 49 2.17095 49 3.61538V15.3846C49 16.8291 47.8291 18 46.3846 18H3.61538C2.17095 18 1 16.8291 1 15.3846V3.61538Z M26.9995 9C26.9995 10.1046 26.1041 11 24.9995 11C23.8949 11 22.9995 10.1046 22.9995 9C22.9995 7.89543 23.8949 7 24.9995 7C26.1041 7 26.9995 7.89543 26.9995 9Z M31 34C31 38.4183 28.3137 42 25 42C21.6863 42 19 38.4183 19 34C19 29.5817 21.6863 26 25 26C28.3137 26 31 29.5817 31 34Z'}
  },
  {
    id :'room2Window',
    offsetX: 118,
    offsetY: 481,
    // Size of the node
    width: 80,
    height: 4,
    shape:{ type : 'Path', data:'M22 5.5L124 5.50001M145 9L128 9V1L145 1V9ZM1 1L18 1L18 9L1 9L1 1ZM128 8L124 8V2L128 2V8ZM18 2L22 2L22 8L18 8L18 2Z'}
  },
  {
    id :'room2Window2',
    offsetX: 20,
    offsetY: 396,
    // Size of the node
    width: 51,
    height: 4,
    rotateAngle:90,
    shape:{ type : 'Path', data:'M22 5.5L124 5.50001M145 9L128 9V1L145 1V9ZM1 1L18 1L18 9L1 9L1 1ZM128 8L124 8V2L128 2V8ZM18 2L22 2L22 8L18 8L18 2Z'}
  },
  {
    id :'room2Door',
    offsetX: 212,
    offsetY:300,
    // Size of the node
    width: 52,
    height: 38,

   rotateAngle:180,
    shape:{ type : 'Path', data:'M1 71L1 79L72 79V71M1 71L72 71M1 71C1 32.3401 32.3401 1 71 1H72V71'}
  },
  {
    id :'room2Bed',
    offsetX: 69,
    offsetY: 402,
    // Size of the node
    width: 44,
    height: 87,
    rotateAngle:-90,
    shape:{ type : 'Path', data:'M1 2C1 1.44771 1.44772 1 2 1H26C26.5523 1 27 1.44772 27 2V54C27 54.5523 26.5523 55 26 55H2C1.44772 55 1 54.5523 1 54V2Z M1 27.5941C1 27.5432 1.0038 27.4928 1.01218 27.4426C1.13134 26.7284 2.13402 21.153 4.41646 21.0198C4.47147 21.0165 4.52813 21.0118 4.58296 21.0063C7.51272 20.7131 9.98932 30.7524 14.8322 30.9965C14.9423 31.002 15.0553 30.9826 15.1593 30.946C18.0006 29.9475 18.036 28.9499 20 28.5008C22.6744 27.8892 25.3331 28.7977 26.4505 29.2665C26.794 29.4106 27 29.7509 27 30.1234V52.0177C27 52.5699 26.5523 53.0177 26 53.0177H2C1.44772 53.0177 1 52.5699 1 52.0177V27.5941Z M7.47077 8.3988C7.27248 7.71969 7.76957 7 8.47703 7H19.0951C19.901 7 20.4243 7.93945 20.1178 8.68485C19.7917 9.47806 19.5 10.4742 19.5 11.5C19.5 12.5349 19.7571 13.4842 20.0583 14.2413C20.363 15.007 19.824 16 19 16H8.47703C7.76957 16 7.27248 15.2803 7.47077 14.6012C7.73012 13.7129 8 12.539 8 11.5C8 10.461 7.73012 9.28707 7.47077 8.3988Z'}
  },
  {
    id :'room2Table',
    offsetX: 210,
    offsetY: 464,
    // Size of the node
    width: 37,
    height: 25,
    shape:{ type : 'Path', data:'M4 5C4 4.44772 4.44772 4 5 4H83C83.5523 4 84 4.44772 84 5V53C84 53.5523 83.5523 54 83 54H5C4.44772 54 4 53.5523 4 53V5Z M4 6.5C4 6.77614 3.77462 7.00425 3.50231 6.95843C3.08607 6.88841 2.68736 6.73099 2.33329 6.49441C1.83994 6.16477 1.45543 5.69623 1.22836 5.14805C1.0013 4.59987 0.94189 3.99667 1.05765 3.41473C1.1734 2.83279 1.45912 2.29824 1.87868 1.87868C2.29824 1.45912 2.83279 1.1734 3.41473 1.05765C3.99667 0.94189 4.59987 1.0013 5.14805 1.22836C5.69623 1.45543 6.16477 1.83994 6.49441 2.33329C6.73099 2.68736 6.88841 3.08607 6.95843 3.50231C7.00424 3.77462 6.77614 4 6.5 4L4.5 4C4.22386 4 4 4.22386 4 4.5L4 6.5Z M81.5 4C81.2239 4 80.9958 3.77462 81.0416 3.50231C81.1116 3.08607 81.269 2.68736 81.5056 2.33329C81.8352 1.83994 82.3038 1.45543 82.852 1.22836C83.4001 1.0013 84.0033 0.94189 84.5853 1.05765C85.1672 1.1734 85.7018 1.45912 86.1213 1.87868C86.5409 2.29824 86.8266 2.83279 86.9424 3.41473C87.0581 3.99667 86.9987 4.59987 86.7716 5.14805C86.5446 5.69623 86.1601 6.16477 85.6667 6.49441C85.3126 6.73099 84.9139 6.88841 84.4977 6.95843C84.2254 7.00424 84 6.77614 84 6.5V4.5C84 4.22386 83.7761 4 83.5 4L81.5 4Z M6.5 54C6.77614 54 7.00425 54.2254 6.95843 54.4977C6.88841 54.9139 6.73099 55.3126 6.49441 55.6667C6.16477 56.1601 5.69623 56.5446 5.14805 56.7716C4.59987 56.9987 3.99667 57.0581 3.41473 56.9424C2.83279 56.8266 2.29824 56.5409 1.87868 56.1213C1.45912 55.7018 1.1734 55.1672 1.05765 54.5853C0.94189 54.0033 1.0013 53.4001 1.22836 52.852C1.45543 52.3038 1.83994 51.8352 2.33329 51.5056C2.68736 51.269 3.08607 51.1116 3.50231 51.0416C3.77462 50.9958 4 51.2239 4 51.5V53.5C4 53.7761 4.22386 54 4.5 54H6.5Z M84 51.5C84 51.2239 84.2254 50.9958 84.4977 51.0416C84.9139 51.1116 85.3126 51.269 85.6667 51.5056C86.1601 51.8352 86.5446 52.3038 86.7716 52.852C86.9987 53.4001 87.0581 54.0033 86.9424 54.5853C86.8266 55.1672 86.5409 55.7018 86.1213 56.1213C85.7018 56.5409 85.1672 56.8266 84.5853 56.9424C84.0033 57.0581 83.4001 56.9987 82.852 56.7716C82.3038 56.5446 81.8352 56.1601 81.5056 55.6667C81.269 55.3126 81.1116 54.9139 81.0416 54.4977C80.9958 54.2254 81.2239 54 81.5 54H83.5C83.7761 54 84 53.7761 84 53.5V51.5Z'}
  },
  {
    id :'room2LampTable',
    offsetX: 38,
    offsetY: 452,
    // Size of the node
    width: 26,
    height: 28,
    shape:{ type : 'Path', data:'M79 1H3C1.89543 1 1 1.89543 1 3V49C1 50.1046 1.89543 51 3 51H79C80.1046 51 81 50.1046 81 49V3C81 1.89543 80.1046 1 79 1Z'}
  },
  // {
  //   id :'room2FlowerPot',
  //   offsetX: 38,
  //   offsetY: 314,
  //   // Size of the node
  //   width: 25,
  //   height: 25,
  //   shape:{ type : 'Path', data:'M41.0021 14.6256C39.4786 15.0878 15.4174 23.8084 24.9086 22.7805C30.9102 22.1305 46.6742 12.9049 41.0021 14.6256Z M30.6226 40.7355C30.095 39.2334 20.3422 15.5718 21.7796 25.0097C22.6885 30.9776 32.587 46.328 30.6226 40.7355Z M40.8599 30.8341C39.4811 30.038 16.6684 18.4377 23.9067 24.6624C28.4837 28.5985 45.9932 33.7978 40.8599 30.8341Z M24.9451 2.15326C24.5331 3.69113 19.2324 28.7289 23.3715 20.1262C25.9889 14.6864 26.4792 -3.57215 24.9451 2.15326Z M2.19397 25.3449C3.78608 25.3449 29.3427 23.9847 19.9617 22.2131C14.0299 21.0929 -3.73342 25.3449 2.19397 25.3449Z M14.4307 41.966C15.2268 40.5872 26.8271 17.7744 20.6024 25.0127C16.6664 29.5898 11.467 47.0992 14.4307 41.966Z M9.34308 7.01354C10.1391 8.39235 24.0954 29.8449 20.9391 20.835C18.9434 15.1378 6.37938 1.88027 9.34308 7.01354Z M8.74609 23.1317C8.74609 19.0028 10.6305 15.3141 13.5861 12.8786M25.2568 10.2486C29.1467 11.2213 32.3568 13.9095 34.0367 17.4627M23.5 9.93362C23.0157 9.88011 22.5236 9.85264 22.0251 9.85264C19.3319 9.85264 16.826 10.6544 14.733 12.0323M34.6489 19.0003C35.0742 20.3006 35.3041 21.6893 35.3041 23.1317C35.3041 24.7546 35.013 26.3095 34.4801 27.747M33.7595 29.3531C32.4773 31.7665 30.4723 33.7373 28.0333 34.9769M26.5361 35.6249C25.1278 36.1335 23.6088 36.4107 22.0251 36.4107C20.4153 36.4107 18.8723 36.1242 17.4445 35.5995M15.8519 34.8916C12.0702 32.9023 9.36529 29.1424 8.83942 24.7143M41.0021 14.6256C39.4786 15.0878 15.4174 23.8084 24.9086 22.7805C30.9102 22.1305 46.6742 12.9049 41.0021 14.6256ZM30.6226 40.7355C30.095 39.2334 20.3422 15.5718 21.7796 25.0097C22.6885 30.9776 32.587 46.328 30.6226 40.7355ZM40.8599 30.8341C39.4811 30.038 16.6684 18.4377 23.9067 24.6624C28.4837 28.5985 45.9932 33.7978 40.8599 30.8341ZM24.9451 2.15326C24.5331 3.69113 19.2324 28.7289 23.3715 20.1262C25.9889 14.6864 26.4792 -3.57215 24.9451 2.15326ZM2.19397 25.3449C3.78608 25.3449 29.3427 23.9847 19.9617 22.2131C14.0299 21.0929 -3.73342 25.3449 2.19397 25.3449ZM14.4307 41.966C15.2268 40.5872 26.8271 17.7744 20.6024 25.0127C16.6664 29.5898 11.467 47.0992 14.4307 41.966ZM9.34308 7.01354C10.1391 8.39235 24.0954 29.8449 20.9391 20.835C18.9434 15.1378 6.37938 1.88027 9.34308 7.01354Z'}
  // },
  // {
  //   id :'room2Bookcase',
  //   offsetX: 220,
  //   offsetY: 437,
  //   // Size of the node
  //   width: 65,
  //   height: 33,
  //   rotateAngle:90,
  //   shape:{ type : 'Path', data:'M113 9V1H1V9M113 9H1M113 9V29H1V9M4 12H11V25H4V12ZM13 12H20V25H13V12ZM22 12H29V25H22V12ZM31 12H38V25H31V12ZM40 12H47V25H40V12ZM49 12H56V25H49V12ZM58 12H65V25H58V12ZM67 12H74V25H67V12ZM76 12H83V25H76V12ZM85 12H92V25H85V12ZM94 12H101V25H94V12ZM103 12H110V25H103V12Z'}
  // },
  // {
  //   id :'room2WorkTable',
  //   offsetX: 218,
  //   offsetY: 366,
  //   // Size of the node
  //   width: 38,
  //   height: 45,
  //   rotateAngle:90,
  //   shape:{ type : 'Path', data:"M4 5C4 4.44772 4.44772 4 5 4H83C83.5523 4 84 4.44772 84 5V53C84 53.5523 83.5523 54 83 54H5C4.44772 54 4 53.5523 4 53V5Z M4 6.5C4 6.77614 3.77462 7.00425 3.50231 6.95843C3.08607 6.88841 2.68736 6.73099 2.33329 6.49441C1.83994 6.16477 1.45543 5.69623 1.22836 5.14805C1.0013 4.59987 0.94189 3.99667 1.05765 3.41473C1.1734 2.83279 1.45912 2.29824 1.87868 1.87868C2.29824 1.45912 2.83279 1.1734 3.41473 1.05765C3.99667 0.94189 4.59987 1.0013 5.14805 1.22836C5.69623 1.45543 6.16477 1.83994 6.49441 2.33329C6.73099 2.68736 6.88841 3.08607 6.95843 3.50231C7.00424 3.77462 6.77614 4 6.5 4L4.5 4C4.22386 4 4 4.22386 4 4.5L4 6.5Z M81.5 4C81.2239 4 80.9958 3.77462 81.0416 3.50231C81.1116 3.08607 81.269 2.68736 81.5056 2.33329C81.8352 1.83994 82.3038 1.45543 82.852 1.22836C83.4001 1.0013 84.0033 0.94189 84.5853 1.05765C85.1672 1.1734 85.7018 1.45912 86.1213 1.87868C86.5409 2.29824 86.8266 2.83279 86.9424 3.41473C87.0581 3.99667 86.9987 4.59987 86.7716 5.14805C86.5446 5.69623 86.1601 6.16477 85.6667 6.49441C85.3126 6.73099 84.9139 6.88841 84.4977 6.95843C84.2254 7.00424 84 6.77614 84 6.5V4.5C84 4.22386 83.7761 4 83.5 4L81.5 4Z M6.5 54C6.77614 54 7.00425 54.2254 6.95843 54.4977C6.88841 54.9139 6.73099 55.3126 6.49441 55.6667C6.16477 56.1601 5.69623 56.5446 5.14805 56.7716C4.59987 56.9987 3.99667 57.0581 3.41473 56.9424C2.83279 56.8266 2.29824 56.5409 1.87868 56.1213C1.45912 55.7018 1.1734 55.1672 1.05765 54.5853C0.94189 54.0033 1.0013 53.4001 1.22836 52.852C1.45543 52.3038 1.83994 51.8352 2.33329 51.5056C2.68736 51.269 3.08607 51.1116 3.50231 51.0416C3.77462 50.9958 4 51.2239 4 51.5V53.5C4 53.7761 4.22386 54 4.5 54H6.5Z M84 51.5C84 51.2239 84.2254 50.9958 84.4977 51.0416C84.9139 51.1116 85.3126 51.269 85.6667 51.5056C86.1601 51.8352 86.5446 52.3038 86.7716 52.852C86.9987 53.4001 87.0581 54.0033 86.9424 54.5853C86.8266 55.1672 86.5409 55.7018 86.1213 56.1213C85.7018 56.5409 85.1672 56.8266 84.5853 56.9424C84.0033 57.0581 83.4001 56.9987 82.852 56.7716C82.3038 56.5446 81.8352 56.1601 81.5056 55.6667C81.269 55.3126 81.1116 54.9139 81.0416 54.4977C80.9958 54.2254 81.2239 54 81.5 54H83.5C83.7761 54 84 53.7761 84 53.5V51.5Z"}
  // },
  // {
  //   id :'room2Laptop',
  //   offsetX: 218,
  //   offsetY: 366,
  //   // Size of the node
  //   width: 30,
  //   height: 30,
  //   rotateAngle:90,
  //   shape:{ type : 'Path', data:"M1.06567 5.71554C0.619244 3.26018 2.50554 1 5.00115 1H61.0006C63.4675 1 65.3464 3.21135 64.9481 5.64595L61.7571 25.146C61.4407 27.08 59.7695 28.5 57.8096 28.5H8.54661C6.61347 28.5 4.95694 27.1175 4.61113 25.2155L1.06567 5.71554Z M3.7083 33C3.7083 30.7909 5.49916 29 7.7083 29H58.7083C60.9174 29 62.7083 30.7909 62.7083 33V55C62.7083 57.2091 60.9174 59 58.7083 59H7.7083C5.49916 59 3.7083 57.2091 3.7083 55V33Z M26.7083 50C26.7083 49.4477 27.156 49 27.7083 49H38.7083C39.2606 49 39.7083 49.4477 39.7083 50V54C39.7083 54.5523 39.2606 55 38.7083 55H27.7083C27.156 55 26.7083 54.5523 26.7083 54V50Z M8.7083 35.5C8.7083 35.2239 8.93216 35 9.2083 35H12.2083C12.4844 35 12.7083 35.2239 12.7083 35.5V36.5C12.7083 36.7761 12.4844 37 12.2083 37H9.2083C8.93216 37 8.7083 36.7761 8.7083 36.5V35.5Z M8.7083 38.5C8.7083 38.2239 8.93216 38 9.2083 38H12.2083C12.4844 38 12.7083 38.2239 12.7083 38.5V39.5C12.7083 39.7761 12.4844 40 12.2083 40H9.2083C8.93216 40 8.7083 39.7761 8.7083 39.5V38.5Z M8.7083 41.5C8.7083 41.2239 8.93216 41 9.2083 41H12.2083C12.4844 41 12.7083 41.2239 12.7083 41.5V42.5C12.7083 42.7761 12.4844 43 12.2083 43H9.2083C8.93216 43 8.7083 42.7761 8.7083 42.5V41.5Z M8.7083 44.5C8.7083 44.2239 8.93216 44 9.2083 44H12.2083C12.4844 44 12.7083 44.2239 12.7083 44.5V45.5C12.7083 45.7761 12.4844 46 12.2083 46H9.2083C8.93216 46 8.7083 45.7761 8.7083 45.5V44.5Z M13.7083 35.5C13.7083 35.2239 13.9322 35 14.2083 35H17.2083C17.4844 35 17.7083 35.2239 17.7083 35.5V36.5C17.7083 36.7761 17.4844 37 17.2083 37H14.2083C13.9322 37 13.7083 36.7761 13.7083 36.5V35.5Z M13.7083 38.5C13.7083 38.2239 13.9322 38 14.2083 38H17.2083C17.4844 38 17.7083 38.2239 17.7083 38.5V39.5C17.7083 39.7761 17.4844 40 17.2083 40H14.2083C13.9322 40 13.7083 39.7761 13.7083 39.5V38.5Z M13.7083 41.5C13.7083 41.2239 13.9322 41 14.2083 41H17.2083C17.4844 41 17.7083 41.2239 17.7083 41.5V42.5C17.7083 42.7761 17.4844 43 17.2083 43H14.2083C13.9322 43 13.7083 42.7761 13.7083 42.5V41.5Z M13.7083 44.5C13.7083 44.2239 13.9322 44 14.2083 44H17.2083C17.4844 44 17.7083 44.2239 17.7083 44.5V45.5C17.7083 45.7761 17.4844 46 17.2083 46H14.2083C13.9322 46 13.7083 45.7761 13.7083 45.5V44.5Z M18.7083 35.5C18.7083 35.2239 18.9322 35 19.2083 35H22.2083C22.4844 35 22.7083 35.2239 22.7083 35.5V36.5C22.7083 36.7761 22.4844 37 22.2083 37H19.2083C18.9322 37 18.7083 36.7761 18.7083 36.5V35.5Z M18.7083 38.5C18.7083 38.2239 18.9322 38 19.2083 38H22.2083C22.4844 38 22.7083 38.2239 22.7083 38.5V39.5C22.7083 39.7761 22.4844 40 22.2083 40H19.2083C18.9322 40 18.7083 39.7761 18.7083 39.5V38.5Z M18.7083 41.5C18.7083 41.2239 18.9322 41 19.2083 41H22.2083C22.4844 41 22.7083 41.2239 22.7083 41.5V42.5C22.7083 42.7761 22.4844 43 22.2083 43H19.2083C18.9322 43 18.7083 42.7761 18.7083 42.5V41.5Z M18.7083 44.5C18.7083 44.2239 18.9322 44 19.2083 44H22.2083C22.4844 44 22.7083 44.2239 22.7083 44.5V45.5C22.7083 45.7761 22.4844 46 22.2083 46H19.2083C18.9322 46 18.7083 45.7761 18.7083 45.5V44.5Z M23.7083 35.5C23.7083 35.2239 23.9322 35 24.2083 35H27.2083C27.4844 35 27.7083 35.2239 27.7083 35.5V36.5C27.7083 36.7761 27.4844 37 27.2083 37H24.2083C23.9322 37 23.7083 36.7761 23.7083 36.5V35.5Z M23.7083 38.5C23.7083 38.2239 23.9322 38 24.2083 38H27.2083C27.4844 38 27.7083 38.2239 27.7083 38.5V39.5C27.7083 39.7761 27.4844 40 27.2083 40H24.2083C23.9322 40 23.7083 39.7761 23.7083 39.5V38.5Z M23.7083 41.5C23.7083 41.2239 23.9322 41 24.2083 41H27.2083C27.4844 41 27.7083 41.2239 27.7083 41.5V42.5C27.7083 42.7761 27.4844 43 27.2083 43H24.2083C23.9322 43 23.7083 42.7761 23.7083 42.5V41.5Z M23.7083 44.5C23.7083 44.2239 23.9322 44 24.2083 44H42.2083C42.4844 44 42.7083 44.2239 42.7083 44.5V45.5C42.7083 45.7761 42.4844 46 42.2083 46H24.2083C23.9322 46 23.7083 45.7761 23.7083 45.5V44.5Z M28.7083 35.5C28.7083 35.2239 28.9322 35 29.2083 35H32.2083C32.4844 35 32.7083 35.2239 32.7083 35.5V36.5C32.7083 36.7761 32.4844 37 32.2083 37H29.2083C28.9322 37 28.7083 36.7761 28.7083 36.5V35.5Z M28.7083 38.5C28.7083 38.2239 28.9322 38 29.2083 38H32.2083C32.4844 38 32.7083 38.2239 32.7083 38.5V39.5C32.7083 39.7761 32.4844 40 32.2083 40H29.2083C28.9322 40 28.7083 39.7761 28.7083 39.5V38.5Z M28.7083 41.5C28.7083 41.2239 28.9322 41 29.2083 41H32.2083C32.4844 41 32.7083 41.2239 32.7083 41.5V42.5C32.7083 42.7761 32.4844 43 32.2083 43H29.2083C28.9322 43 28.7083 42.7761 28.7083 42.5V41.5Z M33.7083 35.5C33.7083 35.2239 33.9322 35 34.2083 35H37.2083C37.4844 35 37.7083 35.2239 37.7083 35.5V36.5C37.7083 36.7761 37.4844 37 37.2083 37H34.2083C33.9322 37 33.7083 36.7761 33.7083 36.5V35.5Z M33.7083 38.5C33.7083 38.2239 33.9322 38 34.2083 38H37.2083C37.4844 38 37.7083 38.2239 37.7083 38.5V39.5C37.7083 39.7761 37.4844 40 37.2083 40H34.2083C33.9322 40 33.7083 39.7761 33.7083 39.5V38.5Z M33.7083 41.5C33.7083 41.2239 33.9322 41 34.2083 41H37.2083C37.4844 41 37.7083 41.2239 37.7083 41.5V42.5C37.7083 42.7761 37.4844 43 37.2083 43H34.2083C33.9322 43 33.7083 42.7761 33.7083 42.5V41.5Z M38.7083 35.5C38.7083 35.2239 38.9322 35 39.2083 35H42.2083C42.4844 35 42.7083 35.2239 42.7083 35.5V36.5C42.7083 36.7761 42.4844 37 42.2083 37H39.2083C38.9322 37 38.7083 36.7761 38.7083 36.5V35.5Z M38.7083 38.5C38.7083 38.2239 38.9322 38 39.2083 38H42.2083C42.4844 38 42.7083 38.2239 42.7083 38.5V39.5C42.7083 39.7761 42.4844 40 42.2083 40H39.2083C38.9322 40 38.7083 39.7761 38.7083 39.5V38.5Z M38.7083 41.5C38.7083 41.2239 38.9322 41 39.2083 41H42.2083C42.4844 41 42.7083 41.2239 42.7083 41.5V42.5C42.7083 42.7761 42.4844 43 42.2083 43H39.2083C38.9322 43 38.7083 42.7761 38.7083 42.5V41.5Z M43.7083 35.5C43.7083 35.2239 43.9322 35 44.2083 35H47.2083C47.4844 35 47.7083 35.2239 47.7083 35.5V36.5C47.7083 36.7761 47.4844 37 47.2083 37H44.2083C43.9322 37 43.7083 36.7761 43.7083 36.5V35.5Z M43.7083 38.5C43.7083 38.2239 43.9322 38 44.2083 38H47.2083C47.4844 38 47.7083 38.2239 47.7083 38.5V39.5C47.7083 39.7761 47.4844 40 47.2083 40H44.2083C43.9322 40 43.7083 39.7761 43.7083 39.5V38.5Z M43.7083 41.5C43.7083 41.2239 43.9322 41 44.2083 41H47.2083C47.4844 41 47.7083 41.2239 47.7083 41.5V42.5C47.7083 42.7761 47.4844 43 47.2083 43H44.2083C43.9322 43 43.7083 42.7761 43.7083 42.5V41.5Z M43.7083 44.5C43.7083 44.2239 43.9322 44 44.2083 44H47.2083C47.4844 44 47.7083 44.2239 47.7083 44.5V45.5C47.7083 45.7761 47.4844 46 47.2083 46H44.2083C43.9322 46 43.7083 45.7761 43.7083 45.5V44.5Z M48.7083 35.5C48.7083 35.2239 48.9322 35 49.2083 35H52.2083C52.4844 35 52.7083 35.2239 52.7083 35.5V36.5C52.7083 36.7761 52.4844 37 52.2083 37H49.2083C48.9322 37 48.7083 36.7761 48.7083 36.5V35.5Z M48.7083 38.5C48.7083 38.2239 48.9322 38 49.2083 38H52.2083C52.4844 38 52.7083 38.2239 52.7083 38.5V39.5C52.7083 39.7761 52.4844 40 52.2083 40H49.2083C48.9322 40 48.7083 39.7761 48.7083 39.5V38.5Z M48.7083 41.5C48.7083 41.2239 48.9322 41 49.2083 41H52.2083C52.4844 41 52.7083 41.2239 52.7083 41.5V42.5C52.7083 42.7761 52.4844 43 52.2083 43H49.2083C48.9322 43 48.7083 42.7761 48.7083 42.5V41.5Z M48.7083 44.5C48.7083 44.2239 48.9322 44 49.2083 44H52.2083C52.4844 44 52.7083 44.2239 52.7083 44.5V45.5C52.7083 45.7761 52.4844 46 52.2083 46H49.2083C48.9322 46 48.7083 45.7761 48.7083 45.5V44.5Z M53.7083 35.5C53.7083 35.2239 53.9322 35 54.2083 35H57.2083C57.4844 35 57.7083 35.2239 57.7083 35.5V36.5C57.7083 36.7761 57.4844 37 57.2083 37H54.2083C53.9322 37 53.7083 36.7761 53.7083 36.5V35.5Z M53.7083 38.5C53.7083 38.2239 53.9322 38 54.2083 38H57.2083C57.4844 38 57.7083 38.2239 57.7083 38.5V39.5C57.7083 39.7761 57.4844 40 57.2083 40H54.2083C53.9322 40 53.7083 39.7761 53.7083 39.5V38.5Z M53.7083 41.5C53.7083 41.2239 53.9322 41 54.2083 41H57.2083C57.4844 41 57.7083 41.2239 57.7083 41.5V42.5C57.7083 42.7761 57.4844 43 57.2083 43H54.2083C53.9322 43 53.7083 42.7761 53.7083 42.5V41.5Z M53.7083 44.5C53.7083 44.2239 53.9322 44 54.2083 44H57.2083C57.4844 44 57.7083 44.2239 57.7083 44.5V45.5C57.7083 45.7761 57.4844 46 57.2083 46H54.2083C53.9322 46 53.7083 45.7761 53.7083 45.5V44.5Z"}
  // },
  {
    id :'room2Chair',
    offsetX: 210,
    offsetY: 436,
    // Size of the node
    width: 25,
    height: 25,
    shape:{ type : 'Path', data:'M7 27.5V56C7 56.5523 6.55228 57 6 57H2C1.44772 57 1 56.5523 1 56V26.5C1 12.4167 12.4167 1 26.5 1C40.5833 1 52 12.4167 52 26.5V56C52 56.5523 51.5523 57 51 57H47C46.4477 57 46 56.5523 46 56V27.5M7 27.5C7 16.7304 15.7304 8 26.5 8C37.2696 8 46 16.7304 46 27.5M7 27.5V58C7 58.5523 7.44772 59 8 59H45C45.5523 59 46 58.5523 46 58V27.5'}
  },
  {
    id :'room2Lamp',
    offsetX: 38,
    offsetY:452,
    // Size of the node
    width: 20,
    height: 20,
    shape:{ type : 'Path', data:"M17 7C11.4772 7 7 11.4772 7 17C7 22.5228 11.4772 27 17 27C22.5228 27 27 22.5228 27 17C27 11.4772 22.5228 7 17 7ZM17 7V13.5M20.2363 18.5593L25.3654 21.3093M13.7544 18.4305L8.2541 21.6805M33 17C33 25.8366 25.8366 33 17 33C8.16344 33 1 25.8366 1 17C1 8.16344 8.16344 1 17 1C25.8366 1 33 8.16344 33 17ZM25.5 17C25.5 21.6944 21.6944 25.5 17 25.5C12.3056 25.5 8.5 21.6944 8.5 17C8.5 12.3056 12.3056 8.5 17 8.5C21.6944 8.5 25.5 12.3056 25.5 17ZM21 17C21 19.2091 19.2091 21 17 21C14.7909 21 13 19.2091 13 17C13 14.7909 14.7909 13 17 13C19.2091 13 21 14.7909 21 17Z"}
  },
  {
    id :'room2Warddrobe',
    offsetX: 216,
    offsetY: 378,
    // Size of the node
    width: 73,
    height: 35,
    rotateAngle:90,
    shape:{ type : 'Path', data:"M50.6443 54.406L76 29L80.9998 28.9502H85.9996L55.594 59.3558L50.6443 54.406Z M12 29L36.9996 54.4053L32.0498 59.3551L2 29H12Z M70.7969 44.8594C70.6017 44.6642 70.6017 44.3476 70.7969 44.1523C70.9922 43.957 71.3088 43.957 71.504 44.1523L72.9182 45.5665C73.1135 45.7618 73.1135 46.0784 72.9182 46.2736C72.723 46.4689 72.4064 46.4689 72.2111 46.2736L70.7969 44.8594Z M16.1406 44.1524C16.3358 43.9571 16.6524 43.9571 16.8477 44.1524C17.043 44.3476 17.043 44.6642 16.8477 44.8595L15.4335 46.2737C15.2382 46.469 14.9216 46.469 14.7264 46.2737C14.5311 46.0784 14.5311 45.7619 14.7264 45.5666L16.1406 44.1524Z M1 1L87 1V29H1L1 1Z"}
  },
  {
    id :'mainDoor',
    offsetX: 320,
    offsetY:371,
    // Size of the node
    width: 76,
    height: 63,
    shape:{ type : 'Path', data:"M143 71V79L1 79L1 71M143 71L1 71M143 71V1H142C103.34 1 72 32.3401 72 71M143 71H72M1 71L1 1H2C40.6599 1 72 32.3401 72 71M1 71L72 71M72 78.5V71"}
  },
  {
    id :'window',
    offsetX: 490,
    offsetY:399,
    // Size of the node
    width: 100,
    height: 5,
   shape:{ type : 'Path', data:"M22 3.5L124 3.50001M22 6.5L124 6.50001M145 9L128 9V1L145 1V9ZM1 1L18 1L18 9L1 9L1 1ZM128 8L124 8V2L128 2V8ZM18 2L22 2L22 8L18 8L18 2Z"}
  },
  {
    id :'sofa',
    offsetX: 480,
    offsetY:370,
    // Size of the node
    width: 102,
    height: 36,
    rotateAngle:180,
    shape:{ type : 'Path', data:'M95 49H130C131.657 49 133 47.6569 133 46V20C133 18.3431 131.657 17 130 17H20C18.3431 17 17 18.3431 17 20V46C17 47.6569 18.3431 49 20 49H95ZM95 49V17H56V49H95ZM145 17H137C134.791 17 133 18.7909 133 21V45C133 47.2091 134.791 49 137 49H145C147.209 49 149 47.2091 149 45V21C149 18.7909 147.209 17 145 17ZM145 17H5M145 17C147.209 17 149 15.2091 149 13V5.00001C149 2.79087 147.209 1.00001 145 1.00001L5 1C2.79086 1 1 2.79086 1 5L1 13C1 15.2091 2.79086 17 5 17M5 17H13C15.2091 17 17 18.7909 17 21V45C17 47.2091 15.2091 49 13 49H5C2.79086 49 1 47.2091 1 45L1 21C1 18.7909 2.79086 17 5 17Z'}
  },
  {
    id :'doubleSofa',
    offsetX: 479,
    offsetY:298,
    // Size of the node
    width: 100,
    height: 35,
    
    shape:{ type : 'Path', data:'M55 17H20C18.3431 17 17 18.3431 17 20V46C17 47.6569 18.3431 49 20 49H55M55 17V49M55 17H91C92.6569 17 94 18.3431 94 20V46C94 47.6569 92.6569 49 91 49H55M106 17H98C95.7909 17 94 18.7909 94 21V45C94 47.2091 95.7909 49 98 49H106C108.209 49 110 47.2091 110 45V21C110 18.7909 108.209 17 106 17ZM106 17H5M106 17C108.209 17 110 15.2091 110 13V5.00001C110 2.79087 108.209 1.00001 106 1.00001L5 1C2.79086 1 1 2.79086 1 5L1 13C1 15.2091 2.79086 17 5 17M5 17H13C15.2091 17 17 18.7909 17 21V45C17 47.2091 15.2091 49 13 49H5C2.79086 49 1 47.2091 1 45L1 21C1 18.7909 2.79086 17 5 17Z'}
  },
  {
    id :'singleSofa',
    offsetX: 405,
    offsetY:333,
    // Size of the node
    width: 30,
    height: 30,
    rotateAngle:-90,
    shape:{ type : 'Path', data:"M39.3572 42.5001C33.5879 44.3644 23.3389 47.3726 11.0312 42.8982M39.3572 42.5001C38.9901 32.896 39.1315 17.3601 40.2727 11.5C38.1563 12.9176 38.0909 13 33.1818 14C28.8182 14.8889 26.0909 14.5 26.0909 14.5C26.0909 14.5 22.2727 14.5 19 14C15.7273 13.5 14.0909 13 10.2727 10.9155C10.7143 16.2832 11.7887 29.6759 11.0312 42.8982M39.3572 42.5001C39.4226 44.2122 40.7919 45.5708 42.5027 45.6646L45.163 45.8105C47.0566 45.9143 48.6622 44.438 48.7092 42.5421C48.8219 38.0026 49 29.9987 49 24.7736C49 20.1829 48.725 13.4473 48.5055 8.8007C48.3595 5.71097 46.1103 3.14326 43.0526 2.67589C38.2269 1.93827 30.8617 1 24.619 1C18.1203 1 10.557 2.69472 5.86868 3.94263C3.15069 4.66609 1.30579 7.10774 1.22538 9.91921C1.12006 13.6016 1 19.0538 1 24.7736C1 31.5601 1.16901 38.7232 1.28189 42.7504C1.33277 44.5656 2.82066 46 4.63658 46H7.70901C9.46516 46 10.9308 44.6515 11.0312 42.8982M22.2195 21.2201C22.2195 22.1507 21.4652 22.9051 20.5346 22.9051C19.604 22.9051 18.8496 22.1507 18.8496 21.2201C18.8496 20.2895 19.604 19.5352 20.5346 19.5352C21.4652 19.5352 22.2195 20.2895 22.2195 21.2201ZM22.2195 27.9594C22.2195 28.89 21.4652 29.6443 20.5346 29.6443C19.604 29.6443 18.8496 28.89 18.8496 27.9594C18.8496 27.0288 19.604 26.2744 20.5346 26.2744C21.4652 26.2744 22.2195 27.0288 22.2195 27.9594ZM22.2195 34.6986C22.2195 35.6292 21.4652 36.3836 20.5346 36.3836C19.604 36.3836 18.8496 35.6292 18.8496 34.6986C18.8496 33.7681 19.604 33.0137 20.5346 33.0137C21.4652 33.0137 22.2195 33.7681 22.2195 34.6986ZM32.3294 21.2201C32.3294 22.1507 31.575 22.9051 30.6444 22.9051C29.7139 22.9051 28.9595 22.1507 28.9595 21.2201C28.9595 20.2895 29.7139 19.5352 30.6444 19.5352C31.575 19.5352 32.3294 20.2895 32.3294 21.2201ZM32.3294 27.9594C32.3294 28.89 31.575 29.6443 30.6444 29.6443C29.7139 29.6443 28.9595 28.89 28.9595 27.9594C28.9595 27.0288 29.7139 26.2744 30.6444 26.2744C31.575 26.2744 32.3294 27.0288 32.3294 27.9594ZM32.3294 34.6986C32.3294 35.6292 31.575 36.3836 30.6444 36.3836C29.7139 36.3836 28.9595 35.6292 28.9595 34.6986C28.9595 33.7681 29.7139 33.0137 30.6444 33.0137C31.575 33.0137 32.3294 33.7681 32.3294 34.6986Z"}
  },
  {
    id :'sofaTable',
    offsetX: 480,
    offsetY:336,
    // Size of the node
    width: 33,
    height: 20,
    shape:{ type : 'Path', data:'M4 5C4 4.44772 4.44772 4 5 4H83C83.5523 4 84 4.44772 84 5V53C84 53.5523 83.5523 54 83 54H5C4.44772 54 4 53.5523 4 53V5Z M4 6.5C4 6.77614 3.77462 7.00425 3.50231 6.95843C3.08607 6.88841 2.68736 6.73099 2.33329 6.49441C1.83994 6.16477 1.45543 5.69623 1.22836 5.14805C1.0013 4.59987 0.94189 3.99667 1.05765 3.41473C1.1734 2.83279 1.45912 2.29824 1.87868 1.87868C2.29824 1.45912 2.83279 1.1734 3.41473 1.05765C3.99667 0.94189 4.59987 1.0013 5.14805 1.22836C5.69623 1.45543 6.16477 1.83994 6.49441 2.33329C6.73099 2.68736 6.88841 3.08607 6.95843 3.50231C7.00424 3.77462 6.77614 4 6.5 4L4.5 4C4.22386 4 4 4.22386 4 4.5L4 6.5Z M81.5 4C81.2239 4 80.9958 3.77462 81.0416 3.50231C81.1116 3.08607 81.269 2.68736 81.5056 2.33329C81.8352 1.83994 82.3038 1.45543 82.852 1.22836C83.4001 1.0013 84.0033 0.94189 84.5853 1.05765C85.1672 1.1734 85.7018 1.45912 86.1213 1.87868C86.5409 2.29824 86.8266 2.83279 86.9424 3.41473C87.0581 3.99667 86.9987 4.59987 86.7716 5.14805C86.5446 5.69623 86.1601 6.16477 85.6667 6.49441C85.3126 6.73099 84.9139 6.88841 84.4977 6.95843C84.2254 7.00424 84 6.77614 84 6.5V4.5C84 4.22386 83.7761 4 83.5 4L81.5 4Z M6.5 54C6.77614 54 7.00425 54.2254 6.95843 54.4977C6.88841 54.9139 6.73099 55.3126 6.49441 55.6667C6.16477 56.1601 5.69623 56.5446 5.14805 56.7716C4.59987 56.9987 3.99667 57.0581 3.41473 56.9424C2.83279 56.8266 2.29824 56.5409 1.87868 56.1213C1.45912 55.7018 1.1734 55.1672 1.05765 54.5853C0.94189 54.0033 1.0013 53.4001 1.22836 52.852C1.45543 52.3038 1.83994 51.8352 2.33329 51.5056C2.68736 51.269 3.08607 51.1116 3.50231 51.0416C3.77462 50.9958 4 51.2239 4 51.5V53.5C4 53.7761 4.22386 54 4.5 54H6.5Z M84 51.5C84 51.2239 84.2254 50.9958 84.4977 51.0416C84.9139 51.1116 85.3126 51.269 85.6667 51.5056C86.1601 51.8352 86.5446 52.3038 86.7716 52.852C86.9987 53.4001 87.0581 54.0033 86.9424 54.5853C86.8266 55.1672 86.5409 55.7018 86.1213 56.1213C85.7018 56.5409 85.1672 56.8266 84.5853 56.9424C84.0033 57.0581 83.4001 56.9987 82.852 56.7716C82.3038 56.5446 81.8352 56.1601 81.5056 55.6667C81.269 55.3126 81.1116 54.9139 81.0416 54.4977C80.9958 54.2254 81.2239 54 81.5 54H83.5C83.7761 54 84 53.7761 84 53.5V51.5Z'}
  },
  {
    id :'flatTV',
    offsetX: 573,
    offsetY:337,
    // Size of the node
    width: 68,
    height: 9,
    rotateAngle:90,
    shape:{ type : 'Path', data:'M1 14H92M1 14V19H92V14M1 14V9H92V14M37 1V6M39 1V6M41 1V6M43 1V6M45 1V6M47 1V6M49 1V6M51 1V6M53 1V6M55 1V6M23 1H70L76 6H17L23 1ZM5 6H88V9H5V6Z'}
  },
  {
    id :'plantTable',
    offsetX: 395,
    offsetY:376,
    // Size of the node
    width: 33,
    height: 27,
    shape:{ type : 'Path', data:"M57 29C57 44.464 44.464 57 29 57C13.536 57 1 44.464 1 29C1 13.536 13.536 1 29 1C44.464 1 57 13.536 57 29Z"}
  },
  {
    id :'plant',
    offsetX: 395,
    offsetY:376,
    // Size of the node
    width: 22,
    height: 20,
    shape:{ type : 'Path', data:'M25.9813 23.5141C27.2901 23.5993 48.6838 19.0468 41.4746 10.8333C36.916 5.63963 21.1089 23.1968 25.9813 23.5141Z M23.6253 25.9234C23.1736 27.1547 21.4942 48.9629 31.4103 44.3689C37.6806 41.464 25.3067 21.3392 23.6253 25.9234Z M25.5989 25.6003C26.3978 26.6405 43.9262 39.7237 45.3483 28.888C46.2474 22.0363 22.6249 21.7278 25.5989 25.6003Z M24.7197 20.7567C25.6675 19.8502 36.7808 1.01108 25.8549 0.76778C18.9461 0.613932 21.191 24.1316 24.7197 20.7567Z M20.8885 22.8171C19.6966 22.2698 -1.91128 18.8763 1.88665 29.1238C4.2882 35.6035 25.3258 24.8547 20.8885 22.8171Z M21.6607 25.6193C20.3938 25.9588 1.59406 37.1385 11.0585 42.6028C17.0432 46.0581 26.3771 24.3556 21.6607 25.6193Z M22.3667 20.2554C21.8975 19.0306 8.82513 1.49408 4.37366 11.475C1.55885 17.7863 24.1136 24.815 22.3667 20.2554Z M40.0382 18.2498C40.7878 20.1543 41.1995 22.2289 41.1995 24.3996C41.1995 24.5507 41.1975 24.7013 41.1935 24.8515M35.2235 11.5507C33.6921 10.2594 31.9267 9.2368 30 8.55572M39 32.7159C37.5069 35.3317 35.3311 37.5074 32.7153 39.0004M24.8419 41.1939C24.6949 41.1977 24.5474 41.1996 24.3995 41.1996C21.7821 41.1996 19.3046 40.6011 17.0963 39.5334M10.7727 34.2278C9.9752 33.1239 9.30848 31.9193 8.79533 30.6367M7.70563 22.5004C7.89672 20.8019 8.34106 19.1801 9 17.6736M13.9123 11.274C16.1576 9.47777 18.8737 8.24563 21.846 7.79239M25.9813 23.5141C27.2901 23.5993 48.6838 19.0468 41.4746 10.8333C36.916 5.63963 21.1089 23.1968 25.9813 23.5141ZM23.6253 25.9234C23.1736 27.1547 21.4942 48.9629 31.4103 44.3689C37.6806 41.464 25.3067 21.3392 23.6253 25.9234ZM25.5989 25.6003C26.3978 26.6405 43.9262 39.7237 45.3483 28.888C46.2474 22.0363 22.6249 21.7278 25.5989 25.6003ZM24.7197 20.7567C25.6675 19.8502 36.7808 1.01108 25.8549 0.76778C18.9461 0.613932 21.191 24.1316 24.7197 20.7567ZM20.8885 22.8171C19.6966 22.2698 -1.91128 18.8763 1.88665 29.1238C4.2882 35.6035 25.3258 24.8547 20.8885 22.8171ZM21.6607 25.6193C20.3938 25.9588 1.59406 37.1385 11.0585 42.6028C17.0432 46.0581 26.3771 24.3556 21.6607 25.6193ZM22.3667 20.2554C21.8975 19.0306 8.82513 1.49408 4.37366 11.475C1.55885 17.7863 24.1136 24.815 22.3667 20.2554Z'}
  },
  {
    id :'diningTable',
    offsetX: 370,
    offsetY:176,
    // Size of the node
    width: 100,
    height: 90,
    shape:{ type : 'Path', data:"M25.0284 6.47992C24.7452 3.54248 27.0543 1 30.0053 1H45.9947C48.9457 1 51.2548 3.54248 50.9716 6.47992L50.15 15L25.85 15L25.0284 6.47992ZM58.0284 6.47992C57.7452 3.54248 60.0543 1 63.0053 1H78.9947C81.9457 1 84.2548 3.54248 83.9716 6.47992L83.15 15L58.85 15L58.0284 6.47992Z M84.9716 73.5201C85.2548 76.4575 82.9457 79 79.9947 79H64.0053C61.0543 79 58.7452 76.4575 59.0284 73.5201L59.85 65H84.15L84.9716 73.5201Z M51.9716 73.5201C52.2548 76.4575 49.9457 79 46.9947 79H31.0053C28.0543 79 25.7452 76.4575 26.0284 73.5201L26.85 65H51.15L51.9716 73.5201Z M6.47992 53.4716C3.54249 53.7548 1 51.4457 1 48.4947L1 32.5053C1 29.5543 3.54249 27.2452 6.47992 27.5284L15 28.35V52.65L6.47992 53.4716Z M103.52 27.5284C106.458 27.2452 109 29.5543 109 32.5053V48.4947C109 51.4457 106.458 53.7548 103.52 53.4716L95 52.65V28.35L103.52 27.5284Z M91 15H19C16.7909 15 15 16.7909 15 19V61C15 63.2091 16.7909 65 19 65H91C93.2091 65 95 63.2091 95 61V19C95 16.7909 93.2091 15 91 15Z M50.15 15V15.5H50.6041L50.6477 15.048L50.15 15ZM25.85 15L25.3523 15.048L25.3959 15.5H25.85V15ZM50.9716 6.47992L50.4739 6.43192L50.9716 6.47992ZM25.0284 6.47992L24.5307 6.52791L25.0284 6.47992ZM32 1V0.5L31.5 0.5V1H32ZM45 1H45.5V0.500001L45 0.500001V1ZM36 6V5.5V6ZM32 2L32.5 2V2H32ZM41 6V6.5V6ZM45 2H45.5H45ZM83.15 15V15.5H83.6041L83.6477 15.048L83.15 15ZM58.85 15L58.3523 15.048L58.3959 15.5H58.85V15ZM83.9716 6.47992L83.4739 6.43192L83.9716 6.47992ZM58.0284 6.47992L58.5261 6.43192L58.0284 6.47992ZM65 1V0.5L64.5 0.5V1H65ZM78 1H78.5V0.500001L78 0.500001V1ZM69 6V5.5V6ZM65 2L65.5 2V2H65ZM74 6V6.5V6ZM78 2H78.5H78ZM59.85 65V64.5H59.3959L59.3523 64.952L59.85 65ZM84.15 65L84.6477 64.952L84.6041 64.5H84.15V65ZM59.0284 73.5201L59.5261 73.5681L59.0284 73.5201ZM84.9716 73.5201L84.4739 73.5681L84.9716 73.5201ZM78 79V79.5H78.5V79H78ZM65 79H64.5V79.5H65V79ZM74 74V73.5V74ZM78 78H77.5H78ZM69 74V74.5V74ZM65 78H64.5H65ZM26.85 65V64.5H26.3959L26.3523 64.952L26.85 65ZM51.15 65L51.6477 64.952L51.6041 64.5H51.15V65ZM26.0284 73.5201L26.5261 73.5681L26.0284 73.5201ZM51.9716 73.5201L51.4739 73.5681L51.9716 73.5201ZM15 28.35H15.5V27.8959L15.048 27.8523L15 28.35ZM15 52.65L15.048 53.1477L15.5 53.1041V52.65H15ZM1 32.5053H0.500002H1ZM6.47992 27.5284L6.43193 28.0261L6.47992 27.5284ZM1 48.4947H1.5H1ZM6.47992 53.4716L6.43192 52.9739L6.47992 53.4716ZM45 79V79.5H45.5V79H45ZM32 79H31.5V79.5H32V79ZM41 74V73.5V74ZM45 78H44.5H45ZM36 74V74.5V74ZM32 78H31.5H32ZM1 47H0.5L0.5 47.5H1V47ZM1 34V33.5H0.500002L0.500002 34H1ZM6 43H6.5H6ZM2 47L2 46.5H2V47ZM6 38H5.5H6ZM2 34V33.5V34ZM95 52.65H94.5V53.1041L94.952 53.1477L95 52.65ZM95 28.35L94.952 27.8523L94.5 27.8959V28.35H95ZM109 48.4947H109.5H109ZM103.52 53.4716L103.472 53.9693L103.52 53.4716ZM109 32.5053H108.5H109ZM103.52 27.5284L103.568 28.0261L103.52 27.5284ZM109 34H109.5V33.5H109V34ZM109 47V47.5H109.5V47H109ZM104 38H103.5H104ZM108 34V34.5V34ZM104 43H104.5H104ZM108 47V47.5V47ZM30.0053 1.5H45.9947V0.5H30.0053V1.5ZM50.4739 6.43192L49.6523 14.952L50.6477 15.048L51.4693 6.52791L50.4739 6.43192ZM50.15 14.5L25.85 14.5V15.5L50.15 15.5V14.5ZM26.3477 14.952L25.5261 6.43192L24.5307 6.52791L25.3523 15.048L26.3477 14.952ZM45.9947 1.5C48.6506 1.5 50.7288 3.78824 50.4739 6.43192L51.4693 6.52791C51.7808 3.29673 49.2408 0.5 45.9947 0.5V1.5ZM30.0053 0.5C26.7592 0.5 24.2192 3.29673 24.5307 6.52791L25.5261 6.43192C25.2712 3.78824 27.3494 1.5 30.0053 1.5V0.5ZM41 5.5L36 5.5V6.5L41 6.5V5.5ZM32.5 2V1H31.5V2H32.5ZM32 1.5L45 1.5V0.500001L32 0.5V1.5ZM44.5 1V2H45.5V1H44.5ZM36 5.5C34.067 5.5 32.5 3.933 32.5 2L31.5 2C31.5 4.48528 33.5147 6.5 36 6.5V5.5ZM41 6.5C43.4853 6.5 45.5 4.48528 45.5 2H44.5C44.5 3.933 42.933 5.5 41 5.5V6.5ZM63.0053 1.5H78.9947V0.5H63.0053V1.5ZM83.4739 6.43192L82.6523 14.952L83.6477 15.048L84.4693 6.52791L83.4739 6.43192ZM83.15 14.5L58.85 14.5V15.5L83.15 15.5V14.5ZM59.3477 14.952L58.5261 6.43192L57.5307 6.52791L58.3523 15.048L59.3477 14.952ZM78.9947 1.5C81.6506 1.5 83.7288 3.78824 83.4739 6.43192L84.4693 6.52791C84.7809 3.29673 82.2408 0.5 78.9947 0.5V1.5ZM63.0053 0.5C59.7592 0.5 57.2192 3.29673 57.5307 6.52791L58.5261 6.43192C58.2712 3.78824 60.3494 1.5 63.0053 1.5V0.5ZM74 5.5L69 5.5V6.5L74 6.5V5.5ZM65.5 2V1H64.5V2H65.5ZM65 1.5L78 1.5V0.500001L65 0.5V1.5ZM77.5 1V2H78.5V1H77.5ZM69 5.5C67.067 5.5 65.5 3.933 65.5 2L64.5 2C64.5 4.48528 66.5147 6.5 69 6.5V5.5ZM74 6.5C76.4853 6.5 78.5 4.48528 78.5 2H77.5C77.5 3.933 75.933 5.5 74 5.5V6.5ZM79.9947 78.5H64.0053V79.5H79.9947V78.5ZM59.5261 73.5681L60.3477 65.048L59.3523 64.952L58.5307 73.4721L59.5261 73.5681ZM59.85 65.5H84.15V64.5H59.85V65.5ZM83.6523 65.048L84.4739 73.5681L85.4693 73.4721L84.6477 64.952L83.6523 65.048ZM64.0053 78.5C61.3494 78.5 59.2712 76.2118 59.5261 73.5681L58.5307 73.4721C58.2192 76.7033 60.7592 79.5 64.0053 79.5V78.5ZM79.9947 79.5C83.2408 79.5 85.7809 76.7033 85.4693 73.4721L84.4739 73.5681C84.7288 76.2118 82.6506 78.5 79.9947 78.5V79.5ZM69 74.5H74V73.5H69V74.5ZM77.5 78V79H78.5V78H77.5ZM78 78.5H65V79.5H78V78.5ZM65.5 79V78H64.5V79H65.5ZM74 74.5C75.933 74.5 77.5 76.067 77.5 78H78.5C78.5 75.5147 76.4853 73.5 74 73.5V74.5ZM69 73.5C66.5147 73.5 64.5 75.5147 64.5 78H65.5C65.5 76.067 67.067 74.5 69 74.5V73.5ZM46.9947 78.5H31.0053V79.5H46.9947V78.5ZM26.5261 73.5681L27.3477 65.048L26.3523 64.952L25.5307 73.4721L26.5261 73.5681ZM26.85 65.5H51.15V64.5H26.85V65.5ZM50.6523 65.048L51.4739 73.5681L52.4693 73.4721L51.6477 64.952L50.6523 65.048ZM31.0053 78.5C28.3494 78.5 26.2712 76.2118 26.5261 73.5681L25.5307 73.4721C25.2192 76.7033 27.7592 79.5 31.0053 79.5V78.5ZM46.9947 79.5C50.2408 79.5 52.7808 76.7033 52.4693 73.4721L51.4739 73.5681C51.7288 76.2118 49.6506 78.5 46.9947 78.5V79.5ZM1.5 48.4947L1.5 32.5053H0.500002L0.500001 48.4947H1.5ZM6.43193 28.0261L14.952 28.8477L15.048 27.8523L6.52791 27.0307L6.43193 28.0261ZM14.5 28.35V52.65H15.5V28.35H14.5ZM14.952 52.1523L6.43192 52.9739L6.52791 53.9693L15.048 53.1477L14.952 52.1523ZM1.5 32.5053C1.5 29.8494 3.78824 27.7712 6.43193 28.0261L6.52791 27.0307C3.29674 26.7192 0.500002 29.2592 0.500002 32.5053H1.5ZM0.500001 48.4947C0.500001 51.7408 3.29673 54.2808 6.52791 53.9693L6.43192 52.9739C3.78824 53.2288 1.5 51.1506 1.5 48.4947H0.500001ZM36 74.5H41V73.5H36V74.5ZM44.5 78V79H45.5V78H44.5ZM45 78.5H32V79.5H45V78.5ZM32.5 79V78H31.5V79H32.5ZM41 74.5C42.933 74.5 44.5 76.067 44.5 78H45.5C45.5 75.5147 43.4853 73.5 41 73.5V74.5ZM36 73.5C33.5147 73.5 31.5 75.5147 31.5 78H32.5C32.5 76.067 34.067 74.5 36 74.5V73.5ZM5.5 38L5.5 43H6.5L6.5 38H5.5ZM2 46.5H1V47.5H2V46.5ZM1.5 47L1.5 34H0.500002L0.5 47H1.5ZM1 34.5H2V33.5H1V34.5ZM5.5 43C5.5 44.933 3.933 46.5 2 46.5L2 47.5C4.48528 47.5 6.5 45.4853 6.5 43H5.5ZM6.5 38C6.5 35.5147 4.48528 33.5 2 33.5L2 34.5C3.933 34.5 5.5 36.067 5.5 38H6.5ZM108.5 32.5053V48.4947H109.5V32.5053H108.5ZM103.568 52.9739L95.048 52.1523L94.952 53.1477L103.472 53.9693L103.568 52.9739ZM95.5 52.65V28.35H94.5V52.65H95.5ZM95.048 28.8477L103.568 28.0261L103.472 27.0307L94.952 27.8523L95.048 28.8477ZM108.5 48.4947C108.5 51.1506 106.212 53.2288 103.568 52.9739L103.472 53.9693C106.703 54.2808 109.5 51.7408 109.5 48.4947H108.5ZM109.5 32.5053C109.5 29.2592 106.703 26.7192 103.472 27.0307L103.568 28.0261C106.212 27.7712 108.5 29.8494 108.5 32.5053H109.5ZM104.5 43V38H103.5V43H104.5ZM108 34.5H109V33.5H108V34.5ZM108.5 34V47H109.5V34H108.5ZM109 46.5H108V47.5H109V46.5ZM104.5 38C104.5 36.067 106.067 34.5 108 34.5V33.5C105.515 33.5 103.5 35.5147 103.5 38H104.5ZM103.5 43C103.5 45.4853 105.515 47.5 108 47.5V46.5C106.067 46.5 104.5 44.933 104.5 43H103.5ZM19 15.5H91V14.5H19V15.5ZM94.5 19V61H95.5V19H94.5ZM91 64.5H19V65.5H91V64.5ZM15.5 61V19H14.5V61H15.5ZM19 64.5C17.067 64.5 15.5 62.933 15.5 61H14.5C14.5 63.4853 16.5147 65.5 19 65.5V64.5ZM94.5 61C94.5 62.933 92.933 64.5 91 64.5V65.5C93.4853 65.5 95.5 63.4853 95.5 61H94.5ZM91 15.5C92.933 15.5 94.5 17.067 94.5 19H95.5C95.5 16.5147 93.4853 14.5 91 14.5V15.5ZM19 14.5C16.5147 14.5 14.5 16.5147 14.5 19H15.5C15.5 17.067 17.067 15.5 19 15.5V14.5Z"}
  },
  {
    id :'room3Door',
    offsetX: 607,
    offsetY:298,
    // Size of the node
    width: 52,
    height: 38,
   rotateAngle:180,
    shape:{ type : 'Path', data:'M1 71L1 79L72 79V71M1 71L72 71M1 71C1 32.3401 32.3401 1 71 1H72V71'}
  },
  {
    id :'room3Window',
    offsetX: 740,
    offsetY: 480,
    // Size of the node
    width: 80,
    height: 4,
    shape:{ type : 'Path', data:'M22 5.5L124 5.50001M145 9L128 9V1L145 1V9ZM1 1L18 1L18 9L1 9L1 1ZM128 8L124 8V2L128 2V8ZM18 2L22 2L22 8L18 8L18 2Z'}
  },
  {
    id :'room3Bed',
    offsetX: 812,
    offsetY: 385,
    // Size of the node
    width: 68,
    height: 87,
    rotateAngle:90,
    shape:{ type : 'Path', data:'M1 54V2C1 1.44772 1.44772 1 2 1H44C44.5523 1 45 1.44771 45 2V54C45 54.5523 44.5523 55 44 55H2C1.44772 55 1 54.5523 1 54Z  M8 14V8C8 7.44772 8.44772 7 9 7H19C19.5523 7 20 7.44772 20 8V14C20 14.5523 19.5523 15 19 15H9C8.44772 15 8 14.5523 8 14Z M26 14V8C26 7.44772 26.4477 7 27 7H37C37.5523 7 38 7.44772 38 8V14C38 14.5523 37.5523 15 37 15H27C26.4477 15 26 14.5523 26 14Z M0.5 2V54H1.5V2H0.5ZM2 55.5H44V54.5H2V55.5ZM45.5 54V2H44.5V54H45.5ZM2 1.5H44V0.5H2V1.5ZM45.5 2C45.5 1.17157 44.8284 0.5 44 0.5V1.5C44.2761 1.5 44.5 1.72386 44.5 2H45.5ZM44 55.5C44.8284 55.5 45.5 54.8284 45.5 54H44.5C44.5 54.2761 44.2761 54.5 44 54.5V55.5ZM0.5 54C0.5 54.8284 1.17157 55.5 2 55.5V54.5C1.72386 54.5 1.5 54.2761 1.5 54H0.5ZM1.5 2C1.5 1.72386 1.72386 1.5 2 1.5V0.5C1.17157 0.5 0.5 1.17157 0.5 2H1.5ZM1 21.5H45V20.5H1V21.5ZM7.5 8V14H8.5V8H7.5ZM9 15.5H19V14.5H9V15.5ZM20.5 14V8H19.5V14H20.5ZM19 6.5H9V7.5H19V6.5ZM20.5 8C20.5 7.17157 19.8284 6.5 19 6.5V7.5C19.2761 7.5 19.5 7.72386 19.5 8H20.5ZM19 15.5C19.8284 15.5 20.5 14.8284 20.5 14H19.5C19.5 14.2761 19.2761 14.5 19 14.5V15.5ZM7.5 14C7.5 14.8284 8.17157 15.5 9 15.5V14.5C8.72386 14.5 8.5 14.2761 8.5 14H7.5ZM8.5 8C8.5 7.72386 8.72386 7.5 9 7.5V6.5C8.17157 6.5 7.5 7.17157 7.5 8H8.5ZM25.5 8V14H26.5V8H25.5ZM27 15.5H37V14.5H27V15.5ZM38.5 14V8H37.5V14H38.5ZM37 6.5H27V7.5H37V6.5ZM38.5 8C38.5 7.17157 37.8284 6.5 37 6.5V7.5C37.2761 7.5 37.5 7.72386 37.5 8H38.5ZM37 15.5C37.8284 15.5 38.5 14.8284 38.5 14H37.5C37.5 14.2761 37.2761 14.5 37 14.5V15.5ZM25.5 14C25.5 14.8284 26.1716 15.5 27 15.5V14.5C26.7239 14.5 26.5 14.2761 26.5 14H25.5ZM26.5 8C26.5 7.72386 26.7239 7.5 27 7.5V6.5C26.1716 6.5 25.5 7.17157 25.5 8H26.5Z'}
  },
  {
    id :'room3Table',
    offsetX: 842,
    offsetY: 325,
    // Size of the node
    width: 26,
    height: 28,
    shape:{ type : 'Path', data:'M79 1H3C1.89543 1 1 1.89543 1 3V49C1 50.1046 1.89543 51 3 51H79C80.1046 51 81 50.1046 81 49V3C81 1.89543 80.1046 1 79 1Z'}
  },
  {
    id :'room3PotTable',
    offsetX: 841,
    offsetY: 455,
    // Size of the node
    width: 30,
    height: 30,
    shape:{ type : 'Path', data:"M57 29C57 44.464 44.464 57 29 57C13.536 57 1 44.464 1 29C1 13.536 13.536 1 29 1C44.464 1 57 13.536 57 29Z"}
  },
  {
    id :'room3FlowerPot',
    offsetX: 841,
    offsetY: 455,
    // Size of the node
    width: 25,
    height: 25,
    shape:{ type : 'Path', data:'M25.9813 23.5141C27.2901 23.5993 48.6838 19.0468 41.4746 10.8333C36.916 5.63963 21.1089 23.1968 25.9813 23.5141Z M23.6253 25.9234C23.1736 27.1547 21.4942 48.9629 31.4103 44.3689C37.6806 41.464 25.3067 21.3392 23.6253 25.9234Z M25.5989 25.6003C26.3978 26.6405 43.9262 39.7237 45.3483 28.888C46.2474 22.0363 22.6249 21.7278 25.5989 25.6003Z M24.7197 20.7567C25.6675 19.8502 36.7808 1.01108 25.8549 0.76778C18.9461 0.613932 21.191 24.1316 24.7197 20.7567Z M20.8885 22.8171C19.6966 22.2698 -1.91128 18.8763 1.88665 29.1238C4.2882 35.6035 25.3258 24.8547 20.8885 22.8171Z M21.6607 25.6193C20.3938 25.9588 1.59406 37.1385 11.0585 42.6028C17.0432 46.0581 26.3771 24.3556 21.6607 25.6193Z M22.3667 20.2554C21.8975 19.0306 8.82513 1.49408 4.37366 11.475C1.55885 17.7863 24.1136 24.815 22.3667 20.2554Z M40.0382 18.2498C40.7878 20.1543 41.1995 22.2289 41.1995 24.3996C41.1995 24.5507 41.1975 24.7013 41.1935 24.8515M35.2235 11.5507C33.6921 10.2594 31.9267 9.2368 30 8.55572M39 32.7159C37.5069 35.3317 35.3311 37.5074 32.7153 39.0004M24.8419 41.1939C24.6949 41.1977 24.5474 41.1996 24.3995 41.1996C21.7821 41.1996 19.3046 40.6011 17.0963 39.5334M10.7727 34.2278C9.9752 33.1239 9.30848 31.9193 8.79533 30.6367M7.70563 22.5004C7.89672 20.8019 8.34106 19.1801 9 17.6736M13.9123 11.274C16.1576 9.47777 18.8737 8.24563 21.846 7.79239M25.9813 23.5141C27.2901 23.5993 48.6838 19.0468 41.4746 10.8333C36.916 5.63963 21.1089 23.1968 25.9813 23.5141ZM23.6253 25.9234C23.1736 27.1547 21.4942 48.9629 31.4103 44.3689C37.6806 41.464 25.3067 21.3392 23.6253 25.9234ZM25.5989 25.6003C26.3978 26.6405 43.9262 39.7237 45.3483 28.888C46.2474 22.0363 22.6249 21.7278 25.5989 25.6003ZM24.7197 20.7567C25.6675 19.8502 36.7808 1.01108 25.8549 0.76778C18.9461 0.613932 21.191 24.1316 24.7197 20.7567ZM20.8885 22.8171C19.6966 22.2698 -1.91128 18.8763 1.88665 29.1238C4.2882 35.6035 25.3258 24.8547 20.8885 22.8171ZM21.6607 25.6193C20.3938 25.9588 1.59406 37.1385 11.0585 42.6028C17.0432 46.0581 26.3771 24.3556 21.6607 25.6193ZM22.3667 20.2554C21.8975 19.0306 8.82513 1.49408 4.37366 11.475C1.55885 17.7863 24.1136 24.815 22.3667 20.2554Z'}
  },
  {
    id :'room3Bookcase',
    offsetX: 592,
    offsetY: 370,
    // Size of the node
    width: 63,
    height: 25,
    rotateAngle:-90,
    shape:{ type : 'Path', data:'M113 9V1H1V9M113 9H1M113 9V29H1V9M4 12H11V25H4V12ZM13 12H20V25H13V12ZM22 12H29V25H22V12ZM31 12H38V25H31V12ZM40 12H47V25H40V12ZM49 12H56V25H49V12ZM58 12H65V25H58V12ZM67 12H74V25H67V12ZM76 12H83V25H76V12ZM85 12H92V25H85V12ZM94 12H101V25H94V12ZM103 12H110V25H103V12Z'}
  },
  {
    id :'room3WorkTable',
    offsetX: 600,
    offsetY: 435,
    // Size of the node
    width: 41,
    height: 30,
    rotateAngle:90,
    shape:{ type : 'Path', data:"M4 5C4 4.44772 4.44772 4 5 4H83C83.5523 4 84 4.44772 84 5V53C84 53.5523 83.5523 54 83 54H5C4.44772 54 4 53.5523 4 53V5Z M4 6.5C4 6.77614 3.77462 7.00425 3.50231 6.95843C3.08607 6.88841 2.68736 6.73099 2.33329 6.49441C1.83994 6.16477 1.45543 5.69623 1.22836 5.14805C1.0013 4.59987 0.94189 3.99667 1.05765 3.41473C1.1734 2.83279 1.45912 2.29824 1.87868 1.87868C2.29824 1.45912 2.83279 1.1734 3.41473 1.05765C3.99667 0.94189 4.59987 1.0013 5.14805 1.22836C5.69623 1.45543 6.16477 1.83994 6.49441 2.33329C6.73099 2.68736 6.88841 3.08607 6.95843 3.50231C7.00424 3.77462 6.77614 4 6.5 4L4.5 4C4.22386 4 4 4.22386 4 4.5L4 6.5Z M81.5 4C81.2239 4 80.9958 3.77462 81.0416 3.50231C81.1116 3.08607 81.269 2.68736 81.5056 2.33329C81.8352 1.83994 82.3038 1.45543 82.852 1.22836C83.4001 1.0013 84.0033 0.94189 84.5853 1.05765C85.1672 1.1734 85.7018 1.45912 86.1213 1.87868C86.5409 2.29824 86.8266 2.83279 86.9424 3.41473C87.0581 3.99667 86.9987 4.59987 86.7716 5.14805C86.5446 5.69623 86.1601 6.16477 85.6667 6.49441C85.3126 6.73099 84.9139 6.88841 84.4977 6.95843C84.2254 7.00424 84 6.77614 84 6.5V4.5C84 4.22386 83.7761 4 83.5 4L81.5 4Z M6.5 54C6.77614 54 7.00425 54.2254 6.95843 54.4977C6.88841 54.9139 6.73099 55.3126 6.49441 55.6667C6.16477 56.1601 5.69623 56.5446 5.14805 56.7716C4.59987 56.9987 3.99667 57.0581 3.41473 56.9424C2.83279 56.8266 2.29824 56.5409 1.87868 56.1213C1.45912 55.7018 1.1734 55.1672 1.05765 54.5853C0.94189 54.0033 1.0013 53.4001 1.22836 52.852C1.45543 52.3038 1.83994 51.8352 2.33329 51.5056C2.68736 51.269 3.08607 51.1116 3.50231 51.0416C3.77462 50.9958 4 51.2239 4 51.5V53.5C4 53.7761 4.22386 54 4.5 54H6.5Z M84 51.5C84 51.2239 84.2254 50.9958 84.4977 51.0416C84.9139 51.1116 85.3126 51.269 85.6667 51.5056C86.1601 51.8352 86.5446 52.3038 86.7716 52.852C86.9987 53.4001 87.0581 54.0033 86.9424 54.5853C86.8266 55.1672 86.5409 55.7018 86.1213 56.1213C85.7018 56.5409 85.1672 56.8266 84.5853 56.9424C84.0033 57.0581 83.4001 56.9987 82.852 56.7716C82.3038 56.5446 81.8352 56.1601 81.5056 55.6667C81.269 55.3126 81.1116 54.9139 81.0416 54.4977C80.9958 54.2254 81.2239 54 81.5 54H83.5C83.7761 54 84 53.7761 84 53.5V51.5Z"}
  },
  {
    id :'room3Laptop',
    offsetX: 600,
    offsetY: 435,
    // Size of the node
    width: 30,
    height: 17,
    rotateAngle:270,
    shape:{ type : 'Path', data:"M1.06567 5.71554C0.619244 3.26018 2.50554 1 5.00115 1H61.0006C63.4675 1 65.3464 3.21135 64.9481 5.64595L61.7571 25.146C61.4407 27.08 59.7695 28.5 57.8096 28.5H8.54661C6.61347 28.5 4.95694 27.1175 4.61113 25.2155L1.06567 5.71554Z M3.7083 33C3.7083 30.7909 5.49916 29 7.7083 29H58.7083C60.9174 29 62.7083 30.7909 62.7083 33V55C62.7083 57.2091 60.9174 59 58.7083 59H7.7083C5.49916 59 3.7083 57.2091 3.7083 55V33Z M26.7083 50C26.7083 49.4477 27.156 49 27.7083 49H38.7083C39.2606 49 39.7083 49.4477 39.7083 50V54C39.7083 54.5523 39.2606 55 38.7083 55H27.7083C27.156 55 26.7083 54.5523 26.7083 54V50Z M8.7083 35.5C8.7083 35.2239 8.93216 35 9.2083 35H12.2083C12.4844 35 12.7083 35.2239 12.7083 35.5V36.5C12.7083 36.7761 12.4844 37 12.2083 37H9.2083C8.93216 37 8.7083 36.7761 8.7083 36.5V35.5Z M8.7083 38.5C8.7083 38.2239 8.93216 38 9.2083 38H12.2083C12.4844 38 12.7083 38.2239 12.7083 38.5V39.5C12.7083 39.7761 12.4844 40 12.2083 40H9.2083C8.93216 40 8.7083 39.7761 8.7083 39.5V38.5Z M8.7083 41.5C8.7083 41.2239 8.93216 41 9.2083 41H12.2083C12.4844 41 12.7083 41.2239 12.7083 41.5V42.5C12.7083 42.7761 12.4844 43 12.2083 43H9.2083C8.93216 43 8.7083 42.7761 8.7083 42.5V41.5Z M8.7083 44.5C8.7083 44.2239 8.93216 44 9.2083 44H12.2083C12.4844 44 12.7083 44.2239 12.7083 44.5V45.5C12.7083 45.7761 12.4844 46 12.2083 46H9.2083C8.93216 46 8.7083 45.7761 8.7083 45.5V44.5Z M13.7083 35.5C13.7083 35.2239 13.9322 35 14.2083 35H17.2083C17.4844 35 17.7083 35.2239 17.7083 35.5V36.5C17.7083 36.7761 17.4844 37 17.2083 37H14.2083C13.9322 37 13.7083 36.7761 13.7083 36.5V35.5Z M13.7083 38.5C13.7083 38.2239 13.9322 38 14.2083 38H17.2083C17.4844 38 17.7083 38.2239 17.7083 38.5V39.5C17.7083 39.7761 17.4844 40 17.2083 40H14.2083C13.9322 40 13.7083 39.7761 13.7083 39.5V38.5Z M13.7083 41.5C13.7083 41.2239 13.9322 41 14.2083 41H17.2083C17.4844 41 17.7083 41.2239 17.7083 41.5V42.5C17.7083 42.7761 17.4844 43 17.2083 43H14.2083C13.9322 43 13.7083 42.7761 13.7083 42.5V41.5Z M13.7083 44.5C13.7083 44.2239 13.9322 44 14.2083 44H17.2083C17.4844 44 17.7083 44.2239 17.7083 44.5V45.5C17.7083 45.7761 17.4844 46 17.2083 46H14.2083C13.9322 46 13.7083 45.7761 13.7083 45.5V44.5Z M18.7083 35.5C18.7083 35.2239 18.9322 35 19.2083 35H22.2083C22.4844 35 22.7083 35.2239 22.7083 35.5V36.5C22.7083 36.7761 22.4844 37 22.2083 37H19.2083C18.9322 37 18.7083 36.7761 18.7083 36.5V35.5Z M18.7083 38.5C18.7083 38.2239 18.9322 38 19.2083 38H22.2083C22.4844 38 22.7083 38.2239 22.7083 38.5V39.5C22.7083 39.7761 22.4844 40 22.2083 40H19.2083C18.9322 40 18.7083 39.7761 18.7083 39.5V38.5Z M18.7083 41.5C18.7083 41.2239 18.9322 41 19.2083 41H22.2083C22.4844 41 22.7083 41.2239 22.7083 41.5V42.5C22.7083 42.7761 22.4844 43 22.2083 43H19.2083C18.9322 43 18.7083 42.7761 18.7083 42.5V41.5Z M18.7083 44.5C18.7083 44.2239 18.9322 44 19.2083 44H22.2083C22.4844 44 22.7083 44.2239 22.7083 44.5V45.5C22.7083 45.7761 22.4844 46 22.2083 46H19.2083C18.9322 46 18.7083 45.7761 18.7083 45.5V44.5Z M23.7083 35.5C23.7083 35.2239 23.9322 35 24.2083 35H27.2083C27.4844 35 27.7083 35.2239 27.7083 35.5V36.5C27.7083 36.7761 27.4844 37 27.2083 37H24.2083C23.9322 37 23.7083 36.7761 23.7083 36.5V35.5Z M23.7083 38.5C23.7083 38.2239 23.9322 38 24.2083 38H27.2083C27.4844 38 27.7083 38.2239 27.7083 38.5V39.5C27.7083 39.7761 27.4844 40 27.2083 40H24.2083C23.9322 40 23.7083 39.7761 23.7083 39.5V38.5Z M23.7083 41.5C23.7083 41.2239 23.9322 41 24.2083 41H27.2083C27.4844 41 27.7083 41.2239 27.7083 41.5V42.5C27.7083 42.7761 27.4844 43 27.2083 43H24.2083C23.9322 43 23.7083 42.7761 23.7083 42.5V41.5Z M23.7083 44.5C23.7083 44.2239 23.9322 44 24.2083 44H42.2083C42.4844 44 42.7083 44.2239 42.7083 44.5V45.5C42.7083 45.7761 42.4844 46 42.2083 46H24.2083C23.9322 46 23.7083 45.7761 23.7083 45.5V44.5Z M28.7083 35.5C28.7083 35.2239 28.9322 35 29.2083 35H32.2083C32.4844 35 32.7083 35.2239 32.7083 35.5V36.5C32.7083 36.7761 32.4844 37 32.2083 37H29.2083C28.9322 37 28.7083 36.7761 28.7083 36.5V35.5Z M28.7083 38.5C28.7083 38.2239 28.9322 38 29.2083 38H32.2083C32.4844 38 32.7083 38.2239 32.7083 38.5V39.5C32.7083 39.7761 32.4844 40 32.2083 40H29.2083C28.9322 40 28.7083 39.7761 28.7083 39.5V38.5Z M28.7083 41.5C28.7083 41.2239 28.9322 41 29.2083 41H32.2083C32.4844 41 32.7083 41.2239 32.7083 41.5V42.5C32.7083 42.7761 32.4844 43 32.2083 43H29.2083C28.9322 43 28.7083 42.7761 28.7083 42.5V41.5Z M33.7083 35.5C33.7083 35.2239 33.9322 35 34.2083 35H37.2083C37.4844 35 37.7083 35.2239 37.7083 35.5V36.5C37.7083 36.7761 37.4844 37 37.2083 37H34.2083C33.9322 37 33.7083 36.7761 33.7083 36.5V35.5Z M33.7083 38.5C33.7083 38.2239 33.9322 38 34.2083 38H37.2083C37.4844 38 37.7083 38.2239 37.7083 38.5V39.5C37.7083 39.7761 37.4844 40 37.2083 40H34.2083C33.9322 40 33.7083 39.7761 33.7083 39.5V38.5Z M33.7083 41.5C33.7083 41.2239 33.9322 41 34.2083 41H37.2083C37.4844 41 37.7083 41.2239 37.7083 41.5V42.5C37.7083 42.7761 37.4844 43 37.2083 43H34.2083C33.9322 43 33.7083 42.7761 33.7083 42.5V41.5Z M38.7083 35.5C38.7083 35.2239 38.9322 35 39.2083 35H42.2083C42.4844 35 42.7083 35.2239 42.7083 35.5V36.5C42.7083 36.7761 42.4844 37 42.2083 37H39.2083C38.9322 37 38.7083 36.7761 38.7083 36.5V35.5Z M38.7083 38.5C38.7083 38.2239 38.9322 38 39.2083 38H42.2083C42.4844 38 42.7083 38.2239 42.7083 38.5V39.5C42.7083 39.7761 42.4844 40 42.2083 40H39.2083C38.9322 40 38.7083 39.7761 38.7083 39.5V38.5Z M38.7083 41.5C38.7083 41.2239 38.9322 41 39.2083 41H42.2083C42.4844 41 42.7083 41.2239 42.7083 41.5V42.5C42.7083 42.7761 42.4844 43 42.2083 43H39.2083C38.9322 43 38.7083 42.7761 38.7083 42.5V41.5Z M43.7083 35.5C43.7083 35.2239 43.9322 35 44.2083 35H47.2083C47.4844 35 47.7083 35.2239 47.7083 35.5V36.5C47.7083 36.7761 47.4844 37 47.2083 37H44.2083C43.9322 37 43.7083 36.7761 43.7083 36.5V35.5Z M43.7083 38.5C43.7083 38.2239 43.9322 38 44.2083 38H47.2083C47.4844 38 47.7083 38.2239 47.7083 38.5V39.5C47.7083 39.7761 47.4844 40 47.2083 40H44.2083C43.9322 40 43.7083 39.7761 43.7083 39.5V38.5Z M43.7083 41.5C43.7083 41.2239 43.9322 41 44.2083 41H47.2083C47.4844 41 47.7083 41.2239 47.7083 41.5V42.5C47.7083 42.7761 47.4844 43 47.2083 43H44.2083C43.9322 43 43.7083 42.7761 43.7083 42.5V41.5Z M43.7083 44.5C43.7083 44.2239 43.9322 44 44.2083 44H47.2083C47.4844 44 47.7083 44.2239 47.7083 44.5V45.5C47.7083 45.7761 47.4844 46 47.2083 46H44.2083C43.9322 46 43.7083 45.7761 43.7083 45.5V44.5Z M48.7083 35.5C48.7083 35.2239 48.9322 35 49.2083 35H52.2083C52.4844 35 52.7083 35.2239 52.7083 35.5V36.5C52.7083 36.7761 52.4844 37 52.2083 37H49.2083C48.9322 37 48.7083 36.7761 48.7083 36.5V35.5Z M48.7083 38.5C48.7083 38.2239 48.9322 38 49.2083 38H52.2083C52.4844 38 52.7083 38.2239 52.7083 38.5V39.5C52.7083 39.7761 52.4844 40 52.2083 40H49.2083C48.9322 40 48.7083 39.7761 48.7083 39.5V38.5Z M48.7083 41.5C48.7083 41.2239 48.9322 41 49.2083 41H52.2083C52.4844 41 52.7083 41.2239 52.7083 41.5V42.5C52.7083 42.7761 52.4844 43 52.2083 43H49.2083C48.9322 43 48.7083 42.7761 48.7083 42.5V41.5Z M48.7083 44.5C48.7083 44.2239 48.9322 44 49.2083 44H52.2083C52.4844 44 52.7083 44.2239 52.7083 44.5V45.5C52.7083 45.7761 52.4844 46 52.2083 46H49.2083C48.9322 46 48.7083 45.7761 48.7083 45.5V44.5Z M53.7083 35.5C53.7083 35.2239 53.9322 35 54.2083 35H57.2083C57.4844 35 57.7083 35.2239 57.7083 35.5V36.5C57.7083 36.7761 57.4844 37 57.2083 37H54.2083C53.9322 37 53.7083 36.7761 53.7083 36.5V35.5Z M53.7083 38.5C53.7083 38.2239 53.9322 38 54.2083 38H57.2083C57.4844 38 57.7083 38.2239 57.7083 38.5V39.5C57.7083 39.7761 57.4844 40 57.2083 40H54.2083C53.9322 40 53.7083 39.7761 53.7083 39.5V38.5Z M53.7083 41.5C53.7083 41.2239 53.9322 41 54.2083 41H57.2083C57.4844 41 57.7083 41.2239 57.7083 41.5V42.5C57.7083 42.7761 57.4844 43 57.2083 43H54.2083C53.9322 43 53.7083 42.7761 53.7083 42.5V41.5Z M53.7083 44.5C53.7083 44.2239 53.9322 44 54.2083 44H57.2083C57.4844 44 57.7083 44.2239 57.7083 44.5V45.5C57.7083 45.7761 57.4844 46 57.2083 46H54.2083C53.9322 46 53.7083 45.7761 53.7083 45.5V44.5Z"}
  },
  {
    id :'room3Chair',
    offsetX: 635,
    offsetY: 435,
    // Size of the node
    width: 28,
    height: 32,
    rotateAngle:90,
    shape:{ type : 'Path', data:'M22 9V14M28 9.08984V14M13 54H37C41.4183 54 45 50.4183 45 46V22C45 17.5817 41.4183 14 37 14H13C8.58172 14 5 17.5817 5 22V46C5 50.4183 8.58172 54 13 54ZM3 45C1.89543 45 1 44.1046 1 43V25C1 23.8954 1.89543 23 3 23C4.10457 23 5 23.8954 5 25V43C5 44.1046 4.10457 45 3 45ZM11 5.79143C11 3.97975 12.2614 2.40196 14.0423 2.06981C22.0186 0.582241 27.6274 0.696364 35.7954 2.09976C37.6588 2.41991 39 4.05364 39 5.94429C39 8.4118 36.7616 10.2627 34.325 9.87346C27.5467 8.79067 22.4382 8.5351 15.7921 9.68406C13.3336 10.1091 11 8.28636 11 5.79143ZM47 45C45.8954 45 45 44.1046 45 43V25C45 23.8954 45.8954 23 47 23C48.1046 23 49 23.8954 49 25V43C49 44.1046 48.1046 45 47 45Z'}
  },
  {
    id :'room3Lamp',
    offsetX: 842,
    offsetY: 325,
    // Size of the node
    width: 20,
    height: 20,
    shape:{ type : 'Path', data:"M17 7C11.4772 7 7 11.4772 7 17C7 22.5228 11.4772 27 17 27C22.5228 27 27 22.5228 27 17C27 11.4772 22.5228 7 17 7ZM17 7V13.5M20.2363 18.5593L25.3654 21.3093M13.7544 18.4305L8.2541 21.6805M33 17C33 25.8366 25.8366 33 17 33C8.16344 33 1 25.8366 1 17C1 8.16344 8.16344 1 17 1C25.8366 1 33 8.16344 33 17ZM25.5 17C25.5 21.6944 21.6944 25.5 17 25.5C12.3056 25.5 8.5 21.6944 8.5 17C8.5 12.3056 12.3056 8.5 17 8.5C21.6944 8.5 25.5 12.3056 25.5 17ZM21 17C21 19.2091 19.2091 21 17 21C14.7909 21 13 19.2091 13 17C13 14.7909 14.7909 13 17 13C19.2091 13 21 14.7909 21 17Z"}
  },
  {
    id :'room3Warddrobe',
    offsetX: 740,
    offsetY: 304,
    // Size of the node
    width: 73,
    height: 35,
    shape:{ type : 'Path', data:"M50.6443 54.406L76 29L80.9998 28.9502H85.9996L55.594 59.3558L50.6443 54.406Z M12 29L36.9996 54.4053L32.0498 59.3551L2 29H12Z M70.7969 44.8594C70.6017 44.6642 70.6017 44.3476 70.7969 44.1523C70.9922 43.957 71.3088 43.957 71.504 44.1523L72.9182 45.5665C73.1135 45.7618 73.1135 46.0784 72.9182 46.2736C72.723 46.4689 72.4064 46.4689 72.2111 46.2736L70.7969 44.8594Z M16.1406 44.1524C16.3358 43.9571 16.6524 43.9571 16.8477 44.1524C17.043 44.3476 17.043 44.6642 16.8477 44.8595L15.4335 46.2737C15.2382 46.469 14.9216 46.469 14.7264 46.2737C14.5311 46.0784 14.5311 45.7619 14.7264 45.5666L16.1406 44.1524Z M1 1L87 1V29H1L1 1Z"}
  },
  {
    id :'room3ToiletDoor',
    offsetX: 843,
    offsetY: 266,
    // Size of the node
    width: 27,
    height: 30,
   
    shape:{ type : 'Path', data:'M1 71L1 79L72 79V71M1 71L72 71M1 71C1 32.3401 32.3401 1 71 1H72V71'}
  },
  {
    id :'toilet3BathTub',
    offsetX: 780,
    offsetY: 245,
    // Size of the node
    width: 50,
    height: 25,
    rotateAngle:90,
    shape:{ type : 'Path', data:"M1 9C1 4.58172 4.58172 1 9 1H84C88.4183 1 92 4.58172 92 9V40C92 44.4183 88.4183 48 84 48H9C4.58172 48 1 44.4183 1 40V9Z M12 24.5C12 14.2827 20.2827 6 30.5 6H61.5C71.7173 6 80 14.2827 80 24.5C80 34.7173 71.7173 43 61.5 43H30.5C20.2827 43 12 34.7173 12 24.5Z M11.5 26.5C11.5 26.5 12 26 12 25C12 24 11.5 23.5 11.5 23.5L22.0074 22.6917C23.3519 22.5883 24.5 23.6514 24.5 25C24.5 26.3486 23.3519 27.4117 22.0074 27.3083L11.5 26.5Z M8 21.5C9.933 21.5 11.5 23.067 11.5 25C11.5 26.933 9.933 28.5 8 28.5C6.067 28.5 4.5 26.933 4.5 25C4.5 23.067 6.067 21.5 8 21.5Z"}
  },
  {
    id :'toilet3Basin',
    offsetX: 842,
    offsetY: 196,
    // Size of the node
    width: 30,
    height: 25,
    rotateAngle:90,
    shape:{ type : 'Path', data:"M1 4C1 2.34315 2.34315 1 4 1H62C63.6569 1 65 2.34315 65 4V25C65 38.2548 54.2548 49 41 49H25C11.7452 49 1 38.2548 1 25V4Z M57 25C57 33.2843 46.2548 40 33 40C19.7452 40 9 33.2843 9 25C9 16.7157 19.7452 10 33 10C46.2548 10 57 16.7157 57 25Z M31 10C31 10 31.5 10.5 32.5 10.5C33.5 10.5 34 10 34 10L34.8083 20.5074C34.9117 21.8519 33.8486 23 32.5 23C31.1514 23 30.0883 21.8519 30.1917 20.5074L31 10Z M36 6.5C36 8.433 34.433 10 32.5 10C30.567 10 29 8.433 29 6.5C29 4.567 30.567 3 32.5 3C34.433 3 36 4.567 36 6.5Z M35 28.5C35 29.8807 33.8807 31 32.5 31C31.1193 31 30 29.8807 30 28.5C30 27.1193 31.1193 26 32.5 26C33.8807 26 35 27.1193 35 28.5Z"}
  },
  {
    id :'toilet3Faucet',
    offsetX: 790,
    offsetY: 172,
    // Size of the node
    width: 23,
    height: 36,
    shape:{ type : 'Path', data:'M46.4065 37.9425C46.4065 55.0951 36.823 69.0002 25.0011 69.0002C13.1792 69.0002 3.5957 55.0951 3.5957 37.9425C3.5957 30.1141 5.2059 23.4623 8.5 18C8.61402 18 25 18 25 18H41.2425C44.5366 23.4623 46.4065 30.1141 46.4065 37.9425Z M41.2161 43.5006C41.2161 53.9728 33.9559 62.4621 24.9999 62.4621C16.0439 62.4621 8.78369 53.9728 8.78369 43.5006C8.78369 33.0284 16.0439 24.5391 24.9999 24.5391C33.9559 24.5391 41.2161 33.0284 41.2161 43.5006Z M1 3.61538C1 2.17095 2.17095 1 3.61538 1H46.3846C47.8291 1 49 2.17095 49 3.61538V15.3846C49 16.8291 47.8291 18 46.3846 18H3.61538C2.17095 18 1 16.8291 1 15.3846V3.61538Z M26.9995 9C26.9995 10.1046 26.1041 11 24.9995 11C23.8949 11 22.9995 10.1046 22.9995 9C22.9995 7.89543 23.8949 7 24.9995 7C26.1041 7 26.9995 7.89543 26.9995 9Z M31 33C31 37.4183 28.3137 41 25 41C21.6863 41 19 37.4183 19 33C19 28.5817 21.6863 25 25 25C28.3137 25 31 28.5817 31 33Z '}
  },
  // {
  //   id :'kitchenDoor',
  //   offsetX: 521,
  //   offsetY:181,
  //   // Size of the node
  //   width: 38,
  //   height: 39,
  //   shape:{ type : 'Path', data:'M1 71L1 79L72 79V71M1 71L72 71M1 71C1 32.3401 32.3401 1 71 1H72V71'}
  // },
  
  {
    id :'gasBurner',
    offsetX:725,
    offsetY:34,
    // Size of the node
    width: 100,
    height: 32,
    shape:{ type : 'Path', data:'M101.999 1.96454C101.999 1.43184 101.567 1 101.034 1L1.96356 1.00001C1.43086 1.00001 0.999023 1.43185 0.999023 1.96455L0.999026 34.0355C0.999026 34.5682 1.43087 35 1.96357 35L101.034 35C101.567 35 101.999 34.5682 101.999 34.0355V1.96454Z M33.583 4.79803C33.583 4.26533 33.1512 3.8335 32.6185 3.8335L4.79755 3.8335C4.26485 3.8335 3.83301 4.26534 3.83301 4.79804L3.83301 31.2023C3.83301 31.735 4.26485 32.1668 4.79755 32.1668L32.6185 32.1668C33.1512 32.1668 33.583 31.735 33.583 31.2023L33.583 4.79803Z M98.749 4.96454C98.749 4.43184 98.3172 4 97.7845 4L69.9636 4C69.4309 4 68.999 4.43184 68.999 4.96454L68.999 31.3688C68.999 31.9015 69.4309 32.3333 69.9636 32.3333L97.7845 32.3333C98.3172 32.3333 98.749 31.9015 98.749 31.3688V4.96454Z M65.749 4.96454C65.749 4.43184 65.3172 4 64.7845 4L36.9636 4C36.4309 4 35.999 4.43184 35.999 4.96454L35.999 31.3688C35.999 31.9015 36.4309 32.3333 36.9636 32.3333L64.7845 32.3333C65.3172 32.3333 65.749 31.9015 65.749 31.3688V4.96454Z M26.499 18C26.499 22.6944 22.6934 26.5 17.999 26.5C13.3046 26.5 9.49902 22.6944 9.49902 18C9.49902 13.3056 13.3046 9.5 17.999 9.5C22.6934 9.5 26.499 13.3056 26.499 18Z M25.4365 18C25.4365 22.1076 22.1066 25.4375 17.999 25.4375C13.8914 25.4375 10.5615 22.1076 10.5615 18C10.5615 13.8924 13.8914 10.5625 17.999 10.5625C22.1066 10.5625 25.4365 13.8924 25.4365 18Z M25.0576 24.6826L24.682 25.0583L22.0017 22.378L22.3774 22.0024L25.0576 24.6826Z M13.9443 13.5698L13.5687 13.9455L10.8882 11.265L11.2639 10.8894L13.9443 13.5698Z M24.7861 11.0938L25.1618 11.4694L22.4815 14.1497L22.1059 13.774L24.7861 11.0938Z M13.7734 21.9844L14.1491 22.36L11.4688 25.0403L11.0932 24.6646L13.7734 21.9844Z M21.4521 18C21.4521 19.9071 19.9061 21.4531 17.999 21.4531C16.0919 21.4531 14.5459 19.9071 14.5459 18C14.5459 16.0929 16.0919 14.5469 17.999 14.5469C19.9061 14.5469 21.4521 16.0929 21.4521 18Z M91.665 18.1665C91.665 22.8609 87.8595 26.6665 83.165 26.6665C78.4706 26.6665 74.665 22.8609 74.665 18.1665C74.665 13.4721 78.4706 9.6665 83.165 9.6665C87.8595 9.6665 91.665 13.4721 91.665 18.1665Z M90.6025 18.1665C90.6025 22.2741 87.2727 25.604 83.165 25.604C79.0574 25.604 75.7275 22.2741 75.7275 18.1665C75.7275 14.0589 79.0574 10.729 83.165 10.729C87.2727 10.729 90.6025 14.0589 90.6025 18.1665Z M90.2236 24.8491L89.848 25.2248L87.1677 22.5445L87.5434 22.1689L90.2236 24.8491Z M79.1104 13.7363L78.7347 14.112L76.0542 11.4315L76.4299 11.0559L79.1104 13.7363Z M89.9521 11.2603L90.3278 11.6359L87.6475 14.3162L87.2719 13.9405L89.9521 11.2603Z M78.9404 22.1509L79.3161 22.5265L76.6358 25.2068L76.2602 24.8311L78.9404 22.1509Z M86.6182 18.1665C86.6182 20.0736 85.0721 21.6196 83.165 21.6196C81.2579 21.6196 79.7119 20.0736 79.7119 18.1665C79.7119 16.2594 81.2579 14.7134 83.165 14.7134C85.0721 14.7134 86.6182 16.2594 86.6182 18.1665Z M58.665 18.1665C58.665 22.8609 54.8595 26.6665 50.165 26.6665C45.4706 26.6665 41.665 22.8609 41.665 18.1665C41.665 13.4721 45.4706 9.6665 50.165 9.6665C54.8595 9.6665 58.665 13.4721 58.665 18.1665Z M57.6025 18.1665C57.6025 22.2741 54.2727 25.604 50.165 25.604C46.0574 25.604 42.7275 22.2741 42.7275 18.1665C42.7275 14.0589 46.0574 10.729 50.165 10.729C54.2727 10.729 57.6025 14.0589 57.6025 18.1665Z M57.2236 24.8491L56.848 25.2248L54.1677 22.5445L54.5434 22.1689L57.2236 24.8491Z M46.1104 13.7363L45.7347 14.112L43.0542 11.4315L43.4299 11.0559L46.1104 13.7363Z M56.9521 11.2603L57.3278 11.6359L54.6475 14.3162L54.2719 13.9405L56.9521 11.2603Z M45.9404 22.1509L46.3161 22.5265L43.6358 25.2068L43.2602 24.8311L45.9404 22.1509Z M53.6182 18.1665C53.6182 20.0736 52.0721 21.6196 50.165 21.6196C48.2579 21.6196 46.7119 20.0736 46.7119 18.1665C46.7119 16.2594 48.2579 14.7134 50.165 14.7134C52.0721 14.7134 53.6182 16.2594 53.6182 18.1665Z'}
  },
  {
    id :'kitchenSink',
    offsetX:542,
    offsetY:36,
    // Size of the node
    width: 76,
    height: 38,
    shape:{ type : 'Path', data:'M1 9C1 4.58172 4.58172 1 9 1H115C119.418 1 123 4.58172 123 9V41C123 45.4183 119.418 49 115 49H9C4.58172 49 1 45.4183 1 41V9Z M7 13C7 10.7909 8.79086 9 11 9H55C57.2091 9 59 10.7909 59 13V37C59 39.2091 57.2091 41 55 41H11C8.79086 41 7 39.2091 7 37V13Z M65 13C65 10.7909 66.7909 9 69 9H113C115.209 9 117 10.7909 117 13V37C117 39.2091 115.209 41 113 41H69C66.7909 41 65 39.2091 65 37V13Z M35 25.5C35 26.8807 33.8807 28 32.5 28C31.1193 28 30 26.8807 30 25.5C30 24.1193 31.1193 23 32.5 23C33.8807 23 35 24.1193 35 25.5Z M93 25.5C93 26.8807 91.8807 28 90.5 28C89.1193 28 88 26.8807 88 25.5C88 24.1193 89.1193 23 90.5 23C91.8807 23 93 24.1193 93 25.5Z M64.3638 10.4863C64.3638 10.4863 65.071 10.4863 65.7781 9.77915C66.4852 9.07204 66.4852 8.36493 66.4852 8.36493L74.4865 15.2232C75.5104 16.1009 75.5705 17.6644 74.6169 18.618C73.6633 19.5716 72.0998 19.5115 71.2221 18.4876L64.3638 10.4863Z M65.4246 4.47532C66.7915 5.84216 66.7915 8.05823 65.4246 9.42507C64.0578 10.7919 61.8417 10.7919 60.4749 9.42507C59.108 8.05823 59.108 5.84216 60.4749 4.47532C61.8417 3.10849 64.0578 3.10849 65.4246 4.47532Z'}
  },
  {
    id :'refrigerator',
    offsetX:692,
    offsetY:115,
    // Size of the node
    width: 52,
    height:59,
    shape:{ type : 'Path', data:"M1 8.58323H61V58.0356H1V8.58323Z M1 58.8332H61V63.6189C61 65.381 59.5716 66.8094 57.8095 66.8094H4.19048C2.42843 66.8094 1 65.381 1 63.6189V58.8332Z M57.0527 8.17857L4.158 8.17857L4.158 4.19047C4.158 2.42842 5.58642 1 7.34847 1L53.8623 1C55.6243 1 57.0527 2.42843 57.0527 4.19048V8.17857Z M1 8.58323V8.08323H0.5V8.58323H1ZM61 8.58323H61.5V8.08323H61V8.58323ZM61 58.0356V58.5356H61.5V58.0356H61ZM1 58.0356H0.5V58.5356H1V58.0356ZM1 58.8332V58.3332H0.5V58.8332H1ZM61 58.8332H61.5V58.3332H61V58.8332ZM6.52686 66.8094V66.3094H6.02686V66.8094H6.52686ZM16.79 66.8094H17.29V66.3094H16.79V66.8094ZM57.0527 8.17857V8.67857H57.5527V8.17857H57.0527ZM4.158 8.17857H3.658V8.67857H4.158V8.17857ZM53.8623 1V0.500004V1ZM57.0527 4.19048H56.5527H57.0527ZM4.158 4.19047H3.658H4.158ZM7.34847 1V1.5V1ZM1 9.08323H61V8.08323H1V9.08323ZM60.5 8.58323V58.0356H61.5V8.58323H60.5ZM61 57.5356H1V58.5356H61V57.5356ZM1.5 58.0356V8.58323H0.5V58.0356H1.5ZM1 59.3332H61V58.3332H1V59.3332ZM60.5 58.8332V63.6189H61.5V58.8332H60.5ZM57.8095 66.3094H4.19048V67.3094H57.8095V66.3094ZM1.5 63.6189V58.8332H0.5V63.6189H1.5ZM4.19048 66.3094C2.70457 66.3094 1.5 65.1049 1.5 63.6189H0.5C0.5 65.6571 2.15228 67.3094 4.19048 67.3094V66.3094ZM60.5 63.6189C60.5 65.1049 59.2954 66.3094 57.8095 66.3094V67.3094C59.8477 67.3094 61.5 65.6571 61.5 63.6189H60.5ZM6.52686 67.3094H16.79V66.3094H6.52686V67.3094ZM13.5995 69.4999H9.71733V70.4999H13.5995V69.4999ZM9.71733 69.4999C8.23142 69.4999 7.02686 68.2953 7.02686 66.8094H6.02686C6.02686 68.8476 7.67914 70.4999 9.71733 70.4999V69.4999ZM16.29 66.8094C16.29 68.2953 15.0854 69.4999 13.5995 69.4999V70.4999C15.6377 70.4999 17.29 68.8476 17.29 66.8094H16.29ZM57.0527 7.67857L4.158 7.67857V8.67857L57.0527 8.67857V7.67857ZM4.658 8.17857L4.658 4.19047H3.658L3.658 8.17857H4.658ZM7.34847 1.5L53.8623 1.5V0.500004L7.34847 0.5V1.5ZM56.5527 4.19048V8.17857H57.5527V4.19048H56.5527ZM53.8623 1.5C55.3482 1.5 56.5527 2.70457 56.5527 4.19048H57.5527C57.5527 2.15229 55.9005 0.500004 53.8623 0.500004V1.5ZM4.658 4.19047C4.658 2.70456 5.86256 1.5 7.34847 1.5V0.5C5.31028 0.5 3.658 2.15228 3.658 4.19047H4.658Z"}
  },
  {
    id :'waterCooler',
    offsetX:524,
    offsetY:107,
    // Size of the node
    width: 39,
    height:38,
    shape:{ type : 'Path', data:'M49 1H3C1.89543 1 1 1.89543 1 3V49C1 50.1046 1.89543 51 3 51H49C50.1046 51 51 50.1046 51 49V3C51 1.89543 50.1046 1 49 1Z M47 26C47 37.598 37.598 47 26 47C14.402 47 5 37.598 5 26C5 14.402 14.402 5 26 5C37.598 5 47 14.402 47 26Z M30 26C30 28.2091 28.2091 30 26 30C23.7909 30 22 28.2091 22 26C22 23.7909 23.7909 22 26 22C28.2091 22 30 23.7909 30 26Z M49 1H3C1.89543 1 1 1.89543 1 3V49C1 50.1046 1.89543 51 3 51H49C50.1046 51 51 50.1046 51 49V3C51 1.89543 50.1046 1 49 1Z M47 26C47 37.598 37.598 47 26 47C14.402 47 5 37.598 5 26C5 14.402 14.402 5 26 5C37.598 5 47 14.402 47 26Z M30 26C30 28.2091 28.2091 30 26 30C23.7909 30 22 28.2091 22 26C22 23.7909 23.7909 22 26 22C28.2091 22 30 23.7909 30 26Z'}
  },
  {
    id :'washBasin',
    offsetX:260,
    offsetY:176,
    // Size of the node
    width: 41,
    height:30,
    rotateAngle:-90,
    shape:{ type : 'Path', data:'M35 30.5C35 31.8807 33.8807 33 32.5 33C31.1193 33 30 31.8807 30 30.5C30 29.1193 31.1193 28 32.5 28C33.8807 28 35 29.1193 35 30.5Z M1 16C1 7.71573 7.71573 1 16 1H50C58.2843 1 65 7.71573 65 16V25C65 38.2548 54.2548 49 41 49H25C11.7452 49 1 38.2548 1 25V16Z M8 19C8 14.5817 11.5817 11 16 11H50C54.4183 11 58 14.5817 58 19V29C58 37.8366 50.8366 45 42 45H24C15.1634 45 8 37.8366 8 29V19Z M32.7433 11.0559C32.7433 11.0559 33.3556 11.4094 34.3216 11.1506C35.2875 10.8918 35.641 10.2794 35.641 10.2794L39.1413 20.2196C39.5892 21.4916 38.8594 22.8757 37.5568 23.2247C36.2542 23.5737 34.9302 22.7399 34.6821 21.4144L32.7433 11.0559Z M36.6673 6.38077C37.1676 8.24791 36.0596 10.1671 34.1925 10.6674C32.3253 11.1677 30.4062 10.0596 29.9059 8.19251C29.4056 6.32538 30.5136 4.4062 32.3807 3.9059C34.2479 3.4056 36.1671 4.51364 36.6673 6.38077Z'}
  },
  {
    id :'staircase1',
    offsetX:517,
    offsetY:427,
    // Size of the node
    width:87,
    height:25,
    shape:{ type : 'Path', data:'M1 17.4998L133 17.4998M121.177 0.869141L132.874 17.3083M121.582 34.7252L132.756 17.7252M121.5 0.999829V34.9998M109.5 0.999829V34.9998M97.5 0.999829V34.9998M85.5 0.999829V34.9998M73.5 0.999829V34.9998M61.5 0.999829V34.9998M49.5 0.999829V34.9998M37.5 0.999829V34.9998M25.5 0.999829L25.5 34.9998M13.5 0.999829L13.5 34.9998M133 0.999829V34.9998L1 34.9998L1 0.999824L133 0.999829Z'}
  },
  {
    id :'staircase2',
    offsetX:550,
    offsetY:470,
    // Size of the node
    width:61,
    height:22,
    rotateAngle:90,
    shape:{ type : 'Path', data:'M36 1V35M36 1L25 1M36 1H48M36 35H25M36 35H48M25 35L25 1M25 35H13L13 1L25 1M48 1V35M48 1H59M48 35H59M59 1V35M59 1H71M59 35H71M71 1V35M71 1H82M71 35H82M82 1V35M82 1H94M82 35H94M94 1V35M94 1H105M94 35H105M105 1V35M105 1H117V35H105M129 1V35L1 35L1 1L129 1Z'}
  },
  {
    id :'staircase3',
    offsetX:517,
    offsetY:514,
    // Size of the node
    width:87,
    height:25,
    shape:{ type : 'Path', data:'M1 17.4998L133 17.4998M121.177 0.869141L132.874 17.3083M121.582 34.7252L132.756 17.7252M121.5 0.999829V34.9998M109.5 0.999829V34.9998M97.5 0.999829V34.9998M85.5 0.999829V34.9998M73.5 0.999829V34.9998M61.5 0.999829V34.9998M49.5 0.999829V34.9998M37.5 0.999829V34.9998M25.5 0.999829L25.5 34.9998M13.5 0.999829L13.5 34.9998M133 0.999829V34.9998L1 34.9998L1 0.999824L133 0.999829Z'}
  },
  {
    id :'balconyChair1',
    offsetX:308,
    offsetY:83,
    // Size of the node
    width: 40,
    height:44,
    rotateAngle:270,
    shape:{ type : 'Path', data:'M7 27.5V56C7 56.5523 6.55228 57 6 57H2C1.44772 57 1 56.5523 1 56V26.5C1 12.4167 12.4167 1 26.5 1C40.5833 1 52 12.4167 52 26.5V56C52 56.5523 51.5523 57 51 57H47C46.4477 57 46 56.5523 46 56V27.5M7 27.5C7 16.7304 15.7304 8 26.5 8C37.2696 8 46 16.7304 46 27.5M7 27.5V58C7 58.5523 7.44772 59 8 59H45C45.5523 59 46 58.5523 46 58V27.5'}
  },
  {
    id :'balconyChair2',
    offsetX:425,
    offsetY:83,
    // Size of the node
    width:40,
    height:44,
    rotateAngle:90,
    shape:{ type : 'Path', data:'M7 27.5V56C7 56.5523 6.55228 57 6 57H2C1.44772 57 1 56.5523 1 56V26.5C1 12.4167 12.4167 1 26.5 1C40.5833 1 52 12.4167 52 26.5V56C52 56.5523 51.5523 57 51 57H47C46.4477 57 46 56.5523 46 56V27.5M7 27.5C7 16.7304 15.7304 8 26.5 8C37.2696 8 46 16.7304 46 27.5M7 27.5V58C7 58.5523 7.44772 59 8 59H45C45.5523 59 46 58.5523 46 58V27.5'}
  },
  {
    id :'stool',
    offsetX:366,
    offsetY:83,
    // Size of the node
    width: 35,
    height:35,
  
    shape:{ type : 'Path', data:"M58 31C58 46.464 45.6878 59 30.5 59C15.3122 59 3 46.464 3 31C3 15.536 15.3122 3 30.5 3C45.6878 3 58 15.536 58 31Z  M29 59V61H25V59H29Z M29 1V3H25V1L29 1Z M36 59V61H32V59H36Z M36 1V3H32V1L36 1Z M3 29H1L1 25H3L3 29Z M60 29H58V25H60V29Z M3 36H1L1 32H3L3 36Z M60 36H58V32H60V36Z"}
  },
//   
  {
    id :'balconyStool1',
    offsetX:278,
    offsetY:45,
    // Size of the node
    width: 30,
    height:30,
    shape:{ type : 'Path', data:"M57 29C57 44.464 44.464 57 29 57C13.536 57 1 44.464 1 29C1 13.536 13.536 1 29 1C44.464 1 57 13.536 57 29Z"}
  },
  {
    id :'balconyStool2',
    offsetX:462,
    offsetY:45,
    // Size of the node
    width: 30,
    height:30,
  
    shape:{ type : 'Path', data:"M57 29C57 44.464 44.464 57 29 57C13.536 57 1 44.464 1 29C1 13.536 13.536 1 29 1C44.464 1 57 13.536 57 29Z"}
  },
  {
    id :'balconyPlant1',
    offsetX:278,
    offsetY:45,
    // Size of the node
    width: 25,
    height:25,
    shape:{ type : 'Path', data:'M41.0021 14.6256C39.4786 15.0878 15.4174 23.8084 24.9086 22.7805C30.9102 22.1305 46.6742 12.9049 41.0021 14.6256Z M30.6226 40.7355C30.095 39.2334 20.3422 15.5718 21.7796 25.0097C22.6885 30.9776 32.587 46.328 30.6226 40.7355Z M40.8599 30.8341C39.4811 30.038 16.6684 18.4377 23.9067 24.6624C28.4837 28.5985 45.9932 33.7978 40.8599 30.8341Z M24.9451 2.15326C24.5331 3.69113 19.2324 28.7289 23.3715 20.1262C25.9889 14.6864 26.4792 -3.57215 24.9451 2.15326Z M2.19397 25.3449C3.78608 25.3449 29.3427 23.9847 19.9617 22.2131C14.0299 21.0929 -3.73342 25.3449 2.19397 25.3449Z M14.4307 41.966C15.2268 40.5872 26.8271 17.7744 20.6024 25.0127C16.6664 29.5898 11.467 47.0992 14.4307 41.966Z M9.34308 7.01354C10.1391 8.39235 24.0954 29.8449 20.9391 20.835C18.9434 15.1378 6.37938 1.88027 9.34308 7.01354Z M8.74609 23.1317C8.74609 19.0028 10.6305 15.3141 13.5861 12.8786M25.2568 10.2486C29.1467 11.2213 32.3568 13.9095 34.0367 17.4627M23.5 9.93362C23.0157 9.88011 22.5236 9.85264 22.0251 9.85264C19.3319 9.85264 16.826 10.6544 14.733 12.0323M34.6489 19.0003C35.0742 20.3006 35.3041 21.6893 35.3041 23.1317C35.3041 24.7546 35.013 26.3095 34.4801 27.747M33.7595 29.3531C32.4773 31.7665 30.4723 33.7373 28.0333 34.9769M26.5361 35.6249C25.1278 36.1335 23.6088 36.4107 22.0251 36.4107C20.4153 36.4107 18.8723 36.1242 17.4445 35.5995M15.8519 34.8916C12.0702 32.9023 9.36529 29.1424 8.83942 24.7143M41.0021 14.6256C39.4786 15.0878 15.4174 23.8084 24.9086 22.7805C30.9102 22.1305 46.6742 12.9049 41.0021 14.6256ZM30.6226 40.7355C30.095 39.2334 20.3422 15.5718 21.7796 25.0097C22.6885 30.9776 32.587 46.328 30.6226 40.7355ZM40.8599 30.8341C39.4811 30.038 16.6684 18.4377 23.9067 24.6624C28.4837 28.5985 45.9932 33.7978 40.8599 30.8341ZM24.9451 2.15326C24.5331 3.69113 19.2324 28.7289 23.3715 20.1262C25.9889 14.6864 26.4792 -3.57215 24.9451 2.15326ZM2.19397 25.3449C3.78608 25.3449 29.3427 23.9847 19.9617 22.2131C14.0299 21.0929 -3.73342 25.3449 2.19397 25.3449ZM14.4307 41.966C15.2268 40.5872 26.8271 17.7744 20.6024 25.0127C16.6664 29.5898 11.467 47.0992 14.4307 41.966ZM9.34308 7.01354C10.1391 8.39235 24.0954 29.8449 20.9391 20.835C18.9434 15.1378 6.37938 1.88027 9.34308 7.01354Z'}
  },
  {
    id :'balconyPlant2',
    offsetX:462,
    offsetY:45,
    // Size of the node
    width: 25,
    height:25,
    shape:{ type : 'Path', data:'M25.9813 23.5141C27.2901 23.5993 48.6838 19.0468 41.4746 10.8333C36.916 5.63963 21.1089 23.1968 25.9813 23.5141Z M23.6253 25.9234C23.1736 27.1547 21.4942 48.9629 31.4103 44.3689C37.6806 41.464 25.3067 21.3392 23.6253 25.9234Z M25.5989 25.6003C26.3978 26.6405 43.9262 39.7237 45.3483 28.888C46.2474 22.0363 22.6249 21.7278 25.5989 25.6003Z M24.7197 20.7567C25.6675 19.8502 36.7808 1.01108 25.8549 0.76778C18.9461 0.613932 21.191 24.1316 24.7197 20.7567Z M20.8885 22.8171C19.6966 22.2698 -1.91128 18.8763 1.88665 29.1238C4.2882 35.6035 25.3258 24.8547 20.8885 22.8171Z M21.6607 25.6193C20.3938 25.9588 1.59406 37.1385 11.0585 42.6028C17.0432 46.0581 26.3771 24.3556 21.6607 25.6193Z M22.3667 20.2554C21.8975 19.0306 8.82513 1.49408 4.37366 11.475C1.55885 17.7863 24.1136 24.815 22.3667 20.2554Z M40.0382 18.2498C40.7878 20.1543 41.1995 22.2289 41.1995 24.3996C41.1995 24.5507 41.1975 24.7013 41.1935 24.8515M35.2235 11.5507C33.6921 10.2594 31.9267 9.2368 30 8.55572M39 32.7159C37.5069 35.3317 35.3311 37.5074 32.7153 39.0004M24.8419 41.1939C24.6949 41.1977 24.5474 41.1996 24.3995 41.1996C21.7821 41.1996 19.3046 40.6011 17.0963 39.5334M10.7727 34.2278C9.9752 33.1239 9.30848 31.9193 8.79533 30.6367M7.70563 22.5004C7.89672 20.8019 8.34106 19.1801 9 17.6736M13.9123 11.274C16.1576 9.47777 18.8737 8.24563 21.846 7.79239M25.9813 23.5141C27.2901 23.5993 48.6838 19.0468 41.4746 10.8333C36.916 5.63963 21.1089 23.1968 25.9813 23.5141ZM23.6253 25.9234C23.1736 27.1547 21.4942 48.9629 31.4103 44.3689C37.6806 41.464 25.3067 21.3392 23.6253 25.9234ZM25.5989 25.6003C26.3978 26.6405 43.9262 39.7237 45.3483 28.888C46.2474 22.0363 22.6249 21.7278 25.5989 25.6003ZM24.7197 20.7567C25.6675 19.8502 36.7808 1.01108 25.8549 0.76778C18.9461 0.613932 21.191 24.1316 24.7197 20.7567ZM20.8885 22.8171C19.6966 22.2698 -1.91128 18.8763 1.88665 29.1238C4.2882 35.6035 25.3258 24.8547 20.8885 22.8171ZM21.6607 25.6193C20.3938 25.9588 1.59406 37.1385 11.0585 42.6028C17.0432 46.0581 26.3771 24.3556 21.6607 25.6193ZM22.3667 20.2554C21.8975 19.0306 8.82513 1.49408 4.37366 11.475C1.55885 17.7863 24.1136 24.815 22.3667 20.2554Z'}
  },
  {
    id :'commonDoor',
    offsetX: 673,
    offsetY:264,
    // Size of the node
    width: 27,
    height: 30,
   rotateAngle:90,
    shape:{ type : 'Path', data:'M1 71L1 79L72 79V71M1 71L72 71M1 71C1 32.3401 32.3401 1 71 1H72V71'}
  },
  {
    id :'toilet4BathTub',
    offsetX: 680,
    offsetY: 200,
    // Size of the node
    width: 50,
    height: 25,
    rotateAngle:90,
    shape:{ type : 'Path', data:'M1 9C1 4.58172 4.58172 1 9 1H84C88.4183 1 92 4.58172 92 9V40C92 44.4183 88.4183 48 84 48H9C4.58172 48 1 44.4183 1 40V9Z M12 8C12 6.89543 12.8954 6 14 6H61.5C71.7173 6 80 14.2827 80 24.5C80 34.7173 71.7173 43 61.5 43H14C12.8954 43 12 42.1046 12 41V8Z M11.5 26.5C11.5 26.5 12 26 12 25C12 24 11.5 23.5 11.5 23.5L22.0074 22.6917C23.3519 22.5883 24.5 23.6514 24.5 25C24.5 26.3486 23.3519 27.4117 22.0074 27.3083L11.5 26.5Z M8 21.5C9.933 21.5 11.5 23.067 11.5 25C11.5 26.933 9.933 28.5 8 28.5C6.067 28.5 4.5 26.933 4.5 25C4.5 23.067 6.067 21.5 8 21.5Z'}
  },
  {
    id :'toilet4Basin',
    offsetX: 729,
    offsetY: 262,
    // Size of the node
    width: 30,
    height: 25,
    rotateAngle:180,
    shape:{ type : 'Path', data:'M1 9C1 4.58172 4.58172 1 9 1H57C61.4183 1 65 4.58172 65 9V41C65 45.4183 61.4183 49 57 49H9C4.58172 49 1 45.4183 1 41V9Z M7 13C7 10.7909 8.79086 9 11 9H55C57.2091 9 59 10.7909 59 13V37C59 39.2091 57.2091 41 55 41H11C8.79086 41 7 39.2091 7 37V13Z M35 25.5C35 26.8807 33.8807 28 32.5 28C31.1193 28 30 26.8807 30 25.5C30 24.1193 31.1193 23 32.5 23C33.8807 23 35 24.1193 35 25.5Z M31 9C31 9 31.5 9.5 32.5 9.5C33.5 9.5 34 9 34 9L34.8083 19.5074C34.9117 20.8519 33.8486 22 32.5 22C31.1514 22 30.0883 20.8519 30.1917 19.5074L31 9Z M36 5.5C36 7.433 34.433 9 32.5 9C30.567 9 29 7.433 29 5.5C29 3.567 30.567 2 32.5 2C34.433 2 36 3.567 36 5.5Z'}
  },
  {
    id :'toilet4Faucet',
    offsetX: 729,
    offsetY: 172,
    // Size of the node
    width: 23,
    height: 37,
    shape:{ type : 'Path', data:'M46.989 33.0731C46.989 53.4671 37.3818 69.9996 25.5307 69.9996C13.6795 69.9996 4.07227 53.4671 4.07227 33.0731C4.07227 19.1497 4 18 4 18C4.17549 18.0144 15.9306 18.2553 26.5002 17.9993C36.1582 17.7654 46.989 17.9999 46.989 17.9999C46.989 17.9999 46.989 21.6119 46.989 33.0731Z M41 44.5C41 54.7173 34.0604 63 25.5 63C16.9396 63 10 54.7173 10 44.5C10 34.2827 16.9396 26 25.5 26C34.0604 26 41 34.2827 41 44.5Z M1 3.61538C1 2.17095 2.17095 1 3.61538 1H46.3846C47.8291 1 49 2.17095 49 3.61538V15.3846C49 16.8291 47.8291 18 46.3846 18H3.61538C2.17095 18 1 16.8291 1 15.3846V3.61538Z M26.9995 9C26.9995 10.1046 26.1041 11 24.9995 11C23.8949 11 22.9995 10.1046 22.9995 9C22.9995 7.89543 23.8949 7 24.9995 7C26.1041 7 26.9995 7.89543 26.9995 9Z M31 34C31 38.4183 28.3137 42 25 42C21.6863 42 19 38.4183 19 34C19 29.5817 21.6863 26 25 26C28.3137 26 31 29.5817 31 34Z'}
  },
  {
    id :'storeRoomDoor',
    offsetX: 798,
    offsetY: 122,
    // Size of the node
    width: 51,
    height: 38,
    rotateAngle:90,
    shape:{ type : 'Path', data:'M1 71L1 79L72 79V71M1 71L72 71M1 71C1 32.3401 32.3401 1 71 1H72V71'}
  },
  // {
  //   id :'storeRoomDoor',
  //   offsetX: 798,
  //   offsetY: 122,
  //   // Size of the node
  //   width: 51,
  //   height: 38,
  //   rotateAngle:90,
  //   shape:{ type : 'Path', data:'M1 71L1 79L72 79V71M1 71L72 71M1 71C1 32.3401 32.3401 1 71 1H72V71'}
  // },
  {
    id :'storeRoomWarddrobe',
    offsetX: 820,
    offsetY: 34,
    // Size of the node
    width: 73,
    height: 35,
    shape:{ type : 'Path', data:"M50.6443 54.406L76 29L80.9998 28.9502H85.9996L55.594 59.3558L50.6443 54.406Z M12 29L36.9996 54.4053L32.0498 59.3551L2 29H12Z M70.7969 44.8594C70.6017 44.6642 70.6017 44.3476 70.7969 44.1523C70.9922 43.957 71.3088 43.957 71.504 44.1523L72.9182 45.5665C73.1135 45.7618 73.1135 46.0784 72.9182 46.2736C72.723 46.4689 72.4064 46.4689 72.2111 46.2736L70.7969 44.8594Z M16.1406 44.1524C16.3358 43.9571 16.6524 43.9571 16.8477 44.1524C17.043 44.3476 17.043 44.6642 16.8477 44.8595L15.4335 46.2737C15.2382 46.469 14.9216 46.469 14.7264 46.2737C14.5311 46.0784 14.5311 45.7619 14.7264 45.5666L16.1406 44.1524Z M1 1L87 1V29H1L1 1Z"}
  },
  {
    id :'windowGarden',
    offsetX:370,
    offsetY:26,
    // Size of the node
    width: 253,
    height:36,
    shape:{ type : 'Path', data:"M1.5 0H0V1.5V38.5H3V3H152V38.5H155V1.5V0H153.5H1.5ZM6.5 5H5V6.5V38.5H8V8H53V38.5H56V8H100V38.5H103V8H147V38.5H150V6.5V5H148.5H103H101.5H100H56H54.5H53H6.5Z"}
  },
  {
    id :'TextNode1',
    offsetX:120,
    offsetY:40,
    // Size of the node
    width: 80,
    height:37,
   
    shape: { type: 'Text', content: 'Bedroom 12 x 12' },
    style: { fontSize: 16  }
  },
  {
    id :'TextNode2',
    offsetX:94,
    offsetY:224,
    // Size of the node
    width: 38,
    height:23,
    shape: { type: 'Text', content: ' Toilet 6 x 4' },
    style: { fontSize: 16  }
  },
  {
    id :'TextNode3',
    offsetX:91,
    offsetY:300,
    // Size of the node
    width: 38,
    height:23,
    shape: { type: 'Text', content: ' Toilet 6 x 4' },
    style: { fontSize: 16  }
  },
  {
    id :'TextNode4',
    offsetX:118,
    offsetY:452,
    // Size of the node
    width: 80,
    height:37,
    shape: { type: 'Text', content:' Bedroom 12 x 12'},
    style: { fontSize: 16  }
  },
  {
    id :'TextNode5',
    offsetX:331,
    offsetY:481,
    // Size of the node
    width: 102,
    height:37,
    shape: { type: 'Text', content: 'Porch 15 x 8' },
    style: { fontSize: 16  }
  },
  {
    id :'TextNode6',
    offsetX:602,
    offsetY:107,
    // Size of the node
    width: 80,
    height:37,
    shape: { type: 'Text', content: 'Kitchen  12 x 9' },
    style: { fontSize: 16  }
  },
  {
    id :'TextNode7',
    offsetX:820,
    offsetY:80,
    // Size of the node
    width: 50,
    height:36,
    shape: { type: 'Text', content: 'Storeroom 6 x 9' },
    style: { fontSize: 16  }
  },
  {
    id :'TextNode8',
    offsetX:725,
    offsetY:214,
    // Size of the node
    width: 38,
    height:23,
    shape: { type: 'Text', content: 'Toilet 7 x 9' },
    style: { fontSize: 16  }
  },
  {
    id :'TextNode9',
    offsetX:820,
    offsetY:232,
    // Size of the node
    width: 38,
    height:23,
    shape: { type: 'Text', content: 'Toilet 7 x 9' },
    style: { fontSize: 16  }
  },
  {
    id :'TextNode10',
    offsetX:680,
    offsetY:370,
    // Size of the node
    width: 80,
    height:37,
    shape: { type: 'Text', content: 'Bedroom 18 x 15' },
    style: { fontSize: 16  }
  },
  {
    id :'TextNode11',
    offsetX:331,
    offsetY:277,
    // Size of the node
    width: 100,
    height:47,
    shape: { type: 'Text', content:' Living Room    19 x 15 ' },
    style: { fontSize: 16  }
  },
//      
//     id :'bedroom2LaptopChair',
//     offsetX:129,
//     offsetY:343,
//     // Size of the node
//     width: 24,
//     height:21,
//     rotateAngle:-90,
//     shape:{ type : 'Path', data:'M22 9V14M28 9.08984V14M13 54H37C41.4183 54 45 50.4183 45 46V22C45 17.5817 41.4183 14 37 14H13C8.58172 14 5 17.5817 5 22V46C5 50.4183 8.58172 54 13 54ZM3 45C1.89543 45 1 44.1046 1 43V25C1 23.8954 1.89543 23 3 23C4.10457 23 5 23.8954 5 25V43C5 44.1046 4.10457 45 3 45ZM11 5.79143C11 3.97975 12.2614 2.40196 14.0423 2.06981C22.0186 0.582241 27.6274 0.696364 35.7954 2.09976C37.6588 2.41991 39 4.05364 39 5.94429C39 8.4118 36.7616 10.2627 34.325 9.87346C27.5467 8.79067 22.4382 8.5351 15.7921 9.68406C13.3336 10.1091 11 8.28636 11 5.79143ZM47 45C45.8954 45 45 44.1046 45 43V25C45 23.8954 45.8954 23 47 23C48.1046 23 49 23.8954 49 25V43C49 44.1046 48.1046 45 47 45Z'}
//   },
//   {
//     id :'bedroom2Chair',
//     offsetX:71,
//     offsetY:261,
//     // Size of the node
//     width: 23,
//     height:23,
//     rotateAngle:90,
//     shape:{ type : 'Path', data:'M7 27.5V56C7 56.5523 6.55228 57 6 57H2C1.44772 57 1 56.5523 1 56V26.5C1 12.4167 12.4167 1 26.5 1C40.5833 1 52 12.4167 52 26.5V56C52 56.5523 51.5523 57 51 57H47C46.4477 57 46 56.5523 46 56V27.5M7 27.5C7 16.7304 15.7304 8 26.5 8C37.2696 8 46 16.7304 46 27.5M7 27.5V58C7 58.5523 7.44772 59 8 59H45C45.5523 59 46 58.5523 46 58V27.5'}
//   },
//   {
//     id :'bedroom3Basin',
//     offsetX:257,
//     offsetY:168,
//     // Size of the node
//     width: 28,
//     height:18,
//     rotateAngle:90,
//     shape:{ type : 'Path', data:"M1 4C1 2.34315 2.34315 1 4 1H62C63.6569 1 65 2.34315 65 4V25C65 38.2548 54.2548 49 41 49H25C11.7452 49 1 38.2548 1 25V4Z M57 25C57 33.2843 46.2548 40 33 40C19.7452 40 9 33.2843 9 25C9 16.7157 19.7452 10 33 10C46.2548 10 57 16.7157 57 25Z M31 10C31 10 31.5 10.5 32.5 10.5C33.5 10.5 34 10 34 10L34.8083 20.5074C34.9117 21.8519 33.8486 23 32.5 23C31.1514 23 30.0883 21.8519 30.1917 20.5074L31 10Z M36 6.5C36 8.433 34.433 10 32.5 10C30.567 10 29 8.433 29 6.5C29 4.567 30.567 3 32.5 3C34.433 3 36 4.567 36 6.5Z M35 28.5C35 29.8807 33.8807 31 32.5 31C31.1193 31 30 29.8807 30 28.5C30 27.1193 31.1193 26 32.5 26C33.8807 26 35 27.1193 35 28.5Z"}
//   },
//   {
//     id :'bedroom3Toilet',
//     offsetX:248,
//     offsetY:110,
//     // Size of the node
//     width: 25,
//     height:37,
//     rotateAngle:90,
//     shape:{ type : 'Path', data:'M46.4065 37.9425C46.4065 55.0951 36.823 69.0002 25.0011 69.0002C13.1792 69.0002 3.5957 55.0951 3.5957 37.9425C3.5957 30.1141 5.2059 23.4623 8.5 18C8.61402 18 25 18 25 18H41.2425C44.5366 23.4623 46.4065 30.1141 46.4065 37.9425Z M41.2161 43.5006C41.2161 53.9728 33.9559 62.4621 24.9999 62.4621C16.0439 62.4621 8.78369 53.9728 8.78369 43.5006C8.78369 33.0284 16.0439 24.5391 24.9999 24.5391C33.9559 24.5391 41.2161 33.0284 41.2161 43.5006Z M1 3.61538C1 2.17095 2.17095 1 3.61538 1H46.3846C47.8291 1 49 2.17095 49 3.61538V15.3846C49 16.8291 47.8291 18 46.3846 18H3.61538C2.17095 18 1 16.8291 1 15.3846V3.61538Z M26.9995 9C26.9995 10.1046 26.1041 11 24.9995 11C23.8949 11 22.9995 10.1046 22.9995 9C22.9995 7.89543 23.8949 7 24.9995 7C26.1041 7 26.9995 7.89543 26.9995 9Z M31 33C31 37.4183 28.3137 41 25 41C21.6863 41 19 37.4183 19 33C19 28.5817 21.6863 25 25 25C28.3137 25 31 28.5817 31 33Z '}
//   },
//   {
//     id :'bedroom3Shower',
//     offsetX:248,
//     offsetY:64,
//     // Size of the node
//     width: 23,
//     height:23,
//     rotateAngle:180,
//     shape:{ type : 'Path', data:"M7.46424 6.8143L15.4642 26.8143M23.1506 36.5232L42.1506 42.5232M14.3536 35.3536L7.35355 42.3536M31.4327 7.25052L20.4327 26.2505M42.1411 26.4797L25.1411 31.4797M16.5984 29.3311L21.749 34.1759M21.3641 29.3427L16.3641 34.6549M1 1H32.0332V7H7.03382V43L42.0338 42.9219V26H48.0338V49.1981H1.03382L1 1ZM25 32C25 35.3137 22.3137 38 19 38C15.6863 38 13 35.3137 13 32C13 28.6863 15.6863 26 19 26C22.3137 26 25 28.6863 25 32ZM22.75 32C22.75 34.0711 21.0711 35.75 19 35.75C16.9289 35.75 15.25 34.0711 15.25 32C15.25 29.9289 16.9289 28.25 19 28.25C21.0711 28.25 22.75 29.9289 22.75 32ZM20 32C20 32.5523 19.5523 33 19 33C18.4477 33 18 32.5523 18 32C18 31.4477 18.4477 31 19 31C19.5523 31 20 31.4477 20 32Z"}
//   },
//   {
//     id :'bedroom3ToiletDoor',
//     offsetX:211,
//     offsetY:144,
//     // Size of the node
//     width: 21,
//     height:22,
//     shape:{ type : 'Path', data:'M1 71L1 79L72 79V71M1 71L72 71M1 71C1 32.3401 32.3401 1 71 1H72V71'}
//   },
//   {
//     id :'bedroomDoor',
//     offsetX:218,
//     offsetY:186,
//     // Size of the node
//     width: 27,
//     height:32,
//     shape:{ type : 'Path', data:'M1 71L1 79L72 79V71M1 71L72 71M1 71C1 32.3401 32.3401 1 71 1H72V71'}
//   },
//   {
//     id :'bedroomBed',
//     offsetX:92,
//     offsetY:85,
//     // Size of the node
//     width: 62,
//     height:59,
//     shape:{ type : 'Path', data:'M1 54V2C1 1.44772 1.44772 1 2 1H44C44.5523 1 45 1.44771 45 2V54C45 54.5523 44.5523 55 44 55H2C1.44772 55 1 54.5523 1 54Z M7.57446 14.4176C8.01615 12.4296 7.72961 10.0298 7.34925 8.31942C7.20247 7.65937 7.68924 7 8.36541 7H19.6515C20.3227 7 20.8097 7.6496 20.6533 8.3023C20.4282 9.24153 20.1765 10.5125 20.1765 11.5C20.1765 12.4875 20.4282 13.7585 20.6533 14.6977C20.8097 15.3504 20.3227 16 19.6515 16H8.68924C7.9291 16 7.4096 15.1596 7.57446 14.4176Z M25.5745 14.4176C26.0161 12.4296 25.7296 10.0298 25.3493 8.31942C25.2025 7.65937 25.6892 7 26.3654 7H37.6515C38.3227 7 38.8097 7.6496 38.6533 8.3023C38.4282 9.24153 38.1765 10.5125 38.1765 11.5C38.1765 12.4875 38.4282 13.7585 38.6533 14.6977C38.8097 15.3504 38.3227 16 37.6515 16H26.6892C25.9291 16 25.4096 15.1596 25.5745 14.4176Z M45 53V27.695C41.8333 26.4298 34.1 24.6584 28.5 27.695C22.9 30.7316 16.5 25.5863 14 22.6341C10.1667 18.2057 2.2 13.0182 1 27.6951V53H45Z M1 54V2C1 1.44772 1.44772 1 2 1H44C44.5523 1 45 1.44771 45 2V54C45 54.5523 44.5523 55 44 55H2C1.44772 55 1 54.5523 1 54Z M7.57446 14.4176C8.01615 12.4296 7.72961 10.0298 7.34925 8.31942C7.20247 7.65937 7.68924 7 8.36541 7H19.6515C20.3227 7 20.8097 7.6496 20.6533 8.3023C20.4282 9.24153 20.1765 10.5125 20.1765 11.5C20.1765 12.4875 20.4282 13.7585 20.6533 14.6977C20.8097 15.3504 20.3227 16 19.6515 16H8.68924C7.9291 16 7.4096 15.1596 7.57446 14.4176Z M25.5745 14.4176C26.0161 12.4296 25.7296 10.0298 25.3493 8.31942C25.2025 7.65937 25.6892 7 26.3654 7H37.6515C38.3227 7 38.8097 7.6496 38.6533 8.3023C38.4282 9.24153 38.1765 10.5125 38.1765 11.5C38.1765 12.4875 38.4282 13.7585 38.6533 14.6977C38.8097 15.3504 38.3227 16 37.6515 16H26.6892C25.9291 16 25.4096 15.1596 25.5745 14.4176Z M25.5745 14.4176C26.0161 12.4296 25.7296 10.0298 25.3493 8.31942C25.2025 7.65937 25.6892 7 26.3654 7H37.6515C38.3227 7 38.8097 7.6496 38.6533 8.3023C38.4282 9.24153 38.1765 10.5125 38.1765 11.5C38.1765 12.4875 38.4282 13.7585 38.6533 14.6977C38.8097 15.3504 38.3227 16 37.6515 16H26.6892C25.9291 16 25.4096 15.1596 25.5745 14.4176Z'}
//   },
//   {
//     id :'bedroomBookcase',
//     offsetX:164,
//     offsetY:67,
//     // Size of the node
//     width: 54,
//     height:22,
//     shape:{ type : 'Path', data:'M113 9V1H1V9M113 9H1M113 9V29H1V9M4 12H11V25H4V12ZM13 12H20V25H13V12ZM22 12H29V25H22V12ZM31 12H38V25H31V12ZM40 12H47V25H40V12ZM49 12H56V25H49V12ZM58 12H65V25H58V12ZM67 12H74V25H67V12ZM76 12H83V25H76V12ZM85 12H92V25H85V12ZM94 12H101V25H94V12ZM103 12H110V25H103V12Z'}
//   },
//   {
//     id :'bedroom3Table',
//     offsetX:49,
//     offsetY:66,
//     // Size of the node
//     width: 24,
//     height:21,
//     shape:{ type : 'Path', data:'M79 1H3C1.89543 1 1 1.89543 1 3V49C1 50.1046 1.89543 51 3 51H79C80.1046 51 81 50.1046 81 49V3C81 1.89543 80.1046 1 79 1Z'}
//   },
//   {
//     id :'bedroom3Lamb',
//     offsetX:49,
//     offsetY:66,
//     // Size of the node
//     width: 16,
//     height:12,
//     shape:{ type : 'Path', data:'M17 7C11.4772 7 7 11.4772 7 17C7 22.5228 11.4772 27 17 27C22.5228 27 27 22.5228 27 17C27 11.4772 22.5228 7 17 7ZM17 7V13.5M20.2363 18.5593L25.3654 21.3093M13.7544 18.4305L8.2541 21.6805M33 17C33 25.8366 25.8366 33 17 33C8.16344 33 1 25.8366 1 17C1 8.16344 8.16344 1 17 1C25.8366 1 33 8.16344 33 17ZM25.5 17C25.5 21.6944 21.6944 25.5 17 25.5C12.3056 25.5 8.5 21.6944 8.5 17C8.5 12.3056 12.3056 8.5 17 8.5C21.6944 8.5 25.5 12.3056 25.5 17ZM21 17C21 19.2091 19.2091 21 17 21C14.7909 21 13 19.2091 13 17C13 14.7909 14.7909 13 17 13C19.2091 13 21 14.7909 21 17Z'}
//   },
//   {
//     id :'bedroom3Chair',
//     offsetX:164,
//     offsetY:91,
//     // Size of the node
//     width: 23,
//     height:23,
//     rotateAngle:180,
//     shape:{ type : 'Path', data:'M7 27.5V56C7 56.5523 6.55228 57 6 57H2C1.44772 57 1 56.5523 1 56V26.5C1 12.4167 12.4167 1 26.5 1C40.5833 1 52 12.4167 52 26.5V56C52 56.5523 51.5523 57 51 57H47C46.4477 57 46 56.5523 46 56V27.5M7 27.5C7 16.7304 15.7304 8 26.5 8C37.2696 8 46 16.7304 46 27.5M7 27.5V58C7 58.5523 7.44772 59 8 59H45C45.5523 59 46 58.5523 46 58V27.5'}
//   },
//   {
//     id :'bedroom3WorkTable',
//     offsetX:134,
//     offsetY:186,
//     // Size of the node
//     width: 37,
//     height:25,
//     shape:{ type : 'Path', data:'M4 5C4 4.44772 4.44772 4 5 4H83C83.5523 4 84 4.44772 84 5V53C84 53.5523 83.5523 54 83 54H5C4.44772 54 4 53.5523 4 53V5Z M4 6.5C4 6.77614 3.77462 7.00425 3.50231 6.95843C3.08607 6.88841 2.68736 6.73099 2.33329 6.49441C1.83994 6.16477 1.45543 5.69623 1.22836 5.14805C1.0013 4.59987 0.94189 3.99667 1.05765 3.41473C1.1734 2.83279 1.45912 2.29824 1.87868 1.87868C2.29824 1.45912 2.83279 1.1734 3.41473 1.05765C3.99667 0.94189 4.59987 1.0013 5.14805 1.22836C5.69623 1.45543 6.16477 1.83994 6.49441 2.33329C6.73099 2.68736 6.88841 3.08607 6.95843 3.50231C7.00424 3.77462 6.77614 4 6.5 4L4.5 4C4.22386 4 4 4.22386 4 4.5L4 6.5Z M81.5 4C81.2239 4 80.9958 3.77462 81.0416 3.50231C81.1116 3.08607 81.269 2.68736 81.5056 2.33329C81.8352 1.83994 82.3038 1.45543 82.852 1.22836C83.4001 1.0013 84.0033 0.94189 84.5853 1.05765C85.1672 1.1734 85.7018 1.45912 86.1213 1.87868C86.5409 2.29824 86.8266 2.83279 86.9424 3.41473C87.0581 3.99667 86.9987 4.59987 86.7716 5.14805C86.5446 5.69623 86.1601 6.16477 85.6667 6.49441C85.3126 6.73099 84.9139 6.88841 84.4977 6.95843C84.2254 7.00424 84 6.77614 84 6.5V4.5C84 4.22386 83.7761 4 83.5 4L81.5 4Z M6.5 54C6.77614 54 7.00425 54.2254 6.95843 54.4977C6.88841 54.9139 6.73099 55.3126 6.49441 55.6667C6.16477 56.1601 5.69623 56.5446 5.14805 56.7716C4.59987 56.9987 3.99667 57.0581 3.41473 56.9424C2.83279 56.8266 2.29824 56.5409 1.87868 56.1213C1.45912 55.7018 1.1734 55.1672 1.05765 54.5853C0.94189 54.0033 1.0013 53.4001 1.22836 52.852C1.45543 52.3038 1.83994 51.8352 2.33329 51.5056C2.68736 51.269 3.08607 51.1116 3.50231 51.0416C3.77462 50.9958 4 51.2239 4 51.5V53.5C4 53.7761 4.22386 54 4.5 54H6.5Z M84 51.5C84 51.2239 84.2254 50.9958 84.4977 51.0416C84.9139 51.1116 85.3126 51.269 85.6667 51.5056C86.1601 51.8352 86.5446 52.3038 86.7716 52.852C86.9987 53.4001 87.0581 54.0033 86.9424 54.5853C86.8266 55.1672 86.5409 55.7018 86.1213 56.1213C85.7018 56.5409 85.1672 56.8266 84.5853 56.9424C84.0033 57.0581 83.4001 56.9987 82.852 56.7716C82.3038 56.5446 81.8352 56.1601 81.5056 55.6667C81.269 55.3126 81.1116 54.9139 81.0416 54.4977C80.9958 54.2254 81.2239 54 81.5 54H83.5C83.7761 54 84 53.7761 84 53.5V51.5Z'}
//   },
//   {
//     id :'bedroom3Laptop',
//     offsetX:134,
//     offsetY:186,
//     // Size of the node
//     width: 26,
//     height:16,
//     rotateAngle:180,
//     shape:{ type : 'Path', data:'M1.06567 5.71554C0.619244 3.26018 2.50554 1 5.00115 1H61.0006C63.4675 1 65.3464 3.21135 64.9481 5.64595L61.7571 25.146C61.4407 27.08 59.7695 28.5 57.8096 28.5H8.54661C6.61347 28.5 4.95694 27.1175 4.61113 25.2155L1.06567 5.71554Z M3.7083 33C3.7083 30.7909 5.49916 29 7.7083 29H58.7083C60.9174 29 62.7083 30.7909 62.7083 33V55C62.7083 57.2091 60.9174 59 58.7083 59H7.7083C5.49916 59 3.7083 57.2091 3.7083 55V33Z M26.7083 50C26.7083 49.4477 27.156 49 27.7083 49H38.7083C39.2606 49 39.7083 49.4477 39.7083 50V54C39.7083 54.5523 39.2606 55 38.7083 55H27.7083C27.156 55 26.7083 54.5523 26.7083 54V50Z M8.7083 35.5C8.7083 35.2239 8.93216 35 9.2083 35H12.2083C12.4844 35 12.7083 35.2239 12.7083 35.5V36.5C12.7083 36.7761 12.4844 37 12.2083 37H9.2083C8.93216 37 8.7083 36.7761 8.7083 36.5V35.5Z M8.7083 38.5C8.7083 38.2239 8.93216 38 9.2083 38H12.2083C12.4844 38 12.7083 38.2239 12.7083 38.5V39.5C12.7083 39.7761 12.4844 40 12.2083 40H9.2083C8.93216 40 8.7083 39.7761 8.7083 39.5V38.5Z M8.7083 41.5C8.7083 41.2239 8.93216 41 9.2083 41H12.2083C12.4844 41 12.7083 41.2239 12.7083 41.5V42.5C12.7083 42.7761 12.4844 43 12.2083 43H9.2083C8.93216 43 8.7083 42.7761 8.7083 42.5V41.5Z M8.7083 44.5C8.7083 44.2239 8.93216 44 9.2083 44H12.2083C12.4844 44 12.7083 44.2239 12.7083 44.5V45.5C12.7083 45.7761 12.4844 46 12.2083 46H9.2083C8.93216 46 8.7083 45.7761 8.7083 45.5V44.5Z M13.7083 35.5C13.7083 35.2239 13.9322 35 14.2083 35H17.2083C17.4844 35 17.7083 35.2239 17.7083 35.5V36.5C17.7083 36.7761 17.4844 37 17.2083 37H14.2083C13.9322 37 13.7083 36.7761 13.7083 36.5V35.5Z M13.7083 38.5C13.7083 38.2239 13.9322 38 14.2083 38H17.2083C17.4844 38 17.7083 38.2239 17.7083 38.5V39.5C17.7083 39.7761 17.4844 40 17.2083 40H14.2083C13.9322 40 13.7083 39.7761 13.7083 39.5V38.5Z M13.7083 41.5C13.7083 41.2239 13.9322 41 14.2083 41H17.2083C17.4844 41 17.7083 41.2239 17.7083 41.5V42.5C17.7083 42.7761 17.4844 43 17.2083 43H14.2083C13.9322 43 13.7083 42.7761 13.7083 42.5V41.5Z M13.7083 44.5C13.7083 44.2239 13.9322 44 14.2083 44H17.2083C17.4844 44 17.7083 44.2239 17.7083 44.5V45.5C17.7083 45.7761 17.4844 46 17.2083 46H14.2083C13.9322 46 13.7083 45.7761 13.7083 45.5V44.5Z M18.7083 35.5C18.7083 35.2239 18.9322 35 19.2083 35H22.2083C22.4844 35 22.7083 35.2239 22.7083 35.5V36.5C22.7083 36.7761 22.4844 37 22.2083 37H19.2083C18.9322 37 18.7083 36.7761 18.7083 36.5V35.5Z M18.7083 38.5C18.7083 38.2239 18.9322 38 19.2083 38H22.2083C22.4844 38 22.7083 38.2239 22.7083 38.5V39.5C22.7083 39.7761 22.4844 40 22.2083 40H19.2083C18.9322 40 18.7083 39.7761 18.7083 39.5V38.5Z M18.7083 41.5C18.7083 41.2239 18.9322 41 19.2083 41H22.2083C22.4844 41 22.7083 41.2239 22.7083 41.5V42.5C22.7083 42.7761 22.4844 43 22.2083 43H19.2083C18.9322 43 18.7083 42.7761 18.7083 42.5V41.5Z M18.7083 44.5C18.7083 44.2239 18.9322 44 19.2083 44H22.2083C22.4844 44 22.7083 44.2239 22.7083 44.5V45.5C22.7083 45.7761 22.4844 46 22.2083 46H19.2083C18.9322 46 18.7083 45.7761 18.7083 45.5V44.5Z M23.7083 35.5C23.7083 35.2239 23.9322 35 24.2083 35H27.2083C27.4844 35 27.7083 35.2239 27.7083 35.5V36.5C27.7083 36.7761 27.4844 37 27.2083 37H24.2083C23.9322 37 23.7083 36.7761 23.7083 36.5V35.5Z M23.7083 38.5C23.7083 38.2239 23.9322 38 24.2083 38H27.2083C27.4844 38 27.7083 38.2239 27.7083 38.5V39.5C27.7083 39.7761 27.4844 40 27.2083 40H24.2083C23.9322 40 23.7083 39.7761 23.7083 39.5V38.5Z M23.7083 41.5C23.7083 41.2239 23.9322 41 24.2083 41H27.2083C27.4844 41 27.7083 41.2239 27.7083 41.5V42.5C27.7083 42.7761 27.4844 43 27.2083 43H24.2083C23.9322 43 23.7083 42.7761 23.7083 42.5V41.5Z M23.7083 44.5C23.7083 44.2239 23.9322 44 24.2083 44H42.2083C42.4844 44 42.7083 44.2239 42.7083 44.5V45.5C42.7083 45.7761 42.4844 46 42.2083 46H24.2083C23.9322 46 23.7083 45.7761 23.7083 45.5V44.5Z M28.7083 35.5C28.7083 35.2239 28.9322 35 29.2083 35H32.2083C32.4844 35 32.7083 35.2239 32.7083 35.5V36.5C32.7083 36.7761 32.4844 37 32.2083 37H29.2083C28.9322 37 28.7083 36.7761 28.7083 36.5V35.5Z M28.7083 38.5C28.7083 38.2239 28.9322 38 29.2083 38H32.2083C32.4844 38 32.7083 38.2239 32.7083 38.5V39.5C32.7083 39.7761 32.4844 40 32.2083 40H29.2083C28.9322 40 28.7083 39.7761 28.7083 39.5V38.5Z M28.7083 41.5C28.7083 41.2239 28.9322 41 29.2083 41H32.2083C32.4844 41 32.7083 41.2239 32.7083 41.5V42.5C32.7083 42.7761 32.4844 43 32.2083 43H29.2083C28.9322 43 28.7083 42.7761 28.7083 42.5V41.5Z M33.7083 35.5C33.7083 35.2239 33.9322 35 34.2083 35H37.2083C37.4844 35 37.7083 35.2239 37.7083 35.5V36.5C37.7083 36.7761 37.4844 37 37.2083 37H34.2083C33.9322 37 33.7083 36.7761 33.7083 36.5V35.5Z M33.7083 38.5C33.7083 38.2239 33.9322 38 34.2083 38H37.2083C37.4844 38 37.7083 38.2239 37.7083 38.5V39.5C37.7083 39.7761 37.4844 40 37.2083 40H34.2083C33.9322 40 33.7083 39.7761 33.7083 39.5V38.5Z M33.7083 41.5C33.7083 41.2239 33.9322 41 34.2083 41H37.2083C37.4844 41 37.7083 41.2239 37.7083 41.5V42.5C37.7083 42.7761 37.4844 43 37.2083 43H34.2083C33.9322 43 33.7083 42.7761 33.7083 42.5V41.5Z M38.7083 35.5C38.7083 35.2239 38.9322 35 39.2083 35H42.2083C42.4844 35 42.7083 35.2239 42.7083 35.5V36.5C42.7083 36.7761 42.4844 37 42.2083 37H39.2083C38.9322 37 38.7083 36.7761 38.7083 36.5V35.5Z M38.7083 38.5C38.7083 38.2239 38.9322 38 39.2083 38H42.2083C42.4844 38 42.7083 38.2239 42.7083 38.5V39.5C42.7083 39.7761 42.4844 40 42.2083 40H39.2083C38.9322 40 38.7083 39.7761 38.7083 39.5V38.5Z M38.7083 41.5C38.7083 41.2239 38.9322 41 39.2083 41H42.2083C42.4844 41 42.7083 41.2239 42.7083 41.5V42.5C42.7083 42.7761 42.4844 43 42.2083 43H39.2083C38.9322 43 38.7083 42.7761 38.7083 42.5V41.5Z M43.7083 35.5C43.7083 35.2239 43.9322 35 44.2083 35H47.2083C47.4844 35 47.7083 35.2239 47.7083 35.5V36.5C47.7083 36.7761 47.4844 37 47.2083 37H44.2083C43.9322 37 43.7083 36.7761 43.7083 36.5V35.5Z M43.7083 38.5C43.7083 38.2239 43.9322 38 44.2083 38H47.2083C47.4844 38 47.7083 38.2239 47.7083 38.5V39.5C47.7083 39.7761 47.4844 40 47.2083 40H44.2083C43.9322 40 43.7083 39.7761 43.7083 39.5V38.5Z M43.7083 41.5C43.7083 41.2239 43.9322 41 44.2083 41H47.2083C47.4844 41 47.7083 41.2239 47.7083 41.5V42.5C47.7083 42.7761 47.4844 43 47.2083 43H44.2083C43.9322 43 43.7083 42.7761 43.7083 42.5V41.5Z M43.7083 44.5C43.7083 44.2239 43.9322 44 44.2083 44H47.2083C47.4844 44 47.7083 44.2239 47.7083 44.5V45.5C47.7083 45.7761 47.4844 46 47.2083 46H44.2083C43.9322 46 43.7083 45.7761 43.7083 45.5V44.5Z M48.7083 35.5C48.7083 35.2239 48.9322 35 49.2083 35H52.2083C52.4844 35 52.7083 35.2239 52.7083 35.5V36.5C52.7083 36.7761 52.4844 37 52.2083 37H49.2083C48.9322 37 48.7083 36.7761 48.7083 36.5V35.5Z M48.7083 38.5C48.7083 38.2239 48.9322 38 49.2083 38H52.2083C52.4844 38 52.7083 38.2239 52.7083 38.5V39.5C52.7083 39.7761 52.4844 40 52.2083 40H49.2083C48.9322 40 48.7083 39.7761 48.7083 39.5V38.5Z M48.7083 41.5C48.7083 41.2239 48.9322 41 49.2083 41H52.2083C52.4844 41 52.7083 41.2239 52.7083 41.5V42.5C52.7083 42.7761 52.4844 43 52.2083 43H49.2083C48.9322 43 48.7083 42.7761 48.7083 42.5V41.5Z M48.7083 44.5C48.7083 44.2239 48.9322 44 49.2083 44H52.2083C52.4844 44 52.7083 44.2239 52.7083 44.5V45.5C52.7083 45.7761 52.4844 46 52.2083 46H49.2083C48.9322 46 48.7083 45.7761 48.7083 45.5V44.5Z M53.7083 35.5C53.7083 35.2239 53.9322 35 54.2083 35H57.2083C57.4844 35 57.7083 35.2239 57.7083 35.5V36.5C57.7083 36.7761 57.4844 37 57.2083 37H54.2083C53.9322 37 53.7083 36.7761 53.7083 36.5V35.5Z M53.7083 38.5C53.7083 38.2239 53.9322 38 54.2083 38H57.2083C57.4844 38 57.7083 38.2239 57.7083 38.5V39.5C57.7083 39.7761 57.4844 40 57.2083 40H54.2083C53.9322 40 53.7083 39.7761 53.7083 39.5V38.5Z M53.7083 41.5C53.7083 41.2239 53.9322 41 54.2083 41H57.2083C57.4844 41 57.7083 41.2239 57.7083 41.5V42.5C57.7083 42.7761 57.4844 43 57.2083 43H54.2083C53.9322 43 53.7083 42.7761 53.7083 42.5V41.5Z M53.7083 44.5C53.7083 44.2239 53.9322 44 54.2083 44H57.2083C57.4844 44 57.7083 44.2239 57.7083 44.5V45.5C57.7083 45.7761 57.4844 46 57.2083 46H54.2083C53.9322 46 53.7083 45.7761 53.7083 45.5V44.5Z'}
//   },
//   
//room3 warddrobe
// {
//   "id": "room3WardrobeDoor1",
//   "shape": {
//       "type": "Basic",
//       "shape": "Rectangle"
//   },
//   "style": {
//       "fill": "url(#linear-gradient)"
//   },
//   "width": 28,
//   "height": 4,
//   "offsetX": 690,
//   "offsetY": 321,
//   "addInfo": {
//       "type": "CustomShapes"
//   }
// }, 
// {
//   "id": "room3WardrobeDoor2",
//   "shape": {
//       "type": "Path",
//       "data": "M160 101.29 83.92 111.29 82.92 107.54 160 97.54 160 101.29"
//   },
//   "style": {
//       "fill": "url(#linear-gradient-2)"
//   },
//   "width": 30,
//   "height": 14,
//   "offsetX": 713,
//   "offsetY": 325,
//   "addInfo": {
//       "type": "CustomShapes"
//   }
// },
//  {
//   "id": "room3Wardroberect",
//   "shape": {
//       "type": "Path",
//       "data": "M4,54H156a4,4,0,0,1,4,4V98a0,0,0,0,1,0,0H0a0,0,0,0,1,0,0V58A4,4,0,0,1,4,54Z"
//   },
//   "style": {
//       "fill": "#FFFFFF",
//       "strokeWidth": 1
//   },
//   "width": 52,
//   "height": 33,
//   "offsetX": 702,
//   "offsetY":302,
//   "addInfo": {
//       "type": "CustomShapes"
//   }
// }, 
// {
//   "id": "Wardrobe5Kkgznd",
//   "shape": {
//       "type": "Basic",
//       "shape": "Rectangle",
//       "cornerRadius": 0.5
//   },
//   "style": {
//       "fill": "#522c0a"
//   },
//   "width": 3,
//   "height": 1,
//   "offsetX": 49.5,
//   "offsetY": 102.5,
//   "addInfo": {
//       "type": "CustomShapes"
//   }
// },
//  {
//   "id": "Wardrobe6o9EXmW",
//   "shape": {
//       "type": "Basic",
//       "shape": "Rectangle",
//       "cornerRadius": 0.5
//   },
//   "style": {
//       "fill": "#522c0a"
//   },
//   "width": 3,
//   "height": 1,
//   "offsetX": 115.17000579833984,
//   "offsetY": 107.69000244140625,
//   "addInfo": {
//       "type": "CustomShapes"
//   }
// }, 
// {
//   "id": "room3Wardrobe",
//   "children": [ "room3Wardroberect","room3WardrobeDoor1","room3WardrobeDoor2"],
//   "addInfo": {
//       "type": "CustomShapes"
//   }
// },
//room1 wardrobe
// {
//   "id": "room1Wardroberect",
//   "shape": {
//       "type": "Path",
//       "data": "M4,54H156a4,4,0,0,1,4,4V98a0,0,0,0,1,0,0H0a0,0,0,0,1,0,0V58A4,4,0,0,1,4,54Z"
//   },
//   "style": {
//       "fill": "#FFFFFF",
//       "strokeWidth": 1
//   },
//   "width": 52,
//   "height": 33,
//   "offsetX": 118,
//   "offsetY":178,
//   "rotateAngle":180,
//   "addInfo": {
//       "type": "CustomShapes"
//   }
// }, 
// {
//   "id": "room1WardrobeDoor1",
//   "shape": {
//       "type": "Basic",
//       "shape": "Rectangle"
//   },
//   "style": {
//       "fill": "url(#linear-gradient)"
//   },
//   "width": 28,
//   "height": 4,
//   "offsetX": 130,
//   "offsetY": 160,
//   "addInfo": {
//       "type": "CustomShapes"
//   }
// }, 
// {
//   "id": "room1WardrobeDoor2",
//   "shape": {
//       "type": "Path",
//       "data": "M160 101.29 83.92 111.29 82.92 107.54 160 97.54 160 101.29"
//   },
//   "style": {
//       "fill": "url(#linear-gradient-2)"
//   },
//   "width": 30,
//   "height": 14,
//   "offsetX": 107,
//   "offsetY": 155,
//   "addInfo": {
//       "type": "CustomShapes"
//   }
// }, 
// {
//   "id": "room1Wardrobe",
//   "children": [ "room2Wardroberect"],
//   "addInfo": {
//       "type": "CustomShapes"
//   }
// },
// //store warddrobe
// {
//   "id": "storeWardroberect",
//   "shape": {
//       "type": "Path",
//       "data": "M4,54H156a4,4,0,0,1,4,4V98a0,0,0,0,1,0,0H0a0,0,0,0,1,0,0V58A4,4,0,0,1,4,54Z"
//   },
//   "style": {
//       "fill": "#FFFFFF",
//       "strokeWidth": 1
//   },
//   "width": 52,
//   "height": 33,
//   "offsetX": 820,
//   "offsetY":34,
//   "addInfo": {
//       "type": "CustomShapes"
//   }
// },
// {
//   "id": "storeWardrobeDoor1",
//   "shape": {
//       "type": "Basic",
//       "shape": "Rectangle"
//   },
//   "style": {
//       "fill": "url(#linear-gradient)"
//   },
//   "width": 28,
//   "height": 4,
//   "offsetX": 808,
//   "offsetY": 52,
//   "addInfo": {
//       "type": "CustomShapes"
//   }
// }, 
// {
//   "id": "storeWardrobeDoor2",
//   "shape": {
//       "type": "Path",
//       "data": "M160 101.29 83.92 111.29 82.92 107.54 160 97.54 160 101.29"
//   },
//   "style": {
//       "fill": "url(#linear-gradient-2)"
//   },
//   "width": 30,
//   "height": 14,
//   "offsetX": 831,
//   "offsetY": 58,
//   "addInfo": {
//       "type": "CustomShapes"
//   }
// },
// {
//   "id": "storeWardrobe",
//   "children": [ "storeWardroberect"],
//   "addInfo": {
//       "type": "CustomShapes"
//   }
// },
// //room2warddrobe
// {
//   "id": "room2Wardroberect",
//   "shape": {
//       "type": "Path",
//       "data": "M4,54H156a4,4,0,0,1,4,4V98a0,0,0,0,1,0,0H0a0,0,0,0,1,0,0V58A4,4,0,0,1,4,54Z"
//   },
//   "style": {
//       "fill": "#FFFFFF",
//       "strokeWidth": 1
//   },
//   "width": 52,
//   "height": 33,
//   "offsetX": 220,
//   "offsetY":386,
//   "rotateAngle":90,
//   "addInfo": {
//       "type": "CustomShapes"
//   }
// },
//   {
//     "id": "room2WardrobeDoor1",
//     "shape": {
//         "type": "Basic",
//         "shape": "Rectangle"
//     },
//     "style": {
//         "fill": "url(#linear-gradient)"
//     },
//     "width": 28,
//     "height": 4,
//     "offsetX": 201,
//     "offsetY": 374,
//     "rotateAngle":90,
//     "addInfo": {
//         "type": "CustomShapes"
//     }
//   }, 
//   {
//     "id": "room2WardrobeDoor2",
//     "shape": {
//         "type": "Path",
//         "data": "M160 101.29 83.92 111.29 82.92 107.54 160 97.54 160 101.29"
//     },
//     "style": {
//         "fill": "url(#linear-gradient-2)"
//     },
//     "width": 30,
//     "height": 14,
//     "offsetX": 196,
//     "offsetY": 397,
//     "rotateAngle":90,
//     "addInfo": {
//         "type": "CustomShapes"
//     }
//   }, 
// {
//   "id": "room2Wardrobe",
//   "children": [ "room2Wardroberect","room2WardrobeDoor1","room2WardrobeDoor2"],
//   "addInfo": {
//       "type": "CustomShapes"
//   }
// },
// //kitchen Warddrobe
// {
//   "id": "kitchenWardroberect",
//   "shape": {
//       "type": "Path",
//       "data": "M4,54H156a4,4,0,0,1,4,4V98a0,0,0,0,1,0,0H0a0,0,0,0,1,0,0V58A4,4,0,0,1,4,54Z"
//   },
//   "style": {
//       "fill": "#FFFFFF",
//       "strokeWidth": 1
//   },
//   "width": 52,
//   "height": 33,
//   "offsetX": 640,
//   "offsetY":34,
//   "addInfo": {
//       "type": "CustomShapes"
//   }
// },
// {
//   "id": "kitchenWardrobeDoor1",
//   "shape": {
//       "type": "Basic",
//       "shape": "Rectangle"
//   },
//   "style": {
//       "fill": "url(#linear-gradient)"
//   },
//   "width": 28,
//   "height": 4,
//   "offsetX": 628,
//   "offsetY": 53,
//   "addInfo": {
//       "type": "CustomShapes"
//   }
// }, 
// {
//   "id": "kitchenWardrobeDoor2",
//   "shape": {
//       "type": "Path",
//       "data": "M160 101.29 83.92 111.29 82.92 107.54 160 97.54 160 101.29"
//   },
//   "style": {
//       "fill": "url(#linear-gradient-2)"
//   },
//   "width": 30,
//   "height": 14,
//   "offsetX": 651,
//   "offsetY": 58,
//   "addInfo": {
//       "type": "CustomShapes"
//   }
// },
// {
//   "id": "kitchenWardrobe",
//   "children": [ "kitchenWardroberect" ,"kitchenWardrobeDoor1","kitchenWardrobeDoor2"],
//   "addInfo": {
//       "type": "CustomShapes"
//   }
// },
]
//Path values of the shapes in the symbol palette
var doors = [
  { id: 'Door close', shape: { type: 'Path', data: 'M1 71L1 79L72 79V71M1 71L72 71M1 71C1 32.3401 32.3401 1 71 1H72V71' }},
  { id: 'Double door close', shape: { type: 'Path', data:"M143 71V79L1 79L1 71M143 71L1 71M143 71V1H142C103.34 1 72 32.3401 72 71M143 71H72M1 71L1 1H2C40.6599 1 72 32.3401 72 71M1 71L72 71M72 78.5V71"}},
];
var diningRoom = [
  { id:'Circle Study Table', dragSize:{height:40,width:40}, shape :{ type: 'Path', data:"M57 29C57 44.464 44.464 57 29 57C13.536 57 1 44.464 1 29C1 13.536 13.536 1 29 1C44.464 1 57 13.536 57 29Z"}},
  { id:'Circle Study Table1', dragSize:{height:40,width:40}, shape :{ type: 'Path', data:'M57 29C57 44.464 44.464 57 29 57C13.536 57 1 44.464 1 29C1 13.536 13.536 1 29 1C44.464 1 57 13.536 57 29Z M6.85355 12.1464C6.19532 11.4882 5.98924 10.6873 6.11305 9.86427C6.23921 9.02567 6.71264 8.15463 7.43393 7.43333L6.72683 6.72622C5.88603 7.56702 5.28822 8.62505 5.12418 9.71551C4.9578 10.8215 5.24259 11.9497 6.14645 12.8536L6.85355 12.1464ZM7.43393 7.43333C8.15523 6.71203 9.02609 6.23877 9.8645 6.11276C10.6874 5.98909 11.4882 6.19526 12.1464 6.85355L12.8536 6.14645C11.9498 5.24265 10.8218 4.95765 9.71588 5.12387C8.62553 5.28775 7.56763 5.88542 6.72683 6.72622L7.43393 7.43333ZM51.1464 46.0224C51.8108 46.6867 52.0089 47.4472 51.888 48.217C51.7639 49.0076 51.2956 49.8383 50.5673 50.5667L51.2744 51.2738C52.1081 50.44 52.7105 49.4261 52.8759 48.3721C53.0447 47.2971 52.7513 46.213 51.8536 45.3153L51.1464 46.0224ZM50.5673 50.5667C49.837 51.2969 49.0611 51.7213 48.3324 51.8114C47.6254 51.8987 46.902 51.68 46.2203 50.9982L45.5132 51.7053C46.3935 52.5857 47.4161 52.9322 48.4551 52.8038C49.4724 52.6781 50.4425 52.1056 51.2744 51.2738L50.5673 50.5667ZM46.1646 6.95984C46.8414 6.28307 47.5752 6.07026 48.2996 6.16688C49.0457 6.2664 49.837 6.70326 50.5667 7.43296L51.2738 6.72585C50.4414 5.89345 49.4592 5.3127 48.4318 5.17566C47.3826 5.03572 46.3429 5.3674 45.4575 6.25273L46.1646 6.95984ZM50.5667 7.43296C51.3108 8.17704 51.7686 8.92759 51.889 9.62476C52.0035 10.2884 51.8245 10.9684 51.1464 11.6464L51.8536 12.3536C52.7376 11.4695 53.0497 10.4703 52.8744 9.45465C52.7049 8.47256 52.0918 7.54386 51.2738 6.72585L50.5667 7.43296ZM12.1464 51.1464C11.4882 51.8047 10.6872 52.011 9.86418 51.8873C9.0256 51.7613 8.15459 51.2881 7.43333 50.5668L6.72622 51.2739C7.56706 52.1147 8.62512 52.7124 9.7156 52.8762C10.8216 53.0424 11.9497 52.7574 12.8536 51.8536L12.1464 51.1464ZM7.43333 50.5668C6.71206 49.8455 6.23878 48.9745 6.11276 48.1359C5.98908 47.3128 6.19528 46.5118 6.85355 45.8536L6.14645 45.1464C5.24262 46.0503 4.95766 47.1784 5.12387 48.2845C5.28774 49.375 5.88539 50.4331 6.72622 51.2739L7.43333 50.5668ZM56.5 29C56.5 44.1878 44.1878 56.5 29 56.5V57.5C44.7401 57.5 57.5 44.7401 57.5 29H56.5ZM29 56.5C13.8122 56.5 1.5 44.1878 1.5 29H0.5C0.5 44.7401 13.2599 57.5 29 57.5V56.5ZM1.5 29C1.5 13.8122 13.8122 1.5 29 1.5V0.5C13.2599 0.5 0.5 13.2599 0.5 29H1.5ZM29 1.5C44.1878 1.5 56.5 13.8122 56.5 29H57.5C57.5 13.2599 44.7401 0.5 29 0.5V1.5Z'}},
  { id:'Circle Study Table2',dragSize:{height:40,width:40},  shape :{ type: 'Path', data:'M57 29C57 44.464 44.464 57 29 57C13.536 57 1 44.464 1 29C1 13.536 13.536 1 29 1C44.464 1 57 13.536 57 29Z  M53 29C53 42.2548 42.2548 53 29 53C15.7452 53 5 42.2548 5 29C5 15.7452 15.7452 5 29 5C42.2548 5 53 15.7452 53 29Z'}},
  { id:'Circle Study Table3',dragSize:{height:40,width:40},  shape :{ type: 'Path', data:"M1.00187 29.3204C0.824922 13.8575 13.2167 1.17882 28.6796 1.00187C44.1426 0.824922 56.8213 13.2167 56.9982 28.6796C57.1752 44.1426 44.7834 56.8213 29.3204 56.9982C13.8575 57.1752 1.17882 44.7834 1.00187 29.3204Z M4.00163 29.2862C3.84364 15.48 14.9077 4.15981 28.7139 4.00182C42.5201 3.84383 53.8404 14.9079 53.9984 28.7141C54.1563 42.5203 43.0923 53.8406 29.2861 53.9985C15.4798 54.1565 4.15962 43.0925 4.00163 29.2862Z M44.5585 52.7817C44.8152 53.0656 45.1557 53.2686 45.5606 53.3791C45.9655 53.4897 46.4268 53.5056 46.9183 53.426C47.4097 53.3464 47.9216 53.1729 48.4248 52.9153C48.928 52.6577 49.4125 52.3211 49.8508 51.9248C50.2891 51.5284 50.6725 51.08 50.9792 50.6051C51.2859 50.1303 51.5099 49.6383 51.6383 49.1573C51.7667 48.6763 51.797 48.2157 51.7276 47.8018C51.6581 47.3879 51.4903 47.0287 51.2336 46.7449L44.5585 52.7817Z M13.9609 52.8751C13.6983 53.1861 13.3493 53.419 12.934 53.5604C12.5186 53.7019 12.0449 53.7492 11.5399 53.6995C11.035 53.6499 10.5086 53.5043 9.99098 53.2711C9.47332 53.0379 8.97448 52.7217 8.52293 52.3405C8.07139 51.9593 7.67598 51.5205 7.35929 51.0493C7.0426 50.5781 6.81083 50.0836 6.6772 49.5942C6.54358 49.1047 6.51072 48.6298 6.58051 48.1965C6.6503 47.7633 6.82136 47.3803 7.08394 47.0692L13.9609 52.8751Z M51.1787 11.4637C51.4719 11.1448 51.6767 10.7503 51.7812 10.3026C51.8857 9.8549 51.8879 9.36283 51.7877 8.85448C51.6876 8.34613 51.4869 7.83145 51.1973 7.33983C50.9077 6.84821 50.5348 6.38928 50.0998 5.98923C49.6649 5.58919 49.1764 5.25587 48.6623 5.00831C48.1483 4.76074 47.6186 4.60378 47.1037 4.54639C46.5888 4.48899 46.0986 4.53229 45.6612 4.6738C45.2238 4.81531 44.8477 5.05227 44.5544 5.37114L51.1787 11.4637Z M6.96563 11.1862C6.7075 10.8946 6.53905 10.5288 6.46989 10.1095C6.40073 9.69022 6.43222 9.22575 6.56256 8.7426C6.6929 8.25944 6.91954 7.76707 7.22954 7.29359C7.53953 6.8201 7.92682 6.37478 8.36927 5.98305C8.81173 5.59132 9.30069 5.26085 9.80825 5.01052C10.3158 4.76018 10.832 4.59487 11.3274 4.52404C11.8228 4.4532 12.2877 4.47822 12.6955 4.59767C13.1033 4.71713 13.446 4.92867 13.7041 5.22022L6.96563 11.1862Z"}},
  { id:'Circular Table for Two',shape :{ type: 'Path', data:"M12.7839 6.68319C12.3695 3.67862 14.704 1 17.737 1H33.4357C36.4079 1 38.7239 3.57736 38.4072 6.53267L37.5 14.7962C33 12.2962 30.4479 12.2502 25.5 12.0049C20.8774 12.1817 18.4551 13.0876 13.9551 15.0876L12.7839 6.68319Z M32 2C32 4.20914 30.2091 6 28 6L23 6C20.7909 6 19 4.20914 19 2V1L32 1V2Z M38.6314 67.656C38.8308 70.546 36.5401 73 33.6433 73H17.5439C14.579 73 12.2654 70.4347 12.5705 67.4855L13.4604 58.6325C17.7149 60.6639 20.3595 61.8118 25.5 61.9951C30.7634 61.8969 34.0464 60.4596 38.1993 58.8266L38.6314 67.656Z M19 72C19 69.7909 20.7909 68 23 68H28C30.2091 68 32 69.7909 32 72V73H19V72Z M51 37C51 50.8071 39.8071 62 26 62C12.1929 62 1 50.8071 1 37C1 23.1929 12.1929 12 26 12C39.8071 12 51 23.1929 51 37Z M48 37C48 49.1503 38.1503 59 26 59C13.8497 59 4 49.1503 4 37C4 24.8497 13.8497 15 26 15C38.1503 15 48 24.8497 48 37Z"}},
  { id:'Rectangle Dining Table', dragSize:{width:60,height:40},shape :{ type: 'Path', data: 'M26.5284 6.47992C26.2452 3.54248 28.5543 1 31.5053 1H47.4947C50.4457 1 52.7548 3.54248 52.4716 6.47992L51.65 15L27.35 15L26.5284 6.47992Z M46 2C46 4.20914 44.2091 6 42 6L37 6C34.7909 6 33 4.20914 33 2V1L46 1V2Z M52.4716 73.5201C52.7548 76.4575 50.4457 79 47.4947 79H31.5053C28.5543 79 26.2452 76.4575 26.5284 73.5201L27.35 65H51.65L52.4716 73.5201Z M33 78C33 75.7909 34.7909 74 37 74H42C44.2091 74 46 75.7909 46 78V79H33V78Z M73.5201 27.5284C76.4575 27.2452 79 29.5543 79 32.5053V48.4947C79 51.4457 76.4575 53.7548 73.5201 53.4716L65 52.65V28.35L73.5201 27.5284Z M78 47C75.7909 47 74 45.2091 74 43V38C74 35.7909 75.7909 34 78 34H79V47H78Z M6.47992 53.4716C3.54248 53.7548 1 51.4457 1 48.4947L1 32.5053C1 29.5543 3.54249 27.2452 6.47992 27.5284L15 28.35L15 52.65L6.47992 53.4716Z M61 15H19C16.7909 15 15 16.7909 15 19V61C15 63.2091 16.7909 65 19 65H61C63.2091 65 65 63.2091 65 61V19C65 16.7909 63.2091 15 61 15Z M2 34C4.20914 34 6 35.7909 6 38L6 43C6 45.2091 4.20914 47 2 47H1L1 34H2Z' }},
  { id:'Oblong Dining Table',dragSize:{width:60,height:40}, shape :{ type: 'Path', data:"M25.0284 6.47992C24.7452 3.54248 27.0543 1 30.0053 1H45.9947C48.9457 1 51.2548 3.54248 50.9716 6.47992L50.15 15L25.85 15L25.0284 6.47992ZM58.0284 6.47992C57.7452 3.54248 60.0543 1 63.0053 1H78.9947C81.9457 1 84.2548 3.54248 83.9716 6.47992L83.15 15L58.85 15L58.0284 6.47992Z M84.9716 73.5201C85.2548 76.4575 82.9457 79 79.9947 79H64.0053C61.0543 79 58.7452 76.4575 59.0284 73.5201L59.85 65H84.15L84.9716 73.5201Z M51.9716 73.5201C52.2548 76.4575 49.9457 79 46.9947 79H31.0053C28.0543 79 25.7452 76.4575 26.0284 73.5201L26.85 65H51.15L51.9716 73.5201Z M6.47992 53.4716C3.54249 53.7548 1 51.4457 1 48.4947L1 32.5053C1 29.5543 3.54249 27.2452 6.47992 27.5284L15 28.35V52.65L6.47992 53.4716Z M103.52 27.5284C106.458 27.2452 109 29.5543 109 32.5053V48.4947C109 51.4457 106.458 53.7548 103.52 53.4716L95 52.65V28.35L103.52 27.5284Z M91 15H19C16.7909 15 15 16.7909 15 19V61C15 63.2091 16.7909 65 19 65H91C93.2091 65 95 63.2091 95 61V19C95 16.7909 93.2091 15 91 15Z M50.15 15V15.5H50.6041L50.6477 15.048L50.15 15ZM25.85 15L25.3523 15.048L25.3959 15.5H25.85V15ZM50.9716 6.47992L50.4739 6.43192L50.9716 6.47992ZM25.0284 6.47992L24.5307 6.52791L25.0284 6.47992ZM32 1V0.5L31.5 0.5V1H32ZM45 1H45.5V0.500001L45 0.500001V1ZM36 6V5.5V6ZM32 2L32.5 2V2H32ZM41 6V6.5V6ZM45 2H45.5H45ZM83.15 15V15.5H83.6041L83.6477 15.048L83.15 15ZM58.85 15L58.3523 15.048L58.3959 15.5H58.85V15ZM83.9716 6.47992L83.4739 6.43192L83.9716 6.47992ZM58.0284 6.47992L58.5261 6.43192L58.0284 6.47992ZM65 1V0.5L64.5 0.5V1H65ZM78 1H78.5V0.500001L78 0.500001V1ZM69 6V5.5V6ZM65 2L65.5 2V2H65ZM74 6V6.5V6ZM78 2H78.5H78ZM59.85 65V64.5H59.3959L59.3523 64.952L59.85 65ZM84.15 65L84.6477 64.952L84.6041 64.5H84.15V65ZM59.0284 73.5201L59.5261 73.5681L59.0284 73.5201ZM84.9716 73.5201L84.4739 73.5681L84.9716 73.5201ZM78 79V79.5H78.5V79H78ZM65 79H64.5V79.5H65V79ZM74 74V73.5V74ZM78 78H77.5H78ZM69 74V74.5V74ZM65 78H64.5H65ZM26.85 65V64.5H26.3959L26.3523 64.952L26.85 65ZM51.15 65L51.6477 64.952L51.6041 64.5H51.15V65ZM26.0284 73.5201L26.5261 73.5681L26.0284 73.5201ZM51.9716 73.5201L51.4739 73.5681L51.9716 73.5201ZM15 28.35H15.5V27.8959L15.048 27.8523L15 28.35ZM15 52.65L15.048 53.1477L15.5 53.1041V52.65H15ZM1 32.5053H0.500002H1ZM6.47992 27.5284L6.43193 28.0261L6.47992 27.5284ZM1 48.4947H1.5H1ZM6.47992 53.4716L6.43192 52.9739L6.47992 53.4716ZM45 79V79.5H45.5V79H45ZM32 79H31.5V79.5H32V79ZM41 74V73.5V74ZM45 78H44.5H45ZM36 74V74.5V74ZM32 78H31.5H32ZM1 47H0.5L0.5 47.5H1V47ZM1 34V33.5H0.500002L0.500002 34H1ZM6 43H6.5H6ZM2 47L2 46.5H2V47ZM6 38H5.5H6ZM2 34V33.5V34ZM95 52.65H94.5V53.1041L94.952 53.1477L95 52.65ZM95 28.35L94.952 27.8523L94.5 27.8959V28.35H95ZM109 48.4947H109.5H109ZM103.52 53.4716L103.472 53.9693L103.52 53.4716ZM109 32.5053H108.5H109ZM103.52 27.5284L103.568 28.0261L103.52 27.5284ZM109 34H109.5V33.5H109V34ZM109 47V47.5H109.5V47H109ZM104 38H103.5H104ZM108 34V34.5V34ZM104 43H104.5H104ZM108 47V47.5V47ZM30.0053 1.5H45.9947V0.5H30.0053V1.5ZM50.4739 6.43192L49.6523 14.952L50.6477 15.048L51.4693 6.52791L50.4739 6.43192ZM50.15 14.5L25.85 14.5V15.5L50.15 15.5V14.5ZM26.3477 14.952L25.5261 6.43192L24.5307 6.52791L25.3523 15.048L26.3477 14.952ZM45.9947 1.5C48.6506 1.5 50.7288 3.78824 50.4739 6.43192L51.4693 6.52791C51.7808 3.29673 49.2408 0.5 45.9947 0.5V1.5ZM30.0053 0.5C26.7592 0.5 24.2192 3.29673 24.5307 6.52791L25.5261 6.43192C25.2712 3.78824 27.3494 1.5 30.0053 1.5V0.5ZM41 5.5L36 5.5V6.5L41 6.5V5.5ZM32.5 2V1H31.5V2H32.5ZM32 1.5L45 1.5V0.500001L32 0.5V1.5ZM44.5 1V2H45.5V1H44.5ZM36 5.5C34.067 5.5 32.5 3.933 32.5 2L31.5 2C31.5 4.48528 33.5147 6.5 36 6.5V5.5ZM41 6.5C43.4853 6.5 45.5 4.48528 45.5 2H44.5C44.5 3.933 42.933 5.5 41 5.5V6.5ZM63.0053 1.5H78.9947V0.5H63.0053V1.5ZM83.4739 6.43192L82.6523 14.952L83.6477 15.048L84.4693 6.52791L83.4739 6.43192ZM83.15 14.5L58.85 14.5V15.5L83.15 15.5V14.5ZM59.3477 14.952L58.5261 6.43192L57.5307 6.52791L58.3523 15.048L59.3477 14.952ZM78.9947 1.5C81.6506 1.5 83.7288 3.78824 83.4739 6.43192L84.4693 6.52791C84.7809 3.29673 82.2408 0.5 78.9947 0.5V1.5ZM63.0053 0.5C59.7592 0.5 57.2192 3.29673 57.5307 6.52791L58.5261 6.43192C58.2712 3.78824 60.3494 1.5 63.0053 1.5V0.5ZM74 5.5L69 5.5V6.5L74 6.5V5.5ZM65.5 2V1H64.5V2H65.5ZM65 1.5L78 1.5V0.500001L65 0.5V1.5ZM77.5 1V2H78.5V1H77.5ZM69 5.5C67.067 5.5 65.5 3.933 65.5 2L64.5 2C64.5 4.48528 66.5147 6.5 69 6.5V5.5ZM74 6.5C76.4853 6.5 78.5 4.48528 78.5 2H77.5C77.5 3.933 75.933 5.5 74 5.5V6.5ZM79.9947 78.5H64.0053V79.5H79.9947V78.5ZM59.5261 73.5681L60.3477 65.048L59.3523 64.952L58.5307 73.4721L59.5261 73.5681ZM59.85 65.5H84.15V64.5H59.85V65.5ZM83.6523 65.048L84.4739 73.5681L85.4693 73.4721L84.6477 64.952L83.6523 65.048ZM64.0053 78.5C61.3494 78.5 59.2712 76.2118 59.5261 73.5681L58.5307 73.4721C58.2192 76.7033 60.7592 79.5 64.0053 79.5V78.5ZM79.9947 79.5C83.2408 79.5 85.7809 76.7033 85.4693 73.4721L84.4739 73.5681C84.7288 76.2118 82.6506 78.5 79.9947 78.5V79.5ZM69 74.5H74V73.5H69V74.5ZM77.5 78V79H78.5V78H77.5ZM78 78.5H65V79.5H78V78.5ZM65.5 79V78H64.5V79H65.5ZM74 74.5C75.933 74.5 77.5 76.067 77.5 78H78.5C78.5 75.5147 76.4853 73.5 74 73.5V74.5ZM69 73.5C66.5147 73.5 64.5 75.5147 64.5 78H65.5C65.5 76.067 67.067 74.5 69 74.5V73.5ZM46.9947 78.5H31.0053V79.5H46.9947V78.5ZM26.5261 73.5681L27.3477 65.048L26.3523 64.952L25.5307 73.4721L26.5261 73.5681ZM26.85 65.5H51.15V64.5H26.85V65.5ZM50.6523 65.048L51.4739 73.5681L52.4693 73.4721L51.6477 64.952L50.6523 65.048ZM31.0053 78.5C28.3494 78.5 26.2712 76.2118 26.5261 73.5681L25.5307 73.4721C25.2192 76.7033 27.7592 79.5 31.0053 79.5V78.5ZM46.9947 79.5C50.2408 79.5 52.7808 76.7033 52.4693 73.4721L51.4739 73.5681C51.7288 76.2118 49.6506 78.5 46.9947 78.5V79.5ZM1.5 48.4947L1.5 32.5053H0.500002L0.500001 48.4947H1.5ZM6.43193 28.0261L14.952 28.8477L15.048 27.8523L6.52791 27.0307L6.43193 28.0261ZM14.5 28.35V52.65H15.5V28.35H14.5ZM14.952 52.1523L6.43192 52.9739L6.52791 53.9693L15.048 53.1477L14.952 52.1523ZM1.5 32.5053C1.5 29.8494 3.78824 27.7712 6.43193 28.0261L6.52791 27.0307C3.29674 26.7192 0.500002 29.2592 0.500002 32.5053H1.5ZM0.500001 48.4947C0.500001 51.7408 3.29673 54.2808 6.52791 53.9693L6.43192 52.9739C3.78824 53.2288 1.5 51.1506 1.5 48.4947H0.500001ZM36 74.5H41V73.5H36V74.5ZM44.5 78V79H45.5V78H44.5ZM45 78.5H32V79.5H45V78.5ZM32.5 79V78H31.5V79H32.5ZM41 74.5C42.933 74.5 44.5 76.067 44.5 78H45.5C45.5 75.5147 43.4853 73.5 41 73.5V74.5ZM36 73.5C33.5147 73.5 31.5 75.5147 31.5 78H32.5C32.5 76.067 34.067 74.5 36 74.5V73.5ZM5.5 38L5.5 43H6.5L6.5 38H5.5ZM2 46.5H1V47.5H2V46.5ZM1.5 47L1.5 34H0.500002L0.5 47H1.5ZM1 34.5H2V33.5H1V34.5ZM5.5 43C5.5 44.933 3.933 46.5 2 46.5L2 47.5C4.48528 47.5 6.5 45.4853 6.5 43H5.5ZM6.5 38C6.5 35.5147 4.48528 33.5 2 33.5L2 34.5C3.933 34.5 5.5 36.067 5.5 38H6.5ZM108.5 32.5053V48.4947H109.5V32.5053H108.5ZM103.568 52.9739L95.048 52.1523L94.952 53.1477L103.472 53.9693L103.568 52.9739ZM95.5 52.65V28.35H94.5V52.65H95.5ZM95.048 28.8477L103.568 28.0261L103.472 27.0307L94.952 27.8523L95.048 28.8477ZM108.5 48.4947C108.5 51.1506 106.212 53.2288 103.568 52.9739L103.472 53.9693C106.703 54.2808 109.5 51.7408 109.5 48.4947H108.5ZM109.5 32.5053C109.5 29.2592 106.703 26.7192 103.472 27.0307L103.568 28.0261C106.212 27.7712 108.5 29.8494 108.5 32.5053H109.5ZM104.5 43V38H103.5V43H104.5ZM108 34.5H109V33.5H108V34.5ZM108.5 34V47H109.5V34H108.5ZM109 46.5H108V47.5H109V46.5ZM104.5 38C104.5 36.067 106.067 34.5 108 34.5V33.5C105.515 33.5 103.5 35.5147 103.5 38H104.5ZM103.5 43C103.5 45.4853 105.515 47.5 108 47.5V46.5C106.067 46.5 104.5 44.933 104.5 43H103.5ZM19 15.5H91V14.5H19V15.5ZM94.5 19V61H95.5V19H94.5ZM91 64.5H19V65.5H91V64.5ZM15.5 61V19H14.5V61H15.5ZM19 64.5C17.067 64.5 15.5 62.933 15.5 61H14.5C14.5 63.4853 16.5147 65.5 19 65.5V64.5ZM94.5 61C94.5 62.933 92.933 64.5 91 64.5V65.5C93.4853 65.5 95.5 63.4853 95.5 61H94.5ZM91 15.5C92.933 15.5 94.5 17.067 94.5 19H95.5C95.5 16.5147 93.4853 14.5 91 14.5V15.5ZM19 14.5C16.5147 14.5 14.5 16.5147 14.5 19H15.5C15.5 17.067 17.067 15.5 19 15.5V14.5Z"}},
  { id:'Oval Dining Table', shape :{ type: 'Path', data:"M22.0284 6.47992C21.7452 3.54248 24.0543 1 27.0053 1H42.9947C45.9457 1 48.2548 3.54248 47.9716 6.47992L47.5 11C47.5 11 35.2044 11.2442 32.7044 11.3676C29.5 11.5 22.85 15 22.85 15L22.0284 6.47992Z M42 2C42 4.20914 40.2091 6 38 6L33 6C30.7909 6 29 4.20914 29 2V1L42 1V2Z M55.0284 6.47992C54.7452 3.54248 57.0543 1 60.0053 1H75.9947C78.9457 1 81.2548 3.54248 80.9716 6.47992L80.2454 14.7933C76.3282 11.875 70.5 11.2431 68.6396 11.0529L55.5 11L55.0284 6.47992Z M75 2C75 4.20914 73.2091 6 71 6L66 6C63.7909 6 62 4.20914 62 2V1L75 1V2Z M81.9716 65.5201C82.2548 68.4575 79.9457 71 76.9947 71H61.0053C58.0543 71 55.7452 68.4575 56.0284 65.5201L57 61L67.5 60.9951C73.0289 60.6225 76.0202 59.7634 81.15 57L81.9716 65.5201Z M62 70C62 67.7909 63.7909 66 66 66H71C73.2091 66 75 67.7909 75 70V71H62V70Z M48.9716 65.5201C49.2548 68.4575 46.9457 71 43.9947 71H28.0053C25.0543 71 22.7452 68.4575 23.0284 65.5201L24 57.3584C24 57.3584 29 60.5 36.3178 60.9909L48.5 61L48.9716 65.5201Z M6.47992 49.4716C3.54249 49.7548 1 47.4457 1 44.4947L1 28.5053C1 25.5543 3.54249 23.2452 6.47992 23.5284L15 24C15 24 12 29.5 12.0148 36.8689C12 42 15.3446 48.5 15.3446 48.5L6.47992 49.4716Z M29 70C29 67.7909 30.7909 66 33 66H38C40.2091 66 42 67.7909 42 70V71H29V70Z M2 30C4.20914 30 6 31.7909 6 34L6 39C6 41.2091 4.20914 43 2 43H1L1 30H2Z M97.5201 23.5284C100.458 23.2452 103 25.5543 103 28.5053V44.4947C103 47.4457 100.458 49.7548 97.5201 49.4716L89 48.65C89 48.65 92 42.5 91.9951 36.5C92 30 89.1049 24.3114 89.1049 24.3114L97.5201 23.5284Z M102 43C99.7909 43 98 41.2091 98 39V34C98 31.7909 99.7909 30 102 30H103V43H102Z M67 11H37C23.1929 11 12 22.1929 12 36C12 49.8071 23.1929 61 37 61H67C80.8071 61 92 49.8071 92 36C92 22.1929 80.8071 11 67 11Z"}},
  { id:'Circle Dining Table', shape :{ type: 'Path', data: 'M36.5 12C41 12 48 14.5 48 14.5L48.8831 6.55216C49.2122 3.59033 46.8937 1 43.9137 1H28.9858C26.0418 1 23.735 3.5309 24.0072 6.46229L24.8 15C24.8 15 29.5 12 36.5 12ZM36.5 12C22.6929 12 11.5 23.1929 11.5 37C11.5 50.8071 22.6929 62 36.5 62C50.3071 62 61.5 50.8071 61.5 37C61.5 23.1929 50.3071 12 36.5 12ZM30.5 1V2C30.5 4.20914 32.2909 6 34.5 6L38.5 6C40.7091 6 42.5 4.20914 42.5 2V1L30.5 1ZM25 59.5L24.1169 67.4478C23.7878 70.4097 26.1063 73 29.0863 73H44.1301C47.0318 73 49.3242 70.5381 49.1174 67.6438L48.5 59C48.5 59 43 62 36 62C31.5 62 25 59.5 25 59.5ZM42.5 73V72C42.5 69.7909 40.7091 68 38.5 68H34.5C32.2909 68 30.5 69.7909 30.5 72V73H42.5ZM59 25.5L66.9478 24.6169C69.9097 24.2878 72.5 26.6063 72.5 29.5863V45.4357C72.5 48.4079 69.9226 50.7239 66.9673 50.4072L58.5 49.5C58.5 49.5 61.5 43.5 61.5 37.5C61.5 29 59 25.5 59 25.5ZM72.5 44H71.5C69.2909 44 67.5 42.2091 67.5 40V35C67.5 32.7909 69.2909 31 71.5 31H72.5V44ZM14 25.5L6.57312 24.6431C3.60432 24.3005 1 26.6216 1 29.6101L1 45.4137C1 48.3937 3.59033 50.7122 6.55216 50.3831L14.5 49.5C14.5 49.5 11.5 44.5 11.5 37.5C11.5 30.5 14 25.5 14 25.5ZM1 44H2C4.20914 44 6 42.2091 6 40L6 35C6 32.7909 4.20914 31 2 31H1L1 44Z'}},
  { id:'Rectangle Study Table',dragSize:{width:38,height:22}, shape :{ type: 'Path', data:'M79 1H3C1.89543 1 1 1.89543 1 3V49C1 50.1046 1.89543 51 3 51H79C80.1046 51 81 50.1046 81 49V3C81 1.89543 80.1046 1 79 1Z'}},
  { id:'Rectangle Study Table1',dragSize:{width:38,height:22}, shape :{ type: 'Path', data:'M4 5C4 4.44772 4.44772 4 5 4H83C83.5523 4 84 4.44772 84 5V53C84 53.5523 83.5523 54 83 54H5C4.44772 54 4 53.5523 4 53V5Z M4 6.5C4 6.77614 3.77462 7.00425 3.50231 6.95843C3.08607 6.88841 2.68736 6.73099 2.33329 6.49441C1.83994 6.16477 1.45543 5.69623 1.22836 5.14805C1.0013 4.59987 0.94189 3.99667 1.05765 3.41473C1.1734 2.83279 1.45912 2.29824 1.87868 1.87868C2.29824 1.45912 2.83279 1.1734 3.41473 1.05765C3.99667 0.94189 4.59987 1.0013 5.14805 1.22836C5.69623 1.45543 6.16477 1.83994 6.49441 2.33329C6.73099 2.68736 6.88841 3.08607 6.95843 3.50231C7.00424 3.77462 6.77614 4 6.5 4L4.5 4C4.22386 4 4 4.22386 4 4.5L4 6.5Z M81.5 4C81.2239 4 80.9958 3.77462 81.0416 3.50231C81.1116 3.08607 81.269 2.68736 81.5056 2.33329C81.8352 1.83994 82.3038 1.45543 82.852 1.22836C83.4001 1.0013 84.0033 0.94189 84.5853 1.05765C85.1672 1.1734 85.7018 1.45912 86.1213 1.87868C86.5409 2.29824 86.8266 2.83279 86.9424 3.41473C87.0581 3.99667 86.9987 4.59987 86.7716 5.14805C86.5446 5.69623 86.1601 6.16477 85.6667 6.49441C85.3126 6.73099 84.9139 6.88841 84.4977 6.95843C84.2254 7.00424 84 6.77614 84 6.5V4.5C84 4.22386 83.7761 4 83.5 4L81.5 4Z M6.5 54C6.77614 54 7.00425 54.2254 6.95843 54.4977C6.88841 54.9139 6.73099 55.3126 6.49441 55.6667C6.16477 56.1601 5.69623 56.5446 5.14805 56.7716C4.59987 56.9987 3.99667 57.0581 3.41473 56.9424C2.83279 56.8266 2.29824 56.5409 1.87868 56.1213C1.45912 55.7018 1.1734 55.1672 1.05765 54.5853C0.94189 54.0033 1.0013 53.4001 1.22836 52.852C1.45543 52.3038 1.83994 51.8352 2.33329 51.5056C2.68736 51.269 3.08607 51.1116 3.50231 51.0416C3.77462 50.9958 4 51.2239 4 51.5V53.5C4 53.7761 4.22386 54 4.5 54H6.5Z M84 51.5C84 51.2239 84.2254 50.9958 84.4977 51.0416C84.9139 51.1116 85.3126 51.269 85.6667 51.5056C86.1601 51.8352 86.5446 52.3038 86.7716 52.852C86.9987 53.4001 87.0581 54.0033 86.9424 54.5853C86.8266 55.1672 86.5409 55.7018 86.1213 56.1213C85.7018 56.5409 85.1672 56.8266 84.5853 56.9424C84.0033 57.0581 83.4001 56.9987 82.852 56.7716C82.3038 56.5446 81.8352 56.1601 81.5056 55.6667C81.269 55.3126 81.1116 54.9139 81.0416 54.4977C80.9958 54.2254 81.2239 54 81.5 54H83.5C83.7761 54 84 53.7761 84 53.5V51.5Z'}},
  { id:'Rectangular Table for Two',dragSize:{width:60,height:40}, shape :{ type: 'Path', data:  'M12.5284 6.47992C12.2452 3.54248 14.5543 1 17.5053 1H33.4947C36.4457 1 38.7548 3.54248 38.4716 6.47992L37.65 15L13.35 15L12.5284 6.47992Z M38.4716 73.5201C38.7548 76.4575 36.4457 79 33.4947 79H17.5053C14.5543 79 12.2452 76.4575 12.5284 73.5201L13.35 65H37.65L38.4716 73.5201Z M47 15H5C2.79086 15 1 16.7909 1 19V61C1 63.2091 2.79086 65 5 65H47C49.2091 65 51 63.2091 51 61V19C51 16.7909 49.2091 15 47 15Z M37.65 15V15.5H38.1041L38.1477 15.048L37.65 15ZM13.35 15L12.8523 15.048L12.8959 15.5H13.35V15ZM38.4716 6.47992L37.9739 6.43192L38.4716 6.47992ZM12.5284 6.47992L13.0261 6.43192L12.5284 6.47992ZM19 1V0.5L18.5 0.5V1H19ZM32 1H32.5V0.500001L32 0.500001V1ZM23 6V5.5V6ZM19 2L19.5 2V2H19ZM28 6V6.5V6ZM32 2H32.5H32ZM13.35 65V64.5H12.8959L12.8523 64.952L13.35 65ZM37.65 65L38.1477 64.952L38.1041 64.5H37.65V65ZM17.5053 79V79.5V79ZM12.5284 73.5201L13.0261 73.5681L12.5284 73.5201ZM33.4947 79V78.5V79ZM38.4716 73.5201L37.9739 73.5681L38.4716 73.5201ZM32 79V79.5H32.5V79H32ZM19 79H18.5V79.5H19V79ZM19 78H19.5H19ZM17.5053 1.5H33.4947V0.5H17.5053V1.5ZM37.9739 6.43192L37.1523 14.952L38.1477 15.048L38.9693 6.52791L37.9739 6.43192ZM37.65 14.5L13.35 14.5V15.5L37.65 15.5V14.5ZM13.8477 14.952L13.0261 6.43192L12.0307 6.52791L12.8523 15.048L13.8477 14.952ZM33.4947 1.5C36.1506 1.5 38.2288 3.78824 37.9739 6.43192L38.9693 6.52791C39.2808 3.29673 36.7408 0.5 33.4947 0.5V1.5ZM17.5053 0.5C14.2592 0.5 11.7192 3.29673 12.0307 6.52791L13.0261 6.43192C12.7712 3.78824 14.8494 1.5 17.5053 1.5V0.5ZM28 5.5L23 5.5V6.5L28 6.5V5.5ZM19.5 2V1H18.5V2H19.5ZM19 1.5L32 1.5V0.500001L19 0.5V1.5ZM31.5 1V2H32.5V1H31.5ZM23 5.5C21.067 5.5 19.5 3.933 19.5 2L18.5 2C18.5 4.48528 20.5147 6.5 23 6.5V5.5ZM28 6.5C30.4853 6.5 32.5 4.48528 32.5 2H31.5C31.5 3.933 29.933 5.5 28 5.5V6.5ZM33.4947 78.5H17.5053V79.5H33.4947V78.5ZM13.0261 73.5681L13.8477 65.048L12.8523 64.952L12.0307 73.4721L13.0261 73.5681ZM13.35 65.5H37.65V64.5H13.35V65.5ZM37.1523 65.048L37.9739 73.5681L38.9693 73.4721L38.1477 64.952L37.1523 65.048ZM17.5053 78.5C14.8494 78.5 12.7712 76.2118 13.0261 73.5681L12.0307 73.4721C11.7192 76.7033 14.2592 79.5 17.5053 79.5V78.5ZM33.4947 79.5C36.7408 79.5 39.2808 76.7033 38.9693 73.4721L37.9739 73.5681C38.2288 76.2118 36.1506 78.5 33.4947 78.5V79.5ZM23 74.5H28V73.5H23V74.5ZM31.5 78V79H32.5V78H31.5ZM32 78.5H19V79.5H32V78.5ZM19.5 79V78H18.5V79H19.5ZM28 74.5C29.933 74.5 31.5 76.067 31.5 78H32.5C32.5 75.5147 30.4853 73.5 28 73.5V74.5ZM23 73.5C20.5147 73.5 18.5 75.5147 18.5 78H19.5C19.5 76.067 21.067 74.5 23 74.5V73.5ZM5 15.5H47V14.5H5V15.5ZM50.5 19V61H51.5V19H50.5ZM47 64.5H5V65.5H47V64.5ZM1.5 61V19H0.5V61H1.5ZM5 64.5C3.067 64.5 1.5 62.933 1.5 61H0.5C0.5 63.4853 2.51472 65.5 5 65.5V64.5ZM50.5 61C50.5 62.933 48.933 64.5 47 64.5V65.5C49.4853 65.5 51.5 63.4853 51.5 61H50.5ZM47 15.5C48.933 15.5 50.5 17.067 50.5 19H51.5C51.5 16.5147 49.4853 14.5 47 14.5V15.5ZM5 14.5C2.51472 14.5 0.5 16.5147 0.5 19H1.5C1.5 17.067 3.067 15.5 5 15.5V14.5Z' }},   
];
var bedRoom = [
{ id:'Double bed', shape :{ type: 'Path', data:'M1 54V2C1 1.44772 1.44772 1 2 1H44C44.5523 1 45 1.44771 45 2V54C45 54.5523 44.5523 55 44 55H2C1.44772 55 1 54.5523 1 54Z M7.57446 14.4176C8.01615 12.4296 7.72961 10.0298 7.34925 8.31942C7.20247 7.65937 7.68924 7 8.36541 7H19.6515C20.3227 7 20.8097 7.6496 20.6533 8.3023C20.4282 9.24153 20.1765 10.5125 20.1765 11.5C20.1765 12.4875 20.4282 13.7585 20.6533 14.6977C20.8097 15.3504 20.3227 16 19.6515 16H8.68924C7.9291 16 7.4096 15.1596 7.57446 14.4176Z M25.5745 14.4176C26.0161 12.4296 25.7296 10.0298 25.3493 8.31942C25.2025 7.65937 25.6892 7 26.3654 7H37.6515C38.3227 7 38.8097 7.6496 38.6533 8.3023C38.4282 9.24153 38.1765 10.5125 38.1765 11.5C38.1765 12.4875 38.4282 13.7585 38.6533 14.6977C38.8097 15.3504 38.3227 16 37.6515 16H26.6892C25.9291 16 25.4096 15.1596 25.5745 14.4176Z M45 53V27.695C41.8333 26.4298 34.1 24.6584 28.5 27.695C22.9 30.7316 16.5 25.5863 14 22.6341C10.1667 18.2057 2.2 13.0182 1 27.6951V53H45Z M1 54V2C1 1.44772 1.44772 1 2 1H44C44.5523 1 45 1.44771 45 2V54C45 54.5523 44.5523 55 44 55H2C1.44772 55 1 54.5523 1 54Z M7.57446 14.4176C8.01615 12.4296 7.72961 10.0298 7.34925 8.31942C7.20247 7.65937 7.68924 7 8.36541 7H19.6515C20.3227 7 20.8097 7.6496 20.6533 8.3023C20.4282 9.24153 20.1765 10.5125 20.1765 11.5C20.1765 12.4875 20.4282 13.7585 20.6533 14.6977C20.8097 15.3504 20.3227 16 19.6515 16H8.68924C7.9291 16 7.4096 15.1596 7.57446 14.4176Z M25.5745 14.4176C26.0161 12.4296 25.7296 10.0298 25.3493 8.31942C25.2025 7.65937 25.6892 7 26.3654 7H37.6515C38.3227 7 38.8097 7.6496 38.6533 8.3023C38.4282 9.24153 38.1765 10.5125 38.1765 11.5C38.1765 12.4875 38.4282 13.7585 38.6533 14.6977C38.8097 15.3504 38.3227 16 37.6515 16H26.6892C25.9291 16 25.4096 15.1596 25.5745 14.4176Z M25.5745 14.4176C26.0161 12.4296 25.7296 10.0298 25.3493 8.31942C25.2025 7.65937 25.6892 7 26.3654 7H37.6515C38.3227 7 38.8097 7.6496 38.6533 8.3023C38.4282 9.24153 38.1765 10.5125 38.1765 11.5C38.1765 12.4875 38.4282 13.7585 38.6533 14.6977C38.8097 15.3504 38.3227 16 37.6515 16H26.6892C25.9291 16 25.4096 15.1596 25.5745 14.4176Z'}},
{ id:'Double bed1', shape :{ type: 'Path', data:'M1 54V2C1 1.44772 1.44772 1 2 1H44C44.5523 1 45 1.44771 45 2V54C45 54.5523 44.5523 55 44 55H2C1.44772 55 1 54.5523 1 54Z  M8 14V8C8 7.44772 8.44772 7 9 7H19C19.5523 7 20 7.44772 20 8V14C20 14.5523 19.5523 15 19 15H9C8.44772 15 8 14.5523 8 14Z M26 14V8C26 7.44772 26.4477 7 27 7H37C37.5523 7 38 7.44772 38 8V14C38 14.5523 37.5523 15 37 15H27C26.4477 15 26 14.5523 26 14Z M0.5 2V54H1.5V2H0.5ZM2 55.5H44V54.5H2V55.5ZM45.5 54V2H44.5V54H45.5ZM2 1.5H44V0.5H2V1.5ZM45.5 2C45.5 1.17157 44.8284 0.5 44 0.5V1.5C44.2761 1.5 44.5 1.72386 44.5 2H45.5ZM44 55.5C44.8284 55.5 45.5 54.8284 45.5 54H44.5C44.5 54.2761 44.2761 54.5 44 54.5V55.5ZM0.5 54C0.5 54.8284 1.17157 55.5 2 55.5V54.5C1.72386 54.5 1.5 54.2761 1.5 54H0.5ZM1.5 2C1.5 1.72386 1.72386 1.5 2 1.5V0.5C1.17157 0.5 0.5 1.17157 0.5 2H1.5ZM1 21.5H45V20.5H1V21.5ZM7.5 8V14H8.5V8H7.5ZM9 15.5H19V14.5H9V15.5ZM20.5 14V8H19.5V14H20.5ZM19 6.5H9V7.5H19V6.5ZM20.5 8C20.5 7.17157 19.8284 6.5 19 6.5V7.5C19.2761 7.5 19.5 7.72386 19.5 8H20.5ZM19 15.5C19.8284 15.5 20.5 14.8284 20.5 14H19.5C19.5 14.2761 19.2761 14.5 19 14.5V15.5ZM7.5 14C7.5 14.8284 8.17157 15.5 9 15.5V14.5C8.72386 14.5 8.5 14.2761 8.5 14H7.5ZM8.5 8C8.5 7.72386 8.72386 7.5 9 7.5V6.5C8.17157 6.5 7.5 7.17157 7.5 8H8.5ZM25.5 8V14H26.5V8H25.5ZM27 15.5H37V14.5H27V15.5ZM38.5 14V8H37.5V14H38.5ZM37 6.5H27V7.5H37V6.5ZM38.5 8C38.5 7.17157 37.8284 6.5 37 6.5V7.5C37.2761 7.5 37.5 7.72386 37.5 8H38.5ZM37 15.5C37.8284 15.5 38.5 14.8284 38.5 14H37.5C37.5 14.2761 37.2761 14.5 37 14.5V15.5ZM25.5 14C25.5 14.8284 26.1716 15.5 27 15.5V14.5C26.7239 14.5 26.5 14.2761 26.5 14H25.5ZM26.5 8C26.5 7.72386 26.7239 7.5 27 7.5V6.5C26.1716 6.5 25.5 7.17157 25.5 8H26.5Z'}},
{ id:'Single bed',dragSize:{width:28,height:45},shape :{ type: 'Path', data:'M1 2C1 1.44771 1.44772 1 2 1H26C26.5523 1 27 1.44772 27 2V54C27 54.5523 26.5523 55 26 55H2C1.44772 55 1 54.5523 1 54V2Z M1 27.5941C1 27.5432 1.0038 27.4928 1.01218 27.4426C1.13134 26.7284 2.13402 21.153 4.41646 21.0198C4.47147 21.0165 4.52813 21.0118 4.58296 21.0063C7.51272 20.7131 9.98932 30.7524 14.8322 30.9965C14.9423 31.002 15.0553 30.9826 15.1593 30.946C18.0006 29.9475 18.036 28.9499 20 28.5008C22.6744 27.8892 25.3331 28.7977 26.4505 29.2665C26.794 29.4106 27 29.7509 27 30.1234V52.0177C27 52.5699 26.5523 53.0177 26 53.0177H2C1.44772 53.0177 1 52.5699 1 52.0177V27.5941Z M7.47077 8.3988C7.27248 7.71969 7.76957 7 8.47703 7H19.0951C19.901 7 20.4243 7.93945 20.1178 8.68485C19.7917 9.47806 19.5 10.4742 19.5 11.5C19.5 12.5349 19.7571 13.4842 20.0583 14.2413C20.363 15.007 19.824 16 19 16H8.47703C7.76957 16 7.27248 15.2803 7.47077 14.6012C7.73012 13.7129 8 12.539 8 11.5C8 10.461 7.73012 9.28707 7.47077 8.3988Z'}},
{ id:'Single bed1',dragSize:{width:28,height:45},shape :{ type: 'Path', data:'M1 20H29M1 2V54C1 54.5523 1.44772 55 2 55H28C28.5523 55 29 54.5523 29 54V2C29 1.44771 28.5523 1 28 1H2C1.44772 1 1 1.44772 1 2ZM9 8V14C9 14.5523 9.44772 15 10 15H20C20.5523 15 21 14.5523 21 14V8C21 7.44772 20.5523 7 20 7H10C9.44772 7 9 7.44772 9 8Z'}},
{ id:'Book Case',dragSize:{height:21,width:50}, shape :{ type: 'Path', data:'M113 9V1H1V9M113 9H1M113 9V29H1V9M4 12H11V25H4V12ZM13 12H20V25H13V12ZM22 12H29V25H22V12ZM31 12H38V25H31V12ZM40 12H47V25H40V12ZM49 12H56V25H49V12ZM58 12H65V25H58V12ZM67 12H74V25H67V12ZM76 12H83V25H76V12ZM85 12H92V25H85V12ZM94 12H101V25H94V12ZM103 12H110V25H103V12Z'}},
{ id:'Warddrobe',dragSize:{width:50,height:30}, shape:{ type :'Path', data:"M50.6443 54.406L76 29L80.9998 28.9502H85.9996L55.594 59.3558L50.6443 54.406Z M12 29L36.9996 54.4053L32.0498 59.3551L2 29H12Z M70.7969 44.8594C70.6017 44.6642 70.6017 44.3476 70.7969 44.1523C70.9922 43.957 71.3088 43.957 71.504 44.1523L72.9182 45.5665C73.1135 45.7618 73.1135 46.0784 72.9182 46.2736C72.723 46.4689 72.4064 46.4689 72.2111 46.2736L70.7969 44.8594Z M16.1406 44.1524C16.3358 43.9571 16.6524 43.9571 16.8477 44.1524C17.043 44.3476 17.043 44.6642 16.8477 44.8595L15.4335 46.2737C15.2382 46.469 14.9216 46.469 14.7264 46.2737C14.5311 46.0784 14.5311 45.7619 14.7264 45.5666L16.1406 44.1524Z M1 1L87 1V29H1L1 1Z"}},
{ id:'Warddrobe1',dragSize:{width:50,height:30},shape :{type:'Path', data:"M86 29V1H1V29M86 29H1M86 29V36H1L1 29M44.5 29V36M65.5 39C65.2239 39 65 38.7761 65 38.5V36.5C65 36.2239 65.2239 36 65.5 36C65.7761 36 66 36.2239 66 36.5V38.5C66 38.7761 65.7761 39 65.5 39ZM22.5 39C22.2239 39 22 38.7761 22 38.5V36.5C22 36.2239 22.2239 36 22.5 36C22.7761 36 23 36.2239 23 36.5V38.5C23 38.7761 22.7761 39 22.5 39Z"}},
{ id:'Large Plant', dragSize:{height:30,width:30} ,shape :{ type: 'Path', data:'M25.9813 23.5141C27.2901 23.5993 48.6838 19.0468 41.4746 10.8333C36.916 5.63963 21.1089 23.1968 25.9813 23.5141Z M23.6253 25.9234C23.1736 27.1547 21.4942 48.9629 31.4103 44.3689C37.6806 41.464 25.3067 21.3392 23.6253 25.9234Z M25.5989 25.6003C26.3978 26.6405 43.9262 39.7237 45.3483 28.888C46.2474 22.0363 22.6249 21.7278 25.5989 25.6003Z M24.7197 20.7567C25.6675 19.8502 36.7808 1.01108 25.8549 0.76778C18.9461 0.613932 21.191 24.1316 24.7197 20.7567Z M20.8885 22.8171C19.6966 22.2698 -1.91128 18.8763 1.88665 29.1238C4.2882 35.6035 25.3258 24.8547 20.8885 22.8171Z M21.6607 25.6193C20.3938 25.9588 1.59406 37.1385 11.0585 42.6028C17.0432 46.0581 26.3771 24.3556 21.6607 25.6193Z M22.3667 20.2554C21.8975 19.0306 8.82513 1.49408 4.37366 11.475C1.55885 17.7863 24.1136 24.815 22.3667 20.2554Z M40.0382 18.2498C40.7878 20.1543 41.1995 22.2289 41.1995 24.3996C41.1995 24.5507 41.1975 24.7013 41.1935 24.8515M35.2235 11.5507C33.6921 10.2594 31.9267 9.2368 30 8.55572M39 32.7159C37.5069 35.3317 35.3311 37.5074 32.7153 39.0004M24.8419 41.1939C24.6949 41.1977 24.5474 41.1996 24.3995 41.1996C21.7821 41.1996 19.3046 40.6011 17.0963 39.5334M10.7727 34.2278C9.9752 33.1239 9.30848 31.9193 8.79533 30.6367M7.70563 22.5004C7.89672 20.8019 8.34106 19.1801 9 17.6736M13.9123 11.274C16.1576 9.47777 18.8737 8.24563 21.846 7.79239M25.9813 23.5141C27.2901 23.5993 48.6838 19.0468 41.4746 10.8333C36.916 5.63963 21.1089 23.1968 25.9813 23.5141ZM23.6253 25.9234C23.1736 27.1547 21.4942 48.9629 31.4103 44.3689C37.6806 41.464 25.3067 21.3392 23.6253 25.9234ZM25.5989 25.6003C26.3978 26.6405 43.9262 39.7237 45.3483 28.888C46.2474 22.0363 22.6249 21.7278 25.5989 25.6003ZM24.7197 20.7567C25.6675 19.8502 36.7808 1.01108 25.8549 0.76778C18.9461 0.613932 21.191 24.1316 24.7197 20.7567ZM20.8885 22.8171C19.6966 22.2698 -1.91128 18.8763 1.88665 29.1238C4.2882 35.6035 25.3258 24.8547 20.8885 22.8171ZM21.6607 25.6193C20.3938 25.9588 1.59406 37.1385 11.0585 42.6028C17.0432 46.0581 26.3771 24.3556 21.6607 25.6193ZM22.3667 20.2554C21.8975 19.0306 8.82513 1.49408 4.37366 11.475C1.55885 17.7863 24.1136 24.815 22.3667 20.2554Z'}},
{ id:'Small Plant',dragSize:{height:30,width:30}, shape :{ type: 'Path', data:'M41.0021 14.6256C39.4786 15.0878 15.4174 23.8084 24.9086 22.7805C30.9102 22.1305 46.6742 12.9049 41.0021 14.6256Z M30.6226 40.7355C30.095 39.2334 20.3422 15.5718 21.7796 25.0097C22.6885 30.9776 32.587 46.328 30.6226 40.7355Z M40.8599 30.8341C39.4811 30.038 16.6684 18.4377 23.9067 24.6624C28.4837 28.5985 45.9932 33.7978 40.8599 30.8341Z M24.9451 2.15326C24.5331 3.69113 19.2324 28.7289 23.3715 20.1262C25.9889 14.6864 26.4792 -3.57215 24.9451 2.15326Z M2.19397 25.3449C3.78608 25.3449 29.3427 23.9847 19.9617 22.2131C14.0299 21.0929 -3.73342 25.3449 2.19397 25.3449Z M14.4307 41.966C15.2268 40.5872 26.8271 17.7744 20.6024 25.0127C16.6664 29.5898 11.467 47.0992 14.4307 41.966Z M9.34308 7.01354C10.1391 8.39235 24.0954 29.8449 20.9391 20.835C18.9434 15.1378 6.37938 1.88027 9.34308 7.01354Z M8.74609 23.1317C8.74609 19.0028 10.6305 15.3141 13.5861 12.8786M25.2568 10.2486C29.1467 11.2213 32.3568 13.9095 34.0367 17.4627M23.5 9.93362C23.0157 9.88011 22.5236 9.85264 22.0251 9.85264C19.3319 9.85264 16.826 10.6544 14.733 12.0323M34.6489 19.0003C35.0742 20.3006 35.3041 21.6893 35.3041 23.1317C35.3041 24.7546 35.013 26.3095 34.4801 27.747M33.7595 29.3531C32.4773 31.7665 30.4723 33.7373 28.0333 34.9769M26.5361 35.6249C25.1278 36.1335 23.6088 36.4107 22.0251 36.4107C20.4153 36.4107 18.8723 36.1242 17.4445 35.5995M15.8519 34.8916C12.0702 32.9023 9.36529 29.1424 8.83942 24.7143M41.0021 14.6256C39.4786 15.0878 15.4174 23.8084 24.9086 22.7805C30.9102 22.1305 46.6742 12.9049 41.0021 14.6256ZM30.6226 40.7355C30.095 39.2334 20.3422 15.5718 21.7796 25.0097C22.6885 30.9776 32.587 46.328 30.6226 40.7355ZM40.8599 30.8341C39.4811 30.038 16.6684 18.4377 23.9067 24.6624C28.4837 28.5985 45.9932 33.7978 40.8599 30.8341ZM24.9451 2.15326C24.5331 3.69113 19.2324 28.7289 23.3715 20.1262C25.9889 14.6864 26.4792 -3.57215 24.9451 2.15326ZM2.19397 25.3449C3.78608 25.3449 29.3427 23.9847 19.9617 22.2131C14.0299 21.0929 -3.73342 25.3449 2.19397 25.3449ZM14.4307 41.966C15.2268 40.5872 26.8271 17.7744 20.6024 25.0127C16.6664 29.5898 11.467 47.0992 14.4307 41.966ZM9.34308 7.01354C10.1391 8.39235 24.0954 29.8449 20.9391 20.835C18.9434 15.1378 6.37938 1.88027 9.34308 7.01354Z'}},
{ id:'Lamp light',dragSize:{height:30,width:30}, shape :{ type: 'Path', data:"M17 7C11.4772 7 7 11.4772 7 17C7 22.5228 11.4772 27 17 27C22.5228 27 27 22.5228 27 17C27 11.4772 22.5228 7 17 7ZM17 7V13.5M20.2363 18.5593L25.3654 21.3093M13.7544 18.4305L8.2541 21.6805M33 17C33 25.8366 25.8366 33 17 33C8.16344 33 1 25.8366 1 17C1 8.16344 8.16344 1 17 1C25.8366 1 33 8.16344 33 17ZM25.5 17C25.5 21.6944 21.6944 25.5 17 25.5C12.3056 25.5 8.5 21.6944 8.5 17C8.5 12.3056 12.3056 8.5 17 8.5C21.6944 8.5 25.5 12.3056 25.5 17ZM21 17C21 19.2091 19.2091 21 17 21C14.7909 21 13 19.2091 13 17C13 14.7909 14.7909 13 17 13C19.2091 13 21 14.7909 21 17Z"}},
{ id:'Matte',dragSize:{width:40,height:20}, shape:{ type :'Path', data:"M1 3C1 1.89543 1.89543 1 3 1L68 1C69.1046 1 70 1.89543 70 3V48C70 49.1046 69.1046 50 68 50H3C1.89543 50 1 49.1046 1 48L1 3Z M1 12H70V39H1L1 12Z M1 15H70V36H1L1 15Z"}},
{ id:'Matte1',dragSize:{width:40,height:20},shape:{type :'Path',data:"M1 25.5C1 11.969 11.969 1 25.5 1H44.5C58.031 1 69 11.969 69 25.5C69 39.031 58.031 50 44.5 50H25.5C11.969 50 1 39.031 1 25.5Z M3 25.5C3 13.0736 13.0736 3 25.5 3H44.5C56.9264 3 67 13.0736 67 25.5C67 37.9264 56.9264 48 44.5 48H25.5C13.0736 48 3 37.9264 3 25.5Z M16 25.5C16 20.2533 20.2533 16 25.5 16H44.5C49.7467 16 54 20.2533 54 25.5C54 30.7467 49.7467 35 44.5 35H25.5C20.2533 35 16 30.7467 16 25.5Z M18 25.5C18 21.3579 21.3579 18 25.5 18H44.5C48.6421 18 52 21.3579 52 25.5C52 29.6421 48.6421 33 44.5 33H25.5C21.3579 33 18 29.6421 18 25.5Z"}},

]
var livingRoom=[
{ id:'TV',dragSize:{width:48,height:20},shape :{ type: 'Path', data:'M55 23H4C2.34315 23 1 24.3431 1 26V40H58V26C58 24.3431 56.6569 23 55 23ZM55 23L48.1968 4.29128C47.4783 2.31534 45.6004 1 43.4979 1H16.5021C14.3996 1 12.5217 2.31533 11.8032 4.29128L5 23H55ZM16 1V23M25 1V23M34 1V23M43 1V23M1 36.5H58'}},
{ id:'Flat TV',dragSize:{width:66,height:13}, shape :{ type: 'Path', data:'M1 15H92M1 15V20H92V15M1 15V10H92V15M79 7L85 1M79 20L85 26M14 7L8 1M14 20L8 26M37 2V7M39 2V7M41 2V7M43 2V7M45 2V7M47 2V7M49 2V7M51 2V7M53 2V7M55 2V7M23 2H70L76 7H17L23 2ZM5 7H88V10H5V7Z'}},
{ id:'Flat TV1',dragSize:{width:66,height:13}, shape :{ type: 'Path', data:'M1 14H92M1 14V19H92V14M1 14V9H92V14M37 1V6M39 1V6M41 1V6M43 1V6M45 1V6M47 1V6M49 1V6M51 1V6M53 1V6M55 1V6M23 1H70L76 6H17L23 1ZM5 6H88V9H5V6Z'}},
{  id:'Sofa',dragSize:{width:76,height:35}, shape :{ type: 'Path', data:'M95 49H130C131.657 49 133 47.6569 133 46V20C133 18.3431 131.657 17 130 17H20C18.3431 17 17 18.3431 17 20V46C17 47.6569 18.3431 49 20 49H95ZM95 49V17H56V49H95ZM145 17H137C134.791 17 133 18.7909 133 21V45C133 47.2091 134.791 49 137 49H145C147.209 49 149 47.2091 149 45V21C149 18.7909 147.209 17 145 17ZM145 17H5M145 17C147.209 17 149 15.2091 149 13V5.00001C149 2.79087 147.209 1.00001 145 1.00001L5 1C2.79086 1 1 2.79086 1 5L1 13C1 15.2091 2.79086 17 5 17M5 17H13C15.2091 17 17 18.7909 17 21V45C17 47.2091 15.2091 49 13 49H5C2.79086 49 1 47.2091 1 45L1 21C1 18.7909 2.79086 17 5 17Z'}},
{  id:'Double Sofa',dragSize:{width:76,height:35}, shape :{ type: 'Path', data:'M55 17H20C18.3431 17 17 18.3431 17 20V46C17 47.6569 18.3431 49 20 49H55M55 17V49M55 17H91C92.6569 17 94 18.3431 94 20V46C94 47.6569 92.6569 49 91 49H55M106 17H98C95.7909 17 94 18.7909 94 21V45C94 47.2091 95.7909 49 98 49H106C108.209 49 110 47.2091 110 45V21C110 18.7909 108.209 17 106 17ZM106 17H5M106 17C108.209 17 110 15.2091 110 13V5.00001C110 2.79087 108.209 1.00001 106 1.00001L5 1C2.79086 1 1 2.79086 1 5L1 13C1 15.2091 2.79086 17 5 17M5 17H13C15.2091 17 17 18.7909 17 21V45C17 47.2091 15.2091 49 13 49H5C2.79086 49 1 47.2091 1 45L1 21C1 18.7909 2.79086 17 5 17Z'}},
{  id:'Single Sofa',dragSize:{width:50,height:35}, shape :{ type: 'Path', data:'M67 17L59 17C56.7909 17 55 18.7909 55 21V45C55 47.2091 56.7909 49 59 49H67C69.2091 49 71 47.2091 71 45V21C71 18.7909 69.2091 17 67 17ZM67 17L5 17M67 17C69.2091 17 71 15.2091 71 13V5.00001C71 2.79087 69.2091 1.00001 67 1.00001L5 1C2.79086 1 1 2.79086 1 5L1 13C1 15.2091 2.79086 17 5 17M5 17L13 17C15.2091 17 17 18.7909 17 21V45C17 47.2091 15.2091 49 13 49H5C2.79086 49 1 47.2091 1 45L1 21C1 18.7909 2.79086 17 5 17ZM20 49H52C53.6569 49 55 47.6569 55 46V20C55 18.3431 53.6569 17 52 17H20C18.3431 17 17 18.3431 17 20V46C17 47.6569 18.3431 49 20 49Z'}},
{ id:'Couch',dragSize:{width:41,height:35}, shape :{ type: 'Path', data:"M39.3572 42.5001C33.5879 44.3644 23.3389 47.3726 11.0312 42.8982M39.3572 42.5001C38.9901 32.896 39.1315 17.3601 40.2727 11.5C38.1563 12.9176 38.0909 13 33.1818 14C28.8182 14.8889 26.0909 14.5 26.0909 14.5C26.0909 14.5 22.2727 14.5 19 14C15.7273 13.5 14.0909 13 10.2727 10.9155C10.7143 16.2832 11.7887 29.6759 11.0312 42.8982M39.3572 42.5001C39.4226 44.2122 40.7919 45.5708 42.5027 45.6646L45.163 45.8105C47.0566 45.9143 48.6622 44.438 48.7092 42.5421C48.8219 38.0026 49 29.9987 49 24.7736C49 20.1829 48.725 13.4473 48.5055 8.8007C48.3595 5.71097 46.1103 3.14326 43.0526 2.67589C38.2269 1.93827 30.8617 1 24.619 1C18.1203 1 10.557 2.69472 5.86868 3.94263C3.15069 4.66609 1.30579 7.10774 1.22538 9.91921C1.12006 13.6016 1 19.0538 1 24.7736C1 31.5601 1.16901 38.7232 1.28189 42.7504C1.33277 44.5656 2.82066 46 4.63658 46H7.70901C9.46516 46 10.9308 44.6515 11.0312 42.8982M22.2195 21.2201C22.2195 22.1507 21.4652 22.9051 20.5346 22.9051C19.604 22.9051 18.8496 22.1507 18.8496 21.2201C18.8496 20.2895 19.604 19.5352 20.5346 19.5352C21.4652 19.5352 22.2195 20.2895 22.2195 21.2201ZM22.2195 27.9594C22.2195 28.89 21.4652 29.6443 20.5346 29.6443C19.604 29.6443 18.8496 28.89 18.8496 27.9594C18.8496 27.0288 19.604 26.2744 20.5346 26.2744C21.4652 26.2744 22.2195 27.0288 22.2195 27.9594ZM22.2195 34.6986C22.2195 35.6292 21.4652 36.3836 20.5346 36.3836C19.604 36.3836 18.8496 35.6292 18.8496 34.6986C18.8496 33.7681 19.604 33.0137 20.5346 33.0137C21.4652 33.0137 22.2195 33.7681 22.2195 34.6986ZM32.3294 21.2201C32.3294 22.1507 31.575 22.9051 30.6444 22.9051C29.7139 22.9051 28.9595 22.1507 28.9595 21.2201C28.9595 20.2895 29.7139 19.5352 30.6444 19.5352C31.575 19.5352 32.3294 20.2895 32.3294 21.2201ZM32.3294 27.9594C32.3294 28.89 31.575 29.6443 30.6444 29.6443C29.7139 29.6443 28.9595 28.89 28.9595 27.9594C28.9595 27.0288 29.7139 26.2744 30.6444 26.2744C31.575 26.2744 32.3294 27.0288 32.3294 27.9594ZM32.3294 34.6986C32.3294 35.6292 31.575 36.3836 30.6444 36.3836C29.7139 36.3836 28.9595 35.6292 28.9595 34.6986C28.9595 33.7681 29.7139 33.0137 30.6444 33.0137C31.575 33.0137 32.3294 33.7681 32.3294 34.6986Z"}},
{  id:'Lounge',dragSize:{width:76,height:35}, shape :{ type: 'Path', data:"M135.5366,76.6025C135.5366,77.4305,134.8646,78.1025,134.0366,78.1025C133.2076,78.1025,132.5366,77.4305,132.5366,76.6025C132.5366,75.7745,133.2076,75.1025,134.0366,75.1025C134.8646,75.1025,135.5366,75.7745,135.5366,76.6025z M135.5366,69.8625C135.5366,70.6905,134.8646,71.3625,134.0366,71.3625C133.2076,71.3625,132.5366,70.6905,132.5366,69.8625C132.5366,69.0335,133.2076,68.3625,134.0366,68.3625C134.8646,68.3625,135.5366,69.0335,135.5366,69.8625z M135.5366,63.1235C135.5366,63.9515,134.8646,64.6235,134.0366,64.6235C133.2076,64.6235,132.5366,63.9515,132.5366,63.1235C132.5366,62.2945,133.2076,61.6235,134.0366,61.6235C134.8646,61.6235,135.5366,62.2945,135.5366,63.1235z M125.4266,76.6025C125.4266,77.4305,124.7546,78.1025,123.9266,78.1025C123.0986,78.1025,122.4266,77.4305,122.4266,76.6025C122.4266,75.7745,123.0986,75.1025,123.9266,75.1025C124.7546,75.1025,125.4266,75.7745,125.4266,76.6025z M125.4266,69.8625C125.4266,70.6905,124.7546,71.3625,123.9266,71.3625C123.0986,71.3625,122.4266,70.6905,122.4266,69.8625C122.4266,69.0335,123.0986,68.3625,123.9266,68.3625C124.7546,68.3625,125.4266,69.0335,125.4266,69.8625z M125.4266,63.1235C125.4266,63.9515,124.7546,64.6235,123.9266,64.6235C123.0986,64.6235,122.4266,63.9515,122.4266,63.1235C122.4266,62.2945,123.0986,61.6235,123.9266,61.6235C124.7546,61.6235,125.4266,62.2945,125.4266,63.1235z M106.5366,76.6025C106.5366,77.4305,105.8646,78.1025,105.0366,78.1025C104.2076,78.1025,103.5366,77.4305,103.5366,76.6025C103.5366,75.7745,104.2076,75.1025,105.0366,75.1025C105.8646,75.1025,106.5366,75.7745,106.5366,76.6025z M106.5366,63.1235C106.5366,63.9515,105.8646,64.6235,105.0366,64.6235C104.2076,64.6235,103.5366,63.9515,103.5366,63.1235C103.5366,62.2945,104.2076,61.6235,105.0366,61.6235C105.8646,61.6235,106.5366,62.2945,106.5366,63.1235z M96.4266,76.6025C96.4266,77.4305,95.7546,78.1025,94.9266,78.1025C94.0986,78.1025,93.4266,77.4305,93.4266,76.6025C93.4266,75.7745,94.0986,75.1025,94.9266,75.1025C95.7546,75.1025,96.4266,75.7745,96.4266,76.6025z M96.4266,69.8625C96.4266,70.6905,95.7546,71.3625,94.9266,71.3625C94.0986,71.3625,93.4266,70.6905,93.4266,69.8625C93.4266,69.0335,94.0986,68.3625,94.9266,68.3625C95.7546,68.3625,96.4266,69.0335,96.4266,69.8625z M96.4266,63.1235C96.4266,63.9515,95.7546,64.6235,94.9266,64.6235C94.0986,64.6235,93.4266,63.9515,93.4266,63.1235C93.4266,62.2945,94.0986,61.6235,94.9266,61.6235C95.7546,61.6235,96.4266,62.2945,96.4266,63.1235z M106.5366,69.8625C106.5366,70.6905,105.8646,71.3625,105.0366,71.3625C104.2076,71.3625,103.5366,70.6905,103.5366,69.8625C103.5366,69.0335,104.2076,68.3625,105.0366,68.3625C105.8646,68.3625,106.5366,69.0335,106.5366,69.8625z M77.5366,77.6025C77.5366,78.4305,76.8646,79.1025,76.0366,79.1025C75.2076,79.1025,74.5366,78.4305,74.5366,77.6025C74.5366,76.7745,75.2076,76.1025,76.0366,76.1025C76.8646,76.1025,77.5366,76.7745,77.5366,77.6025z M77.5366,70.8625C77.5366,71.6905,76.8646,72.3625,76.0366,72.3625C75.2076,72.3625,74.5366,71.6905,74.5366,70.8625C74.5366,70.0335,75.2076,69.3625,76.0366,69.3625C76.8646,69.3625,77.5366,70.0335,77.5366,70.8625z M77.5366,64.1235C77.5366,64.9515,76.8646,65.6235,76.0366,65.6235C75.2076,65.6235,74.5366,64.9515,74.5366,64.1235C74.5366,63.2945,75.2076,62.6235,76.0366,62.6235C76.8646,62.6235,77.5366,63.2945,77.5366,64.1235z M67.4266,77.1235C67.4266,77.9515,66.7546,78.6235,65.9266,78.6235C65.0986,78.6235,64.4266,77.9515,64.4266,77.1235C64.4266,76.2945,65.0986,75.6235,65.9266,75.6235C66.7546,75.6235,67.4266,76.2945,67.4266,77.1235z M67.4266,71.1235C67.4266,71.9515,66.7546,72.6235,65.9266,72.6235C65.0986,72.6235,64.4266,71.9515,64.4266,71.1235C64.4266,70.2945,65.0986,69.6235,65.9266,69.6235C66.7546,69.6235,67.4266,70.2945,67.4266,71.1235z M67.4266,64.1235C67.4266,64.9515,66.7546,65.6235,65.9266,65.6235C65.0986,65.6235,64.4266,64.9515,64.4266,64.1235C64.4266,63.2945,65.0986,62.6235,65.9266,62.6235C66.7546,62.6235,67.4266,63.2945,67.4266,64.1235z M114.8946,87.8505C127.5326,92.8705,140.1686,89.9725,144.9656,87.8815 M114.8946,54.7325L114.8946,87.8505 M56.2036,87.8315C55.6066,88.7135,54.5856,89.2745,53.4546,89.2745L51.3896,89.2745C49.6286,89.2745,48.1676,87.9235,48.0576,86.1665C47.8076,82.1925,47.4266,75.0125,47.4266,68.2125C47.4266,62.8665,47.6626,57.7565,47.8846,54.1275C48.0746,51.0195,50.4276,48.5215,53.5156,48.1235C62.8286,46.9225,82.8546,44.6235,99.6606,44.6235C116.4456,44.6235,136.9006,45.9995,146.4696,46.7205C149.6416,46.9595,152.1766,49.4065,152.5076,52.5705C152.9896,57.1725,153.5796,63.7255,153.5796,68.2125C153.5796,73.5045,153.1686,81.6695,152.9206,86.1185C152.8216,87.8955,151.3506,89.2745,149.5706,89.2745L147.6896,89.2745C146.5756,89.2745,145.5736,88.7315,144.9656,87.8815 M56.2036,87.8315C56.4686,87.4405,56.6496,86.9875,56.7206,86.4915C58.6086,73.2765,57.2566,59.8275,56.2726,54.4615C68.3486,57.2745,80.9626,55.6335,85.7596,54.4615C95.5886,57.8375,109.2786,55.8685,114.8956,54.4615C127.5326,57.8375,140.0526,55.8685,144.7336,54.4615C142.2026,60.2915,143.2826,76.6465,144.3766,86.3435C144.4416,86.9165,144.6516,87.4405,144.9656,87.8815 M86.1106,87.8505C99.5896,92.5915,110.9166,89.8265,114.8946,87.8505 M86.1106,87.8505C80.8446,89.7095,67.4376,92.2935,56.2036,87.8315 M86.1106,54.7325L86.1106,87.8505"}},
{ id:'Chair', shape :{ type: 'Path', data:'M22 9V14M28 9.08984V14M13 54H37C41.4183 54 45 50.4183 45 46V22C45 17.5817 41.4183 14 37 14H13C8.58172 14 5 17.5817 5 22V46C5 50.4183 8.58172 54 13 54ZM3 45C1.89543 45 1 44.1046 1 43V25C1 23.8954 1.89543 23 3 23C4.10457 23 5 23.8954 5 25V43C5 44.1046 4.10457 45 3 45ZM11 5.79143C11 3.97975 12.2614 2.40196 14.0423 2.06981C22.0186 0.582241 27.6274 0.696364 35.7954 2.09976C37.6588 2.41991 39 4.05364 39 5.94429C39 8.4118 36.7616 10.2627 34.325 9.87346C27.5467 8.79067 22.4382 8.5351 15.7921 9.68406C13.3336 10.1091 11 8.28636 11 5.79143ZM47 45C45.8954 45 45 44.1046 45 43V25C45 23.8954 45.8954 23 47 23C48.1046 23 49 23.8954 49 25V43C49 44.1046 48.1046 45 47 45Z'}},
{ id:'Chair1', shape :{ type: 'Path', data:'M7 27.5V56C7 56.5523 6.55228 57 6 57H2C1.44772 57 1 56.5523 1 56V26.5C1 12.4167 12.4167 1 26.5 1C40.5833 1 52 12.4167 52 26.5V56C52 56.5523 51.5523 57 51 57H47C46.4477 57 46 56.5523 46 56V27.5M7 27.5C7 16.7304 15.7304 8 26.5 8C37.2696 8 46 16.7304 46 27.5M7 27.5V58C7 58.5523 7.44772 59 8 59H45C45.5523 59 46 58.5523 46 58V27.5'}},
{ id:'Stool',dragSize:{height:40,width:40}, shape :{ type: 'Path', data:"M58 31C58 46.464 45.6878 59 30.5 59C15.3122 59 3 46.464 3 31C3 15.536 15.3122 3 30.5 3C45.6878 3 58 15.536 58 31Z  M29 59V61H25V59H29Z M29 1V3H25V1L29 1Z M36 59V61H32V59H36Z M36 1V3H32V1L36 1Z M3 29H1L1 25H3L3 29Z M60 29H58V25H60V29Z M3 36H1L1 32H3L3 36Z M60 36H58V32H60V36Z"}},
{ id:'Window1',dragSize:{width:66,height:7}, shape :{ type: 'Path', data:'M22 5.5L124 5.50001M145 9L128 9V1L145 1V9ZM1 1L18 1L18 9L1 9L1 1ZM128 8L124 8V2L128 2V8ZM18 2L22 2L22 8L18 8L18 2Z'}},
{ id:'Window2',dragSize:{width:66,height:7}, shape :{ type: 'Path', data:"M22 3.5L124 3.50001M22 6.5L124 6.50001M145 9L128 9V1L145 1V9ZM1 1L18 1L18 9L1 9L1 1ZM128 8L124 8V2L128 2V8ZM18 2L22 2L22 8L18 8L18 2Z"}},
{ id:'Piano', shape :{ type: 'Path', data:"M151 148H1M151 148C151 148 155.5 95 139.359 83.7708C123.218 72.5416 109.47 76.8178 95.0076 59.2704C80.5449 41.7231 79.0225 37.2535 74.4554 28.8109C69.8882 20.3683 64.5598 0.999963 35.2538 1C5.94777 1.00004 1 33.4457 1 33.4457V148M151 148V173M151 148H145M1 148V173M1 148H7M151 173H1M151 173H145M1 173H7M7 148V173M7 148H13M7 173H13M13 148V173M13 148H19M13 173H19M19 148V173M19 148H25M19 173H25M25 148V173M25 148H31M25 173H31M31 148V173M31 148H37M31 173H37M37 148V173M37 148H43M37 173H43M43 148V173M43 148H49M43 173H49M49 148V173M49 148H55M49 173H55M55 148V173M55 148H61M55 173H61M61 148V173M61 148H67M61 173H67M67 148V173M67 148H73M67 173H73M73 148V173M73 148H79M73 173H79M79 148V173M79 148H85M79 173H85M85 148V173M85 148H91M85 173H91M91 148V173M91 148H97M91 173H97M97 148V173M97 148H103M97 173H103M103 148V173M103 148H109M103 173H109M109 148V173M109 148H115M109 173H115M115 148H121M115 148V173M121 148V173M121 148H127M121 173H115M121 173H127M127 148V173M127 148H133M127 173H133M133 148V173M133 148H139M133 173H139M139 148V173M139 148H145M139 173H145M145 148V173M6 156H8V173H6V156ZM12 156H14V173H12V156ZM18 156H20V173H18V156ZM24 156H26V173H24V156ZM30 156H32V173H30V156ZM36 156H38V173H36V156ZM42 156H44V173H42V156ZM48 156H50V173H48V156ZM54 156H56V173H54V156ZM60 156H62V173H60V156ZM66 156H68V173H66V156ZM72 156H74V173H72V156ZM78 156H80V173H78V156ZM84 156H86V173H84V156ZM90 156H92V173H90V156ZM96 156H98V173H96V156ZM102 156H104V173H102V156ZM108 156H110V173H108V156ZM114 156H116V173H114V156ZM120 156H122V173H120V156ZM126 156H128V173H126V156ZM132 156H134V173H132V156ZM138 156H140V173H138V156ZM144 156H146V173H144V156Z"}},
{ id:'Printer',dragSize:{width:35,height:27}, shape :{ type: 'Path', data:"M1 12.1687C1 8.76181 3.76181 6 7.16867 6H58.8313C62.2382 6 65 8.76181 65 12.1687V39.8313C65 43.2382 62.2382 46 58.8313 46H7.16867C3.76181 46 1 43.2382 1 39.8313V12.1687Z M5 13.8554C5 11.7261 6.72613 10 8.85542 10H48.1446C50.2739 10 52 11.7261 52 13.8554V38.1446C52 40.2739 50.2739 42 48.1446 42H8.85542C6.72613 42 5 40.2739 5 38.1446V13.8554Z M10 4.08434C10 2.3809 11.3809 1 13.0843 1H51.9157C53.6191 1 55 2.3809 55 4.08434V6H10V4.08434Z M56 55.9157C56 57.6191 54.6191 59 52.9157 59L14.0843 59C12.3809 59 11 57.6191 11 55.9157V46L56 46V55.9157Z M54 29.7711C54 29.3452 54.3452 29 54.7711 29H57.2289C57.6548 29 58 29.3452 58 29.7711V30.2289C58 30.6548 57.6548 31 57.2289 31H54.7711C54.3452 31 54 30.6548 54 30.2289V29.7711Z M54 25.7711C54 25.3452 54.3452 25 54.7711 25H57.2289C57.6548 25 58 25.3452 58 25.7711V26.2289C58 26.6548 57.6548 27 57.2289 27H54.7711C54.3452 27 54 26.6548 54 26.2289V25.7711Z M59 29.7711C59 29.3452 59.3452 29 59.7711 29H62.2289C62.6548 29 63 29.3452 63 29.7711V30.2289C63 30.6548 62.6548 31 62.2289 31H59.7711C59.3452 31 59 30.6548 59 30.2289V29.7711Z M59 25.7711C59 25.3452 59.3452 25 59.7711 25H62.2289C62.6548 25 63 25.3452 63 25.7711V26.2289C63 26.6548 62.6548 27 62.2289 27H59.7711C59.3452 27 59 26.6548 59 26.2289V25.7711Z M54 18.7711C54 18.3452 54.3452 18 54.7711 18H62.2289C62.6548 18 63 18.3452 63 18.7711V22.2289C63 22.6548 62.6548 23 62.2289 23H54.7711C54.3452 23 54 22.6548 54 22.2289V18.7711Z"}},
{ id:'Laptop', dragSize:{width:35,height:27},shape :{ type: 'Path', data:"M1.06567 5.71554C0.619244 3.26018 2.50554 1 5.00115 1H61.0006C63.4675 1 65.3464 3.21135 64.9481 5.64595L61.7571 25.146C61.4407 27.08 59.7695 28.5 57.8096 28.5H8.54661C6.61347 28.5 4.95694 27.1175 4.61113 25.2155L1.06567 5.71554Z M3.7083 33C3.7083 30.7909 5.49916 29 7.7083 29H58.7083C60.9174 29 62.7083 30.7909 62.7083 33V55C62.7083 57.2091 60.9174 59 58.7083 59H7.7083C5.49916 59 3.7083 57.2091 3.7083 55V33Z M26.7083 50C26.7083 49.4477 27.156 49 27.7083 49H38.7083C39.2606 49 39.7083 49.4477 39.7083 50V54C39.7083 54.5523 39.2606 55 38.7083 55H27.7083C27.156 55 26.7083 54.5523 26.7083 54V50Z M8.7083 35.5C8.7083 35.2239 8.93216 35 9.2083 35H12.2083C12.4844 35 12.7083 35.2239 12.7083 35.5V36.5C12.7083 36.7761 12.4844 37 12.2083 37H9.2083C8.93216 37 8.7083 36.7761 8.7083 36.5V35.5Z M8.7083 38.5C8.7083 38.2239 8.93216 38 9.2083 38H12.2083C12.4844 38 12.7083 38.2239 12.7083 38.5V39.5C12.7083 39.7761 12.4844 40 12.2083 40H9.2083C8.93216 40 8.7083 39.7761 8.7083 39.5V38.5Z M8.7083 41.5C8.7083 41.2239 8.93216 41 9.2083 41H12.2083C12.4844 41 12.7083 41.2239 12.7083 41.5V42.5C12.7083 42.7761 12.4844 43 12.2083 43H9.2083C8.93216 43 8.7083 42.7761 8.7083 42.5V41.5Z M8.7083 44.5C8.7083 44.2239 8.93216 44 9.2083 44H12.2083C12.4844 44 12.7083 44.2239 12.7083 44.5V45.5C12.7083 45.7761 12.4844 46 12.2083 46H9.2083C8.93216 46 8.7083 45.7761 8.7083 45.5V44.5Z M13.7083 35.5C13.7083 35.2239 13.9322 35 14.2083 35H17.2083C17.4844 35 17.7083 35.2239 17.7083 35.5V36.5C17.7083 36.7761 17.4844 37 17.2083 37H14.2083C13.9322 37 13.7083 36.7761 13.7083 36.5V35.5Z M13.7083 38.5C13.7083 38.2239 13.9322 38 14.2083 38H17.2083C17.4844 38 17.7083 38.2239 17.7083 38.5V39.5C17.7083 39.7761 17.4844 40 17.2083 40H14.2083C13.9322 40 13.7083 39.7761 13.7083 39.5V38.5Z M13.7083 41.5C13.7083 41.2239 13.9322 41 14.2083 41H17.2083C17.4844 41 17.7083 41.2239 17.7083 41.5V42.5C17.7083 42.7761 17.4844 43 17.2083 43H14.2083C13.9322 43 13.7083 42.7761 13.7083 42.5V41.5Z M13.7083 44.5C13.7083 44.2239 13.9322 44 14.2083 44H17.2083C17.4844 44 17.7083 44.2239 17.7083 44.5V45.5C17.7083 45.7761 17.4844 46 17.2083 46H14.2083C13.9322 46 13.7083 45.7761 13.7083 45.5V44.5Z M18.7083 35.5C18.7083 35.2239 18.9322 35 19.2083 35H22.2083C22.4844 35 22.7083 35.2239 22.7083 35.5V36.5C22.7083 36.7761 22.4844 37 22.2083 37H19.2083C18.9322 37 18.7083 36.7761 18.7083 36.5V35.5Z M18.7083 38.5C18.7083 38.2239 18.9322 38 19.2083 38H22.2083C22.4844 38 22.7083 38.2239 22.7083 38.5V39.5C22.7083 39.7761 22.4844 40 22.2083 40H19.2083C18.9322 40 18.7083 39.7761 18.7083 39.5V38.5Z M18.7083 41.5C18.7083 41.2239 18.9322 41 19.2083 41H22.2083C22.4844 41 22.7083 41.2239 22.7083 41.5V42.5C22.7083 42.7761 22.4844 43 22.2083 43H19.2083C18.9322 43 18.7083 42.7761 18.7083 42.5V41.5Z M18.7083 44.5C18.7083 44.2239 18.9322 44 19.2083 44H22.2083C22.4844 44 22.7083 44.2239 22.7083 44.5V45.5C22.7083 45.7761 22.4844 46 22.2083 46H19.2083C18.9322 46 18.7083 45.7761 18.7083 45.5V44.5Z M23.7083 35.5C23.7083 35.2239 23.9322 35 24.2083 35H27.2083C27.4844 35 27.7083 35.2239 27.7083 35.5V36.5C27.7083 36.7761 27.4844 37 27.2083 37H24.2083C23.9322 37 23.7083 36.7761 23.7083 36.5V35.5Z M23.7083 38.5C23.7083 38.2239 23.9322 38 24.2083 38H27.2083C27.4844 38 27.7083 38.2239 27.7083 38.5V39.5C27.7083 39.7761 27.4844 40 27.2083 40H24.2083C23.9322 40 23.7083 39.7761 23.7083 39.5V38.5Z M23.7083 41.5C23.7083 41.2239 23.9322 41 24.2083 41H27.2083C27.4844 41 27.7083 41.2239 27.7083 41.5V42.5C27.7083 42.7761 27.4844 43 27.2083 43H24.2083C23.9322 43 23.7083 42.7761 23.7083 42.5V41.5Z M23.7083 44.5C23.7083 44.2239 23.9322 44 24.2083 44H42.2083C42.4844 44 42.7083 44.2239 42.7083 44.5V45.5C42.7083 45.7761 42.4844 46 42.2083 46H24.2083C23.9322 46 23.7083 45.7761 23.7083 45.5V44.5Z M28.7083 35.5C28.7083 35.2239 28.9322 35 29.2083 35H32.2083C32.4844 35 32.7083 35.2239 32.7083 35.5V36.5C32.7083 36.7761 32.4844 37 32.2083 37H29.2083C28.9322 37 28.7083 36.7761 28.7083 36.5V35.5Z M28.7083 38.5C28.7083 38.2239 28.9322 38 29.2083 38H32.2083C32.4844 38 32.7083 38.2239 32.7083 38.5V39.5C32.7083 39.7761 32.4844 40 32.2083 40H29.2083C28.9322 40 28.7083 39.7761 28.7083 39.5V38.5Z M28.7083 41.5C28.7083 41.2239 28.9322 41 29.2083 41H32.2083C32.4844 41 32.7083 41.2239 32.7083 41.5V42.5C32.7083 42.7761 32.4844 43 32.2083 43H29.2083C28.9322 43 28.7083 42.7761 28.7083 42.5V41.5Z M33.7083 35.5C33.7083 35.2239 33.9322 35 34.2083 35H37.2083C37.4844 35 37.7083 35.2239 37.7083 35.5V36.5C37.7083 36.7761 37.4844 37 37.2083 37H34.2083C33.9322 37 33.7083 36.7761 33.7083 36.5V35.5Z M33.7083 38.5C33.7083 38.2239 33.9322 38 34.2083 38H37.2083C37.4844 38 37.7083 38.2239 37.7083 38.5V39.5C37.7083 39.7761 37.4844 40 37.2083 40H34.2083C33.9322 40 33.7083 39.7761 33.7083 39.5V38.5Z M33.7083 41.5C33.7083 41.2239 33.9322 41 34.2083 41H37.2083C37.4844 41 37.7083 41.2239 37.7083 41.5V42.5C37.7083 42.7761 37.4844 43 37.2083 43H34.2083C33.9322 43 33.7083 42.7761 33.7083 42.5V41.5Z M38.7083 35.5C38.7083 35.2239 38.9322 35 39.2083 35H42.2083C42.4844 35 42.7083 35.2239 42.7083 35.5V36.5C42.7083 36.7761 42.4844 37 42.2083 37H39.2083C38.9322 37 38.7083 36.7761 38.7083 36.5V35.5Z M38.7083 38.5C38.7083 38.2239 38.9322 38 39.2083 38H42.2083C42.4844 38 42.7083 38.2239 42.7083 38.5V39.5C42.7083 39.7761 42.4844 40 42.2083 40H39.2083C38.9322 40 38.7083 39.7761 38.7083 39.5V38.5Z M38.7083 41.5C38.7083 41.2239 38.9322 41 39.2083 41H42.2083C42.4844 41 42.7083 41.2239 42.7083 41.5V42.5C42.7083 42.7761 42.4844 43 42.2083 43H39.2083C38.9322 43 38.7083 42.7761 38.7083 42.5V41.5Z M43.7083 35.5C43.7083 35.2239 43.9322 35 44.2083 35H47.2083C47.4844 35 47.7083 35.2239 47.7083 35.5V36.5C47.7083 36.7761 47.4844 37 47.2083 37H44.2083C43.9322 37 43.7083 36.7761 43.7083 36.5V35.5Z M43.7083 38.5C43.7083 38.2239 43.9322 38 44.2083 38H47.2083C47.4844 38 47.7083 38.2239 47.7083 38.5V39.5C47.7083 39.7761 47.4844 40 47.2083 40H44.2083C43.9322 40 43.7083 39.7761 43.7083 39.5V38.5Z M43.7083 41.5C43.7083 41.2239 43.9322 41 44.2083 41H47.2083C47.4844 41 47.7083 41.2239 47.7083 41.5V42.5C47.7083 42.7761 47.4844 43 47.2083 43H44.2083C43.9322 43 43.7083 42.7761 43.7083 42.5V41.5Z M43.7083 44.5C43.7083 44.2239 43.9322 44 44.2083 44H47.2083C47.4844 44 47.7083 44.2239 47.7083 44.5V45.5C47.7083 45.7761 47.4844 46 47.2083 46H44.2083C43.9322 46 43.7083 45.7761 43.7083 45.5V44.5Z M48.7083 35.5C48.7083 35.2239 48.9322 35 49.2083 35H52.2083C52.4844 35 52.7083 35.2239 52.7083 35.5V36.5C52.7083 36.7761 52.4844 37 52.2083 37H49.2083C48.9322 37 48.7083 36.7761 48.7083 36.5V35.5Z M48.7083 38.5C48.7083 38.2239 48.9322 38 49.2083 38H52.2083C52.4844 38 52.7083 38.2239 52.7083 38.5V39.5C52.7083 39.7761 52.4844 40 52.2083 40H49.2083C48.9322 40 48.7083 39.7761 48.7083 39.5V38.5Z M48.7083 41.5C48.7083 41.2239 48.9322 41 49.2083 41H52.2083C52.4844 41 52.7083 41.2239 52.7083 41.5V42.5C52.7083 42.7761 52.4844 43 52.2083 43H49.2083C48.9322 43 48.7083 42.7761 48.7083 42.5V41.5Z M48.7083 44.5C48.7083 44.2239 48.9322 44 49.2083 44H52.2083C52.4844 44 52.7083 44.2239 52.7083 44.5V45.5C52.7083 45.7761 52.4844 46 52.2083 46H49.2083C48.9322 46 48.7083 45.7761 48.7083 45.5V44.5Z M53.7083 35.5C53.7083 35.2239 53.9322 35 54.2083 35H57.2083C57.4844 35 57.7083 35.2239 57.7083 35.5V36.5C57.7083 36.7761 57.4844 37 57.2083 37H54.2083C53.9322 37 53.7083 36.7761 53.7083 36.5V35.5Z M53.7083 38.5C53.7083 38.2239 53.9322 38 54.2083 38H57.2083C57.4844 38 57.7083 38.2239 57.7083 38.5V39.5C57.7083 39.7761 57.4844 40 57.2083 40H54.2083C53.9322 40 53.7083 39.7761 53.7083 39.5V38.5Z M53.7083 41.5C53.7083 41.2239 53.9322 41 54.2083 41H57.2083C57.4844 41 57.7083 41.2239 57.7083 41.5V42.5C57.7083 42.7761 57.4844 43 57.2083 43H54.2083C53.9322 43 53.7083 42.7761 53.7083 42.5V41.5Z M53.7083 44.5C53.7083 44.2239 53.9322 44 54.2083 44H57.2083C57.4844 44 57.7083 44.2239 57.7083 44.5V45.5C57.7083 45.7761 57.4844 46 57.2083 46H54.2083C53.9322 46 53.7083 45.7761 53.7083 45.5V44.5Z"}},

{ id:'Room', shape :{ type: 'Path', data:"M4 4H104V104H4V4Z"}},
{ id:'T Room', shape :{ type: 'Path', data:"M4 4H273V145.749H192.981V250H71.25V110.312H4V4Z"}},
{ id:'L Room', shape :{ type: 'Path', data:"M4 4H273V250H146.5V110.312H4V4Z"}},
{ id:'Wall Corner', shape :{ type: 'Path', data:"M104 4H4V104"}},
{ id:'Wall Corner1', shape :{ type: 'Path',data:'M0 100L100 100L100 0'}},
{ id:'T Wall', shape :{ type: 'Path', data:"M106 4.00002L206 4.00004M106 4.00002L106 104M106 4.00002L0 4"}},
{ id:'Elevator',dragSize:{width:37,height:37}, shape :{ type: 'Path', data:'M14.3536 14.6464L77.3536 77.6464M77.3536 14.3536L14.3536 77.3536M14 14H78V78H14V14ZM11 11H81V81H11V11ZM9 89H1V1H91V89H83V9H9V89Z'}},
{ id:'Window Garden',dragSize:{width:76,height:29}, shape :{ type: 'Path', data:"M1.5 0H0V1.5V38.5H3V3H152V38.5H155V1.5V0H153.5H1.5ZM6.5 5H5V6.5V38.5H8V8H53V38.5H56V8H100V38.5H103V8H147V38.5H150V6.5V5H148.5H103H101.5H100H56H54.5H53H6.5Z"}},

{ id:'Staircase',dragSize:{width:64,height:25}, shape :{ type: 'Path', data:'M36 1V35M36 1L25 1M36 1H48M36 35H25M36 35H48M25 35L25 1M25 35H13L13 1L25 1M48 1V35M48 1H59M48 35H59M59 1V35M59 1H71M59 35H71M71 1V35M71 1H82M71 35H82M82 1V35M82 1H94M82 35H94M94 1V35M94 1H105M94 35H105M105 1V35M105 1H117V35H105M129 1V35L1 35L1 1L129 1Z'}},
{ id:'Staircase1',dragSize:{width:64,height:25}, shape :{ type: 'Path', data:'M36 1V35M36 1L25 1M36 1H48M36 35H25M36 35H48M25 35L25 1M25 35H13L13 1L25 1M48 1V35M48 1H59M48 35H59M59 1V35M59 1H71M59 35H71M71 1V35M71 1H82M71 35H82M82 1V35M82 1H94M82 35H94M94 1V35M94 1H105M94 35H105M105 1V35M105 1H117V35H105M9 17.5H122M9 17.5C9 18.8807 7.88071 20 6.5 20C5.11929 20 4 18.8807 4 17.5C4 16.1193 5.11929 15 6.5 15C7.88071 15 9 16.1193 9 17.5ZM129 1V35L1 35L1 1L129 1ZM126 17.5L121.5 20.5311V14.4689L126 17.5Z'}},
{ id:'Staircase2',dragSize:{width:64,height:25}, shape :{ type: 'Path', data:'M1 17.4998L133 17.4998M121.177 0.869141L132.874 17.3083M121.582 34.7252L132.756 17.7252M121.5 0.999829V34.9998M109.5 0.999829V34.9998M97.5 0.999829V34.9998M85.5 0.999829V34.9998M73.5 0.999829V34.9998M61.5 0.999829V34.9998M49.5 0.999829V34.9998M37.5 0.999829V34.9998M25.5 0.999829L25.5 34.9998M13.5 0.999829L13.5 34.9998M133 0.999829V34.9998L1 34.9998L1 0.999824L133 0.999829Z'}},

];
var kitchen=[
{ id:'Small Gas Range' ,dragSize:{width:70,height:25},shape :{ type: 'Path', data:'M67.5828 1.96454C67.5828 1.43184 67.151 1 66.6183 1L1.96405 1.00001C1.43135 1.00001 0.999512 1.43184 0.999512 1.96454L0.999515 34.0355C0.999515 34.5682 1.43135 35 1.96405 35L66.6183 35C67.151 35 67.5828 34.5682 67.5828 34.0355V1.96454Z M33.5828 4.79852C33.5828 4.26582 33.151 3.83398 32.6183 3.83398L4.79737 3.83399C4.26467 3.83399 3.83283 4.26583 3.83283 4.79853L3.83284 31.2028C3.83284 31.7355 4.26468 32.1673 4.79738 32.1673L32.6183 32.1673C33.151 32.1673 33.5828 31.7355 33.5828 31.2028L33.5828 4.79852Z M64.7488 4.79852C64.7488 4.26582 64.317 3.83398 63.7843 3.83398L35.9634 3.83399C35.4307 3.83399 34.9988 4.26583 34.9988 4.79853L34.9989 31.2028C34.9989 31.7355 35.4307 32.1673 35.9634 32.1673L63.7843 32.1673C64.317 32.1673 64.7489 31.7355 64.7489 31.2028L64.7488 4.79852Z M26.4988 18C26.4988 22.6944 22.6933 26.5 17.9988 26.5C13.3044 26.5 9.49885 22.6944 9.49885 18C9.49885 13.3056 13.3044 9.5 17.9988 9.5C22.6933 9.5 26.4988 13.3056 26.4988 18Z M25.4363 18C25.4363 22.1076 22.1065 25.4375 17.9988 25.4375C13.8912 25.4375 10.5613 22.1076 10.5613 18C10.5613 13.8924 13.8912 10.5625 17.9988 10.5625C22.1065 10.5625 25.4363 13.8924 25.4363 18Z M25.0574 24.6826L24.6818 25.0583L22.0015 22.378L22.3772 22.0024L25.0574 24.6826Z M13.9442 13.5703L13.5685 13.946L10.888 11.2655L11.2637 10.8898L13.9442 13.5703Z M24.786 11.0938L25.1616 11.4694L22.4813 14.1497L22.1057 13.774L24.786 11.0938Z M13.7733 21.9844L14.1489 22.36L11.4686 25.0403L11.093 24.6646L13.7733 21.9844Z M21.452 18C21.452 19.9071 19.906 21.4531 17.9988 21.4531C16.0917 21.4531 14.5457 19.9071 14.5457 18C14.5457 16.0929 16.0917 14.5469 17.9988 14.5469C19.906 14.5469 21.452 16.0929 21.452 18Z M57.6658 18C57.6658 22.6944 53.8603 26.5 49.1658 26.5C44.4714 26.5 40.6658 22.6944 40.6658 18C40.6658 13.3056 44.4714 9.5 49.1658 9.5C53.8603 9.5 57.6658 13.3056 57.6658 18Z M56.6033 18C56.6033 22.1076 53.2735 25.4375 49.1658 25.4375C45.0582 25.4375 41.7283 22.1076 41.7283 18C41.7283 13.8924 45.0582 10.5625 49.1658 10.5625C53.2735 10.5625 56.6033 13.8924 56.6033 18Z M56.2235 24.6826L55.8478 25.0583L53.1675 22.378L53.5432 22.0024L56.2235 24.6826Z M45.1121 13.5703L44.7365 13.946L42.056 11.2655L42.4317 10.8898L45.1121 13.5703Z M55.952 11.0938L56.3276 11.4694L53.6474 14.1497L53.2717 13.774L55.952 11.0938Z M44.9403 21.9844L45.3159 22.36L42.6356 25.0403L42.26 24.6646L44.9403 21.9844Z M52.619 18C52.619 19.9071 51.0729 21.4531 49.1658 21.4531C47.2587 21.4531 45.7127 19.9071 45.7127 18C45.7127 16.0929 47.2587 14.5469 49.1658 14.5469C51.0729 14.5469 52.619 16.0929 52.619 18Z'}},
{ id:'Large Gas Range' ,dragSize:{width:100,height:30}, shape :{ type: 'Path', data:"M101.999 1.96454C101.999 1.43184 101.567 1 101.034 1L1.96356 1.00001C1.43086 1.00001 0.999023 1.43185 0.999023 1.96455L0.999026 34.0355C0.999026 34.5682 1.43087 35 1.96357 35L101.034 35C101.567 35 101.999 34.5682 101.999 34.0355V1.96454Z M33.583 4.79803C33.583 4.26533 33.1512 3.8335 32.6185 3.8335L4.79755 3.8335C4.26485 3.8335 3.83301 4.26534 3.83301 4.79804L3.83301 31.2023C3.83301 31.735 4.26485 32.1668 4.79755 32.1668L32.6185 32.1668C33.1512 32.1668 33.583 31.735 33.583 31.2023L33.583 4.79803Z M98.749 4.96454C98.749 4.43184 98.3172 4 97.7845 4L69.9636 4C69.4309 4 68.999 4.43184 68.999 4.96454L68.999 31.3688C68.999 31.9015 69.4309 32.3333 69.9636 32.3333L97.7845 32.3333C98.3172 32.3333 98.749 31.9015 98.749 31.3688V4.96454Z M60.999 9.61601C60.999 9.2758 60.7232 9 60.383 9L42.615 9C42.2748 9 41.999 9.2758 41.999 9.61601L41.999 26.4792C41.999 26.8195 42.2748 27.0953 42.615 27.0953L60.383 27.0953C60.7232 27.0953 60.999 26.8195 60.999 26.4792V9.61601Z M26.499 18C26.499 22.6944 22.6934 26.5 17.999 26.5C13.3046 26.5 9.49902 22.6944 9.49902 18C9.49902 13.3056 13.3046 9.5 17.999 9.5C22.6934 9.5 26.499 13.3056 26.499 18Z M25.4365 18C25.4365 22.1076 22.1066 25.4375 17.999 25.4375C13.8914 25.4375 10.5615 22.1076 10.5615 18C10.5615 13.8924 13.8914 10.5625 17.999 10.5625C22.1066 10.5625 25.4365 13.8924 25.4365 18Z M25.0576 24.6826L24.682 25.0583L22.0017 22.378L22.3774 22.0024L25.0576 24.6826Z M13.9443 13.5698L13.5687 13.9455L10.8882 11.265L11.2639 10.8894L13.9443 13.5698Z M24.7861 11.0938L25.1618 11.4694L22.4815 14.1497L22.1059 13.774L24.7861 11.0938Z M13.7734 21.9844L14.1491 22.36L11.4688 25.0403L11.0932 24.6646L13.7734 21.9844Z M21.4521 18C21.4521 19.9071 19.9061 21.4531 17.999 21.4531C16.0919 21.4531 14.5459 19.9071 14.5459 18C14.5459 16.0929 16.0919 14.5469 17.999 14.5469C19.9061 14.5469 21.4521 16.0929 21.4521 18Z M91.665 18.1665C91.665 22.8609 87.8595 26.6665 83.165 26.6665C78.4706 26.6665 74.665 22.8609 74.665 18.1665C74.665 13.4721 78.4706 9.6665 83.165 9.6665C87.8595 9.6665 91.665 13.4721 91.665 18.1665Z M90.6025 18.1665C90.6025 22.2741 87.2727 25.604 83.165 25.604C79.0574 25.604 75.7275 22.2741 75.7275 18.1665C75.7275 14.0589 79.0574 10.729 83.165 10.729C87.2727 10.729 90.6025 14.0589 90.6025 18.1665Z M90.2236 24.8491L89.848 25.2248L87.1677 22.5445L87.5434 22.1689L90.2236 24.8491Z M79.1104 13.7363L78.7347 14.112L76.0542 11.4315L76.4299 11.0559L79.1104 13.7363Z M89.9521 11.2603L90.3278 11.6359L87.6475 14.3162L87.2719 13.9405L89.9521 11.2603Z M78.9404 22.1509L79.3161 22.5265L76.6358 25.2068L76.2602 24.8311L78.9404 22.1509Z M86.6182 18.1665C86.6182 20.0736 85.0721 21.6196 83.165 21.6196C81.2579 21.6196 79.7119 20.0736 79.7119 18.1665C79.7119 16.2594 81.2579 14.7134 83.165 14.7134C85.0721 14.7134 86.6182 16.2594 86.6182 18.1665Z M56.4753 18.0477C56.4753 21.0458 54.0449 23.4763 51.0467 23.4763C48.0486 23.4763 45.6182 21.0458 45.6182 18.0477C45.6182 15.0496 48.0486 12.6191 51.0467 12.6191C54.0449 12.6191 56.4753 15.0496 56.4753 18.0477Z M55.7979 18.0479C55.7979 20.6712 53.6712 22.7979 51.0479 22.7979C48.4245 22.7979 46.2979 20.6712 46.2979 18.0479C46.2979 15.4245 48.4245 13.2979 51.0479 13.2979C53.6712 13.2979 55.7979 15.4245 55.7979 18.0479Z M55.5557 22.3154L55.3158 22.5553L53.604 20.8436L53.8439 20.6037L55.5557 22.3154Z M48.458 15.2183L48.2181 15.4582L46.5062 13.7463L46.7461 13.5064L48.458 15.2183Z M55.3818 13.6367L55.6217 13.8766L53.91 15.5884L53.6701 15.3485L55.3818 13.6367Z M48.3486 20.5923L48.5885 20.8322L46.8768 22.544L46.6369 22.3041L48.3486 20.5923Z M53.2525 18.0476C53.2525 19.2656 52.2651 20.253 51.0472 20.253C49.8292 20.253 48.8418 19.2656 48.8418 18.0476C48.8418 16.8297 49.8292 15.8423 51.0472 15.8423C52.2651 15.8423 53.2525 16.8297 53.2525 18.0476Z"}},
{id:'Large Gas Range1' ,dragSize:{width:100,height:30}, shape :{ type: 'Path', data:'M101.999 1.96454C101.999 1.43184 101.567 1 101.034 1L1.96356 1.00001C1.43086 1.00001 0.999023 1.43185 0.999023 1.96455L0.999026 34.0355C0.999026 34.5682 1.43087 35 1.96357 35L101.034 35C101.567 35 101.999 34.5682 101.999 34.0355V1.96454Z M33.583 4.79803C33.583 4.26533 33.1512 3.8335 32.6185 3.8335L4.79755 3.8335C4.26485 3.8335 3.83301 4.26534 3.83301 4.79804L3.83301 31.2023C3.83301 31.735 4.26485 32.1668 4.79755 32.1668L32.6185 32.1668C33.1512 32.1668 33.583 31.735 33.583 31.2023L33.583 4.79803Z M98.749 4.96454C98.749 4.43184 98.3172 4 97.7845 4L69.9636 4C69.4309 4 68.999 4.43184 68.999 4.96454L68.999 31.3688C68.999 31.9015 69.4309 32.3333 69.9636 32.3333L97.7845 32.3333C98.3172 32.3333 98.749 31.9015 98.749 31.3688V4.96454Z M65.749 4.96454C65.749 4.43184 65.3172 4 64.7845 4L36.9636 4C36.4309 4 35.999 4.43184 35.999 4.96454L35.999 31.3688C35.999 31.9015 36.4309 32.3333 36.9636 32.3333L64.7845 32.3333C65.3172 32.3333 65.749 31.9015 65.749 31.3688V4.96454Z M26.499 18C26.499 22.6944 22.6934 26.5 17.999 26.5C13.3046 26.5 9.49902 22.6944 9.49902 18C9.49902 13.3056 13.3046 9.5 17.999 9.5C22.6934 9.5 26.499 13.3056 26.499 18Z M25.4365 18C25.4365 22.1076 22.1066 25.4375 17.999 25.4375C13.8914 25.4375 10.5615 22.1076 10.5615 18C10.5615 13.8924 13.8914 10.5625 17.999 10.5625C22.1066 10.5625 25.4365 13.8924 25.4365 18Z M25.0576 24.6826L24.682 25.0583L22.0017 22.378L22.3774 22.0024L25.0576 24.6826Z M13.9443 13.5698L13.5687 13.9455L10.8882 11.265L11.2639 10.8894L13.9443 13.5698Z M24.7861 11.0938L25.1618 11.4694L22.4815 14.1497L22.1059 13.774L24.7861 11.0938Z M13.7734 21.9844L14.1491 22.36L11.4688 25.0403L11.0932 24.6646L13.7734 21.9844Z M21.4521 18C21.4521 19.9071 19.9061 21.4531 17.999 21.4531C16.0919 21.4531 14.5459 19.9071 14.5459 18C14.5459 16.0929 16.0919 14.5469 17.999 14.5469C19.9061 14.5469 21.4521 16.0929 21.4521 18Z M91.665 18.1665C91.665 22.8609 87.8595 26.6665 83.165 26.6665C78.4706 26.6665 74.665 22.8609 74.665 18.1665C74.665 13.4721 78.4706 9.6665 83.165 9.6665C87.8595 9.6665 91.665 13.4721 91.665 18.1665Z M90.6025 18.1665C90.6025 22.2741 87.2727 25.604 83.165 25.604C79.0574 25.604 75.7275 22.2741 75.7275 18.1665C75.7275 14.0589 79.0574 10.729 83.165 10.729C87.2727 10.729 90.6025 14.0589 90.6025 18.1665Z M90.2236 24.8491L89.848 25.2248L87.1677 22.5445L87.5434 22.1689L90.2236 24.8491Z M79.1104 13.7363L78.7347 14.112L76.0542 11.4315L76.4299 11.0559L79.1104 13.7363Z M89.9521 11.2603L90.3278 11.6359L87.6475 14.3162L87.2719 13.9405L89.9521 11.2603Z M78.9404 22.1509L79.3161 22.5265L76.6358 25.2068L76.2602 24.8311L78.9404 22.1509Z M86.6182 18.1665C86.6182 20.0736 85.0721 21.6196 83.165 21.6196C81.2579 21.6196 79.7119 20.0736 79.7119 18.1665C79.7119 16.2594 81.2579 14.7134 83.165 14.7134C85.0721 14.7134 86.6182 16.2594 86.6182 18.1665Z M58.665 18.1665C58.665 22.8609 54.8595 26.6665 50.165 26.6665C45.4706 26.6665 41.665 22.8609 41.665 18.1665C41.665 13.4721 45.4706 9.6665 50.165 9.6665C54.8595 9.6665 58.665 13.4721 58.665 18.1665Z M57.6025 18.1665C57.6025 22.2741 54.2727 25.604 50.165 25.604C46.0574 25.604 42.7275 22.2741 42.7275 18.1665C42.7275 14.0589 46.0574 10.729 50.165 10.729C54.2727 10.729 57.6025 14.0589 57.6025 18.1665Z M57.2236 24.8491L56.848 25.2248L54.1677 22.5445L54.5434 22.1689L57.2236 24.8491Z M46.1104 13.7363L45.7347 14.112L43.0542 11.4315L43.4299 11.0559L46.1104 13.7363Z M56.9521 11.2603L57.3278 11.6359L54.6475 14.3162L54.2719 13.9405L56.9521 11.2603Z M45.9404 22.1509L46.3161 22.5265L43.6358 25.2068L43.2602 24.8311L45.9404 22.1509Z M53.6182 18.1665C53.6182 20.0736 52.0721 21.6196 50.165 21.6196C48.2579 21.6196 46.7119 20.0736 46.7119 18.1665C46.7119 16.2594 48.2579 14.7134 50.165 14.7134C52.0721 14.7134 53.6182 16.2594 53.6182 18.1665Z'}},
{ id:'Refrigerator',dragSize:{width:30,height:30},shape :{ type: 'Path', data:"M1 8.58323H61V58.0356H1V8.58323Z M1 58.8332H61V63.6189C61 65.381 59.5716 66.8094 57.8095 66.8094H4.19048C2.42843 66.8094 1 65.381 1 63.6189V58.8332Z M57.0527 8.17857L4.158 8.17857L4.158 4.19047C4.158 2.42842 5.58642 1 7.34847 1L53.8623 1C55.6243 1 57.0527 2.42843 57.0527 4.19048V8.17857Z M1 8.58323V8.08323H0.5V8.58323H1ZM61 8.58323H61.5V8.08323H61V8.58323ZM61 58.0356V58.5356H61.5V58.0356H61ZM1 58.0356H0.5V58.5356H1V58.0356ZM1 58.8332V58.3332H0.5V58.8332H1ZM61 58.8332H61.5V58.3332H61V58.8332ZM6.52686 66.8094V66.3094H6.02686V66.8094H6.52686ZM16.79 66.8094H17.29V66.3094H16.79V66.8094ZM57.0527 8.17857V8.67857H57.5527V8.17857H57.0527ZM4.158 8.17857H3.658V8.67857H4.158V8.17857ZM53.8623 1V0.500004V1ZM57.0527 4.19048H56.5527H57.0527ZM4.158 4.19047H3.658H4.158ZM7.34847 1V1.5V1ZM1 9.08323H61V8.08323H1V9.08323ZM60.5 8.58323V58.0356H61.5V8.58323H60.5ZM61 57.5356H1V58.5356H61V57.5356ZM1.5 58.0356V8.58323H0.5V58.0356H1.5ZM1 59.3332H61V58.3332H1V59.3332ZM60.5 58.8332V63.6189H61.5V58.8332H60.5ZM57.8095 66.3094H4.19048V67.3094H57.8095V66.3094ZM1.5 63.6189V58.8332H0.5V63.6189H1.5ZM4.19048 66.3094C2.70457 66.3094 1.5 65.1049 1.5 63.6189H0.5C0.5 65.6571 2.15228 67.3094 4.19048 67.3094V66.3094ZM60.5 63.6189C60.5 65.1049 59.2954 66.3094 57.8095 66.3094V67.3094C59.8477 67.3094 61.5 65.6571 61.5 63.6189H60.5ZM6.52686 67.3094H16.79V66.3094H6.52686V67.3094ZM13.5995 69.4999H9.71733V70.4999H13.5995V69.4999ZM9.71733 69.4999C8.23142 69.4999 7.02686 68.2953 7.02686 66.8094H6.02686C6.02686 68.8476 7.67914 70.4999 9.71733 70.4999V69.4999ZM16.29 66.8094C16.29 68.2953 15.0854 69.4999 13.5995 69.4999V70.4999C15.6377 70.4999 17.29 68.8476 17.29 66.8094H16.29ZM57.0527 7.67857L4.158 7.67857V8.67857L57.0527 8.67857V7.67857ZM4.658 8.17857L4.658 4.19047H3.658L3.658 8.17857H4.658ZM7.34847 1.5L53.8623 1.5V0.500004L7.34847 0.5V1.5ZM56.5527 4.19048V8.17857H57.5527V4.19048H56.5527ZM53.8623 1.5C55.3482 1.5 56.5527 2.70457 56.5527 4.19048H57.5527C57.5527 2.15229 55.9005 0.500004 53.8623 0.500004V1.5ZM4.658 4.19047C4.658 2.70456 5.86256 1.5 7.34847 1.5V0.5C5.31028 0.5 3.658 2.15228 3.658 4.19047H4.658Z"}},
{ id:'Water Cooler',dragSize:{width:30,height:30},shape :{ type: 'Path', data:'M49 1H3C1.89543 1 1 1.89543 1 3V49C1 50.1046 1.89543 51 3 51H49C50.1046 51 51 50.1046 51 49V3C51 1.89543 50.1046 1 49 1Z M47 26C47 37.598 37.598 47 26 47C14.402 47 5 37.598 5 26C5 14.402 14.402 5 26 5C37.598 5 47 14.402 47 26Z M30 26C30 28.2091 28.2091 30 26 30C23.7909 30 22 28.2091 22 26C22 23.7909 23.7909 22 26 22C28.2091 22 30 23.7909 30 26Z M49 1H3C1.89543 1 1 1.89543 1 3V49C1 50.1046 1.89543 51 3 51H49C50.1046 51 51 50.1046 51 49V3C51 1.89543 50.1046 1 49 1Z M47 26C47 37.598 37.598 47 26 47C14.402 47 5 37.598 5 26C5 14.402 14.402 5 26 5C37.598 5 47 14.402 47 26Z M30 26C30 28.2091 28.2091 30 26 30C23.7909 30 22 28.2091 22 26C22 23.7909 23.7909 22 26 22C28.2091 22 30 23.7909 30 26Z'}},
{ id:'Double Sink',dragSize:{width:30,height:30},shape :{ type: 'Path', data:'M1 9C1 4.58172 4.58172 1 9 1H115C119.418 1 123 4.58172 123 9V41C123 45.4183 119.418 49 115 49H9C4.58172 49 1 45.4183 1 41V9Z M7 13C7 10.7909 8.79086 9 11 9H55C57.2091 9 59 10.7909 59 13V37C59 39.2091 57.2091 41 55 41H11C8.79086 41 7 39.2091 7 37V13Z M65 13C65 10.7909 66.7909 9 69 9H113C115.209 9 117 10.7909 117 13V37C117 39.2091 115.209 41 113 41H69C66.7909 41 65 39.2091 65 37V13Z M35 25.5C35 26.8807 33.8807 28 32.5 28C31.1193 28 30 26.8807 30 25.5C30 24.1193 31.1193 23 32.5 23C33.8807 23 35 24.1193 35 25.5Z M93 25.5C93 26.8807 91.8807 28 90.5 28C89.1193 28 88 26.8807 88 25.5C88 24.1193 89.1193 23 90.5 23C91.8807 23 93 24.1193 93 25.5Z M64.3638 10.4863C64.3638 10.4863 65.071 10.4863 65.7781 9.77915C66.4852 9.07204 66.4852 8.36493 66.4852 8.36493L74.4865 15.2232C75.5104 16.1009 75.5705 17.6644 74.6169 18.618C73.6633 19.5716 72.0998 19.5115 71.2221 18.4876L64.3638 10.4863Z M65.4246 4.47532C66.7915 5.84216 66.7915 8.05823 65.4246 9.42507C64.0578 10.7919 61.8417 10.7919 60.4749 9.42507C59.108 8.05823 59.108 5.84216 60.4749 4.47532C61.8417 3.10849 64.0578 3.10849 65.4246 4.47532Z'}},
]
var bathRoom =[
{ id:'Toilet1',dragSize:{width:30,height:30}, shape :{ type: 'Path', data: 'M46.4065 37.9425C46.4065 55.0951 36.823 69.0002 25.0011 69.0002C13.1792 69.0002 3.5957 55.0951 3.5957 37.9425C3.5957 30.1141 5.2059 23.4623 8.5 18C8.61402 18 25 18 25 18H41.2425C44.5366 23.4623 46.4065 30.1141 46.4065 37.9425Z M41.2161 43.5006C41.2161 53.9728 33.9559 62.4621 24.9999 62.4621C16.0439 62.4621 8.78369 53.9728 8.78369 43.5006C8.78369 33.0284 16.0439 24.5391 24.9999 24.5391C33.9559 24.5391 41.2161 33.0284 41.2161 43.5006Z M1 3.61538C1 2.17095 2.17095 1 3.61538 1H46.3846C47.8291 1 49 2.17095 49 3.61538V15.3846C49 16.8291 47.8291 18 46.3846 18H3.61538C2.17095 18 1 16.8291 1 15.3846V3.61538Z M26.9995 9C26.9995 10.1046 26.1041 11 24.9995 11C23.8949 11 22.9995 10.1046 22.9995 9C22.9995 7.89543 23.8949 7 24.9995 7C26.1041 7 26.9995 7.89543 26.9995 9Z M31 33C31 37.4183 28.3137 41 25 41C21.6863 41 19 37.4183 19 33C19 28.5817 21.6863 25 25 25C28.3137 25 31 28.5817 31 33Z '}},
{ id:'Toilet2',dragSize:{width:30,height:30}, shape :{ type: 'Path', data:'M46.989 33.0731C46.989 53.4671 37.3818 69.9996 25.5307 69.9996C13.6795 69.9996 4.07227 53.4671 4.07227 33.0731C4.07227 19.1497 4 18 4 18C4.17549 18.0144 15.9306 18.2553 26.5002 17.9993C36.1582 17.7654 46.989 17.9999 46.989 17.9999C46.989 17.9999 46.989 21.6119 46.989 33.0731Z M41 44.5C41 54.7173 34.0604 63 25.5 63C16.9396 63 10 54.7173 10 44.5C10 34.2827 16.9396 26 25.5 26C34.0604 26 41 34.2827 41 44.5Z M1 3.61538C1 2.17095 2.17095 1 3.61538 1H46.3846C47.8291 1 49 2.17095 49 3.61538V15.3846C49 16.8291 47.8291 18 46.3846 18H3.61538C2.17095 18 1 16.8291 1 15.3846V3.61538Z M26.9995 9C26.9995 10.1046 26.1041 11 24.9995 11C23.8949 11 22.9995 10.1046 22.9995 9C22.9995 7.89543 23.8949 7 24.9995 7C26.1041 7 26.9995 7.89543 26.9995 9Z M31 34C31 38.4183 28.3137 42 25 42C21.6863 42 19 38.4183 19 34C19 29.5817 21.6863 26 25 26C28.3137 26 31 29.5817 31 34Z'}},
{ id:'Shower',dragSize:{width:30,height:30}, shape :{ type: 'Path', data:"M6.70817 7.37289L45.3371 42.6307M44.3387 7.36777L6.33874 42.3678M23.3536 22.8447L28.3536 27.8447M28.3641 22.5409L23.3641 27.8532M1 1L45 1.19812V7.19812H6.17647V42.1981H45V49H1V1ZM32 25.1982C32 28.512 29.3137 31.1982 26 31.1982C22.6863 31.1982 20 28.512 20 25.1982C20 21.8845 22.6863 19.1982 26 19.1982C29.3137 19.1982 32 21.8845 32 25.1982ZM29.75 25.1982C29.75 27.2693 28.0711 28.9482 26 28.9482C23.9289 28.9482 22.25 27.2693 22.25 25.1982C22.25 23.1272 23.9289 21.4482 26 21.4482C28.0711 21.4482 29.75 23.1272 29.75 25.1982ZM27.5 25.1982C27.5 26.0267 26.8284 26.6982 26 26.6982C25.1716 26.6982 24.5 26.0267 24.5 25.1982C24.5 24.3698 25.1716 23.6982 26 23.6982C26.8284 23.6982 27.5 24.3698 27.5 25.1982Z"}},
{ id:'Corner Shower',dragSize:{width:30,height:30}, shape :{ type: 'Path', data:"M7.46424 6.8143L15.4642 26.8143M23.1506 36.5232L42.1506 42.5232M14.3536 35.3536L7.35355 42.3536M31.4327 7.25052L20.4327 26.2505M42.1411 26.4797L25.1411 31.4797M16.5984 29.3311L21.749 34.1759M21.3641 29.3427L16.3641 34.6549M1 1H32.0332V7H7.03382V43L42.0338 42.9219V26H48.0338V49.1981H1.03382L1 1ZM25 32C25 35.3137 22.3137 38 19 38C15.6863 38 13 35.3137 13 32C13 28.6863 15.6863 26 19 26C22.3137 26 25 28.6863 25 32ZM22.75 32C22.75 34.0711 21.0711 35.75 19 35.75C16.9289 35.75 15.25 34.0711 15.25 32C15.25 29.9289 16.9289 28.25 19 28.25C21.0711 28.25 22.75 29.9289 22.75 32ZM20 32C20 32.5523 19.5523 33 19 33C18.4477 33 18 32.5523 18 32C18 31.4477 18.4477 31 19 31C19.5523 31 20 31.4477 20 32Z"}},
{ id:'Wash Basin1',dragSize:{width:30,height:30}, shape :{ type: 'Path', data:'M1 9C1 4.58172 4.58172 1 9 1H57C61.4183 1 65 4.58172 65 9V41C65 45.4183 61.4183 49 57 49H9C4.58172 49 1 45.4183 1 41V9Z M7 13C7 10.7909 8.79086 9 11 9H55C57.2091 9 59 10.7909 59 13V37C59 39.2091 57.2091 41 55 41H11C8.79086 41 7 39.2091 7 37V13Z M35 25.5C35 26.8807 33.8807 28 32.5 28C31.1193 28 30 26.8807 30 25.5C30 24.1193 31.1193 23 32.5 23C33.8807 23 35 24.1193 35 25.5Z M31 9C31 9 31.5 9.5 32.5 9.5C33.5 9.5 34 9 34 9L34.8083 19.5074C34.9117 20.8519 33.8486 22 32.5 22C31.1514 22 30.0883 20.8519 30.1917 19.5074L31 9Z M36 5.5C36 7.433 34.433 9 32.5 9C30.567 9 29 7.433 29 5.5C29 3.567 30.567 2 32.5 2C34.433 2 36 3.567 36 5.5Z'}},
{ id:'Wash Basin2',dragSize:{width:30,height:30}, shape :{ type: 'Path', data:"M1 4C1 2.34315 2.34315 1 4 1H62C63.6569 1 65 2.34315 65 4V25C65 38.2548 54.2548 49 41 49H25C11.7452 49 1 38.2548 1 25V4Z M57 25C57 33.2843 46.2548 40 33 40C19.7452 40 9 33.2843 9 25C9 16.7157 19.7452 10 33 10C46.2548 10 57 16.7157 57 25Z M31 10C31 10 31.5 10.5 32.5 10.5C33.5 10.5 34 10 34 10L34.8083 20.5074C34.9117 21.8519 33.8486 23 32.5 23C31.1514 23 30.0883 21.8519 30.1917 20.5074L31 10Z M36 6.5C36 8.433 34.433 10 32.5 10C30.567 10 29 8.433 29 6.5C29 4.567 30.567 3 32.5 3C34.433 3 36 4.567 36 6.5Z M35 28.5C35 29.8807 33.8807 31 32.5 31C31.1193 31 30 29.8807 30 28.5C30 27.1193 31.1193 26 32.5 26C33.8807 26 35 27.1193 35 28.5Z"}},
{ id:'Wash Basin3',dragSize:{width:30,height:30}, shape :{ type: 'Path', data:'M1 9C1 4.58172 4.58172 1 9 1H57C61.4183 1 65 4.58172 65 9V41C65 45.4183 61.4183 49 57 49H9C4.58172 49 1 45.4183 1 41V9Z M7 13C7 10.7909 8.79086 9 11 9H55C57.2091 9 59 10.7909 59 13V37C59 39.2091 57.2091 41 55 41H11C8.79086 41 7 39.2091 7 37V13Z M35 25.5C35 26.8807 33.8807 28 32.5 28C31.1193 28 30 26.8807 30 25.5C30 24.1193 31.1193 23 32.5 23C33.8807 23 35 24.1193 35 25.5Z M31.7433 9.05588C31.7433 9.05588 32.3556 9.40943 33.3216 9.15061C34.2875 8.89179 34.641 8.27942 34.641 8.27942L38.1413 18.2196C38.5892 19.4916 37.8594 20.8757 36.5568 21.2247C35.2542 21.5737 33.9302 20.7399 33.6821 19.4144L31.7433 9.05588Z M35.6673 4.38071C36.1676 6.24784 35.0596 8.16702 33.1925 8.66732C31.3253 9.16762 29.4062 8.05958 28.9059 6.19245C28.4056 4.32532 29.5136 2.40614 31.3807 1.90584C33.2479 1.40554 35.1671 2.51358 35.6673 4.38071Z'}},
{ id:'Double Sink4',dragSize:{width:30,height:30}, shape :{ type: 'Path', data:'M1 9C1 4.58172 4.58172 1 9 1H115C119.418 1 123 4.58172 123 9V41C123 45.4183 119.418 49 115 49H9C4.58172 49 1 45.4183 1 41V9Z M7 13C7 10.7909 8.79086 9 11 9H55C57.2091 9 59 10.7909 59 13V37C59 39.2091 57.2091 41 55 41H11C8.79086 41 7 39.2091 7 37V13Z M65 13C65 10.7909 66.7909 9 69 9H113C115.209 9 117 10.7909 117 13V37C117 39.2091 115.209 41 113 41H69C66.7909 41 65 39.2091 65 37V13Z M35 25.5C35 26.8807 33.8807 28 32.5 28C31.1193 28 30 26.8807 30 25.5C30 24.1193 31.1193 23 32.5 23C33.8807 23 35 24.1193 35 25.5Z M93 25.5C93 26.8807 91.8807 28 90.5 28C89.1193 28 88 26.8807 88 25.5C88 24.1193 89.1193 23 90.5 23C91.8807 23 93 24.1193 93 25.5Z M64.3638 10.4863C64.3638 10.4863 65.071 10.4863 65.7781 9.77915C66.4852 9.07204 66.4852 8.36493 66.4852 8.36493L74.4865 15.2232C75.5104 16.1009 75.5705 17.6644 74.6169 18.618C73.6633 19.5716 72.0998 19.5115 71.2221 18.4876L64.3638 10.4863Z M65.4246 4.47532C66.7915 5.84216 66.7915 8.05823 65.4246 9.42507C64.0578 10.7919 61.8417 10.7919 60.4749 9.42507C59.108 8.05823 59.108 5.84216 60.4749 4.47532C61.8417 3.10849 64.0578 3.10849 65.4246 4.47532Z'}},
{ id:'Double Sink1',dragSize:{width:30,height:30}, shape :{ type: 'Path', data:'M1 9C1 4.58172 4.58172 1 9 1H115C119.418 1 123 4.58172 123 9V41C123 45.4183 119.418 49 115 49H9C4.58172 49 1 45.4183 1 41V9Z M7 13C7 10.7909 8.79086 9 11 9H55C57.2091 9 59 10.7909 59 13V37C59 39.2091 57.2091 41 55 41H11C8.79086 41 7 39.2091 7 37V13Z M65 13C65 10.7909 66.7909 9 69 9H113C115.209 9 117 10.7909 117 13V37C117 39.2091 115.209 41 113 41H69C66.7909 41 65 39.2091 65 37V13Z M35 27.5C35 28.8807 33.8807 30 32.5 30C31.1193 30 30 28.8807 30 27.5C30 26.1193 31.1193 25 32.5 25C33.8807 25 35 26.1193 35 27.5Z M93 27.5C93 28.8807 91.8807 30 90.5 30C89.1193 30 88 28.8807 88 27.5C88 26.1193 89.1193 25 90.5 25C91.8807 25 93 26.1193 93 27.5Z M30.9995 9C30.9995 9 31.4995 9.5 32.4995 9.5C33.4995 9.5 33.9995 9 33.9995 9L34.8078 19.5074C34.9112 20.8519 33.8481 22 32.4995 22C31.151 22 30.0878 20.8519 30.1913 19.5074L30.9995 9Z M88.9995 9C88.9995 9 89.4995 9.5 90.4995 9.5C91.4995 9.5 91.9995 9 91.9995 9L92.8078 19.5074C92.9112 20.8519 91.8481 22 90.4995 22C89.151 22 88.0878 20.8519 88.1913 19.5074L88.9995 9Z M36 5.5C36 7.433 34.433 9 32.5 9C30.567 9 29 7.433 29 5.5C29 3.567 30.567 2 32.5 2C34.433 2 36 3.567 36 5.5Z M94 5.5C94 7.433 92.433 9 90.5 9C88.567 9 87 7.433 87 5.5C87 3.567 88.567 2 90.5 2C92.433 2 94 3.567 94 5.5Z'}},
{ id:'Double Sink2',dragSize:{width:30,height:30}, shape :{ type: 'Path', data:'M31 10C31 10 31.5 10.5 32.5 10.5C33.5 10.5 34 10 34 10L34.8083 20.5074C34.9117 21.8519 33.8486 23 32.5 23C31.1514 23 30.0883 21.8519 30.1917 20.5074L31 10Z M36 6.5C36 8.433 34.433 10 32.5 10C30.567 10 29 8.433 29 6.5C29 4.567 30.567 3 32.5 3C34.433 3 36 4.567 36 6.5Z M92 10C92 10 92.5 10.5 93.5 10.5C94.5 10.5 95 10 95 10L95.8083 20.5074C95.9117 21.8519 94.8486 23 93.5 23C92.1514 23 91.0883 21.8519 91.1917 20.5074L92 10Z M97 6.5C97 8.433 95.433 10 93.5 10C91.567 10 90 8.433 90 6.5C90 4.567 91.567 3 93.5 3C95.433 3 97 4.567 97 6.5Z M1 9C1 4.58172 4.58172 1 9 1H115C119.418 1 123 4.58172 123 9V42C123 46.4183 119.418 50 115 50H9C4.58172 50 1 46.4183 1 42V9Z M6 26C6 17.1634 13.1634 10 22 10H42C50.8366 10 58 17.1634 58 26C58 34.8366 50.8366 42 42 42H22C13.1634 42 6 34.8366 6 26Z M67 26C67 17.1634 74.1634 10 83 10H103C111.837 10 119 17.1634 119 26C119 34.8366 111.837 42 103 42H83C74.1634 42 67 34.8366 67 26Z M35 27.5C35 28.8807 33.8807 30 32.5 30C31.1193 30 30 28.8807 30 27.5C30 26.1193 31.1193 25 32.5 25C33.8807 25 35 26.1193 35 27.5Z M96 27.5C96 28.8807 94.8807 30 93.5 30C92.1193 30 91 28.8807 91 27.5C91 26.1193 92.1193 25 93.5 25C94.8807 25 96 26.1193 96 27.5Z'}},
{ id:'Wash Basin5',dragSize:{width:30,height:30}, shape :{ type: 'Path', data:'M35 30.5C35 31.8807 33.8807 33 32.5 33C31.1193 33 30 31.8807 30 30.5C30 29.1193 31.1193 28 32.5 28C33.8807 28 35 29.1193 35 30.5Z M1 16C1 7.71573 7.71573 1 16 1H50C58.2843 1 65 7.71573 65 16V25C65 38.2548 54.2548 49 41 49H25C11.7452 49 1 38.2548 1 25V16Z M8 19C8 14.5817 11.5817 11 16 11H50C54.4183 11 58 14.5817 58 19V29C58 37.8366 50.8366 45 42 45H24C15.1634 45 8 37.8366 8 29V19Z M32.7433 11.0559C32.7433 11.0559 33.3556 11.4094 34.3216 11.1506C35.2875 10.8918 35.641 10.2794 35.641 10.2794L39.1413 20.2196C39.5892 21.4916 38.8594 22.8757 37.5568 23.2247C36.2542 23.5737 34.9302 22.7399 34.6821 21.4144L32.7433 11.0559Z M36.6673 6.38077C37.1676 8.24791 36.0596 10.1671 34.1925 10.6674C32.3253 11.1677 30.4062 10.0596 29.9059 8.19251C29.4056 6.32538 30.5136 4.4062 32.3807 3.9059C34.2479 3.4056 36.1671 4.51364 36.6673 6.38077Z'}},
{ id:'Wash Basin6',dragSize:{width:30,height:30}, shape :{ type: 'Path', data:'M35.0001 28.5C35.0001 29.8807 33.8808 31 32.5001 31C31.1194 31 30.0001 29.8807 30.0001 28.5C30.0001 27.1193 31.1194 26 32.5001 26C33.8808 26 35.0001 27.1193 35.0001 28.5Z M1.28589 13.2859C1.09596 12.4312 0.977151 11.5551 1.06632 10.6841C1.66875 4.79991 6.32194 1 12.5001 1H52.5001C58.5423 1 63.5414 4.63437 64.3773 10.2983C64.5425 11.4183 64.3399 12.5518 64.0243 13.639L62.3952 19.2503C60.8466 24.5844 62.0419 30.3056 61.6763 35.8479C61.1084 44.4589 52.314 49 42.0001 49H21.0001C10.0687 49 2.8847 41.5184 2.94574 31.8839C2.97267 27.6322 3.51411 23.3129 2.59178 19.1624L1.28589 13.2859Z M8.00013 19C8.00013 14.5817 11.5819 11 16.0001 11H49.0001C53.4184 11 57.0001 14.5817 57.0001 19V29C57.0001 37.8366 49.8367 45 41.0001 45H24.0001C15.1636 45 8.00013 37.8366 8.00013 29V19Z M31.7434 11.0559C31.7434 11.0559 32.3558 11.4094 33.3217 11.1506C34.2876 10.8918 34.6412 10.2794 34.6412 10.2794L38.1414 20.2196C38.5893 21.4916 37.8595 22.8757 36.5569 23.2247C35.2543 23.5737 33.9303 22.7399 33.6822 21.4144L31.7434 11.0559Z M35.6675 6.38077C36.1678 8.24791 35.0597 10.1671 33.1926 10.6674C31.3255 11.1677 29.4063 10.0596 28.906 8.19251C28.4057 6.32538 29.5137 4.4062 31.3809 3.9059C33.248 3.4056 35.1672 4.51364 35.6675 6.38077Z'}},
{ id:'Bath Tub',dragSize:{width:50,height:30},shape :{ type: 'Path', data:"M1 9C1 4.58172 4.58172 1 9 1H84C88.4183 1 92 4.58172 92 9V40C92 44.4183 88.4183 48 84 48H9C4.58172 48 1 44.4183 1 40V9Z M12 24.5C12 14.2827 20.2827 6 30.5 6H61.5C71.7173 6 80 14.2827 80 24.5C80 34.7173 71.7173 43 61.5 43H30.5C20.2827 43 12 34.7173 12 24.5Z M11.5 26.5C11.5 26.5 12 26 12 25C12 24 11.5 23.5 11.5 23.5L22.0074 22.6917C23.3519 22.5883 24.5 23.6514 24.5 25C24.5 26.3486 23.3519 27.4117 22.0074 27.3083L11.5 26.5Z M8 21.5C9.933 21.5 11.5 23.067 11.5 25C11.5 26.933 9.933 28.5 8 28.5C6.067 28.5 4.5 26.933 4.5 25C4.5 23.067 6.067 21.5 8 21.5Z"}},
{ id:'Bath Tub1',dragSize:{width:50,height:30},shape :{ type: 'Path', data:'M1 24.5C1 11.5213 11.5213 1 24.5 1H68.5C81.4787 1 92 11.5213 92 24.5C92 37.4787 81.4787 48 68.5 48H24.5C11.5213 48 1 37.4787 1 24.5Z M9 24.5C9 14.7042 17.6278 7.15038 27.3377 8.44503L43.262 10.5683C45.4112 10.8548 47.5888 10.8548 49.738 10.5683L65.6623 8.44503C75.3722 7.15038 84 14.7042 84 24.5C84 34.2958 75.3722 41.8496 65.6623 40.555L49.738 38.4317C47.5888 38.1452 45.4112 38.1452 43.262 38.4317L27.3377 40.555C17.6278 41.8496 9 34.2958 9 24.5Z M18 24.5C18 18.701 22.701 14 28.5 14H62.5C68.299 14 73 18.701 73 24.5C73 30.299 68.299 35 62.5 35H28.5C22.701 35 18 30.299 18 24.5Z'}},
{ id:'Bath Tub2',dragSize:{width:50,height:30},shape :{ type: 'Path', data:'M1 9C1 4.58172 4.58172 1 9 1H84C88.4183 1 92 4.58172 92 9V40C92 44.4183 88.4183 48 84 48H9C4.58172 48 1 44.4183 1 40V9Z M12 11C12 8.23858 14.2386 6 17 6H75C77.7614 6 80 8.23858 80 11V38C80 40.7614 77.7614 43 75 43H17C14.2386 43 12 40.7614 12 38V11Z M11.5 26.5C11.5 26.5 12 26 12 25C12 24 11.5 23.5 11.5 23.5L22.0074 22.6917C23.3519 22.5883 24.5 23.6514 24.5 25C24.5 26.3486 23.3519 27.4117 22.0074 27.3083L11.5 26.5Z M8 21.5C9.933 21.5 11.5 23.067 11.5 25C11.5 26.933 9.933 28.5 8 28.5C6.067 28.5 4.5 26.933 4.5 25C4.5 23.067 6.067 21.5 8 21.5Z'}},
{ id:'Bath Tub3',dragSize:{width:50,height:30},shape :{ type: 'Path', data:'M1 9C1 4.58172 4.58172 1 9 1H84C88.4183 1 92 4.58172 92 9V40C92 44.4183 88.4183 48 84 48H9C4.58172 48 1 44.4183 1 40V9Z M12 8C12 6.89543 12.8954 6 14 6H61.5C71.7173 6 80 14.2827 80 24.5C80 34.7173 71.7173 43 61.5 43H14C12.8954 43 12 42.1046 12 41V8Z M11.5 26.5C11.5 26.5 12 26 12 25C12 24 11.5 23.5 11.5 23.5L22.0074 22.6917C23.3519 22.5883 24.5 23.6514 24.5 25C24.5 26.3486 23.3519 27.4117 22.0074 27.3083L11.5 26.5Z M8 21.5C9.933 21.5 11.5 23.067 11.5 25C11.5 26.933 9.933 28.5 8 28.5C6.067 28.5 4.5 26.933 4.5 25C4.5 23.067 6.067 21.5 8 21.5Z'}},
]

//Initializes the symbol palette
var palette = new ej.diagrams.SymbolPalette({
expandMode: 'Multiple' ,
enableSearch: true ,
width: '100%',
height: '100%',
palettes: [
    { id: 'door', expanded: true, symbols: doors, iconCss: 'e-ddb-icons e-flow', title: 'Doors' },
    { id: 'diningRoom', expanded: true, symbols: diningRoom, iconCss: 'e-ddb-icons e-flow', title: 'Dining Room' },
    { id: 'kitchen', expanded: true, symbols: kitchen, iconCss: 'e-ddb-icons e-flow', title: 'Kitchen'},
    { id: 'bedRoom', expanded: true, symbols: bedRoom, iconCss: 'e-ddb-icons e-flow', title: 'Bed Room' },
    { id: 'livingRoom', expanded: true, symbols: livingRoom, iconCss: 'e-ddb-icons e-flow', title: 'Living Room' },
    { id: 'bathRoom', expanded: true, symbols: bathRoom, iconCss: 'e-ddb-icons e-flow', title: 'Bath Room' },
  ],
    
    getNodeDefaults: function (node) {
      if(node.id === 'Door close'||  node.id === 'Double door close')
      {
        node.width = 35;
        node.height = 35;
      }
      else if(node.id ==='Circle Study Table'||node.id ==='Circular Table for Two' ||node.id ==='Circle Study Table1' ||node.id ==='Circle Study Table2' ||node.id ==='Circle Study Table3'){
        node.width = 25;
        node.height = 25;
      }
      else if(node.id ==='Circle Dining Table'){
        node.width = 27;
        node.height = 27
      }
      else if(node.id ==='Oblong Dining Table' ||node.id ==='Rectangle Dining Table'|| node.id ==='Oval Dining Table' ){
        node.width =35;
        node.height = 20;
      }
      else if(node.id === 'Rectangle Study Table'  || node.id === 'Rectangle Study Table1'||node.id === 'Rectangular Table for Two' )
      {
        node.width = 30;
        node.height = 15;
      }
      else if(node.id ==='Small Gas Range')
      {
        node.width = 50;
        node.height =25;
      }
      else if(node.id === 'Large Gas Range' ||node.id ==='Large Gas Range1'  )
      {
        node.width = 50;
        node.height = 25;
      }
      else if(node.id ==='Refrigerator' ||node.id ==='Water Cooler'||node.id ==='Double Sink')
      {
        node.width = 25;
        node.height = 25;
      }
      else if(node.id ==='Double bed' ||node.id ==='Double bed1')
      {
        node.width = 40;
        node.height = 30;
      }
      else if(node.id ==='Single bed' ||node.id ==='Single bed1')
      {
        node.width = 18;
        node.height = 30;
      }
      else if(node.id ==='Book Case' )
      {
        node.width = 30;
        node.height = 30;
      }
      else if(node.id ==='Warddrobe'||node.id ==='Warddrobe1')
      {
        node.width = 35;
        node.height = 20;
      }
      else if(node.id ==='Matte'||node.id ==='Matte1')
      {
        node.width = 20;
        node.height = 10;
      }
      else if(node.id ==='Large Plant' ||node.id ==='Small Plant'||node.id ==='Lamp light')
      {
        node.width = 20;
        node.height =20;
      }
      else if(node.id ==='TV')
      {
        node.width =40;
        node.height =12;
      }
      else if(node.id ==='Flat TV' ||node.id ==='Flat TV1')
      {
        node.width = 65;
        node.height =12;
      }
      else if(node.id ==='Chair' ||node.id ==='Chair1')
      {
        node.width = 40;
        node.height =30;
      }
      else if(node.id ==='Sofa' ||node.id ==='Double Sofa')
      {
        node.width = 50;
        node.height =20;
      }
      
      else if(node.id ==='Single Sofa'|| node.id ==='Couch')
      {
        node.width = 25;
        node.height =20;
      }
      else if(node.id ==='Lounge'|| node.id ==='Piano')
      {
        node.width = 50;
        node.height =20;
      }
      else if( node.id ==='Stool' )
      {
        node.width = 25;
        node.height =25;
      }
      else if( node.id ==='Piano' )
      {
        node.width = 20;
        node.height =20;
      }
      else if(node.id ==='Printer'||node.id ==='Laptop')
      {
        node.width = 25;
        node.height =25;
      }
      else if(node.id ==='Window1' || node.id ==='Window2')
      {
        node.width = 60;
        node.height =5;
      }
      else if( node.id ==='Window Garden' )
      {
        node.width = 60;
        node.height =10;
      }
      else if(node.id ==='Room' || node.id ==='T Room' || node.id ==='L Room' || node.id ==='Wall Corner' || node.id ==='Wall Corner1'|| node.id ==='T Wall' || node.id ==='Elevator')
      {
        node.width = 30;
        node.height =30;
      }
      else if(node.id ==='Staircase' || node.id ==='Staircase1' || node.id ==='Staircase2' )
      {
        node.width = 40;
        node.height =15;
      }
        else if(node.id === 'Toilet1' || node.id === 'Toilet2' || node.id === 'Corner Shower'|| node.id === 'Shower'||node.id === 'Wash Basin1' ||node.id === 'Wash Basin2' || node.id === 'Wash Basin3'|| node.id === 'Wash Basin5' || node.id === 'Wash Basin6' || node.id === 'Double Sink4' || node.id === 'Double Sink'|| node.id === 'Double Sink1' || node.id === 'Double Sink2'|| node.id === 'Refrigerator'|| node.id === 'Water Cooler' ){
          node.width = 30; 
          node.height = 22;
        }
        else if(node.id === 'Bath Tub' || node.id === 'Bath Tub1' || node.id === 'Bath Tub2' || node.id === 'Bath Tub3' || node.id === 'Bath Tub4'){
          node.width = 40;
          node.height =22;
        }
        else {
          node.width = 50;
          node.height = 50;
        }  
    },
    symbolMargin: { left: 5, right: 5, top: 5, bottom: 5 },
    getSymbolInfo: function (symbol) {
        return { tooltip : symbol.id.replace('_',' ')};
    }
});
palette.appendTo('#symbolpalette');

//Initialization of diagram
  var diagram = new ej.diagrams.Diagram({
    width: '100%',
    height: '100%',
    nodes : nodes,
    connectors : connectors,
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
        background: { color: '#FFFFFF' }, width: 816, height: 1056, multiplePage: false, margin: { left: 5, top: 5 },
        orientation: 'Landscape'
    },
    contextMenuSettings: {
        show: true,
        showCustomMenuOnly: false,
    },
    scrollSettings: { canAutoScroll: false, scrollLimit: 'Diagram', minZoom: 0.25, maxZoom: 30 },
    // selectedItems: { constraints: ej.diagrams.SelectorConstraints.All & ~ej.diagrams.SelectorConstraints.ToolTip },
    getNodeDefaults: function (node, diagram) {
      node.constraints= ej.diagrams.NodeConstraints.Default &~ (ej.diagrams.NodeConstraints.InConnect | ej.diagrams.NodeConstraints.OutConnect );
      
      if (node.style) {
            if (node.style.fill === 'transparent' && !node.children) {
                node.style.fill = 'red';
            }
        }
        var node1 = {
            style: { strokeWidth: 1 },
           
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
    historyChange: function (args) { DiagramClientSideEvents.prototype.historyChange(args); },
    selectionChange: function (args) { DiagramClientSideEvents.prototype.selectionChange(args); },
    positionChange: function (args) { DiagramClientSideEvents.prototype.positionChange(args); },
    sizeChange: function (args) { DiagramClientSideEvents.prototype.sizeChange(args); },
    rotateChange: function (args) { DiagramClientSideEvents.prototype.rotateChange(args); },
    dragEnter:function (args) { DiagramClientSideEvents.prototype.dragEnter(args); },
    created: function (args) { DiagramClientSideEvents.prototype.created(args);},
});
diagram.appendTo('#diagram');


var fileUploadDialog = new ej.popups.Dialog({
  width: '500px',
  height: '485px',
  header: 'Upload File',
  target: document.body,
  isModal: true,
  animationSettings: { effect: 'None' },
  buttons: getUploadButtons(),
  visible: false,
  showCloseIcon: true,
  allowDragging: true,
  content: ' <div id="uploadDialogContent" class="db-upload-content firstPage"> <div id="tooltip"> <div id="uploadInformationDiv" class="row db-dialog-prop-row" style="margin-top: 0px;">' +
  ' <div class="row"> <div class="row" style="font-size: 12px;font-weight: 500;color: black;"><div class="db-info-text">Choose Format</div>' +
  ' <div class="db-format-type" style="display: none"> </div> </div><div class="row db-dialog-child-prop-row"><div class="col-xs-3 db-prop-col-style">' +
  ' <input id="csvFormat" type="radio"></div> <div class="col-xs-3 db-prop-col-style"><input id="xmlFormat" type="radio"></div> <div class="col-xs-3 db-prop-col-style">' +
  '<input id="jsonFormat" type="radio"> </div> </div> </div> <div class="row db-dialog-prop-row" style="padding: 10px; background-color: #FFF7B5; border: 1px solid #FFF7B5">' +
  '<div class="db-info-parent" style="width: 10%; background-color:transparent; height: 60px;"></div> <div style="float:left; width: calc(90% - 5px)">' +
  ' <ul style="padding-left: 25px; margin-bottom: 0px"><li style="margin-bottom: 5px"><span id="descriptionText1" style="color: #515151;font-size: 11px;line-height: 15px;">Makesure that the every column of your table has a header</span>' +
  '</li><li><span id="descriptionText2" style="color: #515151;font-size: 11px;line-height: 15px;">Each employee should have a reporting person (except for top most employee of the organization) and it should be indicated by any field from your data source.</span></li></ul>' +
  '</div></div><div class="row db-dialog-prop-row"><button id="btnDownloadFile"></button></div><div class="row"> <div id="dropArea">' +
  '<span id="dropRegion" class="droparea"> Drop files here or <a href="" id="browseFile"><u>Browse</u></a></span><input type="file" id="defaultfileupload" name="UploadFiles"/>' +
  '</div></div></div><div id="parentChildRelationDiv" class="row db-dialog-prop-row"> <div class="row db-dialog-child-prop-row" style="margin-top:20px">' +
  '<div class="row"><div class="db-info-text">Employee Id</div><div class="db-info-style db-employee-id"></div></div><div class="row db-dialog-child-prop-row">' +
  '<input type="text" id="employeeId"/></div></div><div class="row db-dialog-prop-row"><div class="row"><div class="db-info-text"> Supervisor Id</div>' +
  ' <div class="db-info-style db-supervisor-id"> </div> </div> <div class="row db-dialog-child-prop-row"><input type="text" id="superVisorId"/></div></div></div>' +
  '<div id="moreInformationDiv" class="row db-dialog-prop-row"><div id="bindingFields" class="row"><div class="row"><div class="db-info-text">Name</div>' +
  '<div class="db-info-style db-nameField-id"></div></div><div class="row db-dialog-child-prop-row"><input type="text" id="orgNameField"/></div></div>' +
  '<div id="bindingFields" class="row db-dialog-prop-row" style="margin-top:20px"><div class="row"><div class="db-info-text">Binding Fields</div><div class="db-info-style db-bindingField-id">' +
  '</div></div><div class="row db-dialog-child-prop-row"><input type="text" id="orgBindingFields" /></div></div><div id="imageFields" class="row db-dialog-prop-row">' +
  '<div class="row"><div class="db-info-text">Image Field</div><div class="db-info-style db-imageField-id"></div></div>' +
  '<div class="row db-dialog-child-prop-row"><input type="text" id="orgImageField"/></div></div> <div id="additionalFields" class="row db-dialog-prop-row">' +
  '<div class="row"><div class="db-info-text">Additional Fields</div><div class="db-info-style db-additionalField-id"></div></div><div class="row db-dialog-child-prop-row">' +
  '<input type="text" id="orgAdditionalField"/></div></div></div></div></div>'
});
fileUploadDialog.appendTo('#fileUploadDialog');

// upload template for fileupload control
var defaultfileupload = new ej.inputs.Uploader({
  asyncSettings: {
      saveUrl: 'https://aspnetmvc.syncfusion.com/services/api/uploadbox/Save',
      removeUrl: 'https://aspnetmvc.syncfusion.com/services/api/uploadbox/Remove'
  },
  success: onUploadSuccess,
  failure: onUploadFailure,
  progress: onUploadFileSelected,
  allowedExtensions: orgDataSettings.extensionType
});
defaultfileupload.appendTo('#defaultfileupload');

//File menu 
var btnFileMenu = new ej.splitbuttons.DropDownButton({
  cssClass: 'db-dropdown-menu',
  items:DropDownDataSources.prototype.getFileMenuItems(),
  content: 'File',
  select: menuClick,
  beforeItemRender: beforeItemRender,
  beforeOpen: arrangeMenuBeforeOpen,
  beforeClose: arrangeMenuBeforeClose
});
btnFileMenu.appendTo('#btnFileMenu');

//Edit menu
var btnEditMenu=new ej.splitbuttons.DropDownButton({
  cssClass: 'db-dropdown-menu',
  items:DropDownDataSources.prototype.getEditMenuItems(),
  content: 'Edit',
  select: menuClick,
  beforeItemRender: beforeItemRender,
  beforeOpen: arrangeMenuBeforeOpen,
  beforeClose: arrangeMenuBeforeClose
});
btnEditMenu.appendTo('#btnEditMenu');

//Insert Menu
var btnInsertMenu=new ej.splitbuttons.DropDownButton({
  cssClass: 'db-dropdown-menu',
  items: DropDownDataSources.prototype.getInsertMenuItems (),
  content: 'Insert',
  select: menuClick,
  beforeItemRender: beforeItemRender,
  beforeOpen: arrangeMenuBeforeOpen,
  beforeClose: arrangeMenuBeforeClose
});
btnInsertMenu.appendTo('#btnInsertMenu');

//Context menu items of design menu
var designContextMenu = new ej.navigations.ContextMenu({
  animationSettings: { effect: 'None' },
  items: DropDownDataSources.prototype.getDesignMenuItems(),
  onOpen: arrangeContextMenuOpen,
  cssClass: "designMenu",
  beforeItemRender: beforeItemRender,
  select: menuClick,
  beforeClose: arrangeMenuBeforeClose
});
designContextMenu.appendTo('#designContextMenu');

//Design menu
var btnDesignMenu = new ej.splitbuttons.DropDownButton({
  cssClass: 'db-dropdown-menu',
  target: '.e-contextmenu-wrapper.designMenu',
  content: 'Design',
  beforeItemRender: beforeItemRender,
  beforeOpen: arrangeMenuBeforeOpen,
  beforeClose: arrangeMenuBeforeClose
});
btnDesignMenu.appendTo('#btnDesignMenu');

//View Menu
var btnViewMenu = new ej.splitbuttons.DropDownButton({
    cssClass: 'db-dropdown-menu',
    items:DropDownDataSources.prototype.getViewMenuItems(),
    content: 'View',
    select: menuClick,
    beforeItemRender: beforeItemRender,
    beforeOpen: arrangeMenuBeforeOpen,
    beforeClose: arrangeMenuBeforeClose
});
btnViewMenu.appendTo('#btnViewMenu');

//Methods define the menu click
function menuClick(args) {
  var buttonElement = document.getElementsByClassName('e-btn-hover')[0];
  if (buttonElement) {
      buttonElement.classList.remove('e-btn-hover');
  }
  var command  = args.item.text.replace(/[' ']/g, '').toLowerCase();
  switch(command){
    case 'new':
            diagram.clear();
            break;
    case 'save':
            download(diagram.saveDiagram());
            break;
    case 'export':
          exportDialog.show();
          break;
    case 'open':
            document.getElementsByClassName('e-file-select-wrap')[0].querySelector('button').click();
            break;
    case 'print':
          printSettings.pageHeight = diagram.pageSettings.pageHeight;
          printSettings.pageWidth = diagram.pageSettings.pageWidth;
          printSettings.paperSize = diagram.pageSettings.paperSize;
          printSettings.isPortrait = diagram.pageSettings.isPortrait;
          printSettings.isLandscape = !diagram.pageSettings.isPortrait;
          printDialog.show();
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
            openUploadBox(false, '.jpg,.png,.bmp');
            break;
    case 'showguides':
            diagram.snapSettings.constraints = diagram.snapSettings.constraints ^ ej.diagrams.SnapConstraints.SnapToObject;
            args.item.iconCss = args.item.iconCss ? '' : 'sf-icon-check-tick';
            break;
    case 'showgrid':
            diagram.snapSettings.constraints = diagram.snapSettings.constraints ^ ej.diagrams.SnapConstraints.ShowLines;
            args.item.iconCss = args.item.iconCss ? '' : 'sf-icon-check-tick';
            break;
    case 'snaptogrid':
            diagram.snapSettings.constraints = diagram.snapSettings.constraints ^ ej.diagrams.SnapConstraints.SnapToLines;
            args.item.iconCss = args.item.iconCss ? '' : 'sf-icon-check-tick';
            break;
    case 'fittoscreen':
            diagram.fitToPage({ mode: 'Page', region: 'Content', margin: { left: 0, top: 0, right: 0, bottom: 0 } });
            args.item.iconCss = args.item.iconCss ? '' : 'sf-icon-check-tick';
            break;
    case 'fittowidth':
            diagram.fitToPage({ mode: 'Width', region: 'Content', margin: { left: 0, top: 0, right: 0, bottom: 0 } });
            break;
    case 'showrulers':
            diagram.rulerSettings.showRulers = !diagram.rulerSettings.showRulers;
            args.item.iconCss = args.item.iconCss ? '' : 'sf-icon-check-tick';
            break;
    case 'pagebreak':
          args.item.iconCss = args.item.iconCss ? '' : 'sf-icon-check-tick';
          if(args.item.iconCss){
            diagram.pageSettings.showPageBreaks = true;
            showPageBreaks.checked = true;
          }
          else{
            diagram.pageSettings.showPageBreaks = false;
            showPageBreaks.checked = false;
          }
          break;
          case 'landscape':
              args.item.parentObj.items[1].iconCss = '';
              args.item.iconCss = 'sf-icon-check-tick';
              diagram.pageSettings.orientation = 'Landscape';
              document.getElementById('pageLandscape').classList.add('e-active');
              document.getElementById('pagePortrait').classList.remove('e-active');
              break;
          case 'portrait':
              args.item.parentObj.items[0].iconCss = '';
              args.item.iconCss = 'sf-icon-check-tick';
              diagram.pageSettings.orientation = 'Portrait';
              document.getElementById('pagePortrait').classList.add('e-active');
              document.getElementById('pageLandscape').classList.remove('e-active');
              break;
          case 'letter(8.5inx11in)':
          case 'legal(8.5inx14in)':
          case 'a3(297mmx420mm)':
          case 'a4(210mmx297mm)':
          case 'a5(148mmx210mm)':
          case 'a6(105mmx148mm)':
          case 'tabloid(279mmx432mm)':
            UtilityMethods.prototype.paperListChange(args)
            pageSettingsList.text = args.item.text;
            UtilityMethods.prototype.updateSelection(args.item)
            break;
    case 'insertlink':
      UtilityMethods.prototype.toolbarInsertClick(args)
        break;
  }
}
//Methods define the short cut keys
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
function getUploadButtons() {
  var buttons = [];
  buttons.push({
      click:UtilityMethods.prototype.btnCancelClick.bind(this),
      buttonModel: { content: 'Cancel', cssClass: 'e-outline', isPrimary: true  }
  });
  // buttons.push({
  //     click: btnUploadNext.bind(this),
  //     buttonModel: { content: 'Next', cssClass: 'e-flat e-db-primary', isPrimary: true },
  // });
  return buttons;
}

//DropDown list for paperlist in property panel
var pageSettingsList = new ej.dropdowns.DropDownList({
  dataSource:DropDownDataSources.prototype.paperList(),
  change: function (args) { UtilityMethods.prototype.paperListChange(args) },
  fields: { text: 'text', value: 'value' },
  index: 0
});
pageSettingsList.appendTo('#pageSettingsList');


//Button for page portrait in property panel
var pagePortrait = new ej.buttons.Button({
  label :'Portrait',
  iconCss: 'sf-icon-portrait', isToggle:true,cssClass: `e-flat`,
});
pagePortrait.appendTo('#pagePortrait');
document.getElementById("pagePortrait").onclick = (args)=>{
  UtilityMethods.prototype.pageOrientationChange(args)
  document.getElementById('pageLandscape').classList.remove('e-active');
}
//Button for page Landscape in property panel
var pageLandscape = new ej.buttons.Button({
  label :'Landscape',
  iconCss: 'sf-icon-landscape', isToggle:true,cssClass: `e-active`,
});
pageLandscape.appendTo('#pageLandscape');
document.getElementById("pageLandscape").onclick = (args)=>{
  UtilityMethods.prototype.pageOrientationChange(args)
  document.getElementById('pagePortrait').classList.remove('e-active');
}

//Numeric text box for page width in property panel
var pageWidth = new ej.inputs.NumericTextBox({
  min: 100,
  format: 'n0',
  value: diagram.pageSettings.width,
  change: function (args) {UtilityMethods.prototype.pageDimensionChange(args); }
});
pageWidth.appendTo('#pageWidth');

//Numeric text box for page height in property panel
var pageHeight = new ej.inputs.NumericTextBox({
  min: 100,
  format: 'n0',
  value: diagram.pageSettings.height,
  change: function (args) {UtilityMethods.prototype.pageDimensionChange(args); }
});
pageHeight.appendTo('#pageHeight');

//Color picker for the background page color change in property panel
var pageBgColor = new ej.inputs.ColorPicker({
  mode: 'Palette',
  showButtons:false,
  width: '100%',
  value: diagram.pageSettings.background.color,
  change: function (args) { UtilityMethods.prototype.pageBackgroundChange1(args); }
});
pageBgColor.appendTo('#pageBgColor');

//Page Breaks in property panel
var showPageBreaks = new ej.buttons.CheckBox({ label: 'Page Breaks', checked: diagram.pageSettings.pageBreaks, change: function (args) { UtilityMethods.prototype.pageBreaksChange(args); } });
showPageBreaks.appendTo('#showPageBreaks');

//Numeric text box for node offsetX 
var nodeOffsetX = new ej.inputs.NumericTextBox({
  format: 'n0',
  change: function(args) {
      if(args.isInteracted) {
         nodeProperties.offsetX.value = args.value;
         PropertyChange.prototype.nodePropertyChange({ propertyName: 'offsetX', propertyValue: args });
      }
  }
});
nodeOffsetX.appendTo('#nodeOffsetX');
nodeProperties.offsetX = nodeOffsetX;

//Numeric text box for node offsetY 
var nodeOffsetY = new ej.inputs.NumericTextBox({
  format: 'n0',
  change: function(args) {
      if(args.isInteracted) {
        nodeProperties.offsetY.value = args.value;
        PropertyChange.prototype.nodePropertyChange({ propertyName: 'offsetY', propertyValue: args });
      }
  }
});
nodeOffsetY.appendTo('#nodeOffsetY');
nodeProperties.offsetY = nodeOffsetY;

//Numeric text box for node width 
var nodeWidth = new ej.inputs.NumericTextBox({
  format: 'n0',
  min: 1,
  change: function(args) {
      if(args.isInteracted) {
        nodeProperties.width.value = args.value;
        PropertyChange.prototype.nodePropertyChange({ propertyName: 'width', propertyValue: args });
      }
  }
});
nodeWidth.appendTo('#nodeWidth');
nodeProperties.width = nodeWidth;

//Numeric text box for node height 
var nodeHeight = new ej.inputs.NumericTextBox({
  format: 'n0',
  min: 1,
  change: function(args) {
      if(args.isInteracted) {
       nodeProperties.height.value = args.value;
       PropertyChange.prototype.nodePropertyChange({ propertyName: 'height', propertyValue: args });
      }
  }
});
nodeHeight.appendTo('#nodeHeight');
nodeProperties.height = nodeHeight;

//Button for aspect ratio
var aspectRatioBtn = new ej.buttons.Button({
  iconCss: 'sf-icon-unlock', isToggle:true,cssClass: `e-flat`
});
aspectRatioBtn.appendTo('#aspectRatioBtn');
nodeProperties.aspectRatio = aspectRatioBtn;

document.getElementById('aspectRatioBtn').onclick = (args) =>{
  UtilityMethods.prototype.aspectRatioClick(args);

}

var rotateIconBtn = new ej.buttons.Button({ iconCss: 'sf-icon-rotate' });
rotateIconBtn.appendTo('#rotateIconBtn');

//Numeric text box for node rotate angle
var nodeRotateAngle = new ej.inputs.NumericTextBox({
  format: 'n0',
  change: function(args) {
      nodeProperties.rotateAngle.value = args.value;
      PropertyChange.prototype.nodePropertyChange({ propertyName: 'rotateAngle', propertyValue: args });
  }
});
nodeRotateAngle.appendTo('#nodeRotateAngle');
nodeProperties.rotateAngle = nodeRotateAngle;

//Button for insert link and insert image 
var toolbarNodeInsert = new ej.buttons.Button({
       iconCss: 'sf-icon-insert_link', tooltipText: 'Insert Link', cssClass: 'e-outline',isPrimary:true 
});
toolbarNodeInsert.appendTo('#insertlink');
document.getElementById("insertlink").onclick = (args)=> {
  UtilityMethods.prototype.toolbarInsertClick(args) ;
  document.getElementById('insertlink').classList.remove('e-active');
}
 toolbarNodeInsert = new ej.buttons.Button({
  iconCss: 'sf-icon-insert_image', tooltipText: 'Insert Image', cssClass: 'e-outline' ,isPrimary:true
});
toolbarNodeInsert.appendTo('#insertimage');
document.getElementById("insertimage").onclick = (args)=> {
  UtilityMethods.prototype.toolbarInsertClick(args);
  document.getElementById('insertimage').classList.remove('e-active');
}

//node color
var nodeFillColor = new ej.inputs.ColorPicker({
  mode: 'Palette',
  showButtons:false,
  change: function(args) {
    PropertyChange.prototype.nodePropertyChange({propertyName: 'fillColor', propertyValue: args.currentValue.hex});
  }
});
nodeFillColor.appendTo('#nodeFillColor');
nodeProperties.fillColor = nodeFillColor;


//node stroke color
var nodeStrokeColor = new ej.inputs.ColorPicker({
  mode: 'Palette',
  showButtons:false,
  change: function(args) {
      nodeProperties.strokeColor.value = args.currentValue.hex;
      PropertyChange.prototype.nodePropertyChange({ propertyName: 'strokeColor', propertyValue: args });
  }
});
nodeStrokeColor.appendTo('#nodeStrokeColor');
nodeProperties.strokeColor = nodeStrokeColor;

//node border style
var nodeBorderStyle = new ej.dropdowns.DropDownList({
  dataSource: DropDownDataSources.prototype.borderStyles(),
  fields: { text: 'text', value: 'value' },
  index: 0,
  popupWidth: '160px',
  itemTemplate: '<div class="db-ddl-template-style"><span class="${className}"></span></div>',
  valueTemplate: '<div class="db-ddl-template-style"><span class="${className}"></span></div>',
  change: function (args) {
      nodeProperties.strokeStyle.value= args.itemData.text;
      PropertyChange.prototype.nodePropertyChange({ propertyName: 'strokeStyle', propertyValue: args });
  }
});
nodeBorderStyle.appendTo('#nodeBorderStyle');
nodeProperties.strokeStyle = nodeBorderStyle;

//node stroke width
var nodeStrokeWidth = new ej.inputs.NumericTextBox({
   min: 0,
   step: 0.5,
   change: function (args) {
      nodeProperties.strokeWidth.value= args.value;
      PropertyChange.prototype.nodePropertyChange({ propertyName: 'strokeWidth', propertyValue: args });
  }
});
nodeStrokeWidth.appendTo('#nodeStrokeWidth');
nodeProperties.strokeWidth = nodeStrokeWidth;

//node opacity slider
var nodeOpacitySlider = new ej.inputs.Slider({
   min: 0,
   max: 100,
   step: 10,
   type: 'MinRange',
   value: 0,
   change: function (args) {
      nodeProperties.opacity.value= args.value;
      PropertyChange.prototype.nodePropertyChange({ propertyName: 'opacity', propertyValue: args });
  }
});
nodeOpacitySlider.appendTo('#nodeOpacitySlider');
nodeProperties.opacity =  nodeOpacitySlider;

var lineColor = new ej.inputs.ColorPicker({
  mode: 'Palette',
  showButtons:false,
  change: function(args) {
     connectorProperties.lineColor.value = args.currentValue.hex;
     PropertyChange.prototype.connectorPropertyChange({ propertyName: 'lineColor', propertyValue: args });
  }
});
lineColor.appendTo('#lineColor');
connectorProperties.lineColor = lineColor;

var lineWidth = new ej.inputs.NumericTextBox({
  min: 0.5,
  step: 0.5,
  max :10,
  change: function(args) {
      connectorProperties.lineWidth.value = args.value;
      PropertyChange.prototype.connectorPropertyChange({ propertyName: 'lineWidth', propertyValue: args });
  }
});
lineWidth.appendTo('#lineWidth');
connectorProperties.lineWidth = lineWidth;

var default1 = new ej.inputs.Slider({
  min: 0,
  max: 100,
  step: 10,
  type: 'MinRange',
  value: 0,
  change: function (args) {
      connectorProperties.opacity.value= args.value;
      PropertyChange.prototype.connectorPropertyChange({ propertyName: 'opacity', propertyValue: args });
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

//method for menumouse hover 
function menumouseover(args) {
  var target = args.target;
  if (target && (target.className === 'e-control e-dropdown-btn e-lib e-btn db-dropdown-menu' ||
      target.className === 'e-control e-dropdown-btn e-lib e-btn db-dropdown-menu e-ddb-active')) {
      if (this.buttonInstance && this.buttonInstance.id !== target.id) {
          if (this.buttonInstance.getPopUpElement().classList.contains('e-popup-open')) {
              this.buttonInstance.toggle();
              var buttonElement = document.getElementById(this.buttonInstance.element.id);
              buttonElement.classList.remove('e-btn-hover');
          }
      }
      var button1 = target.ej2_instances[0];
      this.buttonInstance = button1;
      if (button1.getPopUpElement().classList.contains('e-popup-close')) {
          button1.toggle();
          if (button1.element.id === 'btnArrangeMenu') {
              selectedItem.utilityMethods.enableArrangeMenuItems(selectedItem);
          }
          var buttonElement1 = document.getElementById(this.buttonInstance.element.id);
          buttonElement1.classList.add('e-btn-hover');
      }
  } else {
      if (ej.base.closest(target, '.e-dropdown-popup') === null && ej.base.closest(target, '.e-dropdown-btn') === null) {
          if (this.buttonInstance && this.buttonInstance.getPopUpElement().classList.contains('e-popup-open')) {
              this.buttonInstance.toggle();
              var buttonElement2 = document.getElementById(this.buttonInstance.element.id);
              buttonElement2.classList.remove('e-btn-hover');
          }
      }
  }
}

function openUploadBox (isOpen, extensionType) {
  var defaultUpload = document.getElementById('defaultfileupload');
  defaultUpload = defaultUpload.ej2_instances[0];
  defaultUpload.clearAll();
  this.orgDataSettings.extensionType = defaultUpload.allowedExtensions = extensionType;
  defaultUpload.dataBind();
  this.isOpen = isOpen;
  document.getElementsByClassName('e-file-select-wrap')[0].children[0].click();
};

//method for enable arrange menu items
 function enableArrangeMenuItems (selectedItem) {
  var contextInstance = document.getElementById('designContextMenu');
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

//method for enable menu items
 function enableMenuItems (itemText, selectedItem) {
  var selectedDiagram = diagram.ej2_instances ? diagram.ej2_instances[0] : diagram;
  var selectedItems = selectedDiagram.selectedItems.nodes;
  selectedItems = selectedItems.concat(selectedDiagram.selectedItems.connectors);
  if (itemText) {
      var commandType = itemText.replace(/[' ']/g, '');
      if (selectedItems.length === 0) {
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
      // if(selectedItems.nodes.length>0){
      //   switch (commandType.toLowerCase()) {
      //     case 'insert link':
      //         return true; 
      //     case 'insert picture':
      //         return true; 
      // }
      // }
      if (!(diagram.commandHandler.clipboardData.pasteIndex !== undefined

        && diagram.commandHandler.clipboardData.clipObject !==undefined) && itemText === 'Paste') {

        return true;

    }
      if (itemText === 'Undo' && diagram.historyManager.undoStack.length === 0) {
          return true;
      }
      if (itemText === 'Redo' && diagram.historyManager.redoStack.length === 0) {
          return true;
      }
      if(itemText === 'Insert Link' || itemText === 'Insert Picture'  )
      {
        if(selectedItems.length === 0){
          return true;
        }
        else
        {
          return false;
        }
          
      }
      if(itemText === 'Insert Picture')
      {
          return true;
      }
      // if (itemText === 'Select All') {
      //     if (selectedItem.diagramType !== 'GeneralDiagram' || (selectedItem.selectedDiagram.nodes.length === 0 && selectedItem.selectedDiagram.connectors.length === 0)) {
      //         return true;
      //     }
      // }
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
function contextMenuClick (args) {
  var buttonElement = document.getElementsByClassName('e-btn-hover')[0];
  if (buttonElement) {
      buttonElement.classList.remove('e-btn-hover');
  }

  var commandType = '';
  if (args.element.innerText.indexOf('Ctrl') !== -1) {
      commandType = args.element.innerText.substring(0, args.element.innerText.indexOf('Ctrl')).trim();
  } else {
      commandType = args.element.innerText.trim();
  }
  commandType = commandType.replace(/[' ']/g, '');
  switch (commandType.toLowerCase()) {
    case 'portrait':
      diagram.pageSettings.orientation = 'Portrait';
      break;
    case 'landscape':
      diagram.pageSettings.orientation ='Landscape';
      break;
    case 'letter':
    case 'tabloid':
    case 'legal':
    case 'a4':
    case 'a3':
    case 'a5':
    case 'a6':
      UtilityMethods.prototype.paperListChange(args)
      break;
  }
}

function arrangeContextMenuOpen (args) {
  if (args.element.classList.contains('e-menu-parent')) {
      var popup = document.querySelector('#btnDesignMenu-popup');
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

var PaperSize = (function () {
function PaperSize() {
}
return PaperSize;
}());

 var btnHideToolbar = new ej.buttons.Button({ iconCss: 'sf-icon-chevron-up' });
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
  // document.getElementsByClassName('sb-content-overlay')[0].style.display = 'none';
  var isOpen= true;
  if (args.operation !== 'remove') {
      var file1 = args.file;
      var file = file1.rawFile;
      OrgChartUtilityMethods.fileType = file1.type.toString();
      var reader = new FileReader();
      if (OrgChartUtilityMethods.fileType.toLowerCase() === 'jpg' || OrgChartUtilityMethods.fileType.toLowerCase() === 'png') {
          reader.readAsDataURL(file);
          reader.onloadend = setImage.bind(this);
      } else {
          reader.readAsText(file);
          if (OrgChartUtilityMethods.fileType === 'json' && isOpen) {
              reader.onloadend = loadDiagram.bind(this);
          } else {
              OrgChartUtilityMethods.isUploadSuccess = true;
              reader.onloadend = OrgChartUtilityMethods.readFile.bind(OrgChartUtilityMethods);
          }
      }
      isOpen = false;
  }
}

function onUploadFailure(args) {
  document.getElementsByClassName('sb-content-overlay')[0].style.display = 'none';
}
function onUploadFileSelected(args) {
  document.getElementsByClassName('sb-content-overlay')[0].style.display = '';
}
//Load the diagraming object.
function loadDiagram(event) {
  diagram.loadDiagram(event.target.result);
}
function setImage(event) {
  //(document.getElementsByClassName('sb-content-overlay')[0] as HTMLDivElement).style.display = 'none';
  var node =diagram.selectedItems.nodes[0];
  node.shape = { type: 'Image', source: event.target.result, align: 'None' };
}

  var hyperlinkDialog = new ej.popups.Dialog({
    width: '400px',
    header: 'Insert Link',
    target: document.body,
    isModal:true,
    animationSettings: { effect: 'None' },
    showCloseIcon: true,
    visible: false,
    buttons: UtilityMethods.prototype.getDialogButtons('hyperlink'),
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
    buttons:  UtilityMethods.prototype.getDialogButtons('export'),
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
  

// dropdown template for exportDialog control
  var exportFormat = new ej.dropdowns.DropDownList({
    dataSource: DropDownDataSources.prototype.fileFormats(),
    fields: { text: 'text', value: 'value' },
    value: exportSettings.format
});
exportFormat.appendTo('#exportFormat');

  // dropdown template for exportDialog control
var exportRegion = new ej.dropdowns.DropDownList({
    dataSource: DropDownDataSources.prototype.diagramRegions(),
    fields: { text: 'text', value: 'value' },
    value: exportSettings.region
});
exportRegion.appendTo('#exportRegion');


var printDialog = new ej.popups.Dialog({
  width: '335px',
  header: 'Print Diagram',
  target: document.body,
  isModal: true,
  animationSettings: { effect: 'None' },
  buttons: UtilityMethods.prototype.getDialogButtons('print'),
  visible: false,
  showCloseIcon: true,
  content: '<div id="printDialogContent"><div class="row"><div class="row">Region</div> <div class="row db-dialog-child-prop-row">' +
  '<input type="text" id="printRegionDropdown"/> </div> </div><div class="row db-dialog-prop-row"><div class="row">Print Settings</div>' +
  '<div class="row db-dialog-child-prop-row"><input type="text" id="printPaperSizeDropdown"/> </div> </div>' +
  '<div id="printCustomSize" class="row db-dialog-prop-row" style="display:none; height: 28px;"> <div class="col-xs-6 db-col-left">' +
  '<div class="db-text-container"><div class="db-text"><span>W</span></div><div class="db-text-input"><input id="printPageWidth" type="text" />' +
  '</div> </div> </div> <div class="col-xs-6 db-col-right"><div class="db-text-container"> <div class="db-text"><span>H</span></div>' +
  '<div class="db-text-input"><input id="printPageHeight" type="text" /></div></div></div></div><div id="printOrientation" class="row db-dialog-prop-row" style="height: 28px; padding: 5px 0px;">' +
  '<div class="col-xs-3 db-prop-col-style" style="margin-right: 8px;"><input id="printPortrait" type="radio"></div> <div class="col-xs-3 db-prop-col-style">' +
  '<input id="printLandscape" type="radio"></div></div> <div class="row db-dialog-prop-row" style="margin-top: 16px"> <input id="printMultiplePage" type="checkbox" /> </div> </div>'
});
printDialog.appendTo('#printDialog');

// dropdown template for printDialog control
var printRegionDropdown = new ej.dropdowns.DropDownList({
  dataSource: DropDownDataSources.prototype.diagramRegions(),
  fields: { text: 'text', value: 'value' },
  value: printSettings.region
});
printRegionDropdown.appendTo('#printRegionDropdown');

// dropdown template for printDialog control
var printPaperSizeDropdown = new ej.dropdowns.DropDownList({
  dataSource: DropDownDataSources.prototype.paperList(),
  fields: { text: 'text', value: 'value' },
  value: printSettings.paperSize
});
printPaperSizeDropdown.appendTo('#printPaperSizeDropdown');

// numerictextbox template for printDialog control
var printPageWidth = new ej.inputs.NumericTextBox({
  min: 100,
  step: 1,
  format: 'n0',
  value: printSettings.pageWidth
});
printPageWidth.appendTo('#printPageWidth');

// numerictextbox template for printDialog control
var printPageHeight = new ej.inputs.NumericTextBox({
  min: 100,
  step: 1,
  format: 'n0',
  value: printSettings.pageHeight
});
printPageHeight.appendTo('#printPageHeight');

// radiobutton template for printDialog control
var printPortrait = new ej.buttons.RadioButton({ label: 'Portrait', name: 'printSettings', checked: printSettings.isPortrait });
printPortrait.appendTo('#printPortrait');

// radiobutton template for printDialog control
var printLandscape = new ej.buttons.RadioButton({ label: 'Landscape', name: 'printSettings', checked: printSettings.isLandscape });
printLandscape.appendTo('#printLandscape');

// checkbox template for printDialog control
var printMultiplePage = new ej.buttons.CheckBox({ label: 'Scale to fit 1 page', checked: printSettings.multiplePage,
change: function (args) { multiplePage(args); }
});
printMultiplePage.appendTo('#printMultiplePage');


var fontFamily = new ej.dropdowns.DropDownList({
  dataSource:  DropDownDataSources.prototype.fontFamilyList(),
  height: '34px',
  fields: { text: 'text', value: 'value' },
  change: function (args) {
      textProperties.fontFamily.value = args.value;
      PropertyChange.prototype.textPropertyChange({propertyName: 'fontFamily', propertyValue: args});
  }
});
fontFamily.appendTo('#fontFamily');
textProperties.fontFamily = fontFamily;

var fontSizeTextProperties = new ej.inputs.NumericTextBox({
  min: 1,
  step: 1,
  change: function (args) {
      textProperties.fontSize.value = args.value;
      PropertyChange.prototype.textPropertyChange({propertyName: 'fontSize', propertyValue: args});
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
  showButtons:false,
  change: function (args) {
      textProperties.fontColor.value = args.currentValue.hex;
      PropertyChange.prototype.textPropertyChange({propertyName: 'fontColor', propertyValue: args});
  }
});
textColor.appendTo('#textColor');
textProperties.fontColor = textColor;

var fontColorBtn = new ej.buttons.Button({ iconCss: 'sf-icon-font-color' });
fontColorBtn.appendTo('#fontColorBtn');

var toolbarTextStyle = new ej.navigations.Toolbar({
  overflowMode: 'Scrollable',
  clicked: function (args) { toolbarTextStyleChange(args); },
  items: [
      { prefixIcon: 'sf-icon-bold', tooltipText: 'Bold', cssClass: 'tb-item-start' },
      { prefixIcon: 'sf-icon-italic', tooltipText: 'Italic', cssClass: 'tb-item-middle' },
      { prefixIcon: 'sf-icon-underline', tooltipText: 'Underline', cssClass: 'tb-item-end' }
  ]
});
toolbarTextStyle.appendTo('#toolbarTextStyle');

var toolbarTextSubAlignment = new ej.navigations.Toolbar({
  overflowMode: 'Scrollable',
  clicked:  function (args) { toolbarTextSubAlignChange(args); },
  items: [
      { prefixIcon: 'sf-icon-align-left', tooltipText: 'Align Text Left', cssClass: 'tb-item-start' },
      { prefixIcon: 'sf-icon-align-center', tooltipText: 'Align Text Center', cssClass: 'tb-item-middle' },
      { prefixIcon: 'sf-icon-align-right', tooltipText: 'Align Text Right', cssClass: 'tb-item-end' }
  ]
});
toolbarTextSubAlignment.appendTo('#toolbarTextSubAlignment');

var toolbarTextAlignment = new ej.navigations.Toolbar({
  overflowMode: 'Scrollable',
  clicked: function (args) { toolbarTextAlignChange(args); },
  items: [
      { prefixIcon: 'sf-icon-align-text-rignt', tooltipText: 'Align Right', cssClass: 'tb-item-start' },
      { prefixIcon: 'sf-icon-align-text-horizontal-center', tooltipText: 'Align Center', cssClass: 'tb-item-middle' },
      { prefixIcon: 'sf-icon-align-text-left', tooltipText: 'Align Left', cssClass: 'tb-item-middle' },
      { prefixIcon: 'sf-icon-align-text-bottom', tooltipText: 'Align Bottom', cssClass: 'tb-item-middle' },
      { prefixIcon: 'sf-icon-align-text-vertical-center', tooltipText: 'Align Middle', cssClass: 'tb-item-middle' },
      { prefixIcon: 'sf-icon-align-text-top', tooltipText: 'Align Top', cssClass: 'tb-item-end' }
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
      PropertyChange.prototype.textPropertyChange({ propertyName: 'opacity', propertyValue: args });
  }
});
opacityTextSlider.appendTo('#opacityTextSlider');
textProperties.opacity = opacityTextSlider;



function enableToolbarItems(selectedItems) {
  var toolbarContainer = document.getElementsByClassName('db-toolbar-container')[0];
  var toolbarClassName = 'db-toolbar-container';
  if (toolbarContainer.classList.contains('db-undo')) {
      toolbarClassName += ' db-undo';
  }
  if (toolbarContainer.classList.contains('db-redo')) {
      toolbarClassName += ' db-redo';
  }
  toolbarContainer.className = toolbarClassName;
  if (selectedItems.length === 1) {
      toolbarContainer.className = toolbarContainer.className + ' db-select';
      if (selectedItems[0] instanceof ej.diagrams.Node) {
          if (selectedItems[0].children) {
              if (selectedItems[0].children.length > 2) {
                  toolbarContainer.className = toolbarContainer.className + ' db-select db-double db-multiple db-node db-group';
              }
              else {
                  toolbarContainer.className = toolbarContainer.className + ' db-select db-double db-node db-group';
              }
          }
          else {
              toolbarContainer.className = toolbarContainer.className + ' db-select db-node';
          }
      }
  }
  else if (selectedItems.length === 2) {
      toolbarContainer.className = toolbarContainer.className + ' db-select db-double';
  }
  else if (selectedItems.length > 2) {
      toolbarContainer.className = toolbarContainer.className + ' db-select db-double db-multiple';
  }
  if (selectedItems.length > 1) {
      var isNodeExist = false;
      for (var i = 0; i < selectedItems.length; i++) {
          if (selectedItems[i] instanceof ej.diagrams.Node) {
              toolbarContainer.className = toolbarContainer.className + ' db-select db-node';
              break;
          }
      }
  }
};

 function multiplePage(args) {
  if (args.event) {
      printSettings.multiplePage = args.checked; 
  }
};





///Toolbar functionalities
var toolbarEditor = new ej.navigations.Toolbar({
    overflowMode: 'Scrollable',
    clicked: toolbarEditorClick,
    items: [
      { prefixIcon: 'sf-icon-undo tb-icons', tooltipText: 'Undo',cssClass: 'tb-item-start tb-item-undo' },
      { prefixIcon: 'sf-icon-redo tb-icons', tooltipText: 'Redo',cssClass: 'tb-item-end tb-item-redo' },
                      { type: 'Separator' },
      { prefixIcon: 'sf-icon-pan', tooltipText: 'Pan Tool',cssClass:'tb-item-start'},
      { prefixIcon: 'sf-icon-pointer', tooltipText: 'Select Tool',cssClass:'tb-item-middle tb-item-selected'},
      { prefixIcon: 'sf-icon-straight_line', tooltipText: 'Straight',cssClass:'tb-item-middle'},
      { prefixIcon: 'sf-icon-text', tooltipText: 'Text Tool',cssClass:'tb-item-end' },
                      { type: 'Separator',template:'<div style="margin-left:70px;"></div>'},
      { prefixIcon: 'sf-icon-group', tooltipText:'Group', template: '<div></div>', cssClass: 'tb-item-start tb-item-align-category'},
                      { type: 'Separator', visible: false },
      {
          prefixIcon: 'sf-icon-align_left', tooltipText: 'Align Left',  template: '<div></div>',cssClass: 'tb-item-middle  tb-item-align-category'
      },
      {
          prefixIcon: 'sf-icon-align_center', tooltipText: 'Align Center',  template: '<div></div>',cssClass: 'tb-item-middle  tb-item-align-category'
      },
      {
          prefixIcon: 'sf-icon-align_right', tooltipText: 'Align Right',  template: '<div></div>',cssClass: 'tb-item-middle  tb-item-align-category'
      },
      {
          prefixIcon: 'sf-icon-align_top', tooltipText: 'Align Top', template: '<div></div>',cssClass: 'tb-item-middle  tb-item-align-category'
      },
      {
          prefixIcon: 'sf-icon-align_middle', tooltipText: 'Align Middle', template: '<div></div>',cssClass: 'tb-item-middle  tb-item-align-category'
      },
      {
          prefixIcon: 'sf-icon-align_bottom', tooltipText: 'Align Bottom', template: '<div></div>',cssClass: 'tb-item-middle  tb-item-align-category'
      },
      {
          prefixIcon: 'sf-icon-distribute_horizontal', tooltipText: 'Distribute Objects Vertically', template: '<div></div>', cssClass: 'tb-item-middle tb-item-space-category'
      },
      {
          prefixIcon: 'sf-icon-distribute_vertical', tooltipText: 'Distribute Objects Horizontally',  template: '<div></div>', cssClass: 'tb-item-middle tb-item-space-category'
      },
                  { type: 'Separator', visible: false },
      //{ tooltipText: 'OrderCommands',template: '<button id="orderBtn" style="width:100%;"></button>',cssClass: 'tb-item-end tb-item-order tb-dropdown-btn-icon',visible:false},
      { prefixIcon: 'sf-icon-bring-forward', tooltipText: 'Bring Forward', template: '<div></div>', cssClass: 'tb-item-start tb-item-lock-category'},
      { prefixIcon: 'sf-icon-bring-to-front', tooltipText: 'Bring To Front', template: '<div></div>', cssClass: 'tb-item-middle tb-item-lock-category'},
      { prefixIcon: 'sf-icon-send-backward', tooltipText: 'Send Backward', template: '<div></div>', cssClass: 'tb-item-middle tb-item-lock-category'},
      { prefixIcon: 'sf-icon-send-to-back', tooltipText: 'Send To Back', template: '<div></div>', cssClass: 'tb-item-end tb-item-lock-category'},
                      { type: 'Separator', visible: false },
      { prefixIcon: 'sf-icon-flip-vertical', tooltipText: 'Horizontal Flip', template: '<div></div>', cssClass: 'tb-item-end tb-item-lock-category'},
      { prefixIcon: 'sf-icon-flip-horizontal', tooltipText: 'Vertical Flip', template: '<div></div>', cssClass: 'tb-item-end tb-item-lock-category'},                
      { type: 'Separator', visible: false },
      {prefixIcon: 'sf-icon-lock', tooltipText: 'Lock', template: '<div></div>', cssClass: 'tb-item-start tb-item-lock-category'}, 
      { prefixIcon: 'sf-icon-delete', tooltipText: 'Delete',  template: '<div></div>', cssClass: 'tb-item-end tb-item-lock-category'},
                      { type: 'Separator', visible: false },

      { prefixIcon: 'sf-icon-fil_colour', tooltipText: 'Fill Color',  template: '<div></div>',cssClass: 'tb-item-start tb-item-stroke' },
      { prefixIcon: 'sf-icon-font-color', tooltipText: 'Font Color', template: '<div></div>',cssClass: 'tb-item-end tb-item-stroke'},
                      { type: 'Separator', visible: false },
      {
         type: 'Separator',template:'<div style="margin-left:180px;"></div>'
       },
      {
          cssClass: 'tb-item-end tb-zoom-dropdown-btn', template: '<button id="btnZoomIncrement"></button>'
      },
      {
       type: 'Separator',template:'<div style="margin-left:10px;"></div>'
      },
      {  tooltipText: 'Hide property',template:'<button id="hideProperty" ></button>'}
    ]
});
toolbarEditor.appendTo('#toolbarEditor');

// orderCommands.appendTo('#orderCommands');
var hidePropertyBtn = new ej.buttons.Button({
  iconCss:'sf-icon-properties',isPrimary: true 
});
hidePropertyBtn.appendTo('#hideProperty');

document.getElementById('hideProperty').onclick = (args)=>{
  UtilityMethods.prototype.hideElements ('hide-properties',diagram);
}


var zoomMenuItems = [
  { text: 'Zoom In' }, { text: 'Zoom Out' }, { text: 'Zoom to Fit' }, { text: 'Zoom to 50%' },
  { text: 'Zoom to 100%' }, {text: 'Zoom to 200%'}
];
var btnZoomIncrement = new ej.splitbuttons.DropDownButton({ items:zoomMenuItems, content:Math.round(diagram.scrollSettings.currentZoom*100)+'%',select: zoomChange });
btnZoomIncrement.appendTo('#btnZoomIncrement');
function toolbarEditorClick(args) {
  var commandType = args.item.tooltipText.replace(/[' ']/g, '').toLowerCase();
    switch (commandType) {
        case 'new':
            diagram.clear();
            break;
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
            printDialog.show();
            break;
        case 'export':
            exportDialog.show();
            break;
        case 'save':
            download(diagram.saveDiagram());
            break;
        case 'fillcolor':
          var objColor = diagram.selectedItems.nodes[0]? 'nodeFillColor':'lineColor'
          UtilityMethods.prototype.showColorPicker(objColor,'tb-item-stroke');
          break;
           
        case 'fontcolor':
              if (diagram.selectedItems.nodes[0].annotations) {
                UtilityMethods.prototype.showColorPicker('textColor', 'tb-item-stroke');
                 
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
            diagram.clearSelection();
            diagram.drawingObject = {};
            diagram.tool =  ej.diagrams.DiagramTools.SingleSelect |  ej.diagrams.DiagramTools.MultipleSelect;
            break;
        case 'group':
            diagram.group();
            args.item.prefixIcon = 'sf-icon-ungroup';
            args.item.tooltipText = 'UnGroup';
            break;
        case 'ungroup':
            diagram.unGroup();
            args.item.prefixIcon = 'sf-icon-group';
            args.item.tooltipText = 'Group';
            break;
        case 'delete':
            diagram.remove();
            break;
        case 'lock':
        case 'unlock':
              lockObject();
              break;
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
        case 'distributeobjectshorizontally':
              diagram.distribute('RightToLeft');
              break;
       case 'distributeobjectsvertically':
              diagram.distribute('BottomToTop');
              break;
        case 'horizontalflip':
              flipObjects(commandType);     
              break;
        case 'verticalflip':
              flipObjects(commandType);
              break;
        case 'texttool':
              diagram.drawingObject = { shape: { type: 'Text' }, style: { strokeColor: 'none', fill: 'none' } };
              diagram.tool = ej.diagrams.DiagramTools.ContinuousDraw;
              break;
        case 'straight' : 
              diagram.drawingObject = { type: 'Straight' ,targetDecorator:{ shape: "none"}} ;
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
   if (commandType === 'pantool' || commandType === 'selecttool' || commandType === 'texttool'|| commandType === 'straight') {
    if (args.item.cssClass.indexOf('tb-item-selected') === -1) {
      UtilityMethods.prototype.removeSelectedToolbarItem();
        args.item.cssClass += ' tb-item-selected';
    }
}
}

function zoomChange(args){
  var zoomCurrentValue = document.getElementById("btnZoomIncrement").ej2_instances[0];
      var currentZoom = diagram.scrollSettings.currentZoom;
      var zoom = {};
      switch (args.item.text) {
          case 'Zoom In':
              diagram.zoomTo({ type: 'ZoomIn', zoomFactor: 0.2 });
              zoomCurrentValue.content = (diagram.scrollSettings.currentZoom * 100).toFixed() + '%';
              break;
          case 'Zoom Out':
              diagram.zoomTo({ type: 'ZoomOut', zoomFactor: 0.2 });
              zoomCurrentValue.content = (diagram.scrollSettings.currentZoom * 100).toFixed() + '%';
              break;
          case 'Zoom to Fit':
              diagram.fitToPage({ mode: 'Page', region: 'Content'});
              zoomCurrentValue.content = diagram.scrollSettings.currentZoom;
              break;
          case 'Zoom to 50%':
              zoom.zoomFactor = (0.5 / currentZoom) - 1;
              diagram.zoomTo(zoom);
              break;
          case 'Zoom to 100%':
              zoom.zoomFactor = (1 / currentZoom) - 1;
              diagram.zoomTo(zoom);
              break;
          case 'Zoom to 200%':
              zoom.zoomFactor = (2 / currentZoom) - 1;
              diagram.zoomTo(zoom);
              break;
      }
    
      zoomCurrentValue.content = Math.round(diagram.scrollSettings.currentZoom*100) + ' %';
      
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
function flipObjects(flipType)
{
    var selectedObjects = diagram.selectedItems.nodes.concat(diagram.selectedItems.connectors);
 for(i=0;i<selectedObjects.length;i++)
 {
    selectedObjects[i].flip = flipType === 'Flip Horizontal'? 'Horizontal':'Vertical';
 }
 diagram.dataBind();
}

