var DropDownDataSources = (function () {
    function DropDownDataSources() {
        
    };
    DropDownDataSources.prototype.getFileMenuItems = function()
    {
        var items =[
            { text : 'New', iconCss:'sf-icon-new'},
            { text : 'Open', iconCss:'sf-icon-open'},
            { text : 'Save', iconCss:'sf-icon-save'},
            { text : 'Export', iconCss:'sf-icon-export',items:[{ text: 'JPG' }, { text: 'PNG' },
                                                               { text: 'BMP' }, { text: 'SVG' }]},
            { text : 'Print' ,iconCss:'sf-icon-print'},
      ];
            return items;
    };
    DropDownDataSources.prototype.getEditMenuItems = function()
    {
        var items = [{ text : 'Undo', iconCss:'sf-icon-undo'},
        { text : 'Redo', iconCss:'sf-icon-redo'},
        { separator: true },
        { text : 'Copy', iconCss:'sf-icon-copy'},
        { text : 'Cut', iconCss:'sf-icon-cut'},
        { text : 'Paste', iconCss:'sf-icon-paste'},
        { separator: true },
        { text: 'Delete', iconCss: 'sf-icon-delete'}
    ];
        return items;
    };
    DropDownDataSources.prototype.getInsertMenuItems = function()
    {
        var items = [
            { text: 'Insert Image',tooltipText:'Insert Image' ,iconCss:'sf-icon-insert_image '},
            { text: 'Insert Link', tooltipText:'Insert link',iconCss: 'sf-icon-insert_link '},
        ]
        return items;
    };
    DropDownDataSources.prototype.getDesignMenuItems = function()
    {
        var items = [
            { text: 'Orientation', items:[{ text : 'Landscape',iconCss: 'sf-icon-check-tick'},{text : 'Portrait'}]},
            { text: 'Page Size' , items:[
            { text: 'Letter (8.5 in x 11 in)', value: 'Letter',iconCss:'sf-icon-check-tick' }, { text: 'Legal (8.5 in x 14 in)', value: 'Legal' },
            { text: 'Tabloid (279 mm x 432 mm)', value: 'Tabloid' }, { text: 'A3 (297 mm x 420 mm)', value: 'A3' },
            { text: 'A4 (210 mm x 297 mm)', value: 'A4' }, { text: 'A5 (148 mm x 210 mm)', value: 'A5' },
            { text: 'A6 (105 mm x 148 mm)', value: 'A6' },
    ]},
        ]
        return items;
    };
    DropDownDataSources.prototype.getViewMenuItems = function()
    {
        var items = [
            { text: 'Show Rulers', iconCss: 'sf-icon-check-tick' },
            { text: 'Show Grid', iconCss: 'sf-icon-check-tick' }, { separator: true },
            { text: 'Snap To Grid' },
            { text: 'Show Guides', iconCss: 'sf-icon-check-tick' },
            { text: 'Page Break'},{ separator: true },
            { text: 'Fit To Screen' }, { separator: true },
        ]
        return items;
    };
    DropDownDataSources.prototype.paperList = function()
    {
        var paperList = [
            { text: 'Letter (8.5 in x 11 in)', value: 'Letter' }, { text: 'Legal (8.5 in x 14 in)', value: 'Legal' },
            { text: 'Tabloid (279 mm x 432 mm)', value: 'Tabloid' }, { text: 'A3 (297 mm x 420 mm)', value: 'A3' },
            { text: 'A4 (210 mm x 297 mm)', value: 'A4' }, { text: 'A5 (148 mm x 210 mm)', value: 'A5' },
            { text: 'A6 (105 mm x 148 mm)', value: 'A6' }, { text: 'Custom', value: 'Custom' },
        ];
        return paperList;
    };
    DropDownDataSources.prototype.fileFormats= function()
    {
        var fileFormats = [
            { text: 'JPG', value: 'JPG' }, { text: 'PNG', value: 'PNG' },
            { text: 'BMP', value: 'BMP' }, { text: 'SVG', value: 'SVG' }
        ];
        return fileFormats;
    };
    DropDownDataSources.prototype.diagramRegions = function()
    {
        var diagramRegions = [
            { text: 'Content', value: 'Content' }, { text: 'PageSettings', value: 'PageSettings' }
        ];
        return diagramRegions;
    };
    DropDownDataSources.prototype.borderStyles= function()
    {
        var borderStyles = [
            { text: '', value: '', className: 'ddl-svg-style ddl_linestyle_none' },
            { text: '1,2', value: '1,2', className: 'ddl-svg-style ddl_linestyle_one_two' },
            { text: '3,3', value: '3,3', className: 'ddl-svg-style ddl_linestyle_three_three' },
            { text: '5,3', value: '5,3', className: 'ddl-svg-style ddl_linestyle_five_three' },
            { text: '4,4,1', value: '4,4,1', className: 'ddl-svg-style ddl_linestyle_four_four_one' }
        ];
        return borderStyles;
    };
  
    DropDownDataSources.prototype.fontFamilyList = function()
    {
        var fontFamilyList = [
            { text: 'Arial', value: 'Arial' },
            { text: 'Aharoni', value: 'Aharoni' },
            { text: 'Bell MT', value: 'Bell MT' },
            { text: 'Fantasy', value: 'Fantasy' },
            { text: 'Times New Roman', value: 'Times New Roman' },
            { text: 'Segoe UI', value: 'Segoe UI' },
            { text: 'Verdana', value: 'Verdana' },
        ];
        return fontFamilyList;
    };
    DropDownDataSources.prototype.textPositionDataSource = function()
    {
        var textPosition = [
            { text: 'TopLeft', value: 'TopLeft' }, { text: 'TopCenter', value: 'TopCenter' },
            { text: 'TopRight', value: 'TopRight' }, { text: 'MiddleLeft', value: 'MiddleLeft' },
            { text: 'Center', value: 'Center' }, { text: 'MiddleRight', value: 'MiddleRight' },
            { text: 'BottomLeft', value: 'BottomLeft' }, { text: 'BottomCenter', value: 'BottomCenter' },
            { text: 'BottomRight', value: 'BottomRight' },
        ];
        return textPosition;
    };
    return DropDownDataSources;
}());
