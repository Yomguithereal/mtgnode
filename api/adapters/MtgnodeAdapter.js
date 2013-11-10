/*---------------------------------------------------------------
    :: DiskAdapter
    -> adapter

    This disk adapter is for development only!
---------------------------------------------------------------*/

var _ = require('lodash');
var fs = require('fs-extra');

module.exports = (function () {

    // Load criteria module
    var getMatchIndices = require('waterline-criteria');

    // In memory representation of the data model
    var data = { };
    var schema = { };
    var counters = { };
    var collections = { };

    var adapter = {

        // Whether this adapter is syncable (yes)
        syncable: true,

        // How this adapter should be synced
        migrate: 'alter',

        // Allow a schemaless datastore
        defaults: {
            schema: false
        },

        // File path for disk file output
        filePath: 'db/disk.json',

        registerCollection: function (collection, cb) {

            // Save reference to collection so we have it
            collection[collection.identity] = collection;
            cb();
        },

        // Return attributes
        describe: function (collectionName, cb) {
            read();
            cb(null, schema[collectionName]);
        },

        // Adapters are not responsible for checking for existence of the collection
        define: function (collectionName, definition, cb) {
            data[collectionName] = [];
            counters[collectionName] = {};
            schema[collectionName] = _.clone(definition);

            write();
            cb(null, schema[collectionName]);
        },

        drop: function (collectionName, cb) {

            delete data[collectionName];
            delete schema[collectionName];
            delete counters[collectionName];

            write();
            cb();
        },

        find: function (collectionName, options, cb) {

            // read();

            // Get indices from original data which match, in order
            var matchIndices = getMatchIndices(data[collectionName],options);

            var resultSet = [];
            _.each(matchIndices,function (matchIndex) {
                resultSet.push(_.clone(data[collectionName][matchIndex]));
            });

            cb(null, resultSet);
        },

        create: function (collectionName, values, cb) {

            for (var attrName in schema[collectionName]) {

                var attrDef = schema[collectionName][attrName];

                if (attrDef.unique) {
                    for (var index in data[collectionName]) {

                        // Ignore uniquness check on undefined values
                        // ('required' check is taken care of in waterline core)
                        if (_.isUndefined(values[attrName])) {
                            continue;
                        }

                        if (values[attrName] === data[collectionName][index][attrName]) {
                            return cb('Uniqueness check failed on attribute: ' + attrName + ' with value: ' + values[attrName]);
                        }
                    }
                }

                // Only apply autoIncrement if value is not specified
                if (attrDef.autoIncrement && !values[attrName]) {

                    // Increment AI counter
                    if (counters[collectionName][attrName]) {
                        counters[collectionName][attrName]++;
                    }
                    else counters[collectionName][attrName] = 1;

                    // Set data to current auto-increment value
                    values[attrName] = counters[collectionName][attrName];

                }
            }

            data[collectionName].push(values);

            write();

            cb(null, values);
        },

        update: function (collectionName, options, values, cb) {

            // Get indices from original data which match, in order
            var matchIndices = getMatchIndices(data[collectionName],options);

            var resultSet = [];
            _.each(matchIndices,function (matchIndex) {
                data[collectionName][matchIndex] = _.extend(data[collectionName][matchIndex], values);
                resultSet.push(_.clone(data[collectionName][matchIndex]));
            });

            write();

            cb(null, resultSet);
        },

        destroy: function (collectionName, options, cb) {

            // Get indices from original data which match, in order
            var matchIndices = getMatchIndices(data[collectionName], options);

            // Delete data which matches the criteria
            data[collectionName] = _.reject(data[collectionName], function (model, i) {
                return _.contains(matchIndices, i);
            });

            write();

            cb();
        }

    };

    return adapter;


    // Write and read the entire data model
    // to and from disk synchronously
    // Extremely inefficient!
    // (but that's ok this is just for development)
    function read() {
        if (!fs.existsSync(adapter.filePath)) return;

        var state;

        try {
            state = JSON.parse(fs.readFileSync(adapter.filePath, 'utf8'));
        }
        catch (e){
            return;
        }

        // If the read worked, grab the data from disk
        data = state.data;
        schema = state.schema;
        counters = state.counters;
    }
    function write() {
        return fs.outputJsonSync(adapter.filePath, {
            data: data,
            schema: schema,
            counters: counters
        });
    }

})();
