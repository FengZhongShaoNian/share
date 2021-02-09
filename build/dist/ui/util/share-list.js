const{db}=require("../../server/app/index");class ShareList{constructor(){this.callableListeners=[]}getAllItems(){return db.read().get("share-list").value()}addItem(e){db.read().get("share-list").insert(e).write();for(const e of this.callableListeners)e(this.getAllItems())}removeItem(e){db.read().get("share-list").remove({id:e}).write();for(const e of this.callableListeners)e(this.getAllItems())}addListChangeListener(e){if("function"!=typeof e)throw new Error("callback is not a valid function.");for(const t of this.callableListeners)if(t===e)return;this.callableListeners.push(e)}removeListChangeListener(e){let t;for(let s=0;s<this.callableListeners.length;++s)if(this.callableListeners[s]===e){t=s;break}void 0!==t&&this.callableListeners.splice(t,1)}triggerListUpdate(){for(const e of this.callableListeners)e(this.getAllItems())}}const shareList=new ShareList;module.exports=shareList;