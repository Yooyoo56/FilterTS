import * as fs from "fs/promises"; // For reading the JSON file

// Person interface
interface Person {
	name: string;
	age: number;
}

// In-memory data
let people: Person[] = [
	{ name: "Alice", age: 25 },
	{ name: "Bob", age: 30 },
	{ name: "Charlie", age: 35 },
	{ name: "Yooyoo", age: 27 },
];

// Generic filter builder class
type Filter<T> = (item: T) => boolean;

class FilterBuilder<T> {
	private filters: Filter<T>[] = [];

	// Add a filter to the filter array
	addFilter(filter: Filter<T>): this {
		this.filters.push(filter);
		return this;
	}

	// Build the combined filter and log warnings if no filter has been defined
	build(): Filter<T> {
		return (item: T) => {
			if (this.filters.length === 0) {
				console.warn("[WARN] No filter has been defined.");
				return false;
			}
			return this.filters.every((filter) => filter(item));
		};
	}
}

// Function to filter data from in-memory list
function filterInMemoryData<T>(data: T[], filter: Filter<T>): T[] {
	return data.filter(filter);
}

// Function to filter data from a JSON file
async function filterFromJson<T>(
	filePath: string,
	filter: Filter<T>
): Promise<T[]> {
	try {
		const fileContents = await fs.readFile(filePath, "utf-8");
		const jsonData: T[] = JSON.parse(fileContents);
		return jsonData.filter(filter);
	} catch (error) {
		console.error("[ERROR] Failed to read or process the file.", error);
		return [];
	}
}

// Log the current filter being applied
function logFilterQuery(filters: { name?: string; age?: number }) {
	let query = "Filter: WHERE ";
	const conditions = [];

	if (filters.name) {
		conditions.push(`"name" = "${filters.name}"`);
	}

	if (filters.age !== undefined) {
		conditions.push(`"age" = ${filters.age}`);
	}

	if (conditions.length === 0) {
		console.log("No filters applied.");
	} else {
		query += conditions.join(" AND ");
		console.log(query); // Logging the generated query
	}
}

// Main execution to demonstrate filtering from both memory and JSON file
async function executeFilters() {
	// Define filter criteria for name "Bob" and age 30
	let filterCriteria = { name: "Bob", age: 30 };
	logFilterQuery(filterCriteria); // Log the query here

	// Build filter using FilterBuilder
	const filterBuilder = new FilterBuilder<Person>();
	filterBuilder.addFilter((person) => person.name === filterCriteria.name);
	filterBuilder.addFilter((person) => person.age === filterCriteria.age);
	const combinedFilter = filterBuilder.build();

	// Filter data from in-memory list
	console.log("==================== Filter In-Memory Data ==================");
	let filteredResultsInMemory = filterInMemoryData(people, combinedFilter);
	console.log("Filtered In-Memory Results🥳:", filteredResultsInMemory);

	// Filter data from JSON file (assuming users.json exists)
	console.log("==================== Filter From JSON File ==================");
	let filteredResultsFromJson = await filterFromJson<Person>(
		"users.json", // The JSON file path
		combinedFilter
	);
	console.log("Filtered Results From JSON File🥳:", filteredResultsFromJson);
}

// Execute filtering
executeFilters();
