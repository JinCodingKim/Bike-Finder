INSERT INTO users (auth_id, display_name, first_name, last_name, img) VALUES ($1, $2, $3, $4, $5) RETURNING *;