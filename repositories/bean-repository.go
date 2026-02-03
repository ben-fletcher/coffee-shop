package repositories

import (
	"database/sql"
	"fmt"

	"ben-fletcher.com/coffeeshop/models"
)

type IBeanRepository interface {
	GetAllBeans() ([]models.Bean, error)
	GetBeanById(id int) (models.Bean, error)
	AddBean(bean models.Bean) (models.Bean, error)
}

func NewBeanRepository(db *sql.DB) IBeanRepository {
	return &BeanRepository{db: db}
}

type BeanRepository struct {
	db *sql.DB
}

const beanTableName = "public.\"Beans\""

func (b *BeanRepository) GetAllBeans() ([]models.Bean, error) {
	query := fmt.Sprintf("SELECT * FROM %s", beanTableName)
	rows, err := b.db.Query(query)
	if err != nil {
		return []models.Bean{}, err
	}
	defer rows.Close()
	var beans []models.Bean
	for rows.Next() {
		var bean models.Bean
		err := rows.Scan(&bean.ID, &bean.Name, &bean.Description)
		if err != nil {
			return []models.Bean{}, err
		}
		beans = append(beans, bean)
	}
	return beans, nil
}

func (b *BeanRepository) GetBeanById(id int) (models.Bean, error) {
	query := fmt.Sprintf("SELECT * FROM %s WHERE \"Id\" = $1", beanTableName)
	row := b.db.QueryRow(query, id)
	var bean models.Bean
	err := row.Scan(&bean.ID, &bean.Name, &bean.Description)
	if err != nil {
		return models.Bean{}, err
	}
	return bean, nil
}

func (b *BeanRepository) AddBean(bean models.Bean) (models.Bean, error) {
	query := fmt.Sprintf("INSERT INTO %s (\"Name\", \"Description\") VALUES ($1, $2) RETURNING *", beanTableName)
	row := b.db.QueryRow(query, bean.Name, bean.Description)
	var addedBean models.Bean
	err := row.Scan(&addedBean.ID, &addedBean.Name, &addedBean.Description)
	if err != nil {
		return models.Bean{}, err
	}
	return addedBean, nil
}
