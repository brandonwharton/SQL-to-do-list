CREATE TABLE todo_list (
	ID SERIAL PRIMARY KEY,
	task VARCHAR(255) NOT NULL,
	urgent BOOLEAN DEFAULT false,
	complete BOOLEAN DEFAULT false
)