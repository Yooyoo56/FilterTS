// Log the current filter being applied, including the constructed query
function logFilterQuery(filters: { name?: string; age?: number }) {
	let query = "Filter: WHERE ";
	const conditions = [];

	// Build conditions based on available filters (name, age)
	if (filters.name) {
		conditions.push(`"name" = "${filters.name}"`);
	}

	if (filters.age !== undefined) {
		conditions.push(`"age" = ${filters.age}`);
	}

	if (conditions.length === 0) {
		console.log("No filters applied.🥺");
	} else {
		query += conditions.join(" AND ");
		console.log(query); // Logging the constructed query
	}
}

// Main execution to demonstrate logging based on user input
function executeFilters() {
	// Define different filter scenarios:
	// Scenario 1: Name is John, Age is 25
	let filterCriteria1 = { name: "John", age: 25 };
	console.log("Input : name: John, age: 25 ");
	logFilterQuery(filterCriteria1); // Log the query here

	// Scenario 2: Name is John only (Age is not provided)
	let filterCriteria2 = { name: "John" };
	console.log("\nInput : name: John");
	logFilterQuery(filterCriteria2); // Log the query here

	// Scenario 3: Age is 25 only (Name is not provided)
	let filterCriteria3 = { age: 25 };
	console.log("\nInput : age:25");
	logFilterQuery(filterCriteria3); // Log the query here
}

// Execute the logging process
executeFilters();
