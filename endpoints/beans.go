package endpoints

import (
	"fmt"
	"net/http"

	"ben-fletcher.com/coffee-shop/models"
	"ben-fletcher.com/coffee-shop/repositories"
	"github.com/gin-gonic/gin"
)

func MapBeansRoutes(r *gin.Engine, beansRepository repositories.IBeanRepository) {
	r.GET("/beans", func(c *gin.Context) {
		GetBeans(beansRepository, c)
	})
	r.GET("/beans/:id", func(c *gin.Context) {
		GetBeanById(beansRepository, c)
	})
	r.POST("/beans", func(c *gin.Context) {
		AddBean(beansRepository, c)
	})
	r.POST("/beans/:id/purchase", func(c *gin.Context) {
		PurchaseBean(beansRepository, c)
	})
}

func GetBeans(beansRepository repositories.IBeanRepository, c *gin.Context) {
	beans, err := beansRepository.GetAllBeans()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
	}
	c.JSON(http.StatusOK, beans)
}

func GetBeanById(beansRepository repositories.IBeanRepository, c *gin.Context) {
	id := c.Param("id")
	var beanId int
	if _, err := fmt.Sscanf(id, "%d", &beanId); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid bean ID"})
		return
	}

	bean, err := beansRepository.GetBeanById(beanId)
	if err != nil {
		if err.Error() == "sql: no rows in result set" {
			c.JSON(http.StatusNotFound, gin.H{"error": "Bean not found"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, bean)
}

func AddBean(beansRepository repositories.IBeanRepository, c *gin.Context) {
	var bean models.Bean
	if err := c.ShouldBindJSON(&bean); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	addedBean, err := beansRepository.AddBean(bean)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, addedBean)
}

func PurchaseBean(beansRepository repositories.IBeanRepository, c *gin.Context) {
	id := c.Param("id")
	var beanId int
	if _, err := fmt.Sscanf(id, "%d", &beanId); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid bean ID"})
		return
	}

	// Verify bean exists
	_, err := beansRepository.GetBeanById(beanId)
	if err != nil {
		if err.Error() == "sql: no rows in result set" {
			c.JSON(http.StatusNotFound, gin.H{"error": "Bean not found"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// In a real application, you would process payment, update inventory, etc.
	// For now, we'll just return a success message
	c.JSON(http.StatusOK, gin.H{
		"message": "Purchase successful",
		"beanId":  beanId,
	})
}
