var selectedItem = new SelectorViewModel();

window.onload = function () {
    diagram = document.getElementById("diagram").ej2_instances[0];
    symbolpalette = document.getElementById("symbolpalette").ej2_instances[0];
    selectedItem.selectedDiagram = document.getElementById("diagram").ej2_instances[0];
}

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
  
  var getViewMenuItems = [
    { text: 'Show Rulers' },
    { text: 'Show Grid', iconCss: 'sf-icon-Selection' }, { separator: true },
    { text: 'Snap To Grid' },
    { text: 'Page Break'},{ separator: true },
    { text: 'Fit To Screen' }, { separator: true },
     { text: 'Show Guides', iconCss: 'sf-icon-Selection' },
    
    
];
var btnViewMenu = new ej.splitbuttons.DropDownButton({
    cssClass: 'db-dropdown-menu',
    items: getViewMenuItems,
    content: 'View',
    select: menuClick,
    
});
btnViewMenu.appendTo('#btnViewMenu');
function menuClick(args) {
    var buttonElement = document.getElementsByClassName('e-btn-hover')[0];
    if (buttonElement) {
        buttonElement.classList.remove('e-btn-hover');
    }
    var diagram = selectedItem.selectedDiagram;
    var commandType = args.item.text.replace(/[' ']/g, '');
    switch (commandType.toLowerCase()) {
        case 'showguides':
            diagram.snapSettings.constraints = diagram.snapSettings.constraints ^ ej.diagrams.SnapConstraints.SnapToObject;
            args.item.iconCss = args.item.iconCss ? '' : 'sf-icon-Selection';
            break;
        case 'showgrid':
            diagram.snapSettings.constraints = diagram.snapSettings.constraints ^ ej.diagrams.SnapConstraints.ShowLines;
            args.item.iconCss = args.item.iconCss ? '' : 'sf-icon-Selection';
            var container = document.getElementsByClassName('db-current-diagram-container')[0];
            if (!args.item.iconCss) {
                container.classList.add('db-hide-grid');
            } else {
                container.classList.remove('db-hide-grid');
            }
            break;
        case 'snaptogrid':
            diagram.snapSettings.constraints = diagram.snapSettings.constraints ^ ej.diagrams.SnapConstraints.SnapToLines;
            args.item.iconCss = args.item.iconCss ? '' : 'sf-icon-Selection';
            break;
        case 'fittoscreen':
            diagram.fitToPage({ mode: 'Page', region: 'Content', margin: { left: 0, top: 0, right: 0, bottom: 0 } });
            break;
        case 'showrulers':
            selectedItem.selectedDiagram.rulerSettings.showRulers = !selectedItem.selectedDiagram.rulerSettings.showRulers;
            if (selectedItem.selectedDiagram.rulerSettings.showRulers) {
                selectedItem.selectedDiagram.rulerSettings.dynamicGrid = false;
            }
            args.item.iconCss = args.item.iconCss ? '' : 'sf-icon-Selection';
            container = document.getElementsByClassName('db-current-diagram-container')[0];
            if (!args.item.iconCss) {
                container.classList.remove('db-show-ruler');
            } else {
                container.classList.add('db-show-ruler');
            }
            break;
        case 'pagebreak':
            args.item.iconCss = args.item.iconCss ? '' : 'sf-icon-Selection';
            if(args.item.iconCss == 'sf-icon-Selection' ){
                diagram.pageSettings.showPageBreaks = true;
            }
            else 
            {
                diagram.pageSettings.showPageBreaks = false;
            }     
    }
    diagram.dataBind();
}

var toolbarEditor = new ej.navigations.Toolbar({
    overflowMode: 'Scrollable',
    // clicked: toolbarEditorClick,
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
            type: 'Input', text: 'Export',prefixIcon:'sf-icon-Export', template: '<button id="custombtn" style="width:100%;"></button>'},
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
            prefixIcon: 'sf-icon-Undo tb-icons', tooltipText: 'Undo', cssClass: 'tb-item-end tb-item-undo'
        },
        {
            prefixIcon: 'sf-icon-Redo tb-icons', tooltipText: 'Redo', cssClass: 'tb-item-end tb-item-redo'
        },
        {
            type: 'Separator'
        },
        {
            prefixIcon: 'e-icons e-bold', tooltipText: 'Bold', template: '<button id="bold" style="width:100%;"></button>'  },
        {
            prefixIcon: 'e-icons e-underline', tooltipText: 'Underline' ,template: '<button id="underline" style="width:100%;"></button>'  },
        {
            prefixIcon: 'e-icons e-italic', tooltipText: 'Italic' ,template: '<button id="italic" style="width:100%;"></button>'},
        // {
        //     prefixIcon: 'sf-icon-ZoomOut tb-icons', tooltipText: 'Zoom Out(Ctrl + -)', cssClass: 'tb-item-start'
        // },
        // {
        //     cssClass: 'tb-item-end tb-zoom-dropdown-btn', template: '<button id="btnZoomIncrement"></button>'
        // },
        // {
        //     prefixIcon: 'sf-icon-ZoomIn tb-icons', tooltipText: 'Zoom In(Ctrl + +)', cssClass: 'tb-item-end'
        // },
        // {
        //     type: 'Separator'
        // },
        // {
        //     prefixIcon: 'sf-icon-Pan tb-icons', tooltipText: 'Pan Tool', cssClass: 'tb-item-start'
        // },
        // {
        //     prefixIcon: 'sf-icon-Selector tb-icons', tooltipText: 'Pointer', cssClass: 'tb-item-middle tb-item-selected'
        // },
        // {
        //     tooltipText: 'Draw Shapes', cssClass: 'tb-item-middle tb-drawtools-dropdown-btn tb-custom-diagram-disable', 
        // },
        // {
        //     tooltipText: 'Draw Connectors', cssClass: 'tb-item-middle tb-drawtools-dropdown-btn tb-custom-diagram-disable',
        // },
        // {
        //     prefixIcon: 'sf-icon-TextInput tb-icons', tooltipText: 'Text Tool', cssClass: 'tb-item-end tb-custom-diagram-disable'
        // },
        // {
        //     type: 'Separator'
        // },
        // {
        //     prefixIcon: 'sf-icon-ColorPickers tb-icons', mode: 'Palette', tooltipText: 'Fill Color', cssClass: 'tb-item-start tb-item-fill'
        // },
        // {
        //     prefixIcon: 'sf-icon-Pickers tb-icons', mode: 'Palette', tooltipText: 'Border Color', cssClass: 'tb-item-end tb-item-stroke'
        // },
        // {
        //     type: 'Separator'
        // },
        // {
        //     prefixIcon: 'sf-icon-Group tb-icons', tooltipText: 'Group', cssClass: 'tb-item-start tb-item-align-category'
        // },
        // {
        //     prefixIcon: 'sf-icon-Ungroup tb-icons', tooltipText: 'Ungroup', cssClass: 'tb-item-end tb-item-ungroup'
        // },
        // {
        //     type: 'Separator'
        // },
        // {
        //     prefixIcon: 'sf-icon-Lock tb-icons', tooltipText: 'Lock', cssClass: 'tb-item-start tb-item-lock-category'
        // },
        // {
        //     prefixIcon: 'sf-icon-Delete tb-icons', tooltipText: 'Delete', cssClass: 'tb-item-end tb-item-lock-category'
        // },
        // {
        //     type: 'Separator'
        // },
        // {
        //     prefixIcon: 'sf-icon-Layers tb-icons', tooltipText: 'Show Layers', cssClass: 'tb-item-start tb-custom-diagram-disable'
        // },
        // {
        //     prefixIcon: 'db-theme-svg tb-icons', tooltipText: 'Themes', cssClass: 'tb-item-end tb-custom-diagram-disable'
        // },
        // {
        //     type: 'Separator'
        // },
        // {
        //     type: 'Separator'
        // },
        // {
        //     prefixIcon: 'sf-icon-AlignLeft tb-icons', tooltipText: 'Align Left', cssClass: 'tb-item-start tb-item-align-category'
        // },
        // {
        //     prefixIcon: 'sf-icon-AlignHorizontally tb-icons', tooltipText: 'Align Center', cssClass: 'tb-item-middle  tb-item-align-category'
        // },
        // {
        //     prefixIcon: 'sf-icon-AlignRight tb-icons', tooltipText: 'Align Right', cssClass: 'tb-item-middle tb-item-align-category'
        // },
        // {
        //     prefixIcon: 'sf-icon-AilgnTop tb-icons', tooltipText: 'Align Top', cssClass: 'tb-item-middle tb-item-align-category'
        // },
        // {
        //     prefixIcon: 'sf-icon-AlignVertically tb-icons', tooltipText: 'Align Middle', cssClass: 'tb-item-middle tb-item-align-category'
        // },
        // {
        //     prefixIcon: 'sf-icon-AlignBottom tb-icons', tooltipText: 'Align Bottom', cssClass: 'tb-item-middle tb-item-align-category'
        // },
        // {
        //     prefixIcon: 'sf-icon-DistributeHorizontal tb-icons', tooltipText: 'Distribute Objects Vertically', cssClass: 'tb-item-middle tb-item-space-category'
        // },
        // {
        //     prefixIcon: 'sf-icon-DistributeVertical tb-icons', tooltipText: 'Distribute Objects Horizontally', cssClass: 'tb-item-end tb-item-space-category'
        // },
    ]
});
toolbarEditor.appendTo('#toolbarEditor');

var diagram = new ej.diagrams.Diagram({
    width: '100%',
    height: '100%',
    nodes : nodes, connectors: connectors,
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
            style: { strokeWidth: 2 }
        };
        return connector1;
    },
    backgroundColor: 'transparent',
});
diagram.appendTo('#diagram');
diagram.fitToPage({ mode: 'Page', region: 'Content', margin: { left: 0, top: 0, right: 0, bottom: 0 } });
var doors = [
    { id: 'door1', shape: { type: 'Path', data: 'M1 1H49V4.05882H1V1ZM49 4.05882C49 31.0829 27.5043 53 0.999999 53V4.05882' }},
    { id: 'door2', shape: { type: 'Path', data: 'M49 1H1V4.05882H49V1Z M1 4.05882C1 31.0829 22.4957 53 49 53V4.05882' }}   
];
var diningRoom = [
    {id:'rectangle', shape :{ type: 'Path', data: 'M20255 38058 c-3 -7 -4 -1642 -3 -3633 l3 -3620 10140 0 10140 0 0 3630 0 3630 -10138 3 c-8105 2 -10139 0 -10142 -10z m5063 -1215 l-3 -1188 -1322 -3 -1323 -2 0 -600 0 -600 -1190 0 -1190 0 0 1790 0 1790 2515 0 2515 0 -2 -1187z m5062 -3 l0 -1190 -2515 0 -2515 0 0 1190 0 1190 2515 0 2515 0 0 -1190z m5060 0 l0 -1190 -2512 2 -2513 3 -3 1188 -2 1187 2515 0 2515 0 0 -1190z m5070 -600 l0 -1790 -1190 0 -1190 0 0 600 0 600 -1325 0 -1325 0 0 1190 0 1190 2515 0 2515 0 0 -1790z m-2412 -1807 l-3 -1188 -7700 0 -7700 0 -2 1188 -3 1187 7705 0 7705 0 -2 -1187z m-15428 -618 l5 -600 1323 -3 1322 -2 -2 -1188 -3 -1187 -2512 -3 -2513 -2 0 1795 0 1795 1188 -2 1187 -3 5 -600z m17835 -1190 l0 -1790 -2512 -3 -2513 -2 0 1190 0 1190 1323 2 1322 3 3 603 2 602 1188 -2 1187 -3 0 -1790z m-10125 -605 l0 -1190 -2515 0 -2515 0 0 1190 0 1190 2515 0 2515 0 0 -1190z m5060 0 l0 -1190 -2512 2 -2513 3 -3 1188 -2 1187 2515 0 2515 0 0 -1190z' }},
    {id:'chair', shape :{ type: 'Path', data: 'M36248 30694 c-58 -31 -58 -33 -58 -514 0 -379 -2 -444 -15 -456 -20 -21 -19 -57 3 -77 9 -8 62 -25 117 -36 281 -56 590 -56 878 1 92 18 111 25 125 46 15 23 15 27 -1 54 -15 27 -17 74 -17 471 0 420 -1 443 -19 471 -37 56 -28 55 -526 55 -388 0 -464 -2 -487 -15z m969 -38 l28 -24 3 -443 c1 -243 -1 -446 -6 -451 -16 -16 -206 -47 -359 -59 -175 -15 -366 -3 -552 32 l-111 21 0 445 0 445 29 29 29 29 456 0 455 0 28 -24z m-892 -976 c167 -33 390 -45 562 -31 81 6 184 18 228 26 164 30 157 30 153 9 -11 -61 -525 -106 -798 -70 -132 18 -246 41 -269 55 -15 10 -7 31 12 31 7 0 57 -9 112 -20z' }},
    {id:'sofa1', shape :{ type: 'Path', data:  'M40293 24546 c-17 -8 -36 -23 -42 -35 -8 -13 -11 -282 -11 -874 0 -843 0 -855 20 -880 11 -14 29 -29 40 -32 18 -6 20 -15 19 -104 -1 -74 2 -105 16 -132 24 -47 63 -87 110 -112 l40 -22 2155 -3 c1471 -1 2171 1 2206 8 61 13 125 63 155 123 15 29 23 67 27 139 4 83 8 101 23 109 51 27 49 -7 49 909 0 948 5 889 -67 910 -25 7 -126 10 -290 8 -245 -3 -252 -4 -275 -25 l-24 -23 -437 0 c-473 0 -488 -2 -522 -53 l-16 -26 -35 24 c-75 51 -65 50 -769 50 l-660 0 -66 -37 -67 -36 -11 24 c-23 52 -44 54 -523 54 l-442 0 -24 23 c-23 22 -29 22 -285 24 -207 2 -269 0 -294 -11z m564 -39 c17 -17 18 -61 21 -707 l2 -689 -121 -163 c-66 -90 -130 -171 -141 -180 -17 -15 -41 -18 -158 -18 -124 0 -140 2 -164 21 l-26 20 0 848 c0 795 1 849 18 863 27 25 44 27 304 25 223 -2 249 -4 265 -20z m4192 -1 l21 -19 0 -847 c0 -714 -2 -849 -14 -866 -13 -17 -29 -19 -151 -22 -76 -2 -147 -1 -160 2 -14 4 -69 68 -151 178 l-129 172 -3 663 c-2 445 1 677 8 703 9 32 17 41 43 49 18 6 141 9 273 8 222 -2 244 -4 263 -21z m-3223 -59 l24 -28 0 -695 0 -694 -474 0 -474 0 -60 -62 c-32 -35 -74 -79 -91 -98 -18 -19 1 10 42 66 132 177 117 66 117 857 l0 688 446 -3 446 -3 24 -28z m1544 7 c25 -12 57 -33 73 -47 l27 -26 -2 -673 -3 -673 -792 -3 -793 -2 0 678 0 679 23 20 c12 11 33 26 47 33 72 38 89 39 740 37 623 -2 636 -2 680 -23z m1064 1 c4 -14 6 -327 6 -695 -1 -369 2 -676 6 -683 4 -7 48 -66 97 -132 l90 -120 -69 75 c-38 41 -82 87 -97 103 l-29 27 -469 0 -469 0 0 698 0 699 23 20 c12 12 33 23 47 26 14 2 212 5 441 6 l417 1 6 -25z m139 -1615 l145 -160 11 -102 c16 -137 16 -130 7 -155 -5 -15 -20 -26 -46 -33 -25 -7 -688 -9 -2043 -8 -1956 3 -2005 3 -2026 22 -14 13 -21 31 -21 56 0 69 22 205 37 228 16 26 221 254 260 290 l24 22 1753 0 1754 0 145 -160z m-3967 -132 c-8 -13 -20 -70 -27 -128 -15 -127 -15 -128 -6 -162 9 -33 -11 -41 -66 -29 -59 14 -112 54 -136 103 -17 35 -21 63 -21 136 l0 91 133 4 c72 1 133 4 135 5 1 1 -4 -8 -12 -20z m4391 -84 c-10 -150 -58 -215 -174 -237 -48 -9 -64 -1 -53 29 12 29 -16 260 -35 289 -12 20 -10 20 128 17 l140 -3 -6 -95z' }},
    {id:'tableSmall', shape :{ type: 'Path', data:  'M38600 24195 c0 -3 0 -254 0 -557 l-1 -553 553 0 553 0 0 555 0 555 -552 3 c-304 1 -553 0 -553 -3z m540 -107 l-5 -82 -55 -11 c-146 -30 -256 -140 -285 -285 l-11 -55 -82 -5 -82 -5 0 256 c0 141 3 259 7 262 3 4 121 7 262 7 l256 0 -5 -82z m540 -448 l0 -530 -527 2 -528 3 -3 259 c-2 233 -1 258 14 252 8 -3 46 -6 83 -6 l68 0 6 -45 c19 -133 146 -269 272 -290 78 -13 75 -9 75 -92 0 -55 3 -74 13 -71 7 3 13 30 15 74 3 72 10 84 52 84 40 0 145 55 189 99 48 48 87 121 102 190 l10 50 71 3 c46 2 73 7 76 16 3 9 -16 12 -71 12 l-74 0 -11 54 c-16 81 -54 147 -116 204 -58 52 -142 92 -196 92 l-30 0 0 69 c0 38 -3 76 -6 85 -6 14 21 16 255 16 l261 0 0 -530z m-540 226 l0 -104 -37 -19 c-21 -11 -45 -35 -56 -56 l-19 -37 -104 0 c-104 0 -104 0 -104 25 0 13 10 50 21 82 42 112 166 209 272 212 l27 1 0 -104z m157 73 c93 -45 176 -158 185 -249 l3 -35 -105 -3 -105 -2 -20 37 c-11 22 -34 44 -52 53 l-33 15 0 109 0 109 40 -6 c22 -3 61 -15 87 -28z m-247 -352 c9 -19 30 -39 53 -50 l37 -19 0 -103 c0 -57 -3 -106 -7 -108 -17 -10 -121 26 -169 58 -74 51 -127 132 -140 214 l-7 41 109 0 109 0 15 -33z m434 1 c-25 -135 -139 -253 -268 -277 l-46 -8 0 109 c0 103 1 109 23 117 25 10 61 47 70 74 6 15 21 17 116 17 l111 0 -6 -32z' }},
    {id:'sofa2', shape :{ type: 'Path', data: 'M15128 17160 c-47 -14 -88 -44 -116 -84 -24 -35 -27 -49 -30 -143 -3 -78 -7 -103 -17 -103 -8 0 -23 -12 -34 -26 -21 -26 -21 -33 -21 -809 l0 -782 26 -24 c25 -24 27 -24 268 -27 l242 -3 37 26 38 25 570 0 571 0 29 29 29 29 0 627 0 627 -29 29 -29 29 -566 0 -565 0 -25 23 c-13 12 -74 77 -134 144 -119 132 -119 131 -129 274 -6 82 -5 87 18 102 22 16 141 17 1472 17 l1448 0 24 -24 c25 -25 25 -19 5 -174 l-10 -73 -126 -139 c-69 -76 -133 -141 -141 -144 -8 -3 -259 -6 -558 -6 -378 0 -552 -3 -568 -11 -14 -6 -30 -22 -36 -36 -8 -17 -11 -212 -11 -647 l0 -623 25 -27 24 -26 576 0 c395 0 575 -3 575 -11 0 -5 16 -17 35 -25 49 -20 460 -20 509 0 60 25 60 9 53 850 l-7 761 -29 26 c-26 25 -29 33 -33 115 -5 107 -30 162 -96 209 l-44 30 -1596 2 c-879 0 -1609 -2 -1624 -7z m92 -24 c0 -3 -4 -15 -9 -28 -10 -27 12 -227 29 -257 8 -17 1 -18 -110 -20 l-120 -2 0 86 c0 122 32 180 117 211 36 13 93 19 93 10z m3095 -7 c98 -27 134 -87 135 -217 l0 -84 -115 4 c-98 2 -114 5 -109 18 11 27 34 234 28 252 -5 18 2 38 14 38 4 0 25 -5 47 -11z m-2948 -486 l118 -156 0 -628 c0 -590 -1 -629 -18 -646 -16 -16 -41 -18 -256 -18 -187 0 -241 3 -254 14 -16 12 -17 80 -17 787 0 689 2 774 16 788 12 13 41 16 155 16 l139 0 117 -157z m3141 145 c9 -9 12 -198 12 -789 0 -710 -1 -778 -17 -790 -13 -11 -67 -14 -254 -14 -215 0 -240 2 -256 18 -17 17 -18 56 -18 645 l0 628 119 157 119 157 142 0 c96 0 145 -4 153 -12z m-2998 -228 c12 -6 232 -10 577 -10 467 0 562 -2 579 -14 18 -14 19 -34 22 -635 2 -611 2 -621 -18 -641 -20 -20 -31 -20 -585 -20 l-565 0 0 621 c0 451 -3 626 -12 642 -6 12 -38 58 -71 102 l-59 80 57 -58 c31 -31 65 -62 75 -67z m2510 41 c-33 -44 -65 -92 -70 -106 -6 -16 -10 -257 -10 -641 l0 -614 -559 0 -560 0 -15 22 c-14 20 -16 97 -16 635 0 600 0 613 20 633 20 20 33 20 580 20 l561 0 61 65 c34 36 63 65 65 65 2 0 -23 -36 -57 -79z'}},
    {id:'rectangle', shape :{ type: 'Path', data: 'M9575 35780 c-11 -5 -145 -9 -297 -9 -165 -1 -278 -5 -278 -10 0 -5 -10 -11 -22 -13 -19 -2 -24 -10 -26 -46 -5 -73 -7 -72 242 -72 l221 0 0 -82 c0 -96 20 -144 80 -196 51 -46 98 -62 174 -62 53 0 76 6 116 28 95 52 151 168 128 267 l-10 45 237 0 c267 0 263 -1 258 72 -2 36 -7 44 -25 46 -13 2 -23 7 -23 12 0 5 -136 11 -302 14 -167 3 -337 7 -378 10 -41 3 -84 1 -95 -4z m793 -87 l-3 -28 -690 0 -690 0 -3 28 -3 27 696 0 696 0 -3 -27z m-838 -113 l0 -50 135 0 135 0 0 50 0 50 35 0 c32 0 35 -3 46 -42 35 -130 -76 -267 -217 -268 -136 0 -247 132 -219 262 10 46 12 48 51 48 l34 0 0 -50z m238 13 l-3 -38 -102 -3 -103 -3 0 41 0 40 106 0 105 0 -3 -37z'}},
    
]
var kitchen=[
  { id:'storageUnit' ,shape :{ type: 'Path', data: 'M6.68,52.3L0,46.269 41.77,0 48.45,6.031z M6.68,0L0,6.031 41.77,52.3 48.45,46.269z M66.393,129L0,129 0,0 66.393,0z M0,0L0,6 58.5,6 58.5,123 0,123 0,129 66.393,129 66.393,0z' }}
]
var bedRoom=[
  { id:'bookCase', shape :{ type: 'Path', data:'M239,77L0,77 0,0 239,0z M227.5,6.5L0,6.5 0,0 227.5,0z' }}
]

//Initializes the symbol palette
var palette = new ej.diagrams.SymbolPalette({
    expandMode: 'Multiple',
    enableSearch: true,
    palettes: [
        { id: 'door', expanded: true, symbols: doors, iconCss: 'e-ddb-icons e-flow', title: 'Doors' },
        { id: 'diningRoom', expanded: true, symbols: diningRoom, iconCss: 'e-ddb-icons e-flow', title: 'Dining Room' },
        { id:'storageUnit', expanded: true, symbols: kitchen, iconCss: 'e-ddb-icons e-flow', title: 'Kitchen'},
        { id: 'bedRoom', expanded: true, symbols: bedRoom, iconCss: 'e-ddb-icons e-flow', title: 'Bed room' },
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
        symbol.style.strokeColor = '#757575';
        
    },
    symbolMargin: { left: 15, right: 15, top: 15, bottom: 15 },
    getSymbolInfo: function (symbol) {
        return { fit: true };
    }
});
palette.appendTo('#symbolpalette');

