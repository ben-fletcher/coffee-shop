package repositories

import (
	"database/sql"

	"ben-fletcher.com/coffee-shop/models"
)

type ICoffeeRepository interface {
	GetAllCoffees() ([]models.Coffee, error)
	GetCoffeeById(id int) (models.Coffee, error)
	CreateCoffee(coffee models.Coffee) (models.Coffee, error)
	UpdateCoffee(coffee models.Coffee) (models.Coffee, error)
	DeleteCoffee(id int) error
}

type CoffeeRepository struct {
	db *sql.DB
}

// CreateCoffee implements ICoffeeRepository.
func (c *CoffeeRepository) CreateCoffee(coffee models.Coffee) (models.Coffee, error) {
	query := `INSERT INTO coffees (name, price, description, image, category) VALUES (?, ?, ?, ?, ?)`
	_, err := c.db.Exec(query, coffee.Name, coffee.Price, coffee.Description, coffee.Image, coffee.Category)
	if err != nil {
		return models.Coffee{}, err
	}
	return coffee, nil
}

// DeleteCoffee implements ICoffeeRepository.
func (c *CoffeeRepository) DeleteCoffee(id int) error {
	query := `DELETE FROM coffees WHERE id = ?`
	_, err := c.db.Exec(query, id)
	if err != nil {
		return err
	}
	return nil
}

// GetAllCoffees implements ICoffeeRepository.
func (c *CoffeeRepository) GetAllCoffees() ([]models.Coffee, error) {
	query := `SELECT * FROM coffees`
	rows, err := c.db.Query(query)
	if err != nil {
		return []models.Coffee{}, err
	}
	defer rows.Close()
	var coffees []models.Coffee
	for rows.Next() {
		var coffee models.Coffee
		err := rows.Scan(&coffee.ID, &coffee.Name, &coffee.Price, &coffee.Description, &coffee.Image, &coffee.Category, &coffee.CreatedAt, &coffee.UpdatedAt)
		if err != nil {
			return []models.Coffee{}, err
		}
		coffees = append(coffees, coffee)
	}
	return coffees, nil
}

// GetCoffeeById implements ICoffeeRepository.
func (c *CoffeeRepository) GetCoffeeById(id int) (models.Coffee, error) {
	query := `SELECT * FROM coffees WHERE id = ?`
	row := c.db.QueryRow(query, id)
	var coffee models.Coffee
	err := row.Scan(&coffee.ID, &coffee.Name, &coffee.Price, &coffee.Description, &coffee.Image, &coffee.Category, &coffee.CreatedAt, &coffee.UpdatedAt)
	if err != nil {
		return models.Coffee{}, err
	}
	return coffee, nil
}

// UpdateCoffee implements ICoffeeRepository.
func (c *CoffeeRepository) UpdateCoffee(coffee models.Coffee) (models.Coffee, error) {
	query := `UPDATE coffees SET name = ?, price = ?, description = ?, image = ?, category = ? WHERE id = ?`
	_, err := c.db.Exec(query, coffee.Name, coffee.Price, coffee.Description, coffee.Image, coffee.Category, coffee.ID)
	if err != nil {
		return models.Coffee{}, err
	}
	return coffee, nil
}

func NewCoffeeRepository(db *sql.DB) ICoffeeRepository {
	return &CoffeeRepository{db: db}
}
