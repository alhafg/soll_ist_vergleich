sap.ui.define([
"sap/ui/core/Fragment",
], function (Fragment) {
	"use-strict";
	return sap.ui.controller("Soll_Ist_Vergleich_V2.ext.controller.GridListReportExt", {

		/**
		 * @public
		 */
		onInit: function (oEvent) {
			if (!this._sIdPrefix) {
				this._sIdPrefix =
					"Soll_Ist_Vergleich_V2::sap.suite.ui.generic.template.ListReport.view.ListReport::employee--";
			}

		},
		onAfterRendering: function (oEvent) {

			var oContentTable = this.byId(this._sIdPrefix + "GridTable");
			oContentTable.attachBusyStateChanged(this._onBusyStateChanged);

		},

		_onBusyStateChanged: function (oEvent) {

			var bBusy = oEvent.getParameter("busy");
			if (!bBusy && !this._bColumnOptimizationDone) {
				var oTable = oEvent.getSource();
				var oTpc = null;
				if (sap.ui.table.TablePointerExtension) {
					oTpc = new sap.ui.table.TablePointerExtension(oTable);
				} else {
					oTpc = new sap.ui.table.extensions.Pointer(oTable);
				}
				var aColumns = oTable.getColumns();
				for (var i = aColumns.length; i >= 0; i--) {
					oTpc.doAutoResizeColumn(i);
				}
				oTable.setFixedRowCount(1)
				debugger
				//oTable.fixedRowCount
				//This line can be commented if you want the columns to be adjusted on every scroll
				//this._bColumnOptimizationDone = true;
			}

		},
		onSelectData: function (oEvent) {
			if (!this.byId("mainDialog")) {
				Fragment.load({
					id: this.getView().getId(),
					name: "Soll_Ist_Vergleich_V2.ext.fragment.dialog",
					controller: this
				}).then(function (oDialog) {
					// connect dialog to the root view of this component (models, lifecycle)
					this.getView().addDependent(oDialog);
					debugger
					oDialog.setModel(this.getView().getModel("demoData"));
					oDialog.open();
				}.bind(this));
			} else {
				this.byId("mainDialog").open();
			}
		},
		onDialogClosePress: function (oEvent) {
			this.byId("mainDialog").close();
			this.byId("mainDialog").destroy();
		},
		/**
		 * @public
		 */
		onExit: function () {

		}
	});

});