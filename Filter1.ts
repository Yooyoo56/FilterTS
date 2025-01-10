// FILTER1. CASE1
interface Person {
	name: string;
	age: number;
}

// Databases
let people: Person[] = [
	{ name: "Alice", age: 25 },
	{ name: "Bob", age: 30 },
	{ name: "Charlie", age: 35 },
	{ name: "Yooyoo", age: 27 },
];

function filterPeople(
	people: Person[],
	filters: { name?: string; age?: number }
): Person[] {
	if (!people || people.length === 0) {
		console.error("[ERROR] The list of people is empty!");
		return [];
	}

	// check valid filter check
	if (!filters.name && filters.age === undefined) {
		console.error("[ERROR] No valid filters provided!");
		return [];
	}

	return people.filter((person) => {
		// verify filter condition
		const matchesName = filters.name ? person.name === filters.name : true;
		const matchesAge = filters.age ? person.age === filters.age : true;

		// Error log manage
		if (!matchesName && filters.name) {
			console.warn(`[WARN] ${person.name} does not match the name filter.😣`);
		}
		if (!matchesAge && filters.age !== undefined) {
			console.warn(`[WARN] ${person.name} does not match the age filter.🥺`);
		}

		// Return result
		return matchesName && matchesAge;
	});
}

// Usage
// Filtered Critiera
console.log("=================== Filter1 case1 ===================");

let criteria = { name: "Bob", age: 30 };
let filteredResults = filterPeople(people, criteria);
console.log("🥳Found result:", filteredResults);

// FILTER1. CASE2
// Define the type of User, which contains name and age
type User = {
	name: string;
	age: number;
};

// Define generic type Filter which returns boolean
type Filter<T> = (item: T) => boolean;

class FilterBuilder<T> {
	// We will save the conditionned filtered on array
	private filters: Filter<T>[] = [];

	// Method: It will add a new filter to the 'filter' array and return this
	addFilter(filter: Filter<T>): this {
		this.filters.push(filter);
		return this;
	}

	// Methode that it will combine all filters
	// It filter does not exist: send a warn message
	// If there's a filter, use 'every' to verify all filter. If filter exists, return true otherwise false.
	build(): Filter<T> {
		return (item: T) => {
			if (this.filters.length === 0) {
				console.warn("[WARN]😣 No filter has been defined ");
				return false;
			}
			return this.filters.every((filter) => filter(item));
		};
	}
}

// Example
console.log("=================== Filter1 case2 ===================");

const users: User[] = [
	{ name: "John Doe", age: 25 },
	{ name: "Jane Smith", age: 30 },
	{ name: "John Smith", age: 20 },
	{ name: "Alice Johnson", age: 25 },
	{ name: "John Johnson", age: 10 },
];

// Creation of filter as filterBuilder
const filterBuilder = new FilterBuilder<User>();

// Add a filter name for "John"
filterBuilder.addFilter((user) => user.name.includes("John"));

// Add a filter for age
filterBuilder.addFilter((user) => user.age === 10);

// Construct and add the combined filter
const combinedFilter = filterBuilder.build();
const filteredUsers = users.filter(combinedFilter);

// Manage error when users has not be found
if (filteredUsers.length === 0) {
	// Find the users that have not found
	const excludedUsers = users.filter((user) => !combinedFilter(user));
	const excludedNames = excludedUsers.map((user) => user.name);

	console.log("No result has been found on this filter.");
	console.log("Users that don't match the filter: ", excludedNames);
} else {
	console.log(filteredUsers);
}
