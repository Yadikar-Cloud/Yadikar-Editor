tinymce.PluginManager.add("chart", function(editor, url)
{
	// Chart.js v2.6.0

	var myTempCanvas;
	var myTempChart;
	var myTempSrcData;
	var defaultCentered = false;
	var canvasWidth = 400;
	var canvasHeight = 300;

	var toolbarIcon;

	var STRING_CHART = "";
	var STRING_INSERTEDITCHART = "";
	var STRING_CHARTTYPE = "";
	var STRING_CHARTBAR = "";
	var STRING_CHARTPIE = "";
	var STRING_CHARTLINE = "";
	var STRING_CHARTWIDTH = "";
	var STRING_CHARTHEIGHT = "";
	var STRING_CENTERED = "";
	var STRING_CHARTDESCRIPTION = "";

	if (editor.settings.language=="es")
		{
		STRING_CHART = "Gr\u00E1fico";
		STRING_INSERTEDITCHART = "Insertar/editar gr\u00E1fico";
		STRING_CHARTTYPE = "Tipo de gr\u00E1fico";
		STRING_CHARTBAR = "Barra";
		STRING_CHARTPIE = "Torta";
		STRING_CHARTLINE = "L\u00EDnea";
		STRING_CHARTWIDTH = "Ancho del gr\u00E1fico";
		STRING_CHARTHEIGHT = "Alto del gr\u00E1fico";
		STRING_CENTERED = "Centrado";
		STRING_CHARTDESCRIPTION = "Ingrese el c\u00F3digo del gr\u00E1fico (cada l\u00EDnea es un registro, ejemplo: Marzo,10,blue)";
		}
		else
		{
		STRING_CHART = "Chart";
		STRING_INSERTEDITCHART = "Insert/edit chart";
		STRING_CHARTTYPE = "Chart type";
		STRING_CHARTBAR = "Bar";
		STRING_CHARTPIE = "Pie";
		STRING_CHARTLINE = "Line";
		STRING_CHARTWIDTH = "Chart Width";
		STRING_CHARTHEIGHT = "Chart Height";
		STRING_CENTERED = "Centered";
		STRING_CHARTDESCRIPTION = "Input the chart code (each line is an entry, example: March,10,blue)";
		}

	function createChart(e)
		{
		canvasWidth = canvasWidth;
		canvasHeight = canvasHeight;

		var inputtedWidth = e.data.chartWidth;
		var inputtedHeight = e.data.chartHeight;

		if (inputtedWidth!="")
			{
			if (isOnlyNumbers(inputtedWidth)==true)
				{
				if (parseInt(inputtedWidth)>0)
					{
					canvasWidth = parseInt(inputtedWidth);
					}
				}
			}

		if (inputtedHeight!="")
			{
			if (isOnlyNumbers(inputtedHeight)==true)
				{
				if (parseInt(inputtedHeight)>0)
					{
					canvasHeight = parseInt(inputtedHeight);
					}
				}
			}

		myTempCanvas = document.createElement("canvas");
		myTempCanvas.id = "ChartJsTemp";
		myTempCanvas.width = canvasWidth;
		myTempCanvas.height = canvasHeight;
		myTempCanvas.style.display = "none";
		document.body.appendChild(myTempCanvas);

		var myLabels = [];
		var myDatasetsColor = [];
		var myDatasetsValue = [];
		var myDataChartType = e.data.chartType;
		var myDataRaw = e.data.chartcode;

		var myDatasets;
		if (myDataChartType=="2")
			{
			myDatasets = [{backgroundColor: myDatasetsColor, data: myDatasetsValue, fill:false, borderColor: "#3facee", pointBackgroundColor: "#3facee"}];
			}
			else
			{
			myDatasets = [{backgroundColor: myDatasetsColor, data: myDatasetsValue}];
			}

		if (myDataRaw!="")
			{
			var myDataLines = myDataRaw.split("\n");

			myTempSrcData = "chartTinyMCE" + myDataChartType + "," + canvasWidth + "," + canvasHeight + "///";

			for(var i = 0;i < myDataLines.length;i++)
				{
				if (i>0)
					{
					myTempSrcData = myTempSrcData + "---";
					}
				myTempSrcData = myTempSrcData + myDataLines[i];

				var myDataLine = myDataLines[i].split(",");

				var barLabel = myDataLine[0];
				var barValue = myDataLine[1];
				var barColor = myDataLine[2];

				if (barLabel!="")
					{
					myLabels.push(barLabel);
					}
					else
					{
					myLabels.push("-");
					}

				if (barValue!="")
					{
					myDatasetsValue.push(barValue);
					}
					else
					{
					myDatasetsValue.push(0);
					}

				if (myDataChartType=="2")
					{
					myDatasetsColor.push("#3facee");
					}
				else
					{
					if (barColor!="")
						{
						myDatasetsColor.push(barColor);
						}
						else
						{
						myDatasetsColor.push("grey");
						}
					}
				}

			defaultCentered = e.data.chartCentered;

			editor.setProgressState(true);
			editor.setMode("readonly");

			if (myDataChartType=="0")
				{
				myTempChart = new Chart(document.getElementById("ChartJsTemp").getContext("2d"),
					{
					type: "bar",
					data: {labels:myLabels, datasets: myDatasets},
					options:
						{
						layout:{padding:{left:15,right:0,top:25,bottom:0}},
						showDatapoints:true,
						responsive:false,
						maintainAspectRatio: false,
						title:{display:false},
						legend:{display:false},
						scales:{xAxes:[{gridLines:{display:false},ticks:{min:0}}],yAxes:[{gridLines:{display:false},ticks:{min:0,precision:0}}]},
						animation:
							{
							onComplete: function ()
								{
								var chartInstance = this.chart, ctx = chartInstance.ctx;
								ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
								ctx.textAlign = "center";
								ctx.textBaseline = "bottom";

								this.data.datasets.forEach(function (dataset, i)
									{
									var meta = chartInstance.controller.getDatasetMeta(i);
									meta.data.forEach(function (bar, index)
										{
										var data = dataset.data[index];
										ctx.fillText(data, bar._model.x, bar._model.y - 5);
										});
									});

								chartToImg();
								}
							},
						}
					});
				}
			else if (myDataChartType=="1")
				{
				myTempChart = new Chart(document.getElementById("ChartJsTemp").getContext("2d"),
					{
					type: "pie",
					data: {labels:myLabels, datasets: myDatasets},
					options:
						{
						layout:{padding:{left:0,right:0,top:0,bottom:0}},
						showDatapoints:true,
						responsive:false,
						maintainAspectRatio: false,
						title:{display:false},
						animation:
							{
							onComplete: function ()
								{
								var chartInstance = this.chart, ctx = chartInstance.ctx;
								ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
								ctx.textAlign = "center";
								ctx.textBaseline = "bottom";

								this.data.datasets.forEach(function (dataset)
									{
									for (var i = 0; i < dataset.data.length; i++)
										{
										var model = dataset._meta[Object.keys(dataset._meta)[0]].data[i]._model,
													total = dataset._meta[Object.keys(dataset._meta)[0]].total,
													mid_radius = model.innerRadius + (model.outerRadius - model.innerRadius)/2,
													start_angle = model.startAngle,
													end_angle = model.endAngle,
													mid_angle = start_angle + (end_angle - start_angle)/2;

										var x = mid_radius * Math.cos(mid_angle);
										var y = mid_radius * Math.sin(mid_angle);

										ctx.fillStyle = "#fff";
										if (i == 3)
											{
											ctx.fillStyle = "#444";
											}

										var val = dataset.data[i];
										var percent = String(Math.round(val/total*100)) + "%";

										if(val != 0)
											{
											ctx.fillText(dataset.data[i], model.x + x, model.y + y);
											ctx.fillText(percent, model.x + x + 2, model.y + y + 15);
											}
										}
									});

								chartToImg();
								}
							},
						}
					});
				}
			else if (myDataChartType=="2")
				{
				myTempChart = new Chart(document.getElementById("ChartJsTemp").getContext("2d"),
					{
					type: "line",
					data: {labels:myLabels, datasets: myDatasets},
					options:
						{
						layout:{padding:{left:15,right:20,top:25,bottom:0}},
						showDatapoints:true,
						responsive:false,
						maintainAspectRatio: false,
						title:{display:false},
						legend:{display: false},
						scales:{xAxes:[{gridLines:{display:false}}],yAxes:[{gridLines:{display:false},ticks:{precision:0}}]},
						animation:
							{
							onComplete: function ()
								{
								var chartInstance = this.chart, ctx = chartInstance.ctx;
								ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
								ctx.textAlign = "center";
								ctx.fillStyle = "gray";
								ctx.textBaseline = "bottom";

								this.data.datasets.forEach(function (dataset, i)
									{
									var meta = chartInstance.controller.getDatasetMeta(i);
									meta.data.forEach(function (bar, index)
										{
										var data = dataset.data[index];
										ctx.fillText(data, bar._model.x, bar._model.y - 5);
										});
									});

								chartToImg();
								}
							},
						}
					});
				}
			}
		}

	function chartToImg()
		{
		var url = myTempChart.toBase64Image();
		if (defaultCentered==true)
			{
			editor.insertContent("<img src=\"" + url + "\" width=\"" + canvasWidth + "\" height=\"" + canvasHeight + "\"  alt=\"" + myTempSrcData +  "\" style=\"display:block;margin-left:auto;margin-right:auto;\">");
			}
			else
			{
			editor.insertContent("<img src=\"" + url + "\" width=\"" + canvasWidth + "\" height=\"" + canvasHeight + "\"  alt=\"" + myTempSrcData +  "\">");
			}
		document.body.removeChild(myTempCanvas);
		editor.setProgressState(false);
		editor.setMode("design");
		}

	function isInt(n)
		{
		return Number(n) === n && n % 1 === 0;
		}

	function isFloat(n)
		{
		return Number(n) === n && n % 1 !== 0;
		}

	function isOnlyNumbers(a)
		{
		for (var i = 0; i <= a.length; i++)
			{
			var value = a.charCodeAt(i);
			if (value < 48 || value > 57)
				{
				return false;
				}
			}
		return true;
		}

	function replaceAll(str, find, replace)
		{
		return str.replace(new RegExp(find, "g"), replace);
		}

		function createDialog()
		{
			var imageStoredNode = editor.selection.getNode();
			var imageStoredAlt = imageStoredNode.alt;
			var defaultChartCode = "";
			var defaultCharType = "0";
			var defaultChartWidth = canvasWidth;
			var defaultChartHeight = canvasHeight;
			defaultCentered = false;

			if (imageStoredAlt != null)
			{
				try
				{
				    defaultChartCode = imageStoredAlt;
				    defaultChartCode = defaultChartCode.substring(defaultChartCode.indexOf("///") + 3, defaultChartCode.length);
				    defaultChartCode = replaceAll(defaultChartCode, "---", "\n");
				    var tempData = imageStoredAlt.split("///");
				    var tempDataValues = tempData[0].split(",");
				    var tempDataValueCharType = tempDataValues[0];
				    tempDataValueCharType = tempDataValueCharType.substring(tempDataValueCharType.length - 1, tempDataValueCharType.length);
				    var tempDataValueWidth = tempDataValues[1];
				    var tempDataValueHeight = tempDataValues[2];

				    if (isInt(parseInt(tempDataValueCharType)))
				    {
				        defaultCharType = tempDataValueCharType;
				    }

				    if (isInt(parseInt(tempDataValueWidth)) || isFloat(parseFloat(tempDataValueWidth)))
				    {
				        defaultChartWidth = tempDataValueWidth;
				    }

				    if (isInt(parseInt(tempDataValueHeight)) || isFloat(parseFloat(tempDataValueHeight)))
				    {
				        defaultChartHeight = tempDataValueHeight;
				    }
				}
				catch(err)
				{
				}

				try
				{
				    var checkingCentered1 = imageStoredNode.style.display;
				    var checkingCentered2 = imageStoredNode.style["margin-left"];
				    var checkingCentered3 = imageStoredNode.style["margin-right"];
				    if (checkingCentered1 == "block" && checkingCentered2 == "auto" && checkingCentered3 == "auto")
				    {
				        defaultCentered = true;
				    }
				}
				catch(err)
				{
				}
			}

			editor.windowManager.open({
				title: STRING_INSERTEDITCHART,
				body: {
				    type: 'panel',
				    items: [
				        {
				            type: 'selectbox',
				            name: 'chartType',
				            label: STRING_CHARTTYPE,
				            items: [
				                {text: STRING_CHARTBAR, value: '0'},
				                {text: STRING_CHARTPIE, value: '1'},
				                {text: STRING_CHARTLINE, value: '2'}
				            ]
				        },
				        {
				            type: 'input',
				            name: 'chartWidth',
				            label: STRING_CHARTWIDTH
				        },
				        {
				            type: 'input',
				            name: 'chartHeight',
				            label: STRING_CHARTHEIGHT
				        },
				        {
				            type: 'checkbox',
				            name: 'chartCentered',
				            label: STRING_CENTERED
				        },
				        {
				            type: 'label',
				            label: STRING_CHARTDESCRIPTION,
				            items: []
				        },
				        {
				            type: 'textarea',
				            name: 'chartcode',
				            placeholder: ''
				        }
				    ]
				},
				buttons: [
				    {
				        type: 'cancel',
				        text: 'Cancel'
				    },
				    {
				        type: 'submit',
				        text: 'Insert',
				        primary: true
				    }
				],
				initialData: {
				    chartType: defaultCharType,
				    chartWidth: String(defaultChartWidth),
				    chartHeight: String(defaultChartHeight),
				    chartCentered: defaultCentered,
				    chartcode: defaultChartCode
				},
				onSubmit: function(api) {
				    var data = api.getData();
				    createChart({data: data});
				    api.close();
				}
			});
		}
		
		editor.ui.registry.addToggleButton("chart", {
			tooltip: STRING_INSERTEDITCHART,
			icon: 'chart',
			onAction: function() {
				createDialog();
			},
			onSetup: function(api) {
				var updateButtonState = function() {
				    try {
				        var imageStoredNode = editor.selection.getNode();
				        var imageStoredAlt = imageStoredNode.alt;
				        if (imageStoredNode.nodeName == "IMG") {
				            if (imageStoredAlt && imageStoredAlt.substring(0, 12) == "chartTinyMCE") {
				                api.setActive(true);
				            } else {
				                api.setActive(false);
				            }
				        } else {
				            api.setActive(false);
				        }
				    } catch(err) {
				        api.setActive(false);
				    }
				};

				// Update button state on selection change
				editor.on('NodeChange', updateButtonState);
				
				// Initial state
				updateButtonState();

				// Cleanup on button removal
				return function() {
				    editor.off('NodeChange', updateButtonState);
				};
			}
		});

		editor.ui.registry.addMenuItem("chart", {
		  text: STRING_CHART,
		  context: "insert",
		  onAction: function() {
			createDialog();
		  }
		});

	return{getMetadata: function (){return {name: "Chart plugin",url: "https://lrusso.com.ar"};}};
});
