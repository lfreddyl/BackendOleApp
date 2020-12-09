import { Encomienda } from '../interfaces/interfaces';
import { EncomiendaSchema } from '../models/Encomienda';
import mongoose from "mongoose";

const encomienda= mongoose.model('encomiendas',EncomiendaSchema);
export default class encomiendaservice {
    
    public createEncomienda(encomienda_params: Encomienda, callback: any) {
        const _session = new encomienda(encomienda_params);
        _session.save(callback);
        
    }

    public getEncomienda(callback: any) {
        encomienda.find({}, callback);
    }
    public filterEncomienda(query: any, callback: any) {
        encomienda.findOne(query, callback);
    }

    public updateEncomienda(encomienda_params: Encomienda, callback: any) {
        const query = { _id: encomienda_params._id };
        encomienda.findOneAndUpdate(query, encomienda_params, callback);
    }
    
    public deleteEncomienda(_id: String, callback: any) {
        const query = { _id: _id };
        encomienda.deleteOne(query, callback);
    }

}