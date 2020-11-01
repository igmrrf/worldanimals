const mongoose = require('mongoose');

function objectId(req, res, next) {
  if (!mongoose.isValidObjectId(req.params[/\*id/]))
    return res.status(404).send('Invalid ID Provided');
}
mongoose.isValidObjectIds;
