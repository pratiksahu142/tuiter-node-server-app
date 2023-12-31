import tuitsModel from './tuits-model.js';

export const findTuits = () => tuitsModel.find();
export const findTuit = (tid) => tuitsModel.findById(tid);
export const createTuit = (tuit) => tuitsModel.create(tuit);
export const deleteTuit = (tid) => tuitsModel.deleteOne({_id: tid});
export const updateTuit = (tid, tuit) => tuitsModel.updateOne({_id: tid},
    {$set: tuit})