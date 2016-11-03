const bellTower_model = {
	data: {
		common_name: "",
		numLandings: 0,
		numBells: 0,
		bells: {

		},
		exterior: {
			exterior_field1: "",
			exterior_field2: "",
		},
		landings: {
			belfry: {
				landing_field1: "",
				landing_field2: "",
			},
			groundFloor: {
				landing_field1: "",
				landing_field2: "",
			}
		}
	}
};

const landingSection_model = {
	landing_field1: "",
	landing_field2: "",
}

const bell_model = {
	bell_field1: "",
	bell_field2: "",
}

exports.bellTowerModel = bellTower_model;
exports.landingSectionModel = landingSection_model;
exports.bellModel = bell_model;
