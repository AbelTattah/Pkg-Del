
var closestRiderIndex = 0;
var distanceOfRider= 0;

function findClosestCoordinate(coordinates, targetCoordinate) {
    if (!coordinates || !Array.isArray(coordinates) || coordinates.length === 0) {
        console.error("Invalid coordinates array");
        return;
    }

    if (!targetCoordinate || typeof targetCoordinate !== 'object' || isNaN(targetCoordinate.lat) || isNaN(targetCoordinate.long)) {
        console.error("Invalid target coordinate");
        return;
    }

    let closestCoordinate = coordinates[0];
    let minDistance = getDistance(coordinates[0], targetCoordinate);

    for (let i = 1; i < coordinates.length; i++) {
        const distance = getDistance(coordinates[i], targetCoordinate);
        if (distance < minDistance) {
            minDistance = distance;
            distanceOfRider = minDistance;
            closestCoordinate = coordinates[i];
            closestRiderIndex = i;
        }
    }

    console.log("Closest coordinate:",closestCoordinate);
    console.log("Index:",closestRiderIndex);
    console.log("Distance:",distanceOfRider,"meters");
}

function getDistance(coord1, coord2) {
    const lat1 = coord1.lat;
    const lon1 = coord1.long;
    const lat2 = coord2.lat;
    const lon2 = coord2.long;

    const R = 6371e3; // metres
    const φ1 = lat1 * Math.PI / 180; // φ, λ in radians
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c; // in metres
    return distance;
}

// Example usage:
const coordinates = [
    { lat: 4.332, long: 0.001 },
    { lat: 4.332, long: 0.14 },
    { lat: 4.330, long: 0.3 }
];
const targetCoordinate = { lat: 4.331, long: 0.15 };
console.log(findClosestCoordinate(coordinates, targetCoordinate));
