// MongoDB initialization script
db = db.getSiblingDB('mecmain');

// Create collections
db.createCollection('users');
db.createCollection('workshops');
db.createCollection('maintenancerecords');
db.createCollection('trainingmodules');
db.createCollection('vehicles');

// Create indexes for better performance
db.users.createIndex({ email: 1 }, { unique: true });
db.users.createIndex({ workshopId: 1 });
db.users.createIndex({ role: 1 });

db.workshops.createIndex({ ownerId: 1 });
db.workshops.createIndex({ 'address.city': 1 });
db.workshops.createIndex({ isActive: 1 });

db.maintenancerecords.createIndex({ workshopId: 1 });
db.maintenancerecords.createIndex({ vehicleId: 1 });
db.maintenancerecords.createIndex({ technicianId: 1 });
db.maintenancerecords.createIndex({ date: -1 });

db.trainingmodules.createIndex({ category: 1 });
db.trainingmodules.createIndex({ difficulty: 1 });
db.trainingmodules.createIndex({ isActive: 1 });

db.vehicles.createIndex({ workshopId: 1 });
db.vehicles.createIndex({ licensePlate: 1 });
db.vehicles.createIndex({ make: 1, model: 1 });

print('MongoDB initialization completed successfully!');
