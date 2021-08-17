DROP TABLE IF EXISTS users;

CREATE TABLE users(
     id SERIAL PRIMARY KEY,
     first VARCHAR NOT NULL,
     last VARCHAR NOT NULL,
     email VARCHAR UNIQUE NOT NULL,
     hashed_password VARCHAR NOT NULL,
     img_url TEXT,
     bio TEXT,
     timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
 ); 

 DROP TABLE IF EXISTS reset_codes;

  CREATE TABLE reset_codes(
    id SERIAL PRIMARY KEY,
    email VARCHAR NOT NULL REFERENCES users (email),
    code VARCHAR NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

DROP TABLE IF EXISTS friendships;

   CREATE TABLE friendships(
   id SERIAL PRIMARY KEY,
   sender_id INT REFERENCES users(id) NOT NULL,
   recipient_id INT REFERENCES users(id) NOT NULL,
   accepted BOOLEAN DEFAULT false
);

DROP TABLE IF EXISTS messages; 

   CREATE TABLE messages(
   id SERIAL PRIMARY KEY,
   text TEXT,
   user_id INT REFERENCES users(id) NOT NULL,
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);