package main

import (
	"database/sql"
	"fmt"
	"log"
	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	_ "github.com/lib/pq"

	"ben-fletcher.com/coffeeshop/endpoints"
	"ben-fletcher.com/coffeeshop/repositories"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}
	fmt.Println("Hello, World!")

	dbUrl := os.Getenv("DATABASE_URL")
	if dbUrl == "" {
		log.Fatal("DATABASE_URL is not set")
	}

	db, err := sql.Open("postgres", dbUrl)
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	r := gin.Default()
	r.SetTrustedProxies([]string{"127.0.0.1"})

	r.Use(cors.Default())

	beanRepository := repositories.NewBeanRepository(db)

	// Register API routes first (they take precedence over static file serving)
	endpoints.MapBeansRoutes(r, beanRepository)

	// Serve static files from the dist folder (assets, images, etc.)
	// This will only serve files that exist, API routes registered above take precedence
	serveStaticReactApp(r)

	r.Run(":8080")
}

func serveStaticReactApp(r *gin.Engine) {
	r.Static("/assets", "web/dist/assets")
	r.StaticFile("/vite.svg", "web/dist/vite.svg")
	r.StaticFile("/favicon.ico", "web/dist/favicon.ico")

	// Serve index.html for all non-API routes (catch-all for React Router)
	// This allows React Router to handle client-side routing
	r.NoRoute(func(c *gin.Context) {
		c.File("web/dist/index.html")
	})
}
