/*
| -------------------------------------------------------------------
|  MTGNode Playground Controller
| -------------------------------------------------------------------
|
|
|   Author : Yomguithereal
|   Version : 1.0
*/

// Index
//-------
exports.playground = function(req, res){
    res.json({id: req.param('id')});
}
