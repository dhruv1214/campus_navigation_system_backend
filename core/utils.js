

function beautifyJson(rowObj) {
	// Assuming rowObj is a Neo4j record object with a structure like { keys: [], _fields: [], _fieldLookup: {} }

	// This function will extract the properties from the Neo4j node and return them in a clean JSON format
	const cleanJson = rowObj.keys.reduce((accumulator, key, index) => {
		const fieldValue = rowObj._fields[index];

		// Check if the value is a Neo4j Node object and extract its properties
		if (fieldValue && fieldValue.properties) {
			accumulator = { ...fieldValue.properties };
			accumulator.id = fieldValue.identity.low || fieldValue.identity;
			accumulator.labels = fieldValue.labels;
		} else {
			accumulator[key] = fieldValue;
		}

		return accumulator;
	}, {});

	return cleanJson;
}




module.exports = {
	beautifyJson,
};