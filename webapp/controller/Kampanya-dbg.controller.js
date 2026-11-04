sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("zfiotelselkampanyagiris.zfiotelselkampanyagiris.controller.Kampanya", {
            onInit: function () {

              var oModel = new sap.ui.model.json.JSONModel({
                dDefaultDate : new Date()
            });
            this.getView().setModel(oModel, "view");

                var e = this;
                this.oBundle = this.getOwnerComponent()
                  .getModel("i18n")
                  .getResourceBundle();
            },
            onKisiSil: function (oEvent) {
              var oList = oEvent.getSource(),
                oItem = oEvent.getParameter("listItem"),
                sPath = oItem.getBindingContext().getPath();
      
              var that = this;
              sap.m.MessageBox.confirm("Kampanya silinecek, emin misiniz?", {
                title: "Bilgilendirme",
                actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
                styleClass: "messageBoxError",
                onClose: function (e) {
                  if (e === sap.m.MessageBox.Action.YES) {
                    var oModel = that.getView().getModel();
                    // after deletion put the focus back to the list
                    oList.attachEventOnce("updateFinished", oList.focus, oList);
                    // send a delete request to the odata service
                    oModel.remove(sPath);
      
                    sap.ui.core.BusyIndicator.hide(0);
                    sap.m.MessageToast.show("Kampanya Silindi");
                  }
                },
              });
            },

            onSave:function(){ 
                var that = this;
                var  begda = this.getView().byId("idDate1").getValue(); 
                var  endda = this.getView().byId("idDate2").getValue(); 
                if( begda > endda){
                    sap.m.MessageToast.show("Başlangıç tarihi bitiş tarihinden büyük olamaz!"); 
                return false;
                }
                var text = this.getView().byId("idTxtArea1").getValue();
                if(text==""){
                    sap.m.MessageToast.show("Lütfen kampanya/duyuru girişi yapınız!"); 
                return false;
                }

                var uname = sap.ushell.Container.getService("UserInfo").getId();
                
                var oModel = this.getView().getModel();
                var data = {}; 
                sap.m.MessageBox.confirm("Kampanya/Duyuru kaydedilecek, emin misiniz?", {
                    title: "Bilgilendirme",
                    actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
                    styleClass: "messageBoxError",
                    onClose: function (e) {
                      if (e === sap.m.MessageBox.Action.YES) { 

                    data.Begda = begda;
                    data.Endda = endda;
                    data.Text  = text;
                    data.Uname = uname;
                
                    oModel.create("/KampanyaSet", data, {
                    success: function (oData, oResponse) { 
    
                     sap.m.MessageToast.show("Kampanya/Duyuru Başarıyla Kaydedildi"); 
                      that.byId("idDate1").setValue(null);
                      that.byId("idDate2").setValue(null);   
                      that.byId("idTxtArea1").setValue("");   
                      oModel.refresh();
                      sap.ui.core.BusyIndicator.hide(0);  
                    },
                          error: function (err) { 
                            sap.ui.core.BusyIndicator.hide(0);
                          },
                        });
                      } else {
                        sap.m.MessageToast.show("Kampanya/Duyuru kaydedilmedi!");
                      }
                    },
                  });
          
                  sap.ui.core.BusyIndicator.hide(0); 

            }
        });
    });
